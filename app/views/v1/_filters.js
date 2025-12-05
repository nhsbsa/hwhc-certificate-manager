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

      case 'reviewing':
        txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--grey">Reviewing</strong>' : 'Reviewing';
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
        { html: '<a href="'+ patient.certificateType +'/case">View <span class="nhsuk-u-visually-hidden">' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag( patient.certificateType ) + '</span></a>' },
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
            { html: '<a href="'+ patient.certificateType +'/case">View <span class="nhsuk-u-visually-hidden">' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag( patient.certificateType ) + '</span></a>' },
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

    return tag;

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
  env.addFilter('getPatientData', function (content) {

    // Generate new patient data from 'data-patients.html'
    return '[{"firstName":"Olivia","lastName":"Smith","nhsNumber":"442 938 195","certificateType":"hrtppc","status":"active","certificateReference":"HRT OCX3 ZDSZ","startDate":"31 December 2024","endDate":"1 October 2026","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Amelia","lastName":"Jones","nhsNumber":"507 338 317","certificateType":"matex","status":"active","certificateReference":"85 016 789 119","startDate":"24 February 2025","endDate":"24 November 2026","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Isla","lastName":"Taylor","nhsNumber":"413 876 901","certificateType":"matex","status":"processing","certificateReference":"2025 12 05 15 43 41N432556018","startDate":"26 May 2025","endDate":"26 February 2027","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"lastNote":{"title":"Application scanned"}},{"firstName":"Ava","lastName":"Brown","nhsNumber":"137 056 794","certificateType":"hrtppc","status":"active","certificateReference":"HRT 44BA ALDL","startDate":"10 April 2025","endDate":"10 January 2027","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Emily","lastName":"Williams","nhsNumber":"567 132 052","certificateType":"hrtppc","status":"active","certificateReference":"HRT WIVP RPMK","startDate":"2 February 2025","endDate":"2 November 2026","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Sophia","lastName":"Wilson","nhsNumber":"773 215 413","certificateType":"matex","status":"reviewing","certificateReference":"11 953 043 602","startDate":"29 December 2024","endDate":"29 September 2026","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"lastNote":{"title":"Paper key-in requested"}},{"firstName":"Mia","lastName":"Davies","nhsNumber":"508 549 121","certificateType":"matex","status":"reviewing","certificateReference":"22 144 611 630","startDate":"27 May 2025","endDate":"27 February 2027","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"lastNote":{"title":"Application returned to patient","text":"No GP stamp on form. Letter PE05 sent."}},{"firstName":"Ella","lastName":"Evans","nhsNumber":"690 433 147","certificateType":"hrtppc","status":"active","certificateReference":"HRT 7W5X ENKL","startDate":"22 December 2024","endDate":"22 September 2026","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Grace","lastName":"Thomas","nhsNumber":"968 895 378","certificateType":"hrtppc","status":"active","certificateReference":"HRT 30FD 82VJ","startDate":"16 December 2024","endDate":"16 September 2026","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Lily","lastName":"Roberts","nhsNumber":"103 864 506","certificateType":"hrtppc","status":"active","certificateReference":"HRT LGN3 B5N5","startDate":"2 January 2025","endDate":"2 October 2026","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Freya","lastName":"Johnson","nhsNumber":"183 701 754","certificateType":"matex","status":"active","certificateReference":"78 704 009 739","startDate":"24 April 2025","endDate":"24 January 2027","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Charlotte","lastName":"Lewis","nhsNumber":"810 156 890","certificateType":"matex","status":"reviewing","certificateReference":"21 365 313 646","startDate":"9 December 2024","endDate":"9 September 2026","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"lastNote":{"title":"Application returned to GP","text":"Missing patient postcode. Letter PE07 sent."}},{"firstName":"Isabella","lastName":"Walker","nhsNumber":"910 559 871","certificateType":"matex","status":"accepted","certificateReference":"54 829 966 010","startDate":"30 May 2025","endDate":"2 March 2027","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Daisy","lastName":"Hall","nhsNumber":"118 175 552","certificateType":"matex","status":"accepted","certificateReference":"67 179 034 494","startDate":"14 March 2025","endDate":"14 December 2026","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Evie","lastName":"Clarke","nhsNumber":"029 719 984","certificateType":"matex","status":"reviewing","certificateReference":"42 406 694 542","startDate":"10 April 2025","endDate":"10 January 2027","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"lastNote":{"title":"Paper key-in requested"}},{"firstName":"Phoebe","lastName":"Allen","nhsNumber":"891 872 448","certificateType":"matex","status":"processing","certificateReference":"2025 12 05 15 43 41N506342126","startDate":"30 March 2025","endDate":"30 December 2026","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"lastNote":{"title":"Application scanned"}},{"firstName":"Sophie","lastName":"Young","nhsNumber":"910 563 120","certificateType":"matex","status":"accepted","certificateReference":"73 755 504 120","startDate":"20 February 2025","endDate":"20 November 2026","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Harper","lastName":"King","nhsNumber":"910 001 003","certificateType":"hrtppc","status":"active","certificateReference":"HRT LYRB 0LF2","startDate":"21 April 2025","endDate":"21 January 2027","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Millie","lastName":"Wright","nhsNumber":"467 731 866","certificateType":"matex","status":"reviewing","certificateReference":"03 276 969 762","startDate":"10 February 2025","endDate":"10 November 2026","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"lastNote":{"title":"Unable to process","text":"Blank form."}},{"firstName":"Ella-Rose","lastName":"Green","nhsNumber":"812 907 804","certificateType":"matex","status":"reviewing","certificateReference":"17 217 290 347","startDate":"16 March 2025","endDate":"16 December 2026","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"lastNote":{"title":"Unable to process","text":"Not enough information and no GP signature on form."}},{"firstName":"Poppy","lastName":"Baker","nhsNumber":"253 470 151","certificateType":"matex","status":"active","certificateReference":"64 863 492 290","startDate":"14 January 2025","endDate":"14 October 2026","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Ruby","lastName":"Adams","nhsNumber":"054 205 360","certificateType":"hrtppc","status":"active","certificateReference":"HRT RRMT 8TI1","startDate":"23 January 2025","endDate":"23 October 2026","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Chloe","lastName":"Mitchell","nhsNumber":"529 565 647","certificateType":"hrtppc","status":"active","certificateReference":"HRT SX05 DZOF","startDate":"31 March 2025","endDate":"31 December 2026","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Sienna","lastName":"Turner","nhsNumber":"050 370 502","certificateType":"hrtppc","status":"active","certificateReference":"HRT XCSB YYAY","startDate":"22 May 2025","endDate":"22 February 2027","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Willow","lastName":"Carter","nhsNumber":"630 357 125","certificateType":"hrtppc","status":"active","certificateReference":"HRT T2B3 WF19","startDate":"19 December 2024","endDate":"19 September 2026","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Jessica","lastName":"Morris","nhsNumber":"560 069 750","certificateType":"matex","status":"processing","certificateReference":"2025 12 05 15 43 41N759039001","startDate":"16 May 2025","endDate":"16 February 2027","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"lastNote":{"title":"Application scanned"}},{"firstName":"Matilda","lastName":"Hughes","nhsNumber":"850 857 780","certificateType":"matex","status":"accepted","certificateReference":"17 681 257 528","startDate":"24 December 2024","endDate":"24 September 2026","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Elsie","lastName":"Ward","nhsNumber":"046 846 384","certificateType":"hrtppc","status":"active","certificateReference":"HRT BUGS 7CI1","startDate":"5 January 2025","endDate":"5 October 2026","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Rosie","lastName":"Price","nhsNumber":"021 738 532","certificateType":"matex","status":"accepted","certificateReference":"91 857 603 092","startDate":"28 March 2025","endDate":"28 December 2026","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Aria","lastName":"Cooper","nhsNumber":"452 152 089","certificateType":"matex","status":"accepted","certificateReference":"04 032 275 026","startDate":"30 May 2025","endDate":"2 March 2027","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Layla","lastName":"Bailey","nhsNumber":"673 446 026","certificateType":"matex","status":"reviewing","certificateReference":"01 828 012 412","startDate":"31 May 2025","endDate":"3 March 2027","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"lastNote":{"title":"Application returned to patient","text":"Missing patient signature. Letter PE05 sent."}},{"firstName":"Luna","lastName":"Parker","nhsNumber":"668 029 510","certificateType":"hrtppc","status":"active","certificateReference":"HRT U2H5 DUBQ","startDate":"7 March 2025","endDate":"7 December 2026","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Hannah","lastName":"Phillips","nhsNumber":"433 465 972","certificateType":"matex","status":"processing","certificateReference":"2025 12 05 15 43 41N026115206","startDate":"22 April 2025","endDate":"22 January 2027","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"lastNote":{"title":"Application scanned"}},{"firstName":"Zara","lastName":"Bennett","nhsNumber":"305 958 041","certificateType":"matex","status":"reviewing","certificateReference":"41 970 022 394","startDate":"14 January 2025","endDate":"14 October 2026","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"lastNote":{"title":"Application returned to patient","text":"Missing patient signature. Letter PE05 sent."}},{"firstName":"Florence","lastName":"Cox","nhsNumber":"191 665 600","certificateType":"matex","status":"active","certificateReference":"46 048 385 040","startDate":"27 February 2025","endDate":"27 November 2026","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Maya","lastName":"Richardson","nhsNumber":"607 995 641","certificateType":"hrtppc","status":"active","certificateReference":"HRT M5X6 5BFI","startDate":"16 May 2025","endDate":"16 February 2027","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Esme","lastName":"Gray","nhsNumber":"947 183 104","certificateType":"matex","status":"processing","certificateReference":"2025 12 05 15 43 41N901395526","startDate":"2 March 2025","endDate":"2 December 2026","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"lastNote":{"title":"Application scanned"}},{"firstName":"Ivy","lastName":"Ross","nhsNumber":"619 640 361","certificateType":"matex","status":"processing","certificateReference":"2025 12 05 15 43 41N322862958","startDate":"10 May 2025","endDate":"10 February 2027","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"lastNote":{"title":"Application scanned"}},{"firstName":"Arabella","lastName":"Bell","nhsNumber":"156 948 768","certificateType":"matex","status":"reviewing","certificateReference":"78 886 822 076","startDate":"1 January 2025","endDate":"1 October 2026","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"lastNote":{"title":"Paper key-in requested"}},{"firstName":"Evelyn","lastName":"Cook","nhsNumber":"313 808 190","certificateType":"hrtppc","status":"active","certificateReference":"HRT TM6A XLUQ","startDate":"8 May 2025","endDate":"8 February 2027","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Thea","lastName":"Watson","nhsNumber":"039 437 637","certificateType":"hrtppc","status":"active","certificateReference":"HRT ZL4H KLRO","startDate":"25 February 2025","endDate":"25 November 2026","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Alice","lastName":"Sanders","nhsNumber":"327 384 487","certificateType":"hrtppc","status":"active","certificateReference":"HRT GED3 5KWU","startDate":"27 May 2025","endDate":"27 February 2027","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Emma","lastName":"Harrison","nhsNumber":"113 613 218","certificateType":"matex","status":"reviewing","certificateReference":"61 172 776 820","startDate":"15 March 2025","endDate":"15 December 2026","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"lastNote":{"title":"Application returned to patient","text":"No GP stamp on form. Letter PE05 sent."}},{"firstName":"Lottie","lastName":"Coleman","nhsNumber":"875 763 676","certificateType":"hrtppc","status":"active","certificateReference":"HRT UBFT 7VZC","startDate":"25 March 2025","endDate":"25 December 2026","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Amber","lastName":"Murphy","nhsNumber":"927 522 569","certificateType":"hrtppc","status":"active","certificateReference":"HRT SWU7 OM98","startDate":"23 May 2025","endDate":"23 February 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Scarlett","lastName":"Graham","nhsNumber":"995 070 395","certificateType":"matex","status":"active","certificateReference":"16 818 194 395","startDate":"1 May 2025","endDate":"1 February 2027","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Bonnie","lastName":"Stevens","nhsNumber":"729 229 286","certificateType":"hrtppc","status":"active","certificateReference":"HRT SYJ4 XWC9","startDate":"24 December 2024","endDate":"24 September 2026","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Imogen","lastName":"Simpson","nhsNumber":"373 440 724","certificateType":"matex","status":"accepted","certificateReference":"89 938 895 173","startDate":"26 March 2025","endDate":"26 December 2026","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Harriet","lastName":"Butler","nhsNumber":"941 242 817","certificateType":"hrtppc","status":"active","certificateReference":"HRT SX54 3SD7","startDate":"19 December 2024","endDate":"19 September 2026","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Eleanor","lastName":"Chapman","nhsNumber":"515 485 425","certificateType":"matex","status":"active","certificateReference":"98 201 200 155","startDate":"15 December 2024","endDate":"15 September 2026","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Aisha","lastName":"Ali","nhsNumber":"583 682 774","certificateType":"hrtppc","status":"active","certificateReference":"HRT 1XEA O1OW","startDate":"3 April 2025","endDate":"3 January 2027","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Sofia","lastName":"Hussain","nhsNumber":"639 157 927","certificateType":"matex","status":"accepted","certificateReference":"61 415 917 608","startDate":"2 March 2025","endDate":"2 December 2026","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Amira","lastName":"Khan","nhsNumber":"569 006 016","certificateType":"hrtppc","status":"active","certificateReference":"HRT 06HA RT8C","startDate":"7 April 2025","endDate":"7 January 2027","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Leah","lastName":"Begum","nhsNumber":"999 478 587","certificateType":"matex","status":"expired","certificateReference":"88 542 987 601","startDate":"17 March 2025","endDate":"17 December 2026","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"lastNote":{"title":"Certificate expired"}},{"firstName":"Niamh","lastName":"O’Connor","nhsNumber":"639 271 195","certificateType":"matex","status":"accepted","certificateReference":"58 838 181 311","startDate":"2 May 2025","endDate":"2 February 2027","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Aoife","lastName":"Kelly","nhsNumber":"928 885 155","certificateType":"hrtppc","status":"active","certificateReference":"HRT J6W0 NQ2L","startDate":"8 April 2025","endDate":"8 January 2027","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Erin","lastName":"McCarthy","nhsNumber":"073 332 776","certificateType":"hrtppc","status":"active","certificateReference":"HRT PF2Y QBR7","startDate":"25 December 2024","endDate":"25 September 2026","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Orla","lastName":"Doyle","nhsNumber":"336 454 405","certificateType":"hrtppc","status":"active","certificateReference":"HRT J6OO NC4H","startDate":"26 January 2025","endDate":"26 October 2026","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Cerys","lastName":"Griffiths","nhsNumber":"559 203 586","certificateType":"matex","status":"reviewing","certificateReference":"66 259 514 910","startDate":"2 January 2025","endDate":"2 October 2026","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"lastNote":{"title":"Paper key-in requested"}},{"firstName":"Megan","lastName":"Rees","nhsNumber":"468 865 323","certificateType":"hrtppc","status":"active","certificateReference":"HRT 11NR YZKQ","startDate":"20 February 2025","endDate":"20 November 2026","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Ffion","lastName":"Evans","nhsNumber":"908 656 422","certificateType":"hrtppc","status":"active","certificateReference":"HRT YTCJ J6OI","startDate":"19 January 2025","endDate":"19 October 2026","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Eilidh","lastName":"MacDonald","nhsNumber":"078 115 519","certificateType":"hrtppc","status":"active","certificateReference":"HRT EBT6 F4XO","startDate":"31 December 2024","endDate":"1 October 2026","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Skye","lastName":"Fraser","nhsNumber":"221 549 168","certificateType":"hrtppc","status":"active","certificateReference":"HRT F319 L4RZ","startDate":"1 April 2025","endDate":"1 January 2027","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Maisie","lastName":"Armstrong","nhsNumber":"030 011 657","certificateType":"hrtppc","status":"active","certificateReference":"HRT G4MC MBP5","startDate":"28 April 2025","endDate":"28 January 2027","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Penelope","lastName":"Hunter","nhsNumber":"619 440 280","certificateType":"matex","status":"expired","certificateReference":"98 025 977 478","startDate":"11 January 2025","endDate":"11 October 2026","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"lastNote":{"title":"Certificate expired"}},{"firstName":"Clara","lastName":"Lawrence","nhsNumber":"321 488 914","certificateType":"hrtppc","status":"active","certificateReference":"HRT LY5O L5L5","startDate":"18 March 2025","endDate":"18 December 2026","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Beatrice","lastName":"Spencer","nhsNumber":"130 536 312","certificateType":"matex","status":"active","certificateReference":"49 812 728 837","startDate":"24 December 2024","endDate":"24 September 2026","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Nancy","lastName":"Rogers","nhsNumber":"533 032 485","certificateType":"hrtppc","status":"active","certificateReference":"HRT Z2ME KUGA","startDate":"12 May 2025","endDate":"12 February 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Annabelle","lastName":"Watts","nhsNumber":"515 343 216","certificateType":"matex","status":"reviewing","certificateReference":"16 071 549 698","startDate":"3 January 2025","endDate":"3 October 2026","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"lastNote":{"title":"Application returned to patient","text":"No GP stamp on form. Letter PE05 sent."}},{"firstName":"Heidi","lastName":"Henderson","nhsNumber":"387 646 062","certificateType":"matex","status":"accepted","certificateReference":"98 477 299 211","startDate":"5 February 2025","endDate":"5 November 2026","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Rose","lastName":"Palmer","nhsNumber":"866 905 064","certificateType":"matex","status":"reviewing","certificateReference":"81 943 013 786","startDate":"8 February 2025","endDate":"8 November 2026","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"lastNote":{"title":"Unable to process","text":"Half of the form was missing."}},{"firstName":"Lara","lastName":"Nicholson","nhsNumber":"976 250 659","certificateType":"hrtppc","status":"active","certificateReference":"HRT ZEOR 80XI","startDate":"7 December 2024","endDate":"7 September 2026","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Julia","lastName":"Gardner","nhsNumber":"167 731 323","certificateType":"matex","status":"processing","certificateReference":"2025 12 05 15 43 41N489061037","startDate":"18 March 2025","endDate":"18 December 2026","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"lastNote":{"title":"Application scanned"}},{"firstName":"Ada","lastName":"Newton","nhsNumber":"616 265 811","certificateType":"hrtppc","status":"active","certificateReference":"HRT OO07 8UB5","startDate":"24 February 2025","endDate":"24 November 2026","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Summer","lastName":"Reed","nhsNumber":"519 878 309","certificateType":"matex","status":"active","certificateReference":"54 463 338 668","startDate":"25 December 2024","endDate":"25 September 2026","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Victoria","lastName":"Harvey","nhsNumber":"036 816 236","certificateType":"matex","status":"accepted","certificateReference":"35 137 862 739","startDate":"12 January 2025","endDate":"12 October 2026","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Maria","lastName":"Fernandez","nhsNumber":"640 256 481","certificateType":"hrtppc","status":"active","certificateReference":"HRT F4NJ 73BH","startDate":"21 March 2025","endDate":"21 December 2026","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Elena","lastName":"Silva","nhsNumber":"546 227 912","certificateType":"hrtppc","status":"active","certificateReference":"HRT WWOZ C8H4","startDate":"19 April 2025","endDate":"19 January 2027","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Leila","lastName":"Patel","nhsNumber":"729 890 635","certificateType":"matex","status":"expired","certificateReference":"97 602 623 409","startDate":"18 February 2025","endDate":"18 November 2026","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"lastNote":{"title":"Certificate expired"}},{"firstName":"Fatima","lastName":"Iqbal","nhsNumber":"474 480 290","certificateType":"hrtppc","status":"active","certificateReference":"HRT O467 XWQY","startDate":"1 January 2025","endDate":"1 October 2026","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Jasmine","lastName":"Ahmed","nhsNumber":"564 497 456","certificateType":"matex","status":"reviewing","certificateReference":"84 068 721 668","startDate":"6 March 2025","endDate":"6 December 2026","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"lastNote":{"title":"Application returned to patient","text":"Missing patient signature. Letter PE05 sent."}},{"firstName":"Nadia","lastName":"Rashid","nhsNumber":"042 776 810","certificateType":"matex","status":"accepted","certificateReference":"62 306 979 567","startDate":"23 April 2025","endDate":"23 January 2027","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Tara","lastName":"Paterson","nhsNumber":"356 763 413","certificateType":"hrtppc","status":"active","certificateReference":"HRT B1KM RU7W","startDate":"9 April 2025","endDate":"9 January 2027","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Bethany","lastName":"Foster","nhsNumber":"513 437 355","certificateType":"hrtppc","status":"active","certificateReference":"HRT U4MT EECD","startDate":"4 March 2025","endDate":"4 December 2026","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Lauren","lastName":"Fox","nhsNumber":"240 621 344","certificateType":"hrtppc","status":"active","certificateReference":"HRT GSSF IF21","startDate":"20 April 2025","endDate":"20 January 2027","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Georgia","lastName":"Grant","nhsNumber":"420 793 550","certificateType":"matex","status":"accepted","certificateReference":"26 129 490 778","startDate":"22 December 2024","endDate":"22 September 2026","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Abigail","lastName":"Murray","nhsNumber":"299 606 939","certificateType":"matex","status":"active","certificateReference":"91 073 750 538","startDate":"15 March 2025","endDate":"15 December 2026","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Ella-May","lastName":"West","nhsNumber":"777 433 273","certificateType":"hrtppc","status":"active","certificateReference":"HRT 2XIL BLZ2","startDate":"26 December 2024","endDate":"26 September 2026","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Robyn","lastName":"Matthews","nhsNumber":"312 642 144","certificateType":"matex","status":"accepted","certificateReference":"59 662 595 971","startDate":"10 April 2025","endDate":"10 January 2027","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"lastNote":{"title":"Application accepted and awaiting print"}},{"firstName":"Kayla","lastName":"Holmes","nhsNumber":"437 925 316","certificateType":"hrtppc","status":"active","certificateReference":"HRT 6YMD FHKR","startDate":"20 March 2025","endDate":"20 December 2026","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Lydia","lastName":"Walsh","nhsNumber":"770 001 877","certificateType":"matex","status":"expired","certificateReference":"04 712 765 333","startDate":"1 March 2025","endDate":"1 December 2026","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"lastNote":{"title":"Certificate expired"}},{"firstName":"Alexandra","lastName":"Page","nhsNumber":"045 579 262","certificateType":"hrtppc","status":"active","certificateReference":"HRT RIUD O35W","startDate":"26 March 2025","endDate":"26 December 2026","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Natalie","lastName":"Jordan","nhsNumber":"474 072 766","certificateType":"hrtppc","status":"active","certificateReference":"HRT 18IG 5KJW","startDate":"2 February 2025","endDate":"2 November 2026","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Beth","lastName":"Barrett","nhsNumber":"919 361 155","certificateType":"hrtppc","status":"active","certificateReference":"HRT QKLT ZFV1","startDate":"24 December 2024","endDate":"24 September 2026","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Mollie","lastName":"Hayes","nhsNumber":"981 820 877","certificateType":"matex","status":"active","certificateReference":"60 052 396 450","startDate":"29 May 2025","endDate":"1 March 2027","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Francesca","lastName":"Cunningham","nhsNumber":"223 315 981","certificateType":"hrtppc","status":"active","certificateReference":"HRT 9IZ3 4F27","startDate":"24 January 2025","endDate":"24 October 2026","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Amelie","lastName":"Barber","nhsNumber":"116 743 433","certificateType":"hrtppc","status":"active","certificateReference":"HRT XPNT WCJD","startDate":"9 December 2024","endDate":"9 September 2026","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Lucia","lastName":"Knight","nhsNumber":"481 682 064","certificateType":"matex","status":"active","certificateReference":"75 958 055 242","startDate":"3 January 2025","endDate":"3 October 2026","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Eden","lastName":"Parsons","nhsNumber":"440 393 831","certificateType":"hrtppc","status":"active","certificateReference":"HRT 53J3 NTGL","startDate":"12 February 2025","endDate":"12 November 2026","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Tilly","lastName":"Bates","nhsNumber":"227 080 820","certificateType":"hrtppc","status":"active","certificateReference":"HRT QN48 AD5V","startDate":"16 January 2025","endDate":"16 October 2026","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Holly","lastName":"Day","nhsNumber":"487 282 145","certificateType":"hrtppc","status":"active","certificateReference":"HRT KLU1 MEBT","startDate":"22 March 2025","endDate":"22 December 2026","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"lastNote":{"title":"Certificate issued"}},{"firstName":"Indie","lastName":"Francis","nhsNumber":"152 588 869","certificateType":"matex","status":"processing","certificateReference":"2025 12 05 15 43 41N113005695","startDate":"12 March 2025","endDate":"12 December 2026","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"lastNote":{"title":"Application scanned"}},{"firstName":"Hope","lastName":"Burton","nhsNumber":"400 421 606","certificateType":"matex","status":"expired","certificateReference":"41 686 908 965","startDate":"19 May 2025","endDate":"19 February 2027","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"lastNote":{"title":"Certificate expired"}}]';

  });

  return true;
}

/**
 * @import { Environment } from 'nunjucks'
 */
