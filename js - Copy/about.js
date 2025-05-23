// about.js - JavaScript for Swasttik Plastic Industries About Page
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const closeMenu = document.querySelector('.close-menu');
    const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');
    const ctaSections = document.querySelectorAll('.cta-section');

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {threshold: 0.1});
  
  // Observe each CTA section
  ctaSections.forEach(section => {
    observer.observe(section);
  });

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileMenuBtn && closeMenu && overlay) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        closeMenu.addEventListener('click', toggleMobileMenu);
        overlay.addEventListener('click', toggleMobileMenu);
    }

    // Mobile Dropdown Toggle
    mobileDropdownTriggers.forEach(trigger => {
        const chevron = trigger.querySelector('i');
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const dropdown = this.querySelector('.mobile-dropdown');
            dropdown.classList.toggle('active');
            chevron.classList.toggle('fa-chevron-down');
            chevron.classList.toggle('fa-chevron-up');
        });
    });

    // Scroll Animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in-up, .mv-card, .timeline-item, .team-member, .footer-col');
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY || window.pageYOffset;

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top + scrollPosition;
            const elementVisible = 100;

            if (scrollPosition > elementPosition - windowHeight + elementVisible) {
                element.classList.add('visible');
            }
        });

        const header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('scrolled', scrollPosition > 50);
        }

        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            backToTopBtn.classList.toggle('active', scrollPosition > 300);
        }
    }

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                if (mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Mission/Vision Card Hover Effects
    const mvCards = document.querySelectorAll('.mv-card');
    mvCards.forEach(card => {
        const icon = card.querySelector('.mv-icon');

        card.addEventListener('mouseenter', () => {
            icon.style.backgroundColor = 'var(--accent-color)';
            icon.style.color = 'var(--white)';
        });

        card.addEventListener('mouseleave', () => {
            icon.style.backgroundColor = 'rgba(255, 102, 0, 0.1)';
            icon.style.color = 'var(--accent-color)';
        });
    });

    // Team Member Hover Effects
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        const img = member.querySelector('img');

        member.addEventListener('mouseenter', () => {
            if (img) img.style.borderColor = 'var(--accent-color)';
        });

        member.addEventListener('mouseleave', () => {
            if (img) img.style.borderColor = 'rgba(255, 102, 0, 0.1)';
        });
    });

    // Initialize scroll-based animations
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    animateOnScroll(); // Run once on page load
});
