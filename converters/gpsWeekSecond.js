const gpsWeekSecondConverter = {
    name: 'GPS Week & Seconds',
    description: 'GPS Week Number and Seconds of Week (since January 6, 1980)',
    infoUrl: 'https://www.gps.gov/technical/icwg/IS-GPS-200K.pdf',
    
    // GPS epoch (1980-01-06)
    GPS_EPOCH: new Date(Date.UTC(1980, 0, 6)),
    SECONDS_PER_WEEK: 604800,

    isValid(value) {
        // Format: WWWW:SSSSS (week:seconds)
        if (!/^\d{1,4}:\d{1,5}$/.test(value)) return false;
        const [week, seconds] = value.split(':').map(Number);
        return week >= 0 && week <= 9999 && 
               seconds >= 0 && seconds < this.SECONDS_PER_WEEK;
    },

    convert(value) {
        return value;
    },

    toDate(value) {
        const [week, seconds] = value.split(':').map(Number);
        const milliseconds = this.GPS_EPOCH.getTime() + 
                           (week * this.SECONDS_PER_WEEK + seconds) * 1000;
        return new Date(milliseconds);
    }
}; 