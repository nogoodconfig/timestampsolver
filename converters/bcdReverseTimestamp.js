const bcdReverseTimestampConverter = {
    id: 'bcdReverseTimestamp',
    name: 'Binary Coded Decimal (BCD) Reverse Nibble',
    description: 'Converts Binary-Coded Decimal timestamps with reversed nibbles (6 bytes: YY MM DD HH MM SS)',
    infoUrl: 'https://www.digital-detective.net/binary-coded-decimal-timestamps/',

    isValid: function(input) {
        // Input should be a hex string of 12 digits
        return typeof input === 'string' && /^[0-9a-f]{12}$/i.test(input);
    },

    reverseNibbles: function(input) {
        return input.split('').map(c => {
            const n = parseInt(c, 16);
            return ((n << 4) | (n >> 4) & 0xF).toString(16);
        }).join('');
    },

    convert: function(input) {
        if (!this.isValid(input)) return null;

        try {
            // First reverse the nibbles
            const reversed = this.reverseNibbles(input);
            
            // Convert each hex digit to its decimal value
            const decimalDigits = reversed.split('').map(d => parseInt(d, 16));
            
            // Combine pairs of digits
            const year = decimalDigits[0] * 10 + decimalDigits[1];
            const month = decimalDigits[2] * 10 + decimalDigits[3] - 1; // 0-based month
            const day = decimalDigits[4] * 10 + decimalDigits[5];
            const hour = decimalDigits[6] * 10 + decimalDigits[7];
            const minute = decimalDigits[8] * 10 + decimalDigits[9];
            const second = decimalDigits[10] * 10 + decimalDigits[11];

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
            // First reverse the nibbles
            const reversed = this.reverseNibbles(input);
            
            // Convert each hex digit to its decimal value
            const decimalDigits = reversed.split('').map(d => parseInt(d, 16));
            
            // Combine pairs of digits
            const year = decimalDigits[0] * 10 + decimalDigits[1];
            const month = decimalDigits[2] * 10 + decimalDigits[3] - 1; // 0-based month
            const day = decimalDigits[4] * 10 + decimalDigits[5];
            const hour = decimalDigits[6] * 10 + decimalDigits[7];
            const minute = decimalDigits[8] * 10 + decimalDigits[9];
            const second = decimalDigits[10] * 10 + decimalDigits[11];

            // Validate components
            if (month < 0 || month > 11 || day < 1 || day > 31 ||
                hour > 23 || minute > 59 || second > 59) {
                return null;
            }

            // Assume years 00-69 are 2000-2069, 70-99 are 1970-1999
            const fullYear = year < 70 ? 2000 + year : 1900 + year;
            
            return new Date(Date.UTC(fullYear, month, day, hour, minute, second));
        } catch {
            return null;
        }
    }
}; 