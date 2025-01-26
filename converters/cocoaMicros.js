const cocoaMicrosConverter = {
    id: 'cocoaMicros',
    name: 'Apple Cocoa (Microseconds)',
    description: 'Apple Cocoa timestamp in microseconds since January 1, 2001',
    infoUrl: 'https://developer.apple.com/documentation/foundation/date',
    
    // Cocoa reference date in Unix timestamp microseconds
    COCOA_REFERENCE: 978307200000000, // Unix timestamp for 2001-01-01 00:00:00
    
    parseInput(input) {
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

    isValid(input) {
        const num = this.parseInput(input);
        return !isNaN(num) && num > -978307200000000 && num < 1000000000000000;
    },

    convert(input) {
        return Math.floor(this.parseInput(input));
    },

    toDate(timestamp) {
        return new Date((timestamp / 1000) + this.COCOA_REFERENCE);
    }
}; 