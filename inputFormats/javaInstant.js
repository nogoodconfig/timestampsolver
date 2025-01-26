const javaInstantFormat = {
    name: 'Java Instant',
    
    matches(input) {
        // Match format: [-]seconds[,.]nanos
        return /^-?\d+[,\.]\d{1,9}$/.test(input.trim());
    },
    
    convert(input) {
        try {
            const cleanInput = input.trim();
            const [seconds, nanos] = cleanInput.split(/[,\.]/);
            const secondsNum = BigInt(seconds);
            const nanosNum = parseInt(nanos.padEnd(9, '0'));
            
            // Validate ranges
            // Valid from year 1 to year 9999
            if (secondsNum >= BigInt('-62167219200') && secondsNum <= BigInt('253402300799') &&
                nanosNum >= 0 && nanosNum < 1000000000) {
                
                // Convert to milliseconds for JavaScript Date
                const milliseconds = Number(secondsNum) * 1000 + Math.floor(nanosNum / 1000000);
                const date = new Date(milliseconds);
                
                // Only return if it results in a valid date
                if (!isNaN(date.getTime())) {
                    return [cleanInput];
                }
            }
        } catch (e) {}
        return [];
    }
}; 