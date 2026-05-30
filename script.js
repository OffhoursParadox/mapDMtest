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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.content-grid > *').forEach(el => {
        Object.assign(el.style, {
            opacity: '0',
            transform: 'translateY(24px)',
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        });
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = '.anim-visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    document.querySelectorAll('.rf-frequencies__grid .rf-item').forEach((item, i) => {
        const delay = i * 50;
        Object.assign(item.style, {
            opacity: '0',
            transform: 'translateY(12px)',
            transition: `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
        });
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 800 + delay);
    });
}

function initRfCopy() {
    document.querySelectorAll('.rf-item').forEach(item => {
        item.addEventListener('click', () => {
            const freqEl = item.querySelector('.rf-item__freq');
            if (!freqEl) return;

            const match = freqEl.textContent.trim().match(/\d+/);
            if (!match) return;

            const freq = match[0];
            const showFeedback = () => {
                const existing = item.querySelector('.rf-copied-tooltip');
                if (existing) existing.remove();

                item.classList.add('rf-item--copied');

                const tooltip = document.createElement('span');
                tooltip.className = 'rf-copied-tooltip';
                const lang = localStorage.getItem('wiki-lang') || 'ru';
                tooltip.textContent = lang === 'en' ? 'Copied!' : 'Скопировано!';
                item.appendChild(tooltip);

                setTimeout(() => {
                    item.classList.remove('rf-item--copied');
                    if (tooltip.parentNode) tooltip.remove();
                }, 1500);
            };

            if (navigator.clipboard?.writeText) {
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
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
}

function loadUpdates() {
    const container = document.getElementById('updatesContent');
    if (!container) return;

    fetch('updates.json')
        .then(res => {
            if (!res.ok) throw new Error(res.status);
            return res.json();
        })
        .then(updates => {
            renderUpdates(updates, container);
            document.addEventListener('languageChanged', () => renderUpdates(updates, container));
        })
        .catch(() => {
            container.innerHTML = '<p style="color:var(--c-text-2);padding:16px;">Не удалось загрузить обновления</p>';
        });
}

function renderUpdates(updates, container) {
    const lang = localStorage.getItem('wiki-lang') || 'ru';
    container.innerHTML = updates.map(entry => `
        <div class="update-entry">
            <span class="update-entry__date">${entry.date[lang] || entry.date.ru}</span>
            <ul class="update-entry__list">
                ${entry.items.map(item => `<li>${item[lang] || item.ru}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}
