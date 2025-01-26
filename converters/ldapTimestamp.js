const ldapTimestampConverter = {
    name: 'LDAP/Active Directory',
    description: 'LDAP/Active Directory timestamp in 100-nanosecond intervals since January 1, 1601',
    infoUrl: 'https://ldapwiki.com/wiki/GeneralizedTime',
    
    // Same epoch as NTFS
    LDAP_EPOCH_OFFSET: 116444736000000000n,
    TICKS_PER_MILLISECOND: 10000n,

    isValid(value) {
        // Support both numeric and GeneralizedTime format
        return /^\d+$/.test(value) || 
               /^\d{14}(\.\d+)?Z?$/.test(value); // YYYYMMDDhhmmss[.fraction]Z
    },

    convert(value) {
        if (/^\d{14}/.test(value)) {
            // Parse GeneralizedTime format
            const year = parseInt(value.slice(0, 4));
            const month = parseInt(value.slice(4, 6)) - 1;
            const day = parseInt(value.slice(6, 8));
            const hour = parseInt(value.slice(8, 10));
            const minute = parseInt(value.slice(10, 12));
            const second = parseInt(value.slice(12, 14));
            const fraction = value.includes('.') ? 
                parseFloat('0' + value.slice(value.indexOf('.'), value.indexOf('Z'))) : 0;
            
            const date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction * 1000));
            return BigInt(date.getTime()) * this.TICKS_PER_MILLISECOND + this.LDAP_EPOCH_OFFSET;
        }
        return BigInt(value);
    },

    toDate(timestamp) {
        const unixTime = Number((BigInt(timestamp) - this.LDAP_EPOCH_OFFSET) / this.TICKS_PER_MILLISECOND);
        return new Date(unixTime);
    }
}; 