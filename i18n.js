'use strict';

class I18n {
  constructor() {
    this.currentLang = this.normalizeLang(
      this._getStorageItem('wiki-lang') || document.documentElement.lang || 'ru'
    );

    this.translations = {};
    this.loadedNamespaces = new Set();
    this.basePath = this._detectBasePath();

    this.ready = false;
    this.readyCallbacks = [];
    this.eventsBound = false;
    this.initPromise = null;
    this.languageChangeToken = 0;
  }

  init() {
    if (!this.initPromise) {
      this.initPromise = this._init();
    }

    return this.initPromise;
  }

  async _init() {
    document.documentElement.lang = this.currentLang;

    this.setupEventListeners();
    this.updateUIState();

    const namespaces = this._detectPageNamespaces();

    await this.loadNamespaces(this.currentLang, namespaces);

    if (this.currentLang !== 'ru') {
      await this.loadNamespaces('ru', namespaces);
    }

    this.translatePage();
    this.updateArtifactNames();
    this.updateUIState();

    this.ready = true;

    const callbacks = this.readyCallbacks.splice(0);
    callbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('[i18n] Ready callback failed:', error);
      }
    });

    document.dispatchEvent(new CustomEvent('i18nReady', {
      detail: {
        lang: this.currentLang,
        namespaces
      }
    }));
  }

  onReady(callback) {
    if (typeof callback !== 'function') return;

    if (this.ready) {
      callback();
    } else {
      this.readyCallbacks.push(callback);
    }
  }

  normalizeLang(lang) {
    return String(lang || 'ru').toLowerCase().startsWith('en') ? 'en' : 'ru';
  }

  _getStorageItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  _setStorageItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
    }
  }

  _ensureTrailingSlash(value) {
    return value.endsWith('/') ? value : `${value}/`;
  }

  _getI18nScriptElement() {
    if (document.currentScript) {
      return document.currentScript;
    }

    const scripts = Array.from(document.scripts).reverse();

    return scripts.find(script => {
      const src = script.getAttribute('src') || script.src || '';
      return /(^|\/)i18n\.js(?:[?#].*)?$/i.test(src);
    }) || null;
  }

  _detectBasePath() {
    const script = this._getI18nScriptElement();

    if (script) {
      const customBase = script.getAttribute('data-locales-base');
      const scriptSrc = script.src ||
        (script.getAttribute('src')
          ? new URL(script.getAttribute('src'), document.baseURI).href
          : '');

      if (customBase) {
        return this._ensureTrailingSlash(
          new URL(customBase, scriptSrc || document.baseURI).href
        );
      }

      if (scriptSrc) {
        return this._ensureTrailingSlash(
          new URL('locales/', scriptSrc).href
        );
      }
    }

    const nestedPages = ['map', 'table', 'calculator', 'ttk'];
    const isNestedPage = nestedPages.some(page => this._pathHasPageSegment(page));
    const relativeBase = isNestedPage ? '../locales/' : 'locales/';

    return this._ensureTrailingSlash(
      new URL(relativeBase, document.baseURI).href
    );
  }

  _getPathSegments() {
    let path = window.location.pathname || '';

    try {
      path = decodeURIComponent(path);
    } catch (error) {
    }

    return path
      .toLowerCase()
      .split('/')
      .filter(Boolean);
  }

  _pathHasPageSegment(page) {
    const normalizedPage = String(page || '').toLowerCase();
    const segments = this._getPathSegments();

    return segments.some(segment => (
      segment === normalizedPage ||
      segment === `${normalizedPage}.html`
    ));
  }

  _detectPageNamespaces() {
    const namespaces = ['common'];

    const bodyPage =
      (document.body && (document.body.dataset.i18nPage || document.body.dataset.page)) ||
      document.documentElement.dataset.i18nPage ||
      document.documentElement.dataset.page ||
      '';

    const page = String(bodyPage).toLowerCase();

    if (page === 'map' || this._pathHasPageSegment('map')) {
      namespaces.push('map');
    } else if (page === 'table' || page === 'artifacts' || this._pathHasPageSegment('table')) {
      namespaces.push('artifacts');
    } else if (page === 'calculator' || this._pathHasPageSegment('calculator')) {
      namespaces.push('calculator', 'artifacts');
    } else if (page === 'ttk' || this._pathHasPageSegment('ttk')) {
      namespaces.push('ttk');
    } else {
      namespaces.push('home');
    }

    return Array.from(new Set(namespaces));
  }

  async loadNamespaces(lang, namespaces) {
    const normalizedLang = this.normalizeLang(lang);
    const namespaceList = Array.isArray(namespaces) ? namespaces : [namespaces];

    const uniqueNamespaces = Array.from(new Set(
      namespaceList
        .map(namespace => String(namespace || '').trim())
        .filter(Boolean)
    ));

    if (!this.translations[normalizedLang]) {
      this.translations[normalizedLang] = {};
    }

    const toLoad = uniqueNamespaces.filter(namespace => (
      !this.loadedNamespaces.has(`${normalizedLang}:${namespace}`)
    ));

    if (toLoad.length === 0) return;

    const results = await Promise.allSettled(
      toLoad.map(namespace => this._fetchNamespace(normalizedLang, namespace))
    );

    results.forEach((result, index) => {
      const namespace = toLoad[index];

      if (result.status === 'fulfilled' && result.value) {
        Object.assign(this.translations[normalizedLang], result.value);
        this.loadedNamespaces.add(`${normalizedLang}:${namespace}`);
      } else {
        console.warn(
          `[i18n] Failed to load ${normalizedLang}/${namespace}.json from ${this.basePath}`,
          result.reason || ''
        );
      }
    });
  }

  async _fetchNamespace(lang, namespace) {
    const url = new URL(
      `${encodeURIComponent(lang)}/${encodeURIComponent(namespace)}.json`,
      this.basePath
    ).href;

    const response = await fetch(url, {
      cache: 'no-cache'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${url}`);
    }

    return response.json();
  }

  setupEventListeners() {
    if (this.eventsBound) return;
    this.eventsBound = true;

    const langSwitcher = document.getElementById('langSwitcher');
    const langDropdown = document.getElementById('langDropdown');

    if (langSwitcher && langDropdown) {
      const btn = langSwitcher.querySelector('.lang-switcher__btn');

      if (btn && btn.dataset.i18nBound !== 'true') {
        btn.dataset.i18nBound = 'true';

        btn.addEventListener('click', event => {
          event.stopPropagation();

          const isActive = langDropdown.classList.toggle('active');
          btn.setAttribute('aria-expanded', String(isActive));
        });
      }

      langDropdown.querySelectorAll('.lang-dropdown__item').forEach(item => {
        if (item.dataset.i18nBound === 'true') return;

        item.dataset.i18nBound = 'true';

        item.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();

          const lang = item.dataset.lang;

          if (lang) {
            this.setLanguage(lang);
          }

          langDropdown.classList.remove('active');

          if (btn) {
            btn.setAttribute('aria-expanded', 'false');
          }
        });
      });

      document.addEventListener('click', event => {
        if (!langSwitcher.contains(event.target)) {
          langDropdown.classList.remove('active');

          if (btn) {
            btn.setAttribute('aria-expanded', 'false');
          }
        }
      });

      document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;

        if (langDropdown.classList.contains('active')) {
          langDropdown.classList.remove('active');

          if (btn) {
            btn.setAttribute('aria-expanded', 'false');
            btn.focus();
          }
        }
      });
    }

    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
      if (btn.dataset.i18nBound === 'true') return;

      btn.dataset.i18nBound = 'true';

      btn.addEventListener('click', event => {
        event.preventDefault();

        const lang = btn.dataset.lang;

        if (lang) {
          this.setLanguage(lang);
        }
      });
    });
  }

  async setLanguage(lang) {
    const normalizedLang = this.normalizeLang(lang);
    const token = ++this.languageChangeToken;

    this.currentLang = normalizedLang;
    this._setStorageItem('wiki-lang', normalizedLang);

    document.documentElement.lang = normalizedLang;
    this.updateUIState();

    const namespaces = this._detectPageNamespaces();

    await this.loadNamespaces(normalizedLang, namespaces);

    if (normalizedLang !== 'ru') {
      await this.loadNamespaces('ru', namespaces);
    }

    if (token !== this.languageChangeToken) return;

    this.translatePage();
    this.updateUIState();
    this.updateArtifactNames();

    document.dispatchEvent(new CustomEvent('languageChanged', {
      detail: {
        lang: normalizedLang
      }
    }));
  }

  updateUIState() {
    document.querySelectorAll('#currentLang, .lang-switcher__current').forEach(currentLangEl => {
      currentLangEl.textContent = this.currentLang.toUpperCase();
    });

    document.querySelectorAll('.lang-dropdown__item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
    });

    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
    });
  }

  translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = this._getTranslationValue(this.currentLang, key);

      if (val === undefined) return;

      const text = String(val);

      if (el.hasAttribute('data-i18n-html') || text.includes('<') || text.includes('&')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    document.querySelectorAll('[data-placeholder-i18n]').forEach(el => {
      const key = el.dataset.placeholderI18n;
      const val = this._getTranslationValue(this.currentLang, key);

      if (val !== undefined) {
        el.placeholder = String(val);
      }
    });

    document.querySelectorAll('[data-title-i18n]').forEach(el => {
      const key = el.dataset.titleI18n;
      const val = this._getTranslationValue(this.currentLang, key);

      if (val !== undefined) {
        el.title = String(val);
      }
    });

    document.querySelectorAll('[data-aria-label-i18n]').forEach(el => {
      const key = el.dataset.ariaLabelI18n;
      const val = this._getTranslationValue(this.currentLang, key);

      if (val !== undefined) {
        el.setAttribute('aria-label', String(val));
      }
    });
  }

  updateArtifactNames() {
    const isEnglish = this.currentLang === 'en';

    document.querySelectorAll('.artifact-name').forEach(nameEl => {
      const ruName = nameEl.querySelector('.artifact-name__ru');
      const enName = nameEl.querySelector('.artifact-name__en');

      if (!ruName || !enName) return;

      if (isEnglish) {
        ruName.style.display = 'none';
        enName.style.display = 'block';
        enName.style.fontSize = '14px';
        enName.style.color = 'var(--c-text)';
      } else {
        ruName.style.display = 'block';
        enName.style.display = 'block';
        enName.style.fontSize = '';
        enName.style.color = '';
      }
    });
  }

  _getTranslationValue(lang, key) {
    const normalizedLang = this.normalizeLang(lang);
    const dict = this.translations[normalizedLang];

    if (
      dict &&
      Object.prototype.hasOwnProperty.call(dict, key)
    ) {
      return dict[key];
    }

    if (normalizedLang !== 'ru') {
      const ruDict = this.translations.ru;

      if (
        ruDict &&
        Object.prototype.hasOwnProperty.call(ruDict, key)
      ) {
        return ruDict[key];
      }
    }

    return undefined;
  }

  _escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  t(key, params = {}) {
    let val = this._getTranslationValue(this.currentLang, key);

    if (val === undefined) {
      val = key;
    }

    let text = String(val);

    Object.keys(params || {}).forEach(param => {
      const regex = new RegExp(`\\{${this._escapeRegExp(param)}\\}`, 'g');
      text = text.replace(regex, () => String(params[param]));
    });

    return text;
  }

  getCurrentLang() {
    return this.currentLang;
  }

  isEnglish() {
    return this.currentLang === 'en';
  }

  isRussian() {
    return this.currentLang === 'ru';
  }

  async loadAdditionalNamespace(namespace) {
    const namespaces = Array.isArray(namespace) ? namespace : [namespace];

    await this.loadNamespaces(this.currentLang, namespaces);

    if (this.currentLang !== 'ru') {
      await this.loadNamespaces('ru', namespaces);
    }

    this.translatePage();
    this.updateArtifactNames();
  }

  refresh() {
    this.translatePage();
    this.updateUIState();
    this.updateArtifactNames();
  }
}

const i18n = new I18n();
window.i18n = i18n;

window.setLanguage = function(lang) {
  return i18n.setLanguage(lang);
};

window.toggleLangDropdown = window.toggleLangDropdown || function() {
  const dropdown = document.getElementById('langDropdown');
  const switcher = document.getElementById('langSwitcher');
  const button = switcher ? switcher.querySelector('.lang-switcher__btn') : null;

  if (!dropdown || !switcher) return;

  const isActive = dropdown.classList.toggle('active');

  if (button) {
    button.setAttribute('aria-expanded', String(isActive));
  }
};

function startI18n() {
  i18n.init().catch(error => {
    console.error('[i18n] Initialization failed:', error);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startI18n, { once: true });
} else {
  startI18n();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { I18n };
}