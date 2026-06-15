'use strict';

const state = {
    selectedArmor: null,
    selectedContainer: null,
    artifacts: [],
    currentSlotIndex: null,
    previousStats: null,
    enhancementLevel: 0,
    filters: {
        category: 'all',
        search: '',
        positiveEffect: '',
        negativeEffect: ''
    },
    filtersExpanded: false,
    armorModalPreviewId: null,
    armorModalTypeFilter: 'all'
};

let armorModalSearchTimer = null;
let lastArmorDetailId = null;

let elements = {};

const STORAGE_KEY = 'cataclysmCalculatorState';
const DEFAULT_CONTAINER_ID = 'container_radiy';
const PRIORITY_STATS = ['regeneration', 'bleeding', 'radiation', 'saturation', 'cold'];
const HERO_STATS = ['regeneration', 'bulletResistance', 'impactResistance', 'tearProtection'];
const BASE_HP = 100;
const BULLET_RESISTANCE_CONSTANT = 166.67;
const RARITY_ORDER = ['legendary', 'unique', 'rare', 'collection', 'uncommon', 'common', 'none'];

const WARNING_STATS = {
    radiation: { threshold: 0, titleKey: 'calc.warning.radiationDamage', unitKey: 'calc.unit.msvSec' },
    cold: { threshold: 0, titleKey: 'calc.warning.coldDamage', unitKey: 'calc.unit.perSec' },
    bleeding: { threshold: 0, titleKey: 'calc.warning.bleedingDamage', unitKey: 'calc.unit.perSec' },
    regeneration: { threshold: 0, titleKey: 'calc.warning.healthLossDamage', unitKey: 'calc.unit.percentSec', inverted: true },
    saturation: { threshold: 0, titleKey: 'calc.warning.saturationDamage', unitKey: 'calc.unit.percentSec', inverted: true }
};

const RARITY_KEYS = {
    legendary: 'calc.rarity.legendary',
    unique: 'calc.rarity.unique',
    rare: 'calc.rarity.rare',
    collection: 'calc.rarity.collection',
    uncommon: 'calc.rarity.uncommon',
    common: 'calc.rarity.common',
    none: 'calc.rarity.none'
};

const CONTAINER_TYPE_ICONS = {
    standard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    bulky: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M12 7v10"/><path d="M7 12h2"/><path d="M15 12h2"/></svg>`,
    compact: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/><circle cx="12" cy="12" r="3"/></svg>`,
    spacious: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><ellipse cx="12" cy="19" rx="9" ry="3"/></svg>`
};

function t(key, params = {}) {
    if (window.i18n && typeof window.i18n.t === 'function') {
        return window.i18n.t(key, params);
    }
    return key;
}

const STAT_ICONS = {
    radiationProtection: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>',
    bioProtection: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/></svg>',
    thermalProtection: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v10l3 3"/><circle cx="12" cy="14" r="8"/></svg>',
    psiProtection: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12l8-8"/></svg>',
    frostProtection: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>',
    heatResistance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/></svg>',
    chemResistance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/></svg>',
    electroResistance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    impactResistance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    tearProtection: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    bulletResistance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    regeneration: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    bleeding: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
    radiation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/></svg>',
    saturation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>',
    cold: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>',
    maxStamina: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    staminaRegen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>',
    moveSpeed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    maxWeight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>'
};

function getStatIcon(statKey) {
    return STAT_ICONS[statKey] || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>';
}

const ARMOR_DEFAULT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
const ARMOR_EMPTY_IMAGE = '../Table/Armors/empty.png';

function getArmorImagePath(armor) {
    if (armor?.image && armor?.imageFolder) {
        return `../Table/${armor.imageFolder}/${armor.image}`;
    }
    if (armor?.id) {
        return `../Table/Armors/${armor.id}.png`;
    }
    return null;
}

function getArmorCardIcon(armor, iconClass = 'armor-card__icon', imgClass = 'armor-card__img', fallbackClass = 'armor-card__icon-fallback') {
    const imagePath = getArmorImagePath(armor);
    if (!imagePath) {
        return `<span class="${iconClass}">${ARMOR_DEFAULT_ICON}</span>`;
    }
    return `<span class="${iconClass}"><img class="${imgClass}" src="${imagePath}" alt="" loading="lazy" decoding="async"><span class="${fallbackClass}" hidden>${ARMOR_DEFAULT_ICON}</span></span>`;
}

function bindArmorCardFallbacks(listElement, imgClass = 'armor-card__img', fallbackClass = 'armor-card__icon-fallback') {
    if (!listElement) return;
    listElement.querySelectorAll(`.${imgClass}`).forEach(img => {
        img.onerror = () => {
            img.remove();
            const fallback = img.parentElement?.querySelector(`.${fallbackClass}`);
            if (fallback) fallback.hidden = false;
        };
    });
}

function getContainerDropdownIcon(container) {
    const imagePath = getContainerImagePath(container, '../Table/');
    const typeIcon = CONTAINER_TYPE_ICONS[container.type] || CONTAINER_TYPE_ICONS.standard;

    if (!imagePath) return `<span class="container-card__icon">${typeIcon}</span>`;

    return `<img class="container-card__img" src="${imagePath}" alt=""><span class="container-card__icon-fallback" hidden>${typeIcon}</span>`;
}

function bindContainerIconFallbacks(listElement) {
    if (!listElement) return;
    listElement.querySelectorAll('.container-card__img').forEach(img => {
        img.onerror = () => {
            img.remove();
            const fallback = img.parentElement?.querySelector('.container-card__icon-fallback');
            if (fallback) fallback.hidden = false;
        };
    });
}

const CONTAINER_BAR_DEFAULT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`;

function renderContainerBarPreviewContent(container) {
    const imagePath = getContainerImagePath(container, '../Table/');
    const typeIcon = CONTAINER_TYPE_ICONS[container.type] || CONTAINER_TYPE_ICONS.standard;

    if (imagePath) {
        return `<img class="container-bar__img" src="${imagePath}" alt="${getLocalizedName(container)}"><span class="container-bar__fallback" hidden>${typeIcon}</span>`;
    }

    return `<span class="container-bar__icon">${typeIcon}</span>`;
}

function bindContainerBarPreviewFallbacks() {
    if (!elements.containerPickerPreview) return;
    const img = elements.containerPickerPreview.querySelector('.container-bar__img');
    const fallback = elements.containerPickerPreview.querySelector('.container-bar__fallback');
    if (img && fallback) {
        img.onerror = () => {
            img.remove();
            fallback.hidden = false;
        };
    }
}

function getRaritySortIndex(rarity) {
    const idx = RARITY_ORDER.indexOf(rarity || 'none');
    return idx === -1 ? RARITY_ORDER.length : idx;
}

function sortArmorsByRarity(armors) {
    return [...armors].sort((a, b) => {
        const diff = getRaritySortIndex(a.rarity) - getRaritySortIndex(b.rarity);
        if (diff !== 0) return diff;
        return getLocalizedName(a).localeCompare(getLocalizedName(b), undefined, { sensitivity: 'base' });
    });
}

function updateArmorBar() {
    if (!elements.armorPickerName) return;

    RARITY_ORDER.forEach(r => elements.armorPickerName.classList.remove(`rarity--${r}`));

    if (!state.selectedArmor) {
        elements.armorPickerName.textContent = t('calc.selectArmor');
        elements.armorPickerName.classList.remove('has-value');
        if (elements.armorClearBtn) elements.armorClearBtn.style.display = 'none';
        return;
    }

    elements.armorPickerName.textContent = getLocalizedName(state.selectedArmor);
    elements.armorPickerName.classList.add('has-value');
    elements.armorPickerName.classList.add(`rarity--${state.selectedArmor.rarity || 'none'}`);
    if (elements.armorClearBtn) elements.armorClearBtn.style.display = 'flex';
}

function sortContainersByRarity(containers) {
    return [...containers].sort((a, b) => {
        const diff = getRaritySortIndex(a.rarity) - getRaritySortIndex(b.rarity);
        if (diff !== 0) return diff;
        return getLocalizedName(a).localeCompare(getLocalizedName(b), undefined, { sensitivity: 'base' });
    });
}

function hasFilledArtifacts() {
    return state.artifacts.some(artifact => artifact !== null);
}

function updateClearArtifactsButton() {
    if (!elements.clearArtifactsBtn) return;
    const visible = state.selectedContainer && hasFilledArtifacts();
    elements.clearArtifactsBtn.style.display = visible ? 'flex' : 'none';
}

function setContainerBarRarity(rarity) {
    RARITY_ORDER.forEach(r => {
        elements.containerPickerBtn.classList.remove(`container-bar__select--rarity-${r}`);
        elements.containerPickerName.classList.remove(`rarity--${r}`);
    });

    if (!state.selectedContainer) return;

    const rarityClass = rarity || 'none';
    elements.containerPickerBtn.classList.add(`container-bar__select--rarity-${rarityClass}`);
    elements.containerPickerName.classList.add(`rarity--${rarityClass}`);
}

function renderArmorPreview() {
    if (!elements.armorPreview) return;

    const shieldSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;

    if (!state.selectedArmor) {
        elements.armorPreview.innerHTML = `<img class="calc-preview__img" src="${ARMOR_EMPTY_IMAGE}" alt=""><div class="calc-preview__fallback calc-preview__placeholder">${shieldSvg}</div>`;
        const img = elements.armorPreview.querySelector('img');
        const fallback = elements.armorPreview.querySelector('.calc-preview__fallback');
        if (img && fallback) {
            fallback.hidden = true;
            img.onerror = () => { img.remove(); fallback.hidden = false; };
        }
        return;
    }

    const armor = state.selectedArmor;
    const imagePath = getArmorImagePath(armor);

    if (imagePath) {
        elements.armorPreview.innerHTML = `<img class="calc-preview__img" src="${imagePath}" alt="${getLocalizedName(armor)}"><div class="calc-preview__fallback">${shieldSvg}</div>`;
        const img = elements.armorPreview.querySelector('img');
        const fallback = elements.armorPreview.querySelector('.calc-preview__fallback');
        if (img && fallback) {
            fallback.hidden = true;
            img.onerror = () => { img.remove(); fallback.hidden = false; };
        }
    } else {
        elements.armorPreview.innerHTML = `<div class="calc-preview__placeholder">${shieldSvg}</div>`;
    }
}

function renderContainerBar() {
    if (!elements.containerPickerPreview || !elements.containerPickerName) return;

    if (!state.selectedContainer) {
        elements.containerPickerPreview.innerHTML = `<span class="container-bar__icon container-bar__icon--empty">${CONTAINER_BAR_DEFAULT_ICON}</span>`;
        elements.containerPickerName.textContent = t('calc.selectContainer');
        elements.containerPickerName.classList.remove('has-value');
        elements.containerPickerBtn.classList.remove('container-bar__select--incompat');
        setContainerBarRarity(null);
        if (elements.containerPickerHint) {
            elements.containerPickerHint.hidden = true;
            elements.containerPickerHint.textContent = '';
        }
        updateClearArtifactsButton();
        return;
    }

    const container = state.selectedContainer;
    const incompat = !isContainerAvailable(container) && state.selectedArmor;

    elements.containerPickerPreview.innerHTML = renderContainerBarPreviewContent(container);
    bindContainerBarPreviewFallbacks();
    elements.containerPickerName.textContent = getLocalizedName(container);
    elements.containerPickerName.classList.add('has-value');
    setContainerBarRarity(container.rarity);
    elements.containerPickerBtn.classList.toggle('container-bar__select--incompat', incompat);

    if (elements.containerPickerHint) {
        if (incompat) {
            elements.containerPickerHint.textContent = t('calc.containerIncompatible');
            elements.containerPickerHint.hidden = false;
        } else {
            elements.containerPickerHint.hidden = true;
            elements.containerPickerHint.textContent = '';
        }
    }

    updateClearArtifactsButton();
}

function buildCompactStatRow(statKey, value, enhancementBonus = 0, options = {}) {
    const totalValue = value + enhancementBonus;
    const { displayValue, colorClass } = formatStatValue(statKey, totalValue);
    let bonusHtml = '';
    if (enhancementBonus !== 0) {
        const bonusStr = enhancementBonus > 0 ? `+${formatNumber(enhancementBonus)}` : formatNumber(enhancementBonus);
        bonusHtml = `<span class="stat-enhancement-bonus">(${bonusStr})</span>`;
    }
    const iconHtml = options.compact
        ? ''
        : `<span class="calc-stat-row__icon">${getStatIcon(statKey)}</span>`;
    return `<div class="calc-stat-row${options.compact ? ' calc-stat-row--compact' : ''}"><div class="calc-stat-row__left">${iconHtml}<span class="calc-stat-row__name">${getStatName(statKey)}</span></div><span class="calc-stat-row__value ${colorClass}">${displayValue}${getStatUnit(statKey)}${bonusHtml}</span></div>`;
}

// Приведённое здоровье: EHP = BASE_HP / (1 - reduction%)
// reduction% = BR / (BR + BULLET_RESISTANCE_CONSTANT) при BR > 0
function calculateEffectiveHealth(bulletResistance) {
    if (bulletResistance <= 0) return BASE_HP;
    const reduction = bulletResistance / (bulletResistance + BULLET_RESISTANCE_CONSTANT);
    if (reduction >= 0.99) return Math.round(BASE_HP * 100);
    return Math.round(BASE_HP / (1 - reduction));
}

function initElements() {
    elements = {
        armorSelect: document.getElementById('armorSelect'),
        armorPreview: document.getElementById('armorPreview'),
        armorPickerBtn: document.getElementById('armorPickerBtn'),
        armorPickerName: document.getElementById('armorPickerName'),
        armorClearBtn: document.getElementById('armorClearBtn'),
        armorModal: document.getElementById('armorModal'),
        armorModalClose: document.getElementById('armorModalClose'),
        armorModalSearch: document.getElementById('armorModalSearch'),
        armorSearchClear: document.getElementById('armorSearchClear'),
        armorModalList: document.getElementById('armorModalList'),
        armorModalDetail: document.getElementById('armorModalDetail'),
        armorTypeTabs: document.querySelectorAll('#armorTypeTabs .category-tab'),
        containerSelect: document.getElementById('containerSelect'),
        containerPickerBtn: document.getElementById('containerPickerBtn'),
        containerPickerPreview: document.getElementById('containerPickerPreview'),
        containerPickerName: document.getElementById('containerPickerName'),
        containerPickerHint: document.getElementById('containerPickerHint'),
        clearArtifactsBtn: document.getElementById('clearArtifactsBtn'),
        clearArtifactsConfirm: document.getElementById('clearArtifactsConfirm'),
        clearArtifactsCancel: document.getElementById('clearArtifactsCancel'),
        clearArtifactsConfirmBtn: document.getElementById('clearArtifactsConfirmBtn'),
        artifactSlots: document.getElementById('artifactSlots'),
        artifactCounter: document.getElementById('artifactCounter'),
        resetBtn: document.getElementById('resetBtn'),
        modal: document.getElementById('artifactModal'),
        modalClose: document.getElementById('modalClose'),
        modalSlotInfo: document.getElementById('modalSlotInfo'),
        artifactSearch: document.getElementById('artifactSearch'),
        searchClear: document.getElementById('searchClear'),
        artifactList: document.getElementById('artifactList'),
        artifactCount: document.getElementById('artifactCount'),
        categoryTabs: document.querySelectorAll('#categoryTabs .category-tab'),
        scrollTop: document.getElementById('scrollTop'),
        warningsContainer: document.getElementById('warningsContainer'),
        effectiveHealth: document.getElementById('effectiveHealth'),
        armorPanelRow: document.getElementById('armorPanelRow'),
        enhancementBlock: document.getElementById('enhancementBlock'),
        enhancementSlider: document.getElementById('enhancementSlider'),
        enhancementValue: document.getElementById('enhancementValue'),
        containerModal: document.getElementById('containerModal'),
        containerModalClose: document.getElementById('containerModalClose'),
        containerModalSearch: document.getElementById('containerModalSearch'),
        containerSearchClear: document.getElementById('containerSearchClear'),
        containerModalList: document.getElementById('containerModalList')
    };

    elements.statValueElements = {};
    document.querySelectorAll('[data-stat]').forEach(el => {
        elements.statValueElements[el.dataset.stat] = el;
    });
    elements.heroStatElements = {};
    document.querySelectorAll('[data-hero-stat]').forEach(el => {
        elements.heroStatElements[el.dataset.heroStat] = el;
    });
}


function saveStateToStorage() {
    try {
        const dataToSave = {
            armorId: state.selectedArmor?.id || null,
            containerId: state.selectedContainer?.id || null,
            artifactIds: state.artifacts.map(a => a?.id || null),
            enhancementLevel: state.enhancementLevel
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
        console.warn('Failed to save state:', e);
    }
}

function loadStateFromStorage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch (e) {
        console.warn('Failed to load state:', e);
        return null;
    }
}

function restoreState() {
    const saved = loadStateFromStorage();

    if (saved) {
        if (saved.armorId) {
            const armor = ARMORS.find(a => a.id === saved.armorId);
            if (armor) {
                state.selectedArmor = armor;
                state.enhancementLevel = saved.enhancementLevel || 0;
                elements.armorSelect.value = saved.armorId;
                if (armor.enhancement) {
                    showEnhancementBlock();
                    elements.enhancementSlider.value = state.enhancementLevel;
                    updateEnhancementDisplay();
                }
                updateArmorBar();
                renderArmorPreview();
            }
        }

        if (saved.containerId) {
            const container = CONTAINERS.find(c => c.id === saved.containerId);
            if (container && isContainerAvailable(container)) {
                state.selectedContainer = container;
                state.artifacts = new Array(container.slots).fill(null);
                elements.containerSelect.value = saved.containerId;
                if (saved.artifactIds && Array.isArray(saved.artifactIds)) {
                    saved.artifactIds.forEach((artifactId, index) => {
                        if (artifactId && index < container.slots) {
                            const artifact = ARTIFACTS.find(a => a.id === artifactId);
                            if (artifact) state.artifacts[index] = artifact;
                        }
                    });
                }
            }
        }
    }

    updateContainerOptions();
    ensureDefaultContainer();

    updateArmorBar();
    renderArmorPreview();
    renderContainerBar();
    renderArtifactSlots();
    updateStats();

    if (!saved?.containerId && state.selectedContainer) {
        saveStateToStorage();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    if (typeof ARTIFACTS === 'undefined' || typeof ARMORS === 'undefined' || typeof CONTAINERS === 'undefined') {
        const main = document.querySelector('main');
        if (main) {
            const lang = (window.i18n && window.i18n.getCurrentLang()) || localStorage.getItem('wiki-lang') || 'ru';
            const errorMsg = lang === 'en' ? 'Failed to load game data' : 'Не удалось загрузить игровые данные';
            const retryMsg = lang === 'en' ? 'Try again' : 'Попробовать снова';
            main.innerHTML = `
                <div class="calculator-error">
                    <svg class="calculator-error__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <p class="calculator-error__text">${errorMsg}</p>
                    <button class="calculator-error__btn" onclick="location.reload()">${retryMsg}</button>
                </div>`;
        }
        return;
    }

    initElements();
    initBurgerMenu();
    initScrollEffects();
    initLangDropdownClose();
    injectStatFilterStyles();
    initArmorPicker();
    initContainerPicker();
    initContainerSelect();
    initEventListeners();

    if (window.i18n && typeof window.i18n.onReady === 'function') {
        window.i18n.onReady(restoreState);
    } else {
        restoreState();
    }
});


document.addEventListener('languageChanged', () => {
    updateArmorBar();
    initContainerSelect();
    renderArmorPreview();
    renderContainerBar();
    renderArtifactSlots();
    updateStats();

    if (elements.armorModal?.classList.contains('active')) {
        renderArmorModalList();
        renderArmorModalDetail(state.armorModalPreviewId, true);
    }

    if (elements.containerModal?.classList.contains('active')) {
        renderContainerModalList();
    }

    if (elements.modal.classList.contains('active')) {
        recreateStatFilters();
    }
});


function addStats(target, source) {
    Object.entries(source).forEach(([key, value]) => {
        if (target.hasOwnProperty(key)) target[key] += value;
    });
}

function createEmptyStats() {
    return {
        radiationProtection: 0, bioProtection: 0, thermalProtection: 0, psiProtection: 0, frostProtection: 0,
        heatResistance: 0, chemResistance: 0, electroResistance: 0,
        impactResistance: 0, tearProtection: 0, bulletResistance: 0,
        regeneration: 0, bleeding: 0, radiation: 0, saturation: 0, cold: 0,
        maxStamina: 0, staminaRegen: 0, moveSpeed: 0, maxWeight: 0
    };
}

function calculateTotalStats(options) {
    const includeArtifacts = !options || options.includeArtifacts !== false;
    const stats = createEmptyStats();

    if (state.selectedArmor) {
        addStats(stats, state.selectedArmor.stats);
        addStats(stats, getEnhancementBonuses());
    }
    if (state.selectedContainer) {
        addStats(stats, state.selectedContainer.stats);
        addStats(stats, state.selectedContainer.shielding);
    }
    if (includeArtifacts) {
        state.artifacts.forEach(artifact => {
            if (artifact) addStats(stats, artifact.stats);
        });
    }
    return stats;
}

function getEnhancementBonuses() {
    const bonuses = {};
    if (!state.selectedArmor?.enhancement || state.enhancementLevel === 0) return bonuses;
    Object.entries(state.selectedArmor.enhancement.bonuses).forEach(([statKey, values]) => {
        const bonusValue = values[state.enhancementLevel] || 0;
        if (bonusValue !== 0) bonuses[statKey] = bonusValue;
    });
    return bonuses;
}


function recreateStatFilters() {
    const container = document.getElementById('statFiltersContainer');
    const toggle = document.getElementById('filtersToggle');
    const wrapper = document.getElementById('statFiltersWrapper');
    if (container) container.remove();
    if (toggle) toggle.remove();
    if (wrapper) wrapper.remove();
    createStatFilters();
}

function injectStatFilterStyles() {
    if (document.getElementById('stat-filter-styles')) return;
    const style = document.createElement('style');
    style.id = 'stat-filter-styles';
    style.textContent = `
.filters-toggle{display:none;align-items:center;justify-content:space-between;padding:10px 14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;color:var(--color-text-muted);font-family:var(--font-main);font-size:13px;cursor:pointer;transition:all 0.2s ease;margin-bottom:0}
.filters-toggle:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.15)}
.filters-toggle.active{background:rgba(196,163,90,0.1);border-color:rgba(196,163,90,0.3);color:var(--color-accent)}
.filters-toggle__left{display:flex;align-items:center;gap:8px}
.filters-toggle__icon{display:flex;align-items:center;justify-content:center}
.filters-toggle__icon svg{width:16px;height:16px}
.filters-toggle__text{font-weight:500}
.filters-toggle__badge{display:none;align-items:center;justify-content:center;min-width:20px;height:20px;padding:0 6px;background:var(--color-accent);color:#000;font-size:11px;font-weight:700;border-radius:10px}
.filters-toggle__badge.visible{display:flex}
.filters-toggle__arrow{display:flex;align-items:center;transition:transform 0.2s ease}
.filters-toggle__arrow svg{width:18px;height:18px}
.filters-toggle.active .filters-toggle__arrow{transform:rotate(180deg)}
.stat-filters-wrapper{overflow:hidden;transition:max-height 0.3s ease,opacity 0.2s ease}
.stat-filters-wrapper.collapsed{max-height:0!important;opacity:0}
.stat-filters{display:flex;gap:12px;flex-wrap:wrap;padding-top:12px}
.stat-filter{display:flex;flex-direction:column;gap:6px;flex:1;min-width:180px}
.stat-filter__label{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:500;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.5px}
.stat-filter__label svg{width:14px;height:14px}
.stat-filter--positive .stat-filter__label{color:#4ade80}
.stat-filter--negative .stat-filter__label{color:#f87171}
.stat-filter__select{padding:10px 32px 10px 12px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:var(--color-text);font-family:var(--font-main);font-size:13px;cursor:pointer;transition:all 0.2s ease;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888899' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center}
.stat-filter__select:hover{border-color:rgba(255,255,255,0.2);background-color:rgba(0,0,0,0.5)}
.stat-filter__select:focus{outline:none;border-color:var(--color-accent)}
.stat-filter--positive .stat-filter__select:focus{border-color:#4ade80}
.stat-filter--negative .stat-filter__select:focus{border-color:#f87171}
.stat-filter__select option{background:#1a1a24;color:var(--color-text);padding:8px}
.stat-filters__reset{display:flex;align-items:flex-end;padding-bottom:2px}
.stat-filters__reset-btn{display:flex;align-items:center;justify-content:center;gap:6px;padding:10px 14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:var(--color-text-muted);font-family:var(--font-main);font-size:12px;cursor:pointer;transition:all 0.2s ease;white-space:nowrap}
.stat-filters__reset-btn:hover{background:rgba(248,113,113,0.1);border-color:rgba(248,113,113,0.3);color:#f87171}
.stat-filters__reset-btn svg{width:14px;height:14px}
.stat-filters__reset-btn:disabled{opacity:0.3;cursor:not-allowed}
.stat-filters__reset-btn:disabled:hover{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);color:var(--color-text-muted)}
.calculator-error{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px 20px 80px;text-align:center}
.calculator-error__icon{width:48px;height:48px;color:var(--color-text-muted);margin-bottom:16px}
.calculator-error__text{font-size:18px;color:var(--color-text-muted);margin-bottom:24px}
.calculator-error__btn{color:var(--color-accent);background:none;border:1px solid var(--color-accent);padding:12px 28px;border-radius:10px;cursor:pointer;font-size:14px;font-family:var(--font-main);transition:var(--transition)}
.calculator-error__btn:hover{background:rgba(196,163,90,0.15)}
@media(max-width:768px){
.filters-toggle{display:flex}
.modal__toolbar{padding:10px 14px;gap:10px}
.modal__search-box{padding:0 12px}
.modal__search-box input{padding:10px 8px;font-size:14px}
.modal__categories{gap:4px;padding-bottom:2px}
.category-tab{padding:6px 10px;font-size:12px;border-radius:8px}
.category-tab__label{font-size:11px}
.category-tab__dot{width:8px;height:8px}
.category-tab__icon svg{width:14px;height:14px}
.modal__results-info{padding:8px 14px}
.results-count{font-size:12px}
.stat-filters{flex-direction:column;gap:10px;padding-top:10px}
.stat-filter{min-width:100%;gap:4px}
.stat-filter__label{font-size:10px}
.stat-filter__select{padding:8px 28px 8px 10px;font-size:12px}
.stat-filters__reset{width:100%}
.stat-filters__reset-btn{width:100%;justify-content:center;padding:8px 12px;font-size:11px}
.modal__header{padding:12px 14px}
.modal__title{font-size:16px}
.modal__close{width:36px;height:36px}
.modal__body{padding:12px}
.artifacts-grid{gap:10px}
.artifact-card{padding:12px}
.artifact-card__image-wrapper{width:52px;height:52px}
.artifact-card__image{width:40px;height:40px}
.artifact-card__name{font-size:14px}
.artifact-card__tier{height:20px;min-width:24px;font-size:11px}
.artifact-stat-row{font-size:12px;padding:2px 0}
}
@media(max-width:480px){
.modal__toolbar{padding:8px 12px;gap:8px}
.modal__search-box input{padding:8px 6px;font-size:13px}
.category-tab{padding:5px 8px}
.category-tab__label{display:none}
.category-tab__dot,.category-tab__icon{margin:0}
.category-tab[data-category="all"] .category-tab__label{display:inline}
.modal__body{padding:10px}
.artifact-card__top{gap:10px}
.artifact-card__image-wrapper{width:48px;height:48px}
.artifact-card__image{width:36px;height:36px}
}`;
    document.head.appendChild(style);
}

function createStatFilters() {
    const toolbar = document.querySelector('.modal__toolbar');
    if (!toolbar || document.getElementById('statFiltersContainer')) return;

    const positiveStats = new Map();
    const negativeStats = new Map();

    ARTIFACTS.forEach(artifact => {
        Object.entries(artifact.stats).forEach(([statKey, value]) => {
            if (isPositiveEffect(statKey, value)) positiveStats.set(statKey, (positiveStats.get(statKey) || 0) + 1);
            if (isNegativeEffect(statKey, value)) negativeStats.set(statKey, (negativeStats.get(statKey) || 0) + 1);
        });
    });

    const sortedPositive = [...positiveStats.entries()].sort((a, b) => b[1] - a[1]);
    const sortedNegative = [...negativeStats.entries()].sort((a, b) => b[1] - a[1]);

    const createOptions = (statsMap) => {
        let options = `<option value="">${t('calc.filter.any')}</option>`;
        statsMap.forEach(([statKey, count]) => {
            options += `<option value="${statKey}">${getStatName(statKey)} (${count})</option>`;
        });
        return options;
    };

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'filtersToggle';
    toggleBtn.className = 'filters-toggle';
    toggleBtn.type = 'button';
    toggleBtn.innerHTML = `<div class="filters-toggle__left"><span class="filters-toggle__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></span><span class="filters-toggle__text">${t('calc.filter.byProperties')}</span><span class="filters-toggle__badge" id="filtersBadge">0</span></div><span class="filters-toggle__arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></span>`;

    const wrapper = document.createElement('div');
    wrapper.id = 'statFiltersWrapper';
    wrapper.className = 'stat-filters-wrapper collapsed';

    const container = document.createElement('div');
    container.id = 'statFiltersContainer';
    container.className = 'stat-filters';
    container.innerHTML = `<div class="stat-filter stat-filter--positive"><label class="stat-filter__label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>${t('calc.filter.positive')}</label><select class="stat-filter__select" id="positiveEffectFilter">${createOptions(sortedPositive)}</select></div><div class="stat-filter stat-filter--negative"><label class="stat-filter__label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>${t('calc.filter.negative')}</label><select class="stat-filter__select" id="negativeEffectFilter">${createOptions(sortedNegative)}</select></div><div class="stat-filters__reset"><button class="stat-filters__reset-btn" id="resetFiltersBtn" type="button" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>${t('calc.filter.resetAll')}</button></div>`;

    wrapper.appendChild(container);
    toolbar.appendChild(toggleBtn);
    toolbar.appendChild(wrapper);

    toggleBtn.addEventListener('click', toggleFiltersPanel);

    document.getElementById('positiveEffectFilter').addEventListener('change', (e) => {
        state.filters.positiveEffect = e.target.value;
        updateFiltersBadge();
        updateResetButtonState();
        applyFilters();
    });

    document.getElementById('negativeEffectFilter').addEventListener('change', (e) => {
        state.filters.negativeEffect = e.target.value;
        updateFiltersBadge();
        updateResetButtonState();
        applyFilters();
    });

    document.getElementById('resetFiltersBtn').addEventListener('click', resetAllFilters);
}

function toggleFiltersPanel() {
    const toggle = document.getElementById('filtersToggle');
    const wrapper = document.getElementById('statFiltersWrapper');
    if (!toggle || !wrapper) return;

    state.filtersExpanded = !state.filtersExpanded;
    toggle.classList.toggle('active', state.filtersExpanded);
    wrapper.classList.toggle('collapsed', !state.filtersExpanded);
    wrapper.style.maxHeight = state.filtersExpanded ? wrapper.scrollHeight + 'px' : '0';
}

function updateFiltersBadge() {
    const badge = document.getElementById('filtersBadge');
    if (!badge) return;
    let count = 0;
    if (state.filters.positiveEffect) count++;
    if (state.filters.negativeEffect) count++;
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
}

function updateResetButtonState() {
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (!resetBtn) return;
    const hasActiveFilters = state.filters.search !== '' || state.filters.category !== 'all' || state.filters.positiveEffect !== '' || state.filters.negativeEffect !== '';
    resetBtn.disabled = !hasActiveFilters;
}

function resetAllFilters() {
    state.filters.search = '';
    state.filters.category = 'all';
    state.filters.positiveEffect = '';
    state.filters.negativeEffect = '';

    elements.artifactSearch.value = '';
    if (elements.searchClear) elements.searchClear.style.display = 'none';
    elements.categoryTabs.forEach(tab => tab.classList.toggle('category-tab--active', tab.dataset.category === 'all'));

    const positiveSelect = document.getElementById('positiveEffectFilter');
    const negativeSelect = document.getElementById('negativeEffectFilter');
    if (positiveSelect) positiveSelect.value = '';
    if (negativeSelect) negativeSelect.value = '';

    updateFiltersBadge();
    updateResetButtonState();
    applyFilters();
}

function isPositiveEffect(statKey, value) {
    if (value === 0) return false;
    return INVERTED_STATS.includes(statKey) ? value < 0 : value > 0;
}

function isNegativeEffect(statKey, value) {
    if (value === 0) return false;
    return INVERTED_STATS.includes(statKey) ? value > 0 : value < 0;
}


function initArmorPicker() {
    updateArmorBar();
    elements.armorPickerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openArmorModal();
    });
    elements.armorPanelRow?.addEventListener('click', (e) => {
        if (e.target.closest('#enhancementBlock')) return;
        openArmorModal();
    });
    elements.enhancementBlock?.addEventListener('click', (e) => e.stopPropagation());
    elements.armorModalClose.addEventListener('click', closeArmorModal);
    elements.armorModal.querySelector('.modal__backdrop').addEventListener('click', closeArmorModal);
    elements.armorModal.querySelector('.armor-modal__layout')?.addEventListener('click', handleArmorModalClick);
    if (elements.armorClearBtn) {
        elements.armorClearBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            clearArmorSelection();
        });
    }
    if (elements.armorModalSearch) {
        elements.armorModalSearch.addEventListener('input', handleArmorModalSearch);
    }
    if (elements.armorSearchClear) {
        elements.armorSearchClear.addEventListener('click', () => {
            elements.armorModalSearch.value = '';
            elements.armorSearchClear.style.display = 'none';
            renderArmorModalList();
            elements.armorModalSearch.focus();
        });
    }
    elements.armorTypeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            state.armorModalTypeFilter = tab.dataset.armorType || 'all';
            elements.armorTypeTabs.forEach(t => t.classList.toggle('category-tab--active', t === tab));
            renderArmorModalList();
        });
    });
}

function openArmorModal() {
    state.armorModalPreviewId = state.selectedArmor?.id || null;
    state.armorModalTypeFilter = 'all';
    elements.armorModal.classList.add('active');
    elements.armorTypeTabs.forEach(tab => {
        tab.classList.toggle('category-tab--active', tab.dataset.armorType === 'all');
    });
    if (elements.armorModalSearch) {
        elements.armorModalSearch.value = '';
        if (elements.armorSearchClear) elements.armorSearchClear.style.display = 'none';
    }
    renderArmorModalList();
    renderArmorModalDetail(state.armorModalPreviewId);
    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024);
    if (!isMobile && elements.armorModalSearch) elements.armorModalSearch.focus();
    document.body.style.overflow = 'hidden';
}

function closeArmorModal() {
    elements.armorModal.classList.remove('active');
    lastArmorDetailId = null;
    if (!elements.containerModal.classList.contains('active') &&
        !elements.modal.classList.contains('active') &&
        !elements.clearArtifactsConfirm.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

function handleArmorModalSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    if (elements.armorSearchClear) {
        elements.armorSearchClear.style.display = query ? 'flex' : 'none';
    }
    clearTimeout(armorModalSearchTimer);
    armorModalSearchTimer = setTimeout(() => renderArmorModalList(query), 150);
}

function updateArmorModalCardStates() {
    if (!elements.armorModalList) return;
    elements.armorModalList.querySelectorAll('.armor-card').forEach(card => {
        const id = card.dataset.armorId;
        card.classList.toggle('armor-card--preview', id === state.armorModalPreviewId);
        card.classList.toggle('armor-card--equipped', id === state.selectedArmor?.id);
    });
}

function handleArmorModalClick(e) {
    const selectBtn = e.target.closest('.armor-detail__select');
    if (selectBtn) {
        confirmArmorSelection();
        return;
    }

    const card = e.target.closest('.armor-card');
    if (card?.dataset.armorId) {
        const nextId = card.dataset.armorId;
        if (nextId === state.armorModalPreviewId) return;
        state.armorModalPreviewId = nextId;
        updateArmorModalCardStates();
        renderArmorModalDetail(state.armorModalPreviewId);
    }
}

function getArmorModalSearchQuery() {
    return elements.armorModalSearch?.value.toLowerCase().trim() || '';
}

function renderArmorModalList(searchQuery = getArmorModalSearchQuery()) {
    let armors = ARMORS.filter(armor => {
        if (searchQuery) {
            const nameMatch = armor.name.toLowerCase().includes(searchQuery) ||
                              (armor.nameEn && armor.nameEn.toLowerCase().includes(searchQuery));
            if (!nameMatch) return false;
        }
        if (state.armorModalTypeFilter !== 'all') {
            const typeName = ARMOR_TYPES[state.armorModalTypeFilter];
            if (typeName && armor.type !== typeName) return false;
        }
        return true;
    });
    armors = sortArmorsByRarity(armors);

    if (armors.length === 0) {
        elements.armorModalList.innerHTML = `<div class="armors-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><span>${t('calc.armorNotFound')}</span></div>`;
        return;
    }

    const html = armors.map(armor => {
        const isPreview = state.armorModalPreviewId === armor.id;
        const isSelected = state.selectedArmor?.id === armor.id;
        const rarityClass = armor.rarity || 'none';
        const bulletRes = armor.stats.bulletResistance || 0;
        return `<button class="armor-card armor-card--${rarityClass} ${isPreview ? 'armor-card--preview' : ''} ${isSelected ? 'armor-card--equipped' : ''}" type="button" data-armor-id="${armor.id}"><div class="armor-card__image">${getArmorCardIcon(armor)}</div><div class="armor-card__name">${getLocalizedName(armor)}</div>${bulletRes > 0 ? `<span class="armor-card__stat">${bulletRes}</span>` : ''}</button>`;
    }).join('');

    elements.armorModalList.innerHTML = html;
    bindArmorCardFallbacks(elements.armorModalList);
}

function renderArmorModalDetail(armorId, force = false) {
    if (!elements.armorModalDetail) return;

    if (!armorId) {
        lastArmorDetailId = null;
        elements.armorModalDetail.innerHTML = `<div class="armor-detail__placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span>${t('calc.armorModal.selectHint')}</span></div>`;
        return;
    }

    if (!force && armorId === lastArmorDetailId) return;

    const armor = ARMORS.find(a => a.id === armorId);
    if (!armor) return;

    lastArmorDetailId = armorId;

    const rarityClass = armor.rarity || 'none';
    const imagePath = getArmorImagePath(armor);
    const imageHtml = imagePath
        ? `<img class="armor-detail__img" src="${imagePath}" alt="${getLocalizedName(armor)}">`
        : `<span class="armor-detail__icon">${ARMOR_DEFAULT_ICON}</span>`;
    const statsHtml = Object.entries(armor.stats).map(([key, value]) => buildCompactStatRow(key, value, 0, { compact: true })).join('');
    const isEquipped = state.selectedArmor?.id === armor.id;

    elements.armorModalDetail.innerHTML = `<div class="armor-detail__head"><div class="armor-detail__preview">${imageHtml}</div><div class="armor-detail__meta"><div class="armor-detail__name">${getLocalizedName(armor)}</div><div class="armor-detail__type">${getArmorTypeName(armor.type)}</div>${armor.rarity ? `<span class="armor-detail__rarity rarity--${rarityClass}">${getLocalizedRarity(armor)}</span>` : ''}</div></div><div class="armor-detail__stats">${statsHtml}</div><button class="armor-detail__select ${isEquipped ? 'armor-detail__select--equipped' : ''}" type="button">${isEquipped ? t('calc.armorModal.equipped') : t('calc.armorModal.select')}</button>`;

    const img = elements.armorModalDetail.querySelector('.armor-detail__img');
    if (img) {
        img.onerror = () => {
            img.replaceWith(Object.assign(document.createElement('span'), {
                className: 'armor-detail__icon',
                innerHTML: ARMOR_DEFAULT_ICON
            }));
        };
    }
}

function confirmArmorSelection() {
    if (!state.armorModalPreviewId) return;
    if (state.selectedArmor?.id === state.armorModalPreviewId) {
        closeArmorModal();
        return;
    }
    selectArmor(state.armorModalPreviewId);
    closeArmorModal();
}

function selectArmor(armorId) {
    state.previousStats = calculateTotalStats();
    const armor = ARMORS.find(a => a.id === armorId);
    if (!armor) return;

    const isSameArmor = state.selectedArmor?.id === armorId;
    state.selectedArmor = armor;
    if (!isSameArmor) state.enhancementLevel = 0;

    elements.armorSelect.value = armorId;
    armor.enhancement ? showEnhancementBlock() : hideEnhancementBlock();
    if (armor.enhancement) {
        elements.enhancementSlider.value = state.enhancementLevel;
        updateEnhancementDisplay();
    }
    updateArmorBar();
    renderArmorPreview();
    updateContainerOptions();
    updateStats();
    saveStateToStorage();
    if (elements.armorModal?.classList.contains('active')) {
        updateArmorModalCardStates();
    }
}

function clearArmorSelection() {
    state.previousStats = calculateTotalStats();
    state.selectedArmor = null;
    state.enhancementLevel = 0;
    state.armorModalPreviewId = null;

    elements.armorSelect.value = '';
    if (elements.armorModalSearch) elements.armorModalSearch.value = '';

    hideEnhancementBlock();
    updateArmorBar();
    renderArmorPreview();
    updateContainerOptions();
    updateStats();
    if (elements.armorModal?.classList.contains('active')) {
        renderArmorModalList();
        renderArmorModalDetail(null, true);
    }
    saveStateToStorage();
}


function initContainerPicker() {
    renderContainerBar();
    elements.containerPickerBtn.addEventListener('click', openContainerModal);
    elements.containerModalClose.addEventListener('click', closeContainerModal);
    elements.containerModal.querySelector('.modal__backdrop').addEventListener('click', closeContainerModal);
    elements.containerModalList.addEventListener('click', handleContainerModalClick);
    elements.containerModal.addEventListener('input', (e) => {
        if (e.target.id === 'containerModalSearch') handleContainerModalSearch();
    });
    if (elements.containerSearchClear) {
        elements.containerSearchClear.addEventListener('click', () => {
            elements.containerModalSearch.value = '';
            elements.containerSearchClear.style.display = 'none';
            renderContainerModalList('');
            elements.containerModalSearch.focus();
        });
    }
    if (elements.clearArtifactsBtn) {
        elements.clearArtifactsBtn.addEventListener('click', openClearArtifactsConfirm);
    }
    if (elements.clearArtifactsCancel) {
        elements.clearArtifactsCancel.addEventListener('click', closeClearArtifactsConfirm);
    }
    if (elements.clearArtifactsConfirmBtn) {
        elements.clearArtifactsConfirmBtn.addEventListener('click', confirmClearArtifacts);
    }
    if (elements.clearArtifactsConfirm) {
        elements.clearArtifactsConfirm.querySelector('.confirm-dialog__backdrop').addEventListener('click', closeClearArtifactsConfirm);
    }
}

function openClearArtifactsConfirm() {
    if (!state.selectedContainer || !hasFilledArtifacts()) return;
    elements.clearArtifactsConfirm.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeClearArtifactsConfirm() {
    elements.clearArtifactsConfirm.classList.remove('active');
    if (!elements.containerModal.classList.contains('active') &&
        !elements.armorModal.classList.contains('active') &&
        !elements.modal.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

function confirmClearArtifacts() {
    if (!state.selectedContainer) {
        closeClearArtifactsConfirm();
        return;
    }

    state.previousStats = calculateTotalStats();
    state.artifacts = new Array(state.selectedContainer.slots).fill(null);
    closeClearArtifactsConfirm();
    renderArtifactSlots();
    renderContainerBar();
    updateStats();
    saveStateToStorage();
}

function openContainerModal() {
    elements.containerModal.classList.add('active');
    if (elements.containerModalSearch) {
        elements.containerModalSearch.value = '';
        if (elements.containerSearchClear) elements.containerSearchClear.style.display = 'none';
    }
    renderContainerModalList();
    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024);
    if (!isMobile && elements.containerModalSearch) elements.containerModalSearch.focus();
    document.body.style.overflow = 'hidden';
}

function closeContainerModal() {
    elements.containerModal.classList.remove('active');
    if (!elements.armorModal.classList.contains('active') &&
        !elements.modal.classList.contains('active') &&
        !elements.clearArtifactsConfirm.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

function handleContainerModalSearch() {
    const query = elements.containerModalSearch?.value.toLowerCase().trim() || '';
    if (elements.containerSearchClear) {
        elements.containerSearchClear.style.display = query ? 'flex' : 'none';
    }
    renderContainerModalList(query);
}

function handleContainerModalClick(e) {
    const card = e.target.closest('.container-card');
    if (card && !card.classList.contains('container-card--incompatible') && card.dataset.containerId) {
        selectContainer(card.dataset.containerId);
    }
}

function getAvailableContainers() {
    return CONTAINERS.filter(container => {
        if (!state.selectedArmor) return true;
        if (state.selectedArmor.containerTypes.includes('all')) return true;
        return state.selectedArmor.containerTypes.includes(container.type);
    });
}

function isContainerAvailable(container) {
    if (!state.selectedArmor) return true;
    if (state.selectedArmor.containerTypes.includes('all')) return true;
    return state.selectedArmor.containerTypes.includes(container.type);
}

function renderContainerModalList(searchQuery = '') {
    let containers = CONTAINERS.filter(container => {
        if (!searchQuery) return true;
        const nameMatch = container.name.toLowerCase().includes(searchQuery) ||
                          (container.nameEn && container.nameEn.toLowerCase().includes(searchQuery));
        return nameMatch;
    });
    containers = sortContainersByRarity(containers);

    if (containers.length === 0) {
        elements.containerModalList.innerHTML = `<div class="containers-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><span>${t('calc.containerNotFound')}</span></div>`;
        return;
    }

    const html = containers.map(container => {
        const isSelected = state.selectedContainer?.id === container.id;
        const isAvailable = isContainerAvailable(container);
        const rarityClass = container.rarity || 'none';
        const incompatBadge = !isAvailable ? `<div class="container-card__incompat" title="${t('calc.containerIncompatible')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 9l6 6M15 9l-6 6"/></svg></div>` : '';

        return `<button class="container-card container-card--${rarityClass} ${isSelected ? 'container-card--selected' : ''} ${!isAvailable ? 'container-card--incompatible' : ''}" type="button" data-container-id="${container.id}"><div class="container-card__image">${getContainerDropdownIcon(container)}${incompatBadge}</div><div class="container-card__name">${getLocalizedName(container)}</div><span class="container-card__rarity rarity--${rarityClass}">${getLocalizedRarity(container)}</span></button>`;
    }).join('');

    elements.containerModalList.innerHTML = html;
    bindContainerIconFallbacks(elements.containerModalList);
}

function getDefaultContainer() {
    const preferred = CONTAINERS.find(c => c.id === DEFAULT_CONTAINER_ID);
    if (preferred && isContainerAvailable(preferred)) return preferred;
    const available = getAvailableContainers();
    if (available.length > 0) return available[0];
    return preferred || CONTAINERS[0] || null;
}

function ensureDefaultContainer() {
    if (state.selectedContainer && isContainerAvailable(state.selectedContainer)) return;
    const container = getDefaultContainer();
    if (container) setSelectedContainer(container, { preserveArtifacts: false, save: false });
}

function setSelectedContainer(container, { preserveArtifacts = false, closeModal = false, save = true } = {}) {
    if (!container || !isContainerAvailable(container)) return false;

    state.previousStats = calculateTotalStats();
    const previousArtifacts = preserveArtifacts ? [...state.artifacts] : [];
    state.selectedContainer = container;
    state.artifacts = new Array(container.slots).fill(null);
    for (let i = 0; i < Math.min(previousArtifacts.length, container.slots); i++) {
        state.artifacts[i] = previousArtifacts[i];
    }

    elements.containerSelect.value = container.id;
    if (closeModal) closeContainerModal();

    renderContainerBar();
    renderArtifactSlots();
    updateStats();
    if (elements.containerModal?.classList.contains('active')) {
        renderContainerModalList(elements.containerModalSearch?.value.toLowerCase().trim() || '');
    }
    if (save) saveStateToStorage();
    return true;
}

function selectContainer(containerId) {
    const container = CONTAINERS.find(c => c.id === containerId);
    setSelectedContainer(container, { preserveArtifacts: true, closeModal: true });
}

function initContainerSelect() {
    elements.containerSelect.innerHTML = `<option value="">${t('calc.selectContainer')}</option>`;
    CONTAINERS.forEach(container => {
        const option = document.createElement('option');
        option.value = container.id;
        option.textContent = `${getLocalizedName(container)} (${getSlotsText(container.slots)})`;
        elements.containerSelect.appendChild(option);
    });
    elements.containerSelect.disabled = false;
}


function initEventListeners() {
    elements.containerSelect.addEventListener('change', handleContainerChange);
    elements.resetBtn.addEventListener('click', resetBuild);
    elements.modalClose.addEventListener('click', closeModal);
    elements.modal.querySelector('.modal__backdrop').addEventListener('click', closeModal);
    elements.artifactSearch.addEventListener('input', handleSearchChange);

    if (elements.enhancementSlider) {
        elements.enhancementSlider.addEventListener('input', handleEnhancementChange);
        elements.enhancementSlider.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
        elements.enhancementSlider.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
    }

    elements.categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (!tab.dataset.category) return;
            elements.categoryTabs.forEach(t => t.classList.remove('category-tab--active'));
            tab.classList.add('category-tab--active');
            state.filters.category = tab.dataset.category;
            updateResetButtonState();
            applyFilters();
        });
    });

    if (elements.searchClear) {
        elements.searchClear.addEventListener('click', () => {
            elements.artifactSearch.value = '';
            state.filters.search = '';
            elements.searchClear.style.display = 'none';
            updateResetButtonState();
            applyFilters();
            elements.artifactSearch.focus();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (elements.clearArtifactsConfirm.classList.contains('active')) closeClearArtifactsConfirm();
        else if (elements.armorModal.classList.contains('active')) closeArmorModal();
        else if (elements.containerModal.classList.contains('active')) closeContainerModal();
        else if (elements.modal.classList.contains('active')) closeModal();
    });

    // Определяем, поддерживает ли устройство тач
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    // На тач-устройствах используем touchend для мгновенной реакции без ожидания hover
    let touchStartTarget = null;
    let touchMoved = false;

    elements.artifactSlots.addEventListener('touchstart', (e) => {
        touchStartTarget = e.target;
        touchMoved = false;
    }, { passive: true });

    elements.artifactSlots.addEventListener('touchmove', () => {
        touchMoved = true;
    }, { passive: true });

    elements.artifactSlots.addEventListener('touchend', (e) => {
        // Если палец двигался — это скролл, не обрабатываем
        if (touchMoved) return;

        const target = e.target;

        // Обработка кнопки удаления
        const removeBtn = target.closest('.artifact-slot-card__remove');
        if (removeBtn) {
            e.preventDefault();
            const slot = removeBtn.closest('.artifact-slot-card');
            if (slot) removeArtifact(parseInt(slot.dataset.index));
            return;
        }

        const filledSlot = target.closest('.artifact-slot-card:not(.artifact-slot-card--empty)');
        if (filledSlot) {
            e.preventDefault();
            openArtifactModal(parseInt(filledSlot.dataset.index));
            return;
        }

        const emptySlot = target.closest('.artifact-slot-card--empty');
        if (emptySlot) {
            e.preventDefault();
            openArtifactModal(parseInt(emptySlot.dataset.index));
        }
    });

    elements.artifactSlots.addEventListener('click', (e) => {
            const slot = e.target.closest('.artifact-slot-card');
            if (slot) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    } else {
        elements.artifactSlots.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.artifact-slot-card__remove');
            if (removeBtn) {
                e.stopPropagation();
                const slot = removeBtn.closest('.artifact-slot-card');
                if (slot) removeArtifact(parseInt(slot.dataset.index));
                return;
            }

            const filledSlot = e.target.closest('.artifact-slot-card:not(.artifact-slot-card--empty)');
            if (filledSlot) {
                openArtifactModal(parseInt(filledSlot.dataset.index));
                return;
            }

            const emptySlot = e.target.closest('.artifact-slot-card--empty');
            if (emptySlot) {
                openArtifactModal(parseInt(emptySlot.dataset.index));
            }
        });
    }

    elements.artifactList.addEventListener('click', (e) => {
        const card = e.target.closest('.artifact-card');
        if (card && card.dataset.artifactId) {
            selectArtifact(card.dataset.artifactId);
        }
    });
}

function handleSearchChange(e) {
    state.filters.search = e.target.value.trim();
    if (elements.searchClear) elements.searchClear.style.display = state.filters.search ? 'flex' : 'none';
    updateResetButtonState();
    applyFilters();
}

function applyFilters() {
    let filtered = [...ARTIFACTS];

    if (state.filters.category !== 'all') filtered = filtered.filter(a => a.category === state.filters.category);

    if (state.filters.search) {
        const searchLower = state.filters.search.toLowerCase();
        filtered = filtered.filter(a => {
            if (a.name.toLowerCase().includes(searchLower)) return true;
            if (a.nameEn && a.nameEn.toLowerCase().includes(searchLower)) return true;
            for (const statKey of Object.keys(a.stats)) {
                const statNameRu = STAT_NAMES[statKey];
                const statNameEn = STAT_NAMES_EN[statKey];
                if (statNameRu && statNameRu.toLowerCase().includes(searchLower)) return true;
                if (statNameEn && statNameEn.toLowerCase().includes(searchLower)) return true;
            }
            return false;
        });
    }

    if (state.filters.positiveEffect) {
        filtered = filtered.filter(a => {
            const value = a.stats[state.filters.positiveEffect];
            return value !== undefined && isPositiveEffect(state.filters.positiveEffect, value);
        });
    }

    if (state.filters.negativeEffect) {
        filtered = filtered.filter(a => {
            const value = a.stats[state.filters.negativeEffect];
            return value !== undefined && isNegativeEffect(state.filters.negativeEffect, value);
        });
    }

    renderArtifactList(filtered);
}


function updateContainerOptions() {
    const currentContainerId = state.selectedContainer?.id;
    elements.containerSelect.innerHTML = `<option value="">${t('calc.selectContainer')}</option>`;
    const availableContainers = getAvailableContainers();

    availableContainers.forEach(container => {
        const option = document.createElement('option');
        option.value = container.id;
        option.textContent = `${getLocalizedName(container)} (${getSlotsText(container.slots)})`;
        elements.containerSelect.appendChild(option);
    });

    const currentStillAvailable = availableContainers.some(c => c.id === currentContainerId);
    if (currentStillAvailable && state.selectedContainer) {
        elements.containerSelect.value = currentContainerId;
    } else if (state.selectedContainer) {
        setSelectedContainer(getDefaultContainer(), { preserveArtifacts: true });
    }

    if (elements.containerModal?.classList.contains('active')) {
        renderContainerModalList(elements.containerModalSearch?.value.toLowerCase().trim() || '');
    }
    elements.containerSelect.disabled = false;
}


function handleEnhancementChange(e) {
    state.previousStats = calculateTotalStats();
    state.enhancementLevel = parseInt(e.target.value);
    updateEnhancementDisplay();
    renderArmorPreview();
    updateStats();
    saveStateToStorage();
}

function showEnhancementBlock() {
    if (!elements.enhancementBlock) return;
    const maxLevel = state.selectedArmor.enhancement.maxLevel;
    elements.enhancementSlider.max = maxLevel;
    elements.enhancementSlider.value = state.enhancementLevel;
    elements.enhancementBlock.style.display = 'flex';
    elements.enhancementBlock.classList.add('visible');
    elements.armorPanelRow?.classList.add('armor-panel__row--with-enhancement');
    updateEnhancementDisplay();
}

function hideEnhancementBlock() {
    if (!elements.enhancementBlock) return;
    elements.enhancementBlock.style.display = 'none';
    elements.enhancementBlock.classList.remove('visible');
    elements.armorPanelRow?.classList.remove('armor-panel__row--with-enhancement');
}

function updateEnhancementDisplay() {
    if (!elements.enhancementBlock || !state.selectedArmor?.enhancement) return;
    const level = state.enhancementLevel;
    const maxLevel = state.selectedArmor.enhancement.maxLevel;

    elements.enhancementValue.textContent = level;
    elements.enhancementSlider.style.setProperty('--slider-progress', `${(level / maxLevel) * 100}%`);
    elements.enhancementBlock.setAttribute('data-level', level);

    elements.enhancementBlock.classList.remove('enhancement-block--high', 'enhancement-block--max');
    if (level >= 10 && level < maxLevel) elements.enhancementBlock.classList.add('enhancement-block--high');
    else if (level === maxLevel) elements.enhancementBlock.classList.add('enhancement-block--max');
}

function handleContainerChange(e) {
    const containerId = e.target.value;
    state.previousStats = calculateTotalStats();

    if (!containerId) {
        ensureDefaultContainer();
        return;
    }

    setSelectedContainer(CONTAINERS.find(c => c.id === containerId), { preserveArtifacts: true });
}

function resetBuild() {
    state.previousStats = null;
    state.selectedArmor = null;
    state.selectedContainer = null;
    state.artifacts = [];
    state.enhancementLevel = 0;

    updateArmorBar();
    if (elements.armorModalSearch) elements.armorModalSearch.value = '';
    if (elements.containerModalSearch) elements.containerModalSearch.value = '';

    elements.armorSelect.value = '';

    hideEnhancementBlock();
    updateContainerOptions();
    ensureDefaultContainer();
    renderArmorPreview();
    if (elements.armorModal?.classList.contains('active')) {
        renderArmorModalList();
    }
    if (elements.containerModal?.classList.contains('active')) {
        renderContainerModalList();
    }
    updateStats();

    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}

    saveStateToStorage();
}


function renderArtifactSlotStats(artifact) {
    return Object.entries(artifact.stats).map(([key, value]) => {
        const isInverted = INVERTED_STATS.includes(key);
        let displayValue, valueClass;
        if (value > 0) {
            displayValue = `+${formatNumber(value)}${getStatUnit(key)}`;
            valueClass = isInverted ? 'artifact-slot-card__stat-value--neg' : 'artifact-slot-card__stat-value--pos';
        } else if (value < 0) {
            displayValue = `${formatNumber(value)}${getStatUnit(key)}`;
            valueClass = isInverted ? 'artifact-slot-card__stat-value--pos' : 'artifact-slot-card__stat-value--neg';
        } else {
            displayValue = `0${getStatUnit(key)}`;
            valueClass = '';
        }
        return `<div class="artifact-slot-card__stat"><span class="artifact-slot-card__stat-name">${getStatName(key)}</span><span class="artifact-slot-card__stat-value ${valueClass}">${displayValue}</span></div>`;
    }).join('');
}

function renderArtifactSlots() {
    if (!state.selectedContainer) {
        elements.artifactSlots.innerHTML = `<div class="artifact-slots__placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg><span>${t('calc.selectContainerHint')}</span></div>`;
        elements.artifactCounter.textContent = '0/0';
        updateClearArtifactsButton();
        return;
    }

    const filledSlots = state.artifacts.filter(a => a !== null).length;
    elements.artifactCounter.textContent = `${filledSlots}/${state.selectedContainer.slots}`;
    updateClearArtifactsButton();

    const slotsHtml = state.artifacts.map((artifact, index) => {
        if (artifact) {
            const imageSrc = `../Table/${artifact.imageFolder}/${artifact.image}`;
            return `<div class="artifact-slot-card" data-index="${index}"><button class="artifact-slot-card__select" type="button"><div class="artifact-slot-card__preview"><img src="${imageSrc}" alt="${getLocalizedName(artifact)}" onerror="this.style.display='none'"></div><div class="artifact-slot-card__info"><div class="artifact-slot-card__name">${getLocalizedName(artifact)}</div><div class="artifact-slot-card__slot-num">${t('calc.modal.slot')} #${index + 1}</div></div></button><span class="category-tag category-tag--${artifact.category}">${getCategoryName(artifact.category)}</span><div class="artifact-slot-card__stats">${renderArtifactSlotStats(artifact)}</div><button class="artifact-slot-card__remove" data-action="remove" title="${t('calc.removeArtifact')}" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div>`;
        }
        return `<div class="artifact-slot-card artifact-slot-card--empty" data-index="${index}"><button class="artifact-slot-card__select" type="button"><div class="artifact-slot-card__preview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg></div><div class="artifact-slot-card__info"><div class="artifact-slot-card__hint">${t('calc.slot.clickToAdd')}</div><div class="artifact-slot-card__slot-num">${t('calc.modal.slot')} #${index + 1}</div></div></button></div>`;
    }).join('');

    elements.artifactSlots.innerHTML = `<div class="artifact-slots__grid">${slotsHtml}</div>`;
}

function updateArtifactCount(count) {
    if (elements.artifactCount) elements.artifactCount.textContent = count;
}

function renderArtifactList(artifacts) {
    if (!artifacts) artifacts = ARTIFACTS;
    updateArtifactCount(artifacts.length);

    if (artifacts.length === 0) {
        elements.artifactList.innerHTML = `<div class="artifacts-empty"><div class="artifacts-empty__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></div><div class="artifacts-empty__title">${t('calc.modal.noResults')}</div><div class="artifacts-empty__text">${t('calc.modal.tryOtherFilters')}</div></div>`;
        return;
    }

    const listHtml = artifacts.map(artifact => {
        const tierClass = artifact.tier === 'unique' ? 'unique' : artifact.tier;
        const tierDisplay = artifact.tier === 'unique' ? '★' : `T${artifact.tier}`;
        const priceDisplay = artifact.price ? formatPrice(artifact.price) : (getLocalizedField(artifact, 'priceText') || '—');

        const statsHtml = Object.entries(artifact.stats).map(([key, value]) => {
            const isInverted = INVERTED_STATS.includes(key);
            let displayValue, valueClass;
            if (value > 0) {
                displayValue = `+${formatNumber(value)}${getStatUnit(key)}`;
                valueClass = isInverted ? 'artifact-stat-row__value--negative' : 'artifact-stat-row__value--positive';
            } else {
                displayValue = `${formatNumber(value)}${getStatUnit(key)}`;
                valueClass = isInverted ? 'artifact-stat-row__value--positive' : 'artifact-stat-row__value--negative';
            }
            return `<div class="artifact-stat-row"><span class="artifact-stat-row__name">${getStatName(key)}</span><span class="artifact-stat-row__value ${valueClass}">${displayValue}</span></div>`;
        }).join('');

        return `<div class="artifact-card artifact-card--${artifact.category}" data-artifact-id="${artifact.id}"><div class="artifact-card__top"><div class="artifact-card__image-wrapper"><img src="../Table/${artifact.imageFolder}/${artifact.image}" alt="${getLocalizedName(artifact)}" class="artifact-card__image" onerror="this.src='../images/placeholder.png'"></div><div class="artifact-card__info"><div class="artifact-card__name">${getLocalizedName(artifact)}</div><div class="artifact-card__meta"><span class="artifact-card__tier artifact-card__tier--${tierClass}">${tierDisplay}</span><span class="artifact-card__category">${getCategoryName(artifact.category)}</span><span class="artifact-card__price">${priceDisplay}</span></div></div></div><div class="artifact-card__divider"></div><div class="artifact-card__stats">${statsHtml}</div></div>`;
    }).join('');

    elements.artifactList.innerHTML = listHtml;
}


function openArtifactModal(slotIndex) {
    state.currentSlotIndex = slotIndex;
    elements.modal.classList.add('active');
    if (elements.modalSlotInfo) elements.modalSlotInfo.textContent = `${t('calc.modal.slot')} #${slotIndex + 1}`;

    state.filters.search = '';
    state.filters.category = 'all';
    state.filters.positiveEffect = '';
    state.filters.negativeEffect = '';
    state.filtersExpanded = false;

    elements.artifactSearch.value = '';
    elements.categoryTabs.forEach(tab => tab.classList.toggle('category-tab--active', tab.dataset.category === 'all'));
    if (elements.searchClear) elements.searchClear.style.display = 'none';

    recreateStatFilters();

    const positiveSelect = document.getElementById('positiveEffectFilter');
    const negativeSelect = document.getElementById('negativeEffectFilter');
    const filtersToggle = document.getElementById('filtersToggle');
    const filtersWrapper = document.getElementById('statFiltersWrapper');

    if (positiveSelect) positiveSelect.value = '';
    if (negativeSelect) negativeSelect.value = '';
    if (filtersToggle) filtersToggle.classList.remove('active');
    if (filtersWrapper) {
        filtersWrapper.classList.add('collapsed');
        filtersWrapper.style.maxHeight = '0';
    }

    updateFiltersBadge();
    updateResetButtonState();
    renderArtifactList(ARTIFACTS);

    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024);
    if (!isMobile) elements.artifactSearch.focus();

    document.body.style.overflow = 'hidden';
}

function closeModal() {
    elements.modal.classList.remove('active');
    state.currentSlotIndex = null;
    if (!elements.containerModal.classList.contains('active') &&
        !elements.armorModal.classList.contains('active') &&
        !elements.clearArtifactsConfirm.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

function selectArtifact(artifactId) {
    const artifact = ARTIFACTS.find(a => a.id === artifactId);
    if (artifact && state.currentSlotIndex !== null) {
        state.previousStats = calculateTotalStats();
        state.artifacts[state.currentSlotIndex] = artifact;
        renderArtifactSlots();
        updateStats();
        closeModal();
        saveStateToStorage();
    }
}

function removeArtifact(index) {
    state.previousStats = calculateTotalStats();
    state.artifacts[index] = null;
    renderArtifactSlots();
    updateStats();
    saveStateToStorage();
}


function updateStats() {
    const totalStats = calculateTotalStats();
    updateHeroStats(totalStats, state.previousStats);

    Object.entries(totalStats).forEach(([key, value]) => {
        const element = elements.statValueElements[key];
        if (element) {
            const prevValue = state.previousStats ? state.previousStats[key] : value;
            const { displayValue, colorClass } = formatStatValueWithChange(key, value, prevValue);
            element.textContent = displayValue + getStatUnit(key);
            element.className = 'stats-panel__value' + (colorClass ? ' stats-panel__value--' + (colorClass.includes('positive') ? 'positive' : 'negative') : '');
        }
    });

    updateEffectiveBulletResistance(totalStats.bulletResistance);
    updateEffectiveHealth(totalStats.bulletResistance);
    updateWarnings(totalStats);
    state.previousStats = totalStats;
}

function updateHeroStats(currentStats, previousStats) {
    HERO_STATS.forEach(statKey => {
        const element = elements.heroStatElements[statKey];
        if (!element) return;

        const value = currentStats[statKey] || 0;
        const prevValue = previousStats ? (previousStats[statKey] || 0) : value;
        const { displayValue, colorClass } = formatStatValueWithChange(statKey, value, prevValue);

        element.textContent = displayValue + getStatUnit(statKey);
        element.className = 'hero-stat__value hero-stat__value--sm';
        if (colorClass) {
            element.classList.add(colorClass.includes('positive') ? 'hero-stat__value--positive' : 'hero-stat__value--negative');
        }
    });
}

function updateEffectiveHealth(bulletResistance) {
    if (!elements.effectiveHealth) return;
    const ehp = calculateEffectiveHealth(bulletResistance);
    elements.effectiveHealth.textContent = formatNumber(ehp);
}

function formatPriorityStatValue(statKey, value, prevValue) {
    const isInverted = INVERTED_STATS.includes(statKey);
    let displayValue = '', colorClass = '', isDangerous = false, isGood = false;

    if (value === 0) displayValue = '0';
    else if (value > 0) displayValue = `+${formatNumber(value)}`;
    else displayValue = formatNumber(value);

    if (isInverted) {
        if (value > 0) { isDangerous = true; colorClass = 'priority-stat__value--negative'; }
        else if (value < 0) { isGood = true; colorClass = 'priority-stat__value--positive'; }
    } else {
        if (value > 0) { isGood = true; colorClass = 'priority-stat__value--positive'; }
        else if (value < 0) { isDangerous = true; colorClass = 'priority-stat__value--negative'; }
    }

    return { displayValue, colorClass, isDangerous, isGood };
}

function formatStatValueWithChange(statKey, currentValue, previousValue) {
    const isInverted = INVERTED_STATS.includes(statKey);
    const diff = currentValue - previousValue;
    let displayValue = '', colorClass = '';

    if (currentValue === 0) displayValue = '0';
    else if (currentValue > 0) displayValue = `+${formatNumber(currentValue)}`;
    else displayValue = formatNumber(currentValue);

    if (diff !== 0) {
        colorClass = isInverted ? (diff > 0 ? 'stat-row__value--negative' : 'stat-row__value--positive') : (diff > 0 ? 'stat-row__value--positive' : 'stat-row__value--negative');
    } else if (currentValue !== 0) {
        colorClass = isInverted ? (currentValue > 0 ? 'stat-row__value--negative' : 'stat-row__value--positive') : (currentValue > 0 ? 'stat-row__value--positive' : 'stat-row__value--negative');
    }

    return { displayValue, colorClass };
}

function updateWarnings(totalStats) {
    const warningsHtml = [];

    Object.entries(WARNING_STATS).forEach(([statKey, config]) => {
        let value = totalStats[statKey] || 0;
        const isDangerous = config.inverted ? value < config.threshold : value > config.threshold;

        if (isDangerous) {
            const displayValue = config.inverted ? Math.abs(value) : value;
            const sign = config.inverted ? '-' : '+';
            const title = t(config.titleKey);
            const unit = t(config.unitKey);
            warningsHtml.push(`<div class="warning-banner warning-banner--${statKey}"><span class="warning-banner__icon">⚠️</span><div class="warning-banner__content"><span class="warning-banner__text">${title}</span><span class="warning-banner__value">(${sign}${formatNumber(displayValue)} ${unit})</span></div></div>`);
        }
    });

    if (elements.warningsContainer) {
        elements.warningsContainer.innerHTML = warningsHtml.join('');
    }
}

function getWarningIcon(statKey) {
    const icons = {
        radiation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
        cold: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/><path d="M12 2l4 4M12 2l-4 4"/><path d="M12 22l4-4M12 22l-4-4"/><path d="M2 12l4 4M2 12l4-4"/><path d="M22 12l-4 4M22 12l-4-4"/></svg>',
        bleeding: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
        regeneration: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
        saturation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>'
    };
    return icons[statKey] || icons.radiation;
}

function updateEffectiveBulletResistance(bulletResistance) {
    const effectiveElement = document.getElementById('effectiveBulletResistance');
    const percentElement = document.getElementById('bulletResistancePercent');
    const barElement = document.getElementById('bulletResistanceBar');
    if (!effectiveElement) return;

    let percent = 0;
    if (bulletResistance > 0) percent = (bulletResistance / (bulletResistance + BULLET_RESISTANCE_CONSTANT)) * 100;
    else if (bulletResistance < 0) percent = (bulletResistance / (Math.abs(bulletResistance) + BULLET_RESISTANCE_CONSTANT)) * 100;

    const clampedPercent = Math.max(-100, Math.min(percent, 99.99));
    effectiveElement.textContent = formatNumber(bulletResistance);
    percentElement.textContent = `${clampedPercent.toFixed(2)}%`;

    const barPercent = Math.max(0, Math.min(clampedPercent, 100));
    barElement.style.width = `${barPercent}%`;

    if (clampedPercent >= 65) barElement.className = 'hero-stat__bar-fill hero-stat__bar-fill--high';
    else if (clampedPercent >= 45) barElement.className = 'hero-stat__bar-fill hero-stat__bar-fill--medium';
    else barElement.className = 'hero-stat__bar-fill hero-stat__bar-fill--low';
}

function formatStatValue(statKey, value) {
    const isInverted = INVERTED_STATS.includes(statKey);
    let displayValue, colorClass = '';
    if (value === 0) displayValue = '0';
    else if (value > 0) { displayValue = `+${formatNumber(value)}`; colorClass = isInverted ? 'stat-value--negative' : 'stat-value--positive'; }
    else { displayValue = formatNumber(value); colorClass = isInverted ? 'stat-value--positive' : 'stat-value--negative'; }
    return { displayValue, colorClass };
}
