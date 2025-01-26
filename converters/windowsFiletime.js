const windowsFiletimeConverter = {
    name: 'Windows Filetime',
    description: 'Windows FILETIME timestamp in 100-nanosecond intervals since January 1, 1601',
    infoUrl: 'https://learn.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-filetime',
    
    // Windows FILETIME epoch offset (difference between 1601-01-01 and 1970-01-01 in seconds)
    FILETIME_EPOCH_OFFSET: 11644473600n,
    TICKS_PER_SECOND: 10000000n, // 100-nanosecond intervals

    isValid(value) {
        const num = BigInt(value);
        // Valid range: 1601-01-01 to ~60000 years later
        return num >= 0n && num <= 2650467743999999999n;
    },

    convert(value) {
        return BigInt(value);
    },

    toDate(timestamp) {
        const unixTime = Number((timestamp / this.TICKS_PER_SECOND) - this.FILETIME_EPOCH_OFFSET);
        return new Date(unixTime * 1000);
    }
}; 