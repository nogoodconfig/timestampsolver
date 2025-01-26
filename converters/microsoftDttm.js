const microsoftDttmConverter = {
    id: 'microsoftDttm',
    name: 'Microsoft DTTM Structure',
    description: 'Converts Microsoft SQL Server DTTM structure (8 bytes)',
    infoUrl: 'https://learn.microsoft.com/en-us/openspecs/sql_server_protocols/ms-binxml/5c039420-15bd-4951-9979-9966b7f89d7c',

    isValid: function(input) {
        // DTTM is typically represented as 8 hex bytes
        return /^([0-9A-Fa-f]{2}\s*){8}$/.test(input);
    },

    parseInput: function(input) {
        // Remove spaces and convert to array of bytes
        return input.replace(/\s+/g, '').match(/.{1,2}/g) || [];
    },

    convert: function(input) {
        const bytes = this.parseInput(input);
        if (bytes.length !== 8) return null;

        try {
            // First 2 bytes: days since 1900-01-01
            // Next 6 bytes: time in 3.33ms intervals
            const days = parseInt(bytes[1] + bytes[0], 16);
            const time = parseInt(bytes[7] + bytes[6] + bytes[5] + bytes[4] + bytes[3] + bytes[2], 16);
            
            // Convert days to milliseconds since 1900-01-01
            const msFromDays = days * 24 * 60 * 60 * 1000;
            // Convert time units (3.33ms) to milliseconds
            const msFromTime = Math.floor(time * 3.33);
            
            // Add milliseconds to 1900-01-01
            const baseDate = new Date(Date.UTC(1900, 0, 1));
            const timestamp = baseDate.getTime() + msFromDays + msFromTime;
            
            return new Date(timestamp);
        } catch {
            return null;
        }
    },

    toDate: function(input) {
        return this.convert(input);
    }
};

// Register the converter
if (typeof module !== 'undefined' && module.exports) {
    module.exports = microsoftDttmConverter;
} else if (typeof window !== 'undefined') {
    window.timestampConverters = window.timestampConverters || [];
    window.timestampConverters.push(microsoftDttmConverter);
} 