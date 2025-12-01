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
  // GET STATUS TEXT OR TAG FUNCTION
  //
  function _getStatusTextOrTag( status, isTag ){

    let txt = '<strong class="nhsuk-tag nhsuk-tag--grey">Pending</strong>';

    switch( status ){

      case 'active':
        txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--white">Active</strong>' : 'Active';
        break;

      case 'pending-a':
        txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--grey">Pending</strong>' : 'Pending (Need more information)';
        break;

      case 'pending-b':
        txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--grey">Pending</strong>' : 'Pending (Awaiting fulfilment)';
        break;

      case 'processing':
        txt = ( isTag ) ? '<strong class="nhsuk-tag nhsuk-tag--dark-grey">Processing</strong>' : 'Processing';
        break;
    }

    return txt;

  }

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
  env.addFilter('getTableHeadRows', function ( content ) {

    const version = this.ctx.version;

    const noOfFilteredRows = (Number.isInteger(parseInt(this.ctx.data[version].noOfFilteredRows))) ? parseInt(this.ctx.data[version].noOfFilteredRows) : 0;

    const sortBy = ( this.ctx.data[version].sortBy ) ? this.ctx.data[version].sortBy : 'lastName'; 
    const sortDirection = ( ['ascending','descending'].indexOf( this.ctx.data[version].sortDirection ) > -1 ) ? this.ctx.data[version].sortDirection : 'descending';

    const baseLink = '?' + version + '[currentPage]=0';
    const opposite = ( sortDirection === 'descending' ) ? 'ascending' : 'descending'; 

    // lastName
    let lastNameLink = ( sortBy === 'lastName' ) ? baseLink + '&' + version + '[sortBy]=lastName&' + version + '[sortDirection]=' + opposite : baseLink + '&sortBy=name&sortDirection=ascending';
    let lastNameObj = ( noOfFilteredRows < 2 ) ? { html: 'Name<br /><span class="nhsuk-body-s">NHS number</span>' } : {
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
              { text: 'Action' }
            ];

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
      summary.push( 'status "Pending" or "Processing"' ); // Only used for role=backOffice
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

    // Convert into component rows
    const rows = [];

    paginatedPatientData.forEach(function (patient) {

      const obj = [
        { html: '<strong>' + patient.lastName + ', ' + patient.firstName + '</strong><br /><span class="nhsuk-body-s">' + patient.nhsNumber + '</span>' },
        { html: patient.address.postcode },
        { html: _getCertificateTypeTextOrTag( patient.certificateType, true )},
        { html: _getStatusTextOrTag( patient.status, true ) },
        { html: patient.certificateReference },
        { text: patient.endDate },
        { html: '<a href="'+ patient.certificateType +'/case">View <span class="nhsuk-u-visually-hidden">' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag( patient.certificateType ) + '</span></a>' },
      ];

      rows.push(obj);

    });

    return rows;

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
    return '[{"firstName":"Olivia","lastName":"Smith","nhsNumber":"879 163 335","certificateType":"matex","status":"active","certificateReference":"24 114 586 736","startDate":"19 December 2024","endDate":"19 September 2026","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"}},{"firstName":"Amelia","lastName":"Jones","nhsNumber":"458 474 946","certificateType":"matex","status":"pending-b","certificateReference":"66 953 569 214","startDate":"4 February 2025","endDate":"4 November 2026","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"}},{"firstName":"Isla","lastName":"Taylor","nhsNumber":"323 206 267","certificateType":"hrtppc","status":"active","certificateReference":"HRT SCGR X24C","startDate":"12 March 2025","endDate":"12 December 2026","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"}},{"firstName":"Ava","lastName":"Brown","nhsNumber":"094 388 026","certificateType":"matex","status":"pending-a","certificateReference":"80 718 958 059","startDate":"20 January 2025","endDate":"20 October 2026","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"}},{"firstName":"Emily","lastName":"Williams","nhsNumber":"021 415 456","certificateType":"matex","status":"pending-a","certificateReference":"25 564 006 245","startDate":"31 March 2025","endDate":"31 December 2026","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"}},{"firstName":"Sophia","lastName":"Wilson","nhsNumber":"140 382 382","certificateType":"matex","status":"processing","certificateReference":"2025 11 30 16 58 47N488142690","startDate":"29 March 2025","endDate":"29 December 2026","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"}},{"firstName":"Mia","lastName":"Davies","nhsNumber":"170 090 615","certificateType":"matex","status":"processing","certificateReference":"2025 11 30 16 58 47N130063518","startDate":"18 February 2025","endDate":"18 November 2026","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"}},{"firstName":"Ella","lastName":"Evans","nhsNumber":"663 424 046","certificateType":"hrtppc","status":"active","certificateReference":"HRT PFRI MGOX","startDate":"3 May 2025","endDate":"3 February 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"}},{"firstName":"Grace","lastName":"Thomas","nhsNumber":"658 660 677","certificateType":"matex","status":"active","certificateReference":"04 185 084 843","startDate":"17 March 2025","endDate":"17 December 2026","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"}},{"firstName":"Lily","lastName":"Roberts","nhsNumber":"357 921 804","certificateType":"hrtppc","status":"active","certificateReference":"HRT XF4C GEZD","startDate":"26 December 2024","endDate":"26 September 2026","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"}},{"firstName":"Freya","lastName":"Johnson","nhsNumber":"417 618 370","certificateType":"hrtppc","status":"active","certificateReference":"HRT EMEM 5FHJ","startDate":"18 March 2025","endDate":"18 December 2026","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"}},{"firstName":"Charlotte","lastName":"Lewis","nhsNumber":"699 838 291","certificateType":"hrtppc","status":"active","certificateReference":"HRT 5MD0 CVK0","startDate":"12 February 2025","endDate":"12 November 2026","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"}},{"firstName":"Isabella","lastName":"Walker","nhsNumber":"366 851 689","certificateType":"matex","status":"pending-b","certificateReference":"53 560 471 555","startDate":"15 March 2025","endDate":"15 December 2026","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"}},{"firstName":"Daisy","lastName":"Hall","nhsNumber":"628 670 982","certificateType":"matex","status":"pending-a","certificateReference":"22 520 671 774","startDate":"21 January 2025","endDate":"21 October 2026","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"}},{"firstName":"Evie","lastName":"Clarke","nhsNumber":"103 986 410","certificateType":"matex","status":"pending-a","certificateReference":"86 841 583 040","startDate":"15 March 2025","endDate":"15 December 2026","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"}},{"firstName":"Phoebe","lastName":"Allen","nhsNumber":"379 964 045","certificateType":"hrtppc","status":"active","certificateReference":"HRT NEFH IMKC","startDate":"31 January 2025","endDate":"31 October 2026","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"}},{"firstName":"Sophie","lastName":"Young","nhsNumber":"325 206 258","certificateType":"matex","status":"pending-a","certificateReference":"76 904 655 821","startDate":"1 March 2025","endDate":"1 December 2026","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"}},{"firstName":"Harper","lastName":"King","nhsNumber":"689 254 942","certificateType":"hrtppc","status":"active","certificateReference":"HRT 7NZ6 EC7R","startDate":"1 April 2025","endDate":"1 January 2027","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"}},{"firstName":"Millie","lastName":"Wright","nhsNumber":"602 916 427","certificateType":"matex","status":"pending-a","certificateReference":"29 126 644 949","startDate":"21 February 2025","endDate":"21 November 2026","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"}},{"firstName":"Ella-Rose","lastName":"Green","nhsNumber":"433 494 493","certificateType":"matex","status":"processing","certificateReference":"2025 11 30 16 58 47N065329092","startDate":"20 February 2025","endDate":"20 November 2026","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"}},{"firstName":"Poppy","lastName":"Baker","nhsNumber":"281 632 655","certificateType":"hrtppc","status":"active","certificateReference":"HRT V76G 93UG","startDate":"24 December 2024","endDate":"24 September 2026","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"}},{"firstName":"Ruby","lastName":"Adams","nhsNumber":"273 608 492","certificateType":"matex","status":"pending-a","certificateReference":"70 769 388 269","startDate":"3 January 2025","endDate":"3 October 2026","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"}},{"firstName":"Chloe","lastName":"Mitchell","nhsNumber":"289 628 284","certificateType":"hrtppc","status":"active","certificateReference":"HRT 6EJZ HCQH","startDate":"5 February 2025","endDate":"5 November 2026","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"}},{"firstName":"Sienna","lastName":"Turner","nhsNumber":"577 119 987","certificateType":"matex","status":"processing","certificateReference":"2025 11 30 16 58 47N008095068","startDate":"22 January 2025","endDate":"22 October 2026","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"}},{"firstName":"Willow","lastName":"Carter","nhsNumber":"846 728 569","certificateType":"hrtppc","status":"active","certificateReference":"HRT LOJI ZP8X","startDate":"10 February 2025","endDate":"10 November 2026","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"}},{"firstName":"Jessica","lastName":"Morris","nhsNumber":"166 437 690","certificateType":"matex","status":"pending-b","certificateReference":"89 854 463 283","startDate":"25 December 2024","endDate":"25 September 2026","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"}},{"firstName":"Matilda","lastName":"Hughes","nhsNumber":"093 012 112","certificateType":"matex","status":"pending-a","certificateReference":"47 018 960 650","startDate":"14 December 2024","endDate":"14 September 2026","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"}},{"firstName":"Elsie","lastName":"Ward","nhsNumber":"433 031 365","certificateType":"matex","status":"active","certificateReference":"08 312 161 168","startDate":"16 April 2025","endDate":"16 January 2027","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"}},{"firstName":"Rosie","lastName":"Price","nhsNumber":"204 684 914","certificateType":"hrtppc","status":"active","certificateReference":"HRT LU6N 7XAX","startDate":"28 January 2025","endDate":"28 October 2026","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"}},{"firstName":"Aria","lastName":"Cooper","nhsNumber":"979 134 182","certificateType":"matex","status":"active","certificateReference":"99 372 375 635","startDate":"2 March 2025","endDate":"2 December 2026","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"}},{"firstName":"Layla","lastName":"Bailey","nhsNumber":"503 331 046","certificateType":"matex","status":"pending-a","certificateReference":"82 948 269 758","startDate":"11 January 2025","endDate":"11 October 2026","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"}},{"firstName":"Luna","lastName":"Parker","nhsNumber":"361 351 313","certificateType":"hrtppc","status":"active","certificateReference":"HRT 2OFE IO7Q","startDate":"8 December 2024","endDate":"8 September 2026","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"}},{"firstName":"Hannah","lastName":"Phillips","nhsNumber":"357 083 824","certificateType":"hrtppc","status":"active","certificateReference":"HRT 4ZYS UOS7","startDate":"6 February 2025","endDate":"6 November 2026","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"}},{"firstName":"Zara","lastName":"Bennett","nhsNumber":"999 133 339","certificateType":"matex","status":"active","certificateReference":"80 823 544 932","startDate":"27 December 2024","endDate":"27 September 2026","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"}},{"firstName":"Florence","lastName":"Cox","nhsNumber":"953 999 496","certificateType":"matex","status":"active","certificateReference":"14 679 629 881","startDate":"3 February 2025","endDate":"3 November 2026","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Maya","lastName":"Richardson","nhsNumber":"720 361 631","certificateType":"hrtppc","status":"active","certificateReference":"HRT 3S4V CF6W","startDate":"11 December 2024","endDate":"11 September 2026","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"}},{"firstName":"Esme","lastName":"Gray","nhsNumber":"762 817 769","certificateType":"hrtppc","status":"active","certificateReference":"HRT V1V0 QYSD","startDate":"3 May 2025","endDate":"3 February 2027","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"}},{"firstName":"Ivy","lastName":"Ross","nhsNumber":"497 581 999","certificateType":"hrtppc","status":"active","certificateReference":"HRT HQNO KMCB","startDate":"8 January 2025","endDate":"8 October 2026","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"}},{"firstName":"Arabella","lastName":"Bell","nhsNumber":"924 754 395","certificateType":"hrtppc","status":"active","certificateReference":"HRT 2B8V DNF7","startDate":"21 December 2024","endDate":"21 September 2026","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"}},{"firstName":"Evelyn","lastName":"Cook","nhsNumber":"467 250 249","certificateType":"matex","status":"processing","certificateReference":"2025 11 30 16 58 47N151167524","startDate":"29 May 2025","endDate":"1 March 2027","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"}},{"firstName":"Thea","lastName":"Watson","nhsNumber":"344 012 343","certificateType":"matex","status":"pending-b","certificateReference":"74 501 009 344","startDate":"30 April 2025","endDate":"30 January 2027","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"}},{"firstName":"Alice","lastName":"Sanders","nhsNumber":"102 608 417","certificateType":"matex","status":"processing","certificateReference":"2025 11 30 16 58 47N296680768","startDate":"30 March 2025","endDate":"30 December 2026","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"}},{"firstName":"Emma","lastName":"Harrison","nhsNumber":"963 462 804","certificateType":"hrtppc","status":"active","certificateReference":"HRT JCYN CA4E","startDate":"25 January 2025","endDate":"25 October 2026","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"}},{"firstName":"Lottie","lastName":"Coleman","nhsNumber":"280 414 594","certificateType":"hrtppc","status":"active","certificateReference":"HRT 1Q5T M78H","startDate":"4 April 2025","endDate":"4 January 2027","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"}},{"firstName":"Amber","lastName":"Murphy","nhsNumber":"736 549 730","certificateType":"hrtppc","status":"active","certificateReference":"HRT IK4Z D8IN","startDate":"13 March 2025","endDate":"13 December 2026","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"}},{"firstName":"Scarlett","lastName":"Graham","nhsNumber":"266 101 852","certificateType":"matex","status":"pending-a","certificateReference":"71 444 770 444","startDate":"8 May 2025","endDate":"8 February 2027","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"}},{"firstName":"Bonnie","lastName":"Stevens","nhsNumber":"407 290 431","certificateType":"hrtppc","status":"active","certificateReference":"HRT BXYF 65MP","startDate":"20 February 2025","endDate":"20 November 2026","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"}},{"firstName":"Imogen","lastName":"Simpson","nhsNumber":"831 620 947","certificateType":"hrtppc","status":"active","certificateReference":"HRT GPQU WB33","startDate":"12 March 2025","endDate":"12 December 2026","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"}},{"firstName":"Harriet","lastName":"Butler","nhsNumber":"173 031 356","certificateType":"matex","status":"active","certificateReference":"32 535 634 498","startDate":"18 April 2025","endDate":"18 January 2027","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"}},{"firstName":"Eleanor","lastName":"Chapman","nhsNumber":"725 505 980","certificateType":"hrtppc","status":"active","certificateReference":"HRT FPBO 4VHS","startDate":"30 November 2024","endDate":"30 August 2026","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"}},{"firstName":"Aisha","lastName":"Ali","nhsNumber":"021 645 388","certificateType":"hrtppc","status":"active","certificateReference":"HRT J8H1 8ZTF","startDate":"1 March 2025","endDate":"1 December 2026","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"}},{"firstName":"Sofia","lastName":"Hussain","nhsNumber":"739 241 871","certificateType":"hrtppc","status":"active","certificateReference":"HRT K9PD CESF","startDate":"4 January 2025","endDate":"4 October 2026","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"}},{"firstName":"Amira","lastName":"Khan","nhsNumber":"367 156 167","certificateType":"hrtppc","status":"active","certificateReference":"HRT GKU6 1SOV","startDate":"5 April 2025","endDate":"5 January 2027","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"}},{"firstName":"Leah","lastName":"Begum","nhsNumber":"375 636 901","certificateType":"hrtppc","status":"active","certificateReference":"HRT UJ7U CT6X","startDate":"16 March 2025","endDate":"16 December 2026","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"}},{"firstName":"Niamh","lastName":"O’Connor","nhsNumber":"820 998 162","certificateType":"matex","status":"pending-b","certificateReference":"28 803 278 942","startDate":"26 May 2025","endDate":"26 February 2027","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"}},{"firstName":"Aoife","lastName":"Kelly","nhsNumber":"449 990 194","certificateType":"matex","status":"pending-b","certificateReference":"36 837 273 227","startDate":"10 December 2024","endDate":"10 September 2026","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"}},{"firstName":"Erin","lastName":"McCarthy","nhsNumber":"743 980 762","certificateType":"matex","status":"pending-a","certificateReference":"75 353 633 994","startDate":"19 January 2025","endDate":"19 October 2026","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"}},{"firstName":"Orla","lastName":"Doyle","nhsNumber":"035 571 804","certificateType":"hrtppc","status":"active","certificateReference":"HRT OCUN 6UFJ","startDate":"23 May 2025","endDate":"23 February 2027","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"}},{"firstName":"Cerys","lastName":"Griffiths","nhsNumber":"482 564 548","certificateType":"matex","status":"pending-a","certificateReference":"68 715 022 043","startDate":"22 April 2025","endDate":"22 January 2027","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"}},{"firstName":"Megan","lastName":"Rees","nhsNumber":"909 793 342","certificateType":"hrtppc","status":"active","certificateReference":"HRT K6XJ DS6H","startDate":"24 May 2025","endDate":"24 February 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"}},{"firstName":"Ffion","lastName":"Evans","nhsNumber":"436 681 561","certificateType":"matex","status":"pending-b","certificateReference":"25 959 258 668","startDate":"22 February 2025","endDate":"22 November 2026","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"}},{"firstName":"Eilidh","lastName":"MacDonald","nhsNumber":"642 462 979","certificateType":"matex","status":"active","certificateReference":"45 324 902 055","startDate":"27 December 2024","endDate":"27 September 2026","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"}},{"firstName":"Skye","lastName":"Fraser","nhsNumber":"262 797 303","certificateType":"matex","status":"pending-b","certificateReference":"53 073 693 215","startDate":"10 April 2025","endDate":"10 January 2027","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"}},{"firstName":"Maisie","lastName":"Armstrong","nhsNumber":"499 748 774","certificateType":"hrtppc","status":"active","certificateReference":"HRT Q20O ACST","startDate":"31 January 2025","endDate":"31 October 2026","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"}},{"firstName":"Penelope","lastName":"Hunter","nhsNumber":"414 966 137","certificateType":"matex","status":"active","certificateReference":"31 138 961 679","startDate":"7 April 2025","endDate":"7 January 2027","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"}},{"firstName":"Clara","lastName":"Lawrence","nhsNumber":"707 303 418","certificateType":"matex","status":"pending-a","certificateReference":"14 689 511 233","startDate":"25 February 2025","endDate":"25 November 2026","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"}},{"firstName":"Beatrice","lastName":"Spencer","nhsNumber":"858 692 394","certificateType":"matex","status":"pending-b","certificateReference":"07 208 786 184","startDate":"6 May 2025","endDate":"6 February 2027","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"}},{"firstName":"Nancy","lastName":"Rogers","nhsNumber":"513 927 021","certificateType":"hrtppc","status":"active","certificateReference":"HRT P8SY 2A1J","startDate":"30 March 2025","endDate":"30 December 2026","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"}},{"firstName":"Annabelle","lastName":"Watts","nhsNumber":"217 807 196","certificateType":"hrtppc","status":"active","certificateReference":"HRT WJKD U2QV","startDate":"23 December 2024","endDate":"23 September 2026","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"}},{"firstName":"Heidi","lastName":"Henderson","nhsNumber":"809 876 581","certificateType":"matex","status":"pending-a","certificateReference":"72 166 115 825","startDate":"17 February 2025","endDate":"17 November 2026","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"}},{"firstName":"Rose","lastName":"Palmer","nhsNumber":"167 580 491","certificateType":"hrtppc","status":"active","certificateReference":"HRT NQXE TYE3","startDate":"11 May 2025","endDate":"11 February 2027","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"}},{"firstName":"Lara","lastName":"Nicholson","nhsNumber":"108 507 318","certificateType":"hrtppc","status":"active","certificateReference":"HRT HB1O 2L2R","startDate":"2 January 2025","endDate":"2 October 2026","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"}},{"firstName":"Julia","lastName":"Gardner","nhsNumber":"357 890 961","certificateType":"matex","status":"processing","certificateReference":"2025 11 30 16 58 47N184214375","startDate":"11 February 2025","endDate":"11 November 2026","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"}},{"firstName":"Ada","lastName":"Newton","nhsNumber":"923 316 008","certificateType":"hrtppc","status":"active","certificateReference":"HRT JF06 48SD","startDate":"19 January 2025","endDate":"19 October 2026","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"}},{"firstName":"Summer","lastName":"Reed","nhsNumber":"507 749 096","certificateType":"hrtppc","status":"active","certificateReference":"HRT ZAKT XUK8","startDate":"20 April 2025","endDate":"20 January 2027","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"}},{"firstName":"Victoria","lastName":"Harvey","nhsNumber":"986 595 465","certificateType":"matex","status":"processing","certificateReference":"2025 11 30 16 58 47N038613376","startDate":"17 April 2025","endDate":"17 January 2027","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"}},{"firstName":"Maria","lastName":"Fernandez","nhsNumber":"331 736 015","certificateType":"matex","status":"active","certificateReference":"45 889 123 915","startDate":"9 February 2025","endDate":"9 November 2026","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"}},{"firstName":"Elena","lastName":"Silva","nhsNumber":"634 412 723","certificateType":"matex","status":"active","certificateReference":"41 031 032 371","startDate":"28 January 2025","endDate":"28 October 2026","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"}},{"firstName":"Leila","lastName":"Patel","nhsNumber":"455 015 515","certificateType":"matex","status":"pending-b","certificateReference":"65 957 212 151","startDate":"8 May 2025","endDate":"8 February 2027","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"}},{"firstName":"Fatima","lastName":"Iqbal","nhsNumber":"327 783 400","certificateType":"matex","status":"pending-b","certificateReference":"05 972 671 436","startDate":"15 April 2025","endDate":"15 January 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"}},{"firstName":"Jasmine","lastName":"Ahmed","nhsNumber":"578 637 873","certificateType":"hrtppc","status":"active","certificateReference":"HRT 11IS Y22K","startDate":"20 January 2025","endDate":"20 October 2026","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"}},{"firstName":"Nadia","lastName":"Rashid","nhsNumber":"178 086 686","certificateType":"hrtppc","status":"active","certificateReference":"HRT 7BZV 8IH6","startDate":"21 December 2024","endDate":"21 September 2026","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"}},{"firstName":"Tara","lastName":"Paterson","nhsNumber":"631 009 068","certificateType":"hrtppc","status":"active","certificateReference":"HRT 1FTM WINW","startDate":"24 March 2025","endDate":"24 December 2026","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"}},{"firstName":"Bethany","lastName":"Foster","nhsNumber":"545 763 702","certificateType":"hrtppc","status":"active","certificateReference":"HRT T4CT OJC3","startDate":"29 May 2025","endDate":"1 March 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"}},{"firstName":"Lauren","lastName":"Fox","nhsNumber":"849 791 514","certificateType":"hrtppc","status":"active","certificateReference":"HRT 60ZW FCR2","startDate":"16 January 2025","endDate":"16 October 2026","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"}},{"firstName":"Georgia","lastName":"Grant","nhsNumber":"545 191 434","certificateType":"matex","status":"pending-a","certificateReference":"26 244 305 676","startDate":"2 March 2025","endDate":"2 December 2026","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"}},{"firstName":"Abigail","lastName":"Murray","nhsNumber":"161 961 483","certificateType":"matex","status":"pending-a","certificateReference":"65 431 471 435","startDate":"20 April 2025","endDate":"20 January 2027","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"}},{"firstName":"Ella-May","lastName":"West","nhsNumber":"689 378 985","certificateType":"hrtppc","status":"active","certificateReference":"HRT 773X 6O4J","startDate":"31 March 2025","endDate":"31 December 2026","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"}},{"firstName":"Robyn","lastName":"Matthews","nhsNumber":"581 765 773","certificateType":"matex","status":"pending-b","certificateReference":"17 110 601 096","startDate":"26 February 2025","endDate":"26 November 2026","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"}},{"firstName":"Kayla","lastName":"Holmes","nhsNumber":"838 489 454","certificateType":"matex","status":"pending-a","certificateReference":"51 470 407 975","startDate":"19 April 2025","endDate":"19 January 2027","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"}},{"firstName":"Lydia","lastName":"Walsh","nhsNumber":"485 008 628","certificateType":"matex","status":"processing","certificateReference":"2025 11 30 16 58 47N426714454","startDate":"16 May 2025","endDate":"16 February 2027","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"}},{"firstName":"Alexandra","lastName":"Page","nhsNumber":"957 011 325","certificateType":"matex","status":"pending-b","certificateReference":"86 502 486 670","startDate":"6 May 2025","endDate":"6 February 2027","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"}},{"firstName":"Natalie","lastName":"Jordan","nhsNumber":"254 624 964","certificateType":"matex","status":"pending-a","certificateReference":"03 071 616 481","startDate":"19 March 2025","endDate":"19 December 2026","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"}},{"firstName":"Beth","lastName":"Barrett","nhsNumber":"189 236 053","certificateType":"hrtppc","status":"active","certificateReference":"HRT BPL0 UL86","startDate":"21 April 2025","endDate":"21 January 2027","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"}},{"firstName":"Mollie","lastName":"Hayes","nhsNumber":"732 802 197","certificateType":"matex","status":"active","certificateReference":"61 023 839 613","startDate":"23 January 2025","endDate":"23 October 2026","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"}},{"firstName":"Francesca","lastName":"Cunningham","nhsNumber":"305 144 584","certificateType":"matex","status":"pending-a","certificateReference":"92 379 011 331","startDate":"14 March 2025","endDate":"14 December 2026","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"}},{"firstName":"Amelie","lastName":"Barber","nhsNumber":"370 284 392","certificateType":"matex","status":"active","certificateReference":"89 261 959 169","startDate":"11 January 2025","endDate":"11 October 2026","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"}},{"firstName":"Lucia","lastName":"Knight","nhsNumber":"884 733 262","certificateType":"matex","status":"processing","certificateReference":"2025 11 30 16 58 47N429127065","startDate":"22 December 2024","endDate":"22 September 2026","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"}},{"firstName":"Eden","lastName":"Parsons","nhsNumber":"664 805 645","certificateType":"matex","status":"pending-b","certificateReference":"84 341 304 726","startDate":"6 December 2024","endDate":"6 September 2026","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"}},{"firstName":"Tilly","lastName":"Bates","nhsNumber":"837 106 050","certificateType":"hrtppc","status":"active","certificateReference":"HRT 0XQV 4KI4","startDate":"4 December 2024","endDate":"4 September 2026","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"}},{"firstName":"Holly","lastName":"Day","nhsNumber":"573 184 095","certificateType":"hrtppc","status":"active","certificateReference":"HRT X43Z DBTF","startDate":"1 February 2025","endDate":"1 November 2026","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"}},{"firstName":"Indie","lastName":"Francis","nhsNumber":"701 800 366","certificateType":"matex","status":"pending-a","certificateReference":"94 127 903 007","startDate":"29 December 2024","endDate":"29 September 2026","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"}},{"firstName":"Hope","lastName":"Burton","nhsNumber":"727 916 903","certificateType":"matex","status":"active","certificateReference":"51 983 730 347","startDate":"14 March 2025","endDate":"14 December 2026","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"}}]';

  });

  return true;
}

/**
 * @import { Environment } from 'nunjucks'
 */
