const appleHfsConverter = {
    name: 'Apple HFS/HFS+',
    description: 'Apple HFS/HFS+ timestamp in seconds since January 1, 1904',
    infoUrl: 'https://developer.apple.com/library/archive/technotes/tn/tn1150.html',
    
    // HFS epoch starts at January 1, 1904
    HFS_EPOCH: -2082844800, // Unix timestamp for 1904-01-01 00:00:00

    isValid(value) {
        return value >= 0 && value < 4294967296; // 32-bit unsigned
    },

    convert(value) {
        return Math.floor(value);
    },

    toDate(timestamp) {
        return new Date((timestamp + this.HFS_EPOCH) * 1000);
    }
}; 