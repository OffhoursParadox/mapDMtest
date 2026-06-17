// mapData.js
// ============================================================
// ДАННЫЕ МАРКЕРОВ - Project Cataclysm Map
// ============================================================

const MAP_CONFIG_DATA = {
    width: 11264,
    height: 16896
};

// Правильная формула конвертации (калибровка по реальной точке)
function convertCoords(oldY, oldX) {
    const newX = Math.round(oldX * 2.0);
    const newY = Math.round(MAP_CONFIG_DATA.height - (oldY * 2.0));
    return [newY, newX];
}

// ============================================================
// ИЗОБРАЖЕНИЯ НАГРАД (лут)
// ============================================================
const REWARD_ICONS = {
    anomaly_filter: { icon: 'images/rewards/anomaly_filter.png', name: { ru: 'Аномальный фильтр', en: 'Anomaly Filter' } },
    black_box: { icon: 'images/rewards/black_box.png', name: { ru: 'Черный ящик', en: 'Black Box' } },
    converter: { icon: 'images/rewards/converter.png', name: { ru: 'Преобразователь', en: 'Converter' } },
    titanium_frame: { icon: 'images/rewards/titanium_frame.png', name: { ru: 'Титановый каркас', en: 'Titanium Frame' } },
    advanced_upgrade_tools: { icon: 'images/rewards/advanced_upgrade_tools.png', name: { ru: 'Инструменты улучшения экипировки (продвинутые)', en: 'Advanced Equipment Upgrade Tools' } },
    spare_parts: { icon: 'images/rewards/spare_parts.png', name: { ru: 'Запасные детали для улучшения экипировки', en: 'Spare Parts for Equipment Upgrade' } },
    anomaly_detector: { icon: 'images/rewards/anomaly_detector.png', name: { ru: 'Датчик аномальной активности', en: 'Anomaly Activity Detector' } },
    basic_upgrade_tools: { icon: 'images/rewards/basic_upgrade_tools.png', name: { ru: 'Инструменты улучшения экипировки (базовые)', en: 'Basic Equipment Upgrade Tools' } },
    basic_armor_kit: { icon: 'images/rewards/basic_armor_kit.png', name: { ru: 'Ремнабор с компонентами брони (базовый)', en: 'Basic Armor Component Repair Kit' } },
    advanced_armor_kit: { icon: 'images/rewards/advanced_armor_kit.png', name: { ru: 'Ремнабор с компонентами брони (продвинутый)', en: 'Advanced Armor Component Repair Kit' } },
    compromat_flash: { icon: 'images/rewards/compromat_flash.png', name: { ru: 'Флешка с компроматом', en: 'Flash Drive with Compromat' } },
    coded_notebook: { icon: 'images/rewards/coded_notebook.png', name: { ru: 'Кодированный блокнот', en: 'Coded Notebook' } },
    large_battery: { icon: 'images/rewards/large_battery.png', name: { ru: 'Большая батарея', en: 'Large Battery' } },
    prima_cigarettes: { icon: 'images/rewards/prima_cigarettes.png', name: { ru: 'Пачка сигарет "Прима"', en: '"Prima" Cigarettes Pack' } },
    lead: { icon: 'images/rewards/lead.png', name: { ru: 'Свинец', en: 'Lead' } },
    vodka_kazaki: { icon: 'images/rewards/vodka_kazaki.png', name: { ru: 'Водка "Казаки"', en: '"Cossacks" Vodka' } },
    makarov_pistol: { icon: 'images/rewards/makarov.png', name: { ru: 'Пистолет Макарова', en: 'Makarov Pistol' } },
    ammo_9x18: { icon: 'images/rewards/ammo_9x18.png', name: { ru: 'Патроны 9x18 мм П', en: '9x18 mm PM Ammo' } },
    vitamins: { icon: 'images/rewards/vitamins.png', name: { ru: 'Поливитамины', en: 'Multivitamins' } },
    cheese_yantar: { icon: 'images/rewards/cheese_yantar.png', name: { ru: 'Плавленный сыр "Янтарь"', en: '"Yantar" Processed Cheese' } },
    snork_leg: { icon: 'images/rewards/snork_leg.png', name: { ru: 'Нога снорка', en: 'Snork Leg' } },
    beer_slavutich: { icon: 'images/rewards/beer_slavutich.png', name: { ru: 'Пиво "Славутич"', en: '"Slavutich" Beer' } },
    bandage: { icon: 'images/rewards/bandage.png', name: { ru: 'Бинт', en: 'Bandage' } },
    blind_dog_heart: { icon: 'images/rewards/blind_dog_heart.png', name: { ru: 'Сердце слепого пса', en: 'Blind Dog Heart' } },
    mercenary_patch: { icon: 'images/rewards/mercenary_patch.png', name: { ru: "Нашивка 'Наемников'", en: 'Mercenary Patch' } },
    psy_blockade: { icon: 'images/rewards/psy_blockade.png', name: { ru: 'Пси-блокада', en: 'Psy-blockade' } },
    condensed_milk: { icon: 'images/rewards/condensed_milk.png', name: { ru: 'Сгущенное молоко', en: 'Condensed Milk' } },
    mre_b: { icon: 'images/rewards/mre_b.png', name: { ru: 'Сухой паёк ИРП-Б', en: 'MRE-B' } },
    bandit_token: { icon: 'images/rewards/bandit_token.png', name: { ru: 'Бандитский жетон', en: 'Bandit Token' } },
    stash_pda: { icon: 'images/rewards/stash_pda.png', name: { ru: 'КПК с координатами общака', en: 'PDA with Stash Coordinates' } },
    zombie_hand: { icon: 'images/rewards/zombie_hand.png', name: { ru: 'Рука зомби', en: 'Zombie Hand' } },
    controller_hand: { icon: 'images/rewards/controller_hand.png', name: { ru: 'Рука контролёра', en: 'Controller Hand' } },
    toy_airplane: { icon: 'images/rewards/toy_airplane.png', name: { ru: 'Игрушечный самолет', en: 'Toy Airplane' } },
    snork_hand: { icon: 'images/rewards/snork_hand.png', name: { ru: 'Рука снорка', en: 'Snork Hand' } },
    toy_car: { icon: 'images/rewards/toy_car.png', name: { ru: 'Игрушечная машина', en: 'Toy Car' } },
    toy_doll: { icon: 'images/rewards/toy_doll.png', name: { ru: 'Игрушечная кукла', en: 'Toy Doll' } },
    hazy_pollen: { icon: 'images/rewards/hazy_pollen.png', name: { ru: 'Мглистая пыльца', en: 'Hazy Pollen' } },
    ammo_9x39_sp6: { icon: 'images/rewards/ammo_9x39_sp6.png', name: { ru: 'Патроны 9x39 мм СП-6', en: '9x39 mm SP-6 Ammo' } },
    medkit: { icon: 'images/rewards/medkit.png', name: { ru: 'Индивидуальная аптечка', en: 'Individual First Aid Kit' } },
    tourist_breakfast: { icon: 'images/rewards/tourist_breakfast.png', name: { ru: 'Консервы "Завтрак туриста"', en: '"Tourist\'s Breakfast" Canned Food' } },
    morphine: { icon: 'images/rewards/morphine.png', name: { ru: 'Морфин', en: 'Morphine' } },
    ammo_45_acp: { icon: 'images/rewards/ammo_45_acp.png', name: { ru: 'Патроны .45 ACP', en: '.45 ACP Ammo' } },
    belomorkanal: { icon: 'images/rewards/belomorkanal.png', name: { ru: 'Пачка сигарет "Беломорканал"', en: '"Belomorkanal" Cigarettes' } },
    tarpaulin: { icon: 'images/rewards/tarpaulin.png', name: { ru: 'Брезент', en: 'Tarpaulin' } },
    servomotors: { icon: 'images/rewards/servomotors.png', name: { ru: 'Сервоприводы', en: 'Servomotors' } },
    yantar_fragments: { icon: 'images/rewards/yantar_fragments.png', name: { ru: 'Фрагменты "Янтаря"', en: 'Yantar Fragments' } },
    rubles_1000: { icon: 'images/rewards/rubles.png', name: { ru: '1 000 рублей', en: '1,000 rubles' } },
    antirad: { icon: 'images/rewards/antirad.png', name: { ru: 'Противорадиационные препараты', en: 'Anti-radiation drugs' } },
    radioprotector: { icon: 'images/rewards/radioprotector.png', name: { ru: 'Радиопротектор', en: 'Radioprotector' } },
    pork_stew: { icon: 'images/rewards/pork_stew.png', name: { ru: 'Тушёнка из свинины', en: 'Pork Stew' } },
    energy_drink: { icon: 'images/rewards/energy_drink.png', name: { ru: 'Энергетический напиток "S.T.A.L.K.E.R"', en: '"S.T.A.L.K.E.R" Energy Drink' } },
    mandrake_root: { icon: 'images/rewards/mandrake_root.png', name: { ru: 'Корень Мандрагоры', en: 'Mandrake Root' } },
    mutated_tissue_sample: { icon: 'images/rewards/mutated_tissue_sample.png', name: { ru: 'Мутировавший образец ткани', en: 'Mutated Tissue Sample' } },
    scan_flash_drive: { icon: 'images/rewards/scan_flash_drive.png', name: { ru: 'Флеш-диск с результатами сканирования', en: 'Scan Results Flash Drive' } },
    expedition_reports_disk: { icon: 'images/rewards/expedition_reports_disk.png', name: { ru: 'Диск с отчётами экспедиции', en: 'Expedition Reports Disk' } },
    ammo_12x70: { icon: 'images/rewards/ammo_12x70.png', name: { ru: 'Патроны 12x70 Дробь', en: '12x70 Shotgun Shells' } },
    bread: { icon: 'images/rewards/bread.png', name: { ru: 'Хлеб', en: 'Bread' } },
    ammo_5_45x39_ps: { icon: 'images/rewards/ammo_5_45x39.png', name: { ru: 'Патроны 5,45x39 мм ПС', en: '5.45x39 mm PS Ammo' } },
    medkit_army: { icon: 'images/rewards/medkit_army.png', name: { ru: 'Армейская аптечка', en: 'Army First Aid Kit' } },
    stone_blood: { icon: 'images/rewards/stone_blood.png', name: { ru: 'Кровь камня', en: 'Stone Blood' } },
    medkit_science: { icon: 'images/rewards/medkit_science.png', name: { ru: 'Научная аптечка', en: 'Scientific First Aid Kit' } },
    hercules: { icon: 'images/rewards/hercules.png', name: { ru: 'Геркулес', en: 'Hercules' } },
        sparkler: { icon: 'images/rewards/sparkler.png', name: { ru: 'Бенгальский огонь', en: 'Sparkler' } },
    old_bread: { icon: 'images/rewards/old_bread.png', name: { ru: 'Старый хлеб', en: 'Old Bread' } },
    glucose_injection: { icon: 'images/rewards/glucose_injection.png', name: { ru: 'Инъекция глюкозы', en: 'Glucose Injection' } },
    ammo_9x19_ps: { icon: 'images/rewards/ammo_9x19_ps.png', name: { ru: 'Патроны 9x19 мм ПС', en: '9x19 mm PS Ammo' } },
    practical_sausage: { icon: 'images/rewards/practical_sausage.png', name: { ru: 'Колбаса "Практическая"', en: '"Practical" Sausage' } },
    grenade_f1: { icon: 'images/rewards/grenade_f1.png', name: { ru: 'Граната Ф-1', en: 'F-1 Grenade' } },
    slime: { icon: 'images/rewards/slime.png', name: { ru: 'Слизь', en: 'Slime' } },
    blind_dog_tail: { icon: 'images/rewards/blind_dog_tail.png', name: { ru: 'Хвост слепого пса', en: 'Blind Dog Tail' } },
    ammo_12x70_buckshot: { icon: 'images/rewards/ammo_12x70.png', name: { ru: 'Патроны 12x70 Картечь', en: '12x70 Buckshot' } },
    adrenaline: { icon: 'images/rewards/adrenaline.png', name: { ru: 'Адреналин', en: 'Adrenaline' } },
    copper_wire_coil: { icon: 'images/rewards/copper_wire_coil.png', name: { ru: 'Моток медной проволоки', en: 'Coil of Copper Wire' } },
    flash: { icon: 'images/rewards/flash.png', name: { ru: 'Вспышка', en: 'Flash' } },
    table_clock: { icon: 'images/rewards/table_clock.png', name: { ru: 'Настольные часы', en: 'Table Clock' } },
    thorn: { icon: 'images/rewards/thorn.png', name: { ru: 'Колючка', en: 'Thorn' } },
    solder: { icon: 'images/rewards/solder.png', name: { ru: 'Припой', en: 'Solder' } },
    kevlar_tape: { icon: 'images/rewards/kevlar_tape.png', name: { ru: 'Кевларовая лента', en: 'Kevlar Tape' } },
};

// ============================================================
// ВСЕ МАРКЕРЫ
// ============================================================

const MARKERS_DATA = {

    // ==================== АСТРОЛИТ: КАТАЛИЗАТОРЫ ====================
    catalyst: [
        // Армейские склады
        { coords: convertCoords(3596, 2573), desc: "Катализатор" },
        { coords: convertCoords(3768, 3157), desc: "Катализатор" },
        { coords: convertCoords(3551, 2639), desc: "Катализатор" },
        { coords: convertCoords(3664, 2981), desc: "Катализатор" },
        { coords: convertCoords(3744, 2929), desc: "Катализатор" },
        { coords: convertCoords(3656, 3050), desc: "Катализатор" },
        { coords: convertCoords(3635, 2736), desc: "Катализатор" },
        { coords: convertCoords(3409, 2395), desc: "Катализатор" },
        { coords: convertCoords(3605, 3149), desc: "Катализатор" },
        { coords: convertCoords(3512, 3028), desc: "Катализатор" },
        { coords: convertCoords(3538, 2418), desc: "Катализатор" },
        { coords: convertCoords(3518, 2956), desc: "Катализатор" },
        { coords: convertCoords(3545, 2857), desc: "Катализатор" },
        // Муравейник
        { coords: convertCoords(2933, 3381), desc: "Координаты: 107, 82, -4331" },
        { coords: convertCoords(2825, 3404), desc: "Координаты: 151, 96, -4114" },
        { coords: convertCoords(2953, 3405), desc: "Координаты: 155, 98, -4369" },
        { coords: convertCoords(2957, 3210), desc: "Координаты: -236, 85, -4378" },
        { coords: convertCoords(2772, 3243), desc: "Координаты: -170, 79, -4008" },
        // Полесское
        { coords: convertCoords(3229, 2834), desc: "Координаты: -988, 77, -4921" },
        { coords: convertCoords(3145, 2813), desc: "Координаты: -1029, 73, -4753" },
        { coords: convertCoords(3300, 2775), desc: "Координаты: -1105, 84, -5063" },
        { coords: convertCoords(3298, 2685), desc: "Координаты: -1287, 86, -5060" },
        { coords: convertCoords(3353, 2535), desc: "Координаты: -1587, 85, -5170" },
        { coords: convertCoords(3088, 2744), desc: "Координаты: -1169, 76, -4640" },
        { coords: convertCoords(3369, 2801), desc: "Координаты: -1053, 84, -5202" },
        { coords: convertCoords(2990, 2806), desc: "Координаты: -1044, 81, -4444" },
        { coords: convertCoords(3082, 2673), desc: "Координаты: -1310, 75, -4627" },
        { coords: convertCoords(3344, 2614), desc: "Координаты: -1428, 84, -5153" },
        { coords: convertCoords(3353, 2685), desc: "Координаты: -1287, 75, -5170" },
        // Поляна
        { coords: convertCoords(3001, 2342), desc: "Координаты: -1972, 80, -4466" },
        { coords: convertCoords(3143, 2452), desc: "Координаты: -1752, 87, -4751" },
        { coords: convertCoords(2823, 2399), desc: "Координаты: -1857, 92, -4110" },
        { coords: convertCoords(3031, 2347), desc: "Координаты: -1960, 82, -4525" },
        { coords: convertCoords(2966, 2435), desc: "Координаты: -1785, 89, -4396" },
        { coords: convertCoords(2866, 2313), desc: "Координаты: -2028, 94, -4196" },
        // Завод «Янтарь»
        { coords: convertCoords(2697, 2323), desc: "Координаты: -2009, 101, -3857" },
        { coords: convertCoords(2647, 2436), desc: "Координаты: -1783, 70, -3757" },
        { coords: convertCoords(2526, 1944), desc: "Координаты: -2767, 72, -3516" },
        { coords: convertCoords(2614, 2095), desc: "Координаты: -2464, 67, -3692" },
        // Дикая территория
        { coords: convertCoords(2709, 2749), desc: "Координаты: -1158, 81, -3881" },
        { coords: convertCoords(2797, 2708), desc: "Координаты: -1240, 80, -4056" },
        { coords: convertCoords(2763, 2795), desc: "Координаты: -1065, 80, -3989" },
        { coords: convertCoords(2785, 2765), desc: "Координаты: -1126, 88, -4033" },
        { coords: convertCoords(2649, 2630), desc: "Координаты: -1395, 80, -3760" },
        { coords: convertCoords(2791, 2609), desc: "Координаты: -1437, 84, -4046" },
        { coords: convertCoords(2690, 2616), desc: "Координаты: -1424, 77, -3843" },
        { coords: convertCoords(2704, 2696), desc: "Координаты: -1265, 74, -3871" },
        // Свалка
        { coords: convertCoords(2305, 3050), desc: "Координаты: -555, 88, -3073" },
        { coords: convertCoords(2296, 3434), desc: "Координаты: 212, 83, -3054" },
        { coords: convertCoords(2144, 2708), desc: "Координаты: -1240, 83, -2750" },
        { coords: convertCoords(1926, 2804), desc: "Координаты: -1049, 86, -2315" },
        // Тёмная долина
        { coords: convertCoords(2362, 4061), desc: "Координаты: 1467, 80, -3186" },
        { coords: convertCoords(2232, 3923), desc: "Координаты: 1190, 85, -2926" },
        // НИИ «Агропром»
        { coords: convertCoords(2127, 2146), desc: "Координаты: -2363, 81, -2718" },
        { coords: convertCoords(2232, 2028), desc: "Координаты: -2599, 84, -2926" },
        { coords: convertCoords(2338, 2088), desc: "Координаты: -2479, 80, -3140" },
        // Редколесье
        { coords: convertCoords(1613, 2571), desc: "Координаты: -1514, 94, -1688" },
        { coords: convertCoords(1728, 2245), desc: "Координаты: -2164, 85, -1919" },
        { coords: convertCoords(1525, 2541), desc: "Координаты: -1574, 85, -1512" },
        { coords: convertCoords(1649, 2207), desc: "Координаты: -2242, 94, -1760" },
        // Кордон
        { coords: convertCoords(1621, 3313), desc: "Координаты: -29, 97, -1705" },
        { coords: convertCoords(1576, 2882), desc: "Координаты: -891, 102, -1614" },
        { coords: convertCoords(1778, 2873), desc: "Координаты: -910, 77, -2018" },
        // Тёмная лощина
        { coords: convertCoords(1859, 3468), desc: "Координаты: 280, 89, -2182" },
        { coords: convertCoords(1715, 3495), desc: "Координаты: 334, 102, -1894" },
        { coords: convertCoords(1543, 3965), desc: "Координаты: 1275, 79, -1549" },
        { coords: convertCoords(1442, 4088), desc: "Координаты: 1520, 72, -1348" },
        { coords: convertCoords(1460, 3800), desc: "Координаты: 944, 88, -1385" },
        { coords: convertCoords(1851, 3675), desc: "Координаты: 694, 80, -2167" },
        { coords: convertCoords(1716, 3969), desc: "Координаты: 1283, 79, -1896" },
        // Топи
        { coords: convertCoords(663, 2534), desc: "Координаты: -1587, 95, 210" },
        { coords: convertCoords(1084, 2259), desc: "Координаты: -2138, 102, -631" },
        { coords: convertCoords(702, 2215), desc: "Координаты: -2225, 102, 133" }
    ],

    // ==================== АСТРОЛИТ: ЧЕРВОТОЧИНЫ ====================
    wormhole: [
        // Армейские склады
        { coords: convertCoords(3532, 2751), desc: "Червоточина" },
        { coords: convertCoords(3647, 3165), desc: "Червоточина" },
        { coords: convertCoords(3602, 3024), desc: "Червоточина" },
        { coords: convertCoords(3670, 2694), desc: "Червоточина" },
        { coords: convertCoords(3477, 2412), desc: "Червоточина" },
        { coords: convertCoords(3476, 2436), desc: "Червоточина" },
        { coords: convertCoords(3482, 2986), desc: "Червоточина" },
        { coords: convertCoords(3559, 3127), desc: "Червоточина" },
        { coords: convertCoords(3766, 2839), desc: "Червоточина" },
        { coords: convertCoords(3536, 2494), desc: "Червоточина" },
        { coords: convertCoords(3723, 3130), desc: "Червоточина" },
        { coords: convertCoords(3651, 2915), desc: "Червоточина" },
        { coords: convertCoords(3520, 2718), desc: "Червоточина" },
        // Муравейник
        { coords: convertCoords(2909, 3295), desc: "Координаты: -67, 78, -4282" },
        { coords: convertCoords(2946, 3132), desc: "Координаты: -391, 95, -4356" },
        { coords: convertCoords(2983, 3441), desc: "Координаты: 225, 98, -4431" },
        { coords: convertCoords(2856, 3428), desc: "Координаты: 200, 96, -4175" },
        { coords: convertCoords(2721, 3244), desc: "Координаты: -169, 79, -3905" },
        // Полесское
        { coords: convertCoords(3102, 2674), desc: "Координаты: -1309, 75, -4668" },
        { coords: convertCoords(3330, 2862), desc: "Координаты: -932, 82, -5124" },
        { coords: convertCoords(3315, 2644), desc: "Координаты: -1367, 89, -5093" },
        { coords: convertCoords(3106, 2838), desc: "Координаты: -979, 80, -4677" },
        { coords: convertCoords(3251, 2662), desc: "Координаты: -1332, 85, -4967" },
        { coords: convertCoords(3006, 2751), desc: "Координаты: -1154, 78, -4475" },
        { coords: convertCoords(3372, 2724), desc: "Координаты: -1209, 84, -5208" },
        { coords: convertCoords(3062, 2786), desc: "Координаты: -1085, 80, -4587" },
        { coords: convertCoords(3300, 2539), desc: "Координаты: -1579, 92, -5065" },
        // Поляна
        { coords: convertCoords(2946, 2379), desc: "Координаты: -1897, 91, -4355" },
        { coords: convertCoords(2852, 2342), desc: "Координаты: -1971, 94, -4168" },
        { coords: convertCoords(3094, 2388), desc: "Координаты: -1880, 86, -4651" },
        { coords: convertCoords(2971, 2278), desc: "Координаты: -2098, 76, -4407" },
        { coords: convertCoords(2873, 2469), desc: "Координаты: -1717, 91, -4209" },
        { coords: convertCoords(3268, 2458), desc: "Координаты: -1740, 89, -5000" },
        // Завод «Янтарь»
        { coords: convertCoords(2744, 2306), desc: "Координаты: -2043, 83, -3953" },
        { coords: convertCoords(2630, 2020), desc: "Координаты: -2614, 81, -3723" },
        { coords: convertCoords(2543, 2203), desc: "Координаты: -2249, 72, -3550" },
        { coords: convertCoords(2735, 2394), desc: "Координаты: -1868, 79, -3933" },
        // Дикая территория
        { coords: convertCoords(2680, 2830), desc: "Координаты: -997, 78, -3823" },
        { coords: convertCoords(2762, 2636), desc: "Координаты: -1385, 86, -3987" },
        { coords: convertCoords(2758, 2763), desc: "Координаты: -1130, 80, -3979" },
        { coords: convertCoords(2809, 2783), desc: "Координаты: -1091, 81, -4081" },
        { coords: convertCoords(2740, 2662), desc: "Координаты: -1333, 81, -3944" },
        { coords: convertCoords(2799, 2707), desc: "Координаты: -1242, 100, -4061" },
        { coords: convertCoords(2731, 2609), desc: "Координаты: -1437, 92, -3924" },
        { coords: convertCoords(2653, 2704), desc: "Координаты: -1248, 86, -3768" },
        // Свалка
        { coords: convertCoords(2089, 2798), desc: "Координаты: -1059, 93, -2641" },
        { coords: convertCoords(2016, 2704), desc: "Координаты: -1248, 97, -2496" },
        { coords: convertCoords(2249, 3533), desc: "Координаты: 411, 90, -2961" },
        { coords: convertCoords(2162, 3042), desc: "Координаты: -572, 106, -2788" },
        // Тёмная долина
        { coords: convertCoords(2228, 4114), desc: "Координаты: 1572, 88, -2920" },
        { coords: convertCoords(2194, 3772), desc: "Координаты: 889, 83, -2851" },
        // НИИ «Агропром»
        { coords: convertCoords(2015, 2082), desc: "Координаты: -2490, 82, -2493" },
        { coords: convertCoords(2188, 1984), desc: "Координаты: -2687, 94, -2838" },
        { coords: convertCoords(2373, 1983), desc: "Координаты: -2689, 81, -3209" },
        // Редколесье
        { coords: convertCoords(1789, 2261), desc: "Координаты: -2133, 95, -2041" },
        { coords: convertCoords(1547, 2202), desc: "Координаты: -2251, 86, -1557" },
        { coords: convertCoords(1790, 2411), desc: "Координаты: -1833, 85, -2042" },
        { coords: convertCoords(1484, 2298), desc: "Координаты: -2059, 88, -1432" },
        // Кордон
        { coords: convertCoords(1726, 3220), desc: "Координаты: -215, 82, -1916" },
        { coords: convertCoords(1815, 2817), desc: "Координаты: -1021, 77, -2092" },
        { coords: convertCoords(1492, 2914), desc: "Координаты: -827, 75, -1446" },
        // Тёмная лощина
        { coords: convertCoords(1781, 3948), desc: "Координаты: 1242, 82, -2027" },
        { coords: convertCoords(1487, 3914), desc: "Координаты: 1173, 83, -1439" },
        { coords: convertCoords(1714, 3573), desc: "Координаты: 490, 102, -1893" },
        { coords: convertCoords(1445, 3882), desc: "Координаты: 1109, 89, -1355" },
        { coords: convertCoords(1898, 3593), desc: "Координаты: 531, 79, -2259" },
        { coords: convertCoords(1948, 3476), desc: "Координаты: 297, 84, -2360" },
        { coords: convertCoords(1440, 4037), desc: "Координаты: 1419, 102, -1343" },
        // Топи
        { coords: convertCoords(584, 2183), desc: "Координаты: -2290, 91, 367" },
        { coords: convertCoords(838, 2572), desc: "Координаты: -1511, 96, -140" },
        { coords: convertCoords(979, 2273), desc: "Координаты: -2108, 92, -422" }
    ],

    // ==================== КОНТЕЙНЕРЫ: ПАТРОНЫ ====================
    ammo: [
        // Армейские склады
        { coords: convertCoords(3679, 2972), desc: "Координаты: -711, 78, -5822" },
        { coords: convertCoords(3488, 3003), desc: "Координаты: -650, 89, -5440" },
        { coords: convertCoords(3730, 3033), desc: "Координаты: -591, 89, -5924" },
        { coords: convertCoords(3460, 2412), desc: "Координаты: -1831, 91, -5385" },
        { coords: convertCoords(3635, 2953), desc: "Координаты: -751, 81, -5734" },
        // Муравейник
        { coords: convertCoords(2705, 3545), desc: "Координаты: 434, 83, -3875" },
        { coords: convertCoords(2952, 3191), desc: "Координаты: -274, 92, -4369" },
        { coords: convertCoords(2969, 3206), desc: "Координаты: -243, 92, -4401" },
        { coords: convertCoords(2717, 3565), desc: "Координаты: 473, 82, -3898" },
        { coords: convertCoords(2833, 3539), desc: "Координаты: 422, 85, -4130" },
        { coords: convertCoords(2839, 3401), desc: "Координаты: 147, 85, -4142" },
        { coords: convertCoords(2764, 3390), desc: "Координаты: 123, 80, -3991" },
        { coords: convertCoords(2940, 3159), desc: "Координаты: -339, 92, -4344" },
        { coords: convertCoords(2748, 3260), desc: "Координаты: -135, 81, -3959" },
        { coords: convertCoords(2984, 3442), desc: "Координаты: 227, 99, -4431" },
        { coords: convertCoords(2961, 3421), desc: "Координаты: 187, 85, -4385" },
        // Полесское
        { coords: convertCoords(2990, 2788), desc: "Координаты: -1080, 83, -4443" },
        { coords: convertCoords(3279, 2733), desc: "Координаты: -1191, 85, -5022" },
        { coords: convertCoords(3033, 2776), desc: "Координаты: -1105, 86, -4529" },
        { coords: convertCoords(3119, 2810), desc: "Координаты: -1037, 86, -4702" },
        { coords: convertCoords(3350, 2607), desc: "Координаты: -1441, 85, -5163" },
        // Поляна
        { coords: convertCoords(2982, 2323), desc: "Координаты: -2010, 78, -4429" },
        { coords: convertCoords(2987, 2308), desc: "Координаты: -2039, 76, -4439" },
        { coords: convertCoords(2865, 2389), desc: "Координаты: -1878, 90, -4194" },
        { coords: convertCoords(2879, 2402), desc: "Координаты: -1851, 91, -4222" },
        { coords: convertCoords(2867, 2370), desc: "Координаты: -1916, 90, -4198" },
        { coords: convertCoords(2971, 2340), desc: "Координаты: -1976, 82, -4405" },
        { coords: convertCoords(2812, 2352), desc: "Координаты: -1952, 90, -4088" },
        { coords: convertCoords(2843, 2351), desc: "Координаты: -1954, 91, -4151" },
        { coords: convertCoords(2966, 2434), desc: "Координаты: -1788, 90, -4397" },
        { coords: convertCoords(2921, 2419), desc: "Координаты: -1817, 90, -4306" },
        // Янтарь
        { coords: convertCoords(2531, 1944), desc: "Координаты: -2766, 71, -3524" },
        { coords: convertCoords(2693, 2281), desc: "Координаты: -2094, 45, -3850" },
        { coords: convertCoords(2676, 2321), desc: "Координаты: -2012, 79, -3814" },
        { coords: convertCoords(2687, 2054), desc: "Координаты: -2547, 46, -3836" },
        { coords: convertCoords(2712, 2266), desc: "Координаты: -2124, 39, -3887" },
        // Дикая территория
        { coords: convertCoords(2654, 2632), desc: "Координаты: -1391, 80, -3774" },
        { coords: convertCoords(2624, 2663), desc: "Координаты: -1329, 80, -3713" },
        { coords: convertCoords(2789, 2740), desc: "Координаты: -1175, 91, -4044" },
        { coords: convertCoords(2796, 2686), desc: "Координаты: -1282, 87, -4057" },
        { coords: convertCoords(2658, 2635), desc: "Координаты: -1385, 92, -3781" },
        { coords: convertCoords(2670, 2632), desc: "Координаты: -1391, 93, -3806" },
        { coords: convertCoords(2717, 2627), desc: "Координаты: -1402, 79, -3900" },
        { coords: convertCoords(2742, 2657), desc: "Координаты: -1341, 86, -3950" },
        { coords: convertCoords(2761, 2687), desc: "Координаты: -1281, 86, -3988" },
        { coords: convertCoords(2796, 2589), desc: "Координаты: -1477, 103, -4056" },
        { coords: convertCoords(2762, 2618), desc: "Координаты: -1420, 85, -3990" },
        { coords: convertCoords(2786, 2629), desc: "Координаты: -1397, 84, -4037" },
        { coords: convertCoords(2736, 2618), desc: "Координаты: -1419, 85, -3937" },
        { coords: convertCoords(2625, 2683), desc: "Координаты: -1290, 80, -3716" },
        { coords: convertCoords(2739, 2759), desc: "Координаты: -1138, 87, -3944" },
        { coords: convertCoords(2834, 2832), desc: "Координаты: -991, 79, -4133" },
        { coords: convertCoords(2807, 2670), desc: "Координаты: -1316, 80, -4080" },
        // Свалка
        { coords: convertCoords(1959, 2811), desc: "Координаты: -1034, 94, -2380" },
        { coords: convertCoords(2007, 2873), desc: "Координаты: -909, 81, -2477" },
        { coords: convertCoords(2198, 2860), desc: "Координаты: -936, 88, -2860" },
        { coords: convertCoords(2333, 3053), desc: "Координаты: -550, 80, -3129" },
        { coords: convertCoords(2141, 2937), desc: "Координаты: -782, 78, -2745" },
        { coords: convertCoords(1922, 3447), desc: "Координаты: 237, 81, -2308" },
        { coords: convertCoords(1927, 3535), desc: "Координаты: 414, 79, -2317" },
        { coords: convertCoords(1751, 3280), desc: "Координаты: -96, 100, -1965" },
        // Тёмная долина
        { coords: convertCoords(2337, 3829), desc: "Координаты: 1002, 79, -3136" },
        { coords: convertCoords(2360, 4057), desc: "Координаты: 1459, 79, -3182" },
        { coords: convertCoords(2257, 4080), desc: "Координаты: 1503, 80, -2975" },
        { coords: convertCoords(2362, 3845), desc: "Координаты: 1034, 86, -3186" },
        { coords: convertCoords(2381, 3867), desc: "Координаты: 1077, 79, -3225" },
        { coords: convertCoords(2239, 4055), desc: "Координаты: 1454, 78, -2940" },
        { coords: convertCoords(2236, 4081), desc: "Координаты: 1506, 87, -2934" },
        { coords: convertCoords(2376, 4060), desc: "Координаты: 1464, 79, -3214" },
        // Агропром
        { coords: convertCoords(2142, 2155), desc: "Координаты: -2345, 75, -2748" },
        { coords: convertCoords(2188, 2024), desc: "Координаты: -2608, 83, -2840" },
        { coords: convertCoords(2190, 2006), desc: "Координаты: -2644, 80, -2845" },
        { coords: convertCoords(2199, 1979), desc: "Координаты: -2696, 89, -2863" },
        { coords: convertCoords(2023, 2098), desc: "Координаты: -2458, 81, -2510" },
        { coords: convertCoords(2224, 1984), desc: "Координаты: -2686, 83, -2912" },
        { coords: convertCoords(2206, 2021), desc: "Координаты: -2613, 85, -2876" },
        { coords: convertCoords(2127, 2160), desc: "Координаты: -2335, 81, -2717" },
        { coords: convertCoords(2222, 2037), desc: "Координаты: -2582, 85, -2908" },
        { coords: convertCoords(2145, 2160), desc: "Координаты: -2335, 83, -2754" },
        { coords: convertCoords(2015, 2054), desc: "Координаты: -2546, 79, -2494" },
        // Подземелья Агропрома
        { coords: convertCoords(2200, 2347), desc: "Координаты: -1960, 58, -2865", level: "underground" },
        // Редколесье
        { coords: convertCoords(1578, 2209), desc: "Координаты: -2238, 85, -1617" },
        { coords: convertCoords(1730, 2519), desc: "Координаты: -1617, 85, -1922" },
        { coords: convertCoords(1473, 2311), desc: "Координаты: -2035, 87, -1408" },
        { coords: convertCoords(1571, 2188), desc: "Координаты: -2279, 85, -1604" },
        { coords: convertCoords(1552, 2211), desc: "Координаты: -2233, 85, -1567" },
        { coords: convertCoords(1887, 2374), desc: "Координаты: -1909, 91, -2237" },
        { coords: convertCoords(1579, 2191), desc: "Координаты: -2274, 85, -1621" },
        // Кордон
        { coords: convertCoords(1762, 2882), desc: "Координаты: -893, 84, -1989" },
        { coords: convertCoords(1894, 3083), desc: "Координаты: -491, 77, -2252" },
        { coords: convertCoords(1817, 2880), desc: "Координаты: -896, 78, -2097" },
        { coords: convertCoords(1794, 2832), desc: "Координаты: -991, 85, -2051" },
        { coords: convertCoords(1781, 2855), desc: "Координаты: -945, 77, -2025" },
        { coords: convertCoords(1913, 3090), desc: "Координаты: -476, 80, -2290" },
        { coords: convertCoords(1800, 2825), desc: "Координаты: -1007, 76, -2065" },
        { coords: convertCoords(1788, 2823), desc: "Координаты: -1010, 77, -2040" },
        { coords: convertCoords(1772, 2877), desc: "Координаты: -903, 85, -2009" },
        { coords: convertCoords(1799, 2857), desc: "Координаты: -941, 78, -2062" },
        { coords: convertCoords(1897, 3072), desc: "Координаты: -512, 86, -2258" },
        { coords: convertCoords(1763, 2884), desc: "Координаты: -887, 77, -1990" },
        { coords: convertCoords(1774, 2824), desc: "Координаты: -1007, 83, -2011" },
        // Тёмная лощина
        { coords: convertCoords(1638, 3869), desc: "Координаты: 1082, 86, -1740" },
        { coords: convertCoords(1727, 3741), desc: "Координаты: 826, 79, -1917" },
        { coords: convertCoords(1560, 3866), desc: "Координаты: 1077, 79, -1585" },
        { coords: convertCoords(1855, 3694), desc: "Координаты: 732, 80, -2174" },
        { coords: convertCoords(1416, 3767), desc: "Координаты: 878, 79, -1297" },
        { coords: convertCoords(1463, 4026), desc: "Координаты: 1396, 79, -1391" },
        { coords: convertCoords(1497, 3923), desc: "Координаты: 1191, 79, -1459" },
        { coords: convertCoords(1546, 3958), desc: "Координаты: 1260, 78, -1555" },
        { coords: convertCoords(1720, 3516), desc: "Координаты: 375, 101, -1904" },
        { coords: convertCoords(1628, 3962), desc: "Координаты: 1268, 62, -1720" },
        { coords: convertCoords(1444, 3613), desc: "Координаты: 570, 79, -1351" },
        { coords: convertCoords(1479, 4076), desc: "Координаты: 1496, 71, -1422" },
        { coords: convertCoords(1796, 3679), desc: "Координаты: 703, 78, -2057" },
        // Сортировка
        { coords: convertCoords(1711, 4454), desc: "Координаты: 2251, 101, -1886" },
        { coords: convertCoords(1810, 4373), desc: "Координаты: 2089, 104, -2083" },
        { coords: convertCoords(1905, 4373), desc: "Координаты: 2090, 101, -2274" },
        // Топи
        { coords: convertCoords(697, 2192), desc: "Координаты: -2273, 94, 142" },
        { coords: convertCoords(891, 2170), desc: "Координаты: -2317, 95, -246" },
        { coords: convertCoords(690, 2602), desc: "Координаты: -1452, 93, 154" },
        { coords: convertCoords(958, 2695), desc: "Координаты: -1267, 90, -381" },
        { coords: convertCoords(658, 2428), desc: "Координаты: -1801, 92, 220" },
        { coords: convertCoords(783, 2118), desc: "Координаты: -2422, 93, -31" },
        // Росстань
        { coords: convertCoords(770, 3733), desc: "Координаты: 810, 79, -5" }
    ],

    // ==================== КОНТЕЙНЕРЫ: ПРИПАСЫ ====================
    supply: [
        // Армейские склады
        { coords: convertCoords(3489, 2430), desc: "Координаты: -1796, 91, -5443" },
        { coords: convertCoords(3545, 2641), desc: "Координаты: -1374, 88, -5555" },
        { coords: convertCoords(3530, 2587), desc: "Координаты: -1483, 87, -5523" },
        { coords: convertCoords(3706, 3035), desc: "Координаты: -587, 89, -5876" },
        { coords: convertCoords(3486, 2965), desc: "Координаты: -726, 90, -5437" },
        { coords: convertCoords(3646, 2736), desc: "Координаты: -1183, 88, -5756" },
        { coords: convertCoords(3498, 2997), desc: "Координаты: -661, 90, -5460" },
        { coords: convertCoords(3626, 2710), desc: "Координаты: -1236, 88, -5717" },
        { coords: convertCoords(3684, 2912), desc: "Координаты: -833, 80, -5833" },
        { coords: convertCoords(3666, 3065), desc: "Координаты: -525, 92, -5797" },
        { coords: convertCoords(3547, 3057), desc: "Координаты: -542, 86, -5558" },
        { coords: convertCoords(3521, 3088), desc: "Координаты: -479, 90, -5506" },
        { coords: convertCoords(3669, 2735), desc: "Координаты: -1185, 88, -5801" },
        { coords: convertCoords(3423, 2427), desc: "Координаты: -1803, 91, -5310" },
        { coords: convertCoords(3491, 2960), desc: "Координаты: -735, 90, -5445" },
        { coords: convertCoords(3662, 2977), desc: "Координаты: -701, 79, -5788" },
        { coords: convertCoords(3520, 2438), desc: "Координаты: -1781, 92, -5503" },
        { coords: convertCoords(3509, 2747), desc: "Координаты: -1163, 81, -5483" },
        { coords: convertCoords(3497, 3112), desc: "Координаты: -432, 90, -5459" },
        { coords: convertCoords(3599, 2573), desc: "Координаты: -1509, 83, -5663" },
        { coords: convertCoords(3745, 2873), desc: "Координаты: -910, 91, -5954" },
        { coords: convertCoords(3763, 3094), desc: "Координаты: -469, 94, -5990" },
        { coords: convertCoords(3523, 3138), desc: "Координаты: -380, 89, -5510" },
        // Муравейник
        { coords: convertCoords(2726, 3541), desc: "Координаты: 425, 82, -3915" },
        { coords: convertCoords(2771, 3372), desc: "Координаты: 87, 77, -4007" },
        { coords: convertCoords(2765, 3226), desc: "Координаты: -203, 80, -3994" },
        { coords: convertCoords(2950, 3188), desc: "Координаты: -280, 92, -4364" },
        { coords: convertCoords(2979, 3425), desc: "Координаты: 195, 86, -4423" },
        { coords: convertCoords(2760, 3401), desc: "Координаты: 146, 80, -3984" },
        { coords: convertCoords(2893, 3506), desc: "Координаты: 357, 80, -4250" },
        { coords: convertCoords(2947, 3139), desc: "Координаты: -378, 96, -4359" },
        { coords: convertCoords(2950, 3144), desc: "Координаты: -367, 92, -4365" },
        { coords: convertCoords(2838, 3368), desc: "Координаты: 79, 86, -4140" },
        { coords: convertCoords(2773, 3245), desc: "Координаты: -166, 101, -4009" },
        { coords: convertCoords(2863, 3594), desc: "Координаты: 532, 79, -4190" },
        // Полесское
        { coords: convertCoords(3065, 2723), desc: "Координаты: -1211, 87, -4594" },
        { coords: convertCoords(3106, 2807), desc: "Координаты: -1041, 98, -4676" },
        { coords: convertCoords(2976, 2793), desc: "Координаты: -1071, 84, -4417" },
        { coords: convertCoords(3217, 2580), desc: "Координаты: -1496, 127, -4899" },
        { coords: convertCoords(3046, 2840), desc: "Координаты: -977, 79, -4557" },
        { coords: convertCoords(3244, 2690), desc: "Координаты: -1275, 77, -4952" },
        { coords: convertCoords(3060, 2662), desc: "Координаты: -1331, 77, -4585" },
        { coords: convertCoords(2980, 2832), desc: "Координаты: -992, 84, -4423" },
        { coords: convertCoords(3293, 2863), desc: "Координаты: -930, 80, -5050" },
        { coords: convertCoords(3293, 2837), desc: "Координаты: -982, 80, -5050" },
        { coords: convertCoords(3140, 2815), desc: "Координаты: -1026, 80, -4743" },
        { coords: convertCoords(3052, 2836), desc: "Координаты: -985, 81, -4568" },
        { coords: convertCoords(3143, 2742), desc: "Координаты: -1173, 86, -4750" },
        { coords: convertCoords(3127, 2844), desc: "Координаты: -969, 86, -4719" },
        { coords: convertCoords(3232, 2567), desc: "Координаты: -1522, 96, -4929" },
        { coords: convertCoords(3280, 2801), desc: "Координаты: -1053, 85, -5025" },
        { coords: convertCoords(3090, 2849), desc: "Координаты: -958, 86, -4643" },
        { coords: convertCoords(3232, 2593), desc: "Координаты: -1471, 97, -4928" },
        { coords: convertCoords(3340, 2634), desc: "Координаты: -1387, 85, -5145" },
        { coords: convertCoords(3031, 2786), desc: "Координаты: -1084, 81, -4526" },
        { coords: convertCoords(3033, 2729), desc: "Координаты: -1199, 82, -4530" },
        { coords: convertCoords(3344, 2706), desc: "Координаты: -1244, 85, -5152" },
        { coords: convertCoords(3115, 2669), desc: "Координаты: -1318, 82, -4694" },
        { coords: convertCoords(3146, 2769), desc: "Координаты: -1117, 82, -4756" },
        { coords: convertCoords(3326, 2731), desc: "Координаты: -1195, 85, -5117" },
        { coords: convertCoords(3376, 2727), desc: "Координаты: -1201, 85, -5216" },
        { coords: convertCoords(3352, 2788), desc: "Координаты: -1079, 85, -5167" },
        { coords: convertCoords(3370, 2782), desc: "Координаты: -1093, 85, -5203" },
        { coords: convertCoords(3330, 2775), desc: "Координаты: -1107, 85, -5123" },
        { coords: convertCoords(3331, 2758), desc: "Координаты: -1140, 85, -5126" },
        { coords: convertCoords(3283, 2661), desc: "Координаты: -1335, 85, -5030" },
        { coords: convertCoords(3283, 2527), desc: "Координаты: -1602, 87, -5031" },
        { coords: convertCoords(3035, 2698), desc: "Координаты: -1259, 82, -4535" },
        { coords: convertCoords(3087, 2770), desc: "Координаты: -1115, 94, -4639" },
        { coords: convertCoords(3342, 2541), desc: "Координаты: -1573, 78, -5148" },
        { coords: convertCoords(2980, 2816), desc: "Координаты: -1025, 83, -4424" },
        { coords: convertCoords(3144, 2782), desc: "Координаты: -1093, 86, -4753" },
        { coords: convertCoords(3282, 2619), desc: "Координаты: -1418, 85, -5029" },
        { coords: convertCoords(3218, 2583), desc: "Координаты: -1491, 170, -4901" },
        { coords: convertCoords(3224, 2751), desc: "Координаты: -1153, 73, -4912" },
        { coords: convertCoords(3124, 2857), desc: "Координаты: -942, 86, -4711" },
        { coords: convertCoords(3145, 2816), desc: "Координаты: -1024, 74, -4755" },
        { coords: convertCoords(2982, 2767), desc: "Координаты: -1124, 100, -4428" },
        { coords: convertCoords(3114, 2711), desc: "Координаты: -1233, 87, -4691" },
        // Поляна
        { coords: convertCoords(3030, 2348), desc: "Координаты: -1960, 79, -4523" },
        { coords: convertCoords(3043, 2384), desc: "Координаты: -1888, 86, -4551" },
        { coords: convertCoords(2923, 2424), desc: "Координаты: -1808, 94, -4310" },
        { coords: convertCoords(2818, 2436), desc: "Координаты: -1784, 90, -4100" },
        { coords: convertCoords(3026, 2405), desc: "Координаты: -1846, 89, -4516" },
        { coords: convertCoords(2865, 2296), desc: "Координаты: -2063, 91, -4195" },
        { coords: convertCoords(2958, 2339), desc: "Координаты: -1979, 78, -4381" },
        { coords: convertCoords(2852, 2394), desc: "Координаты: -1869, 100, -4167" },
        { coords: convertCoords(2970, 2343), desc: "Координаты: -1971, 74, -4405" },
        { coords: convertCoords(3062, 2327), desc: "Координаты: -2002, 77, -4587" },
        { coords: convertCoords(2971, 2284), desc: "Координаты: -2088, 76, -4406" },
        { coords: convertCoords(2952, 2380), desc: "Координаты: -1896, 90, -4369" },
        { coords: convertCoords(3268, 2453), desc: "Координаты: -1750, 88, -5001" },
        { coords: convertCoords(3065, 2352), desc: "Координаты: -1953, 81, -4594" },
        { coords: convertCoords(3009, 2355), desc: "Координаты: -1947, 79, -4482" },
        { coords: convertCoords(3009, 2323), desc: "Координаты: -2011, 78, -4481" },
        // Янтарь
        { coords: convertCoords(2718, 2250), desc: "Координаты: -2156, 40, -3898" },
        { coords: convertCoords(2570, 1983), desc: "Координаты: -2689, 91, -3602" },
        { coords: convertCoords(2728, 2285), desc: "Координаты: -2084, 81, -3919" },
        { coords: convertCoords(2724, 2082), desc: "Координаты: -2491, 31, -3911" },
        { coords: convertCoords(2724, 2345), desc: "Координаты: -1965, 80, -3910" },
        { coords: convertCoords(2701, 2276), desc: "Координаты: -2102, 45, -3866" },
        { coords: convertCoords(2687, 2153), desc: "Координаты: -2350, 40, -3838" },
        // Дикая территория
        { coords: convertCoords(2668, 2632), desc: "Координаты: -1391, 80, -3801" },
        { coords: convertCoords(2786, 2633), desc: "Координаты: -1389, 83, -4037" },
        { coords: convertCoords(2738, 2649), desc: "Координаты: -1356, 87, -3941" },
        { coords: convertCoords(2762, 2662), desc: "Координаты: -1331, 79, -3989" },
        { coords: convertCoords(2698, 2658), desc: "Координаты: -1340, 81, -3861" },
        { coords: convertCoords(2786, 2654), desc: "Координаты: -1347, 81, -4038" },
        { coords: convertCoords(2828, 2760), desc: "Координаты: -1135, 79, -4122" },
        { coords: convertCoords(2801, 2785), desc: "Координаты: -1086, 79, -4067" },
        { coords: convertCoords(2758, 2656), desc: "Координаты: -1342, 79, -3982" },
        { coords: convertCoords(2809, 2668), desc: "Координаты: -1319, 80, -4084" },
        { coords: convertCoords(2678, 2632), desc: "Координаты: -1390, 93, -3820" },
        { coords: convertCoords(2684, 2801), desc: "Координаты: -1053, 80, -3832" },
        { coords: convertCoords(2786, 2752), desc: "Координаты: -1151, 80, -4037" },
        { coords: convertCoords(2758, 2628), desc: "Координаты: -1399, 91, -3981" },
        { coords: convertCoords(2778, 2736), desc: "Координаты: -1183, 80, -4021" },
        { coords: convertCoords(2761, 2673), desc: "Координаты: -1309, 85, -3988" },
        { coords: convertCoords(2702, 2631), desc: "Координаты: -1394, 84, -3869" },
        { coords: convertCoords(2764, 2655), desc: "Координаты: -1345, 79, -3994" },
        { coords: convertCoords(2788, 2670), desc: "Координаты: -1315, 87, -4042" },
        // Свалка
        { coords: convertCoords(2247, 2889), desc: "Координаты: -877, 76, -2957" },
        { coords: convertCoords(2057, 2702), desc: "Координаты: -1252, 85, -2578" },
        { coords: convertCoords(2237, 3503), desc: "Координаты: 352, 71, -2936" },
        { coords: convertCoords(2295, 3431), desc: "Координаты: 206, 79, -3052" },
        { coords: convertCoords(2162, 2797), desc: "Координаты: -1060, 84, -2788" },
        { coords: convertCoords(2123, 2747), desc: "Координаты: -1160, 83, -2708" },
        { coords: convertCoords(1962, 2780), desc: "Координаты: -1094, 83, -2387" },
        { coords: convertCoords(2185, 2699), desc: "Координаты: -1257, 82, -2832" },
        { coords: convertCoords(1899, 2789), desc: "Координаты: -1076, 84, -2261" },
        { coords: convertCoords(2081, 2667), desc: "Координаты: -1320, 85, -2625" },
        { coords: convertCoords(2163, 2699), desc: "Координаты: -1257, 83, -2789" },
        { coords: convertCoords(2241, 3509), desc: "Координаты: 362, 71, -2945" },
        { coords: convertCoords(2099, 2693), desc: "Координаты: -1270, 108, -2662" },
        { coords: convertCoords(2076, 2682), desc: "Координаты: -1290, 87, -2616" },
        { coords: convertCoords(2030, 2798), desc: "Координаты: -1059, 84, -2523" },
        { coords: convertCoords(1953, 2811), desc: "Координаты: -1033, 85, -2370" },
        { coords: convertCoords(2095, 2707), desc: "Координаты: -1241, 101, -2653" },
        { coords: convertCoords(2141, 2767), desc: "Координаты: -1121, 84, -2746" },
        { coords: convertCoords(2044, 2753), desc: "Координаты: -1148, 86, -2551" },
        { coords: convertCoords(1880, 3612), desc: "Координаты: 568, 80, -2224" },
        { coords: convertCoords(1849, 3380), desc: "Координаты: 102, 93, -2162" },
        { coords: convertCoords(1830, 3389), desc: "Координаты: 122, 93, -2124" },
        { coords: convertCoords(1906, 3521), desc: "Координаты: 386, 80, -2276" },
        { coords: convertCoords(1965, 3442), desc: "Координаты: 228, 84, -2393" },
        // Тёмная долина
        { coords: convertCoords(2282, 4111), desc: "Координаты: 1565, 78, -3027" },
        { coords: convertCoords(2223, 4082), desc: "Координаты: 1508, 92, -2909" },
        { coords: convertCoords(2365, 3845), desc: "Координаты: 1035, 86, -3192" },
        { coords: convertCoords(2359, 3859), desc: "Координаты: 1062, 86, -3179" },
        { coords: convertCoords(2230, 4076), desc: "Координаты: 1495, 88, -2923" },
        { coords: convertCoords(2371, 3881), desc: "Координаты: 1106, 79, -3204" },
        { coords: convertCoords(2327, 4072), desc: "Координаты: 1488, 78, -3116" },
        { coords: convertCoords(2228, 4040), desc: "Координаты: 1424, 79, -2918" },
        { coords: convertCoords(2382, 4066), desc: "Координаты: 1476, 79, -3225" },
        { coords: convertCoords(2226, 4076), desc: "Координаты: 1495, 88, -2913" },
        { coords: convertCoords(2258, 4050), desc: "Координаты: 1444, 79, -2977" },
        { coords: convertCoords(2353, 4057), desc: "Координаты: 1459, 79, -3167" },
        // Агропром
        { coords: convertCoords(2218, 2037), desc: "Координаты: -2582, 83, -2900" },
        { coords: convertCoords(2187, 1984), desc: "Координаты: -2688, 89, -2837" },
        { coords: convertCoords(2187, 1982), desc: "Координаты: -2690, 89, -2837" },
        { coords: convertCoords(2145, 2159), desc: "Координаты: -2337, 79, -2754" },
        { coords: convertCoords(2193, 1980), desc: "Координаты: -2695, 94, -2849" },
        { coords: convertCoords(2425, 2335), desc: "Координаты: -1985, 85, -3315" },
        { coords: convertCoords(2192, 2005), desc: "Координаты: -2645, 88, -2848" },
        { coords: convertCoords(2185, 2013), desc: "Координаты: -2628, 83, -2834" },
        // Подземелья Агропрома
        { coords: convertCoords(2209, 2339), desc: "Координаты: -1978, 58, -2882", level: "underground" },
        // Редколесье
        { coords: convertCoords(1746, 2451), desc: "Координаты: -1753, 85, -1954" },
        { coords: convertCoords(1792, 2416), desc: "Координаты: -1823, 83, -2046" },
        { coords: convertCoords(1631, 2264), desc: "Координаты: -2129, 83, -1724" },
        { coords: convertCoords(1549, 2190), desc: "Координаты: -2275, 85, -1561" },
        { coords: convertCoords(1582, 2197), desc: "Координаты: -2263, 81, -1626" },
        { coords: convertCoords(1551, 2215), desc: "Координаты: -2226, 86, -1564" },
        { coords: convertCoords(1772, 2514), desc: "Координаты: -1629, 86, -2007" },
        { coords: convertCoords(1876, 2526), desc: "Координаты: -1603, 91, -2214" },
        { coords: convertCoords(1473, 2308), desc: "Координаты: -2040, 86, -1409" },
        { coords: convertCoords(1561, 2209), desc: "Координаты: -2239, 86, -1584" },
        { coords: convertCoords(1887, 2368), desc: "Координаты: -1921, 90, -2236" },
        { coords: convertCoords(1483, 2293), desc: "Координаты: -2071, 90, -1427" },
        // Стройплощадка
        { coords: convertCoords(1453, 1764), desc: "Координаты: -3127, 113, -1369" },
        { coords: convertCoords(1502, 1732), desc: "Координаты: -3190, 91, -1467" },
        { coords: convertCoords(1407, 1796), desc: "Координаты: -3062, 100, -1279" },
        { coords: convertCoords(1481, 1730), desc: "Координаты: -3195, 94, -1426" },
        { coords: convertCoords(1492, 1878), desc: "Координаты: -2900, 96, -1448" },
        { coords: convertCoords(1532, 1756), desc: "Координаты: -3143, 92, -1528" },
        { coords: convertCoords(1414, 1738), desc: "Координаты: -3179, 94, -1292" },
        { coords: convertCoords(1529, 1811), desc: "Координаты: -3032, 91, -1522" },
        { coords: convertCoords(1481, 1880), desc: "Координаты: -2894, 95, -1426" },
        { coords: convertCoords(1440, 1705), desc: "Координаты: -3246, 95, -1344" },
        { coords: convertCoords(1325, 1698), desc: "Координаты: -3259, 92, -1114" },
        { coords: convertCoords(1579, 1924), desc: "Координаты: -2807, 93, -1622" },
        { coords: convertCoords(1365, 1750), desc: "Координаты: -3156, 92, -1194" },
        { coords: convertCoords(1407, 1781), desc: "Координаты: -3093, 94, -1279" },
        { coords: convertCoords(1434, 1745), desc: "Координаты: -3164, 106, -1332" },
        { coords: convertCoords(1481, 1698), desc: "Координаты: -3260, 94, -1426" },
        { coords: convertCoords(1415, 1710), desc: "Координаты: -3236, 92, -1294" },
        { coords: convertCoords(1448, 1764), desc: "Координаты: -3127, 101, -1359" },
        { coords: convertCoords(1460, 1846), desc: "Координаты: -2963, 94, -1385" },
        { coords: convertCoords(1451, 1768), desc: "Координаты: -3119, 95, -1365" },
        { coords: convertCoords(1531, 1876), desc: "Координаты: -2903, 95, -1525" },
        { coords: convertCoords(1413, 1862), desc: "Координаты: -2931, 100, -1289" },
        { coords: convertCoords(1423, 1789), desc: "Координаты: -3077, 100, -1310" },
        // Кордон
        { coords: convertCoords(1795, 2862), desc: "Координаты: -931, 77, -2054" },
        { coords: convertCoords(1775, 2823), desc: "Координаты: -1009, 77, -2013" },
        { coords: convertCoords(1797, 2850), desc: "Координаты: -957, 79, -2059" },
        { coords: convertCoords(1775, 2841), desc: "Координаты: -974, 76, -2014" },
        { coords: convertCoords(1819, 2847), desc: "Координаты: -962, 76, -2102" },
        { coords: convertCoords(1895, 3083), desc: "Координаты: -491, 82, -2253" },
        { coords: convertCoords(1782, 2827), desc: "Координаты: -1002, 83, -2028" },
        { coords: convertCoords(1810, 2865), desc: "Координаты: -927, 76, -2084" },
        { coords: convertCoords(1801, 2868), desc: "Координаты: -921, 79, -2067" },
        { coords: convertCoords(1782, 2850), desc: "Координаты: -955, 86, -2029" },
        { coords: convertCoords(1780, 2886), desc: "Координаты: -884, 77, -2023" },
        { coords: convertCoords(1764, 2868), desc: "Координаты: -921, 80, -1992" },
        { coords: convertCoords(1903, 3090), desc: "Координаты: -476, 81, -2269" },
        { coords: convertCoords(1796, 2886), desc: "Координаты: -884, 76, -2057" },
        { coords: convertCoords(1780, 2884), desc: "Координаты: -887, 84, -2023" },
        // Тёмная лощина
        { coords: convertCoords(1796, 3701), desc: "Координаты: 746, 77, -2055" },
        { coords: convertCoords(1539, 3962), desc: "Координаты: 1269, 78, -1542" },
        { coords: convertCoords(1444, 3885), desc: "Координаты: 1113, 88, -1352" },
        { coords: convertCoords(1528, 3880), desc: "Координаты: 1105, 81, -1520" },
        { coords: convertCoords(1622, 3878), desc: "Координаты: 1100, 75, -1708" },
        { coords: convertCoords(1595, 3484), desc: "Координаты: 313, 90, -1654" },
        { coords: convertCoords(1495, 3920), desc: "Координаты: 1184, 80, -1455" },
        // Сортировка
        { coords: convertCoords(1737, 4444), desc: "Координаты: 2232, 106, -1937" },
        { coords: convertCoords(1924, 4369), desc: "Координаты: 2081, 100, -2312" },
        { coords: convertCoords(1767, 4394), desc: "Координаты: 2133, 101, -1999" },
        { coords: convertCoords(1632, 4364), desc: "Координаты: 2072, 100, -1728" },
        { coords: convertCoords(1716, 4470), desc: "Координаты: 2283, 99, -1897" },
        { coords: convertCoords(1709, 4359), desc: "Координаты: 2061, 107, -1882" },
        { coords: convertCoords(1714, 4339), desc: "Координаты: 2023, 95, -1892" },
        { coords: convertCoords(1830, 4454), desc: "Координаты: 2251, 107, -2124" },
        { coords: convertCoords(1748, 4511), desc: "Координаты: 2366, 77, -1959" },
        { coords: convertCoords(1836, 4399), desc: "Координаты: 2143, 113, -2135" },
        { coords: convertCoords(1724, 4489), desc: "Координаты: 2321, 100, -1913" },
        { coords: convertCoords(1703, 4401), desc: "Координаты: 2146, 102, -1871" },
        { coords: convertCoords(1697, 4384), desc: "Координаты: 2113, 95, -1859" },
        // Топи
        { coords: convertCoords(634, 2432), desc: "Координаты: -1793, 91, 268" },
        { coords: convertCoords(1063, 2235), desc: "Координаты: -2187, 94, -590" },
        { coords: convertCoords(835, 2575), desc: "Координаты: -1508, 93, -135" },
        { coords: convertCoords(970, 2698), desc: "Координаты: -1262, 91, -405" },
        { coords: convertCoords(661, 2184), desc: "Координаты: -2290, 96, 212" },
        // Росстань
        { coords: convertCoords(944, 3171), desc: "Координаты: -316, 84, -354" },
        { coords: convertCoords(726, 3172), desc: "Координаты: -314, 85, 84" },
        { coords: convertCoords(909, 3242), desc: "Координаты: -172, 84, -283" },
        { coords: convertCoords(866, 3206), desc: "Координаты: -245, 84, -196" },
        { coords: convertCoords(809, 3306), desc: "Координаты: -44, 85, -82" },
        { coords: convertCoords(976, 2936), desc: "Координаты: -784, 74, -417" },
        { coords: convertCoords(929, 3210), desc: "Координаты: -236, 84, -322" },
        { coords: convertCoords(1230, 3398), desc: "Координаты: 139, 77, -926" },
        { coords: convertCoords(822, 3290), desc: "Координаты: -76, 84, -110" },
        { coords: convertCoords(664, 3193), desc: "Координаты: -272, 92, 206" },
        { coords: convertCoords(899, 3144), desc: "Координаты: -369, 84, -262" },
        { coords: convertCoords(844, 3204), desc: "Координаты: -249, 107, -153" },
        { coords: convertCoords(966, 2981), desc: "Координаты: -695, 79, -398" },
        { coords: convertCoords(706, 3206), desc: "Координаты: -245, 84, 123" },
        { coords: convertCoords(811, 3166), desc: "Координаты: -325, 88, -87" },
        { coords: convertCoords(860, 3148), desc: "Координаты: -360, 84, -186" },
        { coords: convertCoords(731, 3206), desc: "Координаты: -245, 98, 74" },
        { coords: convertCoords(1268, 3543), desc: "Координаты: 429, 76, -1002" },
        { coords: convertCoords(674, 3178), desc: "Координаты: -300, 85, 187" },
        { coords: convertCoords(796, 3193), desc: "Координаты: -271, 88, -57" },
        { coords: convertCoords(1309, 3403), desc: "Координаты: 149, 86, -1084" },
        { coords: convertCoords(800, 3224), desc: "Координаты: -209, 88, -66" },
        { coords: convertCoords(870, 3135), desc: "Координаты: -388, 84, -204" },
        { coords: convertCoords(726, 3209), desc: "Координаты: -239, 105, 82" },
        { coords: convertCoords(867, 3173), desc: "Координаты: -311, 84, -200" },
        { coords: convertCoords(1144, 3414), desc: "Координаты: 170, 76, -753" },
        { coords: convertCoords(797, 3281), desc: "Координаты: -95, 85, -59" },
        { coords: convertCoords(718, 3212), desc: "Координаты: -233, 92, 100" },
        { coords: convertCoords(773, 3302), desc: "Координаты: -53, 84, -10" },
        { coords: convertCoords(561, 3154), desc: "Координаты: -349, 87, 413" },
        { coords: convertCoords(764, 3400), desc: "Координаты: 143, 90, 7" },
        { coords: convertCoords(620, 3120), desc: "Координаты: -417, 84, 294" },
        { coords: convertCoords(545, 3191), desc: "Координаты: -274, 95, 444" },
        { coords: convertCoords(595, 3194), desc: "Координаты: -269, 84, 346" },
        { coords: convertCoords(553, 3562), desc: "Координаты: 467, 86, 429" },
        { coords: convertCoords(544, 3200), desc: "Координаты: -256, 87, 446" },
        { coords: convertCoords(717, 3439), desc: "Координаты: 222, 90, 101" },
        { coords: convertCoords(787, 3384), desc: "Координаты: 112, 90, -40" },
        { coords: convertCoords(788, 3382), desc: "Координаты: 107, 95, -40" },
        { coords: convertCoords(526, 3250), desc: "Координаты: -156, 84, 483" },
        { coords: convertCoords(766, 3434), desc: "Координаты: 211, 90, 2" },
        { coords: convertCoords(770, 3413), desc: "Координаты: 169, 90, -4" },
        { coords: convertCoords(720, 3404), desc: "Координаты: 150, 90, 95" },
        { coords: convertCoords(585, 3320), desc: "Координаты: -16, 89, 364" },
        { coords: convertCoords(908, 3368), desc: "Координаты: 78, 85, -282" },
        { coords: convertCoords(766, 3780), desc: "Координаты: 904, 77, 2" },
        { coords: convertCoords(850, 3695), desc: "Координаты: 733, 84, -165" },
        { coords: convertCoords(829, 3385), desc: "Координаты: 113, 92, -124" },
        { coords: convertCoords(892, 3394), desc: "Координаты: 132, 85, -250" },
        { coords: convertCoords(790, 3682), desc: "Координаты: 707, 82, -45" },
        { coords: convertCoords(910, 3406), desc: "Координаты: 155, 84, -285" },
        { coords: convertCoords(810, 3394), desc: "Координаты: 132, 89, -86" },
        { coords: convertCoords(764, 3700), desc: "Координаты: 744, 79, 7" },
        { coords: convertCoords(962, 3503), desc: "Координаты: 349, 85, -388" },
        { coords: convertCoords(826, 3370), desc: "Координаты: 82, 92, -118" },
        { coords: convertCoords(800, 3710), desc: "Координаты: 762, 79, -64" },
        { coords: convertCoords(829, 3426), desc: "Координаты: 195, 92, -124" },
        { coords: convertCoords(831, 3682), desc: "Координаты: 708, 84, -126" },
        { coords: convertCoords(831, 3412), desc: "Координаты: 166, 85, -126" },
        { coords: convertCoords(1019, 3516), desc: "Координаты: 376, 83, -503" },
        { coords: convertCoords(972, 3584), desc: "Координаты: 512, 87, -410" },
        { coords: convertCoords(799, 3769), desc: "Координаты: 881, 74, -62" },
        { coords: convertCoords(874, 3366), desc: "Координаты: 75, 85, -214" },
        { coords: convertCoords(762, 3730), desc: "Координаты: 803, 79, 12" },
        { coords: convertCoords(960, 3475), desc: "Координаты: 293, 85, -385" },
        { coords: convertCoords(869, 3399), desc: "Координаты: 141, 85, -203" },
        { coords: convertCoords(885, 3426), desc: "Координаты: 194, 85, -235" },
        { coords: convertCoords(885, 3726), desc: "Координаты: 795, 81, -234" },
        { coords: convertCoords(991, 3472), desc: "Координаты: 288, 85, -446" },
        { coords: convertCoords(918, 3427), desc: "Координаты: 196, 85, -300" },
        { coords: convertCoords(968, 3485), desc: "Координаты: 313, 85, -400" },
        { coords: convertCoords(804, 3657), desc: "Координаты: 656, 84, -74" },
        { coords: convertCoords(930, 3778), desc: "Координаты: 898, 78, -325" },
        { coords: convertCoords(902, 3739), desc: "Координаты: 822, 79, -270" },
        { coords: convertCoords(848, 3381), desc: "Координаты: 105, 83, -161" },
        { coords: convertCoords(864, 3696), desc: "Координаты: 735, 83, -193" },
        { coords: convertCoords(934, 3421), desc: "Координаты: 185, 85, -333" },
        { coords: convertCoords(980, 3521), desc: "Координаты: 384, 82, -425" },
        { coords: convertCoords(880, 3750), desc: "Координаты: 842, 79, -226" },
        { coords: convertCoords(744, 3682), desc: "Координаты: 707, 84, 46" },
        { coords: convertCoords(726, 3705), desc: "Координаты: 753, 78, 83" },
        { coords: convertCoords(785, 3643), desc: "Координаты: 629, 84, -35" },
        { coords: convertCoords(757, 3696), desc: "Координаты: 736, 79, 21" },
        { coords: convertCoords(875, 3705), desc: "Координаты: 752, 84, -214" },
        { coords: convertCoords(963, 3450), desc: "Координаты: 243, 85, -390" },
        { coords: convertCoords(763, 3674), desc: "Координаты: 690, 81, 9" },
        { coords: convertCoords(724, 3655), desc: "Координаты: 653, 80, 87" },
        { coords: convertCoords(850, 3359), desc: "Координаты: 60, 86, -165" }
    ],

    // ==================== КОНТЕЙНЕРЫ: БОЧКИ ====================
    barrels: [
        // Армейские склады
        { coords: convertCoords(3496, 2958), desc: "Координаты: -741, 90, -5457" },
        { coords: convertCoords(3570, 3084), desc: "Координаты: -488, 89, -5603" },
        { coords: convertCoords(3553, 2642), desc: "Координаты: -1372, 86, -5571" },
        { coords: convertCoords(3619, 3159), desc: "Координаты: -338, 85, -5702" },
        { coords: convertCoords(3509, 2996), desc: "Координаты: -664, 85, -5482" },
        { coords: convertCoords(3664, 2944), desc: "Координаты: -767, 76, -5793" },
        { coords: convertCoords(3491, 2995), desc: "Координаты: -666, 90, -5447" },
        { coords: convertCoords(3496, 3137), desc: "Координаты: -382, 90, -5456" },
        { coords: convertCoords(3723, 3065), desc: "Координаты: -526, 88, -5909" },
        { coords: convertCoords(3649, 2716), desc: "Координаты: -1224, 88, -5763" },
        { coords: convertCoords(3536, 2493), desc: "Координаты: -1669, 87, -5536" },
        { coords: convertCoords(3519, 2720), desc: "Координаты: -1216, 82, -5501" },
        { coords: convertCoords(3604, 3028), desc: "Координаты: -600, 85, -5672" },
        { coords: convertCoords(3514, 3012), desc: "Координаты: -631, 85, -5492" },
        { coords: convertCoords(3528, 2886), desc: "Координаты: -885, 85, -5521" },
        { coords: convertCoords(3515, 3074), desc: "Координаты: -507, 89, -5494" },
        { coords: convertCoords(3750, 3140), desc: "Координаты: -377, 94, -5963" },
        { coords: convertCoords(3512, 3126), desc: "Координаты: -403, 89, -5488" },
        { coords: convertCoords(3681, 2712), desc: "Координаты: -1233, 88, -5826" },
        { coords: convertCoords(3700, 3044), desc: "Координаты: -568, 88, -5864" },
        { coords: convertCoords(3493, 3129), desc: "Координаты: -399, 90, -5450" },
        { coords: convertCoords(3657, 2590), desc: "Координаты: -1475, 95, -5779" },
        { coords: convertCoords(3753, 2926), desc: "Координаты: -803, 88, -5971" },
        // Муравейник
        { coords: convertCoords(2956, 3431), desc: "Координаты: 206, 85, -4376" },
        { coords: convertCoords(2757, 3478), desc: "Координаты: 301, 73, -3978" },
        { coords: convertCoords(2845, 3488), desc: "Координаты: 320, 72, -4155" },
        { coords: convertCoords(2930, 3337), desc: "Координаты: 17, 73, -4324" },
        { coords: convertCoords(2815, 3333), desc: "Координаты: 11, 74, -4095" },
        { coords: convertCoords(2955, 3415), desc: "Координаты: 174, 85, -4374" },
        { coords: convertCoords(2893, 3474), desc: "Координаты: 292, 72, -4249" },
        { coords: convertCoords(2712, 3448), desc: "Координаты: 240, 72, -3887" },
        { coords: convertCoords(2915, 3472), desc: "Координаты: 287, 72, -4295" },
        { coords: convertCoords(2856, 3424), desc: "Координаты: 192, 85, -4177" },
        { coords: convertCoords(2749, 3418), desc: "Координаты: 179, 75, -3962" },
        { coords: convertCoords(2764, 3482), desc: "Координаты: 308, 73, -3992" },
        { coords: convertCoords(2738, 3538), desc: "Координаты: 420, 82, -3941" },
        { coords: convertCoords(2965, 3197), desc: "Координаты: -282, 92, -4394" },
        { coords: convertCoords(2948, 3146), desc: "Координаты: -365, 88, -4360" },
        { coords: convertCoords(2950, 3171), desc: "Координаты: -314, 91, -4363" },
        { coords: convertCoords(3014, 3223), desc: "Координаты: -211, 83, -4492" },
        { coords: convertCoords(2926, 3289), desc: "Координаты: -79, 72, -4315" },
        { coords: convertCoords(2699, 3405), desc: "Координаты: 155, 72, -3861" },
        { coords: convertCoords(2782, 3427), desc: "Координаты: 198, 72, -4029" },
        { coords: convertCoords(2917, 3447), desc: "Координаты: 238, 72, -4299" },
        { coords: convertCoords(2788, 3372), desc: "Координаты: 88, 73, -4041" },
        { coords: convertCoords(2824, 3428), desc: "Координаты: 201, 85, -4113" },
        { coords: convertCoords(3010, 3392), desc: "Координаты: 128, 72, -4485" },
        { coords: convertCoords(2979, 3367), desc: "Координаты: 79, 81, -4423" },
        { coords: convertCoords(2961, 3426), desc: "Координаты: 195, 85, -4385" },
        { coords: convertCoords(2752, 3216), desc: "Координаты: -224, 80, -3967" },
        { coords: convertCoords(2920, 3293), desc: "Координаты: -70, 75, -4302" },
        { coords: convertCoords(2974, 3339), desc: "Координаты: 22, 72, -4413" },
        { coords: convertCoords(2877, 3290), desc: "Координаты: -75, 72, -4219" },
        // Полесское
        { coords: convertCoords(3119, 2730), desc: "Координаты: -1196, 95, -4702" },
        { coords: convertCoords(3065, 2733), desc: "Координаты: -1190, 76, -4594" },
        { coords: convertCoords(3285, 2707), desc: "Координаты: -1242, 85, -5035" },
        { coords: convertCoords(3223, 2582), desc: "Координаты: -1491, 145, -4909" },
        { coords: convertCoords(3232, 2767), desc: "Координаты: -1122, 73, -4927" },
        { coords: convertCoords(3362, 2739), desc: "Координаты: -1178, 85, -5187" },
        { coords: convertCoords(3327, 2667), desc: "Координаты: -1323, 85, -5119" },
        { coords: convertCoords(3311, 2653), desc: "Координаты: -1350, 85, -5085" },
        { coords: convertCoords(3036, 2686), desc: "Координаты: -1284, 75, -4537" },
        { coords: convertCoords(3112, 2673), desc: "Координаты: -1311, 77, -4689" },
        { coords: convertCoords(3007, 2792), desc: "Координаты: -1071, 83, -4479" },
        { coords: convertCoords(3122, 2837), desc: "Координаты: -982, 79, -4709" },
        { coords: convertCoords(3307, 2688), desc: "Координаты: -1281, 85, -5078" },
        { coords: convertCoords(3316, 2620), desc: "Координаты: -1416, 85, -5096" },
        { coords: convertCoords(3296, 2772), desc: "Координаты: -1113, 85, -5057" },
        { coords: convertCoords(3307, 2782), desc: "Координаты: -1093, 85, -5078" },
        { coords: convertCoords(3089, 2793), desc: "Координаты: -1070, 78, -4641" },
        { coords: convertCoords(3143, 2693), desc: "Координаты: -1269, 87, -4751" },
        { coords: convertCoords(3096, 2805), desc: "Координаты: -1047, 79, -4656" },
        { coords: convertCoords(2972, 2807), desc: "Координаты: -1043, 83, -4409" },
        { coords: convertCoords(3002, 2819), desc: "Координаты: -1017, 83, -4469" },
        { coords: convertCoords(3228, 2707), desc: "Координаты: -1241, 76, -4920" },
        { coords: convertCoords(3064, 2839), desc: "Координаты: -977, 86, -4592" },
        { coords: convertCoords(3144, 2808), desc: "Координаты: -1041, 74, -4753" },
        { coords: convertCoords(3065, 2679), desc: "Координаты: -1299, 77, -4595" },
        { coords: convertCoords(3313, 2538), desc: "Координаты: -1580, 87, -5091" },
        { coords: convertCoords(3364, 2766), desc: "Координаты: -1124, 85, -5192" },
        { coords: convertCoords(3330, 2861), desc: "Координаты: -935, 78, -5125" },
        { coords: convertCoords(3253, 2844), desc: "Координаты: -967, 73, -4969" },
        { coords: convertCoords(3220, 2580), desc: "Координаты: -1496, 97, -4904" },
        // Поляна
        { coords: convertCoords(2993, 2290), desc: "Координаты: -2076, 72, -4449" },
        { coords: convertCoords(2834, 2386), desc: "Координаты: -1883, 91, -4131" },
        { coords: convertCoords(2827, 2444), desc: "Координаты: -1769, 90, -4118" },
        { coords: convertCoords(2966, 2390), desc: "Координаты: -1877, 90, -4397" },
        { coords: convertCoords(2853, 2344), desc: "Координаты: -1968, 89, -4171" },
        { coords: convertCoords(2812, 2329), desc: "Координаты: -1999, 90, -4088" },
        { coords: convertCoords(2854, 2418), desc: "Координаты: -1819, 90, -4171" },
        { coords: convertCoords(2847, 2364), desc: "Координаты: -1929, 90, -4159" },
        // Янтарь
        { coords: convertCoords(2547, 1941), desc: "Координаты: -2773, 67, -3556" },
        { coords: convertCoords(2538, 2210), desc: "Координаты: -2235, 70, -3538" },
        { coords: convertCoords(2691, 2028), desc: "Координаты: -2599, 61, -3846" },
        { coords: convertCoords(2644, 2321), desc: "Координаты: -2014, 80, -3751" },
        { coords: convertCoords(2756, 2288), desc: "Координаты: -2079, 80, -3974" },
        { coords: convertCoords(2690, 2031), desc: "Координаты: -2594, 62, -3842" },
        { coords: convertCoords(2697, 2166), desc: "Координаты: -2323, 40, -3856" },
        // Дикая территория
        { coords: convertCoords(2767, 2620), desc: "Координаты: -1416, 91, -3999" },
        { coords: convertCoords(2824, 2819), desc: "Координаты: -1017, 76, -4114" },
        { coords: convertCoords(2779, 2595), desc: "Координаты: -1466, 95, -4023" },
        { coords: convertCoords(2796, 2653), desc: "Координаты: -1349, 80, -4058" },
        { coords: convertCoords(2723, 2695), desc: "Координаты: -1264, 86, -3911" },
        { coords: convertCoords(2755, 2590), desc: "Координаты: -1475, 154, -3975" },
        { coords: convertCoords(2633, 2653), desc: "Координаты: -1349, 80, -3731" },
        { coords: convertCoords(2632, 2680), desc: "Координаты: -1295, 81, -3729" },
        { coords: convertCoords(2771, 2798), desc: "Координаты: -1059, 79, -4007" },
        { coords: convertCoords(2720, 2773), desc: "Координаты: -1110, 81, -3906" },
        { coords: convertCoords(2837, 2787), desc: "Координаты: -1081, 86, -4138" },
        { coords: convertCoords(2671, 2809), desc: "Координаты: -1037, 86, -3807" },
        { coords: convertCoords(2765, 2658), desc: "Координаты: -1338, 86, -3996" },
        { coords: convertCoords(2651, 2632), desc: "Координаты: -1390, 86, -3768" },
        { coords: convertCoords(2654, 2604), desc: "Координаты: -1448, 85, -3774" },
        { coords: convertCoords(2736, 2604), desc: "Координаты: -1446, 88, -3938" },
        { coords: convertCoords(2803, 2645), desc: "Координаты: -1365, 84, -4072" },
        { coords: convertCoords(2714, 2604), desc: "Координаты: -1446, 85, -3892" },
        { coords: convertCoords(2749, 2674), desc: "Координаты: -1307, 80, -3964" },
        { coords: convertCoords(2786, 2738), desc: "Координаты: -1179, 80, -4037" },
        { coords: convertCoords(2754, 2627), desc: "Координаты: -1401, 91, -3972" },
        { coords: convertCoords(2724, 2779), desc: "Координаты: -1097, 79, -3914" },
        { coords: convertCoords(2721, 2835), desc: "Координаты: -985, 80, -3907" },
        // Свалка
        { coords: convertCoords(2167, 2706), desc: "Координаты: -1242, 85, -2797" },
        { coords: convertCoords(2091, 2794), desc: "Координаты: -1066, 89, -2646" },
        { coords: convertCoords(2298, 3432), desc: "Координаты: 209, 79, -3059" },
        { coords: convertCoords(2005, 2875), desc: "Координаты: -905, 80, -2473" },
        { coords: convertCoords(2143, 2725), desc: "Координаты: -1206, 87, -2750" },
        { coords: convertCoords(1940, 2817), desc: "Координаты: -1022, 84, -2342" },
        { coords: convertCoords(2112, 2700), desc: "Координаты: -1256, 101, -2687" },
        { coords: convertCoords(1969, 2796), desc: "Координаты: -1063, 83, -2400" },
        { coords: convertCoords(2412, 3173), desc: "Координаты: -310, 79, -3288" },
        { coords: convertCoords(2410, 3185), desc: "Координаты: -286, 82, -3283" },
        { coords: convertCoords(2232, 3387), desc: "Координаты: 119, 84, -2928" },
        { coords: convertCoords(2150, 3106), desc: "Координаты: -443, 79, -2763" },
        { coords: convertCoords(2128, 2801), desc: "Координаты: -1052, 88, -2719" },
        { coords: convertCoords(1971, 2780), desc: "Координаты: -1096, 83, -2405" },
        { coords: convertCoords(2106, 2705), desc: "Координаты: -1244, 122, -2675" },
        { coords: convertCoords(2070, 2783), desc: "Координаты: -1088, 84, -2604" },
        { coords: convertCoords(2238, 3385), desc: "Координаты: 115, 84, -2939" },
        { coords: convertCoords(2098, 2803), desc: "Координаты: -1049, 84, -2659" },
        { coords: convertCoords(2236, 3505), desc: "Координаты: 355, 71, -2935" },
        { coords: convertCoords(2155, 2789), desc: "Координаты: -1076, 83, -2774" },
        { coords: convertCoords(2103, 3025), desc: "Координаты: -605, 75, -2669" },
        { coords: convertCoords(2076, 2790), desc: "Координаты: -1076, 83, -2616" },
        { coords: convertCoords(2294, 3436), desc: "Координаты: 217, 79, -3052" },
        { coords: convertCoords(2052, 2998), desc: "Координаты: -660, 79, -2566" },
        { coords: convertCoords(2075, 2804), desc: "Координаты: -1047, 87, -2614" },
        { coords: convertCoords(2041, 2806), desc: "Координаты: -1044, 86, -2545" },
        { coords: convertCoords(2242, 3512), desc: "Координаты: 368, 71, -2947" },
        { coords: convertCoords(2119, 2789), desc: "Координаты: -1077, 84, -2700" },
        { coords: convertCoords(2102, 2808), desc: "Координаты: -1038, 84, -2668" },
        { coords: convertCoords(2050, 3013), desc: "Координаты: -629, 79, -2562" },
        { coords: convertCoords(2156, 2781), desc: "Координаты: -1093, 87, -2775" },
        { coords: convertCoords(2074, 2674), desc: "Координаты: -1308, 81, -2610" },
        { coords: convertCoords(2100, 2765), desc: "Координаты: -1124, 83, -2664" },
        { coords: convertCoords(2166, 2708), desc: "Координаты: -1239, 84, -2795" },
        { coords: convertCoords(2319, 3004), desc: "Координаты: -647, 75, -3100" },
        { coords: convertCoords(2166, 2713), desc: "Координаты: -1229, 82, -2796" },
        { coords: convertCoords(2247, 2888), desc: "Координаты: -880, 76, -2957" },
        { coords: convertCoords(2120, 3014), desc: "Координаты: -628, 75, -2704" },
        { coords: convertCoords(2117, 2699), desc: "Координаты: -1257, 101, -2698" },
        { coords: convertCoords(2079, 2659), desc: "Координаты: -1337, 85, -2622" },
        { coords: convertCoords(2311, 3003), desc: "Координаты: -650, 76, -3086" },
        { coords: convertCoords(2046, 2793), desc: "Координаты: -1068, 86, -2555" },
        { coords: convertCoords(2069, 2662), desc: "Координаты: -1331, 84, -2602" },
        { coords: convertCoords(2156, 3115), desc: "Координаты: -425, 77, -2774" },
        { coords: convertCoords(2111, 2697), desc: "Координаты: -1260, 122, -2684" },
        { coords: convertCoords(2105, 2692), desc: "Координаты: -1272, 101, -2673" },
        { coords: convertCoords(1923, 2774), desc: "Координаты: -1107, 83, -2308" },
        { coords: convertCoords(2038, 2804), desc: "Координаты: -1047, 85, -2538" },
        { coords: convertCoords(2167, 2714), desc: "Координаты: -1227, 82, -2796" },
        { coords: convertCoords(2140, 2707), desc: "Координаты: -1240, 82, -2743" },
        { coords: convertCoords(2225, 2792), desc: "Координаты: -1070, 86, -2914" },
        { coords: convertCoords(2221, 2787), desc: "Координаты: -1082, 86, -2906" },
        { coords: convertCoords(2126, 2786), desc: "Координаты: -1084, 89, -2716" },
        { coords: convertCoords(2055, 3091), desc: "Координаты: -473, 79, -2572" },
        { coords: convertCoords(2050, 3082), desc: "Координаты: -490, 79, -2562" },
        { coords: convertCoords(2236, 3385), desc: "Координаты: 115, 84, -2935" },
        { coords: convertCoords(2049, 2654), desc: "Координаты: -1348, 81, -2560" },
        { coords: convertCoords(2138, 2795), desc: "Координаты: -1065, 83, -2738" },
        { coords: convertCoords(1902, 3532), desc: "Координаты: 408, 79, -2266" },
        { coords: convertCoords(1883, 3500), desc: "Координаты: 344, 80, -2230" },
        { coords: convertCoords(1891, 3324), desc: "Координаты: -9, 90, -2244" },
        { coords: convertCoords(1826, 3363), desc: "Координаты: 68, 93, -2114" },
        { coords: convertCoords(1746, 3284), desc: "Координаты: -90, 101, -1956" },
        { coords: convertCoords(1926, 3453), desc: "Координаты: 248, 81, -2315" },
        { coords: convertCoords(1892, 3321), desc: "Координаты: -15, 90, -2247" },
        { coords: convertCoords(1853, 3382), desc: "Координаты: 108, 93, -2169" },
        // Тёмная долина
        { coords: convertCoords(2345, 4078), desc: "Координаты: 1501, 79, -3151" },
        { coords: convertCoords(2367, 3884), desc: "Координаты: 1112, 85, -3196" },
        { coords: convertCoords(2235, 4053), desc: "Координаты: 1451, 86, -2932" },
        { coords: convertCoords(2358, 4088), desc: "Координаты: 1520, 79, -3177" },
        { coords: convertCoords(2376, 4063), desc: "Координаты: 1470, 79, -3214" },
        { coords: convertCoords(2338, 4102), desc: "Координаты: 1548, 78, -3138" },
        { coords: convertCoords(2223, 4053), desc: "Координаты: 1449, 79, -2907" },
        { coords: convertCoords(2357, 3841), desc: "Координаты: 1026, 73, -3177" },
        { coords: convertCoords(2262, 4101), desc: "Координаты: 1547, 78, -2987" },
        { coords: convertCoords(2271, 4076), desc: "Координаты: 1496, 79, -3004" },
        { coords: convertCoords(2225, 4062), desc: "Координаты: 1469, 78, -2912" },
        { coords: convertCoords(2346, 4077), desc: "Координаты: 1499, 79, -3154" },
        { coords: convertCoords(2373, 3855), desc: "Координаты: 1053, 78, -3208" },
        { coords: convertCoords(2269, 4081), desc: "Координаты: 1506, 79, -3000" },
        { coords: convertCoords(2326, 3832), desc: "Координаты: 1008, 76, -3113" },
        { coords: convertCoords(2360, 3845), desc: "Координаты: 1034, 86, -3181" },
        // Агропром
        { coords: convertCoords(2373, 1983), desc: "Координаты: -2689, 78, -3210" },
        { coords: convertCoords(2097, 2164), desc: "Координаты: -2327, 82, -2658" },
        { coords: convertCoords(2187, 1978), desc: "Координаты: -2699, 84, -2837" },
        { coords: convertCoords(2124, 2160), desc: "Координаты: -2335, 79, -2712" },
        { coords: convertCoords(2023, 2065), desc: "Координаты: -2524, 80, -2510" },
        { coords: convertCoords(2229, 2030), desc: "Координаты: -2595, 84, -2923" },
        { coords: convertCoords(2124, 2018), desc: "Координаты: -2619, 78, -2712" },
        { coords: convertCoords(2011, 2056), desc: "Координаты: -2543, 82, -2486" },
        { coords: convertCoords(2128, 2160), desc: "Координаты: -2336, 79, -2720" },
        // Подземелья Агропрома
        { coords: convertCoords(2209, 2338), desc: "Координаты: -1979, 58, -2882", level: "underground" },
        { coords: convertCoords(2141, 2315), desc: "Координаты: -2024, 71, -2746", level: "underground" },
        { coords: convertCoords(2139, 2316), desc: "Координаты: -2024, 71, -2742", level: "underground" },
        { coords: convertCoords(2149, 2342), desc: "Координаты: -1971, 79, -2761", level: "underground" },
        // Редколесье
        { coords: convertCoords(1650, 2210), desc: "Координаты: -2236, 88, -1762" },
        { coords: convertCoords(1768, 2508), desc: "Координаты: -1640, 85, -1998" },
        { coords: convertCoords(1870, 2524), desc: "Координаты: -1607, 91, -2202" },
        { coords: convertCoords(1786, 2411), desc: "Координаты: -1834, 83, -2033" },
        { coords: convertCoords(1786, 2509), desc: "Координаты: -1638, 85, -2033" },
        { coords: convertCoords(1582, 2197), desc: "Координаты: -2262, 84, -1625" },
        { coords: convertCoords(1579, 2195), desc: "Координаты: -2266, 85, -1621" },
        { coords: convertCoords(1468, 2298), desc: "Координаты: -2060, 86, -1397" },
        { coords: convertCoords(1547, 2214), desc: "Координаты: -2229, 85, -1556" },
        { coords: convertCoords(1736, 2528), desc: "Координаты: -1600, 85, -1935" },
        { coords: convertCoords(1741, 2452), desc: "Координаты: -1752, 85, -1944" },
        { coords: convertCoords(1549, 2198), desc: "Координаты: -2260, 85, -1560" },
        { coords: convertCoords(1580, 2212), desc: "Координаты: -2233, 85, -1623" },
        { coords: convertCoords(1489, 2293), desc: "Координаты: -2070, 86, -1441" },
        { coords: convertCoords(1876, 2515), desc: "Координаты: -1625, 91, -2215" },
        // Стройплощадка
        { coords: convertCoords(1468, 1828), desc: "Координаты: -3000, 90, -1400" },
        { coords: convertCoords(1424, 1774), desc: "Координаты: -3107, 94, -1311" },
        { coords: convertCoords(1439, 1764), desc: "Координаты: -3126, 95, -1342" },
        { coords: convertCoords(1442, 1858), desc: "Координаты: -2940, 91, -1348" },
        { coords: convertCoords(1453, 1802), desc: "Координаты: -3051, 94, -1370" },
        { coords: convertCoords(1487, 1787), desc: "Координаты: -3081, 93, -1438" },
        { coords: convertCoords(1443, 1707), desc: "Координаты: -3241, 95, -1349" },
        { coords: convertCoords(1409, 1762), desc: "Координаты: -3131, 105, -1283" },
        { coords: convertCoords(1439, 1704), desc: "Координаты: -3248, 95, -1341" },
        { coords: convertCoords(1458, 1726), desc: "Координаты: -3203, 101, -1381" },
        { coords: convertCoords(1455, 1743), desc: "Координаты: -3168, 94, -1375" },
        { coords: convertCoords(1460, 1722), desc: "Координаты: -3211, 94, -1383" },
        { coords: convertCoords(1512, 1797), desc: "Координаты: -3062, 94, -1489" },
        { coords: convertCoords(1453, 1764), desc: "Координаты: -3128, 107, -1369" },
        { coords: convertCoords(1509, 1713), desc: "Координаты: -3229, 93, -1481" },
        { coords: convertCoords(1495, 1759), desc: "Координаты: -3138, 92, -1454" },
        // Кордон
        { coords: convertCoords(1815, 2828), desc: "Координаты: -1001, 76, -2094" },
        { coords: convertCoords(1786, 2834), desc: "Координаты: -989, 77, -2036" },
        { coords: convertCoords(1784, 2838), desc: "Координаты: -980, 83, -2033" },
        { coords: convertCoords(1764, 2851), desc: "Координаты: -954, 77, -1992" },
        { coords: convertCoords(1801, 2830), desc: "Координаты: -996, 83, -2067" },
        { coords: convertCoords(1788, 2862), desc: "Координаты: -932, 77, -2039" },
        // Тёмная лощина
        { coords: convertCoords(1849, 3699), desc: "Координаты: 741, 72, -2162" },
        { coords: convertCoords(1398, 4046), desc: "Координаты: 1436, 104, -1260" },
        { coords: convertCoords(1553, 3822), desc: "Координаты: 988, 77, -1570" },
        { coords: convertCoords(1643, 3953), desc: "Координаты: 1251, 66, -1750" },
        { coords: convertCoords(1461, 4052), desc: "Координаты: 1448, 72, -1385" },
        { coords: convertCoords(1392, 3756), desc: "Координаты: 855, 91, -1248" },
        { coords: convertCoords(1526, 3860), desc: "Координаты: 1064, 80, -1516" },
        { coords: convertCoords(1454, 3763), desc: "Координаты: 869, 79, -1373" },
        { coords: convertCoords(1667, 3898), desc: "Координаты: 1139, 55, -1798" },
        { coords: convertCoords(1427, 3767), desc: "Координаты: 878, 80, -1319" },
        { coords: convertCoords(1809, 3679), desc: "Координаты: 702, 82, -2083" },
        { coords: convertCoords(1426, 3764), desc: "Координаты: 871, 79, -1317" },
        { coords: convertCoords(1362, 4065), desc: "Координаты: 1475, 99, -1189" },
        { coords: convertCoords(1489, 4080), desc: "Координаты: 1504, 71, -1441" },
        { coords: convertCoords(1454, 4030), desc: "Координаты: 1403, 79, -1371" },
        { coords: convertCoords(1468, 4020), desc: "Координаты: 1384, 79, -1399" },
        { coords: convertCoords(1850, 3696), desc: "Координаты: 735, 80, -2163" },
        { coords: convertCoords(1545, 3811), desc: "Координаты: 966, 80, -1554" },
        { coords: convertCoords(1775, 3948), desc: "Координаты: 1241, 68, -2015" },
        { coords: convertCoords(1532, 3814), desc: "Координаты: 971, 79, -1527" },
        { coords: convertCoords(1849, 3700), desc: "Координаты: 745, 72, -2163" },
        { coords: convertCoords(1667, 3934), desc: "Координаты: 1212, 101, -1797" },
        { coords: convertCoords(1853, 3677), desc: "Координаты: 698, 79, -2170" },
        { coords: convertCoords(1715, 3575), desc: "Координаты: 493, 80, -1893" },
        // Сортировка
        { coords: convertCoords(1914, 4340), desc: "Координаты: 2023, 100, -2292" },
        { coords: convertCoords(1688, 4336), desc: "Координаты: 2016, 100, -1841" },
        { coords: convertCoords(1774, 4509), desc: "Координаты: 2363, 77, -2013" },
        { coords: convertCoords(1746, 4387), desc: "Координаты: 2119, 100, -1956" },
        { coords: convertCoords(1850, 4374), desc: "Координаты: 2091, 101, -2165" },
        { coords: convertCoords(1720, 4345), desc: "Координаты: 2034, 100, -1903" },
        { coords: convertCoords(1769, 4424), desc: "Координаты: 2191, 101, -2003" },
        { coords: convertCoords(1665, 4382), desc: "Координаты: 2108, 100, -1795" },
        { coords: convertCoords(1706, 4519), desc: "Координаты: 2383, 77, -1876" },
        { coords: convertCoords(1669, 4345), desc: "Координаты: 2035, 100, -1801" },
        { coords: convertCoords(1888, 4359), desc: "Координаты: 2062, 100, -2241" },
        { coords: convertCoords(1849, 4358), desc: "Координаты: 2061, 100, -2162" },
        { coords: convertCoords(1726, 4417), desc: "Координаты: 2179, 106, -1915" },
        { coords: convertCoords(1777, 4496), desc: "Координаты: 2336, 100, -2018" },
        // Топи
        { coords: convertCoords(829, 2581), desc: "Координаты: -1495, 98, -123" },
        { coords: convertCoords(890, 2316), desc: "Координаты: -2026, 98, -246" },
        { coords: convertCoords(696, 2602), desc: "Координаты: -1454, 92, 144" },
        { coords: convertCoords(807, 2454), desc: "Координаты: -1748, 92, -79" },
        { coords: convertCoords(848, 2587), desc: "Координаты: -1482, 93, -161" },
        { coords: convertCoords(689, 2164), desc: "Координаты: -2329, 94, 157" },
        { coords: convertCoords(974, 2701), desc: "Координаты: -1256, 90, -412" },
        { coords: convertCoords(809, 2452), desc: "Координаты: -1752, 92, -82" },
        { coords: convertCoords(668, 2218), desc: "Координаты: -2221, 94, 198" },
        { coords: convertCoords(611, 2418), desc: "Координаты: -1822, 92, 314" },
        { coords: convertCoords(608, 2397), desc: "Координаты: -1863, 92, 318" },
        { coords: convertCoords(1062, 2238), desc: "Координаты: -2181, 94, -589" },
        { coords: convertCoords(871, 2304), desc: "Координаты: -2049, 99, -208" },
        { coords: convertCoords(677, 2170), desc: "Координаты: -2318, 94, 180" },
        { coords: convertCoords(784, 2116), desc: "Координаты: -2424, 97, -32" },
        { coords: convertCoords(956, 2684), desc: "Координаты: -1288, 80, -377" },
        { coords: convertCoords(761, 2666), desc: "Координаты: -1326, 93, 13" },
        { coords: convertCoords(842, 2573), desc: "Координаты: -1511, 95, -148" },
        { coords: convertCoords(690, 2609), desc: "Координаты: -1439, 92, 155" },
        { coords: convertCoords(840, 2579), desc: "Координаты: -1500, 95, -146" },
        // Росстань
        { coords: convertCoords(1272, 3573), desc: "Координаты: 490, 74, -1009" },
        { coords: convertCoords(818, 3224), desc: "Координаты: -209, 88, -100" },
        { coords: convertCoords(754, 3301), desc: "Координаты: -54, 84, 26" },
        { coords: convertCoords(867, 3200), desc: "Координаты: -257, 84, -199" },
        { coords: convertCoords(1241, 3403), desc: "Координаты: 149, 79, -947" },
        { coords: convertCoords(995, 2990), desc: "Координаты: -677, 84, -455" },
        { coords: convertCoords(1317, 3469), desc: "Координаты: 281, 73, -1100" },
        { coords: convertCoords(924, 3171), desc: "Координаты: -315, 83, -314" },
        { coords: convertCoords(1277, 3536), desc: "Координаты: 414, 74, -1019" },
        { coords: convertCoords(978, 2930), desc: "Координаты: -798, 74, -421" },
        { coords: convertCoords(1014, 2996), desc: "Координаты: -665, 84, -492" },
        { coords: convertCoords(943, 2981), desc: "Координаты: -696, 73, -351" },
        { coords: convertCoords(748, 3448), desc: "Координаты: 239, 89, 39" },
        { coords: convertCoords(814, 3539), desc: "Координаты: 420, 79, -93" },
        { coords: convertCoords(781, 3555), desc: "Координаты: 453, 78, -26" },
        { coords: convertCoords(848, 3407), desc: "Координаты: 156, 96, -160" },
        { coords: convertCoords(848, 3419), desc: "Координаты: 181, 85, -161" },
        { coords: convertCoords(844, 3534), desc: "Координаты: 410, 77, -154" },
        { coords: convertCoords(826, 3510), desc: "Координаты: 363, 77, -116" },
        { coords: convertCoords(774, 3526), desc: "Координаты: 394, 77, -13" },
        { coords: convertCoords(861, 3510), desc: "Координаты: 363, 74, -188" },
        { coords: convertCoords(831, 3363), desc: "Координаты: 69, 85, -128" },
        { coords: convertCoords(755, 3686), desc: "Координаты: 715, 79, 25" },
        { coords: convertCoords(824, 3696), desc: "Координаты: 735, 81, -112" },
        { coords: convertCoords(828, 3558), desc: "Координаты: 459, 80, -121" },
        { coords: convertCoords(891, 3561), desc: "Координаты: 465, 78, -248" },
        { coords: convertCoords(815, 3604), desc: "Координаты: 550, 80, -94" },
        { coords: convertCoords(809, 3574), desc: "Координаты: 492, 79, -84" },
        { coords: convertCoords(836, 3630), desc: "Координаты: 602, 80, -137" },
        { coords: convertCoords(837, 3746), desc: "Координаты: 834, 78, -138" },
        { coords: convertCoords(861, 3630), desc: "Координаты: 603, 75, -187" },
        { coords: convertCoords(857, 3575), desc: "Координаты: 492, 74, -179" },
        { coords: convertCoords(747, 3678), desc: "Координаты: 699, 79, 41" },
        { coords: convertCoords(800, 3521), desc: "Координаты: 384, 79, -65" },
        { coords: convertCoords(919, 3373), desc: "Координаты: 89, 84, -303" },
        { coords: convertCoords(902, 3511), desc: "Координаты: 364, 78, -269" },
        { coords: convertCoords(848, 3600), desc: "Координаты: 542, 77, -160" },
        { coords: convertCoords(878, 3602), desc: "Координаты: 548, 77, -220" },
        { coords: convertCoords(914, 3476), desc: "Координаты: 295, 78, -293" },
        { coords: convertCoords(883, 3475), desc: "Координаты: 294, 77, -231" },
        { coords: convertCoords(818, 3679), desc: "Координаты: 701, 82, -101" },
        { coords: convertCoords(828, 3591), desc: "Координаты: 525, 74, -121" },
        { coords: convertCoords(879, 3535), desc: "Координаты: 412, 75, -223" },
        { coords: convertCoords(841, 3388), desc: "Координаты: 119, 77, -147" }
    ],

    // ==================== КОНТЕЙНЕРЫ: ИНСТРУМЕНТЫ ====================
    tools: [
        // Армейские склады
        { coords: convertCoords(3760, 2867), desc: "Координаты: -922, 95, -5984" },
        { coords: convertCoords(3652, 2735), desc: "Координаты: -1185, 95, -5768" },
        { coords: convertCoords(3493, 3168), desc: "Координаты: -320, 94, -5450" },
        { coords: convertCoords(3672, 2942), desc: "Координаты: -773, 80, -5809" },
        { coords: convertCoords(3750, 3155), desc: "Координаты: -346, 95, -5965" },
        { coords: convertCoords(3462, 2436), desc: "Координаты: -1785, 91, -5389" },
        { coords: convertCoords(3704, 2634), desc: "Координаты: -1387, 94, -5873" },
        { coords: convertCoords(3519, 2419), desc: "Координаты: -1819, 96, -5501" },
        { coords: convertCoords(3475, 2430), desc: "Координаты: -1796, 92, -5414" },
        { coords: convertCoords(3428, 2433), desc: "Координаты: -1790, 91, -5320" },
        { coords: convertCoords(3518, 2433), desc: "Координаты: -1790, 92, -5500" },
        { coords: convertCoords(3704, 3082), desc: "Координаты: -492, 89, -5871" },
        { coords: convertCoords(3645, 2930), desc: "Координаты: -796, 80, -5753" },
        { coords: convertCoords(3401, 2390), desc: "Координаты: -1876, 89, -5267" },
        { coords: convertCoords(3696, 2966), desc: "Координаты: -724, 80, -5857" },
        { coords: convertCoords(3700, 3024), desc: "Координаты: -608, 88, -5865" },
        { coords: convertCoords(3485, 2987), desc: "Координаты: -681, 90, -5433" },
        { coords: convertCoords(3713, 3068), desc: "Координаты: -521, 89, -5889" },
        { coords: convertCoords(3727, 3040), desc: "Координаты: -576, 90, -5918" },
        { coords: convertCoords(3686, 3029), desc: "Координаты: -599, 88, -5836" },
        { coords: convertCoords(3515, 3113), desc: "Координаты: -430, 91, -5494" },
        { coords: convertCoords(3672, 2916), desc: "Координаты: -824, 80, -5808" },
        { coords: convertCoords(3528, 2580), desc: "Координаты: -1496, 85, -5521" },
        { coords: convertCoords(3646, 2919), desc: "Координаты: -819, 80, -5757" },
        { coords: convertCoords(3699, 2926), desc: "Координаты: -804, 97, -5862" },
        { coords: convertCoords(3515, 2762), desc: "Координаты: -1131, 82, -5495" },
        { coords: convertCoords(3676, 2960), desc: "Координаты: -737, 80, -5816" },
        { coords: convertCoords(3522, 2874), desc: "Координаты: -907, 85, -5507" },
        { coords: convertCoords(3703, 2634), desc: "Координаты: -1387, 108, -5870" },
        { coords: convertCoords(3448, 2439), desc: "Координаты: -1779, 93, -5361" },
        { coords: convertCoords(3552, 2634), desc: "Координаты: -1388, 86, -5569" },
        { coords: convertCoords(3497, 2988), desc: "Координаты: -681, 97, -5459" },
        { coords: convertCoords(3520, 2415), desc: "Координаты: -1827, 91, -5504" },
        { coords: convertCoords(3643, 2745), desc: "Координаты: -1165, 88, -5751" },
        { coords: convertCoords(3520, 3127), desc: "Координаты: -401, 89, -5505" },
        { coords: convertCoords(3527, 2585), desc: "Координаты: -1487, 86, -5518" },
        { coords: convertCoords(3540, 3137), desc: "Координаты: -382, 89, -5544" },
        { coords: convertCoords(3693, 2951), desc: "Координаты: -755, 81, -5851" },
        { coords: convertCoords(3542, 3112), desc: "Координаты: -432, 90, -5548" },
        { coords: convertCoords(3445, 2415), desc: "Координаты: -1825, 91, -5354" },
        // Муравейник
        { coords: convertCoords(2833, 3536), desc: "Координаты: 415, 80, -4129" },
        { coords: convertCoords(2705, 3258), desc: "Координаты: -140, 81, -3875" },
        { coords: convertCoords(2937, 3186), desc: "Координаты: -284, 92, -4338" },
        { coords: convertCoords(2750, 3239), desc: "Координаты: -178, 81, -3964" },
        { coords: convertCoords(2836, 3420), desc: "Координаты: 185, 89, -4136" },
        { coords: convertCoords(2761, 3242), desc: "Координаты: -173, 80, -3985" },
        { coords: convertCoords(2709, 3222), desc: "Координаты: -213, 81, -3881" },
        { coords: convertCoords(2942, 3182), desc: "Координаты: -292, 86, -4347" },
        { coords: convertCoords(2975, 3404), desc: "Координаты: 153, 95, -4414" },
        { coords: convertCoords(2967, 3173), desc: "Координаты: -311, 92, -4398" },
        { coords: convertCoords(2908, 3296), desc: "Координаты: -64, 78, -4281" },
        { coords: convertCoords(2981, 3432), desc: "Координаты: 207, 86, -4427" },
        { coords: convertCoords(2972, 3405), desc: "Координаты: 155, 86, -4409" },
        { coords: convertCoords(3058, 3431), desc: "Координаты: 205, 75, -4579" },
        { coords: convertCoords(2707, 3258), desc: "Координаты: -141, 86, -3877" },
        { coords: convertCoords(2750, 3222), desc: "Координаты: -211, 81, -3965" },
        { coords: convertCoords(2854, 3530), desc: "Координаты: 404, 85, -4173" },
        { coords: convertCoords(2697, 3562), desc: "Координаты: 467, 83, -3858" },
        { coords: convertCoords(2943, 3162), desc: "Координаты: -333, 92, -4350" },
        { coords: convertCoords(2693, 3550), desc: "Координаты: 445, 86, -3851" },
        { coords: convertCoords(2712, 3542), desc: "Координаты: 428, 82, -3887" },
        { coords: convertCoords(2851, 3532), desc: "Координаты: 407, 70, -4165" },
        { coords: convertCoords(2854, 3530), desc: "Координаты: 404, 85, -4173" },
        { coords: convertCoords(2944, 3144), desc: "Координаты: -367, 92, -4352" },
        { coords: convertCoords(2740, 3545), desc: "Координаты: 434, 83, -3944" },
        { coords: convertCoords(2728, 3195), desc: "Координаты: -265, 79, -3921" },
        { coords: convertCoords(2938, 3129), desc: "Координаты: -397, 96, -4340" },
        { coords: convertCoords(2726, 3261), desc: "Координаты: -134, 81, -3915" },
        // Полесское
        { coords: convertCoords(3364, 2712), desc: "Координаты: -1233, 85, -5192" },
        { coords: convertCoords(3065, 2835), desc: "Координаты: -985, 82, -4594" },
        { coords: convertCoords(3286, 2637), desc: "Координаты: -1381, 86, -5036" },
        { coords: convertCoords(3115, 2756), desc: "Координаты: -1143, 83, -4693" },
        { coords: convertCoords(3247, 2798), desc: "Координаты: -1059, 76, -4958" },
        { coords: convertCoords(3142, 2810), desc: "Координаты: -1036, 79, -4749" },
        { coords: convertCoords(3219, 2583), desc: "Координаты: -1490, 157, -4902" },
        { coords: convertCoords(3311, 2714), desc: "Координаты: -1228, 85, -5087" },
        { coords: convertCoords(3004, 2802), desc: "Координаты: -1052, 83, -4472" },
        { coords: convertCoords(3065, 2740), desc: "Координаты: -1177, 83, -4594" },
        { coords: convertCoords(2993, 2832), desc: "Координаты: -991, 85, -4450" },
        { coords: convertCoords(3059, 2757), desc: "Координаты: -1143, 87, -4583" },
        { coords: convertCoords(2980, 2807), desc: "Координаты: -1042, 83, -4425" },
        { coords: convertCoords(3230, 2599), desc: "Координаты: -1459, 101, -4925" },
        { coords: convertCoords(3102, 2808), desc: "Координаты: -1039, 98, -4669" },
        { coords: convertCoords(3062, 2706), desc: "Координаты: -1245, 83, -4588" },
        { coords: convertCoords(3039, 2735), desc: "Координаты: -1186, 78, -4542" },
        { coords: convertCoords(3115, 2695), desc: "Координаты: -1266, 83, -4694" },
        { coords: convertCoords(3140, 2705), desc: "Координаты: -1245, 80, -4744" },
        { coords: convertCoords(3144, 2725), desc: "Координаты: -1207, 86, -4753" },
        { coords: convertCoords(3118, 2779), desc: "Координаты: -1099, 80, -4701" },
        { coords: convertCoords(3055, 2835), desc: "Координаты: -985, 85, -4574" },
        { coords: convertCoords(3057, 2849), desc: "Координаты: -959, 86, -4578" },
        { coords: convertCoords(3320, 2516), desc: "Координаты: -1624, 84, -5105" },
        { coords: convertCoords(3032, 2751), desc: "Координаты: -1155, 78, -4529" },
        { coords: convertCoords(3038, 2793), desc: "Координаты: -1071, 85, -4539" },
        { coords: convertCoords(3144, 2781), desc: "Координаты: -1095, 85, -4753" },
        { coords: convertCoords(3117, 2716), desc: "Координаты: -1223, 79, -4699" },
        { coords: convertCoords(3235, 2733), desc: "Координаты: -1190, 73, -4934" },
        // Поляна
        { coords: convertCoords(2885, 2382), desc: "Координаты: -1893, 91, -4233" },
        { coords: convertCoords(2871, 2295), desc: "Координаты: -2066, 90, -4207" },
        { coords: convertCoords(2864, 2305), desc: "Координаты: -2047, 99, -4191" },
        { coords: convertCoords(3008, 2340), desc: "Координаты: -1976, 79, -4480" },
        { coords: convertCoords(2966, 2307), desc: "Координаты: -2041, 81, -4397" },
        { coords: convertCoords(2968, 2320), desc: "Координаты: -2015, 78, -4400" },
        { coords: convertCoords(2947, 2428), desc: "Координаты: -1801, 90, -4357" },
        { coords: convertCoords(2844, 2393), desc: "Координаты: -1871, 90, -4152" },
        { coords: convertCoords(2825, 2380), desc: "Координаты: -1896, 91, -4114" },
        { coords: convertCoords(2951, 2415), desc: "Координаты: -1825, 90, -4366" },
        { coords: convertCoords(2903, 2394), desc: "Координаты: -1868, 93, -4269" },
        { coords: convertCoords(2995, 2332), desc: "Координаты: -1992, 79, -4455" },
        { coords: convertCoords(3077, 2407), desc: "Координаты: -1841, 86, -4619" },
        { coords: convertCoords(3081, 2374), desc: "Координаты: -1908, 83, -4625" },
        // Янтарь
        { coords: convertCoords(2711, 2261), desc: "Координаты: -2132, 40, -3886" },
        { coords: convertCoords(2638, 2021), desc: "Координаты: -2614, 67, -3739" },
        { coords: convertCoords(2705, 2327), desc: "Координаты: -2001, 80, -3872" },
        { coords: convertCoords(2696, 2161), desc: "Координаты: -2334, 40, -3854" },
        { coords: convertCoords(2720, 2113), desc: "Координаты: -2428, 32, -3903" },
        { coords: convertCoords(2702, 2288), desc: "Координаты: -2080, 81, -3866" },
        { coords: convertCoords(2564, 1916), desc: "Координаты: -2822, 65, -3591" },
        // Дикая территория
        { coords: convertCoords(2665, 2641), desc: "Координаты: -1374, 93, -3795" },
        { coords: convertCoords(2776, 2588), desc: "Координаты: -1479, 104, -4018" },
        { coords: convertCoords(2706, 2626), desc: "Координаты: -1404, 77, -3878" },
        { coords: convertCoords(2746, 2769), desc: "Координаты: -1118, 78, -3957" },
        { coords: convertCoords(2748, 2627), desc: "Координаты: -1400, 86, -3961" },
        { coords: convertCoords(2787, 2792), desc: "Координаты: -1072, 81, -4040" },
        { coords: convertCoords(2697, 2632), desc: "Координаты: -1391, 77, -3859" },
        { coords: convertCoords(2629, 2697), desc: "Координаты: -1262, 86, -3724" },
        { coords: convertCoords(2756, 2764), desc: "Координаты: -1127, 80, -3977" },
        { coords: convertCoords(2716, 2816), desc: "Координаты: -1022, 90, -3897" },
        { coords: convertCoords(2751, 2682), desc: "Координаты: -1292, 92, -3968" },
        { coords: convertCoords(2641, 2610), desc: "Координаты: -1436, 85, -3746" },
        { coords: convertCoords(2746, 2795), desc: "Координаты: -1066, 81, -3958" },
        { coords: convertCoords(2782, 2593), desc: "Координаты: -1470, 112, -4029" },
        { coords: convertCoords(2804, 2739), desc: "Координаты: -1176, 80, -4073" },
        { coords: convertCoords(2836, 2791), desc: "Координаты: -1073, 79, -4138" },
        { coords: convertCoords(2724, 2649), desc: "Координаты: -1356, 86, -3912" },
        { coords: convertCoords(2799, 2784), desc: "Координаты: -1087, 79, -4062" },
        // Свалка
        { coords: convertCoords(2176, 2684), desc: "Координаты: -1288, 82, -2815" },
        { coords: convertCoords(1953, 2799), desc: "Координаты: -1057, 85, -2368" },
        { coords: convertCoords(2096, 2710), desc: "Координаты: -1236, 101, -2656" },
        { coords: convertCoords(2010, 2696), desc: "Координаты: -1264, 98, -2484" },
        { coords: convertCoords(1941, 2808), desc: "Координаты: -1039, 84, -2346" },
        { coords: convertCoords(2145, 2802), desc: "Координаты: -1050, 89, -2753" },
        { coords: convertCoords(1950, 2815), desc: "Координаты: -1025, 84, -2364" },
        { coords: convertCoords(2011, 2687), desc: "Координаты: -1282, 98, -2486" },
        { coords: convertCoords(2328, 3053), desc: "Координаты: -549, 79, -3118" },
        { coords: convertCoords(2126, 2756), desc: "Координаты: -1142, 83, -2715" },
        { coords: convertCoords(1952, 2785), desc: "Координаты: -1085, 85, -2366" },
        { coords: convertCoords(1954, 2793), desc: "Координаты: -1070, 90, -2370" },
        { coords: convertCoords(2208, 2860), desc: "Координаты: -935, 87, -2879" },
        { coords: convertCoords(2118, 3039), desc: "Координаты: -578, 76, -2699" },
        { coords: convertCoords(2144, 2932), desc: "Координаты: -791, 78, -2752" },
        { coords: convertCoords(2087, 2782), desc: "Координаты: -1092, 84, -2636" },
        { coords: convertCoords(1945, 3516), desc: "Координаты: 376, 80, -2353" },
        { coords: convertCoords(1842, 3365), desc: "Координаты: 74, 93, -2146" },
        { coords: convertCoords(1838, 3369), desc: "Координаты: 81, 92, -2139" },
        { coords: convertCoords(1891, 3559), desc: "Координаты: 462, 80, -2246" },
        { coords: convertCoords(1982, 3433), desc: "Координаты: 210, 84, -2427" },
        { coords: convertCoords(1831, 3355), desc: "Координаты: 53, 92, -2125" },
        { coords: convertCoords(1925, 3489), desc: "Координаты: 322, 80, -2313" },
        { coords: convertCoords(1910, 3588), desc: "Координаты: 518, 78, -2284" },
        { coords: convertCoords(1920, 3469), desc: "Координаты: 281, 82, -2303" },
        { coords: convertCoords(1691, 3133), desc: "Координаты: -391, 85, -1845" },
        { coords: convertCoords(1975, 3501), desc: "Координаты: 346, 81, -2413" },
        { coords: convertCoords(1865, 3607), desc: "Координаты: 557, 80, -2192" },
        { coords: convertCoords(1870, 3648), desc: "Координаты: 640, 80, -2202" },
        { coords: convertCoords(1989, 3462), desc: "Координаты: 268, 83, -2440" },
        { coords: convertCoords(1920, 3505), desc: "Координаты: 354, 78, -2303" },
        { coords: convertCoords(1908, 3543), desc: "Координаты: 429, 80, -2279" },
        { coords: convertCoords(1889, 3580), desc: "Координаты: 502, 80, -2240" },
        { coords: convertCoords(1893, 3466), desc: "Координаты: 276, 81, -2249" },
        { coords: convertCoords(1964, 3480), desc: "Координаты: 303, 81, -2391" },
        { coords: convertCoords(1936, 3477), desc: "Координаты: 298, 83, -2336" },
        { coords: convertCoords(1837, 3379), desc: "Координаты: 102, 93, -2137" },
        { coords: convertCoords(1890, 3646), desc: "Координаты: 636, 80, -2243" },
        { coords: convertCoords(1911, 3490), desc: "Координаты: 324, 81, -2285" },
        { coords: convertCoords(1839, 3365), desc: "Координаты: 73, 93, -2141" },
        { coords: convertCoords(1894, 3635), desc: "Координаты: 613, 80, -2250" },
        { coords: convertCoords(1939, 3520), desc: "Координаты: 384, 81, -2340" },
        { coords: convertCoords(1973, 3464), desc: "Координаты: 271, 82, -2410" },
        { coords: convertCoords(1913, 3541), desc: "Координаты: 426, 79, -2289" },
        { coords: convertCoords(1905, 3601), desc: "Координаты: 545, 80, -2273" },
        { coords: convertCoords(1869, 3626), desc: "Координаты: 594, 79, -2202" },
        { coords: convertCoords(1842, 3391), desc: "Координаты: 124, 93, -2147" },
        { coords: convertCoords(1890, 3593), desc: "Координаты: 530, 83, -2244" },
        { coords: convertCoords(1966, 3523), desc: "Координаты: 389, 81, -2396" },
        // Тёмная долина
        { coords: convertCoords(2376, 3878), desc: "Координаты: 1101, 79, -3215" },
        { coords: convertCoords(2274, 4076), desc: "Координаты: 1496, 80, -3010" },
        { coords: convertCoords(2275, 4101), desc: "Координаты: 1547, 72, -3011" },
        { coords: convertCoords(2368, 3856), desc: "Координаты: 1057, 78, -3198" },
        { coords: convertCoords(2304, 3831), desc: "Координаты: 1006, 79, -3070" },
        { coords: convertCoords(2235, 4059), desc: "Координаты: 1461, 78, -2931" },
        { coords: convertCoords(2357, 3837), desc: "Координаты: 1017, 73, -3176" },
        { coords: convertCoords(2358, 4077), desc: "Координаты: 1499, 79, -3178" },
        { coords: convertCoords(2262, 4084), desc: "Координаты: 1511, 79, -2986" },
        { coords: convertCoords(2383, 4109), desc: "Координаты: 1561, 80, -3227" },
        { coords: convertCoords(2346, 4086), desc: "Координаты: 1516, 78, -3154" },
        { coords: convertCoords(2267, 4051), desc: "Координаты: 1445, 79, -2997" },
        // Агропром
        { coords: convertCoords(2187, 2008), desc: "Координаты: -2639, 82, -2838" },
        { coords: convertCoords(2184, 2027), desc: "Координаты: -2601, 83, -2831" },
        { coords: convertCoords(2246, 2006), desc: "Координаты: -2643, 83, -2957" },
        { coords: convertCoords(2233, 2000), desc: "Координаты: -2656, 83, -2929" },
        { coords: convertCoords(2007, 2097), desc: "Координаты: -2460, 80, -2478" },
        { coords: convertCoords(2125, 2148), desc: "Координаты: -2359, 79, -2714" },
        { coords: convertCoords(2145, 2159), desc: "Координаты: -2338, 82, -2754" },
        { coords: convertCoords(2143, 2155), desc: "Координаты: -2345, 78, -2751" },
        // Подземелья Агропрома
        { coords: convertCoords(2212, 2347), desc: "Координаты: -1960, 58, -2888", level: "underground" },
        { coords: convertCoords(2143, 2342), desc: "Координаты: -1971, 72, -2751", level: "underground" },
        // Редколесье
        { coords: convertCoords(1563, 2217), desc: "Координаты: -2222, 85, -1587" },
        { coords: convertCoords(1879, 2372), desc: "Координаты: -1911, 91, -2219" },
        { coords: convertCoords(1552, 2193), desc: "Координаты: -2269, 84, -1566" },
        { coords: convertCoords(1743, 2510), desc: "Координаты: -1637, 85, -1947" },
        { coords: convertCoords(1572, 2189), desc: "Координаты: -2278, 86, -1606" },
        // Стройплощадка
        { coords: convertCoords(1538, 1738), desc: "Координаты: -3180, 94, -1540" },
        { coords: convertCoords(1419, 1746), desc: "Координаты: -3163, 100, -1301" },
        { coords: convertCoords(1408, 1757), desc: "Координаты: -3141, 94, -1279" },
        { coords: convertCoords(1543, 1748), desc: "Координаты: -3158, 95, -1551" },
        { coords: convertCoords(1491, 1837), desc: "Координаты: -2981, 90, -1447" },
        { coords: convertCoords(1556, 1748), desc: "Координаты: -3160, 92, -1576" },
        { coords: convertCoords(1540, 1830), desc: "Координаты: -2994, 92, -1540" },
        { coords: convertCoords(1418, 1807), desc: "Координаты: -3040, 94, -1301" },
        { coords: convertCoords(1490, 1703), desc: "Координаты: -3250, 95, -1443" },
        { coords: convertCoords(1346, 1822), desc: "Координаты: -3011, 93, -1155" },
        { coords: convertCoords(1407, 1746), desc: "Координаты: -3163, 100, -1279" },
        { coords: convertCoords(1483, 1890), desc: "Координаты: -2875, 93, -1430" },
        { coords: convertCoords(1444, 1775), desc: "Координаты: -3106, 107, -1351" },
        { coords: convertCoords(1471, 1722), desc: "Координаты: -3211, 90, -1405" },
        { coords: convertCoords(1407, 1879), desc: "Координаты: -2898, 98, -1278" },
        { coords: convertCoords(1440, 1776), desc: "Координаты: -3103, 119, -1344" },
        { coords: convertCoords(1445, 1943), desc: "Координаты: -2768, 92, -1353" },
        { coords: convertCoords(1476, 1793), desc: "Координаты: -3069, 95, -1416" },
        { coords: convertCoords(1358, 1931), desc: "Координаты: -2794, 92, -1179" },
        { coords: convertCoords(1345, 1945), desc: "Координаты: -2765, 92, -1155" },
        { coords: convertCoords(1448, 1935), desc: "Координаты: -2785, 92, -1360" },
        { coords: convertCoords(1491, 1889), desc: "Координаты: -2877, 95, -1446" },
        { coords: convertCoords(1451, 1776), desc: "Координаты: -3104, 101, -1366" },
        { coords: convertCoords(1546, 1732), desc: "Координаты: -3192, 92, -1555" },
        { coords: convertCoords(1499, 1877), desc: "Координаты: -2901, 96, -1461" },
        { coords: convertCoords(1455, 1731), desc: "Координаты: -3193, 108, -1375" },
        { coords: convertCoords(1520, 1783), desc: "Координаты: -3089, 94, -1505" },
        { coords: convertCoords(1456, 1686), desc: "Координаты: -3283, 94, -1376" },
        { coords: convertCoords(1542, 1767), desc: "Координаты: -3122, 92, -1548" },
        { coords: convertCoords(1539, 1807), desc: "Координаты: -3042, 93, -1543" },
        { coords: convertCoords(1412, 1693), desc: "Координаты: -3268, 92, -1289" },
        { coords: convertCoords(1519, 1874), desc: "Координаты: -2908, 96, -1502" },
        { coords: convertCoords(1407, 1801), desc: "Координаты: -3053, 94, -1279" },
        { coords: convertCoords(1531, 1820), desc: "Координаты: -3016, 92, -1526" },
        { coords: convertCoords(1533, 1798), desc: "Координаты: -3059, 92, -1529" },
        { coords: convertCoords(1531, 1885), desc: "Координаты: -2886, 101, -1525" },
        { coords: convertCoords(1545, 1775), desc: "Координаты: -3105, 92, -1554" },
        { coords: convertCoords(1557, 1804), desc: "Координаты: -3048, 93, -1577" },
        { coords: convertCoords(1412, 1870), desc: "Координаты: -2915, 92, -1289" },
        { coords: convertCoords(1412, 1785), desc: "Координаты: -3085, 94, -1289" },
        { coords: convertCoords(1413, 1862), desc: "Координаты: -2932, 96, -1290" },
        { coords: convertCoords(1460, 1700), desc: "Координаты: -3256, 95, -1384" },
        { coords: convertCoords(1545, 1782), desc: "Координаты: -3092, 93, -1555" },
        { coords: convertCoords(1478, 1801), desc: "Координаты: -3054, 94, -1420" },
        { coords: convertCoords(1422, 1790), desc: "Координаты: -3075, 96, -1308" },
        { coords: convertCoords(1412, 1696), desc: "Координаты: -3264, 92, -1289" },
        { coords: convertCoords(1420, 1734), desc: "Координаты: -3187, 94, -1304" },
        { coords: convertCoords(1486, 1839), desc: "Координаты: -2978, 90, -1435" },
        { coords: convertCoords(1451, 1781), desc: "Координаты: -3094, 95, -1365" },
        { coords: convertCoords(1562, 1774), desc: "Координаты: -3108, 91, -1589" },
        { coords: convertCoords(1323, 1685), desc: "Координаты: -3286, 95, -1110" },
        { coords: convertCoords(1469, 1772), desc: "Координаты: -3111, 94, -1401" },
        { coords: convertCoords(1366, 1907), desc: "Координаты: -2840, 91, -1196" },
        { coords: convertCoords(1447, 1865), desc: "Координаты: -2925, 91, -1359" },
        { coords: convertCoords(1557, 1816), desc: "Координаты: -3023, 93, -1578" },
        { coords: convertCoords(1367, 1670), desc: "Координаты: -3315, 92, -1198" },
        { coords: convertCoords(1407, 1741), desc: "Координаты: -3173, 94, -1279" },
        { coords: convertCoords(1542, 1754), desc: "Координаты: -3147, 93, -1548" },
        { coords: convertCoords(1444, 1781), desc: "Координаты: -3093, 101, -1352" },
        { coords: convertCoords(1392, 1913), desc: "Координаты: -2828, 92, -1248" },
        { coords: convertCoords(1345, 1695), desc: "Координаты: -3265, 85, -1155" },
        { coords: convertCoords(1531, 1781), desc: "Координаты: -3093, 92, -1525" },
        { coords: convertCoords(1407, 1880), desc: "Координаты: -2894, 93, -1278" },
        { coords: convertCoords(1557, 1762), desc: "Координаты: -3131, 92, -1579" },
        { coords: convertCoords(1532, 1780), desc: "Координаты: -3095, 93, -1528" },
        { coords: convertCoords(1369, 1750), desc: "Координаты: -3155, 93, -1201" },
        { coords: convertCoords(1564, 1786), desc: "Координаты: -3082, 92, -1593" },
        // Кордон
        { coords: convertCoords(1773, 2860), desc: "Координаты: -936, 82, -2010" },
        { coords: convertCoords(1815, 2843), desc: "Координаты: -970, 80, -2093" },
        { coords: convertCoords(1776, 2828), desc: "Координаты: -1000, 83, -2017" },
        { coords: convertCoords(1762, 2886), desc: "Координаты: -884, 79, -1988" },
        { coords: convertCoords(1792, 2867), desc: "Координаты: -922, 82, -2049" },
        { coords: convertCoords(1933, 3076), desc: "Координаты: -504, 83, -2330" },
        { coords: convertCoords(1767, 2850), desc: "Координаты: -957, 79, -1998" },
        { coords: convertCoords(1895, 3079), desc: "Координаты: -498, 86, -2253" },
        { coords: convertCoords(1780, 2826), desc: "Координаты: -1004, 78, -2023" },
        { coords: convertCoords(1784, 2847), desc: "Координаты: -962, 76, -2033" },
        { coords: convertCoords(1808, 2879), desc: "Координаты: -898, 77, -2080" },
        { coords: convertCoords(1898, 3079), desc: "Координаты: -499, 77, -2261" },
        { coords: convertCoords(1784, 2885), desc: "Координаты: -885, 82, -2032" },
        { coords: convertCoords(1800, 2837), desc: "Координаты: -982, 76, -2063" },
        { coords: convertCoords(1886, 3491), desc: "Координаты: 325, 81, -2234" },
        // Тёмная лощина
        { coords: convertCoords(1679, 3527), desc: "Координаты: 399, 80, -1821" },
        { coords: convertCoords(1727, 3585), desc: "Координаты: 515, 81, -1917" },
        { coords: convertCoords(1550, 3883), desc: "Координаты: 1110, 80, -1563" },
        { coords: convertCoords(1710, 3564), desc: "Координаты: 472, 80, -1884" },
        { coords: convertCoords(1485, 4078), desc: "Координаты: 1499, 99, -1434" },
        { coords: convertCoords(1497, 3940), desc: "Координаты: 1224, 81, -1458" },
        { coords: convertCoords(1415, 3770), desc: "Координаты: 884, 81, -1293" },
        { coords: convertCoords(1805, 3679), desc: "Координаты: 701, 79, -2074" },
        { coords: convertCoords(1441, 4044), desc: "Координаты: 1432, 92, -1346" },
        { coords: convertCoords(1720, 3511), desc: "Координаты: 366, 101, -1905" },
        { coords: convertCoords(1633, 3882), desc: "Координаты: 1109, 70, -1730" },
        { coords: convertCoords(1491, 4078), desc: "Координаты: 1500, 79, -1447" },
        { coords: convertCoords(1787, 3688), desc: "Координаты: 721, 78, -2037" },
        { coords: convertCoords(1475, 4021), desc: "Координаты: 1386, 79, -1414" },
        { coords: convertCoords(1742, 3727), desc: "Координаты: 798, 80, -1948" },
        { coords: convertCoords(1546, 3976), desc: "Координаты: 1296, 78, -1555" },
        { coords: convertCoords(1479, 4011), desc: "Координаты: 1366, 79, -1423" },
        { coords: convertCoords(1482, 3918), desc: "Координаты: 1181, 81, -1428" },
        { coords: convertCoords(1576, 3472), desc: "Координаты: 289, 90, -1616" },
        { coords: convertCoords(1776, 3950), desc: "Координаты: 1245, 68, -2016" },
        { coords: convertCoords(1473, 4029), desc: "Координаты: 1402, 78, -1409" },
        { coords: convertCoords(1671, 3872), desc: "Координаты: 1088, 103, -1806" },
        // Сортировка
        { coords: convertCoords(1648, 4378), desc: "Координаты: 2101, 100, -1760" },
        { coords: convertCoords(1747, 4350), desc: "Координаты: 2043, 100, -1958" },
        { coords: convertCoords(1818, 4413), desc: "Координаты: 2169, 101, -2101" },
        { coords: convertCoords(1802, 4359), desc: "Координаты: 2061, 100, -2069" },
        { coords: convertCoords(1782, 4431), desc: "Координаты: 2206, 101, -2027" },
        { coords: convertCoords(1746, 4358), desc: "Координаты: 2060, 108, -1956" },
        { coords: convertCoords(1661, 4358), desc: "Координаты: 2060, 101, -1785" },
        { coords: convertCoords(1863, 4405), desc: "Координаты: 2153, 103, -2191" },
        { coords: convertCoords(1694, 4370), desc: "Координаты: 2083, 101, -1853" },
        { coords: convertCoords(1810, 4451), desc: "Координаты: 2245, 104, -2083" },
        // Топи
        { coords: convertCoords(625, 2443), desc: "Координаты: -1771, 91, 285" },
        { coords: convertCoords(628, 2422), desc: "Координаты: -1812, 92, 278" },
        { coords: convertCoords(610, 2430), desc: "Координаты: -1798, 92, 316" },
        { coords: convertCoords(616, 2454), desc: "Координаты: -1749, 92, 303" },
        { coords: convertCoords(757, 2678), desc: "Координаты: -1302, 94, 21" },
        { coords: convertCoords(695, 2198), desc: "Координаты: -2261, 94, 146" },
        { coords: convertCoords(964, 2685), desc: "Координаты: -1288, 81, -394" },
        // Росстань
        { coords: convertCoords(914, 3142), desc: "Координаты: -373, 76, -293" },
        { coords: convertCoords(673, 3397), desc: "Координаты: 136, 88, 189" },
        { coords: convertCoords(593, 3557), desc: "Координаты: 456, 83, 350" },
        { coords: convertCoords(827, 3724), desc: "Координаты: 790, 76, -118" },
        { coords: convertCoords(748, 3656), desc: "Координаты: 655, 79, 39" },
        { coords: convertCoords(783, 3743), desc: "Координаты: 829, 79, -31" },
        { coords: convertCoords(785, 3748), desc: "Координаты: 840, 77, -35" },
        { coords: convertCoords(850, 3379), desc: "Координаты: 101, 89, -165" },
        { coords: convertCoords(982, 3525), desc: "Координаты: 393, 82, -429" },
        { coords: convertCoords(804, 3652), desc: "Координаты: 648, 83, -73" },
        { coords: convertCoords(829, 3409), desc: "Координаты: 162, 85, -123" },
        { coords: convertCoords(857, 3745), desc: "Координаты: 834, 81, -178" },
        { coords: convertCoords(1016, 3519), desc: "Координаты: 381, 82, -496" }
    ],

    // ==================== КОНТЕЙНЕРЫ: НАУЧНОЕ ОБОРУДОВАНИЕ ====================
    science: [
        // Янтарь
        { coords: convertCoords(2702, 2204), desc: "Координаты: -2247, 7, -3867" },
        { coords: convertCoords(2622, 2196), desc: "Координаты: -2263, 65, -3707" },
        { coords: convertCoords(2699, 2207), desc: "Координаты: -2241, 7, -3861" },
        // Дикая территория
        { coords: convertCoords(2706, 2875), desc: "Координаты: -906, 79, -3876" },
        { coords: convertCoords(2681, 2697), desc: "Координаты: -1261, 72, -3826" },
        // Свалка
        { coords: convertCoords(2255, 3125), desc: "Координаты: -405, 95, -2974" },
        { coords: convertCoords(2108, 2996), desc: "Координаты: -663, 75, -2680" },
        // Тёмная долина
        { coords: convertCoords(2204, 3768), desc: "Координаты: 880, 82, -2871" },
        { coords: convertCoords(2233, 3923), desc: "Координаты: 1191, 81, -2927" },
        // Агропром
        { coords: convertCoords(2011, 2064), desc: "Координаты: -2527, 80, -2486" },
        { coords: convertCoords(2358, 1981), desc: "Координаты: -2693, 79, -3181" },
        // Тёмная лощина
        { coords: convertCoords(1625, 3962), desc: "Координаты: 1268, 62, -1715" }
    ],

    // ==================== КОНТЕЙНЕРЫ: ТАЙНИКИ ====================
    stash: [
        // Полесское
        {
            coords: convertCoords(3267, 2763),
            desc: "Координаты: -1130, 84, -4997",
            extended: {
                rewards: [
                { key: 'prima_cigarettes', count: 4 },
                { key: 'lead', count: 1 },
                { key: 'vodka_kazaki', count: 5 }
                ]
            }
        },
        // Янтарь
        {
            coords: convertCoords(2688, 2031),
            desc: "Координаты: -2594, 61, -3839",
            extended: {
                rewards: [
                    { key: 'makarov_pistol', count: 1 },
                    { key: 'vodka_kazaki', count: 1 },
                    { key: 'ammo_9x18', count: 1 }
                ]
            }
        },
        // Дикая территория
        {
            coords: convertCoords(2716, 2662),
            desc: "Координаты: -1331, 80, -3898",
            extended: {
                rewards: [
                    { key: 'vitamins', count: 4 },
                    { key: 'cheese_yantar', count: 1 },
                    { key: 'snork_leg', count: 3 },
                    { key: 'beer_slavutich', count: 1 },
                    { key: 'bandage', count: 4 },
                    { key: 'blind_dog_heart', count: 6 }
                ]
            }
        },
        {
            coords: convertCoords(2748, 2655),
            desc: "Координаты: -1344, 85, -3962",
            extended: {
                rewards: [
                    { key: 'mercenary_patch', count: 3 },
                    { key: 'psy_blockade', count: 1 },
                    { key: 'condensed_milk', count: 1 },
                    { key: 'vodka_kazaki', count: 1 },
                    { key: 'mre_b', count: 1 }
                ]
            }
        },
        {
            coords: convertCoords(2823, 2833),
            desc: "Координаты: -990, 83, -4110",
            extended: {
                rewards: [
                    { key: 'zombie_hand', count: 1 },
                    { key: 'controller_hand', count: 1 },
                    { key: 'toy_airplane', count: 1 },
                    { key: 'snork_hand', count: 1 },
                    { key: 'toy_car', count: 1 },
                    { key: 'toy_doll', count: 1 }
                ]
            }
        },
        // Подземелья Агропрома
        { 
            coords: convertCoords(2221, 2353), 
            desc: "Координаты: -1950, 19, -2907", 
            level: "underground",
            extended: {
                rewards: [
                    { key: 'ammo_9x39_sp6', count: 20 },
                    { key: 'medkit', count: 1 },
                    { key: 'tourist_breakfast', count: 5 },
                    { key: 'morphine', count: 1 },
                    { key: 'ammo_45_acp', count: 50 },
                    { key: 'belomorkanal', count: 2 },
                    { key: 'tarpaulin', count: 1 }
                ]
            }
        },
        // Кордон
        { 
            coords: convertCoords(1348, 3050), 
            desc: "Координаты: -556, 62, -1160",
            extended: {
                rewards: [
                    { key: 'medkit', count: 2 },
                    { key: 'antirad', count: 2 },
                    { key: 'radioprotector', count: 3 },
                    { key: 'mre_b', count: 1 }
                ]
            }
        },
        { 
            coords: convertCoords(1491, 3257), 
            desc: "Координаты: -143, 79, -1446",
            extended: {
                rewards: [
                    { key: 'medkit', count: 3 },
                    { key: 'bandage', count: 3 },
                    { key: 'rubles_1000', count: 1 }
                ]
            }
        },
        // Топи
        {
            coords: convertCoords(629, 2417),
            desc: "Координаты: -1823, 95, 277",
            extended: {
                rewards: [
                    { key: 'medkit', count: 1 },
                    { key: 'energy_drink', count: 3 },
                    { key: 'mre_b', count: 1 },
                    { key: 'tourist_breakfast', count: 3 }
                ]
            }
        },
        {
            coords: convertCoords(786, 2121),
            desc: "Координаты: -2414, 116, -36",
            extended: {
                rewards: [
                    { key: 'snork_leg', count: 3 },
                    { key: 'medkit', count: 2 },
                    { key: 'pork_stew', count: 3 },
                    { key: 'rubles_1000', count: 1 }
                ]
            }
        },
        // Росстань
        { 
            coords: convertCoords(666, 3402), 
            desc: "Координаты: 147, 94, 203",
            extended: {
                rewards: [
                    { key: 'ammo_9x18', count: 60 },
                    { key: 'medkit', count: 4 },
                    { key: 'tourist_breakfast', count: 2 }
                ]
            }
        },
        { 
            coords: convertCoords(844, 3376), 
            desc: "Координаты: 95, 77, -154",
            extended: {
                rewards: [
                    { key: 'medkit', count: 2 },
                    { key: 'ammo_12x70', count: 30 },
                    { key: 'vodka_kazaki', count: 2 },
                    { key: 'bread', count: 3 }
                ]
            }
        },
        { 
            coords: convertCoords(874, 3206), 
            desc: "Координаты: -245, 90, -213",
            extended: {
                rewards: [
                    { key: 'ammo_5_45x39_ps', count: 120 },
                    { key: 'medkit_army', count: 2 },
                    { key: 'bandage', count: 2 },
                    { key: 'tourist_breakfast', count: 4 }
                ]
            }
        },
        { 
            coords: convertCoords(931, 3780), 
            desc: "Координаты: 903, 78, -327",
            extended: {
                rewards: [
                    { key: 'stone_blood', count: 1 },
                    { key: 'energy_drink', count: 4 },
                    { key: 'medkit_science', count: 1 },
                    { key: 'hercules', count: 1 }
                ]
            }
        },
                { 
            coords: convertCoords(571, 3140), 
            desc: "Координаты: -378, 100, 393",
            extended: {
                rewards: [
                    { key: 'bandage', count: 6 },
                    { key: 'sparkler', count: 1 },
                    { key: 'medkit', count: 4 },
                    { key: 'tourist_breakfast', count: 2 }
                ]
            }
        },
        { 
            coords: convertCoords(971, 2930), 
            desc: "Координаты: -798, 74, -407",
            extended: {
                rewards: [
                    { key: 'old_bread', count: 2 },
                    { key: 'glucose_injection', count: 1 },
                    { key: 'ammo_12x70', count: 20 },
                    { key: 'ammo_9x19_ps', count: 60 },
                    { key: 'mre_b', count: 1 }
                ]
            }
        },
        { 
            coords: convertCoords(1076, 3116), 
            desc: "Координаты: -426, 86, -616",
            extended: {
                rewards: [
                    { key: 'vodka_kazaki', count: 4 },
                    { key: 'practical_sausage', count: 2 },
                    { key: 'medkit_science', count: 4 },
                    { key: 'antirad', count: 2 }
                ]
            }
        },
        { 
            coords: convertCoords(1227, 3791), 
            desc: "Координаты: 925, 101, -919",
            extended: {
                rewards: [
                    { key: 'grenade_f1', count: 2 },
                    { key: 'tourist_breakfast', count: 3 },
                    { key: 'medkit', count: 2 },
                    { key: 'antirad', count: 1 }
                ]
            }
        },
        { 
            coords: convertCoords(704, 3776), 
            desc: "Координаты: 895, 87, 127",
            extended: {
                rewards: [
                    { key: 'slime', count: 1 },
                    { key: 'medkit', count: 2 },
                    { key: 'energy_drink', count: 2 },
                    { key: 'blind_dog_tail', count: 4 }
                ]
            }
        },
        { 
            coords: convertCoords(758, 3274), 
            desc: "Координаты: -109, 88, 19",
            extended: {
                rewards: [
                    { key: 'vitamins', count: 6 },
                    { key: 'ammo_12x70_buckshot', count: 40 },
                    { key: 'medkit', count: 2 },
                    { key: 'bandage', count: 4 }
                ]
            }
        },
        { 
            coords: convertCoords(535, 3161), 
            desc: "Координаты: -336, 120, 465",
            extended: {
                rewards: [
                    { key: 'ammo_12x70', count: 40 },
                    { key: 'adrenaline', count: 1 },
                    { key: 'toy_doll', count: 1 },
                    { key: 'medkit_army', count: 3 },
                    { key: 'copper_wire_coil', count: 2 }
                ]
            }
        },
        { 
            coords: convertCoords(622, 3103), 
            desc: "Координаты: -451, 89, 292",
            extended: {
                rewards: [
                    { key: 'hercules', count: 2 },
                    { key: 'medkit', count: 4 },
                    { key: 'prima_cigarettes', count: 2 },
                    { key: 'vitamins', count: 4 }
                ]
            }
        },
        { 
            coords: convertCoords(993, 2997), 
            desc: "Координаты: -664, 91, -451",
            extended: {
                rewards: [
                    { key: 'flash', count: 1 },
                    { key: 'tourist_breakfast', count: 4 },
                    { key: 'table_clock', count: 1 },
                    { key: 'ammo_9x18', count: 60 }
                ]
            }
        },
        { 
            coords: convertCoords(865, 3346), 
            desc: "Координаты: 34, 88, -195",
            extended: {
                rewards: [
                    { key: 'thorn', count: 1 },
                    { key: 'belomorkanal', count: 1 },
                    { key: 'vodka_kazaki', count: 2 },
                    { key: 'radioprotector', count: 4 }
                ]
            }
        },
        { 
            coords: convertCoords(541, 3029), 
            desc: "Координаты: -599, 77, 453",
            extended: {
                rewards: [
                    { key: 'solder', count: 4 },
                    { key: 'kevlar_tape', count: 2 },
                    { key: 'medkit', count: 2 },
                    { key: 'mre_b', count: 1 }
                ]
            }
        },
    ],

    // ==================== КОНТЕЙНЕРЫ: ДЕРЕВЯННЫЕ ЯЩИКИ ====================
    wooden_crate: [
        // Армейские склады
        { coords: convertCoords(3494, 2451), desc: "Координаты: -1754, 91, -5452" },
        { coords: convertCoords(3648, 2916), desc: "Координаты: -825, 80, -5761" },
        { coords: convertCoords(3496, 2412), desc: "Координаты: -1832, 91, -5456" },
        { coords: convertCoords(3497, 2953), desc: "Координаты: -750, 90, -5458" },
        // Поляна
        { coords: convertCoords(2852, 2391), desc: "Координаты: -1875, 87, -4169" },
        { coords: convertCoords(3094, 2415), desc: "Координаты: -1827, 88, -4651" },
        { coords: convertCoords(3096, 2450), desc: "Координаты: -1756, 87, -4657" },
        { coords: convertCoords(3123, 2424), desc: "Координаты: -1808, 85, -4711" },
        { coords: convertCoords(3098, 2387), desc: "Координаты: -1883, 80, -4661" },
        // Янтарь
        { coords: convertCoords(2545, 2205), desc: "Координаты: -2246, 70, -3552" },
        { coords: convertCoords(2564, 1984), desc: "Координаты: -2687, 63, -3592" },
        { coords: convertCoords(2631, 2020), desc: "Координаты: -2614, 81, -3725" },
        // Дикая территория
        { coords: convertCoords(2730, 2764), desc: "Координаты: -1127, 84, -3925" },
        { coords: convertCoords(2768, 2799), desc: "Координаты: -1056, 79, -4001" },
        // Свалка
        { coords: convertCoords(2019, 2712), desc: "Координаты: -1232, 96, -2501" },
        { coords: convertCoords(1904, 3557), desc: "Координаты: 458, 82, -2271" },
        { coords: convertCoords(1942, 3535), desc: "Координаты: 413, 81, -2348" },
        { coords: convertCoords(1939, 3458), desc: "Координаты: 258, 81, -2342" },
        { coords: convertCoords(1751, 3271), desc: "Координаты: -116, 100, -1965" },
        { coords: convertCoords(1898, 3624), desc: "Координаты: 592, 78, -2259" },
        { coords: convertCoords(1925, 3544), desc: "Координаты: 432, 83, -2312" },
        { coords: convertCoords(1991, 3459), desc: "Координаты: 261, 88, -2446" },
        { coords: convertCoords(1955, 3498), desc: "Координаты: 339, 80, -2374" },
        { coords: convertCoords(1914, 3574), desc: "Координаты: 490, 80, -2291" },
        { coords: convertCoords(1960, 3464), desc: "Координаты: 271, 83, -2383" },
        { coords: convertCoords(1985, 3480), desc: "Координаты: 304, 83, -2433" },
        { coords: convertCoords(1963, 3533), desc: "Координаты: 409, 81, -2390" },
        // Кордон
        { coords: convertCoords(1814, 2828), desc: "Координаты: -1001, 80, -2091" },
        { coords: convertCoords(1796, 2866), desc: "Координаты: -924, 86, -2056" },
        { coords: convertCoords(1788, 2855), desc: "Координаты: -946, 76, -2040" },
        { coords: convertCoords(1774, 2851), desc: "Координаты: -955, 86, -2012" },
        { coords: convertCoords(1950, 3083), desc: "Координаты: -490, 81, -2363" },
        { coords: convertCoords(1690, 3141), desc: "Координаты: -374, 87, -1844" },
        { coords: convertCoords(1788, 2858), desc: "Координаты: -940, 85, -2041" },
        { coords: convertCoords(1763, 2839), desc: "Координаты: -978, 76, -1990" },
        { coords: convertCoords(1800, 2884), desc: "Координаты: -888, 76, -2064" },
        { coords: convertCoords(1775, 2860), desc: "Координаты: -937, 79, -2014" },
        { coords: convertCoords(1793, 2860), desc: "Координаты: -936, 76, -2049" },
        { coords: convertCoords(1772, 2886), desc: "Координаты: -884, 76, -2009" },
        { coords: convertCoords(1780, 2833), desc: "Координаты: -990, 82, -2025" },
        // Тёмная лощина
        { coords: convertCoords(1387, 4102), desc: "Координаты: 1549, 71, -1238" },
        { coords: convertCoords(1540, 3971), desc: "Координаты: 1286, 79, -1545" },
        { coords: convertCoords(1545, 3972), desc: "Координаты: 1289, 80, -1554" },
        { coords: convertCoords(1677, 3528), desc: "Координаты: 400, 80, -1819" },
        // Сортировка
        { coords: convertCoords(1783, 4339), desc: "Координаты: 2022, 100, -2030" },
        { coords: convertCoords(1733, 4395), desc: "Координаты: 2134, 101, -1931" },
        // Топи
        { coords: convertCoords(689, 2603), desc: "Координаты: -1450, 93, 157" },
        { coords: convertCoords(678, 2214), desc: "Координаты: -2230, 94, 178" },
        { coords: convertCoords(645, 2418), desc: "Координаты: -1821, 92, 244" },
        { coords: convertCoords(965, 2675), desc: "Координаты: -1307, 80, -395" },
        { coords: convertCoords(760, 2675), desc: "Координаты: -1307, 94, 16" },
        { coords: convertCoords(887, 2172), desc: "Координаты: -2313, 95, -240" },
        { coords: convertCoords(760, 2680), desc: "Координаты: -1298, 92, 14" },
        { coords: convertCoords(653, 2190), desc: "Координаты: -2277, 94, 228" },
        // Росстань
        { coords: convertCoords(728, 3207), desc: "Координаты: -243, 84, 79" },
        { coords: convertCoords(803, 3279), desc: "Координаты: -99, 85, -70" },
        { coords: convertCoords(728, 3212), desc: "Координаты: -233, 84, 79" },
        { coords: convertCoords(867, 3183), desc: "Координаты: -292, 84, -198" },
        { coords: convertCoords(1004, 3384), desc: "Координаты: 111, 79, -473" },
        { coords: convertCoords(794, 3279), desc: "Координаты: -99, 90, -53" },
        { coords: convertCoords(955, 2945), desc: "Координаты: -766, 73, -376" },
        { coords: convertCoords(667, 3407), desc: "Координаты: 156, 88, 201" },
        { coords: convertCoords(823, 3146), desc: "Координаты: -365, 86, -112" },
        { coords: convertCoords(950, 2938), desc: "Координаты: -780, 74, -366" },
        { coords: convertCoords(707, 3209), desc: "Координаты: -239, 84, 121" },
        { coords: convertCoords(664, 3186), desc: "Координаты: -286, 85, 207" },
        { coords: convertCoords(1155, 3406), desc: "Координаты: 154, 76, -776" },
        { coords: convertCoords(797, 3209), desc: "Координаты: -240, 87, -59" },
        { coords: convertCoords(722, 3172), desc: "Координаты: -312, 89, 91" },
        { coords: convertCoords(803, 3280), desc: "Координаты: -97, 89, -70" },
        { coords: convertCoords(712, 3209), desc: "Координаты: -238, 83, 111" },
        { coords: convertCoords(667, 3196), desc: "Координаты: -265, 85, 200" },
        { coords: convertCoords(724, 3207), desc: "Координаты: -242, 92, 87" },
        { coords: convertCoords(904, 3140), desc: "Координаты: -376, 84, -273" },
        { coords: convertCoords(729, 3203), desc: "Координаты: -250, 92, 77" },
        { coords: convertCoords(932, 3216), desc: "Координаты: -225, 83, -329" },
        { coords: convertCoords(721, 3209), desc: "Координаты: -238, 98, 94" },
        { coords: convertCoords(820, 3156), desc: "Координаты: -346, 86, -105" },
        { coords: convertCoords(726, 3204), desc: "Координаты: -249, 98, 84" },
        { coords: convertCoords(897, 3210), desc: "Координаты: -238, 84, -259" },
        { coords: convertCoords(850, 3197), desc: "Координаты: -263, 85, -165" },
        { coords: convertCoords(823, 3282), desc: "Координаты: -94, 84, -110" },
        { coords: convertCoords(725, 3212), desc: "Координаты: -232, 109, 84" },
        { coords: convertCoords(878, 3145), desc: "Координаты: -367, 83, -221" },
        { coords: convertCoords(823, 3308), desc: "Координаты: -41, 83, -110" },
        { coords: convertCoords(824, 3197), desc: "Координаты: -264, 87, -113" },
        { coords: convertCoords(851, 3183), desc: "Координаты: -290, 84, -166" },
        { coords: convertCoords(868, 3274), desc: "Координаты: -110, 85, -201" },
        { coords: convertCoords(854, 3137), desc: "Координаты: -382, 84, -174" },
        { coords: convertCoords(884, 3193), desc: "Координаты: -270, 84, -233" },
        { coords: convertCoords(708, 3206), desc: "Координаты: -245, 105, 119" },
        { coords: convertCoords(930, 2950), desc: "Координаты: -756, 72, -326" },
        { coords: convertCoords(672, 3401), desc: "Координаты: 146, 89, 191" },
        { coords: convertCoords(952, 2973), desc: "Координаты: -711, 73, -368" },
        { coords: convertCoords(844, 3189), desc: "Координаты: -278, 86, -153" },
        { coords: convertCoords(894, 3141), desc: "Координаты: -375, 83, -252" },
        { coords: convertCoords(1306, 3397), desc: "Координаты: 136, 86, -1076" },
        { coords: convertCoords(925, 3184), desc: "Координаты: -289, 82, -315" },
        { coords: convertCoords(784, 3270), desc: "Координаты: -117, 84, -32" },
        { coords: convertCoords(668, 3389), desc: "Координаты: 121, 89, 200" },
        { coords: convertCoords(722, 3217), desc: "Координаты: -223, 105, 91" },
        { coords: convertCoords(922, 3256), desc: "Координаты: -144, 84, -309" },
        { coords: convertCoords(737, 3152), desc: "Координаты: -354, 84, 62" },
        { coords: convertCoords(756, 3304), desc: "Координаты: -49, 84, 24" },
        { coords: convertCoords(939, 3188), desc: "Координаты: -281, 84, -342" },
        { coords: convertCoords(870, 3239), desc: "Координаты: -180, 85, -205" },
        { coords: convertCoords(824, 3297), desc: "Координаты: -62, 84, -113" },
        { coords: convertCoords(795, 3301), desc: "Координаты: -54, 83, -56" },
        { coords: convertCoords(850, 3175), desc: "Координаты: -307, 85, -165" },
        { coords: convertCoords(916, 3191), desc: "Координаты: -275, 83, -298" },
        { coords: convertCoords(894, 3215), desc: "Координаты: -227, 84, -254" },
        { coords: convertCoords(706, 3207), desc: "Координаты: -242, 92, 122" },
        { coords: convertCoords(969, 2930), desc: "Координаты: -797, 74, -403" },
        { coords: convertCoords(910, 3259), desc: "Координаты: -139, 84, -284" },
        { coords: convertCoords(904, 3185), desc: "Координаты: -286, 85, -274" },
        { coords: convertCoords(743, 3152), desc: "Координаты: -353, 84, 48" },
        { coords: convertCoords(793, 3284), desc: "Координаты: -90, 84, -51" },
        { coords: convertCoords(960, 2971), desc: "Координаты: -716, 76, -384" },
        { coords: convertCoords(818, 3234), desc: "Координаты: -189, 88, -101" },
        { coords: convertCoords(753, 3274), desc: "Координаты: -109, 84, 29" },
        { coords: convertCoords(817, 3186), desc: "Координаты: -286, 88, -99" },
        { coords: convertCoords(976, 2975), desc: "Координаты: -706, 73, -417" },
        { coords: convertCoords(759, 3273), desc: "Координаты: -111, 84, 16" },
        { coords: convertCoords(882, 3275), desc: "Координаты: -108, 85, -229" },
        { coords: convertCoords(952, 2967), desc: "Координаты: -723, 73, -368" },
        { coords: convertCoords(675, 3190), desc: "Координаты: -277, 92, 186" },
        { coords: convertCoords(712, 3214), desc: "Координаты: -229, 92, 111" },
        { coords: convertCoords(862, 3251), desc: "Координаты: -154, 85, -189" },
        { coords: convertCoords(950, 2926), desc: "Координаты: -806, 74, -365" },
        { coords: convertCoords(778, 3297), desc: "Координаты: -63, 84, -20" },
        { coords: convertCoords(756, 3303), desc: "Координаты: -51, 87, 24" },
        { coords: convertCoords(812, 3211), desc: "Координаты: -235, 88, -90" },
        { coords: convertCoords(800, 3183), desc: "Координаты: -291, 87, -66" },
        { coords: convertCoords(862, 3267), desc: "Координаты: -123, 85, -189" },
        { coords: convertCoords(938, 3198), desc: "Координаты: -260, 84, -341" },
        { coords: convertCoords(761, 3300), desc: "Координаты: -57, 83, 14" },
        { coords: convertCoords(726, 3212), desc: "Координаты: -233, 98, 82" },
        { coords: convertCoords(672, 3178), desc: "Координаты: -301, 92, 192" },
        { coords: convertCoords(726, 3211), desc: "Координаты: -234, 92, 82" },
        { coords: convertCoords(605, 3206), desc: "Координаты: -246, 85, 325" },
        { coords: convertCoords(723, 3462), desc: "Координаты: 267, 89, 88" },
        { coords: convertCoords(728, 3478), desc: "Координаты: 300, 106, 80" },
        { coords: convertCoords(553, 3576), desc: "Координаты: 494, 85, 428" },
        { coords: convertCoords(542, 3248), desc: "Координаты: -162, 83, 451" },
        { coords: convertCoords(574, 3200), desc: "Координаты: -257, 87, 387" },
        { coords: convertCoords(573, 3163), desc: "Координаты: -331, 86, 389" },
        { coords: convertCoords(735, 3453), desc: "Координаты: 249, 89, 65" },
        { coords: convertCoords(733, 3436), desc: "Координаты: 216, 90, 69" },
        { coords: convertCoords(783, 3383), desc: "Координаты: 108, 90, -32" },
        { coords: convertCoords(731, 3478), desc: "Координаты: 300, 89, 74" },
        { coords: convertCoords(580, 3569), desc: "Координаты: 481, 82, 376" },
        { coords: convertCoords(723, 3415), desc: "Координаты: 174, 89, 89" },
        { coords: convertCoords(601, 3107), desc: "Координаты: -443, 84, 332" },
        { coords: convertCoords(617, 3140), desc: "Координаты: -377, 84, 301" },
        { coords: convertCoords(593, 3205), desc: "Координаты: -247, 84, 350" },
        { coords: convertCoords(562, 3141), desc: "Координаты: -376, 84, 411" },
        { coords: convertCoords(804, 3447), desc: "Координаты: 236, 88, -73" },
        { coords: convertCoords(721, 3461), desc: "Координаты: 266, 89, 93" },
        { coords: convertCoords(609, 3224), desc: "Координаты: -208, 92, 318" },
        { coords: convertCoords(592, 3558), desc: "Координаты: 460, 82, 352" },
        { coords: convertCoords(721, 3409), desc: "Координаты: 161, 90, 93" },
        { coords: convertCoords(717, 3432), desc: "Координаты: 206, 90, 101" },
        { coords: convertCoords(602, 3539), desc: "Координаты: 421, 82, 331" },
        { coords: convertCoords(761, 3433), desc: "Координаты: 210, 94, 14" },
        { coords: convertCoords(521, 3221), desc: "Координаты: -216, 83, 493" },
        { coords: convertCoords(739, 3453), desc: "Координаты: 249, 88, 56" },
        { coords: convertCoords(569, 3119), desc: "Координаты: -418, 84, 397" },
        { coords: convertCoords(782, 3389), desc: "Координаты: 122, 94, -28" },
        { coords: convertCoords(800, 3435), desc: "Координаты: 212, 88, -66" },
        { coords: convertCoords(607, 3219), desc: "Координаты: -218, 85, 322" },
        { coords: convertCoords(617, 3130), desc: "Координаты: -398, 83, 300" },
        { coords: convertCoords(629, 3267), desc: "Координаты: -122, 105, 277" },
        { coords: convertCoords(785, 3461), desc: "Координаты: 265, 88, -35" },
        { coords: convertCoords(752, 3459), desc: "Координаты: 261, 88, 30" },
        { coords: convertCoords(522, 3215), desc: "Координаты: -227, 84, 491" },
        { coords: convertCoords(586, 3564), desc: "Координаты: 472, 82, 363" },
        { coords: convertCoords(545, 3191), desc: "Координаты: -275, 88, 445" },
        { coords: convertCoords(570, 3572), desc: "Координаты: 488, 82, 396" },
        { coords: convertCoords(628, 3272), desc: "Координаты: -113, 104, 279" },
        { coords: convertCoords(606, 3225), desc: "Координаты: -207, 101, 323" },
        { coords: convertCoords(607, 3224), desc: "Координаты: -208, 88, 322" },
        { coords: convertCoords(552, 3117), desc: "Координаты: -424, 90, 431" },
        { coords: convertCoords(727, 3430), desc: "Координаты: 204, 90, 80" },
        { coords: convertCoords(579, 3321), desc: "Координаты: -15, 85, 377" },
        { coords: convertCoords(550, 3561), desc: "Координаты: 466, 91, 434" },
        { coords: convertCoords(589, 3213), desc: "Координаты: -231, 84, 357" },
        { coords: convertCoords(523, 3232), desc: "Координаты: -193, 84, 488" },
        { coords: convertCoords(560, 3181), desc: "Координаты: -295, 87, 414" },
        { coords: convertCoords(706, 3439), desc: "Координаты: 222, 88, 141" },
        { coords: convertCoords(742, 3401), desc: "Координаты: 145, 89, 51" },
        { coords: convertCoords(702, 3446), desc: "Координаты: 235, 88, 130" },
        { coords: convertCoords(772, 3420), desc: "Координаты: 183, 90, -9" },
        { coords: convertCoords(619, 3113), desc: "Координаты: -431, 82, 297" },
        { coords: convertCoords(550, 3099), desc: "Координаты: -457, 84, 436" },
        { coords: convertCoords(535, 3191), desc: "Координаты: -275, 95, 466" },
        { coords: convertCoords(748, 3419), desc: "Координаты: 180, 90, 38" },
        { coords: convertCoords(728, 3458), desc: "Координаты: 259, 90, 80" },
        { coords: convertCoords(543, 3104), desc: "Координаты: -449, 89, 449" },
        { coords: convertCoords(601, 3202), desc: "Координаты: -252, 85, 333" },
        { coords: convertCoords(591, 3217), desc: "Координаты: -224, 85, 353" },
        { coords: convertCoords(755, 3390), desc: "Координаты: 123, 89, 26" },
        { coords: convertCoords(772, 3452), desc: "Координаты: 248, 88, -9" },
        { coords: convertCoords(586, 3220), desc: "Координаты: -216, 84, 364" },
        { coords: convertCoords(605, 3534), desc: "Координаты: 412, 82, 326" },
        { coords: convertCoords(714, 3437), desc: "Координаты: 217, 90, 106" },
        { coords: convertCoords(738, 3402), desc: "Координаты: 147, 89, 59" },
        { coords: convertCoords(552, 3561), desc: "Координаты: 465, 87, 431" },
        { coords: convertCoords(607, 3220), desc: "Координаты: -217, 92, 320" },
        { coords: convertCoords(592, 3209), desc: "Координаты: -239, 85, 350" },
        { coords: convertCoords(628, 3266), desc: "Координаты: -126, 85, 279" },
        { coords: convertCoords(540, 3118), desc: "Координаты: -422, 91, 455" },
        { coords: convertCoords(582, 3094), desc: "Координаты: -470, 83, 371" },
        { coords: convertCoords(617, 3101), desc: "Координаты: -454, 83, 302" },
        { coords: convertCoords(574, 3094), desc: "Координаты: -468, 84, 387" },
        { coords: convertCoords(587, 3217), desc: "Координаты: -223, 85, 360" },
        { coords: convertCoords(580, 3210), desc: "Координаты: -238, 85, 374" },
        { coords: convertCoords(775, 3433), desc: "Координаты: 210, 88, -15" },
        { coords: convertCoords(601, 3543), desc: "Координаты: 429, 82, 332" },
        { coords: convertCoords(535, 3210), desc: "Координаты: -238, 87, 465" },
        { coords: convertCoords(558, 3166), desc: "Координаты: -324, 87, 420" },
        { coords: convertCoords(704, 3453), desc: "Координаты: 249, 89, 128" },
        { coords: convertCoords(581, 3133), desc: "Координаты: -392, 84, 373" },
        { coords: convertCoords(543, 3119), desc: "Координаты: -420, 84, 449" },
        { coords: convertCoords(553, 3106), desc: "Координаты: -444, 84, 430" },
        { coords: convertCoords(606, 3226), desc: "Координаты: -204, 89, 322" },
        { coords: convertCoords(960, 3489), desc: "Координаты: 320, 83, -385" },
        { coords: convertCoords(750, 3721), desc: "Координаты: 785, 78, 35" },
        { coords: convertCoords(854, 3412), desc: "Координаты: 166, 84, -173" },
        { coords: convertCoords(741, 3638), desc: "Координаты: 618, 79, 53" },
        { coords: convertCoords(854, 3363), desc: "Координаты: 69, 90, -173" },
        { coords: convertCoords(827, 3388), desc: "Координаты: 119, 86, -118" },
        { coords: convertCoords(897, 3367), desc: "Координаты: 77, 87, -259" },
        { coords: convertCoords(871, 3701), desc: "Координаты: 746, 83, -207" },
        { coords: convertCoords(912, 3737), desc: "Координаты: 817, 86, -288" },
        { coords: convertCoords(998, 3522), desc: "Координаты: 387, 81, -461" },
        { coords: convertCoords(1000, 3499), desc: "Координаты: 340, 84, -464" },
        { coords: convertCoords(916, 3432), desc: "Координаты: 207, 84, -297" },
        { coords: convertCoords(747, 3732), desc: "Координаты: 807, 77, 42" },
        { coords: convertCoords(823, 3424), desc: "Координаты: 192, 92, -111" },
        { coords: convertCoords(897, 3364), desc: "Координаты: 71, 84, -259" },
        { coords: convertCoords(758, 3582), desc: "Координаты: 508, 84, 19" },
        { coords: convertCoords(826, 3371), desc: "Координаты: 86, 92, -117" },
        { coords: convertCoords(870, 3400), desc: "Координаты: 143, 88, -205" },
        { coords: convertCoords(817, 3412), desc: "Координаты: 168, 87, -100" },
        { coords: convertCoords(993, 3538), desc: "Координаты: 420, 82, -452" },
        { coords: convertCoords(829, 3374), desc: "Координаты: 90, 87, -123" },
        { coords: convertCoords(818, 3387), desc: "Координаты: 117, 93, -102" },
        { coords: convertCoords(833, 3742), desc: "Координаты: 827, 79, -132" },
        { coords: convertCoords(853, 3371), desc: "Координаты: 85, 90, -171" },
        { coords: convertCoords(832, 3409), desc: "Координаты: 161, 86, -130" },
        { coords: convertCoords(754, 3587), desc: "Координаты: 517, 83, 27" },
        { coords: convertCoords(804, 3664), desc: "Координаты: 671, 83, -73" },
        { coords: convertCoords(904, 3366), desc: "Координаты: 75, 84, -274" },
        { coords: convertCoords(914, 3738), desc: "Координаты: 818, 80, -293" },
        { coords: convertCoords(718, 3652), desc: "Координаты: 646, 79, 98" },
        { coords: convertCoords(734, 3683), desc: "Координаты: 709, 79, 68" },
        { coords: convertCoords(989, 3540), desc: "Координаты: 424, 82, -443" },
        { coords: convertCoords(1005, 3483), desc: "Координаты: 309, 84, -475" },
        { coords: convertCoords(989, 3557), desc: "Координаты: 458, 81, -443" },
        { coords: convertCoords(829, 3379), desc: "Координаты: 101, 92, -124" },
        { coords: convertCoords(794, 3733), desc: "Координаты: 810, 78, -52" },
        { coords: convertCoords(868, 3750), desc: "Координаты: 842, 77, -201" },
        { coords: convertCoords(724, 3661), desc: "Координаты: 665, 79, 87" },
        { coords: convertCoords(889, 3356), desc: "Координаты: 55, 84, -243" },
        { coords: convertCoords(787, 3790), desc: "Координаты: 923, 75, -38" },
        { coords: convertCoords(1018, 3521), desc: "Координаты: 385, 83, -501" },
        { coords: convertCoords(811, 3388), desc: "Координаты: 118, 93, -87" },
        { coords: convertCoords(796, 3744), desc: "Координаты: 832, 77, -57" },
        { coords: convertCoords(826, 3682), desc: "Координаты: 707, 83, -118" },
        { coords: convertCoords(847, 3382), desc: "Координаты: 106, 89, -159" },
        { coords: convertCoords(778, 3651), desc: "Координаты: 646, 82, -20" },
        { coords: convertCoords(817, 3393), desc: "Координаты: 130, 93, -98" },
        { coords: convertCoords(792, 3680), desc: "Координаты: 702, 83, -49" },
        { coords: convertCoords(813, 3392), desc: "Координаты: 126, 89, -92" },
        { coords: convertCoords(760, 3634), desc: "Координаты: 611, 82, 15" },
        { coords: convertCoords(823, 3724), desc: "Координаты: 791, 79, -110" },
        { coords: convertCoords(975, 3486), desc: "Координаты: 315, 84, -415" },
        { coords: convertCoords(800, 3732), desc: "Координаты: 807, 79, -64" },
        { coords: convertCoords(847, 3689), desc: "Координаты: 721, 83, -158" },
        { coords: convertCoords(877, 3752), desc: "Координаты: 847, 78, -219" },
        { coords: convertCoords(798, 3787), desc: "Координаты: 918, 79, -61" },
        { coords: convertCoords(783, 3701), desc: "Координаты: 745, 80, -31" },
        { coords: convertCoords(872, 3376), desc: "Координаты: 96, 84, -209" },
        { coords: convertCoords(783, 3703), desc: "Координаты: 748, 81, -31" },
        { coords: convertCoords(850, 3384), desc: "Координаты: 111, 89, -165" },
        { coords: convertCoords(946, 3403), desc: "Координаты: 149, 84, -356" },
        { coords: convertCoords(825, 3741), desc: "Координаты: 825, 78, -116" },
        { coords: convertCoords(846, 3410), desc: "Координаты: 162, 90, -157" },
        { coords: convertCoords(744, 3726), desc: "Координаты: 795, 78, 46" },
        { coords: convertCoords(978, 3501), desc: "Координаты: 344, 84, -421" },
        { coords: convertCoords(763, 3720), desc: "Координаты: 783, 79, 9" },
        { coords: convertCoords(749, 3612), desc: "Координаты: 567, 80, 37" },
        { coords: convertCoords(891, 3398), desc: "Координаты: 138, 84, -247" },
        { coords: convertCoords(779, 3640), desc: "Координаты: 622, 83, -23" },
        { coords: convertCoords(1000, 3481), desc: "Координаты: 305, 85, -465" },
        { coords: convertCoords(999, 3505), desc: "Координаты: 353, 84, -463" },
        { coords: convertCoords(843, 3350), desc: "Координаты: 42, 83, -150" },
        { coords: convertCoords(835, 3736), desc: "Координаты: 815, 78, -135" },
        { coords: convertCoords(726, 3642), desc: "Координаты: 626, 79, 84" },
        { coords: convertCoords(887, 3752), desc: "Координаты: 847, 78, -239" },
        { coords: convertCoords(933, 3781), desc: "Координаты: 904, 78, -330" },
        { coords: convertCoords(848, 3364), desc: "Координаты: 70, 83, -162" },
        { coords: convertCoords(870, 3345), desc: "Координаты: 34, 83, -205" },
        { coords: convertCoords(973, 3550), desc: "Координаты: 443, 85, -410" },
        { coords: convertCoords(934, 3415), desc: "Координаты: 173, 85, -333" },
        { coords: convertCoords(830, 3437), desc: "Координаты: 218, 86, -124" },
        { coords: convertCoords(880, 3421), desc: "Координаты: 186, 84, -225" },
        { coords: convertCoords(968, 3501), desc: "Координаты: 345, 84, -400" },
        { coords: convertCoords(814, 3699), desc: "Координаты: 742, 79, -92" },
        { coords: convertCoords(959, 3473), desc: "Координаты: 289, 84, -383" },
        { coords: convertCoords(754, 3632), desc: "Координаты: 607, 81, 27" },
        { coords: convertCoords(768, 3770), desc: "Координаты: 882, 76, -1" },
        { coords: convertCoords(946, 3398), desc: "Координаты: 138, 85, -357" },
        { coords: convertCoords(792, 3728), desc: "Координаты: 800, 78, -49" },
        { coords: convertCoords(895, 3424), desc: "Координаты: 190, 84, -255" },
        { coords: convertCoords(925, 3396), desc: "Координаты: 134, 84, -314" },
        { coords: convertCoords(986, 3473), desc: "Координаты: 289, 84, -436" },
        { coords: convertCoords(880, 3726), desc: "Координаты: 795, 80, -224" },
        { coords: convertCoords(868, 3386), desc: "Координаты: 115, 84, -201" },
        { coords: convertCoords(853, 3409), desc: "Координаты: 161, 89, -170" },
        { coords: convertCoords(911, 3408), desc: "Координаты: 158, 84, -287" },
        { coords: convertCoords(773, 3678), desc: "Координаты: 698, 81, -10" },
        { coords: convertCoords(829, 3422), desc: "Координаты: 187, 92, -123" },
        { coords: convertCoords(830, 3432), desc: "Координаты: 206, 87, -124" },
        { coords: convertCoords(969, 3586), desc: "Координаты: 516, 84, -403" },
        { coords: convertCoords(826, 3437), desc: "Координаты: 218, 91, -118" },
        { coords: convertCoords(969, 3559), desc: "Координаты: 462, 85, -403" },
        { coords: convertCoords(741, 3680), desc: "Координаты: 703, 79, 52" },
        { coords: convertCoords(973, 3466), desc: "Координаты: 275, 83, -410" },
        { coords: convertCoords(814, 3418), desc: "Координаты: 179, 92, -92" },
        { coords: convertCoords(829, 3390), desc: "Координаты: 123, 85, -123" },
        { coords: convertCoords(916, 3405), desc: "Координаты: 153, 83, -296" },
        { coords: convertCoords(825, 3381), desc: "Координаты: 105, 92, -114" },
        { coords: convertCoords(731, 3706), desc: "Координаты: 756, 77, 74" },
        { coords: convertCoords(814, 3387), desc: "Координаты: 117, 87, -93" },
        { coords: convertCoords(822, 3727), desc: "Координаты: 798, 79, -109" },
        { coords: convertCoords(910, 3428), desc: "Координаты: 199, 84, -284" },
        { coords: convertCoords(800, 3663), desc: "Координаты: 670, 83, -65" },
        { coords: convertCoords(1001, 3520), desc: "Координаты: 382, 81, -468" },
        { coords: convertCoords(829, 3378), desc: "Координаты: 98, 91, -123" },
        { coords: convertCoords(829, 3428), desc: "Координаты: 199, 86, -122" },
        { coords: convertCoords(887, 3726), desc: "Координаты: 794, 80, -239" },
        { coords: convertCoords(1001, 3504), desc: "Координаты: 350, 84, -466" },
        { coords: convertCoords(850, 3406), desc: "Координаты: 155, 86, -165" },
        { coords: convertCoords(901, 3386), desc: "Координаты: 114, 83, -268" },
        { coords: convertCoords(819, 3408), desc: "Координаты: 158, 88, -102" },
        { coords: convertCoords(868, 3392), desc: "Координаты: 128, 85, -201" },
        { coords: convertCoords(879, 3705), desc: "Координаты: 753, 84, -223" },
        { coords: convertCoords(895, 3390), desc: "Координаты: 123, 85, -255" },
        { coords: convertCoords(754, 3705), desc: "Координаты: 753, 79, 28" },
        { coords: convertCoords(793, 3787), desc: "Координаты: 917, 75, -52" },
        { coords: convertCoords(831, 3370), desc: "Координаты: 83, 87, -127" },
        { coords: convertCoords(814, 3416), desc: "Координаты: 176, 91, -93" },
        { coords: convertCoords(864, 3410), desc: "Координаты: 164, 84, -193" },
        { coords: convertCoords(854, 3364), desc: "Координаты: 71, 77, -174" }
    ],

    // ==================== КОНТЕЙНЕРЫ: СЕЙФЫ ====================
    safe: [
        // Армейские склады
        { coords: convertCoords(3511, 3127), desc: "Координаты: -402, 89, -5487" },
        { coords: convertCoords(3687, 2910), desc: "Координаты: -837, 82, -5838" },
        { coords: convertCoords(3700, 3028), desc: "Координаты: -600, 89, -5864" },
        { coords: convertCoords(3711, 3064), desc: "Координаты: -528, 90, -5886" },
        { coords: convertCoords(3510, 2760), desc: "Координаты: -1137, 83, -5483" },
        { coords: convertCoords(3765, 3093), desc: "Координаты: -470, 93, -5994" },
        { coords: convertCoords(3517, 2414), desc: "Координаты: -1828, 96, -5499" },
        { coords: convertCoords(3482, 2993), desc: "Координаты: -671, 89, -5428" },
        { coords: convertCoords(3704, 2636), desc: "Координаты: -1385, 108, -5871" },
        { coords: convertCoords(3750, 3157), desc: "Координаты: -341, 94, -5965" },
        { coords: convertCoords(3452, 2437), desc: "Координаты: -1782, 94, -5368" },
        { coords: convertCoords(3638, 2953), desc: "Координаты: -751, 80, -5740" },
        { coords: convertCoords(3665, 2970), desc: "Координаты: -716, 80, -5794" },
        { coords: convertCoords(3657, 2735), desc: "Координаты: -1186, 88, -5779" },
        { coords: convertCoords(3666, 2941), desc: "Координаты: -775, 76, -5795" },
        { coords: convertCoords(3361, 2419), desc: "Координаты: -1817, 85, -5186" },
        { coords: convertCoords(3513, 3089), desc: "Координаты: -479, 95, -5490" },
        { coords: convertCoords(3536, 3058), desc: "Координаты: -539, 85, -5536" },
        { coords: convertCoords(3489, 2440), desc: "Координаты: -1776, 90, -5443" },
        { coords: convertCoords(3554, 2637), desc: "Координаты: -1382, 86, -5573" },
        // Муравейник
        { coords: convertCoords(2747, 3226), desc: "Координаты: -204, 80, -3958" },
        { coords: convertCoords(2981, 3432), desc: "Координаты: 208, 87, -4425" },
        { coords: convertCoords(2761, 3400), desc: "Координаты: 145, 79, -3986" },
        { coords: convertCoords(2712, 3549), desc: "Координаты: 442, 82, -3889" },
        { coords: convertCoords(2693, 3551), desc: "Координаты: 447, 86, -3849" },
        { coords: convertCoords(2969, 3226), desc: "Координаты: -205, 91, -4401" },
        { coords: convertCoords(2951, 3153), desc: "Координаты: -350, 98, -4366" },
        { coords: convertCoords(2955, 3416), desc: "Координаты: 175, 85, -4374" },
        { coords: convertCoords(2853, 3424), desc: "Координаты: 193, 87, -4170" },
        { coords: convertCoords(2834, 3418), desc: "Координаты: 180, 88, -4133" },
        { coords: convertCoords(2708, 3257), desc: "Координаты: -143, 85, -3880" },
        { coords: convertCoords(2763, 3227), desc: "Координаты: -203, 78, -3990" },
        // Полесское
        { coords: convertCoords(3119, 2791), desc: "Координаты: -1075, 79, -4703" },
        { coords: convertCoords(3253, 2844), desc: "Координаты: -968, 73, -4970" },
        { coords: convertCoords(3369, 2701), desc: "Координаты: -1254, 89, -5202" },
        { coords: convertCoords(3070, 2668), desc: "Координаты: -1320, 84, -4604" },
        { coords: convertCoords(2977, 2793), desc: "Координаты: -1071, 88, -4418" },
        { coords: convertCoords(3283, 2655), desc: "Координаты: -1346, 87, -5030" },
        { coords: convertCoords(3236, 2587), desc: "Координаты: -1483, 102, -4937" },
        { coords: convertCoords(3369, 2768), desc: "Координаты: -1120, 89, -5202" },
        { coords: convertCoords(3287, 2764), desc: "Координаты: -1128, 85, -5037" },
        { coords: convertCoords(2995, 2817), desc: "Координаты: -1021, 87, -4455" },
        // Поляна
        { coords: convertCoords(2998, 2328), desc: "Координаты: -2000, 79, -4461" },
        { coords: convertCoords(2828, 2332), desc: "Координаты: -1991, 90, -4119" },
        { coords: convertCoords(2924, 2423), desc: "Координаты: -1810, 94, -4313" },
        { coords: convertCoords(2968, 2437), desc: "Координаты: -1782, 91, -4401" },
        { coords: convertCoords(2854, 2391), desc: "Координаты: -1875, 100, -4172" },
        { coords: convertCoords(2862, 2304), desc: "Координаты: -2049, 98, -4189" },
        { coords: convertCoords(2970, 2305), desc: "Координаты: -2046, 80, -4405" },
        { coords: convertCoords(3076, 2443), desc: "Координаты: -1769, 86, -4616" },
        { coords: convertCoords(2942, 2371), desc: "Координаты: -1913, 91, -4348" },
        { coords: convertCoords(2855, 2418), desc: "Координаты: -1821, 90, -4174" },
        { coords: convertCoords(2828, 2383), desc: "Координаты: -1889, 88, -4120" },
        { coords: convertCoords(2827, 2443), desc: "Координаты: -1770, 90, -4118" },
        // Янтарь
        { coords: convertCoords(2576, 1983), desc: "Координаты: -2690, 72, -3615" },
        { coords: convertCoords(2723, 2287), desc: "Координаты: -2082, 81, -3908" },
        { coords: convertCoords(2705, 2329), desc: "Координаты: -1997, 87, -3873" },
        { coords: convertCoords(2557, 2149), desc: "Координаты: -2356, 66, -3577" },
        { coords: convertCoords(2729, 2373), desc: "Координаты: -1910, 79, -3922" },
        { coords: convertCoords(2648, 2362), desc: "Координаты: -1932, 79, -3760" },
        // Дикая территория
        { coords: convertCoords(2832, 2787), desc: "Координаты: -1082, 85, -4129" },
        { coords: convertCoords(2778, 2593), desc: "Координаты: -1470, 111, -4022" },
        { coords: convertCoords(2742, 2650), desc: "Координаты: -1354, 85, -3950" },
        { coords: convertCoords(2730, 2762), desc: "Координаты: -1133, 79, -3922" },
        // Свалка
        { coords: convertCoords(2142, 2764), desc: "Координаты: -1126, 84, -2747" },
        { coords: convertCoords(2033, 2788), desc: "Координаты: -1078, 89, -2530" },
        { coords: convertCoords(2120, 3037), desc: "Координаты: -581, 77, -2703" },
        { coords: convertCoords(2007, 2875), desc: "Координаты: -904, 80, -2478" },
        { coords: convertCoords(2254, 3122), desc: "Координаты: -411, 95, -2971" },
        { coords: convertCoords(2247, 3002), desc: "Координаты: -652, 80, -2958" },
        { coords: convertCoords(2007, 2693), desc: "Координаты: -1269, 97, -2478" },
        { coords: convertCoords(1948, 2815), desc: "Координаты: -1026, 83, -2359" },
        { coords: convertCoords(2106, 2706), desc: "Координаты: -1242, 108, -2675" },
        { coords: convertCoords(1887, 3648), desc: "Координаты: 639, 79, -2238" },
        { coords: convertCoords(1751, 3279), desc: "Координаты: -100, 100, -1966" },
        { coords: convertCoords(1893, 3597), desc: "Координаты: 536, 83, -2249" },
        { coords: convertCoords(1933, 3475), desc: "Координаты: 294, 80, -2329" },
        { coords: convertCoords(1978, 3500), desc: "Координаты: 343, 85, -2419" },
        // Тёмная долина
        { coords: convertCoords(2275, 4101), desc: "Координаты: 1547, 73, -3013" },
        { coords: convertCoords(2508, 3826), desc: "Координаты: 996, 75, -3478" },
        { coords: convertCoords(2242, 4053), desc: "Координаты: 1450, 78, -2946" },
        { coords: convertCoords(2337, 3886), desc: "Координаты: 1115, 90, -3135" },
        { coords: convertCoords(2340, 4100), desc: "Координаты: 1544, 80, -3141" },
        { coords: convertCoords(2358, 4089), desc: "Координаты: 1522, 79, -3177" },
        { coords: convertCoords(2228, 4076), desc: "Координаты: 1496, 88, -2917" },
        { coords: convertCoords(2346, 4087), desc: "Координаты: 1518, 79, -3154" },
        { coords: convertCoords(2368, 3862), desc: "Координаты: 1069, 91, -3199" },
        // Агропром
        { coords: convertCoords(2246, 2003), desc: "Координаты: -2650, 83, -2956" },
        { coords: convertCoords(2382, 1982), desc: "Координаты: -2691, 79, -3228" },
        { coords: convertCoords(2194, 1980), desc: "Координаты: -2695, 84, -2852" },
        { coords: convertCoords(2427, 2330), desc: "Координаты: -1996, 84, -3318" },
        { coords: convertCoords(2271, 2538), desc: "Координаты: -1579, 77, -3005" },
        { coords: convertCoords(2143, 2156), desc: "Координаты: -2342, 82, -2750" },
        { coords: convertCoords(2012, 2055), desc: "Координаты: -2546, 82, -2489" },
        { coords: convertCoords(2124, 2159), desc: "Координаты: -2337, 78, -2713" },
        { coords: convertCoords(2216, 2026), desc: "Координаты: -2604, 83, -2897" },
        // Подземелья Агропрома
        { coords: convertCoords(2216, 2333), desc: "Координаты: -1990, 53, -2897", level: "underground" },
        // Кордон
        { coords: convertCoords(1558, 2949), desc: "Координаты: -759, 48, -1580", level: "underground" },
        { coords: convertCoords(1784, 2830), desc: "Координаты: -997, 82, -2032" },
        { coords: convertCoords(1766, 2885), desc: "Координаты: -886, 86, -1997" },
        { coords: convertCoords(1527, 3048), desc: "Координаты: -561, 78, -1519" },
        { coords: convertCoords(1635, 3346), desc: "Координаты: 36, 102, -1733" },
        // Тёмная лощина
        { coords: convertCoords(1850, 3685), desc: "Координаты: 714, 80, -2164" },
        { coords: convertCoords(1538, 3880), desc: "Координаты: 1105, 81, -1540" },
        { coords: convertCoords(1671, 3865), desc: "Координаты: 1075, 104, -1806" },
        { coords: convertCoords(1775, 3951), desc: "Координаты: 1245, 67, -2015" },
        { coords: convertCoords(1629, 3978), desc: "Координаты: 1299, 65, -1723" },
        { coords: convertCoords(1466, 4029), desc: "Координаты: 1401, 79, -1397" },
        // Топи
        { coords: convertCoords(632, 2448), desc: "Координаты: -1762, 94, 271" },
        { coords: convertCoords(788, 2121), desc: "Координаты: -2414, 105, -41" },
        { coords: convertCoords(967, 2676), desc: "Координаты: -1305, 80, -400" },
        { coords: convertCoords(1062, 2235), desc: "Координаты: -2188, 93, -590" },
        { coords: convertCoords(686, 2165), desc: "Координаты: -2328, 93, 164" },
        // Росстань
        { coords: convertCoords(843, 3181), desc: "Координаты: -294, 87, -151" },
        { coords: convertCoords(924, 3259), desc: "Координаты: -139, 83, -313" },
        { coords: convertCoords(875, 3143), desc: "Координаты: -370, 83, -215" },
        { coords: convertCoords(868, 3206), desc: "Координаты: -244, 84, -201" },
        { coords: convertCoords(1021, 3188), desc: "Координаты: -281, 81, -506" },
        { coords: convertCoords(1272, 3590), desc: "Координаты: 523, 74, -1009" },
        { coords: convertCoords(674, 3397), desc: "Координаты: 136, 89, 188" },
        { coords: convertCoords(756, 3304), desc: "Координаты: -49, 88, 23" },
        { coords: convertCoords(960, 2971), desc: "Координаты: -716, 72, -385" },
        { coords: convertCoords(766, 3435), desc: "Координаты: 212, 92, 3" },
        { coords: convertCoords(465, 3221), desc: "Координаты: -215, 74, 606" },
        { coords: convertCoords(607, 3227), desc: "Координаты: -203, 97, 321" },
        { coords: convertCoords(620, 3136), desc: "Координаты: -385, 84, 295" },
        { coords: convertCoords(728, 3462), desc: "Координаты: 268, 91, 78" },
        { coords: convertCoords(794, 3383), desc: "Координаты: 107, 95, -53" },
        { coords: convertCoords(787, 3432), desc: "Координаты: 207, 88, -39" },
        { coords: convertCoords(606, 3206), desc: "Координаты: -246, 85, 323" },
        { coords: convertCoords(906, 3735), desc: "Координаты: 814, 86, -278" },
        { coords: convertCoords(1019, 3514), desc: "Координаты: 371, 83, -503" },
        { coords: convertCoords(847, 3539), desc: "Координаты: 421, 78, -159" },
        { coords: convertCoords(825, 3422), desc: "Координаты: 187, 92, -115" },
        { coords: convertCoords(858, 3742), desc: "Координаты: 826, 83, -181" },
        { coords: convertCoords(798, 3712), desc: "Координаты: 768, 79, -60" },
        { coords: convertCoords(1205, 3872), desc: "Координаты: 1087, 80, -875" },
        { coords: convertCoords(763, 3775), desc: "Координаты: 893, 77, 9" },
        { coords: convertCoords(803, 3656), desc: "Координаты: 655, 85, -71" },
        { coords: convertCoords(907, 3388), desc: "Координаты: 120, 85, -279" }
    ],

    // ==================== КОНТЕЙНЕРЫ: СХРОНЫ ====================
    stash_hidden: [

    ],

    // ==================== МУТАНТЫ: СЛЕПЫЕ ПСЫ ====================
    blind_dog: [
        // Армейские склады
        { coords: convertCoords(3576, 3007), desc: "Слепые собаки" },
        { coords: convertCoords(3377, 2531), desc: "Слепые собаки" },
        { coords: convertCoords(3598, 3032), desc: "Слепые собаки" },
        { coords: convertCoords(3463, 2840), desc: "Слепые собаки" },
        { coords: convertCoords(3555, 3051), desc: "Слепые собаки" },
        { coords: convertCoords(3587, 3106), desc: "Слепые собаки" },
        { coords: convertCoords(3740, 2796), desc: "Слепые собаки" },
        { coords: convertCoords(3707, 3044), desc: "Слепые собаки" },
        { coords: convertCoords(3447, 2531), desc: "Слепые собаки" },
        { coords: convertCoords(3762, 3037), desc: "Слепые собаки" },
        // Муравейник
        { coords: convertCoords(3057, 3319), desc: "Слепые собаки" },
        { coords: convertCoords(2800, 3330), desc: "Слепые собаки" },
        { coords: convertCoords(2815, 3179), desc: "Слепые собаки" },
        { coords: convertCoords(2956, 3143), desc: "Слепые собаки" },
        { coords: convertCoords(2830, 3365), desc: "Слепые собаки" },
        { coords: convertCoords(2863, 3376), desc: "Слепые собаки" },
        { coords: convertCoords(2709, 3294), desc: "Слепые собаки" },
        { coords: convertCoords(2663, 3277), desc: "Слепые собаки" },
        { coords: convertCoords(2958, 3162), desc: "Слепые собаки" },
        // Полесское
        { coords: convertCoords(3239, 2650), desc: "Слепые псы" },
        { coords: convertCoords(3107, 2845), desc: "Слепые псы" },
        { coords: convertCoords(3026, 2633), desc: "Слепые псы" },
        { coords: convertCoords(3049, 2710), desc: "Слепые псы" },
        { coords: convertCoords(3383, 2809), desc: "Слепые псы" },
        { coords: convertCoords(3344, 2761), desc: "Слепые псы" },
        { coords: convertCoords(3099, 2712), desc: "Слепые псы" },
        { coords: convertCoords(3182, 2579), desc: "Слепые псы" },
        { coords: convertCoords(2976, 2893), desc: "Слепые псы" },
        // Поляна
        { coords: convertCoords(2916, 2332), desc: "Слепые псы" },
        { coords: convertCoords(3088, 2474), desc: "Слепые псы" },
        { coords: convertCoords(2974, 2465), desc: "Слепые псы" },
        { coords: convertCoords(2883, 2484), desc: "Слепые псы" },
        { coords: convertCoords(2824, 2356), desc: "Слепые псы" },
        { coords: convertCoords(3005, 2381), desc: "Слепые псы" },
        { coords: convertCoords(2931, 2468), desc: "Слепые псы" },
        { coords: convertCoords(3108, 2407), desc: "Слепые псы" },
        { coords: convertCoords(2826, 2356), desc: "Слепые псы" },
        // Дикая территория
        { coords: convertCoords(2760, 2732), desc: "Слепые псы" },
        { coords: convertCoords(2816, 2654), desc: "Слепые псы" },
        { coords: convertCoords(2815, 2829), desc: "Слепые псы" },
        // Бар
        { coords: convertCoords(2586, 3110), desc: "Слепые псы" },
        { coords: convertCoords(2638, 3021), desc: "Слепые псы" },
        { coords: convertCoords(2531, 3115), desc: "Слепые псы" },
        // Свалка
        { coords: convertCoords(2306, 2952), desc: "Слепые собаки" },
        { coords: convertCoords(2078, 2973), desc: "Слепые собаки" },
        { coords: convertCoords(2064, 3246), desc: "Слепые собаки" },
        { coords: convertCoords(2140, 2778), desc: "Слепые собаки" },
        { coords: convertCoords(2224, 2882), desc: "Слепые собаки" },
        { coords: convertCoords(1938, 2593), desc: "Слепые собаки" },
        { coords: convertCoords(2203, 2873), desc: "Слепые собаки" },
        { coords: convertCoords(2110, 3215), desc: "Слепые собаки" },
        { coords: convertCoords(2251, 2683), desc: "Слепые собаки" },
        { coords: convertCoords(2139, 2659), desc: "Слепые собаки" },
        { coords: convertCoords(2200, 3133), desc: "Слепые собаки" },
        { coords: convertCoords(1933, 2740), desc: "Слепые собаки" },
        { coords: convertCoords(1950, 3300), desc: "Слепые псы" },
        { coords: convertCoords(1828, 3490), desc: "Слепые псы" },
        { coords: convertCoords(1958, 3513), desc: "Слепые псы" },
        // Тёмная долина
        { coords: convertCoords(2232, 3701), desc: "Слепые псы" },
        { coords: convertCoords(2266, 4059), desc: "Слепые псы" },
        { coords: convertCoords(2490, 3837), desc: "Слепые псы" },
        { coords: convertCoords(2394, 3986), desc: "Слепые псы" },
        { coords: convertCoords(2376, 4101), desc: "Слепые псы" },
        { coords: convertCoords(2382, 3799), desc: "Слепые псы" },
        { coords: convertCoords(2342, 3912), desc: "Слепые псы" },
        { coords: convertCoords(2192, 4185), desc: "Слепые псы" },
        { coords: convertCoords(2377, 3872), desc: "Слепые псы" },
        // Агропром
        { coords: convertCoords(2307, 2376), desc: "Слепые псы" },
        { coords: convertCoords(2195, 2133), desc: "Слепые псы" },
        { coords: convertCoords(2225, 2441), desc: "Слепые псы" },
        { coords: convertCoords(2150, 2203), desc: "Слепые псы" },
        { coords: convertCoords(2170, 2366), desc: "Слепые псы" },
        { coords: convertCoords(2295, 2484), desc: "Слепые псы" },
        { coords: convertCoords(2098, 2348), desc: "Слепые псы" },
        { coords: convertCoords(2263, 2160), desc: "Слепые псы" },
        { coords: convertCoords(2062, 2128), desc: "Слепые псы" },
        // Редколесье
        { coords: convertCoords(1635, 2597), desc: "Слепые псы" },
        { coords: convertCoords(1523, 2426), desc: "Слепые псы" },
        { coords: convertCoords(1634, 2172), desc: "Слепые псы" },
        { coords: convertCoords(1836, 2524), desc: "Слепые псы" },
        { coords: convertCoords(1947, 2521), desc: "Слепые псы" },
        // Стройплощадка
        { coords: convertCoords(1467, 1879), desc: "Слепые псы" },
        { coords: convertCoords(1368, 1680), desc: "Слепые псы" },
        { coords: convertCoords(1370, 1953), desc: "Слепые псы" },
        { coords: convertCoords(1370, 1846), desc: "Слепые псы" },
        { coords: convertCoords(1395, 1767), desc: "Слепые псы" },
        // Кордон
        { coords: convertCoords(1694, 3216), desc: "Слепые псы" },
        { coords: convertCoords(1474, 3016), desc: "Слепые псы" },
        { coords: convertCoords(1700, 2993), desc: "Слепые псы" },
        { coords: convertCoords(2024, 3064), desc: "Слепые псы" },
        { coords: convertCoords(1542, 2993), desc: "Слепые псы" },
        { coords: convertCoords(1488, 2972), desc: "Слепые псы" },
        { coords: convertCoords(1605, 3236), desc: "Слепые псы" },
        { coords: convertCoords(1668, 3195), desc: "Слепые псы" },
        { coords: convertCoords(1767, 2977), desc: "Слепые псы" },
        { coords: convertCoords(1551, 3132), desc: "Слепые псы" },
        { coords: convertCoords(1680, 3169), desc: "Слепые псы" },
        { coords: convertCoords(1746, 2781), desc: "Слепые псы" },
        { coords: convertCoords(1725, 3087), desc: "Слепые псы" },
        // Тёмная лощина
        { coords: convertCoords(1459, 3929), desc: "Слепые псы" },
        { coords: convertCoords(1428, 3943), desc: "Слепые псы" },
        { coords: convertCoords(1923, 3710), desc: "Слепые псы" },
        { coords: convertCoords(2041, 3699), desc: "Слепые псы" },
        { coords: convertCoords(1407, 3740), desc: "Слепые псы" },
        { coords: convertCoords(1535, 4013), desc: "Слепые псы" },
        // Сортировка
        { coords: convertCoords(1647, 4438), desc: "Слепые псы" },
        { coords: convertCoords(1731, 4362), desc: "Слепые псы" },
        { coords: convertCoords(1915, 4443), desc: "Слепые псы" },
        // Топи
        { coords: convertCoords(890, 2297), desc: "Слепые псы" },
        { coords: convertCoords(841, 2486), desc: "Слепые псы" },
        { coords: convertCoords(1032, 2613), desc: "Слепые псы" },
        { coords: convertCoords(884, 2371), desc: "Слепые псы" },
        { coords: convertCoords(686, 2187), desc: "Слепые псы" },
        { coords: convertCoords(1013, 2563), desc: "Слепые псы" },
        { coords: convertCoords(1057, 2520), desc: "Слепые псы" },
        { coords: convertCoords(1050, 2291), desc: "Слепые псы" },
        { coords: convertCoords(983, 2352), desc: "Слепые псы" },
        { coords: convertCoords(940, 2424), desc: "Слепые псы" },
        // Росстань
        { coords: convertCoords(1056, 2989), desc: "Слепые псы" },
        { coords: convertCoords(1109, 2979), desc: "Слепые псы" },
        { coords: convertCoords(1269, 3590), desc: "Слепые псы" },
        { coords: convertCoords(894, 3248), desc: "Слепые псы" },
        { coords: convertCoords(979, 3159), desc: "Слепые псы" },
        { coords: convertCoords(1313, 3583), desc: "Слепые псы" },
        { coords: convertCoords(1222, 3569), desc: "Слепые псы" },
        { coords: convertCoords(909, 2981), desc: "Слепые псы" },
        { coords: convertCoords(759, 3207), desc: "Слепые псы" },
        { coords: convertCoords(1009, 3206), desc: "Слепые псы" },
        { coords: convertCoords(1177, 3607), desc: "Слепые псы" },
        { coords: convertCoords(1200, 3711), desc: "Слепые псы" },
        { coords: convertCoords(693, 2896), desc: "Слепые псы" },
        { coords: convertCoords(844, 3339), desc: "Слепые псы" },
        { coords: convertCoords(937, 3094), desc: "Слепые псы" },
        { coords: convertCoords(599, 2978), desc: "Слепые псы" },
        { coords: convertCoords(1323, 3884), desc: "Слепые псы" },
        { coords: convertCoords(684, 3373), desc: "Слепые псы" },
        { coords: convertCoords(1015, 3324), desc: "Слепые псы" },
        { coords: convertCoords(949, 3375), desc: "Слепые псы" },
        { coords: convertCoords(1112, 3011), desc: "Слепые псы" },
        { coords: convertCoords(999, 3377), desc: "Слепые псы" },
        { coords: convertCoords(1277, 3726), desc: "Слепые псы" },
        { coords: convertCoords(796, 3292), desc: "Слепые псы" },
        { coords: convertCoords(770, 3072), desc: "Слепые псы" },
        { coords: convertCoords(610, 3043), desc: "Слепые псы" },
        { coords: convertCoords(545, 3221), desc: "Слепые псы" },
        { coords: convertCoords(596, 3491), desc: "Слепые псы" },
        { coords: convertCoords(479, 3236), desc: "Слепые псы" },
        { coords: convertCoords(618, 3405), desc: "Слепые псы" },
        { coords: convertCoords(638, 3317), desc: "Слепые псы" },
        { coords: convertCoords(813, 3432), desc: "Слепые псы" },
        { coords: convertCoords(595, 3134), desc: "Слепые псы" },
        { coords: convertCoords(563, 3115), desc: "Слепые псы" },
        { coords: convertCoords(593, 3225), desc: "Слепые псы" },
        { coords: convertCoords(551, 3167), desc: "Слепые псы" },
        { coords: convertCoords(577, 3562), desc: "Слепые псы" },
        { coords: convertCoords(851, 3416), desc: "Слепые псы" },
        { coords: convertCoords(867, 3662), desc: "Слепые псы" },
        { coords: convertCoords(962, 3740), desc: "Слепые псы" },
        { coords: convertCoords(1001, 3642), desc: "Слепые псы" },
        { coords: convertCoords(1089, 3714), desc: "Слепые псы" },
        { coords: convertCoords(1142, 3743), desc: "Слепые псы" },
        { coords: convertCoords(855, 3458), desc: "Слепые псы" },
        { coords: convertCoords(1103, 3769), desc: "Слепые псы" },
        { coords: convertCoords(898, 3408), desc: "Слепые псы" },
        { coords: convertCoords(1029, 3625), desc: "Слепые псы" },
        { coords: convertCoords(911, 3772), desc: "Слепые псы" },
        { coords: convertCoords(1054, 3580), desc: "Слепые псы" },
        { coords: convertCoords(1078, 3628), desc: "Слепые псы" },
        { coords: convertCoords(907, 3669), desc: "Слепые псы" },
        { coords: convertCoords(727, 3566), desc: "Слепые псы" },
        { coords: convertCoords(762, 3550), desc: "Слепые псы" },
        { coords: convertCoords(868, 3712), desc: "Слепые псы" },
        { coords: convertCoords(975, 3664), desc: "Слепые псы" },
        { coords: convertCoords(802, 3480), desc: "Слепые псы" },
        { coords: convertCoords(940, 3414), desc: "Слепые псы" },
    ],

    // ==================== МУТАНТЫ: ПСЕВДОСОБАКИ ====================
    pseudodog: [
        // Армейские склады
        { coords: convertCoords(3404, 2536), desc: "Псевдособаки" },
        // Свалка
        { coords: convertCoords(2227, 2841), desc: "Псевдособаки" },
        { coords: convertCoords(2062, 3240), desc: "Псевдособаки" },
        { coords: convertCoords(2232, 3269), desc: "Псевдособаки" },
        { coords: convertCoords(2319, 2935), desc: "Псевдособаки" },
        { coords: convertCoords(1970, 2656), desc: "Псевдособаки" },
        // Тёмная долина
        { coords: convertCoords(2374, 4128), desc: "Псевдособаки" },
        { coords: convertCoords(2272, 3876), desc: "Псевдособаки" },
        { coords: convertCoords(2230, 3711), desc: "Псевдособаки" },
        { coords: convertCoords(2484, 3841), desc: "Псевдособаки" },
        { coords: convertCoords(2543, 3723), desc: "Псевдособаки" },
        // Агропром
        { coords: convertCoords(2076, 2334), desc: "Псевдособаки" },
        { coords: convertCoords(2098, 2019), desc: "Псевдособаки" },
        { coords: convertCoords(2361, 2467), desc: "Псевдособаки" },
        { coords: convertCoords(2275, 2041), desc: "Псевдособаки" },
        { coords: convertCoords(2133, 2435), desc: "Псевдособаки" },
        { coords: convertCoords(2059, 2120), desc: "Псевдособаки" },
        // Тёмная лощина
        { coords: convertCoords(1742, 3898), desc: "Псевдособаки" },
        { coords: convertCoords(1626, 3512), desc: "Псевдособаки" },
        { coords: convertCoords(1476, 3880), desc: "Псевдособаки" },
        { coords: convertCoords(1409, 3742), desc: "Псевдособаки" },
        { coords: convertCoords(1426, 3939), desc: "Псевдособаки" },
        // Сортировка
        { coords: convertCoords(1856, 4419), desc: "Псевдособаки" },
        // Топи
        { coords: convertCoords(794, 2317), desc: "Псевдособаки" },
        { coords: convertCoords(941, 2145), desc: "Псевдособаки" },
        { coords: convertCoords(941, 2427), desc: "Псевдособаки" },
        { coords: convertCoords(838, 2484), desc: "Псевдособаки" },
        // Росстань
        { coords: convertCoords(817, 3035), desc: "Псевдособаки" },
        { coords: convertCoords(1005, 3391), desc: "Псевдособаки" },
        { coords: convertCoords(1155, 3673), desc: "Псевдособаки" },
        { coords: convertCoords(982, 3112), desc: "Псевдособаки" },
        { coords: convertCoords(1218, 3579), desc: "Псевдособаки" },
        { coords: convertCoords(1026, 3267), desc: "Псевдособаки" },
        { coords: convertCoords(904, 3213), desc: "Псевдособаки" },
        { coords: convertCoords(918, 2919), desc: "Псевдособаки" },
        { coords: convertCoords(718, 3287), desc: "Псевдособаки" },
        { coords: convertCoords(572, 3186), desc: "Псевдособаки" },
        { coords: convertCoords(531, 3028), desc: "Псевдособаки" },
        { coords: convertCoords(548, 3313), desc: "Псевдособаки" },
        { coords: convertCoords(482, 3090), desc: "Псевдособаки" },
        { coords: convertCoords(913, 3607), desc: "Псевдособаки" },
        { coords: convertCoords(1013, 3719), desc: "Псевдособаки" },
        { coords: convertCoords(815, 3637), desc: "Псевдособаки" },
        { coords: convertCoords(946, 3453), desc: "Псевдособаки" },
        { coords: convertCoords(1144, 3751), desc: "Псевдособаки" },
        { coords: convertCoords(1003, 3534), desc: "Псевдособаки" },
        { coords: convertCoords(758, 3800), desc: "Псевдособаки" },
    ],

    // ==================== МУТАНТЫ: ПСИ-СОБАКА ====================
    psy_dog: [
        // Армейские склады
        { coords: convertCoords(3775, 2902), desc: "Пси-собака" },
        { coords: convertCoords(3457, 2838), desc: "Пси-собака" },
        { coords: convertCoords(3571, 3006), desc: "Пси-собака" },
        { coords: convertCoords(3560, 3065), desc: "Пси-собака" },
        { coords: convertCoords(3553, 3182), desc: "Пси-собака" },
        { coords: convertCoords(3760, 3036), desc: "Пси-собака" },
        { coords: convertCoords(3447, 2535), desc: "Пси-собака" },
        { coords: convertCoords(3596, 3034), desc: "Пси-собака" },
        { coords: convertCoords(3739, 2801), desc: "Пси-собака" },
        // Муравейник
        { coords: convertCoords(2700, 3303), desc: "Пси-собака" },
        { coords: convertCoords(2862, 3375), desc: "Пси-собака" },
        { coords: convertCoords(2958, 3129), desc: "Пси-собака" },
        // Полесское
        { coords: convertCoords(3182, 2576), desc: "Пси-собака" },
        { coords: convertCoords(3107, 2848), desc: "Пси-собака" },
        // Поляна
        { coords: convertCoords(2881, 2484), desc: "Пси-собака" },
        { coords: convertCoords(2826, 2356), desc: "Пси-собака" },
        { coords: convertCoords(2913, 2332), desc: "Пси-собака" },
        { coords: convertCoords(2959, 2459), desc: "Пси-собака" },
        // Дикая территория
        { coords: convertCoords(2737, 2736), desc: "Пси-собака" },
        { coords: convertCoords(2687, 2794), desc: "Пси-собака" },
        // Бар
        { coords: convertCoords(2590, 3110), desc: "Пси-собака" },
        { coords: convertCoords(2663, 3042), desc: "Пси-собака" },
        // Свалка
        { coords: convertCoords(1933, 2737), desc: "Пси-собака" },
        { coords: convertCoords(2109, 2799), desc: "Пси-собака" },
        { coords: convertCoords(2250, 2686), desc: "Пси-собака" },
        { coords: convertCoords(2203, 3133), desc: "Пси-собака" },
        { coords: convertCoords(1958, 3515), desc: "Пси-собака" },
        { coords: convertCoords(1828, 3488), desc: "Пси-собака" },
        // Тёмная долина
        { coords: convertCoords(2376, 3866), desc: "Пси-собака" },
        { coords: convertCoords(2336, 4089), desc: "Пси-собака" },
        { coords: convertCoords(2498, 3620), desc: "Пси-собака" },
        // Агропром
        { coords: convertCoords(2195, 2136), desc: "Пси-собака" },
        { coords: convertCoords(2175, 2410), desc: "Пси-собака" },
        { coords: convertCoords(2374, 2328), desc: "Пси-собака" },
        // Редколесье
        { coords: convertCoords(1946, 2519), desc: "Пси-собака" },
        { coords: convertCoords(1634, 2170), desc: "Пси-собака" },
        // Стройплощадка
        { coords: convertCoords(1370, 1849), desc: "Пси-собака" },
        { coords: convertCoords(1465, 1879), desc: "Пси-собака" },
        { coords: convertCoords(1566, 1876), desc: "Пси-собака" },
        // Кордон
        { coords: convertCoords(1664, 3202), desc: "Пси-собака" },
        { coords: convertCoords(1540, 2996), desc: "Пси-собака" },
        { coords: convertCoords(1763, 2977), desc: "Пси-собака" },
        // Тёмная лощина
        { coords: convertCoords(1385, 3919), desc: "Пси-собака" },
        { coords: convertCoords(2044, 3699), desc: "Пси-собака" },
        // Топи
        { coords: convertCoords(894, 2475), desc: "Пси-собака" },
        { coords: convertCoords(581, 2587), desc: "Пси-собака" },
        { coords: convertCoords(883, 2294), desc: "Пси-собака" },
        { coords: convertCoords(764, 2568), desc: "Пси-собака" },
        { coords: convertCoords(784, 2174), desc: "Пси-собака" },
        { coords: convertCoords(1046, 2291), desc: "Пси-собака" },
        { coords: convertCoords(680, 2186), desc: "Пси-собака" },
        // Росстань
        { coords: convertCoords(1325, 3886), desc: "Пси-собака" },
        { coords: convertCoords(749, 3062), desc: "Пси-собака" },
        { coords: convertCoords(473, 3093), desc: "Пси-собака" },
    ],

    // ==================== МУТАНТЫ: ПЛОТИ ====================
    flesh: [
        // Армейские склады
        { coords: convertCoords(3570, 2593), desc: "Плоти" },
        { coords: convertCoords(3710, 2998), desc: "Плоти" },
        { coords: convertCoords(3499, 2793), desc: "Плоти" },
        { coords: convertCoords(3528, 2668), desc: "Плоти" },
        { coords: convertCoords(3679, 3140), desc: "Плоти" },
        { coords: convertCoords(3681, 2894), desc: "Плоти" },
        // Муравейник
        { coords: convertCoords(2912, 3201), desc: "Плоти" },
        { coords: convertCoords(2967, 3246), desc: "Плоти" },
        { coords: convertCoords(2833, 3216), desc: "Плоти" },
        { coords: convertCoords(2667, 3436), desc: "Плоти" },
        { coords: convertCoords(3062, 3526), desc: "Плоти" },
        { coords: convertCoords(2762, 3216), desc: "Плоти" },
        { coords: convertCoords(2995, 3275), desc: "Плоти" },
        { coords: convertCoords(2702, 3170), desc: "Плоти" },
        { coords: convertCoords(2878, 3427), desc: "Плоти" },
        // Полесское
        { coords: convertCoords(3009, 2701), desc: "Плоти" },
        { coords: convertCoords(3192, 2644), desc: "Плоти" },
        { coords: convertCoords(3378, 2644), desc: "Плоти" },
        { coords: convertCoords(3186, 2852), desc: "Плоти" },
        // Поляна
        { coords: convertCoords(3031, 2448), desc: "Плоти" },
        { coords: convertCoords(3118, 2360), desc: "Плоти" },
        { coords: convertCoords(3073, 2430), desc: "Плоти" },
        { coords: convertCoords(2815, 2288), desc: "Плоти" },
        // Дикая территория
        { coords: convertCoords(2650, 2827), desc: "Плоти" },
        // Бар
        { coords: convertCoords(2547, 3150), desc: "Плоти" },
        // Свалка
        { coords: convertCoords(1995, 2758), desc: "Плоти" },
        { coords: convertCoords(2225, 2640), desc: "Плоти" },
        { coords: convertCoords(2346, 2974), desc: "Плоти" },
        { coords: convertCoords(2199, 2724), desc: "Плоти" },
        { coords: convertCoords(2086, 3121), desc: "Плоти" },
        { coords: convertCoords(1949, 3340), desc: "Плоти" },
        { coords: convertCoords(1872, 3531), desc: "Плоти" },
        // Тёмная долина
        { coords: convertCoords(2202, 4000), desc: "Плоти" },
        { coords: convertCoords(2526, 3826), desc: "Плоти" },
        { coords: convertCoords(2494, 3975), desc: "Плоти" },
        { coords: convertCoords(2290, 4014), desc: "Плоти" },
        { coords: convertCoords(2330, 3710), desc: "Плоти" },
        // Агропром
        { coords: convertCoords(2121, 2051), desc: "Плоти" },
        { coords: convertCoords(2379, 2406), desc: "Плоти" },
        { coords: convertCoords(2273, 2297), desc: "Плоти" },
        { coords: convertCoords(2241, 2284), desc: "Плоти" },
        { coords: convertCoords(2199, 2248), desc: "Плоти" },
        { coords: convertCoords(2032, 2280), desc: "Плоти" },
        // Редколесье
        { coords: convertCoords(1565, 2468), desc: "Плоти" },
        { coords: convertCoords(1747, 2165), desc: "Плоти" },
        { coords: convertCoords(1918, 2519), desc: "Плоти" },
        { coords: convertCoords(1789, 2500), desc: "Плоти" },
        { coords: convertCoords(1578, 2277), desc: "Плоти" },
        // Стройплощадка
        { coords: convertCoords(1525, 1852), desc: "Плоти" },
        { coords: convertCoords(1384, 1912), desc: "Плоти" },
        { coords: convertCoords(1510, 1947), desc: "Плоти" },
        { coords: convertCoords(1431, 1899), desc: "Плоти" },
        // Кордон
        { coords: convertCoords(1707, 2909), desc: "Плоти" },
        { coords: convertCoords(1478, 2942), desc: "Плоти" },
        { coords: convertCoords(1729, 3019), desc: "Плоти" },
        // Тёмная лощина
        { coords: convertCoords(1510, 3960), desc: "Плоти" },
        { coords: convertCoords(1441, 3788), desc: "Плоти" },
        { coords: convertCoords(1975, 3714), desc: "Плоти" },
        { coords: convertCoords(1747, 3710), desc: "Плоти" },
        { coords: convertCoords(1892, 3678), desc: "Плоти" },
        // Сортировка
        { coords: convertCoords(1801, 4389), desc: "Плоти" },
        { coords: convertCoords(1648, 4338), desc: "Плоти" },
        { coords: convertCoords(1852, 4461), desc: "Плоти" },
        // Топи
        { coords: convertCoords(800, 2395), desc: "Плоти" },
        { coords: convertCoords(944, 2517), desc: "Плоти" },
        { coords: convertCoords(746, 2279), desc: "Плоти" },
        // Росстань
        { coords: convertCoords(715, 3341), desc: "Плоти" },
        { coords: convertCoords(1181, 3637), desc: "Плоти" },
        { coords: convertCoords(1144, 3638), desc: "Плоти" },
        { coords: convertCoords(827, 3196), desc: "Плоти" },
        { coords: convertCoords(1344, 3807), desc: "Плоти" },
        { coords: convertCoords(749, 3134), desc: "Плоти" },
        { coords: convertCoords(746, 3245), desc: "Плоти" },
        { coords: convertCoords(1258, 3502), desc: "Плоти" },
        { coords: convertCoords(873, 2938), desc: "Плоти" },
        { coords: convertCoords(1234, 3719), desc: "Плоти" },
        { coords: convertCoords(820, 3181), desc: "Плоти" },
        { coords: convertCoords(916, 3016), desc: "Плоти" },
        { coords: convertCoords(730, 3363), desc: "Плоти" },
        { coords: convertCoords(1297, 3660), desc: "Плоти" },
        { coords: convertCoords(1277, 3846), desc: "Плоти" },
        { coords: convertCoords(997, 3047), desc: "Плоти" },
        { coords: convertCoords(715, 3341), desc: "Плоти" },
        { coords: convertCoords(538, 3411), desc: "Плоти" },
        { coords: convertCoords(649, 3473), desc: "Плоти" },
        { coords: convertCoords(363, 3264), desc: "Плоти" },
        { coords: convertCoords(452, 3070), desc: "Плоти" },
        { coords: convertCoords(1040, 3764), desc: "Плоти" },
        { coords: convertCoords(793, 3584), desc: "Плоти" },
        { coords: convertCoords(1056, 3691), desc: "Плоти" },
        { coords: convertCoords(943, 3711), desc: "Плоти" },
        { coords: convertCoords(1177, 3797), desc: "Плоти" },
        { coords: convertCoords(989, 3744), desc: "Плоти" },
        { coords: convertCoords(874, 3784), desc: "Плоти" },
        { coords: convertCoords(963, 3772), desc: "Плоти" },
        { coords: convertCoords(791, 3830), desc: "Плоти" },
    ],

    // ==================== МУТАНТЫ: КАБАНЫ ====================
    boar: [
        // Армейские склады
        { coords: convertCoords(3500, 2791), desc: "Кабаны" },
        { coords: convertCoords(3735, 3062), desc: "Кабаны" },
        { coords: convertCoords(3591, 2886), desc: "Кабаны" },
        { coords: convertCoords(3670, 3112), desc: "Кабаны" },
        { coords: convertCoords(3570, 2598), desc: "Кабаны" },
        // Муравейник
        { coords: convertCoords(3077, 3496), desc: "Кабаны" },
        { coords: convertCoords(2832, 3218), desc: "Кабаны" },
        { coords: convertCoords(2665, 3471), desc: "Кабаны" },
        { coords: convertCoords(2993, 3156), desc: "Кабаны" },
        { coords: convertCoords(3012, 3543), desc: "Кабаны" },
        { coords: convertCoords(2843, 3451), desc: "Кабаны" },
        { coords: convertCoords(2689, 3199), desc: "Кабаны" },
        // Полесское
        { coords: convertCoords(3152, 2572), desc: "Кабаны" },
        { coords: convertCoords(3116, 2631), desc: "Кабаны" },
        { coords: convertCoords(3184, 2745), desc: "Кабаны" },
        { coords: convertCoords(3150, 2866), desc: "Кабаны" },
        { coords: convertCoords(3375, 2643), desc: "Кабаны" },
        // Поляна
        { coords: convertCoords(2951, 2550), desc: "Кабаны" },
        { coords: convertCoords(2924, 2277), desc: "Кабаны" },
        { coords: convertCoords(3053, 2290), desc: "Кабаны" },
        { coords: convertCoords(3118, 2363), desc: "Кабаны" },
        { coords: convertCoords(2888, 2538), desc: "Кабаны" },
        // Свалка
        { coords: convertCoords(2176, 2783), desc: "Кабаны" },
        { coords: convertCoords(2267, 3024), desc: "Кабаны" },
        { coords: convertCoords(2196, 2782), desc: "Кабаны" },
        { coords: convertCoords(2066, 2720), desc: "Кабаны" },
        { coords: convertCoords(1948, 2694), desc: "Кабаны" },
        { coords: convertCoords(2381, 3178), desc: "Кабаны" },
        { coords: convertCoords(1872, 3433), desc: "Кабаны" },
        { coords: convertCoords(1855, 3268), desc: "Кабаны" },
        { coords: convertCoords(1966, 3563), desc: "Кабаны" },
        // Тёмная долина
        { coords: convertCoords(2469, 4106), desc: "Кабаны" },
        { coords: convertCoords(2255, 3836), desc: "Кабаны" },
        { coords: convertCoords(2268, 3649), desc: "Кабаны" },
        // Агропром
        { coords: convertCoords(2296, 1971), desc: "Кабаны" },
        { coords: convertCoords(2391, 2474), desc: "Кабаны" },
        { coords: convertCoords(2099, 2409), desc: "Кабаны" },
        { coords: convertCoords(2384, 2014), desc: "Кабаны" },
        { coords: convertCoords(1986, 2185), desc: "Кабаны" },
        { coords: convertCoords(2090, 2194), desc: "Кабаны" },
        { coords: convertCoords(2260, 2107), desc: "Кабаны" },
        // Редколесье
        { coords: convertCoords(1881, 2413), desc: "Кабаны" },
        { coords: convertCoords(1561, 2502), desc: "Кабаны" },
        { coords: convertCoords(1662, 2245), desc: "Кабаны" },
        { coords: convertCoords(1800, 2363), desc: "Кабаны" },
        { coords: convertCoords(1726, 2161), desc: "Кабаны" },
        { coords: convertCoords(1869, 2319), desc: "Кабаны" },
        // Стройплощадка
        { coords: convertCoords(1431, 1902), desc: "Кабаны" },
        { coords: convertCoords(1522, 1943), desc: "Кабаны" },
        // Кордон
        { coords: convertCoords(1832, 3130), desc: "Кабаны" },
        { coords: convertCoords(1703, 3061), desc: "Кабаны" },
        { coords: convertCoords(1557, 3217), desc: "Кабаны" },
        { coords: convertCoords(1833, 2832), desc: "Кабаны" },
        { coords: convertCoords(1739, 3136), desc: "Кабаны" },
        { coords: convertCoords(1621, 3130), desc: "Кабаны" },
        { coords: convertCoords(1497, 3012), desc: "Кабаны" },
        { coords: convertCoords(1616, 2957), desc: "Кабаны" },
        { coords: convertCoords(1382, 3041), desc: "Кабаны" },
        // Тёмная лощина
        { coords: convertCoords(1492, 3822), desc: "Кабаны" },
        { coords: convertCoords(1918, 3748), desc: "Кабаны" },
        { coords: convertCoords(1713, 3818), desc: "Кабаны" },
        // Сортировка
        { coords: convertCoords(1855, 4459), desc: "Кабаны" },
        // Топи
        { coords: convertCoords(1064, 2570), desc: "Кабаны" },
        { coords: convertCoords(964, 2302), desc: "Кабаны" },
        { coords: convertCoords(883, 2234), desc: "Кабаны" },
        { coords: convertCoords(725, 2551), desc: "Кабаны" },
        { coords: convertCoords(954, 2352), desc: "Кабаны" },
        { coords: convertCoords(1001, 2181), desc: "Кабаны" },
        // Росстань
        { coords: convertCoords(1079, 3522), desc: "Кабаны" },
        { coords: convertCoords(623, 2922), desc: "Кабаны" },
        { coords: convertCoords(902, 3104), desc: "Кабаны" },
        { coords: convertCoords(1292, 3821), desc: "Кабаны" },
        { coords: convertCoords(807, 2986), desc: "Кабаны" },
        { coords: convertCoords(1146, 3561), desc: "Кабаны" },
        { coords: convertCoords(1022, 3148), desc: "Кабаны" },
        { coords: convertCoords(1046, 3186), desc: "Кабаны" },
        { coords: convertCoords(1337, 3787), desc: "Кабаны" },
        { coords: convertCoords(1116, 3574), desc: "Кабаны" },
        { coords: convertCoords(1223, 3618), desc: "Кабаны" },
        { coords: convertCoords(1091, 3306), desc: "Кабаны" },
        { coords: convertCoords(857, 2971), desc: "Кабаны" },
        { coords: convertCoords(699, 3252), desc: "Кабаны" },
        { coords: convertCoords(877, 2908), desc: "Кабаны" },
        { coords: convertCoords(1197, 3667), desc: "Кабаны" },
        { coords: convertCoords(784, 3034), desc: "Кабаны" },
        { coords: convertCoords(785, 3345), desc: "Кабаны" },
        { coords: convertCoords(1077, 3327), desc: "Кабаны" },
        { coords: convertCoords(934, 3061), desc: "Кабаны" },
        { coords: convertCoords(804, 2954), desc: "Кабаны" },
        { coords: convertCoords(369, 3041), desc: "Кабаны" },
        { coords: convertCoords(568, 3380), desc: "Кабаны" },
        { coords: convertCoords(493, 3053), desc: "Кабаны" },
        { coords: convertCoords(455, 3278), desc: "Кабаны" },
        { coords: convertCoords(573, 3123), desc: "Кабаны" },
        { coords: convertCoords(1044, 3682), desc: "Кабаны" },
        { coords: convertCoords(1022, 3565), desc: "Кабаны" },
        { coords: convertCoords(978, 3436), desc: "Кабаны" },
        { coords: convertCoords(950, 3674), desc: "Кабаны" },
        { coords: convertCoords(842, 3818), desc: "Кабаны" },
        { coords: convertCoords(1053, 3763), desc: "Кабаны" },
        { coords: convertCoords(949, 3630), desc: "Кабаны" },
        { coords: convertCoords(681, 3816), desc: "Кабаны" },
        { coords: convertCoords(1144, 3779), desc: "Кабаны" },
    ],

    // ==================== МУТАНТЫ: КРЫСЫ ====================
    rat: [
        // Подземелья Агропрома
        { coords: convertCoords(2240, 2312), desc: "Крысы", level: "underground" },
        // Стройплощадка
        { coords: convertCoords(1458, 1738), desc: "Крысы" },
        // Тёмная лощина
        { coords: convertCoords(1643, 3883), desc: "Крысы" },
        // Сортировка
        { coords: convertCoords(1697, 4388), desc: "Крысы" },
        // Топи
        { coords: convertCoords(695, 2168), desc: "Крысы" }
    ],

    // ==================== МУТАНТЫ: СНОРКИ ====================
    snork: [
        // Армейские склады
        { coords: convertCoords(3658, 3163), desc: "Снорки" },
        { coords: convertCoords(3590, 3183), desc: "Снорки" },
        { coords: convertCoords(3328, 2336), desc: "Снорки" },
        { coords: convertCoords(3626, 3140), desc: "Снорки" },
        { coords: convertCoords(3596, 3161), desc: "Снорки" },
        { coords: convertCoords(3572, 3081), desc: "Снорки" },
        { coords: convertCoords(3516, 3134), desc: "Снорки" },
        { coords: convertCoords(3491, 2992), desc: "Снорки" },
        { coords: convertCoords(3801, 2842), desc: "Снорки" },
        { coords: convertCoords(3789, 2840), desc: "Снорки" },
        { coords: convertCoords(3548, 2711), desc: "Снорки" },
        { coords: convertCoords(3637, 2566), desc: "Снорки" },
        { coords: convertCoords(3409, 2560), desc: "Снорки" },
        { coords: convertCoords(3569, 2525), desc: "Снорки" },
        { coords: convertCoords(3358, 2340), desc: "Снорки" },
        // Муравейник
        { coords: convertCoords(2713, 3475), desc: "Снорки" },
        { coords: convertCoords(2730, 3343), desc: "Снорки" },
        { coords: convertCoords(3004, 3379), desc: "Снорки" },
        { coords: convertCoords(2787, 3288), desc: "Снорки" },
        { coords: convertCoords(2945, 3362), desc: "Снорки" },
        { coords: convertCoords(2946, 3338), desc: "Снорки" },
        { coords: convertCoords(2947, 3491), desc: "Снорки" },
        { coords: convertCoords(2885, 3476), desc: "Снорки" },
        { coords: convertCoords(2791, 3498), desc: "Снорки" },
        { coords: convertCoords(3018, 3459), desc: "Снорки" },
        { coords: convertCoords(3017, 3488), desc: "Снорки" },
        { coords: convertCoords(2934, 3288), desc: "Снорки" },
        { coords: convertCoords(2702, 3369), desc: "Снорки" },
        { coords: convertCoords(2899, 3239), desc: "Снорки" },
        { coords: convertCoords(2746, 3450), desc: "Снорки" },
        { coords: convertCoords(2903, 3453), desc: "Снорки" },
        { coords: convertCoords(2865, 3282), desc: "Снорки" },
        { coords: convertCoords(2973, 3161), desc: "Снорки" },
        { coords: convertCoords(2751, 3403), desc: "Снорки" },
        // Полесское
        { coords: convertCoords(3352, 2504), desc: "Снорки" },
        { coords: convertCoords(3343, 2738), desc: "Снорки" },
        { coords: convertCoords(3277, 2544), desc: "Снорки" },
        { coords: convertCoords(3297, 2802), desc: "Снорки" },
        { coords: convertCoords(2992, 2744), desc: "Снорки" },
        // Поляна
        { coords: convertCoords(3000, 2266), desc: "Снорки" },
        { coords: convertCoords(3039, 2243), desc: "Снорки" },
        { coords: convertCoords(2864, 2434), desc: "Снорки" },
        // Янтарь
        { coords: convertCoords(2637, 1999), desc: "Снорки" },
        { coords: convertCoords(2700, 2135), desc: "Снорки" },
        { coords: convertCoords(2720, 2351), desc: "Снорки" },
        { coords: convertCoords(2693, 2372), desc: "Снорки" },
        { coords: convertCoords(2642, 2145), desc: "Снорки" },
        { coords: convertCoords(2639, 2055), desc: "Снорки" },
        { coords: convertCoords(2625, 2283), desc: "Снорки" },
        { coords: convertCoords(2616, 2344), desc: "Снорки" },
        { coords: convertCoords(2690, 2045), desc: "Снорки" },
        { coords: convertCoords(2670, 2058), desc: "Снорки" },
        { coords: convertCoords(2691, 2104), desc: "Снорки" },
        { coords: convertCoords(2651, 2435), desc: "Снорки" },
        { coords: convertCoords(2520, 2259), desc: "Снорки" },
        { coords: convertCoords(2697, 2329), desc: "Снорки" },
        { coords: convertCoords(2567, 1942), desc: "Снорки" },
        { coords: convertCoords(2696, 2359), desc: "Снорки" },
        { coords: convertCoords(2711, 2258), desc: "Снорки" },
        { coords: convertCoords(2690, 2341), desc: "Снорки" },
        { coords: convertCoords(2675, 2352), desc: "Снорки" },
        { coords: convertCoords(2687, 2289), desc: "Снорки" },
        { coords: convertCoords(2559, 2106), desc: "Снорки" },
        { coords: convertCoords(2637, 2378), desc: "Снорки" },
        // Дикая территория
        { coords: convertCoords(2767, 2683), desc: "Снорки" },
        { coords: convertCoords(2676, 2612), desc: "Снорки" },
        { coords: convertCoords(2716, 2792), desc: "Снорки" },
        { coords: convertCoords(2724, 2690), desc: "Снорки" },
        // Свалка
        { coords: convertCoords(2135, 3360), desc: "Снорки" },
        { coords: convertCoords(2194, 3483), desc: "Снорки" },
        { coords: convertCoords(2183, 2703), desc: "Снорки" },
        { coords: convertCoords(1962, 2811), desc: "Снорки" },
        { coords: convertCoords(2025, 2830), desc: "Снорки" },
        { coords: convertCoords(1962, 2841), desc: "Снорки" },
        { coords: convertCoords(2051, 2663), desc: "Снорки" },
        { coords: convertCoords(2031, 3490), desc: "Снорки" },
        { coords: convertCoords(2059, 3370), desc: "Снорки" },
        { coords: convertCoords(1983, 2610), desc: "Снорки" },
        { coords: convertCoords(1913, 2831), desc: "Снорки" },
        { coords: convertCoords(2047, 2595), desc: "Снорки" },
        { coords: convertCoords(2157, 3394), desc: "Снорки" },
        { coords: convertCoords(2103, 2737), desc: "Снорки" },
        { coords: convertCoords(2295, 3166), desc: "Снорки" },
        { coords: convertCoords(2078, 2787), desc: "Снорки" },
        { coords: convertCoords(2074, 3487), desc: "Снорки" },
        { coords: convertCoords(2038, 2740), desc: "Снорки" },
        { coords: convertCoords(2011, 3455), desc: "Снорки" },
        // Тёмная долина
        { coords: convertCoords(2362, 4079), desc: "Снорки" },
        { coords: convertCoords(2446, 3860), desc: "Снорки" },
        { coords: convertCoords(2424, 3872), desc: "Снорки" },
        { coords: convertCoords(2264, 3754), desc: "Снорки" },
        { coords: convertCoords(2455, 3835), desc: "Снорки" },
        { coords: convertCoords(2355, 3898), desc: "Снорки" },
        // Агропром
        { coords: convertCoords(2085, 2045), desc: "Снорки" },
        { coords: convertCoords(2350, 2144), desc: "Снорки" },
        { coords: convertCoords(2351, 1998), desc: "Снорки" },
        { coords: convertCoords(2228, 1985), desc: "Снорки" },
        { coords: convertCoords(2339, 2047), desc: "Снорки" },
        // Подземелья Агропрома
        { coords: convertCoords(2048, 2407), desc: "Снорки", level: "underground" },
        // Редколесье
        { coords: convertCoords(1878, 2490), desc: "Снорки" },
        { coords: convertCoords(1578, 2309), desc: "Снорки" },
        // Стройплощадка
        { coords: convertCoords(1519, 1768), desc: "Снорки" },
        { coords: convertCoords(1341, 1771), desc: "Снорки" },
        { coords: convertCoords(1577, 1920), desc: "Снорки" },
        { coords: convertCoords(1427, 1933), desc: "Снорки" },
        { coords: convertCoords(1500, 1736), desc: "Снорки" },
        { coords: convertCoords(1482, 1851), desc: "Снорки" },
        // Кордон
        { coords: convertCoords(1551, 2951), desc: "Снорки", level: "underground" },
        { coords: convertCoords(1646, 2981), desc: "Снорки" },
        { coords: convertCoords(1755, 3200), desc: "Снорки" },
        { coords: convertCoords(1734, 2975), desc: "Снорки" },
        { coords: convertCoords(1750, 2814), desc: "Снорки" },
        { coords: convertCoords(1762, 2903), desc: "Снорки" },
        { coords: convertCoords(1742, 3203), desc: "Снорки" },
        { coords: convertCoords(1560, 2929), desc: "Снорки", level: "underground" },
        { coords: convertCoords(1726, 3221), desc: "Снорки" },
        { coords: convertCoords(1747, 3234), desc: "Снорки" },
        { coords: convertCoords(1729, 2860), desc: "Снорки" },
        // Тёмная лощина
        { coords: convertCoords(1739, 3967), desc: "Снорки" },
        { coords: convertCoords(1670, 3880), desc: "Снорки" },
        { coords: convertCoords(1716, 3967), desc: "Снорки" },
        { coords: convertCoords(1668, 3903), desc: "Снорки" },
        { coords: convertCoords(1669, 3884), desc: "Снорки" },
        { coords: convertCoords(1550, 3819), desc: "Снорки" },
        { coords: convertCoords(1767, 3523), desc: "Снорки" },
        // Сортировка
        { coords: convertCoords(1781, 4447), desc: "Снорки" },
        { coords: convertCoords(1761, 4501), desc: "Снорки" },
        { coords: convertCoords(1766, 4515), desc: "Снорки" },
        { coords: convertCoords(1785, 4426), desc: "Снорки" },
        // Топи
        { coords: convertCoords(745, 2380), desc: "Снорки" },
        { coords: convertCoords(810, 2495), desc: "Снорки" },
        { coords: convertCoords(676, 2560), desc: "Снорки" },
        { coords: convertCoords(875, 2606), desc: "Снорки" },
        { coords: convertCoords(662, 2279), desc: "Снорки" },
        { coords: convertCoords(829, 2371), desc: "Снорки" },
    ],

    // ==================== МУТАНТЫ: ЗОМБИ ====================
    zombie: [
        // Армейские склады
        { coords: convertCoords(3524, 2440), desc: "Зомби" },
        { coords: convertCoords(3513, 2426), desc: "Зомби" },
        { coords: convertCoords(3505, 2434), desc: "Зомби" },
        { coords: convertCoords(3504, 2407), desc: "Зомби" },
        { coords: convertCoords(3493, 2420), desc: "Зомби" },
        { coords: convertCoords(3481, 2436), desc: "Зомби" },
        { coords: convertCoords(3473, 2408), desc: "Зомби" },
        { coords: convertCoords(3461, 2423), desc: "Зомби" },
        { coords: convertCoords(3459, 2436), desc: "Зомби" },
        { coords: convertCoords(3443, 2450), desc: "Зомби" },
        { coords: convertCoords(3433, 2425), desc: "Зомби" },
        { coords: convertCoords(3422, 2440), desc: "Зомби" },
        { coords: convertCoords(3409, 2421), desc: "Зомби" },
        { coords: convertCoords(3396, 2404), desc: "Зомби" },
        { coords: convertCoords(3766, 3091), desc: "Зомби" },
        // Муравейник
        { coords: convertCoords(2765, 3237), desc: "Зомби" },
        { coords: convertCoords(2838, 3527), desc: "Зомби" },
        { coords: convertCoords(2738, 3192), desc: "Зомби" },
        { coords: convertCoords(2715, 3213), desc: "Зомби" },
        { coords: convertCoords(3061, 3414), desc: "Зомби" },
        { coords: convertCoords(2769, 3372), desc: "Зомби" },
        { coords: convertCoords(3066, 3452), desc: "Зомби" },
        { coords: convertCoords(3080, 3450), desc: "Зомби" },
        { coords: convertCoords(2745, 3229), desc: "Зомби" },
        // Полесское
        { coords: convertCoords(3289, 2614), desc: "Зомби" },
        // Поляна
        { coords: convertCoords(3102, 2445), desc: "Зомби" },
        // Янтарь
        { coords: convertCoords(2702, 2224), desc: "Зомби" },
        { coords: convertCoords(2758, 2292), desc: "Зомби" },
        // Свалка
        { coords: convertCoords(2027, 3304), desc: "Зомби" },
        { coords: convertCoords(2029, 3406), desc: "Зомби" },
        { coords: convertCoords(2099, 3424), desc: "Зомби" },
        { coords: convertCoords(2031, 3509), desc: "Зомби" },
        { coords: convertCoords(2140, 3416), desc: "Зомби" },
        { coords: convertCoords(2132, 3506), desc: "Зомби" },
        { coords: convertCoords(2112, 3405), desc: "Зомби" },
        { coords: convertCoords(2123, 2879), desc: "Зомби" },
        { coords: convertCoords(2058, 3278), desc: "Зомби" },
        { coords: convertCoords(2042, 3449), desc: "Зомби" },
        { coords: convertCoords(1941, 2812), desc: "Зомби" },
        { coords: convertCoords(2092, 3500), desc: "Зомби" },
        { coords: convertCoords(2144, 2687), desc: "Зомби" },
        { coords: convertCoords(1950, 2777), desc: "Зомби" },
        { coords: convertCoords(2127, 3438), desc: "Зомби" },
        { coords: convertCoords(1966, 2786), desc: "Зомби" },
        { coords: convertCoords(2046, 3391), desc: "Зомби" },
        { coords: convertCoords(2037, 3340), desc: "Зомби" },
        { coords: convertCoords(2078, 3387), desc: "Зомби" },
        { coords: convertCoords(2087, 3461), desc: "Зомби" },
        { coords: convertCoords(2135, 3468), desc: "Зомби" },
        { coords: convertCoords(1925, 3480), desc: "Зомби" },
        { coords: convertCoords(1955, 3454), desc: "Зомби" },
        { coords: convertCoords(1942, 3466), desc: "Зомби" },
        // Тёмная долина
        { coords: convertCoords(2273, 4067), desc: "Зомби" },
        { coords: convertCoords(2236, 4052), desc: "Зомби" },
        { coords: convertCoords(2243, 4062), desc: "Зомби" },
        { coords: convertCoords(2494, 3820), desc: "Зомби" },
        // Агропром
        { coords: convertCoords(2186, 2016), desc: "Зомби" },
        // Подземелья Агропрома
        { coords: convertCoords(2132, 2408), desc: "Зомби", level: "underground" },
        { coords: convertCoords(2195, 2320), desc: "Зомби", level: "underground" },
        { coords: convertCoords(2133, 2370), desc: "Зомби", level: "underground" },
        // Редколесье
        { coords: convertCoords(1884, 2375), desc: "Зомби" },
        // Стройплощадка
        { coords: convertCoords(1480, 1708), desc: "Зомби" },
        { coords: convertCoords(1529, 1805), desc: "Зомби" },
        // Кордон
        { coords: convertCoords(1561, 2951), desc: "Зомби", level: "underground" },
        { coords: convertCoords(1808, 2770), desc: "Зомби" },
        { coords: convertCoords(1544, 2939), desc: "Зомби", level: "underground" },
        { coords: convertCoords(1752, 2751), desc: "Зомби" },
        // Тёмная лощина
        { coords: convertCoords(1611, 3885), desc: "Зомби" },
        { coords: convertCoords(1634, 3928), desc: "Зомби" },
        // Сортировка
        { coords: convertCoords(1694, 4365), desc: "Зомби" },
        { coords: convertCoords(1662, 4371), desc: "Зомби" },
        // Топи
        { coords: convertCoords(610, 2416), desc: "Зомби" },
        { coords: convertCoords(617, 2456), desc: "Зомби" },
        { coords: convertCoords(971, 2685), desc: "Зомби" },
    ],

    // ==================== МУТАНТЫ: КРОВОСОСЫ ====================
    bloodsucker: [
        // Армейские склады
        { coords: convertCoords(3690, 2913), desc: "Кровосос" },
        { coords: convertCoords(3679, 2708), desc: "Кровосос" },
        { coords: convertCoords(3674, 2724), desc: "Кровосос" },
        { coords: convertCoords(3669, 2733), desc: "Кровосос" },
        { coords: convertCoords(3669, 2980), desc: "Кровосос" },
        { coords: convertCoords(3659, 2689), desc: "Кровосос" },
        { coords: convertCoords(3646, 2708), desc: "Кровосос" },
        { coords: convertCoords(3644, 2919), desc: "Кровосос" },
        { coords: convertCoords(3641, 2931), desc: "Кровосос" },
        { coords: convertCoords(3639, 2954), desc: "Кровосос" },
        { coords: convertCoords(3531, 2531), desc: "Кровосос" },
        { coords: convertCoords(3529, 3149), desc: "Кровосос" },
        { coords: convertCoords(3785, 2739), desc: "Кровосос" },
        { coords: convertCoords(3624, 2680), desc: "Кровосос" },
        // Муравейник
        { coords: convertCoords(2711, 3544), desc: "Кровосос" },
        { coords: convertCoords(2698, 3560), desc: "Кровосос" },
        { coords: convertCoords(3053, 3363), desc: "Кровосос" },
        { coords: convertCoords(2891, 3506), desc: "Кровосос" },
        { coords: convertCoords(2725, 3538), desc: "Кровосос" },
        { coords: convertCoords(2718, 3562), desc: "Кровосос" },
        { coords: convertCoords(2730, 3563), desc: "Кровосос" },
        { coords: convertCoords(2833, 3539), desc: "Кровосос" },
        { coords: convertCoords(2944, 3187), desc: "Кровосос" },
        { coords: convertCoords(2966, 3225), desc: "Кровосос" },
        // Полесское
        { coords: convertCoords(3269, 2784), desc: "Кровосос" },
        { coords: convertCoords(3081, 2744), desc: "Кровосос" },
        { coords: convertCoords(3300, 2772), desc: "Кровосос" },
        // Поляна
        { coords: convertCoords(3039, 2388), desc: "Кровосос" },
        { coords: convertCoords(2946, 2514), desc: "Кровосос" },
        { coords: convertCoords(3095, 2393), desc: "Кровосос" },
        { coords: convertCoords(3080, 2370), desc: "Кровосос" },
        { coords: convertCoords(2787, 2339), desc: "Кровосос" },
        // Янтарь
        { coords: convertCoords(2719, 2112), desc: "Кровосос" },
        { coords: convertCoords(2554, 2033), desc: "Кровосос" },
        { coords: convertCoords(2652, 2044), desc: "Кровосос" },
        { coords: convertCoords(2735, 2100), desc: "Кровосос" },
        { coords: convertCoords(2702, 2317), desc: "Кровосос" },
        { coords: convertCoords(2639, 2377), desc: "Кровосос" },
        // Дикая территория
        { coords: convertCoords(2740, 2767), desc: "Кровосос" },
        { coords: convertCoords(2754, 2860), desc: "Кровосос" },
        { coords: convertCoords(2774, 2842), desc: "Кровосос" },
        // Бар
        { coords: convertCoords(2504, 3194), desc: "Кровосос" },
        // Свалка
        { coords: convertCoords(1899, 2788), desc: "Кровосос" },
        { coords: convertCoords(2161, 2763), desc: "Кровосос" },
        { coords: convertCoords(2243, 2866), desc: "Кровосос" },
        { coords: convertCoords(2159, 2744), desc: "Кровосос" },
        { coords: convertCoords(1950, 2802), desc: "Кровосос" },
        { coords: convertCoords(2291, 2907), desc: "Кровосос" },
        { coords: convertCoords(2141, 2769), desc: "Кровосос" },
        { coords: convertCoords(2109, 3477), desc: "Кровосос" },
        { coords: convertCoords(1915, 3399), desc: "Кровосос" },
        { coords: convertCoords(1892, 3578), desc: "Кровосос" },
        { coords: convertCoords(1990, 3464), desc: "Кровосос" },
        { coords: convertCoords(1963, 3540), desc: "Кровосос" },
        // Тёмная долина
        { coords: convertCoords(2356, 3860), desc: "Кровосос" },
        { coords: convertCoords(2237, 4049), desc: "Кровосос" },
        { coords: convertCoords(2227, 4046), desc: "Кровосос" },
        // Агропром
        { coords: convertCoords(2217, 2034), desc: "Кровосос" },
        { coords: convertCoords(2206, 2450), desc: "Кровосос" },
        { coords: convertCoords(2200, 2246), desc: "Кровосос" },
        // Подземелья Агропрома
        { coords: convertCoords(2107, 2393), desc: "Кровосос", level: "underground" },
        // Редколесье
        { coords: convertCoords(1866, 2373), desc: "Кровосос" },
        { coords: convertCoords(1592, 2616), desc: "Кровосос" },
        // Стройплощадка
        { coords: convertCoords(1444, 1834), desc: "Кровосос" },
        // Кордон
        { coords: convertCoords(1837, 2918), desc: "Кровосос" },
        // Тёмная лощина
        { coords: convertCoords(1851, 3693), desc: "Кровосос" },
        { coords: convertCoords(1421, 4020), desc: "Кровосос" },
        // Сортировка
        { coords: convertCoords(1742, 4385), desc: "Кровосос" },
        { coords: convertCoords(1694, 4451), desc: "Кровосос" },
        // Топи
        { coords: convertCoords(952, 2686), desc: "Кровосос" },
        { coords: convertCoords(604, 2397), desc: "Кровосос" },
        { coords: convertCoords(680, 2168), desc: "Кровосос" },
    ],

    // ==================== МУТАНТЫ: МАТЁРЫЕ КРОВОСОСЫ ====================
    bloodsucker_strong: [
        // Армейские склады
        { coords: convertCoords(3640, 2737), desc: "Матёрый кровосос" },
        { coords: convertCoords(3788, 2741), desc: "Матёрый кровосос" },
        { coords: convertCoords(3727, 2633), desc: "Матёрый кровосос" },
        { coords: convertCoords(3631, 2717), desc: "Матёрый кровосос" },
        // Муравейник
        { coords: convertCoords(2853, 3410), desc: "Матёрый кровосос" },
        { coords: convertCoords(2691, 3550), desc: "Матёрый кровосос" },
        { coords: convertCoords(2750, 3419), desc: "Матёрый кровосос" },
        // Полесское
        { coords: convertCoords(3358, 2801), desc: "Матёрый кровосос" },
        // Поляна
        { coords: convertCoords(3024, 2401), desc: "Матёрый кровосос" },
        { coords: convertCoords(3076, 2407), desc: "Матёрый кровосос" },
        // Янтарь
        { coords: convertCoords(2731, 2293), desc: "Матёрый кровосос" },
        { coords: convertCoords(2715, 2090), desc: "Матёрый кровосос" },
        // Дикая территория
        { coords: convertCoords(2709, 2610), desc: "Матёрый кровосос" },
        { coords: convertCoords(2759, 2620), desc: "Матёрый кровосос" },
        // Тёмная долина
        { coords: convertCoords(2370, 3861), desc: "Матёрый кровосос" },
        { coords: convertCoords(2433, 3835), desc: "Матёрый кровосос" },
        { coords: convertCoords(2267, 4083), desc: "Матёрый кровосос" },
        // Агропром
        { coords: convertCoords(2239, 2005), desc: "Матёрый кровосос" },
        { coords: convertCoords(2274, 2239), desc: "Матёрый кровосос" },
        // Подземелья Агропрома
        { coords: convertCoords(2221, 2414), desc: "Матёрый кровосос", level: "underground" },
        { coords: convertCoords(2217, 2314), desc: "Матёрый кровосос", level: "underground" },
        // Редколесье
        { coords: convertCoords(1798, 2363), desc: "Матёрый кровосос" },
        { coords: convertCoords(1772, 2510), desc: "Матёрый кровосос" },
        // Стройплощадка
        { coords: convertCoords(1520, 1801), desc: "Матёрый кровосос" },
    ],

    // ==================== МУТАНТЫ: ХИМЕРЫ ====================
    chimera: [
        // Армейские склады
        { coords: convertCoords(3343, 2326), desc: "Химера" },
        { coords: convertCoords(3763, 2969), desc: "Химера" },
        { coords: convertCoords(3730, 2690), desc: "Химера" },
        { coords: convertCoords(3770, 3161), desc: "Химера" },
        // Муравейник
        { coords: convertCoords(2712, 3247), desc: "Химера" },
        { coords: convertCoords(2925, 3547), desc: "Химера" },
        // Полесское
        { coords: convertCoords(3294, 2702), desc: "Химера" },
        // Поляна
        { coords: convertCoords(2831, 2384), desc: "Химера" },
        // Янтарь
        { coords: convertCoords(2546, 2206), desc: "Химера" },
        // Стройплощадка
        { coords: convertCoords(1438, 1671), desc: "Химера" },
        { coords: convertCoords(1400, 1819), desc: "Химера" },
        // Сортировка
        { coords: convertCoords(1647, 4385), desc: "Химера" },
    ],

    // ==================== МУТАНТЫ: КОНТРОЛЁР ====================
    controller: [
        // Армейские склады
        { coords: convertCoords(3698, 2926), desc: "Контролёр" },
        { coords: convertCoords(3476, 2413), desc: "Контролёр" },
        { coords: convertCoords(3762, 3088), desc: "Контролёр" },
        { coords: convertCoords(3676, 2705), desc: "Контролёр" },
        // Муравейник
        { coords: convertCoords(2771, 3372), desc: "Контролёр" },
        { coords: convertCoords(2847, 3523), desc: "Контролёр" },
        { coords: convertCoords(3063, 3438), desc: "Контролёр" },
        { coords: convertCoords(2747, 3234), desc: "Контролёр" },
        // Сортировка
        { coords: convertCoords(1787, 4511), desc: "Контролёр" },
        { coords: convertCoords(1789, 4518), desc: "Контролёр" },
        { coords: convertCoords(1798, 4518), desc: "Контролёр" },
        { coords: convertCoords(1799, 4507), desc: "Контролёр" },
    ],

    // ==================== НПС: ЗОМБИРОВАННЫЕ ====================
    zombified: [
        // Муравейник
        { coords: convertCoords(2832, 3422), desc: "Зомбированный" },
        { coords: convertCoords(2841, 3418), desc: "Зомбированный" },
        { coords: convertCoords(2842, 3544), desc: "Зомбированный" },
        { coords: convertCoords(2832, 3419), desc: "Зомбированный" },
        { coords: convertCoords(2832, 3542), desc: "Зомбированный" },
        { coords: convertCoords(2834, 3413), desc: "Зомбированный" },
        { coords: convertCoords(2836, 3421), desc: "Зомбированный" },
        { coords: convertCoords(2833, 3537), desc: "Зомбированный" },
        { coords: convertCoords(2844, 3413), desc: "Зомбированный" },
        { coords: convertCoords(2852, 3527), desc: "Зомбированный" },
        { coords: convertCoords(2828, 3543), desc: "Зомбированный" },
        { coords: convertCoords(2842, 3532), desc: "Зомбированный" },
        { coords: convertCoords(2836, 3417), desc: "Зомбированный" },
        { coords: convertCoords(2856, 3529), desc: "Зомбированный" },
        { coords: convertCoords(3052, 3435), desc: "Зомбированный" },
        { coords: convertCoords(2839, 3523), desc: "Зомбированный" },
        { coords: convertCoords(2837, 3416), desc: "Зомбированный" },
        { coords: convertCoords(2843, 3404), desc: "Зомбированный" },
        { coords: convertCoords(2827, 3520), desc: "Зомбированный" },
        { coords: convertCoords(2846, 3417), desc: "Зомбированный" },
        { coords: convertCoords(2856, 3528), desc: "Зомбированный" },
        { coords: convertCoords(2844, 3526), desc: "Зомбированный" },
        { coords: convertCoords(2841, 3404), desc: "Зомбированный" },
        { coords: convertCoords(2854, 3524), desc: "Зомбированный" },
        { coords: convertCoords(2856, 3530), desc: "Зомбированный" },
        { coords: convertCoords(3057, 3428), desc: "Зомбированный" },
        { coords: convertCoords(3057, 3444), desc: "Зомбированный" },
        { coords: convertCoords(2835, 3516), desc: "Зомбированный" },
        // Поляна
        { coords: convertCoords(2873, 2303), desc: "Зомбированный" },
        { coords: convertCoords(2860, 2296), desc: "Зомбированный" },
        { coords: convertCoords(2858, 2302), desc: "Зомбированный" },
        { coords: convertCoords(2853, 2302), desc: "Зомбированный" },
        { coords: convertCoords(2855, 2304), desc: "Зомбированный" },
        { coords: convertCoords(2865, 2303), desc: "Зомбированный" },
        { coords: convertCoords(2865, 2300), desc: "Зомбированный" },
        { coords: convertCoords(2856, 2304), desc: "Зомбированный" },
        { coords: convertCoords(2854, 2302), desc: "Зомбированный" },
        // Янтарь
        { coords: convertCoords(2699, 2307), desc: "Зомбированный" },
        { coords: convertCoords(2700, 2241), desc: "Зомбированный" },
        { coords: convertCoords(2623, 2289), desc: "Зомбированный" },
        { coords: convertCoords(2702, 2325), desc: "Зомбированный" },
        { coords: convertCoords(2728, 2362), desc: "Зомбированный" },
        { coords: convertCoords(2726, 2208), desc: "Зомбированный" },
        { coords: convertCoords(2719, 2210), desc: "Зомбированный" },
        { coords: convertCoords(2695, 2203), desc: "Зомбированный" },
        { coords: convertCoords(2703, 2211), desc: "Зомбированный" },
        { coords: convertCoords(2700, 2211), desc: "Зомбированный" },
        { coords: convertCoords(2695, 2205), desc: "Зомбированный" },
        { coords: convertCoords(2727, 2356), desc: "Зомбированный" },
        { coords: convertCoords(2673, 2350), desc: "Зомбированный" },
        { coords: convertCoords(2698, 2203), desc: "Зомбированный" },
        { coords: convertCoords(2695, 2285), desc: "Зомбированный" },
        { coords: convertCoords(2557, 2106), desc: "Зомбированный" },
        { coords: convertCoords(2613, 2240), desc: "Зомбированный" },
        { coords: convertCoords(2726, 2350), desc: "Зомбированный" },
        { coords: convertCoords(2693, 2333), desc: "Зомбированный" },
        { coords: convertCoords(2623, 2294), desc: "Зомбированный" },
        { coords: convertCoords(2712, 2342), desc: "Зомбированный" },
        { coords: convertCoords(2608, 2248), desc: "Зомбированный" },
        { coords: convertCoords(2715, 2375), desc: "Зомбированный" },
        { coords: convertCoords(2703, 2334), desc: "Зомбированный" },
        { coords: convertCoords(2695, 2031), desc: "Зомбированный" },
        { coords: convertCoords(2686, 2322), desc: "Зомбированный" },
        { coords: convertCoords(2683, 2330), desc: "Зомбированный" },
        { coords: convertCoords(2699, 2326), desc: "Зомбированный" },
        { coords: convertCoords(2714, 2251), desc: "Зомбированный" },
        { coords: convertCoords(2694, 2207), desc: "Зомбированный" },
        { coords: convertCoords(2703, 2224), desc: "Зомбированный" },
        { coords: convertCoords(2703, 2262), desc: "Зомбированный" },
        { coords: convertCoords(2706, 2350), desc: "Зомбированный" },
        { coords: convertCoords(2569, 2117), desc: "Зомбированный" },
        { coords: convertCoords(2570, 2116), desc: "Зомбированный" },
        { coords: convertCoords(2721, 2204), desc: "Зомбированный" },
        { coords: convertCoords(2711, 2342), desc: "Зомбированный" },
        { coords: convertCoords(2622, 2291), desc: "Зомбированный" },
        { coords: convertCoords(2692, 2333), desc: "Зомбированный" },
        { coords: convertCoords(2701, 2211), desc: "Зомбированный" },
        { coords: convertCoords(2685, 2367), desc: "Зомбированный" },
        { coords: convertCoords(2686, 2368), desc: "Зомбированный" },
        { coords: convertCoords(2718, 2211), desc: "Зомбированный" },
        { coords: convertCoords(2723, 2347), desc: "Зомбированный" },
        { coords: convertCoords(2708, 2253), desc: "Зомбированный" },
        { coords: convertCoords(2710, 2343), desc: "Зомбированный" },
        { coords: convertCoords(2688, 2329), desc: "Зомбированный" },
        { coords: convertCoords(2612, 2251), desc: "Зомбированный" },
        { coords: convertCoords(2695, 2222), desc: "Зомбированный" },
        { coords: convertCoords(2707, 2318), desc: "Зомбированный" },
        { coords: convertCoords(2650, 2095), desc: "Зомбированный" },
        { coords: convertCoords(2713, 2376), desc: "Зомбированный" },
        { coords: convertCoords(2701, 2237), desc: "Зомбированный" },
        { coords: convertCoords(2696, 2308), desc: "Зомбированный" },
        { coords: convertCoords(2621, 2294), desc: "Зомбированный" },
        { coords: convertCoords(2686, 2366), desc: "Зомбированный" },
        { coords: convertCoords(2687, 2333), desc: "Зомбированный" },
        { coords: convertCoords(2698, 2324), desc: "Зомбированный" },
        { coords: convertCoords(2721, 2207), desc: "Зомбированный" },
        // Свалка
        { coords: convertCoords(2340, 2924), desc: "Зомбированный" },
        { coords: convertCoords(2346, 2925), desc: "Зомбированный" },
        { coords: convertCoords(2336, 2917), desc: "Зомбированный" },
        // Тёмная долина
        { coords: convertCoords(2508, 3830), desc: "Зомбированный" },
        { coords: convertCoords(2454, 3828), desc: "Зомбированный" },
        { coords: convertCoords(2509, 3830), desc: "Зомбированный" },
        { coords: convertCoords(2494, 3836), desc: "Зомбированный" },
        { coords: convertCoords(2321, 3846), desc: "Зомбированный" },
        { coords: convertCoords(2342, 3853), desc: "Зомбированный" },
        { coords: convertCoords(2495, 3826), desc: "Зомбированный" },
        { coords: convertCoords(2512, 3834), desc: "Зомбированный" },
        { coords: convertCoords(2516, 3841), desc: "Зомбированный" },
        { coords: convertCoords(2496, 3841), desc: "Зомбированный" },
        { coords: convertCoords(2467, 3827), desc: "Зомбированный" },
        { coords: convertCoords(2466, 3829), desc: "Зомбированный" },
        // Агропром
        { coords: convertCoords(2029, 2080), desc: "Зомбированный" },
        { coords: convertCoords(2029, 2081), desc: "Зомбированный" },
        { coords: convertCoords(2032, 2081), desc: "Зомбированный" },
        // Подземелья Агропрома
        { coords: convertCoords(2219, 2333), desc: "Зомбированный", level: "underground" },
        { coords: convertCoords(2217, 2332), desc: "Зомбированный", level: "underground" },
        // Кордон
        { coords: convertCoords(1563, 2986), desc: "Зомбированный", level: "underground" },
        { coords: convertCoords(1564, 2965), desc: "Зомбированный", level: "underground" },
        { coords: convertCoords(1547, 2931), desc: "Зомбированный", level: "underground" },
        { coords: convertCoords(1560, 3003), desc: "Зомбированный", level: "underground" },
        { coords: convertCoords(1563, 2958), desc: "Зомбированный", level: "underground" },
        // Сортировка
        { coords: convertCoords(1779, 4501), desc: "Зомбированный" },
        { coords: convertCoords(1794, 4496), desc: "Зомбированный" },
        { coords: convertCoords(1800, 4493), desc: "Зомбированный" },
        { coords: convertCoords(1800, 4495), desc: "Зомбированный" },
        { coords: convertCoords(1791, 4496), desc: "Зомбированный" },
        { coords: convertCoords(1789, 4491), desc: "Зомбированный" },
        { coords: convertCoords(1784, 4496), desc: "Зомбированный" },
        // Топи
        { coords: convertCoords(676, 2210), desc: "Зомбированный" },
        { coords: convertCoords(664, 2188), desc: "Зомбированный" },
        { coords: convertCoords(658, 2189), desc: "Зомбированный" },
        { coords: convertCoords(654, 2185), desc: "Зомбированный" },
        { coords: convertCoords(663, 2187), desc: "Зомбированный" },
        { coords: convertCoords(696, 2193), desc: "Зомбированный" },
        { coords: convertCoords(668, 2181), desc: "Зомбированный" },
        { coords: convertCoords(657, 2197), desc: "Зомбированный" },
        { coords: convertCoords(696, 2174), desc: "Зомбированный" },
        { coords: convertCoords(695, 2174), desc: "Зомбированный" },
        { coords: convertCoords(661, 2180), desc: "Зомбированный" },
        { coords: convertCoords(690, 2204), desc: "Зомбированный" },
        { coords: convertCoords(695, 2173), desc: "Зомбированный" },
        { coords: convertCoords(695, 2195), desc: "Зомбированный" },
        { coords: convertCoords(694, 2183), desc: "Зомбированный" },
        { coords: convertCoords(701, 2184), desc: "Зомбированный" },
        { coords: convertCoords(681, 2203), desc: "Зомбированный" },
        { coords: convertCoords(674, 2174), desc: "Зомбированный" },
        { coords: convertCoords(692, 2191), desc: "Зомбированный" },
        { coords: convertCoords(663, 2188), desc: "Зомбированный" },
        { coords: convertCoords(676, 2183), desc: "Зомбированный" },
    ],

    // ==================== НПС: СКОПЛЕНИЕ ЗОМБИРОВАННЫХ ====================
    zombified_cluster: [
        // Армейские склады
        {
            coords: convertCoords(3633, 2708),
            desc: "Скопление зомбированных",
            image: "images/NPC/zombified_cluster/zombified_cluster_1.jpg",
            extended: {
                image: "images/NPC/zombified_cluster/zombified_cluster_1.jpg",
                description: {
                    ru: "Скопление зомбированных в автотранспортном цехе.",
                    en: "Cluster of zombified stalkers in the vehicle workshop."
                },
                rewards: ['anomaly_filter']
            }
        },
        {
            coords: convertCoords(3648, 2733),
            desc: "Скопление зомбированных",
            image: "images/NPC/zombified_cluster/zombified_cluster_2.jpg",
            extended: {
                image: "images/NPC/zombified_cluster/zombified_cluster_2.jpg",
                description: {
                    ru: "Скопление зомбированных в административно-бытовом корпусе.",
                    en: "Cluster of zombified stalkers in the administrative building."
                },
                rewards: ['anomaly_filter']
            }
        },
        {
            coords: convertCoords(3567, 3088),
            desc: "Скопление зомбированных",
            image: "images/NPC/zombified_cluster/zombified_cluster_3.jpg",
            extended: {
                image: "images/NPC/zombified_cluster/zombified_cluster_3.jpg",
                description: {
                    ru: "Скопление зомбированных у КПП военной базы.",
                    en: "Cluster of zombified stalkers near the military base checkpoint."
                },
                rewards: ['anomaly_filter']
            }
        },
        {
            coords: convertCoords(3493, 2428),
            desc: "Скопление зомбированных",
            image: "images/NPC/zombified_cluster/zombified_cluster_4.jpg",
            extended: {
                image: "images/NPC/zombified_cluster/zombified_cluster_4.jpg",
                description: {
                    ru: "Скопление зомбированных в центре деревни.",
                    en: "Cluster of zombified stalkers in the village center."
                },
                rewards: ['anomaly_filter']
            }
        },
        {
            coords: convertCoords(3418, 2423),
            desc: "Скопление зомбированных",
            image: "images/NPC/zombified_cluster/zombified_cluster_5.jpg",
            extended: {
                image: "images/NPC/zombified_cluster/zombified_cluster_5.jpg",
                description: {
                    ru: "Скопление зомбированных в южном доме.",
                    en: "Cluster of zombified stalkers in the southern house."
                },
                rewards: ['anomaly_filter']
            }
        },
        {
            coords: convertCoords(3528, 2878),
            desc: "Скопление зомбированных",
            image: "images/NPC/zombified_cluster/zombified_cluster_6.jpg",
            extended: {
                image: "images/NPC/zombified_cluster/zombified_cluster_6.jpg",
                description: {
                    ru: "Скопление зомбированных у вагонов.",
                    en: "Cluster of zombified stalkers near the train cars."
                },
                rewards: ['anomaly_filter']
            }
        },
        {
            coords: convertCoords(3498, 3168),
            desc: "Скопление зомбированных",
            image: "images/NPC/zombified_cluster/zombified_cluster_7.jpg",
            extended: {
                image: "images/NPC/zombified_cluster/zombified_cluster_7.jpg",
                description: {
                    ru: "Скопление зомбированных у перехода на Муравейник.",
                    en: "Cluster of zombified stalkers near the passage to the Anthill."
                },
                rewards: ['anomaly_filter']
            }
        },
        {
            coords: convertCoords(3512, 2754),
            desc: "Скопление зомбированных",
            image: "images/NPC/zombified_cluster/zombified_cluster_8.jpg",
            extended: {
                image: "images/NPC/zombified_cluster/zombified_cluster_8.jpg",
                description: {
                    ru: "Скопление зомбированных в ангаре.",
                    en: "Cluster of zombified stalkers in the hangar."
                },
                rewards: ['anomaly_filter']
            }
        },
        {
            coords: convertCoords(3550, 2633),
            desc: "Скопление зомбированных",
            image: "images/NPC/zombified_cluster/zombified_cluster_9.jpg",
            extended: {
                image: "images/NPC/zombified_cluster/zombified_cluster_9.jpg",
                description: {
                    ru: "Скопление зомбированных на заправке.",
                    en: "Cluster of zombified stalkers at the gas station."
                },
                rewards: ['anomaly_filter']
            }
        }
    ],

    stalkers: [
        // Дикая территория
        { coords: convertCoords(2796, 2837), desc: "Маклак" },
    ],

    // ==================== НПС: ГРЕШНИКИ (ОРДЕН) ====================
    sinner: [
        // Полесское
        { coords: convertCoords(2988, 2785), desc: "Грешник" },
        { coords: convertCoords(2992, 2792), desc: "Грешник" },
        { coords: convertCoords(2991, 2796), desc: "Грешник" },
        { coords: convertCoords(2989, 2786), desc: "Грешник" },
        { coords: convertCoords(2989, 2794), desc: "Грешник" },
        { coords: convertCoords(2988, 2801), desc: "Грешник" },
        { coords: convertCoords(2987, 2799), desc: "Грешник" },
        { coords: convertCoords(2984, 2792), desc: "Грешник" },
        { coords: convertCoords(2985, 2763), desc: "Грешник" },
        { coords: convertCoords(2984, 2796), desc: "Грешник" },
        { coords: convertCoords(2987, 2792), desc: "Грешник" },
        { coords: convertCoords(2984, 2768), desc: "Грешник" },
        { coords: convertCoords(2983, 2763), desc: "Грешник" },
        // Тёмная долина
        { coords: convertCoords(2230, 4055), desc: "Грешник" },
        { coords: convertCoords(2284, 4102), desc: "Грешник" },
        { coords: convertCoords(2283, 4107), desc: "Грешник" },
        { coords: convertCoords(2280, 4100), desc: "Грешник" },
        { coords: convertCoords(2230, 4062), desc: "Грешник" },
        { coords: convertCoords(2226, 4063), desc: "Грешник" },
        { coords: convertCoords(2231, 4054), desc: "Грешник" },
        { coords: convertCoords(2263, 4110), desc: "Грешник" },
        { coords: convertCoords(2280, 4109), desc: "Грешник" },
        // Тёмная лощина
        { coords: convertCoords(1725, 3742), desc: "Грешник" },
        { coords: convertCoords(1727, 3742), desc: "Грешник" },
        { coords: convertCoords(1731, 3743), desc: "Грешник" },
        { coords: convertCoords(1732, 3741), desc: "Грешник" },
        { coords: convertCoords(1732, 3742), desc: "Грешник" }
    ],

    // ==================== НПС: БАНДИТЫ ====================
    bandits: [
        // Полесское
        { coords: convertCoords(3067, 2838), desc: "Мародеры" },
        { coords: convertCoords(3047, 2841), desc: "Мародеры" },
        { coords: convertCoords(3061, 2812), desc: "Мародеры" },
        { coords: convertCoords(3060, 2812), desc: "Мародеры" },
        { coords: convertCoords(3055, 2833), desc: "Мародеры" },
        { coords: convertCoords(3067, 2778), desc: "Мародеры" },
        { coords: convertCoords(3059, 2843), desc: "Мародеры" },
        { coords: convertCoords(3042, 2840), desc: "Мародеры" },
        { coords: convertCoords(3052, 2850), desc: "Мародеры" },
        { coords: convertCoords(3051, 2847), desc: "Мародеры" },
        { coords: convertCoords(3062, 2839), desc: "Мародеры" },
        { coords: convertCoords(3062, 2840), desc: "Мародеры" },
        { coords: convertCoords(3042, 2837), desc: "Мародеры" },
        { coords: convertCoords(3055, 2834), desc: "Мародеры" },
        { coords: convertCoords(3064, 2838), desc: "Варг" },
        { coords: convertCoords(3067, 2837), desc: "Шпиц" },
        // Поляна
        { coords: convertCoords(2954, 2331), desc: "Ренегат" },
        { coords: convertCoords(2917, 2429), desc: "Ренегат" },
        { coords: convertCoords(2919, 2443), desc: "Ренегат" },
        { coords: convertCoords(3030, 2325), desc: "Ренегат" },
        { coords: convertCoords(2956, 2331), desc: "Ренегат" },
        { coords: convertCoords(3028, 2327), desc: "Ренегат" },
        { coords: convertCoords(2919, 2426), desc: "Ренегат" },
        { coords: convertCoords(3027, 2324), desc: "Ренегат" },
        // Янтарь
        { coords: convertCoords(2723, 2294), desc: "Бандит" },
        { coords: convertCoords(2722, 2294), desc: "Бандит" },
        { coords: convertCoords(2723, 2295), desc: "Бандит" },
        // Дикая территория
        { coords: convertCoords(2748, 2808), desc: "Бандит" },
        { coords: convertCoords(2691, 2826), desc: "Бандит" },
        { coords: convertCoords(2640, 2623), desc: "Бандит" },
        { coords: convertCoords(2736, 2686), desc: "Бандит" },
        { coords: convertCoords(2736, 2699), desc: "Бандит" },
        { coords: convertCoords(2745, 2816), desc: "Бандит" },
        { coords: convertCoords(2785, 2840), desc: "Бандит" },
        { coords: convertCoords(2639, 2636), desc: "Бандит" },
        { coords: convertCoords(2744, 2808), desc: "Бандит" },
        { coords: convertCoords(2743, 2819), desc: "Бандит" },
        { coords: convertCoords(2731, 2694), desc: "Бандит" },
        { coords: convertCoords(2694, 2819), desc: "Бандит" },
        { coords: convertCoords(2736, 2705), desc: "Бандит" },
        { coords: convertCoords(2758, 2696), desc: "Бандит" },
        { coords: convertCoords(2695, 2819), desc: "Бандит" },
        { coords: convertCoords(2751, 2701), desc: "Бандит" },
        { coords: convertCoords(2785, 2841), desc: "Бандит" },
        { coords: convertCoords(2695, 2818), desc: "Бандит" },
        { coords: convertCoords(2750, 2821), desc: "Бандит" },
        { coords: convertCoords(2639, 2622), desc: "Бандит" },
        { coords: convertCoords(2754, 2826), desc: "Бандит" },
        { coords: convertCoords(2640, 2622), desc: "Бандит" },
        { coords: convertCoords(2746, 2707), desc: "Бандит" },
        { coords: convertCoords(2786, 2840), desc: "Бандит" },
        // Свалка
        { coords: convertCoords(2008, 2691), desc: "Бандит" },
        { coords: convertCoords(2053, 3086), desc: "Бандит" },
        { coords: convertCoords(2023, 2778), desc: "Бандит" },
        { coords: convertCoords(2229, 2940), desc: "Бандит" },
        { coords: convertCoords(2159, 3108), desc: "Бандит" },
        { coords: convertCoords(2011, 2691), desc: "Бандит" },
        { coords: convertCoords(2047, 3087), desc: "Бандит" },
        { coords: convertCoords(2223, 2934), desc: "Бандит" },
        { coords: convertCoords(2009, 2693), desc: "Бандит" },
        { coords: convertCoords(2010, 2688), desc: "Бандит" },
        { coords: convertCoords(2331, 3052), desc: "Бандит" },
        { coords: convertCoords(2007, 2691), desc: "Бандит" },
        { coords: convertCoords(2329, 3051), desc: "Бандит" },
        { coords: convertCoords(2056, 3002), desc: "Бандит" },
        { coords: convertCoords(2053, 3085), desc: "Бандит" },
        { coords: convertCoords(2042, 2798), desc: "Бандит" },
        { coords: convertCoords(2043, 2799), desc: "Бандит" },
        { coords: convertCoords(2155, 3105), desc: "Бандит" },
        { coords: convertCoords(2026, 2778), desc: "Бандит" },
        { coords: convertCoords(2015, 2718), desc: "Бандит" },
        { coords: convertCoords(2157, 3111), desc: "Бандит" },
        { coords: convertCoords(2012, 2717), desc: "Бандит" },
        { coords: convertCoords(2002, 2697), desc: "Бандит" },
        { coords: convertCoords(2333, 3052), desc: "Бандит" },
        { coords: convertCoords(2052, 2994), desc: "Бандит" },
        { coords: convertCoords(2059, 3016), desc: "Бандит" },
        { coords: convertCoords(2220, 2940), desc: "Бандит" },
        { coords: convertCoords(2330, 3054), desc: "Бандит" },
        { coords: convertCoords(2013, 2690), desc: "Бандит" },
        { coords: convertCoords(2153, 3111), desc: "Бандит" },
        { coords: convertCoords(2152, 3107), desc: "Бандит" },
        { coords: convertCoords(2225, 2939), desc: "Бандит" },
        { coords: convertCoords(2057, 3091), desc: "Бандит" },
        { coords: convertCoords(2010, 2689), desc: "Бандит" },
        { coords: convertCoords(1891, 3323), desc: "Бандит" },
        { coords: convertCoords(1891, 3321), desc: "Бандит" },
        { coords: convertCoords(1891, 3322), desc: "Бандит" },
        // Агропром
        { coords: convertCoords(2206, 1985), desc: "Бандит" },
        { coords: convertCoords(2201, 2032), desc: "Бандит" },
        { coords: convertCoords(2204, 2029), desc: "Бандит" },
        { coords: convertCoords(2207, 2021), desc: "Бандит" },
        { coords: convertCoords(2187, 2000), desc: "Бандит" },
        { coords: convertCoords(2190, 2007), desc: "Бандит" },
        { coords: convertCoords(2189, 2006), desc: "Бандит" },
        { coords: convertCoords(2213, 2017), desc: "Бандиты" },
        { coords: convertCoords(2342, 2451), desc: "Бандит" },
        { coords: convertCoords(2182, 1996), desc: "Бандит" },
        { coords: convertCoords(2199, 1983), desc: "Бандит" },
        { coords: convertCoords(2200, 1982), desc: "Окунь" },
        { coords: convertCoords(2343, 2448), desc: "Бандит" },
        { coords: convertCoords(2185, 2006), desc: "Бандит" },
        { coords: convertCoords(2199, 1982), desc: "Бандит" },
        { coords: convertCoords(2209, 2023), desc: "Бандит" },
        { coords: convertCoords(2210, 1984), desc: "Бандит" },
        { coords: convertCoords(2341, 2448), desc: "Бандит" },
        { coords: convertCoords(2187, 2004), desc: "Бандит" },
        { coords: convertCoords(2190, 2006), desc: "Бандит" },
        // Подземелья Агропрома
        { coords: convertCoords(2251, 2348), desc: "Бандит", level: "underground" },
        { coords: convertCoords(2248, 2336), desc: "Бандит", level: "underground" },
        { coords: convertCoords(2248, 2343), desc: "Бандит", level: "underground" },
        { coords: convertCoords(2244, 2349), desc: "Бандит", level: "underground" },
        { coords: convertCoords(2247, 2346), desc: "Бандит", level: "underground" },
        // Стройплощадка
        { coords: convertCoords(1555, 1848), desc: "Бандит" },
        // Кордон
        { coords: convertCoords(1814, 2883), desc: "Бандит" },
        { coords: convertCoords(1790, 2888), desc: "Бандит" },
        { coords: convertCoords(1763, 2873), desc: "Бандит" },
        { coords: convertCoords(1641, 3326), desc: "Бандит" },
        { coords: convertCoords(1599, 2873), desc: "Бандит" },
        { coords: convertCoords(1641, 3351), desc: "Бандит" },
        { coords: convertCoords(1810, 2821), desc: "Бандит" },
        { coords: convertCoords(1814, 2882), desc: "Бандит" },
        { coords: convertCoords(1906, 3075), desc: "Бандит" },
        { coords: convertCoords(1880, 3064), desc: "Бандит" },
        { coords: convertCoords(1599, 2871), desc: "Бандит" },
        { coords: convertCoords(1813, 2883), desc: "Бандит" },
        { coords: convertCoords(1894, 3072), desc: "Бандит" },
        { coords: convertCoords(1954, 3080), desc: "Бандит" },
        { coords: convertCoords(1599, 2869), desc: "Бандит" },
        { coords: convertCoords(1816, 2828), desc: "Бандит" },
        { coords: convertCoords(1764, 2874), desc: "Бандит" },
        { coords: convertCoords(1818, 2836), desc: "Бандит" },
        { coords: convertCoords(1798, 2873), desc: "Бандит" },
        { coords: convertCoords(1903, 3076), desc: "Бандит" },
        { coords: convertCoords(1601, 2872), desc: "Бандит" },
        { coords: convertCoords(1927, 3052), desc: "Бандит" },
        { coords: convertCoords(1899, 3045), desc: "Бандит" },
        { coords: convertCoords(1818, 2822), desc: "Бандит" },
        { coords: convertCoords(1907, 3075), desc: "Бандит" },
        { coords: convertCoords(1896, 3083), desc: "Бандит" },
        { coords: convertCoords(1955, 3081), desc: "Бандит" },
        { coords: convertCoords(1904, 3086), desc: "Бандит" },
        { coords: convertCoords(1898, 3085), desc: "Бандит" },
        { coords: convertCoords(1895, 3079), desc: "Бандит" },
        { coords: convertCoords(1789, 2882), desc: "Бандит" },
        { coords: convertCoords(1804, 2818), desc: "Бандит" },
        { coords: convertCoords(1895, 3067), desc: "Бандит" },
        { coords: convertCoords(1869, 3065), desc: "Бандит" },
        { coords: convertCoords(1636, 3347), desc: "Бандит" },
        { coords: convertCoords(1784, 2888), desc: "Бандит" },
        { coords: convertCoords(1812, 2858), desc: "Бандит" },
        { coords: convertCoords(1880, 3067), desc: "Бандит" },
        { coords: convertCoords(1914, 3082), desc: "Бандит" },
        { coords: convertCoords(1944, 3081), desc: "Бандит" },
        { coords: convertCoords(1789, 2868), desc: "Бандит" },
        { coords: convertCoords(1641, 3341), desc: "Бандит" },
        { coords: convertCoords(1954, 3071), desc: "Бандит" },
        { coords: convertCoords(1954, 3081), desc: "Бандит" },
        { coords: convertCoords(1811, 2851), desc: "Бандит" },
        { coords: convertCoords(1900, 3050), desc: "Бандит" },
        { coords: convertCoords(1899, 3077), desc: "Бандит" },
        { coords: convertCoords(1640, 3327), desc: "Бандит" },
        { coords: convertCoords(1635, 3346), desc: "Бандит" },
        { coords: convertCoords(1897, 3079), desc: "Бандит" },
        { coords: convertCoords(1966, 3061), desc: "Бандит" },
        { coords: convertCoords(1876, 3068), desc: "Бандит" },
        { coords: convertCoords(1896, 3080), desc: "Орех" },
        // Тёмная лощина
        { coords: convertCoords(1812, 3678), desc: "Бандит" },
        { coords: convertCoords(1445, 3884), desc: "Бандит" },
        { coords: convertCoords(1475, 4027), desc: "Бандит" },
        { coords: convertCoords(1791, 3695), desc: "Бандит" },
        { coords: convertCoords(1447, 3883), desc: "Бандит" },
        { coords: convertCoords(1799, 3697), desc: "Бандит" },
        { coords: convertCoords(1786, 3687), desc: "Бандит" },
        { coords: convertCoords(1810, 3681), desc: "Бандит" },
        { coords: convertCoords(1441, 3882), desc: "Бандит" },
        { coords: convertCoords(1474, 4026), desc: "Бандит" },
        { coords: convertCoords(1805, 3681), desc: "Бандит" },
        { coords: convertCoords(1438, 4048), desc: "Бандит" },
        { coords: convertCoords(1494, 4079), desc: "Бандит" },
        { coords: convertCoords(1463, 4047), desc: "Бандит" },
        { coords: convertCoords(1492, 4078), desc: "Бандит" },
        { coords: convertCoords(1806, 3676), desc: "Бандит" },
        { coords: convertCoords(1474, 4028), desc: "Бандит" },
        { coords: convertCoords(1413, 3773), desc: "Бандит" },
        { coords: convertCoords(1799, 3688), desc: "Бандит" },
        { coords: convertCoords(1462, 4035), desc: "Бандит" },
        { coords: convertCoords(1792, 3691), desc: "Бандит" },
        { coords: convertCoords(1447, 3880), desc: "Бандит" },
        { coords: convertCoords(1461, 4054), desc: "Бандит" },
        { coords: convertCoords(1445, 4047), desc: "Бандит" },
        { coords: convertCoords(1443, 4040), desc: "Бандит" },
        { coords: convertCoords(1478, 4080), desc: "Бандит" },
        { coords: convertCoords(1477, 4024), desc: "Бандит" },
        { coords: convertCoords(1478, 4080), desc: "Бандит" },
        { coords: convertCoords(1474, 4025), desc: "Бандит" },
        { coords: convertCoords(1792, 3699), desc: "Бандит" },
        { coords: convertCoords(1476, 4022), desc: "Бандит" },
        { coords: convertCoords(1812, 3680), desc: "Бандит" },
        { coords: convertCoords(1462, 4036), desc: "Бандит" },
        // Топи
        { coords: convertCoords(784, 2129), desc: "Бандит" },
        { coords: convertCoords(637, 2447), desc: "Бандит" },
        { coords: convertCoords(960, 2693), desc: "Бандит" },
        { coords: convertCoords(783, 2120), desc: "Бандит" },
        { coords: convertCoords(644, 2437), desc: "Бандит" },
        { coords: convertCoords(633, 2446), desc: "Бандит" },
        { coords: convertCoords(644, 2428), desc: "Бандит" },
        { coords: convertCoords(785, 2132), desc: "Бандит" },
        { coords: convertCoords(970, 2695), desc: "Бандит" },
        { coords: convertCoords(643, 2426), desc: "Бандит" },
        { coords: convertCoords(642, 2428), desc: "Бандит" },
        { coords: convertCoords(788, 2127), desc: "Бандит" },
        { coords: convertCoords(782, 2118), desc: "Бандит" },
        { coords: convertCoords(659, 2427), desc: "Бандит" },
        { coords: convertCoords(787, 2114), desc: "Бандит" },
        { coords: convertCoords(962, 2693), desc: "Бандит" },
        { coords: convertCoords(640, 2419), desc: "Бандит" },
        { coords: convertCoords(642, 2444), desc: "Бандит" },
        { coords: convertCoords(784, 2123), desc: "Бандит" },
        { coords: convertCoords(642, 2448), desc: "Бандит" },
        { coords: convertCoords(784, 2119), desc: "Бандит" },
        { coords: convertCoords(641, 2419), desc: "Бандит" },
        { coords: convertCoords(784, 2122), desc: "Бандит" },
        { coords: convertCoords(968, 2693), desc: "Бандит" },
        { coords: convertCoords(786, 2123), desc: "Бандит" },
        // Росстань
        { coords: convertCoords(927, 3552), desc: "Мародёр" },
        { coords: convertCoords(932, 3556), desc: "Мародёр" },
        { coords: convertCoords(921, 3549), desc: "Мародёр" },
        { coords: convertCoords(944, 3550), desc: "Мародёр" }
    ],

    // ==================== НПС: МОНОЛИТ / АПОСТАТЫ ====================
    monolith: [
        // Поляна
        { coords: convertCoords(2933, 2541), desc: "Апостат" },
        { coords: convertCoords(2856, 2389), desc: "Апостат" },
        { coords: convertCoords(2841, 2403), desc: "Апостат" },
        { coords: convertCoords(2857, 2402), desc: "Апостат" },
        { coords: convertCoords(2852, 2401), desc: "Апостат" },
        { coords: convertCoords(2847, 2411), desc: "Апостат" },
        { coords: convertCoords(2845, 2352), desc: "Апостат" },
        { coords: convertCoords(2942, 2554), desc: "Апостат" },
        { coords: convertCoords(2852, 2397), desc: "Апостат" },
        { coords: convertCoords(2860, 2402), desc: "Апостат" },
        { coords: convertCoords(2860, 2397), desc: "Апостат" },
        { coords: convertCoords(2860, 2395), desc: "Апостат" },
        { coords: convertCoords(2942, 2551), desc: "Апостат" },
        { coords: convertCoords(2942, 2543), desc: "Апостат" },
        { coords: convertCoords(2849, 2415), desc: "Апостат" },
        { coords: convertCoords(2844, 2352), desc: "Апостат" },
        { coords: convertCoords(2852, 2397), desc: "Апостат" },
        { coords: convertCoords(2847, 2385), desc: "Апостат" },
        { coords: convertCoords(2860, 2395), desc: "Апостат" },
        { coords: convertCoords(2846, 2402), desc: "Апостат" },
        { coords: convertCoords(2849, 2416), desc: "Апостат" },
        { coords: convertCoords(2860, 2397), desc: "Апостат" },
        { coords: convertCoords(2932, 2541), desc: "Апостат" },
        { coords: convertCoords(2932, 2540), desc: "Апостат" },
        { coords: convertCoords(2843, 2353), desc: "Апостат" },
        { coords: convertCoords(2860, 2397), desc: "Апостат" },
        { coords: convertCoords(2852, 2391), desc: "Апостат" },
        { coords: convertCoords(2860, 2393), desc: "Апостат" },
        { coords: convertCoords(2924, 2553), desc: "Апостат" },
        { coords: convertCoords(2860, 2402), desc: "Апостат" },
        // Архонт
        { coords: convertCoords(2856, 2393), desc: "Архонт" },
    ],

    // ==================== НПС: НАЁМНИКИ / ЧВК «АСГАРД» ====================
    mercenary: [
        // Поляна
        { coords: convertCoords(3261, 2458), desc: "ЧВК «Асгард»" },
        { coords: convertCoords(3238, 2456), desc: "ЧВК «Асгард»" },
        { coords: convertCoords(3263, 2459), desc: "ЧВК «Асгард»" },
        { coords: convertCoords(3275, 2457), desc: "ЧВК «Асгард»" },
        { coords: convertCoords(3264, 2456), desc: "ЧВК «Асгард»" },
        { coords: convertCoords(3269, 2457), desc: "ЧВК «Асгард»" },
        { coords: convertCoords(3272, 2463), desc: "ЧВК «Асгард»" },
        { coords: convertCoords(3270, 2460), desc: "ЧВК «Асгард»" },
        { coords: convertCoords(3150, 2449), desc: "ЧВК «Асгард»" },
        // Акбар
        { coords: convertCoords(3269, 2453), desc: "Акбар" },
        // Дикая территория
        { coords: convertCoords(2720, 2817), desc: "Наёмник" },
        { coords: convertCoords(2834, 2789), desc: "Наёмник" },
        { coords: convertCoords(2836, 2790), desc: "Наёмник" },
        { coords: convertCoords(2719, 2818), desc: "Наёмник" },
        { coords: convertCoords(2835, 2790), desc: "Наёмник" },
        // Редколесье
        { coords: convertCoords(1472, 2312), desc: "Наёмник" },
        { coords: convertCoords(1479, 2312), desc: "Наёмник" },
        { coords: convertCoords(1468, 2297), desc: "Наёмник" },
        { coords: convertCoords(1470, 2303), desc: "Наёмник" },
        { coords: convertCoords(1490, 2295), desc: "Наёмник" },
        { coords: convertCoords(1480, 2297), desc: "Наёмник" },
        { coords: convertCoords(1482, 2293), desc: "Наёмник" },
        { coords: convertCoords(1469, 2312), desc: "Наёмник" },
        { coords: convertCoords(1480, 2300), desc: "Наёмник" },
        { coords: convertCoords(1487, 2293), desc: "Наёмник" }
    ],

    // ==================== НПС: СТОЯНКА БАНДИТОВ ====================
    bandit_camp: [
        // Дикая территория
        {
            coords: convertCoords(2627, 2643),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/wt_camp_1.jpg",
            extended: {
                image: "images/NPC/bandit_camp/wt_camp_1.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['anomaly_detector']
            }
        },
        {
            coords: convertCoords(2830, 2773),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/wt_camp_2.jpg",
            extended: {
                image: "images/NPC/bandit_camp/wt_camp_2.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['anomaly_detector']
            }
        },
        {
            coords: convertCoords(2637, 2628),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/wt_camp_3.jpg",
            extended: {
                image: "images/NPC/bandit_camp/wt_camp_3.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['anomaly_detector']
            }
        },
        {
            coords: convertCoords(2692, 2808),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/wt_camp_4.jpg",
            extended: {
                image: "images/NPC/bandit_camp/wt_camp_4.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['anomaly_detector']
            }
        },
        {
            coords: convertCoords(2815, 2858),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/wt_camp_5.jpg",
            extended: {
                image: "images/NPC/bandit_camp/wt_camp_5.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['anomaly_detector']
            }
        },
        {
            coords: convertCoords(2787, 2620),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/wt_camp_6.jpg",
            extended: {
                image: "images/NPC/bandit_camp/wt_camp_6.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['anomaly_detector']
            }
        },
        {
            coords: convertCoords(2720, 2748),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/wt_camp_7.jpg",
            extended: {
                image: "images/NPC/bandit_camp/wt_camp_7.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['anomaly_detector']
            }
        },
        {
            coords: convertCoords(2795, 2708),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/wt_camp_8.jpg",
            extended: {
                image: "images/NPC/bandit_camp/wt_camp_8.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['anomaly_detector']
            }
        },
        // Тёмная долина
        {
            coords: convertCoords(2243, 4055),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/td_camp_1.jpg",
            extended: {
                image: "images/NPC/bandit_camp/td_camp_1.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['hazy_pollen']
            }
        },
        {
            coords: convertCoords(2384, 3881),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/td_camp_2.jpg",
            extended: {
                image: "images/NPC/bandit_camp/td_camp_2.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['hazy_pollen']
            }
        },
        {
            coords: convertCoords(2149, 3933),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/td_camp_3.jpg",
            extended: {
                image: "images/NPC/bandit_camp/td_camp_3.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['hazy_pollen']
            }
        },
        {
            coords: convertCoords(2379, 4073),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/td_camp_4.jpg",
            extended: {
                image: "images/NPC/bandit_camp/td_camp_4.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['hazy_pollen']
            }
        },
        {
            coords: convertCoords(2259, 4053),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/td_camp_5.jpg",
            extended: {
                image: "images/NPC/bandit_camp/td_camp_5.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['hazy_pollen']
            }
        },
        {
            coords: convertCoords(2341, 4103),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/td_camp_6.jpg",
            extended: {
                image: "images/NPC/bandit_camp/td_camp_6.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['hazy_pollen']
            }
        },
        {
            coords: convertCoords(2364, 3856),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/td_camp_7.jpg",
            extended: {
                image: "images/NPC/bandit_camp/td_camp_7.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['hazy_pollen']
            }
        },
        // Свалка
        {
            coords: convertCoords(1968, 3444),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/g_camp_1.jpg",
            extended: {
                image: "images/NPC/bandit_camp/g_camp_1.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['hazy_pollen']
            }
        },
        {
            coords: convertCoords(1891, 3629),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/g_camp_2.jpg",
            extended: {
                image: "images/NPC/bandit_camp/g_camp_2.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['hazy_pollen']
            }
        },
        {
            coords: convertCoords(1843, 3381),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/g_camp_3.jpg",
            extended: {
                image: "images/NPC/bandit_camp/g_camp_3.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['hazy_pollen']
            }
        },
        {
            coords: convertCoords(1911, 3524),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/g_camp_4.jpg",
            extended: {
                image: "images/NPC/bandit_camp/g_camp_4.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['hazy_pollen']
            }
        },
        // Кордон
        {
            coords: convertCoords(1797, 2882),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/cordon_camp_1.jpg",
            extended: {
                image: "images/NPC/bandit_camp/cordon_camp_1.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['yantar_fragments']
            }
        },
        {
            coords: convertCoords(1661, 3239),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/cordon_camp_2.jpg",
            extended: {
                image: "images/NPC/bandit_camp/cordon_camp_2.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['yantar_fragments']
            }
        },
        {
            coords: convertCoords(1935, 3076),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/cordon_camp_3.jpg",
            extended: {
                image: "images/NPC/bandit_camp/cordon_camp_3.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['yantar_fragments']
            }
        },
        {
            coords: convertCoords(1636, 3124),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/cordon_camp_4.jpg",
            extended: {
                image: "images/NPC/bandit_camp/cordon_camp_4.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['yantar_fragments']
            }
        },
        {
            coords: convertCoords(1786, 3119),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/cordon_camp_5.jpg",
            extended: {
                image: "images/NPC/bandit_camp/cordon_camp_5.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['yantar_fragments']
            }
        },
        {
            coords: convertCoords(1454, 3063),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/cordon_camp_6.jpg",
            extended: {
                image: "images/NPC/bandit_camp/cordon_camp_6.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['yantar_fragments']
            }
        },
        {
            coords: convertCoords(1792, 2865),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/cordon_camp_7.jpg",
            extended: {
                image: "images/NPC/bandit_camp/cordon_camp_7.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['yantar_fragments']
            }
        },
        {
            coords: convertCoords(1670, 3134),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/cordon_camp_8.jpg",
            extended: {
                image: "images/NPC/bandit_camp/cordon_camp_8.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['yantar_fragments']
            }
        },
        {
            coords: convertCoords(1742, 3276),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/cordon_camp_9.jpg",
            extended: {
                image: "images/NPC/bandit_camp/cordon_camp_9.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['yantar_fragments']
            }
        },
        // Росстань
        {
            coords: convertCoords(882, 3174),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_1.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_1.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(882, 3194),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_2.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_2.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(915, 3189),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_3.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_3.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(872, 3259),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_4.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_4.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(842, 3184),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_5.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_5.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(737, 3154),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_6.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_6.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(815, 3279),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_7.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_7.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(674, 3194),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_8.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_8.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(800, 3219),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_9.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_9.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(822, 3154),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_10.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_10.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(787, 3434),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_11.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_11.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(572, 3159),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_12.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_12.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(712, 3434),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_13.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_13.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(542, 3109),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_14.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_14.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(617, 3119),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_15.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_15.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(577, 3094),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_16.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_16.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(607, 3219),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_17.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_17.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(832, 3409),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_18.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_18.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(942, 3399),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_19.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_19.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(847, 3359),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_20.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_20.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(892, 3369),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_21.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_21.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(912, 3409),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_22.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_22.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(882, 3749),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_23.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_23.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        },
        {
            coords: convertCoords(832, 3739),
            desc: "Стоянка бандитов",
            image: "images/NPC/bandit_camp/rs_camp_24.jpg",
            extended: {
                image: "images/NPC/bandit_camp/rs_camp_24.jpg",
                description: {
                    ru: "Это скопление врагов, за зачистку которого вы получите припасы.",
                    en: "This is a cluster of enemies, for clearing which you will receive supplies."
                },
                rewards: ['mandrake_root']
            }
        }
    ],

    // ==================== НПС: ВОЕННЫЕ ====================
    military: [
        // Дикая территория
        { coords: convertCoords(2691, 2656), desc: "Военный" },
        { coords: convertCoords(2706, 2677), desc: "Военный" },
        { coords: convertCoords(2782, 2736), desc: "Военный" },
        { coords: convertCoords(2688, 2660), desc: "Военный" },
        { coords: convertCoords(2695, 2650), desc: "Военный" },
        { coords: convertCoords(2633, 2697), desc: "Военный" },
        { coords: convertCoords(2630, 2697), desc: "Военный" },
        { coords: convertCoords(2705, 2676), desc: "Военный" },
        { coords: convertCoords(2691, 2670), desc: "Военный" },
        { coords: convertCoords(2630, 2695), desc: "Военный" },
        { coords: convertCoords(2698, 2647), desc: "Военный" },
        { coords: convertCoords(2693, 2654), desc: "Военный" },
    ],

    // ==================== НПС: АВАНПОСТ МОНОЛИТА ====================
    monolith_outpost: [
        // Армейские склады
        {
            coords: convertCoords(3713, 3068),
            desc: "Аванпост монолита",
            image: "images/NPC/monolith_outpost/monolith_outpost_1.jpg",
            extended: {
                image: "images/NPC/monolith_outpost/monolith_outpost_1.jpg",
                description: {
                    ru: "Аванпост монолита в северной деревне.",
                    en: "Monolith outpost in the northern village."
                },
                rewards: ['anomaly_filter', 'black_box']
            }
        }
    ],

    // ==================== НПС: СВОБОДОВЦЫ ====================
    freedom: [
        // Дикая территория
        { coords: convertCoords(2792, 2685), desc: "Свободовец" },
        { coords: convertCoords(2795, 2686), desc: "Свободовец" },
        { coords: convertCoords(2793, 2688), desc: "Свободовец" },
        { coords: convertCoords(2789, 2686), desc: "Свободовец" },
        // Тёмная долина
        { coords: convertCoords(2364, 3836), desc: "Свободовец" },
        { coords: convertCoords(2342, 3727), desc: "Свободовец" },
        { coords: convertCoords(2235, 3563), desc: "Свободовец" },
        { coords: convertCoords(2551, 3762), desc: "Свободовец" },
        { coords: convertCoords(2551, 3766), desc: "Свободовец" },
        { coords: convertCoords(2340, 3728), desc: "Свободовец" },
        { coords: convertCoords(2354, 3602), desc: "Свободовец" },
        { coords: convertCoords(2224, 3560), desc: "Свободовец" },
        { coords: convertCoords(2360, 3706), desc: "Разведчик Свободы" },
        { coords: convertCoords(2366, 3709), desc: "Разведчик Свободы" },
        { coords: convertCoords(2549, 3760), desc: "Свободовец" },
        { coords: convertCoords(2365, 3835), desc: "Свободовец" },
        { coords: convertCoords(2353, 3594), desc: "Свободовец" },
        { coords: convertCoords(2340, 3726), desc: "Свободовец" },
        { coords: convertCoords(2232, 3561), desc: "Свободовец" },
        { coords: convertCoords(2365, 3836), desc: "Свободовец" },
        { coords: convertCoords(2229, 3556), desc: "Свободовец" },
        { coords: convertCoords(2362, 3704), desc: "Разведчик Свободы" },
        { coords: convertCoords(2348, 3594), desc: "Свободовец" },
        { coords: convertCoords(2364, 3706), desc: "Разведчик Свободы" },
        { coords: convertCoords(2353, 3604), desc: "Свободовец" },
        { coords: convertCoords(2365, 3712), desc: "Разведчик Свободы" },
    ],

    // ==================== НПС: ДОЛГОВЦЫ ====================
    duty: [
        // Агропром
        { coords: convertCoords(2177, 2323), desc: "Долговец" },
        { coords: convertCoords(2232, 2521), desc: "Долговец" },
        { coords: convertCoords(2082, 2509), desc: "Долговец" },
        { coords: convertCoords(2236, 2533), desc: "Долговец" },
        { coords: convertCoords(2073, 2514), desc: "Долговец" },
        { coords: convertCoords(2141, 2398), desc: "Долговец" },
        { coords: convertCoords(2143, 2401), desc: "Долговец" },
        { coords: convertCoords(2081, 2510), desc: "Долговец" },
        { coords: convertCoords(2075, 2507), desc: "Долговец" },
        { coords: convertCoords(2236, 2521), desc: "Долговец" },
        { coords: convertCoords(2177, 2317), desc: "Долговец" },
        { coords: convertCoords(2080, 2516), desc: "Долговец" },
        { coords: convertCoords(2140, 2397), desc: "Долговец" },
        { coords: convertCoords(2229, 2524), desc: "Капитан Краснов" },
        { coords: convertCoords(2175, 2321), desc: "Долговец" },
        { coords: convertCoords(2145, 2398), desc: "Долговец" },
        { coords: convertCoords(2231, 2533), desc: "Долговец" },
        { coords: convertCoords(2145, 2397), desc: "Долговец" },
        { coords: convertCoords(2145, 2392), desc: "Долговец" }
    ],

    // ==================== НПС: СПАВН ДОЛГА/СВОБОДЫ ====================
    duty_freedom_spawn: [
        // Муравейник
        { coords: convertCoords(2785, 3558), desc: "Спавн Долга/Свободы - 4 чел." },
        // Полесское
        { coords: convertCoords(3119, 2805), desc: "Спавн Долга/Свободы" },
        { coords: convertCoords(3152, 2802), desc: "Спавн Долга/Свободы" },
        { coords: convertCoords(3140, 2820), desc: "Спавн Долга/Свободы" },
        { coords: convertCoords(3138, 2813), desc: "Спавн Долга/Свободы" },
        { coords: convertCoords(3136, 2802), desc: "Спавн Долга/Свободы" },
        { coords: convertCoords(3138, 2809), desc: "Спавн Долга/Свободы" },
        { coords: convertCoords(3139, 2804), desc: "Спавн Долга/Свободы" },
        { coords: convertCoords(3137, 2811), desc: "Спавн Долга/Свободы" },
        { coords: convertCoords(3143, 2806), desc: "Спавн Долга/Свободы" },
        { coords: convertCoords(3145, 2814), desc: "Спавн Долга/Свободы" },
    ],

    // ==================== НПС: БОСС КНЯЗЬ ====================
    boss_prince: [
        {
            coords: convertCoords(3517, 3090),
            desc: "Босс: Князь",
            image: "images/NPC/bosses/boss_prince.jpg",
            extended: {
                image: "images/NPC/bosses/boss_prince.jpg",
                description: {
                    ru: "Это база босса, за зачистку которого вы получите припасы.",
                    en: "This is the boss base. You will receive supplies for clearing it."
                },
                info: {
                    respawn: {
                        ru: '2.5 — 3 ч',
                        en: '2.5 — 3 h'
                    }
                },
                rewards: ['anomaly_filter', 'converter', 'black_box', 'titanium_frame', 'advanced_upgrade_tools', 'spare_parts']
            }
        }
    ],

    // ==================== НПС: БОСС ФОКСТРОТ ====================
    boss_foxtrot: [
        {
            coords: convertCoords(3234, 2593),
            desc: "Босс: Фокстрот",
            image: "images/NPC/bosses/boss_foxtrot.jpg",
            extended: {
                image: "images/NPC/bosses/boss_foxtrot.jpg",
                description: {
                    ru: "Это база босса, за зачистку которого вы получите припасы.",
                    en: "This is the boss base. You will receive supplies for clearing it."
                },
                info: {
                    respawn: {
                    ru: '20:00 — 7:00',
                    en: '20:00 — 7:00'
                    }
                },
                rewards: ['anomaly_detector', 'basic_upgrade_tools', 'advanced_upgrade_tools', 'basic_armor_kit', 'advanced_armor_kit', 'compromat_flash', 'coded_notebook', 'large_battery']
            }
        },
    ],

    // ==================== НПС: БОСС ФАРАОН ====================
    boss_pharaoh: [
        {
            coords: convertCoords(2946, 2432),
            desc: "Босс: Банда Фараона",
            image: "images/NPC/bosses/boss_pharaoh.jpg",
            extended: {
                image: "images/NPC/bosses/boss_pharaoh.jpg",
                description: {
                    ru: "За зачистку босса вы получите припасы.",
                    en: "For clearing the boss you will receive supplies."
                },
                info: {
                    respawn: {
                        ru: "2 - 2.5 ч",
                        en: "2 - 2.5 h"
                    }
                },
                rewards: [
                    'anomaly_detector',
                    'basic_upgrade_tools',
                    'advanced_upgrade_tools',
                    'basic_armor_kit',
                    'advanced_armor_kit',
                ]
            }
        },
    ],

    // ==================== НПС: БОСС (ДЕПО СУМРАКА) ====================
    boss_sumrak: [
        {
            coords: convertCoords(2241, 3018),
            desc: "Босс: Депо Сумрака",
            image: "images/NPC/bosses/boss_sumrak.jpg",
            extended: {
                image: "images/NPC/bosses/boss_sumrak.jpg",
                description: {
                    ru: "Это база босса, за зачистку которого вы получите припасы.",
                    en: "This is the boss base. You will receive supplies for clearing it."
                },
                info: {
                    respawn: {
                        ru: "2 - 2.5 ч",
                        en: "2 - 2.5 h"
                    }
                },
                rewards: [
                    "basic_upgrade_tools",
                    "basic_armor_kit",
                    "bandit_token",
                    "stash_pda"
                ]
            }
        }
    ],

    // ==================== НПС: БОСС (ИСКАТЕЛЬ) ====================
    boss_iskatel: [
        {
            coords: convertCoords(2103, 2704),
            desc: "Босс: Искатель",
            image: "images/NPC/bosses/boss_iskatel.jpg",
            extended: {
                image: "images/NPC/bosses/boss_iskatel.jpg",
                description: {
                    ru: "Это база босса, за зачистку которого вы получите припасы.",
                    en: "This is the boss base. You will receive supplies for clearing it."
                },
                info: {
                    respawn: {
                        ru: "2 - 2.5 ч",
                        en: "2 - 2.5 h"
                    }
                },
                rewards: [
                    "basic_upgrade_tools",
                    "advanced_upgrade_tools",
                    "spare_parts"
                ]
            }
        }
    ],

    // ==================== НПС: БОСС НЕПРОБИВАЕМЫЙ ====================
    boss_invincible: [
        {
            coords: convertCoords(1445, 1773),
            desc: "Босс: Непробиваемый",
            image: "images/NPC/bosses/boss_invincible.jpg",
            extended: {
                image: "images/NPC/bosses/boss_invincible.jpg",
                description: {
                    ru: "Это база босса, за зачистку которого вы получите припасы.",
                    en: "This is the boss base. You will receive supplies for clearing it."
                },
                info: {
                    respawn: {
                        ru: '2.5 — 3 ч',
                        en: '2.5 — 3 h'
                    }
                },
                rewards: [
                    'converter', 
                    'black_box', 
                    'large_battery', 
                    'titanium_frame', 
                    'servomotors', 
                    'basic_upgrade_tools', 
                    'advanced_upgrade_tools', 
                    'spare_parts'
                ]
            }
        }
    ],

    // ==================== НПС: БОСС КОРОЛЬ И СВИТА ====================
    boss_king: [
        {
            coords: convertCoords(1716, 3391),
            desc: "Босс: Король и Свита",
            image: "images/NPC/bosses/boss_king.jpg",
            extended: {
                image: "images/NPC/bosses/boss_king.jpg",
                description: {
                    ru: "Это база босса, за зачистку которого вы получите припасы.",
                    en: "This is the boss base. You will receive supplies for clearing it."
                },
                info: {
                    respawn: {
                        ru: "2 - 2.5 ч",
                        en: "2 - 2.5 h"
                    }
                },
                rewards: ['basic_upgrade_tools', 'advanced_upgrade_tools', 'spare_parts']
            }
        }
    ],

    // ==================== НПС: БОСС ИЛЛЮЗИОНИСТ ====================
    boss_illusionist: [
        {
            coords: convertCoords(1801, 4514),
            desc: "Босс: Иллюзионист",
            image: "images/NPC/bosses/boss_illusionist.jpg",
            extended: {
                image: "images/NPC/bosses/boss_illusionist.jpg",
                description: {
                    ru: "Это база босса, за зачистку которого вы получите припасы.",
                    en: "This is the boss base. You will receive supplies for clearing it."
                },
                info: {
                    respawn: {
                        ru: '2.5 — 3 ч',
                        en: '2.5 — 3 h'
                    }
                },
                rewards: [
                    'converter', 
                    'black_box', 
                    'large_battery', 
                    'titanium_frame', 
                    'servomotors', 
                    'basic_upgrade_tools', 
                    'advanced_upgrade_tools', 
                    'spare_parts'
                ]
            }
        },
    ],

    // ==================== НПС: БОСС БАНДА КАСТЕТА ====================
    boss_kastet: [
        {
            coords: convertCoords(627, 3269),
            desc: "Босс: Банда Кастета",
            image: "images/NPC/bosses/boss_kastet.jpg",
            extended: {
                image: "images/NPC/bosses/boss_kastet.jpg",
                description: {
                    ru: "Это база босса, за зачистку которого вы получите припасы.",
                    en: "This is the boss base. You will receive supplies for clearing it."
                },
                info: {
                    respawn: {
                        ru: "2 - 2.5 ч",
                        en: "2 - 2.5 h"
                    }
                },
                rewards: ['mandrake_root', 'mutated_tissue_sample', 'scan_flash_drive', 'expedition_reports_disk']
            }
        },
        {
            coords: convertCoords(857, 3141),
            desc: "Босс: Банда Кастета",
            image: "images/NPC/bosses/boss_kastet2.jpg",
            extended: {
                image: "images/NPC/bosses/boss_kastet2.jpg",
                description: {
                    ru: "Это база босса, за зачистку которого вы получите припасы.",
                    en: "This is the boss base. You will receive supplies for clearing it."
                },
                info: {
                    respawn: {
                        ru: "2 - 2.5 ч",
                        en: "2 - 2.5 h"
                    }
                },
                rewards: ['mandrake_root', 'mutated_tissue_sample', 'scan_flash_drive', 'expedition_reports_disk']
            }
        }
    ],

    // ==================== ЛОКАЦИИ: БАЗА ОРДЕНА ====================
    base_orden: [
        {
            coords: convertCoords(2790, 3639),
            desc: "База группировки «Орден»",
            extended: {
                image: "images/locations/preview/base-orden.jpg",
                description: {
                    ru: "Многоуровневый бункер, занятый группировкой Орден.",
                    en: "A multi-level bunker occupied by the Order group."
                }
            }
        },
    ],

    // ==================== ЛОКАЦИИ: БАЗА ЛЕГИОНА ====================
    base_legion: [
        {
            coords: convertCoords(2610, 1822),
            desc: "База группировки «Легион»",
            extended: {
                image: "images/locations/preview/base-legion.jpg",
                description: {
                    ru: "Станция связи, занятая группировкой Легион.",
                    en: "A communications station occupied by the Legion group."
                }
            }
        },
    ],

    // ==================== ЛОКАЦИИ: БАЗА ДОЛГА ====================
    base_duty: [
        {
            coords: convertCoords(2120, 2277),
            desc: "База группировки «Долг»",
        },
    ],

    // ==================== ЛОКАЦИИ: БАЗА СВОБОДЫ ====================
    base_freedom: [
        {
            coords: convertCoords(2441, 3708),
            desc: "База группировки «Свобода»",
        },
    ],

    // ==================== ЛОКАЦИИ: БАЗЫ (СОХРАНЕНИЕ) ====================
    base_spawn: [
        {
            coords: convertCoords(2557, 2330),
            desc: "Бункер учёных",
        },
        {
            coords: convertCoords(2771, 3017),
            desc: "Завод «Росток»",
        },
        {
            coords: convertCoords(1047, 2446),
            desc: "Фабрика",
        },
        {
            coords: convertCoords(2183, 3633),
            desc: "Заброшенная ферма",
        },
        {
            coords: convertCoords(1490, 3121),
            desc: "АТП",
        },
        {
            coords: convertCoords(1419, 2940),
            desc: "Деревня новичков",
        },
        {
            coords: convertCoords(2246, 2388),
            desc: "База сталкеров",
        },
        {
            coords: convertCoords(630, 3647),
            desc: "КПП «Рубежный»",
            extended: {
                image: "images/locations/preview/kpp-rubezh.jpg",
                description: {
                    ru: "Это основной контрольно-пропускной пункт на въезде в Чернобыльскую зону отчуждения.",
                    en: "This is the main checkpoint at the entrance to the Chernobyl Exclusion Zone."
                }
            }
        },
    ],

    // ==================== ЛОКАЦИИ: БАЗЫ (БЕЗ СОХРАНЕНИЯ) ====================
    base_nospawn: [
        {
            coords: convertCoords(2332, 3122),
            desc: "Барахолка",
        },
        {
            coords: convertCoords(1650, 3054),
            desc: "Свиноферма",
        },
        {
            coords: convertCoords(683, 2978),
            desc: "Пожарная часть",
            extended: {
                image: "images/locations/preview/mes.jpg",
                description: {
                    ru: "Станция МЧС ранее, сейчас – укреплённая зона, занятая группой неучтённых лиц.",
                    en: "The Ministry of Emergency Situations station used to be a fortified area, now occupied by a group of unaccounted individuals."
                }
            }
        },
    ],

    // ==================== ЛОКАЦИИ: ВРАЖДЕБНЫЕ БАЗЫ ====================
    base_hostile: [
        {
            coords: convertCoords(1290, 2974),
            desc: "КПП «Южный»",
            extended: {
                image: "images/locations/preview/kpp-yuzhny.jpg",
                description: {
                    ru: "Укреплённый блокпост между Кордоном и Росстанью. Часть последнего кольца Периметра, из трёх, возведённых согласно с «Планом Сдерживания».",
                    en: "A fortified checkpoint between Cordon and Rosstan. Part of the final ring of the Perimeter, of three built in accordance with the «Containment Plan»."
                }
            }
        },
    ],
};

// ============================================================
// Категории фильтров
// ============================================================
const FILTER_CATEGORIES = {
    astrolite: ['catalyst', 'wormhole'],
    containers: ['ammo', 'supply', 'tools', 'barrels', 'science', 'stash', 'wooden_crate', 'safe', 'stash_hidden'],
    mutants: ['blind_dog', 'pseudodog', 'psy_dog', 'flesh', 'boar', 'rat', 'snork', 'zombie', 'bloodsucker', 'bloodsucker_strong', 'chimera', 'controller'],
    npc: ['zombified', 'zombified_cluster', 'bandits', 'bandit_camp', 'military', 'monolith_outpost', 'monolith', 'mercenary', 'stalkers', 'freedom', 'duty', 'duty_freedom_spawn', 'sinner', 'boss_foxtrot', 'boss_prince', 'boss_invincible', 'boss_illusionist', 'boss_pharaoh', 'boss_sumrak', 'boss_iskatel', 'boss_king', 'boss_kastet'],
    locations: ['base_orden', 'base_legion', 'base_duty', 'base_freedom', 'base_spawn', 'base_nospawn', 'base_hostile']
};
