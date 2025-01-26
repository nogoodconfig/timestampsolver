const cocoaMillisConverter = {
    id: 'cocoaMillis',
    name: 'Apple Cocoa (Milliseconds)',
    description: 'Apple Cocoa timestamp in milliseconds since January 1, 2001',
    infoUrl: 'https://developer.apple.com/documentation/foundation/date',
    
    // Cocoa reference date in Unix timestamp milliseconds
    COCOA_REFERENCE: 978307200000, // Unix timestamp for 2001-01-01 00:00:00
    
    isValid(input) {
        const num = this.parseInput(input);
        return num !== null && num > -978307200000 && num < 1000000000000;
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
        const num = this.parseInput(input);
        if (num === null) return null;
        const timestamp = Math.floor(num);
        const date = this.toDate(timestamp);
        return {
            raw: timestamp,
            formatted: dateFormatter.formatDate(date)
        };
    },

    toDate(timestamp) {
        return new Date(timestamp + this.COCOA_REFERENCE);
    }
}; 