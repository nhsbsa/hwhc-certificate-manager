module.exports = {

    debug: 'false',

    role: 'callCentre', // callCentre, backOffice, backOfficeSupervisor, qualityControl
    
    NHSPrescriptionCost: '£9.90',
    HRTPPCCost: '£19.80',

    accessKeys: 'on',

    v1: {
        rowsPerPage: 10,
        currentPage: 0,
        certificateTypes: ['matex','hrtppc'],
        sortBy: 'lastName',
        sortDirection: 'descending', // Test
        
    }

}