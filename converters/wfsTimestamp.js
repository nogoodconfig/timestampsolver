const wfsTimestampConverter = {
    id: 'wfsTimestamp',
    name: 'WFS File System',
    description: 'Write File System timestamp format used in some embedded systems',
    infoUrl: 'https://wfs.codeplex.com/',
    
    isValid(value) {
        return value >= 0 && value <= 0xFFFFFFFF;
    },

    convert(value) {
        return Math.floor(value);
    },

    toDate(timestamp) {
        // WFS uses a 32-bit value where:
        // bits 31-25: year-1980 (0-127)
        // bits 24-21: month (1-12)
        // bits 20-16: day (1-31)
        // bits 15-11: hour (0-23)
        // bits 10-5:  minute (0-59)
        // bits 4-0:   second/2 (0-29)
        const year = ((timestamp >> 25) & 0x7F) + 1980;
        const month = (timestamp >> 21) & 0x0F;
        const day = (timestamp >> 16) & 0x1F;
        const hour = (timestamp >> 11) & 0x1F;
        const minute = (timestamp >> 5) & 0x3F;
        const second = (timestamp & 0x1F) * 2;
        
        return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    }
}; 