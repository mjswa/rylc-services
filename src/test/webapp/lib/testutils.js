jasmineui.inject(function () {

  // disable transitions and speed up timeout during ui tests for better test performance
  function jqueryMobileSpeedup() {
    // Allow at most 20ms as timeouts.
    var oldTimeout = window.setTimeout;
    window.setTimeout = function (fn, delay) {
      if (delay > 20) {
        delay = 20;
      }
      return oldTimeout.call(this, fn, delay);
    };

    // Disable transitions
    beforeLoad(function () {
      $.mobile.defaultPageTransition = "none";
      $.mobile.defaultDialogTransition = "none";
    });
  }

  jqueryMobileSpeedup();

  // -----

  function activePage() {
    return $.mobile.activePage;
  }

  function activePageId() {
    if (activePage() == null) {
      throw new Error("No active page found.");
    }
    return activePage().attr('id');
  }

  function activatePage$(selector) {
    return $(selector, activePage());
  }

  function activePageScope() {
    if (activePage() == null) {
      throw new Error("No active page found.");
    }
    return activePage().scope();
  }

  function click(selector) {
    var element = activatePage$(selector);
    if (element.length !== 1) {
      throw new Error("No unique element found for " + selector);
    }
    element.click();
    element.scope().$root.$digest();
  }

  function count(selector) {
    var element = activatePage$(selector);
    return element.length;
  }

  function enabled(selector) {
    var element = activatePage$(selector);
    if (element.length !== 1) {
      throw new Error("No unique element found for " + selector);
    }
    return !element.attr('disabled');
  }

  function hasValidationError(selector) {
    var element = activatePage$(selector);
    if (element.length !== 1) {
      throw new Error("No unique element found for " + selector);
    }
    return element.hasClass('ng-invalid');
  }

  function value(selector, value) {
    var element = activatePage$(selector);
    if (element.length !== 1) {
      throw new Error("No unique element found for " + selector);
    }
    if (arguments.length === 1) {
      var elementName = element[0].nodeName.toUpperCase();
      if (elementName === 'INPUT' || elementName === 'SELECT') {
        return element.val();
      } else {
        return element.text();
      }
    }
    element.val(value);
    triggerChangeEvent(element);
    element.scope().$root.$digest();
  }

  var inputEventSupported = "oninput" in document.createElement('div');

  function triggerChangeEvent(element) {
    if (element[0].tagName.toLowerCase() === 'input' && inputEventSupported) {
      element.trigger('input');
    } else {
      element.trigger('change');
    }
  }

  // -----

  function formatSimpleDate(date) {
    var injector = $(document.documentElement).injector();
    return injector.get("utilsService").formatSimpleDate(date);
  }

  function formatDate(date) {
    var injector = $(document.documentElement).injector();
    return injector.get("utilsService").formatDate(date);
  }

  // -----

  window.activePageId = activePageId;
  window.activePageScope = activePageScope;
  window.count = count;
  window.click = click;
  window.enabled = enabled;
  window.hasValidationError = hasValidationError;
  window.value = value;

  window.formatSimpleDate = formatSimpleDate;
  window.formatDate = formatDate;

});
