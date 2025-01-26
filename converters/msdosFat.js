const msdosFatConverter = {
    name: 'MS-DOS FAT (32-bit)',
    description: 'MS-DOS FAT filesystem timestamp encoding date and time in a 32-bit value',
    infoUrl: 'https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-dosdatetimetofiletime',
    
    isValid(value) {
        return value >= 0 && value <= 0xFFFFFFFF;
    },

    convert(value) {
        return Math.floor(value);
    },

    toDate(timestamp) {
        // Extract date and time components
        const date = (timestamp >> 16) & 0xFFFF;
        const time = timestamp & 0xFFFF;

        // Extract individual components
        const year = ((date >> 9) & 0x7F) + 1980;
        const month = (date >> 5) & 0x0F;
        const day = date & 0x1F;
        const hour = (time >> 11) & 0x1F;
        const minute = (time >> 5) & 0x3F;
        const second = (time & 0x1F) * 2;

        return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    }
}; 