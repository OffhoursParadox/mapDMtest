'use strict';

const BARTER_MATERIALS = {
    // Отмычка | Росстань
    mandrake_root: {
        name: 'Корень Мандрагоры',
        nameEn: 'Mandrake Root',
        rank: 'lockpick'
    },
    mutated_tissue_sample: {
        name: 'Мутировавший образец ткани',
        nameEn: 'Mutated Tissue Sample',
        rank: 'lockpick'
    },

    // Новичок | Кордон
    yantar_fragments: {
        name: 'Фрагменты «Янтаря»',
        nameEn: 'Yantar Fragments',
        rank: 'novice'
    },
    mutated_growth: {
        name: 'Мутировавший нарост',
        nameEn: 'Mutated Growth',
        rank: 'novice'
    },
    plantain: {
        name: '«Подорожник»',
        nameEn: 'Plantain',
        rank: 'novice'
    },

    // Сталкер | Кордон
    hazy_pollen: {
        name: 'Мглистая пыльца',
        nameEn: 'Hazy Pollen',
        rank: 'stalker'
    },
    rad_mutagen_sample: {
        name: 'Радиационно-мутагенный образец',
        nameEn: 'Radiation-Mutagen Sample',
        rank: 'stalker'
    },
    anoplast: {
        name: 'Анопласт',
        nameEn: 'Anoplast',
        rank: 'stalker'
    },
    bergman_meter: {
        name: 'Измеритель «Бергмана»',
        nameEn: 'Bergman Meter',
        rank: 'stalker'
    },

    // Бывалый | Бар
    anomaly_detector: {
        name: 'Датчик аномальной активности',
        nameEn: 'Anomaly Activity Detector',
        rank: 'experienced'
    },
    regenerating_fabric: {
        name: 'Регенерирующая ткань',
        nameEn: 'Regenerating Fabric',
        rank: 'experienced'
    },
    bioferrite_core: {
        name: 'Биоферитовый сердечник',
        nameEn: 'Bioferrite Core',
        rank: 'experienced'
    },
    old_scheme: {
        name: 'Старая схема',
        nameEn: 'Old Scheme',
        rank: 'experienced'
    },

    // Ветеран | Бар
    anomaly_filter: {
        name: 'Аномальный «Фильтр»',
        nameEn: 'Anomaly Filter',
        rank: 'veteran'
    },
    chitin_plate: {
        name: 'Хитиновая пластина',
        nameEn: 'Chitin Plate',
        rank: 'veteran'
    },
    carbon_fiber: {
        name: 'Углестекловолокно',
        nameEn: 'Carbon Fiber',
        rank: 'veteran'
    },
    converter: {
        name: '«Преобразователь»',
        nameEn: 'Converter',
        rank: 'veteran'
    },

    // Профессионал / Мастер | Север
    dark_pass: {
        name: 'Тёмный пропуск',
        nameEn: 'Dark Pass',
        rank: 'professional'
    },
    anomaly_glass: {
        name: 'Аномальное стекло',
        nameEn: 'Anomaly Glass',
        rank: 'professional'
    },
    storm_shard: {
        name: 'Осколок бури',
        nameEn: 'Storm Shard',
        rank: 'professional'
    },
    crystal_bud: {
        name: 'Кристальный бутон',
        nameEn: 'Crystal Bud',
        rank: 'professional'
    },
    stuzha: {
        name: 'Стужа',
        nameEn: 'Stuzha',
        rank: 'professional'
    },
    homemade_thermoplast: {
        name: 'Кустарный термопласт',
        nameEn: 'Homemade Thermoplast',
        rank: 'professional'
    },
    alpha_substance_container: {
        name: 'Контейнер с Альфа-веществом',
        nameEn: 'Alpha Substance Container',
        rank: 'professional'
    },
    frost_beacon: {
        name: 'Морозоустойчивый радиомаячок',
        nameEn: 'Frost-Resistant Radio Beacon',
        rank: 'professional'
    }
};

const BARTER_RANKS = {
    lockpick: { name: 'Отмычка', nameEn: 'Lockpick' },
    novice: { name: 'Новичок', nameEn: 'Novice' },
    stalker: { name: 'Сталкер', nameEn: 'Stalker' },
    experienced: { name: 'Бывалый', nameEn: 'Experienced' },
    veteran: { name: 'Ветеран', nameEn: 'Veteran' },
    expert: { name: 'Эксперт', nameEn: 'Expert' },
    professional: { name: 'Профессионал', nameEn: 'Professional' },
    master: { name: 'Мастер', nameEn: 'Master' },
    legend: { name: 'Легенда', nameEn: 'Legend' }
};

const BARTER_LOCATIONS = {
    rostok: { name: 'Росстань', nameEn: 'Rostok' },
    cordon: { name: 'Кордон', nameEn: 'Cordon' },
    bar: { name: 'Бар', nameEn: 'Bar' },
    north: { name: 'Север', nameEn: 'North' }
};

const BARTER_RESOURCE_TIERS = {
    lockpick: { rank: 'lockpick', location: 'rostok', materialIds: ['mandrake_root', 'mutated_tissue_sample'] },
    novice: { rank: 'novice', location: 'cordon', materialIds: ['yantar_fragments', 'mutated_growth', 'plantain'] },
    stalker: { rank: 'stalker', location: 'cordon', materialIds: ['hazy_pollen', 'rad_mutagen_sample', 'anoplast', 'bergman_meter'] },
    experienced: { rank: 'experienced', location: 'bar', materialIds: ['anomaly_detector', 'regenerating_fabric', 'bioferrite_core', 'old_scheme'] },
    veteran: { rank: 'veteran', location: 'bar', materialIds: ['anomaly_filter', 'chitin_plate', 'carbon_fiber', 'converter'] },
    expert: { rank: 'expert', location: 'north', materialIds: [], available: false },
    professional: {
        rank: 'professional',
        location: 'north',
        materialIds: [
            'dark_pass', 'anomaly_glass', 'storm_shard', 'crystal_bud',
            'stuzha', 'homemade_thermoplast', 'alpha_substance_container', 'frost_beacon'
        ]
    },
    master: {
        rank: 'master',
        location: 'north',
        materialIds: [
            'dark_pass', 'anomaly_glass', 'storm_shard', 'crystal_bud',
            'stuzha', 'homemade_thermoplast', 'alpha_substance_container', 'frost_beacon'
        ]
    },
    legend: { rank: 'legend', location: 'north', materialIds: [], available: false }
};

const BARTER_CATEGORIES = [
    {
        id: 'weapons_assault',
        name: 'Оружие/Автоматы',
        nameEn: 'Weapons/Assault Rifles',
        columns: [
            { rank: 'lockpick', location: 'rostok' },
            { rank: 'novice', location: 'cordon' },
            { rank: 'stalker', location: 'cordon' },
            { rank: 'experienced', location: 'bar' },
            { rank: 'veteran', location: 'bar' },
            { rank: 'expert', location: 'north' },
            { rank: 'professional', location: 'north' }
        ],
        nodes: [
            {
                id: 'aks74u',
                weaponId: 'aks74u',
                column: 0,
                row: 3,
                rank: 'lockpick',
                parents: [],
                materials: [
                    { id: 'mandrake_root', amount: 32 },
                    { id: 'mutated_tissue_sample', amount: 19 }
                ],
                cost: 7890,
                level: 6,
                location: 'rostok'
            },
            {
                id: 'aks74',
                weaponId: 'aks74',
                column: 1,
                row: 3,
                rank: 'novice',
                parents: ['aks74u'],
                location: 'cordon',
                offers: [
                    {
                        id: 'offer_1',
                        name: 'Предложение #1',
                        nameEn: 'Offer #1',
                        prerequisite: 'aks74u',
                        materials: [
                            { id: 'yantar_fragments', amount: 31 },
                            { id: 'mutated_growth', amount: 29 },
                            { id: 'plantain', amount: 7 }
                        ],
                        cost: 12340,
                        level: 10,
                        location: 'cordon',
                        usesChain: true
                    },
                    {
                        id: 'offer_2',
                        name: 'Предложение #2',
                        nameEn: 'Offer #2',
                        materials: [
                            { id: 'yantar_fragments', amount: 42 },
                            { id: 'mutated_growth', amount: 36 },
                            { id: 'plantain', amount: 9 }
                        ],
                        cost: 15340,
                        level: 10,
                        location: 'cordon',
                        usesChain: false
                    }
                ]
            },
            {
                id: 'akm',
                weaponId: 'akm',
                column: 2,
                row: 2,
                rank: 'stalker',
                parents: ['aks74'],
                prerequisite: 'aks74',
                materials: [
                    { id: 'hazy_pollen', amount: 98 },
                    { id: 'rad_mutagen_sample', amount: 85 },
                    { id: 'anoplast', amount: 26 },
                    { id: 'bergman_meter', amount: 4 }
                ],
                cost: 60200,
                level: 15,
                location: 'cordon'
            },
            {
                id: 'ak74m',
                weaponId: 'ak74m',
                column: 2,
                row: 3,
                rank: 'stalker',
                parents: ['aks74'],
                prerequisite: 'aks74',
                materials: [
                    { id: 'hazy_pollen', amount: 105 },
                    { id: 'rad_mutagen_sample', amount: 95 },
                    { id: 'anoplast', amount: 22 },
                    { id: 'bergman_meter', amount: 3 }
                ],
                cost: 56840,
                level: 15,
                location: 'cordon'
            },
            {
                id: 'm16a2',
                weaponId: 'm16a2',
                column: 0,
                row: 6,
                rank: 'lockpick',
                parents: [],
                materials: [
                    { id: 'mandrake_root', amount: 36 },
                    { id: 'mutated_tissue_sample', amount: 16 }
                ],
                cost: 8200,
                level: 7,
                location: 'rostok'
            },
            {
                id: 'm4a1',
                weaponId: 'm4a1',
                column: 1,
                row: 6,
                rank: 'novice',
                parents: ['m16a2'],
                location: 'cordon',
                offers: [
                    {
                        id: 'offer_1',
                        name: 'Предложение #1',
                        nameEn: 'Offer #1',
                        prerequisite: 'm16a2',
                        materials: [
                            { id: 'yantar_fragments', amount: 33 },
                            { id: 'mutated_growth', amount: 28 },
                            { id: 'plantain', amount: 8 }
                        ],
                        cost: 14340,
                        level: 10,
                        location: 'cordon',
                        usesChain: true
                    },
                    {
                        id: 'offer_2',
                        name: 'Предложение #2',
                        nameEn: 'Offer #2',
                        materials: [
                            { id: 'yantar_fragments', amount: 39 },
                            { id: 'mutated_growth', amount: 40 },
                            { id: 'plantain', amount: 10 }
                        ],
                        cost: 17340,
                        level: 10,
                        location: 'cordon',
                        usesChain: false
                    }
                ]
            },
            {
                id: 'l85a1',
                weaponId: 'l85a1',
                column: 1,
                row: 7,
                rank: 'novice',
                parents: ['m16a2'],
                location: 'cordon',
                offers: [
                    {
                        id: 'offer_1',
                        name: 'Предложение #1',
                        nameEn: 'Offer #1',
                        prerequisite: 'm16a2',
                        materials: [
                            { id: 'yantar_fragments', amount: 32 },
                            { id: 'mutated_growth', amount: 29 },
                            { id: 'plantain', amount: 7 }
                        ],
                        cost: 16720,
                        level: 10,
                        location: 'cordon',
                        usesChain: true
                    },
                    {
                        id: 'offer_2',
                        name: 'Предложение #2',
                        nameEn: 'Offer #2',
                        materials: [
                            { id: 'yantar_fragments', amount: 39 },
                            { id: 'mutated_growth', amount: 41 },
                            { id: 'plantain', amount: 10 }
                        ],
                        cost: 19720,
                        level: 10,
                        location: 'cordon',
                        usesChain: false
                    }
                ]
            },
            {
                id: 'm16a4',
                weaponId: 'm16a4',
                column: 2,
                row: 6,
                rank: 'stalker',
                parents: ['m4a1'],
                prerequisite: 'm4a1',
                materials: [
                    { id: 'hazy_pollen', amount: 95 },
                    { id: 'rad_mutagen_sample', amount: 85 },
                    { id: 'anoplast', amount: 31 },
                    { id: 'bergman_meter', amount: 4 }
                ],
                cost: 55340,
                level: 15,
                location: 'cordon'
            },
            {
                id: 'sig_sg550',
                weaponId: 'sig_sg550',
                column: 2,
                row: 7,
                rank: 'stalker',
                parents: ['l85a1'],
                prerequisite: 'l85a1',
                materials: [
                    { id: 'hazy_pollen', amount: 93 },
                    { id: 'rad_mutagen_sample', amount: 90 },
                    { id: 'anoplast', amount: 28 },
                    { id: 'bergman_meter', amount: 3 }
                ],
                cost: 52720,
                level: 15,
                location: 'cordon'
            },
            {
                id: 'm4',
                weaponId: 'm4',
                column: 3,
                row: 6,
                rank: 'experienced',
                parents: ['m16a4'],
                prerequisite: 'm16a4',
                materials: [
                    { id: 'anomaly_detector', amount: 185 },
                    { id: 'regenerating_fabric', amount: 175 },
                    { id: 'bioferrite_core', amount: 61 },
                    { id: 'old_scheme', amount: 16 }
                ],
                cost: 264700,
                level: 25,
                location: 'bar'
            },
            {
                id: 'ak103',
                weaponId: 'ak103',
                column: 3,
                row: 2,
                rank: 'experienced',
                parents: ['akm'],
                prerequisite: 'akm',
                materials: [
                    { id: 'anomaly_detector', amount: 163 },
                    { id: 'regenerating_fabric', amount: 130 },
                    { id: 'bioferrite_core', amount: 64 },
                    { id: 'old_scheme', amount: 18 }
                ],
                cost: 302500,
                level: 25,
                location: 'bar'
            },
            {
                id: 'an94_abakan',
                weaponId: 'an94_abakan',
                column: 3,
                row: 3,
                rank: 'experienced',
                parents: ['ak74m'],
                prerequisite: 'ak74m',
                materials: [
                    { id: 'anomaly_detector', amount: 170 },
                    { id: 'regenerating_fabric', amount: 125 },
                    { id: 'bioferrite_core', amount: 56 },
                    { id: 'old_scheme', amount: 15 }
                ],
                cost: 245120,
                level: 25,
                location: 'bar'
            },
            {
                id: 'as_val',
                weaponId: 'as_val',
                column: 4,
                row: 4,
                rank: 'veteran',
                parents: ['an94_abakan'],
                prerequisite: 'an94_abakan',
                materials: [
                    { id: 'anomaly_filter', amount: 265 },
                    { id: 'chitin_plate', amount: 245 },
                    { id: 'carbon_fiber', amount: 295 },
                    { id: 'converter', amount: 70 }
                ],
                cost: 1020000,
                level: 30,
                location: 'bar'
            },
            {
                id: 'ots14_groza',
                weaponId: 'ots14_groza',
                column: 4,
                row: 5,
                rank: 'veteran',
                parents: ['an94_abakan'],
                prerequisite: 'an94_abakan',
                materials: [
                    { id: 'anomaly_filter', amount: 245 },
                    { id: 'chitin_plate', amount: 295 },
                    { id: 'carbon_fiber', amount: 205 },
                    { id: 'converter', amount: 60 }
                ],
                cost: 864000,
                level: 30,
                location: 'bar'
            },
            {
                id: 'fn_f2000',
                weaponId: 'fn_f2000',
                column: 4,
                row: 6,
                rank: 'veteran',
                parents: ['m4'],
                prerequisite: 'm4',
                materials: [
                    { id: 'anomaly_filter', amount: 225 },
                    { id: 'chitin_plate', amount: 275 },
                    { id: 'carbon_fiber', amount: 190 },
                    { id: 'converter', amount: 73 }
                ],
                cost: 1012000,
                level: 30,
                location: 'bar'
            },
            {
                id: 'hk_g36',
                weaponId: 'hk_g36',
                column: 4,
                row: 7,
                rank: 'veteran',
                parents: ['sig_sg550'],
                prerequisite: 'sig_sg550',
                materials: [
                    { id: 'anomaly_filter', amount: 315 },
                    { id: 'chitin_plate', amount: 255 },
                    { id: 'carbon_fiber', amount: 225 },
                    { id: 'converter', amount: 71 }
                ],
                cost: 972000,
                level: 30,
                location: 'bar'
            },
            {
                id: 'aek971',
                weaponId: 'aek971',
                column: 5,
                row: 3,
                rank: 'expert',
                parents: ['an94_abakan'],
                prerequisite: 'ak105',
                materials: [],
                cost: 0,
                level: 32,
                location: 'north',
                locked: true
            },
            {
                id: 'hk_g3a3',
                weaponId: 'hk_g3a3',
                column: 5,
                row: 2,
                rank: 'expert',
                parents: ['ak103'],
                prerequisite: 'fn_fal',
                materials: [],
                cost: 0,
                level: 35,
                location: 'north',
                locked: true
            },
            {
                id: 'ash12',
                weaponId: 'ash12',
                column: 5,
                row: 5,
                rank: 'expert',
                parents: ['ots14_groza'],
                prerequisite: 'vsk94',
                materials: [],
                cost: 0,
                level: 36,
                location: 'north',
                locked: true
            },
            {
                id: 'fn_f2000_tactical',
                weaponId: 'fn_f2000_tactical',
                column: 5,
                row: 6,
                rank: 'expert',
                parents: ['fn_f2000', 'hk_g36'],
                prerequisite: 'fn_f2000',
                materials: [],
                cost: 0,
                level: 34,
                location: 'north',
                locked: true
            },
            {
                id: 'galil_ace_51',
                weaponId: 'galil_ace_51',
                column: 6,
                row: 2,
                rank: 'professional',
                parents: [],
                prerequisite: 'hk417',
                materials: [
                    { id: 'dark_pass', amount: 2100 },
                    { id: 'anomaly_glass', amount: 42 },
                    { id: 'storm_shard', amount: 26 },
                    { id: 'crystal_bud', amount: 8 },
                    { id: 'stuzha', amount: 5 },
                    { id: 'homemade_thermoplast', amount: 20 },
                    { id: 'alpha_substance_container', amount: 10 },
                    { id: 'frost_beacon', amount: 4 }
                ],
                cost: 0,
                eventCost: 250000,
                level: 25,
                location: 'north'
            },
            {
                id: 'fn_fnc',
                weaponId: 'fn_fnc',
                column: 6,
                row: 4,
                rank: 'professional',
                parents: [],
                prerequisite: 'sig_sg550',
                materials: [
                    { id: 'dark_pass', amount: 2100 },
                    { id: 'anomaly_glass', amount: 42 },
                    { id: 'storm_shard', amount: 26 },
                    { id: 'crystal_bud', amount: 8 },
                    { id: 'stuzha', amount: 5 },
                    { id: 'homemade_thermoplast', amount: 20 },
                    { id: 'alpha_substance_container', amount: 10 },
                    { id: 'frost_beacon', amount: 4 }
                ],
                cost: 0,
                eventCost: 250000,
                level: 25,
                location: 'north'
            }
        ]
    }
];

function getBarterMaterialName(material) {
    if (!material) return '';
    return getLocalizedField(material, 'name');
}

function getBarterMaterialImagePath(materialId, basePath = '../') {
    return getMaterialImagePath(materialId, null, basePath);
}

function getBarterRankName(rank) {
    const entry = BARTER_RANKS[rank];
    return entry ? getLocalizedField(entry, 'name') : rank;
}

function getBarterLocationName(location) {
    const entry = BARTER_LOCATIONS[location];
    return entry ? getLocalizedField(entry, 'name') : location;
}

function getBarterCategoryName(category) {
    return category ? getLocalizedField(category, 'name') : '';
}

function getBarterResourceTier(rank) {
    return BARTER_RESOURCE_TIERS[rank] || null;
}

function getBarterMaterialsForRank(rank) {
    const tier = getBarterResourceTier(rank);
    if (!tier) return [];
    return tier.materialIds.map(id => BARTER_MATERIALS[id]).filter(Boolean);
}

function getBarterCategoryById(categoryId) {
    return BARTER_CATEGORIES.find(category => category.id === categoryId) || null;
}

function getBarterNodeById(category, nodeId) {
    if (!category) return null;
    return category.nodes.find(node => node.id === nodeId) || null;
}

function getBarterWeapon(node, basePath = '../') {
    if (!node?.weaponId || typeof WEAPONS === 'undefined') return null;
    const weapon = WEAPONS.find(item => item.id === node.weaponId);
    if (!weapon) return null;
    return {
        ...weapon,
        imagePath: getWeaponImagePath(weapon, basePath)
    };
}

function getBarterPrerequisiteWeapon(prerequisiteId, basePath = '../') {
    if (!prerequisiteId || typeof WEAPONS === 'undefined') return null;
    const weapon = WEAPONS.find(item => item.id === prerequisiteId);
    if (!weapon) return null;
    return {
        ...weapon,
        imagePath: getWeaponImagePath(weapon, basePath)
    };
}

function getBarterTreeAncestors(category, nodeId) {
    const node = getBarterNodeById(category, nodeId);
    if (!node) return [];

    const ancestors = [];
    const visited = new Set();
    const queue = [...(node.parents || [])];

    while (queue.length) {
        const parentId = queue.shift();
        if (visited.has(parentId)) continue;
        visited.add(parentId);

        const parentNode = getBarterNodeById(category, parentId);
        if (!parentNode) continue;

        ancestors.push(parentNode);
        if (parentNode.parents?.length) {
            queue.push(...parentNode.parents);
        }
    }

    return ancestors;
}

function getBarterNodeOffers(node) {
    if (!node) return [];
    if (node.offers?.length) return node.offers;

    return [{
        id: 'default',
        prerequisite: node.prerequisite ?? null,
        materials: node.materials || [],
        cost: node.cost || 0,
        eventCost: node.eventCost || 0,
        level: node.level || 0,
        location: node.location,
        usesChain: Boolean(node.prerequisite)
    }];
}

function getBarterOfferByIndex(node, offerIndex = 0) {
    const offers = getBarterNodeOffers(node);
    const index = Math.max(0, Math.min(offerIndex, offers.length - 1));
    return offers[index] || offers[0];
}

function getBarterOfferName(offer, index = 0) {
    if (!offer) return '';
    if (offer.name || offer.nameEn) return getLocalizedField(offer, 'name');
    return `#${index + 1}`;
}

function getNodeRecipeForCalc(node, offerIndex = 0) {
    const offer = getBarterOfferByIndex(node, offerIndex);
    const usesChain = offer.usesChain !== false && Boolean(offer.prerequisite);

    return {
        ...node,
        prerequisite: offer.prerequisite ?? null,
        materials: offer.materials || [],
        cost: offer.cost || 0,
        eventCost: offer.eventCost || 0,
        level: offer.level ?? node.level ?? 0,
        location: offer.location || node.location,
        usesChain
    };
}

function getBarterChainNodes(category, nodeId, includeChain, offerIndex = 0) {
    const node = getBarterNodeById(category, nodeId);
    if (!node) return [];

    const currentRecipe = getNodeRecipeForCalc(node, offerIndex);
    const shouldIncludeAncestors = includeChain && currentRecipe.usesChain;

    if (!shouldIncludeAncestors) return [currentRecipe];

    const ancestors = getBarterTreeAncestors(category, nodeId);
    ancestors.sort((a, b) => a.column - b.column || a.row - b.row);

    return [
        ...ancestors.map(ancestor => getNodeRecipeForCalc(ancestor, 0)),
        currentRecipe
    ];
}

function aggregateBarterMaterials(nodes) {
    const totals = new Map();

    nodes.forEach(node => {
        (node.materials || []).forEach(material => {
            const current = totals.get(material.id) || 0;
            totals.set(material.id, current + material.amount);
        });
    });

    return Array.from(totals.entries()).map(([id, amount]) => ({
        id,
        amount,
        material: BARTER_MATERIALS[id] || { name: id, nameEn: id }
    }));
}

function getBarterNodeRankInfo(node) {
    if (!node) return null;
    const tier = getBarterResourceTier(node.rank);
    return {
        rank: node.rank,
        rankName: getBarterRankName(node.rank),
        location: node.location || tier?.location,
        locationName: getBarterLocationName(node.location || tier?.location)
    };
}

const BARTER_RANK_ORDER = [
    'lockpick', 'novice', 'stalker', 'experienced', 'veteran', 'expert', 'professional', 'master', 'legend'
];

const BARTER_INVENTORY_RANK_ORDER = [
    'veteran', 'experienced', 'stalker', 'novice', 'lockpick'
];

const BARTER_NORTH_TAIL_MATERIAL_IDS = [
    'dark_pass',
    'anomaly_glass',
    'storm_shard',
    'crystal_bud'
];

const BARTER_WINTER_EVENT_MATERIAL_ORDER = [
    'stuzha',
    'homemade_thermoplast',
    'alpha_substance_container',
    'frost_beacon'
];

function getAllBarterMaterialIds() {
    const ids = [];
    const seen = new Set();

    BARTER_RANK_ORDER.forEach(rank => {
        const tier = BARTER_RESOURCE_TIERS[rank];
        if (!tier?.materialIds?.length) return;

        tier.materialIds.forEach(id => {
            if (!seen.has(id)) {
                seen.add(id);
                ids.push(id);
            }
        });
    });

    Object.keys(BARTER_MATERIALS).forEach(id => {
        if (!seen.has(id)) {
            seen.add(id);
            ids.push(id);
        }
    });

    return ids;
}

function getBarterMaterialsGroupedByRank() {
    return BARTER_RANK_ORDER
        .map(rank => {
            const tier = BARTER_RESOURCE_TIERS[rank];
            if (!tier?.materialIds?.length) return null;

            return {
                rank,
                rankName: getBarterRankName(rank),
                locationName: getBarterLocationName(tier.location),
                materials: tier.materialIds.map(id => ({
                    id,
                    material: BARTER_MATERIALS[id]
                })).filter(entry => entry.material)
            };
        })
        .filter(Boolean);
}

function getBarterMaterialsForInventory() {
    const result = [];
    const seen = new Set();

    const pushEntry = (id) => {
        if (seen.has(id)) return;

        const material = BARTER_MATERIALS[id];
        if (!material) return;

        seen.add(id);
        result.push({ id, material });
    };

    BARTER_INVENTORY_RANK_ORDER.forEach(rank => {
        const tier = BARTER_RESOURCE_TIERS[rank];
        if (!tier?.materialIds?.length) return;

        tier.materialIds.forEach(pushEntry);
    });

    BARTER_NORTH_TAIL_MATERIAL_IDS.forEach(pushEntry);
    BARTER_WINTER_EVENT_MATERIAL_ORDER.forEach(pushEntry);

    Object.keys(BARTER_MATERIALS).forEach(pushEntry);

    return result;
}

function calculateAggregatedBarterRequirements(category, selections) {
    if (!category || !selections?.length) return null;

    const weapons = [];
    const allChainNodes = [];
    const prerequisites = [];
    let totalCost = 0;
    let totalEventCost = 0;
    let maxLevel = 0;
    const locations = new Set();

    selections.forEach(selection => {
        const calc = calculateBarterRequirements(
            category,
            selection.nodeId,
            false,
            selection.offerIndex || 0
        );
        if (!calc) return;

        weapons.push(calc);
        allChainNodes.push(...calc.chainNodes);
        prerequisites.push(...calc.prerequisites);
        totalCost += calc.totalCost;
        totalEventCost += calc.totalEventCost;
        maxLevel = Math.max(maxLevel, calc.maxLevel);
        calc.locations.forEach(location => locations.add(location));
    });

    if (!weapons.length) return null;

    return {
        weapons,
        materials: aggregateBarterMaterials(allChainNodes),
        prerequisites: [...new Set(prerequisites)],
        totalCost,
        totalEventCost,
        maxLevel,
        locations: [...locations]
    };
}

function applyInventoryToRequirements(totals, inventory = {}) {
    const materials = (totals.materials || []).map(entry => {
        const have = Math.max(0, Number(inventory.materials?.[entry.id]) || 0);
        const missing = Math.max(0, entry.amount - have);

        return {
            ...entry,
            have,
            missing,
            satisfied: missing === 0
        };
    });

    const playerMoney = Math.max(0, Number(inventory.money) || 0);
    const playerCr = Math.max(0, Number(inventory.cr) || 0);
    const playerLevel = Math.max(0, Number(inventory.level) || 0);

    return {
        materials,
        missingMaterials: materials.filter(entry => entry.missing > 0),
        money: {
            required: totals.totalCost || 0,
            have: playerMoney,
            missing: Math.max(0, (totals.totalCost || 0) - playerMoney)
        },
        cr: {
            required: totals.totalEventCost || 0,
            have: playerCr,
            missing: Math.max(0, (totals.totalEventCost || 0) - playerCr)
        },
        level: {
            required: totals.maxLevel || 0,
            have: playerLevel,
            missing: Math.max(0, (totals.maxLevel || 0) - playerLevel)
        }
    };
}

function applyChainOwnership(chainNodes, ownedThroughNodeId) {
    if (!ownedThroughNodeId || !chainNodes.length) return chainNodes;

    const ownedIndex = chainNodes.findIndex(node => node.id === ownedThroughNodeId);
    if (ownedIndex === -1) return chainNodes;

    return chainNodes.slice(ownedIndex + 1);
}

function calculateBarterRequirements(category, nodeId, includeChain = true, offerIndex = 0, ownedThroughNodeId = null) {
    const node = getBarterNodeById(category, nodeId);
    if (!node) return null;

    const offers = getBarterNodeOffers(node);
    const offer = getBarterOfferByIndex(node, offerIndex);
    const fullChainNodes = getBarterChainNodes(category, nodeId, includeChain, offerIndex);
    const chainNodes = applyChainOwnership(fullChainNodes, ownedThroughNodeId);
    const prerequisites = includeChain && fullChainNodes.length > 1
        ? fullChainNodes.slice(0, -1).map(chainNode => chainNode.weaponId || chainNode.id)
        : (offer.prerequisite ? [offer.prerequisite] : []);

    const uniquePrerequisites = [...new Set(prerequisites)];

    return {
        node,
        offer,
        offerIndex,
        offers,
        usesChain: offer.usesChain !== false && Boolean(offer.prerequisite),
        fullChainNodes,
        chainNodes,
        ownedThroughNodeId: ownedThroughNodeId || null,
        prerequisites: uniquePrerequisites,
        materials: aggregateBarterMaterials(chainNodes),
        materialsByNode: chainNodes.map(chainNode => ({
            node: chainNode,
            rankInfo: getBarterNodeRankInfo(chainNode),
            materials: (chainNode.materials || []).map(entry => ({
                ...entry,
                material: BARTER_MATERIALS[entry.id] || { name: entry.id, nameEn: entry.id }
            }))
        })),
        totalCost: chainNodes.reduce((sum, chainNode) => sum + (chainNode.cost || 0), 0),
        totalEventCost: chainNodes.reduce((sum, chainNode) => sum + (chainNode.eventCost || 0), 0),
        maxLevel: chainNodes.reduce((max, chainNode) => Math.max(max, chainNode.level || 0), 0),
        locations: [...new Set(chainNodes.map(chainNode => chainNode.location).filter(Boolean))]
    };
}
