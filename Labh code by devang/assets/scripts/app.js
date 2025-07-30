document.addEventListener('DOMContentLoaded', function () {
    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('menu-btn');
    const servicesBtn = document.getElementById('services-btn');

    // Function to show active section and hide others
    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('hidden');
                section.classList.add('active');
            } else {
                section.classList.add('hidden');
                section.classList.remove('active');
            }
        });
    }

    // Function to update active nav link
    function setActiveLink(activeLink) {
        navLinks.forEach(link => {
            if (link === activeLink) {
                link.classList.add('nav-link-class');
            } else {
                link.classList.remove('nav-link-class');
            }
        });
    }

    // Add click event listeners to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);

            // Show corresponding section
            showSection(sectionId);

            // Update active link
            setActiveLink(this);

            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }

            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            // Toggle menu visibility
            mobileMenu.classList.toggle('show');
            mobileMenu.classList.toggle('hidden');

            // Toggle icons
            const openIcon = menuBtn.querySelector('.open');
            const closeIcon = menuBtn.querySelector('.close');

            if (openIcon && closeIcon) {
                openIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hidden');
                menuBtn.querySelector('.open')?.classList.remove('hidden');
                menuBtn.querySelector('.close')?.classList.add('hidden');
            }
        });

        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hidden');
                menuBtn.querySelector('.open')?.classList.remove('hidden');
                menuBtn.querySelector('.close')?.classList.add('hidden');
            });
        });
    }

    // Services button click handler
    if (servicesBtn) {
        servicesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('services');
            setActiveLink(document.querySelector('a[href="#services"]'));
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form submission handler
    const appointmentForm = document.getElementById('submit-btn');
    if (appointmentForm) {
        appointmentForm.addEventListener('click', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name')?.value;
            const phone = document.getElementById('phone')?.value;
            const email = document.getElementById('email')?.value;
            const test = document.getElementById('test')?.value;

            // Basic validation
            if (!name || !phone || !test) {
                alert('Please fill in all required fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Phone validation (Indian format)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }

            // Success message
            alert('Thank you for booking an appointment! We will contact you shortly.');

            // Reset form
            document.querySelector('form').reset();
        });
    }

    // Handle hash changes for browser back/forward buttons
    window.addEventListener('hashchange', function () {
        const sectionId = window.location.hash.substring(1) || 'home';
        showSection(sectionId);
        setActiveLink(document.querySelector(`a[href="#${sectionId}"]`));
    });

    // Show initial section based on URL hash or default to home
    const initialSection = window.location.hash.substring(1) || 'home';
    showSection(initialSection);
    setActiveLink(document.querySelector(`a[href="#${initialSection}"]`));
});