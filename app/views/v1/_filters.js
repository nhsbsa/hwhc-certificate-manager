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

      case 'checking':
        txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--grey dashed">Checking</strong>' : 'Checking';
        break;

      case 'accepted':
        txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--grey">Accepted</strong>' : 'Accepted';
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

    let filteredRows = [];

    if( Object.keys( searchTerms ).length > 0 ){

      Object.keys( searchTerms ).forEach(function( key, i ){

        let fRows = ( i === 0 ) ? rows : filteredRows.slice();
        filteredRows = [];        
      
        fRows.forEach( function( row ){

          const needles = ( key === 'status' ) ?  searchTerms[key].split(',') : [searchTerms[key].trim().toLowerCase()];
          let haystack;

          switch( key ){

            case 'postcode':
              haystack = row.address[key].toLowerCase();
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
  env.addFilter('getTableHeadRows', function ( sortColumns ) {

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
              { text: 'End date' },
              { html: '<span class="nhsuk-u-visually-hidden">Action</span>' }
            ];

    return rows;

  });



  //
  // DRAW ROWS FUNCTION
  //
  function _drawRows( inputRows ){

    const rows = [];

    inputRows.forEach(function (patient) {

      const obj = [
        { html: '<strong>' + patient.lastName + ', ' + patient.firstName + '</strong><br /><span class="nhsuk-body-s">' + patient.nhsNumber + '</span>' },
        { html: patient.address.postcode },
        { html: _getCertificateTypeTextOrTag( patient.certificateType, true )},
        { html: _getStatusTextOrTag( patient.status, true ) },
        { html: ( patient.status === 'processing' ) ? '<span class="nhsuk-body-s nhsuk-u-secondary-text-colour">'+ patient.certificateReference +'</span>' : patient.certificateReference },
        { text: patient.endDate },
        { html: '<a href="'+ patient.certificateType +'/case?patientID=' + patient.id + '">View <span class="nhsuk-u-visually-hidden">' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag( patient.certificateType ) + '</span></a>' },
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

        if( patient.status === 'checking' ){

          const obj = [
            { html: '<strong>' + patient.lastName + ', ' + patient.firstName + '</strong><br /><span class="nhsuk-body-s">' + patient.nhsNumber + '</span>' },
            { html: patient.address.postcode },
            { html: _getStatusTextOrTag( patient.status, true ) },
            { html: ( patient.status === 'processing' ) ? '<span class="nhsuk-body-s nhsuk-u-secondary-text-colour">'+ patient.certificateReference +'</span>' : patient.certificateReference },
            { html: '<a href="'+ patient.certificateType +'/comparison?patientID=' + patient.id + '&showProcessorError=true">View <span class="nhsuk-u-visually-hidden">' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag( patient.certificateType ) + '</span></a>' },
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
  env.addFilter('getTableRows', function ( patientData ) {

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

    if( this.ctx.data.searchStatus ){
      searchTerms.status = this.ctx.data.searchStatus;
      summary.push( 'status "Processing", "On hold", "Checking" or "Accepted"' ); // Only used for role=backOffice
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

    return _drawRows( paginatedPatientData );

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

    const showLevels = ( showEverything === true ) ? [ 'empty', 'low', 'medium', 'high' ] : [ 'low' ]; // Add the levels you wish to output here...

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

    let patientData =  '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"152 683 047","certificateType":"matex","status":"on-hold","certificateReference":"35 385 211 911","channel":"Paper","startDate":"10 February 2025","endDate":"10 November 2026","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"}},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"267 642 871","certificateType":"hrtppc","status":"active","certificateReference":"HRT XBEZ WKGT","channel":"Digital","startDate":"14 May 2025","endDate":"14 February 2027","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"}},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"710 495 416","certificateType":"matex","status":"accepted","certificateReference":"26 596 929 314","channel":"Paper","startDate":"14 April 2025","endDate":"14 January 2027","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"}},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"857 933 468","certificateType":"matex","status":"accepted","certificateReference":"63 587 359 508","channel":"Paper","startDate":"5 July 2025","endDate":"5 April 2027","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"}},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"118 696 237","certificateType":"matex","status":"active","certificateReference":"19 384 248 367","channel":"Digital","startDate":"10 April 2025","endDate":"10 January 2027","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"}},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"393 921 051","certificateType":"hrtppc","status":"active","certificateReference":"HRT H2FJ KCMC","channel":"Digital","startDate":"22 February 2025","endDate":"22 November 2026","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"}},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"432 051 190","certificateType":"hrtppc","status":"active","certificateReference":"HRT HO4Q 9JG7","channel":"Digital","startDate":"13 March 2025","endDate":"13 December 2026","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"}},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"298 171 912","certificateType":"matex","status":"accepted","certificateReference":"77 014 800 764","channel":"Paper","startDate":"10 April 2025","endDate":"10 January 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"}},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"026 204 810","certificateType":"hrtppc","status":"active","certificateReference":"HRT 1QLM SRYJ","channel":"Digital","startDate":"23 June 2025","endDate":"23 March 2027","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"}},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"885 870 128","certificateType":"hrtppc","status":"active","certificateReference":"HRT LR0M I1RY","channel":"Digital","startDate":"26 February 2025","endDate":"26 November 2026","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"}},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"481 402 114","certificateType":"hrtppc","status":"active","certificateReference":"HRT SKBA I6L5","channel":"Digital","startDate":"27 June 2025","endDate":"27 March 2027","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"}},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"698 390 127","certificateType":"hrtppc","status":"active","certificateReference":"HRT 70W3 SVZ0","channel":"Digital","startDate":"5 March 2025","endDate":"5 December 2026","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"}},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"998 309 815","certificateType":"matex","status":"expired","certificateReference":"04 833 995 085","channel":"Paper","startDate":"30 May 2025","endDate":"2 March 2027","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"}},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"232 304 878","certificateType":"hrtppc","status":"active","certificateReference":"HRT C7BF FW5U","channel":"Digital","startDate":"24 March 2025","endDate":"24 December 2026","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"}},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"345 755 910","certificateType":"matex","status":"expired","certificateReference":"31 214 882 490","channel":"Paper","startDate":"30 March 2025","endDate":"30 December 2026","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"}},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"664 199 617","certificateType":"hrtppc","status":"active","certificateReference":"HRT CKMF Y5WI","channel":"Digital","startDate":"3 February 2025","endDate":"3 November 2026","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"}},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"196 843 558","certificateType":"matex","status":"processing","certificateReference":"2026 01 14 08 39 12N327694992","channel":"Paper","startDate":"15 March 2025","endDate":"15 December 2026","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"}},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"025 725 749","certificateType":"matex","status":"accepted","certificateReference":"73 460 959 112","channel":"Paper","startDate":"12 May 2025","endDate":"12 February 2027","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"}},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"680 407 062","certificateType":"hrtppc","status":"active","certificateReference":"HRT UW7J QQRF","channel":"Digital","startDate":"23 April 2025","endDate":"23 January 2027","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"}},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"183 600 097","certificateType":"hrtppc","status":"active","certificateReference":"HRT 8BYH 8EFI","channel":"Pharmacy","startDate":"16 June 2025","endDate":"16 March 2027","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"}},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"412 625 035","certificateType":"matex","status":"on-hold","certificateReference":"67 322 714 269","channel":"Paper","startDate":"15 April 2025","endDate":"15 January 2027","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"}},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"791 207 267","certificateType":"hrtppc","status":"active","certificateReference":"HRT KUON BRVW","channel":"Digital","startDate":"5 May 2025","endDate":"5 February 2027","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"}},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"021 584 257","certificateType":"hrtppc","status":"active","certificateReference":"HRT S0XZ QNC1","channel":"Digital","startDate":"20 March 2025","endDate":"20 December 2026","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"}},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"573 993 632","certificateType":"matex","status":"expired","certificateReference":"94 678 783 622","channel":"Digital","startDate":"8 July 2025","endDate":"8 April 2027","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"}},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"559 944 808","certificateType":"matex","status":"expired","certificateReference":"57 949 636 305","channel":"Paper","startDate":"15 May 2025","endDate":"15 February 2027","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"}},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"424 996 292","certificateType":"hrtppc","status":"active","certificateReference":"HRT QGY4 G44T","channel":"Digital","startDate":"8 June 2025","endDate":"8 March 2027","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"}},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"879 475 204","certificateType":"matex","status":"expired","certificateReference":"95 041 449 377","channel":"Paper","startDate":"20 February 2025","endDate":"20 November 2026","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"}},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"896 818 715","certificateType":"hrtppc","status":"active","certificateReference":"HRT C8O6 B229","channel":"Digital","startDate":"1 May 2025","endDate":"1 February 2027","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"}},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"979 069 755","certificateType":"matex","status":"on-hold","certificateReference":"88 637 231 572","channel":"Paper","startDate":"28 April 2025","endDate":"28 January 2027","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"}},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"618 602 106","certificateType":"matex","status":"accepted","certificateReference":"33 685 030 770","channel":"Paper","startDate":"4 April 2025","endDate":"4 January 2027","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"}},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"317 107 696","certificateType":"matex","status":"expired","certificateReference":"18 299 860 454","channel":"Paper","startDate":"2 February 2025","endDate":"2 November 2026","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"}},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"890 958 658","certificateType":"hrtppc","status":"active","certificateReference":"HRT 4CLO JEQ7","channel":"Digital","startDate":"2 July 2025","endDate":"2 April 2027","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"}},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"423 071 873","certificateType":"matex","status":"active","certificateReference":"26 265 984 992","channel":"Paper","startDate":"25 February 2025","endDate":"25 November 2026","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"}},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"868 788 139","certificateType":"matex","status":"on-hold","certificateReference":"88 194 820 619","channel":"Paper","startDate":"31 January 2025","endDate":"31 October 2026","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"}},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"762 076 809","certificateType":"matex","status":"expired","certificateReference":"45 743 833 367","channel":"Digital","startDate":"19 February 2025","endDate":"19 November 2026","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"876 643 913","certificateType":"hrtppc","status":"active","certificateReference":"HRT Y8UZ EIYQ","channel":"Digital","startDate":"9 February 2025","endDate":"9 November 2026","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"}},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"819 743 560","certificateType":"hrtppc","status":"active","certificateReference":"HRT RRL5 HZWV","channel":"Digital","startDate":"16 June 2025","endDate":"16 March 2027","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"}},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"438 302 582","certificateType":"hrtppc","status":"active","certificateReference":"HRT IMY3 5U97","channel":"Digital","startDate":"13 February 2025","endDate":"13 November 2026","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"}},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"050 359 812","certificateType":"matex","status":"on-hold","certificateReference":"56 357 917 923","channel":"Paper","startDate":"9 March 2025","endDate":"9 December 2026","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"}},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"620 765 131","certificateType":"hrtppc","status":"active","certificateReference":"HRT WORX I0DI","channel":"Digital","startDate":"12 May 2025","endDate":"12 February 2027","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"}},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"811 842 070","certificateType":"matex","status":"active","certificateReference":"80 240 882 372","channel":"Digital","startDate":"8 June 2025","endDate":"8 March 2027","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"}},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"792 569 779","certificateType":"hrtppc","status":"active","certificateReference":"HRT 70YR 41RD","channel":"Digital","startDate":"16 June 2025","endDate":"16 March 2027","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"}},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"467 113 582","certificateType":"matex","status":"on-hold","certificateReference":"84 313 387 925","channel":"Paper","startDate":"2 May 2025","endDate":"2 February 2027","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"}},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"895 499 620","certificateType":"hrtppc","status":"active","certificateReference":"HRT JVT1 9ERD","channel":"Digital","startDate":"16 February 2025","endDate":"16 November 2026","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"}},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"393 530 645","certificateType":"matex","status":"accepted","certificateReference":"12 617 187 391","channel":"Paper","startDate":"13 May 2025","endDate":"13 February 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"}},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"142 245 035","certificateType":"matex","status":"accepted","certificateReference":"86 251 582 240","channel":"Paper","startDate":"28 March 2025","endDate":"28 December 2026","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"}},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"333 763 320","certificateType":"matex","status":"on-hold","certificateReference":"67 126 789 479","channel":"Paper","startDate":"8 April 2025","endDate":"8 January 2027","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"}},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"107 818 726","certificateType":"hrtppc","status":"active","certificateReference":"HRT WXUX BZFV","channel":"Digital","startDate":"18 April 2025","endDate":"18 January 2027","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"}},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"083 020 580","certificateType":"matex","status":"accepted","certificateReference":"50 325 554 170","channel":"Paper","startDate":"14 February 2025","endDate":"14 November 2026","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"}},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"473 124 747","certificateType":"matex","status":"processing","certificateReference":"2026 01 14 08 39 12N012527692","channel":"Paper","startDate":"8 February 2025","endDate":"8 November 2026","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"}},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"250 998 240","certificateType":"hrtppc","status":"active","certificateReference":"HRT R14K TXNR","channel":"Digital","startDate":"27 February 2025","endDate":"27 November 2026","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"}},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"917 617 776","certificateType":"hrtppc","status":"active","certificateReference":"HRT 41T6 UGY4","channel":"Digital","startDate":"13 July 2025","endDate":"13 April 2027","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"}},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"304 386 980","certificateType":"hrtppc","status":"active","certificateReference":"HRT KHR3 5IHX","channel":"Digital","startDate":"28 January 2025","endDate":"28 October 2026","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"}},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"312 089 088","certificateType":"matex","status":"expired","certificateReference":"09 791 773 649","channel":"Paper","startDate":"27 March 2025","endDate":"27 December 2026","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"}},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"044 707 125","certificateType":"hrtppc","status":"active","certificateReference":"HRT EM12 SSHA","channel":"Digital","startDate":"4 July 2025","endDate":"4 April 2027","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"}},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"630 632 182","certificateType":"matex","status":"processing","certificateReference":"2026 01 14 08 39 12N432923964","channel":"Paper","startDate":"21 April 2025","endDate":"21 January 2027","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"}},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"078 800 920","certificateType":"hrtppc","status":"active","certificateReference":"HRT O1I4 DD4O","channel":"Digital","startDate":"17 June 2025","endDate":"17 March 2027","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"}},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"858 590 282","certificateType":"matex","status":"accepted","certificateReference":"30 606 188 843","channel":"Paper","startDate":"4 July 2025","endDate":"4 April 2027","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"}},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"528 565 811","certificateType":"hrtppc","status":"active","certificateReference":"HRT OW02 0O3D","channel":"Digital","startDate":"24 March 2025","endDate":"24 December 2026","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"}},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"859 985 416","certificateType":"matex","status":"accepted","certificateReference":"19 603 401 755","channel":"Paper","startDate":"25 January 2025","endDate":"25 October 2026","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"}},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"002 201 182","certificateType":"hrtppc","status":"active","certificateReference":"HRT 8S4I IT2P","channel":"Digital","startDate":"14 May 2025","endDate":"14 February 2027","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"}},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"492 589 540","certificateType":"matex","status":"active","certificateReference":"88 440 625 023","channel":"Paper","startDate":"12 February 2025","endDate":"12 November 2026","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"}},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"179 834 947","certificateType":"hrtppc","status":"active","certificateReference":"HRT E7MT UWCS","channel":"Digital","startDate":"17 February 2025","endDate":"17 November 2026","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"}},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"597 768 189","certificateType":"hrtppc","status":"active","certificateReference":"HRT R42N M3H7","channel":"Digital","startDate":"16 January 2025","endDate":"16 October 2026","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"}},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"374 367 829","certificateType":"matex","status":"active","certificateReference":"89 683 850 870","channel":"Digital","startDate":"1 March 2025","endDate":"1 December 2026","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"}},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"051 350 869","certificateType":"matex","status":"on-hold","certificateReference":"36 900 838 884","channel":"Paper","startDate":"19 May 2025","endDate":"19 February 2027","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"}},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"127 000 402","certificateType":"matex","status":"active","certificateReference":"18 354 344 467","channel":"Digital","startDate":"4 March 2025","endDate":"4 December 2026","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"}},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"369 241 259","certificateType":"hrtppc","status":"active","certificateReference":"HRT Y2HN LOBG","channel":"Digital","startDate":"30 January 2025","endDate":"30 October 2026","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"}},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"976 611 383","certificateType":"hrtppc","status":"active","certificateReference":"HRT 928G 35E7","channel":"Pharmacy","startDate":"29 April 2025","endDate":"29 January 2027","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"}},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"867 083 090","certificateType":"hrtppc","status":"active","certificateReference":"HRT K8LH WW3U","channel":"Pharmacy","startDate":"5 May 2025","endDate":"5 February 2027","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"}},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"994 056 756","certificateType":"matex","status":"on-hold","certificateReference":"73 125 550 610","channel":"Paper","startDate":"21 March 2025","endDate":"21 December 2026","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"}},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"089 674 597","certificateType":"hrtppc","status":"active","certificateReference":"HRT 37NP BW7K","channel":"Digital","startDate":"30 April 2025","endDate":"30 January 2027","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"}},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"340 173 270","certificateType":"hrtppc","status":"active","certificateReference":"HRT ZYSP ES8I","channel":"Digital","startDate":"10 March 2025","endDate":"10 December 2026","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"}},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"850 268 873","certificateType":"hrtppc","status":"active","certificateReference":"HRT XCRG VMIE","channel":"Digital","startDate":"3 June 2025","endDate":"3 March 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"}},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"290 977 961","certificateType":"matex","status":"on-hold","certificateReference":"63 022 028 905","channel":"Paper","startDate":"20 May 2025","endDate":"20 February 2027","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"}},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"999 424 891","certificateType":"hrtppc","status":"active","certificateReference":"HRT N5QT IPTD","channel":"Digital","startDate":"6 March 2025","endDate":"6 December 2026","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"059 329 609","certificateType":"hrtppc","status":"active","certificateReference":"HRT XNWW Y2SQ","channel":"Digital","startDate":"25 January 2025","endDate":"25 October 2026","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"}},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"365 140 746","certificateType":"hrtppc","status":"active","certificateReference":"HRT L33G I8KN","channel":"Digital","startDate":"9 February 2025","endDate":"9 November 2026","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"}},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"809 497 675","certificateType":"hrtppc","status":"active","certificateReference":"HRT 3Z4T 83RF","channel":"Digital","startDate":"2 February 2025","endDate":"2 November 2026","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"}},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"698 365 405","certificateType":"hrtppc","status":"active","certificateReference":"HRT PEFF 5VBO","channel":"Digital","startDate":"14 May 2025","endDate":"14 February 2027","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"}},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"900 767 621","certificateType":"hrtppc","status":"active","certificateReference":"HRT 1G64 49AU","channel":"Digital","startDate":"5 June 2025","endDate":"5 March 2027","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"}},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"213 462 564","certificateType":"matex","status":"accepted","certificateReference":"40 964 599 865","channel":"Paper","startDate":"29 May 2025","endDate":"1 March 2027","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"}},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"245 182 425","certificateType":"matex","status":"active","certificateReference":"56 368 270 610","channel":"Digital","startDate":"24 April 2025","endDate":"24 January 2027","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"}},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"687 900 616","certificateType":"hrtppc","status":"active","certificateReference":"HRT BQK3 IBDK","channel":"Digital","startDate":"18 June 2025","endDate":"18 March 2027","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"}},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"919 425 811","certificateType":"matex","status":"active","certificateReference":"57 583 230 544","channel":"Digital","startDate":"6 February 2025","endDate":"6 November 2026","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"}},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"565 300 960","certificateType":"matex","status":"accepted","certificateReference":"57 301 278 595","channel":"Paper","startDate":"29 January 2025","endDate":"29 October 2026","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"}},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"248 337 077","certificateType":"hrtppc","status":"active","certificateReference":"HRT GK3R UF1X","channel":"Digital","startDate":"21 March 2025","endDate":"21 December 2026","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"}},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"294 869 995","certificateType":"hrtppc","status":"active","certificateReference":"HRT CBRH ZZTO","channel":"Digital","startDate":"27 April 2025","endDate":"27 January 2027","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"}},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"167 115 506","certificateType":"hrtppc","status":"active","certificateReference":"HRT I5HX WOTL","channel":"Digital","startDate":"16 April 2025","endDate":"16 January 2027","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"}},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"477 538 828","certificateType":"hrtppc","status":"active","certificateReference":"HRT OISH SD7E","channel":"Digital","startDate":"14 June 2025","endDate":"14 March 2027","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"}},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"304 803 430","certificateType":"hrtppc","status":"active","certificateReference":"HRT WU2Z L6CX","channel":"Digital","startDate":"24 January 2025","endDate":"24 October 2026","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"}},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"655 926 309","certificateType":"matex","status":"on-hold","certificateReference":"89 530 871 341","channel":"Paper","startDate":"29 June 2025","endDate":"29 March 2027","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"}},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"573 392 354","certificateType":"hrtppc","status":"active","certificateReference":"HRT MHWY KEEI","channel":"Digital","startDate":"26 February 2025","endDate":"26 November 2026","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"}},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"000 796 731","certificateType":"hrtppc","status":"active","certificateReference":"HRT LVH2 RE5Y","channel":"Digital","startDate":"18 February 2025","endDate":"18 November 2026","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"}},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"182 602 413","certificateType":"matex","status":"accepted","certificateReference":"03 565 516 610","channel":"Paper","startDate":"11 May 2025","endDate":"11 February 2027","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"}},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"461 871 944","certificateType":"matex","status":"active","certificateReference":"33 785 739 752","channel":"Digital","startDate":"3 February 2025","endDate":"3 November 2026","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"}},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"072 534 811","certificateType":"hrtppc","status":"active","certificateReference":"HRT FBT5 SGOP","channel":"Digital","startDate":"9 April 2025","endDate":"9 January 2027","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"}},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"138 432 737","certificateType":"hrtppc","status":"active","certificateReference":"HRT XOOW GH1G","channel":"Digital","startDate":"6 February 2025","endDate":"6 November 2026","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"}},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"018 863 167","certificateType":"matex","status":"on-hold","certificateReference":"10 557 209 076","channel":"Paper","startDate":"16 April 2025","endDate":"16 January 2027","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"}},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"301 437 104","certificateType":"matex","status":"active","certificateReference":"05 720 283 502","channel":"Digital","startDate":"27 February 2025","endDate":"27 November 2026","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"}},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"888 065 113","certificateType":"matex","status":"checking","certificateReference":"93 624 106 298","channel":"Paper","startDate":"19 February 2025","endDate":"19 November 2026","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"}},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"734 309 370","certificateType":"matex","status":"checking","certificateReference":"53 820 012 137","channel":"Paper","startDate":"11 July 2025","endDate":"11 April 2027","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"}},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"413 650 571","certificateType":"matex","status":"checking","certificateReference":"71 900 518 310","channel":"Paper","startDate":"26 January 2025","endDate":"26 October 2026","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"}}]';

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
