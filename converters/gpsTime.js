const gpsTimeConverter = {
    name: 'GPS Time',
    description: 'GPS time in seconds since January 6, 1980 00:00:00 UTC',
    infoUrl: 'https://www.gps.gov/technical/time/',
    
    // GPS epoch starts at January 6, 1980
    GPS_EPOCH: 315964800, // Unix timestamp for 1980-01-06 00:00:00

    isValid(value) {
        return value >= 0 && value < 1261440000; // ~40 years range
    },

    convert(value) {
        return Math.floor(value);
    },

    toDate(timestamp) {
        return new Date((timestamp + this.GPS_EPOCH) * 1000);
    }
}; 