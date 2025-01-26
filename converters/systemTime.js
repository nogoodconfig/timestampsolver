const systemTimeConverter = {
    name: 'Windows SYSTEMTIME',
    description: 'Windows SYSTEMTIME structure (16-byte) containing date and time components',
    infoUrl: 'https://learn.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-systemtime',
    
    isValid(value) {
        // Expect 16 bytes in hex format
        if (!/^[0-9a-f]{32}$/i.test(value)) return false;
        
        // Extract and validate components
        const components = this.extractComponents(value);
        return components.year >= 1601 && components.year <= 30827 &&
               components.month >= 1 && components.month <= 12 &&
               components.day >= 1 && components.day <= 31 &&
               components.hour >= 0 && components.hour <= 23 &&
               components.minute >= 0 && components.minute <= 59 &&
               components.second >= 0 && components.second <= 59;
    },

    convert(value) {
        return value;
    },

    extractComponents(hex) {
        // SYSTEMTIME is little-endian 16-bit values
        const words = hex.match(/.{4}/g).map(w => 
            parseInt(w.slice(2, 4) + w.slice(0, 2), 16));
        return {
            year: words[0],
            month: words[1],
            dayOfWeek: words[2],
            day: words[3],
            hour: words[4],
            minute: words[5],
            second: words[6],
            milliseconds: words[7]
        };
    },

    toDate(hex) {
        const c = this.extractComponents(hex);
        return new Date(Date.UTC(c.year, c.month - 1, c.day, 
                                c.hour, c.minute, c.second, c.milliseconds));
    }
}; 