(function () {
  var LANGS = ['uk', 'en'];
  var STORAGE_KEY = 'poruch-lang';
  var root = document.documentElement;

  function stored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function store(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
  }

  function initialLang() {
    var fromHash = location.hash.slice(1);
    if (LANGS.indexOf(fromHash) !== -1) return fromHash;

    var saved = stored();
    if (LANGS.indexOf(saved) !== -1) return saved;

    var browser = (navigator.language || '').toLowerCase();
    return browser.indexOf('uk') === 0 ? 'uk' : 'en';
  }

  function apply(lang) {
    root.lang = lang;
    var title = root.getAttribute('data-title-' + lang);
    if (title) document.title = title;

    document.querySelectorAll('section[lang]').forEach(function (section) {
      section.hidden = section.lang !== lang;
    });

    document.querySelectorAll('.lang-switch button').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });
  }

  root.classList.add('js');
  apply(initialLang());

  document.querySelectorAll('.lang-switch button').forEach(function (button) {
    button.addEventListener('click', function () {
      var lang = button.dataset.lang;
      store(lang);
      history.replaceState(null, '', '#' + lang);
      apply(lang);
    });
  });
})();
