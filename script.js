const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const header = document.querySelector('.header');
const scrollTopBtn = document.getElementById('scrollTop');

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        const langDropdown = document.getElementById('langDropdown');
        if (langDropdown) {
            langDropdown.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', () => {
    header.style.background = window.scrollY > 50 
        ? 'rgba(10, 10, 11, 0.98)' 
        : 'rgba(10, 10, 11, 0.9)';
    
    if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

document.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
        if (burger && mobileMenu) {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});