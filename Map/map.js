'use strict';

const MAP_CONFIG = {
    width: 11264,
    height: 16896,
    tileSize: 256,
    minZoom: 4,
    maxZoom: 8,
    defaultZoom: 5,
    nativeZoom: 7
};

const MARKER_ICONS = {
    catalyst: L.icon({ iconUrl: 'images/astrolite/catalyst.png', iconSize: [24, 22], iconAnchor: [12, 11], popupAnchor: [0, -11] }),
    wormhole: L.icon({ iconUrl: 'images/astrolite/wormhole.png', iconSize: [24, 22], iconAnchor: [12, 11], popupAnchor: [0, -11] }),
    ammo:   L.icon({ iconUrl: 'markers/ammo.png',   iconSize: [24, 18], iconAnchor: [12, 9], popupAnchor: [0, -9] }),
    supply: L.icon({ iconUrl: 'markers/supply.png', iconSize: [25, 18], iconAnchor: [13, 9], popupAnchor: [0, -9] }),
    tools:  L.icon({ iconUrl: 'markers/tool.png',   iconSize: [20, 18], iconAnchor: [10, 9], popupAnchor: [0, -9] }),
    barrels: L.icon({ iconUrl: 'markers/barrel.png', iconSize: [14, 24], iconAnchor: [7, 12], popupAnchor: [0, -12] }),
    science: L.icon({ iconUrl: 'markers/science.png', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12] }),
    stash: L.icon({ iconUrl: 'markers/stash.png', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12] }),
    wooden_crate: L.icon({ iconUrl: 'markers/wooden_crate.png', iconSize: [21, 18], iconAnchor: [11, 9],  popupAnchor: [0, -9] }),
    safe: L.icon({ iconUrl: 'markers/safe.png', iconSize: [17, 24], iconAnchor: [9, 12], popupAnchor: [0, -12] }),
    stash_hidden: L.icon({ iconUrl: 'markers/stash_hidden.png', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12] }),
    blind_dog: L.icon({ iconUrl: 'markers/mutants/blinddog.png', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] }),
    pseudodog: L.icon({ iconUrl: 'markers/mutants/pseudodog.png', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] }),
    psy_dog: L.icon({ iconUrl: 'markers/mutants/pseudodog.png', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] }),
    flesh: L.icon({ iconUrl: 'markers/mutants/flesh.png', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] }),
    boar: L.icon({ iconUrl: 'markers/mutants/boar.png', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] }),
    rat: L.icon({ iconUrl: 'markers/mutants/rat.png', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] }),
    snork: L.icon({ iconUrl: 'markers/mutants/snork.png', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] }),
    zombie: L.icon({ iconUrl: 'markers/mutants/zombie.png', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] }),
    bloodsucker: L.icon({ iconUrl: 'markers/mutants/bloodsucker.png', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] }),
    bloodsucker_strong: L.icon({ iconUrl: 'markers/mutants/strongbloodsucker.png', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] }),
    chimera: L.icon({ iconUrl: 'markers/mutants/chimera.png', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] }),
    controller: L.icon({ iconUrl: 'markers/mutants/controller.png', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] }),
    zombified: L.icon({ iconUrl: 'images/NPC/icons/Zombified.png', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] }),
    zombified_cluster: L.icon({ iconUrl: 'images/NPC/icons/npc_outpost.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    bandits: L.icon({ iconUrl: 'images/NPC/icons/Bandits.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    bandit_camp: L.icon({ iconUrl: 'images/NPC/icons/npc_outpost.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    military: L.icon({ iconUrl: 'images/NPC/icons/military.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    monolith_outpost: L.icon({ iconUrl: 'images/NPC/icons/npc_outpost.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    freedom: L.icon({ iconUrl: 'images/NPC/icons/freedom.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    duty: L.icon({ iconUrl: 'images/NPC/icons/Duty.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    sinner: L.icon({ iconUrl: 'images/NPC/icons/sinner.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    duty_freedom_spawn: L.icon({ iconUrl: 'images/NPC/icons/duty_freedom_spawn.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    boss_prince: L.icon({ iconUrl: 'images/NPC/icons/boss.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    boss_invincible: L.icon({ iconUrl: 'images/NPC/icons/boss.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    boss_illusionist: L.icon({ iconUrl: 'images/NPC/icons/boss_mutant.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    boss_foxtrot: L.icon({ iconUrl: 'images/NPC/icons/boss.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    base_orden:   L.icon({ iconUrl: 'images/locations/base-orden.png',   iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -16] }),
    base_legion:  L.icon({ iconUrl: 'images/locations/base-legion.png',  iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -16] }),
    base_duty:    L.icon({ iconUrl: 'images/locations/base-duty.png',    iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -16] }),
    base_freedom: L.icon({ iconUrl: 'images/locations/base-freedom.png', iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -16] }),
    base_spawn:   L.icon({ iconUrl: 'images/locations/base-spawn.png',   iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12] }),
    base_nospawn: L.icon({ iconUrl: 'images/locations/base-nospawn.png', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12] }),
    base_hostile: L.icon({ iconUrl: 'images/locations/base-hostile.png', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12] }),
    monolith: L.icon({ iconUrl: 'images/NPC/icons/Monolith.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    mercenary: L.icon({ iconUrl: 'images/NPC/icons/Mercs.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    stalkers: L.icon({ iconUrl: 'images/NPC/icons/stalker.webp', iconSize: [22, 24], iconAnchor: [11, 12], popupAnchor: [0, -12] }),
    boss_pharaoh: L.icon({ iconUrl: 'images/NPC/icons/boss.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    boss_sumrak: L.icon({ iconUrl: 'images/NPC/icons/boss.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    boss_iskatel: L.icon({ iconUrl: 'images/NPC/icons/boss.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    boss_king: L.icon({ iconUrl: 'images/NPC/icons/boss_mutant.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] }),
    boss_kastet: L.icon({ iconUrl: 'images/NPC/icons/boss.png', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10] })
};

const ASTROLITE_TYPES = ['catalyst', 'wormhole'];
const CONTAINER_TYPES = ['ammo', 'supply', 'tools', 'barrels', 'science', 'stash', 'wooden_crate', 'safe', 'stash_hidden'];
const MUTANT_TYPES = ['blind_dog', 'pseudodog', 'psy_dog', 'flesh', 'boar', 'rat', 'snork', 'zombie', 'bloodsucker', 'bloodsucker_strong', 'chimera', 'controller'];
const NPC_TYPES = ['zombified', 'zombified_cluster', 'bandits', 'bandit_camp', 'military', 'monolith_outpost', 'monolith', 'mercenary', 'stalkers', 'freedom', 'duty', 'duty_freedom_spawn', 'sinner', 'boss_foxtrot', 'boss_prince', 'boss_invincible', 'boss_illusionist', 'boss_pharaoh', 'boss_sumrak', 'boss_iskatel', 'boss_king', 'boss_kastet'];
const LOCATION_TYPES = ['base_orden', 'base_legion', 'base_duty', 'base_freedom', 'base_spawn', 'base_nospawn', 'base_hostile'];

const RUSSIAN_MUTANT_NAMES = {
    'Слепые собаки': 'blind_dog',
    'Псевдособаки': 'pseudodog',
    'Пси-собака': 'psy_dog',
    'Плоти': 'flesh',
    'Кабаны': 'boar',
    'Крысы': 'rat',
    'Снорки': 'snork',
    'Зомби': 'zombie',
    'Кровосос': 'bloodsucker',
    'Матёрый кровосос': 'bloodsucker_strong',
    'Химера': 'chimera',
    'Контролёр': 'controller'
};

const DESC_TRANSLATIONS = {
    'Лаборатория в тоннеле': 'Laboratory in the tunnel',
    'Мини лаборатория в тоннеле': 'Mini laboratory in the tunnel',
    'Находится в лаборатории': 'Located in the laboratory',
    'Находится в тоннеле': 'Located in the tunnel',
    'Подземелья Агропрома': 'Agroprom Underground',
    'Лаборатория в пещере': 'Laboratory in the cave',
    'Лаборатория X-16': 'Laboratory X-16',
    'Выход из лаборатории X-16': 'Exit from Laboratory X-16',
    'Лаборатория X-18': 'Laboratory X-18',
    '-1 этаж': '-1 floor',
    '-2 этаж': '-2 floor',
    'Зомбированные': 'Zombified',
    'Зомбированный': 'Zombified',
    'Скопление зомбированных': 'Zombified cluster',
    'Бандиты': 'Bandits',
    'Стоянка бандитов': 'Bandit camp',
    'Мародеры': 'Marauders',
    'Очень сильные': 'Very strong',
    'Военные': 'Military',
    'Военный блокпост': 'Military checkpoint',
    'Свободовцы': 'Freedom',
    'База Свободы': 'Freedom Base',
    'Долговцы': 'Duty',
    'База Долга': 'Duty Base',
    'Аванпост монолита': 'Monolith outpost',
    'Монолит': 'Monolith',
    'Князь': 'Prince',
    'Непробиваемый': 'Invincible',
    'Иллюзионист': 'Illusionist',
    'Босс': 'Boss',
    'Катализатор': 'Catalyst',
    'Червоточина': 'Wormhole',
    'Контролёр': 'Controller',
    'Пси-собака': 'Psy-dog',
    'Также лежит': 'Also contains',
    'Трек:': 'Track:',
    'Координаты:': 'Coordinates:',
    'Спавн Долга/Свободы': 'Duty/Freedom Spawn',
    'Тайник': 'Stash',
    'Грешник': 'Sinner (Order)',
    'Грешники': 'Sinners (Order)',
    'Фокстрот': 'Foxtrot',
    'Разведчик Фокстрот': 'Scout Foxtrot',
    'База': 'Base',
    'База группировки': 'Faction base',
    'Орден': 'Order',
    'Легион': 'Legion',
    'Бункер учёных': 'Scientists\' Bunker',
    'Завод «Росток»': 'Rostok Factory',
    'Фабрика': 'Factory',
    'Заброшенная ферма': 'Abandoned Farm',
    'АТП': 'Motor Pool',
    'Деревня новичков': 'Rookie Village',
    'База сталкеров': 'Stalker Base',
    'КПП «Рубежный»': 'Rubezhniy Checkpoint',
    'Барахолка': 'Flea Market',
    'Свиноферма': 'Pig Farm',
    'Пожарная часть': 'Fire Station',
    'КПП «Южный»': 'Southern Checkpoint',
    'Муравейник': 'Anthill',
    'Завод «Янтарь»': 'Yantar Factory',
    'НИИ «Агропром»': 'Agroprom Research Institute',
    'Тёмная долина': 'Dark Valley',
    'Кордон': 'Cordon',
    'Топи': 'Marshes',
    'Росстань': 'Rosstan',
    'Свалка': 'Garbage',
    'Бар «100 рентген»': 'Bar "100 Rads"',
    'Точка сохранения доступна': 'Spawn save available',
    'Точка сохранения недоступна': 'Spawn save not available',
    'Враждебная территория': 'Hostile territory',
    'Апостат': 'Apostle',
    'Архонт': 'Archon',
    'Наёмники': 'Mercenaries',
    'ЧВК «Асгард»': 'PMC "Asgard"',
    'Акбар': 'Akbar',
    'Ренегаты': 'Renegades',
    'Ренегат': 'Renegade',
    'Сталкеры': 'Stalkers',
    'Одиночки': 'Loners',
    'Маклак': 'Maklak',
    'Депо Сумрака': 'Sumrak Depot',
    'Искатель': 'Seeker',
    'Банда Фараона': 'Pharaoh\'s Gang',
    'Король и Свита': 'King and Retinue',
    'Босс: Король и Свита': 'Boss: King and Retinue',
    'Банда Кастета': 'Kastet\'s Gang',
    'Босс: Банда Кастета': 'Boss: Kastet\'s Gang'
};

let map;
let markerLayers = {};
let activeFilters = new Set();
let currentLevel = 'surface';

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function t(key, params = {}) {
    if (window.i18n && typeof window.i18n.t === 'function') {
        return window.i18n.t(key, params);
    }
    return key;
}

function isEnglish() {
    return window.i18n?.isEnglish?.() || false;
}

function getMarkerTypeName(type) {
    return t(`map.marker.${type}`);
}

function translateDescription(desc, type) {
    if (!isEnglish()) return desc;

    let translated = desc;

    if (MUTANT_TYPES.includes(type)) {
        Object.entries(RUSSIAN_MUTANT_NAMES).forEach(([ruName, typeKey]) => {
            if (translated.startsWith(ruName)) {
                translated = translated.replace(ruName, t(`map.marker.${typeKey}`));
            }
        });
    }

    Object.entries(DESC_TRANSLATIONS).forEach(([ru, en]) => {
        translated = translated.split(ru).join(en);
    });

    return translated;
}

function extractCoords(desc) {
    const coordsRegex = /Координаты:\s*([^\n<]+)/;
    const match = desc.match(coordsRegex);
    if (match) {
        const coords = match[1].trim();
        let cleanDesc = desc.replace(coordsRegex, '').trim();
        cleanDesc = cleanDesc.replace(/^(<br\s*\/?>)+/gi, '').replace(/(<br\s*\/?>)+$/gi, '').trim();
        return { coords, cleanDesc };
    }
    return { coords: null, cleanDesc: desc };
}

const INFO_LABELS = {
    respawn: {
        ru: 'Респавн',
        en: 'Respawn',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
    },
    count: {
        ru: 'Кол-во',
        en: 'Count',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>'
    },
    level: {
        ru: 'Уровень',
        en: 'Level',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
    },
    danger: {
        ru: 'Опасность',
        en: 'Danger',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
    },
    hp: {
        ru: 'Здоровье',
        en: 'Health',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
    },
    location: {
        ru: 'Расположение',
        en: 'Location',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'
    }
};

function createMarkerPopup(type, markerData) {
    const typeName = getMarkerTypeName(type);
    const ext = markerData.extended;

    if (ext) {
        return createExtendedPopup(type, markerData, typeName, ext);
    }

    return createSimplePopup(type, markerData, typeName);
}

function createSimplePopup(type, markerData, typeName) {
    const { coords, cleanDesc } = extractCoords(markerData.desc);
    const desc = translateDescription(cleanDesc, type);
    const descStripped = desc.replace(/<br\s*\/?>/gi, '').trim();

    // Check if description is just a duplicate of the type name
    const isDescDuplicate = descStripped.toLowerCase() === typeName.toLowerCase();

    const levelLabel = markerData.level === 'underground'
        ? `<span style="color:#a78bfa;font-size:11px;font-weight:600;margin-left:8px;">${isEnglish() ? '⛏ Underground' : '⛏ Подземелье'}</span>`
        : '';

    let html = `<div class="marker-popup marker-popup--simple">`;
    html += `<div class="marker-popup__title">${escapeHtml(typeName)}${levelLabel}</div>`;

    if (markerData.image || (descStripped && !isDescDuplicate)) {
        html += `<div class="marker-popup__body">`;

        if (markerData.image) {
            html += `<div class="marker-popup__image-wrapper">
                <img class="marker-popup__image" src="${markerData.image}" alt="${escapeHtml(typeName)}"
                     onclick="openLightbox(this.src)" loading="lazy">
            </div>`;
        }

        if (descStripped && !isDescDuplicate) {
            html += `<div class="marker-popup__desc">${desc}</div>`;
        }

        html += `</div>`;
    }

    if (coords) {
        html += createCoordsFooter(coords);
    }

    html += `</div>`;
    return html;
}

function createExtendedPopup(type, markerData, typeName, ext) {
    const en = isEnglish();
    const descLabel = en ? 'Description' : 'Описание';
    const rewardsLabel = en ? 'Rewards' : 'Награды';
    const { coords } = extractCoords(markerData.desc);

    const levelLabel = markerData.level === 'underground'
        ? `<span style="color:#a78bfa;font-size:11px;font-weight:600;margin-left:8px;">${en ? '⛏ Underground' : '⛏ Подземелье'}</span>`
        : '';

    let html = `<div class="marker-popup">`;
    html += `<div class="marker-popup__title">${escapeHtml(typeName)}${levelLabel}</div>`;
    html += `<div class="marker-popup__body">`;

    const image = ext.image || markerData.image;
    const hasInfo = ext.info && Object.keys(ext.info).length > 0;
    const hasLeft = image || hasInfo;

    if (hasLeft) {
        html += `<div class="marker-popup__top">`;
        html += `<div class="marker-popup__left">`;

        if (image) {
            html += `<div class="marker-popup__image-wrapper">
                <img class="marker-popup__image" src="${image}" alt="${escapeHtml(typeName)}"
                     onclick="openLightbox(this.src)" loading="lazy">
            </div>`;
        }

        if (hasInfo) {
            html += `<div class="marker-popup__info">`;
            Object.entries(ext.info).forEach(([key, val]) => {
                const label = INFO_LABELS[key];
                if (!label) return;

                const labelText = en ? label.en : label.ru;
                const value = typeof val === 'object' ? (en ? val.en : val.ru) : val;

                html += `<div class="marker-popup__info-row">
                    <span class="marker-popup__info-icon">${label.icon}</span>
                    <span class="marker-popup__info-label">${escapeHtml(labelText)}</span>
                    <span class="marker-popup__info-value">${escapeHtml(value)}</span>
                </div>`;
            });

            if (markerData.level === 'underground') {
                const locLabel = INFO_LABELS.location;
                html += `<div class="marker-popup__info-row" style="border-color:rgba(167,139,250,0.3);">
                    <span class="marker-popup__info-icon" style="color:#a78bfa;">${locLabel.icon}</span>
                    <span class="marker-popup__info-label">${escapeHtml(en ? locLabel.en : locLabel.ru)}</span>
                    <span class="marker-popup__info-value" style="color:#a78bfa;">${escapeHtml(en ? 'Underground' : 'Подземелье')}</span>
                </div>`;
            }

            html += `</div>`;
        }

        html += `</div>`;

        html += `<div class="marker-popup__right">`;

        if (ext.description) {
            const descText = typeof ext.description === 'object'
                ? (en ? ext.description.en : ext.description.ru)
                : ext.description;

            html += `<div class="marker-popup__desc">
                <span class="marker-popup__desc-label">${escapeHtml(descLabel)}</span>
                ${escapeHtml(descText)}
            </div>`;
        } else {
            const { cleanDesc } = extractCoords(markerData.desc);
            const desc = translateDescription(cleanDesc, type);
            if (desc) {
                html += `<div class="marker-popup__desc">${desc}</div>`;
            }
        }

        html += `</div>`;
        html += `</div>`;
    } else {
        if (ext.description) {
            const descText = typeof ext.description === 'object'
                ? (en ? ext.description.en : ext.description.ru)
                : ext.description;

            html += `<div class="marker-popup__desc">
                <span class="marker-popup__desc-label">${escapeHtml(descLabel)}</span>
                ${escapeHtml(descText)}
            </div>`;
        } else {
            const { cleanDesc } = extractCoords(markerData.desc);
            const desc = translateDescription(cleanDesc, type);
            if (desc) {
                html += `<div class="marker-popup__desc">${desc}</div>`;
            }
        }
    }

    if (ext.rewards && ext.rewards.length > 0 && typeof REWARD_ICONS !== 'undefined') {
        html += `<div class="marker-popup__rewards">
            <span class="marker-popup__rewards-label">${escapeHtml(rewardsLabel)}</span>
            <div class="marker-popup__rewards-list">`;

        ext.rewards.forEach(reward => {
            let rewardKey, count;

            if (typeof reward === 'object' && reward.key) {
                rewardKey = reward.key;
                count = reward.count || 1;
            } else {
                rewardKey = reward;
                count = 1;
            }

            const rewardData = REWARD_ICONS[rewardKey];
            if (!rewardData) return;

            const name = en ? rewardData.name.en : rewardData.name.ru;
            const rarityClass = rewardData.rarity ? ` marker-popup__reward--${rewardData.rarity}` : '';
            const countBadge = count > 1 ? `<span class="marker-popup__reward-count">×${count}</span>` : '';

            html += `<div class="marker-popup__reward${rarityClass}">
                <img src="${rewardData.icon}" alt="${escapeHtml(name)}" loading="lazy">
                ${countBadge}
                <span class="marker-popup__reward-tooltip">${escapeHtml(name)}${count > 1 ? ` (×${count})` : ''}</span>
            </div>`;
        });

        html += `</div></div>`;
    }

    html += `</div>`;

    if (coords) {
        html += createCoordsFooter(coords);
    }

    html += `</div>`;
    return html;
}

function createCoordsFooter(coordsText) {
    const copyLabel = isEnglish() ? 'Copy' : 'Скопировать';
    return `<div class="marker-popup__footer">
        <svg class="marker-popup__footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
        </svg>
        <span class="marker-popup__footer-coords"
              onclick="copyCoords('${escapeHtml(coordsText)}')"
              title="${escapeHtml(copyLabel)}">${escapeHtml(coordsText)}</span>
        <button class="marker-popup__footer-copy"
                onclick="copyCoords('${escapeHtml(coordsText)}')">${escapeHtml(copyLabel)}</button>
    </div>`;
}

function copyCoords(text) {
    navigator.clipboard.writeText(text).then(() => {
        showMapToast(isEnglish() ? 'Coordinates copied!' : 'Координаты скопированы!');
    }).catch(() => {
        showMapToast(isEnglish() ? 'Copy failed' : 'Ошибка копирования');
    });
}

function showMapToast(message) {
    const toast = document.getElementById('copyToast');
    if (!toast) return;
    const span = toast.querySelector('span');
    if (span) span.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2500);
}

function openLightbox(src) {
    let lightbox = document.getElementById('markerLightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'markerLightbox';
        lightbox.className = 'marker-lightbox';
        lightbox.innerHTML = '<img src="" alt="">';
        lightbox.addEventListener('click', () => lightbox.classList.remove('visible'));
        document.body.appendChild(lightbox);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('visible')) {
                lightbox.classList.remove('visible');
            }
        });
    }

    lightbox.querySelector('img').src = src;
    lightbox.classList.add('visible');
}

document.addEventListener('DOMContentLoaded', () => {
    initBurgerMenu();
    initLangDropdownClose();
    initMap();
    initMarkers();
    initFilters();
    initSidebar();
    initControls();
    initLevelSwitcher();
    updateMarkerCounts();
});

document.addEventListener('languageChanged', () => {
    refreshMarkersPopups();
    updateLevelSwitcherText();
});

function initMap() {
    map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
        zoomControl: false,
        attributionControl: false,
        maxBoundsViscosity: 1.0
    });

    const southWest = map.unproject([0, MAP_CONFIG.height], MAP_CONFIG.nativeZoom);
    const northEast = map.unproject([MAP_CONFIG.width, 0], MAP_CONFIG.nativeZoom);
    const bounds = new L.LatLngBounds(southWest, northEast);

    L.tileLayer('tiles/{z}/{x}/{y}.jpg', {
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
        bounds: bounds,
        noWrap: true,
        tileSize: MAP_CONFIG.tileSize,
        errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    }).addTo(map);

    const center = map.unproject([MAP_CONFIG.width / 2, MAP_CONFIG.height / 2], MAP_CONFIG.nativeZoom);
    map.setView(center, MAP_CONFIG.defaultZoom);
    map.setMaxBounds(bounds);

    map.on('mousemove', (e) => {
        const point = map.project(e.latlng, MAP_CONFIG.nativeZoom);
        document.getElementById('coordX').textContent = Math.round(point.x);
        document.getElementById('coordY').textContent = Math.round(point.y);
    });

    setTimeout(() => {
        if (window.Dynmap) Dynmap.init(map);
    }, 500);
}

function initMarkers() {
    if (typeof MARKERS_DATA === 'undefined') return console.error('MARKERS_DATA not loaded!');

    Object.keys(MARKERS_DATA).forEach(type => {
        markerLayers[type] = {
            surface: L.layerGroup(),
            underground: L.layerGroup()
        };

        MARKERS_DATA[type].forEach(markerData => {
            const level = markerData.level || 'surface';
            const latLng = map.unproject([markerData.coords[1], markerData.coords[0]], MAP_CONFIG.nativeZoom);
            const icon = MARKER_ICONS[type];
            if (!icon) return;

            const popupOptions = markerData.extended
                ? { maxWidth: 560, minWidth: 360, className: 'extended-popup' }
                : { maxWidth: 320 };

            const marker = L.marker(latLng, { icon });
            marker.markerType = type;
            marker.markerData = markerData;
            marker.markerLevel = level;
            marker.bindPopup(() => createMarkerPopup(type, markerData), popupOptions);

            markerLayers[type][level].addLayer(marker);
        });

        // Add only the current level's layer group to the map
        markerLayers[type][currentLevel].addTo(map);
        activeFilters.add(type);
    });
}

function refreshMarkersPopups() {
    Object.values(markerLayers).forEach(levelGroups => {
        ['surface', 'underground'].forEach(level => {
            levelGroups[level].eachLayer(marker => {
                if (marker.markerType && marker.markerData) {
                    marker.setPopupContent(createMarkerPopup(marker.markerType, marker.markerData));
                }
            });
        });
    });
}

// ==================== LEVEL SWITCHER ====================

function initLevelSwitcher() {
    const savedLevel = localStorage.getItem('mapLevel');
    if (savedLevel === 'underground') {
        switchLevel('underground', false);
    }

    document.getElementById('levelSurface')?.addEventListener('click', () => switchLevel('surface'));
    document.getElementById('levelUnderground')?.addEventListener('click', () => switchLevel('underground'));

    // Keyboard shortcut: Tab to toggle levels
    document.addEventListener('keydown', (e) => {
        // Only if no modals/inputs are focused
        if (e.key === '`' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
            const active = document.activeElement;
            if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT')) return;
            e.preventDefault();
            switchLevel(currentLevel === 'surface' ? 'underground' : 'surface');
        }
    });
}

function switchLevel(newLevel, animate = true) {
    if (newLevel === currentLevel && document.querySelector('.level-switcher__btn--active')) return;

    const oldLevel = currentLevel;
    currentLevel = newLevel;
    localStorage.setItem('mapLevel', newLevel);

    // Update UI buttons
    document.querySelectorAll('.level-switcher__btn').forEach(btn => {
        btn.classList.remove('level-switcher__btn--active', 'level-switcher__btn--underground-active');
    });

    const activeBtn = document.getElementById(newLevel === 'surface' ? 'levelSurface' : 'levelUnderground');
    if (activeBtn) {
        activeBtn.classList.add('level-switcher__btn--active');
        if (newLevel === 'underground') {
            activeBtn.classList.add('level-switcher__btn--underground-active');
        }
    }

    // Update map container class for visual effect
    const mapContainer = document.getElementById('map');
    if (newLevel === 'underground') {
        mapContainer?.classList.add('underground-active');
    } else {
        mapContainer?.classList.remove('underground-active');
    }

    // Swap marker layers
    Object.keys(markerLayers).forEach(type => {
        if (!activeFilters.has(type)) return;

        const layers = markerLayers[type];
        if (layers[oldLevel]) map.removeLayer(layers[oldLevel]);
        if (layers[newLevel]) layers[newLevel].addTo(map);
    });

    // Close any open popups
    map.closePopup();

    // Update counts
    updateMarkerCounts();
}

function updateLevelSwitcherText() {
    const surfaceBtn = document.getElementById('levelSurface');
    const undergroundBtn = document.getElementById('levelUnderground');

    if (surfaceBtn) {
        const span = surfaceBtn.querySelector('span');
        if (span) span.textContent = t('map.level.surface');
    }
    if (undergroundBtn) {
        const span = undergroundBtn.querySelector('span');
        if (span) span.textContent = t('map.level.underground');
    }
}

// ==================== FILTERS ====================

const FILTERS_VERSION = '2';

function initFilters() {
    const DEFAULT_FILTER_STATE = {
        // astrolite — hidden
        catalyst: false,
        wormhole: false,
        // containers — only science and safe visible
        ammo: false,
        supply: false,
        tools: false,
        barrels: false,
        science: true,
        stash: false,
        wooden_crate: false,
        safe: true,
        stash_hidden: false,
        // mutants — all visible
        blind_dog: true,
        pseudodog: true,
        psy_dog: true,
        flesh: true,
        boar: true,
        rat: true,
        snork: true,
        zombie: true,
        bloodsucker: true,
        bloodsucker_strong: true,
        chimera: true,
        controller: true,
        // npc — all visible
        zombified: true,
        zombified_cluster: true,
        bandits: true,
        bandit_camp: true,
        military: true,
        monolith_outpost: true,
        monolith: true,
        mercenary: true,
        stalkers: true,
        freedom: true,
        duty: true,
        duty_freedom_spawn: true,
        sinner: true,
        boss_foxtrot: true,
        boss_prince: true,
        boss_invincible: true,
        boss_illusionist: true,
        boss_pharaoh: true,
        boss_sumrak: true,
        boss_iskatel: true,
        boss_king: true,
        boss_kastet: true,
        // locations — all visible
        base_orden: true,
        base_legion: true,
        base_duty: true,
        base_freedom: true,
        base_spawn: true,
        base_nospawn: true,
        base_hostile: true
    };

    const savedVersion = localStorage.getItem('mapFiltersVersion');
    const saved = JSON.parse(localStorage.getItem('mapFilters') || '{}');
    const useDefaults = savedVersion !== FILTERS_VERSION || Object.keys(saved).length === 0;

    if (useDefaults) {
        localStorage.setItem('mapFiltersVersion', FILTERS_VERSION);
        localStorage.setItem('mapFilters', JSON.stringify(DEFAULT_FILTER_STATE));
    }

    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        const filter = checkbox.dataset.filter;

        const state = useDefaults
            ? (DEFAULT_FILTER_STATE[filter] !== undefined ? DEFAULT_FILTER_STATE[filter] : false)
            : (saved[filter] !== undefined ? saved[filter] : (DEFAULT_FILTER_STATE[filter] !== undefined ? DEFAULT_FILTER_STATE[filter] : false));

        checkbox.checked = state;
        if (!state) {
            activeFilters.delete(filter);
            if (markerLayers[filter]) {
                map.removeLayer(markerLayers[filter][currentLevel]);
            }
        }

        checkbox.addEventListener('change', () => {
            toggleFilter(filter, checkbox.checked);
            saveFiltersState();
        });
    });

    document.querySelectorAll('.filter-group__header').forEach(header => {
        header.addEventListener('click', () => header.closest('.filter-group').classList.toggle('open'));
    });

    document.querySelector('.filter-group')?.classList.add('open');
}

function toggleFilter(filterType, isActive) {
    if (isActive) {
        activeFilters.add(filterType);
        if (markerLayers[filterType]) {
            markerLayers[filterType][currentLevel].addTo(map);
        }
    } else {
        activeFilters.delete(filterType);
        if (markerLayers[filterType]) {
            map.removeLayer(markerLayers[filterType][currentLevel]);
        }
    }
    updateMarkerCounts();
}

function saveFiltersState() {
    const state = {};
    document.querySelectorAll('.filter-checkbox').forEach(cb => {
        state[cb.dataset.filter] = cb.checked;
    });
    localStorage.setItem('mapFilters', JSON.stringify(state));
}

function updateMarkerCounts() {
    if (typeof MARKERS_DATA === 'undefined') return;

    Object.keys(MARKERS_DATA).forEach(type => {
        const el = document.querySelector(`[data-count="${type}"]`);
        if (el) {
            const total = MARKERS_DATA[type].length;
            const currentCount = MARKERS_DATA[type].filter(m => (m.level || 'surface') === currentLevel).length;
            const otherCount = total - currentCount;

            if (otherCount > 0) {
                el.innerHTML = `${currentCount} <span class="filter-item__underground-count" title="${
                    currentLevel === 'surface'
                        ? (isEnglish() ? 'Underground' : 'Подземелье')
                        : (isEnglish() ? 'Surface' : 'Поверхность')
                }">+${otherCount}</span>`;
            } else {
                el.textContent = currentCount;
            }
        }
    });

    if (typeof FILTER_CATEGORIES !== 'undefined') {
        Object.entries(FILTER_CATEGORIES).forEach(([cat, types]) => {
            const currentCount = types.reduce((sum, t) => {
                return sum + (MARKERS_DATA[t]?.filter(m => (m.level || 'surface') === currentLevel).length || 0);
            }, 0);
            const totalCount = types.reduce((sum, t) => sum + (MARKERS_DATA[t]?.length || 0), 0);
            const otherCount = totalCount - currentCount;

            const el = document.getElementById(`count${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
            if (el) {
                if (otherCount > 0) {
                    el.innerHTML = `${currentCount} <span class="filter-item__underground-count">+${otherCount}</span>`;
                } else {
                    el.textContent = currentCount;
                }
            }
        });
    }
}

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebarToggle');
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarCloseMobile = document.getElementById('sidebarCloseMobile');

    if (!sidebar || !toggle) return;

    const isMobile = () => window.innerWidth <= 768;

    const savedCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (savedCollapsed && !isMobile()) {
        sidebar.classList.add('collapsed');
    }

    // Function to open sidebar on mobile
    const openMobileSidebar = () => {
        sidebar.classList.add('open');
        sidebarOverlay?.classList.add('visible');
        document.body.style.overflow = 'hidden';
    };

    // Function to close sidebar on mobile
    const closeMobileSidebar = () => {
        sidebar.classList.remove('open');
        sidebarOverlay?.classList.remove('visible');
        document.body.style.overflow = '';
    };

    // Desktop toggle button
    toggle.addEventListener('click', () => {
        if (isMobile()) {
            openMobileSidebar();
        } else {
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        }
        setTimeout(() => map.invalidateSize(), 300);
    });

    // Mobile filter FAB button
    mobileFilterBtn?.addEventListener('click', () => {
        openMobileSidebar();
        updateMobileFilterBadge();
    });

    // Mobile close button
    sidebarCloseMobile?.addEventListener('click', () => {
        closeMobileSidebar();
        setTimeout(() => map.invalidateSize(), 300);
    });

    // Overlay click to close
    sidebarOverlay?.addEventListener('click', () => {
        closeMobileSidebar();
        setTimeout(() => map.invalidateSize(), 300);
    });

    // Close sidebar when clicking on map
    document.getElementById('map')?.addEventListener('click', () => {
        if (isMobile() && sidebar.classList.contains('open')) {
            closeMobileSidebar();
            setTimeout(() => map.invalidateSize(), 300);
        }
    });

    // Handle resize
    window.addEventListener('resize', () => {
        if (isMobile()) {
            sidebar.classList.remove('collapsed');
        } else {
            sidebar.classList.remove('open');
            sidebarOverlay?.classList.remove('visible');
            document.body.style.overflow = '';
        }
    });

    // Reset filters button
    document.getElementById('resetFilters')?.addEventListener('click', () => {
        document.querySelectorAll('.filter-checkbox').forEach(cb => {
            cb.checked = true;
            toggleFilter(cb.dataset.filter, true);
        });
        saveFiltersState();
        updateMobileFilterBadge();
    });

    // Update badge when filters change
    document.querySelectorAll('.filter-checkbox').forEach(cb => {
        cb.addEventListener('change', () => {
            updateMobileFilterBadge();
        });
    });

    // Initial badge update
    updateMobileFilterBadge();
}

// Update mobile filter badge with active filters count
function updateMobileFilterBadge() {
    const badge = document.getElementById('mobileFilterBadge');
    if (!badge) return;

    const checkboxes = document.querySelectorAll('.filter-checkbox');
    let activeCount = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) activeCount++;
    });

    badge.textContent = activeCount;
    badge.style.display = activeCount > 0 ? 'flex' : 'none';
}

// Swipe to close sidebar on mobile
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    sidebar.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    sidebar.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 100;
        const diffX = touchStartX - touchEndX;
        const diffY = Math.abs(touchStartY - touchEndY);

        // Only trigger if horizontal swipe is dominant and exceeds threshold
        if (diffX > swipeThreshold && diffY < Math.abs(diffX) * 0.5) {
            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                document.getElementById('sidebarOverlay')?.classList.remove('visible');
                document.body.style.overflow = '';
                setTimeout(() => map.invalidateSize(), 300);
            }
        }
    }
});

function initControls() {
    document.getElementById('zoomIn')?.addEventListener('click', () => map.zoomIn());
    document.getElementById('zoomOut')?.addEventListener('click', () => map.zoomOut());

    document.getElementById('resetView')?.addEventListener('click', () => {
        const center = map.unproject([MAP_CONFIG.width / 2, MAP_CONFIG.height / 2], MAP_CONFIG.nativeZoom);
        map.setView(center, MAP_CONFIG.defaultZoom);
    });

    document.getElementById('fullscreen')?.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen().catch(() => {});
        }
    });
}
