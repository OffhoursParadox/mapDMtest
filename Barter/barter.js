'use strict';

function getBasePath() {
    return typeof getWikiAssetBasePath === 'function' ? getWikiAssetBasePath() : '../';
}

let BASE_PATH = '../';
const NODE_WIDTH = 238;
const NODE_INNER_WIDTH = 214;
const NODE_HEIGHT = 72;
const ROW_GAP = 48;
const ROW_OFFSET = 2;
const COLUMN_HEADER_HEIGHT = 48;
const COLUMN_BODY_PAD_TOP = 24;
const COLUMN_BODY_PAD_X = 12;
const CANVAS_PAD_X = 64;
const CANVAS_PAD_Y = 0;
const CANVAS_PAD_BOTTOM = 24;
const PAN_MARGIN_X = 40;
const PAN_MARGIN_Y = 24;

let currentCategory = null;
let selectedNodeId = null;
let selectedOfferIndex = 0;
let includeFullChain = true;
let selectedWeapons = [];
let playerInventory = createEmptyPlayerInventory();
let weaponPickerQuery = '';
let weaponPickerOpen = false;
let cartPanelOpen = false;

const INVENTORY_STORAGE_KEY = 'barter-player-inventory';
const MAX_PLAYER_LEVEL = 50;

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let scrollStartX = 0;
let scrollStartY = 0;
let hasDragged = false;

const elements = {};

function t(key, fallback) {
    if (window.i18n && typeof window.i18n.t === 'function') {
        const value = window.i18n.t(key);
        if (value && value !== key) return value;
    }
    return fallback;
}

function getWeaponName(weapon) {
    return weapon ? getLocalizedName(weapon) : '';
}

function createEmptyPlayerInventory() {
    return {
        level: 0,
        money: 0,
        cr: 0,
        materials: {}
    };
}

function loadPlayerInventory() {
    try {
        const raw = localStorage.getItem(INVENTORY_STORAGE_KEY);
        if (!raw) return createEmptyPlayerInventory();

        const parsed = JSON.parse(raw);
        return {
            level: Math.min(MAX_PLAYER_LEVEL, Math.max(0, Number(parsed.level) || 0)),
            money: Math.max(0, Number(parsed.money) || 0),
            cr: Math.max(0, Number(parsed.cr) || 0),
            materials: parsed.materials && typeof parsed.materials === 'object'
                ? Object.fromEntries(
                    Object.entries(parsed.materials).map(([id, amount]) => [id, Math.max(0, Number(amount) || 0)])
                )
                : {}
        };
    } catch {
        return createEmptyPlayerInventory();
    }
}

function savePlayerInventory() {
    try {
        localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(playerInventory));
    } catch {
        // ignore storage errors
    }
}

function getWeaponCount(nodeId) {
    return selectedWeapons.filter(entry => entry.nodeId === nodeId).length;
}

function getWeaponGroupKey(entry) {
    return `${entry.nodeId}|${entry.offerIndex}|${entry.includeChain ? 1 : 0}`;
}

function parseWeaponGroupKey(groupKey) {
    const [nodeId, offerIndex, includeChainFlag] = groupKey.split('|');
    return {
        nodeId,
        offerIndex: Number(offerIndex) || 0,
        includeChain: includeChainFlag === '1'
    };
}

function groupSelectedWeapons() {
    const groups = new Map();

    selectedWeapons.forEach(entry => {
        const key = getWeaponGroupKey(entry);
        if (!groups.has(key)) {
            groups.set(key, { ...entry, count: 0 });
        }
        groups.get(key).count += 1;
    });

    return [...groups.values()];
}

function getWeaponSelectionOptions(nodeId) {
    if (selectedNodeId === nodeId) {
        return {
            offerIndex: selectedOfferIndex,
            includeChain: includeFullChain
        };
    }

    return {
        offerIndex: 0,
        includeChain: true
    };
}

function addWeaponToList(nodeId) {
    if (!currentCategory) return false;

    const node = getBarterNodeById(currentCategory, nodeId);
    if (!node || node.locked) return false;

    const options = getWeaponSelectionOptions(nodeId);
    selectedWeapons.push({
        nodeId,
        offerIndex: options.offerIndex,
        includeChain: options.includeChain
    });

    updateWeaponListUi();
    return true;
}

function removeOneWeaponFromNode(nodeId) {
    let index = -1;
    for (let i = selectedWeapons.length - 1; i >= 0; i -= 1) {
        if (selectedWeapons[i].nodeId === nodeId) {
            index = i;
            break;
        }
    }

    if (index === -1) return false;

    selectedWeapons.splice(index, 1);
    updateWeaponListUi();
    return true;
}

function buildNodeSelectionMarkup(count) {
    const removeLabel = t('barter.removeWeapon', 'Убрать');
    return `
        <div class="barter-node__selection">
            <span class="barter-node__count">${count}</span>
            <button type="button" class="barter-node__remove" aria-label="${removeLabel}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18"/>
                </svg>
            </button>
        </div>
    `;
}

function bindNodeRemoveButton(nodeEl) {
    const removeBtn = nodeEl.querySelector('.barter-node__remove');
    removeBtn?.addEventListener('click', handleNodeRemoveClick);
}

function removeOneFromWeaponGroup(groupKey) {
    const { nodeId, offerIndex, includeChain } = parseWeaponGroupKey(groupKey);
    const index = selectedWeapons.findIndex(entry =>
        entry.nodeId === nodeId
        && entry.offerIndex === offerIndex
        && entry.includeChain === includeChain
    );

    if (index === -1) return false;

    selectedWeapons.splice(index, 1);
    updateWeaponListUi();
    return true;
}

function addOneToWeaponGroup(groupKey) {
    const { nodeId, offerIndex, includeChain } = parseWeaponGroupKey(groupKey);
    const node = getBarterNodeById(currentCategory, nodeId);
    if (!node || node.locked) return false;

    selectedWeapons.push({ nodeId, offerIndex, includeChain });
    updateWeaponListUi();
    return true;
}

function clearCraftList() {
    if (!selectedWeapons.length) return;

    selectedWeapons = [];
    updateWeaponListUi();
}

function syncWeaponListEntry(nodeId) {
    if (selectedNodeId !== nodeId) return;

    const offerIndex = selectedOfferIndex;
    const includeChain = includeFullChain;

    selectedWeapons.forEach(entry => {
        if (entry.nodeId === nodeId) {
            entry.offerIndex = offerIndex;
            entry.includeChain = includeChain;
        }
    });

    updateCartPanel();
}

function updateWeaponListUi() {
    elements.tree?.querySelectorAll('.barter-node').forEach(nodeEl => {
        const nodeId = nodeEl.dataset.nodeId;
        const count = getWeaponCount(nodeId);
        const isAdded = count > 0;

        nodeEl.classList.toggle('barter-node--added', isAdded);

        let selectionEl = nodeEl.querySelector('.barter-node__selection');
        if (isAdded) {
            if (!selectionEl) {
                nodeEl.insertAdjacentHTML('afterbegin', buildNodeSelectionMarkup(count));
                bindNodeRemoveButton(nodeEl);
            } else {
                const countEl = selectionEl.querySelector('.barter-node__count');
                if (countEl) countEl.textContent = String(count);
            }
        } else if (selectionEl) {
            selectionEl.remove();
        }

        const actionBtn = nodeEl.querySelector('.barter-node__action');
        if (actionBtn && actionBtn.tagName === 'BUTTON') {
            actionBtn.classList.toggle('barter-node__action--added', isAdded);
            actionBtn.textContent = t('barter.addWeapon', 'Добавить');
        }
    });

    updateCartFab();
    updateCartPanel();
}

function updateCartFab() {
    if (!elements.cartFab || !elements.cartBadge) return;

    const count = selectedWeapons.length;
    elements.cartBadge.textContent = String(count);
    elements.cartBadge.hidden = count === 0;
}

function openCartPanel() {
    cartPanelOpen = true;

    if (elements.cart) {
        elements.cart.classList.add('is-open');
        elements.cart.setAttribute('aria-hidden', 'false');
    }

    if (elements.cartBackdrop) {
        elements.cartBackdrop.hidden = false;
    }

    elements.cartFab?.setAttribute('aria-expanded', 'true');
    renderCartPanel();
}

function closeCartPanel() {
    cartPanelOpen = false;

    if (elements.cart) {
        elements.cart.classList.remove('is-open');
        elements.cart.setAttribute('aria-hidden', 'true');
    }

    if (elements.cartBackdrop) {
        elements.cartBackdrop.hidden = true;
    }

    elements.cartFab?.setAttribute('aria-expanded', 'false');
}

function toggleCartPanel() {
    if (cartPanelOpen) {
        closeCartPanel();
    } else {
        openCartPanel();
    }
}

function updateCartPanel() {
    if (!cartPanelOpen) {
        updateCartFab();
        if (elements.cartTitle) {
            const count = selectedWeapons.length;
            elements.cartTitle.textContent = count
                ? t('barter.craftListCount', '{count} предмет(ов)').replace('{count}', count)
                : '—';
        }
        return;
    }

    renderCartPanel();
}

function renderCartPanel() {
    if (!elements.cartBody) return;

    const count = selectedWeapons.length;
    if (elements.cartTitle) {
        elements.cartTitle.textContent = count
            ? t('barter.craftListCount', '{count} предмет(ов)').replace('{count}', count)
            : '—';
    }

    updateCartFab();

    if (!count) {
        elements.cartBody.innerHTML = `
            <div class="barter-cart__empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L5 3H2"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>
                </svg>
                <span>${t('barter.noWeaponsSelected', 'Добавьте оружие в список для расчёта ресурсов')}</span>
            </div>
        `;
        return;
    }

    const groups = groupSelectedWeapons();
    const totals = calculateAggregatedBarterRequirements(currentCategory, selectedWeapons);
    if (!totals) {
        elements.cartBody.innerHTML = '';
        return;
    }

    const adjusted = applyInventoryToRequirements(totals, playerInventory);

    const weaponsHtml = groups.map(group => {
        const node = getBarterNodeById(currentCategory, group.nodeId);
        const weapon = node ? getBarterWeapon(node, BASE_PATH) : null;
        const name = weapon ? getWeaponName(weapon) : group.nodeId;
        const imagePath = weapon?.imagePath || '';
        const groupKey = getWeaponGroupKey(group);

        return `
            <div class="barter-cart-weapon">
                ${imagePath ? `<img class="barter-cart-weapon__image" src="${imagePath}" alt="" loading="lazy" decoding="async">` : '<div class="barter-cart-weapon__image"></div>'}
                <div class="barter-cart-weapon__info">
                    <div class="barter-cart-weapon__name">${name}</div>
                </div>
                <div class="barter-cart-weapon__qty">
                    <button type="button" class="barter-cart-weapon__qty-btn" data-cart-qty="dec" data-group-key="${groupKey}" aria-label="−">−</button>
                    <span class="barter-cart-weapon__qty-value">${group.count}</span>
                    <button type="button" class="barter-cart-weapon__qty-btn" data-cart-qty="inc" data-group-key="${groupKey}" aria-label="+">+</button>
                </div>
            </div>
        `;
    }).join('');

    const materialRows = adjusted.materials
        .filter(entry => entry.amount > 0)
        .map(entry => {
            const imagePath = getBarterMaterialImagePath(entry.id, BASE_PATH);
            const missingClass = entry.missing > 0
                ? 'barter-cart-table__missing'
                : 'barter-cart-table__missing barter-cart-table__missing--ok';

            return `
                <tr>
                    <td>
                        <img class="barter-cart-table__icon" src="${imagePath}" alt="" loading="lazy" decoding="async">
                        ${getBarterMaterialName(entry.material)}
                    </td>
                    <td class="barter-cart-table__need">${entry.amount}</td>
                    <td class="barter-cart-table__have">${entry.have}</td>
                    <td class="${missingClass}">${entry.missing}</td>
                </tr>
            `;
        }).join('');

    const metaRows = [];

    if (adjusted.money.required > 0) {
        metaRows.push(`
            <div class="barter-cart-meta__row">
                <span class="barter-cart-meta__label">${t('barter.money', 'Деньги')}</span>
                <span class="barter-cart-meta__value${adjusted.money.missing === 0 ? ' barter-cart-meta__value--ok' : ''}">
                    ${formatPrice(adjusted.money.missing)}
                </span>
            </div>
        `);
    }

    if (adjusted.cr.required > 0) {
        metaRows.push(`
            <div class="barter-cart-meta__row">
                <span class="barter-cart-meta__label barter-cart-meta__label--cr">${t('barter.cr', 'CR')}</span>
                <span class="barter-cart-meta__value${adjusted.cr.missing === 0 ? ' barter-cart-meta__value--ok' : ''}">
                    ${formatEventCost(adjusted.cr.missing)}
                </span>
            </div>
        `);
    }

    if (adjusted.level.required > 0) {
        const levelText = adjusted.level.missing > 0
            ? `${adjusted.level.have} → ${adjusted.level.required}`
            : String(adjusted.level.required);

        metaRows.push(`
            <div class="barter-cart-meta__row">
                <span class="barter-cart-meta__label">${t('barter.level', 'Уровень')}</span>
                <span class="barter-cart-meta__value${adjusted.level.missing === 0 ? ' barter-cart-meta__value--ok' : ''}">
                    ${levelText}
                </span>
            </div>
        `);
    }

    elements.cartBody.innerHTML = `
        <div class="barter-cart-section">
            <div class="barter-cart-section__title">${t('barter.selectedWeapons', 'Выбранное оружие')}</div>
            ${weaponsHtml}
        </div>

        <div class="barter-cart-section">
            <div class="barter-cart-section__title">${t('barter.totalSummary', 'Не хватает')}</div>
            ${materialRows ? `
                <table class="barter-cart-table">
                    <thead>
                        <tr>
                            <th>${t('barter.materials', 'Материалы')}</th>
                            <th>${t('barter.need', 'Нужно')}</th>
                            <th>${t('barter.have', 'Есть')}</th>
                            <th>${t('barter.missing', 'Не хватает')}</th>
                        </tr>
                    </thead>
                    <tbody>${materialRows}</tbody>
                </table>
            ` : `<div class="barter-cart-meta__row"><span class="barter-cart-meta__label">${t('barter.allMaterialsCovered', 'Все материалы есть')}</span></div>`}
        </div>

        ${metaRows.length ? `
            <div class="barter-cart-section">
                <div class="barter-cart-section__title">${t('barter.summary', 'Итого')}</div>
                <div class="barter-cart-meta">${metaRows.join('')}</div>
            </div>
        ` : ''}
    `;

    elements.cartBody.querySelectorAll('[data-cart-qty]').forEach(button => {
        button.addEventListener('click', () => {
            const groupKey = button.dataset.groupKey;
            if (button.dataset.cartQty === 'inc') {
                addOneToWeaponGroup(groupKey);
            } else {
                removeOneFromWeaponGroup(groupKey);
            }
        });
    });
}

function getCategoryWeaponOptions() {
    if (!currentCategory) return [];

    return currentCategory.nodes
        .filter(node => !node.locked)
        .map(node => {
            const weapon = getBarterWeapon(node, BASE_PATH);
            return {
                node,
                weapon,
                name: weapon ? getWeaponName(weapon) : node.id
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
}

function updateWeaponPickerValue(nodeId = null) {
    if (!elements.weaponPickerValue) return;

    if (!nodeId) {
        elements.weaponPickerValue.textContent = t('barter.searchWeapon', 'Выберите оружие...');
        elements.weaponPickerValue.classList.remove('barter-weapon-picker__value--selected');
        return;
    }

    const node = getBarterNodeById(currentCategory, nodeId);
    const weapon = node ? getBarterWeapon(node, BASE_PATH) : null;
    const name = weapon ? getWeaponName(weapon) : nodeId;

    elements.weaponPickerValue.textContent = name;
    elements.weaponPickerValue.classList.add('barter-weapon-picker__value--selected');
}

function renderWeaponPickerList() {
    if (!elements.weaponPickerList) return;

    const query = weaponPickerQuery.trim().toLowerCase();
    const options = getCategoryWeaponOptions().filter(option => {
        if (!query) return true;
        return option.name.toLowerCase().includes(query);
    });

    if (!options.length) {
        elements.weaponPickerList.innerHTML = `
            <div class="barter-weapon-picker__empty">${t('barter.weaponNotFound', 'Оружие не найдено')}</div>
        `;
        return;
    }

    elements.weaponPickerList.innerHTML = options.map(option => {
        const imagePath = option.weapon?.imagePath || '';
        const isActive = option.node.id === selectedNodeId;

        return `
            <button type="button"
                    class="barter-weapon-picker__item${isActive ? ' barter-weapon-picker__item--active' : ''}"
                    role="option"
                    data-node-id="${option.node.id}"
                    aria-selected="${isActive}">
                ${imagePath ? `<img class="barter-weapon-picker__item-img" src="${imagePath}" alt="" loading="lazy" decoding="async">` : ''}
                <span class="barter-weapon-picker__item-name">${option.name}</span>
            </button>
        `;
    }).join('');
}

function updateWeaponPickerMenuPosition() {
    const trigger = elements.weaponPickerTrigger;
    const menu = elements.weaponPickerMenu;
    if (!trigger || !menu || menu.hidden) return;

    const rect = trigger.getBoundingClientRect();
    menu.style.top = `${rect.bottom + 4}px`;
    menu.style.left = `${rect.left}px`;
    menu.style.width = `${rect.width}px`;
}

function setWeaponPickerOpen(isOpen) {
    weaponPickerOpen = isOpen;

    if (!elements.weaponPickerMenu || !elements.weaponPickerTrigger) return;

    elements.weaponPickerMenu.hidden = !isOpen;
    elements.weaponPickerTrigger.setAttribute('aria-expanded', String(isOpen));

    if (elements.weaponPickerValue) {
        elements.weaponPickerValue.hidden = isOpen;
    }
    if (elements.weaponSearchInput) {
        elements.weaponSearchInput.hidden = !isOpen;
    }

    if (isOpen) {
        if (elements.weaponSearchInput) {
            elements.weaponSearchInput.value = weaponPickerQuery;
        }
        renderWeaponPickerList();
        requestAnimationFrame(() => {
            updateWeaponPickerMenuPosition();
            elements.weaponSearchInput?.focus();
        });
    } else {
        weaponPickerQuery = '';
        if (elements.weaponSearchInput) {
            elements.weaponSearchInput.value = '';
        }
        updateWeaponPickerValue(selectedNodeId);
    }
}

function focusNodeInTree(nodeId, { openDetails = true } = {}) {
    const node = getBarterNodeById(currentCategory, nodeId);
    if (!node || node.locked) return;

    selectedNodeId = nodeId;
    selectedOfferIndex = 0;

    elements.tree?.querySelectorAll('.barter-node').forEach(el => {
        el.classList.toggle('barter-node--selected', el.dataset.nodeId === nodeId);
    });

    updateWeaponPickerValue(nodeId);
    setWeaponPickerOpen(false);

    if (openDetails) {
        openPanel(nodeId);
    }

    requestAnimationFrame(() => {
        const nodeEl = elements.tree?.querySelector(`[data-node-id="${nodeId}"]`);
        if (!nodeEl || !elements.viewport) return;

        const viewportRect = elements.viewport.getBoundingClientRect();
        const nodeRect = nodeEl.getBoundingClientRect();
        const targetLeft = elements.viewport.scrollLeft
            + (nodeRect.left - viewportRect.left)
            - (viewportRect.width / 2)
            + (nodeRect.width / 2);
        const targetTop = elements.viewport.scrollTop
            + (nodeRect.top - viewportRect.top)
            - (viewportRect.height / 2)
            + (nodeRect.height / 2);

        elements.viewport.scrollTo({
            left: Math.max(0, targetLeft),
            top: Math.max(0, targetTop),
            behavior: 'smooth'
        });
    });
}

function renderInventoryModal() {
    if (!elements.inventoryStats || !elements.inventoryBody) return;

    elements.inventoryStats.innerHTML = `
        <label class="barter-inventory-stat">
            <span class="barter-inventory-stat__label">${t('barter.level', 'Уровень персонажа')}</span>
            <input type="number"
                   class="barter-inventory-stat__input"
                   id="barterInventoryLevel"
                   min="0"
                   max="${MAX_PLAYER_LEVEL}"
                   step="1"
                   value="${Math.min(MAX_PLAYER_LEVEL, playerInventory.level || 0)}">
        </label>
        <label class="barter-inventory-stat">
            <span class="barter-inventory-stat__label">${t('barter.money', 'Деньги')}</span>
            <input type="number"
                   class="barter-inventory-stat__input"
                   id="barterInventoryMoney"
                   min="0"
                   step="1"
                   value="${playerInventory.money || 0}">
        </label>
        <label class="barter-inventory-stat">
            <span class="barter-inventory-stat__label barter-inventory-stat__label--cr">${t('barter.cr', 'CR')}</span>
            <input type="number"
                   class="barter-inventory-stat__input"
                   id="barterInventoryCr"
                   min="0"
                   step="1"
                   value="${playerInventory.cr || 0}">
        </label>
    `;

    const materials = getBarterMaterialsForInventory();
    elements.inventoryBody.innerHTML = `
        <div class="barter-inventory-grid">
            ${materials.map(entry => {
                const imagePath = getBarterMaterialImagePath(entry.id, BASE_PATH);
                const amount = playerInventory.materials[entry.id] || 0;

                return `
                    <div class="barter-inventory-cell">
                        <img class="barter-inventory-cell__icon" src="${imagePath}" alt="" loading="lazy" decoding="async">
                        <span class="barter-inventory-cell__name">${getBarterMaterialName(entry.material)}</span>
                        <div class="barter-inventory-cell__qty">
                            <button type="button" class="barter-inventory-cell__qty-btn" data-inventory-qty="dec" aria-label="−">−</button>
                            <input type="number"
                                   class="barter-inventory-cell__qty-input"
                                   data-material-id="${entry.id}"
                                   min="0"
                                   step="1"
                                   value="${amount}"
                                   inputmode="numeric"
                                   aria-label="${getBarterMaterialName(entry.material)}">
                            <button type="button" class="barter-inventory-cell__qty-btn" data-inventory-qty="inc" aria-label="+">+</button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function normalizeInventoryLevelInput() {
    const input = document.getElementById('barterInventoryLevel');
    if (!input) return 0;

    const level = Math.min(MAX_PLAYER_LEVEL, Math.max(0, Number(input.value) || 0));
    if (Number(input.value) !== level) {
        input.value = level;
    }

    return level;
}

function readInventoryForm() {
    const level = Math.min(MAX_PLAYER_LEVEL, Math.max(0, Number(document.getElementById('barterInventoryLevel')?.value) || 0));
    const money = Math.max(0, Number(document.getElementById('barterInventoryMoney')?.value) || 0);
    const cr = Math.max(0, Number(document.getElementById('barterInventoryCr')?.value) || 0);
    const materials = {};

    elements.inventoryBody?.querySelectorAll('[data-material-id]').forEach(input => {
        const amount = Math.max(0, Number(input.value) || 0);
        if (amount > 0) {
            materials[input.dataset.materialId] = amount;
        }
    });

    playerInventory = { level, money, cr, materials };
    savePlayerInventory();
    updateCartPanel();
}

function openInventoryModal() {
    if (!elements.inventoryModal) return;

    renderInventoryModal();
    elements.inventoryModal.classList.add('is-open');
    elements.inventoryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeInventoryModal() {
    if (!elements.inventoryModal) return;

    readInventoryForm();
    elements.inventoryModal.classList.remove('is-open');
    elements.inventoryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function clearPlayerInventory() {
    playerInventory = createEmptyPlayerInventory();
    savePlayerInventory();
    renderInventoryModal();
    updateCartPanel();
}

function initWeaponPicker() {
    if (!elements.weaponPicker) return;

    elements.weaponPickerTrigger?.addEventListener('click', (event) => {
        event.stopPropagation();

        if (event.target.closest('.barter-weapon-picker__arrow') && weaponPickerOpen) {
            setWeaponPickerOpen(false);
            return;
        }

        if (event.target === elements.weaponSearchInput) {
            return;
        }

        if (!weaponPickerOpen) {
            setWeaponPickerOpen(true);
        }
    });

    elements.weaponPickerTrigger?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            if (event.target === elements.weaponSearchInput) return;
            event.preventDefault();
            if (!weaponPickerOpen) {
                setWeaponPickerOpen(true);
            }
        }
    });

    elements.weaponSearchInput?.addEventListener('input', () => {
        weaponPickerQuery = elements.weaponSearchInput.value;
        renderWeaponPickerList();
    });

    elements.weaponPickerList?.addEventListener('click', (event) => {
        const item = event.target.closest('[data-node-id]');
        if (!item) return;

        focusNodeInTree(item.dataset.nodeId);
    });

    document.addEventListener('click', (event) => {
        if (!weaponPickerOpen) return;
        if (elements.weaponPicker?.contains(event.target)) return;
        setWeaponPickerOpen(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && weaponPickerOpen) {
            setWeaponPickerOpen(false);
        }
    });
}

function initCartPanel() {
    elements.cartFab?.addEventListener('click', toggleCartPanel);
    elements.cartClose?.addEventListener('click', closeCartPanel);
    elements.cartBackdrop?.addEventListener('click', closeCartPanel);
    elements.cartClear?.addEventListener('click', clearCraftList);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && cartPanelOpen) {
            closeCartPanel();
        }
    });
}

function initInventoryModal() {
    elements.inventoryBtn?.addEventListener('click', openInventoryModal);
    elements.inventoryClose?.addEventListener('click', closeInventoryModal);
    elements.inventoryBackdrop?.addEventListener('click', closeInventoryModal);
    elements.inventoryClear?.addEventListener('click', clearPlayerInventory);

    elements.inventoryModal?.addEventListener('input', () => {
        readInventoryForm();
    });

    elements.inventoryModal?.addEventListener('focusout', (event) => {
        if (event.target.id !== 'barterInventoryLevel') return;

        normalizeInventoryLevelInput();
        readInventoryForm();
    });

    elements.inventoryBody?.addEventListener('click', (event) => {
        const qtyBtn = event.target.closest('[data-inventory-qty]');
        if (!qtyBtn) return;

        event.preventDefault();
        event.stopPropagation();

        const cell = qtyBtn.closest('.barter-inventory-cell');
        const input = cell?.querySelector('[data-material-id]');
        if (!input) return;

        const delta = qtyBtn.dataset.inventoryQty === 'inc' ? 1 : -1;
        input.value = Math.max(0, (Number(input.value) || 0) + delta);
        readInventoryForm();
    });

    elements.inventoryBody?.addEventListener('mousedown', (event) => {
        if (!window.matchMedia('(pointer: fine)').matches) return;
        if (event.target.closest('[data-inventory-qty]')
            || event.target.closest('.barter-inventory-cell__qty-input')) return;

        const cell = event.target.closest('.barter-inventory-cell');
        if (!cell) return;

        const input = cell.querySelector('[data-material-id]');
        if (!input) return;

        event.preventDefault();
        input.focus();
        input.select();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && elements.inventoryModal?.classList.contains('is-open')) {
            closeInventoryModal();
        }
    });
}

function initElements() {
    elements.viewport = document.getElementById('barterViewport');
    elements.canvas = document.getElementById('barterCanvas');
    elements.linesSvg = document.getElementById('barterLines');
    elements.tree = document.getElementById('barterTree');
    elements.categorySelect = document.getElementById('barterCategorySelect');
    elements.panel = document.getElementById('barterPanel');
    elements.panelBody = document.getElementById('barterPanelBody');
    elements.panelTitle = document.getElementById('barterPanelTitle');
    elements.panelWeapon = document.getElementById('barterPanelWeapon');
    elements.panelWeaponImage = document.getElementById('barterPanelWeaponImage');
    elements.panelClose = document.getElementById('barterPanelClose');
    elements.chainToggle = document.getElementById('barterChainToggle');
    elements.cartFab = document.getElementById('barterCartFab');
    elements.cartBadge = document.getElementById('barterCartBadge');
    elements.cart = document.getElementById('barterCart');
    elements.cartBackdrop = document.getElementById('barterCartBackdrop');
    elements.cartClose = document.getElementById('barterCartClose');
    elements.cartClear = document.getElementById('barterCartClear');
    elements.cartBody = document.getElementById('barterCartBody');
    elements.cartTitle = document.getElementById('barterCartTitle');
    elements.weaponPicker = document.getElementById('barterWeaponPicker');
    elements.weaponPickerTrigger = document.getElementById('barterWeaponPickerTrigger');
    elements.weaponPickerMenu = document.getElementById('barterWeaponPickerMenu');
    elements.weaponPickerValue = document.getElementById('barterWeaponPickerValue');
    elements.weaponPickerList = document.getElementById('barterWeaponPickerList');
    elements.weaponSearchInput = document.getElementById('barterWeaponSearchInput');
    elements.inventoryBtn = document.getElementById('barterInventoryBtn');
    elements.inventoryModal = document.getElementById('barterInventoryModal');
    elements.inventoryBackdrop = document.getElementById('barterInventoryBackdrop');
    elements.inventoryClose = document.getElementById('barterInventoryClose');
    elements.inventoryClear = document.getElementById('barterInventoryClear');
    elements.inventoryStats = document.getElementById('barterInventoryStats');
    elements.inventoryBody = document.getElementById('barterInventoryBody');
}

function initCategorySelect() {
    if (!elements.categorySelect) return;

    elements.categorySelect.innerHTML = BARTER_CATEGORIES.map(category => `
        <option value="${category.id}">${getBarterCategoryName(category)}</option>
    `).join('');

    elements.categorySelect.addEventListener('change', () => {
        loadCategory(elements.categorySelect.value);
    });
}

function loadCategory(categoryId) {
    currentCategory = getBarterCategoryById(categoryId);
    selectedNodeId = null;
    selectedOfferIndex = 0;
    selectedWeapons = [];
    weaponPickerQuery = '';
    setWeaponPickerOpen(false);
    closeCartPanel();
    updateWeaponPickerValue();
    if (elements.weaponSearchInput) {
        elements.weaponSearchInput.value = '';
    }
    closePanel();
    renderTree({ center: true });
    updateCartPanel();
}

function getColumnNodes(columnIndex) {
    if (!currentCategory) return [];
    return currentCategory.nodes
        .filter(node => node.column === columnIndex)
        .sort((a, b) => a.row - b.row || a.id.localeCompare(b.id));
}

function getVisualRow(node) {
    return node.row - ROW_OFFSET;
}

function getCategoryRowCount() {
    if (!currentCategory?.nodes.length) return 0;
    return Math.max(...currentCategory.nodes.map(node => getVisualRow(node))) + 1;
}

function getRowStride() {
    return NODE_HEIGHT + ROW_GAP;
}

function getColumnGap() {
    if (!elements.tree) return 56;

    const gap = parseFloat(getComputedStyle(elements.tree).columnGap || getComputedStyle(elements.tree).gap);
    return Number.isFinite(gap) ? gap : 56;
}

function getColumnWidth() {
    if (!elements.tree) return NODE_WIDTH;

    const column = elements.tree.querySelector('.barter-column');
    if (!column) return NODE_WIDTH;

    const width = column.offsetWidth;
    return width > 0 ? width : NODE_WIDTH;
}

function getNodeWidth() {
    if (!elements.tree) return NODE_INNER_WIDTH;

    const width = parseFloat(getComputedStyle(elements.tree).getPropertyValue('--barter-node-width'));
    return Number.isFinite(width) && width > 0 ? width : NODE_INNER_WIDTH;
}

function getNodeOffsetX() {
    const columnWidth = getColumnWidth();
    const nodeWidth = getNodeWidth();
    const innerColumnWidth = columnWidth - COLUMN_BODY_PAD_X * 2;
    return COLUMN_BODY_PAD_X + Math.max(0, (innerColumnWidth - nodeWidth) / 2);
}

function getTreeWidth(columnCount) {
    const columnGap = getColumnGap();
    const columnWidth = getColumnWidth();
    return columnCount * columnWidth + Math.max(0, columnCount - 1) * columnGap;
}

function getNodePosition(node) {
    const columnGap = getColumnGap();
    const columnWidth = getColumnWidth();

    return {
        x: CANVAS_PAD_X + node.column * (columnWidth + columnGap) + getNodeOffsetX(),
        y: CANVAS_PAD_Y + COLUMN_HEADER_HEIGHT + COLUMN_BODY_PAD_TOP + getVisualRow(node) * getRowStride()
    };
}

function getColumnTopOffset(row) {
    return COLUMN_HEADER_HEIGHT + COLUMN_BODY_PAD_TOP + row * getRowStride();
}

function getNodeAnchor(node, side) {
    const nodeEl = elements.tree?.querySelector(`[data-node-id="${node.id}"]`);
    if (nodeEl && elements.canvas) {
        const canvasRect = elements.canvas.getBoundingClientRect();
        const nodeRect = nodeEl.getBoundingClientRect();
        const y = nodeRect.top - canvasRect.top + nodeRect.height / 2;

        if (side === 'right') {
            return { x: nodeRect.right - canvasRect.left, y };
        }

        return { x: nodeRect.left - canvasRect.left, y };
    }

    const pos = getNodePosition(node);
    const y = pos.y + NODE_HEIGHT / 2;
    const nodeWidth = getNodeWidth();

    if (side === 'right') {
        return { x: pos.x + nodeWidth, y };
    }

    return { x: pos.x, y };
}

function getColumnHeight(columnIndex) {
    const rowCount = getCategoryRowCount();
    if (!rowCount) return COLUMN_HEADER_HEIGHT;
    return getColumnTopOffset(rowCount - 1) + NODE_HEIGHT;
}

function syncTreeMetrics() {
    if (!elements.tree) return;
    elements.tree.style.setProperty('--barter-node-height', `${NODE_HEIGHT}px`);
    elements.tree.style.setProperty('--barter-row-gap', `${ROW_GAP}px`);
    elements.tree.style.setProperty('--barter-row-count', String(getCategoryRowCount()));
}

function renderTree({ center = false } = {}) {
    if (!currentCategory || !elements.tree) return;

    const rowCount = getCategoryRowCount();
    syncTreeMetrics();

    elements.tree.innerHTML = currentCategory.columns.map((column, columnIndex) => {
        const columnNodes = getColumnNodes(columnIndex);
        const nodeByRow = new Map(columnNodes.map(node => [getVisualRow(node), node]));

        let gridCells = '';
        for (let row = 0; row < rowCount; row++) {
            const node = nodeByRow.get(row);
            gridCells += node
                ? renderNode(node)
                : '<div class="barter-grid-spacer" aria-hidden="true"></div>';
        }

        return `
            <div class="barter-column" data-column="${columnIndex}">
                <div class="barter-column__header">
                    ${getBarterRankName(column.rank)}
                    <span class="barter-column__header-sep">|</span>
                    ${getBarterLocationName(column.location)}
                </div>
                <div class="barter-column__body">
                    <div class="barter-column__grid">
                        ${gridCells}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    elements.tree.querySelectorAll('.barter-node').forEach(nodeEl => {
        nodeEl.addEventListener('mousedown', () => {
            hasDragged = false;
        });
        nodeEl.addEventListener('click', handleNodeClick);

        const actionBtn = nodeEl.querySelector('.barter-node__action');
        actionBtn?.addEventListener('click', handleNodeActionClick);

        bindNodeRemoveButton(nodeEl);
    });

    updateWeaponListUi();

    requestAnimationFrame(() => {
        updateCanvasSize();
        drawConnections();
        finalizeCanvasLayout(center);
    });
}

function finalizeCanvasLayout(center = false) {
    if (center) {
        centerCanvas();
        return;
    }

    clampPan();
    applyPan(false);
}

function renderNode(node) {
    const weapon = getBarterWeapon(node, BASE_PATH);
    const name = weapon ? getWeaponName(weapon) : node.id;
    const isLocked = Boolean(node.locked);
    const isSelected = node.id === selectedNodeId;
    const imagePath = weapon?.imagePath || '';
    const count = getWeaponCount(node.id);
    const isAdded = count > 0;
    const actionLabel = isLocked
        ? t('barter.soon', 'Скоро')
        : t('barter.addWeapon', 'Добавить');

    const imageClass = isLocked
        ? 'barter-node__image barter-node__image--locked'
        : 'barter-node__image';
    const rarityClass = weapon?.rarity
        ? `barter-node__image-wrap--${weapon.rarity}`
        : 'barter-node__image-wrap--none';

    return `
        <div class="barter-node${isLocked ? ' barter-node--locked' : ''}${isSelected ? ' barter-node--selected' : ''}${isAdded ? ' barter-node--added' : ''}"
             data-node-id="${node.id}">
            ${isAdded ? buildNodeSelectionMarkup(count) : ''}
            <div class="barter-node__image-wrap ${rarityClass}">
                ${imagePath ? `<img class="${imageClass}" src="${imagePath}" alt="" loading="lazy" decoding="async">` : ''}
                ${isLocked ? `
                    <span class="barter-node__lock" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="5" y="11" width="14" height="10" rx="2"/>
                            <path d="M8 11V8a4 4 0 018 0v3"/>
                        </svg>
                    </span>
                ` : ''}
            </div>
            <div class="barter-node__body">
                <div class="barter-node__name">${name}</div>
                ${isLocked
                    ? `<span class="barter-node__action">${actionLabel}</span>`
                    : `<button type="button" class="barter-node__action${isAdded ? ' barter-node__action--added' : ''}">${actionLabel}</button>`
                }
            </div>
        </div>
    `;
}

function getBarterChildNodeIds(nodeId) {
    if (!currentCategory) return [];

    return currentCategory.nodes
        .filter(node => (node.parents || []).includes(nodeId))
        .map(node => node.id);
}

let hoveredNodeId = null;

function clearNodeHoverHighlight() {
    hoveredNodeId = null;
    elements.tree?.querySelectorAll('.barter-node--hover-source, .barter-node--hover-next')
        .forEach(el => el.classList.remove('barter-node--hover-source', 'barter-node--hover-next'));
    elements.linesSvg?.querySelectorAll('.barter-line--highlight')
        .forEach(el => el.classList.remove('barter-line--highlight'));
}

function setNodeHoverHighlight(nodeId) {
    if (!currentCategory || !elements.tree || !nodeId) return;
    if (hoveredNodeId === nodeId) return;

    clearNodeHoverHighlight();
    hoveredNodeId = nodeId;

    const childIds = getBarterChildNodeIds(nodeId);
    const sourceEl = elements.tree.querySelector(`[data-node-id="${nodeId}"]`);
    sourceEl?.classList.add('barter-node--hover-source');

    if (!childIds.length) return;

    childIds.forEach(childId => {
        elements.tree.querySelector(`[data-node-id="${childId}"]`)
            ?.classList.add('barter-node--hover-next');
    });

    elements.linesSvg?.querySelectorAll('.barter-line').forEach(line => {
        const from = line.dataset.from;
        const to = line.dataset.to;

        if (from === nodeId && childIds.includes(to)) {
            line.classList.add('barter-line--highlight');
        }
    });
}

function initNodeHoverHandlers() {
    if (!elements.tree || elements.tree.dataset.hoverBound === 'true') return;

    elements.tree.dataset.hoverBound = 'true';

    elements.tree.addEventListener('mouseover', (event) => {
        const nodeEl = event.target.closest('.barter-node');
        if (nodeEl) {
            setNodeHoverHighlight(nodeEl.dataset.nodeId);
            return;
        }

        clearNodeHoverHighlight();
    });

    elements.tree.addEventListener('mouseout', (event) => {
        if (!hoveredNodeId) return;

        const fromNode = event.target.closest('.barter-node');
        if (!fromNode) return;

        const related = event.relatedTarget;
        if (related && fromNode.contains(related)) return;
        if (related?.closest?.('.barter-node')) return;

        clearNodeHoverHighlight();
    });
}

function buildConnectionPath(start, end) {
    if (Math.abs(start.y - end.y) < 1) {
        return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }

    const cornerX = (start.x + end.x) / 2;
    return `M ${start.x} ${start.y} L ${cornerX} ${start.y} L ${cornerX} ${end.y} L ${end.x} ${end.y}`;
}

function drawConnections() {
    if (!currentCategory || !elements.linesSvg) return;

    const edges = [];
    currentCategory.nodes.forEach(node => {
        (node.parents || []).forEach(parentId => {
            edges.push({ from: parentId, to: node.id });
        });
    });

    let maxX = 0;
    let maxY = 0;

    currentCategory.nodes.forEach(node => {
        const pos = getNodePosition(node);
        maxX = Math.max(maxX, pos.x + NODE_WIDTH);
        maxY = Math.max(maxY, pos.y + NODE_HEIGHT);
    });

    elements.linesSvg.setAttribute('width', maxX);
    elements.linesSvg.setAttribute('height', maxY);
    elements.linesSvg.setAttribute('viewBox', `0 0 ${maxX} ${maxY}`);

    const paths = edges.map(edge => {
        const fromNode = getBarterNodeById(currentCategory, edge.from);
        const toNode = getBarterNodeById(currentCategory, edge.to);
        if (!fromNode || !toNode) return '';

        const start = getNodeAnchor(fromNode, 'right');
        const end = getNodeAnchor(toNode, 'left');

        return `<path class="barter-line" data-from="${edge.from}" data-to="${edge.to}" d="${buildConnectionPath(start, end)}"/>`;
    }).join('');

    elements.linesSvg.innerHTML = paths;
}

function syncColumnLanes(canvasHeight) {
    if (!currentCategory || !elements.canvas) return;

    let lanesContainer = elements.canvas.querySelector('.barter-column-lanes');
    if (!lanesContainer) {
        lanesContainer = document.createElement('div');
        lanesContainer.className = 'barter-column-lanes';
        lanesContainer.setAttribute('aria-hidden', 'true');
        elements.canvas.insertBefore(lanesContainer, elements.canvas.firstChild);
    }

    const columnWidth = getColumnWidth();
    const columnGap = getColumnGap();
    const laneHeight = Math.max(canvasHeight, 0);

    lanesContainer.style.height = `${laneHeight}px`;
    lanesContainer.innerHTML = currentCategory.columns.map((_, columnIndex) => {
        const left = CANVAS_PAD_X + columnIndex * (columnWidth + columnGap);
        return `<div class="barter-column-lane" style="left:${left}px;width:${columnWidth}px;height:${laneHeight}px"></div>`;
    }).join('');
}

function updateCanvasSize() {
    if (!currentCategory || !elements.canvas || !elements.tree) return;

    const columnCount = currentCategory.columns.length;
    const contentHeight = getColumnHeight(0);
    const viewportHeight = elements.viewport?.clientHeight || 0;
    const contentCanvasHeight = contentHeight + CANVAS_PAD_Y + CANVAS_PAD_BOTTOM;
    const canvasHeight = Math.max(contentCanvasHeight, viewportHeight);
    const treeHeight = canvasHeight - CANVAS_PAD_Y - CANVAS_PAD_BOTTOM;

    elements.tree.style.width = '';
    elements.tree.style.height = `${treeHeight}px`;
    elements.tree.style.minHeight = `${treeHeight}px`;

    const treeWidth = Math.max(getTreeWidth(columnCount), elements.tree.scrollWidth);
    elements.canvas.style.width = `${treeWidth + CANVAS_PAD_X * 2}px`;
    elements.canvas.style.height = `${canvasHeight}px`;
    syncColumnLanes(canvasHeight);
    updateCanvasCentering();
    clampPan();
}

function updateCanvasCentering() {
    if (!elements.viewport || !elements.canvas) return;

    const viewportWidth = elements.viewport.clientWidth;
    const viewportHeight = elements.viewport.clientHeight;
    const canvasWidth = elements.canvas.offsetWidth;
    const canvasHeight = elements.canvas.offsetHeight;

    const marginX = canvasWidth <= viewportWidth
        ? Math.max(PAN_MARGIN_X, (viewportWidth - canvasWidth) / 2)
        : 0;
    const marginY = canvasHeight <= viewportHeight
        ? Math.max(PAN_MARGIN_Y, (viewportHeight - canvasHeight) / 2)
        : 0;

    elements.canvas.style.marginLeft = `${marginX}px`;
    elements.canvas.style.marginTop = `${marginY}px`;
}

function getPanBounds() {
    if (!elements.viewport) {
        return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    return {
        minX: 0,
        maxX: Math.max(0, elements.viewport.scrollWidth - elements.viewport.clientWidth),
        minY: 0,
        maxY: Math.max(0, elements.viewport.scrollHeight - elements.viewport.clientHeight)
    };
}

function clampPan() {
    if (!elements.viewport) return;

    const { minX, maxX, minY, maxY } = getPanBounds();
    elements.viewport.scrollLeft = Math.min(maxX, Math.max(minX, elements.viewport.scrollLeft));
    elements.viewport.scrollTop = Math.min(maxY, Math.max(minY, elements.viewport.scrollTop));
}

function applyPan(shouldClamp = true) {
    if (shouldClamp) clampPan();
}

function centerCanvas() {
    if (!elements.viewport || !elements.canvas) return;

    updateCanvasCentering();
    elements.viewport.scrollLeft = 0;
    elements.viewport.scrollTop = 0;
    clampPan();
}

function endPan() {
    isDragging = false;
    elements.viewport?.classList.remove('is-dragging');
}

function initPanAndZoom() {
    if (!elements.viewport) return;

    elements.viewport.addEventListener('mousedown', (event) => {
        if (event.button !== 0) return;
        if (event.target.closest('.barter-node')) return;

        isDragging = true;
        hasDragged = false;
        dragStartX = event.clientX;
        dragStartY = event.clientY;
        scrollStartX = elements.viewport.scrollLeft;
        scrollStartY = elements.viewport.scrollTop;
        elements.viewport.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        const dx = event.clientX - dragStartX;
        const dy = event.clientY - dragStartY;

        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            hasDragged = true;
        }

        elements.viewport.scrollLeft = scrollStartX - dx;
        elements.viewport.scrollTop = scrollStartY - dy;
        clampPan();
    });

    window.addEventListener('mouseup', endPan);
    window.addEventListener('blur', endPan);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) endPan();
    });

    elements.viewport.addEventListener('touchstart', (event) => {
        if (event.target.closest('.barter-node')) return;
        if (event.touches.length !== 1) return;

        isDragging = true;
        hasDragged = false;
        dragStartX = event.touches[0].clientX;
        dragStartY = event.touches[0].clientY;
        scrollStartX = elements.viewport.scrollLeft;
        scrollStartY = elements.viewport.scrollTop;
        elements.viewport.classList.add('is-dragging');
    }, { passive: true });

    elements.viewport.addEventListener('touchmove', (event) => {
        if (!isDragging || event.touches.length !== 1) return;

        event.preventDefault();

        const dx = event.touches[0].clientX - dragStartX;
        const dy = event.touches[0].clientY - dragStartY;

        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            hasDragged = true;
        }

        elements.viewport.scrollLeft = scrollStartX - dx;
        elements.viewport.scrollTop = scrollStartY - dy;
        clampPan();
    }, { passive: false });

    elements.viewport.addEventListener('touchend', endPan);
    elements.viewport.addEventListener('touchcancel', endPan);

    elements.viewport.addEventListener('wheel', (event) => {
        event.preventDefault();
        elements.viewport.scrollLeft += event.deltaX;
        elements.viewport.scrollTop += event.deltaY;
        clampPan();
    }, { passive: false });
}

function handleNodeActionClick(event) {
    event.stopPropagation();
    if (hasDragged) return;

    const nodeEl = event.currentTarget.closest('.barter-node');
    if (!nodeEl) return;

    const nodeId = nodeEl.dataset.nodeId;
    const node = getBarterNodeById(currentCategory, nodeId);
    if (!node || node.locked) return;

    addWeaponToList(nodeId);
}

function handleNodeRemoveClick(event) {
    event.stopPropagation();
    if (hasDragged) return;

    const nodeEl = event.currentTarget.closest('.barter-node');
    if (!nodeEl) return;

    removeOneWeaponFromNode(nodeEl.dataset.nodeId);
}

function handleNodeClick(event) {
    if (hasDragged) return;

    const nodeEl = event.currentTarget;
    const nodeId = nodeEl.dataset.nodeId;
    const node = getBarterNodeById(currentCategory, nodeId);

    if (!node || node.locked) return;

    selectedNodeId = nodeId;
    selectedOfferIndex = 0;
    elements.tree.querySelectorAll('.barter-node').forEach(el => {
        el.classList.toggle('barter-node--selected', el.dataset.nodeId === nodeId);
    });

    updateWeaponPickerValue(nodeId);
    openPanel(nodeId);
}

function openPanel(nodeId) {
    if (!elements.panel) return;
    elements.panel.classList.add('is-open');
    renderCalculator(nodeId);
}

function closePanel() {
    if (!elements.panel) return;
    elements.panel.classList.remove('is-open');
    selectedNodeId = null;
    selectedOfferIndex = 0;
    elements.tree?.querySelectorAll('.barter-node--selected').forEach(el => {
        el.classList.remove('barter-node--selected');
    });
    updateWeaponPickerValue();
    renderPanelEmpty();
}

function renderMaterialRow(entry, basePath = BASE_PATH) {
    const imagePath = getBarterMaterialImagePath(entry.id, basePath);
    const name = getBarterMaterialName(entry.material);

    return `
        <div class="barter-material">
            <div class="barter-material__left">
                <img class="barter-material__icon" src="${imagePath}" alt="" loading="lazy" decoding="async">
                <span class="barter-material__name">${name}</span>
            </div>
            <span class="barter-material__amount">${entry.amount} ${t('barter.pcs', 'шт.')}</span>
        </div>
    `;
}

function renderMaterialsSection(calc) {
    const totalsHtml = calc.materials.map(entry => renderMaterialRow(entry)).join('');

    if (!includeFullChain || calc.materialsByNode.length <= 1) {
        return totalsHtml;
    }

    const groupedHtml = calc.materialsByNode
        .filter(group => group.materials.length > 0)
        .map(group => {
            const { rankInfo } = group;
            const header = rankInfo
                ? `${rankInfo.rankName}<span class="barter-material-group__sep">|</span>${rankInfo.locationName}`
                : '';

            return `
                <div class="barter-material-group">
                    <div class="barter-material-group__head">${header}</div>
                    ${group.materials.map(entry => renderMaterialRow(entry)).join('')}
                </div>
            `;
        }).join('');

    return `
        ${totalsHtml}
        <div class="barter-calc-section" style="margin-top: var(--space-lg)">
            <div class="barter-calc-section__title">${t('barter.materialsByTier', 'По этапам')}</div>
            ${groupedHtml}
        </div>
    `;
}

function setPanelWeapon(weapon) {
    if (!elements.panelWeapon || !elements.panelWeaponImage) return;

    if (weapon?.imagePath) {
        elements.panelWeapon.hidden = false;
        elements.panelWeaponImage.src = weapon.imagePath;
        elements.panelWeaponImage.alt = getWeaponName(weapon);
    } else {
        elements.panelWeapon.hidden = true;
        elements.panelWeaponImage.removeAttribute('src');
        elements.panelWeaponImage.alt = '';
    }
}

function renderPanelEmpty() {
    if (!elements.panelBody) return;

    setPanelWeapon(null);

    elements.panelBody.innerHTML = `
        <div class="barter-panel__empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
            </svg>
            <span>${t('barter.panelHint', 'Выберите предмет в древе, чтобы рассчитать бартера')}</span>
        </div>
    `;
}

function renderOfferTabs(calc) {
    if (!calc.offers || calc.offers.length <= 1) return '';

    return `
        <div class="barter-calc-section">
            <div class="barter-calc-section__title">${t('barter.craftOffer', 'Вариант крафта')}</div>
            <div class="barter-offer-tabs" role="tablist">
                ${calc.offers.map((offer, index) => `
                    <button type="button"
                            class="barter-offer-tab${index === calc.offerIndex ? ' barter-offer-tab--active' : ''}"
                            data-offer-index="${index}"
                            role="tab"
                            aria-selected="${index === calc.offerIndex}">
                        ${getBarterOfferName(offer, index)}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function formatEventCost(amount) {
    const lang = window.i18n?.getCurrentLang() || 'ru';
    const formatted = lang === 'en'
        ? amount.toLocaleString('en-US')
        : amount.toLocaleString('ru-RU');
    return `${formatted} CR`;
}

function renderCostSummary(calc) {
    const rows = [];

    if (calc.totalCost > 0) {
        rows.push(`
            <div class="barter-calc-meta__row">
                <span class="barter-calc-meta__label">${t('barter.craftCost', 'Цена крафта')}</span>
                <span class="barter-calc-meta__value barter-calc-meta__value--accent">${formatPrice(calc.totalCost)}</span>
            </div>
        `);
    }

    if (calc.totalEventCost > 0) {
        rows.push(`
            <div class="barter-calc-meta__row">
                <span class="barter-calc-meta__label">${t('barter.eventCraftCost', 'Ивентовая валюта')}</span>
                <span class="barter-calc-meta__value barter-calc-meta__value--accent">${formatEventCost(calc.totalEventCost)}</span>
            </div>
        `);
    }

    if (!rows.length) {
        rows.push(`
            <div class="barter-calc-meta__row">
                <span class="barter-calc-meta__label">${t('barter.craftCost', 'Цена крафта')}</span>
                <span class="barter-calc-meta__value barter-calc-meta__value--accent">${formatPrice(0)}</span>
            </div>
        `);
    }

    return rows.join('');
}

function renderCalculator(nodeId) {
    const calc = calculateBarterRequirements(currentCategory, nodeId, includeFullChain, selectedOfferIndex);
    if (!calc || !elements.panelBody) return;

    const weapon = getBarterWeapon(calc.node, BASE_PATH);
    const weaponName = weapon ? getWeaponName(weapon) : calc.node.id;
    const showChainToggle = calc.usesChain;
    const effectiveIncludeChain = showChainToggle && includeFullChain;

    setPanelWeapon(weapon);

    if (elements.panelTitle) {
        elements.panelTitle.textContent = weaponName;
    }

    const prerequisitesHtml = calc.prerequisites.map(prereqId => {
        const prereq = getBarterPrerequisiteWeapon(prereqId, BASE_PATH);
        const name = prereq ? getWeaponName(prereq) : prereqId;
        const image = prereq?.imagePath
            ? `<img class="barter-prereq__image" src="${prereq.imagePath}" alt="">`
            : '';

        return `
            <div class="barter-prereq">
                ${image}
                <span class="barter-prereq__name">${name}</span>
            </div>
        `;
    }).join('');

    const materialsHtml = renderMaterialsSection(calc);

    const locationsHtml = calc.locations
        .map(loc => getBarterLocationName(loc))
        .join(', ');

    const chainHtml = effectiveIncludeChain && calc.chainNodes.length > 1
        ? `
            <div class="barter-calc-section">
                <div class="barter-calc-section__title">${t('barter.chain', 'Цепочка бартера')}</div>
                <div class="barter-chain-steps">
                    ${calc.chainNodes.map((chainNode, index) => {
                        const chainWeapon = getBarterWeapon(chainNode, BASE_PATH);
                        const chainName = chainWeapon ? getWeaponName(chainWeapon) : chainNode.id;
                        const isCurrent = index === calc.chainNodes.length - 1;
                        return `<div class="barter-chain-step${isCurrent ? ' barter-chain-step--current' : ''}">${chainName}</div>`;
                    }).join('')}
                </div>
            </div>
        `
        : '';

    const chainToggleHtml = showChainToggle
        ? `
            <label class="barter-calc-toggle">
                <input type="checkbox" id="barterChainToggleInner" ${includeFullChain ? 'checked' : ''}>
                <span>${t('barter.includeChain', 'Учитывать всю цепочку')}</span>
            </label>
        `
        : '';

    elements.panelBody.innerHTML = `
        ${renderOfferTabs(calc)}

        ${chainToggleHtml}

        ${chainHtml}

        <div class="barter-calc-section">
            <div class="barter-calc-section__title">${t('barter.prerequisites', 'Предыдущее снаряжение')}</div>
            ${prerequisitesHtml || `<span class="barter-calc-meta__label">${t('barter.noPrerequisites', 'Не требуется')}</span>`}
        </div>

        <div class="barter-calc-section">
            <div class="barter-calc-section__title">${effectiveIncludeChain && calc.materialsByNode.length > 1
                ? t('barter.materialsTotal', 'Материалы (итого)')
                : t('barter.materials', 'Материалы')}</div>
            ${materialsHtml}
        </div>

        <div class="barter-calc-section">
            <div class="barter-calc-section__title">${t('barter.summary', 'Итого')}</div>
            <div class="barter-calc-meta">
                ${renderCostSummary(calc)}
                <div class="barter-calc-meta__row">
                    <span class="barter-calc-meta__label">${t('barter.level', 'Уровень персонажа')}</span>
                    <span class="barter-calc-meta__value">${calc.maxLevel}</span>
                </div>
                <div class="barter-calc-meta__row">
                    <span class="barter-calc-meta__label">${t('barter.location', 'Локация')}</span>
                    <span class="barter-calc-meta__value">${locationsHtml}</span>
                </div>
            </div>
        </div>
    `;

    elements.panelBody.querySelectorAll('.barter-offer-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            selectedOfferIndex = Number(tab.dataset.offerIndex) || 0;
            syncWeaponListEntry(nodeId);
            renderCalculator(nodeId);
        });
    });

    const toggle = document.getElementById('barterChainToggleInner');
    if (toggle) {
        toggle.addEventListener('change', () => {
            includeFullChain = toggle.checked;
            syncWeaponListEntry(nodeId);
            renderCalculator(nodeId);
        });
    }
}

function initPanel() {
    elements.panelClose?.addEventListener('click', closePanel);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && elements.panel?.classList.contains('is-open')) {
            closePanel();
        }
    });
}

function init() {
    BASE_PATH = getBasePath();

    if (typeof BARTER_CATEGORIES === 'undefined' || typeof WEAPONS === 'undefined') {
        const main = document.querySelector('.barter-page');
        if (main) {
            main.innerHTML = `<div class="barter-panel__empty" style="padding:48px">${t('barter.loadError', 'Не удалось загрузить данные бартера')}</div>`;
        }
        return;
    }

    initElements();
    playerInventory = loadPlayerInventory();
    initBurgerMenu();
    initScrollEffects();
    initLangDropdownClose();
    initCategorySelect();
    initWeaponPicker();
    initInventoryModal();
    initCartPanel();
    initPanAndZoom();
    initNodeHoverHandlers();
    initPanel();
    renderPanelEmpty();
    updateCartPanel();

    const defaultCategory = BARTER_CATEGORIES[0];
    if (defaultCategory) {
        if (elements.categorySelect) {
            elements.categorySelect.value = defaultCategory.id;
        }
        loadCategory(defaultCategory.id);
    }

    window.addEventListener('resize', () => {
        updateCanvasSize();
        drawConnections();
        clampPan();
        updateWeaponPickerMenuPosition();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.i18n && typeof window.i18n.onReady === 'function') {
        window.i18n.onReady(init);
    } else {
        init();
    }
});

document.addEventListener('languageChanged', () => {
    if (!currentCategory) return;

    if (elements.categorySelect) {
        const currentValue = elements.categorySelect.value;
        elements.categorySelect.innerHTML = BARTER_CATEGORIES.map(category => `
            <option value="${category.id}">${getBarterCategoryName(category)}</option>
        `).join('');
        elements.categorySelect.value = currentValue;
    }

    renderTree();
    updateWeaponPickerValue(selectedNodeId);
    renderWeaponPickerList();
    updateWeaponListUi();

    if (elements.inventoryModal?.classList.contains('is-open')) {
        renderInventoryModal();
    }

    if (selectedNodeId) {
        renderCalculator(selectedNodeId);
    } else {
        renderPanelEmpty();
    }
});
