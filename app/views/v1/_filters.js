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
        txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--grey">Checking</strong>' : 'Checking';
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
  // Gets five certificates with status either 'Reviewing' or 'Accepted'
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

        if( patient.status === 'reviewing' || patient.status === 'accepted' ){

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
      summary.push( 'status "Processing", "Reviewing" or "Accepted"' ); // Only used for role=backOffice
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
  env.addFilter('getConfidenceTag', function( num ){
    
    if( !Number.isInteger( num ) ){
      num = 0;
    }

    const showLevels = [ 'low' ]; // Add the levels you wish to output here...

    let confidenceLevel = 'empty';
    let tag = '<span class="confidence-level"><span class="nhsuk-tag nhsuk-tag--grey">Empty</span></span>';

    if( num > 0 ) {
      confidenceLevel = 'low';
      tag =  '<span class="confidence-level confidence-level--'+confidenceLevel+'"><span class="nhsuk-tag nhsuk-tag--red">Low</span>'
      tag += '<span class="nhsuk-tag nhsuk-tag--red confidence-score">'+num+'</span></span>';
    }
    
    if( num > 30 ){
      confidenceLevel = 'medium';
      tag =  '<span class="confidence-level confidence-level--'+confidenceLevel+'"><span class="nhsuk-tag nhsuk-tag--yellow">Medium</span>'
      tag += '<span class="nhsuk-tag nhsuk-tag--yellow confidence-score">'+num+'</span></span>';
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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"290 696 621","certificateType":"hrtppc","status":"active","certificateReference":"HRT ZKCP UYLC","channel":"Digital","startDate":"21 March 2025","endDate":"21 December 2026","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"}},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"224 152 777","certificateType":"hrtppc","status":"active","certificateReference":"HRT NEN8 865P","channel":"Digital","startDate":"18 January 2025","endDate":"18 October 2026","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"}},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"651 886 658","certificateType":"hrtppc","status":"active","certificateReference":"HRT 53XU CKWV","channel":"Digital","startDate":"30 June 2025","endDate":"30 March 2027","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"}},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"713 519 612","certificateType":"hrtppc","status":"active","certificateReference":"HRT 5XIV EO0W","channel":"Digital","startDate":"29 January 2025","endDate":"29 October 2026","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"}},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"010 082 600","certificateType":"hrtppc","status":"active","certificateReference":"HRT SZHM 1WM8","channel":"Pharmacy","startDate":"7 July 2025","endDate":"7 April 2027","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"}},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"664 243 256","certificateType":"matex","status":"expired","certificateReference":"20 459 050 073","channel":"Digital","startDate":"31 March 2025","endDate":"31 December 2026","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"}},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"590 047 331","certificateType":"hrtppc","status":"active","certificateReference":"HRT XKY0 ITX0","channel":"Digital","startDate":"1 May 2025","endDate":"1 February 2027","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"}},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"772 440 042","certificateType":"hrtppc","status":"active","certificateReference":"HRT 0SV7 QAES","channel":"Digital","startDate":"21 March 2025","endDate":"21 December 2026","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"}},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"762 146 562","certificateType":"hrtppc","status":"active","certificateReference":"HRT YZIC 6DD1","channel":"Digital","startDate":"6 April 2025","endDate":"6 January 2027","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"}},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"628 101 040","certificateType":"hrtppc","status":"active","certificateReference":"HRT CMR0 EQE6","channel":"Digital","startDate":"11 June 2025","endDate":"11 March 2027","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"}},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"528 741 194","certificateType":"hrtppc","status":"active","certificateReference":"HRT STY5 55NH","channel":"Digital","startDate":"26 February 2025","endDate":"26 November 2026","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"}},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"585 154 225","certificateType":"matex","status":"accepted","certificateReference":"23 589 291 609","channel":"Paper","startDate":"2 July 2025","endDate":"2 April 2027","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"}},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"287 661 743","certificateType":"hrtppc","status":"active","certificateReference":"HRT D610 5GID","channel":"Telephony","startDate":"6 February 2025","endDate":"6 November 2026","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"}},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"997 631 428","certificateType":"hrtppc","status":"active","certificateReference":"HRT ZFQS 23M1","channel":"Pharmacy","startDate":"12 May 2025","endDate":"12 February 2027","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"}},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"902 432 406","certificateType":"hrtppc","status":"active","certificateReference":"HRT 4D2Z QOEC","channel":"Digital","startDate":"19 January 2025","endDate":"19 October 2026","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"}},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"485 516 970","certificateType":"matex","status":"active","certificateReference":"29 791 954 003","channel":"Digital","startDate":"11 March 2025","endDate":"11 December 2026","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"}},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"264 130 632","certificateType":"hrtppc","status":"active","certificateReference":"HRT 58Y3 NJVZ","channel":"Digital","startDate":"28 April 2025","endDate":"28 January 2027","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"}},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"298 724 895","certificateType":"matex","status":"accepted","certificateReference":"07 724 720 962","channel":"Paper","startDate":"11 June 2025","endDate":"11 March 2027","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"}},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"113 812 682","certificateType":"hrtppc","status":"active","certificateReference":"HRT J4KR UW3Z","channel":"Digital","startDate":"24 April 2025","endDate":"24 January 2027","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"}},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"321 972 833","certificateType":"matex","status":"accepted","certificateReference":"03 999 798 904","channel":"Paper","startDate":"25 May 2025","endDate":"25 February 2027","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"}},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"127 260 601","certificateType":"matex","status":"processing","certificateReference":"2026 01 12 16 07 08N795004058","channel":"Paper","startDate":"7 June 2025","endDate":"7 March 2027","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"}},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"972 227 176","certificateType":"matex","status":"active","certificateReference":"98 332 911 251","channel":"Paper","startDate":"3 February 2025","endDate":"3 November 2026","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"}},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"251 948 865","certificateType":"hrtppc","status":"active","certificateReference":"HRT AOD7 PI4W","channel":"Digital","startDate":"18 March 2025","endDate":"18 December 2026","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"}},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"307 186 019","certificateType":"hrtppc","status":"active","certificateReference":"HRT JUJN L78Y","channel":"Pharmacy","startDate":"7 March 2025","endDate":"7 December 2026","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"}},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"222 281 045","certificateType":"matex","status":"accepted","certificateReference":"37 680 285 886","channel":"Paper","startDate":"13 April 2025","endDate":"13 January 2027","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"}},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"575 151 689","certificateType":"hrtppc","status":"active","certificateReference":"HRT 6Z5V F864","channel":"Digital","startDate":"6 July 2025","endDate":"6 April 2027","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"}},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"873 840 295","certificateType":"matex","status":"processing","certificateReference":"2026 01 12 16 07 08N913654696","channel":"Paper","startDate":"12 May 2025","endDate":"12 February 2027","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"}},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"439 747 177","certificateType":"matex","status":"accepted","certificateReference":"24 299 684 458","channel":"Paper","startDate":"25 June 2025","endDate":"25 March 2027","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"}},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"672 998 410","certificateType":"hrtppc","status":"active","certificateReference":"HRT DCU2 I55L","channel":"Digital","startDate":"7 April 2025","endDate":"7 January 2027","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"}},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"896 147 146","certificateType":"hrtppc","status":"active","certificateReference":"HRT DCEZ 2XJE","channel":"Digital","startDate":"1 June 2025","endDate":"1 March 2027","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"}},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"515 122 442","certificateType":"hrtppc","status":"active","certificateReference":"HRT S7S6 OS7W","channel":"Digital","startDate":"23 April 2025","endDate":"23 January 2027","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"}},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"878 715 414","certificateType":"matex","status":"accepted","certificateReference":"67 912 650 111","channel":"Paper","startDate":"12 June 2025","endDate":"12 March 2027","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"}},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"666 176 480","certificateType":"matex","status":"pending","certificateReference":"94 838 673 555","channel":"Paper","startDate":"13 March 2025","endDate":"13 December 2026","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"}},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"557 703 161","certificateType":"hrtppc","status":"active","certificateReference":"HRT G68X F38T","channel":"Digital","startDate":"9 May 2025","endDate":"9 February 2027","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"}},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"855 098 798","certificateType":"hrtppc","status":"active","certificateReference":"HRT SLJ0 Q49O","channel":"Digital","startDate":"9 April 2025","endDate":"9 January 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"867 722 182","certificateType":"matex","status":"accepted","certificateReference":"30 847 888 424","channel":"Paper","startDate":"11 April 2025","endDate":"11 January 2027","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"}},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"836 771 853","certificateType":"hrtppc","status":"active","certificateReference":"HRT Q5IO LUP3","channel":"Pharmacy","startDate":"31 March 2025","endDate":"31 December 2026","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"}},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"376 502 914","certificateType":"matex","status":"pending","certificateReference":"25 144 643 470","channel":"Paper","startDate":"11 April 2025","endDate":"11 January 2027","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"}},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"660 679 414","certificateType":"matex","status":"active","certificateReference":"62 701 887 902","channel":"Paper","startDate":"3 April 2025","endDate":"3 January 2027","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"}},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"612 838 360","certificateType":"hrtppc","status":"active","certificateReference":"HRT K85P AOV7","channel":"Digital","startDate":"8 July 2025","endDate":"8 April 2027","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"}},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"469 988 063","certificateType":"matex","status":"pending","certificateReference":"03 227 237 883","channel":"Paper","startDate":"21 January 2025","endDate":"21 October 2026","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"}},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"892 692 672","certificateType":"matex","status":"pending","certificateReference":"93 923 669 677","channel":"Paper","startDate":"12 February 2025","endDate":"12 November 2026","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"}},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"663 311 442","certificateType":"matex","status":"active","certificateReference":"08 981 208 669","channel":"Digital","startDate":"24 January 2025","endDate":"24 October 2026","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"}},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"645 605 515","certificateType":"hrtppc","status":"active","certificateReference":"HRT HN1M XEEF","channel":"Digital","startDate":"22 February 2025","endDate":"22 November 2026","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"}},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"532 126 859","certificateType":"hrtppc","status":"active","certificateReference":"HRT 54JA 08N7","channel":"Digital","startDate":"18 May 2025","endDate":"18 February 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"}},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"713 327 763","certificateType":"hrtppc","status":"active","certificateReference":"HRT BPMW HZSB","channel":"Digital","startDate":"6 May 2025","endDate":"6 February 2027","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"}},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"881 408 774","certificateType":"hrtppc","status":"active","certificateReference":"HRT 2EEG JYCD","channel":"Digital","startDate":"7 July 2025","endDate":"7 April 2027","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"}},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"114 590 231","certificateType":"matex","status":"processing","certificateReference":"2026 01 12 16 07 08N259295112","channel":"Paper","startDate":"28 May 2025","endDate":"28 February 2027","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"}},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"963 119 106","certificateType":"hrtppc","status":"active","certificateReference":"HRT OF28 ZF3G","channel":"Digital","startDate":"10 June 2025","endDate":"10 March 2027","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"}},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"295 261 669","certificateType":"hrtppc","status":"active","certificateReference":"HRT 961B JXN0","channel":"Digital","startDate":"29 January 2025","endDate":"29 October 2026","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"}},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"675 387 074","certificateType":"hrtppc","status":"active","certificateReference":"HRT J6XH O9S0","channel":"Digital","startDate":"22 January 2025","endDate":"22 October 2026","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"}},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"964 074 387","certificateType":"matex","status":"accepted","certificateReference":"00 227 296 125","channel":"Paper","startDate":"31 May 2025","endDate":"3 March 2027","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"}},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"378 921 220","certificateType":"matex","status":"pending","certificateReference":"01 780 401 096","channel":"Paper","startDate":"15 March 2025","endDate":"15 December 2026","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"}},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"954 938 195","certificateType":"hrtppc","status":"active","certificateReference":"HRT 5O2A FVT4","channel":"Digital","startDate":"18 February 2025","endDate":"18 November 2026","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"}},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"461 943 347","certificateType":"hrtppc","status":"active","certificateReference":"HRT YPZ8 7PTY","channel":"Digital","startDate":"16 June 2025","endDate":"16 March 2027","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"}},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"064 738 730","certificateType":"hrtppc","status":"active","certificateReference":"HRT 0X5W 3WES","channel":"Digital","startDate":"14 January 2025","endDate":"14 October 2026","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"}},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"917 914 638","certificateType":"matex","status":"accepted","certificateReference":"82 273 592 554","channel":"Paper","startDate":"20 February 2025","endDate":"20 November 2026","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"}},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"437 452 418","certificateType":"matex","status":"accepted","certificateReference":"02 028 541 399","channel":"Paper","startDate":"16 June 2025","endDate":"16 March 2027","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"}},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"902 134 126","certificateType":"hrtppc","status":"active","certificateReference":"HRT D4U7 87KR","channel":"Digital","startDate":"1 June 2025","endDate":"1 March 2027","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"}},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"120 051 964","certificateType":"hrtppc","status":"active","certificateReference":"HRT Q0W7 WMUP","channel":"Digital","startDate":"10 July 2025","endDate":"10 April 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"}},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"177 228 592","certificateType":"matex","status":"accepted","certificateReference":"06 822 126 598","channel":"Paper","startDate":"8 April 2025","endDate":"8 January 2027","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"}},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"488 049 149","certificateType":"matex","status":"accepted","certificateReference":"85 979 889 514","channel":"Paper","startDate":"26 March 2025","endDate":"26 December 2026","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"}},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"893 208 588","certificateType":"matex","status":"accepted","certificateReference":"32 991 176 602","channel":"Paper","startDate":"28 April 2025","endDate":"28 January 2027","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"}},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"321 125 522","certificateType":"hrtppc","status":"active","certificateReference":"HRT DQUI YIVE","channel":"Digital","startDate":"30 May 2025","endDate":"2 March 2027","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"}},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"029 792 225","certificateType":"hrtppc","status":"active","certificateReference":"HRT V5RE 782O","channel":"Digital","startDate":"8 February 2025","endDate":"8 November 2026","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"}},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"511 212 154","certificateType":"matex","status":"active","certificateReference":"42 718 520 118","channel":"Paper","startDate":"23 February 2025","endDate":"23 November 2026","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"}},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"725 630 418","certificateType":"hrtppc","status":"active","certificateReference":"HRT CKL9 WWND","channel":"Digital","startDate":"29 June 2025","endDate":"29 March 2027","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"}},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"006 460 268","certificateType":"matex","status":"pending","certificateReference":"01 778 089 537","channel":"Paper","startDate":"7 June 2025","endDate":"7 March 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"}},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"389 432 034","certificateType":"matex","status":"active","certificateReference":"41 718 701 139","channel":"Digital","startDate":"27 March 2025","endDate":"27 December 2026","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"}},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"138 247 781","certificateType":"hrtppc","status":"active","certificateReference":"HRT UW73 XPCS","channel":"Digital","startDate":"8 May 2025","endDate":"8 February 2027","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"}},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"773 992 891","certificateType":"matex","status":"active","certificateReference":"80 397 047 268","channel":"Digital","startDate":"30 April 2025","endDate":"30 January 2027","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"}},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"862 324 856","certificateType":"hrtppc","status":"active","certificateReference":"HRT BOCS 8PP7","channel":"Digital","startDate":"9 March 2025","endDate":"9 December 2026","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"}},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"239 864 180","certificateType":"matex","status":"accepted","certificateReference":"99 927 753 097","channel":"Paper","startDate":"19 June 2025","endDate":"19 March 2027","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"}},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"370 510 960","certificateType":"hrtppc","status":"active","certificateReference":"HRT H5LY 21CB","channel":"Digital","startDate":"22 January 2025","endDate":"22 October 2026","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"}},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"633 052 080","certificateType":"matex","status":"accepted","certificateReference":"77 876 018 467","channel":"Paper","startDate":"19 April 2025","endDate":"19 January 2027","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"}},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"307 813 301","certificateType":"matex","status":"active","certificateReference":"29 143 063 977","channel":"Paper","startDate":"31 March 2025","endDate":"31 December 2026","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"}},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"113 202 644","certificateType":"matex","status":"active","certificateReference":"40 319 859 530","channel":"Digital","startDate":"16 May 2025","endDate":"16 February 2027","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"}},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"648 167 067","certificateType":"matex","status":"active","certificateReference":"18 483 041 467","channel":"Paper","startDate":"20 May 2025","endDate":"20 February 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"986 199 618","certificateType":"matex","status":"active","certificateReference":"80 366 842 694","channel":"Paper","startDate":"6 June 2025","endDate":"6 March 2027","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"}},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"880 341 412","certificateType":"matex","status":"accepted","certificateReference":"58 403 539 659","channel":"Paper","startDate":"21 January 2025","endDate":"21 October 2026","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"}},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"380 750 014","certificateType":"matex","status":"accepted","certificateReference":"74 138 488 222","channel":"Paper","startDate":"14 April 2025","endDate":"14 January 2027","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"}},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"988 914 557","certificateType":"matex","status":"active","certificateReference":"71 292 065 013","channel":"Digital","startDate":"20 May 2025","endDate":"20 February 2027","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"}},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"182 664 477","certificateType":"hrtppc","status":"active","certificateReference":"HRT MKWE 6WWI","channel":"Digital","startDate":"7 March 2025","endDate":"7 December 2026","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"}},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"147 405 752","certificateType":"matex","status":"pending","certificateReference":"10 214 719 216","channel":"Paper","startDate":"17 March 2025","endDate":"17 December 2026","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"}},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"916 326 401","certificateType":"hrtppc","status":"active","certificateReference":"HRT XJ6Z TMKB","channel":"Digital","startDate":"7 February 2025","endDate":"7 November 2026","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"}},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"889 422 630","certificateType":"hrtppc","status":"active","certificateReference":"HRT LZ2Z XRK0","channel":"Digital","startDate":"1 February 2025","endDate":"1 November 2026","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"}},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"690 083 003","certificateType":"hrtppc","status":"active","certificateReference":"HRT NW5Z KREN","channel":"Pharmacy","startDate":"13 April 2025","endDate":"13 January 2027","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"}},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"808 915 749","certificateType":"matex","status":"pending","certificateReference":"08 736 277 537","channel":"Paper","startDate":"19 April 2025","endDate":"19 January 2027","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"}},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"929 675 664","certificateType":"hrtppc","status":"active","certificateReference":"HRT 4RNL F3N2","channel":"Digital","startDate":"28 April 2025","endDate":"28 January 2027","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"}},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"864 314 319","certificateType":"matex","status":"active","certificateReference":"50 677 566 939","channel":"Digital","startDate":"7 April 2025","endDate":"7 January 2027","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"}},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"577 248 460","certificateType":"hrtppc","status":"active","certificateReference":"HRT EAKU SQAZ","channel":"Digital","startDate":"19 June 2025","endDate":"19 March 2027","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"}},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"526 664 025","certificateType":"matex","status":"active","certificateReference":"17 077 894 379","channel":"Digital","startDate":"11 February 2025","endDate":"11 November 2026","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"}},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"399 371 220","certificateType":"matex","status":"accepted","certificateReference":"11 888 738 911","channel":"Paper","startDate":"7 February 2025","endDate":"7 November 2026","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"}},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"715 089 386","certificateType":"matex","status":"pending","certificateReference":"96 780 476 416","channel":"Paper","startDate":"6 March 2025","endDate":"6 December 2026","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"}},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"406 605 437","certificateType":"hrtppc","status":"active","certificateReference":"HRT TR4X I0PT","channel":"Digital","startDate":"10 July 2025","endDate":"10 April 2027","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"}},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"182 004 503","certificateType":"matex","status":"accepted","certificateReference":"46 364 269 355","channel":"Paper","startDate":"20 January 2025","endDate":"20 October 2026","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"}},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"814 385 113","certificateType":"hrtppc","status":"active","certificateReference":"HRT F2NV CIE0","channel":"Digital","startDate":"29 May 2025","endDate":"1 March 2027","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"}},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"298 736 203","certificateType":"matex","status":"active","certificateReference":"88 588 343 142","channel":"Paper","startDate":"1 March 2025","endDate":"1 December 2026","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"}},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"870 700 143","certificateType":"hrtppc","status":"active","certificateReference":"HRT IVP5 Q6MD","channel":"Digital","startDate":"28 February 2025","endDate":"28 November 2026","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"032 638 690","certificateType":"matex","status":"pending","certificateReference":"93 861 016 643","channel":"Paper","startDate":"28 February 2025","endDate":"28 November 2026","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"}},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"762 478 435","certificateType":"hrtppc","status":"active","certificateReference":"HRT DMRL ERC4","channel":"Digital","startDate":"17 May 2025","endDate":"17 February 2027","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"}},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"672 030 472","certificateType":"matex","status":"active","certificateReference":"58 947 773 169","channel":"Digital","startDate":"22 March 2025","endDate":"22 December 2026","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"}},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"287 917 357","certificateType":"hrtppc","status":"active","certificateReference":"HRT GKGU 57RJ","channel":"Telephony","startDate":"2 June 2025","endDate":"2 March 2027","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"}}]';

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
