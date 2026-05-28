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

      case 'medex':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--purple">MEDEX</strong>' : 'MEDEX';
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
      { text: 'Address' },
      { text: 'Postcode' },
      { text: 'Date of birth' },
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
      { text: 'Start date' },
      { text: 'Expiry date' }
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

      if (!((patient.certificateType === 'matex' || patient.certificateType === 'medex') && patient.channel === 'Digital')) {
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
        { html: addressHtml },
        { html: patient.address.postcode },
        { html: patient.dateOfBirth.display },
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
          { text: patient.startDate.display },
          { text: patient.endDate.display }
        ];

      }

      

      rows.push(obj);

    });

    return rows;

  };

  //
  // GET CHECKING TABLE ROWS
  //
  filters.getCheckingTableRows = function (patientData) {

    if (typeof patientData === 'string') {
      patientData = JSON.parse(patientData);
    }
  
    const rowsPerPage = 5;
    const currentPage = Number.isInteger(parseInt(this.ctx.data.currentPage))
      ? parseInt(this.ctx.data.currentPage)
      : 0;
  
    const start = currentPage * rowsPerPage;
    const end = start + rowsPerPage;
  
    const rows = [];
    let checkingIndex = 0;
    let checkingTotal = 0;
  
    for (let i = 0; i < patientData.length; i++) {
  
      const patient = patientData[i];
  
      if (patient.checking === true) {
        checkingTotal++;
  
        if (checkingIndex >= start && checkingIndex < end) {
  
          let addressHtml = '';

          if (!((patient.certificateType === 'matex' || patient.certificateType === 'medex') && patient.channel === 'Digital')) {
            const fullAddressLine1 = patient.address.buildingNumber + ' ' + patient.address.streetName;
            const hadMore = patient.address.locality || patient.address.postTown || patient.address.county;
          
            addressHtml = hadMore
              ? fullAddressLine1 + '...'
              : fullAddressLine1;
          }
  
          rows.push([
            {
              html:
                '<a class="nhsuk-link nhsuk-link--no-visited-state" href="' +
                patient.certificateType +
                '/application--correction?patientID=' +
                patient.id +
                '"><strong>' +
                patient.firstName +
                ' ' +
                patient.lastName +
                '</strong></a><br />' +
                '<span class="nhsuk-body-s">' +
                patient.nhsNumber +
                '</span>'
            },
            { html: addressHtml },
            { html: patient.address.postcode },
            { html: patient.dateOfBirth.display },
            { html: _getCertificateTypeTextOrTag(patient.certificateType, true) },
            {
              html:
                _getStatusTextOrTag(patient.status, true) +
                ' ' +
                _getStatusTextOrTag('checking', true)
            },
            {
              html:
                patient.status === 'processing'
                  ? '<span class="nhsuk-body-s nhsuk-u-secondary-text-colour">' +
                    patient.certificateReference +
                    '</span>'
                  : patient.certificateReference
            }
          ]);
        }
  
        checkingIndex++;
      }
    }
  
    this.ctx.data.noOfCheckingRows = checkingTotal;
    return rows;
  };

  
  //
  // CHECKING PAGINATION LINKS
  //
  filters.getCheckingPaginationLinks = function (classes) {

    const rowsPerPage = 5;
    const currentPage = Number.isInteger(parseInt(this.ctx.data.currentPage))
      ? parseInt(this.ctx.data.currentPage)
      : 0;

    const total = Number.isInteger(this.ctx.data.noOfCheckingRows)
      ? this.ctx.data.noOfCheckingRows
      : 0;

    const totalPages = Math.ceil(total / rowsPerPage);
    const obj = {};

    if (totalPages > 1) {

      const items = [];

      if (currentPage > 0) {
        obj.previous = { href: '?currentPage=' + (currentPage - 1) };
      }

      if (currentPage < totalPages - 1) {
        obj.next = { href: '?currentPage=' + (currentPage + 1) };
      }

      for (let i = 0; i < totalPages; i++) {
        items.push({
          number: i + 1,
          href: '?currentPage=' + i,
          current: i === currentPage
        });
      }

      obj.items = items;
    }

    if (classes) obj.classes = classes;

    return obj;
  };

  filters.getCheckingResultsSummary = function () {

    const rowsPerPage = 5;
    const currentPage = Number.isInteger(parseInt(this.ctx.data.currentPage))
      ? parseInt(this.ctx.data.currentPage)
      : 0;
  
    const total = Number.isInteger(this.ctx.data.noOfCheckingRows)
      ? this.ctx.data.noOfCheckingRows
      : 0;
  
    const start = (currentPage * rowsPerPage) + 1;
    const end = Math.min(start + rowsPerPage - 1, total);
  
    return `${start} to ${end} of ${total} applications`;
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

     if (this.ctx.data.searchDateOfBirth ) {

      const dayCheck = ( this.ctx.data.searchDateOfBirth.day && this.ctx.data.searchDateOfBirth.day.trim() !== '' ) ? true : false;
      const monthCheck = ( this.ctx.data.searchDateOfBirth.month && this.ctx.data.searchDateOfBirth.month.trim() !== '' ) ? true : false;
      const yearCheck = ( this.ctx.data.searchDateOfBirth.year && this.ctx.data.searchDateOfBirth.year.trim() !== '' ) ? true : false;
      
      if( dayCheck && monthCheck && yearCheck ){
        searchTerms.dateOfBirth = _tidySearchDate(this.ctx.data.searchDateOfBirth);
        summary.push('"' + _processDate(searchTerms.dateOfBirth) + '" in date of birth');
      }

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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"497 085 5055","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"11 June 1997","day":11,"month":5,"year":1997},"checking":true,"certificateReference":"49 283 849 347","channel":"Paper","startDate":{"display":"19 November 2025","day":19,"month":10,"year":2025},"endDate":{"display":"18 November 2026","day":18,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07031 284 591","emailAddress":"o.smith@hotmail.com","checkType":"quality","imageReference":"2026 05 28 09 37 26N153766052","medicalCondition":["(1) Permanent fistula"],"dueDate":{"display":"12 July 2025","day":12,"month":6,"year":2025},"childsDOB":{"display":"19 November 2025","day":19,"month":10,"year":2025}},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"561 446 4459","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"2 February 2002","day":2,"month":1,"year":2002},"checking":false,"certificateReference":"10 288 937 642","channel":"Paper","imageReference":"2026 05 28 09 37 26N486106376","startDate":{"display":"2 June 2025","day":2,"month":5,"year":2025},"dueDate":{"display":"12 June 2025","day":12,"month":5,"year":2025},"endDate":{"display":"1 June 2026","day":1,"month":5,"year":2026},"childsDOB":{"display":"2 June 2025","day":2,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07049 823 716","emailAddress":"amelia.jones@googlemail.com","medicalCondition":["(1) Permanent fistula"],"checkType":"supervisor"},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"517 319 8861","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"15 May 1967","day":15,"month":4,"year":1967},"checking":false,"certificateReference":"82 176 222 138","channel":"Digital","imageReference":"2026 05 28 09 36 32N688233707","startDate":{"display":"27 June 2025","day":27,"month":5,"year":2025},"dueDate":{"display":"8 July 2025","day":8,"month":6,"year":2025},"endDate":{"display":"26 June 2035","day":26,"month":5,"year":2035},"childsDOB":{"display":"10 August 2025","day":10,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 395 184","emailAddress":"isla.taylor@gmail.com","checkType":"supervisor","medicalCondition":["(5) Hypoparathyroidism"]},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"613 971 3958","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"25 September 1982","day":25,"month":8,"year":1982},"checking":false,"certificateReference":"HRT M2J7 B3F8","channel":"Digital","startDate":{"display":"12 June 2025","day":12,"month":5,"year":2025},"dueDate":{"display":"3 October 2025","day":3,"month":9,"year":2025},"endDate":{"display":"11 June 2026","day":11,"month":5,"year":2026},"childsDOB":{"display":"13 October 2025","day":13,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07071 528 439","emailAddress":"Brown323@gmail.com","checkType":"supervisor","imageReference":"2026 05 28 09 36 21N513258445","medicalCondition":["(7) Forms of hypoadrenalism"]},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"901 482 2779","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"15 August 2008","day":15,"month":7,"year":2008},"checking":false,"certificateReference":"20 889 399 173","channel":"Paper","imageReference":"2026 05 28 09 37 26N569207673","startDate":{"display":"23 October 2025","day":23,"month":9,"year":2025},"medicalCondition":["(6) Diabetes insipidus","(7) Forms of hypoadrenalism"],"endDate":{"display":"22 October 2026","day":22,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07083 916 275","emailAddress":"williams.e@outlook.com","checkType":"supervisor","dueDate":{"display":"30 October 2025","day":30,"month":9,"year":2025},"childsDOB":{"display":"23 October 2025","day":23,"month":9,"year":2025}},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"363 348 6912","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"24 October 1990","day":24,"month":9,"year":1990},"checking":false,"checkType":"quality","certificateReference":"HRT 2QRI XSZU","channel":"Digital","imageReference":"2026 05 28 09 36 36N148559062","startDate":{"display":"1 August 2025","day":1,"month":7,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"31 July 2026","day":31,"month":6,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07092 475 318","emailAddress":"wilson.s@gmail.com"},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"960 642 3547","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"6 February 1998","day":6,"month":1,"year":1998},"checking":false,"certificateReference":"35 610 690 416","channel":"Digital","imageReference":"2026 05 28 09 37 22N905156676","startDate":{"display":"1 June 2025","day":1,"month":5,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"31 May 2026","day":31,"month":4,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07015 648 293","emailAddress":"Davies354@googlemail.com","dueDate":{"display":"11 August 2025","day":11,"month":7,"year":2025},"childsDOB":{"display":"1 June 2025","day":1,"month":5,"year":2025},"checkType":"quality"},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"940 401 2605","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"14 August 1966","day":14,"month":7,"year":1966},"checking":false,"checkType":"quality","certificateReference":"HRT 0TJ2 B568","channel":"Digital","imageReference":"2026 05 28 09 36 21N617008988","startDate":{"display":"3 August 2025","day":3,"month":7,"year":2025},"dueDate":{"display":"17 November 2025","day":17,"month":10,"year":2025},"endDate":{"display":"2 August 2026","day":2,"month":7,"year":2026},"childsDOB":{"display":"4 July 2025","day":4,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 751 964","emailAddress":"e.evans@blueyonder.co.uk","medicalCondition":["(5) Hypoparathyroidism"]},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"832 277 5971","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"25 August 1979","day":25,"month":7,"year":1979},"checking":false,"certificateReference":"HRT 4LT8 5LPC","channel":"Digital","startDate":{"display":"14 June 2025","day":14,"month":5,"year":2025},"dueDate":{"display":"29 August 2025","day":29,"month":7,"year":2025},"endDate":{"display":"13 June 2026","day":13,"month":5,"year":2026},"childsDOB":{"display":"15 June 2025","day":15,"month":5,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07036 592 817","emailAddress":"g.thomas@googlemail.com","checkType":"supervisor","imageReference":"2026 05 28 09 37 22N884357649","medicalCondition":["(2) Epilepsy"]},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"110 404 5810","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"25 September 1990","day":25,"month":8,"year":1990},"checking":false,"certificateReference":"64 182 963 029","channel":"Paper","startDate":{"display":"19 October 2025","day":19,"month":9,"year":2025},"endDate":{"display":"18 October 2026","day":18,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07047 813 256","emailAddress":"l.roberts@blueyonder.co.uk","imageReference":"2026 05 28 09 37 26N945586196","dueDate":{"display":"11 June 2025","day":11,"month":5,"year":2025},"childsDOB":{"display":"19 October 2025","day":19,"month":9,"year":2025},"checkType":"supervisor","medicalCondition":["(4) Myxoedema"]},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"149 976 8845","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"8 April 1997","day":8,"month":3,"year":1997},"checking":true,"certificateReference":"50 065 873 025","channel":"Paper","startDate":{"display":"30 June 2025","day":30,"month":5,"year":2025},"endDate":{"display":"29 June 2026","day":29,"month":5,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07051 294 783","emailAddress":"f.johnson@googlemail.com","checkType":"quality","imageReference":"2026 05 28 09 37 26N042120304","dueDate":{"display":"16 August 2025","day":16,"month":7,"year":2025},"childsDOB":{"display":"30 June 2025","day":30,"month":5,"year":2025},"medicalCondition":["(1) Permanent fistula","(2) Epilepsy","(9) Continuing physical disability"]},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"553 732 5113","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"4 April 1994","day":4,"month":3,"year":1994},"checking":false,"certificateReference":"20 044 938 522","channel":"Paper","imageReference":"2026 05 28 09 37 26N717389690","startDate":{"display":"8 October 2025","day":8,"month":9,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"7 October 2035","day":7,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07063 418 592","emailAddress":"c.lewis@hotmail.com","dueDate":{"display":"4 July 2025","day":4,"month":6,"year":2025},"childsDOB":{"display":"13 September 2025","day":13,"month":8,"year":2025},"checkType":"supervisor"},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"582 972 6958","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"15 March 1998","day":15,"month":2,"year":1998},"checking":true,"certificateReference":"19 939 943 626","channel":"Paper","imageReference":"2026 05 28 09 37 26N723116440","startDate":{"display":"14 September 2025","day":14,"month":8,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"13 September 2026","day":13,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07075 928 341","emailAddress":"isabella.walker@googlemail.com","dueDate":{"display":"16 November 2025","day":16,"month":10,"year":2025},"childsDOB":{"display":"14 September 2025","day":14,"month":8,"year":2025},"checkType":"supervisor"},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"419 313 0674","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"3 October 1996","day":3,"month":9,"year":1996},"checking":true,"certificateReference":"82 141 152 020","channel":"Paper","imageReference":"2026 05 28 09 37 26N626000650","startDate":{"display":"21 November 2025","day":21,"month":10,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"20 November 2026","day":20,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07084 372 659","checkType":"supervisor","dueDate":{"display":"19 October 2025","day":19,"month":9,"year":2025},"childsDOB":{"display":"21 November 2025","day":21,"month":10,"year":2025}},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"107 407 7366","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"8 January 1991","day":8,"month":0,"year":1991},"checking":true,"certificateReference":"88 823 436 334","channel":"Paper","startDate":{"display":"26 August 2025","day":26,"month":7,"year":2025},"endDate":{"display":"25 August 2026","day":25,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07091 837 426","emailAddress":"Clarke601@googlemail.com","imageReference":"2026 05 28 09 37 26N803876264","dueDate":{"display":"8 September 2025","day":8,"month":8,"year":2025},"childsDOB":{"display":"26 August 2025","day":26,"month":7,"year":2025},"checkType":"supervisor"},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"091 666 3758","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"processing","dateOfBirth":{"display":"17 January 1983","day":17,"month":0,"year":1983},"checking":false,"certificateReference":"56 516 980 643","channel":"Paper","startDate":{"display":"14 November 2025","day":14,"month":10,"year":2025},"medicalCondition":["(4) Myxoedema","(5) Hypoparathyroidism"],"endDate":{"display":"13 November 2035","day":13,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 385 927","emailAddress":"phoebe.allen@gmail.com","checkType":"supervisor","imageReference":"2026 05 28 09 37 26N396251978","dueDate":{"display":"15 June 2025","day":15,"month":5,"year":2025},"childsDOB":{"display":"22 September 2025","day":22,"month":8,"year":2025}},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"412 330 5017","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"4 June 1984","day":4,"month":5,"year":1984},"checking":false,"checkType":"quality","certificateReference":"HRT TV51 8B7G","channel":"Digital","imageReference":"2026 05 28 09 36 32N605888369","startDate":{"display":"9 August 2025","day":9,"month":7,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"8 August 2026","day":8,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07027 639 485","emailAddress":"Young901@googlemail.com"},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"670 706 6009","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"1 February 1993","day":1,"month":1,"year":1993},"checking":false,"certificateReference":"61 499 831 271","channel":"Paper","startDate":{"display":"30 June 2025","day":30,"month":5,"year":2025},"dueDate":{"display":"6 June 2025","day":6,"month":5,"year":2025},"endDate":{"display":"29 June 2026","day":29,"month":5,"year":2026},"childsDOB":{"display":"30 June 2025","day":30,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07035 821 749","emailAddress":"h.king561@hotmail.com","checkType":"supervisor","imageReference":"2026 05 28 09 37 26N564922662"},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"659 783 5954","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"6 May 1979","day":6,"month":4,"year":1979},"checking":false,"checkType":"supervisor","certificateReference":"86 164 010 597","channel":"Paper","imageReference":"2026 05 28 09 37 26N291859666","startDate":{"display":"4 October 2025","day":4,"month":9,"year":2025},"dueDate":{"display":"7 July 2025","day":7,"month":6,"year":2025},"endDate":{"display":"3 October 2035","day":3,"month":9,"year":2035},"childsDOB":{"display":"5 November 2025","day":5,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07048 952 613","emailAddress":"m.wright@hotmail.com","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"127 992 9776","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"22 January 1983","day":22,"month":0,"year":1983},"checking":false,"certificateReference":"10 417 992 945","channel":"Paper","imageReference":"2026 05 28 09 37 26N963294374","startDate":{"display":"23 July 2025","day":23,"month":6,"year":2025},"dueDate":{"display":"11 July 2025","day":11,"month":6,"year":2025},"endDate":{"display":"22 July 2035","day":22,"month":6,"year":2035},"childsDOB":{"display":"20 June 2025","day":20,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07052 719 384","emailAddress":"Green383@gmail.com","checkType":"quality","medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"977 344 5660","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"3 April 1993","day":3,"month":3,"year":1993},"checking":true,"checkType":"quality","certificateReference":"61 435 930 600","channel":"Paper","imageReference":"2026 05 28 09 37 26N639112498","startDate":{"display":"24 September 2025","day":24,"month":8,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"23 September 2026","day":23,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07064 837 295","emailAddress":"poppy.baker@aol.com","dueDate":{"display":"13 October 2025","day":13,"month":9,"year":2025},"childsDOB":{"display":"24 September 2025","day":24,"month":8,"year":2025}},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"508 973 5216","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"8 September 1983","day":8,"month":8,"year":1983},"checking":false,"certificateReference":"61 903 703 466","channel":"Digital","startDate":{"display":"23 July 2025","day":23,"month":6,"year":2025},"dueDate":{"display":"4 July 2025","day":4,"month":6,"year":2025},"endDate":{"display":"22 July 2035","day":22,"month":6,"year":2035},"childsDOB":{"display":"17 June 2025","day":17,"month":5,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07073 491 826","emailAddress":"r.adams225@outlook.com","checkType":"supervisor","imageReference":"2026 05 28 09 36 36N679237915","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"195 593 1689","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"9 June 1990","day":9,"month":5,"year":1990},"checking":false,"certificateReference":"88 943 020 288","channel":"Paper","startDate":{"display":"7 September 2025","day":7,"month":8,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"6 September 2026","day":6,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07085 623 941","emailAddress":"Mitchell576@outlook.com","imageReference":"2026 05 28 09 37 26N372490560","dueDate":{"display":"1 November 2025","day":1,"month":10,"year":2025},"childsDOB":{"display":"7 September 2025","day":7,"month":8,"year":2025},"checkType":"supervisor"},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"392 307 0505","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"3 December 1990","day":3,"month":11,"year":1990},"checking":true,"certificateReference":"80 358 072 549","channel":"Paper","startDate":{"display":"1 October 2025","day":1,"month":9,"year":2025},"medicalCondition":["(5) Hypoparathyroidism","(7) Forms of hypoadrenalism","(8) Myasthenia gravis"],"endDate":{"display":"30 September 2026","day":30,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07096 718 235","checkType":"supervisor","imageReference":"2026 05 28 09 37 26N930511173","dueDate":{"display":"27 July 2025","day":27,"month":6,"year":2025},"childsDOB":{"display":"1 October 2025","day":1,"month":9,"year":2025}},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"851 712 6059","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"3 May 1991","day":3,"month":4,"year":1991},"checking":false,"certificateReference":"HRT FDSX B8LC","channel":"Digital","imageReference":"2026 05 28 09 36 36N977458886","startDate":{"display":"4 September 2025","day":4,"month":8,"year":2025},"dueDate":{"display":"2 September 2025","day":2,"month":8,"year":2025},"endDate":{"display":"3 September 2026","day":3,"month":8,"year":2026},"childsDOB":{"display":"13 June 2025","day":13,"month":5,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07018 273 945","emailAddress":"w.carter@gmail.com","checkType":"supervisor","medicalCondition":["(1) Permanent fistula","(5) Hypoparathyroidism"]},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"577 279 8836","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"26 February 1981","day":26,"month":1,"year":1981},"checking":false,"certificateReference":"07 112 732 469","channel":"Digital","startDate":{"display":"28 July 2025","day":28,"month":6,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"27 July 2035","day":27,"month":6,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07029 384 756","emailAddress":"j.morris@gmail.com","dueDate":{"display":"8 June 2025","day":8,"month":5,"year":2025},"childsDOB":{"display":"25 September 2025","day":25,"month":8,"year":2025},"imageReference":"2026 05 28 09 36 36N072124393","checkType":"supervisor"},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"588 150 6641","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"10 December 1993","day":10,"month":11,"year":1993},"checking":false,"certificateReference":"HRT NF7U OQTX","channel":"Digital","startDate":{"display":"1 June 2025","day":1,"month":5,"year":2025},"endDate":{"display":"31 May 2026","day":31,"month":4,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07031 572 948","emailAddress":"Hughes698@hotmail.com","imageReference":"2026 05 28 09 36 32N542318923","dueDate":{"display":"1 November 2025","day":1,"month":10,"year":2025},"childsDOB":{"display":"16 November 2025","day":16,"month":10,"year":2025}},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"176 249 7927","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"3 December 1966","day":3,"month":11,"year":1966},"checking":false,"certificateReference":"HRT 76Z6 K36F","channel":"Digital","startDate":{"display":"12 August 2025","day":12,"month":7,"year":2025},"endDate":{"display":"11 August 2026","day":11,"month":7,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07042 619 583","emailAddress":"e.ward@hotmail.com","checkType":"supervisor","imageReference":"2026 05 28 09 37 22N796051301","dueDate":{"display":"20 October 2025","day":20,"month":9,"year":2025},"childsDOB":{"display":"11 August 2025","day":11,"month":7,"year":2025},"medicalCondition":["(1) Permanent fistula","(5) Hypoparathyroidism","(8) Myasthenia gravis"]},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"109 725 8556","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"19 August 1989","day":19,"month":7,"year":1989},"checking":false,"certificateReference":"56 464 851 077","channel":"Paper","startDate":{"display":"30 May 2025","day":30,"month":4,"year":2025},"endDate":{"display":"29 May 2026","day":29,"month":4,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07053 847 261","emailAddress":"price.r@gmail.com","imageReference":"2026 05 28 09 37 26N764951434","medicalCondition":["(6) Diabetes insipidus"],"dueDate":{"display":"15 October 2025","day":15,"month":9,"year":2025},"childsDOB":{"display":"30 May 2025","day":30,"month":4,"year":2025}},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"899 055 2977","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"16 July 1996","day":16,"month":6,"year":1996},"checking":false,"certificateReference":"HRT PR1H B0JP","channel":"Digital","imageReference":"2026 05 28 09 37 22N735187445","startDate":{"display":"20 June 2025","day":20,"month":5,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"19 June 2026","day":19,"month":5,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07064 928 137","emailAddress":"cooper.a@outlook.com","checkType":"supervisor","dueDate":{"display":"24 October 2025","day":24,"month":9,"year":2025},"childsDOB":{"display":"29 October 2025","day":29,"month":9,"year":2025}},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"164 698 3170","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"10 July 1969","day":10,"month":6,"year":1969},"checking":false,"checkType":"supervisor","certificateReference":"HRT DBTM PMZS","channel":"Digital","imageReference":"2026 05 28 09 37 22N178088663","startDate":{"display":"28 July 2025","day":28,"month":6,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"27 July 2026","day":27,"month":6,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07075 283 916","emailAddress":"bailey.l@blueyonder.co.uk","dueDate":{"display":"19 June 2025","day":19,"month":5,"year":2025},"childsDOB":{"display":"15 September 2025","day":15,"month":8,"year":2025}},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"374 094 0939","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"17 January 1991","day":17,"month":0,"year":1991},"checking":false,"checkType":"quality","certificateReference":"69 157 883 155","channel":"Paper","imageReference":"2026 05 28 09 37 26N620757093","startDate":{"display":"18 September 2025","day":18,"month":8,"year":2025},"dueDate":{"display":"18 July 2025","day":18,"month":6,"year":2025},"endDate":{"display":"17 September 2026","day":17,"month":8,"year":2026},"childsDOB":{"display":"18 September 2025","day":18,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07086 419 375","emailAddress":"l.parker462@outlook.com","medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"594 959 0042","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"27 December 1974","day":27,"month":11,"year":1974},"checking":false,"checkType":"supervisor","certificateReference":"82 910 327 648","channel":"Digital","imageReference":"2026 05 28 09 37 22N229184026","startDate":{"display":"7 October 2025","day":7,"month":9,"year":2025},"dueDate":{"display":"7 September 2025","day":7,"month":8,"year":2025},"endDate":{"display":"6 October 2035","day":6,"month":9,"year":2035},"childsDOB":{"display":"26 August 2025","day":26,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07097 531 284","emailAddress":"hannah.phillips@gmail.com","medicalCondition":["(4) Myxoedema"]},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"171 787 3233","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"16 April 1994","day":16,"month":3,"year":1994},"checking":false,"certificateReference":"HRT 68NM HGEV","channel":"Pharmacy","imageReference":"2026 05 28 09 36 32N187410571","startDate":{"display":"23 September 2025","day":23,"month":8,"year":2025},"dueDate":{"display":"2 November 2025","day":2,"month":10,"year":2025},"endDate":{"display":"22 September 2026","day":22,"month":8,"year":2026},"childsDOB":{"display":"10 July 2025","day":10,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07018 642 597","emailAddress":"Bennett765@blueyonder.co.uk","checkType":"supervisor","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"162 081 5783","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"11 July 1984","day":11,"month":6,"year":1984},"checking":false,"certificateReference":"12 390 249 017","channel":"Paper","imageReference":"2026 05 28 09 37 26N624185092","startDate":{"display":"18 October 2025","day":18,"month":9,"year":2025},"medicalCondition":["(6) Diabetes insipidus","(7) Forms of hypoadrenalism","(9) Continuing physical disability"],"endDate":{"display":"17 October 2035","day":17,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07029 753 861","checkType":"supervisor","dueDate":{"display":"23 June 2025","day":23,"month":5,"year":2025},"childsDOB":{"display":"6 August 2025","day":6,"month":7,"year":2025}},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"401 226 9733","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"7 November 1990","day":7,"month":10,"year":1990},"checking":false,"checkType":"supervisor","certificateReference":"70 699 176 709","channel":"Digital","imageReference":"2026 05 28 09 36 36N473284372","startDate":{"display":"19 July 2025","day":19,"month":6,"year":2025},"dueDate":{"display":"3 November 2025","day":3,"month":10,"year":2025},"endDate":{"display":"18 July 2030","day":18,"month":6,"year":2030},"childsDOB":{"display":"22 August 2025","day":22,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07031 864 729","emailAddress":"maya.richardson@hotmail.com","medicalCondition":["(10) Cancer"]},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"697 395 3677","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"processing","dateOfBirth":{"display":"5 June 2004","day":5,"month":5,"year":2004},"checking":false,"certificateReference":"77 873 556 213","channel":"Paper","startDate":{"display":"13 August 2025","day":13,"month":7,"year":2025},"dueDate":{"display":"25 November 2025","day":25,"month":10,"year":2025},"endDate":{"display":"12 August 2026","day":12,"month":7,"year":2026},"childsDOB":{"display":"13 August 2025","day":13,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07042 987 513","emailAddress":"esme.gray@gmail.com","imageReference":"2026 05 28 09 37 26N777673073","checkType":"supervisor","medicalCondition":["(9) Continuing physical disability","(10) Cancer"]},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"456 595 4695","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"4 September 1975","day":4,"month":8,"year":1975},"checking":false,"certificateReference":"41 387 389 179","channel":"Digital","imageReference":"2026 05 28 09 37 22N738949181","startDate":{"display":"23 July 2025","day":23,"month":6,"year":2025},"medicalCondition":["(2) Epilepsy","(3) Diabetes mellitus","(4) Myxoedema"],"endDate":{"display":"22 July 2035","day":22,"month":6,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07054 129 876","emailAddress":"ross.i@aol.com","dueDate":{"display":"7 September 2025","day":7,"month":8,"year":2025},"childsDOB":{"display":"1 October 2025","day":1,"month":9,"year":2025},"checkType":"supervisor"},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"286 677 4909","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"7 September 2005","day":7,"month":8,"year":2005},"checking":true,"certificateReference":"56 211 657 649","channel":"Paper","imageReference":"2026 05 28 09 37 26N742091197","startDate":{"display":"21 October 2025","day":21,"month":9,"year":2025},"dueDate":{"display":"13 October 2025","day":13,"month":9,"year":2025},"endDate":{"display":"20 October 2026","day":20,"month":9,"year":2026},"childsDOB":{"display":"21 October 2025","day":21,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07065 238 741","emailAddress":"arabella.bell@hotmail.com","medicalCondition":["(2) Epilepsy","(8) Myasthenia gravis"],"checkType":"supervisor"},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"817 769 3651","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"12 June 1985","day":12,"month":5,"year":1985},"checking":false,"certificateReference":"10 556 043 662","channel":"Paper","startDate":{"display":"19 June 2025","day":19,"month":5,"year":2025},"endDate":{"display":"18 June 2030","day":18,"month":5,"year":2030},"certificateFulfilment":"post","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07076 391 825","emailAddress":"cook.e@aol.com","checkType":"supervisor","imageReference":"2026 05 28 09 37 26N421011157","dueDate":{"display":"7 August 2025","day":7,"month":7,"year":2025},"childsDOB":{"display":"25 June 2025","day":25,"month":5,"year":2025},"medicalCondition":["(10) Cancer"]},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"883 113 7883","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"7 March 1966","day":7,"month":2,"year":1966},"checking":false,"certificateReference":"HRT DACP OP43","channel":"Digital","startDate":{"display":"10 October 2025","day":10,"month":9,"year":2025},"dueDate":{"display":"5 June 2025","day":5,"month":5,"year":2025},"endDate":{"display":"9 October 2026","day":9,"month":9,"year":2026},"childsDOB":{"display":"27 September 2025","day":27,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07087 512 936","emailAddress":"t.watson@gmail.com","imageReference":"2026 05 28 09 37 22N355965966","medicalCondition":["(3) Diabetes mellitus"],"checkType":"supervisor"},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"260 895 5249","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"21 April 1981","day":21,"month":3,"year":1981},"checking":false,"certificateReference":"37 203 012 103","channel":"Digital","startDate":{"display":"12 October 2025","day":12,"month":9,"year":2025},"medicalCondition":["(1) Permanent fistula","(4) Myxoedema","(5) Hypoparathyroidism"],"endDate":{"display":"11 October 2035","day":11,"month":9,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07098 631 427","emailAddress":"alice.sanders521@googlemail.com","imageReference":"2026 05 28 09 37 22N363778751","dueDate":{"display":"17 June 2025","day":17,"month":5,"year":2025},"childsDOB":{"display":"17 July 2025","day":17,"month":6,"year":2025},"checkType":"supervisor"},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"014 407 4813","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"16 March 1983","day":16,"month":2,"year":1983},"checking":false,"certificateReference":"HRT SHQS L4MY","channel":"Digital","startDate":{"display":"23 November 2025","day":23,"month":10,"year":2025},"endDate":{"display":"22 November 2026","day":22,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07019 742 835","emailAddress":"e.harrison649@outlook.com","checkType":"supervisor","imageReference":"2026 05 28 09 37 22N699320414","dueDate":{"display":"3 September 2025","day":3,"month":8,"year":2025},"childsDOB":{"display":"7 October 2025","day":7,"month":9,"year":2025}},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"433 074 4544","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"26 October 1994","day":26,"month":9,"year":1994},"checking":false,"certificateReference":"21 370 574 638","channel":"Paper","startDate":{"display":"12 October 2025","day":12,"month":9,"year":2025},"endDate":{"display":"11 October 2035","day":11,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07020 853 749","emailAddress":"l.coleman@blueyonder.co.uk","checkType":"supervisor","imageReference":"2026 05 28 09 37 26N567897090","dueDate":{"display":"23 August 2025","day":23,"month":7,"year":2025},"childsDOB":{"display":"19 June 2025","day":19,"month":5,"year":2025},"medicalCondition":["(2) Epilepsy"]},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"831 391 1481","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"11 May 1986","day":11,"month":4,"year":1986},"checking":false,"certificateReference":"HRT KOQ0 NMS7","channel":"Digital","imageReference":"2026 05 28 09 36 36N156077362","startDate":{"display":"27 June 2025","day":27,"month":5,"year":2025},"dueDate":{"display":"26 October 2025","day":26,"month":9,"year":2025},"endDate":{"display":"26 June 2026","day":26,"month":5,"year":2026},"childsDOB":{"display":"14 August 2025","day":14,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07031 984 625","emailAddress":"a.murphy@blueyonder.co.uk","checkType":"quality","medicalCondition":["(7) Forms of hypoadrenalism"]},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"682 135 1396","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"1 February 1969","day":1,"month":1,"year":1969},"checking":false,"certificateReference":"43 198 004 600","channel":"Digital","imageReference":"2026 05 28 09 37 22N778425443","startDate":{"display":"27 November 2025","day":27,"month":10,"year":2025},"dueDate":{"display":"14 August 2025","day":14,"month":7,"year":2025},"endDate":{"display":"26 November 2035","day":26,"month":10,"year":2035},"childsDOB":{"display":"9 July 2025","day":9,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07042 195 783","emailAddress":"scarlett.graham@aol.com","medicalCondition":["(8) Myasthenia gravis"],"checkType":"quality"},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"773 676 6160","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"15 August 1984","day":15,"month":7,"year":1984},"checking":false,"certificateReference":"HRT IWYQ 2EWX","channel":"Digital","startDate":{"display":"13 June 2025","day":13,"month":5,"year":2025},"endDate":{"display":"12 June 2026","day":12,"month":5,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07053 268 917","emailAddress":"stevens.b@googlemail.com","imageReference":"2026 05 28 09 36 36N733972040","dueDate":{"display":"16 October 2025","day":16,"month":9,"year":2025},"childsDOB":{"display":"28 October 2025","day":28,"month":9,"year":2025},"checkType":"supervisor","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"137 064 1887","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"4 June 1979","day":4,"month":5,"year":1979},"checking":false,"certificateReference":"HRT TNUE BOMY","channel":"Digital","startDate":{"display":"19 August 2025","day":19,"month":7,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"18 August 2026","day":18,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07064 371 528","emailAddress":"i.simpson702@blueyonder.co.uk","imageReference":"2026 05 28 09 37 22N544903154","dueDate":{"display":"8 June 2025","day":8,"month":5,"year":2025},"childsDOB":{"display":"3 July 2025","day":3,"month":6,"year":2025}},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"568 484 2586","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"20 August 2000","day":20,"month":7,"year":2000},"checking":true,"certificateReference":"12 949 292 359","channel":"Paper","startDate":{"display":"21 October 2025","day":21,"month":9,"year":2025},"endDate":{"display":"20 October 2026","day":20,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07075 482 936","emailAddress":"butler.h@aol.com","imageReference":"2026 05 28 09 37 26N946878130","dueDate":{"display":"23 November 2025","day":23,"month":10,"year":2025},"childsDOB":{"display":"21 October 2025","day":21,"month":9,"year":2025},"checkType":"supervisor"},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"059 569 9172","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"11 December 1983","day":11,"month":11,"year":1983},"checking":false,"certificateReference":"HRT AE4X 61S3","channel":"Digital","startDate":{"display":"23 July 2025","day":23,"month":6,"year":2025},"endDate":{"display":"22 July 2026","day":22,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07086 593 147","emailAddress":"Chapman112@outlook.com","imageReference":"2026 05 28 09 36 36N200609763","medicalCondition":["(4) Myxoedema"],"dueDate":{"display":"26 October 2025","day":26,"month":9,"year":2025},"childsDOB":{"display":"24 August 2025","day":24,"month":7,"year":2025}},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"527 636 5176","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"19 September 1994","day":19,"month":8,"year":1994},"checking":false,"certificateReference":"94 809 307 417","channel":"Paper","startDate":{"display":"15 June 2025","day":15,"month":5,"year":2025},"endDate":{"display":"14 June 2026","day":14,"month":5,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07097 614 258","emailAddress":"aisha.ali@hotmail.com","medicalCondition":["(2) Epilepsy","(8) Myasthenia gravis","(9) Continuing physical disability"],"dueDate":{"display":"26 September 2025","day":26,"month":8,"year":2025},"childsDOB":{"display":"15 June 2025","day":15,"month":5,"year":2025},"checkType":"quality","imageReference":"2026 05 28 09 37 26N289939855"},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"289 911 5465","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"2 June 1978","day":2,"month":5,"year":1978},"checking":false,"certificateReference":"HRT USKL W4BD","channel":"Digital","startDate":{"display":"6 November 2025","day":6,"month":10,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"5 November 2026","day":5,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07018 725 369","emailAddress":"s.hussain@hotmail.com","imageReference":"2026 05 28 09 36 36N785314144","checkType":"supervisor","dueDate":{"display":"16 June 2025","day":16,"month":5,"year":2025},"childsDOB":{"display":"26 November 2025","day":26,"month":10,"year":2025}},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"982 174 5147","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"26 May 1972","day":26,"month":4,"year":1972},"checking":false,"certificateReference":"HRT 7EHB 2YGD","channel":"Digital","startDate":{"display":"13 November 2025","day":13,"month":10,"year":2025},"endDate":{"display":"12 November 2026","day":12,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07029 836 471","emailAddress":"a.khan@blueyonder.co.uk","imageReference":"2026 05 28 09 36 36N751944295","dueDate":{"display":"13 October 2025","day":13,"month":9,"year":2025},"childsDOB":{"display":"1 September 2025","day":1,"month":8,"year":2025},"medicalCondition":["(3) Diabetes mellitus","(4) Myxoedema","(10) Cancer"],"checkType":"supervisor"},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"777 309 9931","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"2 August 2002","day":2,"month":7,"year":2002},"checking":true,"certificateReference":"24 706 526 408","channel":"Paper","imageReference":"2026 05 28 09 37 26N622218570","startDate":{"display":"24 November 2025","day":24,"month":10,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"23 November 2026","day":23,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07030 947 582","checkType":"supervisor","dueDate":{"display":"31 August 2025","day":31,"month":7,"year":2025},"childsDOB":{"display":"24 November 2025","day":24,"month":10,"year":2025}},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"991 193 0119","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"5 June 2002","day":5,"month":5,"year":2002},"checking":false,"certificateReference":"30 949 512 314","channel":"Paper","imageReference":"2026 05 28 09 37 26N926126627","startDate":{"display":"28 July 2025","day":28,"month":6,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"27 July 2026","day":27,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07042 058 693","emailAddress":"niamh.o’connor@blueyonder.co.uk","dueDate":{"display":"14 June 2025","day":14,"month":5,"year":2025},"childsDOB":{"display":"28 July 2025","day":28,"month":6,"year":2025},"checkType":"supervisor"},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"053 240 2570","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"25 September 1999","day":25,"month":8,"year":1999},"checking":false,"certificateReference":"37 934 143 856","channel":"Digital","startDate":{"display":"21 June 2025","day":21,"month":5,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"20 June 2026","day":20,"month":5,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07053 169 784","emailAddress":"aoife.kelly667@blueyonder.co.uk","checkType":"supervisor","imageReference":"2026 05 28 09 37 22N483832615","dueDate":{"display":"11 June 2025","day":11,"month":5,"year":2025},"childsDOB":{"display":"21 June 2025","day":21,"month":5,"year":2025}},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"077 726 4240","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"6 April 1970","day":6,"month":3,"year":1970},"checking":false,"checkType":"supervisor","certificateReference":"HRT OC03 J8EQ","channel":"Pharmacy","imageReference":"2026 05 28 09 37 22N701442099","startDate":{"display":"8 July 2025","day":8,"month":6,"year":2025},"dueDate":{"display":"16 June 2025","day":16,"month":5,"year":2025},"endDate":{"display":"7 July 2026","day":7,"month":6,"year":2026},"childsDOB":{"display":"28 May 2025","day":28,"month":4,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07064 271 895","emailAddress":"McCarthy604@blueyonder.co.uk","medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"603 264 8742","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"12 May 1994","day":12,"month":4,"year":1994},"checking":true,"certificateReference":"34 651 355 660","channel":"Paper","imageReference":"2026 05 28 09 37 26N941396636","startDate":{"display":"7 September 2025","day":7,"month":8,"year":2025},"dueDate":{"display":"27 September 2025","day":27,"month":8,"year":2025},"endDate":{"display":"6 September 2026","day":6,"month":8,"year":2026},"childsDOB":{"display":"7 September 2025","day":7,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07075 382 916","emailAddress":"orla.doyle@hotmail.com","medicalCondition":["(1) Permanent fistula"],"checkType":"supervisor"},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"844 037 4282","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"20 October 2008","day":20,"month":9,"year":2008},"checking":false,"checkType":"supervisor","certificateReference":"29 395 111 783","channel":"Paper","imageReference":"2026 05 28 09 37 26N081628101","startDate":{"display":"2 June 2025","day":2,"month":5,"year":2025},"dueDate":{"display":"26 July 2025","day":26,"month":6,"year":2025},"endDate":{"display":"1 June 2026","day":1,"month":5,"year":2026},"childsDOB":{"display":"2 June 2025","day":2,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07086 493 127","emailAddress":"cerys.griffiths712@gmail.com","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"819 291 3111","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"16 December 2004","day":16,"month":11,"year":2004},"checking":false,"certificateReference":"97 252 191 129","channel":"Paper","startDate":{"display":"21 June 2025","day":21,"month":5,"year":2025},"endDate":{"display":"20 June 2026","day":20,"month":5,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07097 514 238","checkType":"supervisor","imageReference":"2026 05 28 09 37 26N176636520","dueDate":{"display":"15 June 2025","day":15,"month":5,"year":2025},"childsDOB":{"display":"21 June 2025","day":21,"month":5,"year":2025}},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"984 184 8999","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"24 October 1988","day":24,"month":9,"year":1988},"checking":false,"certificateReference":"91 385 657 233","channel":"Digital","startDate":{"display":"27 July 2025","day":27,"month":6,"year":2025},"dueDate":{"display":"4 July 2025","day":4,"month":6,"year":2025},"endDate":{"display":"26 July 2026","day":26,"month":6,"year":2026},"childsDOB":{"display":"27 July 2025","day":27,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07018 625 349","emailAddress":"f.evans@googlemail.com","medicalCondition":["(8) Myasthenia gravis"],"imageReference":"2026 05 28 09 37 22N534484558","checkType":"supervisor"},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"826 414 1352","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"9 April 1999","day":9,"month":3,"year":1999},"checking":false,"certificateReference":"61 418 800 544","channel":"Digital","imageReference":"2026 05 28 09 36 32N508625249","startDate":{"display":"18 October 2025","day":18,"month":9,"year":2025},"dueDate":{"display":"12 October 2025","day":12,"month":9,"year":2025},"endDate":{"display":"17 October 2026","day":17,"month":9,"year":2026},"childsDOB":{"display":"18 October 2025","day":18,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07029 736 458","emailAddress":"macdonald.e@gmail.com","medicalCondition":["(10) Cancer"],"checkType":"supervisor"},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"185 562 7133","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"26 July 1968","day":26,"month":6,"year":1968},"checking":false,"certificateReference":"94 664 121 109","channel":"Paper","startDate":{"display":"25 August 2025","day":25,"month":7,"year":2025},"endDate":{"display":"24 August 2035","day":24,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07030 847 569","emailAddress":"fraser.s@gmail.com","checkType":"supervisor","imageReference":"2026 05 28 09 37 26N703383039","dueDate":{"display":"22 September 2025","day":22,"month":8,"year":2025},"childsDOB":{"display":"28 October 2025","day":28,"month":9,"year":2025},"medicalCondition":["(1) Permanent fistula"]},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"300 677 7775","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"18 November 1994","day":18,"month":10,"year":1994},"checking":false,"certificateReference":"HRT E0HW 2455","channel":"Digital","imageReference":"2026 05 28 09 36 32N208773336","startDate":{"display":"16 July 2025","day":16,"month":6,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism","(10) Cancer"],"endDate":{"display":"15 July 2026","day":15,"month":6,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07041 958 672","emailAddress":"armstrong.m@gmail.com","checkType":"supervisor","dueDate":{"display":"11 July 2025","day":11,"month":6,"year":2025},"childsDOB":{"display":"17 July 2025","day":17,"month":6,"year":2025}},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"703 348 4265","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"7 March 1989","day":7,"month":2,"year":1989},"checking":false,"certificateReference":"HRT DZ2R 31DC","channel":"Digital","startDate":{"display":"12 August 2025","day":12,"month":7,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"11 August 2026","day":11,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07052 069 783","emailAddress":"p.hunter@hotmail.com","dueDate":{"display":"25 August 2025","day":25,"month":7,"year":2025},"childsDOB":{"display":"2 October 2025","day":2,"month":9,"year":2025},"checkType":"supervisor","imageReference":"2026 05 28 09 37 22N842906881"},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"414 072 9220","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"17 December 1974","day":17,"month":11,"year":1974},"checking":false,"certificateReference":"HRT Y5NP G2JC","channel":"Digital","imageReference":"2026 05 28 09 36 32N639091548","startDate":{"display":"19 September 2025","day":19,"month":8,"year":2025},"dueDate":{"display":"11 July 2025","day":11,"month":6,"year":2025},"endDate":{"display":"18 September 2026","day":18,"month":8,"year":2026},"childsDOB":{"display":"30 August 2025","day":30,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07063 171 894","emailAddress":"c.lawrence@googlemail.com","medicalCondition":["(1) Permanent fistula","(2) Epilepsy"]},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"179 235 0246","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"8 August 1994","day":8,"month":7,"year":1994},"checking":false,"certificateReference":"HRT PGKD FZS6","channel":"Pharmacy","imageReference":"2026 05 28 09 36 36N390945841","startDate":{"display":"31 May 2025","day":31,"month":4,"year":2025},"dueDate":{"display":"7 August 2025","day":7,"month":7,"year":2025},"endDate":{"display":"30 May 2026","day":30,"month":4,"year":2026},"childsDOB":{"display":"24 June 2025","day":24,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07074 282 915","emailAddress":"beatrice.spencer@hotmail.com","checkType":"supervisor"},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"220 513 7987","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"16 June 1977","day":16,"month":5,"year":1977},"checking":false,"certificateReference":"29 815 250 057","channel":"Digital","imageReference":"2026 05 28 09 36 21N905465437","startDate":{"display":"2 June 2025","day":2,"month":5,"year":2025},"dueDate":{"display":"2 July 2025","day":2,"month":6,"year":2025},"endDate":{"display":"1 June 2030","day":1,"month":5,"year":2030},"childsDOB":{"display":"9 August 2025","day":9,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07085 393 126","emailAddress":"rogers.n@blueyonder.co.uk","medicalCondition":["(10) Cancer"]},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"630 249 3148","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"22 October 1995","day":22,"month":9,"year":1995},"checking":false,"certificateReference":"94 687 975 592","channel":"Digital","startDate":{"display":"27 October 2025","day":27,"month":9,"year":2025},"endDate":{"display":"26 October 2026","day":26,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07096 414 237","emailAddress":"a.watts718@googlemail.com","imageReference":"2026 05 28 09 37 22N671716579","dueDate":{"display":"9 June 2025","day":9,"month":5,"year":2025},"childsDOB":{"display":"27 October 2025","day":27,"month":9,"year":2025},"medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"961 376 4034","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"26 June 1988","day":26,"month":5,"year":1988},"checking":false,"checkType":"supervisor","certificateReference":"HRT 2J5Y O88X","channel":"Digital","imageReference":"2026 05 28 09 37 22N847556273","startDate":{"display":"19 November 2025","day":19,"month":10,"year":2025},"dueDate":{"display":"30 July 2025","day":30,"month":6,"year":2025},"endDate":{"display":"18 November 2026","day":18,"month":10,"year":2026},"childsDOB":{"display":"17 July 2025","day":17,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07017 525 348","emailAddress":"henderson.h@hotmail.com","medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"187 507 5659","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"19 July 2008","day":19,"month":6,"year":2008},"checking":true,"certificateReference":"31 138 465 764","channel":"Paper","startDate":{"display":"9 August 2025","day":9,"month":7,"year":2025},"dueDate":{"display":"25 September 2025","day":25,"month":8,"year":2025},"endDate":{"display":"8 August 2026","day":8,"month":7,"year":2026},"childsDOB":{"display":"9 August 2025","day":9,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07028 636 459","emailAddress":"palmer.r@gmail.com","medicalCondition":["(5) Hypoparathyroidism","(7) Forms of hypoadrenalism"],"checkType":"supervisor","imageReference":"2026 05 28 09 37 26N689505571"},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"814 020 4340","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"2 November 1973","day":2,"month":10,"year":1973},"checking":false,"certificateReference":"00 924 151 005","channel":"Digital","imageReference":"2026 05 28 09 36 28N659823849","startDate":{"display":"25 June 2025","day":25,"month":5,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"24 June 2035","day":24,"month":5,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07039 747 561","emailAddress":"Nicholson208@blueyonder.co.uk","checkType":"supervisor","dueDate":{"display":"27 September 2025","day":27,"month":8,"year":2025},"childsDOB":{"display":"20 September 2025","day":20,"month":8,"year":2025}},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"014 630 4307","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"28 June 2003","day":28,"month":5,"year":2003},"checking":true,"checkType":"supervisor","certificateReference":"24 871 636 309","channel":"Paper","imageReference":"2026 05 28 09 37 26N752523319","startDate":{"display":"25 November 2025","day":25,"month":10,"year":2025},"dueDate":{"display":"8 September 2025","day":8,"month":8,"year":2025},"endDate":{"display":"24 November 2026","day":24,"month":10,"year":2026},"childsDOB":{"display":"25 November 2025","day":25,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07040 858 673","emailAddress":"j.gardner@hotmail.com","medicalCondition":["(4) Myxoedema"]},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"987 637 5415","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"24 June 1981","day":24,"month":5,"year":1981},"checking":false,"certificateReference":"71 180 958 950","channel":"Digital","startDate":{"display":"20 November 2025","day":20,"month":10,"year":2025},"endDate":{"display":"19 November 2035","day":19,"month":10,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07051 969 782","emailAddress":"a.newton595@googlemail.com","dueDate":{"display":"6 August 2025","day":6,"month":7,"year":2025},"childsDOB":{"display":"16 September 2025","day":16,"month":8,"year":2025},"checkType":"supervisor","imageReference":"2026 05 28 09 36 36N959109130","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"617 335 9783","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"7 May 1999","day":7,"month":4,"year":1999},"checking":true,"certificateReference":"21 574 153 510","channel":"Paper","startDate":{"display":"17 October 2025","day":17,"month":9,"year":2025},"endDate":{"display":"16 October 2026","day":16,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07062 071 893","checkType":"supervisor","imageReference":"2026 05 28 09 37 26N218359306","dueDate":{"display":"3 June 2025","day":3,"month":5,"year":2025},"childsDOB":{"display":"17 October 2025","day":17,"month":9,"year":2025}},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"376 417 6726","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"18 January 1984","day":18,"month":0,"year":1984},"checking":false,"certificateReference":"48 871 857 120","channel":"Paper","startDate":{"display":"8 October 2025","day":8,"month":9,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"7 October 2035","day":7,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07073 182 914","emailAddress":"Harvey492@googlemail.com","dueDate":{"display":"13 November 2025","day":13,"month":10,"year":2025},"childsDOB":{"display":"24 July 2025","day":24,"month":6,"year":2025},"checkType":"supervisor","imageReference":"2026 05 28 09 37 26N376926463"},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"126 331 8214","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"5 July 1996","day":5,"month":6,"year":1996},"checking":true,"certificateReference":"98 342 754 701","channel":"Paper","imageReference":"2026 05 28 09 37 26N643419210","startDate":{"display":"16 July 2025","day":16,"month":6,"year":2025},"medicalCondition":["(4) Myxoedema","(5) Hypoparathyroidism","(6) Diabetes insipidus"],"endDate":{"display":"15 July 2026","day":15,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07084 293 125","dueDate":{"display":"13 June 2025","day":13,"month":5,"year":2025},"childsDOB":{"display":"16 July 2025","day":16,"month":6,"year":2025},"checkType":"supervisor"},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"229 907 7692","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"27 December 2004","day":27,"month":11,"year":2004},"checking":true,"certificateReference":"27 521 667 376","channel":"Paper","startDate":{"display":"7 October 2025","day":7,"month":9,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"6 October 2026","day":6,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07095 314 236","emailAddress":"e.silva@googlemail.com","imageReference":"2026 05 28 09 37 26N053633548","checkType":"supervisor","dueDate":{"display":"16 August 2025","day":16,"month":7,"year":2025},"childsDOB":{"display":"7 October 2025","day":7,"month":9,"year":2025}},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"466 169 1693","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"26 January 1980","day":26,"month":0,"year":1980},"checking":false,"certificateReference":"05 748 060 311","channel":"Paper","imageReference":"2026 05 28 09 37 26N070189934","startDate":{"display":"16 September 2025","day":16,"month":8,"year":2025},"dueDate":{"display":"28 July 2025","day":28,"month":6,"year":2025},"endDate":{"display":"15 September 2035","day":15,"month":8,"year":2035},"childsDOB":{"display":"2 September 2025","day":2,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07016 425 347","emailAddress":"leila.patel@outlook.com","checkType":"supervisor","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"464 231 3555","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"24 November 1990","day":24,"month":10,"year":1990},"checking":true,"certificateReference":"31 780 537 980","channel":"Paper","imageReference":"2026 05 28 09 37 26N434869137","startDate":{"display":"26 September 2025","day":26,"month":8,"year":2025},"medicalCondition":["(3) Diabetes mellitus","(4) Myxoedema"],"endDate":{"display":"25 September 2026","day":25,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07027 536 458","emailAddress":"fatima.iqbal@blueyonder.co.uk","checkType":"supervisor","dueDate":{"display":"4 July 2025","day":4,"month":6,"year":2025},"childsDOB":{"display":"26 September 2025","day":26,"month":8,"year":2025}},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"513 501 5524","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"11 November 1980","day":11,"month":10,"year":1980},"checking":false,"certificateReference":"HRT 0E74 OZV4","channel":"Digital","startDate":{"display":"4 October 2025","day":4,"month":9,"year":2025},"endDate":{"display":"3 October 2026","day":3,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07038 647 569","emailAddress":"j.ahmed@googlemail.com","imageReference":"2026 05 28 09 37 22N407395847","dueDate":{"display":"28 August 2025","day":28,"month":7,"year":2025},"childsDOB":{"display":"20 August 2025","day":20,"month":7,"year":2025}},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"486 166 0509","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"11 August 2006","day":11,"month":7,"year":2006},"checking":true,"certificateReference":"30 912 099 765","channel":"Paper","imageReference":"2026 05 28 09 37 26N675018100","startDate":{"display":"19 September 2025","day":19,"month":8,"year":2025},"dueDate":{"display":"16 September 2025","day":16,"month":8,"year":2025},"endDate":{"display":"18 September 2026","day":18,"month":8,"year":2026},"childsDOB":{"display":"19 September 2025","day":19,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07049 758 671","emailAddress":"nadia.rashid@hotmail.com","checkType":"supervisor","medicalCondition":["(7) Forms of hypoadrenalism"]},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"378 889 1597","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"18 December 1972","day":18,"month":11,"year":1972},"checking":false,"checkType":"supervisor","certificateReference":"HRT IQ32 ZIP1","channel":"Digital","imageReference":"2026 05 28 09 36 21N000291139","startDate":{"display":"1 September 2025","day":1,"month":8,"year":2025},"dueDate":{"display":"21 July 2025","day":21,"month":6,"year":2025},"endDate":{"display":"31 August 2026","day":31,"month":7,"year":2026},"childsDOB":{"display":"8 August 2025","day":8,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07050 869 782","emailAddress":"t.paterson@outlook.com","medicalCondition":["(9) Continuing physical disability"]},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"716 941 8657","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"6 June 1986","day":6,"month":5,"year":1986},"checking":false,"certificateReference":"HRT 0X5R LRYW","channel":"Digital","startDate":{"display":"23 September 2025","day":23,"month":8,"year":2025},"endDate":{"display":"22 September 2026","day":22,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07061 971 893","emailAddress":"Foster885@blueyonder.co.uk","checkType":"supervisor","imageReference":"2026 05 28 09 37 22N696555238","dueDate":{"display":"16 September 2025","day":16,"month":8,"year":2025},"childsDOB":{"display":"16 August 2025","day":16,"month":7,"year":2025},"medicalCondition":["(1) Permanent fistula"]},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"251 714 5813","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"26 October 1992","day":26,"month":9,"year":1992},"checking":false,"checkType":"supervisor","certificateReference":"54 852 890 004","channel":"Digital","imageReference":"2026 05 28 09 37 22N494803170","startDate":{"display":"8 August 2025","day":8,"month":7,"year":2025},"dueDate":{"display":"27 July 2025","day":27,"month":6,"year":2025},"endDate":{"display":"7 August 2026","day":7,"month":7,"year":2026},"childsDOB":{"display":"8 August 2025","day":8,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07072 082 914","emailAddress":"lauren.fox@hotmail.com","medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"670 072 8439","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"26 April 1988","day":26,"month":3,"year":1988},"checking":true,"certificateReference":"53 179 800 600","channel":"Paper","startDate":{"display":"24 August 2025","day":24,"month":7,"year":2025},"dueDate":{"display":"29 October 2025","day":29,"month":9,"year":2025},"endDate":{"display":"23 August 2026","day":23,"month":7,"year":2026},"childsDOB":{"display":"24 August 2025","day":24,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07083 193 125","emailAddress":"g.grant563@blueyonder.co.uk","medicalCondition":["(1) Permanent fistula"],"checkType":"supervisor","imageReference":"2026 05 28 09 37 26N967265749"},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"323 670 9127","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"4 March 1995","day":4,"month":2,"year":1995},"checking":false,"certificateReference":"07 152 303 152","channel":"Paper","imageReference":"2026 05 28 09 37 26N278781465","startDate":{"display":"24 June 2025","day":24,"month":5,"year":2025},"dueDate":{"display":"14 June 2025","day":14,"month":5,"year":2025},"endDate":{"display":"23 June 2026","day":23,"month":5,"year":2026},"childsDOB":{"display":"24 June 2025","day":24,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07094 214 236","emailAddress":"a.murray@googlemail.com","medicalCondition":["(4) Myxoedema"]},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"529 076 4055","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"12 October 1969","day":12,"month":9,"year":1969},"checking":false,"certificateReference":"HRT MOJ3 44R4","channel":"Pharmacy","imageReference":"2026 05 28 09 37 22N422488642","startDate":{"display":"2 June 2025","day":2,"month":5,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"1 June 2026","day":1,"month":5,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07015 325 347","emailAddress":"e.west@gmail.com","checkType":"supervisor","dueDate":{"display":"15 June 2025","day":15,"month":5,"year":2025},"childsDOB":{"display":"19 September 2025","day":19,"month":8,"year":2025}},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"757 904 2047","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"8 March 1998","day":8,"month":2,"year":1998},"checking":false,"checkType":"supervisor","certificateReference":"49 472 401 443","channel":"Digital","imageReference":"2026 05 28 09 36 36N782089887","startDate":{"display":"24 August 2025","day":24,"month":7,"year":2025},"dueDate":{"display":"19 October 2025","day":19,"month":9,"year":2025},"endDate":{"display":"23 August 2026","day":23,"month":7,"year":2026},"childsDOB":{"display":"24 August 2025","day":24,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07026 436 458","emailAddress":"robyn.matthews@googlemail.com"},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"319 277 4573","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"24 November 2001","day":24,"month":10,"year":2001},"checking":false,"certificateReference":"91 615 071 052","channel":"Paper","imageReference":"2026 05 28 09 37 26N791475567","startDate":{"display":"11 November 2025","day":11,"month":10,"year":2025},"dueDate":{"display":"6 August 2025","day":6,"month":7,"year":2025},"endDate":{"display":"10 November 2026","day":10,"month":10,"year":2026},"childsDOB":{"display":"11 November 2025","day":11,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07037 547 569","emailAddress":"k.holmes@gmail.com","checkType":"supervisor","medicalCondition":["(4) Myxoedema"]},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"520 119 9005","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"26 November 1968","day":26,"month":10,"year":1968},"checking":false,"certificateReference":"82 040 351 855","channel":"Digital","startDate":{"display":"29 July 2025","day":29,"month":6,"year":2025},"endDate":{"display":"28 July 2030","day":28,"month":6,"year":2030},"certificateFulfilment":"email","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07048 658 671","emailAddress":"Walsh273@blueyonder.co.uk","medicalCondition":["(10) Cancer"],"imageReference":"2026 05 28 09 37 22N610157368","dueDate":{"display":"8 November 2025","day":8,"month":10,"year":2025},"childsDOB":{"display":"29 August 2025","day":29,"month":7,"year":2025}},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"151 741 3199","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"11 February 1995","day":11,"month":1,"year":1995},"checking":true,"certificateReference":"21 115 822 828","channel":"Paper","startDate":{"display":"29 July 2025","day":29,"month":6,"year":2025},"endDate":{"display":"28 July 2026","day":28,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07059 769 782","emailAddress":"Page428@gmail.com","checkType":"supervisor","imageReference":"2026 05 28 09 37 26N626058700","dueDate":{"display":"7 July 2025","day":7,"month":6,"year":2025},"childsDOB":{"display":"29 July 2025","day":29,"month":6,"year":2025},"medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"461 509 3946","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"expired","dateOfBirth":{"display":"3 August 1976","day":3,"month":7,"year":1976},"checking":false,"certificateReference":"60 376 640 815","channel":"Paper","startDate":{"display":"6 November 2025","day":6,"month":10,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"5 November 2035","day":5,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07060 871 893","imageReference":"2026 05 28 09 37 26N225747918","checkType":"supervisor","dueDate":{"display":"27 November 2025","day":27,"month":10,"year":2025},"childsDOB":{"display":"24 July 2025","day":24,"month":6,"year":2025}},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"666 750 7925","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"10 September 1978","day":10,"month":8,"year":1978},"checking":false,"checkType":"supervisor","certificateReference":"15 862 894 278","channel":"Paper","imageReference":"2026 05 28 09 37 26N971973085","startDate":{"display":"25 September 2025","day":25,"month":8,"year":2025},"dueDate":{"display":"4 November 2025","day":4,"month":10,"year":2025},"endDate":{"display":"24 September 2030","day":24,"month":8,"year":2030},"childsDOB":{"display":"9 July 2025","day":9,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07071 982 914","medicalCondition":["(10) Cancer"]},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"735 622 4309","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"3 August 1993","day":3,"month":7,"year":1993},"checking":true,"certificateReference":"67 202 124 480","channel":"Paper","imageReference":"2026 05 28 09 37 26N077281347","startDate":{"display":"2 July 2025","day":2,"month":6,"year":2025},"dueDate":{"display":"15 June 2025","day":15,"month":5,"year":2025},"endDate":{"display":"1 July 2026","day":1,"month":6,"year":2026},"childsDOB":{"display":"2 July 2025","day":2,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07082 093 125","emailAddress":"mollie.hayes274@gmail.com","checkType":"supervisor"},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"404 362 5260","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"10 August 1976","day":10,"month":7,"year":1976},"checking":false,"certificateReference":"21 353 310 896","channel":"Paper","startDate":{"display":"16 June 2025","day":16,"month":5,"year":2025},"endDate":{"display":"15 June 2035","day":15,"month":5,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07093 114 236","emailAddress":"f.cunningham@googlemail.com","imageReference":"2026 05 28 09 37 26N672512406","dueDate":{"display":"2 October 2025","day":2,"month":9,"year":2025},"childsDOB":{"display":"7 November 2025","day":7,"month":10,"year":2025},"medicalCondition":["(2) Epilepsy"],"checkType":"supervisor"},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"756 235 6984","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"17 May 1974","day":17,"month":4,"year":1974},"checking":false,"certificateReference":"30 408 522 422","channel":"Digital","startDate":{"display":"6 November 2025","day":6,"month":10,"year":2025},"endDate":{"display":"5 November 2035","day":5,"month":10,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07014 225 347","emailAddress":"amelie.barber@hotmail.com","checkType":"supervisor","imageReference":"2026 05 28 09 36 32N947468410","dueDate":{"display":"31 October 2025","day":31,"month":9,"year":2025},"childsDOB":{"display":"28 August 2025","day":28,"month":7,"year":2025},"medicalCondition":["(4) Myxoedema"]},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"929 604 6641","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"9 March 1994","day":9,"month":2,"year":1994},"checking":false,"certificateReference":"HRT 5V03 ZIBK","channel":"Digital","startDate":{"display":"7 June 2025","day":7,"month":5,"year":2025},"endDate":{"display":"6 June 2026","day":6,"month":5,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07025 336 458","emailAddress":"lucia.knight432@googlemail.com","imageReference":"2026 05 28 09 36 32N356834644","dueDate":{"display":"12 October 2025","day":12,"month":9,"year":2025},"childsDOB":{"display":"27 October 2025","day":27,"month":9,"year":2025},"checkType":"supervisor"},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"804 694 9082","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"16 July 1994","day":16,"month":6,"year":1994},"checking":false,"checkType":"supervisor","certificateReference":"HRT 1UV6 XRY5","channel":"Digital","imageReference":"2026 05 28 09 36 36N428754966","startDate":{"display":"22 June 2025","day":22,"month":5,"year":2025},"dueDate":{"display":"11 June 2025","day":11,"month":5,"year":2025},"endDate":{"display":"21 June 2026","day":21,"month":5,"year":2026},"childsDOB":{"display":"10 October 2025","day":10,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07036 447 569","emailAddress":"e.parsons@gmail.com","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"385 386 5481","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"6 December 1984","day":6,"month":11,"year":1984},"checking":false,"checkType":"supervisor","certificateReference":"HRT YG1U G60X","channel":"Digital","imageReference":"2026 05 28 09 37 22N703761530","startDate":{"display":"27 October 2025","day":27,"month":9,"year":2025},"dueDate":{"display":"21 October 2025","day":21,"month":9,"year":2025},"endDate":{"display":"26 October 2026","day":26,"month":9,"year":2026},"childsDOB":{"display":"23 June 2025","day":23,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07047 558 671","emailAddress":"tilly.bates@googlemail.com","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"242 741 3971","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"24 April 2002","day":24,"month":3,"year":2002},"checking":false,"certificateReference":"38 512 304 562","channel":"Digital","imageReference":"2026 05 28 09 37 22N077520860","startDate":{"display":"31 August 2025","day":31,"month":7,"year":2025},"dueDate":{"display":"19 June 2025","day":19,"month":5,"year":2025},"endDate":{"display":"30 August 2026","day":30,"month":7,"year":2026},"childsDOB":{"display":"31 August 2025","day":31,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07086 419 375","emailAddress":"h.day@hotmail.com","checkType":"supervisor"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"646 498 9582","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"27 January 1976","day":27,"month":0,"year":1976},"checking":false,"certificateReference":"23 523 753 218","channel":"Paper","imageReference":"2026 05 28 09 37 26N387121663","startDate":{"display":"14 November 2025","day":14,"month":10,"year":2025},"dueDate":{"display":"1 November 2025","day":1,"month":10,"year":2025},"endDate":{"display":"13 November 2035","day":13,"month":10,"year":2035},"childsDOB":{"display":"29 June 2025","day":29,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07020 853 749","medicalCondition":["(1) Permanent fistula","(10) Cancer"],"checkType":"supervisor"},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"050 470 9602","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"13 May 1989","day":13,"month":4,"year":1989},"checking":true,"certificateReference":"81 454 687 121","channel":"Paper","startDate":{"display":"7 November 2025","day":7,"month":10,"year":2025},"endDate":{"display":"6 November 2026","day":6,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07086 419 375","emailAddress":"h.burton589@googlemail.com","imageReference":"2026 05 28 09 37 26N504132993","medicalCondition":["(4) Myxoedema"],"checkType":"supervisor","dueDate":{"display":"10 November 2025","day":10,"month":10,"year":2025},"childsDOB":{"display":"7 November 2025","day":7,"month":10,"year":2025}}]';
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
