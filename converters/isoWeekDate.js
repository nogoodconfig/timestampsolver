const isoWeekDateConverter = {
    id: 'isoWeekDate',
    name: 'ISO 8601 Week Date',
    description: 'ISO week-based year and week number (YYYY-Www-D)',
    infoUrl: 'https://en.wikipedia.org/wiki/ISO_week_date',
    
    isValid(value) {
        return /^\d{4}-W\d{2}-\d$/.test(value);
    },

    convert(value) {
        return value;
    },

    toDate(value) {
        // Parse YYYY-Www-D format
        const [year, week, day] = value.split(/[-W]/).map(Number);
        
        // Find first Monday of the year
        const firstDay = new Date(Date.UTC(year, 0, 1));
        const dayOfWeek = firstDay.getUTCDay() || 7;
        const firstMonday = new Date(firstDay);
        firstMonday.setUTCDate(firstDay.getUTCDate() + (dayOfWeek <= 4 ? 1 - dayOfWeek : 8 - dayOfWeek));
        
        // Add weeks and days
        const result = new Date(firstMonday);
        result.setUTCDate(result.getUTCDate() + (week - 1) * 7 + (day - 1));
        return result;
    }
}; 