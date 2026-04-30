document.addEventListener('DOMContentLoaded', () => {
    // State Object
    const state = {
        knobType: 'silicone',
        knobColor: '#CCFF00',
        fabricColor: '#CCFF00',
        stripeColor: '#CCFF00',
        filling: 'Rubber chips 100g',
        fillingWeight: '100',
        fillingName: 'RUBBER CHIPS'
    };

    // DOM Elements
    const elements = {
        layerFabric: document.getElementById('layer-fabric'),
        layerStrip: document.getElementById('layer-strip'),
        layerKnob: document.getElementById('layer-knob'),
        siliconeColorSection: document.getElementById('silicone-color-section'),
        configCards: document.querySelectorAll('.config-card'),
        fillingCards: document.querySelectorAll('.filling-card'),
        colorSwatches: document.querySelectorAll('.color-swatch')
    };

    // Initialize
    updatePreview();

    // Event Listeners for Cards
    elements.configCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.type;
            const val = card.dataset.val;

            if (type === 'knob') {
                state.knobType = val;
                elements.siliconeColorSection.style.display = val === 'silicone' ? 'block' : 'none';
            }

            // UI active state
            document.querySelectorAll(`[data-type="${type}"]`).forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            updatePreview();
        });
    });

    elements.fillingCards.forEach(card => {
        card.addEventListener('click', () => {
            state.filling = card.dataset.val;
            state.fillingWeight = card.dataset.weight;
            state.fillingName = card.dataset.name;

            // UI active state
            elements.fillingCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // Event Listeners for Color Swatches
    elements.colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const parentId = swatch.parentElement.id;
            const color = swatch.dataset.color;

            if (parentId === 'knob-colors') {
                state.knobColor = color;
            } else if (parentId === 'fabric-colors') {
                state.fabricColor = color;
            } else if (parentId === 'stripe-colors') {
                state.stripeColor = color;
            }

            // UI active state in its own palette
            swatch.parentElement.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            updatePreview();
        });
    });

    function getImagePath(type, hexColor) {
        const colorNames = {
            '#CCFF00': 'UV Yellow',
            '#FF5E00': 'UV Orange',
            '#FF00FF': 'UV Pink',
            '#39FF14': 'UV Green',
            '#000000': 'Black'
        };
        
        let colorName = colorNames[hexColor];
        if (!colorName) return '';

        if (type === 'Fabric') {
            if (colorName === 'Black') colorName = 'UV Black';
            return `assets/poi-builder/Fabric/Fabric ${colorName} - Test.png`;
        } else if (type === 'Knob') {
            return `assets/poi-builder/Knob/Knob ${colorName} - Test.png`;
        } else if (type === 'Strips') {
            return `assets/poi-builder/Strips/Strip ${colorName} - Test.png`;
        }
    }

    function updatePreview() {
        if (state.knobType === 'silicone') {
            elements.layerKnob.src = getImagePath('Knob', state.knobColor);
        } else {
            // Fallback
            elements.layerKnob.src = getImagePath('Knob', state.knobColor); 
        }

        elements.layerFabric.src = getImagePath('Fabric', state.fabricColor);
        elements.layerStrip.src = getImagePath('Strips', state.stripeColor);
    }
});
