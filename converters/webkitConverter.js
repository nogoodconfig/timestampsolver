const webkitConverter = {
    name: 'WebKit Timestamp',
    description: 'WebKit timestamp in microseconds since January 1, 1601',
    infoUrl: 'https://webkit.org/blog/179/dates-in-javascript/',
    
    // WebKit reference date in Unix timestamp microseconds
    WEBKIT_REFERENCE: -11644473600000000,
    
    isValid(input) {
        const num = this.parseInput(input);
        return num !== null && num > 0 && num < 1e17;
    },

    parseInput(input) {
        // ... same parseInput implementation ...
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
        return new Date((timestamp / 1000000 + 11644473600) * 1000);
    }
};

ConverterRegistry.register(webkitConverter); 