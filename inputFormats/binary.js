const binaryFormat = {
    name: 'Binary',
    
    matches(input) {
        // Match binary with optional 0b prefix, allowing spaces between bytes
        return /^(?:0b)?[01](?:[01\s]*[01])?$/i.test(input.trim());
    },
    
    convert(input) {
        try {
            const values = new Set();
            const cleanInput = input.toLowerCase().trim();
            
            // Remove all spaces and 0b prefix
            const noSpaces = cleanInput.replace(/\s+/g, '').replace(/^0b/, '');
            
            // Try as a single binary number
            try {
                const bigNum = BigInt('0b' + noSpaces);
                if (bigNum <= BigInt(Number.MAX_SAFE_INTEGER)) {
                    values.add(Number(bigNum));
                }
            } catch (e) {}

            // Try as groups of 8 bits
            if (noSpaces.length % 8 === 0) {
                const bytes = noSpaces.match(/.{8}/g);
                if (bytes) {
                    // Try as big-endian
                    try {
                        const bigNum = BigInt('0b' + bytes.join(''));
                        if (bigNum <= BigInt(Number.MAX_SAFE_INTEGER)) {
                            values.add(Number(bigNum));
                        }
                    } catch (e) {}

                    // Try as ASCII (each byte as ASCII char)
                    try {
                        const ascii = bytes
                            .map(byte => String.fromCharCode(parseInt(byte, 2)))
                            .join('');
                        const num = Number(ascii);
                        if (!isNaN(num) && isFinite(num)) {
                            values.add(num);
                        }
                    } catch (e) {}
                }
            }

            // Try as groups of 4 bits (nibbles)
            if (noSpaces.length % 4 === 0) {
                const nibbles = noSpaces.match(/.{4}/g);
                if (nibbles) {
                    try {
                        const bigNum = BigInt('0b' + nibbles.join(''));
                        if (bigNum <= BigInt(Number.MAX_SAFE_INTEGER)) {
                            values.add(Number(bigNum));
                        }
                    } catch (e) {}
                }
            }

            return Array.from(values);
        } catch (e) {
            return [];
        }
    }
}; 