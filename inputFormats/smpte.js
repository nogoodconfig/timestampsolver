const smpteFormat = {
    name: 'SMPTE Timecode',
    
    matches(input) {
        return /^(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d:[0-2]\d$/.test(input);
    },
    
    convert(input) {
        try {
            const [hours, minutes, seconds, frames] = input.split(':').map(Number);
            if (hours >= 0 && hours <= 23 &&
                minutes >= 0 && minutes <= 59 &&
                seconds >= 0 && seconds <= 59 &&
                frames >= 0 && frames <= 29) {
                return [input];
            }
        } catch (e) {}
        return [];
    }
}; 