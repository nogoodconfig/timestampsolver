const microsoftTicksConverter = {
    id: 'microsoftTicks',
    name: 'Microsoft Ticks',
    description: 'Converts Microsoft .NET Ticks (100-nanosecond intervals since 01/01/0001)',
    infoUrl: 'https://learn.microsoft.com/en-us/dotnet/api/system.datetime.ticks',

    // One tick = 100 nanoseconds
    // Ticks between 0001-01-01 and 1970-01-01
    TICKS_TO_EPOCH: BigInt('621355968000000000'),
    TICKS_PER_MILLISECOND: BigInt(10000),

    isValid: function(input) {
        try {
            const ticks = BigInt(input);
            return ticks >= BigInt(0) && ticks <= BigInt('3155378975999999999');
        } catch {
            return false;
        }
    },

    parseInput: function(input) {
        // Remove any non-numeric characters
        return input.replace(/[^0-9]/g, '');
    },

    convert: function(input) {
        try {
            const ticks = BigInt(this.parseInput(input));
            
            // Convert ticks to Unix epoch
            const epochTicks = ticks - this.TICKS_TO_EPOCH;
            const milliseconds = Number(epochTicks / this.TICKS_PER_MILLISECOND);
            
            return new Date(milliseconds);
        } catch {
            return null;
        }
    },

    toDate: function(input) {
        return this.convert(input);
    }
}; 