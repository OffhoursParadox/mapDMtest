'use strict';

const RF_FALLBACK_TRANSLATIONS = Object.freeze({
  ru: Object.freeze({
    'rf.mhz': 'МГц',
    'rf.junkyard': 'Свалка',
    'rf.agroprom': 'Агропром',
    'rf.darkHollow': 'Тёмная лощина',
    'rf.darkValley': 'Тёмная долина',
    'rf.redForest': 'Редколесье',
    'rf.wildTerritory': 'Дикая территория',
    'rf.yantar': 'Янтарь',
    'rf.meadow': 'Поляна',
    'rf.anthill': 'Муравейник',
    'rf.polissya': 'Полесское',
    'rf.militaryWarehouses': 'Военные склады',
    'rf.crater': 'Ледяная котловина',
    'updates.error': 'Не удалось загрузить обновления',
    'updates.empty': 'Обновлений пока нет'
  }),
  en: Object.freeze({
    'rf.mhz': 'MHz',
    'rf.junkyard': 'Dump',
    'rf.agroprom': 'Agroprom',
    'rf.darkHollow': 'Dark Hollow',
    'rf.darkValley': 'Dark Valley',
    'rf.redForest': 'Thinwood',
    'rf.wildTerritory': 'Wild Territory',
    'rf.yantar': 'Yantar',
    'rf.meadow': 'Glade',
    'rf.anthill': 'Anthill',
    'rf.polissya': 'Polesskoye',
    'rf.militaryWarehouses': 'Army Warehouses',
    'rf.crater': 'Frost Hollow',
    'updates.error': 'Failed to load updates',
    'updates.empty': 'No updates yet'
  })
});

const rfItemsData = Object.freeze([
  { frequency: 178, locationKey: 'rf.junkyard' },
  { frequency: 123, locationKey: 'rf.agroprom' },
  { frequency: 188, locationKey: 'rf.darkHollow' },
  { frequency: 141, locationKey: 'rf.darkValley' },
  { frequency: 157, locationKey: 'rf.redForest' },
  { frequency: 146, locationKey: 'rf.wildTerritory' },
  { frequency: 166, locationKey: 'rf.yantar' },
  { frequency: 202, locationKey: 'rf.meadow' },
  { frequency: 113, locationKey: 'rf.anthill' },
  { frequency: 217, locationKey: 'rf.polissya' },
  { frequency: 271, locationKey: 'rf.militaryWarehouses' },
  { frequency: 210, locationKey: 'rf.crater' }
]);

let homePageInitialized = false;
let rfI18nSyncInitialized = false;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomePage, { once: true });
} else {
  initHomePage();
}

function initHomePage() {
  if (homePageInitialized) return;
  homePageInitialized = true;

  if (typeof initBurgerMenu === 'function') initBurgerMenu();
  if (typeof initScrollEffects === 'function') initScrollEffects();
  if (typeof initLangDropdownClose === 'function') initLangDropdownClose();

  initRfFrequencies();
  initRfCopy();
  initRfI18nSync();
  loadUpdates();
  initPageAnimations();
}

function initPageAnimations() {
  document.querySelectorAll('.quick-card').forEach((card, index) => {
    card.style.setProperty('--quick-delay', `${120 + index * 75}ms`);
  });

  document.querySelectorAll('.rf-item').forEach((item, index) => {
    item.style.setProperty('--rf-delay', `${index * 42}ms`);
  });

  document.querySelectorAll('.rf-guide-card, .rf-guide-step').forEach((step, index) => {
    step.style.setProperty('--guide-card-delay', `${index * 70}ms`);
    step.style.setProperty('--guide-delay', `${index * 70}ms`);
  });

  const targets = document.querySelectorAll('.content-grid > *');
  if (!targets.length) return;

  targets.forEach(target => target.classList.add('reveal-pending'));

  if (!('IntersectionObserver' in window)) {
    targets.forEach(target => target.classList.add('anim-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(target => observer.observe(target));
}

function initRfFrequencies() {
  const grid = document.getElementById('rfFrequenciesGrid');
  const tpl = document.getElementById('rfItemTemplate');

  if (!grid) return;

  if (grid.dataset.rfInitialized === 'true') {
    translateRfFrequencyItems();
    return;
  }

  const fragment = document.createDocumentFragment();

  rfItemsData.forEach(({ frequency, locationKey }, index) => {
    const node = createRfItemFromTemplate(tpl);
    fillRfItemNode(node, frequency, locationKey, index);
    fragment.appendChild(node);
  });

  grid.textContent = '';
  grid.appendChild(fragment);
  grid.dataset.rfInitialized = 'true';

  translateRfFrequencyItems();
}

function createRfItemFromTemplate(template) {
  if (template && template.content && template.content.firstElementChild) {
    return template.content.firstElementChild.cloneNode(true);
  }

  return createRfItemNode();
}

function createRfItemNode() {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'rf-item';

  button.innerHTML = `
    <span class="rf-item__signal" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <span class="rf-item__content">
      <span class="rf-item__location"></span>
      <span class="rf-item__copy-state"></span>
    </span>

    <span class="rf-item__side">
      <span class="rf-item__value">
        <span class="rf-item__value-number"></span>
        <span class="rf-item__value-unit"></span>
      </span>

      <span class="rf-item__icon" aria-hidden="true">
        <svg class="rf-item__icon-copy" viewBox="0 0 24 24" fill="none">
          <path d="M8 8h10v10H8z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M6 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg class="rf-item__icon-check" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </span>
  `;

  return button;
}

function fillRfItemNode(node, frequency, locationKey, index) {
  const lang = getCurrentLang();
  const location = getTranslatedText(locationKey, lang);
  const unit = getTranslatedText('rf.mhz', lang);
  const defaultState = getRfCopyMessages(lang).defaultState;

  node.dataset.frequency = String(frequency);
  node.dataset.locationKey = locationKey;
  node.dataset.location = location;
  node.style.setProperty('--rf-delay', `${index * 42}ms`);

  if (node.tagName === 'BUTTON') {
    node.type = 'button';
  } else {
    if (!node.hasAttribute('role')) node.setAttribute('role', 'button');
    if (!node.hasAttribute('tabindex')) node.tabIndex = 0;
  }

  const locationEl = node.querySelector('.rf-item__location');
  if (locationEl) {
    locationEl.dataset.i18n = locationKey;
    locationEl.textContent = location;
    locationEl.title = location;
  }

  const numberEl = node.querySelector('.rf-item__value-number');
  if (numberEl) {
    numberEl.textContent = String(frequency);
  }

  const unitEl = node.querySelector('.rf-item__value-unit');
  if (unitEl) {
    unitEl.dataset.i18n = 'rf.mhz';
    unitEl.textContent = unit;
  }

  const stateElement = node.querySelector('.rf-item__copy-state');
  if (stateElement) {
    stateElement.textContent = defaultState;
  }

  updateRfItemAccessibility(node);
}

function initRfI18nSync() {
  if (rfI18nSyncInitialized) return;
  rfI18nSyncInitialized = true;

  translateRfFrequencyItems();

  document.addEventListener('languageChanged', () => {
    translateRfFrequencyItems();
  });

  window.addEventListener('pageshow', () => {
    translateRfFrequencyItems();
  });

  waitForI18nReady(() => {
    translateRfFrequencyItems();
  });
}

function translateRfFrequencyItems() {
  const lang = getCurrentLang();
  const unit = getTranslatedText('rf.mhz', lang);
  const defaultState = getRfCopyMessages(lang).defaultState;
  const copiedState = getRfCopyMessages(lang).copiedState;

  document.querySelectorAll('.rf-item').forEach(item => {
    const locationKey = item.dataset.locationKey || '';
    const frequency = item.dataset.frequency || '';
    const location = getTranslatedText(locationKey, lang);

    if (locationKey) {
      item.dataset.location = location;
    }

    const locationEl = item.querySelector('.rf-item__location');
    if (locationEl) {
      locationEl.dataset.i18n = locationKey;
      locationEl.textContent = location;
      locationEl.title = location;
    }

    const numberEl = item.querySelector('.rf-item__value-number');
    if (numberEl && frequency) {
      numberEl.textContent = frequency;
    }

    const unitEl = item.querySelector('.rf-item__value-unit');
    if (unitEl) {
      unitEl.dataset.i18n = 'rf.mhz';
      unitEl.textContent = unit;
    }

    const stateElement = item.querySelector('.rf-item__copy-state');
    if (stateElement) {
      stateElement.textContent = item.classList.contains('rf-item--copied')
        ? copiedState
        : defaultState;
    }

    updateRfItemAccessibility(item);
  });
}

function applyRfDefaultCopyText() {
  const lang = getCurrentLang();
  const defaultState = getRfCopyMessages(lang).defaultState;

  document.querySelectorAll('.rf-item').forEach(item => {
    if (item.classList.contains('rf-item--copied')) return;

    const stateElement = item.querySelector('.rf-item__copy-state');
    if (stateElement) {
      stateElement.textContent = defaultState;
    }

    updateRfItemAccessibility(item);
  });
}

function updateRfItemAccessibility(item) {
  const lang = getCurrentLang();
  const frequency = item.dataset.frequency || '';
  const locationKey = item.dataset.locationKey || '';
  const location = item.dataset.location || getTranslatedText(locationKey, lang);
  const unit = getTranslatedText('rf.mhz', lang);
  const defaultState = getRfCopyMessages(lang).defaultState;

  if (location && frequency) {
    item.title = `${location}: ${frequency} ${unit}`;
  }

  const ariaLabel = [
    location,
    frequency ? `${frequency} ${unit}` : '',
    defaultState
  ].filter(Boolean).join('. ');

  if (ariaLabel) {
    item.setAttribute('aria-label', ariaLabel);
  }
}

function waitForI18nReady(callback) {
  const run = () => {
    try {
      callback();
    } catch (error) {
      console.error('[RF] i18n sync failed:', error);
    }
  };

  if (window.i18n && typeof window.i18n.onReady === 'function') {
    window.i18n.onReady(run);
    return;
  }

  let attempts = 0;
  const maxAttempts = 80;
  const timer = window.setInterval(() => {
    attempts += 1;

    if (window.i18n && typeof window.i18n.onReady === 'function') {
      window.clearInterval(timer);
      window.i18n.onReady(run);
      return;
    }

    if (attempts >= maxAttempts) {
      window.clearInterval(timer);
    }
  }, 50);
}

function getTranslatedText(key, lang = getCurrentLang()) {
  if (!key) return '';

  const normalizedLang = normalizeRfLang(lang);
  const i18nValue = getI18nDictionaryValue(key, normalizedLang);

  if (i18nValue !== null && i18nValue !== undefined && i18nValue !== key) {
    return String(i18nValue);
  }

  const fallbackByLang = RF_FALLBACK_TRANSLATIONS[normalizedLang] || RF_FALLBACK_TRANSLATIONS.ru;
  const fallbackValue = fallbackByLang[key] || RF_FALLBACK_TRANSLATIONS.ru[key];

  return fallbackValue || key;
}

function getI18nDictionaryValue(key, lang) {
  const i18n = window.i18n;
  if (!i18n) return null;

  if (
    i18n.translations &&
    i18n.translations[lang] &&
    Object.prototype.hasOwnProperty.call(i18n.translations[lang], key)
  ) {
    return i18n.translations[lang][key];
  }

  if (
    typeof i18n.getCurrentLang === 'function' &&
    normalizeRfLang(i18n.getCurrentLang()) === lang &&
    typeof i18n.t === 'function'
  ) {
    const value = i18n.t(key);
    if (value && value !== key) {
      return value;
    }
  }

  return null;
}

function getCurrentLang() {
  if (window.i18n && typeof window.i18n.getCurrentLang === 'function') {
    return normalizeRfLang(window.i18n.getCurrentLang());
  }

  return normalizeRfLang(getStoredLang() || document.documentElement.lang || 'ru');
}

function getStoredLang() {
  try {
    return localStorage.getItem('wiki-lang');
  } catch (error) {
    return null;
  }
}

function normalizeRfLang(lang) {
  return String(lang || 'ru').toLowerCase().startsWith('en') ? 'en' : 'ru';
}

function initRfCopy() {
  const grid = document.getElementById('rfFrequenciesGrid');
  const liveRegion = document.getElementById('rfReceiverLive');

  if (grid && grid.dataset.rfCopyInitialized !== 'true') {
    grid.addEventListener('click', event => {
      const item = event.target.closest('.rf-item');
      if (!item || !grid.contains(item)) return;

      handleRfCopyClick(item, liveRegion);
    });

    grid.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      const item = event.target.closest('.rf-item');
      if (!item || !grid.contains(item)) return;
      if (item.tagName === 'BUTTON') return;

      event.preventDefault();
      handleRfCopyClick(item, liveRegion);
    });

    grid.dataset.rfCopyInitialized = 'true';
  } else if (!grid) {
    document.querySelectorAll('.rf-item').forEach(item => {
      bindRfItemDirectly(item, liveRegion);
    });
  }

  applyRfDefaultCopyText();
}

function bindRfItemDirectly(item, liveRegion) {
  if (item.dataset.rfCopyBound === 'true') return;

  item.addEventListener('click', () => {
    handleRfCopyClick(item, liveRegion);
  });

  if (item.tagName !== 'BUTTON') {
    item.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      event.preventDefault();
      handleRfCopyClick(item, liveRegion);
    });
  }

  item.dataset.rfCopyBound = 'true';
}

async function handleRfCopyClick(item, liveRegion) {
  const frequency = (item.dataset.frequency || '').trim();
  if (!frequency) return;

  const locationKey = item.dataset.locationKey || '';
  const locationElement = item.querySelector('.rf-item__location');
  const location = getTranslatedText(locationKey) ||
    item.dataset.location ||
    (locationElement ? locationElement.textContent.trim() : '');

  const copied = await copyTextToClipboard(frequency);
  showRfCopyFeedback(item, copied, location, frequency, liveRegion);
}

function showRfCopyFeedback(item, copied, location, frequency, liveRegion) {
  const lang = getCurrentLang();
  const messages = getRfCopyMessages(lang, location, frequency);
  const stateElement = item.querySelector('.rf-item__copy-state');

  if (item.copyResetTimeout) {
    window.clearTimeout(item.copyResetTimeout);
  }

  item.classList.remove('rf-item--copied');

  if (copied) {
    void item.offsetWidth;
    item.classList.add('rf-item--copied');
  }

  if (stateElement) {
    stateElement.textContent = copied ? messages.copiedState : messages.failedState;
  }

  if (liveRegion) {
    liveRegion.textContent = copied ? messages.successLive : messages.failedLive;
  }

  item.title = copied ? messages.successTooltip : messages.failedTooltip;

  item.copyResetTimeout = window.setTimeout(() => {
    item.classList.remove('rf-item--copied');

    const resetLang = getCurrentLang();
    const resetMessages = getRfCopyMessages(resetLang);

    if (stateElement) {
      stateElement.textContent = resetMessages.defaultState;
    }

    updateRfItemAccessibility(item);
  }, 1700);
}

function getRfCopyMessages(lang = getCurrentLang(), location = '', frequency = '') {
  const normalizedLang = normalizeRfLang(lang);

  if (normalizedLang === 'en') {
    return {
      defaultState: 'Tap to copy',
      copiedState: 'Copied',
      failedState: 'Copy failed',
      successTooltip: location ? `${location}: ${frequency} copied` : `${frequency} copied`,
      failedTooltip: 'Unable to copy frequency',
      successLive: location
        ? `Frequency ${frequency} for ${location} copied to clipboard`
        : `Frequency ${frequency} copied to clipboard`,
      failedLive: 'Unable to copy frequency'
    };
  }

  return {
    defaultState: 'Нажмите, чтобы скопировать',
    copiedState: 'Скопировано',
    failedState: 'Не удалось скопировать',
    successTooltip: location ? `${location}: ${frequency} скопировано` : `${frequency} скопировано`,
    failedTooltip: 'Не удалось скопировать частоту',
    successLive: location
      ? `Частота ${frequency} для локации ${location} скопирована`
      : `Частота ${frequency} скопирована`,
    failedLive: 'Не удалось скопировать частоту'
  };
}

async function copyTextToClipboard(text) {
  const value = String(text);

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (error) {
      // Fallback ниже.
    }
  }

  return fallbackCopy(value);
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.cssText = 'position:fixed;opacity:0;left:-9999px;top:-9999px';

  document.body.appendChild(textarea);

  const selection = document.getSelection();
  const selectedRange = selection && selection.rangeCount > 0
    ? selection.getRangeAt(0)
    : null;

  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  let copied = false;

  try {
    copied = document.execCommand('copy');
  } catch (error) {
    copied = false;
  }

  document.body.removeChild(textarea);

  if (selection && selectedRange) {
    selection.removeAllRanges();
    selection.addRange(selectedRange);
  }

  return copied;
}

function loadUpdates() {
  const container = document.getElementById('updatesContent');
  if (!container) return;

  fetch('updates.json', { cache: 'no-cache' })
    .then(response => {
      if (!response.ok) throw new Error(String(response.status));
      return response.json();
    })
    .then(updates => {
      renderUpdates(updates, container);

      document.addEventListener('languageChanged', () => {
        renderUpdates(updates, container);
      });

      waitForI18nReady(() => {
        renderUpdates(updates, container);
      });
    })
    .catch(() => {
      renderUpdatesError(container);

      document.addEventListener('languageChanged', () => {
        renderUpdatesError(container);
      });

      waitForI18nReady(() => {
        renderUpdatesError(container);
      });
    });
}

function renderUpdatesError(container) {
  const lang = getCurrentLang();
  const errorText = getTranslatedText('updates.error', lang);

  container.innerHTML = `
    <div class="updates-block__error">
      <span>!</span>
      <div>${escapeHTML(errorText)}</div>
    </div>
  `;
}

function renderUpdates(updates, container) {
  const lang = getCurrentLang();

  if (!Array.isArray(updates) || updates.length === 0) {
    const emptyText = getTranslatedText('updates.empty', lang);

    container.innerHTML = `
      <div class="updates-block__empty">
        ${escapeHTML(emptyText)}
      </div>
    `;
    return;
  }

  container.innerHTML = updates.map((entry, index) => {
    const date = escapeHTML(localizeValue(entry.date, lang));
    const items = Array.isArray(entry.items) ? entry.items : [];
    const tag = `LOG ${String(index + 1).padStart(2, '0')}`;

    return `
      <article class="update-entry">
        <div class="update-entry__rail" aria-hidden="true">
          <span></span>
        </div>

        <div class="update-entry__body">
          <div class="update-entry__top">
            <time class="update-entry__date">${date}</time>
            <span class="update-entry__tag">${tag}</span>
          </div>

          <ul class="update-entry__list">
            ${items.map((item, itemIndex) => `
              <li>
                <span class="update-entry__bullet">${String(itemIndex + 1).padStart(2, '0')}</span>
                <span>${escapeHTML(localizeValue(item, lang))}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </article>
    `;
  }).join('');

  container.querySelectorAll('.update-entry').forEach((entry, index) => {
    entry.style.setProperty('--update-delay', `${Math.min(index * 75, 450)}ms`);
  });
}

function localizeValue(value, lang) {
  if (value && typeof value === 'object') {
    return value[lang] ?? value.ru ?? value.en ?? '';
  }

  return value ?? '';
}

function escapeHTML(value) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return String(value).replace(/[&<>"']/g, char => map[char]);
}
