// ============================================================
// PROJECT CATACLYSM WIKI — UNIFIED DATABASE (BILINGUAL)
// ============================================================

// ============== LOCALIZATION HELPERS ==============
function getLocalizedField(obj, field) {
    const lang = window.i18n?.getCurrentLang() || 'ru';
    if (lang === 'en') {
        const enField = field + 'En';
        if (obj[enField]) return obj[enField];
    }
    return obj[field] || '';
}

function getLocalizedName(obj) { return getLocalizedField(obj, 'name'); }
function getLocalizedRarity(obj) {
    if (!obj.rarity) return getRarityName('none');
    return getLocalizedField(obj, 'rarityName');
}
function getLocalizedType(obj) { return getLocalizedField(obj, 'typeName'); }

// ============== ENHANCEMENT PRESETS ==============
const ENHANCEMENT_PRESETS = {
    combined: {
        maxLevel: 15,
        bonuses: { bulletResistance: [0, 0.9, 1.8, 2.7, 3.59, 6.29, 7.79, 8.98, 10.48, 11.98, 15.87, 17.97, 19.77, 21.86, 23.96, 29.95] }
    },
    combat: {
        maxLevel: 15,
        bonuses: { bulletResistance: [0, 1.8, 3.6, 5.4, 7.2, 12.6, 15.6, 18, 21, 24, 31.8, 36, 39.6, 43.8, 48, 60] }
    },
    exoskeleton: {
        maxLevel: 15,
        bonuses: { bulletResistance: [0, 1.8, 3.6, 5.4, 7.2, 12.6, 15.6, 18, 21, 24, 31.8, 36, 39.6, 43.8, 48, 60] }
    },
    superHeavy: {
        maxLevel: 15,
        bonuses: { bulletResistance: [0, 4.8, 9.6, 14.4, 19.2, 33.6, 41.6, 48, 56, 64, 84.8, 96, 105.6, 116.8, 128, 160] }
    },
    scientific: {
        maxLevel: 15,
        bonuses: { bulletResistance: [0, 0.45, 0.9, 1.35, 1.8, 3.15, 3.9, 4.5, 5.25, 6, 7.95, 9, 9.9, 10.95, 12, 15] }
    },
    legendary: {
        maxLevel: 15,
        bonuses: { bulletResistance: [0, 2.4, 4.8, 7.2, 9.6, 16.8, 20.8, 24, 28, 32, 42.4, 48, 52.8, 58.4, 64, 80] }
    }
};

// ============== ARTIFACT CATEGORIES ==============
const ARTIFACT_CATEGORIES = {
    gravity: {
        id: 'gravity',
        name: 'Гравитационные', nameEn: 'Gravitational',
        nameShort: 'Грави', nameShortEn: 'Gravity',
        color: '#8b5cf6', icon: '◆',
        svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20"/><path d="M12 2a10 10 0 0 1 0 20"/><path d="M2 12h20"/></svg>`
    },
    chemical: {
        id: 'chemical',
        name: 'Химические', nameEn: 'Chemical',
        nameShort: 'Хим', nameShortEn: 'Chem',
        color: '#10b981', icon: '◆',
        svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>`
    },
    electric: {
        id: 'electric',
        name: 'Электрические', nameEn: 'Electrical',
        nameShort: 'Электро', nameShortEn: 'Electro',
        color: '#3b82f6', icon: '◆',
        svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`
    },
    thermal: {
        id: 'thermal',
        name: 'Термические', nameEn: 'Thermal',
        nameShort: 'Терм', nameShortEn: 'Therm',
        color: '#ef4444', icon: '◆',
        svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v10l3 3"/><circle cx="12" cy="14" r="8"/></svg>`
    },
    unique: {
        id: 'unique',
        name: 'Уникальные', nameEn: 'Unique',
        nameShort: 'Уник', nameShortEn: 'Unique',
        color: '#c9a86c', icon: '★',
        svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    },
    frost: {
        id: 'frost',
        name: 'Морозные', nameEn: 'Frost',
        nameShort: 'Мороз', nameShortEn: 'Frost',
        color: '#38bdf8', icon: '❄',
        isEvent: true,
        eventName: 'Зимний ивент', eventNameEn: 'Winter Event',
        svgIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M2 12h20"/><path d="M4.93 4.93l14.14 14.14"/><path d="M19.07 4.93L4.93 19.07"/><circle cx="12" cy="12" r="4"/></svg>`
    }
};

// ============== STAT NAMES ==============
const STAT_NAMES = {
    radiationProtection: 'Защита от радиации',
    bioProtection: 'Защита от биозаражения',
    thermalProtection: 'Защита от температуры',
    psiProtection: 'Защита от пси-излучения',
    frostProtection: 'Защита от обморожения',
    heatResistance: 'Термозащита',
    chemResistance: 'Химзащита',
    electroResistance: 'Электрозащита',
    impactResistance: 'Гашение удара',
    tearProtection: 'Защита от разрывов',
    bulletResistance: 'Пулестойкость',
    regeneration: 'Регенерация',
    bleeding: 'Кровотечение',
    radiation: 'Радиация',
    saturation: 'Насыщение',
    cold: 'Холод',
    maxStamina: 'Макс. выносливость',
    staminaRegen: 'Восстановление сил',
    moveSpeed: 'Скорость передвижения',
    maxWeight: 'Макс. вес'
};

const STAT_NAMES_EN = {
    radiationProtection: 'Radiation Protection',
    bioProtection: 'Bio Protection',
    thermalProtection: 'Thermal Protection',
    psiProtection: 'Psi Protection',
    frostProtection: 'Frost Protection',
    heatResistance: 'Heat Resistance',
    chemResistance: 'Chemical Resistance',
    electroResistance: 'Electrical Resistance',
    impactResistance: 'Impact Resistance',
    tearProtection: 'Rupture Protection',
    bulletResistance: 'Bullet Resistance',
    regeneration: 'Regeneration',
    bleeding: 'Bleeding',
    radiation: 'Radiation',
    saturation: 'Satiety',
    cold: 'Cold',
    maxStamina: 'Max Stamina',
    staminaRegen: 'Stamina Recovery',
    moveSpeed: 'Movement Speed',
    maxWeight: 'Max Weight'
};

function getStatName(statKey) {
    const lang = window.i18n?.getCurrentLang() || 'ru';
    return lang === 'en' ? (STAT_NAMES_EN[statKey] || STAT_NAMES[statKey] || statKey) : (STAT_NAMES[statKey] || statKey);
}

// ============== STAT UNITS ==============
const STAT_UNITS = {
    radiationProtection: '', bioProtection: '', thermalProtection: '', psiProtection: '', frostProtection: '',
    heatResistance: '', chemResistance: '', electroResistance: '', impactResistance: '', tearProtection: '', bulletResistance: '',
    regeneration: '%/сек', bleeding: '/сек', radiation: ' мЗв/сек', saturation: '%/сек', cold: '/сек',
    maxStamina: '%', staminaRegen: '%/сек', moveSpeed: '%', maxWeight: ' кг'
};

const STAT_UNITS_EN = {
    radiationProtection: '', bioProtection: '', thermalProtection: '', psiProtection: '', frostProtection: '',
    heatResistance: '', chemResistance: '', electroResistance: '', impactResistance: '', tearProtection: '', bulletResistance: '',
    regeneration: '%/sec', bleeding: '/sec', radiation: ' mSv/sec', saturation: '%/sec', cold: '/sec',
    maxStamina: '%', staminaRegen: '%/sec', moveSpeed: '%', maxWeight: ' kg'
};

function getStatUnit(statKey) {
    const lang = window.i18n?.getCurrentLang() || 'ru';
    return lang === 'en' ? (STAT_UNITS_EN[statKey] ?? STAT_UNITS[statKey] ?? '') : (STAT_UNITS[statKey] || '');
}

const INVERTED_STATS = ['radiation', 'bleeding', 'cold'];

// ============== CONTAINER & RARITY NAMES ==============
const CONTAINER_TYPES = { standard: 'Стандартный', bulky: 'Громоздкий', compact: 'Компактный', spacious: 'Вместительный' };
const CONTAINER_TYPES_EN = { standard: 'Standard', bulky: 'Bulky', compact: 'Compact', spacious: 'Spacious' };

const RARITY_NAMES = { legendary: 'Легендарное', unique: 'Уникальное', rare: 'Раритетное', collection: 'Коллекционное', uncommon: 'Необычное', common: 'Распространённое', none: 'Без редкости' };
const RARITY_NAMES_EN = { legendary: 'Legendary', unique: 'Unique', rare: 'Rare', collection: 'Collection', uncommon: 'Uncommon', common: 'Common', none: 'No Rarity' };

const ARMOR_TYPES = { light: 'Лёгкие', scientific: 'Научные', combat: 'Боевые', combined: 'Комбинированные' };
const ARMOR_TYPES_EN = { light: 'Light', scientific: 'Scientific', combat: 'Combat', combined: 'Combined' };

function getContainerTypeName(typeKey) {
    const lang = window.i18n?.getCurrentLang() || 'ru';
    return lang === 'en' ? (CONTAINER_TYPES_EN[typeKey] || typeKey) : (CONTAINER_TYPES[typeKey] || typeKey);
}

window.getRarityName = function(rarityKey) {
    const lang = window.i18n?.getCurrentLang() || 'ru';
    return lang === 'en' ? (RARITY_NAMES_EN[rarityKey] || rarityKey) : (RARITY_NAMES[rarityKey] || rarityKey);
}

function getRarityName(rarityKey) {
    return window.getRarityName(rarityKey);
}

function getArmorTypeName(typeValue) {
    const lang = window.i18n?.getCurrentLang() || 'ru';
    if (lang === 'en') {
        for (const [key, val] of Object.entries(ARMOR_TYPES)) {
            if (val === typeValue) return ARMOR_TYPES_EN[key] || typeValue;
        }
    }
    return typeValue;
}

// ============== CONTAINERS ==============
// Изображения: images/items/Containers/<image> (PNG/WebP), поля image + imageFolder
const CONTAINERS = [
    {
        id: 'container_x2',
        name: 'Самодельный контейнер X2', nameEn: 'Homemade Container X2',
        rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common',
        type: 'bulky', typeName: 'Громоздкий', typeNameEn: 'Bulky',
        image: 'container_x2.png', imageFolder: 'Containers',
        slots: 2, stats: { maxStamina: -15.00, moveSpeed: -1.00 }, shielding: { radiation: -2.00 }
    },
    {
        id: 'container_x1',
        name: 'Самодельный контейнер X1', nameEn: 'Homemade Container X1',
        rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common',
        type: 'standard', typeName: 'Стандартный', typeNameEn: 'Standard',
        image: 'container_x1.png', imageFolder: 'Containers',
        slots: 1, stats: { maxStamina: -8.00 }, shielding: { radiation: -1.00 }
    },
    {
        id: 'pka_2',
        name: 'ПКА-2', nameEn: 'PKA-2',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'compact', typeName: 'Компактный', typeNameEn: 'Compact',
        image: 'pka_2.png', imageFolder: 'Containers',
        slots: 2, stats: {}, shielding: { radiation: -3.00 }
    },
    {
        id: 'pka_3',
        name: 'ПКА-3', nameEn: 'PKA-3',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'standard', typeName: 'Стандартный', typeNameEn: 'Standard',
        image: 'pka_3.png', imageFolder: 'Containers',
        slots: 3, stats: { maxStamina: -5.00 }, shielding: { radiation: -2.00 }
    },
    {
        id: 'pka_4',
        name: 'ПКА-4', nameEn: 'PKA-4',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'standard', typeName: 'Стандартный', typeNameEn: 'Standard',
        image: 'pka_4.png', imageFolder: 'Containers',
        slots: 4, stats: { maxStamina: -5.00 }, shielding: { radiation: -2.50 }
    },
    {
        id: 'container_radiy',
        name: 'Контейнер "Радий"', nameEn: 'Container "Radium"',
        rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare',
        type: 'standard', typeName: 'Стандартный', typeNameEn: 'Standard',
        image: 'container_radiy.png', imageFolder: 'Containers',
        slots: 5, stats: { maxStamina: -10.00 }, shielding: { radiation: -1.00 }
    },
    {
        id: 'pka_4m',
        name: 'ПКА-4М', nameEn: 'PKA-4M',
        rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique',
        type: 'compact', typeName: 'Компактный', typeNameEn: 'Compact',
        image: 'pka_4m.png', imageFolder: 'Containers',
        slots: 4, stats: {}, shielding: { radiation: -6.00 }
    },
    {
        id: 'container_bariy',
        name: 'Контейнер "Барий"', nameEn: 'Container "Barium"',
        rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique',
        type: 'spacious', typeName: 'Вместительный', typeNameEn: 'Spacious',
        image: 'container_bariy.png', imageFolder: 'Containers',
        slots: 6, stats: { maxStamina: -20.00 }, shielding: {}
    }
];

// ============== ARMORS ==============
// Изображения: images/items/Armors/<id>.png (PNG/WebP), путь формируется автоматически по id
const ARMORS = [
    // LIGHT
    {
        id: 'leather_jacket',
        name: 'Кожаная куртка', nameEn: 'Leather Jacket',
        containerTypes: ['all'],
        stats: { radiationProtection: 20, bioProtection: 20, heatResistance: 14, chemResistance: 14, electroResistance: 14, impactResistance: 12, tearProtection: 16, bulletResistance: 24, maxWeight: 5.00 },
        enhancement: null
    },
    {
        id: 'anomaly_jacket',
        name: 'Аномальная кожанка', nameEn: 'Anomalous Leather Jacket',
        containerTypes: ['all'],
        stats: { radiationProtection: 20, bioProtection: 20, heatResistance: 14, chemResistance: 18, electroResistance: 14, impactResistance: 12, tearProtection: 16, bulletResistance: 24, bleeding: -0.25, regeneration: 0.75, moveSpeed: 2.00, maxWeight: 5.00 },
        enhancement: null
    },
    {
        id: 'chainmail_jacket',
        name: 'Кольчужная куртка', nameEn: 'Chainmail Jacket',
        containerTypes: ['all'],
        stats: { radiationProtection: 20, bioProtection: 20, heatResistance: 9, chemResistance: 9, electroResistance: 9, impactResistance: 16, tearProtection: 36, bulletResistance: 32, moveSpeed: 1.00, maxWeight: 5.00 },
        enhancement: null
    },
    // SCIENTIFIC
    {
        id: 'otmychka',
        name: 'Кожаная куртка «Отмычка»', nameEn: 'Leather Jacket "Lockpick"',
        type: 'Научные', typeEn: 'Scientific',
        containerTypes: ['all'],
        stats: { radiationProtection: 100, bioProtection: 60, thermalProtection: 20, heatResistance: 20, chemResistance: 20, electroResistance: 20, impactResistance: 12, tearProtection: 16, bulletResistance: 24, maxStamina: -3.00, maxWeight: 10.00 },
        enhancement: ENHANCEMENT_PRESETS.scientific
    },
    {
        id: 'voshod',
        name: 'Научный комбинезон «Восход»', nameEn: 'Scientific Suit "Voskhod"',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'Научные', typeEn: 'Scientific',
        containerTypes: ['all'],
        stats: { radiationProtection: 200, bioProtection: 100, thermalProtection: 100, psiProtection: 60, heatResistance: 56, chemResistance: 56, electroResistance: 56, impactResistance: 62, tearProtection: 58, bulletResistance: 56, maxStamina: -5.00, maxWeight: 20.00 },
        enhancement: ENHANCEMENT_PRESETS.scientific
    },
    {
        id: 'fobos',
        name: 'Научный комбинезон «Фобос»', nameEn: 'Scientific Suit "Phobos"',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'Научные', typeEn: 'Scientific',
        containerTypes: ['all'],
        stats: { radiationProtection: 200, bioProtection: 200, thermalProtection: 100, psiProtection: 100, heatResistance: 90, chemResistance: 90, electroResistance: 90, impactResistance: 64, tearProtection: 60, bulletResistance: 72, maxStamina: -8.00, maxWeight: 24.00 },
        enhancement: ENHANCEMENT_PRESETS.scientific
    },
    {
        id: 'ssp99_ecolog',
        name: 'Комбинезон ССП-99 «Эколог»', nameEn: 'SSP-99 Suit "Ecologist"',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Научные', typeEn: 'Scientific',
        containerTypes: ['all'],
        stats: { radiationProtection: 300, bioProtection: 200, thermalProtection: 200, psiProtection: 100, heatResistance: 112, chemResistance: 112, electroResistance: 112, impactResistance: 66, tearProtection: 64, bulletResistance: 90, maxStamina: -10.00, maxWeight: 26.00 },
        enhancement: ENHANCEMENT_PRESETS.scientific
    },
    {
        id: 'ssp99_almaz',
        name: 'Комбинезон ССП-99 «Алмаз»', nameEn: 'SSP-99 Suit "Diamond"',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Научные', typeEn: 'Scientific',
        containerTypes: ['all'],
        stats: { radiationProtection: 400, bioProtection: 300, thermalProtection: 300, psiProtection: 200, heatResistance: 140, chemResistance: 140, electroResistance: 140, impactResistance: 68, tearProtection: 70, bulletResistance: 112, maxStamina: -12.00, maxWeight: 30.00 },
        enhancement: ENHANCEMENT_PRESETS.scientific
    },
    {
        id: 'ssp99m_emerald',
        name: 'Комбинезон ССП-99М «Изумруд»', nameEn: 'SSP-99M Suit "Emerald"',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Научные', typeEn: 'Scientific',
        containerTypes: ['all'],
        stats: { radiationProtection: 300, bioProtection: 400, thermalProtection: 300, psiProtection: 200, heatResistance: 140, chemResistance: 1000, electroResistance: 140, impactResistance: 68, tearProtection: 70, bulletResistance: 112, maxStamina: -12.00, maxWeight: 30.00 },
        enhancement: ENHANCEMENT_PRESETS.scientific
    },
    {
        id: 'ssp99m_topaz',
        name: 'Комбинезон ССП-99М «Топаз»', nameEn: 'SSP-99M Suit "Topaz"',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Научные', typeEn: 'Scientific',
        containerTypes: ['all'],
        stats: { radiationProtection: 300, bioProtection: 300, thermalProtection: 400, psiProtection: 200, heatResistance: 1000, chemResistance: 140, electroResistance: 140, impactResistance: 68, tearProtection: 70, bulletResistance: 112, maxStamina: -12.00, maxWeight: 30.00 },
        enhancement: ENHANCEMENT_PRESETS.scientific
    },
    {
        id: 'ssp99m_sapphire',
        name: 'Комбинезон ССП-99М «Сапфир»', nameEn: 'SSP-99M Suit "Sapphire"',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Научные', typeEn: 'Scientific',
        containerTypes: ['all'],
        stats: { radiationProtection: 300, bioProtection: 300, thermalProtection: 300, psiProtection: 400, heatResistance: 140, chemResistance: 140, electroResistance: 1000, impactResistance: 68, tearProtection: 70, bulletResistance: 112, maxStamina: -12.00, maxWeight: 30.00 },
        enhancement: ENHANCEMENT_PRESETS.scientific
    },
    {
        id: 'ssp99m_ruby',
        name: 'Комбинезон ССП-99М «Рубин»', nameEn: 'SSP-99M Suit "Ruby"',
        rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare',
        type: 'Научные', typeEn: 'Scientific',
        containerTypes: ['all'],
        stats: { radiationProtection: 360, bioProtection: 360, thermalProtection: 340, psiProtection: 300, heatResistance: 210, chemResistance: 210, electroResistance: 210, impactResistance: 72, tearProtection: 98, bulletResistance: 178, bleeding: -3.00, regeneration: 2.00, maxStamina: -15.00, maxWeight: 40.00 },
        enhancement: ENHANCEMENT_PRESETS.scientific
    },
    // COMBAT
    {
        id: 'rat_cloak',
        name: 'Плащ из крысиных шкур', nameEn: 'Rat Skin Cloak',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 100, bioProtection: 20, heatResistance: 14, chemResistance: 14, electroResistance: 14, impactResistance: 12, tearProtection: 16, bulletResistance: 24, bleeding: -1.00, saturation: 0.60, regeneration: 0.50, moveSpeed: 5.00, maxWeight: 7.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'brown_leather_cloak',
        name: 'Коричневый кожаный плащ', nameEn: 'Brown Leather Cloak',
        rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 20, bioProtection: 20, heatResistance: 12, chemResistance: 8, electroResistance: 32, impactResistance: 48, tearProtection: 92, bulletResistance: 54, maxWeight: 8.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'green_canvas_cloak',
        name: 'Зелёный брезентовый плащ', nameEn: 'Green Canvas Cloak',
        rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 20, bioProtection: 20, heatResistance: 12, chemResistance: 8, electroResistance: 32, impactResistance: 86, tearProtection: 112, bulletResistance: 48, bleeding: -0.25, maxWeight: 12.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'psz7',
        name: 'Армейский бронежилет ПСЗ-7', nameEn: 'Military Body Armor PSZ-7',
        rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { heatResistance: 10, chemResistance: 10, electroResistance: 10, impactResistance: 72, tearProtection: 88, bulletResistance: 92, maxWeight: 12.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'psz7b',
        name: 'Армейский бронежилет ПСЗ-7Б', nameEn: 'Military Body Armor PSZ-7B',
        rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 40, bioProtection: 40, heatResistance: 10, chemResistance: 10, electroResistance: 10, impactResistance: 86, tearProtection: 92, bulletResistance: 112, maxWeight: 12.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'shakal',
        name: 'Бронекостюм «Шакал»', nameEn: 'Body Armor "Jackal"',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { impactResistance: 68, tearProtection: 84, bulletResistance: 72, maxWeight: 8.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'ps5',
        name: 'Бронекостюм ПС5', nameEn: 'Body Armor PS5',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 60, bioProtection: 60, thermalProtection: 40, heatResistance: 34, chemResistance: 26, electroResistance: 16, impactResistance: 92, tearProtection: 104, bulletResistance: 134, maxStamina: -10.00, maxWeight: 12.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'berill5m',
        name: 'Бронекостюм «Берилл-5М»', nameEn: 'Body Armor "Berill-5M"',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 100, bioProtection: 100, thermalProtection: 60, heatResistance: 38, chemResistance: 28, electroResistance: 20, impactResistance: 108, tearProtection: 118, bulletResistance: 158, maxStamina: -10.00, maxWeight: 12.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'viking',
        name: 'Бронекостюм «Викинг»', nameEn: 'Body Armor "Viking"',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 200, bioProtection: 100, thermalProtection: 100, psiProtection: 100, heatResistance: 80, chemResistance: 80, electroResistance: 80, impactResistance: 82, tearProtection: 98, bulletResistance: 156, maxWeight: 24.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'raider',
        name: 'Бронекостюм «Рейдер»', nameEn: 'Body Armor "Raider"',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 100, bioProtection: 100, heatResistance: 34, chemResistance: 26, electroResistance: 16, impactResistance: 80, tearProtection: 68, bulletResistance: 126, moveSpeed: 2.00, maxWeight: 12.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'healing_berill',
        name: 'Лечебный «Берилл-5М»', nameEn: 'Healing "Berill-5M"',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 100, bioProtection: 100, thermalProtection: 60, heatResistance: 38, chemResistance: 28, electroResistance: 20, impactResistance: 98, tearProtection: 102, bulletResistance: 158, bleeding: -3.00, regeneration: 1.00, maxStamina: -5.00, maxWeight: 12.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'psz9',
        name: 'Бронекостюм «ПС3-9»', nameEn: 'Body Armor "PS3-9"',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 160, bioProtection: 100, thermalProtection: 100, psiProtection: 60, heatResistance: 72, chemResistance: 38, electroResistance: 32, impactResistance: 126, tearProtection: 142, bulletResistance: 184, maxStamina: -20.00, maxWeight: 20.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'skat9m',
        name: 'Бронекостюм «СКАТ-9М»', nameEn: 'Body Armor "SKAT-9M"',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 200, bioProtection: 160, thermalProtection: 100, psiProtection: 100, heatResistance: 86, chemResistance: 44, electroResistance: 38, impactResistance: 148, tearProtection: 168, bulletResistance: 232, maxStamina: -20.00, maxWeight: 24.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'bulat',
        name: 'Бронекостюм «Булат»', nameEn: 'Body Armor "Bulat"',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 200, bioProtection: 200, thermalProtection: 200, psiProtection: 100, heatResistance: 80, chemResistance: 40, electroResistance: 35, impactResistance: 122, tearProtection: 110, bulletResistance: 252, maxStamina: -10.00, maxWeight: 24.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'skat10',
        name: 'Бронекостюм «СКАТ-10»', nameEn: 'Body Armor "SKAT-10"',
        rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 300, bioProtection: 300, thermalProtection: 200, psiProtection: 200, heatResistance: 110, chemResistance: 110, electroResistance: 110, impactResistance: 204, tearProtection: 232, bulletResistance: 312, bleeding: -0.50, maxStamina: -10.00, maxWeight: 30.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'heavy_voshod',
        name: 'Тяжелый бронекостюм «Восход»', nameEn: 'Heavy Body Armor "Voskhod"',
        rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 200, bioProtection: 200, thermalProtection: 100, psiProtection: 200, heatResistance: 80, chemResistance: 80, electroResistance: 80, impactResistance: 182, tearProtection: 218, bulletResistance: 292, maxStamina: -30.00, maxWeight: 20.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'shturm',
        name: 'Тяжелый бронекостюм «Штурм»', nameEn: 'Heavy Body Armor "Assault"',
        rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['all'],
        stats: { radiationProtection: 240, bioProtection: 240, thermalProtection: 160, psiProtection: 200, heatResistance: 60, chemResistance: 60, electroResistance: 60, impactResistance: 232, tearProtection: 272, bulletResistance: 342, maxStamina: -30.00, maxWeight: 30.00 },
        enhancement: ENHANCEMENT_PRESETS.combat
    },
    {
        id: 'pancir',
        name: 'Сверхтяжелый бронекостюм «Панцирь»', nameEn: 'Super Heavy Body Armor "Shell"',
        rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['standard', 'compact'],
        stats: { radiationProtection: 200, bioProtection: 200, thermalProtection: 100, psiProtection: 100, heatResistance: 42, chemResistance: 42, electroResistance: 42, impactResistance: 258, tearProtection: 356, bulletResistance: 512, maxStamina: -10.00, moveSpeed: -20.00, maxWeight: 60.00 },
        enhancement: ENHANCEMENT_PRESETS.superHeavy
    },
    {
        id: 'exoskeleton',
        name: 'Экзоскелет', nameEn: 'Exoskeleton',
        rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['standard', 'spacious', 'compact'],
        stats: { radiationProtection: 200, bioProtection: 200, thermalProtection: 100, psiProtection: 200, heatResistance: 80, chemResistance: 80, electroResistance: 80, impactResistance: 214, tearProtection: 252, bulletResistance: 372, maxStamina: 10.00, moveSpeed: -5.00, maxWeight: 60.00 },
        enhancement: ENHANCEMENT_PRESETS.exoskeleton
    },
    {
        id: 'modified_exo',
        name: 'Модифицированный Экзоскелет', nameEn: 'Modified Exoskeleton',
        rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique',
        type: 'Боевые', typeEn: 'Combat',
        containerTypes: ['standard', 'spacious', 'compact'],
        stats: { radiationProtection: 200, bioProtection: 200, thermalProtection: 100, psiProtection: 200, heatResistance: 100, chemResistance: 100, electroResistance: 100, impactResistance: 242, tearProtection: 312, bulletResistance: 372, maxStamina: 10.00, maxWeight: 70.00 },
        enhancement: ENHANCEMENT_PRESETS.exoskeleton
    },
    // COMBINED
    {
        id: 'chn1',
        name: 'Бронежилет ЧН-1', nameEn: 'Body Armor CHN-1',
        rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 60, thermalProtection: 40, heatResistance: 32, chemResistance: 30, electroResistance: 28, impactResistance: 52, tearProtection: 66, bulletResistance: 62, moveSpeed: 1.00, maxWeight: 14.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'chn16',
        name: 'Бронежилет ЧН-1б', nameEn: 'Body Armor CHN-1b',
        rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 60, thermalProtection: 60, heatResistance: 44, chemResistance: 44, electroResistance: 32, impactResistance: 64, tearProtection: 76, bulletResistance: 82, moveSpeed: 1.00, maxWeight: 16.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'zarya',
        name: 'Комбинезон «Заря»', nameEn: 'Suit "Zarya"',
        rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 100, bioProtection: 60, thermalProtection: 60, heatResistance: 42, chemResistance: 46, electroResistance: 34, impactResistance: 70, tearProtection: 84, bulletResistance: 72, maxWeight: 10.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'chn2a',
        name: 'Бронежилет ЧН-2а', nameEn: 'Body Armor CHN-2a',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 100, bioProtection: 100, thermalProtection: 100, heatResistance: 40, chemResistance: 54, electroResistance: 42, impactResistance: 72, tearProtection: 86, bulletResistance: 132, moveSpeed: 2.00, maxWeight: 20.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'zarya2',
        name: 'Комбинезон «Заря-2»', nameEn: 'Suit "Zarya-2"',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 160, bioProtection: 100, thermalProtection: 100, heatResistance: 40, chemResistance: 52, electroResistance: 30, impactResistance: 80, tearProtection: 92, bulletResistance: 104, maxStamina: -5.00, maxWeight: 14.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'skitalec',
        name: 'Комбинезон «Скиталец»', nameEn: 'Suit "Wanderer"',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 120, bioProtection: 120, thermalProtection: 80, heatResistance: 10, chemResistance: 58, electroResistance: 46, impactResistance: 28, tearProtection: 32, bulletResistance: 62, maxStamina: 10.00, moveSpeed: 6.00, maxWeight: 16.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'veteran1',
        name: 'Комбинезон «Ветеран-1»', nameEn: 'Suit "Veteran-1"',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 120, bioProtection: 100, thermalProtection: 100, heatResistance: 40, chemResistance: 52, electroResistance: 30, impactResistance: 76, tearProtection: 86, bulletResistance: 86, maxWeight: 12.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'borey',
        name: 'Комбинезон «Борей»', nameEn: 'Suit "Boreas"',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 160, bioProtection: 160, thermalProtection: 120, frostProtection: 100, heatResistance: 56, chemResistance: 58, electroResistance: 62, impactResistance: 76, tearProtection: 88, bulletResistance: 108, moveSpeed: 3.00, maxWeight: 35.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'tourist',
        name: 'Комбинезон туриста', nameEn: 'Tourist Suit',
        rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 100, bioProtection: 100, thermalProtection: 100, heatResistance: 42, chemResistance: 46, electroResistance: 34, impactResistance: 74, tearProtection: 86, bulletResistance: 92, moveSpeed: 2.00, maxWeight: 30.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'seva',
        name: 'Комбинезон «Сева»', nameEn: 'Suit "SEVA"',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 300, bioProtection: 300, thermalProtection: 200, psiProtection: 200, heatResistance: 110, chemResistance: 110, electroResistance: 110, impactResistance: 102, tearProtection: 108, bulletResistance: 168, maxStamina: -10.00, maxWeight: 26.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'chn26',
        name: 'Бронежилет ЧН-2б', nameEn: 'Body Armor CHN-2b',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 200, bioProtection: 200, thermalProtection: 100, psiProtection: 100, heatResistance: 60, chemResistance: 74, electroResistance: 62, impactResistance: 84, tearProtection: 90, bulletResistance: 172, moveSpeed: 2.00, maxWeight: 22.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'zarya3',
        name: 'Комбинезон «Заря-3»', nameEn: 'Suit "Zarya-3"',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 200, bioProtection: 160, thermalProtection: 140, psiProtection: 100, heatResistance: 80, chemResistance: 80, electroResistance: 80, impactResistance: 90, tearProtection: 102, bulletResistance: 142, maxStamina: -5.00, maxWeight: 16.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'chn3a',
        name: 'Бронежилет ЧН-3а', nameEn: 'Body Armor CHN-3a',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 300, bioProtection: 200, thermalProtection: 200, psiProtection: 160, heatResistance: 100, chemResistance: 100, electroResistance: 100, impactResistance: 98, tearProtection: 96, bulletResistance: 208, moveSpeed: 2.00, maxWeight: 24.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'commando',
        name: 'Бронекомбинезон «Commando»', nameEn: 'Armored Suit "Commando"',
        rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 300, bioProtection: 300, thermalProtection: 200, psiProtection: 200, heatResistance: 140, chemResistance: 140, electroResistance: 140, impactResistance: 116, tearProtection: 124, bulletResistance: 204, maxWeight: 32.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'makeshift_exo',
        name: 'Кустарный экзоскелет', nameEn: 'Makeshift Exoskeleton',
        rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['standard', 'spacious', 'compact'],
        stats: { radiationProtection: 240, bioProtection: 300, thermalProtection: 160, psiProtection: 200, heatResistance: 84, chemResistance: 76, electroResistance: 52, impactResistance: 208, tearProtection: 212, bulletResistance: 292, maxStamina: 5.00, moveSpeed: -4.00, maxWeight: 50.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'pereval',
        name: 'Комбинезон «Перевал»', nameEn: 'Suit "Pass"',
        rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['standard', 'spacious', 'compact'],
        stats: { radiationProtection: 300, bioProtection: 300, thermalProtection: 200, psiProtection: 200, heatResistance: 64, chemResistance: 78, electroResistance: 72, impactResistance: 154, tearProtection: 168, bulletResistance: 192, maxStamina: -5.00, moveSpeed: -1.00, maxWeight: 40.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'chn36',
        name: 'Тяжелый бронекостюм ЧН-3б', nameEn: 'Heavy Body Armor CHN-3b',
        rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 300, bioProtection: 300, thermalProtection: 200, psiProtection: 300, heatResistance: 118, chemResistance: 120, electroResistance: 40, impactResistance: 182, tearProtection: 176, bulletResistance: 302, moveSpeed: 1.00, maxWeight: 20.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'pokrov',
        name: 'Бронекостюм «Покров»', nameEn: 'Body Armor "Veil"',
        rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 300, bioProtection: 300, thermalProtection: 300, psiProtection: 300, heatResistance: 180, chemResistance: 210, electroResistance: 180, impactResistance: 168, tearProtection: 188, bulletResistance: 292, bleeding: -1.00, maxWeight: 50.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'prorok',
        name: 'Комбинезон «Пророк»', nameEn: 'Suit "Prophet"',
        rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 300, bioProtection: 200, thermalProtection: 200, psiProtection: 200, heatResistance: 86, chemResistance: 84, electroResistance: 88, impactResistance: 144, tearProtection: 172, bulletResistance: 232, bleeding: -0.50, regeneration: 1.00, moveSpeed: 2.00, maxWeight: 34.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'chn3m',
        name: 'Бронежилет ЧН-3м', nameEn: 'Body Armor CHN-3m',
        rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['all'],
        stats: { radiationProtection: 300, bioProtection: 300, thermalProtection: 240, psiProtection: 200, heatResistance: 120, chemResistance: 120, electroResistance: 120, impactResistance: 122, tearProtection: 138, bulletResistance: 282, moveSpeed: 1.00, maxWeight: 26.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'yggdrasil',
        name: 'Экзоскелет «Иггдрасиль»', nameEn: 'Exoskeleton "Yggdrasil"',
        rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['standard', 'spacious', 'compact'],
        stats: { radiationProtection: 300, bioProtection: 300, thermalProtection: 160, frostProtection: 200, psiProtection: 200, heatResistance: 104, chemResistance: 96, electroResistance: 84, impactResistance: 142, tearProtection: 214, bulletResistance: 318, bleeding: -2.00, maxStamina: 10.00, saturation: 0.50, regeneration: 1.00, cold: -20.00, moveSpeed: -1.00, maxWeight: 50.00 },
        enhancement: ENHANCEMENT_PRESETS.combined
    },
    {
        id: 'commando_exo',
        name: 'Сверхпрочный экзоскелет «Commando»', nameEn: 'Super Heavy Exoskeleton "Commando"',
        rarity: 'legendary', rarityName: 'Легендарное', rarityNameEn: 'Legendary',
        type: 'Комбинированные', typeEn: 'Combined',
        containerTypes: ['standard', 'spacious', 'compact'],
        stats: { radiationProtection: 300, bioProtection: 300, thermalProtection: 200, psiProtection: 300, heatResistance: 120, chemResistance: 120, electroResistance: 120, impactResistance: 252, tearProtection: 324, bulletResistance: 382, bleeding: -1.00, maxStamina: 20.00, maxWeight: 80.00 },
        enhancement: ENHANCEMENT_PRESETS.legendary
    }
];

// ============== ARTIFACTS ==============
// Изображения: images/items/Artifacts/<id>.png
const ARTIFACTS = [
    // GRAVITATIONAL
    { id: 'blood_stone', name: 'Кровь камня', nameEn: 'Blood Stone', category: 'gravity', tier: 1, image: 'blood_stone.png', imageFolder: 'Artifacts', price: 3200, stats: { regeneration: 1.00, bleeding: -0.25, radiation: 1.00 } },
    { id: 'vyvert', name: 'Выверт', nameEn: 'Vyvert', category: 'gravity', tier: 1, image: 'vyvert.png', imageFolder: 'Artifacts', price: 5000, stats: { tearProtection: 20, maxWeight: 6.00, radiation: 1.00 } },
    { id: 'medusa', name: 'Медуза', nameEn: 'Medusa', category: 'gravity', tier: 1, image: 'medusa.png', imageFolder: 'Artifacts', price: 12000, stats: { radiationProtection: 20, maxWeight: 4.00, radiation: -2.00, bulletResistance: -3 } },
    { id: 'stone_flower', name: 'Каменный цветок', nameEn: 'Stone Flower', category: 'gravity', tier: 1, image: 'stone_flower.png', imageFolder: 'Artifacts', price: 12500, stats: { psiProtection: 20, maxWeight: 6.00, bulletResistance: 8, radiation: 2.00 } },
    { id: 'meat_chunk', name: 'Ломоть мяса', nameEn: 'Meat Chunk', category: 'gravity', tier: 2, image: 'meat_chunk.png', imageFolder: 'Artifacts', price: 13500, stats: { regeneration: 2.00, bleeding: -0.75, radiation: 1.50 } },
    { id: 'gravi', name: 'Грави', nameEn: 'Gravi', category: 'gravity', tier: 2, image: 'gravi.png', imageFolder: 'Artifacts', price: 21000, stats: { tearProtection: 30, maxWeight: 12.00, radiation: 2.00 } },
    { id: 'night_star', name: 'Ночная звезда', nameEn: 'Night Star', category: 'gravity', tier: 2, image: 'night_star.png', imageFolder: 'Artifacts', price: 26100, stats: { bulletResistance: 21, maxStamina: -2.00, radiation: 3.00 } },
    { id: 'mercury_ball', name: 'Ртутный шар', nameEn: 'Mercury Ball', category: 'gravity', tier: 2, image: 'mercury_ball.png', imageFolder: 'Artifacts', price: 30000, stats: { impactResistance: 20, radiationProtection: 20, tearProtection: 15, saturation: 1.00, maxWeight: -6.00, radiation: 1.00 } },
    { id: 'gold_fish', name: 'Золотая рыбка', nameEn: 'Goldfish', category: 'gravity', tier: 3, image: 'gold_fish.png', imageFolder: 'Artifacts', price: 31000, stats: { tearProtection: 60, maxWeight: 15.00, maxStamina: -5.00, radiation: 2.00 } },
    { id: 'spring', name: 'Пружина', nameEn: 'Spring', category: 'gravity', tier: 3, image: 'spring.png', imageFolder: 'Artifacts', price: 40200, stats: { impactResistance: 60, tearProtection: 30, maxWeight: 8.00, bulletResistance: 16, staminaRegen: -1.25, bioProtection: -20, radiationProtection: -20, thermalProtection: -20, maxStamina: -12.50, heatResistance: -20, chemResistance: -20 } },
    { id: 'golden_gravi', name: 'Золотистый грави', nameEn: 'Golden Gravi', category: 'gravity', tier: 3, image: 'golden_gravi.png', imageFolder: 'Artifacts', price: 46000, stats: { tearProtection: 40, maxWeight: 30.00, radiation: 3.00 } },
    { id: 'yantarnik', name: 'Янтарник', nameEn: 'Yantarnik', category: 'gravity', tier: 3, image: 'yantarnik.png', imageFolder: 'Artifacts', price: 52000, stats: { maxWeight: 18.00, bulletResistance: 24, radiation: 3.00 } },
    { id: 'soul', name: 'Душа', nameEn: 'Soul', category: 'gravity', tier: 3, image: 'soul.png', imageFolder: 'Artifacts', price: 61000, stats: { bleeding: -5.00, regeneration: 8.50,  saturation: -2.25, bulletResistance: -20, radiation: 5.00 } },
    { id: 'dark_medusa', name: 'Тёмная медуза', nameEn: 'Dark Medusa', category: 'gravity', tier: 3, image: 'dark_medusa.png', imageFolder: 'Artifacts', price: 78000, stats: { bulletResistance: 42, regeneration: -0.25, maxStamina: -10.00, radiation: 5.00 } },
    { id: 'proto_medusa', name: 'Протомедуза', nameEn: 'Protomedusa', category: 'gravity', tier: 3, image: 'proto_medusa.png', imageFolder: 'Artifacts', price: 80200, stats: { radiationProtection: 80, maxWeight: 12.00, radiation: -8.00, bulletResistance: -24 } },
    // CHEMICAL
    { id: 'slime', name: 'Слизь', nameEn: 'Slime', category: 'chemical', tier: 1, image: 'slime.png', imageFolder: 'Artifacts', price: 4000, stats: { bioProtection: 10, bleeding: -1.50, saturation: 0.45, chemResistance: 10, regeneration: -0.15 } },
    { id: 'thorn', name: 'Колючка', nameEn: 'Thorn', category: 'chemical', tier: 1, image: 'thorn.png', imageFolder: 'Artifacts', price: 10300, stats: { bioProtection: 15, radiationProtection: 30, radiation: -3.00, chemResistance: 15, bleeding: 1.50 } },
    { id: 'slug', name: 'Слизняк', nameEn: 'Slug', category: 'chemical', tier: 2, image: 'slug.png', imageFolder: 'Artifacts', price: 11800, stats: { bioProtection: 20, saturation: 1.25, chemResistance: 20, maxWeight: -3.00, regeneration: -0.45 } },
    { id: 'bile_stone', name: 'Желчь камня', nameEn: 'Bile Stone', category: 'chemical', tier: 2, image: 'bile_stone.png', imageFolder: 'Artifacts', price: 21000, stats: { maxWeight: 5.00, saturation: 1.75, bioProtection: -15, radiation: 1.50 } },
    { id: 'swamp_rot', name: 'Болотный гнилец', nameEn: 'Swamp Rot', category: 'chemical', tier: 2, image: 'swamp_rot.png', imageFolder: 'Artifacts', price: 22000, stats: { saturation: 2.35, bioProtection: -10, maxWeight: -5.00, regeneration: -0.75, chemResistance: -5 } },
    { id: 'crystal_thorn', name: 'Кристальная колючка', nameEn: 'Crystal Thorn', category: 'chemical', tier: 2, image: 'crystal_thorn.png', imageFolder: 'Artifacts', price: 31000, stats: { radiationProtection: 40, radiation: -4.00, bioProtection: -15, bleeding: 2.00, chemResistance: -9 } },
    { id: 'firefly', name: 'Светляк', nameEn: 'Firefly', category: 'chemical', tier: 3, image: 'firefly.png', imageFolder: 'Artifacts', price: 42000, stats: { staminaRegen: 2.00, bleeding: -3.00, regeneration: 5.50, moveSpeed: 2.00, saturation: -1.75, radiation: 4.00 } },
    { id: 'mica', name: 'Слюда', nameEn: 'Mica', category: 'chemical', tier: 3, image: 'mica.png', imageFolder: 'Artifacts', price: 45000, stats: { bioProtection: 60, maxWeight: 6.50, maxStamina: 35.00, chemResistance: -20 } },
    { id: 'pellicle', name: 'Плёнка', nameEn: 'Pellicle', category: 'chemical', tier: 3, image: 'pellicle.png', imageFolder: 'Artifacts', price: 47000, stats: { bioProtection: 20, saturation: 2.50, radiation: 2.00 } },
    { id: 'sea_urchin', name: 'Морской ёж', nameEn: 'Sea Urchin', category: 'chemical', tier: 3, image: 'sea_urchin.png', imageFolder: 'Artifacts', price: 59000, stats: { radiationProtection: 50, radiation: -5.00, bleeding: 3.00 } },
    { id: 'kolobok', name: 'Колобок', nameEn: 'Kolobok', category: 'chemical', tier: 3, image: 'kolobok.png', imageFolder: 'Artifacts', price: 78000, stats: { bleeding: -4.00, regeneration: 2.50, maxStamina: -5.00, bulletResistance: -8, radiation: 2.00 } },
    { id: 'bubble', name: 'Пузырь', nameEn: 'Bubble', category: 'chemical', tier: 3, image: 'bubble.png', imageFolder: 'Artifacts', price: 86000, stats: { radiationProtection: 60, radiation: -6.00 } },
    // ELECTRICAL
    { id: 'sparkler', name: 'Бенгальский огонь', nameEn: 'Sparkler', category: 'electric', tier: 1, image: 'sparkler.png', imageFolder: 'Artifacts', price: 6000, stats: { staminaRegen: 0.50, electroResistance: 10, radiation: 0.50 } },
    { id: 'flash', name: 'Вспышка', nameEn: 'Flash', category: 'electric', tier: 1, image: 'flash.png', imageFolder: 'Artifacts', price: 12000, stats: { staminaRegen: 1.00, electroResistance: 15, radiation: 1.00 } },
    { id: 'battery', name: 'Батарейка', nameEn: 'Battery', category: 'electric', tier: 1, image: 'battery.png', imageFolder: 'Artifacts', price: 15000, stats: { staminaRegen: 1.50, moveSpeed: 2.00, radiation: 1.00 } },
    { id: 'moonlight', name: 'Лунный свет', nameEn: 'Moonlight', category: 'electric', tier: 2, image: 'moonlight.png', imageFolder: 'Artifacts', price: 22000, stats: { psiProtection: 45, radiation: 1.00, electroResistance: -20 } },
    { id: 'sky_stone', name: 'Небесный камень', nameEn: 'Sky Stone', category: 'electric', tier: 2, image: 'sky_stone.png', imageFolder: 'Artifacts', price: 22000, stats: { staminaRegen: 2.25, regeneration: 2.00, moveSpeed: 2.00, electroResistance: 25, saturation: -0.35, radiation: 2.50 } },
    { id: 'medium', name: 'Медиум', nameEn: 'Medium', category: 'electric', tier: 2, image: 'medium.png', imageFolder: 'Artifacts', price: 23000, stats: { psiProtection: 60, electroResistance: -35 } },
    { id: 'electro_mica', name: 'Электрослюда', nameEn: 'Electro Mica', category: 'electric', tier: 2, image: 'electro_mica.png', imageFolder: 'Artifacts', price: 27000, stats: { staminaRegen: 3.50, maxStamina: 35.00, moveSpeed: 3.00, electroResistance: 20, radiation: 2.00 } },
    { id: 'dummy', name: 'Пустышка', nameEn: 'Dummy', category: 'electric', tier: 3, image: 'dummy.png', imageFolder: 'Artifacts', price: 35000, stats: { staminaRegen: 5.25, bulletResistance: 16, moveSpeed: 4.00, maxStamina: -20.00, radiation: 3.00 } },
    { id: 'halogen', name: 'Галоген', nameEn: 'Halogen', category: 'electric', tier: 3, image: 'halogen.png', imageFolder: 'Artifacts', price: 61000, stats: { psiProtection: 120, maxStamina: 10.00, moveSpeed: 5.00, bleeding: 4.00 } },
    { id: 'snowflake', name: 'Снежинка', nameEn: 'Snowflake', category: 'electric', tier: 3, image: 'snowflake.png', imageFolder: 'Artifacts', price: 78000, stats: { staminaRegen: 2.00, maxStamina: 20.00, moveSpeed: 6.00, bulletResistance: -22, radiation: 4.00 } },
    // THERMAL
    { id: 'droplet', name: 'Капля', nameEn: 'Droplet', category: 'thermal', tier: 1, image: 'droplet.png', imageFolder: 'Artifacts', price: 3500, stats: { maxWeight: 2.00, radiation: -0.50, heatResistance: 10, staminaRegen: -0.25 } },
    { id: 'crystal', name: 'Кристалл', nameEn: 'Crystal', category: 'thermal', tier: 1, image: 'crystal.png', imageFolder: 'Artifacts', price: 4800, stats: { frostProtection: 20, radiation: -1.00, heatResistance: 15, staminaRegen: -0.75 } },
    { id: 'fireball', name: 'Огненный шар', nameEn: 'Fireball', category: 'thermal', tier: 1, image: 'fireball.png', imageFolder: 'Artifacts', price: 6800, stats: { frostProtection: 20, thermalProtection: 20, radiation: -1.50, staminaRegen: -1.25 } },
    { id: 'mothers_beads', name: 'Мамины бусы', nameEn: "Mother's Beads", category: 'thermal', tier: 2, image: 'mothers_beads.png', imageFolder: 'Artifacts', price: 13600, stats: { bleeding: -5.00, radiation: 1.00, heatResistance: -10 } },
    { id: 'eye', name: 'Глаз', nameEn: 'Eye', category: 'thermal', tier: 2, image: 'eye.png', imageFolder: 'Artifacts', price: 19350, stats: { thermalProtection: 30, bleeding: -10.00, heatResistance: 20, radiation: 2.00 } },
    { id: 'flame', name: 'Пламя', nameEn: 'Flame', category: 'thermal', tier: 3, image: 'flame.png', imageFolder: 'Artifacts', price: 32000, stats: { frostProtection: 40, thermalProtection: 80, bleeding: -15.00, radiation: 3.00 } },
    { id: 'fire_loop', name: 'Огненная петля', nameEn: 'Fire Loop', category: 'thermal', tier: 3, image: 'fire_loop.png', imageFolder: 'Artifacts', price: 36000, stats: { bleeding: -6.00, regeneration: 4.75, maxStamina: -10.00, saturation: -1.30, radiation: 3.50 } },
    { id: 'dragon_eye', name: 'Глаз дракона', nameEn: "Dragon's Eye", category: 'thermal', tier: 3, image: 'dragon_eye.png', imageFolder: 'Artifacts', price: 44000, stats: { staminaRegen: 3.00, bleeding: -3.00, maxWeight: 22.00, regeneration: -0.55 } },
    // UNIQUE
    { id: 'generator', name: 'Генератор', nameEn: 'Generator', category: 'unique', tier: 3, image: 'generator.png', imageFolder: 'Artifacts', price: null, priceText: 'Нельзя продать', priceTextEn: 'Cannot sell', stats: { staminaRegen: 2.50, maxStamina: 10.00, moveSpeed: 3.00, radiation: 2.00 } },
    { id: 'medallion', name: 'Медальон', nameEn: 'Medallion', category: 'unique', tier: 3, image: 'medallion.png', imageFolder: 'Artifacts', price: null, priceText: 'Нельзя продать', priceTextEn: 'Cannot sell', stats: { bleeding: -2.00, regeneration: 3.00, maxStamina: -5.00, radiation: 2.00 } },
    { id: 'goblet_bio', name: 'Бокал (био)', nameEn: 'Goblet (Bio)', category: 'unique', tier: 2, image: 'goblet_bio.png', imageFolder: 'Artifacts', price: null, priceText: 'Нельзя продать', priceTextEn: 'Cannot sell', stats: { saturation: 1.00, radiation: -1.50, bulletResistance: -6 } },
    { id: 'goblet_gravity', name: 'Бокал (грави)', nameEn: 'Goblet (Gravity)', category: 'unique', tier: 2, image: 'goblet_gravity.png', imageFolder: 'Artifacts', price: null, priceText: 'Нельзя продать', priceTextEn: 'Cannot sell', stats: { tearProtection: 12, bulletResistance: 12, radiation: 1.00 } },
    { id: 'goblet_thermal', name: 'Бокал (терма)', nameEn: 'Goblet (Thermal)', category: 'unique', tier: 2, image: 'goblet_thermal.png', imageFolder: 'Artifacts', price: null, priceText: 'Нельзя продать', priceTextEn: 'Cannot sell', stats: { bleeding: -1.00, regeneration: 1.50, radiation: 1.00 } },
    // FROST (EVENT)
    { id: 'proto_snowflake', name: 'Прото-снежинка', nameEn: 'Proto-snowflake', category: 'frost', tier: 1, image: 'proto_snowflake.png', imageFolder: 'Artifacts', price: null, priceText: 'Ивент', priceTextEn: 'Event', stats: { frostProtection: 50, tearProtection: 30, cold: -20.00, impactResistance: -20, saturation: -0.05, moveSpeed: -1.00 } },
    { id: 'frostbiter', name: 'Обморожник', nameEn: 'Frostbiter', category: 'frost', tier: 1, image: 'frostbiter.png', imageFolder: 'Artifacts', price: null, priceText: 'Ивент', priceTextEn: 'Event', stats: { saturation: 1.00, heatResistance: 20, chemResistance: 20, frostProtection: -35, bulletResistance: -12, cold: 10.00 } },
    { id: 'ice_crystal', name: 'Ледяной кристалл', nameEn: 'Ice Crystal', category: 'frost', tier: 1, image: 'ice_crystal.png', imageFolder: 'Artifacts', price: null, priceText: 'Ивент', priceTextEn: 'Event', stats: { frostProtection: 40, cold: -15.00, radiation: 0.50 } },
    { id: 'polar_star', name: 'Полярная звезда', nameEn: 'Polar Star', category: 'frost', tier: 2, image: 'polar_star.png', imageFolder: 'Artifacts', price: null, priceText: 'Ивент', priceTextEn: 'Event', stats: { staminaRegen: 1.00, frostProtection: 100, maxStamina: 10.00, moveSpeed: 3.00,  cold: -40.00, psiProtection: -100, radiation: 1.00 } },
    { id: 'purple_tear', name: 'Пурпурная слеза', nameEn: 'Purple Tear', category: 'frost', tier: 2, image: 'purple_tear.png', imageFolder: 'Artifacts', price: null, priceText: 'Ивент', priceTextEn: 'Event', stats: { staminaRegen: 3.00, thermalProtection: 30, bleeding: -4.00, maxStamina: 30.00, moveSpeed: 5.00, heatResistance: 20, frostProtection: -50, bulletResistance: -12, radiation: 2.00, cold: 20.00 } },
    { id: 'ice_flower', name: 'Ледоцвет', nameEn: 'Ice Flower', category: 'frost', tier: 3, image: 'ice_flower.png', imageFolder: 'Artifacts', price: null, priceText: 'Ивент', priceTextEn: 'Event', stats: { frostProtection: 200, bleeding: -5.00, maxWeight: 25.00, cold: -60.00, thermalProtection: -30, bulletResistance: -8, radiation: 1.50, heatResistance: -40 } },
    { id: 'tesseract', name: 'Тессеракт', nameEn: 'Tesseract', category: 'frost', tier: 3, image: 'tesseract.png', imageFolder: 'Artifacts', price: null, priceText: 'Ивент', priceTextEn: 'Event', stats: { staminaRegen: 2.00, maxStamina: 20.00, bulletResistance: 40, moveSpeed: 4.00, radiation: 4.00, cold: 30.00 } }
];

// ============== WEAPON CATEGORIES ==============
const WEAPON_CATEGORIES = {
    assault: { id: 'assault', name: 'Штурмовые винтовки', nameEn: 'Assault Rifles', nameShort: 'Штурмовые', nameShortEn: 'Assault', icon: '🔫' },
    sniper: { id: 'sniper', name: 'Снайперские винтовки', nameEn: 'Sniper Rifles', nameShort: 'Снайперские', nameShortEn: 'Sniper', icon: '🎯' },
    shotgun: { id: 'shotgun', name: 'Дробовики', nameEn: 'Shotguns', nameShort: 'Дробовики', nameShortEn: 'Shotguns', icon: '💥' },
    smg: { id: 'smg', name: 'Пистолеты-пулемёты', nameEn: 'Submachine Guns', nameShort: 'ПП', nameShortEn: 'SMG', icon: '🔧' },
    pistol: { id: 'pistol', name: 'Пистолеты', nameEn: 'Pistols', nameShort: 'Пистолеты', nameShortEn: 'Pistols', icon: '🔫' },
    machinegun: { id: 'machinegun', name: 'Пулемёты', nameEn: 'Machine Guns', nameShort: 'Пулемёты', nameShortEn: 'LMG', icon: '⚙️' },
    special: { id: 'special', name: 'Специальное', nameEn: 'Special', nameShort: 'Спец', nameShortEn: 'Special', icon: '🔥' }
};

// ============== HELPER FUNCTIONS ==============
const ITEMS_IMAGES_DIR = 'images/items/';

function getItemImagePath(imageFolder, image, basePath = '../') {
    return `${basePath}${ITEMS_IMAGES_DIR}${imageFolder}/${image}`;
}

function getArtifactImagePath(artifact, basePath = '../') {
    if (artifact?.image && artifact?.imageFolder) {
        return getItemImagePath(artifact.imageFolder, artifact.image, basePath);
    }
    if (artifact?.id) {
        return `${basePath}${ITEMS_IMAGES_DIR}Artifacts/${artifact.id}.png`;
    }
    return null;
}

function getContainerImagePath(container, basePath = '../') {
    if (container?.image && container?.imageFolder) {
        return getItemImagePath(container.imageFolder, container.image, basePath);
    }
    return null;
}

function getArmorImagePath(armor, basePath = '../') {
    if (armor?.image && armor?.imageFolder) {
        return getItemImagePath(armor.imageFolder, armor.image, basePath);
    }
    if (armor?.id) {
        return `${basePath}${ITEMS_IMAGES_DIR}Armors/${armor.id}.png`;
    }
    return null;
}

function getCategoryName(categoryId) {
    const cat = ARTIFACT_CATEGORIES[categoryId];
    return cat ? getLocalizedField(cat, 'name') : categoryId;
}

function getCategoryShortName(categoryId) {
    const cat = ARTIFACT_CATEGORIES[categoryId];
    return cat ? getLocalizedField(cat, 'nameShort') : categoryId;
}

function getArtifactsByCategory(categoryId) {
    return ARTIFACTS.filter(a => a.category === categoryId);
}

function formatPrice(price) {
    if (price === null) return null;
    const lang = window.i18n?.getCurrentLang() || 'ru';
    return lang === 'en' ? price.toLocaleString('en-US') + ' ₽' : price.toLocaleString('ru-RU') + ' ₽';
}

function getArtifactPriceText(artifact) {
    if (artifact.price !== null) return formatPrice(artifact.price);
    return getLocalizedField(artifact, 'priceText') || '—';
}

function formatStatValue(statKey, value) {
    const isInverted = INVERTED_STATS.includes(statKey);
    const unit = getStatUnit(statKey);
    let displayValue, isPositive;
    if (value === 0) { displayValue = '0'; isPositive = null; }
    else if (value > 0) { displayValue = `+${formatNumber(value)}`; isPositive = !isInverted; }
    else { displayValue = formatNumber(value); isPositive = isInverted; }
    return { displayValue: displayValue + unit, isPositive, colorClass: isPositive === null ? '' : (isPositive ? 'property--positive' : 'property--negative') };
}

function formatNumber(value) {
    return value.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
}

function getSlotWord(count) {
    const lang = window.i18n?.getCurrentLang() || 'ru';
    if (lang === 'en') return count === 1 ? '' : 's';
    if (count === 1) return '';
    if (count >= 2 && count <= 4) return 'а';
    return 'ов';
}

function getSlotsText(count) {
    const lang = window.i18n?.getCurrentLang() || 'ru';
    if (lang === 'en') return `${count} slot${count === 1 ? '' : 's'}`;
    return `${count} слот${getSlotWord(count)}`;
}

// ============== WEAPONS ==============
const WEAPONS = [
    // SHOTGUNS
    { id: 'toz194', name: 'ТОЗ-194', nameEn: 'TOZ-194', category: 'shotgun', rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common', damage: 84, rpm: 45, headshotMult: 1.25, effectiveRange: 89.0, fireModes: ['single'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 5.56, horizontalRecoil: 4.70, hipSpread: 1.13, adsSpread: 1.13 } },
    { id: 'fort500', name: 'Форт-500', nameEn: 'Fort-500', category: 'shotgun', rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common', damage: 82, rpm: 80, headshotMult: 1.25, effectiveRange: 85.0, fireModes: ['single'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 5.50, horizontalRecoil: 4.72, hipSpread: 1.19, adsSpread: 1.19 } },
    { id: 'toz-55-Zubr', name: 'ТОЗ-55 «Зубр»', nameEn: 'TOZ-55 "Zubr"', category: 'shotgun', rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common', damage: 85, rpm: 1000, headshotMult: 1.75, effectiveRange: 138.0, fireModes: ['auto', 'single'], ammoTypes: ['12x76_dart', '12x76_slug'], stats: { verticalRecoil: 3.45, horizontalRecoil: 2.10, hipSpread: 0.21, adsSpread: 0.21 } },
    { id: 'mossberg_maverick', name: 'Mossberg Maverick 88 Cruiser', nameEn: 'Mossberg Maverick 88 Cruiser', category: 'shotgun', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 86, rpm: 80, headshotMult: 1.25, effectiveRange: 99.0, fireModes: ['single'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 4.77, horizontalRecoil: 3.90, hipSpread: 0.99, adsSpread: 0.99 } },
    { id: 'remington_870', name: 'Remington 870 Tactical', nameEn: 'Remington 870 Tactical', category: 'shotgun', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 95, rpm: 50, headshotMult: 1.25, effectiveRange: 81.0, fireModes: ['single'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 6.81, horizontalRecoil: 5.32, hipSpread: 1.18, adsSpread: 1.18 } },
    { id: 'remington_870-free-wind', name: 'Remington 870 «Вольный ветер»', nameEn: 'Remington 870 "Free Wind"', category: 'shotgun', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 95, rpm: 50, headshotMult: 1.25, effectiveRange: 81.0, fireModes: ['single'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 6.81, horizontalRecoil: 5.32, hipSpread: 1.18, adsSpread: 1.18 } },
    { id: 'predator', name: 'Хищник', nameEn: 'Predator', category: 'shotgun', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 91, rpm: 80, headshotMult: 1.25, effectiveRange: 80.0, fireModes: ['single'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 5.30, horizontalRecoil: 4.63, hipSpread: 1.13, adsSpread: 1.13 } },
    { id: 'mp153', name: 'MP-153', nameEn: 'MP-153', category: 'shotgun', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 84, rpm: 265, headshotMult: 1.25, effectiveRange: 95.0, fireModes: ['auto', 'single'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 4.68, horizontalRecoil: 2.57, hipSpread: 0.89, adsSpread: 0.89 } },
    { id: 'protecta', name: 'Protecta', nameEn: 'Protecta', category: 'shotgun', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 77, rpm: 230, headshotMult: 1.25, effectiveRange: 72.0, fireModes: ['auto'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 5.52, horizontalRecoil: 3.35, hipSpread: 1.33, adsSpread: 1.33 } },
    { id: 'usas12', name: 'Daewoo USAS-12', nameEn: 'Daewoo USAS-12', category: 'shotgun', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 75, rpm: 360, headshotMult: 1.25, effectiveRange: 73.0, fireModes: ['auto', 'single'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 5.11, horizontalRecoil: 3.59, hipSpread: 1.15, adsSpread: 1.15 } },
    { id: 'spas12', name: 'Franchi SPAS-12', nameEn: 'Franchi SPAS-12', category: 'shotgun', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 90, rpm: 300, headshotMult: 1.25, effectiveRange: 76.0, fireModes: ['auto'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 6.55, horizontalRecoil: 3.10, hipSpread: 0.98, adsSpread: 0.98 } },
    // SMG
    { id: 'skorpion_vz61', name: 'Skorpion vz.61', nameEn: 'Skorpion vz.61', category: 'smg', damage: 22, rpm: 800, headshotMult: 1.25, effectiveRange: 22.5, fireModes: ['auto', 'single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 1.27, horizontalRecoil: 0.60, hipSpread: 0.42, adsSpread: 0.42 } },
    { id: 'pp2000', name: 'ПП-2000', nameEn: 'PP-2000', category: 'smg', rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common', damage: 25, rpm: 725, headshotMult: 1.25, effectiveRange: 55.0, fireModes: ['auto', 'single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 0.54, horizontalRecoil: 0.31, hipSpread: 0.40, adsSpread: 0.40 } },
    { id: 'mp5a3', name: 'HK MP5A3', nameEn: 'HK MP5A3', category: 'smg', rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common', damage: 23, rpm: 800, headshotMult: 1.25, effectiveRange: 56.0, fireModes: ['auto', 'single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 1.33, horizontalRecoil: 0.42, hipSpread: 0.44, adsSpread: 0.44 } },
    { id: 'pp19_bizon', name: 'ПП-19 «Бизон»', nameEn: 'PP-19 "Bizon"', category: 'smg', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 25, rpm: 700, headshotMult: 1.25, effectiveRange: 120.0, fireModes: ['auto', 'single'], ammoTypes: ['9x18_p', '9x18_bjt', '9x18_pp'], stats: { verticalRecoil: 1.36, horizontalRecoil: 0.40, hipSpread: 0.36, adsSpread: 0.36 } },
    { id: 'frezer', name: 'Фрезер', nameEn: 'Frezer', category: 'smg', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 29, rpm: 825, headshotMult: 1.25, effectiveRange: 104.0, fireModes: ['auto', 'single'], ammoTypes: ['45acp', '45acp_super', '45acp_hydra'], stats: { verticalRecoil: 1.35, horizontalRecoil: 0.49, hipSpread: 0.42, adsSpread: 0.42 } },
    { id: 'ump45', name: 'UMP45', nameEn: 'UMP45', category: 'smg', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 36, rpm: 660, headshotMult: 1.25, effectiveRange: 60.0, fireModes: ['auto', 'single'], ammoTypes: ['45acp', '45acp_super', '45acp_hydra'], stats: { verticalRecoil: 1.71, horizontalRecoil: 0.36, hipSpread: 0.31, adsSpread: 0.31 } },
    { id: 'fn_p90', name: 'FN P90', nameEn: 'FN P90', category: 'smg', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 24, rpm: 1100, headshotMult: 1.25, effectiveRange: 51.0, fireModes: ['auto', 'single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 0.32, horizontalRecoil: 0.51, hipSpread: 0.37, adsSpread: 0.37 } },
    { id: 'kriss_vector', name: 'KRISS Vector', nameEn: 'KRISS Vector', category: 'smg', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 30, rpm: 1100, headshotMult: 1.25, effectiveRange: 72.0, fireModes: ['auto', 'single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 0.59, horizontalRecoil: 0.22, hipSpread: 0.36, adsSpread: 0.36 } },
    { id: 'mp5sd6', name: 'HK MP5SD6', nameEn: 'HK MP5SD6', category: 'smg', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 24, rpm: 800, headshotMult: 1.25, effectiveRange: 49.0, fireModes: ['auto', 'single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 1.21, horizontalRecoil: 0.38, hipSpread: 0.39, adsSpread: 0.39 } },
    { id: 'ppsh41', name: 'ППШ-41', nameEn: 'PPSh-41', category: 'smg', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 30, rpm: 1000, headshotMult: 1.25, effectiveRange: 80.0, fireModes: ['auto', 'single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 1.8, horizontalRecoil: 1.18, hipSpread: 0.62, adsSpread: 0.62 } },
    { id: 'pp19_vityaz', name: 'ПП-19-01 «Витязь»', nameEn: 'PP-19-01 "Vityaz"', category: 'smg', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 28, rpm: 750, headshotMult: 1.25, effectiveRange: 65.0, fireModes: ['auto', 'single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 1.10, horizontalRecoil: 0.22, hipSpread: 0.27, adsSpread: 0.27 } },
    { id: 'mp5sd6_sindbad', name: 'HK MP5SD6 Синдбада', nameEn: 'HK MP5SD6 "Sindbad"', category: 'smg', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 24, rpm: 800, headshotMult: 1.25, effectiveRange: 49.0, fireModes: ['auto', 'single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 1.21, horizontalRecoil: 0.38, hipSpread: 0.39, adsSpread: 0.39 } },
    // ASSAULT RIFLES
    { id: 'aks74', name: 'АКС-74', nameEn: 'AKS-74', category: 'assault', rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common', damage: 31, rpm: 600, headshotMult: 1.25, effectiveRange: 104.0, fireModes: ['auto', 'single'], ammoTypes: ['545x39_ps', '545x39_bp', '545x39_snp'], stats: { verticalRecoil: 2.05, horizontalRecoil: 0.82, hipSpread: 0.71, adsSpread: 0.25 } },
    { id: 'aks74u', name: 'АКС-74У', nameEn: 'AKS-74U', category: 'assault', damage: 30, rpm: 650, headshotMult: 1.25, effectiveRange: 58.0, fireModes: ['auto', 'single'], ammoTypes: ['545x39_ps', '545x39_bp', '545x39_snp'], stats: { verticalRecoil: 1.87, horizontalRecoil: 0.92, hipSpread: 0.67, adsSpread: 0.33 } },
    { id: 'ak74m', name: 'АК-74М', nameEn: 'AK-74M', category: 'assault', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 32, rpm: 650, headshotMult: 1.25, effectiveRange: 105.0, fireModes: ['auto', 'single'], ammoTypes: ['545x39_ps', '545x39_bp', '545x39_snp'], stats: { verticalRecoil: 1.94, horizontalRecoil: 0.79, hipSpread: 0.65, adsSpread: 0.25 } },
    { id: 'm16a2', name: 'M16A2', nameEn: 'M16A2', category: 'assault', damage: 29, rpm: 750, headshotMult: 1.25, effectiveRange: 100.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.83, horizontalRecoil: 0.66, hipSpread: 0.67, adsSpread: 0.24 } },
    { id: 'm4', name: 'M4', nameEn: 'M4', category: 'assault', rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common', damage: 29, rpm: 800, headshotMult: 1.25, effectiveRange: 100.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.92, horizontalRecoil: 0.72, hipSpread: 0.64, adsSpread: 0.22 } },
    { id: 'l85a1', name: 'L85A1', nameEn: 'L85A1', category: 'assault', rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common', damage: 30, rpm: 650, headshotMult: 1.25, effectiveRange: 110.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.35, horizontalRecoil: 1.15, hipSpread: 0.64, adsSpread: 0.23 } },
    { id: 'sig_sg550', name: 'SIG SG 550', nameEn: 'SIG SG 550', category: 'assault', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 31, rpm: 650, headshotMult: 1.25, effectiveRange: 108.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.68, horizontalRecoil: 0.59, hipSpread: 0.62, adsSpread: 0.22 } },
    { id: 'steyr_aug_a1', name: 'Steyr AUG A1', nameEn: 'Steyr AUG A1', category: 'assault', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 31, rpm: 700, headshotMult: 1.25, effectiveRange: 110.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.44, horizontalRecoil: 0.92, hipSpread: 0.55, adsSpread: 0.20 } },
    { id: 'm16a4', name: 'M16A4', nameEn: 'M16A4', category: 'assault', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 29, rpm: 750, headshotMult: 1.25, effectiveRange: 108.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.86, horizontalRecoil: 0.68, hipSpread: 0.67, adsSpread: 0.24 } },
    { id: 'famas_f1', name: 'FAMAS F1', nameEn: 'FAMAS F1', category: 'assault', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 29, rpm: 900, headshotMult: 1.25, effectiveRange: 76.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.45, horizontalRecoil: 1.21, hipSpread: 0.58, adsSpread: 0.24 } },
    { id: 'akm', name: 'АКМ', nameEn: 'AKM', category: 'assault', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 37, rpm: 600, headshotMult: 1.25, effectiveRange: 110.0, fireModes: ['auto', 'single'], ammoTypes: ['762x39_ps', '762x39_bp'], stats: { verticalRecoil: 3.11, horizontalRecoil: 1.22, hipSpread: 0.68, adsSpread: 0.30 } },
    { id: 'an94_abakan', name: 'АН-94 «Абакан»', nameEn: 'AN-94 "Abakan"', category: 'assault', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 34, rpm: 625, headshotMult: 1.25, effectiveRange: 107.0, fireModes: ['auto', 'single'], ammoTypes: ['545x39_ps', '545x39_bp', '545x39_snp'], stats: { verticalRecoil: 1.92, horizontalRecoil: 0.41, hipSpread: 0.74, adsSpread: 0.19 } },
    { id: '9a91', name: '9А-91', nameEn: '9A-91', category: 'assault', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 35, rpm: 700, headshotMult: 1.35, effectiveRange: 76.0, fireModes: ['auto', 'single'], ammoTypes: ['9x39_sp5', '9x39_sp6'], stats: { verticalRecoil: 1.62, horizontalRecoil: 0.60, hipSpread: 0.64, adsSpread: 0.19 } },
    { id: 'sr3_vikhr', name: 'СР-3 «Вихрь»', nameEn: 'SR-3 "Vikhr"', category: 'assault', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 33, rpm: 800, headshotMult: 1.35, effectiveRange: 66.0, fireModes: ['auto', 'single'], ammoTypes: ['9x39_sp5', '9x39_sp6'], stats: { verticalRecoil: 1.77, horizontalRecoil: 0.51, hipSpread: 0.73, adsSpread: 0.33 } },
    { id: 'ak105', name: 'АК-105', nameEn: 'AK-105', category: 'assault', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 33, rpm: 650, headshotMult: 1.25, effectiveRange: 86.0, fireModes: ['auto', 'single'], ammoTypes: ['545x39_ps', '545x39_bp', '545x39_snp'], stats: { verticalRecoil: 1.72, horizontalRecoil: 0.61, hipSpread: 0.58, adsSpread: 0.23 } },
    { id: 'm4a1', name: 'M4A1', nameEn: 'M4A1', category: 'assault', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 30, rpm: 850, headshotMult: 1.25, effectiveRange: 106.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.81, horizontalRecoil: 0.68, hipSpread: 0.52, adsSpread: 0.20 } },
    { id: 'fn_scar_l', name: 'FN SCAR-L', nameEn: 'FN SCAR-L', category: 'assault', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 32.5, rpm: 625, headshotMult: 1.25, effectiveRange: 136.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.35, horizontalRecoil: 0.38, hipSpread: 0.44, adsSpread: 0.15 } },
    { id: 'hk_g36', name: 'HK G36', nameEn: 'HK G36', category: 'assault', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 33, rpm: 750, headshotMult: 1.25, effectiveRange: 124.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.62, horizontalRecoil: 0.33, hipSpread: 0.65, adsSpread: 0.05 } },
    { id: 'fn_f2000', name: 'FN F2000', nameEn: 'FN F2000', category: 'assault', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 33.50, rpm: 850, headshotMult: 1.25, effectiveRange: 136.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.27, horizontalRecoil: 0.64, hipSpread: 0.96, adsSpread: 0.18 } },
    { id: 'hk_g3a3', name: 'HK G3A3', nameEn: 'HK G3A3', category: 'assault', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 46, rpm: 585, headshotMult: 1.25, effectiveRange: 132.0, fireModes: ['auto', 'single'], ammoTypes: ['762x51_m59', '762x51_m61'], stats: { verticalRecoil: 3.1, horizontalRecoil: 0.95, hipSpread: 0.88, adsSpread: 0.16 } },
    { id: 'steyr_aug_a3', name: 'Steyr AUG A3', nameEn: 'Steyr AUG A3', category: 'assault', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 32, rpm: 725, headshotMult: 1.25, effectiveRange: 112.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.39, horizontalRecoil: 0.73, hipSpread: 0.49, adsSpread: 0.20 } },
    { id: 'ak103', name: 'AK-103', nameEn: 'AK-103', category: 'assault', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 37, rpm: 600, headshotMult: 1.25, effectiveRange: 112.0, fireModes: ['auto', 'single'], ammoTypes: ['762x39_ps', '762x39_bp'], stats: { verticalRecoil: 2.94, horizontalRecoil: 1.10, hipSpread: 0.60, adsSpread: 0.23 } },
    { id: 'ots14_groza', name: 'ОЦ-14 «Гроза»', nameEn: 'OTs-14 "Groza"', category: 'assault', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 34, rpm: 700, headshotMult: 1.35, effectiveRange: 74.0, fireModes: ['auto', 'single'], ammoTypes: ['9x39_sp5', '9x39_sp6'], stats: { verticalRecoil: 1.42, horizontalRecoil: 0.64, hipSpread: 0.54, adsSpread: 0.26 } },
    { id: 'hk416', name: 'HK416', nameEn: 'HK416', category: 'assault', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 32, rpm: 850, headshotMult: 1.25, effectiveRange: 124.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.42, horizontalRecoil: 0.36, hipSpread: 0.60, adsSpread: 0.20 } },
    { id: 'fn_fnc', name: 'FN FNC', nameEn: 'FN FNC', category: 'assault', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 38, rpm: 700, headshotMult: 1.25, effectiveRange: 145.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.64, horizontalRecoil: 0.54, hipSpread: 0.48, adsSpread: 0.14 } },
    { id: 'fn_f2000_tactical', name: 'FN F2000 Tactical', nameEn: 'FN F2000 Tactical', category: 'assault', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 33.50, rpm: 850, headshotMult: 1.25, effectiveRange: 140.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.27, horizontalRecoil: 0.49, hipSpread: 0.46, adsSpread: 0.18 } },
    { id: 'aek971', name: 'АЕК-971', nameEn: 'AEK-971', category: 'assault', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 34, rpm: 900, headshotMult: 1.25, effectiveRange: 100.0, fireModes: ['auto', 'single'], ammoTypes: ['545x39_ps', '545x39_bp', '545x39_snp'], stats: { verticalRecoil: 1.37, horizontalRecoil: 0.31, hipSpread: 0.49, adsSpread: 0.22 } },
    { id: 'ak12', name: 'АК-12', nameEn: 'AK-12', category: 'assault', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 34, rpm: 740, headshotMult: 1.25, effectiveRange: 110.0, fireModes: ['auto', 'single'], ammoTypes: ['545x39_ps', '545x39_bp', '545x39_snp', '545x39_bs'], stats: { verticalRecoil: 1.69, horizontalRecoil: 0.49, hipSpread: 0.53, adsSpread: 0.17 } },
    { id: 'hk_xm8', name: 'HK XM8', nameEn: 'HK XM8', category: 'assault', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 35, rpm: 800, headshotMult: 1.25, effectiveRange: 120.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.38, horizontalRecoil: 0.35, hipSpread: 0.54, adsSpread: 0.18 } },
    { id: 'fn2000_bezliky', name: 'FN F2000 «Безликий»', nameEn: 'FN F2000 "Faceless"', category: 'assault', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 33, rpm: 900, headshotMult: 1.25, effectiveRange: 132.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.29, horizontalRecoil: 0.64, hipSpread: 0.61, adsSpread: 0.18 } },
    { id: 'grom_545', name: 'ОЦ-14 под 5.45x39', nameEn: 'OTs-14 5.45x39', category: 'assault', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 33, rpm: 750, headshotMult: 1.25, effectiveRange: 107.0, fireModes: ['auto', 'single'], ammoTypes: ['545x39_ps', '545x39_bp', '545x39_snp'], stats: { verticalRecoil: 1.41, horizontalRecoil: 0.64, hipSpread: 0.69, adsSpread: 0.18 } },
    { id: 'hk417', name: 'HK417', nameEn: 'HK417', category: 'assault', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 45, rpm: 575, headshotMult: 1.25, effectiveRange: 140.0, fireModes: ['auto', 'single'], ammoTypes: ['762x51_m59', '762x51_m61'], stats: { verticalRecoil: 2.55, horizontalRecoil: 0.76, hipSpread: 0.60, adsSpread: 0.05 } },
    { id: 'galil_ace_51', name: 'Galil ACE 51', nameEn: 'Galil ACE 51', category: 'assault', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 41, rpm: 685, headshotMult: 1.25, effectiveRange: 90.0, fireModes: ['auto', 'single'], ammoTypes: ['762x51_m59', '762x51_m61'], stats: { verticalRecoil: 2.61, horizontalRecoil: 0.99, hipSpread: 0.48, adsSpread: 0.15 } },
    { id: 'fn_scar_h', name: 'FN SCAR-H', nameEn: 'FN SCAR-H', category: 'assault', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 44, rpm: 600, headshotMult: 1.25, effectiveRange: 126.0, fireModes: ['auto', 'single'], ammoTypes: ['762x51_m59', '762x51_m61'], stats: { verticalRecoil: 2.45, horizontalRecoil: 1.15, hipSpread: 0.57, adsSpread: 0.08 } },
    { id: 'lr300', name: 'LR-300', nameEn: 'LR-300', category: 'assault', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 33, rpm: 950, headshotMult: 1.25, effectiveRange: 74.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.71, horizontalRecoil: 0.54, hipSpread: 0.53, adsSpread: 0.20 } },
    { id: 'fn_fal', name: 'FN FAL', nameEn: 'FN FAL', category: 'assault', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 45, rpm: 675, headshotMult: 1.25, effectiveRange: 124.0, fireModes: ['auto', 'single'], ammoTypes: ['762x51_m59', '762x51_m61'], stats: { verticalRecoil: 3.19, horizontalRecoil: 1.12, hipSpread: 0.72, adsSpread: 0.12 } },
    { id: 'as_val', name: 'АС «Вал»', nameEn: 'AS "Val"', category: 'assault', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 32, rpm: 925, headshotMult: 1.35, effectiveRange: 70.0, fireModes: ['auto', 'single'], ammoTypes: ['9x39_sp5', '9x39_sp6'], stats: { verticalRecoil: 1.86, horizontalRecoil: 0.31, hipSpread: 0.62, adsSpread: 0.21 } },
    { id: 'ash12', name: 'АШ-12', nameEn: 'ASh-12', category: 'assault', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 53, rpm: 575, headshotMult: 1.25, effectiveRange: 76.0, fireModes: ['auto', 'single'], ammoTypes: ['127x55'], stats: { verticalRecoil: 4.35, horizontalRecoil: 1.86, hipSpread: 0.55, adsSpread: 0.18, armorPenetration: 5 } },
    { id: 'gorn', name: '«Горн»', nameEn: '"Gorn"', category: 'assault', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 29, rpm: 850, headshotMult: 1.25, effectiveRange: 76.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.45, horizontalRecoil: 1.21, hipSpread: 0.58, adsSpread: 0.24 } },
    { id: 'aks74u_modified', name: 'Модифицированный АКС-74У', nameEn: 'Modified AKS-74U', category: 'assault', damage: 30, rpm: 675, headshotMult: 1.25, effectiveRange: 62.0, fireModes: ['auto', 'single'], ammoTypes: ['545x39_ps', '545x39_bp', '545x39_snp'], stats: { verticalRecoil: 1.84, horizontalRecoil: 0.90, hipSpread: 0.58, adsSpread: 0.28 } },
    { id: 'an94_assault', name: 'АН-94 «Абакан» штурмовой', nameEn: 'AN-94 "Abakan" Assault', category: 'assault', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 35, rpm: 625, headshotMult: 1.25, effectiveRange: 112.0, fireModes: ['auto', 'single'], ammoTypes: ['545x39_ps', '545x39_bp', '545x39_snp'], stats: { verticalRecoil: 1.92, horizontalRecoil: 0.41, hipSpread: 0.74, adsSpread: 0.19 } },
    // SNIPER RIFLES
    { id: 'remington_700', name: 'Remington 700', nameEn: 'Remington 700', category: 'sniper', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 140, rpm: 30, headshotMult: 1.50, effectiveRange: 105.0, fireModes: ['single'], ammoTypes: ['308_winchester'], stats: { verticalRecoil: 3.00, horizontalRecoil: 2.15, hipSpread: 2.00, adsSpread: 0.08 } },
    { id: 'svd', name: 'Снайперская винтовка Драгунова', nameEn: 'SVD Dragunov', category: 'sniper', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 115, rpm: 111, headshotMult: 1.25, effectiveRange: 210.0, fireModes: ['single'], ammoTypes: ['762x54_lps', '762x54_bs', '762x54_hp'], stats: { verticalRecoil: 3.20, horizontalRecoil: 2.40, hipSpread: 5.00, adsSpread: 0.11 } },
    { id: 'vsk94', name: 'ВСК-94', nameEn: 'VSK-94', category: 'sniper', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 38.5, rpm: 725, headshotMult: 1.35, effectiveRange: 85.0, fireModes: ['auto', 'single'], ammoTypes: ['9x39_sp5', '9x39_sp6'], stats: { verticalRecoil: 1.52, horizontalRecoil: 0.3, hipSpread: 5.00, adsSpread: 0.10 } },
    { id: 'sig_sg550_sniper', name: 'SIG SG 550 Sniper', nameEn: 'SIG SG 550 Sniper', category: 'sniper', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 38, rpm: 480, headshotMult: 1.35, effectiveRange: 180.0, fireModes: ['auto', 'single'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 1.72, horizontalRecoil: 0.38, hipSpread: 2.00, adsSpread: 0.05 } },
    { id: 'walther_wa2000', name: 'Walther WA 2000', nameEn: 'Walther WA 2000', category: 'sniper', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 139, rpm: 111, headshotMult: 1.35, effectiveRange: 240.0, fireModes: ['single'], ammoTypes: ['308_winchester'], stats: { verticalRecoil: 5.00, horizontalRecoil: 1.50, hipSpread: 5.00, adsSpread: 0.05, moveSpeed: -3.00 } },
    { id: 'sv98', name: 'СВ-98', nameEn: 'SV-98', category: 'sniper', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 183, rpm: 33, headshotMult: 1.50, effectiveRange: 270.0, fireModes: ['single'], ammoTypes: ['762x54_lps', '762x54_bs', '762x54_hp'], stats: { verticalRecoil: 3.55, horizontalRecoil: 3.10, hipSpread: 2.00, adsSpread: 0.03, moveSpeed: -3.00 } },
    { id: 'sako_trg42', name: 'Sako TRG-42', nameEn: 'Sako TRG-42', category: 'sniper', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 185, rpm: 25, headshotMult: 1.50, effectiveRange: 290.0, fireModes: ['single'], ammoTypes: ['308_winchester'], stats: { verticalRecoil: 4.00, horizontalRecoil: 3.50, hipSpread: 5.00, adsSpread: 0.05, moveSpeed: -3.00 } },
    { id: 'barrett_m82', name: 'Barrett M82', nameEn: 'Barrett M82', category: 'sniper', rarity: 'legendary', rarityName: 'Легендарное', rarityNameEn: 'Legendary', damage: 195, rpm: 111, headshotMult: 1.35, effectiveRange: 280.0, fireModes: ['single'], ammoTypes: ['127x55'], stats: { verticalRecoil: 12.50, horizontalRecoil: 11.00, hipSpread: 10.00, adsSpread: 0.07, moveSpeed: -10.00, mutantDamageMultiplier: 2.5 } },
    { id: 'm24', name: 'Снайперская винтовка М24', nameEn: 'M24 Sniper Rifle', category: 'sniper', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 158, rpm: 35, headshotMult: 1.50, effectiveRange: 135.0, fireModes: ['single'], ammoTypes: ['308_winchester'], stats: { verticalRecoil: 2.75, horizontalRecoil: 1.80, hipSpread: 2.00, adsSpread: 0.05 } },
    { id: 'mosin_obrez', name: 'Обрез винтовки Мосина', nameEn: 'Mosin Obrez', category: 'sniper', damage: 122, rpm: 20, headshotMult: 1.50, effectiveRange: 81.0, fireModes: ['single'], ammoTypes: ['762x54_lps', '762x54_bs', '762x54_hp'], stats: { verticalRecoil: 3.65, horizontalRecoil: 2.20, hipSpread: 2.00, adsSpread: 0.19 } },
    { id: 'mosin', name: 'Винтовка Мосина', nameEn: 'Mosin Rifle', category: 'sniper', rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common', damage: 125, rpm: 20, headshotMult: 1.50, effectiveRange: 90.0, fireModes: ['single'], ammoTypes: ['762x54_lps', '762x54_bs', '762x54_hp'], stats: { verticalRecoil: 3.65, horizontalRecoil: 2.20, hipSpread: 2.00, adsSpread: 0.08 } },
    { id: 'buddy', name: '«Приятель»', nameEn: '"Buddy"', category: 'sniper', rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common', damage: 125, rpm: 20, headshotMult: 1.50, effectiveRange: 90.0, fireModes: ['single'], ammoTypes: ['762x54_lps', '762x54_bs', '762x54_hp'], stats: { verticalRecoil: 3.65, horizontalRecoil: 2.20, hipSpread: 2.00, adsSpread: 0.08 } },
    { id: 'l96a1', name: 'L96A1', nameEn: 'L96A1', category: 'sniper', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 180, rpm: 30, headshotMult: 1.50, effectiveRange: 300.0, fireModes: ['single'], ammoTypes: ['308_winchester'], stats: { verticalRecoil: 2.10, horizontalRecoil: 1.00, hipSpread: 2.00, adsSpread: 0.03, moveSpeed: -3.00 } },
    { id: 'svu', name: 'Снайперская винтовка укороченная', nameEn: 'SVU', category: 'sniper', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 95, rpm: 125, headshotMult: 1.35, effectiveRange: 195.0, fireModes: ['single'], ammoTypes: ['762x54_lps', '762x54_bs', '762x54_hp'], stats: { verticalRecoil: 2.00, horizontalRecoil: 1.60, hipSpread: 5.00, adsSpread: 0.10 } },
    { id: 'svds', name: 'СВД-С', nameEn: 'SVDS', category: 'sniper', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 125, rpm: 120, headshotMult: 1.35, effectiveRange: 228.0, fireModes: ['single'], ammoTypes: ['762x54_lps', '762x54_bs', '762x54_hp'], stats: { verticalRecoil: 2.75, horizontalRecoil: 1.20, hipSpread: 5.00, adsSpread: 0.09 } },
    { id: 'mk14_ebr', name: 'Mk14 Enhanced Battle Rifle', nameEn: 'Mk14 EBR', category: 'sniper', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 54, rpm: 500, headshotMult: 1.35, effectiveRange: 190.0, fireModes: ['auto', 'single'], ammoTypes: ['762x51_m59', '762x51_m61'], stats: { verticalRecoil: 4.05, horizontalRecoil: 1.07, hipSpread: 0.77, adsSpread: 0.05 } },
    { id: 'sr25', name: 'SR-25', nameEn: 'SR-25', category: 'sniper', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 85, rpm: 215, headshotMult: 1.50, effectiveRange: 130.0, fireModes: ['single'], ammoTypes: ['308_winchester'], stats: { verticalRecoil: 2.52, horizontalRecoil: 0.55, hipSpread: 5.00, adsSpread: 0.10 } },
    { id: 'sks', name: 'СКС', nameEn: 'SKS', category: 'sniper', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 45, rpm: 460, headshotMult: 1.35, effectiveRange: 130.0, fireModes: ['single'], ammoTypes: ['762x39_ps', '762x39_bp'], stats: { verticalRecoil: 2.62, horizontalRecoil: 0.85, hipSpread: 1.50, adsSpread: 0.17 } },
    { id: 'vssk_vykhlop', name: 'ВССК «Выхлоп»', nameEn: 'VSSK "Vykhlop"', category: 'sniper', rarity: 'legendary', rarityName: 'Легендарное', rarityNameEn: 'Legendary', damage: 220, rpm: 27, headshotMult: 1.50, effectiveRange: 150.0, fireModes: ['single'], ammoTypes: ['127x55'], stats: { verticalRecoil: 10.00, horizontalRecoil: 9.50, hipSpread: 5.00, adsSpread: 0.04, moveSpeed: -4.00 } },
    { id: 'svt40', name: 'СВТ-40', nameEn: 'SVT-40', category: 'sniper', rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common', damage: 75, rpm: 120, headshotMult: 1.25, effectiveRange: 87.0, fireModes: ['single'], ammoTypes: ['762x54_lps', '762x54_bs', '762x54_hp'], stats: { verticalRecoil: 3.70, horizontalRecoil: 2.65, hipSpread: 2.20, adsSpread: 0.16 } },
    { id: 'avt40', name: 'АВТ-40', nameEn: 'AVT-40', category: 'sniper', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 65, rpm: 230, headshotMult: 1.35, effectiveRange: 162.0, fireModes: ['auto', 'single'], ammoTypes: ['762x54_lps', '762x54_bs', '762x54_hp'], stats: { verticalRecoil: 0.91, horizontalRecoil: 0.45, hipSpread: 5.00, adsSpread: 0.19 } },
    { id: 'vintorez_m', name: 'ВССМ «Винторез-М» 6П29М', nameEn: 'VSSM "Vintorez-M"', category: 'sniper', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 39, rpm: 750, headshotMult: 1.35, effectiveRange: 90.0, fireModes: ['auto', 'single'], ammoTypes: ['9x39_sp5', '9x39_sp6'], stats: { verticalRecoil: 1.40, horizontalRecoil: 0.22, hipSpread: 5.00, adsSpread: 0.10 } },
    { id: 'vss_vintorez', name: 'ВСС «Винторез»', nameEn: 'VSS "Vintorez"', category: 'sniper', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 39, rpm: 700, headshotMult: 1.35, effectiveRange: 80.0, fireModes: ['auto', 'single'], ammoTypes: ['9x39_sp5', '9x39_sp6'], stats: { verticalRecoil: 1.46, horizontalRecoil: 0.31, hipSpread: 5.00, adsSpread: 0.12 } },
    { id: 'ots03_svua', name: 'ОЦ-03 СВУ-А', nameEn: 'OTs-03 SVU-A', category: 'sniper', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 70, rpm: 221, headshotMult: 1.35, effectiveRange: 180.0, fireModes: ['auto'], ammoTypes: ['762x54_lps', '762x54_bs', '762x54_hp'], stats: { verticalRecoil: 1.50, horizontalRecoil: 0.93, hipSpread: 5.00, adsSpread: 0.12 } },
    { id: 'hk_g3sg1', name: 'HK G3SG-1', nameEn: 'HK G3SG-1', category: 'sniper', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 57, rpm: 380, headshotMult: 1.35, effectiveRange: 200.0, fireModes: ['auto', 'single'], ammoTypes: ['762x51_m59', '762x51_m61'], stats: { verticalRecoil: 1.98, horizontalRecoil: 0.45, hipSpread: 5.00, adsSpread: 0.10 } },
    { id: 'gauss_gun', name: 'Гаусс-пушка', nameEn: 'Gauss Gun', category: 'sniper', rarity: 'legendary', rarityName: 'Легендарное', rarityNameEn: 'Legendary', damage: 138, rpm: 30, headshotMult: 2.00, effectiveRange: 200.0, fireModes: ['single'], ammoTypes: ['makeshift_batteries', 'accumulators'], stats: { verticalRecoil: 0.00, horizontalRecoil: 0.00, hipSpread: 5.00, adsSpread: 0.01, moveSpeed: -4.00, armorPenetration: 10 } },
    // PISTOLS
    { id: 'pm', name: 'Пистолет Макарова', nameEn: 'Makarov PM', category: 'pistol', damage: 30, rpm: 250, headshotMult: 2.00, effectiveRange: 45.0, fireModes: ['single'], ammoTypes: ['9x18_p', '9x18_bjt', '9x18_pp'], stats: { verticalRecoil: 1.87, horizontalRecoil: 1.50, hipSpread: 0.55, adsSpread: 0.55, moveSpeed: 2.00 } },
    { id: 'pb', name: 'Пистолет Бесшумный (ПБ)', nameEn: 'PB Silenced Pistol', category: 'pistol', damage: 29, rpm: 250, headshotMult: 2.00, effectiveRange: 36.0, fireModes: ['single'], ammoTypes: ['9x18_p', '9x18_bjt', '9x18_pp'], stats: { verticalRecoil: 1.82, horizontalRecoil: 1.39, hipSpread: 0.55, adsSpread: 0.55, moveSpeed: 2.00 } },
    { id: 'fort12', name: 'Форт-12', nameEn: 'Fort-12', category: 'pistol', rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common', damage: 31, rpm: 280, headshotMult: 2.00, effectiveRange: 42.0, fireModes: ['single'], ammoTypes: ['9x18_p', '9x18_bjt', '9x18_pp'], stats: { verticalRecoil: 1.66, horizontalRecoil: 1.17, hipSpread: 0.49, adsSpread: 0.49, moveSpeed: 2.00 } },
    { id: 'browning_hp', name: 'Browning Hi-Power', nameEn: 'Browning Hi-Power', category: 'pistol', rarity: 'common', rarityName: 'Распространённое', rarityNameEn: 'Common', damage: 32, rpm: 310, headshotMult: 2.00, effectiveRange: 48.0, fireModes: ['single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 1.63, horizontalRecoil: 0.90, hipSpread: 0.45, adsSpread: 0.45, moveSpeed: 2.00 } },
    { id: 'walther_p99', name: 'Walther P99', nameEn: 'Walther P99', category: 'pistol', rarity: 'uncommon', rarityName: 'Необычное', rarityNameEn: 'Uncommon', damage: 35, rpm: 275, headshotMult: 2.00, effectiveRange: 48.0, fireModes: ['single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 1.88, horizontalRecoil: 1.31, hipSpread: 0.44, adsSpread: 0.44, moveSpeed: 2.00 } },
    { id: 'beretta_92fs', name: 'Beretta 92FS', nameEn: 'Beretta 92FS', category: 'pistol', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 33, rpm: 300, headshotMult: 2.00, effectiveRange: 51.0, fireModes: ['single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 1.59, horizontalRecoil: 1.25, hipSpread: 0.47, adsSpread: 0.47, moveSpeed: 2.00 } },
    { id: 'glock18', name: 'Glock 18', nameEn: 'Glock 18', category: 'pistol', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 27, rpm: 800, headshotMult: 1.75, effectiveRange: 45.0, fireModes: ['auto', 'single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 1.43, horizontalRecoil: 0.67, hipSpread: 0.52, adsSpread: 0.52, moveSpeed: 2.00 } },
    { id: 'colt_1911', name: 'Colt 1911', nameEn: 'Colt 1911', category: 'pistol', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 39, rpm: 265, headshotMult: 2.50, effectiveRange: 54.0, fireModes: ['single'], ammoTypes: ['45acp', '45acp_super', '45acp_hydra'], stats: { verticalRecoil: 2.00, horizontalRecoil: 1.50, hipSpread: 0.39, adsSpread: 0.39, moveSpeed: 2.00 } },
    { id: 'gsh18', name: 'ГШ-18', nameEn: 'GSh-18', category: 'pistol', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 35, rpm: 365, headshotMult: 2.00, effectiveRange: 51.0, fireModes: ['single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 1.62, horizontalRecoil: 1.15, hipSpread: 0.48, adsSpread: 0.48, moveSpeed: 2.00 } },
    { id: 'gsh18_slavena', name: 'ГШ-18 Славена', nameEn: 'GSh-18 "Slavena"', category: 'pistol', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 35, rpm: 365, headshotMult: 2.00, effectiveRange: 51.0, fireModes: ['single'], ammoTypes: ['9x19_ps', '9x19_pp', '9x19_dum'], stats: { verticalRecoil: 1.62, horizontalRecoil: 1.15, hipSpread: 0.48, adsSpread: 0.48, moveSpeed: 2.00 } },
    { id: 'aps', name: 'АПС', nameEn: 'APS Stechkin', category: 'pistol', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 32, rpm: 750, headshotMult: 1.75, effectiveRange: 36.0, fireModes: ['auto', 'single'], ammoTypes: ['9x18_p', '9x18_bjt', '9x18_pp'], stats: { verticalRecoil: 1.92, horizontalRecoil: 0.80, hipSpread: 0.45, adsSpread: 0.45, moveSpeed: 2.00 } },
    { id: 'aps-Kramora', name: 'АПС Крамора', nameEn: 'APS "Kramora"', category: 'pistol', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 32, rpm: 750, headshotMult: 1.75, effectiveRange: 36.0, fireModes: ['auto', 'single'], ammoTypes: ['9x18_p', '9x18_bjt', '9x18_pp'], stats: { verticalRecoil: 1.96, horizontalRecoil: 0.82, hipSpread: 0.48, adsSpread: 0.48, moveSpeed: 2.00 } },
    { id: 'sig_p220', name: 'SIG Sauer P220', nameEn: 'SIG Sauer P220', category: 'pistol', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 36, rpm: 290, headshotMult: 2.00, effectiveRange: 54.0, fireModes: ['single'], ammoTypes: ['45acp', '45acp_super', '45acp_hydra'], stats: { verticalRecoil: 1.78, horizontalRecoil: 1.25, hipSpread: 0.40, adsSpread: 0.40, moveSpeed: 2.00 } },
    { id: 'alpine', name: '«Альпиец»', nameEn: '"Alpine"', category: 'pistol', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 36, rpm: 290, headshotMult: 2.00, effectiveRange: 54.0, fireModes: ['single'], ammoTypes: ['45acp', '45acp_super', '45acp_hydra'], stats: { verticalRecoil: 1.78, horizontalRecoil: 1.25, hipSpread: 0.40, adsSpread: 0.40, moveSpeed: 2.00 } },
    { id: 'desert_eagle', name: 'Desert Eagle Mark XIX', nameEn: 'Desert Eagle Mark XIX', category: 'pistol', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 52, rpm: 250, headshotMult: 2.50, effectiveRange: 63.0, fireModes: ['single'], ammoTypes: ['45acp', '45acp_super', '45acp_hydra'], stats: { verticalRecoil: 2.88, horizontalRecoil: 2.40, hipSpread: 0.39, adsSpread: 0.39, moveSpeed: 2.00 } },
    { id: 'black-hawk', name: 'Черный ястреб', nameEn: 'Black Hawk', category: 'pistol', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 50, rpm: 267, headshotMult: 2.50, effectiveRange: 45.0, fireModes: ['single'], ammoTypes: ['9x39_sp5', '9x39_sp6'], stats: { verticalRecoil: 2.75, horizontalRecoil: 2.20, hipSpread: 0.46, adsSpread: 0.46, moveSpeed: 2.00 } },
    { id: 'big-jackpot', name: 'Большой куш', nameEn: 'Big Jackpot', category: 'pistol', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 60, rpm: 325, headshotMult: 2.50, effectiveRange: 69.0, fireModes: ['auto', 'single'], ammoTypes: ['45acp', '45acp_super', '45acp_hydra'], stats: { verticalRecoil: 2.30, horizontalRecoil: 0.80, hipSpread: 0.15, adsSpread: 0.15, moveSpeed: 2.00 } },
    // MACHINE GUNS
    { id: 'rpk74', name: 'РПК-74', nameEn: 'RPK-74', category: 'machinegun', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 36, rpm: 650, headshotMult: 1.25, effectiveRange: 124.0, fireModes: ['auto', 'single'], ammoTypes: ['545x39_ps', '545x39_bp', '545x39_snp'], stats: { verticalRecoil: 2.55, horizontalRecoil: 0.71, hipSpread: 0.45, adsSpread: 0.17, moveSpeed: -4.00 } },
    { id: 'rpd', name: 'РПД', nameEn: 'RPD', category: 'machinegun', rarity: 'collection', rarityName: 'Коллекционное', rarityNameEn: 'Collection', damage: 37, rpm: 700, headshotMult: 1.25, effectiveRange: 118.0, fireModes: ['auto', 'single'], ammoTypes: ['762x39_ps', '762x39_bp'], stats: { verticalRecoil: 2.90, horizontalRecoil: 0.81, hipSpread: 0.65, adsSpread: 0.27, moveSpeed: -5.00 } },
    { id: 'm249_saw', name: 'M249 SAW', nameEn: 'M249 SAW', category: 'machinegun', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 32, rpm: 800, headshotMult: 1.25, effectiveRange: 120.0, fireModes: ['auto'], ammoTypes: ['556x45_m855', '556x45_m995', '556x45_hp'], stats: { verticalRecoil: 2.35, horizontalRecoil: 0.62, hipSpread: 0.70, adsSpread: 0.19, moveSpeed: -3.00 } },
    { id: 'm60', name: 'M60', nameEn: 'M60', category: 'machinegun', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 48, rpm: 585, headshotMult: 1.25, effectiveRange: 124.0, fireModes: ['auto', 'single'], ammoTypes: ['762x51_m59', '762x51_m61'], stats: { verticalRecoil: 3.50, horizontalRecoil: 1.18, hipSpread: 0.65, adsSpread: 0.15, moveSpeed: -6.00 } },
    { id: 'pkm', name: 'ПКМ', nameEn: 'PKM', category: 'machinegun', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 44, rpm: 650, headshotMult: 1.25, effectiveRange: 120.0, fireModes: ['auto'], ammoTypes: ['762x54_pp'], stats: { verticalRecoil: 3.45, horizontalRecoil: 1.29, hipSpread: 0.85, adsSpread: 0.20, moveSpeed: -6.00 } },
    { id: 'pkp_pecheneg', name: 'ПКП «Печенег»', nameEn: 'PKP "Pecheneg"', category: 'machinegun', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 44, rpm: 650, headshotMult: 1.25, effectiveRange: 126.0, fireModes: ['auto'], ammoTypes: ['762x54_pp'], stats: { verticalRecoil: 3.12, horizontalRecoil: 1.05, hipSpread: 0.69, adsSpread: 0.16, moveSpeed: -5.00 } },
    // SHOTGUNS (additional)
    { id: 'toz34_obrez', name: 'Обрез ТОЗ-34', nameEn: 'TOZ-34 Obrez', category: 'shotgun', damage: 77, rpm: 1000, headshotMult: 1.25, effectiveRange: 72.0, fireModes: ['single', 'auto'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 6.25, horizontalRecoil: 4.75, hipSpread: 1.18, adsSpread: 1.18 } },
    { id: 'toz34', name: 'Охотничье ружьё ТОЗ-34', nameEn: 'TOZ-34 Hunting Rifle', category: 'shotgun', damage: 81, rpm: 1000, headshotMult: 1.25, effectiveRange: 96.0, fireModes: ['single', 'auto'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 6.14, horizontalRecoil: 4.64, hipSpread: 1.06, adsSpread: 1.06 } },
    { id: 'toz66_obrez', name: 'Обрез ТОЗ-66', nameEn: 'TOZ-66 Obrez', category: 'shotgun', damage: 80, rpm: 1000, headshotMult: 1.25, effectiveRange: 72.0, fireModes: ['single', 'auto'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 6.00, horizontalRecoil: 5.00, hipSpread: 1.30, adsSpread: 1.30 } },
    { id: 'toz66', name: 'Охотничье ружьё ТОЗ-66', nameEn: 'TOZ-66 Hunting Rifle', category: 'shotgun', damage: 84, rpm: 1000, headshotMult: 1.25, effectiveRange: 89.0, fireModes: ['single', 'auto'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 5.89, horizontalRecoil: 4.89, hipSpread: 1.11, adsSpread: 1.11 } },
    { id: 'saiga12c', name: 'Сайга-12C', nameEn: 'Saiga-12C', category: 'shotgun', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 88, rpm: 310, headshotMult: 1.25, effectiveRange: 94.0, fireModes: ['auto', 'single'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 5.54, horizontalRecoil: 3.05, hipSpread: 0.93, adsSpread: 0.93 } },
    { id: 'vepr12_molot', name: 'Вепрь-12 «Молот»', nameEn: 'Vepr-12 "Molot"', category: 'shotgun', rarity: 'unique', rarityName: 'Уникальное', rarityNameEn: 'Unique', damage: 80, rpm: 335, headshotMult: 1.25, effectiveRange: 90.0, fireModes: ['auto', 'single'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 4.67, horizontalRecoil: 2.70, hipSpread: 0.88, adsSpread: 0.88 } },
    { id: 'toz66_obrez_sisyphus', name: 'Обрез ТОЗ-66 Сизифа', nameEn: 'TOZ-66 Obrez "Sisyphus"', category: 'shotgun', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 80, rpm: 800, headshotMult: 1.25, effectiveRange: 72.0, fireModes: ['single', 'auto'], ammoTypes: ['12x70_shot', '12x70_buckshot', '12x76_dart', '12x76_slug'], stats: { verticalRecoil: 6.00, horizontalRecoil: 5.00, hipSpread: 1.30, adsSpread: 1.30 } },
    // SPECIAL
    { id: 'flamethrower', name: 'Огнемёт', nameEn: 'Flamethrower', category: 'special', rarity: 'rare', rarityName: 'Раритетное', rarityNameEn: 'Rare', damage: 10, rpm: 650, headshotMult: 1.25, effectiveRange: 15.0, fireModes: ['auto', 'single'], ammoTypes: ['firemix'], stats: { verticalRecoil: 0.40, horizontalRecoil: 0.00, hipSpread: 1.00, adsSpread: 1.00 } }
];

// ============== AMMO TYPES ==============
const AMMO_TYPES = [
    // 9x18
    { id: '9x18_p', name: 'Патроны 9x18 мм П', nameEn: '9x18mm P Rounds', caliber: '9x18', type: 'standard', price: 2, stats: {}, pellets: null, description: 'Стандартные пистолетные патроны', descriptionEn: 'Standard pistol rounds' },
    { id: '9x18_pp', name: 'Патроны 9x18 мм +P+', nameEn: '9x18mm +P+ Rounds', caliber: '9x18', type: 'hp', price: 3, stats: { damageModifier: 20, armorPenetration: -5 }, pellets: null, description: 'Усиленные патроны с повышенным уроном', descriptionEn: 'Enhanced rounds with increased damage' },
    { id: '9x18_bjt', name: 'Патроны 9x18 мм БЖТ', nameEn: '9x18mm BZhT Rounds', caliber: '9x18', type: 'ap', price: null, stats: { armorPenetration: 9 }, pellets: null, description: 'Бронебойно-зажигательно-трассирующие патроны', descriptionEn: 'Armor-piercing incendiary tracer rounds' },
    // 9x19
    { id: '9x19_ps', name: 'Патроны 9x19 мм ПС', nameEn: '9x19mm PS Rounds', caliber: '9x19', type: 'standard', price: 3, stats: {}, pellets: null, description: 'Стандартные пистолетные патроны', descriptionEn: 'Standard pistol rounds' },
    { id: '9x19_dum', name: 'Патроны 9x19 мм «Дум-дум»', nameEn: '9x19mm "Dum-Dum" Rounds', caliber: '9x19', type: 'hp', price: 4, stats: { damageModifier: 17, armorPenetration: -5 }, pellets: null, description: 'Экспансивные патроны с повышенным уроном', descriptionEn: 'Hollow point rounds with increased damage' },
    { id: '9x19_pp', name: 'Патроны 9x19 мм ПП', nameEn: '9x19mm PP Rounds', caliber: '9x19', type: 'ap', price: null, stats: { armorPenetration: 9 }, pellets: null, description: 'Бронебойные патроны', descriptionEn: 'Armor-piercing rounds' },
    // 9x39
    { id: '9x39_sp5', name: 'Патроны 9x39 мм СП-5', nameEn: '9x39mm SP-5 Rounds', caliber: '9x39', type: 'standard', price: 7, stats: {}, pellets: null, description: 'Стандартные дозвуковые патроны', descriptionEn: 'Standard subsonic rounds' },
    { id: '9x39_sp6', name: 'Патроны 9x39 мм СП-6', nameEn: '9x39mm SP-6 Rounds', caliber: '9x39', type: 'ap', price: null, stats: { rangeModifier: 25, armorPenetration: 10 }, pellets: null, description: 'Бронебойные дозвуковые патроны', descriptionEn: 'Armor-piercing subsonic rounds' },
    // .45 ACP
    { id: '45acp', name: 'Патроны .45 ACP', nameEn: '.45 ACP Rounds', caliber: '.45ACP', type: 'standard', price: 4, stats: {}, pellets: null, description: 'Стандартные пистолетные патроны', descriptionEn: 'Standard pistol rounds' },
    { id: '45acp_hydra', name: 'Патроны .45 ACP Hydroshock', nameEn: '.45 ACP Hydroshock Rounds', caliber: '.45ACP', type: 'hp', price: 5, stats: { damageModifier: 80, armorPenetration: -25 }, pellets: null, description: 'Экспансивные патроны с высоким уроном', descriptionEn: 'Hollow point rounds with high damage' },
    { id: '45acp_super', name: 'Патроны .45 ACP +P Super', nameEn: '.45 ACP +P Super Rounds', caliber: '.45ACP', type: 'ap', price: null, stats: { damageModifier: -3, armorPenetration: 10 }, pellets: null, description: 'Усиленные бронебойные патроны', descriptionEn: 'Enhanced armor-piercing rounds' },
    // 5.45x39
    { id: '545x39_ps', name: 'Патроны 5,45x39 мм ПС', nameEn: '5.45x39mm PS Rounds', caliber: '5.45x39', type: 'standard', price: 5, stats: {}, pellets: null, description: 'Стандартные автоматные патроны', descriptionEn: 'Standard assault rifle rounds' },
    { id: '545x39_snp', name: 'Патроны 5,45x39 мм СН-П', nameEn: '5.45x39mm SN-P Rounds', caliber: '5.45x39', type: 'hp', price: 6, stats: { damageModifier: 50, armorPenetration: -15 }, pellets: null, description: 'Экспансивные патроны с повышенным уроном', descriptionEn: 'Hollow point rounds with increased damage' },
    { id: '545x39_bp', name: 'Патроны 5,45x39 мм БП', nameEn: '5.45x39mm BP Rounds', caliber: '5.45x39', type: 'ap', price: null, stats: { damageModifier: -5, armorPenetration: 12 }, pellets: null, description: 'Бронебойные патроны', descriptionEn: 'Armor-piercing rounds' },
    // 5.56x45
    { id: '556x45_m855', name: 'Патроны 5,56x45 мм M855', nameEn: '5.56x45mm M855 Rounds', caliber: '5.56x45', type: 'standard', price: 6, stats: {}, pellets: null, description: 'Стандартные патроны НАТО', descriptionEn: 'Standard NATO rounds' },
    { id: '556x45_hp', name: 'Патроны 5,56x45 мм БПЗ НР', nameEn: '5.56x45mm HP Rounds', caliber: '5.56x45', type: 'hp', price: 7, stats: { damageModifier: 50, armorPenetration: -15 }, pellets: null, description: 'Экспансивные патроны с повышенным уроном', descriptionEn: 'Hollow point rounds with increased damage' },
    { id: '556x45_m995', name: 'Патроны 5,56x45 мм M995', nameEn: '5.56x45mm M995 Rounds', caliber: '5.56x45', type: 'ap', price: null, stats: { damageModifier: -9, armorPenetration: 14 }, pellets: null, description: 'Бронебойные патроны', descriptionEn: 'Armor-piercing rounds' },
    // 7.62x39
    { id: '762x39_ps', name: 'Патроны 7,62x39 мм ПС', nameEn: '7.62x39mm PS Rounds', caliber: '7.62x39', type: 'standard', price: 12, stats: {}, pellets: null, description: 'Стандартные автоматные патроны', descriptionEn: 'Standard assault rifle rounds' },
    { id: '762x39_bp', name: 'Патроны 7,62x39 мм БП', nameEn: '7.62x39mm BP Rounds', caliber: '7.62x39', type: 'ap', price: null, stats: { damageModifier: -7, armorPenetration: 13 }, pellets: null, description: 'Бронебойные патроны', descriptionEn: 'Armor-piercing rounds' },
    // 7.62x51
    { id: '762x51_m59', name: 'Патроны 7,62x51 мм M59', nameEn: '7.62x51mm M59 Rounds', caliber: '7.62x51', type: 'standard', price: 13, stats: {}, pellets: null, description: 'Стандартные винтовочные патроны', descriptionEn: 'Standard rifle rounds' },
    { id: '762x51_m61', name: 'Патроны 7,62x51 мм М61', nameEn: '7.62x51mm M61 Rounds', caliber: '7.62x51', type: 'ap', price: null, stats: { damageModifier: -14, armorPenetration: 19 }, pellets: null, description: 'Бронебойные патроны', descriptionEn: 'Armor-piercing rounds' },
    // 7.62x54
    { id: '762x54_lps', name: 'Патроны 7,62x54 мм ЛПС', nameEn: '7.62x54mm LPS Rounds', caliber: '7.62x54', type: 'standard', price: 14, stats: {}, pellets: null, description: 'Стандартные винтовочные патроны', descriptionEn: 'Standard rifle rounds' },
    { id: '762x54_hp', name: 'Патроны 7,62x54 мм HP', nameEn: '7.62x54mm HP Rounds', caliber: '7.62x54', type: 'hp', price: 16, stats: { damageModifier: 50, armorPenetration: -20 }, pellets: null, description: 'Экспансивные патроны с повышенным уроном', descriptionEn: 'Hollow point rounds with increased damage' },
    { id: '762x54_pp', name: 'Патроны 7,62x54 мм ПП', nameEn: '7.62x54mm PP Rounds', caliber: '7.62x54', type: 'ap', price: 26, stats: { damageModifier: -13, armorPenetration: 18 }, pellets: null, description: 'Бронебойные патроны', descriptionEn: 'Armor-piercing rounds' },
    { id: '762x54_bs', name: 'Патроны 7,62x54 мм БС', nameEn: '7.62x54mm BS Rounds', caliber: '7.62x54', type: 'ap_plus', price: null, stats: { armorPenetration: 10 }, pellets: null, description: 'Бронебойно-зажигательные патроны', descriptionEn: 'Armor-piercing incendiary rounds' },
    // .308 Winchester
    { id: '308_winchester', name: 'Патроны .308 Winchester', nameEn: '.308 Winchester Rounds', caliber: '.308', type: 'standard', price: 21, stats: { armorPenetration: 10 }, pellets: null, description: 'Снайперские патроны', descriptionEn: 'Sniper rounds' },
    // 12.7x55
    { id: '127x55', name: 'Патроны 12,7x55 мм', nameEn: '12.7x55mm Rounds', caliber: '12.7x55', type: 'standard', price: 19, stats: { armorPenetration: 10 }, pellets: null, description: 'Крупнокалиберные патроны', descriptionEn: 'Large caliber rounds' },
    // 12 gauge
    { id: '12x70_shot', name: 'Патроны 12x70 Дробь', nameEn: '12x70 Birdshot', caliber: '12gauge', type: 'shot', price: 4, stats: { rangeModifier: -60, damageModifier: -48, armorPenetration: -25, spreadModifier: 300 }, pellets: 8, description: 'Дробовые патроны, 8 дробин', descriptionEn: 'Birdshot, 8 pellets' },
    { id: '12x70_buckshot', name: 'Патроны 12x70 Картечь', nameEn: '12x70 Buckshot', caliber: '12gauge', type: 'buckshot', price: 5, stats: { rangeModifier: -10, damageModifier: -60, armorPenetration: -16, spreadModifier: 200 }, pellets: 5, description: 'Картечные патроны, 5 картечин', descriptionEn: 'Buckshot, 5 pellets' },
    { id: '12x76_dart', name: 'Патроны 12x76 Дротик', nameEn: '12x76 Dart', caliber: '12gauge', type: 'dart', price: 6, stats: { damageModifier: -18, armorPenetration: 20, spreadModifier: -62 }, pellets: 1, description: 'Подкалиберный дротик', descriptionEn: 'Subcaliber dart' },
    { id: '12x76_slug', name: 'Патроны 12x76 Жакан', nameEn: '12x76 Slug', caliber: '12gauge', type: 'slug', price: 5, stats: { armorPenetration: -2, spreadModifier: -38 }, pellets: 1, description: 'Пулевой патрон', descriptionEn: 'Slug round' },
    // Special
    { id: 'firemix', name: 'Огнесмесь', nameEn: 'Fire Mix', caliber: 'flamethrower', type: 'incendiary', price: 5, stats: { armorPenetration: -15, spreadModifier: 300, mutantDamageMultiplier: 2.0 }, pellets: 6, description: 'Зажигательная смесь для огнемёта', descriptionEn: 'Incendiary mix for flamethrower' },
    { id: 'makeshift_batteries', name: 'Кустарные батареи', nameEn: 'Makeshift Batteries', caliber: 'electric', type: 'standard', price: null, stats: { }, pellets: null, description: 'Самодельные батареи для электрооружия', descriptionEn: 'Homemade batteries for electric weapons' },
    { id: 'accumulators', name: 'Аккумуляторы', nameEn: 'Accumulators', caliber: 'electric', type: 'enhanced', price: null, stats: { armorPenetration: 10, damageModifier: -16 }, pellets: null, description: 'Качественные аккумуляторы для электрооружия', descriptionEn: 'Quality accumulators for electric weapons' }
];

// ============== ATTACHMENTS ==============
const ATTACHMENTS = [
    { id: 'barska', name: 'Коллиматорный прицел Barska', nameEn: 'Barska Red Dot Sight', type: 'scope', stats: { aimTime: -15.00 } },
    { id: 'pbs_1', name: 'Глушитель ПБС-1', nameEn: 'PBS-1 Suppressor', type: 'muzzle', stats: { effectiveRange: -10.00, hipSpread: -12.00, adsSpread: -12.00 } },
    { id: 'tac_grip', name: 'Тактическая рукоятка', nameEn: 'Tactical Grip', type: 'grip', stats: { aimTime: -5.00, verticalRecoil: -9.00, horizontalRecoil: -4.00 } },
    { id: 'magpul_rvg', name: 'Рукоятка Magpul RVG', nameEn: 'Magpul RVG Grip', type: 'grip', stats: { aimTime: -7.00, verticalRecoil: -4.00, horizontalRecoil: -3.00 } }
];

// ============== AMMO HELPER FUNCTIONS ==============
function getAmmoById(ammoId) { return AMMO_TYPES.find(a => a.id === ammoId); }
function getAmmoByCaliber(caliber) { return AMMO_TYPES.filter(a => a.caliber === caliber); }
function getAmmoForWeapon(weapon) { return weapon.ammoTypes ? AMMO_TYPES.filter(a => weapon.ammoTypes.includes(a.id)) : []; }
function calculateAmmoDamage(baseDamage, ammo) { return baseDamage * (1 + (ammo.stats?.damageModifier || 0) / 100); }
function calculateAmmoArmorPen(baseArmorPen, ammo) { return baseArmorPen + (ammo.stats?.armorPenetration || 0); }
function calculateAmmoRange(baseRange, ammo) { return baseRange * (1 + (ammo.stats?.rangeModifier || 0) / 100); }
function calculateAmmoSpread(baseSpread, ammo) { return baseSpread * (1 + (ammo.stats?.spreadModifier || 0) / 100); }

// ============== ATTACHMENT HELPER FUNCTIONS ==============
function getAttachmentById(id) { return ATTACHMENTS.find(a => a.id === id); }
function getAttachmentsForSlot(slotType, allowedIds) {
    if (allowedIds === true) return ATTACHMENTS.filter(a => a.type === slotType);
    if (Array.isArray(allowedIds)) return ATTACHMENTS.filter(a => allowedIds.includes(a.id));
    return [];
}

// ============== ARMOR & DPS CALCULATION ==============
function calculateArmorProtection(bulletResistance) {
    return bulletResistance <= 0 ? 0 : (bulletResistance / (bulletResistance + 166.67)) * 100;
}

function calculateEffectiveProtection(bulletResistance, armorPenetration) {
    return Math.max(0, calculateArmorProtection(bulletResistance) - armorPenetration);
}

function calculateDamageAfterArmor(baseDamage, bulletResistance, armorPenetration) {
    return baseDamage * (1 - calculateEffectiveProtection(bulletResistance, armorPenetration) / 100);
}

function calculateDPS(damage, rpm) { return damage * (rpm / 60); }

function calculateTTK(damage, rpm, targetHP) {
    if (damage <= 0) return Infinity;
    const shotsNeeded = Math.ceil(targetHP / damage);
    return (shotsNeeded - 1) * (60 / rpm);
}

// ============== WEAPON HELPER FUNCTIONS ==============
function getWeaponById(weaponId) { return WEAPONS.find(w => w.id === weaponId); }
function getWeaponCategoryName(categoryId) {
    const cat = WEAPON_CATEGORIES[categoryId];
    return cat ? getLocalizedField(cat, 'name') : categoryId;
}
