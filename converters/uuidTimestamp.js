const uuidTimestampConverter = {
    name: 'UUID v1 Timestamp',
    description: 'UUID version 1 timestamp in 100-nanosecond intervals since October 15, 1582',
    infoUrl: 'https://www.ietf.org/rfc/rfc4122.txt',
    
    // Constants for validation
    UUID_EPOCH_OFFSET: 12219292800000n, // Milliseconds between 1582-10-15 and 1970-01-01
    TICKS_PER_MILLISECOND: 10000n,
    MIN_TIMESTAMP: 0n, // 1582-10-15T00:00:00.000Z
    MAX_TIMESTAMP: 2650467743999999999n, // 9999-12-31T23:59:59.999Z
    
    isValid(input) {
        try {
            // Strict UUID v1 format validation
            if (!/^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input)) {
                return false;
            }
            
            // Extract and validate version and variant bits
            const parts = input.split('-');
            const version = parseInt(parts[2].charAt(0), 16);
            const variant = parseInt(parts[3].charAt(0), 16);
            
            if (version !== 1 || !(variant >= 8 && variant <= 11)) {
                return false;
            }
            
            // Extract timestamp and validate range
            const timestamp = this.extractTimestamp(input);
            return timestamp >= this.MIN_TIMESTAMP && timestamp <= this.MAX_TIMESTAMP;
        } catch (e) {
            return false;
        }
    },

    convert(input) {
        return this.extractTimestamp(input).toString();
    },

    extractTimestamp(input) {
        const parts = input.split('-');
        const timeLow = BigInt('0x' + parts[0]);
        const timeMid = BigInt('0x' + parts[1]);
        const timeHi = BigInt('0x' + parts[2].substr(1));
        
        // Reconstruct 60-bit timestamp
        return (timeHi << 48n) | (timeMid << 32n) | timeLow;
    },

    toDate(timestamp) {
        try {
            const bigTimestamp = BigInt(timestamp);
            const unixTime = Number((bigTimestamp / this.TICKS_PER_MILLISECOND) - this.UUID_EPOCH_OFFSET);
            const date = new Date(unixTime);
            
            // Verify the date is valid
            if (!isNaN(date.getTime())) {
                return date;
            }
        } catch (e) {}
        throw new Error('Invalid UUID timestamp');
    }
}; 