/* =========================================================
   PRELOADER
========================================================= */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

/* =========================================================
   SCROLL PROGRESS
========================================================= */
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max > 0) {
        progressBar.style.width = (window.scrollY / max) * 100 + '%';
    }
}, { passive: true });

/* =========================================================
   STORY CATEGORY FILTER
========================================================= */
const categoryButtons = document.querySelectorAll('.category');
const storyCards = document.querySelectorAll('.story-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedCategory = button.dataset.category;

        categoryButtons.forEach(c => c.classList.remove('active'));
        button.classList.add('active');

        storyCards.forEach(card => {
            const cardCategory = card.dataset.category;
            card.style.display =
                (selectedCategory === 'all' || cardCategory === selectedCategory)
                    ? 'flex'
                    : 'none';
        });
    });
});

/* =========================================================
   MORE MENU (desktop + mobile)
========================================================= */
const mobileMoreButton = document.getElementById('mobileMoreButton');
const mobileMoreMenu = document.getElementById('mobileMoreMenu');
const desktopMoreButton = document.getElementById('desktopMoreButton');
const moreClose = document.getElementById('moreClose');

if (mobileMoreButton && mobileMoreMenu) {
    mobileMoreButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileMoreMenu.classList.toggle('open');
        mobileMoreButton.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (
            !mobileMoreMenu.contains(e.target) &&
            !mobileMoreButton.contains(e.target)
        ) {
            mobileMoreMenu.classList.remove('open');
            mobileMoreButton.classList.remove('active');
        }
    });

    mobileMoreMenu
        .querySelectorAll('a:not(#mobileThemeToggle)')
        .forEach(link => {
            link.addEventListener('click', () => {
                mobileMoreMenu.classList.remove('open');
                mobileMoreButton.classList.remove('active');
            });
        });
}

if (desktopMoreButton && mobileMoreMenu) {
    desktopMoreButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileMoreMenu.classList.toggle('open');
    });
}

if (moreClose && mobileMoreMenu) {
    moreClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileMoreMenu.classList.remove('open');
        if (mobileMoreButton) mobileMoreButton.classList.remove('active');
    });
}

/* =========================================================
   THEME TOGGLE (respects OS preference on first visit)
========================================================= */
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

const savedTheme = localStorage.getItem('theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const currentTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');

document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
    });
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
        themeToggle.setAttribute(
            'aria-label',
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }
    if (mobileThemeToggle) {
        const icon = mobileThemeToggle.querySelector('.theme-icon i');
        if (icon) {
            icon.className = theme === 'dark' ? 'bi bi-moon-stars' : 'bi bi-sun';
        }
    }
}

/* =========================================================
   BACK TO TOP
========================================================= */
const backToTopBtn = document.getElementById('back-to-top');
let backToTopTimer;

function showBackToTop() {
    if (!backToTopBtn) return;
    backToTopBtn.classList.add('show');
    clearTimeout(backToTopTimer);
    backToTopTimer = setTimeout(() => {
        backToTopBtn.classList.remove('show');
    }, 3000);
}

document.addEventListener('touchstart', () => {
    if (window.innerWidth <= 768) showBackToTop();
}, { passive: true });

window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) showBackToTop();
}, { passive: true });

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* =========================================================
   SCROLL REVEAL
========================================================= */
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));