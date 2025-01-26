const exchangeTimestampConverter = {
    id: 'exchangeTimestamp',
    name: 'Microsoft Exchange/ActiveSync',
    description: 'Exchange ActiveSync timestamp in Windows FILETIME format',
    infoUrl: 'https://learn.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-asdtype/3b63dae3-4ba1-4b5f-8e57-44307b684191',
    
    // Same as Windows FILETIME
    EXCHANGE_EPOCH_OFFSET: 116444736000000000n,
    TICKS_PER_MILLISECOND: 10000n,

    isValid(value) {
        return value >= 0n && value <= 2650467743999999999n;
    },

    convert(value) {
        return BigInt(value);
    },

    toDate(timestamp) {
        const unixTime = Number((timestamp - this.EXCHANGE_EPOCH_OFFSET) / this.TICKS_PER_MILLISECOND);
        return new Date(unixTime);
    }
}; 