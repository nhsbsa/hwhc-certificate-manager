// External dependencies
const express = require('express');
const router = express.Router();
const axios = require('axios');



function initPaperMatexQueue(req) {
  if (req.session.data.paperMatexQueue) return;

  const fixtures = req.session.data.patientFixtures || [];

  const paperMatex = fixtures.filter(p =>
    p.certificateType === 'matex' && p.channel === 'Paper'
  );

  req.session.data.paperMatexQueue = paperMatex;
  req.session.data.currentIndex = 0;
  req.session.data.processedToday = 0;

  hydrateImageFields(req, paperMatex[0]);
}

function hydrateImageFields(req, application) {
  if (!application) return;

  req.session.data.imageFirstName = application.firstName;
  req.session.data.imageLastName = application.lastName;
  req.session.data.imageNHSNumber = application.nhsNumber;

  req.session.data.imageDateOfBirth = application.dateOfBirth;

  req.session.data.imageEmailAddress = application.emailAddress || '';

  req.session.data.imageBuildingNumberOrName = application.address.buildingNumber;

  req.session.data.imageAddressLine1 = application.address.streetName;

  req.session.data.imageAddressLine2 = application.address.addressLine2 || '';

  req.session.data.imageTown = application.address.postTown;

  req.session.data.imageCounty = application.address.county || '';

  req.session.data.imagePostcode = application.address.postcode;

  req.session.data.confidence = application.confidence || {};
}

function processCurrentApplication(req) {
  initPaperMatexQueue(req);

  const queue = req.session.data.paperMatexQueue;

  req.session.data.processedToday += 1;

  req.session.data.currentIndex = (req.session.data.currentIndex + 1) % queue.length;

  hydrateImageFields(req, queue[req.session.data.currentIndex]);
}

const PROCESS_OUTCOMES = ['accepted', 'reject', 'further-information'];

function initMedexQueue(req) {
  if (req.session.data.paperMedexQueue) return;

  const fixtures = req.session.data.patientFixtures || [];

  const paperMedex = fixtures.filter(p =>
    p.certificateType === 'medex' && p.channel === 'Paper'
  );

  req.session.data.paperMedexQueue = paperMedex;
  req.session.data.medexIndex = 0;
}

function processMedexApplication(req) {
  initMedexQueue(req);

  const queue = req.session.data.paperMedexQueue;

  req.session.data.medexIndex = (req.session.data.medexIndex + 1) % queue.length;

  hydrateImageFields(req, queue[req.session.data.medexIndex]);
}






router.post(/index/, function (req, res) {
    
    let destination = 'search';

    if( req.originalUrl.indexOf('process-application') > -1 ){
      // process-application/index
      destination = 'other';
    } else {
      if( req.session.data.role === 'backOffice' ){
          destination = 'dashboard';
      }
    }

    res.redirect( destination );
});

router.post(/access-keys/, function (req, res) {

  req.session.data.accessKeys = req.body.accessKeys;

    let destination = 'search';
    if( req.session.data.returnURL && req.session.data.returnURL.indexOf( 'access-keys' ) === -1 ) {
      destination = decodeURIComponent(req.session.data.returnURL);
    } else {
      switch( req.session.data.role ){
        case 'backOffice':
          destination = 'dashboard';
          break;
        case 'backOfficeSupervisor':
          destination = 'dashboard--supervisor';
          break;
        case 'qualityControl':
          destination = 'dashboard--quality-control';
          break;
      }
    }
    res.redirect( destination );
});

router.post(/search/, function (req, res) {
  //console.log( search );
    const destination = 'search-results';
    req.session.data[res.locals.version].currentPage = 0;
    res.redirect( destination );
});

// router.post(/process-application\/experimental--single/, function (req, res) {
//     const destination = 'review-application';
//     res.redirect( destination );
// });

// router.post(/process-application\/cannot-process-application--horizontal-labels-fil/, function (req, res) {

//     initPaperMatexQueue(req);

//     const stats = req.session.data.applicationStats;

//     stats.onHold += 1;
//     stats.total += 1;

//     processCurrentApplication(req);

//     return res.redirect('/v1/process-application/matex');

// });

//THE NEXT GROUP OF ROUTES CONTROL THE BEHAVIOUR OF CERTIFICATES IN THE PROCESS APPLICATION JOURNEY
//START OF GROUP
router.get(/process-application\/matex/, function (req, res) {

  initPaperMatexQueue(req);

  const matexScenarioMap = { accepted: 0, reject: 2, 'further-information': 4 };
  if (req.query.scenario && matexScenarioMap[req.query.scenario] !== undefined) {
    req.session.data.scenarioIndex = matexScenarioMap[req.query.scenario];
  } else if (req.session.data.scenarioIndex === undefined) {
    req.session.data.scenarioIndex = 0;
  }

  const queue = req.session.data.paperMatexQueue;
  const index = req.session.data.currentIndex || 0;
  if (req.query.view) {
    const previousIndex = ((index - 1) + queue.length) % queue.length;
    req.session.data.currentIndex = previousIndex;
    hydrateImageFields(req, queue[previousIndex]);
  } else {
    hydrateImageFields(req, queue[index]);
  }

  res.render('v1/process-application/matex', {
    processedToday: req.session.data.applicationStats.total
  });
});


router.post(/process-application\/matex/, function (req, res) {

if (req.body.formVersion === 'Not MEDEXMATEX') {
  return res.redirect('/v1/process-application/scenarios/not-official-form');
}
  if (req.body.applicationDecision === 'approve') {

    const stats = req.session.data.applicationStats;

    const idx = req.session.data.scenarioIndex || 0;
    const outcome = PROCESS_OUTCOMES[Math.floor(idx / 2) % 3];

    stats.total += 1;
    if (outcome === 'accepted') stats.accepted += 1;
    else if (outcome === 'reject') stats.rejected += 1;
    else if (outcome === 'further-information') stats.onHold += 1;

    req.session.data.approvedFirstName = req.session.data.imageFirstName;
    req.session.data.approvedLastName = req.session.data.imageLastName;
    const rawCertMatex = String(Math.floor(Math.random() * 9000000000) + 1000000000);
    req.session.data.certNumber = `${rawCertMatex.slice(0,4)} ${rawCertMatex.slice(4,7)} ${rawCertMatex.slice(7)}`;
    req.session.data.certificateType = 'matex';

if (outcome === 'accepted') {
  processCurrentApplication(req);
  req.session.data.scenarioIndex = (idx + 1) % 6;
}

return res.redirect('/v1/process-application/scenarios/' + outcome);
  }

  if (req.body.applicationDecision === 'cannotProcess') {
    delete req.session.data.cannotProcessApplication;
    delete req.session.data.cannotProcessApplicationNotes;
    delete req.session.data.reasonForRejection;

    return res.redirect('/v1/process-application/cannot-process-application--horizontal-labels');
  }
});


router.get(/process-application\/medex/, function (req, res) {

  initMedexQueue(req);

  const medexScenarioMap = { accepted: 1, reject: 3, 'further-information': 5 };
  if (req.query.scenario && medexScenarioMap[req.query.scenario] !== undefined) {
    req.session.data.scenarioIndex = medexScenarioMap[req.query.scenario];
  } else if (req.session.data.scenarioIndex === undefined) {
    req.session.data.scenarioIndex = 0;
  }

  const queue = req.session.data.paperMedexQueue;
  const medexIdx = req.session.data.medexIndex || 0;
  if (req.query.view) {
    const previousIndex = ((medexIdx - 1) + queue.length) % queue.length;
    req.session.data.medexIndex = previousIndex;
    hydrateImageFields(req, queue[previousIndex]);
  } else {
    hydrateImageFields(req, queue[medexIdx]);
  }

  res.render('v1/process-application/medex', {
    processedToday: req.session.data.applicationStats.total
  });
});


router.post(/process-application\/medex/, function (req, res) {

  if (req.body.formVersion === 'Not MEDEXMATEX') {
  return res.redirect('/v1/process-application/scenarios/not-official-form');
}

  if (req.body.applicationDecision === 'approve') {

    const stats = req.session.data.applicationStats;

    const idx = req.session.data.scenarioIndex || 0;
    const outcome = PROCESS_OUTCOMES[Math.floor(idx / 2) % 3];

    stats.total += 1;
    if (outcome === 'accepted') stats.accepted += 1;
    else if (outcome === 'reject') stats.rejected += 1;
    else if (outcome === 'further-information') stats.onHold += 1;

    req.session.data.approvedFirstName = req.session.data.imageFirstName;
    req.session.data.approvedLastName = req.session.data.imageLastName;
    const rawCertMedex = String(Math.floor(Math.random() * 9000000000) + 1000000000);
    req.session.data.certNumber = `${rawCertMedex.slice(0,4)} ${rawCertMedex.slice(4,7)} ${rawCertMedex.slice(7)}`;
    req.session.data.certificateType = 'medex';

if (outcome === 'accepted') {
  processMedexApplication(req);
  req.session.data.scenarioIndex = (idx + 1) % 6;
}

return res.redirect('/v1/process-application/scenarios/' + outcome);
  }

  if (req.body.applicationDecision === 'cannotProcess') {
    delete req.session.data.cannotProcessApplication;
    delete req.session.data.cannotProcessApplicationNotes;
    delete req.session.data.reasonForRejection;

    return res.redirect('/v1/process-application/cannot-process-application--horizontal-labels');
  }
});



router.get(/process-application\/scenarios\/accepted/, function (req, res) {
  res.render('v1/process-application/scenarios/accepted', {
    processedToday: req.session.data.applicationStats.total
  });
});

router.get(/process-application\/scenarios\/reject/, function (req, res) {
  res.render('v1/process-application/scenarios/reject', {
    processedToday: req.session.data.applicationStats.total
  });
});

router.get(/process-application\/scenarios\/further-information/, function (req, res) {
  res.render('v1/process-application/scenarios/further-information', {
    processedToday: req.session.data.applicationStats.total
  });
});


router.post(/process-application\/scenarios\/reject/, function (req, res) {
  req.session.data.confirmationType = 'reject';

  return res.redirect('/v1/process-application/scenarios/confirm');
});

router.post(/process-application\/scenarios\/further-information/, function (req, res) {
  req.session.data.confirmationType = 'further-information';
  return res.redirect('/v1/process-application/scenarios/confirm');
});

router.get(/process-application\/scenarios\/confirm/, function (req, res) {
  res.render('v1/process-application/scenarios/confirm', {
    processedToday: req.session.data.applicationStats.total
  });
});

router.post(/process-application\/scenarios\/confirm/, function (req, res) {

  const idx = req.session.data.scenarioIndex || 0;

  if (idx % 2 === 0) {
    processCurrentApplication(req);
  } else {
    processMedexApplication(req);
  }

  req.session.data.scenarioIndex = (idx + 1) % 6;

  const nextType = (req.session.data.scenarioIndex % 2 === 0)
    ? 'matex'
    : 'medex';

  return res.redirect('/v1/process-application/' + nextType);
});


router.get(/process-application\/scenarios\/not-official-form/, function (req, res) {
  res.render('v1/process-application/not-official-form', {
    processedToday: req.session.data.applicationStats.total
  });
});
//END OF GROUP


// router.post(/process-application\/review-application/, function (req, res) {
//     const destination = 'confirmation?confirmationStatus=applicationApproved';
//     res.redirect( destination );
// });


// router.post(/process-application\/cannot-process-application--horizontal-labels/, function (req, res) {

//     const cannotProcessApplication = req.session.data.cannotProcessApplication;

//     const stats = req.session.data.applicationStats;

//     delete req.session.data.furtherInformation;
//     delete req.session.data.furtherInformationRequest;
//     delete req.session.data.furtherInformationNotes;

//     switch (cannotProcessApplication) {

//       case 'askForFurtherInformation':
//         // NOT counted here – handled in --fil
//         return res.redirect(
//           'cannot-process-application--horizontal-labels-fil'
//         );

//       case 'requestKFP':
//         stats.kfp += 1;
//         stats.total += 1;
//         break;

//       case 'rejectApplication':
//         stats.rejected += 1;
//         stats.total += 1;
//         break;
//     }

//     processCurrentApplication(req);

//     res.redirect('experimental--horizontal-labels');
//   }
// );

router.get(/process-application\/cannot-process-application--horizontal-labels-fil/, function (req, res) {

    initPaperMatexQueue(req);

    const queue = req.session.data.paperMatexQueue;
    const index = req.session.data.currentIndex;

    if (req.query.furtherInformationRequest) {
      req.session.data.furtherInformationRequest =
        req.query.furtherInformationRequest;
    }

    res.render(
      'v1/process-application/cannot-process-application--horizontal-labels-fil'
    );
  }
);

router.get(/process-application\/cannot-process-application--horizontal-labels$/, function (req, res) {

    initPaperMatexQueue(req);

    const queue = req.session.data.paperMatexQueue;
    const index = req.session.data.currentIndex;


    res.render(
      'v1/process-application/cannot-process-application--horizontal-labels'
    );
  }
);

router.get(/process-application\/start-processing/, function (req, res) {

// Reset decision state
  delete req.session.data.cannotProcessApplication;
  delete req.session.data.cannotProcessApplicationNotes;
  delete req.session.data.reasonForRejection;
  delete req.session.data.askForFurtherInformation;
  delete req.session.data.sendRequest;
  delete req.session.data.sendRequestEmail;
  delete req.session.data.infoFromPatient;


    // HARD RESET (only here)
  req.session.data.applicationStats = {
    accepted: 0,
    rejected: 0,
    onHold: 0,
    kfp: 0,
    total: 0
  };

    delete req.session.data.paperMatexQueue;
    delete req.session.data.currentIndex;
    delete req.session.data.processedToday;

    // Contact / address inputs
    delete req.session.data.sendRequestEmail;
    delete req.session.data.fullName;
    delete req.session.data.addressLine1;
    delete req.session.data.addressLine2;
    delete req.session.data.addressTown;
    delete req.session.data.addressCounty;
    delete req.session.data.addressPostcode;

    // Image address overrides
    delete req.session.data.imageFirstName;
    delete req.session.data.imageLastName;
    delete req.session.data.imageNHSNumber;
    delete req.session.data.imageDateOfBirth;
    delete req.session.data.imageBuildingNumberOrName;
    delete req.session.data.imageAddressLine1;
    delete req.session.data.imageAddressLine2;
    delete req.session.data.imageTown;
    delete req.session.data.imageCounty;
    delete req.session.data.imagePostcode;

    // Further information (FIL) state
    delete req.session.data.furtherInformation;
    delete req.session.data.furtherInformationRequest;
    delete req.session.data.furtherInformationNotes;

    // Lookup helpers
    delete req.session.data.lookupAddress;
    delete req.session.data.sendRequestHTML;

    // Decisions
    delete req.session.data.cannotProcessApplication;
    delete req.session.data.applicationDecision;

    // Re‑initialise cleanly
    delete req.session.data.paperMedexQueue;
    delete req.session.data.medexIndex;
    req.session.data.scenarioIndex = 0;

    initPaperMatexQueue(req);

    res.redirect(
      '/v1/process-application/matex'
    );
  }
);


router.post(/process-application\/cannot-process-application/, function( req, res){

    const cannotProcessApplication = req.session.data.cannotProcessApplication || 'sendALetter';

    let destination = 'confirmation';

    switch( cannotProcessApplication ){
        case 'sendALetter':
            destination = 'send-a-letter';
            break;
        case 'requestPaperKeyIn':
            destination = 'confirmation?confirmationStatus=requestPaperKeyIn';
            break;
        case 'unableToProcess':
            destination = 'confirmation?confirmationStatus=applicationRejected';
            break;
    }
    
    res.redirect( destination );

});


router.post(/process-application\/postcode-results/, function (req, res) {
    const destination = 'review-application';
    res.redirect( destination );
});

router.post(/process-application\/postcode/, function (req, res) {
    const destination = 'postcode-results';
    res.redirect( destination );
});

router.post(/process-application\/manual-entry/, function (req, res) {
    const destination = 'review-application';
    res.redirect( destination );
});

router.post(/process-application\/other/, function (req, res) {
    const destination = 'postcode';
    res.redirect( destination );
});

router.post(/process-application\/send-a-letter/, function (req, res) {
    const destination = 'confirmation?confirmationStatus=letterSent';
    res.redirect( destination );
});

router.post(/process-application\/matex/, function (req, res) {
    const destination = 'review-application';
    res.redirect( destination );
});


router.post(/process-application/, function (req, res) {
    const destination = 'process-application/other';
    res.redirect( destination );
});

//
// RADIO ADDRESS METHOD 
// Can't actually route through this until they sort out the shai-halud fix...
//
//
router.get(/postcode-handler/, function (req, res) {

  console.log( 'POSTCODE HANDLER' );

  // Prep the variables
  let addressSearchPostcode = req.session.data.addressSearchPostcode.split(' ').join('').toUpperCase();
  const addressSearchBuildingNumberOrName = req.session.data.addressSearchBuildingNumberOrName || '';
  const apiKey = process.env.POSTCODEAPIKEY;
  const regex = RegExp('^([A-PR-UWYZa-pr-uwyz](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Ya-hk-y][0-9]([0-9]|[ABEHMNPRVWXY])?)) ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2})$', 'i');
  addressSearchPostcode = ( regex.test(addressSearchPostcode) ) ? addressSearchPostcode : '';

  const updateResults = ( arr ) => {
    req.session.data.addressSearchResults = arr;
  };

  const toTitleCase = ( str ) => {
    return str.replace( /\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); } );
  }

  const formatAddress = ( address ) => {

    const formattedAddress = [];
    const addressParts = address.split(', ');
    addressParts.forEach( ( part, i ) => {
      if( i !== (addressParts.length - 1) ){
        formattedAddress.push( toTitleCase( part ) );
      } else {
        formattedAddress.push( part );
      }
    });

    return formattedAddress.join(', ');

  };

  let baseURL = '';

  if( addressSearchBuildingNumberOrName ){
    baseURL = 'https://api.os.uk/search/places/v1/find?query=' + encodeURI(addressSearchBuildingNumberOrName);
  }

  if( addressSearchPostcode ){
    baseURL = 'https://api.os.uk/search/places/v1/postcode?postcode=' + encodeURI(addressSearchPostcode);
  }


  // Make the call
  if( baseURL && apiKey ){

    let url = baseURL + '&key=' + apiKey;

    axios.get( url ).then( response => {

      let filteredResults = [];

      if( Array.isArray( response.data.results ) ){

        response.data.results.forEach(function(result){

          let resultPostcode = result.DPA.POSTCODE.split(' ').join('').toUpperCase();

          let obj = { 
            'text' : formatAddress( result.DPA.ADDRESS ),
            'value' : formatAddress( result.DPA.ADDRESS )
          };

          if( addressSearchPostcode ){

            if( addressSearchPostcode.indexOf(resultPostcode) === 0 ){

              let bnon = addressSearchBuildingNumberOrName.trim().toUpperCase();
              if( bnon ){

                // WE HAVE A POSTCODE AND A BUILDING NAME/NUMBER, TRY TO NARROW THE RESULTS DOWN...

                if( result.DPA.BUILDING_NAME ){

                  if( result.DPA.SUB_BUILDING_NAME ){
                    // We can check the SUB_BUILDING_NAME field as well...
                    if( result.DPA.SUB_BUILDING_NAME.indexOf(bnon) > -1 || result.DPA.BUILDING_NAME.indexOf(bnon) > -1 ){
                      filteredResults.push(obj);
                    }
                  } else {
                    // We can only check the BUILDING_NAME field...
                    if( result.DPA.BUILDING_NAME.indexOf(bnon) > -1 ){
                      filteredResults.push(obj);
                    }
                  }
          
                } else if( result.DPA.BUILDING_NUMBER ) {
        
                    if( result.DPA.BUILDING_NUMBER === String(bnon) ){
                      filteredResults.push(obj);
                    }

                }
              } else {

                // WE HAVE A POSTCODE, BUT NO BUILDING NAME/NUMBER, ALLOW EVERYTHING...
                filteredResults.push(obj);
              }
            
            }

          } else {

            // WE DON'T HAVE A POSTCODE, ONLY BUILDING NAME/NUMBER, ALLOW ANYTHING...
            filteredResults.push(obj);

         }

        });

      }

      updateResults( filteredResults );
      res.redirect('process-application--postcode-results');


    }).catch( (error) => { console.log( error ); });
  

} else {

  updateResults([]);
  res.redirect('process-application--postcode?showErrors=true');

}

});


//
// PROCESSOR EDIT
//
router.post(/processor-edit/, function (req, res) {

    const newLevel = req.session.data.processorLevel;
    const newCheckingLevel = req.session.data.checkingLevel;

    req.session.data.processors[req.session.data.searchProcessor].level = newLevel;
    req.session.data.processors[req.session.data.searchProcessor].checkingLevel = newCheckingLevel;
    
    const destination = 'processor?changesMade=true';
    res.redirect( destination );

});

//
// LEAVE FEEDBACK
//
router.post('/comparison--leave-feedback', function (req, res) {
  console.log(req.body);

  const failedCheck = Object.keys(req.body).some(key =>
    key.startsWith('incorrect-')
  );

  console.log('failedCheck:', failedCheck);

  res.redirect(
    failedCheck
      ? 'comparison--confirmation--failed-check'
      : 'comparison--confirmation--passed-check'
  );
});


//
// RESET SEARCH
//
router.get(/reset-search/,function( req, res ){
  
  const destination = 'search';

  delete req.session.data.searchProcessor;
  delete req.session.data.searchCertificateType;
  delete req.session.data.searchCertificateReference;
  delete req.session.data.searchPostcode;
  delete req.session.data.searchFirstName;
  delete req.session.data.searchLastName;
  delete req.session.data.searchDateOfBirth;

  delete req.session.data.searchStatus;
  delete req.session.data.searchChecking;

  req.session.data[res.locals.version].currentPage = 0;

  res.redirect( destination );

});



// ADDRESS LOOKUP 
router.get(/^\/[^\/]+\/address-lookup$/, function (req, res) {

  function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function normPostcode(s) { return (s || '').replace(/\s+/g, '').toUpperCase(); }

const qs = require('querystring');
const parsed = qs.parse(req.url.split('?')[1] || '');

// Persist addressTarget across requests
if (parsed.addressTarget) {
  req.session.addressTarget = parsed.addressTarget;
}

// If lookup is opened fresh (no user input), clear previous state
const noParamsProvided =
  !parsed.addressSearchPostcode &&
  !parsed.addressSearchBuildingNumberOrName;

// Only clear when user is entering lookup from another page (not from result screen)
if (noParamsProvided && !parsed.source && !parsed.returnTo) {
  req.session.data.addressSearchPostcode = '';
  req.session.data.addressSearchBuildingNumberOrName = '';
  req.session.data.addressSearchResults = [];
}

// If user clicked "Search again", wipe previous search state
const isSearchAgain =
  !parsed.addressSearchPostcode &&
  !parsed.addressSearchBuildingNumberOrName &&
  !parsed.source &&   // optional, avoids accidental journey resets
  !parsed.returnTo;

if (isSearchAgain) {
  req.session.data.addressSearchPostcode = '';
  req.session.data.addressSearchBuildingNumberOrName = '';
  req.session.data.addressSearchResults = [];
}

// Normalise source to a journey folder and remember which source invoked lookup
const sourceAlias = { matex: 'matex', hrtppc: 'hrtppc', newHRT: 'hrtppc', medex: 'medex' }; 

// Remember raw source (which page invoked lookup)
req.session.lookupSourceRaw = parsed.source || req.session.lookupSourceRaw || 'hrtppc';

// Set the journey used for template folders
const normalisedJourney = sourceAlias[req.session.lookupSourceRaw] || req.session.lookupJourney || 'hrtppc';
req.session.lookupJourney = normalisedJourney;

req.session.data.lookupJourney = req.session.lookupJourney;

if (parsed.returnTo) {
  req.session.returnTo = parsed.returnTo;
}

req.session.data.addressSearchPostcode = parsed.addressSearchPostcode || '';

req.session.data.addressSearchBuildingNumberOrName =
  parsed.addressSearchBuildingNumberOrName || '';


  // Prep the variables
  let addressSearchPostcode =
  (parsed.addressSearchPostcode || '').replace(/\s+/g, '').toUpperCase();

  const addressSearchBuildingNumberOrName = req.session.data.addressSearchBuildingNumberOrName || '';
  const apiKey = process.env.POSTCODEAPIKEY;
  const regex = RegExp('^([A-PR-UWYZa-pr-uwyz](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Ya-hk-y][0-9]([0-9]|[ABEHMNPRVWXY])?)) ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2})$', 'i');
  addressSearchPostcode = ( regex.test(addressSearchPostcode) ) ? addressSearchPostcode : '';


  let baseURL = '';
  if (addressSearchPostcode) {
  // Prefer postcode endpoint when available (scoped to that postcode)
  baseURL = 'https://api.os.uk/search/places/v1/postcode?postcode=' + encodeURI(addressSearchPostcode);
  } else if (addressSearchBuildingNumberOrName) {
  // Only fall back to find?query=... when there is no postcode at all
  baseURL = 'https://api.os.uk/search/places/v1/find?query=' + encodeURI(addressSearchBuildingNumberOrName);
  }

  if (!baseURL || !apiKey) {
    req.session.data.addressSearchResults = [];
    const journey = req.session.lookupJourney;
    return res.render(`v1/${journey}/address-lookup`, {
      returnTo: req.session.returnTo
    });
  }



  const url = baseURL + '&key=' + apiKey;

  axios.get(url).then(response => {

    const results = [];
  
    function toTitleCase(str) {
      if (!str) return '';
    
      // Whitelist of acronyms to keep uppercase
      const ACRONYMS = new Set([
        'NHS','HMRC','DVLA','ICB','CCG','PCT','GP','UK','NHSBT',
        'UHB','UHBW','UCLH','NCA','ONS','CQC','DBS','MOD','DWP','BBC'
      ]);
    
      // Optional: keep roman numerals uppercase
      const ROMAN = new Set(['I','II','III','IV','V','VI','VII','VIII','IX','X']);
    
      return str.replace(/\w\S*/g, (txt) => {
        const clean = txt.replace(/[^A-Za-z]/g, '');     // strip punctuation for checks
        const upper = clean.toUpperCase();
    
        // Keep acronyms and roman numerals fully uppercase
        if (ACRONYMS.has(upper) || ROMAN.has(upper)) return upper;
    
        // Title-case hyphenated parts properly (e.g., "St. Asaph", "Pont-y-pwl")
        return txt
          .split('-')
          .map(part => part
            ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
            : part
          )
          .join('-');
      });
    }
  

  const targetPostcode = normPostcode(req.session.data.addressSearchPostcode);
  const bnonRaw = (req.session.data.addressSearchBuildingNumberOrName || '').trim();
  const isNumericBnon = /^[0-9]+[A-Za-z]?$/.test(bnonRaw); // 4, 4A, etc.
  const bnonUpper = bnonRaw.toUpperCase();

  if (Array.isArray(response.data.results)) {
  response.data.results.forEach(result => {

  const dpa = result.DPA;

  let raw = (dpa.ADDRESS || '').trim();
  raw = raw.replace(/^(\d+)\s*,\s+/, "$1 ");
  
  // DISPLAY VALUE (title-case except postcode)
  const rawParts = raw.split(',');
  const postcode = rawParts.pop().trim().toUpperCase();
  const before = toTitleCase(rawParts.join(', ').trim());
  const display = [before, postcode].filter(Boolean).join(', ');
  
  const resPc = normPostcode(dpa.POSTCODE);

  // 1) Postcode filter (when we searched by postcode)
  if (targetPostcode && resPc !== targetPostcode) return;

  //
  // 2) BUILDING / FLAT / TEXT FILTER (FINAL VERSION)
  //
  if (bnonRaw) {

    const bn     = (dpa.BUILDING_NUMBER || '').toUpperCase();      // 10, 10A, 6, etc.
    const sub    = (dpa.SUB_BUILDING_NAME || '').toUpperCase();    // FLAT 6, APARTMENT 6-9
    const bname  = (dpa.BUILDING_NAME || '').toUpperCase();        // ST. JAMES HOUSE 3-6
    const org    = (dpa.ORGANISATION_NAME || '').toUpperCase();    // DALEY LETTINGS
    const addr   = raw.toUpperCase();

    let keep = false;

  // ---------------------------
  // A) NUMERIC INPUT (10, 10A, 6)
  // ---------------------------
  if (isNumericBnon) {

    const match = bnonUpper.match(/^(\d+)([A-Z]?)$/);
    const nStr  = match[1];        // numeric part
    const n     = parseInt(nStr);  // integer
    const suff  = match[2];        // letter suffix (A)

    // Normalise building number and address for comparisons
    const bnNS    = bn.replace(/\s+/g, '');       // e.g. "10A"
    const addrNS  = addr.replace(/\s+/g, '');     // e.g. "10,PORTLAND..."

    // (A1) EXACT SUFFIX MATCH (user enters "10A")
    if (suff) {
      keep = (bnNS === `${nStr}${suff}`);
    }

    // (A2) NUMBER MATCH (user enters "10" → match 10 AND 10A)
    if (!keep && !suff) {
      const r = new RegExp(`^${escapeRegex(nStr)}([A-Z])?$`); // 10 or 10A
      keep =
        r.test(bnNS) ||
        addrNS.startsWith(`${nStr},`) ||
        addrNS.startsWith(`${nStr}`);
    }

    // (A3) FLAT NUMBER MATCH (Flat 6, Flat 6-9)
    if (!keep) {
      const flatMatch = sub.match(/^(FLAT|APARTMENT)\s+(\d+)(?:\s*-\s*(\d+))?/);
      if (flatMatch) {
        const start = parseInt(flatMatch[2]);
        const end   = flatMatch[3] ? parseInt(flatMatch[3]) : start;
        if (n >= start && n <= end) keep = true;
      }
    }

    // (A4) BUILDING NAME RANGE MATCH ("St. James House 3-6")
    if (!keep) {
      const range = bname.match(/(\d+)\s*[-–]\s*(\d+)\s*$/);
      if (range) {
        const lo = parseInt(range[1]);
        const hi = parseInt(range[2]);
        if (n >= lo && n <= hi) keep = true;
      }
    }

    if (!keep) return;
  }

  // ---------------------------
  // B) TEXT INPUT (e.g. "daley")
  // ---------------------------
  else {
    if (
      org.includes(bnonUpper) ||
      bname.includes(bnonUpper) ||
      sub.includes(bnonUpper)
    ) {
      keep = true;
    }

    if (!keep) return;
  }
}


results.push({
  text: display,
  value: raw
});
});
}

  
    req.session.data.addressSearchResults = results;
  
    const journey = req.session.lookupJourney || 'matex';
    return res.redirect(`/v1/${journey}/address-lookup-result`);
  
  }).catch(err => {
    console.error(err);
    const journey = req.session.lookupJourney || 'matex';

    return res.render(`v1/${journey}/address-lookup`, {
      returnTo: req.session.returnTo
    });
      
  });
  
});


router.get(/address-lookup-result$/, function (req, res) {
  
  const journey = req.session.lookupJourney || 'matex';

  res.render(`v1/${journey}/address-lookup-result`, {
    returnTo: req.session.returnTo
  });
});


router.post(/^\/[^\/]+\/address-lookup-result$/, function (req, res) {

  function toTitleCase(str) {
    if (!str) return '';
  
    // Whitelist of acronyms to keep uppercase
    const ACRONYMS = new Set([
      'NHS','HMRC','DVLA','ICB','CCG','PCT','GP','UK','NHSBT',
      'UHB','UHBW','UCLH','NCA','ONS','CQC','DBS','MOD','DWP','BBC'
    ]);
  
    // Optional: keep roman numerals uppercase
    const ROMAN = new Set(['I','II','III','IV','V','VI','VII','VIII','IX','X']);
  
    return str.replace(/\w\S*/g, (txt) => {
      const clean = txt.replace(/[^A-Za-z]/g, '');     // strip punctuation for checks
      const upper = clean.toUpperCase();
  
      // Keep acronyms and roman numerals fully uppercase
      if (ACRONYMS.has(upper) || ROMAN.has(upper)) return upper;
  
      // Title-case hyphenated parts properly (e.g., "St. Asaph", "Pont-y-pwl")
      return txt
        .split('-')
        .map(part => part
          ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          : part
        )
        .join('-');
    });
  }
    
  const selectedAddress = req.body.addressSearchResult;

  console.log("RAW IN POST:", selectedAddress);

// Split the selected address string
const parts = selectedAddress.split(',').map(p => p.trim());

// Optional county — only assign if it matches a known county
const knownCounties = [
  'Bedfordshire', 'Berkshire', 'Bristol', 'Buckinghamshire', 'Cambridgeshire', 
  'Cheshire', 'City of London', 'Cornwall', 'County Durham', 'Cumbria', 'Derbyshire', 
  'Devon', 'Dorset', 'East Riding of Yorkshire', 'East Sussex', 'Essex', 'Gloucestershire', 
  'Greater London', 'Greater Manchester', 'Hampshire', 'Herefordshire', 'Hertfordshire', 
  'Isle of Wight', 'Kent', 'Lancashire', 'Leicestershire', 'Oxfordshire', 'Rutland', 'Shropshire', 
  'Somerset', 'South Yorkshire', 'Staffordshire', 'Suffolk', 'Surrey', 'Tyne and Wear', 
  'Warwickshire', 'West Midlands', 'West Sussex', 'West Yorkshire', 'Wiltshire', 'Worcestershire'
];

// Build structured address
const newAddress = {
  addressLineOne: '',
  addressLineTwo: '',
  town: '',
  county: '',
  postcode: ''
};

newAddress.postcode = parts.pop() || '';
newAddress.town = parts.pop() || '';

const lastPart = parts[parts.length - 1];
if (knownCounties.includes(lastPart)) {
  newAddress.county = parts.pop();
}

// FLATS / APARTMENTS CASE
// ------------------------------
// FLATS / APARTMENTS CASE
if (/^(flat|apartment)/i.test(parts[0]) && parts.length >= 2) {

  const flatAndBuilding = parts.shift();     // "APARTMENT 4 ST. JAMES HOUSE"
  const rangeAndStreet  = parts.shift();     // "3-6 PORTLAND TERRACE"

  const rangeMatch = rangeAndStreet.match(/^(\d+(-\d+)?)\s+(.+)$/);

  if (rangeMatch) {
    const range = rangeMatch[1];
    const street = rangeMatch[3];

    newAddress.addressLineOne = toTitleCase(flatAndBuilding);
    newAddress.addressLineTwo = toTitleCase(`${range} ${street}`);

  } else {
    newAddress.addressLineOne = toTitleCase(flatAndBuilding);
    newAddress.addressLineTwo = toTitleCase(rangeAndStreet);
  }

} else {
  // STANDARD HOUSE
  if (parts.length > 0) {
    newAddress.addressLineOne = toTitleCase(parts.shift());
    newAddress.addressLineTwo = toTitleCase(parts.join(', ') || '');
  }
}

// Split building number only if line starts with a number (e.g. "10", "10A")
const numberMatch = newAddress.addressLineOne.match(/^(\d+[A-Za-z]?)(\s+.+)?$/);

if (numberMatch) {
  // Numeric building number
  newAddress.buildingNumber = numberMatch[1];
  newAddress.streetName = (numberMatch[2] || '').trim();
} else {
  // Building name only (no number)
  newAddress.buildingNumber = '';
  newAddress.streetName = newAddress.addressLineOne;
}


// Map which namespace to use based on source (page that opened lookup)
const sourceToNamespace = {
  matex: 'editMATEX',
  hrtppc: 'editHRT',
  newHRT: 'newHRT',
  medex: 'editMEDEX'
};

const rawSource = req.session.lookupSourceRaw || 'hrtppc';
const ns = sourceToNamespace[rawSource] || sourceToNamespace[req.session.lookupJourney] || 'editMATEX';

  
  // Title-case line1 and line2 AFTER parsing
  newAddress.addressLineOne = toTitleCase(newAddress.addressLineOne);
  newAddress.addressLineTwo = toTitleCase(newAddress.addressLineTwo);
  
  // But keep postcode UPPERCASE
  newAddress.postcode = newAddress.postcode.toUpperCase();
  
  // Town should also be cleaned
  newAddress.town = toTitleCase(newAddress.town);
  
  // County only if present
  if (newAddress.county)
    newAddress.county = toTitleCase(newAddress.county);

  req.session.data[ns] = {
    ...(req.session.data[ns] || {}),
    ...newAddress
  };


  // Save selected address for destination page
  req.session.data.lookupAddress = {
    buildingNumber: newAddress.buildingNumber,
    streetName: newAddress.streetName,
    addressLineOne: newAddress.addressLineOne,
    addressLineTwo: newAddress.addressLineTwo,
    town: newAddress.town,
    county: newAddress.county,
    postcode: newAddress.postcode
  };

  if (req.session.addressTarget === 'hcp') {
    req.session.data.lookupHCPAddress = newAddress;
  }
  
  if (req.session.addressTarget === 'patient') {
    req.session.data.lookupPatientAddress = newAddress;
  }

  const returnTo = req.session.returnTo;
  return res.redirect(returnTo);
});



// Pass edit inputs to case screen
router.post(/edit-matex/, function (req, res) {

  const fulfilment = req.body['editMATEX.certificateFulfilment'];
  const email = req.body['editMATEX.email'];
  const addressLineOne = req.body['editMATEX.addressLineOne'];
  const postcode = req.body['editMATEX.postcode'];
  const notes = req.body['editMATEX.notes'];

  const errors = [];

  //Email fulfilment selected but email address not entered
  if (fulfilment === 'email' && (!email || email.trim() === "")) {
    errors.push ({
      text: "Enter the certificate holder's email address",
      href: "#email"
    });
  }

  //Fulfilment is Post but address and/or postcode missing
  if (fulfilment === 'post') {

    const missingAddress = !addressLineOne || addressLineOne.trim() === "";
    const missingPostcode = !postcode || postcode.trim() === "";

    if (missingAddress) {
      errors.push({
        text: "Enter certificate holder's address line 1",
        href: "#address-line-1"
      });
    }
    else if (missingPostcode) {
      errors.push({
        text: "Enter certificate holder's postcode",
        href: "#postcode"
      });
    }
  }

  //If errors, redirect back
  if (errors.length > 0) {
    const data = {
      ...req.session.data,
      errors,
      editMATEX: {
        ...(req.session.data.editMATEX || {}),
        certificateFulfilment: fulfilment ?? '',
        email: email ?? '',
        addressLineOne: addressLineOne ?? '',
        postcode: postcode ?? '',
        notes: notes ?? ''
      }
    };
  
    // Optionally also set flattened keys if your template reads those
    data['editMATEX.certificateFulfilment'] = data.editMATEX.certificateFulfilment;
    data['editMATEX.email'] = data.editMATEX.email;
    data['editMATEX.addressLineOne'] = data.editMATEX.addressLineOne;
    data['editMATEX.postcode'] = data.editMATEX.postcode;
    data['editMATEX.notes'] = data.editMATEX.notes;
  
    // Do NOT update req.session here; just render the error state
    return res.status(400).render('v1/matex/edit-or-reissue', { data });
  }

  //No errors? Continue as normal
  req.session.data.errors = null;

  
  req.session.data.editMATEX = req.session.data.editMATEX || {};

  // Accept any common name pattern from the dateInput macro
  const pick = (...candidates) =>
    candidates.find(v => v !== undefined && v !== null && v !== '') || '';

  const d = pick(
    req.body['childDOB-day'],
    req.body?.childDOB?.day,
    req.body['childDOB.day'],
    req.body['day']  
  );
  const m = pick(
    req.body['childDOB-month'],
    req.body?.childDOB?.month,
    req.body['childDOB.month'],
    req.body['month'] 
  );
  const y = pick(
    req.body['childDOB-year'],
    req.body?.childDOB?.year,
    req.body['childDOB.year'],
    req.body['year']            
  );

  // If user submitted anything, these will be set; otherwise leave defaults as-is
  if (d && m && y) {
    const day   = parseInt(d, 10);
    const month = parseInt(m, 10);
    const year  = parseInt(y, 10);

    const dob = new Date(year, month - 1, day);
    if (!isNaN(dob.getTime())) {
      // Expiry = (DOB + 1 year) - 1 day
      const expiry = new Date(dob);
      expiry.setFullYear(expiry.getFullYear() + 1);
      expiry.setDate(expiry.getDate() - 1);

      // Format (no template filters needed)
      const fmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

      // ISO + Display for child DOB
      req.session.data.editMATEX.childDOBISO      = dob.toISOString().slice(0,10);
      req.session.data.editMATEX.childDOBDisplay = fmt.format(dob);

      // ISO + Display for expiry
      req.session.data.editMATEX.expiryISO        = expiry.toISOString().slice(0,10);
      req.session.data.editMATEX.expiryDisplay    = fmt.format(expiry);

      // Start date rule: start = child's due/birth date
      req.session.data.editMATEX.startISO         = req.session.data.editMATEX.childDOBISO;
      req.session.data.editMATEX.startDisplay     = req.session.data.editMATEX.childDOBDisplay;

      // Also prefill helpers so the edit page re-opens with the last inputs
      req.session.data.childDOBDay   = String(day);
      req.session.data.childDOBMonth = String(month);
      req.session.data.childDOBYear  = String(year);
    }
  }

  const data = req.session.data || {};
  data.editMATEX = data.editMATEX || {};

  if ('editMATEX.firstName' in req.body) data.editMATEX.firstName = req.body['editMATEX.firstName'];
  if ('editMATEX.lastName'  in req.body) data.editMATEX.lastName  = req.body['editMATEX.lastName'];
  if ('editMATEX.email' in req.body) data.editMATEX.email = req.body['editMATEX.email'];
  if ('editMATEX.certificateFulfilment' in req.body) data.editMATEX.certificateFulfilment = req.body['editMATEX.certificateFulfilment'];
  if ('editMATEX.addressLineOne' in req.body) data.editMATEX.addressLineOne = req.body['editMATEX.addressLineOne'];
  if ('editMATEX.addressLineTwo' in req.body) data.editMATEX.addressLineTwo = req.body['editMATEX.addressLineTwo'];
  if ('editMATEX.town' in req.body)          data.editMATEX.town   = req.body['editMATEX.town'];
  if ('editMATEX.county' in req.body)        data.editMATEX.county = req.body['editMATEX.county'];
  if ('editMATEX.postcode' in req.body)      data.editMATEX.postcode = req.body['editMATEX.postcode'];
  if ('editMATEX.telephoneNumber' in req.body) data.editMATEX.telephoneNumber = req.body['editMATEX.telephoneNumber'];

  req.session.data = data;

  if (req.body.action === 'reissue') {
    return res.redirect('/v1/matex/reissue-complete');
  }
  return res.redirect('/v1/matex/case');
});



router.post(/edit-hrt/, function (req, res) {
  const data = req.session.data || {};
  data.editHRT = data.editHRT || {}; 

  if ('editHRT.firstName' in req.body)
    data.editHRT.firstName = req.body['editHRT.firstName'];

  if ('editHRT.lastName' in req.body)
    data.editHRT.lastName = req.body['editHRT.lastName'];

  if ('editHRT.email' in req.body)
    data.editHRT.email = req.body['editHRT.email'];

  if ('editHRT.certificateFulfilment' in req.body)
    data.editHRT.certificateFulfilment = req.body['editHRT.certificateFulfilment'];

  if ('editHRT.addressLineOne' in req.body)
    data.editHRT.addressLineOne = req.body['editHRT.addressLineOne'];

  if ('editHRT.addressLineTwo' in req.body)
    data.editHRT.addressLineTwo = req.body['editHRT.addressLineTwo'];

  if ('editHRT.town' in req.body)
    data.editHRT.town = req.body['editHRT.town'];

  if ('editHRT.county' in req.body)
    data.editHRT.county = req.body['editHRT.county'];

  if ('editHRT.postcode' in req.body)
    data.editHRT.postcode = req.body['editHRT.postcode'];

  if ('editHRT.telephoneNumber' in req.body)
    data.editHRT.telephoneNumber = req.body['editHRT.telephoneNumber'];

  req.session.data = data;

  // if reissue button is clicked
  if (req.body.action === 'reissue') {
    return res.redirect ('/v1/hrtppc/reissue-complete')
  }

  // if save details is clicked
  return res.redirect('/v1/hrtppc/case');
});


// Pass edit inputs to case screen
router.post(/edit-medex/, function (req, res) {

  const fulfilment = req.body['editMEDEX.certificateFulfilment'];
  const email = req.body['editMEDEX.email'];
  const addressLineOne = req.body['editMEDEX.addressLineOne'];
  const postcode = req.body['editMEDEX.postcode'];
  const notes = req.body['editMEDEX.notes'];

  const errors = [];

  //Email fulfilment selected but email address not entered
  if (fulfilment === 'email' && (!email || email.trim() === "")) {
    errors.push ({
      text: "Enter the certificate holder's email address",
      href: "#email"
    });
  }

  //Fulfilment is Post but address and/or postcode missing
  if (fulfilment === 'post') {

    const missingAddress = !addressLineOne || addressLineOne.trim() === "";
    const missingPostcode = !postcode || postcode.trim() === "";

    if (missingAddress) {
      errors.push({
        text: "Enter certificate holder's address line 1",
        href: "#address-line-1"
      });
    }
    else if (missingPostcode) {
      errors.push({
        text: "Enter certificate holder's postcode",
        href: "#postcode"
      });
    }
  }

  //If errors, redirect back
  if (errors.length > 0) {
    const data = {
      ...req.session.data,
      errors,
      editMEDEX: {
        ...(req.session.data.editMEDEX || {}),
        certificateFulfilment: fulfilment ?? '',
        email: email ?? '',
        addressLineOne: addressLineOne ?? '',
        postcode: postcode ?? '',
        notes: notes ?? ''
      }
    };
  
    // Optionally also set flattened keys if your template reads those
    data['editMEDEX.certificateFulfilment'] = data.editMEDEX.certificateFulfilment;
    data['editMEDEX.email'] = data.editMEDEX.email;
    data['editMEDEX.addressLineOne'] = data.editMEDEX.addressLineOne;
    data['editMEDEX.postcode'] = data.editMEDEX.postcode;
    data['editMEDEX.notes'] = data.editMEDEX.notes;
  
    // Do NOT update req.session here; just render the error state
    return res.status(400).render('v1/medex/edit-or-reissue', { data });
  }

  //No errors? Continue as normal
  req.session.data.errors = null;

  
  req.session.data.editMEDEX = req.session.data.editMEDEX || {};

  const data = req.session.data || {};
  data.editMEDEX = data.editMEDEX || {};

  if ('editMEDEX.firstName' in req.body) data.editMEDEX.firstName = req.body['editMEDEX.firstName'];
  if ('editMEDEX.lastName'  in req.body) data.editMEDEX.lastName  = req.body['editMEDEX.lastName'];
  if ('editMEDEX.email' in req.body) data.editMEDEX.email = req.body['editMEDEX.email'];
  if ('editMEDEX.certificateFulfilment' in req.body) data.editMEDEX.certificateFulfilment = req.body['editMEDEX.certificateFulfilment'];
  if ('editMEDEX.addressLineOne' in req.body) data.editMEDEX.addressLineOne = req.body['editMEDEX.addressLineOne'];
  if ('editMEDEX.addressLineTwo' in req.body) data.editMEDEX.addressLineTwo = req.body['editMEDEX.addressLineTwo'];
  if ('editMEDEX.town' in req.body)          data.editMEDEX.town   = req.body['editMEDEX.town'];
  if ('editMEDEX.county' in req.body)        data.editMEDEX.county = req.body['editMEDEX.county'];
  if ('editMEDEX.postcode' in req.body)      data.editMEDEX.postcode = req.body['editMEDEX.postcode'];
  if ('editMEDEX.telephoneNumber' in req.body) data.editMEDEX.telephoneNumber = req.body['editMEDEX.telephoneNumber'];

  req.session.data = data;

  if (req.body.action === 'reissue') {
    return res.redirect('/v1/medex/reissue-complete');
  }
  return res.redirect('/v1/medex/case');
});



router.get('/v1/hrtppc/edit-or-reissue', (req, res) => {

  console.log( req );

  res.render(
    'v1/hrtppc/edit-or-reissue',
    getCertificateViewData(req)
  );
});




router.get(/^\/v1\/(matex|medex)\/edit-or-reissue$/, function (req, res) {

  const iso = req.session.data?.editMATEX?.childDOBISO; // e.g. "2025-12-05"
  if (iso && /^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    req.session.data.childDOBYear  = iso.substring(0, 4);
    req.session.data.childDOBMonth = iso.substring(5, 7);
    req.session.data.childDOBDay   = iso.substring(8,10);
  } else {
    // ensure defaults are present if nothing is saved yet
    req.session.data.childDOBYear  = req.session.data.childDOBYear  || '2025';
    req.session.data.childDOBMonth = req.session.data.childDOBMonth || '11';
    req.session.data.childDOBDay   = req.session.data.childDOBDay   || '25';
  }
  return res.render(`v1/${req.params[0]}/edit-or-reissue`);
});


//
// CASE EDIT SCREEN
//
router.get(/^\/v1\/(matex|medex)\/case--edit$/, function(req, res){

  const lookupAddress = req.session.data.lookupAddress;
  delete req.session.data.lookupAddress;

  const match = req.url.match(/^\/v1\/(matex|medex)\/case--edit$/);
  const type = match ? match[1] : 'matex';

  res.render(`v1/${type}/case--edit`, {
    ...req.session.data,
    lookupAddress
  });

});


// router.post(/^\/v1\/(matex|medex)\/case--edit$/, function(req, res){

//   const match = req.url.match(/^\/v1\/(matex|medex)\/case--edit$/);
//   const type = match ? match[1] : 'matex';

//   return res.redirect(`/v1/${type}/case--view--can-edit`);

// });



//
// COMPARISON EDIT SCREEN
//
router.post(/comparison--edit/, function( req, res ){
  const destination = 'comparison--correction';
  return res.redirect( destination );
});

router.get('/v1/matex/cannot-process-application--correction', function (req, res) {

  // Clear previous cannot-process correction state
  delete req.session.data.cannotProcessApplicationCorrection;
  delete req.session.data.cannotProcessApplicationNotes;
  delete req.session.data.reasonForRejection;

  res.render('v1/matex/cannot-process-application--correction');
});

router.post(/edit-medical-condition/, (req, res) => {

  // Get values from form (force to array)
  let values = [].concat(req.body['editMEDEX.medicalCondition'] || []);

  // Remove unwanted values
  values = values.filter(v => v && v !== '_unchecked');

  // Save to session
  req.session.data.editMEDEX = req.session.data.editMEDEX || {};
  req.session.data.editMEDEX.medicalCondition = values;

  res.redirect('/v1/medex/case--edit');
});


// Completed changes when checking application route
router.get('/v1/change-complete', function (req, res) {
  res.render('v1/change-complete');
});

//outomes when editing an on-hold application
// router.post(/^\/v1\/(matex|medex)\/case--edit$/, function (req, res) {
//   const match = req.url.match(/^\/v1\/(matex|medex)\/case--edit$/)
//   const type = match ? match[1] : 'matex'

//   const dobDay =
//     req.body['imageDateOfBirth-day'] ||
//     req.body.imageDateOfBirth?.day

//   const dobMonth =
//     req.body['imageDateOfBirth-month'] ||
//     req.body.imageDateOfBirth?.month

//   const dobYear =
//     req.body['imageDateOfBirth-year'] ||
//     req.body.imageDateOfBirth?.year

//   const postcode = (req.body.imagePostcode || '').trim()

//   if (!dobDay || !dobMonth || !dobYear) {
//     return res.redirect(`/v1/${type}/case--edit/reject`)
//   }

//   if (!postcode) {
//     return res.redirect(`/v1/${type}/case--edit/further-information`)
//   }

//   return res.redirect(`/v1/${type}/case--edit/confirmation--approved`)
// })

// router.get(/^\/v1\/(matex|medex)\/case--edit\/reject$/, (req, res) => {
//   res.render(`v1/${req.params[0]}/case--edit/reject`, req.session.data);
// });

// router.get(/^\/v1\/(matex|medex)\/case--edit\/further-information$/, (req, res) => {
//   res.render(`v1/${req.params[0]}/case--edit/further-information`, req.session.data);
// });

// router.get(/^\/v1\/(matex|medex)\/case--edit\/confirmation--approved$/, (req, res) => {
//   res.render(`v1/${req.params[0]}/case--edit/confirmation--approved`, req.session.data);
// });


router.get(/^\/(matex|medex)\/case--edit$/, function(req, res) {
  const type = req.url.match(/^\/(matex|medex)\/case--edit$/)?.[1] || 'matex'

  res.render(`v1/${type}/case--edit`, {
    ...req.session.data
  })
})

router.post(/^\/(matex|medex)\/case--edit$/, function(req, res) {
  const type = req.url.match(/^\/(matex|medex)\/case--edit$/)?.[1] || 'matex'

  const dobDay =
    req.body['imageDateOfBirth-day'] ||
    req.body.imageDateOfBirth?.day

  const dobMonth =
    req.body['imageDateOfBirth-month'] ||
    req.body.imageDateOfBirth?.month

  const dobYear =
    req.body['imageDateOfBirth-year'] ||
    req.body.imageDateOfBirth?.year

  const postcode = (req.body.imagePostcode || '').trim()

  if (!dobDay || !dobMonth || !dobYear) {
    return res.redirect(`/v1/${type}/case--edit/reject`)
  }

  if (!postcode) {
    return res.redirect(`/v1/${type}/case--edit/further-information`)
  }

  return res.redirect(`/v1/${type}/case--edit/confirmation--approved`)
})

module.exports = router;
