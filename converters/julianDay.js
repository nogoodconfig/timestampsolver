const julianDayConverter = {
    name: 'Julian Day Number',
    description: 'Julian Day Number (JDN) counting days since noon on January 1, 4713 BCE',
    infoUrl: 'https://en.wikipedia.org/wiki/Julian_day',
    
    // Julian Day epoch (4713-01-01 BCE noon)
    JULIAN_EPOCH: -2440588,

    isValid(value) {
        return value >= 0 && value <= 5373484; // Valid until ~10000 CE
    },

    convert(value) {
        return Math.floor(value);
    },

    toDate(jdn) {
        // Convert Julian Day Number to Date
        // Algorithm from Jean Meeus' Astronomical Algorithms
        const J = jdn + 0.5;
        const Z = Math.floor(J);
        const F = J - Z;
        
        let A = Z;
        if (Z >= 2299161) {
            const alpha = Math.floor((Z - 1867216.25) / 36524.25);
            A = Z + 1 + alpha - Math.floor(alpha / 4);
        }
        
        const B = A + 1524;
        const C = Math.floor((B - 122.1) / 365.25);
        const D = Math.floor(365.25 * C);
        const E = Math.floor((B - D) / 30.6001);
        
        const day = B - D - Math.floor(30.6001 * E) + F;
        const month = E < 14 ? E - 1 : E - 13;
        const year = month > 2 ? C - 4716 : C - 4715;
        
        return new Date(Date.UTC(year, month - 1, day));
    }
}; 