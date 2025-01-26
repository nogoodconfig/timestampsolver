const ldapTimeFormat = {
    name: 'LDAP GeneralizedTime',
    
    matches(input) {
        return /^\d{14}(\.\d+)?Z?$/.test(input);
    },
    
    convert(input) {
        try {
            const year = parseInt(input.slice(0, 4));
            const month = parseInt(input.slice(4, 6));
            const day = parseInt(input.slice(6, 8));
            const hour = parseInt(input.slice(8, 10));
            const minute = parseInt(input.slice(10, 12));
            const second = parseInt(input.slice(12, 14));
            
            if (year >= 1601 && year <= 9999 &&
                month >= 1 && month <= 12 &&
                day >= 1 && day <= 31 &&
                hour >= 0 && hour <= 23 &&
                minute >= 0 && minute <= 59 &&
                second >= 0 && second <= 59) {
                return [input];
            }
        } catch (e) {}
        return [];
    }
}; 