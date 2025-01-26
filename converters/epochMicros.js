const epochMicrosConverter = {
    name: 'Unix Epoch (Microseconds)',
    description: 'Unix timestamp in microseconds since January 1, 1970',
    infoUrl: 'https://en.wikipedia.org/wiki/Unix_time',
    
    isValid(input) {
        const num = this.parseInput(input);
        return num !== null && num > 1000000000000000 && num < 3000000000000000;
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
        return new Date(timestamp / 1000);
    }
}; 