const webkitTimestampConverter = {
    id: 'webkitTimestamp',
    name: 'WebKit Timestamp',
    description: 'WebKit/Safari timestamp in microseconds since January 1, 1601',
    infoUrl: 'https://webkit.org/blog/',
    
    // Constants for validation
    WEBKIT_EPOCH_OFFSET: 11644473600000000n, // Microseconds between 1601 and 1970
    MIN_TIMESTAMP: 0n, // 1601-01-01T00:00:00.000000Z
    MAX_TIMESTAMP: 265571891200000000n, // 9999-12-31T23:59:59.999999Z
    
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
            const unixMicros = Number((bigTimestamp - this.WEBKIT_EPOCH_OFFSET) / 1000n) * 1000;
            const date = new Date(unixMicros);
            
            // Verify the date is valid
            if (!isNaN(date.getTime())) {
                return date;
            }
        } catch (e) {}
        throw new Error('Invalid WebKit timestamp');
    }
}; 