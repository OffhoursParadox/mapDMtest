'use strict';

const state = {
    selectedArmor: null,
    selectedContainer: null,
    artifacts: [],
    currentSlotIndex: null,
    previousStats: null,
    enhancementLevel: 0,
    filters: {
        search: '',
        positiveEffects: [],
        negativeEffects: []
    },
    filtersExpanded: false,
    armorModalPreviewId: null,
    containerModalPreviewId: null,
    artifactModalPreviewId: null,
    selectedArtifactSlotIndex: null,
    artifactCopyMode: false,
};

let armorModalSearchTimer = null;
let pickerGridLayoutTimer = null;
const PICKER_GRID_GAP = 8;
const ARTIFACT_GRID_ROW_STRIDE = 92 + PICKER_GRID_GAP;
let lastArmorDetailId = null;
let lastContainerDetailId = null;
let lastArtifactDetailId = null;
let artifactSlotsSortable = null;
let artifactSlotDragJustFinished = false;

let elements = {};
let statFilterOptions = { positive: [], negative: [] };

const STORAGE_KEY = 'cataclysmCalculatorState';
const DEFAULT_CONTAINER_ID = 'container_radiy';
const PRIORITY_STATS = ['regeneration', 'bleeding', 'radiation', 'saturation', 'cold'];
const HERO_STATS = ['regeneration', 'bleeding', 'radiation', 'saturation'];
const ARMOR_REGULAR_STAT_KEYS = [
    'radiationProtection', 'bioProtection', 'thermalProtection', 'psiProtection', 'frostProtection',
    'heatResistance', 'chemResistance', 'electroResistance',
    'impactResistance', 'tearProtection'
];
const ARMOR_EXTRA_STAT_KEYS = [
    'regeneration', 'bleeding', 'radiation', 'saturation', 'cold',
    'maxStamina', 'staminaRegen', 'moveSpeed', 'maxWeight'
];
const BULLET_RESISTANCE_CONSTANT = 166.67;
const RARITY_ORDER = ['legendary', 'unique', 'rare', 'collection', 'uncommon', 'common', 'none'];

const WARNING_STATS = {
    radiation: { threshold: 0, titleKey: 'calc.warning.radiationDamage', unitKey: 'calc.unit.msvSec' },
    cold: { threshold: 0, titleKey: 'calc.warning.coldDamage', unitKey: 'calc.unit.perSec' },
    bleeding: { threshold: 0, titleKey: 'calc.warning.bleedingDamage', unitKey: 'calc.unit.perSec' },
    regeneration: { threshold: 0, titleKey: 'calc.warning.healthLossDamage', unitKey: 'calc.unit.percentSec', inverted: true },
    saturation: { threshold: 0, titleKey: 'calc.warning.saturationDamage', unitKey: 'calc.unit.percentSec', inverted: true }
};

const WARNING_ICON_FILES = {
    radiation: '../images/icons/warnings/radiation.svg',
    cold: '../images/icons/warnings/cold.svg',
    bleeding: '../images/icons/warnings/bleeding.svg'
};

const WARNING_ICON_INLINE = {
    regeneration: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-4.35-8.5-8.5C1.5 8.5 4.5 4 8.5 4c2 0 3.5 1.5 3.5 1.5S13.5 4 15.5 4C19.5 4 22.5 8.5 20.5 12.5 18.5 16.65 12 21 12 21z" fill="currentColor" fill-opacity="0.15"/><path d="M5 13h3l2-4 3 8 2-5 2 1h3"/></svg>',
    saturation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>'
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

function getArtifactTierDisplay(tier) {
    if (tier === 'unique') return '★';
    return t('calc.artifactModal.tierLevel', { level: tier });
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
const ARMOR_EMPTY_IMAGE = `../${ITEMS_IMAGES_DIR}Armors/empty.png`;

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
    const imagePath = getContainerImagePath(container);
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
    const imagePath = getContainerImagePath(container);
    const typeIcon = CONTAINER_TYPE_ICONS[container.type] || CONTAINER_TYPE_ICONS.standard;

    if (imagePath) {
        return `<img class="container-bar__img" src="${imagePath}" alt="${getLocalizedName(container)}"><span class="container-bar__fallback" hidden>${typeIcon}</span>`;
    }

    return `<span class="container-bar__icon">${typeIcon}</span>`;
}

function renderContainerSlotDots(slots) {
    const count = Math.max(0, slots || 0);
    if (!count) return '';
    const dots = Array.from({ length: count }, () => '<span class="container-card__slot-dot"></span>').join('');
    return `<div class="container-card__slots" title="${getSlotsText(count)}" aria-label="${getSlotsText(count)}">${dots}</div>`;
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
    if (!elements.armorPanelName) return;

    RARITY_ORDER.forEach(r => elements.armorPanelName.classList.remove(`rarity--${r}`));

    if (!state.selectedArmor) {
        elements.armorPanelName.textContent = t('calc.selectArmor');
        elements.armorPanelName.classList.remove('has-value');
        elements.armorPanel?.classList.remove('armor-panel--has-armor');
        if (elements.armorPanelActionsEmpty) elements.armorPanelActionsEmpty.hidden = false;
        if (elements.armorPanelActionsSelected) elements.armorPanelActionsSelected.hidden = true;
        return;
    }

    elements.armorPanelName.textContent = getLocalizedName(state.selectedArmor);
    elements.armorPanelName.classList.add('has-value');
    elements.armorPanelName.classList.add(`rarity--${state.selectedArmor.rarity || 'none'}`);
    elements.armorPanel?.classList.add('armor-panel--has-armor');
    if (elements.armorPanelActionsEmpty) elements.armorPanelActionsEmpty.hidden = true;
    if (elements.armorPanelActionsSelected) elements.armorPanelActionsSelected.hidden = false;
}

function sortContainersByRarity(containers) {
    return [...containers].sort((a, b) => {
        const diff = getRaritySortIndex(a.rarity) - getRaritySortIndex(b.rarity);
        if (diff !== 0) return diff;
        const slotsDiff = (b.slots || 0) - (a.slots || 0);
        if (slotsDiff !== 0) return slotsDiff;
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
        elements.armorPreview.innerHTML = `<img class="armor-panel__img" src="${ARMOR_EMPTY_IMAGE}" alt=""><div class="armor-panel__fallback">${shieldSvg}</div>`;
        const img = elements.armorPreview.querySelector('img');
        const fallback = elements.armorPreview.querySelector('.armor-panel__fallback');
        if (img && fallback) {
            fallback.hidden = true;
            img.onerror = () => { img.remove(); fallback.hidden = false; };
        }
        return;
    }

    const armor = state.selectedArmor;
    const imagePath = getArmorImagePath(armor);

    if (imagePath) {
        elements.armorPreview.innerHTML = `<img class="armor-panel__img" src="${imagePath}" alt="${getLocalizedName(armor)}"><div class="armor-panel__fallback">${shieldSvg}</div>`;
        const img = elements.armorPreview.querySelector('img');
        const fallback = elements.armorPreview.querySelector('.armor-panel__fallback');
        if (img && fallback) {
            fallback.hidden = true;
            img.onerror = () => { img.remove(); fallback.hidden = false; };
        }
    } else {
        elements.armorPreview.innerHTML = `<div class="armor-panel__fallback">${shieldSvg}</div>`;
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

function buildContainerDetailSection(title, statEntries) {
    if (!statEntries.length) return '';
    const rows = statEntries.map(([key, value]) => buildCompactStatRow(key, value, 0, { compact: true })).join('');
    return `<div class="container-detail__section"><div class="container-detail__section-title">${title}</div><div class="container-detail__stats">${rows}</div></div>`;
}

function partitionArmorStats(stats = {}) {
    const bullet = [];
    const regular = [];
    const extra = [];
    const regularSet = new Set(ARMOR_REGULAR_STAT_KEYS);
    const extraSet = new Set(ARMOR_EXTRA_STAT_KEYS);

    Object.entries(stats).forEach(([key, value]) => {
        if (key === 'bulletResistance') bullet.push([key, value]);
        else if (regularSet.has(key)) regular.push([key, value]);
        else if (extraSet.has(key)) extra.push([key, value]);
        else extra.push([key, value]);
    });

    const byOrder = (order) => (a, b) => order.indexOf(a[0]) - order.indexOf(b[0]);
    regular.sort(byOrder(ARMOR_REGULAR_STAT_KEYS));
    extra.sort(byOrder(ARMOR_EXTRA_STAT_KEYS));

    return { bullet, regular, extra };
}

function buildArmorDetailSection(title, statEntries) {
    if (!statEntries.length) return '';
    const rows = statEntries.map(([key, value]) => buildCompactStatRow(key, value, 0, { compact: true })).join('');
    return `<div class="armor-detail__section"><div class="armor-detail__section-title">${title}</div><div class="armor-detail__stats-group">${rows}</div></div>`;
}

function buildArmorDetailStatsHtml(stats = {}) {
    const { bullet, regular, extra } = partitionArmorStats(stats);
    const parts = [];

    bullet.forEach(([key, value]) => {
        parts.push(buildCompactStatRow(key, value, 0, { compact: true, highlight: 'bullet' }));
    });

    if (regular.length) {
        const rows = regular.map(([key, value]) => buildCompactStatRow(key, value, 0, { compact: true })).join('');
        parts.push(`<div class="armor-detail__stats-group">${rows}</div>`);
    }

    parts.push(buildArmorDetailSection(t('calc.armorModal.extraStats'), extra));

    return parts.filter(Boolean).join('');
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
    const highlightClass = options.highlight === 'bullet' ? ' calc-stat-row--bullet' : '';
    return `<div class="calc-stat-row${options.compact ? ' calc-stat-row--compact' : ''}${highlightClass}"><div class="calc-stat-row__left">${iconHtml}<span class="calc-stat-row__name">${getStatName(statKey)}</span></div><span class="calc-stat-row__value ${colorClass}">${displayValue}${getStatUnit(statKey)}${bonusHtml}</span></div>`;
}

function initElements() {
    elements = {
        armorSelect: document.getElementById('armorSelect'),
        armorPreview: document.getElementById('armorPreview'),
        armorPreviewBtn: document.getElementById('armorPreviewBtn'),
        armorPanel: document.getElementById('armorPanel'),
        armorPanelName: document.getElementById('armorPanelName'),
        armorPanelActionsEmpty: document.getElementById('armorPanelActionsEmpty'),
        armorPanelActionsSelected: document.getElementById('armorPanelActionsSelected'),
        armorPickerBtn: document.getElementById('armorPickerBtn'),
        armorReplaceBtn: document.getElementById('armorReplaceBtn'),
        armorClearBtn: document.getElementById('armorClearBtn'),
        armorModal: document.getElementById('armorModal'),
        armorModalClose: document.getElementById('armorModalClose'),
        armorModalSearch: document.getElementById('armorModalSearch'),
        armorSearchClear: document.getElementById('armorSearchClear'),
        armorModalList: document.getElementById('armorModalList'),
        armorModalDetail: document.getElementById('armorModalDetail'),
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
        modal: document.getElementById('artifactModal'),
        modalClose: document.getElementById('modalClose'),
        artifactSearch: document.getElementById('artifactSearch'),
        searchClear: document.getElementById('searchClear'),
        artifactList: document.getElementById('artifactList'),
        artifactModalDetail: document.getElementById('artifactModalDetail'),
        scrollTop: document.getElementById('scrollTop'),
        warningsContainer: document.getElementById('warningsContainer'),
        enhancementBlock: document.getElementById('enhancementBlock'),
        enhancementSlider: document.getElementById('enhancementSlider'),
        enhancementValue: document.getElementById('enhancementValue'),
        enhancementDecBtn: document.getElementById('enhancementDecBtn'),
        enhancementIncBtn: document.getElementById('enhancementIncBtn'),
        enhancementControls: document.getElementById('enhancementControls'),
        containerModal: document.getElementById('containerModal'),
        containerModalClose: document.getElementById('containerModalClose'),
        containerModalSearch: document.getElementById('containerModalSearch'),
        containerSearchClear: document.getElementById('containerSearchClear'),
        containerModalList: document.getElementById('containerModalList'),
        containerModalDetail: document.getElementById('containerModalDetail'),
        artifactDetailPanel: document.getElementById('artifactDetailPanel'),
        artifactCopyHint: document.getElementById('artifactCopyHint'),
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
    initCalcMobileCarousel();

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
        renderContainerModalList(elements.containerModalSearch?.value.toLowerCase().trim() || '');
        renderContainerModalDetail(state.containerModalPreviewId, true);
    }

    if (elements.modal.classList.contains('active')) {
        recreateStatFilters();
        applyFilters();
        renderArtifactModalDetail(state.artifactModalPreviewId, true);
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
.calculator-error{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px 20px 80px;text-align:center}
.calculator-error__icon{width:48px;height:48px;color:var(--color-text-muted);margin-bottom:16px}
.calculator-error__text{font-size:18px;color:var(--color-text-muted);margin-bottom:24px}
.calculator-error__btn{color:var(--color-accent);background:none;border:1px solid var(--color-accent);padding:12px 28px;border-radius:10px;cursor:pointer;font-size:14px;font-family:var(--font-main);transition:var(--transition)}
.calculator-error__btn:hover{background:rgba(196,163,90,0.15)}
@media(max-width:768px){
.modal__toolbar{padding:10px 14px;gap:10px}
.modal__search-box{padding:0 12px}
.modal__search-box input{padding:10px 8px;font-size:14px}
.modal__header{padding:12px 14px}
.modal__title{font-size:16px}
.modal__close{width:36px;height:36px}
.modal__body{padding:12px}
.artifacts-grid{gap:8px}
.artifact-card{padding:8px 6px}
.artifact-card__image{width:36px;height:36px}
.artifact-card__img{width:36px;height:36px}
.artifact-card__name{font-size:11px}
.artifact-card__tier{font-size:10px}
}
@media(max-width:480px){
.modal__toolbar{padding:8px 12px;gap:8px}
.modal__search-box input{padding:8px 6px;font-size:13px}
.modal__body{padding:10px}
.artifact-card__image{width:32px;height:32px}
.artifact-card__img{width:32px;height:32px}
}`;
    document.head.appendChild(style);
}

function getStatFilterTagMaxLength(selectedCount) {
    if (selectedCount <= 1) return 14;
    if (selectedCount === 2) return 9;
    if (selectedCount <= 4) return 6;
    return 4;
}

function truncateStatFilterName(name, maxLength = 12) {
    if (!name || name.length <= maxLength) return name;
    return `${name.slice(0, maxLength - 1)}…`;
}

function updateStatFilterInputPlaceholder(combobox, filterKey) {
    const input = combobox?.querySelector('.stat-filter-combobox__input');
    if (!input) return;

    const placeholderKey = combobox.dataset.placeholderKey;
    input.placeholder = state.filters[filterKey].length ? '' : (placeholderKey ? t(placeholderKey) : '');
}

function renderStatFilterTags(combobox, filterKey, variant) {
    const tagsEl = combobox.querySelector('.stat-filter-combobox__tags');
    if (!tagsEl) return;

    const selectedCount = state.filters[filterKey].length;
    const maxLength = getStatFilterTagMaxLength(selectedCount);

    tagsEl.innerHTML = state.filters[filterKey].map(statKey => {
        const fullName = getStatName(statKey);
        const shortName = truncateStatFilterName(fullName, maxLength);
        return `<span class="stat-filter-tag stat-filter-tag--${variant}" title="${fullName}"><span class="stat-filter-tag__label">${shortName}</span><button type="button" class="stat-filter-tag__remove" data-stat="${statKey}" aria-label="${t('calc.filter.remove')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg></button></span>`;
    }).join('');

    updateStatFilterInputPlaceholder(combobox, filterKey);
}

function getFilteredStatOptions(statsMap, selectedEffects, query) {
    const q = query.toLowerCase().trim();
    return statsMap.filter(([statKey]) => {
        if (selectedEffects.includes(statKey)) return false;
        if (!q) return true;
        const nameRu = STAT_NAMES[statKey] || '';
        const nameEn = STAT_NAMES_EN[statKey] || '';
        return nameRu.toLowerCase().includes(q) || nameEn.toLowerCase().includes(q) || statKey.toLowerCase().includes(q);
    });
}

function renderStatFilterComboboxList(combobox, statsMap, filterKey, query) {
    const list = combobox.querySelector('.stat-filter-combobox__list');
    if (!list) return;

    const available = getFilteredStatOptions(statsMap, state.filters[filterKey], query);
    if (!available.length) {
        list.innerHTML = `<div class="stat-filter-combobox__empty">${query ? t('calc.modal.noResults') : t('calc.filter.allSelected')}</div>`;
        return;
    }

    list.innerHTML = available.map(([statKey, count]) => `<button type="button" class="stat-filter-combobox__option" data-value="${statKey}"><span class="stat-filter-combobox__option-name">${getStatName(statKey)}</span><span class="stat-filter-combobox__option-count">${count}</span></button>`).join('');
}

function openStatFilterCombobox(combobox) {
    closeStatFilterComboboxes(combobox);
    combobox.classList.add('open');
}

function closeStatFilterComboboxes(except) {
    document.querySelectorAll('#statFiltersContainer .stat-filter-combobox.open').forEach(combobox => {
        if (combobox !== except) combobox.classList.remove('open');
    });
}

function toggleStatFilterComboboxMenu(combobox, statsMap, filterKey, input) {
    if (combobox.classList.contains('open')) {
        combobox.classList.remove('open');
        input.blur();
        return;
    }
    openStatFilterComboboxMenu(combobox, statsMap, filterKey, input);
}

function openStatFilterComboboxMenu(combobox, statsMap, filterKey, input) {
    openStatFilterCombobox(combobox);
    renderStatFilterComboboxList(combobox, statsMap, filterKey, input.value);
}

function handleStatFilterOutsideClick(e) {
    if (!e.target.closest('.stat-filter-combobox')) closeStatFilterComboboxes();
}

function addStatFilterFromCombobox(filterKey, combobox, variant, statKey) {
    if (!statKey || state.filters[filterKey].includes(statKey)) return;

    state.filters[filterKey].push(statKey);
    renderStatFilterTags(combobox, filterKey, variant);
    updateFiltersBadge();
    updateStatFilterClearButtons();
    applyFilters();
}

function removeStatFilterFromCombobox(filterKey, combobox, variant, statKey) {
    state.filters[filterKey] = state.filters[filterKey].filter(key => key !== statKey);
    renderStatFilterTags(combobox, filterKey, variant);
    updateFiltersBadge();
    updateStatFilterClearButtons();
    applyFilters();
}

function clearStatFilterGroup(filterKey, combobox, variant, statsMap) {
    state.filters[filterKey] = [];
    renderStatFilterTags(combobox, filterKey, variant);

    const input = combobox.querySelector('.stat-filter-combobox__input');
    if (input) input.value = '';

    renderStatFilterComboboxList(combobox, statsMap, filterKey, '');
    combobox.classList.remove('open');
    updateFiltersBadge();
    updateStatFilterClearButtons();
    applyFilters();
}

function resetStatFilterComboboxes() {
    const configs = [
        { comboboxId: 'positiveEffectCombobox', filterKey: 'positiveEffects', variant: 'positive', statsMap: statFilterOptions.positive },
        { comboboxId: 'negativeEffectCombobox', filterKey: 'negativeEffects', variant: 'negative', statsMap: statFilterOptions.negative }
    ];

    configs.forEach(({ comboboxId, filterKey, variant, statsMap }) => {
        const combobox = document.getElementById(comboboxId);
        if (!combobox) return;

        renderStatFilterTags(combobox, filterKey, variant);
        const input = combobox.querySelector('.stat-filter-combobox__input');
        if (input) input.value = '';
        updateStatFilterInputPlaceholder(combobox, filterKey);
        renderStatFilterComboboxList(combobox, statsMap, filterKey, '');
        combobox.classList.remove('open');
    });

    updateStatFilterClearButtons();
}

function initStatFilterCombobox({ comboboxId, inputId, filterKey, variant, statsMap }) {
    const combobox = document.getElementById(comboboxId);
    const input = document.getElementById(inputId);
    if (!combobox || !input) return;

    renderStatFilterTags(combobox, filterKey, variant);
    updateStatFilterClearButtons();

    const clearBtn = combobox.querySelector('.stat-filter-combobox__clear');
    clearBtn?.addEventListener('mousedown', (e) => e.preventDefault());
    clearBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        clearStatFilterGroup(filterKey, combobox, variant, statsMap);
    });

    combobox.querySelector('.stat-filter-combobox__field').addEventListener('mousedown', (e) => {
        if (e.target.closest('.stat-filter-tag__remove')) return;
        if (e.target.closest('.stat-filter-combobox__arrow')) return;
        e.preventDefault();
        input.focus();
        openStatFilterComboboxMenu(combobox, statsMap, filterKey, input);
    });

    const arrow = combobox.querySelector('.stat-filter-combobox__arrow');
    let arrowTouchHandled = false;

    const handleArrowToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        input.blur();
        toggleStatFilterComboboxMenu(combobox, statsMap, filterKey, input);
    };

    arrow?.addEventListener('touchend', (e) => {
        arrowTouchHandled = true;
        handleArrowToggle(e);
        setTimeout(() => {
            arrowTouchHandled = false;
        }, 400);
    }, { passive: false });

    arrow?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    arrow?.addEventListener('click', (e) => {
        if (arrowTouchHandled) return;
        handleArrowToggle(e);
    });

    input.addEventListener('focus', () => {
        openStatFilterComboboxMenu(combobox, statsMap, filterKey, input);
    });

    input.addEventListener('input', () => {
        openStatFilterComboboxMenu(combobox, statsMap, filterKey, input);
    });

    combobox.querySelector('.stat-filter-combobox__list').addEventListener('mousedown', (e) => {
        e.preventDefault();
    });

    combobox.querySelector('.stat-filter-combobox__list').addEventListener('click', (e) => {
        const option = e.target.closest('.stat-filter-combobox__option');
        if (!option) return;

        addStatFilterFromCombobox(filterKey, combobox, variant, option.dataset.value);
        input.value = '';
        openStatFilterComboboxMenu(combobox, statsMap, filterKey, input);
        input.focus();
    });

    combobox.querySelector('.stat-filter-combobox__tags').addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.stat-filter-tag__remove');
        if (!removeBtn) return;

        removeStatFilterFromCombobox(filterKey, combobox, variant, removeBtn.dataset.stat);
        openStatFilterComboboxMenu(combobox, statsMap, filterKey, input);
        input.focus();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            combobox.classList.remove('open');
            input.blur();
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            const first = combobox.querySelector('.stat-filter-combobox__option');
            if (first) {
                addStatFilterFromCombobox(filterKey, combobox, variant, first.dataset.value);
                input.value = '';
                openStatFilterComboboxMenu(combobox, statsMap, filterKey, input);
            }
            return;
        }

        if (e.key === 'Backspace' && !input.value && state.filters[filterKey].length) {
            const last = state.filters[filterKey][state.filters[filterKey].length - 1];
            removeStatFilterFromCombobox(filterKey, combobox, variant, last);
            openStatFilterComboboxMenu(combobox, statsMap, filterKey, input);
        }
    });
}

function createStatFilterComboboxMarkup(comboboxId, variant, inputId, placeholderKey) {
    return `<div class="stat-filter-combobox stat-filter-combobox--${variant}" id="${comboboxId}" data-variant="${variant}" data-placeholder-key="${placeholderKey}"><div class="stat-filter-combobox__row"><div class="stat-filter-combobox__field"><div class="stat-filter-combobox__tags"></div><input type="text" class="stat-filter-combobox__input" id="${inputId}" placeholder="${t(placeholderKey)}" autocomplete="off" spellcheck="false"><span class="stat-filter-combobox__arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></span></div><button type="button" class="stat-filter-combobox__clear" aria-label="${t('calc.filter.clearType')}" disabled hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div><div class="stat-filter-combobox__menu"><div class="stat-filter-combobox__list"></div></div></div>`;
}

function createStatFilters() {
    const toolbar = document.querySelector('#artifactModal .modal__toolbar');
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
    statFilterOptions.positive = sortedPositive;
    statFilterOptions.negative = sortedNegative;

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'filtersToggle';
    toggleBtn.className = 'filters-toggle';
    toggleBtn.type = 'button';
    toggleBtn.innerHTML = `<div class="filters-toggle__left"><span class="filters-toggle__text">${t('calc.filter.byProperties')}</span><span class="filters-toggle__badge" id="filtersBadge">0</span></div><span class="filters-toggle__arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></span>`;

    const wrapper = document.createElement('div');
    wrapper.id = 'statFiltersWrapper';
    wrapper.className = 'stat-filters-wrapper collapsed';

    const container = document.createElement('div');
    container.id = 'statFiltersContainer';
    container.className = 'stat-filters';
    container.innerHTML = `<div class="stat-filter stat-filter--positive">${createStatFilterComboboxMarkup('positiveEffectCombobox', 'positive', 'positiveEffectInput', 'calc.filter.selectPositive')}</div><div class="stat-filter stat-filter--negative">${createStatFilterComboboxMarkup('negativeEffectCombobox', 'negative', 'negativeEffectInput', 'calc.filter.selectNegative')}</div>`;

    wrapper.appendChild(container);
    toolbar.appendChild(toggleBtn);
    toolbar.appendChild(wrapper);

    toggleBtn.addEventListener('click', toggleFiltersPanel);

    initStatFilterCombobox({
        comboboxId: 'positiveEffectCombobox',
        inputId: 'positiveEffectInput',
        filterKey: 'positiveEffects',
        variant: 'positive',
        statsMap: sortedPositive
    });
    initStatFilterCombobox({
        comboboxId: 'negativeEffectCombobox',
        inputId: 'negativeEffectInput',
        filterKey: 'negativeEffects',
        variant: 'negative',
        statsMap: sortedNegative
    });

    if (!createStatFilters.outsideClickBound) {
        document.addEventListener('click', handleStatFilterOutsideClick);
        createStatFilters.outsideClickBound = true;
    }

    updateStatFilterClearButtons();
}

function toggleFiltersPanel() {
    const toggle = document.getElementById('filtersToggle');
    const wrapper = document.getElementById('statFiltersWrapper');
    if (!toggle || !wrapper) return;

    state.filtersExpanded = !state.filtersExpanded;
    toggle.classList.toggle('active', state.filtersExpanded);
    wrapper.classList.toggle('collapsed', !state.filtersExpanded);

    const syncAfterTransition = (event) => {
        if (event.propertyName !== 'grid-template-rows') return;
        wrapper.removeEventListener('transitionend', syncAfterTransition);
        scheduleArtifactModalGridSync();
    };

    wrapper.removeEventListener('transitionend', syncAfterTransition);
    if (state.filtersExpanded) {
        wrapper.addEventListener('transitionend', syncAfterTransition);
    } else {
        scheduleArtifactModalGridSync();
    }
}

function updateFiltersBadge() {
    const badge = document.getElementById('filtersBadge');
    if (!badge) return;
    let count = state.filters.positiveEffects.length + state.filters.negativeEffects.length;
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
}

function updateStatFilterClearButtons() {
    const configs = [
        { comboboxId: 'positiveEffectCombobox', filterKey: 'positiveEffects' },
        { comboboxId: 'negativeEffectCombobox', filterKey: 'negativeEffects' }
    ];

    configs.forEach(({ comboboxId, filterKey }) => {
        const combobox = document.getElementById(comboboxId);
        const clearBtn = combobox?.querySelector('.stat-filter-combobox__clear');
        if (!clearBtn) return;

        const hasFilters = state.filters[filterKey].length > 0;
        clearBtn.disabled = !hasFilters;
        clearBtn.hidden = !hasFilters;
    });
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
    elements.armorPreviewBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        openArmorModal();
    });
    elements.armorReplaceBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
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
}

function openArmorModal() {
    state.armorModalPreviewId = state.selectedArmor?.id || null;
    elements.armorModal.classList.add('active');
    if (elements.armorModalSearch) {
        elements.armorModalSearch.value = '';
        if (elements.armorSearchClear) elements.armorSearchClear.style.display = 'none';
    }
    renderArmorModalList();
    renderArmorModalDetail(state.armorModalPreviewId);
    const isMobile = isPickerMobileLayout();
    if (!isMobile && elements.armorModalSearch) elements.armorModalSearch.focus();
    schedulePickerGridSync(elements.armorModalList);
    document.body.style.overflow = 'hidden';
}

function closeArmorModal() {
    elements.armorModal.classList.remove('active');
    resetPickerGridRows(elements.armorModalList);
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
        return `<button class="armor-card armor-card--${rarityClass} ${isPreview ? 'armor-card--preview' : ''} ${isSelected ? 'armor-card--equipped' : ''}" type="button" data-armor-id="${armor.id}"><div class="armor-card__image">${getArmorCardIcon(armor)}</div><div class="armor-card__name">${getLocalizedName(armor)}</div></button>`;
    }).join('');

    elements.armorModalList.innerHTML = html;
    bindArmorCardFallbacks(elements.armorModalList);
    if (elements.armorModal?.classList.contains('active')) {
        schedulePickerGridSync(elements.armorModalList);
    }
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
    const statsHtml = buildArmorDetailStatsHtml(armor.stats);
    const isEquipped = state.selectedArmor?.id === armor.id;

    const typeHtml = armor.type ? `<div class="armor-detail__type">${getArmorTypeName(armor.type)}</div>` : '';
    elements.armorModalDetail.innerHTML = `<div class="armor-detail__head"><div class="armor-detail__preview">${imageHtml}</div><div class="armor-detail__meta"><div class="armor-detail__name rarity--${rarityClass}">${getLocalizedName(armor)}</div>${typeHtml}</div></div><button class="armor-detail__select ${isEquipped ? 'armor-detail__select--equipped' : ''}" type="button">${isEquipped ? t('calc.armorModal.equipped') : t('calc.armorModal.select')}</button><div class="armor-detail__stats">${statsHtml}</div>`;

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
    if (armor.enhancement) updateEnhancementDisplay();
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
    elements.containerModal.querySelector('.container-modal__layout')?.addEventListener('click', handleContainerModalClick);
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
    exitArtifactCopyMode();
    state.artifacts = new Array(state.selectedContainer.slots).fill(null);
    closeClearArtifactsConfirm();
    renderArtifactSlots();
    renderContainerBar();
    updateStats();
    saveStateToStorage();
}

function openContainerModal() {
    state.containerModalPreviewId = state.selectedContainer?.id || null;
    elements.containerModal.classList.add('active');
    if (elements.containerModalSearch) {
        elements.containerModalSearch.value = '';
        if (elements.containerSearchClear) elements.containerSearchClear.style.display = 'none';
    }
    renderContainerModalList();
    renderContainerModalDetail(state.containerModalPreviewId);
    const isMobile = isPickerMobileLayout();
    if (!isMobile && elements.containerModalSearch) elements.containerModalSearch.focus();
    document.body.style.overflow = 'hidden';
}

function closeContainerModal() {
    elements.containerModal.classList.remove('active');
    lastContainerDetailId = null;
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
    const selectBtn = e.target.closest('.container-detail__select');
    if (selectBtn) {
        if (!selectBtn.disabled) confirmContainerSelection();
        return;
    }

    const card = e.target.closest('.container-card');
    if (card?.dataset.containerId) {
        const nextId = card.dataset.containerId;
        if (nextId === state.containerModalPreviewId) return;
        state.containerModalPreviewId = nextId;
        updateContainerModalCardStates();
        renderContainerModalDetail(state.containerModalPreviewId);
    }
}

function updateContainerModalCardStates() {
    if (!elements.containerModalList) return;
    elements.containerModalList.querySelectorAll('.container-card').forEach(card => {
        const id = card.dataset.containerId;
        card.classList.toggle('container-card--preview', id === state.containerModalPreviewId);
        card.classList.toggle('container-card--selected', id === state.selectedContainer?.id);
    });
}

function confirmContainerSelection() {
    if (!state.containerModalPreviewId) return;
    const container = CONTAINERS.find(c => c.id === state.containerModalPreviewId);
    if (!container || !isContainerAvailable(container)) return;
    if (state.selectedContainer?.id === state.containerModalPreviewId) {
        closeContainerModal();
        return;
    }
    selectContainer(state.containerModalPreviewId);
}

function renderContainerModalDetail(containerId, force = false) {
    if (!elements.containerModalDetail) return;

    if (!containerId) {
        lastContainerDetailId = null;
        elements.containerModalDetail.innerHTML = `<div class="container-detail__placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg><span>${t('calc.containerModal.selectHint')}</span></div>`;
        return;
    }

    if (!force && containerId === lastContainerDetailId) return;

    const container = CONTAINERS.find(c => c.id === containerId);
    if (!container) return;

    lastContainerDetailId = containerId;

    const rarityClass = container.rarity || 'none';
    const imagePath = getContainerImagePath(container);
    const typeIcon = CONTAINER_TYPE_ICONS[container.type] || CONTAINER_TYPE_ICONS.standard;
    const imageHtml = imagePath
        ? `<img class="container-detail__img" src="${imagePath}" alt="${getLocalizedName(container)}"><span class="container-detail__icon-fallback" hidden>${typeIcon}</span>`
        : `<span class="container-detail__icon">${typeIcon}</span>`;

    const shieldingEntries = Object.entries(container.shielding || {}).filter(([, value]) => value !== 0);
    const statEntries = Object.entries(container.stats || {}).filter(([, value]) => value !== 0);
    const shieldingHtml = buildContainerDetailSection(t('calc.shieldingTitle'), shieldingEntries);
    const statsHtml = buildContainerDetailSection(t('calc.containerModal.properties'), statEntries);
    const noEffectsHtml = !shieldingEntries.length && !statEntries.length
        ? `<div class="container-detail__empty">${t('calc.noShieldingFull')}</div>`
        : '';

    const isEquipped = state.selectedContainer?.id === container.id;
    const isAvailable = isContainerAvailable(container);
    const incompatNote = !isAvailable
        ? `<div class="container-detail__incompat">${t('calc.containerIncompatible')}</div>`
        : '';

    elements.containerModalDetail.innerHTML = `<div class="container-detail__head"><div class="container-detail__preview">${imageHtml}</div><div class="container-detail__meta"><div class="container-detail__name rarity--${rarityClass}">${getLocalizedName(container)}</div><div class="container-detail__type">${getContainerTypeName(container.type)} · ${getSlotsText(container.slots)}</div></div></div>${incompatNote}<div class="container-detail__body">${shieldingHtml}${statsHtml}${noEffectsHtml}</div><button class="container-detail__select ${isEquipped ? 'container-detail__select--equipped' : ''}" type="button" ${!isAvailable ? 'disabled' : ''}>${isEquipped ? t('calc.containerModal.equipped') : t('calc.containerModal.select')}</button>`;

    const img = elements.containerModalDetail.querySelector('.container-detail__img');
    if (img) {
        img.onerror = () => {
            img.hidden = true;
            const fallback = img.parentElement?.querySelector('.container-detail__icon-fallback');
            if (fallback) fallback.hidden = false;
        };
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
        renderContainerModalDetail(null, true);
        return;
    }

    const html = containers.map(container => {
        const isPreview = state.containerModalPreviewId === container.id;
        const isSelected = state.selectedContainer?.id === container.id;
        const isAvailable = isContainerAvailable(container);
        const rarityClass = container.rarity || 'none';
        const incompatBadge = !isAvailable ? `<div class="container-card__incompat" title="${t('calc.containerIncompatible')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 9l6 6M15 9l-6 6"/></svg></div>` : '';

        return `<button class="container-card container-card--${rarityClass} ${isPreview ? 'container-card--preview' : ''} ${isSelected ? 'container-card--selected' : ''} ${!isAvailable ? 'container-card--incompatible' : ''}" type="button" data-container-id="${container.id}"><div class="container-card__image">${getContainerDropdownIcon(container)}${incompatBadge}</div><div class="container-card__name">${getLocalizedName(container)}</div>${renderContainerSlotDots(container.slots)}</button>`;
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
        renderContainerModalDetail(state.containerModalPreviewId, true);
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
    elements.modalClose.addEventListener('click', closeModal);
    elements.modal.querySelector('.modal__backdrop').addEventListener('click', closeModal);
    elements.artifactSearch.addEventListener('input', handleSearchChange);

    if (elements.enhancementSlider) {
        elements.enhancementSlider.addEventListener('input', handleEnhancementChange);
        elements.enhancementSlider.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
        elements.enhancementSlider.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
    }

    elements.enhancementDecBtn?.addEventListener('click', () => setEnhancementLevel(state.enhancementLevel - 1));
    elements.enhancementIncBtn?.addEventListener('click', () => setEnhancementLevel(state.enhancementLevel + 1));
    elements.enhancementControls?.addEventListener('wheel', handleEnhancementWheel, { passive: false });
    elements.enhancementValue?.addEventListener('change', handleEnhancementInput);
    elements.enhancementValue?.addEventListener('keydown', handleEnhancementKeydown);
    elements.enhancementValue?.addEventListener('blur', handleEnhancementInputBlur);
    elements.enhancementValue?.addEventListener('focus', (e) => e.target.select());

    if (elements.searchClear) {
        elements.searchClear.addEventListener('click', () => {
            elements.artifactSearch.value = '';
            state.filters.search = '';
            elements.searchClear.style.display = 'none';
            updateStatFilterClearButtons();
            applyFilters();
            elements.artifactSearch.focus();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (elements.clearArtifactsConfirm.classList.contains('active')) closeClearArtifactsConfirm();
        else if (state.artifactCopyMode) exitArtifactCopyMode();
        else if (elements.armorModal.classList.contains('active')) closeArmorModal();
        else if (elements.containerModal.classList.contains('active')) closeContainerModal();
        else if (elements.modal.classList.contains('active')) closeModal();
    });

    // Определяем, поддерживает ли устройство тач
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

initArtifactSlotListeners(isTouchDevice);

    elements.artifactList.addEventListener('click', handleArtifactModalClick);
    if (elements.artifactModalDetail) {
        elements.artifactModalDetail.addEventListener('click', handleArtifactModalClick);
    }

    window.addEventListener('resize', () => {
        syncArtifactSlotSortableHandle();
        if (elements.modal?.classList.contains('active')) {
            schedulePickerGridSync(elements.artifactList);
        }
        if (elements.armorModal?.classList.contains('active')) {
            schedulePickerGridSync(elements.armorModalList);
        }
    });
}

function initCalcMobileCarousel() {
    const track = document.getElementById('calcCarouselTrack');
    const nav = document.getElementById('calcCarouselNav');
    if (!track || !nav) return;

    const tabs = nav.querySelectorAll('[data-slide]');
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    let activeIndex = 0;
    let scrollRaf = null;
    let swipeOriginIndex = null;

    function isActive() {
        return mobileQuery.matches;
    }

    function getSlideWidth() {
        return track.clientWidth;
    }

    function getClampedSlideIndex(fromIndex, rawIndex) {
        const minIndex = Math.max(0, fromIndex - 1);
        const maxIndex = Math.min(tabs.length - 1, fromIndex + 1);
        return Math.max(minIndex, Math.min(rawIndex, maxIndex));
    }

    function getRawSlideIndex() {
        const width = getSlideWidth();
        if (width <= 0) return activeIndex;
        return Math.round(track.scrollLeft / width);
    }

    function setActiveSlide(index) {
        const clamped = Math.max(0, Math.min(index, tabs.length - 1));
        activeIndex = clamped;
        tabs.forEach((tab, i) => {
            const isCurrent = i === clamped;
            tab.classList.toggle('is-active', isCurrent);
            tab.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
        });
    }

    function scrollToSlide(index, behavior = 'smooth') {
        if (!isActive()) return;
        const width = getSlideWidth();
        if (width <= 0) return;
        const clamped = Math.max(0, Math.min(index, tabs.length - 1));
        track.scrollTo({ left: width * clamped, behavior });
        setActiveSlide(clamped);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            scrollToSlide(parseInt(tab.dataset.slide, 10));
        });
    });

    track.addEventListener('scroll', () => {
        if (!isActive()) return;
        if (scrollRaf) cancelAnimationFrame(scrollRaf);
        scrollRaf = requestAnimationFrame(() => {
            let index = getRawSlideIndex();
            if (swipeOriginIndex !== null) {
                index = getClampedSlideIndex(swipeOriginIndex, index);
            }
            setActiveSlide(index);
        });
    }, { passive: true });

    function finalizeSwipeScroll() {
        if (!isActive()) return;
        const origin = swipeOriginIndex;
        swipeOriginIndex = null;
        if (origin === null) return;

        const width = getSlideWidth();
        if (width <= 0) return;

        const targetIndex = getClampedSlideIndex(origin, getRawSlideIndex());
        if (Math.abs(track.scrollLeft - width * targetIndex) > 1) {
            scrollToSlide(targetIndex);
        } else {
            setActiveSlide(targetIndex);
        }
    }

    track.addEventListener('touchstart', () => {
        if (!isActive()) return;
        swipeOriginIndex = activeIndex;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        if (!isActive() || swipeOriginIndex === null) return;
        if ('onscrollend' in track) return;
        requestAnimationFrame(() => requestAnimationFrame(finalizeSwipeScroll));
    }, { passive: true });

    track.addEventListener('touchcancel', () => {
        swipeOriginIndex = null;
    }, { passive: true });

    if ('onscrollend' in track) {
        track.addEventListener('scrollend', () => {
            if (swipeOriginIndex !== null) finalizeSwipeScroll();
        }, { passive: true });
    }

    const handleLayoutChange = () => {
        if (isActive()) {
            scrollToSlide(activeIndex, 'auto');
        } else {
            track.scrollLeft = 0;
            setActiveSlide(0);
        }
    };

    if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', handleLayoutChange);
    } else if (typeof mobileQuery.addListener === 'function') {
        mobileQuery.addListener(handleLayoutChange);
    }

    window.addEventListener('resize', handleLayoutChange);
}

function handleSearchChange(e) {
    state.filters.search = e.target.value.trim();
    if (elements.searchClear) elements.searchClear.style.display = state.filters.search ? 'flex' : 'none';
    updateStatFilterClearButtons();
    applyFilters();
}

function applyFilters() {
    let filtered = [...ARTIFACTS];

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

    if (state.filters.positiveEffects.length) {
        filtered = filtered.filter(a => state.filters.positiveEffects.every(statKey => {
            const value = a.stats[statKey];
            return value !== undefined && isPositiveEffect(statKey, value);
        }));
    }

    if (state.filters.negativeEffects.length) {
        filtered = filtered.filter(a => state.filters.negativeEffects.every(statKey => {
            const value = a.stats[statKey];
            return value !== undefined && isNegativeEffect(statKey, value);
        }));
    }

    renderArtifactList(filtered);

    if (state.artifactModalPreviewId && !filtered.some(a => a.id === state.artifactModalPreviewId)) {
        state.artifactModalPreviewId = null;
        renderArtifactModalDetail(null, true);
    } else {
        updateArtifactModalCardStates();
    }
}

function handleArtifactModalClick(e) {
    const selectBtn = e.target.closest('.artifact-modal-detail__select');
    if (selectBtn) {
        confirmArtifactSelection();
        return;
    }

    const card = e.target.closest('.artifact-card');
    if (card?.dataset.artifactId) {
        const nextId = card.dataset.artifactId;
        if (nextId === state.artifactModalPreviewId) return;
        state.artifactModalPreviewId = nextId;
        updateArtifactModalCardStates();
        renderArtifactModalDetail(state.artifactModalPreviewId);
    }
}

function updateArtifactModalCardStates() {
    if (!elements.artifactList) return;
    elements.artifactList.querySelectorAll('.artifact-card').forEach(card => {
        const id = card.dataset.artifactId;
        card.classList.toggle('artifact-card--preview', id === state.artifactModalPreviewId);
        const isEquipped = state.currentSlotIndex !== null && state.artifacts[state.currentSlotIndex]?.id === id;
        card.classList.toggle('artifact-card--equipped', isEquipped);
    });
}

function confirmArtifactSelection() {
    if (!state.artifactModalPreviewId) return;
    const currentInSlot = state.currentSlotIndex !== null
        ? state.artifacts[state.currentSlotIndex]?.id
        : null;
    if (currentInSlot === state.artifactModalPreviewId) {
        closeModal();
        return;
    }
    selectArtifact(state.artifactModalPreviewId);
}

function renderArtifactModalDetail(artifactId, force = false) {
    if (!elements.artifactModalDetail) return;

    if (!artifactId) {
        lastArtifactDetailId = null;
        elements.artifactModalDetail.innerHTML = `<div class="artifact-modal-detail__placeholder"><span>${t('calc.artifactModal.selectHint')}</span></div>`;
        return;
    }

    if (!force && artifactId === lastArtifactDetailId) return;

    const artifact = ARTIFACTS.find(a => a.id === artifactId);
    if (!artifact) return;

    lastArtifactDetailId = artifactId;

    const imageSrc = getArtifactImagePath(artifact);
    const tierDisplay = getArtifactTierDisplay(artifact.tier);
    const isEquipped = state.currentSlotIndex !== null && state.artifacts[state.currentSlotIndex]?.id === artifact.id;

    elements.artifactModalDetail.innerHTML = `<div class="artifact-detail artifact-detail--${artifact.category}"><div class="artifact-detail__head"><div class="artifact-detail__preview"><img src="${imageSrc}" alt="${getLocalizedName(artifact)}" onerror="this.style.display='none'"></div><div class="artifact-detail__meta"><div class="artifact-detail__name">${getLocalizedName(artifact)}</div><span class="artifact-modal-detail__tier">${tierDisplay}</span></div></div><button class="artifact-modal-detail__select ${isEquipped ? 'artifact-modal-detail__select--equipped' : ''}" type="button">${isEquipped ? t('calc.artifactModal.equipped') : t('calc.artifactModal.select')}</button><div class="artifact-detail__stats">${renderArtifactSlotStats(artifact)}</div></div>`;
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
        renderContainerModalDetail(state.containerModalPreviewId, true);
    }
    elements.containerSelect.disabled = false;
}


function handleEnhancementChange(e) {
    setEnhancementLevel(parseInt(e.target.value, 10));
}

function setEnhancementLevel(level) {
    if (!state.selectedArmor?.enhancement) return;
    const maxLevel = state.selectedArmor.enhancement.maxLevel;
    const nextLevel = Math.max(0, Math.min(maxLevel, level));

    if (nextLevel !== state.enhancementLevel) {
        state.previousStats = calculateTotalStats();
        state.enhancementLevel = nextLevel;
        renderArmorPreview();
        updateStats();
        saveStateToStorage();
    }

    updateEnhancementDisplay();
}

function handleEnhancementWheel(e) {
    if (!state.selectedArmor?.enhancement) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1 : -1;
    setEnhancementLevel(state.enhancementLevel + delta);
}

function handleEnhancementInput(e) {
    const raw = e.target.value.trim();
    if (raw === '') return;
    const parsed = parseInt(raw, 10);
    if (Number.isNaN(parsed)) {
        updateEnhancementDisplay();
        return;
    }
    setEnhancementLevel(parsed);
}

function handleEnhancementInputBlur() {
    if (!elements.enhancementValue) return;
    if (elements.enhancementValue.value.trim() === '') {
        updateEnhancementDisplay();
        return;
    }
    handleEnhancementInput({ target: elements.enhancementValue });
}

function handleEnhancementKeydown(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        elements.enhancementValue?.blur();
        return;
    }
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        setEnhancementLevel(state.enhancementLevel + 1);
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setEnhancementLevel(state.enhancementLevel - 1);
    }
}

function showEnhancementBlock() {
    if (!elements.enhancementBlock) return;
    const maxLevel = state.selectedArmor.enhancement.maxLevel;
    elements.enhancementSlider.max = maxLevel;
    elements.enhancementSlider.value = state.enhancementLevel;
    elements.enhancementBlock.style.display = 'flex';
    elements.enhancementBlock.classList.add('visible');
    updateEnhancementDisplay();
}

function hideEnhancementBlock() {
    if (!elements.enhancementBlock) return;
    elements.enhancementBlock.style.display = 'none';
    elements.enhancementBlock.classList.remove('visible');
}

function updateEnhancementDisplay() {
    if (!elements.enhancementBlock || !state.selectedArmor?.enhancement) return;
    const level = state.enhancementLevel;
    const maxLevel = state.selectedArmor.enhancement.maxLevel;

    elements.enhancementValue.value = level;
    elements.enhancementValue.min = 0;
    elements.enhancementValue.max = maxLevel;
    elements.enhancementSlider.value = level;
    elements.enhancementSlider.max = maxLevel;
    elements.enhancementBlock.setAttribute('data-level', level);

    if (elements.enhancementDecBtn) elements.enhancementDecBtn.disabled = level <= 0;
    if (elements.enhancementIncBtn) elements.enhancementIncBtn.disabled = level >= maxLevel;
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
    state.selectedArtifactSlotIndex = null;
    exitArtifactCopyMode();

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
        renderContainerModalDetail(state.containerModalPreviewId, true);
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
            valueClass = isInverted ? 'artifact-detail__stat-value--neg' : 'artifact-detail__stat-value--pos';
        } else if (value < 0) {
            displayValue = `${formatNumber(value)}${getStatUnit(key)}`;
            valueClass = isInverted ? 'artifact-detail__stat-value--pos' : 'artifact-detail__stat-value--neg';
        } else {
            displayValue = `0${getStatUnit(key)}`;
            valueClass = '';
        }
        return `<div class="artifact-detail__stat"><span class="artifact-detail__stat-name">${getStatName(key)}</span><span class="artifact-detail__stat-value ${valueClass}">${displayValue}</span></div>`;
    }).join('');
}

function syncSelectedArtifactSlot() {
    const idx = state.selectedArtifactSlotIndex;
    if (idx !== null && state.artifacts[idx]) return;

    const firstFilled = state.artifacts.findIndex(a => a !== null);
    state.selectedArtifactSlotIndex = firstFilled === -1 ? null : firstFilled;
}

function renderArtifactSlotGrip() {
    return `<span class="artifact-slot-card__grip" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg></span>`;
}

function renderArtifactSlotActions(index) {
    const copyActive = state.artifactCopyMode && state.selectedArtifactSlotIndex === index;
    const copyActiveClass = copyActive ? ' artifact-slot-card__action--active' : '';

    return `<div class="artifact-slot-card__actions"><button class="artifact-slot-card__action artifact-slot-card__action--delete" type="button" data-slot-action="delete" title="${t('calc.artifactActions.delete')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></button><button class="artifact-slot-card__action artifact-slot-card__action--copy${copyActiveClass}" type="button" data-slot-action="copy" title="${t('calc.artifactActions.copy')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg></button><button class="artifact-slot-card__action artifact-slot-card__action--replace" type="button" data-slot-action="replace" title="${t('calc.artifactActions.replace')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M21 21v-5h-5"/></svg></button></div>`;
}

function getArtifactSlotSortableHandle() {
    return isPickerMobileLayout() ? '.artifact-slot-card__grip' : null;
}

function initArtifactSlotListeners(isTouchDevice) {
    elements.artifactSlots.addEventListener('click', (e) => {
        if (artifactSlotDragJustFinished) return;

        const actionBtn = e.target.closest('[data-slot-action]');
        if (actionBtn) {
            e.stopPropagation();
            const slot = actionBtn.closest('.artifact-slot-card');
            if (!slot) return;
            handleArtifactSlotAction(actionBtn.dataset.slotAction, parseInt(slot.dataset.index, 10));
            return;
        }

        if (isPickerMobileLayout() && e.target.closest('.artifact-slot-card__grip')) {
            return;
        }

        const slotCard = e.target.closest('.artifact-slot-card');
        if (!slotCard) return;

        if (isTouchDevice) e.preventDefault();

        handleArtifactSlotClick(
            parseInt(slotCard.dataset.index, 10),
            slotCard.classList.contains('artifact-slot-card--empty')
        );
    });
}

function clearArtifactDragFocus() {
    window.getSelection()?.removeAllRanges();
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
}

function initArtifactSlotsSortable() {
    const grid = elements.artifactSlots?.querySelector('.artifact-slots__grid');

    if (artifactSlotsSortable) {
        artifactSlotsSortable.destroy();
        artifactSlotsSortable = null;
    }

    if (!grid || typeof Sortable === 'undefined') return;

    const useGripHandle = Boolean(getArtifactSlotSortableHandle());

    artifactSlotsSortable = new Sortable(grid, {
        animation: 200,
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        forceFallback: true,
        fallbackClass: 'sortable-drag',
        fallbackOnBody: true,
        fallbackTolerance: 5,
        handle: getArtifactSlotSortableHandle(),
        delay: useGripHandle ? 180 : 0,
        delayOnTouchOnly: true,
        draggable: '.artifact-slot-card',
        filter: '[data-slot-action]',
        preventOnFilter: true,
        disabled: state.artifactCopyMode,
        onStart() {
            exitArtifactCopyMode();
            clearArtifactDragFocus();
        },
        onEnd(evt) {
            clearArtifactDragFocus();
            if (evt.oldIndex !== evt.newIndex) {
                artifactSlotDragJustFinished = true;
                setTimeout(() => {
                    artifactSlotDragJustFinished = false;
                }, 120);
                reorderArtifactSlot(evt.oldIndex, evt.newIndex);
            }
        },
    });
}

function syncArtifactSlotSortableHandle() {
    if (!artifactSlotsSortable) return;
    const handle = getArtifactSlotSortableHandle();
    artifactSlotsSortable.option('handle', handle);
    artifactSlotsSortable.option('delay', handle ? 180 : 0);
}

function setArtifactSlotsSortableDisabled(disabled) {
    if (artifactSlotsSortable) {
        artifactSlotsSortable.option('disabled', disabled);
    }
}

function handleArtifactSlotAction(action, index) {
    if (action === 'delete') {
        removeArtifact(index);
        return;
    }

    if (state.selectedArtifactSlotIndex !== index) {
        selectArtifactSlot(index);
    }

    if (action === 'copy') {
        toggleArtifactCopyMode();
        return;
    }

    if (action === 'replace') {
        exitArtifactCopyMode();
        openArtifactModal(index);
    }
}

function reorderArtifactSlot(fromIndex, toIndex) {
    if (fromIndex === toIndex) return;
    if (fromIndex < 0 || toIndex < 0) return;
    if (fromIndex >= state.artifacts.length || toIndex >= state.artifacts.length) return;

    state.previousStats = calculateTotalStats();

    const items = [...state.artifacts];
    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);
    state.artifacts = items;

    if (state.selectedArtifactSlotIndex === fromIndex) {
        state.selectedArtifactSlotIndex = toIndex;
    } else if (fromIndex < state.selectedArtifactSlotIndex && toIndex >= state.selectedArtifactSlotIndex) {
        state.selectedArtifactSlotIndex--;
    } else if (fromIndex > state.selectedArtifactSlotIndex && toIndex <= state.selectedArtifactSlotIndex) {
        state.selectedArtifactSlotIndex++;
    }

    renderArtifactSlots();
    updateStats();
    saveStateToStorage();
}

function selectArtifactSlot(index) {
    if (index < 0 || index >= state.artifacts.length || !state.artifacts[index]) return;
    state.selectedArtifactSlotIndex = index;
    renderArtifactDetailPanel();
    updateArtifactSlotSelectionHighlight();
    updateArtifactActions();
}

function updateArtifactActions() {
    const index = state.selectedArtifactSlotIndex;
    const hasSelection = index !== null && state.artifacts[index];

    if (elements.artifactCopyHint) {
        elements.artifactCopyHint.hidden = !(state.artifactCopyMode && hasSelection);
        if (!elements.artifactCopyHint.hidden) {
            elements.artifactCopyHint.textContent = t('calc.artifactActions.copyHint');
        }
    }
}

function toggleArtifactCopyMode() {
    const index = state.selectedArtifactSlotIndex;
    if (index === null || !state.artifacts[index]) return;

    state.artifactCopyMode = !state.artifactCopyMode;
    setArtifactSlotsSortableDisabled(state.artifactCopyMode);
    updateArtifactActions();
    updateArtifactSlotSelectionHighlight();
}

function exitArtifactCopyMode() {
    if (!state.artifactCopyMode) return;
    state.artifactCopyMode = false;
    setArtifactSlotsSortableDisabled(false);
    updateArtifactActions();
    updateArtifactSlotSelectionHighlight();
}

function handleArtifactSlotClick(index, isEmpty) {
    if (state.artifactCopyMode && state.selectedArtifactSlotIndex !== null && state.artifacts[state.selectedArtifactSlotIndex]) {
        if (index !== state.selectedArtifactSlotIndex) {
            copyArtifactToSlot(index);
        }
        return;
    }

    if (isEmpty) {
        openArtifactModal(index);
        return;
    }

    selectArtifactSlot(index);
}

function copyArtifactToSlot(targetIndex) {
    const sourceIndex = state.selectedArtifactSlotIndex;
    if (sourceIndex === null || !state.artifacts[sourceIndex]) return;
    if (targetIndex < 0 || targetIndex >= state.artifacts.length) return;
    if (targetIndex === sourceIndex) return;

    state.previousStats = calculateTotalStats();
    state.artifacts[targetIndex] = state.artifacts[sourceIndex];
    state.selectedArtifactSlotIndex = targetIndex;
    renderArtifactSlots();
    updateStats();
    saveStateToStorage();
}

function updateArtifactSlotSelectionHighlight() {
    if (!elements.artifactSlots) return;
    const sourceIndex = state.artifactCopyMode ? state.selectedArtifactSlotIndex : null;
    elements.artifactSlots.querySelectorAll('.artifact-slot-card').forEach(card => {
        const idx = parseInt(card.dataset.index, 10);
        const isSelected = idx === state.selectedArtifactSlotIndex;
        const hasArtifact = Boolean(state.artifacts[idx]);

        card.classList.toggle('artifact-slot-card--selected', isSelected);
        card.classList.toggle('artifact-slot-card--copy-source', sourceIndex !== null && idx === sourceIndex);
        card.classList.toggle('artifact-slot-card--copy-target', sourceIndex !== null && idx !== sourceIndex);

        const actions = card.querySelector('.artifact-slot-card__actions');
        if (actions) {
            actions.hidden = !hasArtifact;
            const copyBtn = actions.querySelector('[data-slot-action="copy"]');
            if (copyBtn) {
                copyBtn.classList.toggle(
                    'artifact-slot-card__action--active',
                    state.artifactCopyMode && idx === state.selectedArtifactSlotIndex
                );
                copyBtn.title = t('calc.artifactActions.copy');
            }
            const deleteBtn = actions.querySelector('[data-slot-action="delete"]');
            if (deleteBtn) deleteBtn.title = t('calc.artifactActions.delete');
            const replaceBtn = actions.querySelector('[data-slot-action="replace"]');
            if (replaceBtn) replaceBtn.title = t('calc.artifactActions.replace');
        }
    });
}

function renderArtifactDetailPanel() {
    if (!elements.artifactDetailPanel) return;

    if (!state.selectedContainer) {
        elements.artifactDetailPanel.innerHTML = `<div class="artifact-detail__placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg><span>${t('calc.selectContainerHint')}</span></div>`;
        return;
    }

    const index = state.selectedArtifactSlotIndex;
    const artifact = index !== null ? state.artifacts[index] : null;

    if (!artifact) {
        elements.artifactDetailPanel.innerHTML = `<div class="artifact-detail__placeholder"><span>${t('calc.artifactDetail.selectHint')}</span></div>`;
        return;
    }

    const imageSrc = getArtifactImagePath(artifact);
    const tierDisplay = getArtifactTierDisplay(artifact.tier);
    elements.artifactDetailPanel.innerHTML = `<div class="artifact-detail artifact-detail--${artifact.category}"><div class="artifact-detail__head"><div class="artifact-detail__preview"><img src="${imageSrc}" alt="${getLocalizedName(artifact)}" onerror="this.style.display='none'"></div><div class="artifact-detail__meta"><div class="artifact-detail__name">${getLocalizedName(artifact)}</div><span class="artifact-detail__tier">${tierDisplay}</span></div></div><div class="artifact-detail__stats">${renderArtifactSlotStats(artifact)}</div></div>`;
}

function renderArtifactSlots() {
    if (!state.selectedContainer) {
        elements.artifactSlots.innerHTML = `<div class="artifact-slots__placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg><span>${t('calc.selectContainerHint')}</span></div>`;
        elements.artifactCounter.textContent = '0/0';
        state.selectedArtifactSlotIndex = null;
        exitArtifactCopyMode();
        initArtifactSlotsSortable();
        renderArtifactDetailPanel();
        updateClearArtifactsButton();
        updateArtifactActions();
        return;
    }

    const filledSlots = state.artifacts.filter(a => a !== null).length;
    elements.artifactCounter.textContent = `${filledSlots}/${state.selectedContainer.slots}`;
    updateClearArtifactsButton();
    syncSelectedArtifactSlot();

    const slotsHtml = state.artifacts.map((artifact, index) => {
        const isSelected = state.selectedArtifactSlotIndex === index;
        const isCopySource = state.artifactCopyMode && isSelected;
        const isCopyTarget = state.artifactCopyMode && state.selectedArtifactSlotIndex !== null && index !== state.selectedArtifactSlotIndex;
        const copyClasses = `${isCopySource ? ' artifact-slot-card--copy-source' : ''}${isCopyTarget ? ' artifact-slot-card--copy-target' : ''}`;
        if (artifact) {
            const imageSrc = getArtifactImagePath(artifact);
            return `<div class="artifact-slot-card artifact-slot-card--${artifact.category}${isSelected ? ' artifact-slot-card--selected' : ''}${copyClasses}" data-index="${index}"><div class="artifact-slot-card__main"><button class="artifact-slot-card__select" type="button">${renderArtifactSlotGrip()}<div class="artifact-slot-card__preview artifact-slot-card__preview--filled"><img src="${imageSrc}" alt="${getLocalizedName(artifact)}" draggable="false" onerror="this.style.display='none'"></div><div class="artifact-slot-card__info"><div class="artifact-slot-card__name">${getLocalizedName(artifact)}</div></div></button>${renderArtifactSlotActions(index)}</div></div>`;
        }
        return `<div class="artifact-slot-card artifact-slot-card--empty${copyClasses}" data-index="${index}"><div class="artifact-slot-card__main"><button class="artifact-slot-card__select" type="button">${renderArtifactSlotGrip()}<div class="artifact-slot-card__preview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg></div><div class="artifact-slot-card__info"><div class="artifact-slot-card__hint">${t('calc.slot.clickToAdd')}</div></div></button></div></div>`;
    }).join('');

    elements.artifactSlots.innerHTML = `<div class="artifact-slots__grid">${slotsHtml}</div>`;
    initArtifactSlotsSortable();
    renderArtifactDetailPanel();
    updateArtifactActions();
}

function renderArtifactList(artifacts) {
    if (!artifacts) artifacts = ARTIFACTS;

    if (artifacts.length === 0) {
        elements.artifactList.innerHTML = `<div class="artifacts-empty"><div class="artifacts-empty__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></div><div class="artifacts-empty__title">${t('calc.modal.noResults')}</div><div class="artifacts-empty__text">${t('calc.modal.tryOtherFilters')}</div></div>`;
        if (state.artifactModalPreviewId) {
            state.artifactModalPreviewId = null;
            renderArtifactModalDetail(null, true);
        }
        if (elements.modal?.classList.contains('active')) {
            scheduleArtifactModalGridSync();
        }
        return;
    }

    const listHtml = artifacts.map(artifact => {
        const isPreview = state.artifactModalPreviewId === artifact.id;
        const isEquipped = state.currentSlotIndex !== null && state.artifacts[state.currentSlotIndex]?.id === artifact.id;

        return `<button class="artifact-card artifact-card--${artifact.category} ${isPreview ? 'artifact-card--preview' : ''} ${isEquipped ? 'artifact-card--equipped' : ''}" type="button" data-artifact-id="${artifact.id}"><div class="artifact-card__image"><img src="${getArtifactImagePath(artifact)}" alt="${getLocalizedName(artifact)}" class="artifact-card__img" onerror="this.src='../images/placeholder.png'"></div><div class="artifact-card__name">${getLocalizedName(artifact)}</div></button>`;
    }).join('');

    elements.artifactList.innerHTML = listHtml;
    if (elements.modal?.classList.contains('active')) {
        scheduleArtifactModalGridSync();
    }
}


function isPickerMobileLayout() {
    return window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024);
}

function schedulePickerGridSync(grid) {
    if (!grid) return;
    clearTimeout(pickerGridLayoutTimer);
    pickerGridLayoutTimer = setTimeout(() => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => syncPickerGridRows(grid));
        });
    }, 0);
}

function scheduleArtifactModalGridSync() {
    schedulePickerGridSync(elements.artifactList);
}

function resetPickerGridRows(grid) {
    if (!grid) return;
    grid.style.height = '';
    grid.style.maxHeight = '';
}

function resetArtifactModalGridRows() {
    resetPickerGridRows(elements.artifactList);
}

function getPickerGridRowStride(grid) {
    const card = grid.querySelector('.armor-card, .artifact-card');
    if (card) {
        return Math.round(card.getBoundingClientRect().height + PICKER_GRID_GAP);
    }
    return grid.classList.contains('artifacts-grid') ? ARTIFACT_GRID_ROW_STRIDE : 106 + PICKER_GRID_GAP;
}

function syncPickerGridRows(grid) {
    const layout = grid?.closest('.armor-modal__layout, .artifact-modal__layout');
    const modal = grid?.closest('.modal');
    if (!grid || !layout || !modal?.classList.contains('active')) return;

    if (isPickerMobileLayout()) {
        resetPickerGridRows(grid);
        return;
    }

    const layoutHeight = layout.clientHeight;
    if (layoutHeight <= 0) return;

    const rowStride = getPickerGridRowStride(grid);
    const visibleRows = Math.max(1, Math.floor((layoutHeight + PICKER_GRID_GAP) / rowStride));
    const alignedHeight = visibleRows * rowStride - PICKER_GRID_GAP;

    grid.style.height = `${alignedHeight}px`;
    grid.style.maxHeight = `${alignedHeight}px`;
}

function syncArtifactModalGridRows() {
    syncPickerGridRows(elements.artifactList);
}

function openArtifactModal(slotIndex) {
    state.currentSlotIndex = slotIndex;
    const currentArtifact = state.artifacts[slotIndex];
    state.artifactModalPreviewId = currentArtifact?.id || null;
    elements.modal.classList.add('active');
    state.filters.search = '';
    state.filters.positiveEffects = [];
    state.filters.negativeEffects = [];
    state.filtersExpanded = false;

    elements.artifactSearch.value = '';
    if (elements.searchClear) elements.searchClear.style.display = 'none';

    recreateStatFilters();

    const filtersToggle = document.getElementById('filtersToggle');
    const filtersWrapper = document.getElementById('statFiltersWrapper');

    closeStatFilterComboboxes();
    if (filtersToggle) filtersToggle.classList.remove('active');
    if (filtersWrapper) {
        filtersWrapper.classList.add('collapsed');
    }

    updateFiltersBadge();
    updateStatFilterClearButtons();
    applyFilters();
    renderArtifactModalDetail(state.artifactModalPreviewId, true);

    const isMobile = isPickerMobileLayout();
    if (!isMobile) elements.artifactSearch.focus();

    scheduleArtifactModalGridSync();
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    closeStatFilterComboboxes();
    elements.modal.classList.remove('active');
    resetArtifactModalGridRows();
    state.currentSlotIndex = null;
    state.artifactModalPreviewId = null;
    lastArtifactDetailId = null;
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
        state.selectedArtifactSlotIndex = state.currentSlotIndex;
        exitArtifactCopyMode();
        renderArtifactSlots();
        updateStats();
        closeModal();
        saveStateToStorage();
    }
}

function removeArtifact(index) {
    state.previousStats = calculateTotalStats();
    state.artifacts[index] = null;
    if (state.selectedArtifactSlotIndex === index) {
        exitArtifactCopyMode();
    }
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
    let displayValue = '', colorClass = '';

    if (currentValue === 0) displayValue = '0';
    else if (currentValue > 0) displayValue = `+${formatNumber(currentValue)}`;
    else displayValue = formatNumber(currentValue);

    if (currentValue !== 0) {
        if (isInverted) {
            colorClass = currentValue > 0 ? 'stat-row__value--negative' : 'stat-row__value--positive';
        } else {
            colorClass = currentValue > 0 ? 'stat-row__value--positive' : 'stat-row__value--negative';
        }
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
            warningsHtml.push(`<div class="warning-banner warning-banner--${statKey}"><span class="warning-banner__icon">${getWarningIcon(statKey)}</span><div class="warning-banner__content"><span class="warning-banner__text">${title}</span><span class="warning-banner__value">(${sign}${formatNumber(displayValue)} ${unit})</span></div></div>`);
        }
    });

    if (elements.warningsContainer) {
        elements.warningsContainer.innerHTML = warningsHtml.join('');
    }
}

function getWarningIcon(statKey) {
    if (WARNING_ICON_FILES[statKey]) {
        return '<span class="warning-banner__icon-mask" aria-hidden="true"></span>';
    }

    return WARNING_ICON_INLINE[statKey] || '<span class="warning-banner__icon-mask" aria-hidden="true"></span>';
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
