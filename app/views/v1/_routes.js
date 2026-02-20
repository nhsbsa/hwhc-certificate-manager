// External dependencies
const express = require('express');
const router = express.Router();
const axios = require('axios');

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

router.post(/process-application\/experimental--single/, function (req, res) {
    const destination = 'review-application';
    res.redirect( destination );
});

router.post(/process-application\/review-application/, function (req, res) {
    const destination = 'confirmation?confirmationStatus=applicationApproved';
    res.redirect( destination );
});

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

router.post(/process-application\/experimental--horizontal-labels/, function (req, res) {
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
router.post(/comparison--leave-feedback/, function( req, res ){

  const destination = ( req.session.data.processingApproved === 'no' ) ? 'comparison--failed-check' : 'comparison--passed-check';
  res.redirect( destination );

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
const sourceAlias = { matex: 'matex', hrtppc: 'hrtppc', newHRT: 'hrtppc' }; 

// Remember raw source (which page invoked lookup)
req.session.lookupSourceRaw = parsed.source || req.session.lookupSourceRaw || 'hrtppc';

// Set the journey used for template folders
const normalisedJourney = sourceAlias[req.session.lookupSourceRaw] || req.session.lookupJourney || 'hrtppc';
req.session.lookupJourney = normalisedJourney;

req.session.data.lookupJourney = req.session.lookupJourney;

req.session.returnTo = parsed.returnTo || req.session.returnTo;

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
    return res.render(`v1/${journey}/address-lookup`);
  }



  const url = baseURL + '&key=' + apiKey;

  axios.get(url).then(response => {

    const results = [];
  
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, txt =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
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
  text: display,   // pretty
  value: raw       // original OS format — REQUIRED for correct split in POST
});
});
}

  
    req.session.data.addressSearchResults = results;
  
    const journey = req.session.lookupJourney || 'matex';
    return res.redirect(`/v1/${journey}/address-lookup-result`);
  
  }).catch(err => {
    console.error(err);
    const journey = req.session.lookupJourney || 'matex';
    return res.render(`v1/${journey}/address-lookup`);
  });
  
});


router.get(/^\/[^\/]+\/address-lookup-result$/, function (req, res) {
  
  const journey = req.session.lookupJourney || 'matex';
  return res.render(`v1/${journey}/address-lookup-result`);
});


router.post(/^\/[^\/]+\/address-lookup-result$/, function (req, res) {

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
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
if (/^(flat|apartment)/i.test(parts[0]) && parts.length >= 2) {

  const flatAndBuilding = parts.shift();     // "APARTMENT 4 ST. JAMES HOUSE"
  const rangeAndStreet  = parts.shift();     // "3-6 PORTLAND TERRACE"

  // Detect pattern: "<range> <street>"
  // Example: "3-6 PORTLAND TERRACE"
  const rangeMatch = rangeAndStreet.match(/^(\d+(-\d+)?)\s+(.+)$/);

  if (rangeMatch) {
    const range = rangeMatch[1];             // "3-6"
    const street = rangeMatch[3];            // "PORTLAND TERRACE"

    newAddress.addressLineOne = toTitleCase(flatAndBuilding);
    newAddress.addressLineTwo = toTitleCase(`${range} ${street}`);

  } else {
    // Fallback if pattern unexpected
    newAddress.addressLineOne = toTitleCase(flatAndBuilding);
    newAddress.addressLineTwo = toTitleCase(rangeAndStreet);
  }

} else {
  // STANDARD HOUSE
  if (parts.length > 0) {
    newAddress.addressLineOne = parts.shift();     // ← THIS fixes "10 Portland Terrace"
    newAddress.addressLineTwo = parts.join(', ') || '';
  }
}


// Map which namespace to use based on source (page that opened lookup)
const sourceToNamespace = {
  matex: 'editMATEX',
  hrtppc: 'editHRT',
  newHRT: 'newHRT' 
};

const rawSource = req.session.lookupSourceRaw || 'hrtppc';
const ns = sourceToNamespace[rawSource] || sourceToNamespace[req.session.lookupJourney] || 'editHRT';

  
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

  req.session.data[ns] = newAddress;

  const returnTo = req.session.returnTo;
  return res.redirect(returnTo);
});

// Pass edit inputs to case screen
router.post(/edit-matex/, function (req, res) {

  req.session.data.editMATEX = req.session.data.editMATEX || {};

  // Accept any common name pattern from the dateInput macro
  const pick = (...candidates) =>
    candidates.find(v => v !== undefined && v !== null && v !== '') || '';

  // Your log showed bare keys: 'day', 'month', 'year'
  const d = pick(
    req.body['childDOB-day'],
    req.body?.childDOB?.day,
    req.body['childDOB.day'],
    req.body['day']               // <-- bare (your log)
  );
  const m = pick(
    req.body['childDOB-month'],
    req.body?.childDOB?.month,
    req.body['childDOB.month'],
    req.body['month']             // <-- bare
  );
  const y = pick(
    req.body['childDOB-year'],
    req.body?.childDOB?.year,
    req.body['childDOB.year'],
    req.body['year']              // <-- bare
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
  if ('editMATEX.email'     in req.body) data.editMATEX.email     = req.body['editMATEX.email'];
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

router.get(/edit-or-reissue/, function (req, res) {
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
  return res.render('v1/matex/edit-or-reissue');
});

module.exports = router;
