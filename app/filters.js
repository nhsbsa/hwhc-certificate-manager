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
      let action = 'View ';

      if (patient.checking === true) {
        if (role === 'backOfficeSupervisor') {

          if (processor && processor.level && processor.level === 'trainee') {
            link = patient.certificateType + '/comparison--leave-feedback?patientID=' + patient.id;
            action = 'Check ';
          } else {
            link = patient.certificateType + '/comparison--has-feedback?patientID=' + patient.id;
          }

        } else {
          link = patient.certificateType + '/case?patientID=' + patient.id;
        }
      }

      const checkedBy = (processor.level === 'trainee') ? 'Supervisor' : 'Quality checker';

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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"007 409 0748","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"4 May 2004","day":4,"month":4,"year":2004},"checking":true,"certificateReference":"56 742 167 111","channel":"Paper","imageReference":"2026 03 19 16 49 55N029208888","startDate":"14 August 2025","endDate":"14 May 2027","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"}},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"125 713 3267","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"24 June 1979","day":24,"month":5,"year":1979},"checking":false,"certificateReference":"HRT CYUX NFSC","channel":"Telephony","imageReference":"2026 03 19 16 49 48N571734690","startDate":"5 May 2025","endDate":"5 February 2027","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"}},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"906 990 2494","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"8 June 2003","day":8,"month":5,"year":2003},"checking":false,"certificateReference":"16 762 447 549","channel":"Digital","startDate":"29 August 2025","endDate":"29 May 2027","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"imageReference":"2026 03 19 16 49 53N938139190"},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"975 999 7918","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"12 October 1995","day":12,"month":9,"year":1995},"checking":false,"certificateReference":"HRT 9G8B DL0U","channel":"Digital","startDate":"30 May 2025","endDate":"2 March 2027","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"imageReference":"2026 03 19 16 49 54N692693427"},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"481 726 0059","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"20 January 1990","day":20,"month":0,"year":1990},"checking":false,"certificateReference":"HRT IW1T F40Q","channel":"Digital","startDate":"19 July 2025","endDate":"19 April 2027","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"imageReference":"2026 03 19 16 49 54N558661333"},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"383 481 5087","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"6 December 1976","day":6,"month":11,"year":1976},"checking":false,"certificateReference":"HRT C5CG 5IVG","channel":"Digital","startDate":"25 June 2025","endDate":"25 March 2027","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"imageReference":"2026 03 19 16 49 53N815050111"},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"399 602 3286","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"20 April 2000","day":20,"month":3,"year":2000},"checking":false,"certificateReference":"66 099 813 016","channel":"Paper","startDate":"2 April 2025","endDate":"2 January 2027","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"imageReference":"2026 03 19 16 49 55N850681114"},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"941 951 1225","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"11 September 1992","day":11,"month":8,"year":1992},"checking":false,"certificateReference":"HRT XTGI XVDL","channel":"Digital","startDate":"18 August 2025","endDate":"18 May 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"imageReference":"2026 03 19 16 49 53N586962569"},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"102 292 6890","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"3 November 1979","day":3,"month":10,"year":1979},"checking":false,"certificateReference":"HRT 4X1D R3BO","channel":"Digital","startDate":"26 August 2025","endDate":"26 May 2027","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"imageReference":"2026 03 19 16 49 54N016779517"},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"795 053 0250","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"13 February 2007","day":13,"month":1,"year":2007},"checking":true,"certificateReference":"84 434 079 692","channel":"Paper","startDate":"19 May 2025","endDate":"19 February 2027","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"imageReference":"2026 03 19 16 49 55N639570271"},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"982 121 4966","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"7 July 2002","day":7,"month":6,"year":2002},"checking":true,"certificateReference":"84 430 999 878","channel":"Paper","imageReference":"2026 03 19 16 49 55N176432264","startDate":"26 April 2025","endDate":"26 January 2027","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"}},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"997 006 0769","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"4 May 1988","day":4,"month":4,"year":1988},"checking":false,"certificateReference":"36 631 082 843","channel":"Digital","startDate":"14 September 2025","endDate":"14 June 2027","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"imageReference":"2026 03 19 16 49 54N778723434"},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"397 040 8442","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"17 April 2006","day":17,"month":3,"year":2006},"checking":false,"certificateReference":"12 206 292 948","channel":"Digital","imageReference":"2026 03 19 16 49 48N020996874","startDate":"10 September 2025","endDate":"10 June 2027","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"}},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"167 165 4298","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"23 September 1994","day":23,"month":8,"year":1994},"checking":false,"certificateReference":"76 167 778 328","channel":"Digital","startDate":"1 April 2025","endDate":"1 January 2027","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"imageReference":"2026 03 19 16 49 54N460934047"},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"249 368 3354","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"2 March 1999","day":2,"month":2,"year":1999},"checking":true,"certificateReference":"31 180 187 857","channel":"Digital","imageReference":"2026 03 19 16 49 54N226960980","startDate":"8 May 2025","endDate":"8 February 2027","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"}},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"958 723 5809","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"26 April 1968","day":26,"month":3,"year":1968},"checking":false,"certificateReference":"HRT A7FK 835G","channel":"Digital","imageReference":"2026 03 19 16 49 54N041239683","startDate":"14 August 2025","endDate":"14 May 2027","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"}},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"220 452 7910","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"19 October 2001","day":19,"month":9,"year":2001},"checking":false,"certificateReference":"14 403 598 149","channel":"Digital","imageReference":"2026 03 19 16 49 54N871069427","startDate":"18 April 2025","endDate":"18 January 2027","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"}},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"061 958 8754","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"26 March 1974","day":26,"month":2,"year":1974},"checking":false,"certificateReference":"HRT Z8B7 4JO2","channel":"Digital","imageReference":"2026 03 19 16 49 48N526389925","startDate":"19 August 2025","endDate":"19 May 2027","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"}},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"309 093 7765","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"21 October 1976","day":21,"month":9,"year":1976},"checking":false,"certificateReference":"HRT 1WI2 T5JR","channel":"Digital","startDate":"18 July 2025","endDate":"18 April 2027","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"}},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"317 567 0278","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"19 June 2002","day":19,"month":5,"year":2002},"checking":true,"certificateReference":"99 389 862 803","channel":"Paper","startDate":"26 August 2025","endDate":"26 May 2027","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"imageReference":"2026 03 19 16 49 55N504677876"},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"728 574 1325","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"19 January 1978","day":19,"month":0,"year":1978},"checking":false,"certificateReference":"HRT 0WK4 1NJF","channel":"Pharmacy","imageReference":"2026 03 19 16 49 48N307868106","startDate":"2 September 2025","endDate":"2 June 2027","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"}},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"321 036 6653","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"7 July 1970","day":7,"month":6,"year":1970},"checking":false,"certificateReference":"HRT HY9O 1XC2","channel":"Digital","startDate":"2 April 2025","endDate":"2 January 2027","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"imageReference":"2026 03 19 16 49 54N459023464"},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"474 524 8939","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"27 April 1991","day":27,"month":3,"year":1991},"checking":true,"certificateReference":"05 377 055 961","channel":"Paper","imageReference":"2026 03 19 16 49 55N277126589","startDate":"20 July 2025","endDate":"20 April 2027","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"}},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"789 698 9982","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"23 October 1995","day":23,"month":9,"year":1995},"checking":true,"certificateReference":"59 474 536 449","channel":"Paper","startDate":"14 April 2025","endDate":"14 January 2027","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"imageReference":"2026 03 19 16 49 55N434482711"},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"750 099 6746","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"3 October 1998","day":3,"month":9,"year":1998},"checking":false,"certificateReference":"88 495 370 437","channel":"Paper","imageReference":"2026 03 19 16 49 55N019553730","startDate":"16 April 2025","endDate":"16 January 2027","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"}},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"998 697 6784","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"12 May 1993","day":12,"month":4,"year":1993},"checking":false,"certificateReference":"10 125 653 384","channel":"Paper","startDate":"14 August 2025","endDate":"14 May 2027","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"imageReference":"2026 03 19 16 49 55N599300263"},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"132 198 8904","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"26 August 1990","day":26,"month":7,"year":1990},"checking":true,"certificateReference":"21 139 723 958","channel":"Paper","startDate":"6 May 2025","endDate":"6 February 2027","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"imageReference":"2026 03 19 16 49 55N965468734"},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"474 753 8582","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"processing","dateOfBirth":{"display":"27 July 1996","day":27,"month":6,"year":1996},"checking":false,"certificateReference":"97 986 779 067","channel":"Paper","startDate":"25 May 2025","endDate":"25 February 2027","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"imageReference":"2026 03 19 16 49 55N709930623"},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"345 830 1902","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"7 September 1992","day":7,"month":8,"year":1992},"checking":false,"certificateReference":"86 056 680 442","channel":"Digital","startDate":"27 April 2025","endDate":"27 January 2027","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"}},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"877 175 6505","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"19 December 1987","day":19,"month":11,"year":1987},"checking":false,"certificateReference":"HRT B3LK NYPJ","channel":"Digital","imageReference":"2026 03 19 16 49 48N987828330","startDate":"20 May 2025","endDate":"20 February 2027","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"}},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"152 614 2242","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"12 December 1989","day":12,"month":11,"year":1989},"checking":true,"certificateReference":"93 992 200 200","channel":"Paper","startDate":"22 August 2025","endDate":"22 May 2027","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"imageReference":"2026 03 19 16 49 55N868761174"},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"016 220 4645","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"12 April 1969","day":12,"month":3,"year":1969},"checking":false,"certificateReference":"HRT YSHK UYDN","channel":"Telephony","startDate":"23 June 2025","endDate":"23 March 2027","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"}},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"065 129 3604","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"7 March 1992","day":7,"month":2,"year":1992},"checking":true,"certificateReference":"67 824 066 397","channel":"Digital","startDate":"20 August 2025","endDate":"20 May 2027","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"imageReference":"2026 03 19 16 49 53N319866527"},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"277 670 0012","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"22 May 1998","day":22,"month":4,"year":1998},"checking":true,"certificateReference":"71 754 831 842","channel":"Paper","imageReference":"2026 03 19 16 49 55N874611136","startDate":"11 April 2025","endDate":"11 January 2027","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"}},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"686 627 6975","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"expired","dateOfBirth":{"display":"13 December 1993","day":13,"month":11,"year":1993},"checking":false,"certificateReference":"21 132 173 326","channel":"Paper","imageReference":"2026 03 19 16 49 55N646545555","startDate":"17 May 2025","endDate":"17 February 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"478 381 9922","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"11 January 1995","day":11,"month":0,"year":1995},"checking":false,"certificateReference":"66 815 575 494","channel":"Paper","imageReference":"2026 03 19 16 49 55N862917713","startDate":"26 March 2025","endDate":"26 December 2026","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"}},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"587 481 7518","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"6 April 1979","day":6,"month":3,"year":1979},"checking":false,"certificateReference":"HRT LQZB 8CP3","channel":"Digital","startDate":"26 July 2025","endDate":"26 April 2027","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"imageReference":"2026 03 19 16 49 54N126307351"},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"128 419 4477","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"27 March 1975","day":27,"month":2,"year":1975},"checking":false,"certificateReference":"HRT EJOO YR9P","channel":"Digital","imageReference":"2026 03 19 16 49 53N018353280","startDate":"10 July 2025","endDate":"10 April 2027","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"}},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"833 793 7208","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"16 February 1973","day":16,"month":1,"year":1973},"checking":false,"certificateReference":"HRT MXJH 4XHM","channel":"Digital","imageReference":"2026 03 19 16 49 53N966571313","startDate":"20 March 2025","endDate":"20 December 2026","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"}},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"344 861 6001","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"13 January 1999","day":13,"month":0,"year":1999},"checking":true,"certificateReference":"04 632 326 767","channel":"Paper","startDate":"25 March 2025","endDate":"25 December 2026","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"imageReference":"2026 03 19 16 49 55N087709185"},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"154 945 6733","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"21 April 1969","day":21,"month":3,"year":1969},"checking":false,"certificateReference":"HRT 2GT4 98R7","channel":"Digital","startDate":"7 April 2025","endDate":"7 January 2027","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"imageReference":"2026 03 19 16 49 53N599966326"},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"366 000 4896","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"22 February 1990","day":22,"month":1,"year":1990},"checking":false,"certificateReference":"HRT FDVU CPM4","channel":"Digital","imageReference":"2026 03 19 16 49 48N732292617","startDate":"2 September 2025","endDate":"2 June 2027","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"}},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"232 271 6586","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"23 February 1991","day":23,"month":1,"year":1991},"checking":false,"certificateReference":"HRT RMIY 0XU6","channel":"Digital","imageReference":"2026 03 19 16 49 54N214653893","startDate":"24 May 2025","endDate":"24 February 2027","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"}},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"920 571 7415","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"20 October 1991","day":20,"month":9,"year":1991},"checking":true,"certificateReference":"96 842 647 136","channel":"Paper","imageReference":"2026 03 19 16 49 55N483945733","startDate":"18 April 2025","endDate":"18 January 2027","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"}},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"007 596 6980","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"9 November 1976","day":9,"month":10,"year":1976},"checking":false,"certificateReference":"HRT F83R IDBA","channel":"Digital","imageReference":"2026 03 19 16 49 53N565570340","startDate":"10 May 2025","endDate":"10 February 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"}},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"554 331 5365","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"15 February 2007","day":15,"month":1,"year":2007},"checking":true,"certificateReference":"41 066 831 803","channel":"Digital","startDate":"5 August 2025","endDate":"5 May 2027","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"imageReference":"2026 03 19 16 49 54N656631044"},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"019 516 0368","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"2 August 2002","day":2,"month":7,"year":2002},"checking":false,"certificateReference":"32 789 381 170","channel":"Paper","startDate":"5 May 2025","endDate":"5 February 2027","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"imageReference":"2026 03 19 16 49 55N863656335"},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"384 968 7715","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"26 January 1993","day":26,"month":0,"year":1993},"checking":false,"certificateReference":"18 756 196 349","channel":"Paper","startDate":"12 August 2025","endDate":"12 May 2027","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"imageReference":"2026 03 19 16 49 55N490762009"},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"711 234 2278","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"11 September 2007","day":11,"month":8,"year":2007},"checking":false,"certificateReference":"14 458 268 660","channel":"Paper","imageReference":"2026 03 19 16 49 55N441821837","startDate":"5 May 2025","endDate":"5 February 2027","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"}},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"038 403 3144","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"25 August 2008","day":25,"month":7,"year":2008},"checking":true,"certificateReference":"15 112 250 794","channel":"Paper","imageReference":"2026 03 19 16 49 55N501742850","startDate":"1 July 2025","endDate":"1 April 2027","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"}},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"143 014 4735","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"21 April 1995","day":21,"month":3,"year":1995},"checking":false,"certificateReference":"06 434 900 611","channel":"Digital","startDate":"5 May 2025","endDate":"5 February 2027","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"imageReference":"2026 03 19 16 49 54N891540597"},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"211 508 2676","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"23 December 2004","day":23,"month":11,"year":2004},"checking":true,"certificateReference":"76 591 426 591","channel":"Digital","startDate":"14 May 2025","endDate":"14 February 2027","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"imageReference":"2026 03 19 16 49 54N892896918"},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"942 004 4215","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"3 December 1977","day":3,"month":11,"year":1977},"checking":false,"certificateReference":"HRT DMQW REED","channel":"Digital","imageReference":"2026 03 19 16 49 48N270788344","startDate":"16 June 2025","endDate":"16 March 2027","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"}},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"680 513 6977","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"4 August 1987","day":4,"month":7,"year":1987},"checking":false,"certificateReference":"HRT X5Z7 K46R","channel":"Digital","imageReference":"2026 03 19 16 49 54N982325925","startDate":"14 May 2025","endDate":"14 February 2027","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"}},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"922 666 2594","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"16 March 1991","day":16,"month":2,"year":1991},"checking":false,"certificateReference":"93 039 625 888","channel":"Paper","startDate":"15 August 2025","endDate":"15 May 2027","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"imageReference":"2026 03 19 16 49 55N330262610"},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"843 881 8333","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"27 November 1992","day":27,"month":10,"year":1992},"checking":false,"certificateReference":"95 959 149 509","channel":"Digital","startDate":"18 September 2025","endDate":"18 June 2027","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"imageReference":"2026 03 19 16 49 53N032948758"},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"361 485 2754","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"21 October 1998","day":21,"month":9,"year":1998},"checking":false,"certificateReference":"67 290 321 235","channel":"Digital","startDate":"10 May 2025","endDate":"10 February 2027","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"imageReference":"2026 03 19 16 49 53N824084483"},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"458 303 9886","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"11 November 1967","day":11,"month":10,"year":1967},"checking":false,"certificateReference":"HRT RFDL QVL4","channel":"Digital","imageReference":"2026 03 19 16 49 48N101981511","startDate":"9 May 2025","endDate":"9 February 2027","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"}},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"093 876 1099","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"2 May 2004","day":2,"month":4,"year":2004},"checking":true,"certificateReference":"05 046 302 532","channel":"Paper","startDate":"24 June 2025","endDate":"24 March 2027","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"imageReference":"2026 03 19 16 49 55N366184050"},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"801 700 5972","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"18 April 1997","day":18,"month":3,"year":1997},"checking":false,"certificateReference":"58 428 624 510","channel":"Paper","imageReference":"2026 03 19 16 49 55N345207029","startDate":"22 May 2025","endDate":"22 February 2027","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"}},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"336 719 0621","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"28 May 1997","day":28,"month":4,"year":1997},"checking":false,"certificateReference":"10 276 960 328","channel":"Digital","startDate":"14 September 2025","endDate":"14 June 2027","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"imageReference":"2026 03 19 16 49 53N903876660"},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"668 129 5694","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"25 April 1992","day":25,"month":3,"year":1992},"checking":true,"certificateReference":"41 621 638 715","channel":"Paper","imageReference":"2026 03 19 16 49 55N018873279","startDate":"23 July 2025","endDate":"23 April 2027","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"}},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"124 680 3232","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"14 October 1993","day":14,"month":9,"year":1993},"checking":true,"certificateReference":"30 517 047 325","channel":"Paper","imageReference":"2026 03 19 16 49 55N847305488","startDate":"2 June 2025","endDate":"2 March 2027","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"}},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"761 968 0200","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"15 December 2008","day":15,"month":11,"year":2008},"checking":false,"certificateReference":"89 572 107 545","channel":"Paper","startDate":"25 March 2025","endDate":"25 December 2026","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"imageReference":"2026 03 19 16 49 55N582693901"},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"669 631 1807","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"10 May 2000","day":10,"month":4,"year":2000},"checking":true,"certificateReference":"52 413 557 997","channel":"Paper","imageReference":"2026 03 19 16 49 55N400191414","startDate":"2 August 2025","endDate":"2 May 2027","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"}},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"448 974 0925","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"17 December 1993","day":17,"month":11,"year":1993},"checking":true,"certificateReference":"69 801 164 152","channel":"Paper","startDate":"25 April 2025","endDate":"25 January 2027","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"imageReference":"2026 03 19 16 49 55N563871822"},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"117 182 6757","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"processing","dateOfBirth":{"display":"26 September 1989","day":26,"month":8,"year":1989},"checking":false,"certificateReference":"42 800 761 030","channel":"Paper","imageReference":"2026 03 19 16 49 55N284644757","startDate":"19 April 2025","endDate":"19 January 2027","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"}},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"223 759 3335","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"24 March 1976","day":24,"month":2,"year":1976},"checking":false,"certificateReference":"HRT 57ZN 14YA","channel":"Digital","imageReference":"2026 03 19 16 49 54N488336393","startDate":"31 May 2025","endDate":"3 March 2027","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"}},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"891 426 1231","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"26 August 1966","day":26,"month":7,"year":1966},"checking":false,"certificateReference":"HRT C0HQ 8QD6","channel":"Digital","imageReference":"2026 03 19 16 49 54N684362089","startDate":"27 July 2025","endDate":"27 April 2027","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"}},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"892 548 8682","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"27 July 1990","day":27,"month":6,"year":1990},"checking":true,"certificateReference":"41 868 441 288","channel":"Paper","imageReference":"2026 03 19 16 49 55N470136348","startDate":"27 March 2025","endDate":"27 December 2026","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"}},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"432 470 0579","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"27 June 1991","day":27,"month":5,"year":1991},"checking":false,"certificateReference":"HRT U58C HES0","channel":"Digital","startDate":"9 July 2025","endDate":"9 April 2027","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"imageReference":"2026 03 19 16 49 53N921963207"},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"018 111 6737","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"3 April 1995","day":3,"month":3,"year":1995},"checking":false,"certificateReference":"36 166 435 588","channel":"Digital","imageReference":"2026 03 19 16 49 48N803405392","startDate":"2 May 2025","endDate":"2 February 2027","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"}},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"110 170 1419","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"26 March 1995","day":26,"month":2,"year":1995},"checking":true,"certificateReference":"88 559 418 649","channel":"Paper","imageReference":"2026 03 19 16 49 55N923038113","startDate":"16 August 2025","endDate":"16 May 2027","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"}},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"636 393 1317","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"13 October 1985","day":13,"month":9,"year":1985},"checking":false,"certificateReference":"HRT LCUB LP4G","channel":"Digital","startDate":"5 April 2025","endDate":"5 January 2027","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"}},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"500 728 3253","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"2 February 1991","day":2,"month":1,"year":1991},"checking":false,"certificateReference":"HRT X4D3 D3K0","channel":"Digital","imageReference":"2026 03 19 16 49 54N112521113","startDate":"28 July 2025","endDate":"28 April 2027","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"}},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"904 369 6512","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"14 November 1991","day":14,"month":10,"year":1991},"checking":true,"certificateReference":"69 498 514 788","channel":"Paper","startDate":"31 March 2025","endDate":"31 December 2026","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"imageReference":"2026 03 19 16 49 55N386681488"},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"250 000 8124","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"9 November 2006","day":9,"month":10,"year":2006},"checking":false,"certificateReference":"23 232 767 311","channel":"Paper","imageReference":"2026 03 19 16 49 55N847637985","startDate":"2 April 2025","endDate":"2 January 2027","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"}},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"438 711 7376","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"6 December 1992","day":6,"month":11,"year":1992},"checking":false,"certificateReference":"HRT OSKI PUUV","channel":"Digital","startDate":"9 June 2025","endDate":"9 March 2027","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"imageReference":"2026 03 19 16 49 54N299650175"},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"702 972 2210","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"28 January 2004","day":28,"month":0,"year":2004},"checking":false,"certificateReference":"23 665 136 905","channel":"Paper","imageReference":"2026 03 19 16 49 55N944483579","startDate":"3 May 2025","endDate":"3 February 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"306 578 3092","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"25 July 1980","day":25,"month":6,"year":1980},"checking":false,"certificateReference":"HRT YRF8 36YL","channel":"Digital","imageReference":"2026 03 19 16 49 48N118130240","startDate":"21 April 2025","endDate":"21 January 2027","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"}},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"000 351 4351","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"16 June 1968","day":16,"month":5,"year":1968},"checking":false,"certificateReference":"HRT WPE3 DLCE","channel":"Digital","imageReference":"2026 03 19 16 49 48N509900616","startDate":"11 August 2025","endDate":"11 May 2027","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"}},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"202 010 3427","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"1 June 1981","day":1,"month":5,"year":1981},"checking":false,"certificateReference":"HRT NS1G SK71","channel":"Digital","startDate":"26 May 2025","endDate":"26 February 2027","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"}},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"038 111 3704","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"17 November 2008","day":17,"month":10,"year":2008},"checking":true,"certificateReference":"90 242 134 210","channel":"Paper","imageReference":"2026 03 19 16 49 55N348976425","startDate":"11 April 2025","endDate":"11 January 2027","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"}},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"409 076 8351","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"10 March 2000","day":10,"month":2,"year":2000},"checking":false,"certificateReference":"01 982 466 303","channel":"Digital","startDate":"18 June 2025","endDate":"18 March 2027","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"imageReference":"2026 03 19 16 49 54N731295111"},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"840 679 3424","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"2 February 1992","day":2,"month":1,"year":1992},"checking":false,"certificateReference":"85 800 805 709","channel":"Paper","imageReference":"2026 03 19 16 49 55N842469851","startDate":"11 April 2025","endDate":"11 January 2027","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"}},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"315 095 6305","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"21 February 1995","day":21,"month":1,"year":1995},"checking":false,"certificateReference":"HRT VIQO INM1","channel":"Digital","imageReference":"2026 03 19 16 49 54N953300297","startDate":"26 March 2025","endDate":"26 December 2026","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"}},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"969 920 1435","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"6 July 1990","day":6,"month":6,"year":1990},"checking":true,"certificateReference":"08 001 853 664","channel":"Paper","startDate":"3 July 2025","endDate":"3 April 2027","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"imageReference":"2026 03 19 16 49 55N304965550"},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"150 434 6296","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"expired","dateOfBirth":{"display":"4 September 1996","day":4,"month":8,"year":1996},"checking":false,"certificateReference":"15 143 108 939","channel":"Digital","imageReference":"2026 03 19 16 49 54N503992885","startDate":"21 June 2025","endDate":"21 March 2027","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"}},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"186 055 0393","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"3 March 1997","day":3,"month":2,"year":1997},"checking":true,"certificateReference":"41 440 319 267","channel":"Paper","imageReference":"2026 03 19 16 49 55N255558235","startDate":"26 July 2025","endDate":"26 April 2027","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"}},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"240 469 5430","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"26 March 2000","day":26,"month":2,"year":2000},"checking":false,"certificateReference":"84 934 310 013","channel":"Paper","startDate":"13 May 2025","endDate":"13 February 2027","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"imageReference":"2026 03 19 16 49 55N859618737"},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"615 035 2745","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"18 November 1976","day":18,"month":10,"year":1976},"checking":false,"certificateReference":"HRT F9FS CS9J","channel":"Digital","startDate":"26 March 2025","endDate":"26 December 2026","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"imageReference":"2026 03 19 16 49 54N122828786"},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"953 215 4775","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"21 March 1989","day":21,"month":2,"year":1989},"checking":true,"certificateReference":"85 086 483 444","channel":"Paper","imageReference":"2026 03 19 16 49 55N682054559","startDate":"22 March 2025","endDate":"22 December 2026","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"}},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"404 518 5750","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"27 May 1976","day":27,"month":4,"year":1976},"checking":false,"certificateReference":"HRT DQR8 KJWO","channel":"Digital","startDate":"20 March 2025","endDate":"20 December 2026","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"}},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"114 085 9356","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"20 August 1992","day":20,"month":7,"year":1992},"checking":true,"certificateReference":"26 430 271 801","channel":"Paper","imageReference":"2026 03 19 16 49 55N643594206","startDate":"9 May 2025","endDate":"9 February 2027","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"}},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"816 281 4126","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"10 August 1977","day":10,"month":7,"year":1977},"checking":false,"certificateReference":"HRT Q2KQ EWLL","channel":"Digital","startDate":"30 July 2025","endDate":"30 April 2027","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"imageReference":"2026 03 19 16 49 54N358801171"},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"766 484 9686","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"expired","dateOfBirth":{"display":"20 June 2002","day":20,"month":5,"year":2002},"checking":false,"certificateReference":"31 904 557 722","channel":"Paper","startDate":"6 June 2025","endDate":"6 March 2027","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"imageReference":"2026 03 19 16 49 55N016756584"},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"349 441 7927","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"19 June 1974","day":19,"month":5,"year":1974},"checking":false,"certificateReference":"HRT E5VK W7UU","channel":"Digital","startDate":"15 June 2025","endDate":"15 March 2027","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"imageReference":"2026 03 19 16 49 53N941861975"},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"947 153 6564","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"14 May 1979","day":14,"month":4,"year":1979},"checking":false,"certificateReference":"HRT RPYD JJNB","channel":"Digital","startDate":"4 August 2025","endDate":"4 May 2027","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"imageReference":"2026 03 19 16 49 54N577735629"},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"157 426 2015","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"6 June 1991","day":6,"month":5,"year":1991},"checking":false,"certificateReference":"52 464 200 680","channel":"Paper","startDate":"9 April 2025","endDate":"9 January 2027","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"imageReference":"2026 03 19 16 49 55N486483369"},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"253 059 3490","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"2 June 1992","day":2,"month":5,"year":1992},"checking":false,"certificateReference":"78 731 264 028","channel":"Paper","imageReference":"2026 03 19 16 49 55N772616401","startDate":"24 July 2025","endDate":"24 April 2027","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"}},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"131 935 2279","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"22 July 1994","day":22,"month":6,"year":1994},"checking":true,"certificateReference":"74 473 003 285","channel":"Paper","startDate":"25 July 2025","endDate":"25 April 2027","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"imageReference":"2026 03 19 16 49 55N668573735"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"927 806 1695","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"27 May 1994","day":27,"month":4,"year":1994},"checking":false,"certificateReference":"HRT 24I1 9SM7","channel":"Digital","imageReference":"2026 03 19 16 49 48N591634798","startDate":"24 March 2025","endDate":"24 December 2026","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"}},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"744 982 2474","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"2 May 2004","day":2,"month":4,"year":2004},"checking":false,"certificateReference":"42 384 681 203","channel":"Paper","startDate":"1 July 2025","endDate":"1 April 2027","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"imageReference":"2026 03 19 16 49 55N518408105"}]';
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
