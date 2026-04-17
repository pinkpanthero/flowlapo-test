document.addEventListener('DOMContentLoaded', () => {

    // Setup Customizer State
    const state = {
        basePrice: 40,
        options: {
            length: { price: 0, name: 'Standard' },
            fabric: { price: 10, name: 'UV Glow Duo-Tone', imgKey: 'duotone' },
            core: { price: 0, name: 'Soft Tennis Balls' },
            grip: { price: 10, name: 'Silicone Knobs' }
        }
    };

    const priceDisplay = document.getElementById('live-price');
    const previewImg = document.getElementById('customizer-preview-img');
    const previewGlow = document.querySelector('.preview-glow');

    // Define Image sources - will be updated dynamically once images generated
    const imageMap = {
        'duotone': 'assets/duotone_poi.png', 
        'velvet': '', 
        'mesh': '' 
    };

    function updatePrice() {
        const total = state.basePrice + 
                      state.options.length.price + 
                      state.options.fabric.price + 
                      state.options.core.price + 
                      state.options.grip.price;
        
        // Simple animation for price
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = `$${total.toFixed(2)}`;
            priceDisplay.style.opacity = 1;
        }, 200);
    }

    function updateVisuals() {
        const fabricNode = document.querySelector('#fabric-options .active');
        const imgKey = fabricNode ? fabricNode.dataset.img : 'duotone';
        
        // Update Glow based on fabric selected
        if (imgKey === 'duotone') {
            previewGlow.style.background = 'var(--neon-purple)';
        } else if (imgKey === 'velvet') {
            previewGlow.style.background = 'var(--neon-magenta)';
        } else {
            previewGlow.style.background = 'var(--neon-cyan)';
        }

        // Just simulating an image switch effect
        previewImg.style.opacity = 0;
        setTimeout(() => {
            // Note: will update this dynamically with actual paths
            if (imageMap[imgKey]) {
                previewImg.src = imageMap[imgKey];
            } else {
                previewImg.src = imageMap['duotone']; // Fallback
            }
            previewImg.style.opacity = 1;
        }, 300);
    }

    // Option Button Handlers
    function setupOptionGroup(groupId, stateKey, isCard = false) {
        const container = document.getElementById(groupId);
        if (!container) return;
        
        const className = isCard ? '.opt-card' : '.opt-btn';
        const btns = container.querySelectorAll(className);
        
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active
                btns.forEach(b => b.classList.remove('active'));
                // Add active
                btn.classList.add('active');
                
                // Update State
                state.options[stateKey].price = parseFloat(btn.dataset.price || 0);
                state.options[stateKey].name = btn.dataset.val;

                if (stateKey === 'fabric') {
                    updateVisuals();
                }
                
                updatePrice();
            });
        });
    }

    setupOptionGroup('length-options', 'length');
    setupOptionGroup('fabric-options', 'fabric');
    setupOptionGroup('core-options', 'core', true);
    setupOptionGroup('grip-options', 'grip');

    // Initialize
    updatePrice();
    updateVisuals();

    // Vibe Cards Interactions
    const vibeCards = document.querySelectorAll('.vibe-card');
    vibeCards.forEach(card => {
        card.addEventListener('click', () => {
            vibeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Auto-select Customizer options based on vibe
            const vibeText = card.querySelector('h3').innerText;
            if (vibeText.includes('Beginner')) {
                document.querySelector('#length-options [data-val="Short"]').click();
                document.querySelector('#fabric-options [data-val="Aero Mesh"]').click();
                document.querySelector('#core-options [data-val="Soft Tennis Balls"]').click();
                document.querySelector('#grip-options [data-val="Fabric Loops"]').click();
            } else if (vibeText.includes('Performer')) {
                document.querySelector('#length-options [data-val="Standard"]').click();
                document.querySelector('#fabric-options [data-val="UV Glow Duo-Tone"]').click();
                document.querySelector('#core-options [data-val="Heavy Rubber Chips"]').click();
                document.querySelector('#grip-options [data-val="Silicone Knobs"]').click();
            } else if (vibeText.includes('Relax')) {
                document.querySelector('#length-options [data-val="Long"]').click();
                document.querySelector('#fabric-options [data-val="Crushed Velvet"]').click();
                document.querySelector('#core-options [data-val="Heavy Rubber Chips"]').click();
                document.querySelector('#grip-options [data-val="Silicone Knobs"]').click();
            }
        });
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const mobileToggleIcon = mobileToggle.querySelector('ion-icon');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            
            // Toggle Icon
            if (navLinks.classList.contains('nav-active')) {
                mobileToggleIcon.setAttribute('name', 'close-outline');
            } else {
                mobileToggleIcon.setAttribute('name', 'menu-outline');
            }
        });
    }

    // Mobile Dropdown Toggle
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                const parent = trigger.parentElement;
                parent.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking a link
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!link.classList.contains('dropdown-trigger')) {
                navLinks.classList.remove('nav-active');
                mobileToggleIcon.setAttribute('name', 'menu-outline');
            }
        });
    });

    // Assigning the dynamic images globally.
    // They will be loaded by checking the src elements in index.html and app.js
});
