const hexBytesFormat = {
    name: 'Hex Bytes',
    
    matches(input) {
        // Match either:
        // 1. Sequence of "0x" followed by 1-2 hex digits, optionally separated by spaces
        // 2. Space-separated pairs of hex digits
        return /^(0x[0-9a-f]{1,2}\s*)+$/i.test(input) || 
               /^([0-9a-f]{2}\s*)+$/i.test(input);
    },
    
    convert(input) {
        try {
            let hex;
            if (input.includes('0x')) {
                // Remove spaces and split by "0x", filter empty strings
                const bytes = input.replace(/\s+/g, '').split('0x').filter(Boolean);
                // Convert to regular hex string
                hex = '0x' + bytes.map(b => b.padStart(2, '0')).join('');
            } else {
                // Remove spaces and join hex bytes
                hex = input.replace(/\s+/g, '');
            }
            
            // Try both regular and big number conversion
            const regular = parseInt(hex, 16);
            const big = Number(BigInt(hex));
            
            // Also return the raw hex string for BCD format
            const values = [...new Set([regular, big])].filter(n => !isNaN(n));
            
            // Add the raw hex string without 0x prefix
            values.push(hex.replace(/^0x/, ''));
            
            return values;
        } catch (e) {
            return [];
        }
    }
}; 