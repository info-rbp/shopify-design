#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SUPPORTED_FIELD_TYPES = new Set([
  'text',
  'email',
  'tel',
  'textarea',
  'select',
  'checkbox',
  'radio',
  'hidden',
]);

function usage() {
  return [
    'Usage: node scripts/generate-onboarding-template.js [input-yml] [options]',
    '',
    'Options:',
    '  --input <path>              YAML form definition to read.',
    '  --output <path>             Generated JSON output path.',
    '  --write-template            Write templates/page.<handle>.json instead of generated output.',
    '  --force                     Allow overwriting an existing explicit output/template file.',
    '  --allow-page-onboarding     Allow --write-template to target templates/page.onboarding.json.',
    '',
    'Default input: content/onboarding/forms/business-health-check.yml',
    'Default output: content/onboarding/generated/page.<page_handle>.generated.json',
  ].join('\n');
}

function parseArgs(argv) {
  const args = {
    input: null,
    output: null,
    writeTemplate: false,
    force: false,
    allowPageOnboarding: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      console.log(usage());
      process.exit(0);
    }
    if (arg === '--input') {
      args.input = argv[++i];
    } else if (arg === '--output') {
      args.output = argv[++i];
    } else if (arg === '--write-template') {
      args.writeTemplate = true;
    } else if (arg === '--force') {
      args.force = true;
    } else if (arg === '--allow-page-onboarding') {
      args.allowPageOnboarding = true;
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    } else if (!args.input) {
      args.input = arg;
    } else {
      throw new Error(`Unexpected argument: ${arg}`);
    }
  }

  args.input = args.input || 'content/onboarding/forms/business-health-check.yml';
  return args;
}

function stripComment(line) {
  let quote = null;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if ((char === '"' || char === "'") && line[i - 1] !== '\\') {
      quote = quote === char ? null : quote || char;
    }
    if (char === '#' && !quote) {
      return line.slice(0, i);
    }
  }
  return line;
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === '') return '';
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function splitKeyValue(text, lineNumber) {
  const index = text.indexOf(':');
  if (index === -1) {
    throw new Error(`Invalid YAML at line ${lineNumber}: expected key/value pair.`);
  }
  const key = text.slice(0, index).trim();
  const value = text.slice(index + 1).trim();
  if (!key) {
    throw new Error(`Invalid YAML at line ${lineNumber}: missing key.`);
  }
  return [key, value];
}

function prepareLines(source) {
  return source
    .split(/\r?\n/)
    .map((raw, index) => ({ raw: stripComment(raw).replace(/\s+$/, ''), lineNumber: index + 1 }))
    .filter(({ raw }) => raw.trim() !== '')
    .map(({ raw, lineNumber }) => {
      if (raw.includes('\t')) {
        throw new Error(`Invalid YAML at line ${lineNumber}: tabs are not supported.`);
      }
      const indent = raw.match(/^ */)[0].length;
      if (indent % 2 !== 0) {
        throw new Error(`Invalid YAML at line ${lineNumber}: indentation must use multiples of two spaces.`);
      }
      return { indent, text: raw.trim(), lineNumber };
    });
}

function parseYaml(source) {
  const lines = prepareLines(source);
  if (!lines.length) {
    throw new Error('Invalid YAML: file is empty.');
  }

  function parseBlock(index, indent) {
    const current = lines[index];
    if (!current || current.indent < indent) return [null, index];
    if (current.indent !== indent) {
      throw new Error(`Invalid YAML at line ${current.lineNumber}: unexpected indentation.`);
    }
    return current.text.startsWith('- ') ? parseArray(index, indent) : parseObject(index, indent);
  }

  function parseObject(index, indent) {
    const object = {};
    while (index < lines.length) {
      const line = lines[index];
      if (line.indent < indent) break;
      if (line.indent > indent) {
        throw new Error(`Invalid YAML at line ${line.lineNumber}: unexpected nested value.`);
      }
      if (line.text.startsWith('- ')) break;

      const [key, value] = splitKeyValue(line.text, line.lineNumber);
      if (value === '') {
        const next = lines[index + 1];
        if (!next || next.indent <= indent) {
          object[key] = {};
          index += 1;
        } else {
          const parsed = parseBlock(index + 1, next.indent);
          object[key] = parsed[0];
          index = parsed[1];
        }
      } else {
        object[key] = parseScalar(value);
        index += 1;
      }
    }
    return [object, index];
  }

  function parseArray(index, indent) {
    const array = [];
    while (index < lines.length) {
      const line = lines[index];
      if (line.indent < indent) break;
      if (line.indent > indent) {
        throw new Error(`Invalid YAML at line ${line.lineNumber}: unexpected array indentation.`);
      }
      if (!line.text.startsWith('- ')) break;

      const rest = line.text.slice(2).trim();
      if (rest === '') {
        const next = lines[index + 1];
        if (!next || next.indent <= indent) {
          array.push(null);
          index += 1;
        } else {
          const parsed = parseBlock(index + 1, next.indent);
          array.push(parsed[0]);
          index = parsed[1];
        }
      } else if (rest.includes(':')) {
        const [key, value] = splitKeyValue(rest, line.lineNumber);
        const item = {};
        item[key] = value === '' ? {} : parseScalar(value);
        index += 1;

        while (index < lines.length && lines[index].indent > indent) {
          if (lines[index].indent !== indent + 2) {
            throw new Error(`Invalid YAML at line ${lines[index].lineNumber}: unexpected nested object indentation.`);
          }
          const [childObject, nextIndex] = parseObject(index, indent + 2);
          Object.assign(item, childObject);
          index = nextIndex;
        }

        array.push(item);
      } else {
        array.push(parseScalar(rest));
        index += 1;
      }
    }
    return [array, index];
  }

  const [document, index] = parseBlock(0, lines[0].indent);
  if (index !== lines.length) {
    throw new Error(`Invalid YAML at line ${lines[index].lineNumber}: could not parse full document.`);
  }
  return document;
}

function requiredString(object, key, scope) {
  const value = object && object[key];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Missing required ${scope}.${key}.`);
  }
  return value.trim();
}

function optionalString(object, key) {
  const value = object && object[key];
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
}

function blockIdFromFieldId(fieldId) {
  const id = fieldId.toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '');
  if (!id) {
    throw new Error(`Invalid field id "${fieldId}": cannot derive Shopify block id.`);
  }
  return id;
}

function validateDefinition(definition) {
  const formId = requiredString(definition, 'form_id', 'form');
  requiredString(definition, 'title', 'form');
  requiredString(definition, 'status', 'form');

  if (!definition.rendering || typeof definition.rendering !== 'object') {
    throw new Error('Missing required rendering block.');
  }
  requiredString(definition.rendering, 'section', 'rendering');

  if (!definition.submission || typeof definition.submission !== 'object') {
    throw new Error('Missing required submission block.');
  }
  const destination = requiredString(definition.submission, 'destination', 'submission');
  if (destination !== '/apps/rbp-bridge') {
    throw new Error(`submission.destination must remain /apps/rbp-bridge, received ${destination}.`);
  }

  if (!definition.bridge_payload || typeof definition.bridge_payload !== 'object') {
    throw new Error('Missing required bridge_payload block.');
  }
  requiredString(definition.bridge_payload, 'sourceArea', 'bridge_payload');
  requiredString(definition.bridge_payload, 'formType', 'bridge_payload');

  if (!Array.isArray(definition.fields) || !definition.fields.length) {
    throw new Error('Missing required non-empty fields array.');
  }

  const seenIds = new Set();
  definition.fields.forEach((field, index) => {
    if (!field || typeof field !== 'object') {
      throw new Error(`Invalid field at index ${index}: expected object.`);
    }
    const id = requiredString(field, 'id', `fields[${index}]`);
    if (seenIds.has(id)) {
      throw new Error(`Duplicate field id: ${id}.`);
    }
    seenIds.add(id);

    requiredString(field, 'label', `fields[${index}]`);
    const type = requiredString(field, 'type', `fields[${index}]`);
    if (!SUPPORTED_FIELD_TYPES.has(type)) {
      throw new Error(`Unsupported field type "${type}" for field "${id}".`);
    }
    requiredString(field, 'payload_target', `fields[${index}]`);
    if ((type === 'select' || type === 'radio') && (!Array.isArray(field.options) || !field.options.length)) {
      throw new Error(`Field "${id}" of type "${type}" requires options.`);
    }
  });

  return { formId };
}

function buildTemplate(definition) {
  validateDefinition(definition);

  const bridgePayload = definition.bridge_payload;
  const rendering = definition.rendering;
  const submission = definition.submission;
  const productOrService = optionalString(bridgePayload, 'productOrService') || definition.title;
  const blocks = {};
  const blockOrder = [];

  definition.fields.forEach((field) => {
    const blockId = blockIdFromFieldId(field.id);
    const settings = {
      label: field.label,
      type: field.type,
      name: field.payload_target,
    };

    if (typeof field.placeholder === 'string') {
      settings.placeholder = field.placeholder;
    }
    if (Array.isArray(field.options)) {
      settings.options = field.options.join('\n');
    }
    settings.required = field.required === true;

    blocks[blockId] = {
      type: 'field',
      settings,
    };
    blockOrder.push(blockId);
  });

  return {
    sections: {
      main: {
        type: rendering.section,
        settings: {
          title: productOrService,
          form_id: definition.form_id,
          app_proxy_path: submission.destination,
          source_area: bridgePayload.sourceArea,
          form_type: bridgePayload.formType,
          product_or_service: productOrService,
          submit_label: 'Submit your business context',
        },
        blocks,
        block_order: blockOrder,
      },
    },
    order: ['main'],
  };
}

function defaultOutputPath(definition) {
  const pageHandle = optionalString(definition.rendering, 'page_handle') || definition.form_id;
  return path.join('content', 'onboarding', 'generated', `page.${pageHandle}.generated.json`);
}

function templateOutputPath(definition) {
  const pageHandle = optionalString(definition.rendering, 'page_handle') || definition.form_id;
  return path.join('templates', `page.${pageHandle}.json`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const inputPath = path.resolve(args.input);
  const definition = parseYaml(fs.readFileSync(inputPath, 'utf8'));
  const template = buildTemplate(definition);

  let outputPath = args.output || defaultOutputPath(definition);
  if (args.writeTemplate) {
    outputPath = args.output || templateOutputPath(definition);
    if (path.basename(outputPath) === 'page.onboarding.json' && !args.allowPageOnboarding) {
      throw new Error('Refusing to write templates/page.onboarding.json without --allow-page-onboarding.');
    }
  }

  const resolvedOutputPath = path.resolve(outputPath);
  if (fs.existsSync(resolvedOutputPath) && !args.force) {
    throw new Error(`Refusing to overwrite existing file without --force: ${outputPath}`);
  }

  fs.mkdirSync(path.dirname(resolvedOutputPath), { recursive: true });
  fs.writeFileSync(resolvedOutputPath, `${JSON.stringify(template, null, 2)}\n`);
  console.log(`Generated ${outputPath} from ${args.input}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
