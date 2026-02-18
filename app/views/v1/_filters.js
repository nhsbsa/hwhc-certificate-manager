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

  if( processors && processors[cipher] ){
    if( processors[cipher][key] ){
      result = processors[cipher][key];
    } else {
      result = processors[cipher];
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

    if( patient.checking === true ){
      if( role === 'backOfficeSupervisor' ){

        if( processor && processor.level && processor.level === 'trainee' ){
          link = patient.certificateType +'/comparison--leave-feedback?patientID=' + patient.id;
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
        { html: ( patient.checking === true ) ? _getStatusTextOrTag( 'checking', true ) : _getStatusTextOrTag( patient.status, true )  },
        { html: ( patient.status === 'processing' ) ? '<span class="nhsuk-body-s nhsuk-u-secondary-text-colour">'+ patient.certificateReference +'</span>' : patient.certificateReference },
        { text: penultimate },
        { html: '<a href="'+ link + '">View <span class="nhsuk-u-visually-hidden">' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag( patient.certificateType ) + '</span></a>' },
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
          { html: _getStatusTextOrTag( 'checking', true ) },
          { html: ( patient.status === 'processing' ) ? '<span class="nhsuk-body-s nhsuk-u-secondary-text-colour">'+ patient.certificateReference +'</span>' : patient.certificateReference },
          { html: '<a href="'+ patient.certificateType +'/comparison--correction?patientID=' + patient.id + '">View <span class="nhsuk-u-visually-hidden">' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag( patient.certificateType ) + '</span></a>' },
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

  let patientData =  '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"451 141 788","processor":"PRPAT","certificateType":"matex","status":"expired","checking":false,"certificateReference":"22 604 709 829","channel":"Digital","startDate":"19 February 2025","endDate":"19 November 2026","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"}},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"476 295 980","processor":"PRPAT","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT NWFB SU8Q","channel":"Digital","startDate":"20 March 2025","endDate":"20 December 2026","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"}},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"770 045 345","processor":"JASMI","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"39 788 037 670","channel":"Paper","startDate":"23 January 2025","endDate":"23 October 2026","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"}},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"288 386 247","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT DIIA 2LPD","channel":"Digital","startDate":"18 May 2025","endDate":"18 February 2027","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"}},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"038 272 514","processor":"PRPAT","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 1FQO CV1R","channel":"Digital","startDate":"25 June 2025","endDate":"25 March 2027","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"}},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"652 467 319","processor":"JASMI","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"78 140 891 630","channel":"Paper","startDate":"30 June 2025","endDate":"30 March 2027","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"}},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"584 047 929","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 8UCD TJQY","channel":"Digital","startDate":"31 March 2025","endDate":"31 December 2026","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"}},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"661 896 769","processor":"JASMI","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"21 393 368 968","channel":"Paper","startDate":"20 May 2025","endDate":"20 February 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"}},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"574 172 362","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 724F HCHT","channel":"Pharmacy","startDate":"14 July 2025","endDate":"14 April 2027","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"}},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"248 309 577","processor":"JASMI","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"75 614 059 124","channel":"Paper","startDate":"28 June 2025","endDate":"28 March 2027","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"}},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"136 981 773","processor":"PRPAT","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"96 176 625 173","channel":"Paper","startDate":"2 April 2025","endDate":"2 January 2027","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"}},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"931 181 919","processor":"ZAKHA","certificateType":"matex","status":"processing","checking":false,"certificateReference":"2026 01 19 11 29 24N790548362","channel":"Paper","startDate":"9 June 2025","endDate":"9 March 2027","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"}},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"166 065 687","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT PRW0 OV10","channel":"Digital","startDate":"15 July 2025","endDate":"15 April 2027","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"}},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"098 597 443","processor":"AICOL","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT NN8W HJ2F","channel":"Digital","startDate":"22 March 2025","endDate":"22 December 2026","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"}},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"909 810 031","processor":"ZAKHA","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"53 080 829 741","channel":"Paper","startDate":"9 March 2025","endDate":"9 December 2026","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"}},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"808 310 701","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT P8YQ E04P","channel":"Pharmacy","startDate":"19 February 2025","endDate":"19 November 2026","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"}},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"093 702 014","processor":"PRPAT","certificateType":"matex","status":"on-hold","checking":false,"certificateReference":"91 894 102 673","channel":"Paper","startDate":"8 February 2025","endDate":"8 November 2026","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"}},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"216 588 162","processor":"PRPAT","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT PVIJ TXIX","channel":"Telephony","startDate":"11 June 2025","endDate":"11 March 2027","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"}},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"462 291 841","processor":"JASMI","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"14 232 976 838","channel":"Paper","startDate":"17 May 2025","endDate":"17 February 2027","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"}},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"798 015 120","processor":"PRPAT","certificateType":"matex","status":"expired","checking":false,"certificateReference":"27 354 217 780","channel":"Digital","startDate":"9 February 2025","endDate":"9 November 2026","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"}},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"838 984 698","processor":"AICOL","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT XZ43 88Q2","channel":"Digital","startDate":"8 April 2025","endDate":"8 January 2027","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"}},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"662 288 793","processor":"AICOL","certificateType":"matex","status":"active","checking":false,"certificateReference":"69 013 893 438","channel":"Paper","startDate":"20 April 2025","endDate":"20 January 2027","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"}},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"414 176 063","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 5X93 7UOX","channel":"Digital","startDate":"4 February 2025","endDate":"4 November 2026","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"}},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"717 180 445","processor":"ZAKHA","certificateType":"matex","status":"active","checking":false,"certificateReference":"61 112 558 687","channel":"Digital","startDate":"10 July 2025","endDate":"10 April 2027","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"}},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"684 627 888","processor":"DATHO","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"95 311 581 185","channel":"Paper","startDate":"13 February 2025","endDate":"13 November 2026","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"}},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"049 933 359","processor":"AICOL","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 0IRR 4X6V","channel":"Digital","startDate":"16 March 2025","endDate":"16 December 2026","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"}},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"290 753 948","processor":"DATHO","certificateType":"matex","status":"active","checking":false,"certificateReference":"72 327 855 736","channel":"Paper","startDate":"8 July 2025","endDate":"8 April 2027","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"}},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"823 770 144","processor":"PRPAT","certificateType":"matex","status":"on-hold","checking":false,"certificateReference":"90 540 264 756","channel":"Paper","startDate":"2 May 2025","endDate":"2 February 2027","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"}},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"538 381 127","processor":"AICOL","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 2SI3 P475","channel":"Digital","startDate":"19 February 2025","endDate":"19 November 2026","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"}},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"726 482 454","processor":"ZAKHA","certificateType":"matex","status":"on-hold","checking":false,"certificateReference":"77 927 200 235","channel":"Paper","startDate":"25 April 2025","endDate":"25 January 2027","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"}},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"880 423 508","processor":"PRPAT","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"22 312 141 509","channel":"Paper","startDate":"21 May 2025","endDate":"21 February 2027","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"}},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"037 580 982","processor":"AICOL","certificateType":"matex","status":"active","checking":false,"certificateReference":"47 894 002 584","channel":"Paper","startDate":"1 April 2025","endDate":"1 January 2027","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"}},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"098 671 160","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 83IJ HLMN","channel":"Digital","startDate":"31 May 2025","endDate":"3 March 2027","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"}},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"227 435 521","processor":"PRPAT","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"64 094 304 645","channel":"Paper","startDate":"25 April 2025","endDate":"25 January 2027","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"}},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"849 917 362","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT LWTB 3JP7","channel":"Digital","startDate":"20 January 2025","endDate":"20 October 2026","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"179 954 247","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT OS32 VVGD","channel":"Digital","startDate":"19 February 2025","endDate":"19 November 2026","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"}},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"964 386 967","processor":"DATHO","certificateType":"matex","status":"active","checking":false,"certificateReference":"79 816 830 740","channel":"Paper","startDate":"2 July 2025","endDate":"2 April 2027","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"}},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"236 816 202","processor":"AICOL","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 4MUO WL3P","channel":"Digital","startDate":"25 February 2025","endDate":"25 November 2026","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"}},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"289 998 705","processor":"DATHO","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"48 123 506 030","channel":"Paper","startDate":"16 May 2025","endDate":"16 February 2027","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"}},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"996 955 367","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT XIQC 42BR","channel":"Pharmacy","startDate":"19 January 2025","endDate":"19 October 2026","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"}},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"789 173 004","processor":"PRPAT","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT IYH1 MAGG","channel":"Digital","startDate":"9 June 2025","endDate":"9 March 2027","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"}},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"681 731 300","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 21PN G4WN","channel":"Digital","startDate":"13 February 2025","endDate":"13 November 2026","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"}},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"573 997 638","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 7181 6MV8","channel":"Digital","startDate":"16 June 2025","endDate":"16 March 2027","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"}},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"263 830 568","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT GVI0 MEDA","channel":"Digital","startDate":"17 February 2025","endDate":"17 November 2026","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"}},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"812 044 350","processor":"AICOL","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"80 787 029 824","channel":"Paper","startDate":"21 April 2025","endDate":"21 January 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"}},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"141 306 189","processor":"PRPAT","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"92 625 909 611","channel":"Paper","startDate":"24 March 2025","endDate":"24 December 2026","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"}},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"844 464 317","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT DDOS OFCF","channel":"Digital","startDate":"23 March 2025","endDate":"23 December 2026","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"}},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"364 528 618","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT I54C 64TI","channel":"Digital","startDate":"1 April 2025","endDate":"1 January 2027","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"}},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"897 352 865","processor":"PRPAT","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"26 990 971 651","channel":"Paper","startDate":"7 February 2025","endDate":"7 November 2026","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"}},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"822 834 038","processor":"PRPAT","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"50 231 506 693","channel":"Paper","startDate":"16 July 2025","endDate":"16 April 2027","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"}},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"601 559 195","processor":"PRPAT","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 11EI 5D1H","channel":"Digital","startDate":"4 June 2025","endDate":"4 March 2027","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"}},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"925 317 661","processor":"PRPAT","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"31 237 963 081","channel":"Paper","startDate":"25 May 2025","endDate":"25 February 2027","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"}},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"308 106 295","processor":"PRPAT","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT OJM2 T95X","channel":"Digital","startDate":"24 February 2025","endDate":"24 November 2026","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"}},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"340 386 043","processor":"AICOL","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"28 850 317 259","channel":"Paper","startDate":"25 January 2025","endDate":"25 October 2026","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"}},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"765 328 055","processor":"ZAKHA","certificateType":"matex","status":"on-hold","checking":false,"certificateReference":"26 585 280 005","channel":"Paper","startDate":"1 February 2025","endDate":"1 November 2026","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"}},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"572 553 357","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT Q061 PO1B","channel":"Digital","startDate":"11 April 2025","endDate":"11 January 2027","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"}},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"641 384 353","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT I53M F764","channel":"Digital","startDate":"13 June 2025","endDate":"13 March 2027","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"}},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"545 598 683","processor":"AICOL","certificateType":"matex","status":"on-hold","checking":false,"certificateReference":"45 362 870 978","channel":"Paper","startDate":"14 February 2025","endDate":"14 November 2026","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"}},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"034 406 273","processor":"PRPAT","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT XSOF IZCU","channel":"Digital","startDate":"19 April 2025","endDate":"19 January 2027","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"}},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"145 518 685","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT YC7K URS2","channel":"Digital","startDate":"10 June 2025","endDate":"10 March 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"}},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"075 668 824","processor":"ZAKHA","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"39 904 925 327","channel":"Paper","startDate":"12 April 2025","endDate":"12 January 2027","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"}},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"047 504 352","processor":"PRPAT","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"22 150 445 917","channel":"Paper","startDate":"26 February 2025","endDate":"26 November 2026","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"}},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"870 125 637","processor":"DATHO","certificateType":"matex","status":"expired","checking":false,"certificateReference":"44 500 426 127","channel":"Digital","startDate":"11 July 2025","endDate":"11 April 2027","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"}},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"111 178 713","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT LUPL 8KGW","channel":"Digital","startDate":"10 June 2025","endDate":"10 March 2027","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"}},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"750 395 889","processor":"AICOL","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 8WMJ 5FWO","channel":"Pharmacy","startDate":"27 May 2025","endDate":"27 February 2027","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"}},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"481 277 492","processor":"PRPAT","certificateType":"matex","status":"expired","checking":false,"certificateReference":"26 067 552 244","channel":"Paper","startDate":"14 April 2025","endDate":"14 January 2027","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"}},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"771 659 963","processor":"PRPAT","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"10 233 248 299","channel":"Paper","startDate":"13 June 2025","endDate":"13 March 2027","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"}},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"185 496 908","processor":"PRPAT","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"26 969 768 919","channel":"Paper","startDate":"26 January 2025","endDate":"26 October 2026","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"}},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"414 976 850","processor":"PRPAT","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 73K5 TLTV","channel":"Digital","startDate":"18 July 2025","endDate":"18 April 2027","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"}},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"668 191 866","processor":"AICOL","certificateType":"matex","status":"expired","checking":false,"certificateReference":"40 572 602 525","channel":"Digital","startDate":"12 March 2025","endDate":"12 December 2026","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"}},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"127 639 985","processor":"PRPAT","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"44 373 338 685","channel":"Paper","startDate":"5 May 2025","endDate":"5 February 2027","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"}},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"852 390 745","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT NFFP 63SM","channel":"Digital","startDate":"1 May 2025","endDate":"1 February 2027","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"}},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"305 243 138","processor":"JASMI","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"67 126 046 156","channel":"Paper","startDate":"4 March 2025","endDate":"4 December 2026","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"}},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"009 516 046","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT AW6D 898S","channel":"Digital","startDate":"11 May 2025","endDate":"11 February 2027","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"}},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"039 535 694","processor":"AICOL","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"24 318 672 302","channel":"Paper","startDate":"17 April 2025","endDate":"17 January 2027","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"}},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"416 607 191","processor":"AICOL","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 0VG6 2PN0","channel":"Digital","startDate":"30 April 2025","endDate":"30 January 2027","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"}},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"940 591 863","processor":"JASMI","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"74 669 198 411","channel":"Paper","startDate":"25 February 2025","endDate":"25 November 2026","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"}},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"112 815 137","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT RQIJ 77BH","channel":"Digital","startDate":"3 May 2025","endDate":"3 February 2027","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"}},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"267 266 112","processor":"JASMI","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"65 464 989 119","channel":"Paper","startDate":"4 February 2025","endDate":"4 November 2026","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"}},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"462 667 453","processor":"PRPAT","certificateType":"matex","status":"on-hold","checking":false,"certificateReference":"47 059 198 883","channel":"Paper","startDate":"21 March 2025","endDate":"21 December 2026","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"}},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"449 141 207","processor":"PRPAT","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT XW8B VWMO","channel":"Digital","startDate":"22 April 2025","endDate":"22 January 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"708 383 164","processor":"DATHO","certificateType":"matex","status":"processing","checking":false,"certificateReference":"2026 01 19 11 29 24N966546100","channel":"Paper","startDate":"24 February 2025","endDate":"24 November 2026","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"}},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"607 129 204","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT BRXI YVS6","channel":"Digital","startDate":"24 April 2025","endDate":"24 January 2027","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"}},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"749 466 969","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 3DI4 RGY7","channel":"Digital","startDate":"4 June 2025","endDate":"4 March 2027","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"}},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"004 976 032","processor":"PRPAT","certificateType":"matex","status":"processing","checking":false,"certificateReference":"2026 01 19 11 29 24N836377189","channel":"Paper","startDate":"7 July 2025","endDate":"7 April 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"}},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"369 000 666","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT CXLG V0QX","channel":"Digital","startDate":"27 February 2025","endDate":"27 November 2026","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"}},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"028 846 931","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 6WOQ I4SK","channel":"Digital","startDate":"19 March 2025","endDate":"19 December 2026","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"}},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"833 518 075","processor":"AICOL","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT BD0H EWW0","channel":"Digital","startDate":"24 January 2025","endDate":"24 October 2026","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"}},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"348 177 032","processor":"PRPAT","certificateType":"matex","status":"processing","checking":false,"certificateReference":"2026 01 19 11 29 24N602446690","channel":"Paper","startDate":"4 June 2025","endDate":"4 March 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"}},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"434 606 872","processor":"DATHO","certificateType":"matex","status":"active","checking":false,"certificateReference":"16 694 153 171","channel":"Digital","startDate":"7 April 2025","endDate":"7 January 2027","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"}},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"834 865 771","processor":"JASMI","certificateType":"matex","status":"accepted","checking":true,"certificateReference":"61 662 104 656","channel":"Paper","startDate":"20 June 2025","endDate":"20 March 2027","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"}},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"407 460 645","processor":"AICOL","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT VJRG RXT7","channel":"Digital","startDate":"18 February 2025","endDate":"18 November 2026","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"}},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"709 492 997","processor":"PRPAT","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 02AX VZTB","channel":"Digital","startDate":"1 June 2025","endDate":"1 March 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"854 024 499","processor":"DATHO","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT 7KBO LG6A","channel":"Digital","startDate":"22 May 2025","endDate":"22 February 2027","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"}},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"293 745 940","processor":"JASMI","certificateType":"matex","status":"on-hold","checking":true,"certificateReference":"20 313 792 076","channel":"Paper","startDate":"6 May 2025","endDate":"6 February 2027","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"}},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"559 006 221","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT UAKL ZA1G","channel":"Digital","startDate":"8 June 2025","endDate":"8 March 2027","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"}},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"265 113 829","processor":"DATHO","certificateType":"matex","status":"active","checking":false,"certificateReference":"89 892 644 732","channel":"Digital","startDate":"13 July 2025","endDate":"13 April 2027","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"}},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"091 204 282","processor":"AICOL","certificateType":"matex","status":"accepted","checking":false,"certificateReference":"68 043 412 196","channel":"Paper","startDate":"1 February 2025","endDate":"1 November 2026","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"}},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"590 635 830","processor":"PRPAT","certificateType":"matex","status":"processing","checking":false,"certificateReference":"2026 01 19 11 29 24N987822326","channel":"Paper","startDate":"12 March 2025","endDate":"12 December 2026","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"}},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"341 374 191","processor":"PRPAT","certificateType":"matex","status":"processing","checking":false,"certificateReference":"2026 01 19 11 29 24N070615025","channel":"Paper","startDate":"29 April 2025","endDate":"29 January 2027","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"}},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"496 221 944","processor":"ZAKHA","certificateType":"matex","status":"expired","checking":false,"certificateReference":"43 427 853 599","channel":"Digital","startDate":"28 January 2025","endDate":"28 October 2026","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"}},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"395 363 262","processor":"ZAKHA","certificateType":"hrtppc","status":"active","checking":false,"certificateReference":"HRT NWD2 8W1C","channel":"Digital","startDate":"31 March 2025","endDate":"31 December 2026","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"}},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"053 668 705","processor":"ZAKHA","certificateType":"matex","status":"processing","checking":false,"certificateReference":"2026 01 19 11 29 24N832156198","channel":"Paper","startDate":"19 June 2025","endDate":"19 March 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}}]';

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





return true;
}

/**
* @import { Environment } from 'nunjucks'
*/
