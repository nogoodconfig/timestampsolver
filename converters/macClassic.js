const macClassicConverter = {
    id: 'macClassic',
    name: 'Mac OS Classic',
    description: 'Mac OS Classic timestamp in seconds since January 1, 1904',
    infoUrl: 'https://developer.apple.com/library/archive/documentation/mac/pdf/MacintoshToolboxEssentials.pdf',
    
    // Mac Classic epoch (1904-01-01)
    MAC_CLASSIC_EPOCH: -2082844800,

    isValid(value) {
        return value >= 0 && value <= 0xFFFFFFFF;
    },

    convert(value) {
        return Math.floor(value);
    },

    toDate(timestamp) {
        return new Date((timestamp + this.MAC_CLASSIC_EPOCH) * 1000);
    }
}; 