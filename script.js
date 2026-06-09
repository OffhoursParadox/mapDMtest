'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initBurgerMenu();
    initScrollEffects();
    initLangDropdownClose();
    initRfCopy();
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

function initRfCopy() {
    const liveRegion = document.getElementById('rfReceiverLive');
    const applyDefaultText = () => {
        const lang = localStorage.getItem('wiki-lang') || 'ru';
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
            const locationElement = item.querySelector('.rf-item__location');
            const location = item.dataset.location || (locationElement ? locationElement.textContent.trim() : '');

            if (!frequency) return;

            const copied = await copyTextToClipboard(frequency);
            showRfCopyFeedback(item, copied, location, frequency, liveRegion);
        });
    });

    applyDefaultText();
    document.addEventListener('languageChanged', applyDefaultText);
}

function showRfCopyFeedback(item, copied, location, frequency, liveRegion) {
    const lang = localStorage.getItem('wiki-lang') || 'ru';
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
            successLive: location ? `Frequency ${frequency} for ${location} copied to clipboard` : `Frequency ${frequency} copied to clipboard`,
            failedLive: 'Unable to copy frequency'
        };
    }

    return {
        defaultState: 'Нажмите, чтобы скопировать',
        copiedState: 'Скопировано',
        failedState: 'Не удалось скопировать',
        successTooltip: location ? `${location}: ${frequency} скопировано` : `${frequency} скопировано`,
        failedTooltip: 'Не удалось скопировать частоту',
        successLive: location ? `Частота ${frequency} для локации ${location} скопирована` : `Частота ${frequency} скопирована`,
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
            container.innerHTML = '<div class="updates-block__error"><span>!</span><p>Не удалось загрузить обновления</p></div>';
        });
}

function renderUpdates(updates, container) {
    const lang = localStorage.getItem('wiki-lang') || 'ru';

    if (!Array.isArray(updates) || updates.length === 0) {
        container.innerHTML = lang === 'en'
            ? '<div class="updates-block__empty">No updates yet</div>'
            : '<div class="updates-block__empty">Обновлений пока нет</div>';
        return;
    }

    container.innerHTML = updates.map((entry, index) => {
        const date = escapeHTML(localizeValue(entry.date, lang));
        const items = Array.isArray(entry.items) ? entry.items : [];
        const tag = `LOG ${String(index + 1).padStart(2, '0')}`;

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
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };

    return String(value).replace(/[&<>"']/g, char => map[char]);
}
