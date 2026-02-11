// Quote Calculator
document.addEventListener('DOMContentLoaded', function() {
    const calcSpace = document.getElementById('calcSpace');
    const calcSpaceValue = document.getElementById('calcSpaceValue');
    const calcEquipment = document.getElementById('calcEquipment');
    const calcType = document.getElementById('calcType');
    const calcButton = document.getElementById('calcButton');
    
    // Update space value display
    if (calcSpace && calcSpaceValue) {
        calcSpace.addEventListener('input', function() {
            calcSpaceValue.textContent = this.value;
        });
    }
    
    // Calculate estimate
    if (calcButton) {
        calcButton.addEventListener('click', function() {
            calculateEstimate();
        });
        
        // Also calculate when any input changes
        if (calcSpace) calcSpace.addEventListener('change', calculateEstimate);
        if (calcEquipment) calcEquipment.addEventListener('change', calculateEstimate);
        if (calcType) calcType.addEventListener('change', calculateEstimate);
        
        // Calculate on page load
        calculateEstimate();
    }
    
    function calculateEstimate() {
        const space = parseInt(calcSpace.value);
        const equipmentLevel = calcEquipment.value;
        const establishmentType = calcType.value;
        
        // Base cost per square meter (varies by equipment level)
        let costPerSqM = 0;
        switch(equipmentLevel) {
            case 'basico':
                costPerSqM = 200;
                break;
            case 'estandar':
                costPerSqM = 350;
                break;
            case 'premium':
                costPerSqM = 500;
                break;
        }
        
        // Establishment type multiplier
        let typeMultiplier = 1.0;
        switch(establishmentType) {
            case 'comercial':
                typeMultiplier = 1.0; // Commercial gyms are baseline
                break;
            case 'hotel':
                typeMultiplier = 1.2; // Hotels often need more aesthetic equipment
                break;
            case 'club':
                typeMultiplier = 0.9; // Sports clubs might need less variety
                break;
            case 'corporativo':
                typeMultiplier = 0.8; // Corporate gyms are usually smaller/simpler
                break;
        }
        
        // Calculate equipment cost
        const equipmentCost = space * costPerSqM * typeMultiplier;
        
        // Installation cost (15% of equipment cost)
        const installationCost = equipmentCost * 0.15;
        
        // Import cost (10% of equipment cost for Bolivia)
        const importCost = equipmentCost * 0.10;
        
        // Total cost
        const totalCost = equipmentCost + installationCost + importCost;
        
        // Update display
        document.getElementById('calcEquipmentCost').textContent = formatCurrency(equipmentCost);
        document.getElementById('calcInstallationCost').textContent = formatCurrency(installationCost);
        document.getElementById('calcImportCost').textContent = formatCurrency(importCost);
        document.getElementById('calcTotalCost').textContent = formatCurrency(totalCost);
    }
    
    function formatCurrency(amount) {
        return '$' + Math.round(amount).toLocaleString('es-BO');
    }
});
