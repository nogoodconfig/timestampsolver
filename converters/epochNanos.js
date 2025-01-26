const epochNanosConverter = {
    id: 'epochNanos',
    name: 'Unix Epoch (Nanoseconds)',
    description: 'Unix timestamp in nanoseconds since January 1, 1970',
    infoUrl: 'https://en.wikipedia.org/wiki/Unix_time',
    
    // Constants for validation
    MIN_TIMESTAMP: -62135596800000000000n, // 0001-01-01T00:00:00.000000000Z
    MAX_TIMESTAMP: 253402300799999999999n, // 9999-12-31T23:59:59.999999999Z
    
    isValid(input) {
        try {
            const num = typeof input === 'string' ? 
                (input.toLowerCase().startsWith('0x') ? BigInt(input) : BigInt(input)) :
                BigInt(input);
                
            return num >= this.MIN_TIMESTAMP && num <= this.MAX_TIMESTAMP;
        } catch (e) {
            return false;
        }
    },

    convert(input) {
        return BigInt(input).toString();
    },

    toDate(timestamp) {
        try {
            const bigTimestamp = BigInt(timestamp);
            // Convert nanoseconds to milliseconds
            const milliseconds = Number(bigTimestamp / 1000000n);
            const date = new Date(milliseconds);
            
            // Verify the date is valid
            if (!isNaN(date.getTime())) {
                return date;
            }
        } catch (e) {}
        throw new Error('Invalid nanosecond timestamp');
    }
}; 