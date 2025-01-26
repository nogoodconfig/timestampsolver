const sasDateConverter = {
    name: 'SAS Date (Days)',
    description: 'SAS date value in days since January 1, 1960',
    infoUrl: 'https://documentation.sas.com/doc/en/pgmsascdc/9.4/lrcon/p0ji1unv6thm0qn1gp181rkg4h0d.htm',
    
    // Constants for validation
    SECONDS_PER_DAY: 86400,
    SAS_EPOCH_OFFSET: 315619200, // Seconds between 1960-01-01 and Unix epoch (1970-01-01)
    MIN_TIMESTAMP: 0, // 1960-01-01
    MAX_TIMESTAMP: 2932896, // 9999-12-31
    
    isValid(input) {
        const num = this.parseInput(input);
        return num !== null && num >= this.MIN_TIMESTAMP && num <= this.MAX_TIMESTAMP;
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
        return Math.floor(this.parseInput(input));
    },

    toDate(days) {
        // Convert days to seconds since Unix epoch
        const seconds = (days * this.SECONDS_PER_DAY) - this.SAS_EPOCH_OFFSET;
        return new Date(seconds * 1000);
    }
}; 