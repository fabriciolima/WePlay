var Localization;

Localization = (function() {

  function Localization() {}

  Localization.initialize = function(dictionnary, fallback_language) {
    Localization.dictionnary = dictionnary;
    Localization.fallback_language = fallback_language;
    return navigator.globalization.getPreferredLanguage(Localization.get_preferred_language_callback, Localization.get_preferred_language_error_callback);
  };

  Localization.get_preferred_language_callback = function(language) {
    Localization.language = language.value.substring(0, 2);
    if (Localization.language in Localization.dictionnary) {
    
    } else {
      Localization.language = Localization.fallback_language;
    
    }
    return Localization.apply_to_current_html();
  };

  Localization.get_preferred_language_error_callback = function() {
    Localization.language = Localization.fallback_language;
    return Localization.apply_to_current_html();
  };

  Localization.apply_to_current_html = function() {
    var key, value, _ref, _results;
    _ref = Localization.dictionnary[Localization.language];
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      _results.push($(".l10n-" + key).html(value));
    }
    return _results;
  };

  Localization["for"] = function(key) {
    return Localization.dictionnary[Localization.language][key];
  };

  return Localization;

})();
