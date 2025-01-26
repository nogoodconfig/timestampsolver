# Timestamp Solver

🚀 **Try it now**: [https://nogoodconfig.github.io/timestampsolver/](https://nogoodconfig.github.io/timestampsolver/)

A tool for digital forensics investigators and researchers to identify and convert unknown timestamp formats. Quickly analyze and convert between Unix timestamps, Apple Cocoa timestamps, Windows FILETIME, and many other formats commonly encountered in digital forensics and research.

## Features

- **Multiple Timestamp Formats**:
  - Unix timestamps (seconds, milliseconds, microseconds, nanoseconds)
  - Apple Cocoa/Core Data timestamps
  - Windows timestamps (FILETIME, SYSTEMTIME, MS-DOS FAT)
  - Network protocol timestamps (GPS, Twitter Snowflake, Discord Snowflake)
  - Database timestamps (LDAP, SQLite Julian Day, SAS)
  - Forensic artifacts timestamps (NTFS, HFS, Exchange)
  - And many more...

- **Input Format Support**:
  - Decimal numbers
  - Hexadecimal (with optional 0x prefix)
  - Binary (with optional 0b prefix)
  - Space-delimited hex bytes
  - Little-endian byte representation
  - Binary-coded decimal (BCD)
  - Various specialized formats

- **Features**:
  - Real-time conversion
  - Multiple interpretations of the same input
  - Copy results to clipboard
  - Links to format documentation
  - Input format filtering
  - Mobile-friendly design

## Usage

1. Enter a timestamp value in the input box
2. The tool automatically attempts all possible conversions
3. Results are sorted by relevance, with the most likely interpretations first
4. Use the format selector to filter input interpretations
5. Click the copy button to copy results to clipboard

## Supported Formats

### Timestamp Types
- Unix Epoch (Seconds, Milliseconds, Microseconds, Nanoseconds)
- Apple Cocoa/Core Data (Seconds, Milliseconds, Microseconds, Nanoseconds)
- Windows FILETIME
- MS-DOS FAT
- NTFS Timestamp
- Windows SYSTEMTIME
- Exchange/ActiveSync
- OLE Automation Date
- GPS Time
- Twitter/Discord Snowflake IDs
- UUID v1 Timestamps
- WebKit/Chromium Timestamps
- LDAP/Active Directory
- SQLite Julian Day
- VMS Timestamp
- POSIX timespec
- SAS Datetime/Date
- ISO Week Date
- Julian Day
- TAI (International Atomic Time)
- IRIG Timecode
- SMPTE Timecode
- MIDI Timestamp
- RFC 2550 Date

### Input Formats
- Decimal
- Hexadecimal
- Binary
- Hex Bytes
- Little-endian
- BCD
- GSM
- UUID
- Java Instant
- LDAP Time
- ISO Week
- IRIG
- GPS Week
- SMPTE
- RFC 2550

## Contributing

Feel free to contribute by:
1. Opening issues for bugs or feature requests
2. Submitting pull requests for improvements
3. Adding new timestamp formats or input formats
4. Improving documentation

## License

GNU General Public License v3.0 - See [LICENSE](LICENSE) for details. 
