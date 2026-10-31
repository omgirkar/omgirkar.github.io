document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // 1. Preloader: full animation on the first visit of a session only
    let seen = false;
    try { seen = sessionStorage.getItem('seen') === '1'; sessionStorage.setItem('seen', '1'); } catch (e) {}
    let progress = seen ? 100 : 0;
    const percentText = document.getElementById('loader-percent');
    const fillBar = document.getElementById('loader-fill');
    
    if (seen) { document.body.classList.add('loaded'); document.body.classList.add('show-stickers'); }
    const interval = seen ? null : setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.body.classList.add('loaded');
                // Trigger sticker animations slightly after load
                setTimeout(() => {
                    document.body.classList.add('show-stickers');
                }, 800);
            }, 500);
        }
        percentText.innerText = progress + '%';
        fillBar.style.width = progress + '%';
    }, 70);

    // 2. Light/Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 3. Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-link, .mobile-menu .big-contact-btn');

    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(!mobileMenu.classList.contains('active')));
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) hamburger.click();
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 4. Blurry Fade-in on Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    fadeElements.forEach(el => observer.observe(el));
});