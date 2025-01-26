const taiTimestampConverter = {
    id: 'taiTimestamp',
    name: 'International Atomic Time (TAI)',
    description: 'TAI timestamp in seconds, including leap seconds since 1958',
    infoUrl: 'https://www.bipm.org/en/time-scale/tai',
    
    // TAI epoch (1958-01-01) and initial offset from UTC
    TAI_EPOCH: -378691200,
    
    // Leap second table (UTC - TAI) up to 2024
    LEAP_SECONDS: [
        [1483228800, -37], // 2017-01-01
        [1435708800, -36], // 2015-07-01
        [1341100800, -35], // 2012-07-01
        [1230768000, -34], // 2009-01-01
        [1136073600, -33], // 2006-01-01
        [915148800, -32],  // 1999-01-01
        [867715200, -31],  // 1997-07-01
        [820454400, -30],  // 1996-01-01
        [773020800, -29],  // 1994-07-01
        [741484800, -28],  // 1993-07-01
        [709948800, -27],  // 1992-07-01
        [662688000, -26],  // 1991-01-01
        [631152000, -25],  // 1990-01-01
        [567993600, -24],  // 1988-01-01
        [489024000, -23],  // 1985-07-01
        [425865600, -22],  // 1983-07-01
        [394329600, -21],  // 1982-07-01
        [362793600, -20],  // 1981-07-01
        [315532800, -19],  // 1980-01-01
        [283996800, -18],  // 1979-01-01
        [252460800, -17],  // 1978-01-01
        [220924800, -16],  // 1977-01-01
        [189302400, -15],  // 1976-01-01
        [157766400, -14],  // 1975-01-01
        [126230400, -13],  // 1974-01-01
        [94694400, -12],   // 1973-01-01
        [63158400, -11],   // 1972-01-01
        [31622400, -10]    // 1971-01-01
    ],

    isValid(value) {
        const seconds = Number(value);
        return seconds >= 0 && seconds <= 2524608000; // Valid until ~2038
    },

    convert(value) {
        return Number(value);
    },

    toDate(taiSeconds) {
        // Convert TAI seconds to Unix timestamp
        const unixSeconds = taiSeconds + this.TAI_EPOCH;
        
        // Find applicable leap second offset
        const offset = this.LEAP_SECONDS.find(([time]) => unixSeconds >= time)?.[1] || -10;
        
        return new Date((unixSeconds + offset) * 1000);
    }
}; 