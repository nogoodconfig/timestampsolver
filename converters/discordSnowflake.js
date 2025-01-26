const discordSnowflakeConverter = {
    name: 'Discord Snowflake ID',
    description: 'Discord Snowflake ID containing timestamp in milliseconds since January 1, 2015',
    infoUrl: 'https://discord.com/developers/docs/reference#snowflakes',
    
    // Discord epoch starts at January 1, 2015
    DISCORD_EPOCH: 1420070400000n,

    isValid(value) {
        // Discord snowflakes are 64-bit unsigned integers
        return value > 0 && value <= 9223372036854775807n;
    },

    convert(value) {
        return BigInt(value);
    },

    toDate(snowflake) {
        // Extract timestamp (first 42 bits)
        const timestamp = Number((snowflake >> 22n) + this.DISCORD_EPOCH);
        return new Date(timestamp);
    }
}; 