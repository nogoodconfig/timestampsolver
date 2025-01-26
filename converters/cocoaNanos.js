const cocoaNanosConverter = {
    name: 'Cocoa Core Data (Nanoseconds)',
    description: 'Apple Cocoa Core Data timestamp in nanoseconds since January 1, 2001',
    infoUrl: 'https://developer.apple.com/documentation/corefoundation/cfabsolutetime',
    
    // Constants for validation
    COCOA_EPOCH_OFFSET: 978307200n, // Seconds between Unix epoch and Cocoa epoch
    MIN_TIMESTAMP: -978307200000000000n, // 1970-01-01T00:00:00.000000000Z (Unix epoch)
    MAX_TIMESTAMP: 252424193599999999999n, // 9999-12-31T23:59:59.999999999Z
    
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
            // Convert Cocoa nanoseconds to Unix nanoseconds
            const unixNanos = bigTimestamp + (this.COCOA_EPOCH_OFFSET * 1000000000n);
            // Convert to milliseconds for JavaScript Date
            const milliseconds = Number(unixNanos / 1000000n);
            const date = new Date(milliseconds);
            
            if (!isNaN(date.getTime())) {
                return date;
            }
        } catch (e) {}
        throw new Error('Invalid Cocoa nanosecond timestamp');
    }
}; 