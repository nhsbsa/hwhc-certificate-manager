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
        
    },

    patientFixtures: [
      {
        firstName: 'Sorah',
        lastName: 'Jaaahnson',
        certificateType: 'matex',
        channel: 'Paper',
        nhsNumber: '1252 567 987',
        dateOfBirth: {
          day: '2',
          month: '7',
          year: '1995'
        },
        address: {
          buildingNumber: '12',
          streetName: 'Crown Passage',
          addressLine2: '',
          postTown: 'Birmingham',
          county: '',
          postcode: 'B14 9QX'
        },
        confidence: {
          lastName: 50,      // Medium
          firstName: 50,     // Medium
          childDOB: 10       // Low (blank)
        }
      },
    
      {
        firstName: 'Beatrice',
        lastName: 'Speiiincer',
        certificateType: 'matex',
        channel: 'Paper',
        nhsNumber: '672 965 3123',
        dateOfBirth: {
          day: '24',
          month: '7',
          year: '1997'
        },
        address: {
          buildingNumber: '2',
          streetName: 'Applllleton Gardens',
          addressLine2: '',
          postTown: 'Rochiiford',
          county: '',
          postcode: 'SS4 1WW'
        },
        confidence: {
          lastName: 50, // Medium
          address: {
            buildingNumber: 50,
            streetName: 50,
            addressLine2: 50,
            postTown: 50,
            county: 50, 
            postcode: 50
          }
        }
      },
    
      {
        firstName: 'Megan',
        lastName: 'Rees',
        certificateType: 'matex',
        channel: 'Paper',
        nhsNumber: '318 844 5688',
        emailAddress: 'megan.riieeees@example.com',
        address: {
          buildingNumber: '66',
          streetName: 'Fieldhouse Lane',
          addressLine2: 'Greywood',
          postTown: 'Bolton',
          county: 'Greater Manchester',
          postcode: 'BL3 9HB'
        },
        confidence: {
          dateOfBirth: 10, // Low (blank)
          email: 50,       // Medium
          nhsNumber: 50    // Medium
        }
      },
    
      {
        firstName: 'Annabelle',
        lastName: 'Watts',
        certificateType: 'matex',
        channel: 'Paper',
        nhsNumber: '459 137 4821',
        dateOfBirth: {
          day: '11',
          month: '4',
          year: '1983'
        },
        address: {
          buildingNumber: '52',
          streetName: 'Warren Terrace',
          addressLine2: 'Elmwick',
          postTown: 'Scarborough',
          county: 'North Yorkshire',
          postcode: 'YO14 2JG'
        },
        confidence: {
          lastName: 50,
          nhsNumber: 50
        }
      }
    ],

    applicationStats: {
      accepted: 0,
      rejected: 0,
      rescans: 0,
      onHold: 0,
      total: 0
    }

}