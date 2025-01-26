const cocoaSecondsConverter = {
    id: 'cocoaSeconds',
    name: 'Apple Cocoa (Seconds)',
    description: 'Apple Cocoa/Core Data timestamp in seconds since January 1, 2001',
    infoUrl: 'https://developer.apple.com/documentation/foundation/nsdate',
    
    // Cocoa reference date in Unix timestamp
    COCOA_REFERENCE: 978307200, // Unix timestamp for 2001-01-01 00:00:00
    
    // Constants for validation
    MIN_TIMESTAMP: -978307200, // 1970-01-01T00:00:00Z (Unix epoch)
    MAX_TIMESTAMP: 252424193599, // 9999-12-31T23:59:59Z
    
    isValid(input) {
        const num = this.parseInput(input);
        return num !== null && num >= this.MIN_TIMESTAMP && num <= this.MAX_TIMESTAMP;
    },

    parseInput(input) {
        // Handle different input formats
        if (typeof input === 'string') {
            // Handle hex
            if (input.toLowerCase().startsWith('0x')) {
                return parseInt(input, 16);
            }
            // Handle binary
            if (input.toLowerCase().startsWith('0b')) {
                return parseInt(input.slice(2), 2);
            }
            // Handle decimal
            return parseFloat(input);
        }
        return input;
    },

    convert(input) {
        return Math.floor(this.parseInput(input));
    },

    toDate(timestamp) {
        return new Date((timestamp + this.COCOA_REFERENCE) * 1000);
    }
}; 