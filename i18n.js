'use strict';

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('wiki-lang') || 'ru';
    this.translations = {};
    this.loadedNamespaces = new Set();
    this.basePath = this._detectBasePath();
    this.ready = false;
    this.readyCallbacks = [];
  }

  _detectBasePath() {
    const path = window.location.pathname;
    if (path.includes('/Map/')) return '../locales';
    if (path.includes('/Table/')) return '../locales';
    if (path.includes('/Calculator/')) return '../locales';
    if (path.includes('/TTK/')) return '../locales';
    return 'locales';
  }

  _detectPageNamespaces() {
    const path = window.location.pathname;
    const namespaces = ['common'];
    if (path.includes('/Map/') || path.includes('/map')) {
      namespaces.push('map');
    } else if (path.includes('/Table/') || path.includes('/table')) {
      namespaces.push('artifacts');
    } else if (path.includes('/Calculator/') || path.includes('/calculator')) {
      namespaces.push('calculator', 'artifacts');
    } else if (path.includes('/TTK/') || path.includes('/ttk')) {
      namespaces.push('ttk');
    } else {
      namespaces.push('home');
    }
    return namespaces;
  }

  async init() {
    const namespaces = this._detectPageNamespaces();
    await this.loadNamespaces(this.currentLang, namespaces);
    this.translatePage();
    this.setupEventListeners();
    this.updateUIState();
    this.ready = true;
    this.readyCallbacks.forEach(cb => cb());
    this.readyCallbacks = [];
  }

  onReady(callback) {
    if (this.ready) {
      callback();
    } else {
      this.readyCallbacks.push(callback);
    }
  }

  async loadNamespaces(lang, namespaces) {
    const toLoad = namespaces.filter(ns => !this.loadedNamespaces.has(`${lang}:${ns}`));
    if (toLoad.length === 0) return;

    const results = await Promise.allSettled(
      toLoad.map(ns => this._fetchNamespace(lang, ns))
    );

    results.forEach((result, i) => {
      const ns = toLoad[i];
      if (result.status === 'fulfilled' && result.value) {
        if (!this.translations[lang]) {
          this.translations[lang] = {};
        }
        Object.assign(this.translations[lang], result.value);
        this.loadedNamespaces.add(`${lang}:${ns}`);
      } else {
        console.warn(`[i18n] Failed to load ${lang}/${ns}.json`);
      }
    });
  }

  async _fetchNamespace(lang, namespace) {
    const url = `${this.basePath}/${lang}/${namespace}.json`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${url}`);
    }
    return response.json();
  }

  setupEventListeners() {
    const langSwitcher = document.getElementById('langSwitcher');
    const langDropdown = document.getElementById('langDropdown');

    if (langSwitcher && langDropdown) {
      langSwitcher.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = langDropdown.classList.toggle('active');
        langSwitcher.setAttribute('aria-expanded', isActive);
      });

      document.addEventListener('click', () => {
        langDropdown.classList.remove('active');
        if (langSwitcher) langSwitcher.setAttribute('aria-expanded', 'false');
      });

      langDropdown.querySelectorAll('.lang-dropdown__item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.setLanguage(btn.dataset.lang);
          langDropdown.classList.remove('active');
          langSwitcher.setAttribute('aria-expanded', 'false');
        });
      });
    }

    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setLanguage(btn.dataset.lang);
      });
    });
  }

  async setLanguage(lang) {
    if (lang === this.currentLang && this.translations[lang]) return;

    this.currentLang = lang;
    localStorage.setItem('wiki-lang', lang);
    document.documentElement.lang = lang;

    const namespaces = this._detectPageNamespaces();
    await this.loadNamespaces(lang, namespaces);

    this.translatePage();
    this.updateUIState();
    this.updateArtifactNames();

    document.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { lang }
    }));
  }

  updateUIState() {
    const currentLangEl = document.getElementById('currentLang');
    if (currentLangEl) {
      currentLangEl.textContent = this.currentLang.toUpperCase();
    }

    document.querySelectorAll('.lang-dropdown__item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
    });

    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
    });
  }

  translatePage() {
    const dict = this.translations[this.currentLang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = dict[key];
      if (val !== undefined) {
        if (val.includes('<')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    document.querySelectorAll('[data-placeholder-i18n]').forEach(el => {
      const val = dict[el.dataset.placeholderI18n];
      if (val) el.placeholder = val;
    });

    document.querySelectorAll('[data-title-i18n]').forEach(el => {
      const val = dict[el.dataset.titleI18n];
      if (val) el.title = val;
    });
  }

  updateArtifactNames() {
    const isEnglish = this.currentLang === 'en';
    document.querySelectorAll('.artifact-name').forEach(nameEl => {
      const ruName = nameEl.querySelector('.artifact-name__ru');
      const enName = nameEl.querySelector('.artifact-name__en');
      if (ruName && enName) {
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
      }
    });
  }

  t(key, params = {}) {
    const dict = this.translations[this.currentLang];
    let val = (dict && dict[key]) || key;
    Object.keys(params).forEach(p => {
      val = val.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
    });
    return val;
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
    await this.loadNamespaces(this.currentLang, [namespace]);
  }
}

const i18n = new I18n();
window.i18n = i18n;

document.addEventListener('DOMContentLoaded', () => {
  i18n.init().catch(err => {
    console.error('[i18n] Initialization failed:', err);
  });
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { I18n };
}
