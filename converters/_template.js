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

const templateConverter = {
    // Display name of the timestamp format
    name: 'Format Name',

    // Clear description of what this timestamp represents
    description: 'Description of the timestamp format, including the epoch reference date',

    // Link to official documentation or relevant information
    infoUrl: 'https://link.to/documentation',

    // Optional: Any constant values needed for conversion
    // SOME_CONSTANT: value,

    /**
     * Validate if the number is a valid timestamp in this format
     * @param {number} value - The numeric value to validate
     * @returns {boolean} True if valid, false otherwise
     */
    isValid(value) {
        // Implement validation logic:
        // - Check if value is within valid range for this format
        // - Add any other format-specific validation
        return value >= MIN_VALUE && value < MAX_VALUE;
    },

    /**
     * Convert the input to this timestamp format
     * @param {number} value - The numeric value to convert
     * @returns {number} The converted timestamp
     */
    convert(value) {
        return Math.floor(value);
    },

    /**
     * Convert the timestamp to a JavaScript Date object
     * @param {number} timestamp - The timestamp in this format
     * @returns {Date} JavaScript Date object representing the timestamp
     */
    toDate(timestamp) {
        // Implement conversion to JavaScript Date
        // Example for Unix epoch seconds:
        // return new Date(timestamp * 1000);
        return new Date(/* your conversion here */);
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