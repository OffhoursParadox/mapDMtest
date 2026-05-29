'use strict';

function initBurgerMenu() {
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!burger || !mobileMenu) return;

    burger.addEventListener('click', () => {
        const isActive = burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        burger.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';

        const langDropdown = document.getElementById('langDropdown');
        if (langDropdown) {
            langDropdown.classList.remove('active');
        }
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu(burger, mobileMenu);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu(burger, mobileMenu);
            burger.focus();
        }
    });

    const mediaQuery = window.matchMedia('(min-width: 1025px)');
    mediaQuery.addEventListener('change', (e) => {
        if (e.matches && mobileMenu.classList.contains('active')) {
            closeMobileMenu(burger, mobileMenu);
        }
    });
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

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                header.classList.toggle('scrolled', scrollY > 50);

                if (scrollTopBtn) {
                    scrollTopBtn.classList.toggle('visible', scrollY > 300);
                }

                ticking = false;
            });
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
    document.addEventListener('click', (e) => {
        const langDropdown = document.getElementById('langDropdown');
        const langSwitcher = document.getElementById('langSwitcher');

        if (langDropdown && langSwitcher &&
            !langSwitcher.contains(e.target) &&
            !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
            langSwitcher.setAttribute('aria-expanded', 'false');
        }
    });
}
