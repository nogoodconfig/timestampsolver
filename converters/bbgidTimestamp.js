const bbgidTimestampConverter = {
    id: 'bbgidTimestamp',
    name: 'Bloomberg BBGID',
    description: 'Bloomberg Global ID embedded timestamp (microseconds since 2011-01-01)',
    infoUrl: 'https://www.bloomberg.com/professional/product/reference-data/',
    
    // Bloomberg BBGID epoch (2011-01-01)
    BBGID_EPOCH: 1293840000000000, // microseconds since Unix epoch

    isValid(value) {
        // BBGID format: BBGXXXXXXXXXX where X is base-36 encoded timestamp
        return /^BBG[0-9A-Z]{9}$/.test(value);
    },

    convert(value) {
        // Extract timestamp portion and convert from base-36
        const timestamp = parseInt(value.slice(3), 36);
        return timestamp;
    },

    toDate(timestamp) {
        const microseconds = timestamp + this.BBGID_EPOCH;
        return new Date(microseconds / 1000);
    }
}; 