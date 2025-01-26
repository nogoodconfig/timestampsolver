const irigTimecodeConverter = {
    id: 'irigTimecode',
    name: 'IRIG Timecode',
    description: 'IRIG-B timecode format (DDD:HH:MM:SS)',
    infoUrl: 'https://en.wikipedia.org/wiki/IRIG_timecode',
    
    isValid(value) {
        // Format: DDD:HH:MM:SS (day:hours:minutes:seconds)
        return /^(?:[0-2]\d\d|3[0-5]\d|36[0-6]):[0-1]\d|2[0-3]:[0-5]\d:[0-5]\d$/.test(value);
    },

    convert(value) {
        return value;
    },

    toDate(timecode) {
        const [days, hours, minutes, seconds] = timecode.split(':').map(Number);
        
        // Get current date for reference
        const now = new Date();
        const currentYear = now.getUTCFullYear();
        
        // Try current year first
        let date = this.createDateFromIRIG(currentYear, days, hours, minutes, seconds);
        
        // If the resulting date is more than 6 months in the future,
        // try previous year instead
        if (date.getTime() - now.getTime() > 180 * 24 * 60 * 60 * 1000) {
            date = this.createDateFromIRIG(currentYear - 1, days, hours, minutes, seconds);
        }
        // If the resulting date is more than 6 months in the past,
        // try next year instead
        else if (now.getTime() - date.getTime() > 180 * 24 * 60 * 60 * 1000) {
            date = this.createDateFromIRIG(currentYear + 1, days, hours, minutes, seconds);
        }
        
        return date;
    },
    
    createDateFromIRIG(year, days, hours, minutes, seconds) {
        const date = new Date(Date.UTC(year, 0, 1));
        date.setUTCDate(days);
        date.setUTCHours(hours, minutes, seconds);
        return date;
    }
}; 