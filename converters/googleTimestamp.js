const googleTimestampConverter = {
    id: 'googleTimestamp',
    name: 'Google URL Parameters',
    description: 'Google search URL parameters (ei/ved) containing Unix microseconds',
    infoUrl: 'https://stackoverflow.com/questions/20068944/decoding-google-search-ei-parameter',
    
    isValid(value) {
        return /^[A-Za-z0-9_-]{12}$/.test(value);
    },

    convert(value) {
        try {
            // Decode base64url to binary
            const decoded = atob(value.replace(/-/g, '+').replace(/_/g, '/') + '==')
                .split('').map(c => c.charCodeAt(0));
            
            // First 8 bytes contain timestamp
            let timestamp = 0;
            for (let i = 0; i < 6; i++) {
                timestamp = (timestamp << 8) | decoded[i];
            }
            return timestamp;
        } catch (e) {
            return null;
        }
    },

    toDate(timestamp) {
        // Google timestamps are in microseconds
        return new Date(timestamp / 1000);
    }
}; 