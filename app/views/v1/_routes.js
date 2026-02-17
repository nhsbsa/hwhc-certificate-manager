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


//
// ADDRESS LOOKUP 
//
//
router.get(/address-lookup/, function (req, res) {

  // Store return location and source journey
  if (req.query.returnTo) {
    req.session.returnTo = req.query.returnTo;
  }

  if (req.query.source) {
    req.session.lookupSource = req.query.source;
  }


  // Prep the variables
  let addressSearchPostcode =
  (req.query.addressSearchPostcode || '')
    .split(' ')
    .join('')
    .toUpperCase();
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
      return res.render('v1/matex/address-lookup-result');

    }).catch( (error) => { console.log( error ); });
  

    } else {

      req.session.data.showErrors = true;
      updateResults([]);

      return res.render('v1/hrtppc/address-lookup');
    }

});

router.get(/address-lookup-result/, function (req, res) {
    res.render('v1/matex/address-lookup-result');

});

router.post(/address-lookup-result/, function (req, res) {

  const selectedAddress = req.body.addressSearchResult;


  if (!selectedAddress) {
    return res.redirect('address-lookup-result');
  }


  // Split the select address string
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

  // Flat or apartment case
  if (/^(flat|apartment)/i.test(parts[0]) && parts.length >= 2) {

    const flatPart = parts.shift();           // "Apartment 1"
    let buildingPart = parts.shift();         // "St. James House 3-6"

    // Detect trailing number or number range in building part
    const rangeMatch = buildingPart.match(/(.+)\s(\d+(-\d+)?)$/);

    if (rangeMatch && parts.length >= 1) {
      const buildingName = rangeMatch[1];     // "St. James House"
      const buildingRange = rangeMatch[2];    // "3-6"
      const streetPart = parts.shift();       // "Portland Terrace"

      newAddress.addressLineOne = `${flatPart}, ${buildingName}`;
      newAddress.addressLineTwo = `${buildingRange}, ${streetPart}`;
    } else {
      newAddress.addressLineOne = `${flatPart}, ${buildingPart}`;
      newAddress.addressLineTwo = parts.join(', ') || '';
    }

  } else {
    // Standard handling
      if (parts.length > 0) {
        newAddress.addressLineOne = parts.shift();        // first part
        newAddress.addressLineTwo = parts.join(', ') || ''; // rest
      }
    }

    const source = req.session.lookupSource;

    if (source) {
      req.session.data[source] = newAddress;
    }
  
  
    const returnTo = req.session.returnTo;
    delete req.session.lookupSource;
    delete req.session.returnTo;
    
    return res.redirect(returnTo);
    
 
});

// Pass edit inputs to case screen
router.post(/edit-matex/, function (req, res) {
  const data = req.session.data || {};
  data.editMATEX = data.editMATEX || {}; 

  if ('editMATEX.firstName' in req.body)
    data.editMATEX.firstName = req.body['editMATEX.firstName'];

  if ('editMATEX.lastName' in req.body)
    data.editMATEX.lastName = req.body['editMATEX.lastName'];

  if ('editMATEX.email' in req.body)
    data.editMATEX.email = req.body['editMATEX.email'];

  if ('editMATEX.certificateFulfilment' in req.body)
    data.editMATEX.certificateFulfilment = req.body['editMATEX.certificateFulfilment'];

  if ('editMATEX.addressLineOne' in req.body)
    data.editMATEX.addressLineOne = req.body['editMATEX.addressLineOne'];

  if ('editMATEX.addressLineTwo' in req.body)
    data.editMATEX.addressLineTwo = req.body['editMATEX.addressLineTwo'];

  if ('editMATEX.town' in req.body)
    data.editMATEX.town = req.body['editMATEX.town'];

  if ('editMATEX.county' in req.body)
    data.editMATEX.county = req.body['editMATEX.county'];

  if ('editMATEX.postcode' in req.body)
    data.editMATEX.postcode = req.body['editMATEX.postcode'];

  if ('editMATEX.telephoneNumber' in req.body)
    data.editMATEX.telephoneNumber = req.body['editMATEX.telephoneNumber'];

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

module.exports = router;
