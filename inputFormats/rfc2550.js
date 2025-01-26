const rfc2550Format = {
    name: 'RFC 2550',
    
    matches(input) {
        return /^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-\d{3}-\d{3}-\d{3}-\d{3}$/.test(input);
    },
    
    convert(input) {
        try {
            const [year, month, day, hour, minute, second, ...subseconds] = 
                input.split('-').map(Number);
            
            if (year >= 1 && year <= 9999 &&
                month >= 1 && month <= 12 &&
                day >= 1 && day <= 31 &&
                hour >= 0 && hour <= 23 &&
                minute >= 0 && minute <= 59 &&
                second >= 0 && second <= 59 &&
                subseconds.every(x => x >= 0 && x <= 999)) {
                return [input];
            }
        } catch (e) {}
        return [];
    }
}; 