const rfc2550Converter = {
    name: 'RFC 2550 Date',
    description: 'RFC 2550 Y10K-compliant date format',
    infoUrl: 'https://tools.ietf.org/html/rfc2550',
    
    isValid(value) {
        // Format: YYYY-MM-DD-HH-MM-SS-mmm-uuu-nnn-ppp
        return /^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-\d{3}-\d{3}-\d{3}-\d{3}$/.test(value);
    },

    convert(value) {
        return value;
    },

    toDate(value) {
        const parts = value.split('-').map(Number);
        const [year, month, day, hour, minute, second, milli, micro, nano, pico] = parts;
        
        // We can only represent down to millisecond precision with JavaScript Date
        return new Date(Date.UTC(year, month - 1, day, hour, minute, second, milli));
    }
}; 