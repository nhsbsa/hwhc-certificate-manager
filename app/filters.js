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
              link = 'process-application/review-application--horizontal-labels?patientID=' + patient.id;
            } else if( role === 'qualityControl' ) {
              link = patient.certificateType + '/case--view--cannot-edit?patientID=' + patient.id;
            } else {
              link = patient.certificateType + '/case--view--can-edit?patientID=' + patient.id;
            }

            break;

          case 'rejected':

            link = patient.certificateType + '/case--view--cannot-edit?patientID=' + patient.id;
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
  // PROCESS DATE FILTER
  //
  filters.processDate = function () {
    return '12 September 1999';
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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"490 068 3476","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"9 May 1980","day":9,"month":4,"year":1980},"checking":false,"certificateReference":"HRT QJJU NNRR","channel":"Digital","startDate":"14 April 2025","endDate":"14 January 2027","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"}},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"302 992 6134","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"22 December 1998","day":22,"month":11,"year":1998},"checking":true,"checkType":"supervisor","certificateReference":"08 395 402 731","channel":"Paper","imageReference":"2026 03 20 15 14 59N830293051","startDate":"8 April 2025","endDate":"8 January 2027","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"}},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"398 037 5585","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"11 January 2006","day":11,"month":0,"year":2006},"checking":true,"checkType":"quality","certificateReference":"81 553 841 887","channel":"Paper","imageReference":"2026 03 20 15 14 59N288429034","startDate":"16 April 2025","endDate":"16 January 2027","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"}},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"315 021 5396","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"22 October 1996","day":22,"month":9,"year":1996},"checking":false,"certificateReference":"08 117 431 336","channel":"Digital","startDate":"1 June 2025","endDate":"1 March 2027","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"}},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"789 560 5762","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"16 April 1993","day":16,"month":3,"year":1993},"checking":true,"checkType":"supervisor","certificateReference":"39 640 536 283","channel":"Paper","imageReference":"2026 03 20 15 14 59N046547730","startDate":"4 May 2025","endDate":"4 February 2027","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"}},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"954 170 5731","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"19 November 1977","day":19,"month":10,"year":1977},"checking":false,"certificateReference":"HRT LZSP NNFZ","channel":"Digital","startDate":"5 August 2025","endDate":"5 May 2027","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"}},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"172 785 1819","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"2 February 2002","day":2,"month":1,"year":2002},"checking":true,"checkType":"quality","certificateReference":"88 660 829 858","channel":"Paper","imageReference":"2026 03 20 15 14 59N366234069","startDate":"20 June 2025","endDate":"20 March 2027","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"}},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"093 834 1921","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"7 November 1991","day":7,"month":10,"year":1991},"checking":false,"certificateReference":"76 676 185 177","channel":"Digital","startDate":"28 July 2025","endDate":"28 April 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"}},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"635 077 5414","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"2 November 1990","day":2,"month":10,"year":1990},"checking":true,"checkType":"supervisor","certificateReference":"03 711 273 831","channel":"Paper","imageReference":"2026 03 20 15 14 59N543219421","startDate":"5 August 2025","endDate":"5 May 2027","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"}},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"897 843 8518","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"3 June 1991","day":3,"month":5,"year":1991},"checking":false,"certificateReference":"28 394 405 772","channel":"Paper","imageReference":"2026 03 20 15 14 59N202671725","startDate":"24 April 2025","endDate":"24 January 2027","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"}},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"533 156 9569","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"22 July 1995","day":22,"month":6,"year":1995},"checking":true,"checkType":"supervisor","certificateReference":"20 851 116 440","channel":"Paper","imageReference":"2026 03 20 15 14 59N450353249","startDate":"30 June 2025","endDate":"30 March 2027","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"}},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"231 608 2088","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"24 June 1990","day":24,"month":5,"year":1990},"checking":false,"certificateReference":"18 493 283 391","channel":"Paper","imageReference":"2026 03 20 15 14 59N258626224","startDate":"27 June 2025","endDate":"27 March 2027","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"}},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"598 512 1460","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"27 June 2002","day":27,"month":5,"year":2002},"checking":false,"certificateReference":"79 704 532 181","channel":"Paper","imageReference":"2026 03 20 15 14 59N667226376","startDate":"28 August 2025","endDate":"28 May 2027","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"}},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"058 048 0433","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"15 April 1996","day":15,"month":3,"year":1996},"checking":false,"certificateReference":"92 568 814 483","channel":"Paper","imageReference":"2026 03 20 15 14 59N017248448","startDate":"24 March 2025","endDate":"24 December 2026","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"}},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"574 983 6089","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"14 March 1974","day":14,"month":2,"year":1974},"checking":false,"certificateReference":"HRT NZK3 MP2G","channel":"Digital","startDate":"29 March 2025","endDate":"29 December 2026","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"}},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"446 628 5882","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"10 January 1968","day":10,"month":0,"year":1968},"checking":false,"certificateReference":"HRT W2GY RKXQ","channel":"Pharmacy","startDate":"2 June 2025","endDate":"2 March 2027","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"}},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"563 624 8232","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"17 August 1996","day":17,"month":7,"year":1996},"checking":true,"checkType":"supervisor","certificateReference":"94 519 673 181","channel":"Paper","imageReference":"2026 03 20 15 14 59N058484285","startDate":"9 June 2025","endDate":"9 March 2027","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"}},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"630 794 5312","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"13 March 1969","day":13,"month":2,"year":1969},"checking":false,"certificateReference":"HRT 9WMP F03S","channel":"Digital","startDate":"16 September 2025","endDate":"16 June 2027","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"}},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"010 684 2786","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"3 May 1985","day":3,"month":4,"year":1985},"checking":false,"certificateReference":"HRT B06R E4EQ","channel":"Digital","startDate":"1 June 2025","endDate":"1 March 2027","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"}},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"641 300 5894","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"23 October 2001","day":23,"month":9,"year":2001},"checking":true,"checkType":"supervisor","certificateReference":"35 273 253 624","channel":"Paper","imageReference":"2026 03 20 15 14 59N527390348","startDate":"20 May 2025","endDate":"20 February 2027","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"}},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"317 175 5100","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"14 June 2008","day":14,"month":5,"year":2008},"checking":false,"certificateReference":"66 047 299 440","channel":"Paper","imageReference":"2026 03 20 15 14 59N068624806","startDate":"16 July 2025","endDate":"16 April 2027","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"}},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"454 190 9133","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"17 April 1990","day":17,"month":3,"year":1990},"checking":false,"certificateReference":"25 917 255 453","channel":"Digital","startDate":"2 May 2025","endDate":"2 February 2027","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"}},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"407 075 5783","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"18 October 1991","day":18,"month":9,"year":1991},"checking":false,"certificateReference":"HRT 6BBQ IUNQ","channel":"Digital","startDate":"13 June 2025","endDate":"13 March 2027","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"}},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"831 406 6461","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"13 January 1992","day":13,"month":0,"year":1992},"checking":false,"certificateReference":"62 745 802 856","channel":"Paper","imageReference":"2026 03 20 15 14 59N573735655","startDate":"17 August 2025","endDate":"17 May 2027","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"}},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"759 557 0911","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"11 April 1979","day":11,"month":3,"year":1979},"checking":false,"certificateReference":"HRT 9SHM 3U81","channel":"Digital","startDate":"10 June 2025","endDate":"10 March 2027","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"}},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"363 655 0488","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"7 January 1986","day":7,"month":0,"year":1986},"checking":false,"certificateReference":"HRT OHOL 0QDD","channel":"Telephony","startDate":"13 September 2025","endDate":"13 June 2027","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"}},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"030 439 6016","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"16 July 1999","day":16,"month":6,"year":1999},"checking":true,"checkType":"supervisor","certificateReference":"18 802 572 046","channel":"Paper","imageReference":"2026 03 20 15 14 59N941892855","startDate":"4 May 2025","endDate":"4 February 2027","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"}},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"084 360 5289","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"6 October 2005","day":6,"month":9,"year":2005},"checking":true,"checkType":"quality","certificateReference":"56 709 832 371","channel":"Paper","imageReference":"2026 03 20 15 14 59N216847508","startDate":"29 August 2025","endDate":"29 May 2027","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"}},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"413 533 1750","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"26 May 1979","day":26,"month":4,"year":1979},"checking":false,"certificateReference":"HRT VPXI 0W3T","channel":"Telephony","startDate":"14 August 2025","endDate":"14 May 2027","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"}},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"906 280 1625","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"processing","dateOfBirth":{"display":"22 December 1992","day":22,"month":11,"year":1992},"checking":false,"certificateReference":"12 675 347 984","channel":"Paper","imageReference":"2026 03 20 15 14 59N432684535","startDate":"29 March 2025","endDate":"29 December 2026","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"}},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"494 452 6412","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"6 December 1989","day":6,"month":11,"year":1989},"checking":false,"certificateReference":"06 801 097 480","channel":"Paper","imageReference":"2026 03 20 15 14 59N870003171","startDate":"13 April 2025","endDate":"13 January 2027","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"}},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"733 479 5195","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"13 October 1990","day":13,"month":9,"year":1990},"checking":true,"checkType":"supervisor","certificateReference":"10 500 758 600","channel":"Paper","imageReference":"2026 03 20 15 14 59N118886096","startDate":"13 April 2025","endDate":"13 January 2027","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"}},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"245 919 0008","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"4 October 1997","day":4,"month":9,"year":1997},"checking":true,"checkType":"quality","certificateReference":"68 164 276 619","channel":"Paper","imageReference":"2026 03 20 15 14 59N729309426","startDate":"13 September 2025","endDate":"13 June 2027","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"}},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"490 926 6521","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"12 March 1994","day":12,"month":2,"year":1994},"checking":true,"checkType":"supervisor","certificateReference":"83 305 263 977","channel":"Paper","imageReference":"2026 03 20 15 14 59N497735437","startDate":"21 June 2025","endDate":"21 March 2027","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"}},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"587 459 1856","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"23 August 1997","day":23,"month":7,"year":1997},"checking":false,"certificateReference":"35 557 988 390","channel":"Paper","imageReference":"2026 03 20 15 14 59N527379439","startDate":"7 May 2025","endDate":"7 February 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"499 509 0845","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"23 November 1992","day":23,"month":10,"year":1992},"checking":false,"certificateReference":"HRT 8WF5 GW7W","channel":"Pharmacy","startDate":"23 July 2025","endDate":"23 April 2027","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"}},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"521 971 7867","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"expired","dateOfBirth":{"display":"18 February 1991","day":18,"month":1,"year":1991},"checking":false,"certificateReference":"56 417 742 849","channel":"Paper","imageReference":"2026 03 20 15 14 59N381557130","startDate":"28 May 2025","endDate":"28 February 2027","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"}},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"392 324 5667","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"26 November 1979","day":26,"month":10,"year":1979},"checking":false,"certificateReference":"HRT BBI8 025V","channel":"Digital","startDate":"7 July 2025","endDate":"7 April 2027","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"}},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"389 291 9124","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"1 March 1989","day":1,"month":2,"year":1989},"checking":false,"certificateReference":"HRT FUSM LBRU","channel":"Digital","startDate":"14 May 2025","endDate":"14 February 2027","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"}},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"933 138 6482","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"27 June 1989","day":27,"month":5,"year":1989},"checking":false,"certificateReference":"HRT V3KV 0S3K","channel":"Digital","startDate":"31 July 2025","endDate":"1 May 2027","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"}},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"126 290 1031","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"22 June 2003","day":22,"month":5,"year":2003},"checking":false,"certificateReference":"07 020 571 376","channel":"Paper","imageReference":"2026 03 20 15 14 59N607422391","startDate":"10 July 2025","endDate":"10 April 2027","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"}},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"825 791 1151","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"10 March 1989","day":10,"month":2,"year":1989},"checking":false,"certificateReference":"46 176 229 936","channel":"Digital","startDate":"30 July 2025","endDate":"30 April 2027","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"}},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"790 647 5347","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"3 May 1993","day":3,"month":4,"year":1993},"checking":true,"checkType":"supervisor","certificateReference":"44 809 035 200","channel":"Paper","imageReference":"2026 03 20 15 14 59N316949320","startDate":"8 July 2025","endDate":"8 April 2027","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"}},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"082 653 8774","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"19 August 1994","day":19,"month":7,"year":1994},"checking":true,"checkType":"supervisor","certificateReference":"41 942 459 499","channel":"Paper","imageReference":"2026 03 20 15 14 59N364898877","startDate":"13 May 2025","endDate":"13 February 2027","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"}},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"461 436 8648","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"11 March 1994","day":11,"month":2,"year":1994},"checking":false,"certificateReference":"72 259 804 673","channel":"Digital","startDate":"24 August 2025","endDate":"24 May 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"}},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"540 797 9198","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"12 September 1982","day":12,"month":8,"year":1982},"checking":false,"certificateReference":"HRT G67E D3HN","channel":"Digital","startDate":"26 March 2025","endDate":"26 December 2026","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"}},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"077 566 4321","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"2 October 1999","day":2,"month":9,"year":1999},"checking":false,"certificateReference":"90 865 230 514","channel":"Digital","startDate":"29 April 2025","endDate":"29 January 2027","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"}},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"102 526 7205","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"15 July 1993","day":15,"month":6,"year":1993},"checking":false,"certificateReference":"HRT OOK0 EF0Q","channel":"Digital","startDate":"8 September 2025","endDate":"8 June 2027","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"}},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"317 659 0774","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"13 March 1994","day":13,"month":2,"year":1994},"checking":false,"certificateReference":"22 244 960 697","channel":"Paper","imageReference":"2026 03 20 15 14 59N620188357","startDate":"30 March 2025","endDate":"30 December 2026","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"}},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"184 469 4773","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"10 November 1993","day":10,"month":10,"year":1993},"checking":false,"certificateReference":"HRT 1XSX 3557","channel":"Digital","startDate":"13 May 2025","endDate":"13 February 2027","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"}},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"555 096 0231","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"20 October 1987","day":20,"month":9,"year":1987},"checking":false,"certificateReference":"HRT VVZQ 0YCZ","channel":"Digital","startDate":"25 March 2025","endDate":"25 December 2026","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"}},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"482 917 4708","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"8 December 1986","day":8,"month":11,"year":1986},"checking":false,"certificateReference":"HRT 8VBF 4COJ","channel":"Digital","startDate":"30 May 2025","endDate":"2 March 2027","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"}},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"880 474 5068","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"19 September 2005","day":19,"month":8,"year":2005},"checking":true,"checkType":"supervisor","certificateReference":"41 244 388 795","channel":"Paper","imageReference":"2026 03 20 15 14 59N892436105","startDate":"1 June 2025","endDate":"1 March 2027","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"}},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"881 544 4981","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"26 December 1991","day":26,"month":11,"year":1991},"checking":false,"certificateReference":"HRT 40CR X3Y4","channel":"Digital","startDate":"17 September 2025","endDate":"17 June 2027","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"}},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"967 845 4539","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"18 September 1998","day":18,"month":8,"year":1998},"checking":true,"checkType":"supervisor","certificateReference":"75 926 351 615","channel":"Paper","imageReference":"2026 03 20 15 14 59N791382835","startDate":"15 July 2025","endDate":"15 April 2027","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"}},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"159 481 9529","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"24 January 1983","day":24,"month":0,"year":1983},"checking":false,"certificateReference":"HRT 8T4Y 8RNU","channel":"Digital","startDate":"9 June 2025","endDate":"9 March 2027","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"}},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"925 914 8276","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"6 May 1993","day":6,"month":4,"year":1993},"checking":false,"certificateReference":"05 048 461 837","channel":"Paper","imageReference":"2026 03 20 15 14 59N133210993","startDate":"2 May 2025","endDate":"2 February 2027","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"}},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"157 281 2030","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"27 September 2005","day":27,"month":8,"year":2005},"checking":true,"checkType":"supervisor","certificateReference":"61 475 451 885","channel":"Paper","imageReference":"2026 03 20 15 14 59N093913515","startDate":"11 September 2025","endDate":"11 June 2027","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"}},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"501 583 7339","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"expired","dateOfBirth":{"display":"11 March 2007","day":11,"month":2,"year":2007},"checking":false,"certificateReference":"48 877 312 235","channel":"Digital","startDate":"21 June 2025","endDate":"21 March 2027","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"}},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"779 633 1625","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"22 August 1979","day":22,"month":7,"year":1979},"checking":false,"certificateReference":"HRT 6J86 HSFC","channel":"Digital","startDate":"31 July 2025","endDate":"1 May 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"}},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"466 631 1901","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"10 May 1978","day":10,"month":4,"year":1978},"checking":false,"certificateReference":"HRT GQ6I OS46","channel":"Digital","startDate":"29 July 2025","endDate":"29 April 2027","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"}},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"599 132 5929","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"3 December 2005","day":3,"month":11,"year":2005},"checking":true,"checkType":"supervisor","certificateReference":"91 938 358 590","channel":"Paper","imageReference":"2026 03 20 15 14 59N432926022","startDate":"21 July 2025","endDate":"21 April 2027","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"}},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"034 228 4088","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"1 December 1984","day":1,"month":11,"year":1984},"checking":false,"certificateReference":"HRT 3B8C J0JD","channel":"Digital","startDate":"19 May 2025","endDate":"19 February 2027","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"}},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"385 510 4847","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"7 August 1988","day":7,"month":7,"year":1988},"checking":false,"certificateReference":"HRT 4U5R ZMMD","channel":"Digital","startDate":"2 August 2025","endDate":"2 May 2027","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"}},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"569 367 5177","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"10 December 1995","day":10,"month":11,"year":1995},"checking":false,"certificateReference":"HRT US6Y BTBH","channel":"Digital","startDate":"5 April 2025","endDate":"5 January 2027","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"}},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"031 275 8507","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"1 December 1993","day":1,"month":11,"year":1993},"checking":false,"certificateReference":"27 304 430 427","channel":"Paper","imageReference":"2026 03 20 15 14 59N770159524","startDate":"9 September 2025","endDate":"9 June 2027","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"}},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"109 803 6868","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"22 August 1979","day":22,"month":7,"year":1979},"checking":false,"certificateReference":"HRT 1P1N Q3PT","channel":"Digital","startDate":"7 September 2025","endDate":"7 June 2027","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"}},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"221 629 8536","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"13 April 1967","day":13,"month":3,"year":1967},"checking":false,"certificateReference":"HRT I4WO DIAV","channel":"Digital","startDate":"24 August 2025","endDate":"24 May 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"}},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"758 552 4282","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"24 September 1973","day":24,"month":8,"year":1973},"checking":false,"certificateReference":"HRT AIRM I50V","channel":"Digital","startDate":"18 July 2025","endDate":"18 April 2027","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"}},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"017 368 2924","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"6 November 2000","day":6,"month":10,"year":2000},"checking":true,"checkType":"supervisor","certificateReference":"90 932 859 480","channel":"Paper","imageReference":"2026 03 20 15 14 59N338762168","startDate":"22 April 2025","endDate":"22 January 2027","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"}},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"499 996 8725","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"12 January 1987","day":12,"month":0,"year":1987},"checking":false,"certificateReference":"HRT 098H 3M40","channel":"Digital","startDate":"12 August 2025","endDate":"12 May 2027","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"}},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"454 080 3327","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"28 April 1993","day":28,"month":3,"year":1993},"checking":false,"certificateReference":"09 913 703 906","channel":"Paper","imageReference":"2026 03 20 15 14 59N332645975","startDate":"5 June 2025","endDate":"5 March 2027","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"}},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"301 828 7214","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"13 October 2002","day":13,"month":9,"year":2002},"checking":false,"certificateReference":"10 358 155 071","channel":"Paper","imageReference":"2026 03 20 15 14 59N948857249","startDate":"14 June 2025","endDate":"14 March 2027","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"}},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"388 419 7806","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"6 September 1981","day":6,"month":8,"year":1981},"checking":false,"certificateReference":"HRT BYUJ VK0L","channel":"Digital","startDate":"2 August 2025","endDate":"2 May 2027","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"}},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"165 414 5293","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"25 October 2005","day":25,"month":9,"year":2005},"checking":true,"checkType":"supervisor","certificateReference":"53 870 643 950","channel":"Paper","imageReference":"2026 03 20 15 14 59N141225976","startDate":"15 September 2025","endDate":"15 June 2027","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"}},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"728 443 8786","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"21 July 1989","day":21,"month":6,"year":1989},"checking":false,"certificateReference":"HRT 0867 NMWM","channel":"Digital","startDate":"18 August 2025","endDate":"18 May 2027","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"}},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"058 793 8167","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"15 April 2000","day":15,"month":3,"year":2000},"checking":false,"certificateReference":"92 952 697 378","channel":"Paper","imageReference":"2026 03 20 15 14 59N362707844","startDate":"9 June 2025","endDate":"9 March 2027","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"}},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"787 102 5802","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"8 August 1994","day":8,"month":7,"year":1994},"checking":false,"certificateReference":"HRT QYUI IS0K","channel":"Digital","startDate":"16 April 2025","endDate":"16 January 2027","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"}},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"852 545 4599","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"7 July 1978","day":7,"month":6,"year":1978},"checking":false,"certificateReference":"HRT GD76 HH1X","channel":"Digital","startDate":"7 July 2025","endDate":"7 April 2027","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"}},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"124 668 5179","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"4 May 1989","day":4,"month":4,"year":1989},"checking":false,"certificateReference":"HRT PY5B TUVJ","channel":"Digital","startDate":"17 July 2025","endDate":"17 April 2027","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"}},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"558 241 5528","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"13 March 1995","day":13,"month":2,"year":1995},"checking":false,"certificateReference":"17 362 272 031","channel":"Digital","startDate":"5 May 2025","endDate":"5 February 2027","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"}},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"086 320 5878","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"9 July 2005","day":9,"month":6,"year":2005},"checking":false,"certificateReference":"22 509 889 908","channel":"Digital","startDate":"3 May 2025","endDate":"3 February 2027","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"}},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"887 133 1083","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"3 January 1989","day":3,"month":0,"year":1989},"checking":false,"certificateReference":"39 351 535 092","channel":"Paper","imageReference":"2026 03 20 15 14 59N808802543","startDate":"26 May 2025","endDate":"26 February 2027","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"}},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"251 283 4788","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"6 October 2002","day":6,"month":9,"year":2002},"checking":false,"certificateReference":"05 241 120 320","channel":"Paper","imageReference":"2026 03 20 15 14 59N663130418","startDate":"25 July 2025","endDate":"25 April 2027","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"}},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"495 006 9321","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"3 June 1967","day":3,"month":5,"year":1967},"checking":false,"certificateReference":"HRT 8QTR G08Y","channel":"Digital","startDate":"14 August 2025","endDate":"14 May 2027","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"}},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"614 212 3929","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"22 August 1981","day":22,"month":7,"year":1981},"checking":false,"certificateReference":"HRT EDAB B2IB","channel":"Digital","startDate":"19 April 2025","endDate":"19 January 2027","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"}},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"802 404 9898","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"26 March 1978","day":26,"month":2,"year":1978},"checking":false,"certificateReference":"HRT 0O50 Y0EY","channel":"Pharmacy","startDate":"22 June 2025","endDate":"22 March 2027","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"}},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"517 527 0176","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"27 October 1996","day":27,"month":9,"year":1996},"checking":true,"checkType":"supervisor","certificateReference":"17 930 745 848","channel":"Paper","imageReference":"2026 03 20 15 14 59N018003666","startDate":"4 June 2025","endDate":"4 March 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"}},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"603 704 8176","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"5 February 1975","day":5,"month":1,"year":1975},"checking":false,"certificateReference":"HRT LQ40 7HX6","channel":"Telephony","startDate":"6 August 2025","endDate":"6 May 2027","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"}},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"363 819 0538","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"27 December 1976","day":27,"month":11,"year":1976},"checking":false,"certificateReference":"HRT CXLG KBJF","channel":"Digital","startDate":"2 May 2025","endDate":"2 February 2027","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"}},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"814 975 3490","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"27 May 1984","day":27,"month":4,"year":1984},"checking":false,"certificateReference":"HRT LN1V NEPC","channel":"Digital","startDate":"10 September 2025","endDate":"10 June 2027","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"}},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"648 951 6016","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"19 November 2007","day":19,"month":10,"year":2007},"checking":true,"checkType":"supervisor","certificateReference":"38 481 118 810","channel":"Paper","imageReference":"2026 03 20 15 14 59N517050701","startDate":"14 August 2025","endDate":"14 May 2027","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"}},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"961 027 0215","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"28 August 1989","day":28,"month":7,"year":1989},"checking":false,"certificateReference":"94 206 043 650","channel":"Digital","startDate":"26 April 2025","endDate":"26 January 2027","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"}},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"691 105 8264","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"1 January 1970","day":1,"month":0,"year":1970},"checking":false,"certificateReference":"HRT OP0X MKWU","channel":"Digital","startDate":"23 June 2025","endDate":"23 March 2027","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"}},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"242 633 9531","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"24 May 2003","day":24,"month":4,"year":2003},"checking":false,"certificateReference":"45 025 100 302","channel":"Paper","imageReference":"2026 03 20 15 14 59N492092081","startDate":"10 June 2025","endDate":"10 March 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"296 755 2753","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"19 May 2008","day":19,"month":4,"year":2008},"checking":true,"checkType":"supervisor","certificateReference":"31 588 420 225","channel":"Paper","imageReference":"2026 03 20 15 14 59N039770168","startDate":"5 June 2025","endDate":"5 March 2027","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"}},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"568 466 4953","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"17 August 1992","day":17,"month":7,"year":1992},"checking":false,"certificateReference":"HRT S3DJ FOZW","channel":"Digital","startDate":"6 July 2025","endDate":"6 April 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"770 957 4873","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"23 August 1969","day":23,"month":7,"year":1969},"checking":false,"certificateReference":"HRT JGGN 8NLP","channel":"Digital","startDate":"12 August 2025","endDate":"12 May 2027","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"}},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"127 772 5296","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"14 November 2004","day":14,"month":10,"year":2004},"checking":true,"checkType":"supervisor","certificateReference":"46 472 596 864","channel":"Paper","imageReference":"2026 03 20 15 14 59N322720826","startDate":"7 July 2025","endDate":"7 April 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"}},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"938 407 3657","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"21 June 1998","day":21,"month":5,"year":1998},"checking":true,"checkType":"supervisor","certificateReference":"07 855 526 037","channel":"Paper","imageReference":"2026 03 20 15 14 59N570533140","startDate":"14 May 2025","endDate":"14 February 2027","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"}},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"259 414 1178","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"18 October 2003","day":18,"month":9,"year":2003},"checking":false,"certificateReference":"55 186 457 909","channel":"Digital","startDate":"5 September 2025","endDate":"5 June 2027","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"}},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"413 420 5215","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"26 March 1991","day":26,"month":2,"year":1991},"checking":true,"checkType":"supervisor","certificateReference":"92 458 642 619","channel":"Paper","imageReference":"2026 03 20 15 14 59N746379393","startDate":"7 June 2025","endDate":"7 March 2027","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"}},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"166 153 1200","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"21 September 1982","day":21,"month":8,"year":1982},"checking":false,"certificateReference":"HRT UZUF K2M5","channel":"Digital","startDate":"27 March 2025","endDate":"27 December 2026","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"}}]';
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
