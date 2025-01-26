const sqliteJulianConverter = {
    name: 'SQLite Julian Day',
    description: 'SQLite Julian day numbers with fractional part for time',
    infoUrl: 'https://www.sqlite.org/lang_datefunc.html',
    
    // Constants for validation
    MIN_JD: 1721425.5, // 0001-01-01T00:00:00Z
    MAX_JD: 5373484.5, // 9999-12-31T23:59:59Z
    
    isValid(value) {
        try {
            const num = typeof value === 'string' ? Number(value) : value;
            return !isNaN(num) && isFinite(num) && 
                   num >= this.MIN_JD && num <= this.MAX_JD;
        } catch (e) {
            return false;
        }
    },

    convert(value) {
        return Number(value).toFixed(6); // 6 decimal places for microsecond precision
    },

    toDate(julianDate) {
        try {
            const JD = Number(julianDate);
            if (isNaN(JD) || !isFinite(JD)) {
                throw new Error('Invalid Julian Date');
            }
            
            // Integer part for date calculation
            const Z = Math.floor(JD + 0.5);
            
            // Decimal part for time calculation (preserve precision)
            const F = JD + 0.5 - Z;
            
            // Calculate date components
            let A = Z;
            if (Z >= 2299161) {
                const alpha = Math.floor((Z - 1867216.25) / 36524.25);
                A = Z + 1 + alpha - Math.floor(alpha / 4);
            }
            
            const B = A + 1524;
            const C = Math.floor((B - 122.1) / 365.25);
            const D = Math.floor(365.25 * C);
            const E = Math.floor((B - D) / 30.6001);
            
            // Calculate time components with high precision
            const totalSeconds = F * 86400; // 24 * 60 * 60
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = Math.floor(totalSeconds % 60);
            const milliseconds = Math.round((totalSeconds - Math.floor(totalSeconds)) * 1000);
            
            // Calculate date
            const day = B - D - Math.floor(30.6001 * E);
            const month = E < 14 ? E - 1 : E - 13;
            const year = month > 2 ? C - 4716 : C - 4715;
            
            // Create date object
            const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds));
            
            // Verify the date is valid
            if (!isNaN(date.getTime())) {
                return date;
            }
            throw new Error('Invalid date result');
        } catch (e) {
            throw new Error('Invalid Julian Date conversion: ' + e.message);
        }
    }
}; 