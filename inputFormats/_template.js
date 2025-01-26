/**
 * Input Format Converter Template
 * 
 * Instructions for creating a new input format converter:
 * 1. Copy this template file
 * 2. Rename it to match your input format (e.g., 'hexConverter.js')
 * 3. Fill in the implementation following the guidelines below
 * 4. Add your converter to the INPUT_FORMATS array in app.js
 */
const templateInputFormat = {
    // Name of the format for debugging
    name: 'Format Name',

    /**
     * Check if the input string matches this format
     * @param {string} input - Raw input string to check
     * @returns {boolean} True if input matches this format
     */
    matches(input) {
        // Return true if input matches this format's pattern
        return false;
    },

    /**
     * Convert the input string to possible numeric values
     * @param {string} input - Raw input string to convert
     * @returns {number[]} Array of possible numeric interpretations
     */
    convert(input) {
        // Return array of possible numeric values
        return [];
    }
}; 