(() => {
  const root = document.querySelector('[data-service-booking-root]');
  if (!root) return;

  const cfg = window.PropertyServiceBooking || {};
  const state = { step: 0, selectedSlot: null, price: null, addressStatus: null };
  const steps = ['contact', 'property', 'access', 'appointment', 'review'];

  const $ = (sel) => root.querySelector(sel);
  const $$ = (sel) => [...root.querySelectorAll(sel)];

  const serviceLabel = cfg.serviceLabel || 'Property Service';
  const apiBaseUrl = cfg.apiBaseUrl || '/apps/rbp-bridge/api';
  const productHandle = cfg.productHandle || '';
  const serviceType = cfg.serviceType || '';
  const timezone = cfg.timezone || 'Australia/Perth';

  const endpoint = (path) => `${String(apiBaseUrl).replace(/\/$/, '')}/${String(path).replace(/^\//, '')}`;

  const defaultSlots = [
    { start: nextDateAt(2, 10, 0), endMinutes: cfg.durationMinutes || 60, label: 'Next available weekday, 10:00am' },
    { start: nextDateAt(3, 14, 0), endMinutes: cfg.durationMinutes || 60, label: 'Next available weekday, 2:00pm' },
    { start: nextSaturdayAt(10, 0), endMinutes: cfg.durationMinutes || 60, label: 'Next Saturday, 10:00am' },
    { start: nextSundayAt(10, 0), endMinutes: cfg.durationMinutes || 60, label: 'Next Sunday, 10:00am' }
  ].map((slot) => ({ ...slot, end: addMinutes(slot.start, slot.endMinutes).toISOString(), start: slot.start.toISOString() }));

  function nextDateAt(offsetDays, hour, minute) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    d.setHours(hour, minute, 0, 0);
    return d;
  }
  function nextSaturdayAt(hour, minute) {
    const d = new Date();
    const day = d.getDay();
    const add = (6 - day + 7) % 7 || 7;
    d.setDate(d.getDate() + add);
    d.setHours(hour, minute, 0, 0);
    return d;
  }
  function nextSundayAt(hour, minute) {
    const d = new Date();
    const day = d.getDay();
    const add = (7 - day) % 7 || 7;
    d.setDate(d.getDate() + add);
    d.setHours(hour, minute, 0, 0);
    return d;
  }
  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  function money(amount) {
    const n = Number(amount || 0);
    return n.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
  }

  function classifySlot(dateString) {
    const date = new Date(dateString);
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const total = hour * 60 + minute;
    if (day === 6) return { category: 'saturday', label: 'Saturdays' };
    if (day === 0) return { category: 'sunday', label: 'Sundays' };
    if (day >= 1 && day <= 5 && total >= 8 * 60 && total < 18 * 60) return { category: 'standard_hours', label: 'Standard Hours' };
    if (day >= 1 && day <= 5 && total >= 18 * 60 && total < 22 * 60) return { category: 'after_hours', label: 'After Hours' };
    return { category: 'review_required', label: 'Review required' };
  }

  function variantForCategory(category) {
    return (cfg.variants || []).find((variant) => variant.timeCategory === category) || null;
  }

  function formValues() {
    const values = {};
    $$('[data-booking-field]').forEach((field) => {
      if (field.type === 'checkbox') values[field.name] = field.checked;
      else values[field.name] = field.value;
    });
    return values;
  }

  function updateSummary() {
    const values = formValues();
    $$('[data-booking-summary]').forEach((summary) => {
      const priceHtml = state.price ? `${money(state.price.price)} <span class="service-booking__badge">${escapeHtml(state.price.timeCategoryLabel || state.price.timeCategory || 'Selected time')}</span>` : 'Select a slot to preview price';
      summary.innerHTML = `
        <dl>
          <div class="service-booking__summary-row"><dt>Service</dt><dd>${escapeHtml(serviceLabel)}</dd></div>
          <div class="service-booking__summary-row"><dt>Name</dt><dd>${escapeHtml(values.customer_name || 'Not entered')}</dd></div>
          <div class="service-booking__summary-row"><dt>Email</dt><dd>${escapeHtml(values.customer_email || 'Not entered')}</dd></div>
          <div class="service-booking__summary-row"><dt>Property</dt><dd>${escapeHtml(values.property_address || 'Not entered')}</dd></div>
          <div class="service-booking__summary-row"><dt>Selected slot</dt><dd>${state.selectedSlot ? escapeHtml(slotLabel(state.selectedSlot)) : 'Not selected'}</dd></div>
        </dl>
        <p class="service-booking__price">${priceHtml}</p>
      `;
    });
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function slotLabel(slot) {
    if (!slot) return '';
    const d = new Date(slot.start);
    return d.toLocaleString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit' });
  }

  function setStep(step) {
    state.step = Math.max(0, Math.min(step, steps.length - 1));
    $$('[data-booking-step]').forEach((el, index) => el.hidden = index !== state.step);
    $$('[data-step-pill]').forEach((el, index) => el.classList.toggle('is-active', index === state.step));
    updateSummary();
  }

  async function postJson(path, payload) {
    const res = await fetch(endpoint(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    let data = {};
    try { data = text ? JSON.parse(text) : {}; } catch (err) { data = { message: text }; }
    if (!res.ok) throw new Error(data.message || data.error || `Request failed: ${res.status}`);
    return data;
  }

  async function maybeValidateAddress() {
    const values = formValues();
    const address = values.property_address;
    const output = $('[data-address-output]');
    if (!address || !output) return true;
    try {
      const data = await postJson('check-address', { serviceType, productHandle, address, timezone, form: values });
      state.addressStatus = data.status || data.addressStatus || 'checked';
      output.innerHTML = `<div class="service-booking__success">${escapeHtml(data.message || 'Address checked.')}</div>`;
      return state.addressStatus !== 'blocked' && state.addressStatus !== 'unavailable';
    } catch (err) {
      output.innerHTML = `<div class="service-booking__error">${escapeHtml(err.message || 'Address validation could not be completed.')}</div>`;
      return false;
    }
  }

  async function loadSlots() {
    const container = $('[data-slot-list]');
    if (!container) return;
    container.innerHTML = '<p>Loading available slots...</p>';
    let slots = defaultSlots;
    try {
      const data = await postJson('available-slots', { serviceType, productHandle, durationMinutes: cfg.durationMinutes, timezone, form: formValues() });
      if (Array.isArray(data.slots) && data.slots.length) slots = data.slots;
    } catch (err) {
      container.innerHTML = `<div class="service-booking__error">${escapeHtml(err.message || 'Available slots could not be loaded. Showing review placeholders.')}</div>`;
      container.insertAdjacentHTML('beforeend', '<p class="service-booking__small">Placeholder slots are shown for review only.</p>');
    }
    renderSlots(slots);
  }

  function renderSlots(slots) {
    const container = $('[data-slot-list]');
    container.insertAdjacentHTML('beforeend', `<div class="service-booking__slot-grid">${slots.map((slot, index) => `<button type="button" class="service-booking__slot" data-slot-index="${index}" data-slot-start="${escapeHtml(slot.start)}" data-slot-end="${escapeHtml(slot.end)}"><strong>${escapeHtml(slot.label || slotLabel(slot))}</strong><br><span class="service-booking__small">${escapeHtml(new Date(slot.start).toLocaleString('en-AU'))}</span></button>`).join('')}</div>`);
    $$('[data-slot-index]').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('[data-slot-index]').forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        state.selectedSlot = { start: btn.dataset.slotStart, end: btn.dataset.slotEnd, label: btn.textContent.trim() };
        previewPrice();
      });
    });
  }

  async function previewPrice() {
    if (!state.selectedSlot) return;
    const category = classifySlot(state.selectedSlot.start);
    let variant = variantForCategory(category.category);
    let preview = variant ? { timeCategory: category.category, timeCategoryLabel: category.label, price: variant.price, variantId: variant.id } : { timeCategory: category.category, timeCategoryLabel: category.label, price: null, variantId: null };
    try {
      const data = await postJson('preview-price', { serviceType, productHandle, slotStart: state.selectedSlot.start, slotEnd: state.selectedSlot.end, timezone, localPreview: preview });
      if (data && (data.price || data.variantId)) preview = data;
    } catch (err) {
      // Keep local Shopify variant preview if bridge price endpoint is not ready yet.
    }
    state.price = preview;
    const priceBox = $('[data-price-preview]');
    if (priceBox) {
      if (!preview.price) priceBox.innerHTML = '<div class="service-booking__error">This time falls outside the configured booking windows and requires review.</div>';
      else priceBox.innerHTML = `<div class="service-booking__success"><strong>Exact price preview:</strong> ${money(preview.price)} for ${escapeHtml(preview.timeCategoryLabel || preview.timeCategory)}.</div>`;
    }
    updateSummary();
  }

  async function holdAndCheckout() {
    const output = $('[data-checkout-output]');
    const values = formValues();
    if (!state.selectedSlot || !state.price || !state.price.price) {
      output.innerHTML = '<div class="service-booking__error">Select a valid appointment slot before continuing.</div>';
      return;
    }
    if (!values.authority_confirmed) {
      output.innerHTML = '<div class="service-booking__error">Confirm authority to request attendance before continuing.</div>';
      return;
    }
    output.innerHTML = '<p>Creating calendar hold and Shopify checkout...</p>';
    try {
      const data = await postJson('hold-and-checkout', { serviceType, productHandle, timezone, slot: state.selectedSlot, pricePreview: state.price, form: values });
      if (!data.checkoutUrl) throw new Error(data.message || 'Checkout could not be created.');
      window.location.href = data.checkoutUrl;
    } catch (err) {
      output.innerHTML = `<div class="service-booking__error">${escapeHtml(err.message || 'Checkout could not be created.')}</div>`;
    }
  }

  $$('[data-next-step]').forEach((btn) => btn.addEventListener('click', async () => {
    if (steps[state.step] === 'property') {
      const ok = await maybeValidateAddress();
      if (!ok) return;
    }
    if (steps[state.step] === 'access') loadSlots();
    setStep(state.step + 1);
  }));
  $$('[data-prev-step]').forEach((btn) => btn.addEventListener('click', () => setStep(state.step - 1)));
  const checkoutBtn = $('[data-hold-checkout]');
  if (checkoutBtn) checkoutBtn.addEventListener('click', holdAndCheckout);
  $$('[data-booking-field]').forEach((field) => field.addEventListener('input', updateSummary));

  setStep(0);
})();