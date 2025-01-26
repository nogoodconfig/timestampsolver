const macHfsXattrConverter = {
    name: 'Mac OS X HFS+ Extended Attributes',
    description: 'HFS+ extended attributes timestamp in nanoseconds since January 1, 2001',
    infoUrl: 'https://developer.apple.com/library/archive/technotes/tn/tn1150.html',
    
    // HFS+ Extended Attributes use same epoch as Cocoa (2001-01-01)
    HFS_XATTR_EPOCH: 978307200000, // Unix timestamp for 2001-01-01 00:00:00

    isValid(value) {
        return value >= 0 && value <= Number.MAX_SAFE_INTEGER;
    },

    convert(value) {
        return BigInt(value);
    },

    toDate(timestamp) {
        // Convert nanoseconds to milliseconds and adjust for epoch
        return new Date(Number(timestamp / 1000000n) + this.HFS_XATTR_EPOCH);
    }
}; 