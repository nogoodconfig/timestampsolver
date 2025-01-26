const bcdFormat = {
    name: 'BCD',
    
    matches(input) {
        // Match either:
        // 1. Continuous hex string of 12 or 14 digits
        // 2. Space-separated hex bytes (6 or 7 pairs)
        return /^[0-9a-f]{12,14}$/i.test(input.replace(/\s+/g, '')) ||
               /^([0-9a-f]{2}\s+){5,6}[0-9a-f]{2}$/i.test(input);
    },
    
    convert(input) {
        try {
            // Remove spaces and convert each hex digit to decimal
            const hex = input.replace(/\s+/g, '');
            const bcd = hex.split('').map(h => parseInt(h, 16)).join('');
            return [parseInt(bcd, 10)];
        } catch (e) {
            return [];
        }
    }
}; 