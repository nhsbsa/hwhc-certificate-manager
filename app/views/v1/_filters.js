const { first } = require('lodash');

/**
* @param {Environment} env
*/
module.exports = function (env) {

//
// GET CERTIFICATE TYPE TAG FUNCTION
//
function _getCertificateTypeTextOrTag( service, isTag ){

  let txt = '';

  switch( service ){

    case 'hrtppc':
      txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--blue">HRT PPC</strong>' : 'HRT PPC';
      break;

    case 'matex':
      txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--green">MATEX</strong>' : 'MATEX';
      break;

  }

  return txt;

}

// 
// GET CERTIFICATE TYPE TAG FILTER
//
env.addFilter('getCertificateTypeTextOrTag', function ( service, isTag ) {
  return _getCertificateTypeTextOrTag( service, isTag );
});


// 
// GET JOB TITLE FILTER
//
env.addFilter('getJobTitle', function ( role ) {

  let jobTitle = '';
  switch( role ){
    case 'backOffice':
      jobTitle = 'Applications processor';
      break;
    case 'backOfficeSupervisor':
      jobTitle = 'Supervisor applications processor';
      break;
    case 'callCentre':
      jobTitle = 'Customer contact adviser';
      break;
    case 'qualityControl':
      jobTitle = 'Quality checker';
      break;
  }

  return jobTitle;
});



//
// GET STATUS TEXT OR TAG FUNCTION
// Statuses are outlined at https://miro.com/app/board/uXjVJqtsJuE=/?share_link_id=507026377839
//
function _getStatusTextOrTag( status, isTag ){

  let txt = '';

  switch( status ){

    case 'processing':
      txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--dark-grey">Processing</strong>' : 'Processing';
      break;

    case 'on-hold':
      txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--grey">On hold</strong>' : 'On hold';
      break;

    case 'accepted':
      txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--grey">Accepted</strong>' : 'Accepted';
      break;

    case 'checking':
      txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--white dashed">Checking</strong>' : 'Checking';
      break;

    case 'active':
      txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--white">Active</strong>' : 'Active';
      break;

    case 'expired':
      txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--expired-grey">Expired</strong>' : 'Expired';
      break;
    
    case 'deleted':
      txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--deleted-grey">Deleted</strong>' : 'Deleted';
      break;

    case 'rejected':
      txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--rejected-grey">Rejected</strong>' : 'Rejected';
      break;

    default:
      txt = status;

   
  }

  return txt;

}

// 
// GET CERTIFICATE TYPE TAG FILTER
//
env.addFilter('getStatusTextOrTag', function ( status, isTag ) {
  return _getStatusTextOrTag( status, isTag );
});

//
// GET PROCESSOR FUNCTION
//
function _getProcessor( processors, cipher, key ){

  let result = '';

  if( processors && cipher && processors[cipher] ){

    // You're after something specific
    if( processors[cipher][key] ){
      result = processors[cipher][key];
    } else {
      result = processors[cipher];
    }

  } else {

    // Just chuck something out at random
    if( processors ){
      const num = Math.round( Math.random() * (processors.length-1) );
      const obj = processors[num][Object.keys(processors[num])[0]];
      obj.cipher = Object.keys(processors[num])[0];

      result = obj;
    }

  }

  return result;

}

//
// GET PROCESSOR FILTER
//
env.addFilter('getProcessor', function( processors, cipher, key ){
  return _getProcessor( processors, cipher, key );
});


//
// GET SUPERVISOR DASHBOARD ROWS FILTER
//
env.addFilter('getSupervisorDashboardRows', function( processors ){

  const rows = [];

  Object.entries(processors).forEach(function( p ){

    const processor = p[1]; // Weird quirk in how Object.entries works...

    const arr = [
      { text: processor.name },
      { text: p[0] },
      { text: processor.stats[0] },
      { text: processor.stats[1] },
      { text: processor.stats[2] },
      { text: processor.stats[3] },
      { html: ( processor.level === 'trainee' ) ? '<strong>10</strong> <span class="nhsuk-u-font-size-14">('+processor.checkingLevel+'%)</span></strong>' : '<strong>0</strong>' },
      { html: '<a href="processor?searchChecking=true&searchProcessor='+p[0]+'">View<span class="nhsuk-u-visually-hidden">'+processor.name+'\'s account</spa></a>' }
    ];

    rows.push( arr );

  });

  return rows;

});


  //
  // GET CERTIFICATE FULFILMENT FUNCTION
  //
  const CERTIFICATE_FULFILMENT_MAP = {
    email: 'Email',
    post: 'Post'
  };
  
  function _getCertificateFulfilmentText(fulfilment) {
    return CERTIFICATE_FULFILMENT_MAP[fulfilment];
  }
  
  env.addFilter('getCertificateFulfilmentText', _getCertificateFulfilmentText);    



//
// GET FILTERED RESULTS FUNCTION
// Applies the search criteria to the rows of patient data
//
function _getFilteredResults( rows, searchTerms ){

  console.log( '_getFilteredResults()' );
  console.log( JSON.stringify( searchTerms ) );

  let filteredRows = [];

  if( Object.keys( searchTerms ).length > 0 ){

    Object.keys( searchTerms ).forEach(function( key, i ){

      let fRows = ( i === 0 ) ? rows : filteredRows.slice();
      filteredRows = [];        
    
      fRows.forEach( function( row ){

        if( key === 'checking' ){

          if( row[key] === true ){
            filteredRows.push( row );
          }

        } else {

          const needles = ( key === 'status' ) ?  searchTerms[key].split(',') : [searchTerms[key].trim().toLowerCase()];
          let haystack;

          switch( key ){

            case 'postcode':
              haystack = row.address[key].toLowerCase().split(' ').join('');
              break;

            case 'certificateReference':
              haystack = row[key].toLowerCase().split(' ').join('');
              break;

            default: 
              haystack = row[key].toLowerCase();
              break;

          }

          needles.forEach(function( needle, i ){
            if( haystack.indexOf( needle ) > -1 ){
              filteredRows.push( row );
            }
          });

        }
        

      });

    });

  } else {

    // Return everything if no search terms are provided...
    filteredRows = rows;

  }

  return filteredRows;

}

//
// GET SORTED RESULTS FUNCTION
// Applies table sorting to the results
//
function _getSortedResults( rows, sortBy, sortDirection ) {

  console.log( '_getSortedResults( rows, ' + sortBy + ', ' + sortDirection + ')' );

  let sortedRows = Array.from(rows); // Should already be a row, really...
  sortedRows.sort(function( a, b ){

      // Text check
      let comparisonA = a[sortBy];
      let comparisonB = b[sortBy];

      return comparisonA.localeCompare( comparisonB );

  });

  if( sortDirection === 'ascending' ){
      sortedRows = sortedRows.reverse();
  }

  return sortedRows;

}


//
// GET PAGINATED RESULTS FUNCTION
//
function _getPaginatedResults( rows, rowsPerPage, currentPage) {

  console.log( '_getPaginatedResults()' );

  let paginatedRows = [];

  if (rows.length > rowsPerPage) {

    let start = currentPage * rowsPerPage;
    let end = start + rowsPerPage;

    paginatedRows = rows.slice(start, end);

  } else {

    paginatedRows = rows;

  }

  return paginatedRows;

}

//
// TRUNCATE PAGINATION LINKS FUNCTION
//
function _truncatePaginationLinks( pageObjects, currentPage ) {
    
    const noOfPages = pageObjects.length;
  
    // Start building the truncated array
    const result = [];
  
    // Handle edge case when currentPage is the first item
    if (currentPage === 0) {
      // Always include the first item
      result.push(pageObjects[0]);
  
      // Add the next two items if they exist
      if (noOfPages > 1) result.push(pageObjects[1]);
      if (noOfPages > 2) result.push(pageObjects[2]);
  
      if (noOfPages > 3) result.push({ 'ellipsis': true }); // Add ellipsis if there are more items beyond the first three
  
      // Always include the last item
      result.push(pageObjects[noOfPages - 1]);
  
      return result;
    }
  
    // Handle edge case when currentPage is the last item
    if (currentPage === noOfPages - 1) {
      // Always include the first item
      result.push(pageObjects[0]);
  
      if (noOfPages > 4) result.push({ 'ellipsis': true }); // Add ellipsis if there are more than four items
  
      // Include the last three items
      if (noOfPages > 2) result.push(pageObjects[noOfPages - 3]);
      if (noOfPages > 1) result.push(pageObjects[noOfPages - 2]);
      result.push(pageObjects[noOfPages - 1]);
  
      return result;
    }
  
    // Normal case: currentPage is somewhere in the middle
    // Always include the first item
    result.push(pageObjects[0]);
  
    // Determine the range of items around the current item
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(noOfPages - 2, currentPage + 1);
  
    // Add ellipsis if necessary between the first item and the range
    if (start > 1) {
      result.push({ 'ellipsis': true });
    }
  
    // Add the range of items around the current item
    for (let i = start; i <= end; i++) {
      result.push(pageObjects[i]);
    }
  
    // Add ellipsis if necessary between the range and the last item
    if (end < noOfPages - 2) {
      result.push({ 'ellipsis': true });
    }
  
    // Always include the last item
    result.push(pageObjects[noOfPages - 1]);
  
    return result;

}

//
// GET SEARCH TITLE FILTER
//
env.addFilter('getSearchTitle', function(){

  const version = this.ctx.version;
  const noOfFilteredRows = (Number.isInteger(parseInt(this.ctx.data[version].noOfFilteredRows))) ? parseInt(this.ctx.data[version].noOfFilteredRows) : 0;
  
  let caption = noOfFilteredRows + ' certificates found';

  switch( noOfFilteredRows ){
    case 0:
      caption = 'No certificates found';
      break;
    case 1:
      caption = '1 certificate found';
      break;
  }
  
  return caption;

});

//
// GET TABLE HEAD ROWS FILTER
//
env.addFilter('getTableHeadRows', function ( sortColumns, processorTable ) {

  sortColumns = ( typeof sortColumns === 'boolean' ) ? sortColumns : true;

  const version = this.ctx.version;

  const noOfFilteredRows = (Number.isInteger(parseInt(this.ctx.data[version].noOfFilteredRows))) ? parseInt(this.ctx.data[version].noOfFilteredRows) : 0;

  const sortBy = ( this.ctx.data[version].sortBy ) ? this.ctx.data[version].sortBy : 'lastName'; 
  const sortDirection = ( ['ascending','descending'].indexOf( this.ctx.data[version].sortDirection ) > -1 ) ? this.ctx.data[version].sortDirection : 'descending';

  const baseLink = '?' + version + '[currentPage]=0';
  const opposite = ( sortDirection === 'descending' ) ? 'ascending' : 'descending'; 

  // lastName
  let lastNameLink = ( sortBy === 'lastName' ) ? baseLink + '&' + version + '[sortBy]=lastName&' + version + '[sortDirection]=' + opposite : baseLink + '&sortBy=name&sortDirection=ascending';
  let lastNameObj = ( noOfFilteredRows < 2 || !sortColumns ) ? { html: 'Name<br /><span class="nhsuk-body-s">NHS number</span>' } : {
      html: '<a href="'+lastNameLink+'">Name</a><br /><span class="nhsuk-body-s">NHS number</span>',
      attributes: {
          'aria-sort': ( sortBy === 'lastName' ) ? sortDirection : 'none'
      } 
  };

  const rows = [
            lastNameObj,
            { text: 'Postcode' },
            { text: 'Type' },
            { text: 'Status' },
            { text: 'Reference' },
            { text: ( processorTable ) ? 'Being checked by' : 'End date' },
            { html: '<span class="nhsuk-u-visually-hidden">Action</span>' }
          ];

  return rows;

});



//
// DRAW ROWS FUNCTION
//
function _drawRows( inputRows, role, processor, processorTable ){

  const rows = [];

  inputRows.forEach(function (patient) {

    let link = patient.certificateType +'/case?patientID=' + patient.id;
    let action = 'View ';

    if( patient.checking === true ){
      if( role === 'backOfficeSupervisor' ){

        if( processor && processor.level && processor.level === 'trainee' ){
          link = patient.certificateType +'/comparison--leave-feedback?patientID=' + patient.id;
          action = 'Check ';
        } else {
          link = patient.certificateType +'/comparison--has-feedback?patientID=' + patient.id;
        }

      } else {
        link = patient.certificateType +'/comparison?patientID=' + patient.id;
      }
    }

    const checkedBy = ( processor.level === 'trainee' ) ? 'Supervisor' : 'Quality checker';
    const penultimate = ( processorTable ) ? checkedBy : patient.endDate; 
    

     let obj = [
        { html: '<strong>' + patient.lastName + ', ' + patient.firstName + '</strong><br /><span class="nhsuk-body-s">' + patient.nhsNumber + '</span>' },
        { html: patient.address.postcode },
        { html: _getCertificateTypeTextOrTag( patient.certificateType, true )},
        { html: ( patient.checking === true ) ? _getStatusTextOrTag( patient.status, true ) + ' ' + _getStatusTextOrTag( 'checking', true ) : _getStatusTextOrTag( patient.status, true )  },
        { html: ( patient.status === 'processing' ) ? '<span class="nhsuk-body-s nhsuk-u-secondary-text-colour">'+ patient.certificateReference +'</span>' : patient.certificateReference },
        { text: penultimate },
        { html: '<a href="'+ link + '">'+action+'<span class="nhsuk-u-visually-hidden">' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag( patient.certificateType ) + '</span></a>' },
      ];

    rows.push(obj);

  });

  return rows;

};


//
// GET DASHBOARD TABLE ROWS FILTER
// Gets five certificates with status either 'On hold' or 'Accepted'
//
env.addFilter( 'getDashboardTableRows', function( patientData, count ){

  if( typeof patientData === 'string' ){
    patientData = JSON.parse( patientData );
  }

  count = ( !Number.isNaN( parseInt( count ) ) ) ? parseInt( count ) : 5;

  const loop = ( Array.isArray( patientData) ) ? patientData.length : 0;
  const rows = [];

  for( let i = 0; i<loop; i++ ){

    if( rows.length < count ){

      const patient = patientData[i];

      if( patient.status === 'on-hold' || patient.status === 'accepted' ){

        const obj = [
          { html: '<strong>' + patient.lastName + ', ' + patient.firstName + '</strong><br /><span class="nhsuk-body-s">' + patient.nhsNumber + '</span>' },
          { html: patient.address.postcode },
          { html: _getStatusTextOrTag( patient.status, true ) },
          { html: ( patient.status === 'processing' ) ? '<span class="nhsuk-body-s nhsuk-u-secondary-text-colour">'+ patient.certificateReference +'</span>' : patient.certificateReference },
          { html: '<a href="'+ patient.certificateType +'/case?patientID=' + patient.id + '">View <span class="nhsuk-u-visually-hidden">' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag( patient.certificateType ) + '</span></a>' },
        ];

        rows.push(obj);

      }

    } else {

      break;

    }

  }

  return rows;

});


//
// GET CHECKING TABLE ROWS
//
env.addFilter( 'getCheckingTableRows', function( patientData, count ){

  if( typeof patientData === 'string' ){
    patientData = JSON.parse( patientData );
  }

  count = ( !Number.isNaN( parseInt( count ) ) ) ? parseInt( count ) : 1;

  const loop = ( Array.isArray( patientData) ) ? patientData.length : 0;
  const rows = [];

  for( let i = 0; i<loop; i++ ){

    if( rows.length < count ){

      const patient = patientData[i];

      if( patient.checking === true ){

        const obj = [
          { html: '<strong>' + patient.lastName + ', ' + patient.firstName + '</strong><br /><span class="nhsuk-body-s">' + patient.nhsNumber + '</span>' },
          { html: patient.address.postcode },
          { html: _getCertificateTypeTextOrTag( patient.certificateType, true ) },
          { html: _getStatusTextOrTag( patient.status, true ) + ' '  + _getStatusTextOrTag( 'checking', true ) },
          { html: ( patient.status === 'processing' ) ? '<span class="nhsuk-body-s nhsuk-u-secondary-text-colour">'+ patient.certificateReference +'</span>' : patient.certificateReference },
          { html: '<a href="'+ patient.certificateType +'/comparison--correction?patientID=' + patient.id + '">Correct <span class="nhsuk-u-visually-hidden">' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag( patient.certificateType ) + '</span></a>' },
        ];

        rows.push(obj);

      }

    } else {

      break;

    }

  }

  return rows;

});


//
// ALTER DATE BY NUMBER OF DAYS FUNCTION
//
env.addFilter( 'alterTodaysDateByNumberOfDays', function( daysOffset ){

  let today = new Date();
  today.setDate(today.getDate() + daysOffset);

  // Manually format the date to avoid leading zeros (day, month, year)
  return today.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

});


//
// CHANGE ONE LETTER FUNCTION
//
env.addFilter( 'changeOneLetter', function( toChange ){

  let newString = toChange;

  if( toChange ){
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const newLetter = letters[Math.round(Math.random()*(letters.length-1))];
    const num = Math.round(Math.random()*(toChange.length-2))+1;
    newString = toChange.substring(0, num) + newLetter + toChange.substring(num + 1);
  }

  return newString;

});


//
// GET QUALITY CONTROL TABLE ROWS
//
env.addFilter( 'getQualityControlTableRows', function( patientData, cipher, count ){

  const tick = '<svg class="nhsuk-icon nhsuk-icon--tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" focusable="false" aria-hidden="true"><path fill="#007f3b" d="M11.4 18.8a2 2 0 0 1-2.7.1h-.1L4 14.1a1.5 1.5 0 0 1 2.1-2L10 16l8.1-8.1a1.5 1.5 0 1 1 2.2 2l-8.9 9Z"></path></svg>';
  const cross = '<svg class="nhsuk-icon nhsuk-icon--cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" focusable="false" aria-hidden="true"><path fill="#d5281b" d="M17 18.5c-.4 0-.8-.1-1.1-.4l-10-10c-.6-.6-.6-1.6 0-2.1.6-.6 1.5-.6 2.1 0l10 10c.6.6.6 1.5 0 2.1-.3.3-.6.4-1 .4z M7 18.5c-.4 0-.8-.1-1.1-.4-.6-.6-.6-1.5 0-2.1l10-10c.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1l-10 10c-.3.3-.6.4-1 .4z"></path></svg>';

  const processor = this.ctx.data.processors[cipher];
  console.log( processor );

  if( typeof patientData === 'string' ){
    patientData = JSON.parse( patientData );
  }

  count = ( !Number.isNaN( parseInt( count ) ) ) ? parseInt( count ) : 1;

  const loop = ( Array.isArray( patientData) ) ? patientData.length : 0;
  const rows = [];

  for( let i = 0; i<loop; i++ ){

    if( rows.length < count ){

      const patient = patientData[i];

      if( patient.checking === true && patient.processor === cipher ){

        //const checked = ( Math.round(Math.random()) === 1 ) ? true : false;
        //{ html: ( checked ) ?  tick + ' Checked' : cross + ' To check' },
        const checked = false; // Forcing everything to be checked on QC view

        const url = ( checked ) ? patient.certificateType +'/comparison--has-feedback?patientID=' + patient.id : patient.certificateType +'/comparison--leave-feedback?patientID=' + patient.id;

        const obj = [
          { html: '<strong>' + patient.lastName + ', ' + patient.firstName + '</strong><br /><span class="nhsuk-body-s">' + patient.nhsNumber + '</span>' },
          { html: patient.address.postcode },
          { html: _getCertificateTypeTextOrTag( patient.certificateType, true ) },
          { html: _getStatusTextOrTag( patient.status, true ) + ' ' + _getStatusTextOrTag( 'checking', true ) },
          { html: ( patient.status === 'processing' ) ? '<span class="nhsuk-body-s nhsuk-u-secondary-text-colour">'+ patient.certificateReference +'</span>' : patient.certificateReference },
          
          { html: '<a href="' + url + '">Check <span class="nhsuk-u-visually-hidden">' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag( patient.certificateType ) + '</span></a>' },
        ];

        rows.push(obj);

      }

    } else {

      break;

    }

  }

  return rows;

});

//
// GET TABLE ROWS FILTER
//
env.addFilter('getTableRows', function ( patientData, processorTable ) {

  if( typeof patientData === 'string' ){
    patientData = JSON.parse( patientData );
  }

  // Filter variables
  const searchTerms = {};
  const summary = [];

  let start = 'Searched for all certificates';

  if( this.ctx.data.searchCertificateType ){
    searchTerms.certificateType = this.ctx.data.searchCertificateType;
    start = 'Searched for all ' + _getCertificateTypeTextOrTag( this.ctx.data.searchCertificateType ) + ' certificates'
  }
  if( this.ctx.data.searchProcessor ){
    searchTerms.processor = this.ctx.data.searchProcessor;
    start += ' processed by '+searchTerms.processor;
  }
  if( this.ctx.data.searchStatus ){
    searchTerms.status = this.ctx.data.searchStatus;
    summary.push( 'specific statuses' ); // Only used for role=backOffice
  }
  if( this.ctx.data.searchChecking ){
    searchTerms.checking = ( this.ctx.data.searchChecking === 'true' || this.ctx.data.searchChecking === true ) ? true : false;
    summary.push( 'that are being checked' );
  }

  if( this.ctx.data.searchCertificateReference ){
    searchTerms.certificateReference = this.ctx.data.searchCertificateReference;
    summary.push( '"'+searchTerms.certificateReference+'" in certificate reference' );
  }
  if( this.ctx.data.searchLastName ){
    searchTerms.lastName = this.ctx.data.searchLastName;
    summary.push( '"'+searchTerms.lastName+'" in last name' );
  }
  if( this.ctx.data.searchFirstName ){
    searchTerms.firstName = this.ctx.data.searchFirstName;
    summary.push( '"'+searchTerms.firstName+'" in first name' );
  }
  if( this.ctx.data.searchPostcode ){
    searchTerms.postcode = this.ctx.data.searchPostcode;
    summary.push( '"'+searchTerms.postcode+'" in postcode' );
  }

  

  if( summary.length === 0 ){
    this.ctx.data.summaryText = start;
  } else if( summary.length === 1 ){
    this.ctx.data.summaryText = start + ' with ' + summary[0];
  } else {
    let last = summary.pop();
    this.ctx.data.summaryText = start + ' with ' + summary.join(', ') + ' and ' + last;
  }


  // Sorting variables
  const sortBy = ( this.ctx.data[this.ctx.version].sortBy ) ? this.ctx.data[this.ctx.version].sortBy : 'lastName'; 
  const sortDirection = ( ['ascending','descending'].indexOf( this.ctx.data[this.ctx.version].sortDirection ) > -1 ) ? this.ctx.data[this.ctx.version].sortDirection : 'descending';

  // Pagination variables
  const rowsPerPage = (Number.isInteger(parseInt(this.ctx.data[this.ctx.version].rowsPerPage))) ? parseInt(this.ctx.data[this.ctx.version].rowsPerPage) : 5;
  const currentPage = (Number.isInteger(parseInt(this.ctx.data[this.ctx.version].currentPage))) ? parseInt(this.ctx.data[this.ctx.version].currentPage) : 0;

  // Process the patients
  const filteredPatientData = _getFilteredResults( patientData, searchTerms );
  const sortedPatientData = _getSortedResults( filteredPatientData, sortBy, sortDirection );
  const paginatedPatientData = _getPaginatedResults( sortedPatientData, rowsPerPage, currentPage);

  this.ctx.data[this.ctx.version].noOfFilteredRows = filteredPatientData.length;

  // Extras for the rows
  const role = this.ctx.data.role;
  const processor = ( this.ctx.data.searchProcessor ) ? this.ctx.data.processors[this.ctx.data.searchProcessor] : {};

  return _drawRows( paginatedPatientData, role, processor, processorTable );

});


//
// GET PAGINATION LINKS FILTER
//
env.addFilter('getPaginationLinks', function ( classes ) {

  // content: blank string

  const rowsPerPage = (Number.isInteger(parseInt(this.ctx.data[this.ctx.version].rowsPerPage))) ? parseInt(this.ctx.data[this.ctx.version].rowsPerPage) : 5;
  const currentPage = (Number.isInteger(parseInt(this.ctx.data[this.ctx.version].currentPage))) ? parseInt(this.ctx.data[this.ctx.version].currentPage) : 0;

  const noOfFilteredRows = (Number.isInteger(this.ctx.data[this.ctx.version].noOfFilteredRows)) ? this.ctx.data[this.ctx.version].noOfFilteredRows : 0;
  const noOfPages = Math.ceil(noOfFilteredRows / rowsPerPage);

  const obj = {};

  if (noOfFilteredRows > rowsPerPage) {

    const items = [];

    if (currentPage !== 0) {
      obj.previous = { 'href': '?'+ this.ctx.version +'[currentPage]=' + (currentPage - 1) }
    }
    if (currentPage !== (noOfPages - 1)) {
      obj.next = { 'href': '?' + this.ctx.version +'[currentPage]=' + (currentPage + 1) }
    }

    for (let i = 0; i < noOfPages; i++) {

      let itemObj = { 'number': (i + 1), 'href': '?' + this.ctx.version +'[currentPage]=' + i };
      if (i === currentPage) {
        itemObj.current = true;
      }

      items.push( itemObj );

    }

    // Add ellipses if needed...
    if (items.length > 6) {
      obj.items = _truncatePaginationLinks( items, currentPage );
    } else {
      obj.items = items;
    }

  }

  if( classes ){
    obj.classes = classes;
  }

  return obj;

});

//
// GET CONFIDENCE TAG FUNCTION
//
env.addFilter('getConfidenceTag', function( num, showEverything ){
  
  if( !Number.isInteger( num ) ){
    num = 0;
  }

  const showLevels = ( showEverything === true ) ? [ 'empty', 'low', 'medium', 'high' ] : [ 'low','medium' ]; // Add the levels you wish to output here...

  let confidenceLevel = 'empty';
  let tag = '<span class="confidence-level"><span class="nhsuk-tag nhsuk-tag--grey">Empty</span></span>';

  if( num > 0 ) {
    confidenceLevel = 'low';
    tag =  '<span class="confidence-level confidence-level--'+confidenceLevel+'"><span class="nhsuk-tag nhsuk-tag--red">Low</span>'
    tag += '<span class="nhsuk-tag nhsuk-tag--red confidence-score">'+num+'</span></span>';
  }
  
  if( num > 30 ){
    confidenceLevel = 'medium';
    tag =  '<span class="confidence-level confidence-level--'+confidenceLevel+'"><span class="nhsuk-tag nhsuk-tag--blue">Medium</span>'
    tag += '<span class="nhsuk-tag nhsuk-tag--blue confidence-score">'+num+'</span></span>';
  }

  if( num > 60 ){
    confidenceLevel = 'high';
    tag =  '<span class="confidence-level confidence-level--'+confidenceLevel+'"><span class="nhsuk-tag nhsuk-tag--green">High</span>'
    tag += '<span class="nhsuk-tag nhsuk-tag--green confidence-score">'+num+'</span></span>';
  }

  return ( showLevels.indexOf(confidenceLevel) > -1 ) ? tag : '';

});

//
// PROCESS FULL NAME FILTER
//
env.addFilter('processFullName', function( firstName, lastName ){

  let fullName = '';

  console.log( 'PROCESSING: ' + firstName + ' ' + lastName );

  firstName = firstName || '';
  lastName = lastName || '';
  
  if( firstName && lastName ){
    fullName = firstName + ' ' + lastName; 
  } else if( firstName && !lastName ){
    fullName = firstName;
  } else if ( !firstName && lastName ) {
    fullName = lastName;
  }

  return fullName;

});

//
// PROCESS ADDRESS FILTER
//
env.addFilter('processAddress', function( houseNumber, addressLine1, addressLine2, town, county, postcode ){

  houseNumber = houseNumber || '';
  addressLine1 = addressLine1 || '';
  addressLine2 = addressLine2 || '';
  town = town || '';
  county = county || '';
  postcode = postcode || '';

  let firstLine = '';

  if( houseNumber && addressLine1 ){
    firstLine = houseNumber + ' ' + addressLine1;
  } else if( !houseNumber && addressLine1 ){
    firstLine = addressLine1;
  } else if( houseNumber && !addressLine1 ){
    firstLine = houseNumber;
  }

  let elements = [ firstLine ];

  if( addressLine2 ){
    elements.push( addressLine2 );
  }

  if( town ){
    elements.push( town );
  }

  if( county ){
    elements.push( county );
  }

  if( postcode ){
    elements.push( postcode );
  }

  return elements.join( ', <br />' );





});

//
// PROCESS DATE FILTER
//
env.addFilter('processDate', function(){

  return '12 September 1999';

});


//
// GET PATIENT DATA FILTER
//
env.addFilter('getPatientData', function ( code ) {

  let patientData =  '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"352 042 736","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT X4TI DD0B","channel":"Digital","startDate":"23 March 2025","endDate":"23 December 2026","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"}},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"833 507 603","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"expired","checking":false,"certificateReference":"24 169 467 458","channel":"Digital","startDate":"11 June 2025","endDate":"11 March 2027","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"}},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"362 116 524","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"85 580 725 891","channel":"Paper","startDate":"4 April 2025","endDate":"4 January 2027","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"}},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"742 827 789","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"87 732 783 663","channel":"Paper","startDate":"12 March 2025","endDate":"12 December 2026","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"}},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"802 000 836","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT J0LN QIZ1","channel":"Digital","startDate":"30 April 2025","endDate":"30 January 2027","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"}},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"009 900 904","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"61 920 746 155","channel":"Paper","startDate":"23 April 2025","endDate":"23 January 2027","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"}},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"142 600 637","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","checking":false,"certificateReference":"33 382 969 169","channel":"Paper","startDate":"26 June 2025","endDate":"26 March 2027","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"}},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"893 745 263","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT MOIZ RWI6","channel":"Digital","startDate":"7 July 2025","endDate":"7 April 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"}},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"674 996 391","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"expired","checking":false,"certificateReference":"90 269 558 748","channel":"Digital","startDate":"19 August 2025","endDate":"19 May 2027","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"}},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"337 289 336","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","checking":false,"certificateReference":"76 722 143 976","channel":"Paper","startDate":"5 July 2025","endDate":"5 April 2027","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"}},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"449 973 518","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"20 921 011 928","channel":"Paper","startDate":"13 March 2025","endDate":"13 December 2026","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"}},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"393 228 517","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"67 424 807 739","channel":"Paper","startDate":"27 July 2025","endDate":"27 April 2027","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"}},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"614 731 173","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 6FJ4 0JLK","channel":"Digital","startDate":"1 April 2025","endDate":"1 January 2027","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"}},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"129 095 815","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT IJV9 VYOF","channel":"Digital","startDate":"19 April 2025","endDate":"19 January 2027","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"}},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"288 962 191","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT IGWI 5RGG","channel":"Digital","startDate":"18 August 2025","endDate":"18 May 2027","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"}},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"488 199 462","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"13 868 591 463","channel":"Paper","startDate":"23 July 2025","endDate":"23 April 2027","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"}},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"328 216 705","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 6EN3 VIMJ","channel":"Digital","startDate":"20 June 2025","endDate":"20 March 2027","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"}},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"676 565 760","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT S1BI IPIE","channel":"Digital","startDate":"9 June 2025","endDate":"9 March 2027","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"}},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"634 858 248","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"45 013 518 359","channel":"Paper","startDate":"7 June 2025","endDate":"7 March 2027","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"}},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"244 213 292","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT Y8GQ S18T","channel":"Digital","startDate":"15 June 2025","endDate":"15 March 2027","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"}},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"919 207 090","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"expired","checking":false,"certificateReference":"64 466 728 994","channel":"Digital","startDate":"2 April 2025","endDate":"2 January 2027","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"}},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"925 982 046","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"13 218 253 171","channel":"Paper","startDate":"10 March 2025","endDate":"10 December 2026","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"}},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"580 242 621","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 1SC3 K404","channel":"Digital","startDate":"23 May 2025","endDate":"23 February 2027","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"}},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"909 313 371","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"21 977 624 122","channel":"Paper","startDate":"30 May 2025","endDate":"2 March 2027","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"}},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"204 428 188","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","checking":false,"certificateReference":"04 270 068 479","channel":"Digital","startDate":"6 August 2025","endDate":"6 May 2027","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"}},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"836 321 484","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"25 264 534 065","channel":"Paper","startDate":"23 May 2025","endDate":"23 February 2027","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"}},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"931 427 568","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT MFPQ U12N","channel":"Digital","startDate":"25 June 2025","endDate":"25 March 2027","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"}},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"699 793 121","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"60 985 613 543","channel":"Paper","startDate":"4 August 2025","endDate":"4 May 2027","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"}},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"778 744 698","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 66EY ZWVO","channel":"Digital","startDate":"2 May 2025","endDate":"2 February 2027","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"}},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"866 074 527","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"10 941 879 253","channel":"Paper","startDate":"28 June 2025","endDate":"28 March 2027","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"}},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"589 225 417","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","checking":false,"certificateReference":"80 168 751 266","channel":"Paper","startDate":"5 June 2025","endDate":"5 March 2027","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"}},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"223 000 040","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"65 565 710 978","channel":"Paper","startDate":"7 June 2025","endDate":"7 March 2027","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"}},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"671 649 629","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT DE1F TQ2T","channel":"Pharmacy","startDate":"29 March 2025","endDate":"29 December 2026","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"}},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"437 528 368","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT I0I4 ZDBF","channel":"Digital","startDate":"18 March 2025","endDate":"18 December 2026","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"}},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"914 930 975","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"50 783 864 093","channel":"Paper","startDate":"24 June 2025","endDate":"24 March 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"926 399 293","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"08 638 421 701","channel":"Paper","startDate":"7 August 2025","endDate":"7 May 2027","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"}},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"584 565 982","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"62 536 178 022","channel":"Paper","startDate":"3 May 2025","endDate":"3 February 2027","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"}},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"097 886 621","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","checking":false,"certificateReference":"2026 02 20 15 11 28N610795990","channel":"Paper","startDate":"5 July 2025","endDate":"5 April 2027","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"}},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"105 464 533","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT EUN1 DRB0","channel":"Digital","startDate":"2 August 2025","endDate":"2 May 2027","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"}},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"371 774 583","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","checking":false,"certificateReference":"2026 02 20 15 11 28N841402430","channel":"Paper","startDate":"16 March 2025","endDate":"16 December 2026","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"}},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"292 605 419","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"60 489 300 434","channel":"Paper","startDate":"10 March 2025","endDate":"10 December 2026","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"}},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"616 426 985","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"77 198 239 945","channel":"Paper","startDate":"5 August 2025","endDate":"5 May 2027","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"}},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"490 027 561","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 8YHA 3T95","channel":"Pharmacy","startDate":"3 June 2025","endDate":"3 March 2027","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"}},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"087 938 182","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"49 182 783 723","channel":"Paper","startDate":"5 May 2025","endDate":"5 February 2027","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"}},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"301 242 941","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"expired","checking":false,"certificateReference":"37 085 312 157","channel":"Paper","startDate":"20 March 2025","endDate":"20 December 2026","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"}},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"122 148 158","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","checking":false,"certificateReference":"2026 02 20 15 11 28N544444548","channel":"Paper","startDate":"11 March 2025","endDate":"11 December 2026","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"}},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"464 131 080","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"80 476 622 545","channel":"Paper","startDate":"3 May 2025","endDate":"3 February 2027","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"}},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"143 121 024","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT WLN8 G6Q8","channel":"Digital","startDate":"8 July 2025","endDate":"8 April 2027","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"}},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"219 989 944","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT CFU5 FI41","channel":"Digital","startDate":"1 March 2025","endDate":"1 December 2026","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"}},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"577 796 266","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"expired","checking":false,"certificateReference":"04 343 051 477","channel":"Paper","startDate":"3 August 2025","endDate":"3 May 2027","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"}},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"778 950 156","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","checking":false,"certificateReference":"27 048 598 938","channel":"Paper","startDate":"22 March 2025","endDate":"22 December 2026","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"}},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"700 188 002","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"42 920 673 471","channel":"Paper","startDate":"12 June 2025","endDate":"12 March 2027","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"}},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"306 129 237","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","checking":false,"certificateReference":"03 462 875 622","channel":"Paper","startDate":"30 May 2025","endDate":"2 March 2027","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"}},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"849 362 322","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT WJKO SQ15","channel":"Digital","startDate":"5 March 2025","endDate":"5 December 2026","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"}},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"090 192 772","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"45 002 876 310","channel":"Paper","startDate":"14 March 2025","endDate":"14 December 2026","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"}},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"792 925 677","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT N863 XZCM","channel":"Digital","startDate":"8 June 2025","endDate":"8 March 2027","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"}},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"156 536 388","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT FMLQ BY0R","channel":"Digital","startDate":"3 April 2025","endDate":"3 January 2027","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"}},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"880 293 348","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"27 074 830 717","channel":"Paper","startDate":"2 July 2025","endDate":"2 April 2027","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"}},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"330 110 129","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"20 938 983 685","channel":"Paper","startDate":"30 July 2025","endDate":"30 April 2027","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"}},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"839 583 551","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","checking":false,"certificateReference":"99 039 799 701","channel":"Paper","startDate":"2 March 2025","endDate":"2 December 2026","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"}},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"081 827 618","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"11 263 902 751","channel":"Paper","startDate":"26 April 2025","endDate":"26 January 2027","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"}},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"703 957 619","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"08 652 171 031","channel":"Paper","startDate":"1 March 2025","endDate":"1 December 2026","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"}},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"235 975 287","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"25 190 701 452","channel":"Paper","startDate":"30 May 2025","endDate":"2 March 2027","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"}},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"252 389 574","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"80 438 781 514","channel":"Paper","startDate":"21 May 2025","endDate":"21 February 2027","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"}},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"176 914 528","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"45 752 135 274","channel":"Paper","startDate":"6 April 2025","endDate":"6 January 2027","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"}},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"656 104 536","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 2E44 M8KH","channel":"Digital","startDate":"24 March 2025","endDate":"24 December 2026","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"}},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"072 539 956","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"43 828 081 052","channel":"Paper","startDate":"17 March 2025","endDate":"17 December 2026","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"}},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"611 692 533","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT MQSZ L3LB","channel":"Digital","startDate":"14 July 2025","endDate":"14 April 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"}},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"518 834 867","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"48 595 819 753","channel":"Paper","startDate":"29 April 2025","endDate":"29 January 2027","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"}},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"684 067 392","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 3HCL E7BV","channel":"Digital","startDate":"28 July 2025","endDate":"28 April 2027","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"}},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"283 792 209","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT DDD5 SCKU","channel":"Pharmacy","startDate":"6 June 2025","endDate":"6 March 2027","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"}},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"892 694 833","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"expired","checking":false,"certificateReference":"49 777 162 072","channel":"Paper","startDate":"12 August 2025","endDate":"12 May 2027","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"}},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"965 580 950","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT DUPB Z6VC","channel":"Digital","startDate":"5 August 2025","endDate":"5 May 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"}},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"252 951 527","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 3P5O 5T6K","channel":"Digital","startDate":"2 July 2025","endDate":"2 April 2027","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"}},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"772 622 579","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 8YWF 4E7V","channel":"Digital","startDate":"26 February 2025","endDate":"26 November 2026","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"}},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"176 089 555","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT X5PU U4PS","channel":"Digital","startDate":"7 May 2025","endDate":"7 February 2027","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"}},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"606 190 734","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"94 296 594 468","channel":"Paper","startDate":"19 July 2025","endDate":"19 April 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"111 775 180","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"69 852 833 714","channel":"Paper","startDate":"11 May 2025","endDate":"11 February 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"}},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"916 519 984","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"65 703 637 035","channel":"Paper","startDate":"7 March 2025","endDate":"7 December 2026","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"}},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"459 030 639","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"53 106 094 839","channel":"Paper","startDate":"4 June 2025","endDate":"4 March 2027","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"}},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"090 468 064","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"89 410 456 992","channel":"Paper","startDate":"6 March 2025","endDate":"6 December 2026","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"}},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"183 687 525","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","checking":false,"certificateReference":"05 267 939 008","channel":"Paper","startDate":"19 June 2025","endDate":"19 March 2027","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"}},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"525 262 241","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"expired","checking":false,"certificateReference":"08 595 624 553","channel":"Paper","startDate":"1 April 2025","endDate":"1 January 2027","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"}},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"773 228 413","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT VVUO 7KKE","channel":"Digital","startDate":"8 April 2025","endDate":"8 January 2027","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"}},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"972 794 853","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT URF5 FOTK","channel":"Digital","startDate":"31 March 2025","endDate":"31 December 2026","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"}},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"062 321 196","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","checking":false,"certificateReference":"83 195 915 106","channel":"Paper","startDate":"22 June 2025","endDate":"22 March 2027","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"}},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"776 898 854","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"21 237 895 976","channel":"Paper","startDate":"9 July 2025","endDate":"9 April 2027","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"}},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"636 107 858","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"expired","checking":false,"certificateReference":"53 868 301 121","channel":"Digital","startDate":"23 May 2025","endDate":"23 February 2027","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"}},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"443 710 443","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"15 105 311 610","channel":"Paper","startDate":"17 June 2025","endDate":"17 March 2027","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"}},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"002 842 596","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","checking":false,"certificateReference":"78 320 554 004","channel":"Paper","startDate":"20 May 2025","endDate":"20 February 2027","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"}},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"841 947 220","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","checking":false,"certificateReference":"83 498 329 137","channel":"Paper","startDate":"15 May 2025","endDate":"15 February 2027","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"}},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"705 998 203","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"25 944 773 618","channel":"Paper","startDate":"25 April 2025","endDate":"25 January 2027","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"}},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"931 601 021","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"processing","checking":false,"certificateReference":"2026 02 20 15 11 28N907890233","channel":"Paper","startDate":"27 March 2025","endDate":"27 December 2026","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"}},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"752 393 390","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 4O6F 5G40","channel":"Digital","startDate":"9 April 2025","endDate":"9 January 2027","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"}},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"575 607 080","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"91 028 519 116","channel":"Paper","startDate":"28 April 2025","endDate":"28 January 2027","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"}},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"721 412 328","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"expired","checking":false,"certificateReference":"90 275 465 802","channel":"Digital","startDate":"2 May 2025","endDate":"2 February 2027","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"}},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"250 760 084","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT NPPJ H2PB","channel":"Digital","startDate":"22 May 2025","endDate":"22 February 2027","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"}},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"683 152 423","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","checking":false,"certificateReference":"2026 02 20 15 11 28N752983781","channel":"Paper","startDate":"31 March 2025","endDate":"31 December 2026","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"}},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"525 729 509","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"43 061 657 702","channel":"Paper","startDate":"11 March 2025","endDate":"11 December 2026","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"}},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"356 323 363","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT FN07 O8F6","channel":"Digital","startDate":"28 July 2025","endDate":"28 April 2027","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"}},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"399 771 879","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","checking":false,"certificateReference":"14 090 710 570","channel":"Digital","startDate":"4 April 2025","endDate":"4 January 2027","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"}},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"125 025 629","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT CVJS 5UVH","channel":"Digital","startDate":"30 March 2025","endDate":"30 December 2026","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"}},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"962 381 132","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"expired","checking":false,"certificateReference":"48 022 932 126","channel":"Paper","startDate":"14 July 2025","endDate":"14 April 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"}}]';

  let returnPatientData = patientData;

  if( code ){
    
    patientData = JSON.parse( patientData );
    
    const loop = patientData.length;

    for( let i = 0; i<loop; i++ ){
      if( String(patientData[i].id) === code ){
        returnPatientData = patientData[i];
        break;
      }
    }

  }

  // Generate new patient data from 'data-patients.html'
  return returnPatientData;
});




//
// RANDOMISE AND CONVERT TO LIST
//
env.addFilter('randomiseAndConvertToList', function ( arr ) {


  arr = ( Array.isArray(arr) && arr.length > 0  ) ? arr : ['Provide an array with at least one item'];

  const selected = [];
  arr.forEach( function( el ){
    if( Math.round(Math.random()*2) === 0 ){
      selected.push( el );
    }
  });

  if( selected.length === 0 ){
    selected.push( arr[0] );
  }

  let html = '<ul class="nhsuk-list nhsuk-list--bullet nhsuk-u-margin-bottom-4">';
  selected.forEach(function(el){
    html += '<li class="nhsuk-u-font-size-16">'+el+'</li>';
  });
  html += '</ul>';

  return html;


});




return true;
}

/**
* @import { Environment } from 'nunjucks'
*/
