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

    const targets = document.querySelectorAll('.content-grid > *');
    if (!targets.length) return;

    targets.forEach(target => target.classList.add('reveal-pending'));

    if (!('IntersectionObserver' in window)) {
        targets.forEach(target => target.classList.add('anim-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
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
    document.querySelectorAll('.rf-item').forEach(item => {
        item.addEventListener('click', () => {
            const freqEl = item.querySelector('.rf-item__freq');
            const rawFrequency = item.dataset.frequency || (freqEl ? freqEl.textContent.trim() : '');
            const match = String(rawFrequency).match(/\d+/);
            if (!match) return;

            const freq = match[0];
            const freqLabel = freqEl ? freqEl.textContent.trim() : `${freq} МГц`;

            const showFeedback = () => {
                const existing = item.querySelector('.rf-copied-tooltip');
                if (existing) existing.remove();

                item.classList.add('rf-item--copied');

                const tooltip = document.createElement('span');
                tooltip.className = 'rf-copied-tooltip';
                const lang = localStorage.getItem('wiki-lang') || 'ru';
                tooltip.textContent = lang === 'en' ? `Copied ${freq} MHz` : `Скопировано ${freqLabel}`;
                item.appendChild(tooltip);

                window.setTimeout(() => {
                    item.classList.remove('rf-item--copied');
                    if (tooltip.parentNode) tooltip.remove();
                }, 1550);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(freq).then(showFeedback).catch(() => {
                    fallbackCopy(freq);
                    showFeedback();
                });
            } else {
                fallbackCopy(freq);
                showFeedback();
            }
        });
    });
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:fixed;opacity:0;left:-9999px;top:-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
    } catch (error) {}
    document.body.removeChild(textarea);
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
