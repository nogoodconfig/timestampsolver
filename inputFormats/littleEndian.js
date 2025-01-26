const littleEndianFormat = {
    name: 'Little Endian',
    
    matches(input) {
        // Match groups of 2 hex digits
        return /^([0-9a-f]{2})+$/i.test(input);
    },
    
    convert(input) {
        try {
            // Split into bytes and reverse
            const bytes = input.match(/.{2}/g).reverse();
            const hex = '0x' + bytes.join('');
            return [Number(BigInt(hex))];
        } catch (e) {
            return [];
        }
    }
}; 