/**
 * Makkah Tech - Main Shared JavaScript
 * Centralized logic for Smooth Scrolling, Theme Toggle, Custom Cursor, and Navigation.
 */

// 1. Smooth Scrolling (Lenis)
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Shared Navigation & Theme Events
function initNavbarEvents() {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Persistence
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') body.classList.add('light');

    // Handle Active Link (Optimized for Clean URLs)
    const currentPath = window.location.pathname.replace(/\/$/, "");
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const cleanCurrentPage = currentPage.replace('.html', '');
        const cleanHref = href.replace('.html', '');

        const isExactMatch = cleanCurrentPage === cleanHref;
        const isIndexMatch = (cleanCurrentPage === 'index' || cleanCurrentPage === '') && cleanHref === 'index';
        const isServiceParent = (cleanCurrentPage === 'service-details' && cleanHref === 'services');

        if (isExactMatch || isIndexMatch || isServiceParent) {
            link.classList.add('text-primary-500', 'font-bold');
        }
    });

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light');
            localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
            gsap.fromTo(body, { opacity: 0.8 }, { opacity: 1, duration: 0.5 });
        });
    }

    // Navbar Scroll Effect
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                nav.classList.add('md:py-4');
                nav.classList.add('fixed');
                nav.classList.remove('absolute');
            } else {
                nav.classList.remove('md:py-4');
                nav.classList.remove('fixed');
                nav.classList.add('absolute');
            }
        });
    }

    // Mobile Menu & Pricing Accordion
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const pricingToggle = document.getElementById('pricing-toggle');
    const pricingSubmenu = document.getElementById('pricing-submenu');
    const pricingChevron = document.getElementById('pricing-chevron');

    let isMenuOpen = false;
    let isPricingOpen = false;

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            gsap.to(menu, {
                opacity: isMenuOpen ? 1 : 0,
                visibility: isMenuOpen ? 'visible' : 'hidden',
                duration: 0.01
            });

            const spans = menuBtn.querySelectorAll('span');
            gsap.to(spans[0], { rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 7 : 0, duration: 0.01 });
            gsap.to(spans[1], { opacity: isMenuOpen ? 0 : 1, duration: 0.01 });
            gsap.to(spans[2], { rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -7 : 0, duration: 0.01 });

            document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

            if (!isMenuOpen && pricingSubmenu) {
                pricingSubmenu.style.maxHeight = '0';
                if (pricingChevron) pricingChevron.style.transform = 'rotate(0deg)';
                isPricingOpen = false;
            }
        });
    }

    if (pricingToggle && pricingSubmenu) {
        pricingToggle.addEventListener('click', () => {
            isPricingOpen = !isPricingOpen;
            pricingSubmenu.style.maxHeight = isPricingOpen ? pricingSubmenu.scrollHeight + 'px' : '0';
            if (pricingChevron) pricingChevron.style.transform = isPricingOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    }
}

// Listen for components loaded event
document.addEventListener('componentsLoaded', () => {
    initNavbarEvents();
    initCursor();
});

// 3. Custom Cursor
function initCursor() {
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');

    if (!cursor || !cursorDot) return;

    // Use GSAP quickSetter for better performance
    const xSetCursor = gsap.quickSetter(cursor, "x", "px");
    const ySetCursor = gsap.quickSetter(cursor, "y", "px");
    const xSetDot = gsap.quickSetter(cursorDot, "x", "px");
    const ySetDot = gsap.quickSetter(cursorDot, "y", "px");

    // Center the cursor
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });

    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power2.out' });
        gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });

    // Hover effect on links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .filter-btn, .swiper-button-next, .swiper-button-prev');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, borderColor: '#2550ff', backgroundColor: 'rgba(37, 80, 255, 0.1)', duration: 0.3 });
            gsap.to(cursorDot, { scale: 0.5, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, borderColor: '#4f46e5', backgroundColor: 'transparent', duration: 0.3 });
            gsap.to(cursorDot, { scale: 1, duration: 0.3 });
        });
    });
}

// 6. GSAP Reveals (Data-AOS fade-up alternative)
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('[data-aos="fade-up"]').forEach(el => {
    const delay = el.getAttribute('data-aos-delay') ? parseInt(el.getAttribute('data-aos-delay')) / 1000 : 0;
    const duration = el.getAttribute('data-aos-duration') ? parseInt(el.getAttribute('data-aos-duration')) / 1000 : 1;

    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 90%'
        },
        y: 50,
        opacity: 0,
        duration: duration,
        delay: delay,
        ease: 'power3.out'
    });
});

// 7. Swiper Initializations (Only if elements exist)

// Hero Swiper
if (document.querySelector('.heroSwiper')) {
    new Swiper('.heroSwiper', {
        loop: true,
        speed: 1400,
        parallax: true,
        autoplay: { delay: 7000, disableOnInteraction: false },
        rtl: document.documentElement.dir === 'rtl',
        effect: 'creative',
        creativeEffect: {
            prev: { opacity: 0, translate: [0, 0, -400] },
            next: { opacity: 0, translate: [0, 0, -400] },
        },
        pagination: {
            el: '.hero-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + ' w-3 h-3 bg-white/20 light:bg-slate-200 rounded-full transition-all duration-300"></span>';
            }
        },
        navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' },
        on: {
            slideChangeTransitionStart: function () {
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    gsap.fromTo(activeSlide.querySelectorAll('.slide-content'),
                        { x: 100, opacity: 0 },
                        { x: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' }
                    );
                    gsap.fromTo(activeSlide.querySelector('.slide-image'),
                        { y: 100, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
                    );
                }
            }
        }
    });
}

// Services/Testimonials Swipers
const createGenericSwiper = (selector, breakpoints) => {
    if (document.querySelector(selector)) {
        new Swiper(selector, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: breakpoints
        });
    }
};

createGenericSwiper('.services-swiper', { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } });
createGenericSwiper('.testimonials-swiper', { 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } });

// Tech Swiper
if (document.querySelector('.tech-swiper')) {
    new Swiper('.tech-swiper', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 2500, disableOnInteraction: false },
        breakpoints: { 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 }, 1280: { slidesPerView: 6 } }
    });
}

// Logos Swiper
if (document.querySelector('.logos-swiper')) {
    new Swiper('.logos-swiper', {
        slidesPerView: 2,
        spaceBetween: 50,
        loop: true,
        speed: 5000,
        autoplay: { delay: 0, disableOnInteraction: false },
        breakpoints: { 480: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 6 } }
    });
}

// 8. Stats Counter-up Animation (Common for About/Home)
const stats = document.querySelectorAll('.stat-number');
if (stats.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.innerText);
                let count = 0;
                const duration = 2000;
                const increment = countTo / (duration / 16);

                const updateCount = () => {
                    count += increment;
                    if (count < countTo) {
                        target.innerText = Math.floor(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        target.innerText = countTo + (target.innerText.includes('+') ? '+' : '');
                    }
                };
                updateCount();
                observer.unobserve(target);
            }
        });
    }, { threshold: 1.0 });

    stats.forEach(stat => observer.observe(stat));
}

// 9. FAQ Accordion Logic
const faqBtns = document.querySelectorAll('.faq-btn');
if (faqBtns.length > 0) {
    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('i');
            const isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';

            faqBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.nextElementSibling.style.maxHeight = '0px';
                    const otherIcon = otherBtn.querySelector('i');
                    if (otherIcon) {
                        otherIcon.classList.replace('fa-minus', 'fa-plus');
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });

            if (isOpen) {
                content.style.maxHeight = '0px';
                if (icon) {
                    icon.classList.replace('fa-minus', 'fa-plus');
                    icon.style.transform = 'rotate(0deg)';
                }
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) {
                    icon.classList.replace('fa-plus', 'fa-minus');
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
}

// 10. Project Filtering (our_projects page)
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

if (filterBtns.length > 0 && projectItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            // Optimized batch animation
            const itemsToShow = [];
            const itemsToHide = [];

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    itemsToShow.push(item);
                } else {
                    itemsToHide.push(item);
                }
            });

            if (itemsToHide.length > 0) {
                gsap.to(itemsToHide, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.3,
                    display: 'none',
                    stagger: 0.02,
                    ease: 'power2.in'
                });
            }

            if (itemsToShow.length > 0) {
                gsap.fromTo(itemsToShow,
                    { opacity: 0, scale: 0.9, display: 'none' },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        display: 'block',
                        stagger: 0.05,
                        ease: 'power2.out',
                        delay: itemsToHide.length > 0 ? 0.2 : 0
                    }
                );
            }
        });
    });
}
