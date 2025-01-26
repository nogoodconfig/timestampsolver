const hexFormat = {
    name: 'Hexadecimal',
    
    matches(input) {
        // Match hex with optional 0x prefix, allowing for spaces between bytes
        return /^(?:0x)?(?:[0-9a-f]{1,2}\s?)+$/i.test(input.trim());
    },
    
    convert(input) {
        try {
            const values = new Set();
            const cleanInput = input.toLowerCase().trim();
            
            // Remove all spaces and 0x prefix
            const noSpaces = cleanInput.replace(/\s+/g, '').replace(/^0x/, '');
            
            // Try as a single hex number
            try {
                // Try BigInt first for large numbers
                const bigNum = BigInt('0x' + noSpaces);
                if (bigNum <= BigInt(Number.MAX_SAFE_INTEGER)) {
                    values.add(Number(bigNum));
                }
            } catch (e) {}

            // Try as byte pairs
            if (noSpaces.length % 2 === 0) {
                const pairs = noSpaces.match(/.{2}/g);
                if (pairs) {
                    try {
                        const hex = '0x' + pairs.join('');
                        const bigNum = BigInt(hex);
                        if (bigNum <= BigInt(Number.MAX_SAFE_INTEGER)) {
                            values.add(Number(bigNum));
                        }
                    } catch (e) {}
                }
            }

            // Try as ASCII hex (each pair as ASCII char)
            if (noSpaces.length % 2 === 0) {
                const ascii = noSpaces.match(/.{2}/g)
                    ?.map(hex => String.fromCharCode(parseInt(hex, 16)))
                    .join('');
                if (ascii) {
                    const num = Number(ascii);
                    if (!isNaN(num) && isFinite(num)) {
                        values.add(num);
                    }
                }
            }

            return Array.from(values);
        } catch (e) {
            return [];
        }
    }
}; 