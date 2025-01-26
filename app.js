class TimestampConverter {
    constructor() {
        // Initialize all converters
        this.converters = [
            // Unix timestamps
            epochSecondsConverter,
            epochMillisConverter,
            epochMicrosConverter,
            epochNanosConverter,
            
            // Apple timestamps
            cocoaSecondsConverter,
            cocoaMillisConverter,
            cocoaMicrosConverter,
            cocoaNanosConverter,
            appleHfsConverter,
            macHfsXattrConverter,
            macClassicConverter,
            
            // Windows timestamps
            windowsFiletimeConverter,
            msdosFatConverter,
            ntfsTimestampConverter,
            systemTimeConverter,
            exchangeTimestampConverter,
            oleAutomationConverter,
            
            // Network/Protocol timestamps
            gpsTimeConverter,
            gpsWeekSecondConverter,
            twitterSnowflakeConverter,
            discordSnowflakeConverter,
            uuidTimestampConverter,
            chromiumMicrosConverter,
            webkitTimestampConverter,
            bbgidTimestampConverter,
            
            // Database/System timestamps
            ldapTimestampConverter,
            sqliteJulianConverter,
            vmsTimestampConverter,
            posixTimespecConverter,
            sasDatetimeConverter,
            sasDateConverter,
            
            // Standard formats
            isoWeekDateConverter,
            julianDayConverter,
            taiTimestampConverter,
            irigTimecodeConverter,
            smpteTimecodeConverter,
            midiTimestampConverter,
            rfc2550Converter
        ];
        
        // Initialize all input formats
        this.inputFormats = [
            // Basic formats
            decimalFormat,
            hexFormat,
            hexBytesFormat,
            binaryFormat,
            littleEndianFormat,
            bcdFormat,
            
            // Special formats
            gsmFormat,
            uuidFormat,
            javaInstantFormat,
            ldapTimeFormat,
            isoWeekFormat,
            irigFormat,
            gpsWeekFormat,
            smpteFormat,
            rfc2550Format
        ];
        
        this.input = document.getElementById('timestampInput');
        this.cardGrid = document.getElementById('cardGrid');
        
        // Add format filter initialization
        this.selectedFormat = 'all';
        this.initialize();
    }
    
    formatDate(date) {
        const pad = (num, size = 2) => num.toString().padStart(size, '0');
        return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ` +
               `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}.` +
               `${pad(date.getUTCMilliseconds(), 3)}`;
    }
    
    initialize() {
        this.createCards();
        this.input.addEventListener('input', () => this.handleInput());
        this.initializeFormatToggles();
        this.initializeFormatTogglesCollapse();
    }
    
    createCards() {
        this.converters.forEach(converter => {
            const card = document.createElement('div');
            card.className = 'timestamp-card';
            card.innerHTML = `
                <div class="card-title">${converter.name}</div>
                <div class="card-description">${converter.description}</div>
                <div class="card-value"></div>
                <button class="copy-button" title="Copy to clipboard">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
                <a href="${converter.infoUrl}" target="_blank" class="info-link">Learn More →</a>
            `;
            
            const copyButton = card.querySelector('.copy-button');
            copyButton.addEventListener('click', () => this.handleCopy(card));
            
            this.cardGrid.appendChild(card);
        });
    }

    handleCopy(card) {
        const valueDiv = card.querySelector('.card-value');
        const formatted = valueDiv.querySelector('div:first-child')?.textContent;
        const raw = valueDiv.querySelector('.raw-value')?.textContent;
        if (formatted && raw) {
            navigator.clipboard.writeText(`${formatted}\n${raw}`);
            this.showCopyFeedback(card.querySelector('.copy-button'));
        }
    }

    showCopyFeedback(button) {
        const originalHTML = button.innerHTML;
        button.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
            </svg>
        `;
        setTimeout(() => button.innerHTML = originalHTML, 2000);
    }
    
    initializeFormatToggles() {
        const formatList = document.querySelector('.format-list');
        
        // Format definitions with descriptions and examples
        const formatCategories = {
            'Basic Formats': [
                {
                    format: decimalFormat,
                    description: 'Standard decimal numbers',
                    examples: ['1234567890', '1710834477']
                },
                {
                    format: hexFormat,
                    description: 'Hexadecimal numbers with optional 0x prefix',
                    examples: ['0x1234ABCD', 'DEADBEEF', '0x65f9b44d']
                },
                {
                    format: hexBytesFormat,
                    description: 'Space-delimited or 0x-prefixed hex bytes',
                    examples: ['0x12 0x34 0x56', '12 34 56 78', '0x310x370x33']
                },
                {
                    format: binaryFormat,
                    description: 'Binary numbers with optional 0b prefix',
                    examples: ['0b1010', '11110000', '0b11111111']
                },
                {
                    format: littleEndianFormat,
                    description: 'Little-endian byte representation',
                    examples: ['78 56 34 12', '4D B4 F9 65']
                },
                {
                    format: bcdFormat,
                    description: 'Binary-coded decimal format',
                    examples: ['20240319', '990131']
                }
            ],
            'Special Formats': [
                {
                    format: gsmFormat,
                    description: 'GSM timestamp format (YYMMDDHHMMSSZZ)',
                    examples: ['24031912301500']
                },
                {
                    format: uuidFormat,
                    description: 'UUID version 1 format',
                    examples: ['123e4567-e89b-12d3-a456-426614174000']
                },
                {
                    format: javaInstantFormat,
                    description: 'Java Instant with seconds and nanoseconds',
                    examples: ['1234567890.123456789', '1710834477.000000000']
                },
                {
                    format: ldapTimeFormat,
                    description: 'LDAP GeneralizedTime format',
                    examples: ['20240319123015Z', '20240319123015.123Z']
                },
                {
                    format: isoWeekFormat,
                    description: 'ISO-8601 week date format',
                    examples: ['2024-W12-2', '2024-W01-1']
                },
                {
                    format: irigFormat,
                    description: 'IRIG timecode format',
                    examples: ['001:12:30:15', '365:23:59:59']
                },
                {
                    format: smpteFormat,
                    description: 'SMPTE timecode format (HH:MM:SS:FF)',
                    examples: ['01:00:00:00', '23:59:59:29']
                },
                {
                    format: rfc2550Format,
                    description: 'RFC 2550 Y10K-compliant format',
                    examples: ['2024-03-19-12-30-15-000-000-000-000']
                }
            ]
        };

        // Create format options
        Object.entries(formatCategories).forEach(([category, formats]) => {
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'format-category';
            categoryHeader.textContent = category;
            formatList.appendChild(categoryHeader);

            formats.forEach(({ format, description, examples }) => {
                const label = document.createElement('label');
                label.className = 'format-option';
                label.innerHTML = `
                    <input type="radio" name="format" value="${format.name}">
                    <div class="format-details">
                        <span class="format-name">${format.name}</span>
                        <p class="format-description">${description}</p>
                        <div class="format-examples">
                            Examples:<br>
                            ${examples.map(ex => `<code>${ex}</code>`).join('<br>')}
                        </div>
                    </div>
                `;
                formatList.appendChild(label);
            });
        });

        // Add event listeners
        document.querySelectorAll('input[name="format"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.selectedFormat = e.target.value;
                this.handleInput();
            });
        });
    }

    initializeFormatTogglesCollapse() {
        const sidebar = document.querySelector('.sidebar');
        const header = sidebar.querySelector('.sidebar-header');

        // Toggle on header click
        header.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });

        // Handle keyboard navigation
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                sidebar.classList.toggle('collapsed');
            }
        });
    }

    parseInputFormats(input) {
        if (!input || typeof input !== 'string') {
            return [];
        }

        input = input.trim();
        const allValues = new Set();

        // Filter formats based on selection
        const formatsToUse = this.selectedFormat === 'all' 
            ? this.inputFormats
            : this.inputFormats.filter(format => format.name === this.selectedFormat);

        // Try each input format
        formatsToUse
            .filter(format => format.matches(input))
            .forEach(format => {
                const values = format.convert(input);
                values.forEach(v => allValues.add(v));
            });

        return Array.from(allValues);
    }

    handleInput() {
        const input = this.input.value.trim();
        if (!input) {
            this.resetCards();
            return;
        }

        // Clear existing cards
        this.cardGrid.innerHTML = '';
        const results = [];

        // For each converter
        this.converters.forEach(converter => {
            const possibleValues = this.parseInputFormats(input);
            
            // Try each possible value from input formats
            possibleValues.forEach(value => {
                try {
                    if (converter.isValid(value)) {
                        const timestamp = converter.convert(value);
                        const date = converter.toDate(timestamp);
                        
                        // Create a new card for this interpretation
                        const card = document.createElement('div');
                        card.className = 'timestamp-card match';
                        
                        // Find which input format(s) produced this value
                        const matchingFormats = this.inputFormats
                            .filter(format => format.matches(input))
                            .filter(format => format.convert(input).includes(value))
                            .map(format => format.name)
                            .join(', ');

                        card.innerHTML = `
                            <div class="card-title">${converter.name}</div>
                            <div class="card-description">${converter.description}</div>
                            <div class="input-interpretation">Input interpreted as: ${value} (via ${matchingFormats})</div>
                            <div class="card-value">
                                <div>${this.formatDate(date)}</div>
                                <div class="raw-value">${timestamp}</div>
                            </div>
                            <button class="copy-button" title="Copy to clipboard">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            </button>
                            <a href="${converter.infoUrl}" target="_blank" class="info-link">Learn More →</a>
                        `;
                        
                        const copyButton = card.querySelector('.copy-button');
                        copyButton.addEventListener('click', () => this.handleCopy(card));
                        
                        results.push({ 
                            card, 
                            date, 
                            isMatch: true,
                            value: value,
                            distance: Math.abs(date - new Date())
                        });
                    }
                } catch (e) {
                    console.error(`Error processing ${converter.name} with value ${value}:`, e);
                }
            });

            // If no valid conversions were found for this converter, add a "no match" card
            if (!results.some(r => r.card.querySelector('.card-title').textContent === converter.name)) {
                const card = document.createElement('div');
                card.className = 'timestamp-card no-match';
                card.innerHTML = `
                    <div class="card-title">${converter.name}</div>
                    <div class="card-description">${converter.description}</div>
                    <div class="card-value">Invalid format</div>
                    <button class="copy-button" title="Copy to clipboard">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </button>
                    <a href="${converter.infoUrl}" target="_blank" class="info-link">Learn More →</a>
                `;
                
                results.push({ card, isMatch: false });
            }
        });

        this.sortCards(results);
    }

    sortCards(results) {
        // Sort matching cards by:
        // 1. Whether they match (matches first)
        // 2. For matches, by how close the date is to now
        // 3. For matches with the same date, by converter name
        const sorted = results.sort((a, b) => {
            if (a.isMatch !== b.isMatch) {
                return a.isMatch ? -1 : 1;
            }
            if (a.isMatch) {
                if (a.distance !== b.distance) {
                    return a.distance - b.distance;
                }
                return a.card.querySelector('.card-title').textContent
                    .localeCompare(b.card.querySelector('.card-title').textContent);
            }
            return 0;
        });

        // Add all cards to the grid
        sorted.forEach(result => {
            this.cardGrid.appendChild(result.card);
        });
    }
    
    resetCards() {
        Array.from(this.cardGrid.children).forEach(card => {
            card.classList.remove('match', 'no-match');
            card.querySelector('.card-value').textContent = '';
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new TimestampConverter();
}); 