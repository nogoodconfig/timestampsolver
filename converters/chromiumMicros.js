const chromiumMicrosConverter = {
    id: 'chromiumMicros.js',
    name: 'Chromium Time (Microseconds)',
    description: 'Chromium timestamp in microseconds since January 1, 1601',
    infoUrl: 'https://chromium.googlesource.com/chromium/src/+/master/base/time/time.h',
    
    // Windows FILETIME epoch offset (difference between 1601-01-01 and 1970-01-01 in microseconds)
    CHROMIUM_EPOCH_OFFSET: 11644473600000000,

    isValid(value) {
        return value >= 0 && value <= Number.MAX_SAFE_INTEGER;
    },

    convert(value) {
        return Math.floor(value);
    },

    toDate(timestamp) {
        const unixMicros = timestamp - this.CHROMIUM_EPOCH_OFFSET;
        return new Date(unixMicros / 1000);
    }
}; 