const gpsWeekFormat = {
    name: 'GPS Week & Seconds',
    
    matches(input) {
        return /^\d{1,4}:\d{1,5}$/.test(input);
    },
    
    convert(input) {
        try {
            const [week, seconds] = input.split(':').map(Number);
            if (week >= 0 && week <= 9999 &&
                seconds >= 0 && seconds < 604800) {
                return [input];
            }
        } catch (e) {}
        return [];
    }
}; 