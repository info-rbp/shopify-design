(function () {
  'use strict';

  var defaultConfig = {
    temporaryAcceptAll: true,
    checkEndpoint: '/apps/rbp-bridge/api/check-address',
    enableGooglePlaces: false,
    googleBrowserApiKey: null
  };

  var config = Object.assign({}, defaultConfig, window.RBP_NBN_CONFIG || {});
  window.RBP_NBN_CONFIG = config;

  var SESSION_SERVICEABILITY = 'rbp_nbn_serviceability';
  var SESSION_ADDRESS = 'rbp_nbn_address';
  var SESSION_VALIDATION_MODE = 'rbp_nbn_validation_mode';
  var plansUrl = '/pages/business-nbn-plans';
  var contactUrl = '/pages/contact';

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[character];
    });
  }

  function safeSessionSet(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  function safeSessionGet(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function persistResult(result) {
    safeSessionSet(SESSION_SERVICEABILITY, JSON.stringify(result));
    safeSessionSet(SESSION_ADDRESS, result.matchedAddress || result.address || '');
    safeSessionSet(SESSION_VALIDATION_MODE, result.validationMode || '');
  }

  function normaliseBackendResult(data, fallbackAddress) {
    return Object.assign({
      status: 'api_error',
      validationMode: 'live_api',
      serviceabilityId: null,
      matchedAddress: fallbackAddress,
      address: fallbackAddress,
      technologyType: 'To be confirmed',
      maxSpeedLabel: 'Plan dependent',
      requiresManualReview: false
    }, data || {});
  }

  function getStatusCopy(result) {
    var address = result.matchedAddress || result.address || '';
    var technologyType = result.technologyType || 'To be confirmed';
    var maxSpeedLabel = result.maxSpeedLabel || 'Plan dependent';

    if (result.status === 'serviceable' || result.status === 'likely_serviceable') {
      return {
        tone: 'success',
        title: result.title || 'Business NBN appears available at this address.',
        body: result.message || 'This address has been accepted for the next step. Final serviceability, technology type, speed and provisioning timeframe will be confirmed before activation.',
        details: [
          ['Address', address],
          ['NBN technology', technologyType],
          ['Maximum speed', maxSpeedLabel]
        ],
        ctaHref: plansUrl,
        ctaText: 'View eligible plans'
      };
    }

    if (result.status === 'manual_review') {
      return {
        tone: 'warn',
        title: 'We need to manually review this address.',
        body: result.message || 'Remote Business Partner can review availability manually.',
        details: address ? [['Address', address]] : [],
        ctaHref: contactUrl,
        ctaText: 'Request Manual Review'
      };
    }

    if (result.status === 'not_serviceable') {
      return {
        tone: 'warn',
        title: 'Business NBN could not be automatically confirmed at this address.',
        body: 'You can request a manual review and we will check the available options.',
        details: address ? [['Address', address]] : [],
        ctaHref: contactUrl,
        ctaText: 'Request Manual Review'
      };
    }

    if (result.status === 'invalid_address') {
      return {
        tone: 'error',
        title: 'Please enter a full business address, including suburb, state and postcode where possible.',
        body: '',
        details: [],
        ctaHref: null,
        ctaText: null
      };
    }

    if (result.status === 'api_not_configured') {
      return {
        tone: 'warn',
        title: 'The address checker is ready, but live API validation is not connected yet.',
        body: config.temporaryAcceptAll ? 'Temporary mode is enabled, so you can continue to the next step.' : 'Please request a manual review while live validation is being connected.',
        details: address ? [['Address', address]] : [],
        ctaHref: config.temporaryAcceptAll ? plansUrl : contactUrl,
        ctaText: config.temporaryAcceptAll ? 'View eligible plans' : 'Request Manual Review'
      };
    }

    return {
      tone: 'error',
      title: 'The address checker is temporarily unavailable.',
      body: 'Please try again or request a manual review.',
      details: address ? [['Address', address]] : [],
      ctaHref: contactUrl,
      ctaText: 'Request Manual Review'
    };
  }

  function renderResult(container, result, manualReviewContainer) {
    if (!container) return;

    var copy = getStatusCopy(result);
    var details = copy.details.length
      ? '<dl>' + copy.details.map(function (item) {
        return '<div><dt>' + escapeHtml(item[0]) + '</dt><dd>' + escapeHtml(item[1]) + '</dd></div>';
      }).join('') + '</dl>'
      : '';
    var cta = copy.ctaHref
      ? '<a class="rbp-nbn-btn ' + (copy.tone === 'success' ? 'rbp-nbn-btn-p' : 'rbp-nbn-btn-g') + '" href="' + escapeHtml(copy.ctaHref) + '">' + escapeHtml(copy.ctaText) + '</a>'
      : '';

    container.className = 'rbp-nbn-mini-status';
    if (copy.tone === 'warn') container.className += ' rbp-nbn-status-warn';
    if (copy.tone === 'error') container.className += ' rbp-nbn-status-error';
    container.innerHTML = '<strong>' + escapeHtml(copy.title) + '</strong>' + (copy.body ? '<p>' + escapeHtml(copy.body) + '</p>' : '') + details + cta;
    container.hidden = false;

    if (manualReviewContainer) {
      manualReviewContainer.hidden = !result.requiresManualReview && !['manual_review', 'not_serviceable', 'api_error'].includes(result.status);
    }
  }

  function createTemporaryResult(address, placeId) {
    return {
      status: 'serviceable',
      validationMode: 'temporary_accept_all',
      serviceabilityId: 'temp_' + Date.now(),
      matchedAddress: address,
      address: address,
      placeId: placeId || null,
      technologyType: 'To be confirmed',
      maxSpeedLabel: 'Plan dependent',
      requiresManualReview: false,
      title: 'Business NBN appears available at this address.',
      message: 'This address has been accepted for the next step. Final serviceability, technology type, speed and provisioning timeframe will be confirmed before activation.'
    };
  }

  function checkAddressWithEndpoint(address, placeId) {
    if (!config.checkEndpoint) {
      return Promise.resolve({
        status: 'api_not_configured',
        validationMode: 'api_not_configured',
        matchedAddress: address,
        address: address,
        requiresManualReview: false
      });
    }

    return fetch(config.checkEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        address: address,
        placeId: placeId || null,
        source: 'business-nbn-page'
      })
    }).then(function (response) {
      return response.json().catch(function () {
        return {};
      }).then(function (body) {
        if (!response.ok) {
          return {
            status: 'api_error',
            validationMode: 'live_api',
            matchedAddress: address,
            address: address,
            requiresManualReview: true,
            message: body && body.error ? body.error : 'The live checker could not complete this request.'
          };
        }
        return normaliseBackendResult(body, address);
      });
    }).catch(function () {
      return {
        status: 'api_error',
        validationMode: 'live_api',
        matchedAddress: address,
        address: address,
        requiresManualReview: true
      };
    });
  }

  function initGooglePlaces(addressInput, placeIdInput) {
    if (!config.enableGooglePlaces || !config.googleBrowserApiKey || !addressInput) return;

    window.RBP_NBN_GOOGLE_PLACES_READY = function () {
      if (!window.google || !window.google.maps || !window.google.maps.places) return;

      var autocomplete = new window.google.maps.places.Autocomplete(addressInput, {
        componentRestrictions: { country: 'au' },
        fields: ['place_id', 'formatted_address', 'address_components', 'geometry'],
        types: ['address']
      });

      autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (placeIdInput) placeIdInput.value = place.place_id || '';
        if (place.formatted_address) addressInput.value = place.formatted_address;
      });
    };

    var existingScript = document.querySelector('script[data-rbp-google-places]');
    if (existingScript) return;

    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(config.googleBrowserApiKey) + '&libraries=places&callback=RBP_NBN_GOOGLE_PLACES_READY';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-rbp-google-places', 'true');
    document.head.appendChild(script);
  }

  function initChecker() {
    var form = document.getElementById('rbp-nbn-checker');
    if (!form) return;

    var addressInput = document.getElementById('rbp-nbn-address');
    var placeIdInput = document.getElementById('rbp-nbn-place-id');
    var resultContainer = document.getElementById('rbp-nbn-result');
    var manualReviewContainer = document.getElementById('rbp-nbn-manual-review');
    var submitButton = document.getElementById('rbp-nbn-check-btn');

    initGooglePlaces(addressInput, placeIdInput);

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var address = addressInput && addressInput.value ? addressInput.value.trim() : '';
      var placeId = placeIdInput && placeIdInput.value ? placeIdInput.value.trim() : null;

      if (address.length < 5) {
        renderResult(resultContainer, {
          status: 'invalid_address',
          matchedAddress: address,
          address: address,
          requiresManualReview: false
        }, manualReviewContainer);
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Checking...';
      }

      var resultPromise = config.temporaryAcceptAll
        ? Promise.resolve(createTemporaryResult(address, placeId))
        : checkAddressWithEndpoint(address, placeId);

      resultPromise.then(function (result) {
        if (result.status === 'serviceable' || result.status === 'likely_serviceable' || result.status === 'manual_review') {
          persistResult(result);
        }
        renderResult(resultContainer, result, manualReviewContainer);
      }).finally(function () {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Check Availability';
        }
      });
    });
  }

  function initPlansBanner() {
    var banner = document.getElementById('rbp-nbn-plan-address-banner');
    if (!banner) return;

    var stored = safeSessionGet(SESSION_SERVICEABILITY);
    var result = null;

    if (stored) {
      try {
        result = JSON.parse(stored);
      } catch (error) {
        result = null;
      }
    }

    if (result && result.matchedAddress) {
      banner.innerHTML = '<strong>Address accepted: ' + escapeHtml(result.matchedAddress) + '</strong><p>Final serviceability will be confirmed before activation.</p>';
      return;
    }

    banner.innerHTML = '<strong>Start by checking your business address.</strong><p>You can still browse plans, but address checking helps prepare the next step.</p><a class="rbp-nbn-btn rbp-nbn-btn-g" href="/pages/business-nbn#availability">Check Business Address</a>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initChecker();
      initPlansBanner();
    });
  } else {
    initChecker();
    initPlansBanner();
  }
})();
