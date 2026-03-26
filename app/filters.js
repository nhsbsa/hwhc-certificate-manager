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
              link = 'process-application/review-application--horizontal-labels--on-hold?patientID=' + patient.id;
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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"189 854 0979","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"19 December 1995","day":19,"month":11,"year":1995},"checking":false,"certificateReference":"HRT AB23 N2HW","channel":"Digital","startDate":"21 May 2025","endDate":"21 February 2027","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07031 284 591","emailAddress":"o.smith@hotmail.com"},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"614 371 5652","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"11 January 2006","day":11,"month":0,"year":2006},"checking":true,"checkType":"supervisor","certificateReference":"17 566 303 026","channel":"Paper","imageReference":"2026 03 26 10 35 07N995456650","startDate":"18 July 2025","endDate":"18 April 2027","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07049 823 716","emailAddress":"amelia.jones@blueyonder.co.uk"},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"857 990 7650","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"17 January 1994","day":17,"month":0,"year":1994},"checking":true,"checkType":"supervisor","certificateReference":"07 158 331 018","channel":"Paper","imageReference":"2026 03 26 10 35 07N686601646","startDate":"22 April 2025","endDate":"22 January 2027","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 395 184","emailAddress":"i.taylor@googlemail.com"},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"614 033 0439","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"5 February 2006","day":5,"month":1,"year":2006},"checking":true,"checkType":"supervisor","certificateReference":"40 712 399 934","channel":"Paper","imageReference":"2026 03 26 10 35 07N762533118","startDate":"12 August 2025","endDate":"12 May 2027","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07071 528 439","emailAddress":"ava.brown@blueyonder.co.uk"},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"754 031 0588","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"5 May 2002","day":5,"month":4,"year":2002},"checking":false,"certificateReference":"40 978 709 607","channel":"Paper","imageReference":"2026 03 26 10 35 07N115863271","startDate":"29 March 2025","endDate":"29 December 2026","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07083 916 275"},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"256 579 7341","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"15 August 2007","day":15,"month":7,"year":2007},"checking":false,"certificateReference":"33 216 609 853","channel":"Paper","imageReference":"2026 03 26 10 35 07N094769829","startDate":"24 September 2025","endDate":"24 June 2027","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07092 475 318"},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"091 543 8868","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"3 February 1992","day":3,"month":1,"year":1992},"checking":true,"checkType":"supervisor","certificateReference":"32 283 778 812","channel":"Paper","imageReference":"2026 03 26 10 35 07N886232106","startDate":"14 August 2025","endDate":"14 May 2027","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07015 648 293","emailAddress":"davies.m@blueyonder.co.uk"},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"028 328 1403","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"14 February 1973","day":14,"month":1,"year":1973},"checking":false,"certificateReference":"HRT ORRM RFL0","channel":"Digital","startDate":"17 April 2025","endDate":"17 January 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 751 964","emailAddress":"ella.evans@googlemail.com"},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"081 011 6573","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"processing","dateOfBirth":{"display":"23 November 1997","day":23,"month":10,"year":1997},"checking":false,"certificateReference":"30 211 395 675","channel":"Paper","imageReference":"2026 03 26 10 35 07N214875394","startDate":"26 June 2025","endDate":"26 March 2027","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07036 592 817","emailAddress":"Thomas844@gmail.com"},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"942 265 3030","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"9 August 1994","day":9,"month":7,"year":1994},"checking":true,"checkType":"supervisor","certificateReference":"51 974 042 810","channel":"Paper","imageReference":"2026 03 26 10 35 07N016621682","startDate":"31 July 2025","endDate":"1 May 2027","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07047 813 256","emailAddress":"lily.roberts@hotmail.com"},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"482 976 3587","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"23 April 1992","day":23,"month":3,"year":1992},"checking":false,"certificateReference":"25 121 727 121","channel":"Digital","startDate":"17 July 2025","endDate":"17 April 2027","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07051 294 783","emailAddress":"f.johnson@blueyonder.co.uk"},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"407 068 2765","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"21 January 1997","day":21,"month":0,"year":1997},"checking":false,"certificateReference":"56 427 075 773","channel":"Paper","imageReference":"2026 03 26 10 35 07N149284522","startDate":"8 June 2025","endDate":"8 March 2027","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07063 418 592"},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"292 860 8095","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"20 June 1989","day":20,"month":5,"year":1989},"checking":false,"certificateReference":"HRT H9UL EB4W","channel":"Digital","startDate":"5 June 2025","endDate":"5 March 2027","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07075 928 341","emailAddress":"walker.i@gmail.com"},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"830 929 2898","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"2 January 1989","day":2,"month":0,"year":1989},"checking":false,"certificateReference":"HRT HUDN 0U7G","channel":"Digital","startDate":"9 August 2025","endDate":"9 May 2027","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07084 372 659","emailAddress":"d.hall129@gmail.com"},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"672 849 0118","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"14 August 1989","day":14,"month":7,"year":1989},"checking":true,"checkType":"supervisor","certificateReference":"94 112 266 158","channel":"Paper","imageReference":"2026 03 26 10 35 07N247869851","startDate":"5 May 2025","endDate":"5 February 2027","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07091 837 426","emailAddress":"clarke.e@outlook.com"},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"789 766 5405","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"14 October 1984","day":14,"month":9,"year":1984},"checking":false,"certificateReference":"HRT Q11O A5UW","channel":"Digital","startDate":"5 July 2025","endDate":"5 April 2027","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 385 927","emailAddress":"allen.p@hotmail.com"},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"271 182 5676","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"15 December 1971","day":15,"month":11,"year":1971},"checking":false,"certificateReference":"HRT FOO3 BKK2","channel":"Digital","startDate":"22 July 2025","endDate":"22 April 2027","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07027 639 485","emailAddress":"sophie.young@googlemail.com"},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"021 613 7212","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"18 October 1987","day":18,"month":9,"year":1987},"checking":false,"certificateReference":"HRT HZ4S SIVZ","channel":"Digital","startDate":"20 August 2025","endDate":"20 May 2027","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07035 821 749","emailAddress":"h.king403@googlemail.com"},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"352 157 0869","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"9 September 1992","day":9,"month":8,"year":1992},"checking":false,"certificateReference":"HRT 2AI5 MZ0G","channel":"Digital","startDate":"27 July 2025","endDate":"27 April 2027","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07048 952 613","emailAddress":"m.wright566@blueyonder.co.uk"},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"752 631 5370","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"8 December 1993","day":8,"month":11,"year":1993},"checking":false,"certificateReference":"63 713 182 583","channel":"Digital","startDate":"19 May 2025","endDate":"19 February 2027","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07052 719 384","emailAddress":"ella-rose.green@gmail.com"},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"019 139 2406","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"26 August 2001","day":26,"month":7,"year":2001},"checking":true,"checkType":"quality","certificateReference":"51 539 823 331","channel":"Paper","imageReference":"2026 03 26 10 35 07N245160643","startDate":"14 May 2025","endDate":"14 February 2027","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07064 837 295","emailAddress":"poppy.baker@outlook.com"},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"161 615 0196","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"7 March 1990","day":7,"month":2,"year":1990},"checking":true,"checkType":"supervisor","certificateReference":"03 454 850 208","channel":"Paper","imageReference":"2026 03 26 10 35 07N218496490","startDate":"14 July 2025","endDate":"14 April 2027","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07073 491 826","emailAddress":"ruby.adams@outlook.com"},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"533 919 6206","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"23 May 1967","day":23,"month":4,"year":1967},"checking":false,"certificateReference":"HRT SM2X HPWJ","channel":"Pharmacy","startDate":"15 April 2025","endDate":"15 January 2027","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07085 623 941","emailAddress":"chloe.mitchell@googlemail.com"},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"283 930 3716","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"22 December 1990","day":22,"month":11,"year":1990},"checking":false,"certificateReference":"HRT 44XW 7FE3","channel":"Digital","startDate":"28 June 2025","endDate":"28 March 2027","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07096 718 235","emailAddress":"Turner192@hotmail.com"},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"652 668 1620","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"24 November 1975","day":24,"month":10,"year":1975},"checking":false,"certificateReference":"HRT VZ0B TJXC","channel":"Digital","startDate":"20 August 2025","endDate":"20 May 2027","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07018 273 945","emailAddress":"willow.carter839@outlook.com"},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"714 176 3008","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"9 October 1992","day":9,"month":9,"year":1992},"checking":false,"certificateReference":"HRT 7ZUI HJAJ","channel":"Digital","startDate":"4 April 2025","endDate":"4 January 2027","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07029 384 756","emailAddress":"Morris651@gmail.com"},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"201 726 8770","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"23 March 1993","day":23,"month":2,"year":1993},"checking":true,"checkType":"supervisor","certificateReference":"56 191 903 719","channel":"Paper","imageReference":"2026 03 26 10 35 07N546754267","startDate":"5 June 2025","endDate":"5 March 2027","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07031 572 948","emailAddress":"matilda.hughes@blueyonder.co.uk"},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"800 170 2651","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"1 November 2006","day":1,"month":10,"year":2006},"checking":true,"checkType":"supervisor","certificateReference":"46 059 157 837","channel":"Paper","imageReference":"2026 03 26 10 35 07N057028684","startDate":"30 May 2025","endDate":"2 March 2027","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07042 619 583","emailAddress":"elsie.ward669@hotmail.com"},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"251 126 5157","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"18 January 1995","day":18,"month":0,"year":1995},"checking":true,"checkType":"quality","certificateReference":"50 905 495 581","channel":"Paper","imageReference":"2026 03 26 10 35 07N435636763","startDate":"27 August 2025","endDate":"27 May 2027","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07053 847 261"},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"039 384 7391","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"9 July 1991","day":9,"month":6,"year":1991},"checking":false,"certificateReference":"19 098 312 941","channel":"Digital","startDate":"19 July 2025","endDate":"19 April 2027","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07064 928 137","emailAddress":"aria.cooper473@blueyonder.co.uk"},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"959 419 8612","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","dateOfBirth":{"display":"22 September 1998","day":22,"month":8,"year":1998},"checking":false,"certificateReference":"39 820 255 303","channel":"Paper","imageReference":"2026 03 26 10 35 07N097328509","startDate":"19 September 2025","endDate":"19 June 2027","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07075 283 916","emailAddress":"l.bailey@blueyonder.co.uk"},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"216 618 7114","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"1 November 1986","day":1,"month":10,"year":1986},"checking":false,"certificateReference":"HRT IN2T P86E","channel":"Digital","startDate":"9 June 2025","endDate":"9 March 2027","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07086 419 375","emailAddress":"Parker259@googlemail.com"},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"668 198 9063","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"25 July 2007","day":25,"month":6,"year":2007},"checking":false,"certificateReference":"79 157 209 365","channel":"Paper","imageReference":"2026 03 26 10 35 07N275001592","startDate":"17 July 2025","endDate":"17 April 2027","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07097 531 284","emailAddress":"h.phillips@aol.com"},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"772 945 7200","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"6 December 1995","day":6,"month":11,"year":1995},"checking":false,"certificateReference":"HRT ZRMU GMH6","channel":"Digital","startDate":"19 May 2025","endDate":"19 February 2027","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07018 642 597","emailAddress":"zara.bennett@blueyonder.co.uk"},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"458 139 4109","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"8 May 2000","day":8,"month":4,"year":2000},"checking":false,"certificateReference":"97 884 243 222","channel":"Paper","imageReference":"2026 03 26 10 35 07N622705077","startDate":"23 May 2025","endDate":"23 February 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07029 753 861"},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"068 134 7287","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"24 September 2005","day":24,"month":8,"year":2005},"checking":false,"certificateReference":"77 524 057 586","channel":"Paper","imageReference":"2026 03 26 10 35 07N589246173","startDate":"28 June 2025","endDate":"28 March 2027","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07031 864 729","emailAddress":"Richardson815@aol.com"},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"772 214 5738","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","dateOfBirth":{"display":"7 April 2007","day":7,"month":3,"year":2007},"checking":false,"certificateReference":"60 443 332 205","channel":"Paper","imageReference":"2026 03 26 10 35 07N652643901","startDate":"19 June 2025","endDate":"19 March 2027","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07042 987 513","emailAddress":"esme.gray@outlook.com"},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"624 568 0004","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"5 December 2000","day":5,"month":11,"year":2000},"checking":true,"checkType":"quality","certificateReference":"27 809 114 901","channel":"Paper","imageReference":"2026 03 26 10 35 07N020001422","startDate":"25 July 2025","endDate":"25 April 2027","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07054 129 876","emailAddress":"ivy.ross936@aol.com"},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"644 109 6192","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"8 March 1984","day":8,"month":2,"year":1984},"checking":false,"certificateReference":"HRT GWCT F6VO","channel":"Digital","startDate":"13 July 2025","endDate":"13 April 2027","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07065 238 741","emailAddress":"a.bell229@hotmail.com"},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"808 529 4202","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"14 September 1995","day":14,"month":8,"year":1995},"checking":true,"checkType":"supervisor","certificateReference":"03 032 478 994","channel":"Paper","imageReference":"2026 03 26 10 35 07N364880700","startDate":"19 September 2025","endDate":"19 June 2027","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07076 391 825"},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"131 060 3962","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"21 October 1975","day":21,"month":9,"year":1975},"checking":false,"certificateReference":"HRT W09V WDRO","channel":"Digital","startDate":"31 July 2025","endDate":"1 May 2027","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07087 512 936","emailAddress":"thea.watson@hotmail.com"},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"071 268 9198","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"13 December 1992","day":13,"month":11,"year":1992},"checking":false,"certificateReference":"HRT G77S FYTE","channel":"Digital","startDate":"20 July 2025","endDate":"20 April 2027","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07098 631 427","emailAddress":"sanders.a@blueyonder.co.uk"},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"524 974 3588","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"28 April 1993","day":28,"month":3,"year":1993},"checking":false,"certificateReference":"HRT QPVM NBBW","channel":"Digital","startDate":"30 August 2025","endDate":"30 May 2027","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07019 742 835","emailAddress":"e.harrison@blueyonder.co.uk"},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"856 619 0699","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","dateOfBirth":{"display":"26 May 2000","day":26,"month":4,"year":2000},"checking":false,"certificateReference":"71 911 411 769","channel":"Paper","imageReference":"2026 03 26 10 35 07N565494636","startDate":"19 August 2025","endDate":"19 May 2027","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07020 853 749"},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"825 108 5567","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"16 July 2000","day":16,"month":6,"year":2000},"checking":true,"checkType":"supervisor","certificateReference":"24 860 803 306","channel":"Paper","imageReference":"2026 03 26 10 35 07N372802942","startDate":"12 June 2025","endDate":"12 March 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07031 984 625","emailAddress":"a.murphy@outlook.com"},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"247 795 2496","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"2 November 1990","day":2,"month":10,"year":1990},"checking":false,"certificateReference":"HRT R8LT T2E3","channel":"Digital","startDate":"22 May 2025","endDate":"22 February 2027","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07042 195 783","emailAddress":"s.graham@hotmail.com"},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"174 555 4435","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"5 January 1968","day":5,"month":0,"year":1968},"checking":false,"certificateReference":"HRT JP21 IZGK","channel":"Digital","startDate":"3 June 2025","endDate":"3 March 2027","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07053 268 917","emailAddress":"stevens.b@gmail.com"},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"716 173 3335","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"28 March 1997","day":28,"month":2,"year":1997},"checking":false,"certificateReference":"59 891 790 720","channel":"Paper","imageReference":"2026 03 26 10 35 07N180637599","startDate":"3 May 2025","endDate":"3 February 2027","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07064 371 528","emailAddress":"imogen.simpson848@googlemail.com"},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"777 920 7579","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"17 May 1995","day":17,"month":4,"year":1995},"checking":false,"certificateReference":"36 127 142 622","channel":"Paper","imageReference":"2026 03 26 10 35 07N364584282","startDate":"6 September 2025","endDate":"6 June 2027","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07075 482 936"},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"063 537 0563","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"20 March 1973","day":20,"month":2,"year":1973},"checking":false,"certificateReference":"HRT Q216 JINF","channel":"Digital","startDate":"29 May 2025","endDate":"1 March 2027","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07086 593 147","emailAddress":"e.chapman@googlemail.com"},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"925 820 0616","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"16 September 1995","day":16,"month":8,"year":1995},"checking":true,"checkType":"supervisor","certificateReference":"18 099 380 369","channel":"Paper","imageReference":"2026 03 26 10 35 07N026316294","startDate":"23 August 2025","endDate":"23 May 2027","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07097 614 258","emailAddress":"aisha.ali@gmail.com"},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"511 661 3928","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"24 July 1988","day":24,"month":6,"year":1988},"checking":true,"checkType":"supervisor","certificateReference":"16 075 218 404","channel":"Paper","imageReference":"2026 03 26 10 35 07N195434359","startDate":"9 May 2025","endDate":"9 February 2027","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07018 725 369","emailAddress":"sofia.hussain@hotmail.com"},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"177 800 8634","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"4 February 2008","day":4,"month":1,"year":2008},"checking":false,"certificateReference":"07 366 171 980","channel":"Paper","imageReference":"2026 03 26 10 35 07N567100864","startDate":"20 April 2025","endDate":"20 January 2027","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07029 836 471","emailAddress":"a.khan@googlemail.com"},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"382 037 5192","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"9 April 1993","day":9,"month":3,"year":1993},"checking":true,"checkType":"supervisor","certificateReference":"83 136 792 073","channel":"Paper","imageReference":"2026 03 26 10 35 07N401317872","startDate":"31 July 2025","endDate":"1 May 2027","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07030 947 582","emailAddress":"begum.l@blueyonder.co.uk"},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"103 557 0838","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"22 January 1998","day":22,"month":0,"year":1998},"checking":true,"checkType":"supervisor","certificateReference":"19 156 479 958","channel":"Paper","imageReference":"2026 03 26 10 35 07N991743953","startDate":"12 July 2025","endDate":"12 April 2027","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07042 058 693"},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"521 893 7275","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"24 October 1989","day":24,"month":9,"year":1989},"checking":false,"certificateReference":"05 182 726 662","channel":"Paper","imageReference":"2026 03 26 10 35 07N377626274","startDate":"28 August 2025","endDate":"28 May 2027","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07053 169 784"},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"296 320 2943","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"5 May 1997","day":5,"month":4,"year":1997},"checking":true,"checkType":"supervisor","certificateReference":"57 989 904 205","channel":"Paper","imageReference":"2026 03 26 10 35 07N840733250","startDate":"28 June 2025","endDate":"28 March 2027","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07064 271 895","emailAddress":"e.mccarthy@blueyonder.co.uk"},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"502 019 5745","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"10 December 1987","day":10,"month":11,"year":1987},"checking":false,"certificateReference":"HRT 42ZE 3GZH","channel":"Digital","startDate":"30 June 2025","endDate":"30 March 2027","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07075 382 916","emailAddress":"Doyle921@googlemail.com"},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"414 682 2350","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"6 May 1996","day":6,"month":4,"year":1996},"checking":true,"checkType":"supervisor","certificateReference":"63 126 613 393","channel":"Paper","imageReference":"2026 03 26 10 35 07N782186203","startDate":"19 August 2025","endDate":"19 May 2027","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07086 493 127"},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"059 492 3924","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"7 October 2000","day":7,"month":9,"year":2000},"checking":false,"certificateReference":"54 140 657 722","channel":"Paper","imageReference":"2026 03 26 10 35 07N676078985","startDate":"29 June 2025","endDate":"29 March 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07097 514 238"},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"119 440 6005","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"5 November 1980","day":5,"month":10,"year":1980},"checking":false,"certificateReference":"HRT 13GK LBVG","channel":"Digital","startDate":"14 August 2025","endDate":"14 May 2027","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07018 625 349","emailAddress":"Evans439@googlemail.com"},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"797 505 5052","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"14 December 2004","day":14,"month":11,"year":2004},"checking":false,"certificateReference":"29 632 669 287","channel":"Paper","imageReference":"2026 03 26 10 35 07N449633879","startDate":"6 June 2025","endDate":"6 March 2027","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07029 736 458","emailAddress":"macdonald.e@hotmail.com"},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"467 870 1261","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"22 July 1993","day":22,"month":6,"year":1993},"checking":true,"checkType":"supervisor","certificateReference":"76 856 216 616","channel":"Paper","imageReference":"2026 03 26 10 35 07N635087611","startDate":"5 May 2025","endDate":"5 February 2027","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07030 847 569","emailAddress":"fraser.s@outlook.com"},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"707 447 7156","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"26 November 1990","day":26,"month":10,"year":1990},"checking":true,"checkType":"supervisor","certificateReference":"62 531 637 550","channel":"Paper","imageReference":"2026 03 26 10 35 07N018096383","startDate":"1 April 2025","endDate":"1 January 2027","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07041 958 672"},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"423 268 6436","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"24 June 2001","day":24,"month":5,"year":2001},"checking":false,"certificateReference":"08 384 793 537","channel":"Digital","startDate":"31 July 2025","endDate":"1 May 2027","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07052 069 783","emailAddress":"Hunter427@aol.com"},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"061 500 9760","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"18 March 1982","day":18,"month":2,"year":1982},"checking":false,"certificateReference":"HRT BPL4 6NUI","channel":"Digital","startDate":"2 July 2025","endDate":"2 April 2027","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07063 171 894","emailAddress":"clara.lawrence448@blueyonder.co.uk"},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"021 929 7838","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"21 April 1994","day":21,"month":3,"year":1994},"checking":false,"certificateReference":"HRT 3C3P TRLM","channel":"Digital","startDate":"14 August 2025","endDate":"14 May 2027","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07074 282 915","emailAddress":"Spencer433@hotmail.com"},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"598 081 4835","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","dateOfBirth":{"display":"24 January 1995","day":24,"month":0,"year":1995},"checking":false,"certificateReference":"85 766 708 683","channel":"Paper","imageReference":"2026 03 26 10 35 07N291595207","startDate":"27 July 2025","endDate":"27 April 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07085 393 126","emailAddress":"nancy.rogers@hotmail.com"},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"407 490 3041","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"25 November 1995","day":25,"month":10,"year":1995},"checking":false,"certificateReference":"HRT SBEC XWD8","channel":"Digital","startDate":"16 April 2025","endDate":"16 January 2027","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07096 414 237","emailAddress":"a.watts@blueyonder.co.uk"},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"288 580 3710","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"23 September 1981","day":23,"month":8,"year":1981},"checking":false,"certificateReference":"HRT OUWV 02N0","channel":"Digital","startDate":"21 May 2025","endDate":"21 February 2027","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07017 525 348","emailAddress":"henderson.h@hotmail.com"},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"232 060 9372","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"11 April 1988","day":11,"month":3,"year":1988},"checking":false,"certificateReference":"35 763 488 231","channel":"Paper","imageReference":"2026 03 26 10 35 07N789459073","startDate":"9 June 2025","endDate":"9 March 2027","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07028 636 459","emailAddress":"rose.palmer360@gmail.com"},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"518 451 2942","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"25 April 1968","day":25,"month":3,"year":1968},"checking":false,"certificateReference":"HRT 1KXQ JECV","channel":"Digital","startDate":"13 September 2025","endDate":"13 June 2027","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07039 747 561","emailAddress":"l.nicholson@googlemail.com"},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"455 356 6678","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"16 December 1987","day":16,"month":11,"year":1987},"checking":false,"certificateReference":"HRT HG2R N7XZ","channel":"Digital","startDate":"19 June 2025","endDate":"19 March 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07040 858 673","emailAddress":"julia.gardner107@googlemail.com"},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"187 646 6765","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"14 October 2004","day":14,"month":9,"year":2004},"checking":false,"certificateReference":"60 172 435 131","channel":"Digital","startDate":"5 July 2025","endDate":"5 April 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07051 969 782","emailAddress":"newton.a@googlemail.com"},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"475 318 0672","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"12 December 2000","day":12,"month":11,"year":2000},"checking":false,"certificateReference":"70 282 600 480","channel":"Paper","imageReference":"2026 03 26 10 35 07N743160071","startDate":"24 April 2025","endDate":"24 January 2027","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07062 071 893","emailAddress":"s.reed@blueyonder.co.uk"},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"456 994 6742","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"21 June 2000","day":21,"month":5,"year":2000},"checking":true,"checkType":"supervisor","certificateReference":"34 537 443 991","channel":"Paper","imageReference":"2026 03 26 10 35 07N101473136","startDate":"31 July 2025","endDate":"1 May 2027","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07073 182 914","emailAddress":"v.harvey@aol.com"},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"394 231 7173","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"15 June 2004","day":15,"month":5,"year":2004},"checking":true,"checkType":"supervisor","certificateReference":"04 957 014 761","channel":"Paper","imageReference":"2026 03 26 10 35 07N358407661","startDate":"13 May 2025","endDate":"13 February 2027","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07084 293 125","emailAddress":"fernandez.m@blueyonder.co.uk"},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"137 139 2032","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"1 November 1988","day":1,"month":10,"year":1988},"checking":false,"certificateReference":"HRT MPDM 41CN","channel":"Digital","startDate":"31 March 2025","endDate":"31 December 2026","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07095 314 236","emailAddress":"elena.silva@googlemail.com"},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"042 914 8297","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"23 May 2000","day":23,"month":4,"year":2000},"checking":true,"checkType":"supervisor","certificateReference":"90 043 245 669","channel":"Paper","imageReference":"2026 03 26 10 35 07N603015952","startDate":"21 May 2025","endDate":"21 February 2027","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07016 425 347","emailAddress":"leila.patel@googlemail.com"},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"822 727 0623","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"2 March 1991","day":2,"month":2,"year":1991},"checking":false,"certificateReference":"08 753 364 437","channel":"Digital","startDate":"20 May 2025","endDate":"20 February 2027","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07027 536 458","emailAddress":"f.iqbal@blueyonder.co.uk"},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"257 868 1345","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"25 March 1991","day":25,"month":2,"year":1991},"checking":false,"certificateReference":"81 525 751 314","channel":"Digital","startDate":"29 May 2025","endDate":"1 March 2027","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07038 647 569","emailAddress":"ahmed.j@hotmail.com"},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"938 907 3656","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"16 May 1999","day":16,"month":4,"year":1999},"checking":true,"checkType":"supervisor","certificateReference":"84 033 887 928","channel":"Paper","imageReference":"2026 03 26 10 35 07N864726155","startDate":"2 August 2025","endDate":"2 May 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07049 758 671"},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"784 378 7307","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"6 March 1986","day":6,"month":2,"year":1986},"checking":false,"certificateReference":"HRT J5O2 7Q81","channel":"Digital","startDate":"22 June 2025","endDate":"22 March 2027","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07050 869 782","emailAddress":"Paterson323@gmail.com"},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"381 492 4043","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"12 July 1972","day":12,"month":6,"year":1972},"checking":false,"certificateReference":"HRT UU84 BMS3","channel":"Pharmacy","startDate":"29 April 2025","endDate":"29 January 2027","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07061 971 893","emailAddress":"b.foster@gmail.com"},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"701 827 5516","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"2 January 1970","day":2,"month":0,"year":1970},"checking":false,"certificateReference":"HRT I13K 0Y33","channel":"Digital","startDate":"18 August 2025","endDate":"18 May 2027","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07072 082 914","emailAddress":"l.fox@blueyonder.co.uk"},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"058 274 3110","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"10 February 2007","day":10,"month":1,"year":2007},"checking":false,"certificateReference":"06 535 201 273","channel":"Paper","imageReference":"2026 03 26 10 35 07N392708094","startDate":"31 May 2025","endDate":"3 March 2027","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07083 193 125","emailAddress":"g.grant@hotmail.com"},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"935 464 4529","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"22 September 1979","day":22,"month":8,"year":1979},"checking":false,"certificateReference":"HRT NP8F 2XNG","channel":"Digital","startDate":"17 June 2025","endDate":"17 March 2027","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07094 214 236","emailAddress":"Murray995@blueyonder.co.uk"},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"023 688 6976","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","dateOfBirth":{"display":"15 April 1996","day":15,"month":3,"year":1996},"checking":false,"certificateReference":"38 061 855 076","channel":"Paper","imageReference":"2026 03 26 10 35 07N115982528","startDate":"5 April 2025","endDate":"5 January 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07015 325 347","emailAddress":"ella-may.west@blueyonder.co.uk"},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"452 665 9088","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"9 July 1975","day":9,"month":6,"year":1975},"checking":false,"certificateReference":"HRT 372D 2R38","channel":"Digital","startDate":"11 July 2025","endDate":"11 April 2027","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07026 436 458","emailAddress":"matthews.r@blueyonder.co.uk"},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"783 873 5470","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"2 April 1995","day":2,"month":3,"year":1995},"checking":true,"checkType":"quality","certificateReference":"21 516 328 339","channel":"Paper","imageReference":"2026 03 26 10 35 07N387771032","startDate":"30 June 2025","endDate":"30 March 2027","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07037 547 569","emailAddress":"k.holmes@aol.com"},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"663 520 2580","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"10 September 2007","day":10,"month":8,"year":2007},"checking":false,"certificateReference":"49 274 323 659","channel":"Paper","imageReference":"2026 03 26 10 35 07N771763306","startDate":"13 May 2025","endDate":"13 February 2027","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07048 658 671","emailAddress":"lydia.walsh525@hotmail.com"},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"763 667 2048","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"2 April 1999","day":2,"month":3,"year":1999},"checking":true,"checkType":"supervisor","certificateReference":"29 750 300 492","channel":"Paper","imageReference":"2026 03 26 10 35 07N035893650","startDate":"27 August 2025","endDate":"27 May 2027","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07059 769 782"},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"492 522 9374","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"27 June 1991","day":27,"month":5,"year":1991},"checking":false,"certificateReference":"HRT 303C TEZX","channel":"Digital","startDate":"13 April 2025","endDate":"13 January 2027","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07060 871 893","emailAddress":"n.jordan@blueyonder.co.uk"},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"510 145 9112","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"13 August 2001","day":13,"month":7,"year":2001},"checking":true,"checkType":"supervisor","certificateReference":"70 705 236 596","channel":"Paper","imageReference":"2026 03 26 10 35 07N316543180","startDate":"8 July 2025","endDate":"8 April 2027","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07071 982 914","emailAddress":"barrett.b@googlemail.com"},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"906 927 2389","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"5 August 1976","day":5,"month":7,"year":1976},"checking":false,"certificateReference":"HRT DGPK N1XG","channel":"Digital","startDate":"22 June 2025","endDate":"22 March 2027","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07082 093 125","emailAddress":"mollie.hayes@hotmail.com"},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"843 301 9590","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"5 December 2001","day":5,"month":11,"year":2001},"checking":true,"checkType":"supervisor","certificateReference":"66 186 500 352","channel":"Paper","imageReference":"2026 03 26 10 35 07N283714905","startDate":"2 August 2025","endDate":"2 May 2027","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07093 114 236","emailAddress":"f.cunningham@blueyonder.co.uk"},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"935 148 6251","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"17 May 1998","day":17,"month":4,"year":1998},"checking":true,"checkType":"supervisor","certificateReference":"86 202 297 669","channel":"Paper","imageReference":"2026 03 26 10 35 07N495885471","startDate":"22 August 2025","endDate":"22 May 2027","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07014 225 347","emailAddress":"amelie.barber@outlook.com"},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"631 740 5182","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"2 August 1994","day":2,"month":7,"year":1994},"checking":false,"certificateReference":"58 950 442 897","channel":"Paper","imageReference":"2026 03 26 10 35 07N362219930","startDate":"23 July 2025","endDate":"23 April 2027","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07025 336 458","emailAddress":"l.knight@aol.com"},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"238 175 0518","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"2 April 1995","day":2,"month":3,"year":1995},"checking":true,"checkType":"supervisor","certificateReference":"97 410 961 415","channel":"Paper","imageReference":"2026 03 26 10 35 07N211575245","startDate":"25 June 2025","endDate":"25 March 2027","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07036 447 569"},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"224 987 9230","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"26 September 1977","day":26,"month":8,"year":1977},"checking":false,"certificateReference":"HRT 8GFA H52I","channel":"Digital","startDate":"19 August 2025","endDate":"19 May 2027","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07047 558 671","emailAddress":"t.bates@googlemail.com"},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"029 605 0232","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"processing","dateOfBirth":{"display":"6 July 1988","day":6,"month":6,"year":1988},"checking":false,"certificateReference":"78 185 460 393","channel":"Paper","imageReference":"2026 03 26 10 35 07N273044044","startDate":"18 June 2025","endDate":"18 March 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07039 747 561","emailAddress":"day.h@gmail.com"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"679 172 8832","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"24 February 1986","day":24,"month":1,"year":1986},"checking":false,"certificateReference":"HRT OCDE QKWY","channel":"Digital","startDate":"9 August 2025","endDate":"9 May 2027","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07053 847 261","emailAddress":"indie.francis@outlook.com"},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"280 209 6395","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"5 August 1977","day":5,"month":7,"year":1977},"checking":false,"certificateReference":"HRT YZKI 45BY","channel":"Digital","startDate":"3 April 2025","endDate":"3 January 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07018 273 945","emailAddress":"hope.burton@googlemail.com"}]';
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
