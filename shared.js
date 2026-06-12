'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initLanguageState();
});

function initBurgerMenu() {
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!burger || !mobileMenu) return;

    burger.addEventListener('click', () => {
        const isActive = burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        burger.setAttribute('aria-expanded', String(isActive));
        document.body.style.overflow = isActive ? 'hidden' : '';

        const langDropdown = document.getElementById('langDropdown');
        if (langDropdown) langDropdown.classList.remove('active');
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.addEventListener('click', () => closeMobileMenu(burger, mobileMenu));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu(burger, mobileMenu);
            burger.focus();
        }
    });

    const mediaQuery = window.matchMedia('(min-width: 1025px)');
    const closeOnDesktop = event => {
        if (event.matches && mobileMenu.classList.contains('active')) {
            closeMobileMenu(burger, mobileMenu);
        }
    };

    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', closeOnDesktop);
    } else if (mediaQuery.addListener) {
        mediaQuery.addListener(closeOnDesktop);
    }
}

function closeMobileMenu(burger, mobileMenu) {
    burger.classList.remove('active');
    mobileMenu.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

function initScrollEffects() {
    const header = document.getElementById('mainHeader');
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!header) return;

    let ticking = false;

    const updateScrollState = () => {
        const scrollY = window.scrollY;
        header.classList.toggle('scrolled', scrollY > 50);

        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', scrollY > 300);
        }

        ticking = false;
    };

    updateScrollState();

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollState);
            ticking = true;
        }
    }, { passive: true });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initLangDropdownClose() {
    document.addEventListener('click', (event) => {
        const langDropdown = document.getElementById('langDropdown');
        const langSwitcher = document.getElementById('langSwitcher');
        const langButton = langSwitcher ? langSwitcher.querySelector('.lang-switcher__btn') : null;

        if (langDropdown && langSwitcher && !langSwitcher.contains(event.target)) {
            langDropdown.classList.remove('active');
            if (langButton) langButton.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;

        const langDropdown = document.getElementById('langDropdown');
        const langSwitcher = document.getElementById('langSwitcher');
        const langButton = langSwitcher ? langSwitcher.querySelector('.lang-switcher__btn') : null;

        if (langDropdown && langDropdown.classList.contains('active')) {
            langDropdown.classList.remove('active');
            if (langButton) {
                langButton.setAttribute('aria-expanded', 'false');
                langButton.focus();
            }
        }
    });
}

function initLanguageState() {
    const savedLang = normalizeLang(localStorage.getItem('wiki-lang') || 'ru');
    applyLanguageState(savedLang);
}

function setLanguage(lang) {
    if (window.i18n && typeof window.i18n.setLanguage === 'function') {
        window.i18n.setLanguage(lang);
    } else {
        const normalizedLang = normalizeLang(lang);
        localStorage.setItem('wiki-lang', normalizedLang);
        applyLanguageState(normalizedLang);
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: normalizedLang } }));
    }
}

function applyLanguageState(lang) {
    document.documentElement.lang = lang;

    const currentLang = document.querySelector('.lang-switcher__current');
    if (currentLang) currentLang.textContent = lang.toUpperCase();

    document.querySelectorAll('.lang-dropdown__item, .mobile-lang-btn').forEach(item => {
        item.classList.remove('active');
    });

    const activeDropdownItem = document.querySelector(`.lang-dropdown__item[data-lang="${lang}"]`);
    const activeMobileBtn = document.querySelector(`.mobile-lang-btn[data-lang="${lang}"]`);

    if (activeDropdownItem) activeDropdownItem.classList.add('active');
    if (activeMobileBtn) activeMobileBtn.classList.add('active');
}

function normalizeLang(lang) {
    return lang === 'en' ? 'en' : 'ru';
}

window.toggleLangDropdown = function() {
    const dropdown = document.getElementById('langDropdown');
    const switcher = document.getElementById('langSwitcher');
    const button = switcher ? switcher.querySelector('.lang-switcher__btn') : null;
    if (!dropdown || !switcher) return;

    const isActive = dropdown.classList.toggle('active');
    if (button) button.setAttribute('aria-expanded', String(isActive));
};

window.setLanguage = setLanguage;
