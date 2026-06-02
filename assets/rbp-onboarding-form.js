(function() {
  const forms = document.querySelectorAll('[data-rbp-onboarding-form]');
  if (!forms.length) return;

  forms.forEach(form => {
    const submitBtn = form.querySelector('button[type="submit"]');
    const messageContainer = form.querySelector('[data-rbp-onboarding-message]');

    const showMessage = (text, isError = false) => {
      if (!messageContainer) return;
      messageContainer.textContent = text;
      messageContainer.classList.remove('rbp-onboarding-hidden', 'success', 'error');
      messageContainer.classList.add(isError ? 'error' : 'success');
    };

    const clearErrors = () => {
      form.querySelectorAll('.rbp-onboarding-field-error').forEach(el => {
        el.textContent = '';
        el.classList.add('rbp-onboarding-hidden');
      });
      if (messageContainer) messageContainer.classList.add('rbp-onboarding-hidden');
    };

    const handleResponse = async (response) => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      }

      if (response.ok) {
        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          try {
            data = await response.json();
          } catch (e) {
            console.error('JSON parse error:', e);
          }
        }

        if (data && data.ok) {
          showMessage(data.message || 'Submission received.');
          if (data.redirect) {
            window.location.href = data.redirect;
          } else {
            form.reset();
          }
        } else if (data && !data.ok) {
          showMessage(data.message || 'Please check the form for errors.', true);
          if (data.errors) {
            Object.keys(data.errors).forEach(key => {
              // Try to match key or metadata[key]
              const field = form.querySelector(`[name="${key}"], [name="metadata[${key}]"]`);
              if (field) {
                const errorEl = field.closest('.rbp-onboarding-field').querySelector('.rbp-onboarding-field-error');
                if (errorEl) {
                  errorEl.textContent = data.errors[key];
                  errorEl.classList.remove('rbp-onboarding-hidden');
                }
              }
            });
          }
        } else {
          // Fallback for non-JSON or missing data.ok
          showMessage('Thank you! Your submission has been received.');
          form.reset();
        }
      } else {
        let errorMsg = 'We could not process the request right now. Please try again.';
        try {
           const errData = await response.json();
           if (errData && errData.message) errorMsg = errData.message;
        } catch(e) {}
        showMessage(errorMsg, true);
      }
    };

    form.addEventListener('submit', async (e) => {
      const action = form.getAttribute('action');
      // If destination is not a local path (starts with /), let normal form submit handle it unless we want to allow absolute URLs too
      // App proxy should be a local path
      if (!action || !action.startsWith('/')) return;

      e.preventDefault();
      clearErrors();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
      }

      const formData = new FormData(form);

      // Ensure urlContext is current
      const urlContext = form.querySelector('[name="urlContext"]');
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
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
        }
        showMessage('A connection error occurred. Please check your internet and try again.', true);
      }
    });
  });
})();
