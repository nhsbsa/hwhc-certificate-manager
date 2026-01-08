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

      case 'pending':
        txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--grey">Pending</strong>' : 'Reviewing';
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
  // GET APPLICATION CHANNEL FUNCTION
  //
  const APPLICATION_CHANNEL_MAP = {
    // HRT PPC
    online: 'Online',
    pharmacy: 'Pharmacy',
    phone: 'Phone',
  
    // MATEX
    digital: 'Digital',
    paper: 'Paper'
  };
  
  function _getApplicationChannelText(channel) {
    return APPLICATION_CHANNEL_MAP[channel];
  }
  
  env.addFilter('getApplicationChannelText', _getApplicationChannelText);
  



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
            { html: ( patient.lastNote.text ) ? patient.lastNote.title + '<br /><span class="nhsuk-body-s nhsuk-u-secondary-text-colour">' + patient.lastNote.text + '</span>' : patient.lastNote.title  },
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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"476 611 437","certificateType":"matex","status":"pending","certificateReference":"87 160 359 390","startDate":"11 April 2025","endDate":"11 January 2027","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"lastNote":""},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"155 751 639","certificateType":"matex","status":"expired","certificateReference":"32 461 411 440","startDate":"26 January 2025","endDate":"26 October 2026","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"lastNote":{"title":"Certificate expired"}},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"616 556 924","certificateType":"matex","status":"expired","certificateReference":"68 752 256 510","startDate":"22 January 2025","endDate":"22 October 2026","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"lastNote":{"title":"Certificate expired"}},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"317 253 264","certificateType":"hrtppc","status":"active","certificateReference":"HRT TVJA VNVX","startDate":"22 March 2025","endDate":"22 December 2026","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"696 513 205","certificateType":"matex","status":"active","certificateReference":"84 004 960 689","startDate":"25 January 2025","endDate":"25 October 2026","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"800 331 036","certificateType":"matex","status":"active","certificateReference":"82 137 143 872","startDate":"19 February 2025","endDate":"19 November 2026","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"257 031 701","certificateType":"hrtppc","status":"active","certificateReference":"HRT BU3X D0MZ","startDate":"15 June 2025","endDate":"15 March 2027","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"269 933 709","certificateType":"hrtppc","status":"active","certificateReference":"HRT IV8C T0ST","startDate":"8 April 2025","endDate":"8 January 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"650 622 232","certificateType":"hrtppc","status":"active","certificateReference":"HRT WOHX M5D6","startDate":"29 March 2025","endDate":"29 December 2026","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"222 942 300","certificateType":"matex","status":"pending","certificateReference":"91 586 304 647","startDate":"1 March 2025","endDate":"1 December 2026","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"lastNote":""},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"569 290 590","certificateType":"matex","status":"processing","certificateReference":"2026 01 08 15 18 51N589121268","startDate":"21 January 2025","endDate":"21 October 2026","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"lastNote":{"title":"Application scanned"}},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"292 063 518","certificateType":"matex","status":"active","certificateReference":"60 907 348 927","startDate":"28 February 2025","endDate":"28 November 2026","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"656 205 572","certificateType":"matex","status":"pending","certificateReference":"58 198 679 482","startDate":"24 March 2025","endDate":"24 December 2026","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"lastNote":""},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"319 825 333","certificateType":"hrtppc","status":"active","certificateReference":"HRT A3ZR HJNL","startDate":"1 February 2025","endDate":"1 November 2026","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"234 871 812","certificateType":"matex","status":"expired","certificateReference":"01 653 821 980","startDate":"27 February 2025","endDate":"27 November 2026","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"lastNote":{"title":"Certificate expired"}},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"531 544 796","certificateType":"matex","status":"expired","certificateReference":"50 794 618 906","startDate":"2 April 2025","endDate":"2 January 2027","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"lastNote":{"title":"Certificate expired"}},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"006 120 787","certificateType":"matex","status":"accepted","certificateReference":"38 952 793 200","startDate":"27 February 2025","endDate":"27 November 2026","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"712 658 228","certificateType":"matex","status":"active","certificateReference":"47 123 518 850","startDate":"29 March 2025","endDate":"29 December 2026","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"185 742 446","certificateType":"hrtppc","status":"active","certificateReference":"HRT AFII 8BY2","startDate":"25 May 2025","endDate":"25 February 2027","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"679 021 613","certificateType":"matex","status":"processing","certificateReference":"2026 01 08 15 18 51N469238510","startDate":"2 April 2025","endDate":"2 January 2027","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"lastNote":{"title":"Application scanned"}},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"609 844 622","certificateType":"matex","status":"active","certificateReference":"87 864 856 670","startDate":"19 May 2025","endDate":"19 February 2027","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"159 575 209","certificateType":"hrtppc","status":"active","certificateReference":"HRT BV3C 2RYX","startDate":"9 February 2025","endDate":"9 November 2026","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"408 139 575","certificateType":"hrtppc","status":"active","certificateReference":"HRT 83TD 34WI","startDate":"18 January 2025","endDate":"18 October 2026","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"639 917 763","certificateType":"matex","status":"accepted","certificateReference":"82 514 970 264","startDate":"24 March 2025","endDate":"24 December 2026","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"628 726 611","certificateType":"matex","status":"accepted","certificateReference":"41 694 896 429","startDate":"3 July 2025","endDate":"3 April 2027","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"956 748 059","certificateType":"matex","status":"pending","certificateReference":"40 541 357 246","startDate":"17 January 2025","endDate":"17 October 2026","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"lastNote":""},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"127 063 645","certificateType":"hrtppc","status":"active","certificateReference":"HRT OMYE VD5R","startDate":"23 May 2025","endDate":"23 February 2027","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"246 645 941","certificateType":"matex","status":"expired","certificateReference":"99 512 177 012","startDate":"3 February 2025","endDate":"3 November 2026","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"lastNote":{"title":"Certificate expired"}},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"880 563 334","certificateType":"hrtppc","status":"active","certificateReference":"HRT LX9K QY2L","startDate":"8 March 2025","endDate":"8 December 2026","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"378 096 993","certificateType":"hrtppc","status":"active","certificateReference":"HRT 06A6 F0ZV","startDate":"9 April 2025","endDate":"9 January 2027","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"253 713 045","certificateType":"matex","status":"pending","certificateReference":"62 417 067 314","startDate":"26 January 2025","endDate":"26 October 2026","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"lastNote":""},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"387 631 254","certificateType":"matex","status":"accepted","certificateReference":"67 676 435 013","startDate":"27 May 2025","endDate":"27 February 2027","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"933 330 674","certificateType":"hrtppc","status":"active","certificateReference":"HRT C7JH U0MK","startDate":"31 January 2025","endDate":"31 October 2026","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"957 455 632","certificateType":"hrtppc","status":"active","certificateReference":"HRT GXDR 3PZ8","startDate":"16 January 2025","endDate":"16 October 2026","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"467 855 156","certificateType":"hrtppc","status":"active","certificateReference":"HRT WF3O QCSJ","startDate":"28 February 2025","endDate":"28 November 2026","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"631 307 767","certificateType":"matex","status":"accepted","certificateReference":"80 016 954 778","startDate":"23 January 2025","endDate":"23 October 2026","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"065 711 371","certificateType":"hrtppc","status":"active","certificateReference":"HRT R3MR UJXE","startDate":"18 January 2025","endDate":"18 October 2026","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"826 979 180","certificateType":"hrtppc","status":"active","certificateReference":"HRT 5XCW LKGR","startDate":"28 June 2025","endDate":"28 March 2027","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"000 515 432","certificateType":"matex","status":"accepted","certificateReference":"58 035 738 059","startDate":"24 May 2025","endDate":"24 February 2027","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"827 759 825","certificateType":"hrtppc","status":"active","certificateReference":"HRT XXVN X72T","startDate":"27 April 2025","endDate":"27 January 2027","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"076 494 989","certificateType":"hrtppc","status":"active","certificateReference":"HRT MN1W LSHI","startDate":"3 May 2025","endDate":"3 February 2027","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"456 704 012","certificateType":"matex","status":"accepted","certificateReference":"49 003 134 238","startDate":"3 June 2025","endDate":"3 March 2027","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"426 035 714","certificateType":"hrtppc","status":"active","certificateReference":"HRT 9LLF P1Z3","startDate":"8 May 2025","endDate":"8 February 2027","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"663 996 273","certificateType":"hrtppc","status":"active","certificateReference":"HRT GI8G BK50","startDate":"8 April 2025","endDate":"8 January 2027","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"399 632 160","certificateType":"matex","status":"accepted","certificateReference":"78 974 565 987","startDate":"17 January 2025","endDate":"17 October 2026","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"595 663 011","certificateType":"hrtppc","status":"active","certificateReference":"HRT P2N4 N0BJ","startDate":"1 July 2025","endDate":"1 April 2027","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"434 572 722","certificateType":"hrtppc","status":"active","certificateReference":"HRT LIZI 4BFW","startDate":"18 February 2025","endDate":"18 November 2026","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"623 739 594","certificateType":"matex","status":"processing","certificateReference":"2026 01 08 15 18 51N603502315","startDate":"28 April 2025","endDate":"28 January 2027","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"lastNote":{"title":"Application scanned"}},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"852 390 542","certificateType":"matex","status":"expired","certificateReference":"72 845 922 938","startDate":"8 April 2025","endDate":"8 January 2027","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"lastNote":{"title":"Certificate expired"}},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"177 777 263","certificateType":"hrtppc","status":"active","certificateReference":"HRT W03L LRII","startDate":"5 February 2025","endDate":"5 November 2026","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"386 156 028","certificateType":"matex","status":"active","certificateReference":"07 157 901 845","startDate":"24 May 2025","endDate":"24 February 2027","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"646 170 493","certificateType":"hrtppc","status":"active","certificateReference":"HRT IFR2 R40U","startDate":"3 February 2025","endDate":"3 November 2026","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"617 096 431","certificateType":"hrtppc","status":"active","certificateReference":"HRT 1C6H 7XE4","startDate":"22 June 2025","endDate":"22 March 2027","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"611 660 825","certificateType":"matex","status":"pending","certificateReference":"10 295 495 266","startDate":"14 June 2025","endDate":"14 March 2027","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"lastNote":""},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"089 694 464","certificateType":"matex","status":"processing","certificateReference":"2026 01 08 15 18 51N162655567","startDate":"10 May 2025","endDate":"10 February 2027","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"lastNote":{"title":"Application scanned"}},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"336 227 761","certificateType":"matex","status":"accepted","certificateReference":"85 702 579 524","startDate":"4 March 2025","endDate":"4 December 2026","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"146 910 562","certificateType":"hrtppc","status":"active","certificateReference":"HRT 6BJG MUYA","startDate":"14 April 2025","endDate":"14 January 2027","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"527 249 695","certificateType":"hrtppc","status":"active","certificateReference":"HRT 0T2P N4KO","startDate":"19 March 2025","endDate":"19 December 2026","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"026 956 825","certificateType":"matex","status":"accepted","certificateReference":"12 620 961 587","startDate":"12 May 2025","endDate":"12 February 2027","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"686 092 751","certificateType":"hrtppc","status":"active","certificateReference":"HRT A8ZU AV82","startDate":"23 April 2025","endDate":"23 January 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"156 892 282","certificateType":"hrtppc","status":"active","certificateReference":"HRT G8KI Z2ID","startDate":"28 February 2025","endDate":"28 November 2026","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"788 866 196","certificateType":"matex","status":"pending","certificateReference":"53 636 675 284","startDate":"24 May 2025","endDate":"24 February 2027","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"lastNote":""},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"317 997 321","certificateType":"matex","status":"accepted","certificateReference":"28 624 469 989","startDate":"7 February 2025","endDate":"7 November 2026","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"912 501 092","certificateType":"hrtppc","status":"active","certificateReference":"HRT MF5K 44RK","startDate":"23 May 2025","endDate":"23 February 2027","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"928 976 119","certificateType":"hrtppc","status":"active","certificateReference":"HRT 7V8X A63X","startDate":"10 June 2025","endDate":"10 March 2027","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"124 771 714","certificateType":"hrtppc","status":"active","certificateReference":"HRT YW6R ZG4R","startDate":"29 June 2025","endDate":"29 March 2027","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"709 943 127","certificateType":"hrtppc","status":"active","certificateReference":"HRT 3WH0 UTM7","startDate":"14 June 2025","endDate":"14 March 2027","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"825 943 062","certificateType":"matex","status":"active","certificateReference":"09 769 311 948","startDate":"20 April 2025","endDate":"20 January 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"015 773 934","certificateType":"matex","status":"active","certificateReference":"92 013 809 087","startDate":"24 February 2025","endDate":"24 November 2026","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"232 688 806","certificateType":"hrtppc","status":"active","certificateReference":"HRT QZSM YTQJ","startDate":"6 May 2025","endDate":"6 February 2027","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"032 921 237","certificateType":"hrtppc","status":"active","certificateReference":"HRT LQMR PWYH","startDate":"30 May 2025","endDate":"2 March 2027","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"580 273 785","certificateType":"matex","status":"expired","certificateReference":"40 213 619 463","startDate":"15 March 2025","endDate":"15 December 2026","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"lastNote":{"title":"Certificate expired"}},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"100 723 300","certificateType":"matex","status":"active","certificateReference":"24 340 498 981","startDate":"17 June 2025","endDate":"17 March 2027","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"301 922 388","certificateType":"matex","status":"expired","certificateReference":"09 424 646 803","startDate":"10 January 2025","endDate":"10 October 2026","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"lastNote":{"title":"Certificate expired"}},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"517 685 242","certificateType":"hrtppc","status":"active","certificateReference":"HRT MZTY RF2P","startDate":"31 January 2025","endDate":"31 October 2026","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"383 389 371","certificateType":"hrtppc","status":"active","certificateReference":"HRT 1FCW 0R59","startDate":"12 April 2025","endDate":"12 January 2027","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"323 295 450","certificateType":"hrtppc","status":"active","certificateReference":"HRT DIVA CHYN","startDate":"15 January 2025","endDate":"15 October 2026","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"953 846 828","certificateType":"hrtppc","status":"active","certificateReference":"HRT 41VB 3HU3","startDate":"29 April 2025","endDate":"29 January 2027","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"252 244 279","certificateType":"matex","status":"accepted","certificateReference":"18 010 796 462","startDate":"27 February 2025","endDate":"27 November 2026","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"817 275 512","certificateType":"hrtppc","status":"active","certificateReference":"HRT CPUP MUPP","startDate":"8 April 2025","endDate":"8 January 2027","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"055 038 227","certificateType":"matex","status":"active","certificateReference":"05 947 486 948","startDate":"5 March 2025","endDate":"5 December 2026","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"755 829 157","certificateType":"matex","status":"processing","certificateReference":"2026 01 08 15 18 51N832434994","startDate":"6 February 2025","endDate":"6 November 2026","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"lastNote":{"title":"Application scanned"}},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"085 180 240","certificateType":"hrtppc","status":"active","certificateReference":"HRT 9KG5 3YTJ","startDate":"29 April 2025","endDate":"29 January 2027","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"448 644 499","certificateType":"matex","status":"accepted","certificateReference":"92 243 079 969","startDate":"8 June 2025","endDate":"8 March 2027","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"964 186 148","certificateType":"hrtppc","status":"active","certificateReference":"HRT TAYV DJCH","startDate":"2 March 2025","endDate":"2 December 2026","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"806 951 166","certificateType":"hrtppc","status":"active","certificateReference":"HRT 15QD VPD8","startDate":"4 March 2025","endDate":"4 December 2026","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"092 601 627","certificateType":"matex","status":"active","certificateReference":"77 259 540 249","startDate":"1 April 2025","endDate":"1 January 2027","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"608 443 660","certificateType":"hrtppc","status":"active","certificateReference":"HRT 1HM7 TIAE","startDate":"13 May 2025","endDate":"13 February 2027","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"784 241 635","certificateType":"matex","status":"pending","certificateReference":"09 128 353 015","startDate":"20 May 2025","endDate":"20 February 2027","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"lastNote":""},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"825 714 218","certificateType":"matex","status":"processing","certificateReference":"2026 01 08 15 18 51N013525187","startDate":"3 May 2025","endDate":"3 February 2027","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"lastNote":{"title":"Application scanned"}},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"175 582 522","certificateType":"hrtppc","status":"active","certificateReference":"HRT 1F7C IH17","startDate":"19 June 2025","endDate":"19 March 2027","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"970 772 403","certificateType":"hrtppc","status":"active","certificateReference":"HRT 21NS ZM90","startDate":"28 March 2025","endDate":"28 December 2026","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"939 306 715","certificateType":"hrtppc","status":"active","certificateReference":"HRT 71CT N1SR","startDate":"5 June 2025","endDate":"5 March 2027","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"828 922 258","certificateType":"hrtppc","status":"active","certificateReference":"HRT 7LNP 063C","startDate":"27 May 2025","endDate":"27 February 2027","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"723 598 972","certificateType":"hrtppc","status":"active","certificateReference":"HRT 4IAD YN64","startDate":"16 June 2025","endDate":"16 March 2027","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"008 282 554","certificateType":"hrtppc","status":"active","certificateReference":"HRT M5RS ZJ3M","startDate":"22 February 2025","endDate":"22 November 2026","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"758 791 977","certificateType":"hrtppc","status":"active","certificateReference":"HRT IM4V 91XY","startDate":"14 February 2025","endDate":"14 November 2026","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"094 010 791","certificateType":"hrtppc","status":"active","certificateReference":"HRT W4C6 E7K4","startDate":"15 May 2025","endDate":"15 February 2027","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"916 032 307","certificateType":"hrtppc","status":"active","certificateReference":"HRT YMW5 V2WG","startDate":"24 January 2025","endDate":"24 October 2026","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"263 601 800","certificateType":"hrtppc","status":"active","certificateReference":"HRT 1YUP 6OHI","startDate":"24 February 2025","endDate":"24 November 2026","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"428 326 755","certificateType":"hrtppc","status":"active","certificateReference":"HRT V77V 8XMZ","startDate":"21 February 2025","endDate":"21 November 2026","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"200 322 050","certificateType":"matex","status":"accepted","certificateReference":"24 629 208 479","startDate":"22 May 2025","endDate":"22 February 2027","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"245 895 042","certificateType":"hrtppc","status":"active","certificateReference":"HRT RP2I 0L7J","startDate":"28 March 2025","endDate":"28 December 2026","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"lastNote":{"title":"Certificate issued"}}]';

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
