'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initBurgerMenu();
    initScrollEffects();
    initLangDropdownClose();

    if (window.i18n && typeof window.i18n.onReady === 'function') {
        window.i18n.onReady(() => {
            initRfFrequencies();
            initRfCopy();
        });
    } else {
        document.addEventListener('languageChanged', () => {
            if (!document.querySelector('.rf-item')) {
                initRfFrequencies();
                initRfCopy();
            }
        }, { once: true });

        setTimeout(() => {
            if (!document.querySelector('.rf-item')) {
                initRfFrequencies();
                initRfCopy();
            }
        }, 500);
    }

    loadUpdates();
    initPageAnimations();
});

function initPageAnimations() {
    document.querySelectorAll('.quick-card').forEach((card, index) => {
        card.style.setProperty('--quick-delay', `${120 + index * 75}ms`);
    });
    document.querySelectorAll('.rf-item').forEach((item, index) => {
        item.style.setProperty('--rf-delay', `${index * 42}ms`);
    });
    document.querySelectorAll('.rf-guide-step').forEach((step, index) => {
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
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(target => observer.observe(target));
}

const rfItemsData = [
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
];

const rfFallbackNames = {
    ru: {
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
        'rf.crater': 'Ледяная котловина'
    },
    en: {
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
        'rf.crater': 'Frost Hollow'
    }
};

function getLocationName(locationKey) {
    const lang = window.i18n ? window.i18n.getCurrentLang() : (localStorage.getItem('wiki-lang') || 'ru');

    if (window.i18n && typeof window.i18n.t === 'function') {
        const translated = window.i18n.t(locationKey);
        if (translated && translated !== locationKey) {
            return translated;
        }
    }

    const fallbackDict = rfFallbackNames[lang] || rfFallbackNames.ru;
    return fallbackDict[locationKey] || locationKey;
}

function initRfFrequencies() {
    const grid = document.getElementById('rfFrequenciesGrid');
    const tpl = document.getElementById('rfItemTemplate');
    if (!grid || !tpl) return;

    grid.innerHTML = '';

    const fragment = document.createDocumentFragment();

    rfItemsData.forEach(({ frequency, locationKey }, index) => {
        const node = tpl.content.firstElementChild.cloneNode(true);
        node.dataset.frequency = String(frequency);
        node.dataset.locationKey = locationKey;
        node.style.setProperty('--rf-delay', `${index * 42}ms`);

        const locationEl = node.querySelector('.rf-item__location');
        if (locationEl) {
            locationEl.dataset.i18n = locationKey;
            locationEl.textContent = getLocationName(locationKey);
        }

        const numberEl = node.querySelector('.rf-item__value-number');
        if (numberEl) numberEl.textContent = String(frequency);

        fragment.appendChild(node);
    });

    grid.appendChild(fragment);

    if (window.i18n && typeof window.i18n.translatePage === 'function' && window.i18n.ready) {
        window.i18n.translatePage();
    }

    document.addEventListener('languageChanged', updateRfLocationNames);
}

function updateRfLocationNames() {
    document.querySelectorAll('.rf-item').forEach(item => {
        const locationKey = item.dataset.locationKey;
        const locationEl = item.querySelector('.rf-item__location');
        if (locationKey && locationEl) {
            locationEl.textContent = getLocationName(locationKey);
        }
    });
}

function initRfCopy() {
    const liveRegion = document.getElementById('rfReceiverLive');

    const applyDefaultText = () => {
        const lang = window.i18n ? window.i18n.getCurrentLang() : (localStorage.getItem('wiki-lang') || 'ru');
        const defaultState = getRfCopyMessages(lang).defaultState;
        document.querySelectorAll('.rf-item').forEach(item => {
            if (item.classList.contains('rf-item--copied')) return;
            const stateElement = item.querySelector('.rf-item__copy-state');
            if (stateElement) stateElement.textContent = defaultState;
        });
    };

    document.querySelectorAll('.rf-item').forEach(item => {
        item.addEventListener('click', async () => {
            const frequency = item.dataset.frequency || '';
            const locationKey = item.dataset.locationKey || '';
            const location = locationKey
                ? getLocationName(locationKey)
                : (item.dataset.location || '');

            if (!frequency) return;
            const copied = await copyTextToClipboard(frequency);
            showRfCopyFeedback(item, copied, location, frequency, liveRegion);
        });
    });

    applyDefaultText();
    document.addEventListener('languageChanged', applyDefaultText);
}

function showRfCopyFeedback(item, copied, location, frequency, liveRegion) {
    const lang = window.i18n ? window.i18n.getCurrentLang() : (localStorage.getItem('wiki-lang') || 'ru');
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

    item.copyResetTimeout = window.setTimeout(() => {
        item.classList.remove('rf-item--copied');
        if (stateElement) {
            stateElement.textContent = messages.defaultState;
        }
    }, 1700);
}

function getRfCopyMessages(lang, location = '', frequency = '') {
    if (lang === 'en') {
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
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {}
    }
    return fallbackCopy(text);
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:fixed;opacity:0;left:-9999px;top:-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    let copied = false;
    try {
        copied = document.execCommand('copy');
    } catch (error) {
        copied = false;
    }
    document.body.removeChild(textarea);
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
            document.addEventListener('languageChanged', () => renderUpdates(updates, container));
        })
        .catch(() => {
            const lang = window.i18n ? window.i18n.getCurrentLang() : (localStorage.getItem('wiki-lang') || 'ru');
            const errorKey = 'updates.error';
            const errorText = window.i18n ? window.i18n.t(errorKey) : (lang === 'en' ? 'Failed to load updates' : 'Не удалось загрузить обновления');
            container.innerHTML = `
                <div class="updates-block__error">
                    <span>!</span>
                    <p>${errorText}</p>
                </div>
            `;
        });
}

function renderUpdates(updates, container) {
    const lang = window.i18n ? window.i18n.getCurrentLang() : (localStorage.getItem('wiki-lang') || 'ru');

    if (!Array.isArray(updates) || updates.length === 0) {
        const emptyKey = 'updates.empty';
        const emptyText = window.i18n ? window.i18n.t(emptyKey) : (lang === 'en' ? 'No updates yet' : 'Обновлений пока нет');
        container.innerHTML = `
            <div class="updates-block__empty">
                <p>${emptyText}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = updates.map((entry, index) => {
        const date = escapeHTML(localizeValue(entry.date, lang));
        const items = Array.isArray(entry.items) ? entry.items : [];
        const version = entry.version ? escapeHTML(entry.version) : `1.0.${updates.length - index}`;
        const tag = `v${version}`;
        return `
            <article class="update-entry">
                <div class="update-entry__rail"><span></span></div>
                <div class="update-entry__body">
                    <div class="update-entry__top">
                        <span class="update-entry__date">${date}</span>
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
        return value[lang] || value.ru || value.en || '';
    }
    return value || '';
}

function escapeHTML(value) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(value).replace(/[&<>"']/g, char => map[char]);
}