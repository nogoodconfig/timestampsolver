const epochSecondsConverter = {
    name: 'Unix Epoch (Seconds)',
    description: 'Unix timestamp in seconds since January 1, 1970',
    infoUrl: 'https://en.wikipedia.org/wiki/Unix_time',
    
    // Constants for validation
    MIN_TIMESTAMP: -62135596800, // 0001-01-01T00:00:00Z
    MAX_TIMESTAMP: 253402300799, // 9999-12-31T23:59:59Z
    
    isValid(input) {
        try {
            const num = typeof input === 'string' ? 
                (input.toLowerCase().startsWith('0x') ? BigInt(input) : Number(input)) :
                BigInt(input);
                
            return num >= BigInt(this.MIN_TIMESTAMP) && num <= BigInt(this.MAX_TIMESTAMP);
        } catch (e) {
            return false;
        }
    },

    convert(input) {
        const num = typeof input === 'string' ? 
            (input.toLowerCase().startsWith('0x') ? BigInt(input) : Number(input)) :
            BigInt(input);
            
        return Number(num);
    },

    toDate(timestamp) {
        return new Date(timestamp * 1000);
    }
}; 