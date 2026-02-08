/**
 * DynMap Module — Отображение онлайн-игроков на карте
 * Только для авторизованных администраторов
 * 
 * API Contract:
 * GET /api/dynmap/players
 * Headers: 
 *   Authorization: Bearer <server_token>
 *   X-Admin-Token: <admin_token>
 * 
 * Response: {
 *   success: boolean,
 *   timestamp: number,
 *   players: PlayerData[]
 * }
 */

const Dynmap = (() => {
    // ==================== КОНФИГУРАЦИЯ ====================
    const CONFIG = {
        apiUrl: '',
        updateInterval: 5000,
        requestTimeout: 8000,
        useMockData: true,
        playerIconSize: [32, 32],
        playerIconSizeHover: [38, 38],
        zIndex: 1000,
        moveAnimationDuration: 1000,
        inactiveTimeout: 30000,
        antiRelogTimeout: 300000,
        storageKeys: {
            authToken: 'dynmap_admin_token',
            serverToken: 'dynmap_server_token',
            isAuthenticated: 'dynmap_authenticated',
            settings: 'dynmap_settings'
        }
    };

    // ==================== СОСТОЯНИЕ ====================
    let state = {
        map: null,
        isInitialized: false,
        isAuthenticated: false,
        isVisible: true,
        updateTimer: null,
        playerLayerGroup: null,
        playerMarkers: {},
        lastUpdateTime: null,
        connectionStatus: 'disconnected',
        errorCount: 0,
        maxErrors: 5,
        settings: {
            showOfflinePlayers: false,
            showPlayerTrails: false,
            autoCenter: false,
            soundNotifications: false
        }
    };

    // ==================== ЦВЕТА АВАТАРОВ ====================
    
    const AVATAR_COLORS = [
        '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c',
        '#3498db', '#9b59b6', '#e91e63', '#00bcd4', '#ff7043',
        '#8bc34a', '#7c4dff', '#ff5252', '#448aff', '#69f0ae',
        '#ffd740', '#ff6e40', '#7e57c2', '#26a69a', '#ec407a'
    ];

    function getPlayerColor(nickname) {
        let hash = 0;
        for (let i = 0; i < nickname.length; i++) {
            hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
    }

    function getPlayerInitials(nickname) {
        if (!nickname) return '?';
        // Если ник содержит разделители — берём первые буквы частей
        const parts = nickname.split(/[_\-\s.]+/).filter(Boolean);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        // Иначе — первая буква ника
        return nickname.charAt(0).toUpperCase();
    }

    // ==================== ИГРОВЫЕ КООРДИНАТЫ → ПИКСЕЛИ КАРТЫ ====================
    
    function gameToPixelCoords(gameX, gameZ) {
        const oldX = 0.505 * gameX + 3330;
        const oldY = -0.5 * gameZ + 768;
        const pixelX = Math.round(oldX * 2.0);
        const pixelY = Math.round(16896 - (oldY * 2.0));
        return { pixelX, pixelY };
    }
    
    function pixelToLatLng(pixelX, pixelY) {
        if (!state.map) return null;
        return state.map.unproject([pixelX, pixelY], MAP_CONFIG.nativeZoom);
    }

    function gameToLatLng(gameX, gameZ) {
        const { pixelX, pixelY } = gameToPixelCoords(gameX, gameZ);
        return pixelToLatLng(pixelX, pixelY);
    }

    // ==================== МОКОВЫЕ ДАННЫЕ ====================
    
    function generateMockPlayers() {
        const mockPlayers = [
            {
                id: 'player_001',
                nickname: 'Strelok',
                x: 450, y: 72, z: -320,
                hp: 85, maxHp: 100,
                online: true,
                antiRelog: false,
                onlineTime: 7200000,
                equipment: {
                    armor: { name: 'Экзоскелет', id: 'exo_skeleton', count: 1 },
                    helmet: { name: 'ПНВ "Сова"', id: 'pnv_owl', count: 1 },
                    primaryWeapon: { name: 'ВСС "Винторез"', id: 'vss_vintorez', count: 1 },
                    secondaryWeapon: { name: 'Beretta M9', id: 'beretta_m9', count: 1 },
                    knife: { name: 'Боевой нож', id: 'combat_knife', count: 1 },
                    detector: { name: 'Велес', id: 'veles', count: 1 }
                }
            },
            {
                id: 'player_002',
                nickname: 'Degtyarev',
                x: -180, y: 65, z: 200,
                hp: 100, maxHp: 100,
                online: true,
                antiRelog: false,
                onlineTime: 14400000,
                equipment: {
                    armor: { name: 'СЕВА', id: 'seva_suit', count: 1 },
                    helmet: { name: 'ПНВ "Филин"', id: 'pnv_filin', count: 1 },
                    primaryWeapon: { name: 'FN F2000', id: 'fn_f2000', count: 1 },
                    secondaryWeapon: { name: 'Colt M1911', id: 'colt_m1911', count: 1 },
                    knife: { name: 'Мачете', id: 'machete', count: 1 },
                    detector: { name: 'Медведь', id: 'bear', count: 1 }
                }
            },
            {
                id: 'player_003',
                nickname: 'Shadow_Hunter',
                x: 800, y: 58, z: -100,
                hp: 45, maxHp: 100,
                online: true,
                antiRelog: false,
                onlineTime: 3600000,
                equipment: {
                    armor: { name: 'Комбинезон наёмника', id: 'merc_suit', count: 1 },
                    helmet: null,
                    primaryWeapon: { name: 'Dragunov SVD', id: 'svd', count: 1 },
                    secondaryWeapon: { name: 'ПМ', id: 'pm', count: 1 },
                    knife: { name: 'Охотничий нож', id: 'hunting_knife', count: 1 },
                    detector: { name: 'Эхо', id: 'echo', count: 1 }
                }
            },
            {
                id: 'player_004',
                nickname: 'ZoneWalker',
                x: -500, y: 70, z: -600,
                hp: 20, maxHp: 100,
                online: false,
                antiRelog: true,
                antiRelogTimeLeft: 180000,
                onlineTime: 900000,
                equipment: {
                    armor: { name: 'Кожаная куртка', id: 'leather_jacket', count: 1 },
                    helmet: null,
                    primaryWeapon: { name: 'АК-74', id: 'ak74', count: 1 },
                    secondaryWeapon: null,
                    knife: { name: 'Нож', id: 'knife', count: 1 },
                    detector: null
                }
            },
            {
                id: 'player_005',
                nickname: 'Commando',
                x: 200, y: 80, z: 400,
                hp: 100, maxHp: 100,
                online: true,
                antiRelog: false,
                onlineTime: 36000000,
                equipment: {
                    armor: { name: 'Экзоскелет "Иггдрасиль"', id: 'exo_yigg', count: 1 },
                    helmet: { name: 'ПНВ "Орёл"', id: 'pnv_eagle', count: 1 },
                    primaryWeapon: { name: 'Gauss Rifle', id: 'gauss', count: 1 },
                    secondaryWeapon: { name: 'Desert Eagle', id: 'deagle', count: 1 },
                    knife: { name: 'Боевой нож "Коготь"', id: 'claw_knife', count: 1 },
                    detector: { name: 'Велес', id: 'veles', count: 1 }
                }
            }
        ];

        return mockPlayers.map(p => ({
            ...p,
            x: p.x + (Math.random() - 0.5) * 10,
            z: p.z + (Math.random() - 0.5) * 10
        }));
    }

    // ==================== АУТЕНТИФИКАЦИЯ ====================

    function isAuthenticated() {
        return state.isAuthenticated;
    }

    function authenticate(serverToken, adminToken) {
        return new Promise((resolve, reject) => {
            if (CONFIG.useMockData) {
                if (serverToken && adminToken) {
                    state.isAuthenticated = true;
                    saveAuthTokens(serverToken, adminToken);
                    resolve({ success: true, admin: 'Developer Mode' });
                } else {
                    reject(new Error(t('dynmap.auth.invalidTokens')));
                }
                return;
            }

            fetch(`${CONFIG.apiUrl}/auth/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${serverToken}`,
                    'X-Admin-Token': adminToken
                },
                signal: AbortSignal.timeout(CONFIG.requestTimeout)
            })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    state.isAuthenticated = true;
                    saveAuthTokens(serverToken, adminToken);
                    resolve(data);
                } else {
                    reject(new Error(data.message || t('dynmap.auth.failed')));
                }
            })
            .catch(error => reject(error));
        });
    }

    function logout() {
        state.isAuthenticated = false;
        clearAuthTokens();
        stopUpdates();
        clearPlayers();
        updateUI();
    }

    function saveAuthTokens(serverToken, adminToken) {
        try {
            sessionStorage.setItem(CONFIG.storageKeys.serverToken, serverToken);
            sessionStorage.setItem(CONFIG.storageKeys.authToken, adminToken);
            sessionStorage.setItem(CONFIG.storageKeys.isAuthenticated, 'true');
        } catch (e) {
            console.warn('Failed to save auth tokens:', e);
        }
    }

    function getAuthTokens() {
        try {
            return {
                serverToken: sessionStorage.getItem(CONFIG.storageKeys.serverToken),
                adminToken: sessionStorage.getItem(CONFIG.storageKeys.authToken)
            };
        } catch (e) {
            return { serverToken: null, adminToken: null };
        }
    }

    function clearAuthTokens() {
        try {
            sessionStorage.removeItem(CONFIG.storageKeys.serverToken);
            sessionStorage.removeItem(CONFIG.storageKeys.authToken);
            sessionStorage.removeItem(CONFIG.storageKeys.isAuthenticated);
        } catch (e) {
            console.warn('Failed to clear auth tokens:', e);
        }
    }

    function tryRestoreSession() {
        try {
            const wasAuthenticated = sessionStorage.getItem(CONFIG.storageKeys.isAuthenticated);
            if (wasAuthenticated === 'true') {
                const tokens = getAuthTokens();
                if (tokens.serverToken && tokens.adminToken) {
                    state.isAuthenticated = true;
                    return true;
                }
            }
        } catch (e) {
            console.warn('Failed to restore session:', e);
        }
        return false;
    }

    // ==================== ПОЛУЧЕНИЕ ДАННЫХ ====================

    async function fetchPlayers() {
        if (!state.isAuthenticated) return null;

        if (CONFIG.useMockData) {
            return {
                success: true,
                timestamp: Date.now(),
                players: generateMockPlayers()
            };
        }

        const tokens = getAuthTokens();
        
        try {
            const response = await fetch(`${CONFIG.apiUrl}/dynmap/players`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tokens.serverToken}`,
                    'X-Admin-Token': tokens.adminToken,
                    'Accept': 'application/json'
                },
                signal: AbortSignal.timeout(CONFIG.requestTimeout)
            });

            if (response.status === 401 || response.status === 403) {
                logout();
                showAuthModal();
                throw new Error('Unauthorized');
            }

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            state.errorCount = 0;
            state.connectionStatus = 'connected';
            return data;
        } catch (error) {
            state.errorCount++;
            
            if (state.errorCount >= state.maxErrors) {
                state.connectionStatus = 'error';
                stopUpdates();
                console.error('DynMap: Too many errors, stopping updates');
            } else {
                state.connectionStatus = 'disconnected';
            }
            
            console.error('DynMap fetch error:', error);
            return null;
        }
    }

    // ==================== ОБНОВЛЕНИЕ КАРТЫ ====================

    async function update() {
        if (!state.isAuthenticated || !state.isVisible) return;

        const data = await fetchPlayers();
        if (!data || !data.success) {
            updateConnectionStatus();
            return;
        }

        state.lastUpdateTime = data.timestamp || Date.now();
        
        const currentPlayerIds = new Set();

        data.players.forEach(player => {
            currentPlayerIds.add(player.id);
            
            if (state.playerMarkers[player.id]) {
                updatePlayerMarker(player);
            } else {
                createPlayerMarker(player);
            }
        });

        Object.keys(state.playerMarkers).forEach(id => {
            if (!currentPlayerIds.has(id)) {
                removePlayerMarker(id);
            }
        });

        updateConnectionStatus();
        updatePlayerCount(data.players);
    }

    function createPlayerMarker(player) {
        const latlng = gameToLatLng(player.x, player.z);
        if (!latlng) return;

        const icon = createPlayerIcon(player);
        const marker = L.marker(latlng, { 
            icon,
            zIndexOffset: CONFIG.zIndex,
            interactive: true
        });

        marker.bindTooltip(() => createPlayerTooltip(player), {
            className: 'dynmap-tooltip',
            direction: 'top',
            offset: [0, -20],
            opacity: 1
        });

        marker.on('click', () => {
            showPlayerProfile(player);
        });

        marker.addTo(state.playerLayerGroup);

        state.playerMarkers[player.id] = {
            marker,
            data: player
        };
    }

    function updatePlayerMarker(player) {
        const entry = state.playerMarkers[player.id];
        if (!entry) return;

        const newLatLng = gameToLatLng(player.x, player.z);
        if (!newLatLng) return;

        const currentLatLng = entry.marker.getLatLng();
        animateMarker(entry.marker, currentLatLng, newLatLng, CONFIG.moveAnimationDuration);

        entry.marker.setIcon(createPlayerIcon(player));
        entry.data = player;
        entry.marker.setTooltipContent(createPlayerTooltip(player));
    }

    function removePlayerMarker(id) {
        const entry = state.playerMarkers[id];
        if (!entry) return;

        state.playerLayerGroup.removeLayer(entry.marker);
        delete state.playerMarkers[id];
    }

    function clearPlayers() {
        if (state.playerLayerGroup) {
            state.playerLayerGroup.clearLayers();
        }
        state.playerMarkers = {};
    }

    // ==================== АНИМАЦИЯ ====================

    function animateMarker(marker, fromLatLng, toLatLng, duration) {
        const startTime = performance.now();
        const startLat = fromLatLng.lat;
        const startLng = fromLatLng.lng;
        const deltaLat = toLatLng.lat - startLat;
        const deltaLng = toLatLng.lng - startLng;

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const ease = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            const lat = startLat + deltaLat * ease;
            const lng = startLng + deltaLng * ease;
            
            marker.setLatLng([lat, lng]);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    // ==================== СОЗДАНИЕ ИКОНОК ====================

    function createPlayerIcon(player) {
        const statusClass = player.online 
            ? (player.antiRelog ? 'dynmap-player--antirelog' : 'dynmap-player--online')
            : 'dynmap-player--offline';
        
        const hpPercent = Math.round((player.hp / player.maxHp) * 100);
        const hpColor = getHpColor(hpPercent);
        const avatarColor = getPlayerColor(player.nickname);
        const initials = getPlayerInitials(player.nickname);

        const html = `
            <div class="dynmap-player ${statusClass}">
                <div class="dynmap-player__avatar" style="background: ${avatarColor};">
                    <span class="dynmap-player__initials">${escapeHtml(initials)}</span>
                    <div class="dynmap-player__status-dot"></div>
                </div>
                <div class="dynmap-player__name-tag">${escapeHtml(player.nickname)}</div>
                <div class="dynmap-player__hp-bar">
                    <div class="dynmap-player__hp-fill" style="width: ${hpPercent}%; background: ${hpColor};"></div>
                </div>
            </div>
        `;

        return L.divIcon({
            className: 'dynmap-player-icon',
            html: html,
            iconSize: CONFIG.playerIconSize,
            iconAnchor: [CONFIG.playerIconSize[0] / 2, CONFIG.playerIconSize[1] / 2],
            popupAnchor: [0, -CONFIG.playerIconSize[1] / 2]
        });
    }

    function getHpColor(percent) {
        if (percent > 70) return '#4ade80';
        if (percent > 40) return '#fbbf24';
        if (percent > 20) return '#f97316';
        return '#ef4444';
    }

    // ==================== ТУЛТИП ====================

    function createPlayerTooltip(player) {
        const isEn = window.i18n?.isEnglish();
        const hpPercent = Math.round((player.hp / player.maxHp) * 100);
        const hpColor = getHpColor(hpPercent);
        const avatarColor = getPlayerColor(player.nickname);
        const initials = getPlayerInitials(player.nickname);
        
        let statusText, statusClass;
        if (player.online && !player.antiRelog) {
            statusText = isEn ? 'Online' : 'Онлайн';
            statusClass = 'online';
        } else if (player.antiRelog) {
            statusText = isEn ? 'Anti-relog' : 'Антирелог';
            statusClass = 'antirelog';
        } else {
            statusText = isEn ? 'Offline' : 'Оффлайн';
            statusClass = 'offline';
        }

        return `
            <div class="dynmap-tooltip__content">
                <div class="dynmap-tooltip__player-header">
                    <div class="dynmap-tooltip__avatar" style="background: ${avatarColor};">
                        <span>${escapeHtml(initials)}</span>
                    </div>
                    <div class="dynmap-tooltip__player-info">
                        <div class="dynmap-tooltip__name">${escapeHtml(player.nickname)}</div>
                        <div class="dynmap-tooltip__status dynmap-tooltip__status--${statusClass}">
                            <span class="dynmap-tooltip__status-dot"></span>
                            ${statusText}
                        </div>
                    </div>
                </div>
                <div class="dynmap-tooltip__coords">
                    X: ${Math.round(player.x)}, Y: ${Math.round(player.y)}, Z: ${Math.round(player.z)}
                </div>
                <div class="dynmap-tooltip__hp">
                    <span class="dynmap-tooltip__hp-label">HP:</span>
                    <div class="dynmap-tooltip__hp-bar">
                        <div class="dynmap-tooltip__hp-fill" style="width: ${hpPercent}%; background: ${hpColor};"></div>
                    </div>
                    <span class="dynmap-tooltip__hp-text">${player.hp}/${player.maxHp}</span>
                </div>
            </div>
        `;
    }

    // ==================== ПРОФИЛЬ ИГРОКА ====================

    function showPlayerProfile(player) {
        closePlayerProfile();

        const isEn = window.i18n?.isEnglish();
        const hpPercent = Math.round((player.hp / player.maxHp) * 100);
        const hpColor = getHpColor(hpPercent);
        const onlineTimeStr = formatOnlineTime(player.onlineTime, isEn);
        const avatarColor = getPlayerColor(player.nickname);
        const initials = getPlayerInitials(player.nickname);

        let statusText, statusClass;
        if (player.online && !player.antiRelog) {
            statusText = isEn ? 'Online' : 'Онлайн';
            statusClass = 'online';
        } else if (player.antiRelog) {
            const timeLeft = player.antiRelogTimeLeft 
                ? ` (${formatTimeLeft(player.antiRelogTimeLeft, isEn)})` 
                : '';
            statusText = (isEn ? 'Anti-relog' : 'Антирелог') + timeLeft;
            statusClass = 'antirelog';
        } else {
            statusText = isEn ? 'Offline' : 'Оффлайн';
            statusClass = 'offline';
        }

        const equipmentSlots = [
            { 
                key: 'armor', 
                label: isEn ? 'Armor' : 'Броня', 
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>` 
            },
            { 
                key: 'helmet', 
                label: isEn ? 'Headgear (NVG)' : 'Голова (ПНВ)', 
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>` 
            },
            { 
                key: 'primaryWeapon', 
                label: isEn ? 'Primary weapon' : 'Основное оружие', 
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h6l2-3h4l2 3h6"/><path d="M8 12V7h8v5"/></svg>` 
            },
            { 
                key: 'secondaryWeapon', 
                label: isEn ? 'Secondary weapon' : 'Доп. оружие', 
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>` 
            },
            { 
                key: 'knife', 
                label: isEn ? 'Knife' : 'Нож', 
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2l6 6-8 8-6-6zM2 22l5.5-1.5L4 17z"/></svg>` 
            },
            { 
                key: 'detector', 
                label: isEn ? 'Detector' : 'Детектор', 
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18.01"/><path d="M9 8h6"/><path d="M9 12h6"/></svg>` 
            }
        ];

        const equipmentHtml = equipmentSlots.map(slot => {
            const item = player.equipment?.[slot.key];
            const itemName = item ? escapeHtml(item.name) : (isEn ? 'Empty' : 'Пусто');
            const itemClass = item ? '' : 'dynmap-profile__slot--empty';
            const countBadge = item && item.count > 1 ? `<span class="dynmap-profile__item-count">×${item.count}</span>` : '';
            
            return `
                <div class="dynmap-profile__slot ${itemClass}">
                    <div class="dynmap-profile__slot-icon">${slot.icon}</div>
                    <div class="dynmap-profile__slot-info">
                        <div class="dynmap-profile__slot-label">${slot.label}</div>
                        <div class="dynmap-profile__slot-value">${itemName}${countBadge}</div>
                    </div>
                </div>
            `;
        }).join('');

        const profileHtml = `
            <div class="dynmap-profile" id="dynmapProfile">
                <div class="dynmap-profile__overlay" id="dynmapProfileOverlay"></div>
                <div class="dynmap-profile__panel">
                    <div class="dynmap-profile__header">
                        <div class="dynmap-profile__player-info">
                            <div class="dynmap-profile__avatar-circle" style="background: ${avatarColor};">
                                <span>${escapeHtml(initials)}</span>
                            </div>
                            <div>
                                <div class="dynmap-profile__name">${escapeHtml(player.nickname)}</div>
                                <div class="dynmap-profile__status dynmap-profile__status--${statusClass}">
                                    <span class="dynmap-profile__status-dot"></span>
                                    ${statusText}
                                </div>
                            </div>
                        </div>
                        <button class="dynmap-profile__close" id="dynmapProfileClose">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div class="dynmap-profile__body">
                        <div class="dynmap-profile__section">
                            <div class="dynmap-profile__stats">
                                <div class="dynmap-profile__stat">
                                    <div class="dynmap-profile__stat-label">${isEn ? 'Health' : 'Здоровье'}</div>
                                    <div class="dynmap-profile__hp-bar">
                                        <div class="dynmap-profile__hp-fill" style="width: ${hpPercent}%; background: ${hpColor};"></div>
                                        <span class="dynmap-profile__hp-text">${player.hp} / ${player.maxHp}</span>
                                    </div>
                                </div>
                                <div class="dynmap-profile__stat">
                                    <div class="dynmap-profile__stat-label">${isEn ? 'Coordinates' : 'Координаты'}</div>
                                    <div class="dynmap-profile__stat-value dynmap-profile__stat-value--mono">
                                        X: ${Math.round(player.x)}, Y: ${Math.round(player.y)}, Z: ${Math.round(player.z)}
                                    </div>
                                </div>
                                <div class="dynmap-profile__stat">
                                    <div class="dynmap-profile__stat-label">${isEn ? 'Time online' : 'Время в сети'}</div>
                                    <div class="dynmap-profile__stat-value">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;margin-right:6px">
                                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                        </svg>
                                        ${onlineTimeStr}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="dynmap-profile__section">
                            <div class="dynmap-profile__section-title">${isEn ? 'Equipment' : 'Снаряжение'}</div>
                            <div class="dynmap-profile__equipment">
                                ${equipmentHtml}
                            </div>
                        </div>
                    </div>

                    <div class="dynmap-profile__footer">
                        <button class="dynmap-profile__btn" id="dynmapProfileLocate">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
                            </svg>
                            ${isEn ? 'Show on map' : 'Показать на карте'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', profileHtml);

        document.getElementById('dynmapProfileClose')?.addEventListener('click', closePlayerProfile);
        document.getElementById('dynmapProfileOverlay')?.addEventListener('click', closePlayerProfile);
        document.getElementById('dynmapProfileLocate')?.addEventListener('click', () => {
            const latlng = gameToLatLng(player.x, player.z);
            if (latlng) {
                state.map.setView(latlng, MAP_CONFIG.maxZoom - 1);
            }
            closePlayerProfile();
        });

        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closePlayerProfile();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        requestAnimationFrame(() => {
            document.getElementById('dynmapProfile')?.classList.add('visible');
        });
    }

    function closePlayerProfile() {
        const profile = document.getElementById('dynmapProfile');
        if (profile) {
            profile.classList.remove('visible');
            setTimeout(() => profile.remove(), 300);
        }
    }

    // ==================== МОДАЛЬНОЕ ОКНО АВТОРИЗАЦИИ ====================

    function showAuthModal() {
        closeAuthModal();

        const isEn = window.i18n?.isEnglish();

        const modalHtml = `
            <div class="dynmap-auth" id="dynmapAuth">
                <div class="dynmap-auth__overlay" id="dynmapAuthOverlay"></div>
                <div class="dynmap-auth__panel">
                    <div class="dynmap-auth__header">
                        <div class="dynmap-auth__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <h2 class="dynmap-auth__title">${isEn ? 'Admin Access' : 'Доступ администратора'}</h2>
                        <p class="dynmap-auth__subtitle">${isEn ? 'DynMap is available only for project administrators' : 'DynMap доступен только для администраторов проекта'}</p>
                    </div>
                    
                    <div class="dynmap-auth__body">
                        <div class="dynmap-auth__field">
                            <label>${isEn ? 'Server Token' : 'Токен сервера'}</label>
                            <div class="dynmap-auth__input-wrap">
                                <input type="password" id="dynmapServerToken" 
                                       placeholder="${isEn ? 'Enter server token' : 'Введите токен сервера'}" 
                                       autocomplete="off">
                                <button class="dynmap-auth__eye" id="toggleServerToken" type="button">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <div class="dynmap-auth__field">
                            <label>${isEn ? 'Admin Token' : 'Токен администратора'}</label>
                            <div class="dynmap-auth__input-wrap">
                                <input type="password" id="dynmapAdminToken" 
                                       placeholder="${isEn ? 'Enter admin token' : 'Введите токен администратора'}"
                                       autocomplete="off">
                                <button class="dynmap-auth__eye" id="toggleAdminToken" type="button">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="dynmap-auth__error" id="dynmapAuthError"></div>
                    </div>

                    <div class="dynmap-auth__footer">
                        <button class="dynmap-auth__btn dynmap-auth__btn--cancel" id="dynmapAuthCancel">
                            ${isEn ? 'Cancel' : 'Отмена'}
                        </button>
                        <button class="dynmap-auth__btn dynmap-auth__btn--submit" id="dynmapAuthSubmit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                                <polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
                            </svg>
                            ${isEn ? 'Sign In' : 'Войти'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        setupPasswordToggle('toggleServerToken', 'dynmapServerToken');
        setupPasswordToggle('toggleAdminToken', 'dynmapAdminToken');

        document.getElementById('dynmapAuthCancel')?.addEventListener('click', closeAuthModal);
        document.getElementById('dynmapAuthOverlay')?.addEventListener('click', closeAuthModal);
        
        document.getElementById('dynmapAuthSubmit')?.addEventListener('click', async () => {
            const serverToken = document.getElementById('dynmapServerToken')?.value.trim();
            const adminToken = document.getElementById('dynmapAdminToken')?.value.trim();
            const errorEl = document.getElementById('dynmapAuthError');
            const submitBtn = document.getElementById('dynmapAuthSubmit');

            if (!serverToken || !adminToken) {
                errorEl.textContent = isEn ? 'Please fill in all fields' : 'Заполните все поля';
                errorEl.classList.add('visible');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="dynmap-auth__spinner"></span> ${isEn ? 'Verifying...' : 'Проверка...'}`;

            try {
                await authenticate(serverToken, adminToken);
                closeAuthModal();
                startUpdates();
                updateUI();
            } catch (error) {
                errorEl.textContent = error.message || (isEn ? 'Authentication failed' : 'Ошибка аутентификации');
                errorEl.classList.add('visible');
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                        <polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                    ${isEn ? 'Sign In' : 'Войти'}`;
            }
        });

        ['dynmapServerToken', 'dynmapAdminToken'].forEach(id => {
            document.getElementById(id)?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById('dynmapAuthSubmit')?.click();
                }
            });
        });

        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeAuthModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        requestAnimationFrame(() => {
            document.getElementById('dynmapAuth')?.classList.add('visible');
            document.getElementById('dynmapServerToken')?.focus();
        });
    }

    function closeAuthModal() {
        const modal = document.getElementById('dynmapAuth');
        if (modal) {
            modal.classList.remove('visible');
            setTimeout(() => modal.remove(), 300);
        }
    }

    function setupPasswordToggle(btnId, inputId) {
        const btn = document.getElementById(btnId);
        const input = document.getElementById(inputId);
        if (!btn || !input) return;

        btn.addEventListener('click', () => {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            btn.classList.toggle('active', isPassword);
        });
    }

    // ==================== УПРАВЛЕНИЕ ОБНОВЛЕНИЯМИ ====================

    function startUpdates() {
        if (state.updateTimer) clearInterval(state.updateTimer);
        update();
        state.updateTimer = setInterval(update, CONFIG.updateInterval);
    }

    function stopUpdates() {
        if (state.updateTimer) {
            clearInterval(state.updateTimer);
            state.updateTimer = null;
        }
    }

    // ==================== UI КНОПКА DYNMAP ====================

    function createDynmapToggle() {
        const controlsDiv = document.querySelector('.map-controls');
        if (!controlsDiv) return;

        const isEn = window.i18n?.isEnglish();

        const btn = document.createElement('button');
        btn.className = 'map-control dynmap-control';
        btn.id = 'dynmapToggle';
        btn.title = isEn ? 'DynMap — Online Players' : 'DynMap — Игроки онлайн';
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
        `;
        
        const badge = document.createElement('span');
        badge.className = 'dynmap-control__badge';
        badge.id = 'dynmapBadge';
        badge.style.display = 'none';
        btn.appendChild(badge);

        const statusDot = document.createElement('span');
        statusDot.className = 'dynmap-control__status';
        statusDot.id = 'dynmapStatusDot';
        btn.appendChild(statusDot);

        controlsDiv.insertBefore(btn, controlsDiv.firstChild);

        btn.addEventListener('click', () => {
            if (state.isAuthenticated) {
                toggleDynmapVisibility();
            } else {
                showAuthModal();
            }
        });
    }

    function toggleDynmapVisibility() {
        state.isVisible = !state.isVisible;
        const btn = document.getElementById('dynmapToggle');
        
        if (state.isVisible) {
            state.playerLayerGroup?.addTo(state.map);
            btn?.classList.add('active');
            startUpdates();
        } else {
            state.map?.removeLayer(state.playerLayerGroup);
            btn?.classList.remove('active');
            stopUpdates();
        }
    }

    function updateUI() {
        const btn = document.getElementById('dynmapToggle');
        if (!btn) return;

        if (state.isAuthenticated) {
            btn.classList.add('dynmap-control--authenticated');
            if (state.isVisible) {
                btn.classList.add('active');
            }
        } else {
            btn.classList.remove('dynmap-control--authenticated', 'active');
        }
    }

    function updateConnectionStatus() {
        const dot = document.getElementById('dynmapStatusDot');
        if (!dot) return;

        dot.className = 'dynmap-control__status';
        
        switch (state.connectionStatus) {
            case 'connected':
                dot.classList.add('dynmap-control__status--connected');
                break;
            case 'error':
                dot.classList.add('dynmap-control__status--error');
                break;
            default:
                dot.classList.add('dynmap-control__status--disconnected');
        }
    }

    function updatePlayerCount(players) {
        const badge = document.getElementById('dynmapBadge');
        if (!badge) return;

        const onlineCount = players.filter(p => p.online).length;
        
        if (onlineCount > 0 && state.isAuthenticated) {
            badge.textContent = onlineCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }

    // ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatOnlineTime(ms, isEn) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            const h = hours % 24;
            return isEn 
                ? `${days}d ${h}h` 
                : `${days}д ${h}ч`;
        }
        if (hours > 0) {
            const m = minutes % 60;
            return isEn 
                ? `${hours}h ${m}m` 
                : `${hours}ч ${m}мин`;
        }
        return isEn 
            ? `${minutes}m` 
            : `${minutes}мин`;
    }

    function formatTimeLeft(ms, isEn) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        
        return isEn 
            ? `${minutes}:${secs.toString().padStart(2, '0')} left`
            : `осталось ${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    function t(key) {
        if (window.i18n && typeof window.i18n.t === 'function') {
            return window.i18n.t(key);
        }
        const fallbacks = {
            'dynmap.auth.invalidTokens': 'Invalid tokens',
            'dynmap.auth.failed': 'Authentication failed'
        };
        return fallbacks[key] || key;
    }

    // ==================== ИНИЦИАЛИЗАЦИЯ ====================

    function init(mapInstance) {
        if (state.isInitialized) return;
        
        state.map = mapInstance;
        state.playerLayerGroup = L.layerGroup();
        state.isInitialized = true;

        createDynmapToggle();

        if (tryRestoreSession()) {
            state.playerLayerGroup.addTo(state.map);
            startUpdates();
            updateUI();
        }

        document.addEventListener('languageChanged', () => {
            Object.values(state.playerMarkers).forEach(entry => {
                entry.marker.setTooltipContent(createPlayerTooltip(entry.data));
            });
            const btn = document.getElementById('dynmapToggle');
            if (btn) {
                const isEn = window.i18n?.isEnglish();
                btn.title = isEn ? 'DynMap — Online Players' : 'DynMap — Игроки онлайн';
            }
        });

        console.log('DynMap initialized');
    }

    // ==================== ПУБЛИЧНЫЙ API ====================

    return {
        init,
        isAuthenticated,
        authenticate,
        logout,
        showAuthModal,
        showPlayerProfile,
        closePlayerProfile,
        
        getState: () => ({ ...state }),
        getConfig: () => ({ ...CONFIG }),
        setApiUrl: (url) => { CONFIG.apiUrl = url; },
        setMockMode: (enabled) => { CONFIG.useMockData = enabled; }
    };
})();

window.Dynmap = Dynmap;