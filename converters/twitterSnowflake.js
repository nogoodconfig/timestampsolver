const twitterSnowflakeConverter = {
    id: 'twitterSnowflake',
    name: 'Twitter/X Snowflake ID',
    description: 'Twitter Snowflake ID containing timestamp in milliseconds since November 4, 2010',
    infoUrl: 'https://developer.twitter.com/en/docs/twitter-ids',
    
    // Twitter epoch starts at November 4, 2010
    TWITTER_EPOCH: 1288834974657,

    isValid(value) {
        // Snowflakes are 64-bit unsigned integers
        return value > 0 && value <= 9223372036854775807n;
    },

    convert(value) {
        return BigInt(value);
    },

    toDate(snowflake) {
        // Extract timestamp from snowflake (first 42 bits)
        const timestamp = Number(snowflake >> 22n) + this.TWITTER_EPOCH;
        return new Date(timestamp);
    }
}; 