/**
 * @param {Environment} env
 */
module.exports = function (env) {
  const filters = {}


  //
  // GET RANDOM NUMBER
  //
  filters.getRandomNumber = function (max) {
    return Math.round(Math.random() * max);
  }

  //
  // CAPITALISE FILTER
  //
  filters.capitalise = function( term ){
    if( term ){
      term = term.charAt(0).toUpperCase() + term.slice(1);
    }
    return term;
  }


  //
  // DWP ADDRESS PATTERN GET RESULTS STATUS FILTER
  //
  filters.dwpAddressPatternGetResultsStatus = function (results, postcode, buildingNumberOrName) {

    let html = '';

    postcode = (postcode) ? postcode.trim() : '';
    buildingNumberOrName = (buildingNumberOrName) ? buildingNumberOrName.trim() : '';

    const finalSentence = 'You can search again or enter the address manually</a>.';
    const finalLink = '<a class="nhsuk-link" href="address-lookup">Search again</a>';

    if (!Array.isArray(results) || results.length === 0) {

      // No results
      if (postcode) {
        html = '<p class="nhsuk-body">We could not find an address that matches <strong>' + postcode + '</strong>';
        if (buildingNumberOrName) {
          html += ' and <strong>' + buildingNumberOrName + '</strong>';
        }
        html += '. ' + finalSentence + '</p>';
      } else {
        html = '<p class="nhsuk-body">We could not find an address that matches <strong>' + buildingNumberOrName + '</strong>. ' + finalSentence + '</p>';
      }

    } else if (Array.isArray(results) && results.length > 0) {

      // More than one result
      const noOfResults = (results.length === 1) ? '<strong>1</strong> result' : '<strong>' + results.length + '</strong> results';

      if (postcode) {
        html = '<p class="nhsuk-body">' + noOfResults + ' found for <strong>' + postcode + '</strong>';
        if (buildingNumberOrName) {
          html += ' and <strong>' + buildingNumberOrName + '</strong>';
        }
        html += '. ' + finalLink + '</p>';
      } else {
        html = '<p class="nhsuk-body">' + noOfResults + ' found for <strong>' + buildingNumberOrName + '</strong>. ' + finalLink + '</p>'
      }

    }


    return html;

  };


  //
  // DWP ADDRESS PATTERN GET RESULTS STATUS FILTER
  //
  filters.getResultsStatus = function (results, postcode, buildingNumberOrName) {

    let html = '';

    postcode = (postcode) ? postcode.trim() : '';
    buildingNumberOrName = (buildingNumberOrName) ? buildingNumberOrName.trim() : '';

    const finalSentence = 'You can search again or enter the address manually.';
    const finalLink = '<a class="nhsuk-link" href="address-lookup">Search again</a>';

    if (!Array.isArray(results) || results.length === 0) {

      // No results
      if (postcode) {
        html = '<p class="nhsuk-body">We could not find an address that matches <strong>' + postcode + '</strong>';
        if (buildingNumberOrName) {
          html += ' and <strong>' + buildingNumberOrName + '</strong>';
        }
        html += '. ' + finalSentence + '</p>';
      } else if (buildingNumberOrName) {
        html = '<p class="nhsuk-body">We could not find an address that matches <strong>' + buildingNumberOrName + '</strong>. ' + finalSentence + '</p>';
      } else {
        html = '<p class="nhsuk-body">We could not find an address. ' + finalSentence + '</p>';
      }

    } else if (Array.isArray(results) && results.length > 0) {

      // More than one result
      const noOfResults = (results.length === 1) ? '<strong>1</strong> result' : '<strong>' + results.length + '</strong> results';

      if (postcode) {
        html = '<p class="nhsuk-body">' + noOfResults + ' found for <strong>' + postcode + '</strong>';
        if (buildingNumberOrName) {
          html += ' and <strong>' + buildingNumberOrName + '</strong>';
        }
        html += '. ' + finalLink + '</p>';
      } else {
        html = '<p class="nhsuk-body">' + noOfResults + ' found for <strong>' + buildingNumberOrName + '</strong>. ' + finalLink + '</p>'
      }

    }


    return html;



  };

  //
  // GET ADDRESS SELECT RESULTS FILTER
  //
  filters.getAddressSelectResults = function () {

    let results = (Array.isArray(this.ctx.data.addressSearchResults)) ? this.ctx.data.addressSearchResults : [];
    if (results.length > 0) {
      if (results[0].text !== 'Please select') {
        results.unshift({ text: 'Please select', value: '' });
      }
    }
    return results;

  };











  //
  // GET CERTIFICATE TYPE TAG FUNCTION
  //
  function _getCertificateTypeTextOrTag(service, isTag) {

    let txt = '';

    switch (service) {

      case 'hrtppc':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--blue">HRT PPC</strong>' : 'HRT PPC';
        break;

      case 'matex':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--green">MATEX</strong>' : 'MATEX';
        break;

    }

    return txt;

  }

  // 
  // GET CERTIFICATE TYPE TAG FILTER
  //
  filters.getCertificateTypeTextOrTag = function (service, isTag) {
    return _getCertificateTypeTextOrTag(service, isTag);
  };


  // 
  // GET JOB TITLE FILTER
  //
  filters.getJobTitle = function (role) {

    let jobTitle = '';
    switch (role) {
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
  };



  //
  // GET STATUS TEXT OR TAG FUNCTION
  // Statuses are outlined at https://miro.com/app/board/uXjVJqtsJuE=/?share_link_id=507026377839
  //
  function _getStatusTextOrTag(status, isTag) {

    let txt = '';

    switch (status) {

      case 'processing':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--dark-grey">Processing</strong>' : 'Processing';
        break;

      case 'on-hold':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--grey">On hold</strong>' : 'On hold';
        break;

      case 'accepted':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--grey">Accepted</strong>' : 'Accepted';
        break;

      case 'checking':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--white dashed">Checking</strong>' : 'Checking';
        break;

      case 'active':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--white">Active</strong>' : 'Active';
        break;

      case 'expired':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--expired-grey">Expired</strong>' : 'Expired';
        break;

      case 'deleted':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--deleted-grey">Deleted</strong>' : 'Deleted';
        break;

      case 'rejected':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--rejected-grey">Rejected</strong>' : 'Rejected';
        break;

      default:
        txt = status;


    }

    return txt;

  }

  // 
  // GET CERTIFICATE TYPE TAG FILTER
  //
  filters.getStatusTextOrTag = function (status, isTag) {
    return _getStatusTextOrTag(status, isTag);
  };

  //
  // GET PROCESSOR FUNCTION
  //
  function _getProcessor(processors, cipher, key) {

    let result = '';

    if (processors && cipher && processors[cipher]) {

      // You're after something specific
      if (processors[cipher][key]) {
        result = processors[cipher][key];
      } else {
        result = processors[cipher];
      }

    } else {

      // Just chuck something out at random
      if (processors) {
        const num = Math.round(Math.random() * (processors.length - 1));
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
  filters.getProcessor = function (processors, cipher, key) {
    return _getProcessor(processors, cipher, key);
  };


  //
  // GET SUPERVISOR DASHBOARD ROWS FILTER
  //
  filters.getSupervisorDashboardRows = function (processors) {

    const rows = [];

    Object.entries(processors).forEach(function (p) {

      const processor = p[1]; // Weird quirk in how Object.entries works...

      const arr = [
        { html: '<a class="nhsuk-link nhsuk-link--no-visited-state" href="processor?searchChecking=true&searchProcessor=' + p[0] + '">' + processor.name + '</a>' },
        { text: p[0] },
        { text: processor.stats[0] },
        { text: processor.stats[1] },
        { text: processor.stats[2] },
        { text: processor.stats[3] },
        { text: processor.stats[4] },
        { html: (processor.level === 'trainee') ? '<strong>10</strong> <span class="nhsuk-u-font-size-14">(' + processor.checkingLevel + '%)</span></strong>' : '<strong>0</strong>' }
      ];

      rows.push(arr);

    });

    return rows;

  };


  //
  // GET CERTIFICATE FULFILMENT FUNCTION
  //
  const CERTIFICATE_FULFILMENT_MAP = {
    email: 'Email',
    post: 'Post'
  };

  filters.getCertificateFulfilmentText = function (fulfilment) {
    return CERTIFICATE_FULFILMENT_MAP[fulfilment];
  }



  //
  // GET FILTERED RESULTS FUNCTION
  // Applies the search criteria to the rows of patient data
  //
  function _getFilteredResults(rows, searchTerms) {

    console.log('_getFilteredResults()');
    console.log(JSON.stringify(searchTerms));

    let filteredRows = [];

    if (Object.keys(searchTerms).length > 0) {

      Object.keys(searchTerms).forEach(function (key, i) {

        let fRows = (i === 0) ? rows : filteredRows.slice();
        filteredRows = [];

        fRows.forEach(function (row) {

          if (key === 'checking') {

            if (row[key] === true) {
              filteredRows.push(row);
            }

          } else if( key === 'dateOfBirth' ){

            const dayCheck = ( searchTerms[key].day === row[key].day ) ? true : false;
            const monthCheck = ( searchTerms[key].month === row[key].month ) ? true : false;
            const yearCheck = ( searchTerms[key].year === row[key].year ) ? true : false;

            if( dayCheck && monthCheck && yearCheck ){
              filteredRows.push(row);
            }
          
          } else {

            const needles = (key === 'status') ? searchTerms[key].split(',') : [searchTerms[key].trim().toLowerCase()];
            let haystack;

            switch (key) {

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

            needles.forEach(function (needle, i) {
              if (haystack.indexOf(needle) > -1) {
                filteredRows.push(row);
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
  function _getSortedResults(rows, sortBy, sortDirection) {

    console.log('_getSortedResults( rows, ' + sortBy + ', ' + sortDirection + ')');

    let sortedRows = Array.from(rows); // Should already be a row, really...
    sortedRows.sort(function (a, b) {

      // Text check
      let comparisonA = a[sortBy];
      let comparisonB = b[sortBy];

      return comparisonA.localeCompare(comparisonB);

    });

    if (sortDirection === 'ascending') {
      sortedRows = sortedRows.reverse();
    }

    return sortedRows;

  }


  //
  // GET PAGINATED RESULTS FUNCTION
  //
  function _getPaginatedResults(rows, rowsPerPage, currentPage) {

    console.log('_getPaginatedResults()');

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
  function _truncatePaginationLinks(pageObjects, currentPage) {

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
  filters.getSearchTitle = function () {

    const version = this.ctx.version;
    const noOfFilteredRows = (Number.isInteger(parseInt(this.ctx.data[version].noOfFilteredRows))) ? parseInt(this.ctx.data[version].noOfFilteredRows) : 0;

    let caption = noOfFilteredRows + ' certificates found';

    switch (noOfFilteredRows) {
      case 0:
        caption = 'No certificates found';
        break;
      case 1:
        caption = '1 certificate found';
        break;
    }

    return caption;

  };

  //
  // GET TABLE HEAD ROWS FILTER
  //
  filters.getTableHeadRows = function (sortColumns, processorTable) {

    sortColumns = (typeof sortColumns === 'boolean') ? sortColumns : true;

    const version = this.ctx.version;

    const noOfFilteredRows = (Number.isInteger(parseInt(this.ctx.data[version].noOfFilteredRows))) ? parseInt(this.ctx.data[version].noOfFilteredRows) : 0;

    const sortBy = (this.ctx.data[version].sortBy) ? this.ctx.data[version].sortBy : 'firstName';
    const sortDirection = (['ascending', 'descending'].indexOf(this.ctx.data[version].sortDirection) > -1) ? this.ctx.data[version].sortDirection : 'descending';

    const baseLink = '?' + version + '[currentPage]=0';
    const opposite = (sortDirection === 'descending') ? 'ascending' : 'descending';

    let firstNameLink =
    baseLink + '&' + version + '[sortBy]=firstName&' + version + '[sortDirection]=' + opposite;
  
  let firstNameObj = {
    html:
      '<a href="' + firstNameLink + '">Name</a>' +
      '<br /><span class="nhsuk-body-s">NHS number</span>',
    attributes: {
      'aria-sort': (sortBy === 'firstName') ? sortDirection : 'none'
    }
  };

  let rows;

  if( processorTable ){

    // Processor page view
    rows = [
      firstNameObj,
      { text: 'Postcode' },
      { text: 'Type' },
      { text: 'Status' },
      { text: 'Reference' },
      { text: 'Check type' }
    ];

  } else {

    // Standard search results view
    rows = [
      firstNameObj,
      { text: 'Address' },
      { text: 'Postcode' },
      { text: 'Date of birth' },
      { text: 'Type' },
      { text: 'Status' },
      { text: 'Reference' },
      { text: 'End date' }
    ];

  }

    return rows;

  };



  //
  // DRAW ROWS FUNCTION
  //
  function _drawRows(inputRows, role, processor, processorTable) {

    const rows = [];

    inputRows.forEach(function (patient) {

      let link = patient.certificateType + '/case?patientID=' + patient.id;
      
      if (patient.checking === true) {

        // Checking screens

        switch( role ){

          case 'backOfficeSupervisor':

            if ( patient.checkType === 'supervisor' ) {
              link = patient.certificateType + '/comparison--leave-feedback?patientID=' + patient.id;
            } else {
              link = patient.certificateType + '/comparison--has-feedback?patientID=' + patient.id;
            }
            break;

          case 'qualityControl':

            if ( patient.checkType === 'quality' ) {
              link = patient.certificateType + '/comparison--leave-feedback?patientID=' + patient.id;
            } else {
              link = patient.certificateType + '/comparison--has-feedback?patientID=' + patient.id;
            }
            break;

          case 'backOffice':

            link = patient.certificateType + '/comparison--correction?patientID=' + patient.id;
            break;

          case 'callCentre':

            link = patient.certificateType + '/case--view--can-edit?patientID=' + patient.id;
            break;


        }

      } else {

        // Standard screens
        switch( patient.status ){

          case 'processing':

            if( role === 'backOffice' || role === 'backOfficeSupervisor' ){
              link = 'process-application/experimental--horizontal-labels?patientID=' + patient.id;
            } else if( role === 'qualityControl' ) {
              link = patient.certificateType + '/case--view--cannot-edit?patientID=' + patient.id;
            } else {
              link = patient.certificateType + '/case--view--can-edit?patientID=' + patient.id;
            }

            break;

          case 'on-hold':

            if( role === 'backOffice' || role === 'backOfficeSupervisor' ){
              link = 'process-application/review-application--horizontal-labels--on-hold?patientID=' + patient.id;
            } else if( role === 'qualityControl' ) {
              link = patient.certificateType + '/case--view--cannot-edit?patientID=' + patient.id;
            } else {
              link = patient.certificateType + '/case--view--can-edit?patientID=' + patient.id;
            }

            break;

          case 'rejected':
            
            link = patient.certificateType + '/case--view--can-edit?patientID=' + patient.id;

            break;
            

        }

      }





      const checkedBy = ( patient.checkType === 'supervisor' ) ? 'Supervisor' : 'Quality checker';

      // Hide address for DIGITAL MATEX
      let addressHtml = '';

      if (!(patient.certificateType === 'matex' && patient.channel === 'Digital')) {
        const fullAddressLine1 = patient.address.buildingNumber + ' ' + patient.address.streetName;
        const hadMore = patient.address.locality || patient.address.postTown || patient.address.county;
      
        addressHtml = hadMore
          ? fullAddressLine1 + '...'
          : fullAddressLine1;
      }

      const nameHTML = '<a class="nhsuk-link nhsuk-link--no-visited-state" href="'+ link + '">' +
            '<strong>' + patient.firstName + ' ' + patient.lastName + '</strong>' +
            '<span class="nhsuk-u-visually-hidden">: Open ' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag(patient.certificateType) + ' certificate record </span>' +
          '</a>' +
          '<br /><span class="nhsuk-body-s">' + patient.nhsNumber + '</span>';
      
      
      let obj;

      if( processorTable ){

        obj = [
        { html: nameHTML },
        { html: patient.address.postcode },
        { html: _getCertificateTypeTextOrTag(patient.certificateType, true) },
        { html: (patient.checking === true) ? _getStatusTextOrTag(patient.status, true) + ' ' + _getStatusTextOrTag('checking', true) : _getStatusTextOrTag(patient.status, true) },
        { html: patient.certificateReference },
        { text: checkedBy }
      ];

      } else {

        obj = [
          { html: nameHTML },
          { html: addressHtml },
          { html: patient.address.postcode },
          { html: patient.dateOfBirth.display },
          { html: _getCertificateTypeTextOrTag(patient.certificateType, true) },
          { html: (patient.checking === true) ? _getStatusTextOrTag('checking', true) : _getStatusTextOrTag(patient.status, true) },
          { html: patient.certificateReference },
          { text: patient.endDate }
        ];

      }

      

      rows.push(obj);

    });

    return rows;

  };

  //
  // GET CHECKING TABLE ROWS
  //
  filters.getCheckingTableRows = function (patientData, count) {

    if (typeof patientData === 'string') {
      patientData = JSON.parse(patientData);
    }

    count = (!Number.isNaN(parseInt(count))) ? parseInt(count) : 1;

    const loop = (Array.isArray(patientData)) ? patientData.length : 0;
    const rows = [];

    for (let i = 0; i < loop; i++) {

      if (rows.length < count) {

        const patient = patientData[i];

        if (patient.checking === true) {

          const obj = [
            { html: '<a class="nhsuk-link nhsuk-link--no-visited-state" href="' + patient.certificateType + '/comparison--correction?patientID=' + patient.id + '"><strong>' + patient.firstName + ' ' + patient.lastName + '</strong></a><br /><span class="nhsuk-body-s">' + patient.nhsNumber + '</span>' },
            { html: patient.address.postcode },
            { html: _getCertificateTypeTextOrTag(patient.certificateType, true) },
            { html: _getStatusTextOrTag(patient.status, true) + ' ' + _getStatusTextOrTag('checking', true) },
            { html: (patient.status === 'processing') ? '<span class="nhsuk-body-s nhsuk-u-secondary-text-colour">' + patient.certificateReference + '</span>' : patient.certificateReference }
          ];

          rows.push(obj);

        }

      } else {

        break;

      }

    }

    return rows;

  };


  //
  // ALTER DATE BY NUMBER OF DAYS FUNCTION
  //
  filters.alterTodaysDateByNumberOfDays = function (daysOffset) {

    let today = new Date();
    today.setDate(today.getDate() + daysOffset);

    // Manually format the date to avoid leading zeros (day, month, year)
    return today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

  };


  //
  // CHANGE ONE LETTER FUNCTION
  //
  filters.changeOneLetter = function (toChange) {

    let newString = toChange;

    if (toChange) {
      const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
      const newLetter = letters[Math.round(Math.random() * (letters.length - 1))];
      const num = Math.round(Math.random() * (toChange.length - 2)) + 1;
      newString = toChange.substring(0, num) + newLetter + toChange.substring(num + 1);
    }

    return newString;

  };


  //
  // GET QUALITY CONTROL TABLE ROWS
  //
  filters.getQualityControlTableRows = function (patientData, cipher, count) {

    const tick = '<svg class="nhsuk-icon nhsuk-icon--tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" focusable="false" aria-hidden="true"><path fill="#007f3b" d="M11.4 18.8a2 2 0 0 1-2.7.1h-.1L4 14.1a1.5 1.5 0 0 1 2.1-2L10 16l8.1-8.1a1.5 1.5 0 1 1 2.2 2l-8.9 9Z"></path></svg>';
    const cross = '<svg class="nhsuk-icon nhsuk-icon--cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" focusable="false" aria-hidden="true"><path fill="#d5281b" d="M17 18.5c-.4 0-.8-.1-1.1-.4l-10-10c-.6-.6-.6-1.6 0-2.1.6-.6 1.5-.6 2.1 0l10 10c.6.6.6 1.5 0 2.1-.3.3-.6.4-1 .4z M7 18.5c-.4 0-.8-.1-1.1-.4-.6-.6-.6-1.5 0-2.1l10-10c.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1l-10 10c-.3.3-.6.4-1 .4z"></path></svg>';

    const processor = this.ctx.data.processors[cipher];
    console.log(processor);

    if (typeof patientData === 'string') {
      patientData = JSON.parse(patientData);
    }

    count = (!Number.isNaN(parseInt(count))) ? parseInt(count) : 1;

    const loop = (Array.isArray(patientData)) ? patientData.length : 0;
    const rows = [];

    for (let i = 0; i < loop; i++) {

      if (rows.length < count) {

        const patient = patientData[i];

        if (patient.checking === true && patient.processor === cipher) {

          //const checked = ( Math.round(Math.random()) === 1 ) ? true : false;
          //{ html: ( checked ) ?  tick + ' Checked' : cross + ' To check' },
          const checked = false; // Forcing everything to be checked on QC view

          const url = (checked) ? patient.certificateType + '/comparison--has-feedback?patientID=' + patient.id : patient.certificateType + '/comparison--leave-feedback?patientID=' + patient.id;

          const obj = [
            { html: '<a class="nhsuk-link nhsuk-link--no-visited-state" href="' + url + '"><strong>' + patient.firstName + ' ' + patient.lastName + '</strong></a><br /><span class="nhsuk-body-s">' + patient.nhsNumber + '</span>' },
            { html: patient.address.postcode },
            { html: _getCertificateTypeTextOrTag(patient.certificateType, true) },
            { html: _getStatusTextOrTag(patient.status, true) + ' ' + _getStatusTextOrTag('checking', true) },
            { html: (patient.status === 'processing') ? '<span class="nhsuk-body-s nhsuk-u-secondary-text-colour">' + patient.certificateReference + '</span>' : patient.certificateReference }
          ];

          rows.push(obj);

        }

      } else {

        break;

      }

    }

    return rows;

  };

  //
  // GET TABLE ROWS FILTER
  //
  filters.getTableRows = function (patientData, processorTable) {

    if (typeof patientData === 'string') {
      patientData = JSON.parse(patientData);
    }

    // Filter variables
    const searchTerms = {};
    const summary = [];

    let start = 'Searched for all certificates';

    if (this.ctx.data.searchCertificateType) {
      searchTerms.certificateType = this.ctx.data.searchCertificateType;
      start = 'Searched for all ' + _getCertificateTypeTextOrTag(this.ctx.data.searchCertificateType) + ' certificates'
    }
    if (this.ctx.data.searchProcessor) {
      searchTerms.processor = this.ctx.data.searchProcessor;
      start += ' processed by ' + searchTerms.processor;
    }
    if (this.ctx.data.searchStatus) {
      searchTerms.status = this.ctx.data.searchStatus;
      summary.push('specific statuses'); // Only used for role=backOffice
    }
    if (this.ctx.data.searchChecking) {
      searchTerms.checking = (this.ctx.data.searchChecking === 'true' || this.ctx.data.searchChecking === true) ? true : false;
      summary.push('that are being checked');
    }

    if (this.ctx.data.searchCertificateReference) {
      searchTerms.certificateReference = this.ctx.data.searchCertificateReference;
      summary.push('"' + searchTerms.certificateReference + '" in certificate reference');
    }

    if (this.ctx.data.searchFirstName) {
      searchTerms.firstName = this.ctx.data.searchFirstName;
      summary.push('"' + searchTerms.firstName + '" in first name');
    }

    if (this.ctx.data.searchLastName) {
      searchTerms.lastName = this.ctx.data.searchLastName;
      summary.push('"' + searchTerms.lastName + '" in last name');
    }

    if (this.ctx.data.searchPostcode) {
      searchTerms.postcode = this.ctx.data.searchPostcode;
      summary.push('"' + searchTerms.postcode + '" in postcode');
    }

     if (this.ctx.data.searchDateOfBirth) {
      searchTerms.dateOfBirth = _tidySearchDate(this.ctx.data.searchDateOfBirth);
      summary.push('"' + _processDate(searchTerms.dateOfBirth) + '" in date of birth');
    }



    if (summary.length === 0) {
      this.ctx.data.summaryText = start;
    } else if (summary.length === 1) {
      this.ctx.data.summaryText = start + ' with ' + summary[0];
    } else {
      let last = summary.pop();
      this.ctx.data.summaryText = start + ' with ' + summary.join(', ') + ' and ' + last;
    }


    // Sorting variables
    let sortBy = this.ctx.data[this.ctx.version].sortBy;
    let sortDirection = this.ctx.data[this.ctx.version].sortDirection;
    
      if (!this.ctx.data[this.ctx.version]) {
        this.ctx.data[this.ctx.version] = {};
      }

      if (!this.ctx.data[this.ctx.version].sortBy) {
        this.ctx.data[this.ctx.version].sortBy = 'firstName';
      }

      if (!this.ctx.data[this.ctx.version].sortDirection) {
        this.ctx.data[this.ctx.version].sortDirection = 'ascending';
      }  

    console.log('SORT DEBUG sortBy=', sortBy, 'dir=', sortDirection);

    // Pagination variables
    const rowsPerPage = (Number.isInteger(parseInt(this.ctx.data[this.ctx.version].rowsPerPage))) ? parseInt(this.ctx.data[this.ctx.version].rowsPerPage) : 5;
    const currentPage = (Number.isInteger(parseInt(this.ctx.data[this.ctx.version].currentPage))) ? parseInt(this.ctx.data[this.ctx.version].currentPage) : 0;

    // Process the patients
    const filteredPatientData = _getFilteredResults(patientData, searchTerms);
    const sortedPatientData = _getSortedResults(filteredPatientData, sortBy, sortDirection);
    const paginatedPatientData = _getPaginatedResults(sortedPatientData, rowsPerPage, currentPage);

    this.ctx.data[this.ctx.version].noOfFilteredRows = filteredPatientData.length;

    // Extras for the rows
    const role = this.ctx.data.role;
    const processor = (this.ctx.data.searchProcessor) ? this.ctx.data.processors[this.ctx.data.searchProcessor] : {};

    return _drawRows(paginatedPatientData, role, processor, processorTable);

  };


  //
  // GET PAGINATION LINKS FILTER
  //
  filters.getPaginationLinks = function (classes) {

    // content: blank string

    const rowsPerPage = (Number.isInteger(parseInt(this.ctx.data[this.ctx.version].rowsPerPage))) ? parseInt(this.ctx.data[this.ctx.version].rowsPerPage) : 5;
    const currentPage = (Number.isInteger(parseInt(this.ctx.data[this.ctx.version].currentPage))) ? parseInt(this.ctx.data[this.ctx.version].currentPage) : 0;

    const noOfFilteredRows = (Number.isInteger(this.ctx.data[this.ctx.version].noOfFilteredRows)) ? this.ctx.data[this.ctx.version].noOfFilteredRows : 0;
    const noOfPages = Math.ceil(noOfFilteredRows / rowsPerPage);

    const obj = {};

    if (noOfFilteredRows > rowsPerPage) {

      const items = [];

      if (currentPage !== 0) {
        obj.previous = { 'href': '?' + this.ctx.version + '[currentPage]=' + (currentPage - 1) }
      }
      if (currentPage !== (noOfPages - 1)) {
        obj.next = { 'href': '?' + this.ctx.version + '[currentPage]=' + (currentPage + 1) }
      }

      for (let i = 0; i < noOfPages; i++) {

        let itemObj = { 'number': (i + 1), 'href': '?' + this.ctx.version + '[currentPage]=' + i };
        if (i === currentPage) {
          itemObj.current = true;
        }

        items.push(itemObj);

      }

      // Add ellipses if needed...
      if (items.length > 6) {
        obj.items = _truncatePaginationLinks(items, currentPage);
      } else {
        obj.items = items;
      }

    }

    if (classes) {
      obj.classes = classes;
    }

    return obj;

  };

  //
  // GET CONFIDENCE TAG FUNCTION
  //
  filters.getConfidenceTag = function (num, showEverything) {

    if (!Number.isInteger(num)) {
      num = 0;
    }

    const showLevels = (showEverything === true) ? ['empty', 'low', 'medium', 'high'] : ['low', 'medium']; // Add the levels you wish to output here...

    let confidenceLevel = 'empty';
    let tag = '<span class="confidence-level"><span class="nhsuk-tag nhsuk-tag--grey">E</span></span>';

    if (num > 0) {
      confidenceLevel = 'low';
      tag = '<span class="confidence-level confidence-level--' + confidenceLevel + '"><span class="nhsuk-tag nhsuk-tag--red">L</span>'
      tag += '<span class="nhsuk-tag nhsuk-tag--red confidence-score">' + num + '</span></span>';
    }

    if (num > 30) {
      confidenceLevel = 'medium';
      tag = '<span class="confidence-level confidence-level--' + confidenceLevel + '"><span class="nhsuk-tag nhsuk-tag--blue">M</span>'
      tag += '<span class="nhsuk-tag nhsuk-tag--blue confidence-score">' + num + '</span></span>';
    }

    if (num > 60) {
      confidenceLevel = 'high';
      tag = '<span class="confidence-level confidence-level--' + confidenceLevel + '"><span class="nhsuk-tag nhsuk-tag--green">H</span>'
      tag += '<span class="nhsuk-tag nhsuk-tag--green confidence-score">' + num + '</span></span>';
    }

    return (showLevels.indexOf(confidenceLevel) > -1) ? tag : '';

  };

  //
  // PROCESS FULL NAME FILTER
  //
  filters.processFullName = function (firstName, lastName) {

    let fullName = '';

    console.log('PROCESSING: ' + firstName + ' ' + lastName);

    firstName = firstName || '';
    lastName = lastName || '';

    if (firstName && lastName) {
      fullName = firstName + ' ' + lastName;
    } else if (firstName && !lastName) {
      fullName = firstName;
    } else if (!firstName && lastName) {
      fullName = lastName;
    }

    return fullName;

  };

  //
  // PROCESS ADDRESS FILTER
  //
  filters.processAddress = function (houseNumber, addressLine1, addressLine2, town, county, postcode) {

    console.log( 'processAddress' );

    houseNumber = houseNumber || '';
    addressLine1 = addressLine1 || '';
    addressLine2 = addressLine2 || '';
    town = town || '';
    county = county || '';
    postcode = postcode || '';

    let firstLine = '';

    if (houseNumber && addressLine1) {
      firstLine = houseNumber + ' ' + addressLine1;
    } else if (!houseNumber && addressLine1) {
      firstLine = addressLine1;
    } else if (houseNumber && !addressLine1) {
      firstLine = houseNumber;
    }

    let elements = [firstLine];

    if (addressLine2) {
      elements.push(addressLine2);
    }

    if (town) {
      elements.push(town);
    }

    if (county) {
      elements.push(county);
    }

    if (postcode) {
      elements.push(postcode);
    }

    return elements.join(', <br />');

  };

  //
  // TIDY SEARCH DATE FUNCTION
  // Converts strings into numbers, and corrects month to zero-index
  //
  _tidySearchDate = function( dateObj ){

    if( dateObj && dateObj.day && dateObj.month && dateObj.year ){

      dateObj.day = ( !Number.isNaN(parseInt(dateObj.day)) ) ? parseInt(dateObj.day) : dateObj.day;
      dateObj.month = ( !Number.isNaN(parseInt(dateObj.month)) ) ? parseInt(dateObj.month)-1 : dateObj.month;
      dateObj.year = ( !Number.isNaN(parseInt(dateObj.year)) ) ? parseInt(dateObj.year) : dateObj.year;

    }

    return dateObj

  }

  //
  // PROCESS DATE FUNCTION
  // Make sure to zero-index the month when you use this
  //
  _processDate = function( dateObj ){
    let date = '';
    if( dateObj && dateObj.day && dateObj.month && dateObj.year ){
      date = new Date( parseInt(dateObj.year), parseInt(dateObj.month), parseInt(dateObj.day), 0, 0, 0, 0 );
      date = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
    return date;
  };

  //
  // PROCESS DATE FILTER
  //
  filters.processDate = function ( dateObj ) {
    return _processDate( dateObj );
  };

  //
  // IS DATE VALID FILTER
  //
  filters.isValidDate = function (day, month, year) {

    day = String(day);
    month = String(month);
    year = String(year);

    if (day.length === 1) {
      day = '0' + day;
    }
    if (month.length === 1) {
      month = '0' + month;
    }

    const inputDate = year + '/' + month + '/' + day;
    let check = false;

    if (inputDate.length === 10) {
      check = !isNaN(new Date(dateStr));
    }

    return check;

  };


  //
  // GET PATIENT DATA FILTER
  //
  filters.getPatientData = function (code) {

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"114 066 1155","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"4 February 2004","day":4,"month":1,"year":2004},"checking":true,"checkType":"supervisor","certificateReference":"20 362 723 251","channel":"Paper","imageReference":"2026 03 26 12 01 59N984997435","startDate":"18 July 2025","endDate":"18 April 2027","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07031 284 591","emailAddress":"Smith946@aol.com"},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"260 307 8676","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"expired","dateOfBirth":{"display":"4 June 2003","day":4,"month":5,"year":2003},"checking":false,"certificateReference":"06 945 258 421","channel":"Paper","imageReference":"2026 03 26 12 01 59N394976563","startDate":"5 September 2025","endDate":"5 June 2027","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07049 823 716","emailAddress":"a.jones@hotmail.com"},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"924 822 3884","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"3 October 1998","day":3,"month":9,"year":1998},"checking":true,"certificateReference":"62 385 277 695","channel":"Paper","startDate":"14 July 2025","endDate":"14 April 2027","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 395 184","checkType":"supervisor","imageReference":"2026 03 26 12 01 59N729971387"},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"075 263 5755","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"12 August 1993","day":12,"month":7,"year":1993},"checking":true,"checkType":"quality","certificateReference":"28 110 365 488","channel":"Paper","imageReference":"2026 03 26 12 01 59N089639378","startDate":"11 May 2025","endDate":"11 February 2027","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07071 528 439","emailAddress":"a.brown@gmail.com"},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"079 276 4753","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"25 November 1992","day":25,"month":10,"year":1992},"checking":false,"certificateReference":"78 528 080 207","channel":"Paper","startDate":"9 September 2025","endDate":"9 June 2027","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07083 916 275","emailAddress":"emily.williams@blueyonder.co.uk","imageReference":"2026 03 26 12 01 59N147962350"},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"231 024 7451","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"2 June 1967","day":2,"month":5,"year":1967},"checking":false,"checkType":"quality","certificateReference":"HRT 4GO8 OMZI","channel":"Digital","imageReference":"2026 03 26 12 01 48N466773069","startDate":"11 July 2025","endDate":"11 April 2027","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07092 475 318","emailAddress":"Wilson649@hotmail.com"},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"422 305 3688","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"27 December 1979","day":27,"month":11,"year":1979},"checking":false,"checkType":"supervisor","certificateReference":"HRT EIB9 NZKH","channel":"Digital","imageReference":"2026 03 26 12 01 48N623365939","startDate":"30 June 2025","endDate":"30 March 2027","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07015 648 293","emailAddress":"mia.davies@googlemail.com"},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"231 943 5000","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"3 March 2000","day":3,"month":2,"year":2000},"checking":false,"certificateReference":"18 269 753 106","channel":"Digital","startDate":"31 August 2025","endDate":"31 May 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 751 964","emailAddress":"e.evans@blueyonder.co.uk"},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"244 772 7198","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"21 February 2005","day":21,"month":1,"year":2005},"checking":true,"certificateReference":"23 469 741 529","channel":"Paper","imageReference":"2026 03 26 12 01 59N906413648","startDate":"1 July 2025","endDate":"1 April 2027","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07036 592 817","emailAddress":"g.thomas@hotmail.com","checkType":"supervisor"},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"719 855 7825","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"24 August 1971","day":24,"month":7,"year":1971},"checking":false,"certificateReference":"HRT XFEE 175H","channel":"Digital","startDate":"30 May 2025","endDate":"2 March 2027","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07047 813 256","emailAddress":"Roberts148@aol.com"},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"541 829 8081","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"8 August 1990","day":8,"month":7,"year":1990},"checking":true,"certificateReference":"34 772 221 612","channel":"Paper","startDate":"9 July 2025","endDate":"9 April 2027","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07051 294 783","emailAddress":"Johnson585@hotmail.com","checkType":"supervisor","imageReference":"2026 03 26 12 01 59N797468992"},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"644 575 7545","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"16 July 1973","day":16,"month":6,"year":1973},"checking":false,"certificateReference":"HRT 7COP DF3P","channel":"Digital","startDate":"1 April 2025","endDate":"1 January 2027","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07063 418 592","emailAddress":"c.lewis@blueyonder.co.uk"},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"928 365 7839","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"15 March 1984","day":15,"month":2,"year":1984},"checking":false,"certificateReference":"HRT EU9V 7SFB","channel":"Telephony","startDate":"1 July 2025","endDate":"1 April 2027","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07075 928 341","emailAddress":"i.walker@googlemail.com"},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"379 654 3019","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"2 August 1967","day":2,"month":7,"year":1967},"checking":false,"certificateReference":"HRT 7KMS 7CLZ","channel":"Digital","startDate":"6 April 2025","endDate":"6 January 2027","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07084 372 659","emailAddress":"d.hall491@googlemail.com"},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"043 816 5793","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"16 July 1975","day":16,"month":6,"year":1975},"checking":false,"checkType":"supervisor","certificateReference":"HRT 7AZT PZRF","channel":"Digital","imageReference":"2026 03 26 12 01 48N765642449","startDate":"23 April 2025","endDate":"23 January 2027","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07091 837 426","emailAddress":"Clarke859@googlemail.com"},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"303 230 5635","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"9 July 2005","day":9,"month":6,"year":2005},"checking":false,"certificateReference":"58 193 933 202","channel":"Digital","startDate":"20 April 2025","endDate":"20 January 2027","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 385 927","emailAddress":"p.allen@gmail.com"},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"249 904 9465","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"2 February 1991","day":2,"month":1,"year":1991},"checking":true,"checkType":"quality","certificateReference":"28 680 093 670","channel":"Paper","imageReference":"2026 03 26 12 01 59N102252214","startDate":"30 May 2025","endDate":"2 March 2027","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07027 639 485","emailAddress":"Young867@googlemail.com"},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"760 761 9167","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"15 December 1982","day":15,"month":11,"year":1982},"checking":false,"certificateReference":"HRT DE4A 3V1A","channel":"Digital","imageReference":"2026 03 26 12 01 48N994278795","startDate":"3 July 2025","endDate":"3 April 2027","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07035 821 749","emailAddress":"h.king@outlook.com"},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"251 524 2686","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"20 August 1976","day":20,"month":7,"year":1976},"checking":false,"certificateReference":"HRT DUPN P4EO","channel":"Digital","startDate":"29 May 2025","endDate":"1 March 2027","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07048 952 613","emailAddress":"m.wright310@gmail.com"},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"277 002 7429","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"14 August 1984","day":14,"month":7,"year":1984},"checking":false,"certificateReference":"HRT INMA 3M13","channel":"Digital","startDate":"18 June 2025","endDate":"18 March 2027","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07052 719 384","emailAddress":"ella-rose.green@aol.com"},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"049 889 3879","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"7 May 1983","day":7,"month":4,"year":1983},"checking":false,"checkType":"supervisor","certificateReference":"HRT 5L8J HCYB","channel":"Digital","imageReference":"2026 03 26 12 01 48N735972206","startDate":"9 August 2025","endDate":"9 May 2027","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07064 837 295","emailAddress":"p.baker225@hotmail.com"},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"996 350 1984","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"5 December 1986","day":5,"month":11,"year":1986},"checking":false,"certificateReference":"HRT RI13 ZXJI","channel":"Pharmacy","startDate":"3 May 2025","endDate":"3 February 2027","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07073 491 826","emailAddress":"adams.r@googlemail.com"},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"898 942 2550","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"27 April 1976","day":27,"month":3,"year":1976},"checking":false,"certificateReference":"HRT AQ28 H7D6","channel":"Digital","startDate":"8 September 2025","endDate":"8 June 2027","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07085 623 941","emailAddress":"c.mitchell@hotmail.com"},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"175 148 9898","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"19 September 1992","day":19,"month":8,"year":1992},"checking":false,"checkType":"supervisor","certificateReference":"88 292 042 759","channel":"Digital","imageReference":"2026 03 26 12 01 48N683647559","startDate":"4 July 2025","endDate":"4 April 2027","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07096 718 235","emailAddress":"s.turner@aol.com"},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"615 215 4849","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"17 February 1994","day":17,"month":1,"year":1994},"checking":false,"certificateReference":"HRT GD4I NFST","channel":"Digital","imageReference":"2026 03 26 12 01 48N908829990","startDate":"24 June 2025","endDate":"24 March 2027","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07018 273 945","emailAddress":"Carter207@hotmail.com"},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"526 465 6467","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"24 August 2002","day":24,"month":7,"year":2002},"checking":true,"certificateReference":"27 450 117 730","channel":"Paper","startDate":"6 June 2025","endDate":"6 March 2027","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07029 384 756","emailAddress":"j.morris@aol.com","checkType":"supervisor","imageReference":"2026 03 26 12 01 59N759029019"},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"715 412 5190","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"17 January 1999","day":17,"month":0,"year":1999},"checking":true,"checkType":"supervisor","certificateReference":"02 604 002 800","channel":"Paper","imageReference":"2026 03 26 12 01 59N184051168","startDate":"24 September 2025","endDate":"24 June 2027","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07031 572 948","emailAddress":"m.hughes@googlemail.com"},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"490 920 1815","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"10 May 1994","day":10,"month":4,"year":1994},"checking":true,"certificateReference":"72 774 626 246","channel":"Paper","startDate":"31 July 2025","endDate":"1 May 2027","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07042 619 583","emailAddress":"Ward979@blueyonder.co.uk","checkType":"supervisor","imageReference":"2026 03 26 12 01 59N099495997"},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"078 103 4092","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"27 April 1999","day":27,"month":3,"year":1999},"checking":false,"certificateReference":"07 884 730 636","channel":"Digital","imageReference":"2026 03 26 12 01 48N648299313","startDate":"18 June 2025","endDate":"18 March 2027","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07053 847 261","emailAddress":"rosie.price@hotmail.com"},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"637 295 2283","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"2 August 1994","day":2,"month":7,"year":1994},"checking":true,"checkType":"supervisor","certificateReference":"17 651 441 464","channel":"Paper","imageReference":"2026 03 26 12 01 59N167517859","startDate":"9 July 2025","endDate":"9 April 2027","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07064 928 137","emailAddress":"aria.cooper@blueyonder.co.uk"},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"324 354 1596","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"18 December 1989","day":18,"month":11,"year":1989},"checking":false,"certificateReference":"HRT AC0O 5BPU","channel":"Digital","startDate":"7 July 2025","endDate":"7 April 2027","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07075 283 916","emailAddress":"Bailey534@blueyonder.co.uk"},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"656 416 5872","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"16 September 1992","day":16,"month":8,"year":1992},"checking":false,"certificateReference":"98 153 291 883","channel":"Paper","startDate":"6 August 2025","endDate":"6 May 2027","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07086 419 375","imageReference":"2026 03 26 12 01 59N739199522"},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"439 425 3930","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"2 December 1988","day":2,"month":11,"year":1988},"checking":false,"certificateReference":"HRT E08C J6PB","channel":"Digital","startDate":"4 August 2025","endDate":"4 May 2027","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07097 531 284","emailAddress":"h.phillips@blueyonder.co.uk"},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"874 920 0757","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"2 October 1995","day":2,"month":9,"year":1995},"checking":true,"certificateReference":"74 343 151 582","channel":"Paper","startDate":"28 June 2025","endDate":"28 March 2027","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07018 642 597","emailAddress":"bennett.z@gmail.com","checkType":"supervisor","imageReference":"2026 03 26 12 01 59N384529586"},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"301 070 8327","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"27 February 1980","day":27,"month":1,"year":1980},"checking":false,"certificateReference":"HRT GXBH PRVN","channel":"Digital","startDate":"3 August 2025","endDate":"3 May 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07029 753 861","emailAddress":"f.cox@outlook.com"},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"001 123 3294","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"19 February 1989","day":19,"month":1,"year":1989},"checking":false,"certificateReference":"HRT DE9F 6HLN","channel":"Digital","startDate":"12 May 2025","endDate":"12 February 2027","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07031 864 729","emailAddress":"maya.richardson@blueyonder.co.uk"},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"171 752 0254","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"13 October 1991","day":13,"month":9,"year":1991},"checking":false,"certificateReference":"HRT 3QLU B4DP","channel":"Digital","startDate":"29 March 2025","endDate":"29 December 2026","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07042 987 513","emailAddress":"e.gray@aol.com"},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"112 822 9874","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"16 March 1999","day":16,"month":2,"year":1999},"checking":false,"certificateReference":"89 216 857 656","channel":"Paper","startDate":"27 May 2025","endDate":"27 February 2027","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07054 129 876","emailAddress":"ivy.ross877@blueyonder.co.uk","imageReference":"2026 03 26 12 01 59N428286665"},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"462 513 4840","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"15 September 2002","day":15,"month":8,"year":2002},"checking":true,"certificateReference":"85 595 446 522","channel":"Paper","startDate":"5 August 2025","endDate":"5 May 2027","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07065 238 741","checkType":"quality","imageReference":"2026 03 26 12 01 59N752300711"},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"164 168 1204","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"26 October 1999","day":26,"month":9,"year":1999},"checking":false,"checkType":"quality","certificateReference":"13 850 925 433","channel":"Paper","imageReference":"2026 03 26 12 01 59N678038958","startDate":"10 July 2025","endDate":"10 April 2027","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07076 391 825"},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"340 557 3767","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"22 October 2001","day":22,"month":9,"year":2001},"checking":false,"certificateReference":"21 739 426 701","channel":"Paper","startDate":"19 June 2025","endDate":"19 March 2027","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07087 512 936","emailAddress":"thea.watson@googlemail.com","imageReference":"2026 03 26 12 01 59N837173189"},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"641 090 7991","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"22 April 1989","day":22,"month":3,"year":1989},"checking":false,"certificateReference":"68 077 043 701","channel":"Paper","startDate":"9 April 2025","endDate":"9 January 2027","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07098 631 427","emailAddress":"a.sanders@googlemail.com","imageReference":"2026 03 26 12 01 59N776449541"},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"587 701 0444","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"25 July 1989","day":25,"month":6,"year":1989},"checking":true,"certificateReference":"15 934 507 220","channel":"Paper","startDate":"25 June 2025","endDate":"25 March 2027","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07019 742 835","emailAddress":"Harrison596@aol.com","checkType":"supervisor","imageReference":"2026 03 26 12 01 59N474208273"},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"125 695 6873","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"13 January 1985","day":13,"month":0,"year":1985},"checking":false,"certificateReference":"HRT 0KVS WI3X","channel":"Digital","startDate":"23 April 2025","endDate":"23 January 2027","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07020 853 749","emailAddress":"l.coleman@blueyonder.co.uk"},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"385 461 4731","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"13 October 1997","day":13,"month":9,"year":1997},"checking":false,"checkType":"supervisor","certificateReference":"58 692 287 751","channel":"Digital","imageReference":"2026 03 26 12 01 48N088702809","startDate":"15 April 2025","endDate":"15 January 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07031 984 625","emailAddress":"murphy.a@hotmail.com"},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"287 716 7889","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"25 September 2000","day":25,"month":8,"year":2000},"checking":true,"checkType":"supervisor","certificateReference":"89 873 205 145","channel":"Paper","imageReference":"2026 03 26 12 01 59N484574480","startDate":"8 June 2025","endDate":"8 March 2027","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07042 195 783","emailAddress":"graham.s@blueyonder.co.uk"},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"110 076 9488","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"24 April 2008","day":24,"month":3,"year":2008},"checking":false,"certificateReference":"63 002 482 012","channel":"Paper","imageReference":"2026 03 26 12 01 59N645748991","startDate":"26 April 2025","endDate":"26 January 2027","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07053 268 917","emailAddress":"bonnie.stevens278@blueyonder.co.uk"},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"524 202 7533","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"8 November 2002","day":8,"month":10,"year":2002},"checking":false,"certificateReference":"46 460 781 429","channel":"Paper","imageReference":"2026 03 26 12 01 59N170730116","startDate":"14 April 2025","endDate":"14 January 2027","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07064 371 528","emailAddress":"i.simpson@googlemail.com"},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"038 923 4248","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"2 May 1989","day":2,"month":4,"year":1989},"checking":false,"checkType":"supervisor","certificateReference":"HRT J3QB STMC","channel":"Digital","imageReference":"2026 03 26 12 01 48N060038261","startDate":"6 August 2025","endDate":"6 May 2027","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07075 482 936","emailAddress":"harriet.butler@blueyonder.co.uk"},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"728 073 2372","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"5 July 2000","day":5,"month":6,"year":2000},"checking":true,"certificateReference":"15 118 828 159","channel":"Paper","startDate":"3 July 2025","endDate":"3 April 2027","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07086 593 147","emailAddress":"Chapman590@gmail.com","checkType":"supervisor","imageReference":"2026 03 26 12 01 59N051374124"},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"377 963 9666","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"12 August 1988","day":12,"month":7,"year":1988},"checking":false,"certificateReference":"HRT YZRJ JJ1T","channel":"Digital","imageReference":"2026 03 26 12 01 48N329462418","startDate":"12 June 2025","endDate":"12 March 2027","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07097 614 258","emailAddress":"aisha.ali935@googlemail.com"},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"069 941 1951","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"27 March 2002","day":27,"month":2,"year":2002},"checking":true,"certificateReference":"76 564 353 233","channel":"Paper","startDate":"24 June 2025","endDate":"24 March 2027","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07018 725 369","emailAddress":"sofia.hussain@gmail.com","checkType":"supervisor","imageReference":"2026 03 26 12 01 59N568305082"},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"657 761 8005","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"24 June 1969","day":24,"month":5,"year":1969},"checking":false,"checkType":"supervisor","certificateReference":"HRT 2F5Q U867","channel":"Digital","imageReference":"2026 03 26 12 01 48N766446121","startDate":"9 June 2025","endDate":"9 March 2027","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07029 836 471","emailAddress":"khan.a@gmail.com"},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"348 045 4777","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"24 July 1989","day":24,"month":6,"year":1989},"checking":false,"checkType":"supervisor","certificateReference":"73 000 481 281","channel":"Digital","imageReference":"2026 03 26 12 01 48N284249405","startDate":"14 April 2025","endDate":"14 January 2027","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07030 947 582","emailAddress":"Begum855@googlemail.com"},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"993 775 8734","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"2 July 1994","day":2,"month":6,"year":1994},"checking":false,"certificateReference":"62 434 949 921","channel":"Digital","imageReference":"2026 03 26 12 01 48N662500363","startDate":"22 May 2025","endDate":"22 February 2027","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07042 058 693","emailAddress":"n.o’connor@googlemail.com"},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"489 251 1822","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"27 February 2006","day":27,"month":1,"year":2006},"checking":false,"certificateReference":"42 825 922 038","channel":"Paper","startDate":"5 September 2025","endDate":"5 June 2027","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07053 169 784","emailAddress":"Kelly498@blueyonder.co.uk","imageReference":"2026 03 26 12 01 59N699365075"},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"227 930 9455","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"20 January 1967","day":20,"month":0,"year":1967},"checking":false,"certificateReference":"HRT LUU3 PNNF","channel":"Digital","imageReference":"2026 03 26 12 01 48N640376959","startDate":"27 May 2025","endDate":"27 February 2027","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07064 271 895","emailAddress":"McCarthy369@hotmail.com"},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"629 468 3277","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"2 November 1998","day":2,"month":10,"year":1998},"checking":true,"checkType":"quality","certificateReference":"91 350 149 625","channel":"Paper","imageReference":"2026 03 26 12 01 59N056283289","startDate":"23 May 2025","endDate":"23 February 2027","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07075 382 916","emailAddress":"o.doyle@gmail.com"},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"866 848 7683","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"4 May 1983","day":4,"month":4,"year":1983},"checking":false,"certificateReference":"HRT 9TFG E6QP","channel":"Digital","imageReference":"2026 03 26 12 01 48N654859211","startDate":"28 August 2025","endDate":"28 May 2027","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07086 493 127","emailAddress":"cerys.griffiths@googlemail.com"},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"318 844 5688","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","dateOfBirth":{"display":"13 May 1996","day":13,"month":4,"year":1996},"checking":false,"certificateReference":"28 471 998 873","channel":"Paper","startDate":"2 August 2025","endDate":"2 May 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07097 514 238","emailAddress":"megan.rees@googlemail.com","imageReference":"2026 03 26 12 01 59N869869119"},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"432 939 6051","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"12 May 1993","day":12,"month":4,"year":1993},"checking":false,"certificateReference":"81 021 077 841","channel":"Paper","startDate":"31 March 2025","endDate":"31 December 2026","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07018 625 349","emailAddress":"ffion.evans534@hotmail.com","imageReference":"2026 03 26 12 01 59N357550774"},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"677 690 9283","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"26 July 2007","day":26,"month":6,"year":2007},"checking":true,"certificateReference":"97 995 407 362","channel":"Paper","startDate":"1 May 2025","endDate":"1 February 2027","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07029 736 458","emailAddress":"eilidh.macdonald@gmail.com","checkType":"supervisor","imageReference":"2026 03 26 12 01 59N736416318"},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"673 862 9438","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"11 September 1990","day":11,"month":8,"year":1990},"checking":true,"certificateReference":"80 917 539 736","channel":"Paper","startDate":"16 May 2025","endDate":"16 February 2027","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07030 847 569","emailAddress":"skye.fraser@blueyonder.co.uk","checkType":"supervisor","imageReference":"2026 03 26 12 01 59N556692667"},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"136 982 5795","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"10 July 2001","day":10,"month":6,"year":2001},"checking":false,"checkType":"supervisor","certificateReference":"44 852 356 947","channel":"Digital","imageReference":"2026 03 26 12 01 48N314743281","startDate":"1 August 2025","endDate":"1 May 2027","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07041 958 672","emailAddress":"m.armstrong@gmail.com"},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"854 683 8255","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"13 February 2002","day":13,"month":1,"year":2002},"checking":false,"certificateReference":"91 792 811 175","channel":"Digital","imageReference":"2026 03 26 12 01 48N190247772","startDate":"3 June 2025","endDate":"3 March 2027","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07052 069 783","emailAddress":"hunter.p@googlemail.com"},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"582 828 8513","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"25 September 2006","day":25,"month":8,"year":2006},"checking":true,"checkType":"supervisor","certificateReference":"59 045 692 811","channel":"Paper","imageReference":"2026 03 26 12 01 59N375851546","startDate":"30 August 2025","endDate":"30 May 2027","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07063 171 894","emailAddress":"clara.lawrence637@hotmail.com"},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"672 965 3123","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"processing","dateOfBirth":{"display":"27 December 2001","day":27,"month":11,"year":2001},"checking":false,"certificateReference":"56 665 240 564","channel":"Paper","imageReference":"2026 03 26 12 01 59N420582912","startDate":"19 July 2025","endDate":"19 April 2027","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07074 282 915","emailAddress":"spencer.b@blueyonder.co.uk"},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"691 058 0489","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"20 September 1981","day":20,"month":8,"year":1981},"checking":false,"checkType":"supervisor","certificateReference":"HRT JYDU B720","channel":"Digital","imageReference":"2026 03 26 12 01 48N591579755","startDate":"13 August 2025","endDate":"13 May 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07085 393 126","emailAddress":"rogers.n@outlook.com"},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"459 137 4821","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","dateOfBirth":{"display":"3 April 2006","day":3,"month":3,"year":2006},"checking":false,"certificateReference":"13 938 839 553","channel":"Paper","startDate":"10 August 2025","endDate":"10 May 2027","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07096 414 237","imageReference":"2026 03 26 12 01 59N448695221"},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"138 902 9012","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"6 August 1969","day":6,"month":7,"year":1969},"checking":false,"certificateReference":"HRT W41H ACFG","channel":"Pharmacy","imageReference":"2026 03 26 12 01 48N974159901","startDate":"28 June 2025","endDate":"28 March 2027","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07017 525 348","emailAddress":"Henderson538@blueyonder.co.uk"},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"790 947 1695","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"26 July 1989","day":26,"month":6,"year":1989},"checking":false,"certificateReference":"76 672 295 282","channel":"Paper","imageReference":"2026 03 26 12 01 59N188681054","startDate":"30 April 2025","endDate":"30 January 2027","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07028 636 459","emailAddress":"r.palmer@hotmail.com"},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"442 847 4724","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"expired","dateOfBirth":{"display":"10 April 1993","day":10,"month":3,"year":1993},"checking":false,"certificateReference":"01 318 926 956","channel":"Paper","startDate":"30 March 2025","endDate":"30 December 2026","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07039 747 561","emailAddress":"lara.nicholson@blueyonder.co.uk","imageReference":"2026 03 26 12 01 59N435230178"},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"943 610 0848","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"3 February 2006","day":3,"month":1,"year":2006},"checking":true,"certificateReference":"33 318 871 978","channel":"Paper","imageReference":"2026 03 26 12 01 59N843657533","startDate":"12 July 2025","endDate":"12 April 2027","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07040 858 673","emailAddress":"julia.gardner@hotmail.com","checkType":"supervisor"},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"242 877 6696","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"20 August 1968","day":20,"month":7,"year":1968},"checking":false,"certificateReference":"HRT D3GQ VKVU","channel":"Pharmacy","startDate":"30 March 2025","endDate":"30 December 2026","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07051 969 782","emailAddress":"ada.newton@hotmail.com"},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"470 603 9397","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"20 June 1971","day":20,"month":5,"year":1971},"checking":false,"certificateReference":"HRT U048 0QCK","channel":"Digital","startDate":"28 August 2025","endDate":"28 May 2027","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07062 071 893","emailAddress":"Reed555@gmail.com"},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"038 167 7340","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"21 September 1986","day":21,"month":8,"year":1986},"checking":false,"certificateReference":"HRT ZH9K 6XZ0","channel":"Digital","startDate":"23 June 2025","endDate":"23 March 2027","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07073 182 914","emailAddress":"victoria.harvey@outlook.com"},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"522 537 1534","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"10 November 1975","day":10,"month":10,"year":1975},"checking":false,"certificateReference":"HRT 9QX4 ASUF","channel":"Digital","startDate":"26 July 2025","endDate":"26 April 2027","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07084 293 125","emailAddress":"maria.fernandez403@aol.com"},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"929 529 8925","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"12 July 1981","day":12,"month":6,"year":1981},"checking":false,"certificateReference":"HRT NJW2 TMHN","channel":"Pharmacy","startDate":"11 July 2025","endDate":"11 April 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07095 314 236","emailAddress":"e.silva@blueyonder.co.uk"},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"924 483 2789","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"21 January 1985","day":21,"month":0,"year":1985},"checking":false,"certificateReference":"HRT IT34 26LY","channel":"Digital","imageReference":"2026 03 26 12 01 48N320921723","startDate":"17 August 2025","endDate":"17 May 2027","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07016 425 347","emailAddress":"l.patel@googlemail.com"},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"037 969 6634","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"22 July 1994","day":22,"month":6,"year":1994},"checking":false,"certificateReference":"16 917 316 913","channel":"Paper","imageReference":"2026 03 26 12 01 59N907510789","startDate":"15 May 2025","endDate":"15 February 2027","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07027 536 458"},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"438 995 7601","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"16 June 1982","day":16,"month":5,"year":1982},"checking":false,"certificateReference":"HRT UTDJ I9XM","channel":"Digital","startDate":"14 September 2025","endDate":"14 June 2027","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07038 647 569","emailAddress":"ahmed.j@hotmail.com"},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"757 590 6811","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"10 June 2003","day":10,"month":5,"year":2003},"checking":false,"certificateReference":"89 851 148 367","channel":"Digital","startDate":"19 August 2025","endDate":"19 May 2027","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07049 758 671","emailAddress":"Rashid575@aol.com"},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"884 962 0338","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"13 October 2001","day":13,"month":9,"year":2001},"checking":false,"certificateReference":"71 061 058 303","channel":"Paper","startDate":"24 May 2025","endDate":"24 February 2027","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07050 869 782","emailAddress":"tara.paterson@googlemail.com","imageReference":"2026 03 26 12 01 59N662641122"},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"842 602 4869","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"6 August 2008","day":6,"month":7,"year":2008},"checking":false,"checkType":"supervisor","certificateReference":"40 571 484 372","channel":"Paper","imageReference":"2026 03 26 12 01 59N246627422","startDate":"31 August 2025","endDate":"31 May 2027","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07061 971 893"},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"980 466 3563","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"15 December 1990","day":15,"month":11,"year":1990},"checking":false,"certificateReference":"98 980 209 668","channel":"Paper","startDate":"18 June 2025","endDate":"18 March 2027","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07072 082 914","imageReference":"2026 03 26 12 01 59N408733940"},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"792 559 4653","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"7 July 1991","day":7,"month":6,"year":1991},"checking":false,"certificateReference":"63 674 355 484","channel":"Paper","imageReference":"2026 03 26 12 01 59N672832021","startDate":"15 August 2025","endDate":"15 May 2027","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07083 193 125"},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"001 329 3998","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"12 October 2007","day":12,"month":9,"year":2007},"checking":false,"certificateReference":"10 117 141 059","channel":"Paper","startDate":"15 July 2025","endDate":"15 April 2027","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07094 214 236","imageReference":"2026 03 26 12 01 59N979591263"},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"161 862 0902","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"7 March 1996","day":7,"month":2,"year":1996},"checking":true,"checkType":"supervisor","certificateReference":"44 489 784 264","channel":"Paper","imageReference":"2026 03 26 12 01 59N161835160","startDate":"22 June 2025","endDate":"22 March 2027","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07015 325 347","emailAddress":"west.e@blueyonder.co.uk"},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"220 817 7389","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"9 July 1996","day":9,"month":6,"year":1996},"checking":true,"certificateReference":"29 138 980 101","channel":"Paper","startDate":"1 August 2025","endDate":"1 May 2027","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07026 436 458","emailAddress":"r.matthews@aol.com","checkType":"supervisor","imageReference":"2026 03 26 12 01 59N245199877"},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"599 118 2371","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"9 January 1988","day":9,"month":0,"year":1988},"checking":false,"certificateReference":"HRT 1GU8 P7X1","channel":"Digital","startDate":"4 April 2025","endDate":"4 January 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07037 547 569","emailAddress":"kayla.holmes@gmail.com"},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"259 157 9714","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"1 September 2002","day":1,"month":8,"year":2002},"checking":false,"certificateReference":"64 469 770 646","channel":"Paper","startDate":"27 May 2025","endDate":"27 February 2027","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07048 658 671","emailAddress":"lydia.walsh@outlook.com","imageReference":"2026 03 26 12 01 59N565423591"},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"318 938 7049","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"22 June 1989","day":22,"month":5,"year":1989},"checking":false,"checkType":"supervisor","certificateReference":"HRT XVLA FGDM","channel":"Digital","imageReference":"2026 03 26 12 01 48N425112774","startDate":"8 April 2025","endDate":"8 January 2027","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07059 769 782","emailAddress":"alexandra.page@blueyonder.co.uk"},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"887 536 5941","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"8 August 1990","day":8,"month":7,"year":1990},"checking":false,"certificateReference":"02 450 217 481","channel":"Paper","imageReference":"2026 03 26 12 01 59N210830096","startDate":"18 September 2025","endDate":"18 June 2027","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07060 871 893","emailAddress":"natalie.jordan@outlook.com"},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"679 719 9262","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"11 February 1987","day":11,"month":1,"year":1987},"checking":false,"certificateReference":"HRT RCB3 YQI4","channel":"Digital","startDate":"27 August 2025","endDate":"27 May 2027","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07071 982 914","emailAddress":"beth.barrett@gmail.com"},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"206 896 4142","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"16 July 1990","day":16,"month":6,"year":1990},"checking":false,"certificateReference":"59 589 200 768","channel":"Paper","imageReference":"2026 03 26 12 01 59N489838566","startDate":"12 May 2025","endDate":"12 February 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07082 093 125","emailAddress":"mollie.hayes@gmail.com"},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"896 203 0656","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"24 December 1995","day":24,"month":11,"year":1995},"checking":true,"certificateReference":"71 427 236 511","channel":"Paper","imageReference":"2026 03 26 12 01 59N398039561","startDate":"18 July 2025","endDate":"18 April 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07093 114 236","emailAddress":"francesca.cunningham@blueyonder.co.uk","checkType":"supervisor"},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"857 095 6917","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"18 June 1988","day":18,"month":5,"year":1988},"checking":false,"certificateReference":"HRT HMCJ KV9Y","channel":"Digital","imageReference":"2026 03 26 12 01 48N061110632","startDate":"5 June 2025","endDate":"5 March 2027","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07014 225 347","emailAddress":"amelie.barber282@googlemail.com"},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"319 082 6118","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"21 May 1998","day":21,"month":4,"year":1998},"checking":false,"certificateReference":"94 474 195 998","channel":"Paper","startDate":"22 September 2025","endDate":"22 June 2027","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07025 336 458","imageReference":"2026 03 26 12 01 59N707657150"},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"996 231 1235","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"27 July 1990","day":27,"month":6,"year":1990},"checking":true,"certificateReference":"65 920 826 698","channel":"Paper","startDate":"30 August 2025","endDate":"30 May 2027","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07036 447 569","emailAddress":"eden.parsons@gmail.com","checkType":"supervisor","imageReference":"2026 03 26 12 01 59N157711545"},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"227 490 6839","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"16 September 1988","day":16,"month":8,"year":1988},"checking":false,"certificateReference":"83 284 994 495","channel":"Paper","startDate":"30 July 2025","endDate":"30 April 2027","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07047 558 671","emailAddress":"tilly.bates@gmail.com","imageReference":"2026 03 26 12 01 59N579679750"},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"239 906 2696","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"5 November 2005","day":5,"month":10,"year":2005},"checking":true,"certificateReference":"80 972 508 537","channel":"Paper","imageReference":"2026 03 26 12 01 59N694194621","startDate":"1 July 2025","endDate":"1 April 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07047 813 256","emailAddress":"day.h@outlook.com","checkType":"supervisor"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"260 427 2013","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"12 May 1968","day":12,"month":4,"year":1968},"checking":false,"certificateReference":"HRT 9DO6 D7U7","channel":"Digital","startDate":"8 July 2025","endDate":"8 April 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07096 414 237","emailAddress":"francis.i@googlemail.com"},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"630 015 6477","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"10 July 1968","day":10,"month":6,"year":1968},"checking":false,"checkType":"supervisor","certificateReference":"HRT NOXM TONQ","channel":"Digital","imageReference":"2026 03 26 12 01 48N667217350","startDate":"20 September 2025","endDate":"20 June 2027","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07029 384 756","emailAddress":"h.burton@blueyonder.co.uk"}]';
    let returnPatientData = patientData;

    if (code) {

      patientData = JSON.parse(patientData);

      const loop = patientData.length;

      for (let i = 0; i < loop; i++) {
        if (String(patientData[i].id) === code) {
          returnPatientData = patientData[i];
          break;
        }
      }

    }

    // Generate new patient data from 'data-patients.html'
    return returnPatientData;
  };




  //
  // RANDOMISE AND CONVERT TO LIST
  //
  filters.randomiseAndConvertToList = function (arr) {


    arr = (Array.isArray(arr) && arr.length > 0) ? arr : ['Provide an array with at least one item'];

    const selected = [];
    arr.forEach(function (el) {
      if (Math.round(Math.random() * 2) === 0) {
        selected.push(el);
      }
    });

    if (selected.length === 0) {
      selected.push(arr[0]);
    }

    let html = '<ul class="nhsuk-list nhsuk-list--bullet nhsuk-u-margin-bottom-4">';
    selected.forEach(function (el) {
      html += '<li class="nhsuk-u-font-size-16">' + el + '</li>';
    });
    html += '</ul>';

    return html;


  };



  //
  // IS APPLICATION OR CERTIFICATE FILTER
  //
  filters.isApplicationOrCertificate = function( status ){

    let document = 'application';

    if( status ){
      if( status === 'active' || status === 'expired' || status === 'deleted' ){
        document = 'certificate';
      }
    }

    return document;

  }



  return filters
}

/**
 * @import { Environment } from 'nunjucks'
 */
