/**
 * Timestamp Converter Template
 * 
 * Instructions for creating a new timestamp converter:
 * 1. Copy this template file
 * 2. Rename it to match your timestamp format (e.g., 'myNewConverter.js')
 * 3. Fill in the implementation following the guidelines below
 * 4. Add your converter to index.html and the converters array in app.js
 * 
 * Requirements:
 * - Each converter must implement all properties and methods shown below
 * - Validation ranges should be reasonable for the timestamp format
 * - Date conversion must be accurate and handle timezone conversion
 * 
 * Testing:
 * - Test with various numeric values within your valid range
 * - Test with invalid values to ensure proper validation
 * - Test with edge cases (min/max values) for your timestamp format
 */

// Template for creating new timestamp converters
// To create a new converter:
// 1. Copy this file and rename it to match your converter (e.g., myNewFormat.js)
// 2. Update the converter object name to match (e.g., myNewFormatConverter)
// 3. Fill in all the required properties and methods below
// 4. Add your converter to the list in app.js

const templateConverter = {
    // Required: Unique identifier matching your filename (without .js)
    id: 'template',

    // Required: Display name shown in the UI
    name: 'Template Format',

    // Required: Brief description of the timestamp format
    description: 'Description of what this timestamp format is and where it\'s used',

    // Required: URL to documentation or information about this format
    infoUrl: 'https://example.com/docs',
    
    // Optional: Any constants or configuration specific to this format
    // Example: Epoch offsets, minimum/maximum values, etc.
    SOME_CONSTANT: 123456789,
    
    /**
     * Required: Validates if the input could be a timestamp in this format
     * @param {string|number} input - Raw input value to validate
     * @returns {boolean} - True if the input is potentially valid in this format
     */
    isValid(input) {
        try {
            // Add validation logic here
            // Example: Check if input is within valid range
            const num = this.parseInput(input);
            return num !== null && num >= MIN_VALUE && num <= MAX_VALUE;
        } catch (e) {
            return false;
        }
    },

    /**
     * Optional but recommended: Helper method to parse different input formats
     * @param {string|number} input - Raw input to parse
     * @returns {number|null} - Parsed number or null if invalid
     */
    parseInput(input) {
        // Handle different input formats
        if (typeof input === 'string') {
            // Handle hex (0x prefix)
            if (input.toLowerCase().startsWith('0x')) {
                return parseInt(input, 16);
            }
            // Handle binary (0b prefix)
            if (input.toLowerCase().startsWith('0b')) {
                return parseInt(input.slice(2), 2);
            }
            // Handle decimal
            return parseFloat(input);
        }
        return input;
    },

    /**
     * Required: Convert the input into this timestamp format
     * @param {string|number} input - Raw input value to convert
     * @returns {number|string} - Converted timestamp value
     */
    convert(input) {
        // Add conversion logic here
        // This should convert the input into your timestamp format
        return this.parseInput(input);
    },

    /**
     * Required: Convert the timestamp to a JavaScript Date object
     * @param {number|string} timestamp - Timestamp in this format
     * @returns {Date} - JavaScript Date object
     * @throws {Error} - If the timestamp is invalid
     */
    toDate(timestamp) {
        // Add logic to convert your timestamp to a JavaScript Date
        // Example: return new Date(timestamp * 1000);
        throw new Error('Not implemented');
    }
};

/**
 * Example Usage:
 * 
 * const myConverter = {
 *     name: 'Unix Epoch (Seconds)',
 *     description: 'Unix timestamp in seconds since January 1, 1970',
 *     infoUrl: 'https://en.wikipedia.org/wiki/Unix_time',
 *     
 *     parseInput(input) {
 *         // ... implementation as shown above ...
 *     },
 *     
 *     isValid(input) {
 *         const num = this.parseInput(input);
 *         return !isNaN(num) && num >= 0 && num < 4102444800;
 *     },
 *     
 *     convert(input) {
 *         return Math.floor(this.parseInput(input));
 *     },
 *     
 *     toDate(timestamp) {
 *         return new Date(timestamp * 1000);
 *     }
 * };
 */

// DO NOT export or use this template file directly
// It is for reference only 