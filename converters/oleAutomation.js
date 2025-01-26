const oleAutomationConverter = {
    id: 'oleAutomation',
    name: 'OLE Automation Date',
    description: 'OLE Automation date as double-precision float, days since December 30, 1899',
    infoUrl: 'https://learn.microsoft.com/en-us/office/vba/language/reference/user-interface-help/dateserial-function',
    
    // OLE dates are days since December 30, 1899
    OLE_EPOCH: new Date(Date.UTC(1899, 11, 30)),

    isValid(value) {
        return value >= -657434 && value <= 2958465; // ~1/1/100 to 12/31/9999
    },

    convert(value) {
        return Number(value);
    },

    toDate(days) {
        const milliseconds = this.OLE_EPOCH.getTime() + (days * 24 * 60 * 60 * 1000);
        return new Date(milliseconds);
    }
}; 