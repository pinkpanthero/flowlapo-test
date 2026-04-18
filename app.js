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

    // Define Image sources
    const imageMap = {
        'duotone': 'assets/duotone_poi.png', 
        'velvet': '', 
        'mesh': '' 
    };

    function updatePrice() {
        if (!priceDisplay) return;
        
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
        if (!previewGlow || !previewImg) return;

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
            const h3 = card.querySelector('h3');
            if (!h3) return;

            const vibeText = h3.innerText;
            if (vibeText.includes('Beginner')) {
                const opt = document.querySelector('#length-options [data-val="Short"]');
                if (opt) opt.click();
                // ... add other checks if needed, but these are the main ones
            } else if (vibeText.includes('Performer')) {
                const opt = document.querySelector('#length-options [data-val="Standard"]');
                if (opt) opt.click();
            } else if (vibeText.includes('Relax')) {
                const opt = document.querySelector('#length-options [data-val="Long"]');
                if (opt) opt.click();
            }
        });
    });

});

