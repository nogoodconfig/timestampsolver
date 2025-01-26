const ntfsTimestampConverter = {
    id: 'ntfsTimestamp',
    name: 'NTFS $FILE_NAME',
    description: 'NTFS file system timestamp in 100-nanosecond intervals since January 1, 1601',
    infoUrl: 'https://learn.microsoft.com/en-us/windows/win32/sysinfo/file-times',
    
    // NTFS epoch offset (difference between 1601-01-01 and 1970-01-01 in 100ns intervals)
    NTFS_EPOCH_OFFSET: 116444736000000000n,
    TICKS_PER_MILLISECOND: 10000n,

    isValid(value) {
        // NTFS timestamps are 64-bit values
        return value >= 0n && value <= 2650467743999999999n;
    },

    convert(value) {
        return BigInt(value);
    },

    toDate(timestamp) {
        // Convert NTFS ticks to Unix milliseconds
        const unixTime = Number((timestamp - this.NTFS_EPOCH_OFFSET) / this.TICKS_PER_MILLISECOND);
        return new Date(unixTime);
    }
}; 