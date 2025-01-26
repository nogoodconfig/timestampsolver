const bcdConverter = {
    id: 'bcdTimestamp',
    name: 'Binary Coded Decimal (BCD)',
    description: 'Converts Binary Coded Decimal (BCD) timestamps in various formats',
    infoUrl: 'https://en.wikipedia.org/wiki/Binary-coded_decimal',

    // BCD format: YYYYMMDDHHMMSS or YYMMDDHHMMSS
    isValid: function(input) {
        // Check if the input matches BCD pattern
        return /^[0-9A-Fa-f]{12,14}$/.test(input);
    },

    parseInput: function(input) {
        // Remove any non-hex characters
        return input.replace(/[^0-9A-Fa-f]/g, '');
    },

    convert: function(input) {
        const bcd = this.parseInput(input);
        const is2DigitYear = bcd.length === 12;
        let year, month, day, hour, minute, second;

        // Convert each BCD pair to decimal
        if (is2DigitYear) {
            year = parseInt(bcd.substring(0, 2), 16);
            // Assume years 00-69 are 2000-2069, 70-99 are 1970-1999
            year = year < 70 ? 2000 + year : 1900 + year;
            month = parseInt(bcd.substring(2, 4), 16) - 1; // 0-based month
            day = parseInt(bcd.substring(4, 6), 16);
            hour = parseInt(bcd.substring(6, 8), 16);
            minute = parseInt(bcd.substring(8, 10), 16);
            second = parseInt(bcd.substring(10, 12), 16);
        } else {
            year = parseInt(bcd.substring(0, 4), 16);
            month = parseInt(bcd.substring(4, 6), 16) - 1; // 0-based month
            day = parseInt(bcd.substring(6, 8), 16);
            hour = parseInt(bcd.substring(8, 10), 16);
            minute = parseInt(bcd.substring(10, 12), 16);
            second = parseInt(bcd.substring(12, 14), 16);
        }

        // Validate components
        if (month < 0 || month > 11 || day < 1 || day > 31 ||
            hour > 23 || minute > 59 || second > 59) {
            return null;
        }

        return new Date(Date.UTC(year, month, day, hour, minute, second));
    },

    toDate: function(input) {
        return this.convert(input);
    }
};

// Register the converter
if (typeof module !== 'undefined' && module.exports) {
    module.exports = bcdConverter;
} else if (typeof window !== 'undefined') {
    window.timestampConverters = window.timestampConverters || [];
    window.timestampConverters.push(bcdConverter);
} 