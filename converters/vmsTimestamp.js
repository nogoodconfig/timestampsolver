const vmsTimestampConverter = {
    name: 'OpenVMS Date/Time',
    description: 'OpenVMS timestamp in 100-nanosecond intervals since November 17, 1858',
    infoUrl: 'https://support.hpe.com/hpesc/public/docDisplay?docId=emr_na-c04622340',
    
    // VMS epoch (1858-11-17) to Unix epoch offset in 100ns intervals
    VMS_EPOCH_OFFSET: 3506716800n * 10000000n,

    isValid(value) {
        // VMS timestamps are 64-bit values
        return value >= 0n && value <= 9223372036854775807n;
    },

    convert(value) {
        return BigInt(value);
    },

    toDate(timestamp) {
        // Convert VMS ticks to Unix milliseconds
        const unixTime = Number((timestamp - this.VMS_EPOCH_OFFSET) / 10000n);
        return new Date(unixTime);
    }
}; 