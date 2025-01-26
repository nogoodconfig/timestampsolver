const bcdExtendedTimestampConverter = {
    id: 'bcdExtendedTimestamp',
    name: 'Binary Coded Decimal (BCD) Extended',
    description: 'Converts Binary-Coded Decimal timestamps with extended year (7 bytes: YYYY MM DD HH MM SS)',
    infoUrl: 'https://www.digital-detective.net/binary-coded-decimal-timestamps/',

    isValid: function(input) {
        // Input should be a hex string of 14 digits (7 bytes)
        return typeof input === 'string' && /^[0-9a-f]{14}$/i.test(input);
    },

    convert: function(input) {
        if (!this.isValid(input)) return null;

        try {
            // Convert each hex digit to its decimal value
            const decimalDigits = input.split('').map(d => parseInt(d, 16));
            
            // Combine pairs of digits for the full year
            const year = decimalDigits[0] * 1000 + decimalDigits[1] * 100 + 
                        decimalDigits[2] * 10 + decimalDigits[3];
            const month = decimalDigits[4] * 10 + decimalDigits[5] - 1; // 0-based month
            const day = decimalDigits[6] * 10 + decimalDigits[7];
            const hour = decimalDigits[8] * 10 + decimalDigits[9];
            const minute = decimalDigits[10] * 10 + decimalDigits[11];
            const second = decimalDigits[12] * 10 + decimalDigits[13];

            // Validate components
            if (month < 0 || month > 11 || day < 1 || day > 31 ||
                hour > 23 || minute > 59 || second > 59) {
                return null;
            }

            // Return the raw timestamp value
            return input;
        } catch {
            return null;
        }
    },

    toDate: function(input) {
        if (!this.isValid(input)) return null;

        try {
            // Convert each hex digit to its decimal value
            const decimalDigits = input.split('').map(d => parseInt(d, 16));
            
            // Combine pairs of digits for the full year
            const year = decimalDigits[0] * 1000 + decimalDigits[1] * 100 + 
                        decimalDigits[2] * 10 + decimalDigits[3];
            const month = decimalDigits[4] * 10 + decimalDigits[5] - 1; // 0-based month
            const day = decimalDigits[6] * 10 + decimalDigits[7];
            const hour = decimalDigits[8] * 10 + decimalDigits[9];
            const minute = decimalDigits[10] * 10 + decimalDigits[11];
            const second = decimalDigits[12] * 10 + decimalDigits[13];

            // Validate components
            if (month < 0 || month > 11 || day < 1 || day > 31 ||
                hour > 23 || minute > 59 || second > 59) {
                return null;
            }
            
            return new Date(Date.UTC(year, month, day, hour, minute, second));
        } catch {
            return null;
        }
    }
}; 