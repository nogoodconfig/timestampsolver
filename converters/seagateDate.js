const seagateDateConverter = {
    name: 'Seagate Date Code',
    description: 'Seagate hard drive manufacturing date code (YYWW)',
    infoUrl: 'https://www.seagate.com/support/warranty-and-replacements/date-code-lookup/',
    
    isValid(value) {
        // Format: YYWW (YY = year, WW = week number)
        if (!/^\d{4}$/.test(value)) return false;
        
        const year = parseInt(value.slice(0, 2));
        const week = parseInt(value.slice(2));
        return week >= 1 && week <= 53;
    },

    convert(value) {
        return value;
    },

    toDate(value) {
        const year = parseInt(value.slice(0, 2));
        const week = parseInt(value.slice(2));
        const fullYear = year + (year < 70 ? 2000 : 1900);
        
        // Calculate date from year and week number
        const date = new Date(Date.UTC(fullYear, 0, 1));
        date.setUTCDate(1 + (week - 1) * 7);
        return date;
    }
}; 