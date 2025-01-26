const isoWeekFormat = {
    name: 'ISO Week Date',
    
    matches(input) {
        return /^\d{4}-W\d{2}-\d$/.test(input);
    },
    
    convert(input) {
        try {
            const [year, week, day] = input.split(/[-W]/).map(Number);
            if (year >= 1 && year <= 9999 &&
                week >= 1 && week <= 53 &&
                day >= 1 && day <= 7) {
                return [input];
            }
        } catch (e) {}
        return [];
    }
}; 