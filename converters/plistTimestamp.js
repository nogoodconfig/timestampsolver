const plistTimestampConverter = {
    name: 'Apple PList Timestamp',
    description: 'Apple Property List timestamp in seconds since January 1, 2001',
    infoUrl: 'https://developer.apple.com/documentation/foundation/date',
    
    // Cocoa reference date in Unix timestamp seconds
    COCOA_REFERENCE: 978307200, // Unix timestamp for 2001-01-01 00:00:00
    
    isValid(input) {
        const num = this.parseInput(input);
        // Allow negative values (dates before 2001) up to about year 2100
        return !isNaN(num) && num > -978307200 && num < 3124137600;
    },

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

    convert(input) {
        return Math.floor(this.parseInput(input));
    },

    toDate(timestamp) {
        return new Date((timestamp + this.COCOA_REFERENCE) * 1000);
    }
}; 