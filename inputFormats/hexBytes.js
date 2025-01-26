const hexBytesFormat = {
    name: 'Hex Bytes',
    
    matches(input) {
        // Match sequence of "0x" followed by 1-2 hex digits, optionally separated by spaces
        return /^(0x[0-9a-f]{1,2}\s*)+$/i.test(input);
    },
    
    convert(input) {
        try {
            // Remove spaces and split by "0x", filter empty strings
            const bytes = input.replace(/\s+/g, '').split('0x').filter(Boolean);
            
            // Convert to regular hex string
            const hex = '0x' + bytes.map(b => b.padStart(2, '0')).join('');
            
            // Try both regular and big number conversion
            const regular = parseInt(hex, 16);
            const big = Number(BigInt(hex));
            
            // Return both interpretations if they're different
            return [...new Set([regular, big])].filter(n => !isNaN(n));
        } catch (e) {
            return [];
        }
    }
}; 