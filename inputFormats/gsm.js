const gsmFormat = {
    name: 'GSM',
    
    matches(input) {
        return /^\d{14}$/.test(input.trim());
    },
    
    convert(input) {
        try {
            const cleanInput = input.trim();
            
            // Extract components
            const year = parseInt(cleanInput.slice(0, 2));
            const month = parseInt(cleanInput.slice(2, 4));
            const day = parseInt(cleanInput.slice(4, 6));
            const hour = parseInt(cleanInput.slice(6, 8));
            const minute = parseInt(cleanInput.slice(8, 10));
            const second = parseInt(cleanInput.slice(10, 12));
            const timezone = parseInt(cleanInput.slice(12, 14));
            
            // Validate components
            if (month >= 1 && month <= 12 &&
                day >= 1 && day <= 31 &&
                hour >= 0 && hour <= 23 &&
                minute >= 0 && minute <= 59 &&
                second >= 0 && second <= 59 &&
                timezone >= 0 && timezone <= 80) { // Timezone: 0-80 represents -48 to +48 quarter hours
                
                // Validate day based on month and year
                const fullYear = year + (year < 70 ? 2000 : 1900);
                const daysInMonth = new Date(fullYear, month, 0).getDate();
                if (day <= daysInMonth) {
                    // Convert timezone from GSM format (0-80) to offset in minutes
                    const tzOffset = (timezone - 32) * 15; // -32 to center the range
                    
                    // Create date in UTC, adjusting for timezone
                    const date = new Date(Date.UTC(fullYear, month - 1, day, 
                                                 hour, minute - tzOffset, second));
                    
                    // Only return if it's a valid date
                    if (!isNaN(date.getTime())) {
                        return [cleanInput];
                    }
                }
            }
        } catch (e) {}
        return [];
    }
}; 