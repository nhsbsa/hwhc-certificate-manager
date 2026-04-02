module.exports = {

    debug: 'false',

    role: 'callCentre', // callCentre, backOffice, backOfficeSupervisor, qualityControl
    
    NHSPrescriptionCost: '£9.90',
    HRTPPCCost: '£19.80',

    accessKeys: 'on',

    processors: {
        'AICOL': {
            name: 'Aisha Collins',
            level: 'standard',
            stats: [78,0,1,0,79],
            checkingLevel: '0' // Zero is falsey
        },
        'DATHO': {
            name: 'Daniel Thompson',
            level: 'standard',
            stats: [80,8,1,0,89],
            checkingLevel: '0'
        },
        'JASMI': {
            name: 'James Smith',
            level: 'trainee',
            stats: [7,2,1,1,10],
            checkingLevel: '100'
        },
        'PRPAT': {
            name: 'Priya Patel',
            level: 'supervisor',
            stats: [68,8,3,0,79],
            checkingLevel: '0'
        },
        'ZAKHA': {
            name: 'Zara Khan',
            level: 'standard',
            stats: [70,10,5,0,85],
            checkingLevel: '0'
        }
    },

    v1: {

        rowsPerPage: 10,
        currentPage: 0,
        certificateTypes: ['matex','hrtppc'],
        sortBy: 'lastName',
        sortDirection: 'descending',
        
        allowSearchCopyPaste: 'true'
        
    }

}