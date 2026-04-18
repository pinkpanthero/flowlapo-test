document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        const mobileToggleIcon = mobileToggle.querySelector('ion-icon');

        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            
            // Toggle Icon
            if (navLinks.classList.contains('nav-active')) {
                mobileToggleIcon.setAttribute('name', 'close-outline');
            } else {
                mobileToggleIcon.setAttribute('name', 'menu-outline');
            }
        });

        // Close mobile menu when clicking a link
        const allNavLinks = navLinks.querySelectorAll('a');
        allNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // If it's a dropdown trigger on mobile, don't close yet
                if (window.innerWidth <= 900 && link.classList.contains('dropdown-trigger')) {
                    return;
                }
                
                navLinks.classList.remove('nav-active');
                if (mobileToggleIcon) {
                    mobileToggleIcon.setAttribute('name', 'menu-outline');
                }
            });
        });
    }

    // Mobile Dropdown Toggle
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 900) {
                // If the link is just a trigger and doesn't point anywhere (or we want to toggle first)
                // In this case, most are real links but we want to show the menu on mobile
                e.preventDefault();
                const parent = trigger.parentElement;
                parent.classList.toggle('active');
            }
        });
    });
});
