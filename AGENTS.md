# AGENTS.md

## Purpose

This repository uses Google Jules for scoped maintenance, fixes, and implementation work. Treat this file as the entry point for repository-specific instructions before making changes.

## Jules context

Additional task context belongs in:

- `docs/jules/`

Before starting work, read any relevant Markdown files in `docs/jules/` that are referenced by the task prompt, issue, or pull request description.

Do not assume every possible context file exists. This folder may be populated gradually by maintainers as specific fix instructions are added.

## Working rules

- Keep changes scoped to the requested task.
- Do not rewrite unrelated parts of the application.
- Prefer small, reviewable changes over broad refactors.
- Preserve existing behavior unless the task explicitly requires changing it.
- Add or update tests for changed behavior when tests exist or are practical.
- Run available lint, test, and build commands before finalizing changes.
- If a command is unavailable, undocumented, or failing because of existing repository state, report that clearly in the pull request notes.
- Do not add credentials, secrets, generated build artifacts, dependency caches, or local environment files.

## Pull request expectations

When opening or updating a pull request, include:

- Summary of what changed.
- Files or areas touched.
- Validation steps and results.
- Assumptions made.
- Any skipped checks or follow-up work.
