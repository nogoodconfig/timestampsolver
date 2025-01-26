const gsmTimestampConverter = {
    name: 'GSM Timestamp',
    description: 'GSM/SMS timestamp in semi-octal format (YYMMDDHHMMSSZZ)',
    infoUrl: 'https://en.wikipedia.org/wiki/GSM_03.40',
    
    isValid(value) {
        // Check if string matches GSM timestamp format (14 digits)
        if (!/^\d{14}$/.test(value)) return false;
        
        // Extract components and validate ranges
        const components = this.extractComponents(value);
        return components.year >= 0 && components.year <= 99 &&
               components.month >= 1 && components.month <= 12 &&
               components.day >= 1 && components.day <= 31 &&
               components.hour >= 0 && components.hour <= 23 &&
               components.minute >= 0 && components.minute <= 59 &&
               components.second >= 0 && components.second <= 59;
    },

    convert(value) {
        return value;
    },

    extractComponents(value) {
        // Convert semi-octal to decimal (each digit 0-9 represents value 0-9)
        return {
            year: parseInt(value.slice(0, 2)),
            month: parseInt(value.slice(2, 4)),
            day: parseInt(value.slice(4, 6)),
            hour: parseInt(value.slice(6, 8)),
            minute: parseInt(value.slice(8, 10)),
            second: parseInt(value.slice(10, 12)),
            timezone: parseInt(value.slice(12, 14)) // Quarter hours from GMT
        };
    },

    toDate(value) {
        const c = this.extractComponents(value);
        const fullYear = c.year + (c.year < 70 ? 2000 : 1900);
        // Convert timezone offset from quarter hours to minutes
        const tzOffset = (c.timezone - 32) * 15;
        return new Date(Date.UTC(fullYear, c.month - 1, c.day, 
                                c.hour, c.minute - tzOffset, c.second));
    }
}; 