function createDefaultSlot() {
    return { weapon: null, ammo: null, fireMode: 'auto', visible: true, magazineSize: null };
}

const DEFAULT_MAGAZINE_BY_CATEGORY = {
    pistol: 15,
    smg: 30,
    assault: 30,
    sniper: 10,
    shotgun: 8,
    machinegun: 100,
    special: 10
};

const DEFAULT_RELOAD_BY_CATEGORY = {
    pistol: 1.8,
    smg: 2.0,
    assault: 2.4,
    sniper: 3.2,
    shotgun: 2.8,
    machinegun: 5.0,
    special: 2.5
};

function getDefaultMagazineSize(weapon) {
    if (!weapon) return 30;
    if (weapon.magazine) return weapon.magazine;
    if (weapon.stats?.magazine) return weapon.stats.magazine;
    return DEFAULT_MAGAZINE_BY_CATEGORY[weapon.category] ?? 30;
}

function getDefaultReloadTime(weapon) {
    if (!weapon) return 0;
    if (weapon.reloadTime) return weapon.reloadTime;
    if (weapon.stats?.reloadTime) return weapon.stats.reloadTime;
    return DEFAULT_RELOAD_BY_CATEGORY[weapon.category] ?? 2.5;
}

function getSlotMagazineSize(slotIndex) {
    const slot = state.slots[slotIndex];
    if (!slot?.weapon) return 30;
    return slot.magazineSize ?? getDefaultMagazineSize(slot.weapon);
}

function clampMagazineSize(value) {
    return Math.min(999, Math.max(1, Math.round(Number(value)) || 1));
}

function setSlotMagazineSize(slotIndex, value) {
    const slot = state.slots[slotIndex];
    if (!slot?.weapon) return;
    slot.magazineSize = clampMagazineSize(value);
}

function applyMagazineChange(slotIndex) {
    renderWeaponGrid();
    calculateResults();
    updateChart();
    updateComparisonTable();
}

const MAX_SLOTS = 20;
const MAX_TARGETS = 12;
const DEFAULT_TARGET_HP = 100;
const DEFAULT_TARGET_BULLET_RESISTANCE = 500;

const TTK_MEDICATIONS = [
    { id: '', name: 'Медикамент', nameEn: 'Medication' },
    { id: 'med_bandage', name: 'Бинт', nameEn: 'Bandage', hpBonus: 15 },
    { id: 'med_army', name: 'Армейская аптечка', nameEn: 'Army medkit', hpBonus: 35, regeneration: 0.5 },
    { id: 'med_sci', name: 'Научная аптечка', nameEn: 'Scientific medkit', hpBonus: 60, regeneration: 1 },
    { id: 'med_stim', name: 'Стимулятор', nameEn: 'Stimulant', bulletResistance: 12, regeneration: 2 },
    { id: 'med_morphine', name: 'Морфин', nameEn: 'Morphine', regeneration: 3, bulletResistance: -5 }
];

const TARGET_ICON_HELMET = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 13.4c-2.9 0-5.2 1.9-5.2 4.2v1.4c0 .7 2.3 1.3 5.2 1.3s5.2-.6 5.2-1.3v-1.4c0-2.3-2.3-4.2-5.2-4.2z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M8.4 16.1c.9.7 2.2 1.1 3.6 1.1s2.7-.4 3.6-1.1" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>
    <path d="M6.2 12.1c0-3.6 2.5-6.3 5.8-6.3s5.8 2.7 5.8 6.3" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/>
    <path d="M4.9 12.3c2-1.3 4.6-2 7.1-2s5.1.7 7.1 2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
    <path d="M12 5.8v3.6" stroke="currentColor" stroke-width="0.95" stroke-linecap="round" opacity="0.65"/>
    <path d="M9.8 7.1c.8-.5 1.8-.8 2.2-.8s1.4.3 2.2.8" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" opacity="0.55"/>
</svg>`;

function createDefaultTarget() {
    return {
        customName: '',
        hp: DEFAULT_TARGET_HP,
        bulletResistance: DEFAULT_TARGET_BULLET_RESISTANCE,
        regeneration: 0,
        medicationId: ''
    };
}

function createInitialTargets() {
    return Array.from({ length: MAX_TARGETS }, () => createDefaultTarget());
}

function createInitialSlots() {
    return Array.from({ length: MAX_SLOTS }, () => createDefaultSlot());
}

const state = {
    slots: createInitialSlots(),
    activeSlot: 0,
    visibleSlots: 0,
    weaponPickerSlot: null,
    pendingNewSlot: false,
    pickerClickedWeaponId: null,
    pickerPreviewWeaponId: null,
    targets: createInitialTargets(),
    activeTarget: 0,
    visibleTargets: 1,
    targetEditIndex: null,
    targetArmor: 0,
    targetHP: DEFAULT_TARGET_HP,
    targetDistance: 0,
    ttkMode: 'body'
};

const BASE_SLOT_COLORS = ['#c45430', '#7a8a50', '#8a9a40', '#d4a030', '#a8782a'];

function getSlotColor(index) {
    if (index < BASE_SLOT_COLORS.length) return BASE_SLOT_COLORS[index];
    const hue = (index * 47) % 360;
    return `hsl(${hue}, 55%, 52%)`;
}

const SLOT_COLORS = Array.from({ length: MAX_SLOTS }, (_, i) => getSlotColor(i));

const RARITY_ORDER = {
    'legendary': 6,
    'unique': 5,
    'rare': 4,
    'collection': 3,
    'uncommon': 2,
    'common': 1
};

const elements = {
    weaponGrid: document.getElementById('weaponGrid'),
    weaponPicker: document.getElementById('weaponPicker'),
    weaponPickerBackdrop: document.getElementById('weaponPickerBackdrop'),
    weaponPickerClose: document.getElementById('weaponPickerClose'),
    weaponPickerBack: document.getElementById('weaponPickerBack'),
    weaponPickerDetailHead: document.getElementById('weaponPickerDetailHead'),
    weaponPickerDetailName: document.getElementById('weaponPickerDetailName'),
    weaponPickerDetailCategory: document.getElementById('weaponPickerDetailCategory'),
    weaponDropdownList: document.getElementById('weaponDropdownList'),
    weaponSearchInput: document.getElementById('weaponSearchInput'),
    weaponClearWrapper: document.getElementById('weaponClearWrapper'),
    weaponClearBtn: document.getElementById('weaponClearBtn'),
    weaponPickerSelectBtn: document.getElementById('weaponPickerSelectBtn'),
    weaponPickerPreviewPlaceholder: document.getElementById('weaponPickerPreviewPlaceholder'),
    weaponPickerPreviewContent: document.getElementById('weaponPickerPreviewContent'),
    weaponPickerPreviewImage: document.getElementById('weaponPickerPreviewImage'),
    weaponPickerPreviewName: document.getElementById('weaponPickerPreviewName'),
    weaponPickerPreviewCategory: document.getElementById('weaponPickerPreviewCategory'),
    weaponPickerPreviewStats: document.getElementById('weaponPickerPreviewStats'),
    targetGrid: document.getElementById('targetGrid'),
    targetDistance: document.getElementById('targetDistance'),
    targetEditModal: document.getElementById('targetEditModal'),
    targetEditBackdrop: document.getElementById('targetEditBackdrop'),
    targetEditClose: document.getElementById('targetEditClose'),
    targetEditCancel: document.getElementById('targetEditCancel'),
    targetEditSave: document.getElementById('targetEditSave'),
    targetEditName: document.getElementById('targetEditName'),
    targetEditHp: document.getElementById('targetEditHp'),
    targetEditBulletResistance: document.getElementById('targetEditBulletResistance'),
    targetEditRegeneration: document.getElementById('targetEditRegeneration'),
    damageChart: document.getElementById('damageChart'),
    damageCanvas: document.getElementById('damageCanvas'),
    chartLegend: document.getElementById('chartLegend'),
    chartPlaceholder: document.getElementById('chartPlaceholder'),
    chartTooltip: document.getElementById('chartTooltip'),
    chartDistanceValue: document.getElementById('chartDistanceValue'),
    chartRankingSubtitle: document.getElementById('chartRankingSubtitle'),
    chartModeLabel: document.getElementById('chartModeLabel'),
    chartCrosshairLabel: document.getElementById('chartCrosshairLabel'),
    chartCursorLine: null,
    ttkModeToggle: document.getElementById('ttkModeToggle'),
    dpsBody: document.getElementById('dpsBody'),
    dpsHead: document.getElementById('dpsHead'),
    baseDamage: document.getElementById('baseDamage'),
    distanceDamage: document.getElementById('distanceDamage'),
    armorDamage: document.getElementById('armorDamage'),
    headshotDamage: document.getElementById('headshotDamage'),
    ttkBody: document.getElementById('ttkBody'),
    shotsBody: document.getElementById('shotsBody'),
    ttkHead: document.getElementById('ttkHead'),
    shotsHead: document.getElementById('shotsHead'),
    comparisonTable: document.getElementById('comparisonTable'),
    comparisonTableContent: document.getElementById('comparisonTableContent'),
    weaponStats: document.getElementById('weaponStats'),
    weaponStatsGrid: document.getElementById('weaponStatsGrid'),
    weaponPreviewPlaceholder: document.getElementById('weaponPreviewPlaceholder'),
    weaponPreviewContent: document.getElementById('weaponPreviewContent'),
    weaponPreviewImageWrap: document.getElementById('weaponPreviewImageWrap'),
    weaponPreviewName: document.getElementById('weaponPreviewName'),
    weaponPreviewStatsBlock: document.getElementById('weaponPreviewStatsBlock')
};

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ЛОКАЛИЗАЦИИ ====================

function t(key, fallback = '') {
    if (window.i18n && typeof window.i18n.t === 'function') {
        const translation = window.i18n.t(key);
        return translation !== key ? translation : fallback || key;
    }
    return fallback || key;
}

function isEnglish() {
    return window.i18n && window.i18n.isEnglish && window.i18n.isEnglish();
}

function getWeaponCatName(categoryId) {
    const categoryKey = `ttk.cat.${categoryId}`;
    const translation = t(categoryKey);
    if (translation !== categoryKey) return translation;
    if (typeof WEAPON_CATEGORIES !== 'undefined' && WEAPON_CATEGORIES[categoryId]) {
        return WEAPON_CATEGORIES[categoryId].name;
    }
    return categoryId;
}

let weaponCategorySearchIndex = null;

function normalizeWeaponSearchText(text) {
    return String(text || '').toLowerCase().trim();
}

function addWeaponCategorySearchTerm(terms, value) {
    const normalized = normalizeWeaponSearchText(value);
    if (normalized) terms.add(normalized);
}

function getWeaponCategorySearchTerms(categoryId) {
    const terms = new Set();

    addWeaponCategorySearchTerm(terms, categoryId);

    const cat = typeof WEAPON_CATEGORIES !== 'undefined' ? WEAPON_CATEGORIES[categoryId] : null;
    if (cat) {
        addWeaponCategorySearchTerm(terms, cat.name);
        addWeaponCategorySearchTerm(terms, cat.nameEn);
        addWeaponCategorySearchTerm(terms, cat.nameShort);
        addWeaponCategorySearchTerm(terms, cat.nameShortEn);
    }

    const categoryKey = `ttk.cat.${categoryId}`;
    addWeaponCategorySearchTerm(terms, t(categoryKey, ''));

    const i18n = window.i18n;
    if (i18n?.translations) {
        addWeaponCategorySearchTerm(terms, i18n.translations.ru?.[categoryKey]);
        addWeaponCategorySearchTerm(terms, i18n.translations.en?.[categoryKey]);
    }

    return terms;
}

function getWeaponCategorySearchIndex() {
    if (weaponCategorySearchIndex) return weaponCategorySearchIndex;

    weaponCategorySearchIndex = {};
    if (typeof WEAPON_CATEGORIES === 'undefined') return weaponCategorySearchIndex;

    Object.keys(WEAPON_CATEGORIES).forEach(categoryId => {
        weaponCategorySearchIndex[categoryId] = getWeaponCategorySearchTerms(categoryId);
    });

    return weaponCategorySearchIndex;
}

function categorySearchTermMatches(term, searchQuery) {
    if (!term.includes(searchQuery)) return false;
    return searchQuery.length >= 3 || term === searchQuery;
}

function getMatchingWeaponCategories(searchQuery) {
    if (!searchQuery) return [];

    const matched = [];
    const index = getWeaponCategorySearchIndex();

    Object.entries(index).forEach(([categoryId, terms]) => {
        const matches = [...terms].some(term => categorySearchTermMatches(term, searchQuery));
        if (matches) matched.push(categoryId);
    });

    return matched;
}

function weaponMatchesSearch(weapon, searchQuery) {
    if (!searchQuery) return true;

    const nameRu = normalizeWeaponSearchText(weapon.name);
    const nameEn = normalizeWeaponSearchText(weapon.nameEn);
    const localizedName = normalizeWeaponSearchText(getLocalizedName(weapon));

    if (
        (nameRu && nameRu.includes(searchQuery)) ||
        (nameEn && nameEn.includes(searchQuery)) ||
        (localizedName && localizedName.includes(searchQuery))
    ) {
        return true;
    }

    const matchedCategories = getMatchingWeaponCategories(searchQuery);
    return matchedCategories.includes(weapon.category);
}

function resetWeaponCategorySearchIndex() {
    weaponCategorySearchIndex = null;
}

function getLocalizedRarityName(rarity) {
    if (!rarity) return '';
    const key = `ttk.rarity.${rarity}`;
    return t(key, rarity);
}

// ==================== ОСНОВНОЙ КОД ====================

function isDesktop() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

const MOBILE_PICKER_QUERY = window.matchMedia('(max-width: 768px)');

function isMobilePicker() {
    return MOBILE_PICKER_QUERY.matches;
}

document.addEventListener('DOMContentLoaded', () => {
    initBurgerMenu();
    initScrollEffects();
    initLangDropdownClose();
    initWeaponGrid();
    initTargetGrid();
    initWeaponPicker();
    initEventListeners();
    initChartInteractivity();
    initTtkModeToggle();
    initTtkMobileCarousel();
    createChartCursorLine();
    renderWeaponGrid();
    renderTargetGrid();
    syncActiveTargetGlobals();
    syncActiveSlotUI();
    calculateResults();

    document.addEventListener('languageChanged', () => {
        resetWeaponCategorySearchIndex();
        renderWeaponGrid();
        renderTargetGrid();
        renderWeaponDropdownList();
        if (state.pickerClickedWeaponId) {
            state.pickerPreviewWeaponId = null;
            const weapon = getWeaponById(state.pickerClickedWeaponId);
            renderPickerWeaponPreview(weapon);
            syncMobilePickerDetailUI(weapon);
        }
        syncActiveSlotUI();
        calculateResults();
        updateChart();
        updateComparisonTable();
    });
});

function getWeaponImagePath(weapon, basePath = '../') {
    if (weapon?.image && weapon?.imageFolder) {
        return getItemImagePath(weapon.imageFolder, weapon.image, basePath);
    }
    if (weapon?.id) {
        return `${basePath}images/items/Weapons/${weapon.id}.png`;
    }
    return null;
}

function getAmmoShortName(ammo) {
    if (!ammo) return '';
    return getLocalizedName(ammo).replace(/^(Патроны |Ammo )/, '');
}

function getAmmoCellName(ammo) {
    if (!ammo) return '';
    const shortName = getAmmoShortName(ammo);
    const nameOnly = shortName
        .replace(/^\d+[,.]?\d*\s*x\s*\d+\s*(?:мм\s*|mm\s*)?/i, '')
        .replace(/^\.45\s*ACP\s*/i, '')
        .replace(/^\.308\s*Winchester\s*/i, '')
        .trim();
    return nameOnly || shortName;
}

function formatAmmoSignedPercent(value) {
    if (value > 0) return `+${value}%`;
    if (value < 0) return `${value}%`;
    return '0%';
}

function formatAmmoSignedValue(value) {
    if (value > 0) return `+${value}`;
    if (value < 0) return `${value}`;
    return '0';
}

function renderAmmoStatsHtml(ammo) {
    const stats = ammo?.stats || {};
    const statItems = [];

    if (stats.damageModifier) {
        statItems.push({
            label: t('ttk.damageModifier', 'Урон'),
            shortLabel: t('ttk.statShort.damage', 'УРН'),
            value: formatAmmoSignedPercent(stats.damageModifier),
            tone: stats.damageModifier > 0 ? 'positive' : 'negative'
        });
    }
    if (stats.armorPenetration) {
        statItems.push({
            label: t('ttk.stat.armorPen', 'Бронебойность'),
            shortLabel: t('ttk.statShort.armorPen', 'ББН'),
            value: formatAmmoSignedPercent(stats.armorPenetration),
            tone: stats.armorPenetration > 0 ? 'positive' : 'negative'
        });
    }
    if (stats.rangeModifier) {
        statItems.push({
            label: t('ttk.rangeModifier', 'Дальность'),
            shortLabel: t('ttk.statShort.range', 'ДЛН'),
            value: formatAmmoSignedPercent(stats.rangeModifier),
            tone: stats.rangeModifier > 0 ? 'positive' : 'negative'
        });
    }
    if (stats.spreadModifier) {
        statItems.push({
            label: t('ttk.spreadModifier', 'Разброс'),
            shortLabel: t('ttk.statShort.spread', 'РЗБ'),
            value: formatAmmoSignedPercent(stats.spreadModifier),
            tone: stats.spreadModifier < 0 ? 'positive' : 'negative'
        });
    }
    if (ammo.pellets && ammo.pellets > 1) {
        statItems.push({
            label: t('ttk.pelletCount', 'Дробин'),
            shortLabel: t('ttk.statShort.pellets', 'ДРБ'),
            value: String(ammo.pellets),
            tone: 'neutral'
        });
    }
    if (stats.mutantDamageMultiplier && stats.mutantDamageMultiplier !== 1) {
        statItems.push({
            label: t('ttk.vsMutants', 'мутанты'),
            shortLabel: t('ttk.statShort.mutants', 'МТН'),
            value: `×${stats.mutantDamageMultiplier}`,
            tone: 'positive'
        });
    }

    if (!statItems.length) {
        const typeKey = `ttk.ammoType.${ammo.type}`;
        const typeLabel = t(typeKey, ammo.type);
        return `<div class="ammo-dropdown-item__type">${typeLabel}</div>`;
    }

    return `<div class="ammo-dropdown-item__stats">${statItems.map(item =>
        `<span class="ammo-dropdown-item__tag ammo-dropdown-item__tag--${item.tone}" title="${item.label}">
            <span class="ammo-dropdown-item__tag-label">${item.shortLabel}</span>
            <span class="ammo-dropdown-item__tag-value">${item.value}</span>
        </span>`
    ).join('')}</div>`;
}

function renderAmmoDropdownItem(ammo, isSelected) {
    return `<button type="button" class="ammo-dropdown-item${isSelected ? ' is-selected' : ''}" data-ammo-id="${ammo.id}" role="option" aria-selected="${isSelected}">
        ${getAmmoIconHtml(ammo, 'ammo-dropdown-item__icon')}
        <div class="ammo-dropdown-item__content">
            <div class="ammo-dropdown-item__head">
                <span class="ammo-dropdown-item__name">${getAmmoShortName(ammo)}</span>
                ${isSelected ? '<span class="ammo-dropdown-item__check" aria-hidden="true">✓</span>' : ''}
            </div>
            ${renderAmmoStatsHtml(ammo)}
        </div>
    </button>`;
}

function getAmmoTypeIconClass(ammo) {
    const type = ammo?.type || 'standard';
    if (['hp', 'buckshot', 'dart', 'slug'].includes(type)) return 'ammo-item__icon--hp';
    if (['ap', 'ap_plus', 'enhanced'].includes(type)) return 'ammo-item__icon--ap';
    if (['shot', 'incendiary'].includes(type)) return 'ammo-item__icon--shot';
    return '';
}

function getAmmoDropdownMenu(dropdown) {
    return dropdown?._portaledMenu || dropdown?.querySelector('.custom-dropdown__menu') || null;
}

function portalAmmoDropdownMenu(dropdown) {
    const menu = dropdown.querySelector('.custom-dropdown__menu');
    const panel = dropdown.closest('.weapon-list-panel');
    if (!menu || !panel || dropdown._portaledMenu) return menu;

    dropdown._menuPortal = {
        parent: menu.parentElement,
        next: menu.nextSibling
    };
    dropdown._portaledMenu = menu;
    menu.classList.add('weapon-row__ammo-menu--portaled');
    panel.appendChild(menu);
    return menu;
}

function setAmmoDropdownMenuOpenState(dropdown, isOpen) {
    const menu = getAmmoDropdownMenu(dropdown);
    if (!menu) return;
    menu.classList.toggle('is-open', isOpen);
    menu.classList.toggle('is-closing', !isOpen && dropdown.classList.contains('closing'));
}

function restoreAmmoDropdownMenu(dropdown) {
    const menu = dropdown._portaledMenu;
    if (!menu || !dropdown._menuPortal) return;

    const { parent, next } = dropdown._menuPortal;
    if (next && next.parentElement === parent) {
        parent.insertBefore(menu, next);
    } else {
        parent.appendChild(menu);
    }
    menu.classList.remove('weapon-row__ammo-menu--portaled', 'is-open', 'is-closing', 'weapon-row__ammo-dropdown--flip', 'weapon-row__ammo-dropdown--align-right');
    delete dropdown._portaledMenu;
    delete dropdown._menuPortal;
}

function clearAmmoDropdownMenuPosition(menu) {
    if (!menu) return;
    menu.style.top = '';
    menu.style.left = '';
    menu.style.right = '';
    menu.style.bottom = '';
    menu.style.width = '';
    menu.style.maxWidth = '';
}

function closeAmmoDropdowns(except = null, immediate = false) {
    const AMMO_DROPDOWN_CLOSE_MS = 150;

    document.querySelectorAll('.weapon-row__ammo-dropdown.open, .weapon-row__ammo-dropdown.closing').forEach(dropdown => {
        if (dropdown === except) return;

        const trigger = dropdown.querySelector('.custom-dropdown__trigger');
        const menu = getAmmoDropdownMenu(dropdown);

        const finishClose = () => {
            dropdown.classList.remove(
                'open',
                'closing',
                'weapon-row__ammo-dropdown--flip',
                'weapon-row__ammo-dropdown--align-right'
            );
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
            clearAmmoDropdownMenuPosition(menu);
            if (menu) menu.classList.remove('is-open', 'is-closing');
            restoreAmmoDropdownMenu(dropdown);
            if (menu) menu.removeEventListener('transitionend', onTransitionEnd);
            if (dropdown._closeTimer) {
                clearTimeout(dropdown._closeTimer);
                dropdown._closeTimer = null;
            }
        };

        const onTransitionEnd = (event) => {
            if (event.target !== menu || event.propertyName !== 'opacity') return;
            finishClose();
        };

        if (immediate || !dropdown.classList.contains('open')) {
            finishClose();
            return;
        }

        if (trigger) trigger.setAttribute('aria-expanded', 'false');
        dropdown.classList.remove('open');
        dropdown.classList.add('closing');
        if (menu) {
            menu.classList.remove('is-open');
            menu.classList.add('is-closing');
        }

        if (menu) {
            menu.addEventListener('transitionend', onTransitionEnd);
        }
        dropdown._closeTimer = setTimeout(finishClose, AMMO_DROPDOWN_CLOSE_MS + 40);
    });
}

function adjustAmmoDropdownPosition(dropdown) {
    if (!dropdown) return;
    dropdown.classList.remove('weapon-row__ammo-dropdown--flip', 'weapon-row__ammo-dropdown--align-right');

    const menu = getAmmoDropdownMenu(dropdown);
    const trigger = dropdown.querySelector('.custom-dropdown__trigger');
    const positionRoot = dropdown.closest('.weapon-list-panel');
    if (!menu || !trigger || !positionRoot) return;

    const triggerRect = trigger.getBoundingClientRect();
    const rootRect = positionRoot.getBoundingClientRect();
    const width = Math.min(Math.max(triggerRect.width, 272), window.innerWidth - 16);
    let left = triggerRect.left - rootRect.left;
    let top = triggerRect.bottom - rootRect.top + 2;

    if (triggerRect.left + width > window.innerWidth - 8) {
        dropdown.classList.add('weapon-row__ammo-dropdown--align-right');
        left = triggerRect.right - rootRect.left - width;
    }

    menu.style.width = `${width}px`;
    menu.style.maxWidth = `${window.innerWidth - 16}px`;
    menu.style.left = `${Math.max(0, left)}px`;
    menu.style.top = `${top}px`;
    menu.style.right = 'auto';
    menu.style.bottom = 'auto';

    const menuHeight = menu.scrollHeight;
    if (triggerRect.bottom + menuHeight > window.innerHeight - 8 && triggerRect.top > menuHeight + 8) {
        dropdown.classList.add('weapon-row__ammo-dropdown--flip');
        menu.style.top = `${Math.max(0, triggerRect.top - rootRect.top - menuHeight - 2)}px`;
    }

    menu.classList.toggle('weapon-row__ammo-dropdown--flip', dropdown.classList.contains('weapon-row__ammo-dropdown--flip'));
    menu.classList.toggle('weapon-row__ammo-dropdown--align-right', dropdown.classList.contains('weapon-row__ammo-dropdown--align-right'));
}

function repositionOpenAmmoDropdowns() {
    document.querySelectorAll('.weapon-row__ammo-dropdown.open').forEach(adjustAmmoDropdownPosition);
}

function getAmmoIconHtml(ammo, className = 'ammo-item__icon') {
    const imagePath = getAmmoImagePath(ammo);
    const typeClass = imagePath ? '' : getAmmoTypeIconClass(ammo);
    if (imagePath) {
        return `<span class="${className} ${typeClass}"><img src="${imagePath}" alt="" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('ammo-item__icon--fallback')"></span>`;
    }
    return `<span class="${className} ${typeClass} ammo-item__icon--fallback"></span>`;
}

function renderWeaponRowAmmoDropdown(index, ammoOptions, currentAmmo) {
    const hasOptions = ammoOptions.length > 0;
    const selectedAmmo = currentAmmo || null;
    const triggerLabel = selectedAmmo
        ? getAmmoCellName(selectedAmmo)
        : t('ttk.selectAmmo', 'Выберите патроны...');
    const triggerIcon = selectedAmmo
        ? getAmmoIconHtml(selectedAmmo, 'weapon-row__ammo-icon')
        : '<span class="weapon-row__ammo-icon weapon-row__ammo-icon--empty" aria-hidden="true"></span>';

    const menuItems = hasOptions
        ? ammoOptions.map(ammo => renderAmmoDropdownItem(ammo, ammo.id === selectedAmmo?.id)).join('')
        : `<div class="custom-dropdown__empty">${t('ttk.selectAmmo', 'Выберите патроны...')}</div>`;

    return `
        <div class="custom-dropdown custom-dropdown--ammo weapon-row__ammo-dropdown" data-slot="${index}">
            <button type="button" class="custom-dropdown__trigger weapon-row__ammo-trigger" ${hasOptions ? '' : 'disabled'} aria-haspopup="listbox" aria-expanded="false" aria-label="${t('ttk.ammo', 'Патроны')}">
                ${triggerIcon}
                <span class="custom-dropdown__value${selectedAmmo ? ' has-value' : ''}">${triggerLabel}</span>
                <svg class="custom-dropdown__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="custom-dropdown__menu custom-dropdown__menu--ammo" role="listbox" data-slot="${index}">
                <div class="ammo-dropdown-list">${menuItems}</div>
            </div>
        </div>`;
}

function getWeaponThumbHtml(weapon, className = 'weapon-row__thumb') {
    const imagePath = getWeaponImagePath(weapon);
    const fallback = getCategoryIcon(weapon.category);
    if (imagePath) {
        return `<div class="${className}"><img src="${imagePath}" alt="${getLocalizedName(weapon)}" loading="lazy"><span class="${className}-fallback" hidden>${fallback}</span></div>`;
    }
    return `<div class="${className}"><span class="${className}-fallback">${fallback}</span></div>`;
}

function bindWeaponThumbFallbacks(listElement, className = 'weapon-row__thumb') {
    if (!listElement) return;
    listElement.querySelectorAll(`.${className} img`).forEach(img => {
        img.onerror = () => {
            img.remove();
            const fallback = img.parentElement?.querySelector(`.${className}-fallback`);
            if (fallback) fallback.hidden = false;
        };
    });
}

function createChartCursorLine() {
    const container = document.querySelector('.damage-chart__container');
    if (!container) return;
    const cursorLine = document.createElement('div');
    cursorLine.className = 'chart-cursor-line';
    cursorLine.id = 'chartCursorLine';
    container.appendChild(cursorLine);
    elements.chartCursorLine = cursorLine;
}

function initTtkModeToggle() {
    if (!elements.ttkModeToggle) return;
    elements.ttkModeToggle.addEventListener('click', (e) => {
        const btn = e.target.closest('.ttk-mode-toggle__btn');
        if (!btn) return;
        const mode = btn.dataset.mode;
        if (mode === state.ttkMode) return;
        state.ttkMode = mode;
        elements.ttkModeToggle.querySelectorAll('.ttk-mode-toggle__btn').forEach(b => {
            b.classList.remove('ttk-mode-toggle__btn--active');
        });
        btn.classList.add('ttk-mode-toggle__btn--active');
        updateChart();
    });
}

function initTtkMobileCarousel() {
    const track = document.getElementById('ttkCarouselTrack');
    const nav = document.getElementById('ttkCarouselNav');
    if (!track || !nav) return;

    const tabs = nav.querySelectorAll('[data-slide]');
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    let activeIndex = 0;
    let scrollRaf = null;

    function isActive() {
        return mobileQuery.matches;
    }

    function getSlideWidth() {
        return track.clientWidth;
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
            const width = getSlideWidth();
            if (width <= 0) return;
            const index = Math.round(track.scrollLeft / width);
            setActiveSlide(index);
        });
    }, { passive: true });

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

function getRarityPriority(rarity) {
    return RARITY_ORDER[rarity] || 0;
}

function sortWeaponsByRarity(weapons) {
    return [...weapons].sort((a, b) => {
        const priorityA = getRarityPriority(a.rarity);
        const priorityB = getRarityPriority(b.rarity);
        if (priorityB !== priorityA) return priorityB - priorityA;
        return a.name.localeCompare(b.name, isEnglish() ? 'en' : 'ru');
    });
}

function isSlotOnChart(index) {
    const slot = state.slots[index];
    return index < state.visibleSlots && slot.weapon && slot.visible !== false;
}

function getCategoryIcon(category) {
    const icons = {
        assault: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12h3l2-7 4 14 2-7h7"/></svg>',
        smg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 14h5l1-4h8l1 4h5l-2-6H4l-2 6z"/></svg>',
        pistol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 14h12l2-2h4l-1 4H6l-2-2z"/><rect x="8" y="14" width="3" height="4" rx="0.5"/></svg>',
        shotgun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12h16l3-2v4l-3-2H2z"/></svg>',
        sniper: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 13h18l2-1v2l-2-1H2z"/><circle cx="18" cy="13" r="2"/></svg>',
        machinegun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 13h20l-1-3H6L4 10H2v3z"/></svg>',
        special: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z"/></svg>'
    };
    return icons[category] || icons.assault;
}

function getFireModeLabel(mode) {
    if (mode === 'auto') return t('ttk.fireMode.auto', 'АВТО');
    if (mode === 'single') return t('ttk.fireMode.single', 'ОДИН');
    return mode.toUpperCase();
}

function initWeaponGrid() {
    if (!elements.weaponGrid) return;

    const weaponListBody = document.querySelector('.calc-card__body.weapon-list-panel__body');
    if (weaponListBody) {
        weaponListBody.addEventListener('scroll', repositionOpenAmmoDropdowns, { passive: true });
    }
    window.addEventListener('resize', repositionOpenAmmoDropdowns, { passive: true });

    document.addEventListener('click', (e) => {
        const ammoItem = e.target.closest('.custom-dropdown__menu--ammo .ammo-dropdown-item[data-ammo-id]');
        if (ammoItem) {
            e.stopPropagation();
            const menu = ammoItem.closest('.custom-dropdown__menu');
            const slotIndex = parseInt(menu?.dataset.slot, 10);
            if (!Number.isNaN(slotIndex)) {
                selectAmmoForSlot(slotIndex, ammoItem.dataset.ammoId);
            }
            closeAmmoDropdowns();
            return;
        }

        if (!e.target.closest('.weapon-row__ammo-dropdown') && !e.target.closest('.weapon-row__ammo-menu--portaled')) {
            closeAmmoDropdowns();
        }
    });

    elements.weaponGrid.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.weapon-list__add');
        if (addBtn) {
            openWeaponPickerForNewSlot();
            return;
        }

        const ammoTrigger = e.target.closest('.weapon-row__ammo-dropdown .custom-dropdown__trigger');
        if (ammoTrigger) {
            e.stopPropagation();
            const dropdown = ammoTrigger.closest('.weapon-row__ammo-dropdown');
            const willOpen = !dropdown.classList.contains('open');
            closeAmmoDropdowns(willOpen ? dropdown : null);
            if (willOpen) {
                dropdown.classList.remove('closing');
                dropdown.classList.add('open');
                ammoTrigger.setAttribute('aria-expanded', 'true');
                portalAmmoDropdownMenu(dropdown);
                setAmmoDropdownMenuOpenState(dropdown, true);
                adjustAmmoDropdownPosition(dropdown);
                requestAnimationFrame(() => adjustAmmoDropdownPosition(dropdown));
            }
            return;
        }

        if (e.target.closest('.weapon-row__ammo-dropdown') || e.target.closest('.weapon-row__ammo-menu--portaled')) return;

        const magDec = e.target.closest('[data-action="mag-dec"]');
        const magInc = e.target.closest('[data-action="mag-inc"]');
        if (magDec || magInc) {
            e.stopPropagation();
            const row = e.target.closest('.weapon-row[data-slot]');
            if (!row) return;
            const slotIndex = parseInt(row.dataset.slot, 10);
            if (Number.isNaN(slotIndex)) return;
            const current = getSlotMagazineSize(slotIndex);
            setSlotMagazineSize(slotIndex, current + (magInc ? 1 : -1));
            applyMagazineChange(slotIndex);
            return;
        }

        if (e.target.closest('.weapon-row__mag-stepper')) {
            e.stopPropagation();
            return;
        }

        const row = e.target.closest('.weapon-row[data-slot]');
        if (!row) return;

        const slotIndex = parseInt(row.dataset.slot, 10);
        if (Number.isNaN(slotIndex)) return;

        const actionBtn = e.target.closest('[data-action]');
        if (actionBtn) {
            e.stopPropagation();
            const action = actionBtn.dataset.action;
            if (action === 'delete') deleteSlot(slotIndex);
            return;
        }

        selectSlot(slotIndex);
    });

    elements.weaponGrid.addEventListener('change', (e) => {
        const input = e.target.closest('.weapon-row__mag-input');
        if (!input) return;
        e.stopPropagation();
        const row = input.closest('.weapon-row[data-slot]');
        if (!row) return;
        const slotIndex = parseInt(row.dataset.slot, 10);
        if (Number.isNaN(slotIndex)) return;
        setSlotMagazineSize(slotIndex, input.value);
        applyMagazineChange(slotIndex);
    });

}

function initWeaponPicker() {
    if (!elements.weaponPicker) return;

    elements.weaponPickerClose?.addEventListener('click', closeWeaponPicker);
    elements.weaponPickerBackdrop?.addEventListener('click', closeWeaponPicker);
    elements.weaponPickerBack?.addEventListener('click', handleMobilePickerBack);

    if (elements.weaponSearchInput) {
        elements.weaponSearchInput.addEventListener('input', handleWeaponSearch);
    }

    elements.weaponDropdownList?.addEventListener('click', handleWeaponListClick);
    elements.weaponDropdownList?.addEventListener('dblclick', handleWeaponListDoubleClick);

    elements.weaponPickerSelectBtn?.addEventListener('click', () => {
        if (state.pickerClickedWeaponId) {
            selectWeaponFromDropdown(state.pickerClickedWeaponId);
        }
    });

    if (elements.weaponClearBtn) {
        elements.weaponClearBtn.addEventListener('click', () => {
            const slotIndex = state.weaponPickerSlot ?? state.activeSlot;
            clearWeaponSelection(slotIndex);
        });
    }

    const handleMobilePickerLayoutChange = () => {
        if (!elements.weaponPicker?.classList.contains('open')) return;
        if (isMobilePicker()) {
            syncMobilePickerDetailUI(getWeaponById(state.pickerClickedWeaponId));
        } else {
            exitMobilePickerDetail();
        }
    };

    if (typeof MOBILE_PICKER_QUERY.addEventListener === 'function') {
        MOBILE_PICKER_QUERY.addEventListener('change', handleMobilePickerLayoutChange);
    } else if (typeof MOBILE_PICKER_QUERY.addListener === 'function') {
        MOBILE_PICKER_QUERY.addListener(handleMobilePickerLayoutChange);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.weaponPicker?.classList.contains('open')) {
            if (isMobilePicker() && state.pickerClickedWeaponId) {
                clearPickerPreview();
            } else {
                closeWeaponPicker();
            }
        }
    });

    renderWeaponDropdownList();
}

function resolveSlotIndexForNewWeapon() {
    if (state.visibleSlots >= MAX_SLOTS) return -1;
    state.visibleSlots++;
    return state.visibleSlots - 1;
}

function showWeaponPicker() {
    elements.weaponPicker.classList.add('open');
    elements.weaponPicker.setAttribute('aria-hidden', 'false');
    document.body.classList.add('weapon-picker-open');
    clearPickerPreview();
    renderWeaponDropdownList(elements.weaponSearchInput?.value.toLowerCase().trim() || '');
    if (elements.weaponSearchInput) {
        elements.weaponSearchInput.value = '';
        if (isDesktop()) {
            setTimeout(() => elements.weaponSearchInput.focus(), 50);
        }
    }
}

function openWeaponPicker(slotIndex) {
    state.pendingNewSlot = false;
    state.weaponPickerSlot = slotIndex;
    selectSlot(slotIndex);
    showWeaponPicker();
}

function openWeaponPickerForNewSlot() {
    if (state.visibleSlots >= MAX_SLOTS) return;
    state.pendingNewSlot = true;
    state.weaponPickerSlot = null;
    showWeaponPicker();
}

function closeWeaponPicker() {
    elements.weaponPicker?.classList.remove('open');
    elements.weaponPicker?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('weapon-picker-open');
    state.weaponPickerSlot = null;
    state.pendingNewSlot = false;
    state.pickerClickedWeaponId = null;
    state.pickerPreviewWeaponId = null;
    exitMobilePickerDetail();
    if (elements.weaponSearchInput) elements.weaponSearchInput.value = '';
}

function renderWeaponGrid() {
    if (!elements.weaponGrid) return;

    closeAmmoDropdowns(null, true);

    let html = '';

    for (let i = 0; i < state.visibleSlots; i++) {
        html += renderWeaponRow(i);
    }

    if (state.visibleSlots < MAX_SLOTS) {
        html += `
            <button type="button" class="weapon-list__add" aria-label="${t('ttk.addWeapon', 'Добавить оружие')}">
                <span class="weapon-list__add-icon">+</span>
                <span>${t('ttk.addWeapon', 'Добавить оружие')}</span>
            </button>`;
    }

    elements.weaponGrid.innerHTML = html;
}

function renderWeaponRow(index) {
    const slot = state.slots[index];
    if (!slot?.weapon) return '';

    const isActive = state.activeSlot === index;
    const slotColor = getSlotColor(index);
    const activeClass = isActive ? ' weapon-row--active' : '';
    const dimmedClass = slot.visible === false ? ' weapon-row--dimmed' : '';

    const weapon = slot.weapon;
    const rarityClass = weapon.rarity ? ` rarity--${weapon.rarity}` : '';
    const ammoOptions = getAmmoForWeapon(weapon);
    const magazineSize = getSlotMagazineSize(index);
    const magazineLabel = t('ttk.stat.magazine', 'Магазин') + ':';

    return `
        <div class="weapon-row${activeClass}${dimmedClass}" data-slot="${index}" style="--slot-color: ${slotColor}">
            <div class="weapon-row__main">
                ${getWeaponThumbHtml(weapon)}
                <div class="weapon-row__info">
                    <span class="weapon-row__name${rarityClass}">${getLocalizedName(weapon)}</span>
                    <div class="weapon-row__stats">
                        <div class="weapon-row__mag-stepper">
                            <span class="weapon-row__mag-label">${magazineLabel}</span>
                            <div class="weapon-row__mag-controls">
                                <button type="button" class="weapon-row__mag-btn" data-action="mag-dec" aria-label="−">−</button>
                                <input type="text" inputmode="numeric" class="weapon-row__mag-input" value="${magazineSize}" aria-label="${magazineLabel}">
                                <button type="button" class="weapon-row__mag-btn" data-action="mag-inc" aria-label="+">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weapon-row__ammo">
                ${renderWeaponRowAmmoDropdown(index, ammoOptions, slot.ammo)}
            </div>
            <button type="button" class="weapon-row__remove" data-action="delete" title="${t('ttk.remove', 'Удалить')}" aria-label="${t('ttk.remove', 'Удалить')}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
        </div>`;
}

function selectSlot(index) {
    state.activeSlot = index;
    renderWeaponGrid();
    syncActiveSlotUI();
}

function deleteSlot(index) {
    removeSlot(index);
}

function duplicateSlot(index) {
    if (state.visibleSlots >= MAX_SLOTS) return;
    const source = state.slots[index];
    state.visibleSlots++;
    const targetIndex = state.visibleSlots - 1;
    state.slots[targetIndex] = {
        weapon: source.weapon,
        ammo: source.ammo,
        fireMode: source.fireMode || 'auto',
        visible: source.visible !== false,
        magazineSize: source.magazineSize
    };
    selectSlot(targetIndex);
    calculateResults();
    updateChart();
    updateComparisonTable();
}

function toggleSlotVisibility(index) {
    const slot = state.slots[index];
    if (!slot.weapon) return;
    slot.visible = slot.visible === false;
    renderWeaponGrid();
    updateChart();
    updateComparisonTable();
}


function removeSlot(index) {
    state.slots[index] = createDefaultSlot();
    if (index < state.visibleSlots - 1) {
        for (let i = index; i < state.visibleSlots - 1; i++) {
            state.slots[i] = { ...state.slots[i + 1] };
        }
        state.slots[state.visibleSlots - 1] = createDefaultSlot();
    }
    state.visibleSlots--;
    if (state.activeSlot >= state.visibleSlots) {
        state.activeSlot = Math.max(0, state.visibleSlots - 1);
    }
    selectSlot(state.activeSlot);
    calculateResults();
    updateChart();
    updateComparisonTable();
}

function syncActiveSlotUI() {
    renderWeaponPreview();
    renderWeaponDropdownList();
    calculateResults();
}

function renderWeaponPreview() {
    const slotData = state.slots[state.activeSlot];
    const hasWeapon = Boolean(slotData?.weapon);

    if (elements.weaponPreviewPlaceholder) {
        elements.weaponPreviewPlaceholder.hidden = hasWeapon;
    }
    if (elements.weaponPreviewContent) {
        elements.weaponPreviewContent.hidden = !hasWeapon;
    }
    if (elements.weaponPreviewStatsBlock) {
        elements.weaponPreviewStatsBlock.hidden = !hasWeapon;
    }

    if (!hasWeapon) {
        if (elements.weaponStats) elements.weaponStats.style.display = 'none';
        return;
    }

    const weapon = slotData.weapon;
    const rarityClass = weapon.rarity ? `rarity--${weapon.rarity}` : '';

    if (elements.weaponPreviewImageWrap) {
        const imagePath = getWeaponImagePath(weapon);
        const fallback = getCategoryIcon(weapon.category);
        if (imagePath) {
            elements.weaponPreviewImageWrap.innerHTML = `<img src="${imagePath}" alt="">`;
            const img = elements.weaponPreviewImageWrap.querySelector('img');
            if (img) {
                img.onerror = () => {
                    elements.weaponPreviewImageWrap.innerHTML = fallback;
                };
            }
        } else {
            elements.weaponPreviewImageWrap.innerHTML = fallback;
        }
    }

    if (elements.weaponPreviewName) {
        elements.weaponPreviewName.textContent = getLocalizedName(weapon);
        elements.weaponPreviewName.className = `weapon-preview__name ${rarityClass}`.trim();
    }

    renderWeaponStats();
}

function selectAmmoForSlot(slotIndex, ammoId) {
    const ammo = getAmmoById(ammoId);
    if (!ammo) return;
    state.slots[slotIndex].ammo = ammo;
    renderWeaponGrid();
    if (slotIndex === state.activeSlot) {
        renderWeaponPreview();
    }
    calculateResults();
    updateChart();
    updateComparisonTable();
}

function ensureSlotAmmo(slotIndex, autoSelectFirst = false) {
    const slot = state.slots[slotIndex];
    if (!slot.weapon) {
        slot.ammo = null;
        return;
    }
    const availableAmmo = getAmmoForWeapon(slot.weapon);
    if (!slot.ammo || !availableAmmo.some(a => a.id === slot.ammo.id)) {
        slot.ammo = autoSelectFirst && availableAmmo.length ? availableAmmo[0] : null;
    }
}

function getWeaponPickerThumbHtml(weapon) {
    const imagePath = getWeaponImagePath(weapon);
    const fallback = getCategoryIcon(weapon.category);
    const label = getLocalizedName(weapon);
    if (imagePath) {
        return `<div class="custom-dropdown__item-thumb" style="background-image:url('${imagePath}')" role="img" aria-label="${label}"></div>`;
    }
    return `<div class="custom-dropdown__item-thumb custom-dropdown__item-thumb--fallback" aria-hidden="true">${fallback}</div>`;
}

function handleWeaponSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    if (state.pickerClickedWeaponId) {
        const weapon = getWeaponById(state.pickerClickedWeaponId);
        if (!weapon || !weaponMatchesSearch(weapon, query)) {
            clearPickerPreview();
        }
    }
    renderWeaponDropdownList(query);
}

function handleWeaponListClick(e) {
    const item = e.target.closest('.custom-dropdown__item');
    if (item?.dataset.weaponId) previewWeaponInPicker(item.dataset.weaponId);
}

function handleWeaponListDoubleClick(e) {
    const item = e.target.closest('.custom-dropdown__item');
    if (!item?.dataset.weaponId) return;
    e.preventDefault();
    selectWeaponFromDropdown(item.dataset.weaponId);
}

function handleMobilePickerBack() {
    clearPickerPreview();
}

function updateMobilePickerDetailHead(weapon) {
    if (!weapon) return;
    const rarityClass = weapon.rarity ? ` rarity--${weapon.rarity}` : '';
    if (elements.weaponPickerDetailName) {
        elements.weaponPickerDetailName.textContent = getLocalizedName(weapon);
        elements.weaponPickerDetailName.className = `weapon-picker__detail-name${rarityClass}`;
    }
    if (elements.weaponPickerDetailCategory) {
        elements.weaponPickerDetailCategory.textContent = getWeaponCatName(weapon.category);
    }
}

function syncMobilePickerDetailUI(weapon) {
    const inDetail = isMobilePicker() && Boolean(weapon);
    elements.weaponPicker?.classList.toggle('weapon-picker--mobile-detail', inDetail);

    if (inDetail) {
        updateMobilePickerDetailHead(weapon);
    }
}

function exitMobilePickerDetail() {
    elements.weaponPicker?.classList.remove('weapon-picker--mobile-detail');
    if (elements.weaponPickerDetailName) {
        elements.weaponPickerDetailName.textContent = '';
        elements.weaponPickerDetailName.className = 'weapon-picker__detail-name';
    }
    if (elements.weaponPickerDetailCategory) {
        elements.weaponPickerDetailCategory.textContent = '';
    }
}

function clearPickerPreview() {
    state.pickerClickedWeaponId = null;
    state.pickerPreviewWeaponId = null;
    if (elements.weaponPickerPreviewPlaceholder) {
        elements.weaponPickerPreviewPlaceholder.hidden = false;
    }
    if (elements.weaponPickerPreviewContent) {
        elements.weaponPickerPreviewContent.hidden = true;
    }
    if (elements.weaponPickerSelectBtn) {
        elements.weaponPickerSelectBtn.hidden = true;
    }
    if (elements.weaponPickerPreviewImage) {
        delete elements.weaponPickerPreviewImage.dataset.weaponId;
        elements.weaponPickerPreviewImage.innerHTML = '';
    }
    elements.weaponDropdownList?.querySelectorAll('.custom-dropdown__item.previewing').forEach(item => {
        item.classList.remove('previewing');
    });
    exitMobilePickerDetail();
}

function previewWeaponInPicker(weaponId) {
    const weapon = getWeaponById(weaponId);
    if (!weapon) return;

    state.pickerClickedWeaponId = weaponId;
    state.pickerPreviewWeaponId = null;
    if (elements.weaponPickerSelectBtn) {
        elements.weaponPickerSelectBtn.hidden = false;
    }

    elements.weaponDropdownList?.querySelectorAll('.custom-dropdown__item').forEach(item => {
        item.classList.toggle('previewing', item.dataset.weaponId === weaponId);
    });

    renderPickerWeaponPreview(weapon);
    syncMobilePickerDetailUI(weapon);
}

function buildWeaponPickerStatsHtml(weapon) {
    const rows = [];
    if (weapon.damage != null) {
        rows.push({ label: t('ttk.stat.damage', 'Урон'), value: weapon.damage, highlight: true });
    }
    if (weapon.rpm != null) {
        rows.push({ label: t('ttk.stat.rpm', 'Скорострельность'), value: `${weapon.rpm} RPM`, highlight: true });
    }
    if (weapon.headshotMult != null) {
        rows.push({ label: t('ttk.stat.headshotMult', 'Множ. хедшота'), value: `×${weapon.headshotMult}` });
    }
    if (weapon.effectiveRange != null) {
        rows.push({ label: t('ttk.stat.range', 'Дальность'), value: `${weapon.effectiveRange} м` });
    }
    rows.push({ label: t('ttk.stat.magazine', 'Магазин'), value: getDefaultMagazineSize(weapon) });
    const reloadTime = getDefaultReloadTime(weapon);
    rows.push({
        label: t('ttk.stat.reloadTime', 'Перезарядка'),
        value: `${reloadTime.toFixed(1)} ${t('ttk.sec', 'сек')}`
    });
    if (weapon.fireModes?.length) {
        rows.push({
            label: t('ttk.fireMode', 'Режим стрельбы'),
            value: weapon.fireModes.map(getFireModeLabel).join(' / ')
        });
    }

    const statNames = {
        verticalRecoil: t('ttk.stat.verticalRecoil', 'Верт. отдача'),
        horizontalRecoil: t('ttk.stat.horizontalRecoil', 'Гориз. отдача'),
        hipSpread: t('ttk.stat.hipSpread', 'Разброс от бедра'),
        adsSpread: t('ttk.stat.adsSpread', 'Разброс в прицеле'),
        moveSpeed: t('ttk.stat.moveSpeed', 'Скорость бега'),
        armorPenetration: t('ttk.stat.armorPen', 'Бронебойность')
    };
    const statUnits = {
        verticalRecoil: '°',
        horizontalRecoil: '°',
        moveSpeed: '%',
        armorPenetration: '%'
    };
    if (weapon.stats) {
        Object.entries(weapon.stats).forEach(([key, value]) => {
            if (!statNames[key]) return;
            const unit = statUnits[key] || '';
            let displayValue = value;
            if (key === 'moveSpeed' || key === 'armorPenetration') {
                displayValue = value > 0 ? `+${value}` : value;
            }
            rows.push({ label: statNames[key], value: `${displayValue}${unit}` });
        });
    }

    return rows.map(row => `
        <div class="weapon-details__stat">
            <span class="weapon-details__stat-name">${row.label}</span>
            <span class="weapon-details__stat-value${row.highlight ? ' weapon-details__stat-value--highlight' : ''}">${row.value}</span>
        </div>`).join('');
}

function renderPickerWeaponPreview(weapon) {
    const weaponId = weapon?.id ?? null;
    if (weaponId === state.pickerPreviewWeaponId) return;

    state.pickerPreviewWeaponId = weaponId;
    const hasWeapon = Boolean(weapon);

    if (elements.weaponPickerPreviewPlaceholder) {
        elements.weaponPickerPreviewPlaceholder.hidden = hasWeapon;
    }
    if (elements.weaponPickerPreviewContent) {
        elements.weaponPickerPreviewContent.hidden = !hasWeapon;
    }
    if (!hasWeapon) {
        if (elements.weaponPickerPreviewImage) {
            delete elements.weaponPickerPreviewImage.dataset.weaponId;
        }
        return;
    }

    const rarityClass = weapon.rarity ? `rarity--${weapon.rarity}` : '';

    if (elements.weaponPickerPreviewImage) {
        const imagePath = getWeaponImagePath(weapon);
        const fallback = getCategoryIcon(weapon.category);
        if (elements.weaponPickerPreviewImage.dataset.weaponId !== weaponId) {
            elements.weaponPickerPreviewImage.dataset.weaponId = weaponId;
            if (imagePath) {
                elements.weaponPickerPreviewImage.innerHTML = `<img src="${imagePath}" alt="">`;
                const img = elements.weaponPickerPreviewImage.querySelector('img');
                if (img) {
                    img.onerror = () => {
                        elements.weaponPickerPreviewImage.innerHTML = fallback;
                        delete elements.weaponPickerPreviewImage.dataset.weaponId;
                    };
                }
            } else {
                elements.weaponPickerPreviewImage.innerHTML = fallback;
            }
        }
    }

    if (elements.weaponPickerPreviewName) {
        elements.weaponPickerPreviewName.textContent = getLocalizedName(weapon);
        elements.weaponPickerPreviewName.className = `weapon-details__name ${rarityClass}`.trim();
    }

    if (elements.weaponPickerPreviewCategory) {
        elements.weaponPickerPreviewCategory.textContent = getWeaponCatName(weapon.category);
    }

    if (elements.weaponPickerPreviewStats) {
        elements.weaponPickerPreviewStats.innerHTML = buildWeaponPickerStatsHtml(weapon);
    }
}

function renderWeaponDropdownList(searchQuery = '') {
    const pickerSlot = state.pendingNewSlot ? null : (state.weaponPickerSlot ?? state.activeSlot);
    let weapons = WEAPONS.filter(weapon => weaponMatchesSearch(weapon, searchQuery));
    weapons = sortWeaponsByRarity(weapons);
    const currentWeapon = pickerSlot !== null ? state.slots[pickerSlot]?.weapon : null;
    if (elements.weaponClearWrapper) {
        elements.weaponClearWrapper.style.display = currentWeapon ? 'block' : 'none';
    }
    if (weapons.length === 0) {
        elements.weaponDropdownList.innerHTML = `
            <div class="custom-dropdown__empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <span>${t('ttk.weaponNotFound', 'Оружие не найдено')}</span>
            </div>`;
        return;
    }
    const html = weapons.map(weapon => {
        const isSelected = currentWeapon?.id === weapon.id;
        const isPreviewing = state.pickerClickedWeaponId === weapon.id;
        const rarityClass = weapon.rarity ? ` rarity--${weapon.rarity}` : '';
        return `
            <div class="custom-dropdown__item${isSelected ? ' selected' : ''}${isPreviewing ? ' previewing' : ''}" data-weapon-id="${weapon.id}">
                ${getWeaponPickerThumbHtml(weapon)}
                <div class="custom-dropdown__item-info">
                    <div class="custom-dropdown__item-name${rarityClass}">${getLocalizedName(weapon)}</div>
                </div>
            </div>`;
    }).join('');
    const listScrollTop = elements.weaponDropdownList.scrollTop;
    elements.weaponDropdownList.innerHTML = html;
    elements.weaponDropdownList.scrollTop = listScrollTop;
}

function selectWeaponFromDropdown(weaponId) {
    const weapon = getWeaponById(weaponId);
    if (!weapon) return;

    let slotIndex;
    if (state.pendingNewSlot) {
        slotIndex = resolveSlotIndexForNewWeapon();
        if (slotIndex < 0) return;
        state.pendingNewSlot = false;
    } else {
        slotIndex = state.weaponPickerSlot ?? state.activeSlot;
    }
    state.slots[slotIndex].weapon = weapon;
    state.slots[slotIndex].ammo = null;
    state.slots[slotIndex].fireMode = weapon.fireModes?.includes('auto') ? 'auto' : (weapon.fireModes?.[0] || 'auto');
    state.slots[slotIndex].visible = true;
    state.slots[slotIndex].magazineSize = null;

    ensureSlotAmmo(slotIndex, true);
    closeWeaponPicker();
    if (elements.weaponSearchInput) elements.weaponSearchInput.value = '';

    selectSlot(slotIndex);
    calculateResults();
    updateChart();
    updateComparisonTable();
}

function clearWeaponSelection(slotIndex = state.activeSlot) {
    closeWeaponPicker();
    if (elements.weaponSearchInput) elements.weaponSearchInput.value = '';
    if (state.slots[slotIndex]?.weapon) {
        removeSlot(slotIndex);
    }
}

function renderWeaponStats() {
    const weapon = state.slots[state.activeSlot].weapon;
    if (!weapon?.stats) {
        elements.weaponStats.style.display = 'none';
        return;
    }
    const stats = weapon.stats;
    let html = '';
    const statNames = {
        verticalRecoil: t('ttk.stat.verticalRecoil', 'Верт. отдача'),
        horizontalRecoil: t('ttk.stat.horizontalRecoil', 'Гориз. отдача'),
        hipSpread: t('ttk.stat.hipSpread', 'Разброс от бедра'),
        adsSpread: t('ttk.stat.adsSpread', 'Разброс в прицеле'),
        moveSpeed: t('ttk.stat.moveSpeed', 'Скорость бега'),
        armorPenetration: t('ttk.stat.armorPen', 'Бронебойность')
    };
    const statUnits = {
        verticalRecoil: '°',
        horizontalRecoil: '°',
        moveSpeed: '%',
        armorPenetration: '%'
    };
    Object.entries(stats).forEach(([key, value]) => {
        if (statNames[key]) {
            const name = statNames[key];
            const unit = statUnits[key] || '';
            let displayValue = value;
            let valueClass = '';
            if (key === 'moveSpeed' || key === 'armorPenetration') {
                displayValue = value > 0 ? `+${value}` : value;
                valueClass = value > 0 ? 'stats-panel__value--positive' : (value < 0 ? 'stats-panel__value--negative' : '');
            }
            html += `
                <div class="stats-panel__row preview-stat-row">
                    <span class="stats-panel__name">${name}</span>
                    <span class="stats-panel__value ${valueClass}">${displayValue}${unit}</span>
                </div>`;
        }
    });
    elements.weaponStatsGrid.innerHTML = html;
    elements.weaponStats.style.display = html ? 'block' : 'none';
}

function initEventListeners() {
    if (elements.targetDistance) {
        elements.targetDistance.addEventListener('input', (e) => {
            state.targetDistance = Math.max(0, parseFloat(e.target.value) || 0);
            calculateResults();
            updateChart();
            updateComparisonTable();
        });
    }
}

// ==================== СПИСОК ЦЕЛЕЙ ====================

function getMedicationById(id) {
    return TTK_MEDICATIONS.find(med => med.id === id) || TTK_MEDICATIONS[0];
}

function getLocalizedMedicationName(medication) {
    if (!medication) return '';
    return isEnglish() ? (medication.nameEn || medication.name) : medication.name;
}

function getTargetBaseBulletResistance(target) {
    if (!target) return 0;
    return Math.max(0, parseFloat(target.bulletResistance) || 0);
}

function getTargetBulletResistance(target) {
    if (!target) return 0;

    let resistance = getTargetBaseBulletResistance(target);
    const medication = getMedicationById(target.medicationId);
    if (medication?.bulletResistance) resistance += medication.bulletResistance;

    return Math.max(0, resistance);
}

function getTargetBaseHP(target) {
    if (!target) return DEFAULT_TARGET_HP;
    return Math.max(1, parseFloat(target.hp) || DEFAULT_TARGET_HP);
}

function getTargetHP(target) {
    if (!target) return DEFAULT_TARGET_HP;

    let hp = getTargetBaseHP(target);
    const medication = getMedicationById(target.medicationId);
    if (medication?.hpBonus) hp += medication.hpBonus;

    return Math.max(1, hp);
}

function getTargetRegeneration(target) {
    if (!target) return 0;

    let regen = parseFloat(target.regeneration) || 0;
    const medication = getMedicationById(target.medicationId);
    if (medication?.regeneration) regen += medication.regeneration;

    return regen;
}

function renderMedicationSelectOptions(selectedId) {
    return TTK_MEDICATIONS.map(item => {
        const selected = item.id === selectedId ? ' selected' : '';
        const label = item.id ? getLocalizedMedicationName(item) : getLocalizedMedicationName(TTK_MEDICATIONS[0]);
        return `<option value="${item.id}"${selected}>${label}</option>`;
    }).join('');
}

function getActiveTarget() {
    return state.targets[state.activeTarget] || state.targets[0];
}

function syncActiveTargetGlobals() {
    const target = getActiveTarget();
    state.targetArmor = getTargetBulletResistance(target);
    state.targetHP = getTargetHP(target);
}

function formatTargetStat(value, decimals = 2) {
    const num = parseFloat(value);
    if (!Number.isFinite(num)) return (0).toFixed(decimals);
    return num.toFixed(decimals);
}

function getTargetDisplayName(target, index) {
    if (target.customName?.trim()) return target.customName.trim();

    const dummyCount = state.targets
        .slice(0, index + 1)
        .filter(item => !item.customName?.trim()).length;

    if (dummyCount <= 1) return t('ttk.dummy', 'Манекен');
    return `${t('ttk.dummy', 'Манекен')} (${dummyCount})`;
}

function renderTargetCard(index) {
    const target = state.targets[index];
    if (!target) return '';

    const bulletResistance = getTargetBulletResistance(target);

    return `
        <article class="target-card" data-target="${index}">
            <div class="target-card__header">
                <div class="target-card__identity">
                    <div class="target-card__icon" aria-hidden="true">${TARGET_ICON_HELMET}</div>
                    <span class="target-card__name">${getTargetDisplayName(target, index)}</span>
                </div>
                <div class="target-card__actions">
                    <button type="button" class="target-card__action" data-action="edit" title="${t('ttk.edit', 'Редактировать')}" aria-label="${t('ttk.edit', 'Редактировать')}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                    </button>
                    <button type="button" class="target-card__action" data-action="duplicate" title="${t('ttk.duplicate', 'Дублировать')}" aria-label="${t('ttk.duplicate', 'Дублировать')}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                    <button type="button" class="target-card__action target-card__action--danger" data-action="delete" title="${t('ttk.remove', 'Удалить')}" aria-label="${t('ttk.remove', 'Удалить')}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg>
                    </button>
                </div>
            </div>
            <div class="target-card__stat">
                <span class="target-card__stat-label">${t('ttk.bulletResistance', 'Пулестойкость')}:</span>
                <span class="target-card__stat-value">${formatTargetStat(bulletResistance)}</span>
            </div>
            <div class="target-card__fields">
                <select class="target-card__select" data-field="medication" aria-label="${t('ttk.medication', 'Медикамент')}">
                    ${renderMedicationSelectOptions(target.medicationId)}
                </select>
            </div>
        </article>`;
}

function renderTargetGrid() {
    if (!elements.targetGrid) return;

    let html = '';
    for (let i = 0; i < state.visibleTargets; i++) {
        html += renderTargetCard(i);
    }

    html += `
        <button type="button" class="target-card target-card--add" data-action="add-dummy" aria-label="${t('ttk.addDummy', 'Добавить манекен')}">
            <span class="target-card__add-icon">+</span>
            <span class="target-card__add-text">${t('ttk.addDummy', 'Добавить манекен')}</span>
        </button>`;

    elements.targetGrid.innerHTML = html;
}

function applyTargetChange() {
    syncActiveTargetGlobals();
    renderTargetGrid();
    calculateResults();
    updateChart();
    updateComparisonTable();
}

function addTarget() {
    if (state.visibleTargets >= MAX_TARGETS) return;

    const index = state.visibleTargets;
    state.targets[index] = createDefaultTarget();
    state.visibleTargets += 1;
    state.activeTarget = index;
    applyTargetChange();
}

function duplicateTarget(index) {
    if (index < 0 || index >= state.visibleTargets || state.visibleTargets >= MAX_TARGETS) return;

    const source = state.targets[index];
    state.targets[state.visibleTargets] = {
        customName: '',
        hp: source.hp ?? DEFAULT_TARGET_HP,
        bulletResistance: source.bulletResistance ?? DEFAULT_TARGET_BULLET_RESISTANCE,
        regeneration: source.regeneration ?? 0,
        medicationId: source.medicationId ?? ''
    };
    state.visibleTargets += 1;
    state.activeTarget = state.visibleTargets - 1;
    applyTargetChange();
}

function deleteTarget(index) {
    if (state.visibleTargets <= 1 || index < 0 || index >= state.visibleTargets) return;

    for (let i = index; i < state.visibleTargets - 1; i++) {
        state.targets[i] = state.targets[i + 1];
    }
    state.targets[state.visibleTargets - 1] = createDefaultTarget();
    state.visibleTargets -= 1;

    if (state.activeTarget >= state.visibleTargets) {
        state.activeTarget = state.visibleTargets - 1;
    } else if (state.activeTarget > index) {
        state.activeTarget -= 1;
    }

    applyTargetChange();
}

function openTargetEditModal(index) {
    const target = state.targets[index];
    if (!target || !elements.targetEditModal) return;

    state.targetEditIndex = index;
    elements.targetEditName.value = target.customName || getTargetDisplayName(target, index);
    elements.targetEditHp.value = getTargetBaseHP(target);
    elements.targetEditBulletResistance.value = getTargetBaseBulletResistance(target);
    elements.targetEditRegeneration.value = parseFloat(target.regeneration) || 0;

    elements.targetEditModal.classList.add('open');
    elements.targetEditModal.setAttribute('aria-hidden', 'false');
    elements.targetEditName.focus();
    elements.targetEditName.select();
}

function closeTargetEditModal() {
    if (!elements.targetEditModal) return;
    state.targetEditIndex = null;
    elements.targetEditModal.classList.remove('open');
    elements.targetEditModal.setAttribute('aria-hidden', 'true');
}

function saveTargetEdit() {
    const index = state.targetEditIndex;
    if (index === null || index === undefined || !state.targets[index]) {
        closeTargetEditModal();
        return;
    }

    const target = state.targets[index];
    const nextName = elements.targetEditName.value.trim();
    const defaultName = getTargetDisplayName({ ...target, customName: '' }, index);

    target.customName = nextName && nextName !== defaultName ? nextName : '';
    target.hp = Math.max(1, parseFloat(elements.targetEditHp.value) || DEFAULT_TARGET_HP);
    target.bulletResistance = Math.max(0, parseFloat(elements.targetEditBulletResistance.value) || 0);
    target.regeneration = parseFloat(elements.targetEditRegeneration.value) || 0;

    state.activeTarget = index;
    closeTargetEditModal();
    applyTargetChange();
}

function initTargetGrid() {
    if (!elements.targetGrid) return;

    elements.targetGrid.addEventListener('click', (e) => {
        const addDummyBtn = e.target.closest('[data-action="add-dummy"]');
        if (addDummyBtn) {
            addTarget();
            return;
        }

        const actionBtn = e.target.closest('.target-card__action[data-action]');
        const card = e.target.closest('.target-card[data-target]');
        if (!card || !actionBtn) return;

        const index = parseInt(card.dataset.target, 10);
        if (Number.isNaN(index)) return;

        const action = actionBtn.dataset.action;
        if (action === 'edit') {
            openTargetEditModal(index);
            return;
        }
        if (action === 'duplicate') {
            duplicateTarget(index);
            return;
        }
        if (action === 'delete') {
            deleteTarget(index);
        }
    });

    elements.targetGrid.addEventListener('change', (e) => {
        const select = e.target.closest('.target-card__select');
        if (!select) return;

        const card = select.closest('.target-card[data-target]');
        if (!card) return;

        const index = parseInt(card.dataset.target, 10);
        const target = state.targets[index];
        if (!target || Number.isNaN(index)) return;

        if (select.dataset.field === 'medication') {
            target.medicationId = select.value;
        }

        state.activeTarget = index;
        applyTargetChange();
    });

    elements.targetEditBackdrop?.addEventListener('click', closeTargetEditModal);
    elements.targetEditClose?.addEventListener('click', closeTargetEditModal);
    elements.targetEditCancel?.addEventListener('click', closeTargetEditModal);
    elements.targetEditSave?.addEventListener('click', saveTargetEdit);

    elements.targetEditModal?.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeTargetEditModal();
    });
}

// ==================== РАСЧЁТ УРОНА ====================

/**
 * Рассчитать урон выстрела на заданной дистанции.
 *
 * weapon.damage — урон ОДНОЙ пули/дробины.
 * ammo.pellets — количество снарядов в одном выстреле (>1 для дроби/картечи).
 * damageModifier — процентная модификация урона от типа патрона.
 *
 * Для дробовиков с multi-pellet патронами:
 *   - damagePerPellet = weapon.damage * damageMod
 *   - На близкой дистанции (≤ effectiveRange) попадают все дробины
 *   - За effectiveRange количество попадающих дробин уменьшается линейно
 *   - В голову попадает только 1 дробина (headshotMult применяется к одной)
 *
 * Возвращает объект со всеми данными урона для одного выстрела.
 */
function computeShotDamage(weapon, ammo, distance, targetArmor) {
    let damageMod = 1.0;
    let pellets = 1;
    let ap = weapon.stats?.armorPenetration || 0;
    let effectiveRange = weapon.effectiveRange;

    if (ammo) {
        const stats = ammo.stats || {};
        ap += stats.armorPenetration || 0;
        damageMod = 1 + ((stats.damageModifier || 0) / 100);
        pellets = ammo.pellets || 1;
        if (stats.rangeModifier) {
            effectiveRange *= (1 + stats.rangeModifier / 100);
        }
    }

    const damagePerPellet = weapon.damage * damageMod;
    const isShotgun = pellets > 1;
    const maxRange = isShotgun ? effectiveRange * 3.5 : effectiveRange * 2;

    // Эффективное число попадающих дробин на дистанции
    let hittingPellets = pellets;
    let pelletDamageScale = 1.0; // дополнительное ослабление каждой дробины

    if (distance > maxRange) {
        return {
            damagePerPellet, pellets, hittingPellets: 0,
            totalBodyDamage: 0, headshotDamage: 0,
            protection: calculateArmorProtection(targetArmor),
            effectiveProtection: Math.max(0, calculateArmorProtection(targetArmor) - ap),
            effectiveRange, maxRange
        };
    }

    if (distance > effectiveRange) {
        const falloffDistance = distance - effectiveRange;
        const maxFalloffDistance = maxRange - effectiveRange;
        const falloffPercent = Math.min(falloffDistance / maxFalloffDistance, 1.0);

        if (isShotgun) {
            // Количество попадающих дробин уменьшается
            hittingPellets = Math.max(1, Math.round(pellets * (1 - falloffPercent * 0.7)));
            // Урон каждой дробины тоже падает
            pelletDamageScale = 1 - falloffPercent * 0.5;
        } else {
            // Обычное оружие — урон падает линейно
            pelletDamageScale = 1 - falloffPercent * 0.7;
        }
    }

    const actualPelletDamage = damagePerPellet * pelletDamageScale;

    // Защита
    const protection = calculateArmorProtection(targetArmor);
    const effectiveProtection = Math.max(0, protection - ap);
    const armorMultiplier = 1 - effectiveProtection / 100;

    // Урон в тело: все попадающие дробины
    const totalBodyDamage = actualPelletDamage * hittingPellets * armorMultiplier;

    // Урон в голову: для дробовиков только 1 дробина попадает в голову
    const headshotPelletDamage = actualPelletDamage * weapon.headshotMult * armorMultiplier;
    // Остальные дробины попадают в тело (если есть)
    const remainingBodyPellets = Math.max(0, hittingPellets - 1);
    const headshotTotalDamage = isShotgun
        ? headshotPelletDamage + (actualPelletDamage * remainingBodyPellets * armorMultiplier)
        : actualPelletDamage * weapon.headshotMult * armorMultiplier;

    return {
        damagePerPellet,
        pellets,
        hittingPellets,
        pelletDamageScale,
        actualPelletDamage,
        totalBodyDamage,
        headshotPelletDamage,
        headshotTotalDamage,
        headshotDamage: isShotgun ? headshotPelletDamage : headshotTotalDamage,
        protection,
        effectiveProtection,
        effectiveRange,
        maxRange,
        armorMultiplier
    };
}

function calculateSlotDPS(slotIndex) {
    const slotData = state.slots[slotIndex];

    if (!slotData.weapon) {
        return {
            dpsBody: 0, dpsHead: 0, baseDamage: 0, damagePerPellet: 0, pellets: 1,
            totalShotDamage: 0, distanceDamage: 0, armorDamage: 0, headshotDamage: 0,
            ttkBody: Infinity, ttkHead: Infinity, shotsBody: 0, shotsHead: 0,
            protection: 0, effectiveProtection: 0, effectiveRange: 0, maxRange: 0
        };
    }

    const weapon = slotData.weapon;
    const ammo = slotData.ammo;
    const rpm = weapon.rpm;
    const magazineSize = getSlotMagazineSize(slotIndex);
    const reloadTime = getDefaultReloadTime(weapon);

    const shot = computeShotDamage(weapon, ammo, state.targetDistance, state.targetArmor);
    const shotAtZero = computeShotDamage(weapon, ammo, 0, state.targetArmor);

    // DPS
    const dpsBody = calculateDPS(shot.totalBodyDamage, rpm);
    const dpsHead = calculateDPS(shot.headshotTotalDamage, rpm);

    // TTK
    const ttkBody = calculateTTK(shot.totalBodyDamage, rpm, state.targetHP, magazineSize, reloadTime);
    const ttkHead = calculateTTK(shot.headshotTotalDamage, rpm, state.targetHP, magazineSize, reloadTime);

    const shotsBody = shot.totalBodyDamage > 0 ? Math.ceil(state.targetHP / shot.totalBodyDamage) : Infinity;
    const shotsHead = shot.headshotTotalDamage > 0 ? Math.ceil(state.targetHP / shot.headshotTotalDamage) : Infinity;

    // Базовый урон (без дистанции, без брони)
    const basePelletDamage = shot.damagePerPellet;
    const pellets = shot.pellets;

    // Урон на дистанции (без брони) — для отображения
    const shotNoBroni = computeShotDamage(weapon, ammo, state.targetDistance, 0);
    const distanceDamage = shotNoBroni.totalBodyDamage;

    return {
        dpsBody,
        dpsHead,
        baseDamage: weapon.damage,
        damagePerPellet: basePelletDamage,
        pellets,
        totalShotDamage: basePelletDamage * pellets,
        distanceDamage,
        armorDamage: shot.totalBodyDamage,
        headshotDamage: shot.headshotDamage,
        ttkBody,
        ttkHead,
        shotsBody,
        shotsHead,
        protection: shot.protection,
        effectiveProtection: shot.effectiveProtection,
        effectiveRange: shot.effectiveRange,
        maxRange: shot.maxRange
    };
}

function calculateResults() {
    const result = calculateSlotDPS(state.activeSlot);

    const secUnit = t('ttk.sec', 'сек');
    const shotsUnit = t('ttk.shots', 'выстр.');

    if (result.pellets > 1) {
        elements.baseDamage.textContent = `${result.damagePerPellet.toFixed(1)} ×${result.pellets}`;
    } else {
        elements.baseDamage.textContent = result.damagePerPellet.toFixed(1);
    }

    elements.distanceDamage.textContent = result.distanceDamage.toFixed(1);
    elements.armorDamage.textContent = result.armorDamage.toFixed(1);
    elements.headshotDamage.textContent = result.headshotDamage.toFixed(1);

    elements.dpsBody.textContent = Math.round(result.dpsBody);
    elements.dpsHead.textContent = Math.round(result.dpsHead);

    elements.ttkBody.textContent = result.ttkBody === Infinity ? '∞' : result.ttkBody.toFixed(2) + ' ' + secUnit;
    elements.shotsBody.textContent = result.shotsBody === Infinity ? '∞' : result.shotsBody + ' ' + shotsUnit;

    elements.ttkHead.textContent = result.ttkHead === Infinity ? '∞' : result.ttkHead.toFixed(2) + ' ' + secUnit;
    elements.shotsHead.textContent = result.shotsHead === Infinity ? '∞' : result.shotsHead + ' ' + shotsUnit;
}

function calculateTTKAtDistance(slotIndex, distance, isHeadshot = false) {
    const slotData = state.slots[slotIndex];
    if (!slotData.weapon) return Infinity;

    const weapon = slotData.weapon;
    const ammo = slotData.ammo;
    const rpm = weapon.rpm;
    const magazineSize = getSlotMagazineSize(slotIndex);
    const reloadTime = getDefaultReloadTime(weapon);

    const shot = computeShotDamage(weapon, ammo, distance, state.targetArmor);

    const damagePerShot = isHeadshot ? shot.headshotTotalDamage : shot.totalBodyDamage;

    if (damagePerShot <= 0) return Infinity;
    return calculateTTK(damagePerShot, rpm, state.targetHP, magazineSize, reloadTime);
}

function calculateDamageAtDistance(slotIndex, distance, isHeadshot = false) {
    const slotData = state.slots[slotIndex];
    if (!slotData.weapon) return 0;

    const shot = computeShotDamage(slotData.weapon, slotData.ammo, distance, state.targetArmor);
    return isHeadshot ? shot.headshotTotalDamage : shot.totalBodyDamage;
}

// ==================== ГРАФИК ====================

function getChartCanvasHeight() {
    const container = elements.damageCanvas?.parentElement;
    if (!container) return 300;
    return container.clientHeight || 300;
}

function updateChartSummary() {
    const meterUnit = isEnglish() ? 'm' : 'м';
    const isHeadMode = state.ttkMode === 'head';

    if (elements.chartDistanceValue) {
        elements.chartDistanceValue.textContent = `${state.targetDistance} ${meterUnit}`;
    }

    if (elements.chartModeLabel) {
        elements.chartModeLabel.textContent = isHeadMode
            ? t('ttk.head', 'Голова')
            : t('ttk.body', 'Тело');
    }

    if (elements.chartRankingSubtitle) {
        const modeLabel = isHeadMode
            ? t('ttk.head', 'Голова').toLowerCase()
            : t('ttk.body', 'Тело').toLowerCase();
        elements.chartRankingSubtitle.textContent = `@ ${state.targetDistance}${meterUnit} · ${modeLabel}`;
    }
}

function updateChart() {
    const hasWeapons = state.slots.some((slot, i) => isSlotOnChart(i));

    if (!hasWeapons) {
        elements.damageChart.classList.remove('visible');
        elements.chartPlaceholder.classList.remove('hidden');
        return;
    }

    elements.damageChart.classList.add('visible');
    elements.chartPlaceholder.classList.add('hidden');
    updateChartSummary();

    const canvas = elements.damageCanvas;
    const ctx = canvas.getContext('2d');
    const canvasHeight = getChartCanvasHeight();

    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = canvasHeight * 2;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = canvasHeight + 'px';
    ctx.scale(2, 2);

    const width = rect.width;
    const height = canvasHeight;
    const padding = { top: 28, right: 16, bottom: 44, left: 52 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    let maxRange = 100;
    let maxTTK = 0;

    const isHeadMode = state.ttkMode === 'head';

    for (let i = 0; i < state.visibleSlots; i++) {
        if (!isSlotOnChart(i)) continue;
        const weapon = state.slots[i].weapon;
        const ammo = state.slots[i].ammo;
        let effectiveRange = weapon.effectiveRange;
        if (ammo?.stats?.rangeModifier) {
            effectiveRange = effectiveRange * (1 + ammo.stats.rangeModifier / 100);
        }
        maxRange = Math.max(maxRange, effectiveRange * 2);
        const ttkAtMaxRange = calculateTTKAtDistance(i, maxRange, isHeadMode);
        if (ttkAtMaxRange !== Infinity) maxTTK = Math.max(maxTTK, ttkAtMaxRange);
    }

    maxTTK = Math.max(maxTTK * 1.2, 2);

    canvas.dataset.maxRange = maxRange;
    canvas.dataset.maxTTK = maxTTK;
    canvas.dataset.paddingLeft = padding.left;
    canvas.dataset.paddingRight = padding.right;
    canvas.dataset.paddingTop = padding.top;
    canvas.dataset.paddingBottom = padding.bottom;

    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(padding.left, padding.top, chartWidth, chartHeight);

    const fastKillZone = chartHeight * 0.25;
    const zoneColor = isHeadMode ? '212, 160, 48' : '138, 154, 64';
    const gradient = ctx.createLinearGradient(0, height - padding.bottom - fastKillZone, 0, height - padding.bottom);
    gradient.addColorStop(0, `rgba(${zoneColor}, 0)`);
    gradient.addColorStop(1, `rgba(${zoneColor}, 0.12)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(padding.left, height - padding.bottom - fastKillZone, chartWidth, fastKillZone);

    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;

    const ttkSteps = 5;
    for (let i = 0; i <= ttkSteps; i++) {
        const y = padding.top + (chartHeight / ttkSteps) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
    }

    const distSteps = 5;
    for (let i = 0; i <= distSteps; i++) {
        const x = padding.left + (chartWidth / distSteps) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, height - padding.bottom);
        ctx.stroke();
    }

    const meterUnit = isEnglish() ? 'm' : 'м';
    const secUnit = isEnglish() ? 's' : 'с';
    const distanceLabel = isEnglish() ? 'DISTANCE' : 'ДИСТАНЦИЯ';
    const ttkLabel = isHeadMode
        ? (isEnglish() ? 'TTK HEAD' : 'TTK ГОЛОВА')
        : (isEnglish() ? 'TTK BODY' : 'TTK ТЕЛО');

    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.font = '10px Roboto';
    ctx.textAlign = 'center';

    for (let i = 0; i <= distSteps; i++) {
        const x = padding.left + (chartWidth / distSteps) * i;
        const dist = Math.round((maxRange / distSteps) * i);
        ctx.fillText(dist + meterUnit, x, height - padding.bottom + 18);
    }

    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '9px Roboto';
    ctx.fillText(distanceLabel, padding.left + chartWidth / 2, height - 6);

    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.font = '10px Roboto';
    ctx.textAlign = 'right';

    for (let i = 0; i <= ttkSteps; i++) {
        const y = padding.top + (chartHeight / ttkSteps) * i;
        const ttk = maxTTK - (maxTTK / ttkSteps) * i;
        ctx.fillText(ttk.toFixed(1) + secUnit, padding.left - 6, y + 3);
    }

    ctx.save();
    ctx.translate(10, padding.top + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '9px Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(ttkLabel, 0, 0);
    ctx.restore();

    const legendItems = [];

    for (let slotIndex = 0; slotIndex < state.visibleSlots; slotIndex++) {
        if (!isSlotOnChart(slotIndex)) continue;
        const slotData = state.slots[slotIndex];

        const weapon = slotData.weapon;
        const ammo = slotData.ammo;
        const color = SLOT_COLORS[slotIndex];

        let effectiveRange = weapon.effectiveRange;
        if (ammo?.stats?.rangeModifier) {
            effectiveRange = effectiveRange * (1 + ammo.stats.rangeModifier / 100);
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();

        const points = 100;
        let firstPoint = true;

        for (let i = 0; i <= points; i++) {
            const distance = (maxRange / points) * i;
            const ttk = calculateTTKAtDistance(slotIndex, distance, isHeadMode);
            if (ttk === Infinity || ttk > maxTTK) continue;

            const x = padding.left + (distance / maxRange) * chartWidth;
            const y = height - padding.bottom - (ttk / maxTTK) * chartHeight;

            if (firstPoint) {
                ctx.moveTo(x, y);
                firstPoint = false;
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();

        ctx.beginPath();
        firstPoint = true;
        let lastX = padding.left;

        for (let i = 0; i <= points; i++) {
            const distance = (maxRange / points) * i;
            const ttk = calculateTTKAtDistance(slotIndex, distance, isHeadMode);
            if (ttk === Infinity || ttk > maxTTK) continue;

            const x = padding.left + (distance / maxRange) * chartWidth;
            const y = height - padding.bottom - (ttk / maxTTK) * chartHeight;

            if (firstPoint) {
                ctx.moveTo(x, height - padding.bottom);
                ctx.lineTo(x, y);
                firstPoint = false;
            } else {
                ctx.lineTo(x, y);
            }
            lastX = x;
        }

        ctx.lineTo(lastX, height - padding.bottom);
        ctx.closePath();
        ctx.fillStyle = hexToRgba(color, 0.1);
        ctx.fill();

        const effX = padding.left + (effectiveRange / maxRange) * chartWidth;
        if (effX < width - padding.right) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(effX, padding.top);
            ctx.lineTo(effX, height - padding.bottom);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = color;
            ctx.font = '9px Roboto';
            ctx.textAlign = 'center';
            ctx.fillText(`${Math.round(effectiveRange)}${meterUnit}`, effX, padding.top - 8);
        }

        if (state.targetDistance > 0 && state.targetDistance <= maxRange) {
            const ttk = calculateTTKAtDistance(slotIndex, state.targetDistance, isHeadMode);
            if (ttk !== Infinity && ttk <= maxTTK) {
                const pointX = padding.left + (state.targetDistance / maxRange) * chartWidth;
                const pointY = height - padding.bottom - (ttk / maxTTK) * chartHeight;

                ctx.beginPath();
                ctx.arc(pointX, pointY, 8, 0, Math.PI * 2);
                ctx.fillStyle = hexToRgba(color, 0.3);
                ctx.fill();

                ctx.beginPath();
                ctx.arc(pointX, pointY, 5, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(pointX, pointY, 5, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255,255,255,0.8)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }

        legendItems.push({
            name: getLocalizedName(weapon),
            color: color,
            slotIndex: slotIndex,
            ttk: calculateTTKAtDistance(slotIndex, state.targetDistance || 0, isHeadMode),
            shots: (() => {
                const dmg = calculateDamageAtDistance(slotIndex, state.targetDistance || 0, isHeadMode);
                return dmg > 0 ? Math.ceil(state.targetHP / dmg) : Infinity;
            })()
        });
    }

    if (state.targetDistance > 0 && state.targetDistance <= maxRange) {
        const distX = padding.left + (state.targetDistance / maxRange) * chartWidth;
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(distX, padding.top);
        ctx.lineTo(distX, height - padding.bottom);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    renderChartLegend(legendItems);
}

function formatChartTtk(value, secUnit) {
    return value === Infinity ? '∞' : value.toFixed(2);
}

function renderChartLegend(items) {
    if (!items.length) {
        elements.chartLegend.innerHTML = '';
        return;
    }

    items.sort((a, b) => {
        if (a.ttk === Infinity) return 1;
        if (b.ttk === Infinity) return -1;
        return a.ttk - b.ttk;
    });

    const isHeadMode = state.ttkMode === 'head';
    const secUnit = t('ttk.sec', 'сек');
    const shotsUnit = t('ttk.shots', 'выстр.');
    const bestLabel = t('ttk.chartBest', 'Лучший');

    elements.chartLegend.innerHTML = items.map((item, index) => {
        const isBest = index === 0 && item.ttk !== Infinity;
        const rankClass = isBest ? 'chart-rank--best' : '';
        const modeClass = isHeadMode ? 'chart-rank--head' : '';
        const ttkValue = formatChartTtk(item.ttk, secUnit);
        const shotsText = item.shots === Infinity ? '∞' : item.shots;

        return `
            <div class="chart-rank ${rankClass} ${modeClass}" style="--rank-color: ${item.color}">
                <span class="chart-rank__pos">${index + 1}</span>
                <div class="chart-rank__info">
                    <span class="chart-rank__name">${item.name}</span>
                    <span class="chart-rank__shots">${shotsText} ${shotsUnit}</span>
                    ${isBest ? `<span class="chart-rank__badge">${bestLabel}</span>` : ''}
                </div>
                <div class="chart-rank__ttk">
                    <span class="chart-rank__ttk-value">${ttkValue}</span>
                    <span class="chart-rank__ttk-unit">${secUnit}</span>
                </div>
            </div>`;
    }).join('');
}

function hexToRgba(color, alpha) {
    if (color.startsWith('hsl')) {
        return color.replace(/^hsl\(/, 'hsla(').replace(/\)$/, `, ${alpha})`);
    }
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function initChartInteractivity() {
    if (!elements.damageCanvas) return;

    const graphContainer = elements.damageCanvas.closest('.chart-results__graph');

    elements.damageCanvas.addEventListener('mousemove', (e) => {
        const hasWeapons = state.slots.some((slot, i) => isSlotOnChart(i));
        if (!hasWeapons) {
            hideCursorLine();
            hideCrosshairLabel();
            return;
        }

        const rect = elements.damageCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;

        const padding = {
            left: parseFloat(elements.damageCanvas.dataset.paddingLeft) || 52,
            right: parseFloat(elements.damageCanvas.dataset.paddingRight) || 16,
            top: parseFloat(elements.damageCanvas.dataset.paddingTop) || 28,
            bottom: parseFloat(elements.damageCanvas.dataset.paddingBottom) || 44
        };

        const chartWidth = rect.width - padding.left - padding.right;

        if (x < padding.left || x > rect.width - padding.right) {
            elements.chartTooltip.style.opacity = '0';
            hideCursorLine();
            hideCrosshairLabel();
            return;
        }

        const maxRange = parseFloat(elements.damageCanvas.dataset.maxRange) || 100;
        const isHeadMode = state.ttkMode === 'head';
        const distance = ((x - padding.left) / chartWidth) * maxRange;
        const meterUnit = isEnglish() ? 'm' : 'м';

        updateCursorLine(x, padding);
        updateCrosshairLabel(x, Math.round(distance), meterUnit);

        let tooltipItems = [];

        for (let i = 0; i < state.visibleSlots; i++) {
            if (!isSlotOnChart(i)) continue;
            const slotData = state.slots[i];

            const ttk = calculateTTKAtDistance(i, distance, isHeadMode);
            const damageAtDist = calculateDamageAtDistance(i, distance, isHeadMode);
            const shotsNeeded = damageAtDist > 0 ? Math.ceil(state.targetHP / damageAtDist) : Infinity;

            tooltipItems.push({
                name: getLocalizedName(slotData.weapon),
                color: SLOT_COLORS[i],
                ttk: ttk,
                shots: shotsNeeded
            });
        }

        tooltipItems.sort((a, b) => {
            if (a.ttk === Infinity) return 1;
            if (b.ttk === Infinity) return -1;
            return a.ttk - b.ttk;
        });

        const secUnit = t('ttk.sec', 'сек');
        const shotsUnit = t('ttk.shots', 'выстр.');
        const modeLabel = isHeadMode
            ? t('ttk.head', 'Голова').toUpperCase()
            : t('ttk.body', 'Тело').toUpperCase();

        let tooltipContent = `
            <div class="chart-tooltip__header ${isHeadMode ? 'chart-tooltip__header--head' : ''}">
                <span class="chart-tooltip__distance">${Math.round(distance)} ${meterUnit}</span>
                <span class="chart-tooltip__label">${modeLabel}</span>
            </div>
            <div class="chart-tooltip__divider"></div>`;

        tooltipItems.forEach((item, index) => {
            const ttkText = formatChartTtk(item.ttk, secUnit);
            const shotsText = item.shots === Infinity ? '∞' : item.shots;
            const isBest = index === 0 && item.ttk !== Infinity;

            tooltipContent += `
                <div class="chart-tooltip__item ${isBest ? 'chart-tooltip__item--best' : ''}">
                    <span class="chart-tooltip__color" style="background: ${item.color}"></span>
                    <span class="chart-tooltip__name">${item.name}</span>
                    <div class="chart-tooltip__values">
                        <span class="chart-tooltip__ttk">${ttkText} ${secUnit}</span>
                        <span class="chart-tooltip__shots">${shotsText} ${shotsUnit}</span>
                    </div>
                </div>`;
        });

        elements.chartTooltip.innerHTML = tooltipContent;
        elements.chartTooltip.style.opacity = '1';

        positionTooltip(e.clientX, e.clientY, graphContainer);
    });

    elements.damageCanvas.addEventListener('mouseleave', () => {
        elements.chartTooltip.style.opacity = '0';
        hideCursorLine();
        hideCrosshairLabel();
    });

    elements.damageCanvas.addEventListener('click', (e) => {
        const rect = elements.damageCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const padding = {
            left: parseFloat(elements.damageCanvas.dataset.paddingLeft) || 52,
            right: parseFloat(elements.damageCanvas.dataset.paddingRight) || 16
        };
        const chartWidth = rect.width - padding.left - padding.right;

        if (x < padding.left || x > rect.width - padding.right) return;

        const maxRange = parseFloat(elements.damageCanvas.dataset.maxRange) || 100;
        const distance = Math.round(((x - padding.left) / chartWidth) * maxRange);
        state.targetDistance = distance;
        elements.targetDistance.value = distance;

        calculateResults();
        updateChart();
        updateComparisonTable();
    });
}

function updateCrosshairLabel(x, distance, meterUnit) {
    if (!elements.chartCrosshairLabel) return;
    elements.chartCrosshairLabel.textContent = `${distance} ${meterUnit}`;
    elements.chartCrosshairLabel.style.left = x + 'px';
    elements.chartCrosshairLabel.classList.add('visible');
}

function hideCrosshairLabel() {
    if (!elements.chartCrosshairLabel) return;
    elements.chartCrosshairLabel.classList.remove('visible');
}

function updateCursorLine(x, padding) {
    if (!elements.chartCursorLine) return;
    elements.chartCursorLine.style.left = x + 'px';
    elements.chartCursorLine.style.top = padding.top + 'px';
    elements.chartCursorLine.style.height = `calc(100% - ${padding.top + padding.bottom}px)`;
    elements.chartCursorLine.classList.add('visible');
}

function hideCursorLine() {
    if (!elements.chartCursorLine) return;
    elements.chartCursorLine.classList.remove('visible');
}

function positionTooltip(clientX, clientY, container) {
    const tooltip = elements.chartTooltip;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    tooltip.style.position = 'absolute';

    let tooltipX = clientX - containerRect.left + 14;
    let tooltipY = clientY - containerRect.top - 12;

    tooltip.style.left = tooltipX + 'px';
    tooltip.style.top = tooltipY + 'px';
    tooltip.style.opacity = '1';

    const tooltipRect = tooltip.getBoundingClientRect();

    if (tooltipRect.right > containerRect.right - 8) {
        tooltipX = clientX - containerRect.left - tooltipRect.width - 14;
    }
    if (tooltipRect.bottom > containerRect.bottom - 8) {
        tooltipY = clientY - containerRect.top - tooltipRect.height - 12;
    }
    if (tooltipX < 8) tooltipX = 8;
    if (tooltipY < 8) tooltipY = 8;

    tooltip.style.left = tooltipX + 'px';
    tooltip.style.top = tooltipY + 'px';
}

// ==================== ТАБЛИЦА СРАВНЕНИЯ ====================

function updateComparisonTable() {
    const activeSlots = [];

    for (let i = 0; i < state.visibleSlots; i++) {
        if (!isSlotOnChart(i)) continue;
        activeSlots.push({
            index: i,
            weapon: state.slots[i].weapon,
            ammo: state.slots[i].ammo,
            result: calculateSlotDPS(i)
        });
    }

    if (activeSlots.length < 2) {
        elements.comparisonTable.classList.remove('visible');
        return;
    }

    elements.comparisonTable.classList.add('visible');

    const bestDPS = Math.max(...activeSlots.map(s => s.result.dpsBody));
    const bestTTK = Math.min(...activeSlots.map(s => s.result.ttkBody === Infinity ? 999999 : s.result.ttkBody));
    const bestDamage = Math.max(...activeSlots.map(s => s.result.armorDamage));

    const headers = {
        weapon: t('ttk.table.weapon', 'Оружие'),
        ammo: t('ttk.ammo', 'Патроны'),
        dpsBody: t('ttk.table.dpsBody', 'DPS (тело)'),
        damagePerShot: isEnglish() ? 'Dmg/shot' : 'Урон/выстрел',
        ttk: 'TTK',
        shots: isEnglish() ? 'Shots' : 'Выстрелов'
    };

    const secUnit = isEnglish() ? 's' : 'с';

    let html = `
        <table class="comparison-table__table">
            <thead>
                <tr>
                    <th>${headers.weapon}</th>
                    <th>${headers.ammo}</th>
                    <th>${headers.dpsBody}</th>
                    <th>${headers.damagePerShot}</th>
                    <th>${headers.ttk}</th>
                    <th>${headers.shots}</th>
                </tr>
            </thead>
            <tbody>`;

    activeSlots.forEach(slot => {
        const r = slot.result;
        const isBestDPS = r.dpsBody === bestDPS;
        const isBestTTK = r.ttkBody === bestTTK && r.ttkBody !== Infinity;
        const isBestDamage = r.armorDamage === bestDamage;

        const localizedRarity = getLocalizedRarityName(slot.weapon.rarity);
        const rarityHtml = localizedRarity
            ? `<span class="comparison-table__weapon-rarity rarity--${slot.weapon.rarity}">${localizedRarity}</span>`
            : '';

        html += `
            <tr style="border-left: 3px solid ${SLOT_COLORS[slot.index]}">
                <td>
                    <div class="comparison-table__weapon">
                        <span class="comparison-table__weapon-name">${getLocalizedName(slot.weapon)}</span>
                        ${rarityHtml}
                    </div>
                </td>
                <td>${slot.ammo ? getLocalizedName(slot.ammo).replace(/^(Патроны |Ammo )/, '') : '—'}</td>
                <td class="${isBestDPS ? 'comparison-table__best' : ''}">${Math.round(r.dpsBody)}</td>
                <td class="${isBestDamage ? 'comparison-table__best' : ''}">${r.armorDamage.toFixed(1)}</td>
                <td class="${isBestTTK ? 'comparison-table__best' : ''}">${r.ttkBody === Infinity ? '∞' : r.ttkBody.toFixed(2) + secUnit}</td>
                <td>${r.shotsBody === Infinity ? '∞' : r.shotsBody}</td>
            </tr>`;
    });

    html += '</tbody></table>';
    elements.comparisonTableContent.innerHTML = html;
}
