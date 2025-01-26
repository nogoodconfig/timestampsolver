const bcdFormat = {
    name: 'Binary Coded Decimal',
    
    matches(input) {
        return /^[0-9A-F]+$/i.test(input);
    },
    
    convert(input) {
        try {
            const values = [];
            
            // Try as 2-digit year BCD
            if (input.length === 6) { // YYMMDD
                const year = parseInt(input.slice(0, 2), 16);
                const month = parseInt(input.slice(2, 4), 16);
                const day = parseInt(input.slice(4, 6), 16);
                if (year <= 99 && month <= 12 && day <= 31) {
                    const fullYear = year + (year < 70 ? 2000 : 1900);
                    const date = new Date(Date.UTC(fullYear, month - 1, day));
                    values.push(Math.floor(date.getTime() / 1000));
                }
            }
            
            // Try as 4-digit year BCD
            if (input.length === 8) { // YYYYMMDD
                const year = parseInt(input.slice(0, 4), 16);
                const month = parseInt(input.slice(4, 6), 16);
                const day = parseInt(input.slice(6, 8), 16);
                if (year >= 1900 && year <= 2099 && month <= 12 && day <= 31) {
                    const date = new Date(Date.UTC(year, month - 1, day));
                    values.push(Math.floor(date.getTime() / 1000));
                }
            }

            return values;
        } catch (e) {
            return [];
        }
    }
}; 