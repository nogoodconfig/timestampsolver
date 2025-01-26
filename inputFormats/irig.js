const irigFormat = {
    name: 'IRIG Timecode',
    
    matches(input) {
        return /^(?:[0-2]\d\d|3[0-5]\d|36[0-6]):[0-1]\d|2[0-3]:[0-5]\d:[0-5]\d$/.test(input);
    },
    
    convert(input) {
        try {
            const [days, hours, minutes, seconds] = input.split(':').map(Number);
            if (days >= 1 && days <= 366 &&
                hours >= 0 && hours <= 23 &&
                minutes >= 0 && minutes <= 59 &&
                seconds >= 0 && seconds <= 59) {
                return [input];
            }
        } catch (e) {}
        return [];
    }
}; 