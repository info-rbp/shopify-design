(function() {
  const form = document.querySelector('[data-rbp-onboarding-form]');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const messageContainer = form.querySelector('[data-rbp-onboarding-message]');

  const showMessage = (text, isError = false) => {
    messageContainer.textContent = text;
    messageContainer.classList.remove('hidden', 'success', 'error');
    messageContainer.classList.add(isError ? 'error' : 'success');
  };

  const clearErrors = () => {
    form.querySelectorAll('.rbp-onboarding-field-error').forEach(el => {
      el.textContent = '';
      el.classList.add('hidden');
    });
    messageContainer.classList.add('hidden');
  };

  const handleResponse = async (response) => {
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');

    if (response.ok) {
      let data;
      try {
        data = await response.json();
      } catch (e) {
        // Fallback for non-JSON success
        showMessage('Thank you! Your submission has been received.');
        form.reset();
        return;
      }

      if (data.ok) {
        showMessage(data.message || 'Submission received.');
        if (data.redirect) {
          window.location.href = data.redirect;
        } else {
          form.reset();
        }
      } else {
        showMessage(data.message || 'Please check the form for errors.', true);
        if (data.errors) {
          Object.keys(data.errors).forEach(key => {
            const field = form.querySelector(`[name="${key}"], [name="metadata[${key}]"]`);
            if (field) {
              const errorEl = field.closest('.rbp-onboarding-field').querySelector('.rbp-onboarding-field-error');
              if (errorEl) {
                errorEl.textContent = data.errors[key];
                errorEl.classList.remove('hidden');
              }
            }
          });
        }
      }
    } else {
      showMessage('We could not process the request right now. Please try again.', true);
    }
  };

  form.addEventListener('submit', async (e) => {
    // If destination is a standard Shopify app proxy, we use fetch for progressive enhancement
    const action = form.getAttribute('action');
    if (!action || !action.startsWith('/')) return;

    e.preventDefault();
    clearErrors();

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    const formData = new FormData(form);

    // Ensure urlContext is current
    const urlContext = form.querySelector('#rbp-url-context');
    if (urlContext) urlContext.value = window.location.href;

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      handleResponse(response);
    } catch (error) {
      console.error('Submission error:', error);
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      showMessage('A connection error occurred. Please check your internet and try again.', true);
    }
  });
})();
