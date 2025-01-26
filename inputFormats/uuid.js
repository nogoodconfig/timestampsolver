const uuidFormat = {
    name: 'UUID',
    
    matches(input) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input);
    },
    
    convert(input) {
        // Only process version 1 UUIDs (time-based)
        if (input.charAt(14) !== '1') return [];
        
        try {
            const parts = input.split('-');
            const timeLow = BigInt('0x' + parts[0]);
            const timeMid = BigInt('0x' + parts[1]);
            const timeHi = BigInt('0x' + parts[2].substr(1));
            
            // Reconstruct 60-bit timestamp
            const timestamp = (timeHi << 48n) | (timeMid << 32n) | timeLow;
            return [Number(timestamp)];
        } catch (e) {
            return [];
        }
    }
}; 