const smpteTimecodeConverter = {
    name: 'SMPTE Timecode',
    description: 'SMPTE timecode format (HH:MM:SS:FF)',
    infoUrl: 'https://en.wikipedia.org/wiki/SMPTE_timecode',
    
    isValid(value) {
        // Format: HH:MM:SS:FF (hours:minutes:seconds:frames)
        return /^(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d:[0-2]\d$/.test(value);
    },

    convert(value) {
        return value;
    },

    toDate(timecode) {
        const [hours, minutes, seconds, frames] = timecode.split(':').map(Number);
        // Assuming 30fps (non-drop frame)
        const totalSeconds = hours * 3600 + minutes * 60 + seconds + frames / 30;
        // Use Unix epoch as base
        return new Date(totalSeconds * 1000);
    }
}; 