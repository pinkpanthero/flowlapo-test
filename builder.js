document.addEventListener('DOMContentLoaded', () => {
    // State Object
    const state = {
        knobType: 'silicone',
        knobColor: '#CCFF00',
        fabricColor: '#FF0000',
        stripeColor: '#CCFF00',
        filling: 'Rubber chips 100g',
        fillingWeight: '100',
        fillingName: 'RUBBER CHIPS'
    };

    // DOM Elements
    const elements = {
        svgKnob: document.getElementById('svg-knob'),
        svgSockBody: document.getElementById('svg-sock-body'),
        svgStripes: document.querySelectorAll('.stripe-rect'),
        knobWeightLabel: document.getElementById('knob-label-weight'),
        fillingNameLabel: document.getElementById('filling-label-name'),
        fillingWeightLabel: document.getElementById('filling-label-weight'),
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
            const weight = card.dataset.weight;

            if (type === 'knob') {
                state.knobType = val;
                // Show/Hide Silicone color palette
                elements.siliconeColorSection.style.display = val === 'silicone' ? 'block' : 'none';
                
                // Update weight label
                const oz = (weight / 28.35).toFixed(1);
                elements.knobWeightLabel.textContent = `${weight} g | ${oz} oz`;
                
                // If rubber, set a default gray color or keep current
                if (val === 'rubber') {
                    elements.svgKnob.setAttribute('fill', '#333');
                } else {
                    elements.svgKnob.setAttribute('fill', state.knobColor);
                }
            }

            // UI active state
            document.querySelectorAll(`[data-type="${type}"]`).forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    elements.fillingCards.forEach(card => {
        card.addEventListener('click', () => {
            state.filling = card.dataset.val;
            state.fillingWeight = card.dataset.weight;
            state.fillingName = card.dataset.name;

            // Updated labels
            elements.fillingNameLabel.textContent = state.fillingName;
            const oz = (state.fillingWeight / 28.35).toFixed(1);
            elements.fillingWeightLabel.textContent = `${state.fillingWeight} g | ${oz} oz`;

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

    function updatePreview() {
        // Update Knob
        if (state.knobType === 'silicone') {
            elements.svgKnob.setAttribute('fill', state.knobColor);
        } else {
            elements.svgKnob.setAttribute('fill', '#333'); // Rubber default
        }

        // Update Fabric
        elements.svgSockBody.setAttribute('fill', state.fabricColor);

        // Update Stripes
        elements.svgStripes.forEach(stripe => {
            stripe.setAttribute('fill', state.stripeColor);
        });
    }
});
