// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbarLinks = document.querySelector('.navbar-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navbarLinks.classList.toggle('active');
    });
}

// Landing Video to Image transition with fade
const landingVideo = document.getElementById('landing-video');
const landingImage = document.getElementById('landing-image');

if (landingVideo && landingImage) {
    landingVideo.addEventListener('ended', () => {
        // Fade out video
        landingVideo.style.opacity = '0';
        
        // After fade out, hide video and show image with fade in
        setTimeout(() => {
            landingVideo.style.display = 'none';
            landingImage.style.display = 'block';
            // Trigger reflow then fade in
            requestAnimationFrame(() => {
                landingImage.style.opacity = '1';
            });
        }, 1500);
    });
}

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Smooth scroll for nav links (fallback for browsers without CSS smooth scroll)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Close mobile menu after click
        navbarLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
});
