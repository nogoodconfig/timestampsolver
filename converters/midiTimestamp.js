const midiTimestampConverter = {
    name: 'MIDI Timestamp',
    description: 'MIDI timestamp in ticks (default: 480 PPQN)',
    infoUrl: 'https://www.midi.org/specifications/midi-2-0-specifications',
    
    TICKS_PER_QUARTER_NOTE: 480, // Standard MIDI resolution
    DEFAULT_BPM: 120, // Standard tempo

    isValid(value) {
        return value >= 0 && value <= Number.MAX_SAFE_INTEGER;
    },

    convert(value) {
        return Math.floor(value);
    },

    toDate(ticks) {
        // Convert MIDI ticks to milliseconds
        const microsecondsPerQuarterNote = 60000000 / this.DEFAULT_BPM;
        const microseconds = (ticks * microsecondsPerQuarterNote) / this.TICKS_PER_QUARTER_NOTE;
        return new Date(microseconds / 1000);
    }
}; 