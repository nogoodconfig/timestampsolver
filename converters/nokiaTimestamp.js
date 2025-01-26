const nokiaTimestampConverter = {
    id: 'nokiaTimestamp',
    name: 'Nokia Series 30/40',
    description: 'Nokia Series 30/40 timestamp format (YYYY-MM-DD-HH-MM-SS)',
    infoUrl: 'https://www.dcode.fr/nokia-3310-timestamp',
    
    isValid(value) {
        // Check format YYYY-MM-DD-HH-MM-SS
        if (!/^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/.test(value)) return false;
        
        const components = this.extractComponents(value);
        return components.year >= 1970 && components.year <= 2099 &&
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
        const parts = value.split('-');
        return {
            year: parseInt(parts[0]),
            month: parseInt(parts[1]),
            day: parseInt(parts[2]),
            hour: parseInt(parts[3]),
            minute: parseInt(parts[4]),
            second: parseInt(parts[5])
        };
    },

    toDate(value) {
        const c = this.extractComponents(value);
        return new Date(Date.UTC(c.year, c.month - 1, c.day, 
                                c.hour, c.minute, c.second));
    }
}; 