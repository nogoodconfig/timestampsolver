const posixTimespecConverter = {
    id: 'posixTimespec',
    name: 'POSIX timespec',
    description: 'POSIX timespec structure with seconds and nanoseconds',
    infoUrl: 'https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/time.h.html',
    
    isValid(value) {
        // Format: seconds.nanoseconds
        if (!/^\d+\.\d{1,9}$/.test(value)) return false;
        const [seconds, nanos] = value.split('.').map(Number);
        return seconds >= 0 && nanos >= 0 && nanos < 1000000000;
    },

    convert(value) {
        return value;
    },

    toDate(value) {
        const [seconds, nanos] = value.split('.').map(Number);
        return new Date(seconds * 1000 + Math.floor(nanos / 1000000));
    }
}; 