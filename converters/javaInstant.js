const javaInstantConverter = {
    name: 'Java/Kotlin Instant',
    description: 'Java Instant timestamp with seconds and nanoseconds since Unix epoch',
    infoUrl: 'https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html',
    
    isValid(value) {
        // Format: seconds,nanos or seconds.nanos
        return /^\d+[,\.]\d{1,9}$/.test(value);
    },

    convert(value) {
        return value;
    },

    toDate(value) {
        const [seconds, nanos] = value.split(/[,\.]/);
        const milliseconds = Number(seconds) * 1000 + Math.floor(Number(nanos) / 1000000);
        return new Date(milliseconds);
    }
}; 