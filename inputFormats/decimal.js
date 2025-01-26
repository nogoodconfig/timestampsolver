const decimalFormat = {
    name: 'Decimal',
    
    matches(input) {
        // Match decimal numbers including scientific notation
        return /^-?\d*\.?\d+(?:[eE][+-]?\d+)?$/.test(input.trim());
    },
    
    convert(input) {
        try {
            const cleanInput = input.trim();
            const num = Number(cleanInput);
            
            // Ensure it's a valid finite number within safe integer range
            if (!isNaN(num) && isFinite(num)) {
                // For scientific notation, also try the expanded form
                const values = new Set([num]);
                
                if (cleanInput.includes('e') || cleanInput.includes('E')) {
                    // Try to convert to regular decimal
                    const expanded = num.toFixed(20).replace(/\.?0+$/, '');
                    const expandedNum = Number(expanded);
                    if (!isNaN(expandedNum) && isFinite(expandedNum)) {
                        values.add(expandedNum);
                    }
                }
                
                return Array.from(values);
            }
        } catch (e) {}
        return [];
    }
}; 