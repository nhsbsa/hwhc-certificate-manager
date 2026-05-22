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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"403 200 4168","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"19 October 2004","day":19,"month":9,"year":2004},"checking":true,"checkType":"quality","certificateReference":"15 521 696 155","channel":"Paper","imageReference":"2026 05 22 11 56 09N408381760","startDate":{"display":"21 September 2025","day":21,"month":8,"year":2025},"dueDate":{"display":"16 October 2025","day":16,"month":9,"year":2025},"endDate":{"display":"20 September 2026","day":20,"month":8,"year":2026},"childsDOB":{"display":"21 September 2025","day":21,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07031 284 591","emailAddress":"o.smith@blueyonder.co.uk"},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"649 979 5281","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"10 May 1967","day":10,"month":4,"year":1967},"checking":false,"certificateReference":"HRT JMV4 G0SF","channel":"Digital","startDate":{"display":"27 May 2025","day":27,"month":4,"year":2025},"endDate":{"display":"26 May 2026","day":26,"month":4,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07049 823 716","emailAddress":"Jones424@googlemail.com"},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"696 111 8639","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"1 July 1972","day":1,"month":6,"year":1972},"checking":false,"certificateReference":"17 981 050 084","channel":"Digital","startDate":{"display":"8 September 2025","day":8,"month":8,"year":2025},"endDate":{"display":"7 September 2026","day":7,"month":8,"year":2026},"medicalCondition":["Myxoedema (hypothyroidism requiring thyroid hormone replacement)"],"certificateFulfilment":"email","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 395 184","emailAddress":"taylor.i@hotmail.com"},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"216 239 8121","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"17 January 1988","day":17,"month":0,"year":1988},"checking":false,"certificateReference":"HRT 1OYZ R0GT","channel":"Digital","startDate":{"display":"23 July 2025","day":23,"month":6,"year":2025},"endDate":{"display":"22 July 2026","day":22,"month":6,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07071 528 439","emailAddress":"ava.brown@googlemail.com"},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"625 721 5850","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"21 December 2003","day":21,"month":11,"year":2003},"checking":true,"checkType":"supervisor","certificateReference":"19 306 514 581","channel":"Paper","imageReference":"2026 05 22 11 56 09N243868346","startDate":{"display":"22 October 2025","day":22,"month":9,"year":2025},"dueDate":{"display":"11 June 2025","day":11,"month":5,"year":2025},"endDate":{"display":"21 October 2026","day":21,"month":9,"year":2026},"childsDOB":{"display":"22 October 2025","day":22,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07083 916 275","emailAddress":"emily.williams@aol.com"},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"893 718 8246","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"15 March 1975","day":15,"month":2,"year":1975},"checking":false,"certificateReference":"58 566 473 093","channel":"Paper","imageReference":"2026 05 22 11 56 09N587628595","startDate":{"display":"29 June 2025","day":29,"month":5,"year":2025},"endDate":{"display":"28 June 2026","day":28,"month":5,"year":2026},"medicalCondition":["A permanent fistula (for example, caecostomy, colostomy, laryngostomy or ileostomy) which needs continuous surgical dressing or an appliance"],"certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07092 475 318","emailAddress":"wilson.s@blueyonder.co.uk"},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"390 096 5147","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"23 May 2001","day":23,"month":4,"year":2001},"checking":false,"certificateReference":"58 109 918 240","channel":"Digital","startDate":{"display":"7 July 2025","day":7,"month":6,"year":2025},"dueDate":{"display":"17 November 2025","day":17,"month":10,"year":2025},"endDate":{"display":"6 July 2026","day":6,"month":6,"year":2026},"childsDOB":{"display":"7 July 2025","day":7,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07015 648 293","emailAddress":"mia.davies761@googlemail.com"},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"339 678 3513","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"24 July 1990","day":24,"month":6,"year":1990},"checking":true,"checkType":"quality","certificateReference":"78 131 431 715","channel":"Paper","imageReference":"2026 05 22 11 56 09N890080637","startDate":{"display":"7 July 2025","day":7,"month":6,"year":2025},"endDate":{"display":"6 July 2026","day":6,"month":6,"year":2026},"medicalCondition":["A permanent fistula (for example, caecostomy, colostomy, laryngostomy or ileostomy) which needs continuous surgical dressing or an appliance"],"certificateFulfilment":"post","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 751 964","emailAddress":"evans.e@aol.com"},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"463 248 0845","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"4 July 1990","day":4,"month":6,"year":1990},"checking":true,"checkType":"supervisor","certificateReference":"16 116 334 587","channel":"Paper","imageReference":"2026 05 22 11 56 09N240156082","startDate":{"display":"23 June 2025","day":23,"month":5,"year":2025},"dueDate":{"display":"19 June 2025","day":19,"month":5,"year":2025},"endDate":{"display":"22 June 2026","day":22,"month":5,"year":2026},"childsDOB":{"display":"23 June 2025","day":23,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07036 592 817","emailAddress":"grace.thomas@blueyonder.co.uk"},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"106 919 8133","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"10 January 2002","day":10,"month":0,"year":2002},"checking":false,"certificateReference":"52 702 620 586","channel":"Paper","imageReference":"2026 05 22 11 56 09N012871186","startDate":{"display":"14 September 2025","day":14,"month":8,"year":2025},"dueDate":{"display":"23 August 2025","day":23,"month":7,"year":2025},"endDate":{"display":"13 September 2026","day":13,"month":8,"year":2026},"childsDOB":{"display":"14 September 2025","day":14,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07047 813 256","emailAddress":"roberts.l@hotmail.com"},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"462 537 0747","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"23 June 2008","day":23,"month":5,"year":2008},"checking":false,"certificateReference":"77 028 844 928","channel":"Digital","startDate":{"display":"6 July 2025","day":6,"month":6,"year":2025},"dueDate":{"display":"27 July 2025","day":27,"month":6,"year":2025},"endDate":{"display":"5 July 2026","day":5,"month":6,"year":2026},"childsDOB":{"display":"6 July 2025","day":6,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07051 294 783","emailAddress":"f.johnson@outlook.com"},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"337 404 6709","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"24 July 1973","day":24,"month":6,"year":1973},"checking":false,"certificateReference":"HRT WG5B FWHW","channel":"Digital","startDate":{"display":"27 June 2025","day":27,"month":5,"year":2025},"endDate":{"display":"26 June 2026","day":26,"month":5,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07063 418 592","emailAddress":"c.lewis@hotmail.com"},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"237 823 9225","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"25 May 1982","day":25,"month":4,"year":1982},"checking":false,"certificateReference":"81 591 189 625","channel":"Digital","startDate":{"display":"21 October 2025","day":21,"month":9,"year":2025},"endDate":{"display":"20 October 2026","day":20,"month":9,"year":2026},"medicalCondition":["Cancer (treatment or effects of disease/treatment)"],"certificateFulfilment":"email","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07075 928 341","emailAddress":"i.walker@googlemail.com"},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"293 038 8781","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"7 May 1971","day":7,"month":4,"year":1971},"checking":false,"certificateReference":"28 339 103 316","channel":"Paper","imageReference":"2026 05 22 11 56 09N057143743","startDate":{"display":"27 July 2025","day":27,"month":6,"year":2025},"endDate":{"display":"26 July 2026","day":26,"month":6,"year":2026},"medicalCondition":["Cancer (treatment or effects of disease/treatment)"],"certificateFulfilment":"post","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07084 372 659","emailAddress":"daisy.hall@googlemail.com"},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"016 154 2694","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"17 July 1997","day":17,"month":6,"year":1997},"checking":false,"certificateReference":"95 451 915 260","channel":"Paper","imageReference":"2026 05 22 11 56 09N910459330","startDate":{"display":"9 September 2025","day":9,"month":8,"year":2025},"dueDate":{"display":"8 September 2025","day":8,"month":8,"year":2025},"endDate":{"display":"8 September 2026","day":8,"month":8,"year":2026},"childsDOB":{"display":"9 September 2025","day":9,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07091 837 426","emailAddress":"clarke.e@googlemail.com"},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"010 385 1837","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"27 January 1992","day":27,"month":0,"year":1992},"checking":false,"certificateReference":"53 112 541 891","channel":"Paper","imageReference":"2026 05 22 11 56 09N393429374","startDate":{"display":"21 November 2025","day":21,"month":10,"year":2025},"dueDate":{"display":"17 November 2025","day":17,"month":10,"year":2025},"endDate":{"display":"20 November 2026","day":20,"month":10,"year":2026},"childsDOB":{"display":"21 November 2025","day":21,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 385 927"},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"376 814 3466","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"7 August 1992","day":7,"month":7,"year":1992},"checking":true,"checkType":"supervisor","certificateReference":"22 860 777 931","channel":"Paper","imageReference":"2026 05 22 11 56 09N992740021","startDate":{"display":"26 August 2025","day":26,"month":7,"year":2025},"dueDate":{"display":"31 July 2025","day":31,"month":6,"year":2025},"endDate":{"display":"25 August 2026","day":25,"month":7,"year":2026},"childsDOB":{"display":"26 August 2025","day":26,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07027 639 485","emailAddress":"sophie.young@blueyonder.co.uk"},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"390 065 9577","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"8 May 1996","day":8,"month":4,"year":1996},"checking":false,"certificateReference":"HRT XCRJ FSBN","channel":"Digital","startDate":{"display":"25 June 2025","day":25,"month":5,"year":2025},"endDate":{"display":"24 June 2026","day":24,"month":5,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07035 821 749","emailAddress":"h.king@hotmail.com"},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"638 657 4526","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"28 November 1989","day":28,"month":10,"year":1989},"checking":true,"checkType":"supervisor","certificateReference":"46 619 457 855","channel":"Paper","imageReference":"2026 05 22 11 56 09N283735786","startDate":{"display":"13 September 2025","day":13,"month":8,"year":2025},"dueDate":{"display":"5 July 2025","day":5,"month":6,"year":2025},"endDate":{"display":"12 September 2026","day":12,"month":8,"year":2026},"childsDOB":{"display":"13 September 2025","day":13,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07048 952 613"},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"111 616 4394","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"3 August 1991","day":3,"month":7,"year":1991},"checking":false,"certificateReference":"63 913 197 880","channel":"Digital","startDate":{"display":"24 June 2025","day":24,"month":5,"year":2025},"dueDate":{"display":"28 September 2025","day":28,"month":8,"year":2025},"endDate":{"display":"23 June 2026","day":23,"month":5,"year":2026},"childsDOB":{"display":"24 June 2025","day":24,"month":5,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07052 719 384","emailAddress":"Green947@blueyonder.co.uk"},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"465 689 5446","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"8 October 1990","day":8,"month":9,"year":1990},"checking":false,"certificateReference":"HRT SU4P QR6R","channel":"Digital","startDate":{"display":"22 September 2025","day":22,"month":8,"year":2025},"endDate":{"display":"21 September 2026","day":21,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07064 837 295","emailAddress":"Baker213@gmail.com"},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"591 313 6991","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"18 May 1976","day":18,"month":4,"year":1976},"checking":false,"certificateReference":"02 713 355 819","channel":"Paper","imageReference":"2026 05 22 11 56 09N989083316","startDate":{"display":"2 July 2025","day":2,"month":6,"year":2025},"endDate":{"display":"1 July 2026","day":1,"month":6,"year":2026},"medicalCondition":["A continuing physical disability which means you cannot go out without the help of another person"],"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07073 491 826","emailAddress":"Adams572@hotmail.com"},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"216 174 7065","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"20 September 2008","day":20,"month":8,"year":2008},"checking":true,"checkType":"supervisor","certificateReference":"86 599 494 062","channel":"Paper","imageReference":"2026 05 22 11 56 09N278437821","startDate":{"display":"4 September 2025","day":4,"month":8,"year":2025},"dueDate":{"display":"17 November 2025","day":17,"month":10,"year":2025},"endDate":{"display":"3 September 2026","day":3,"month":8,"year":2026},"childsDOB":{"display":"4 September 2025","day":4,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07085 623 941","emailAddress":"c.mitchell@hotmail.com"},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"066 178 6643","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"24 January 1993","day":24,"month":0,"year":1993},"checking":true,"checkType":"supervisor","certificateReference":"53 627 139 102","channel":"Paper","imageReference":"2026 05 22 11 56 09N875129081","startDate":{"display":"17 November 2025","day":17,"month":10,"year":2025},"dueDate":{"display":"26 July 2025","day":26,"month":6,"year":2025},"endDate":{"display":"16 November 2026","day":16,"month":10,"year":2026},"childsDOB":{"display":"17 November 2025","day":17,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07096 718 235","emailAddress":"s.turner@hotmail.com"},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"293 038 4762","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"processing","dateOfBirth":{"display":"16 December 2005","day":16,"month":11,"year":2005},"checking":false,"certificateReference":"15 449 572 381","channel":"Paper","imageReference":"2026 05 22 11 56 09N380111594","startDate":{"display":"18 August 2025","day":18,"month":7,"year":2025},"dueDate":{"display":"10 October 2025","day":10,"month":9,"year":2025},"endDate":{"display":"17 August 2026","day":17,"month":7,"year":2026},"childsDOB":{"display":"18 August 2025","day":18,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07018 273 945","emailAddress":"w.carter@googlemail.com"},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"578 905 6239","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"18 March 2000","day":18,"month":2,"year":2000},"checking":false,"certificateReference":"37 133 365 088","channel":"Paper","imageReference":"2026 05 22 11 56 09N874720439","startDate":{"display":"17 July 2025","day":17,"month":6,"year":2025},"dueDate":{"display":"28 July 2025","day":28,"month":6,"year":2025},"endDate":{"display":"16 July 2026","day":16,"month":6,"year":2026},"childsDOB":{"display":"17 July 2025","day":17,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07029 384 756","emailAddress":"Morris496@gmail.com"},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"399 616 1653","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"10 July 1988","day":10,"month":6,"year":1988},"checking":false,"certificateReference":"02 855 543 343","channel":"Digital","startDate":{"display":"22 May 2025","day":22,"month":4,"year":2025},"dueDate":{"display":"13 September 2025","day":13,"month":8,"year":2025},"endDate":{"display":"21 May 2026","day":21,"month":4,"year":2026},"childsDOB":{"display":"22 May 2025","day":22,"month":4,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07031 572 948","emailAddress":"m.hughes@blueyonder.co.uk"},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"495 840 2181","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"18 June 1986","day":18,"month":5,"year":1986},"checking":false,"certificateReference":"37 965 144 970","channel":"Digital","startDate":{"display":"21 September 2025","day":21,"month":8,"year":2025},"endDate":{"display":"20 September 2026","day":20,"month":8,"year":2026},"medicalCondition":["Epilepsy which needs continuous anticonvulsive therapy"],"certificateFulfilment":"email","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07042 619 583","emailAddress":"Ward143@googlemail.com"},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"133 878 8181","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"7 May 1999","day":7,"month":4,"year":1999},"checking":false,"certificateReference":"77 721 176 823","channel":"Digital","startDate":{"display":"13 July 2025","day":13,"month":6,"year":2025},"dueDate":{"display":"18 June 2025","day":18,"month":5,"year":2025},"endDate":{"display":"12 July 2026","day":12,"month":6,"year":2026},"childsDOB":{"display":"13 July 2025","day":13,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07053 847 261","emailAddress":"r.price@gmail.com"},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"382 429 7595","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"19 April 1979","day":19,"month":3,"year":1979},"checking":false,"certificateReference":"HRT B1NB 6KCK","channel":"Digital","startDate":{"display":"8 July 2025","day":8,"month":6,"year":2025},"endDate":{"display":"7 July 2026","day":7,"month":6,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07064 928 137","emailAddress":"cooper.a@hotmail.com"},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"902 365 9646","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"16 May 2006","day":16,"month":4,"year":2006},"checking":true,"checkType":"supervisor","certificateReference":"77 587 312 999","channel":"Paper","imageReference":"2026 05 22 11 56 09N254365655","startDate":{"display":"30 June 2025","day":30,"month":5,"year":2025},"dueDate":{"display":"21 July 2025","day":21,"month":6,"year":2025},"endDate":{"display":"29 June 2026","day":29,"month":5,"year":2026},"childsDOB":{"display":"30 June 2025","day":30,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07075 283 916","emailAddress":"Bailey465@blueyonder.co.uk"},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"488 982 9710","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"25 October 1990","day":25,"month":9,"year":1990},"checking":true,"checkType":"supervisor","certificateReference":"58 828 329 987","channel":"Paper","imageReference":"2026 05 22 11 56 09N977757212","startDate":{"display":"4 July 2025","day":4,"month":6,"year":2025},"dueDate":{"display":"20 June 2025","day":20,"month":5,"year":2025},"endDate":{"display":"3 July 2026","day":3,"month":6,"year":2026},"childsDOB":{"display":"4 July 2025","day":4,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07086 419 375"},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"749 832 9732","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"processing","dateOfBirth":{"display":"6 March 1984","day":6,"month":2,"year":1984},"checking":false,"certificateReference":"73 864 149 489","channel":"Paper","imageReference":"2026 05 22 11 56 09N493834925","startDate":{"display":"13 July 2025","day":13,"month":6,"year":2025},"endDate":{"display":"12 July 2026","day":12,"month":6,"year":2026},"medicalCondition":["A permanent fistula (for example, caecostomy, colostomy, laryngostomy or ileostomy) which needs continuous surgical dressing or an appliance"],"certificateFulfilment":"post","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07097 531 284","emailAddress":"phillips.h@gmail.com"},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"765 299 2263","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"16 April 1974","day":16,"month":3,"year":1974},"checking":false,"certificateReference":"HRT F3O1 5VT1","channel":"Digital","startDate":{"display":"6 November 2025","day":6,"month":10,"year":2025},"endDate":{"display":"5 November 2026","day":5,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07018 642 597","emailAddress":"z.bennett202@gmail.com"},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"945 853 4930","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"11 August 1991","day":11,"month":7,"year":1991},"checking":false,"certificateReference":"HRT 4PF3 UZXN","channel":"Digital","startDate":{"display":"7 November 2025","day":7,"month":10,"year":2025},"endDate":{"display":"6 November 2026","day":6,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07029 753 861","emailAddress":"florence.cox@blueyonder.co.uk"},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"979 052 9038","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"24 October 1968","day":24,"month":9,"year":1968},"checking":false,"certificateReference":"77 892 208 929","channel":"Digital","startDate":{"display":"10 August 2025","day":10,"month":7,"year":2025},"endDate":{"display":"9 August 2026","day":9,"month":7,"year":2026},"medicalCondition":["Cancer (treatment or effects of disease/treatment)"],"certificateFulfilment":"email","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07031 864 729","emailAddress":"maya.richardson@googlemail.com"},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"079 474 1551","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"25 January 1994","day":25,"month":0,"year":1994},"checking":false,"certificateReference":"53 904 519 212","channel":"Paper","imageReference":"2026 05 22 11 56 09N713564149","startDate":{"display":"26 June 2025","day":26,"month":5,"year":2025},"dueDate":{"display":"6 October 2025","day":6,"month":9,"year":2025},"endDate":{"display":"25 June 2026","day":25,"month":5,"year":2026},"childsDOB":{"display":"26 June 2025","day":26,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07042 987 513","emailAddress":"esme.gray@blueyonder.co.uk"},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"928 188 1905","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"4 April 1995","day":4,"month":3,"year":1995},"checking":false,"certificateReference":"HRT R8Z6 K3PJ","channel":"Digital","startDate":{"display":"1 October 2025","day":1,"month":9,"year":2025},"endDate":{"display":"30 September 2026","day":30,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07054 129 876","emailAddress":"i.ross@blueyonder.co.uk"},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"032 661 6989","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"9 December 2005","day":9,"month":11,"year":2005},"checking":false,"certificateReference":"68 584 300 890","channel":"Paper","imageReference":"2026 05 22 11 56 09N922602997","startDate":{"display":"21 July 2025","day":21,"month":6,"year":2025},"dueDate":{"display":"30 September 2025","day":30,"month":8,"year":2025},"endDate":{"display":"20 July 2026","day":20,"month":6,"year":2026},"childsDOB":{"display":"21 July 2025","day":21,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07065 238 741","emailAddress":"a.bell@gmail.com"},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"456 283 0329","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"23 February 1991","day":23,"month":1,"year":1991},"checking":false,"certificateReference":"08 935 888 025","channel":"Paper","imageReference":"2026 05 22 11 56 09N924595073","startDate":{"display":"30 May 2025","day":30,"month":4,"year":2025},"endDate":{"display":"29 May 2026","day":29,"month":4,"year":2026},"medicalCondition":["Diabetes insipidus or other forms of hypopituitarism"],"certificateFulfilment":"post","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07076 391 825","emailAddress":"e.cook@blueyonder.co.uk"},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"037 494 0529","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"12 August 1993","day":12,"month":7,"year":1993},"checking":true,"checkType":"supervisor","certificateReference":"82 435 611 237","channel":"Paper","imageReference":"2026 05 22 11 56 09N374073501","startDate":{"display":"2 October 2025","day":2,"month":9,"year":2025},"dueDate":{"display":"27 July 2025","day":27,"month":6,"year":2025},"endDate":{"display":"1 October 2026","day":1,"month":9,"year":2026},"childsDOB":{"display":"2 October 2025","day":2,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07087 512 936","emailAddress":"t.watson@aol.com"},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"693 462 4123","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"18 December 1996","day":18,"month":11,"year":1996},"checking":false,"certificateReference":"HRT F510 4K5S","channel":"Pharmacy","startDate":{"display":"23 July 2025","day":23,"month":6,"year":2025},"endDate":{"display":"22 July 2026","day":22,"month":6,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07098 631 427","emailAddress":"sanders.a@googlemail.com"},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"548 795 0312","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"22 October 1999","day":22,"month":9,"year":1999},"checking":false,"certificateReference":"08 650 619 806","channel":"Digital","startDate":{"display":"11 October 2025","day":11,"month":9,"year":2025},"dueDate":{"display":"7 November 2025","day":7,"month":10,"year":2025},"endDate":{"display":"10 October 2026","day":10,"month":9,"year":2026},"childsDOB":{"display":"11 October 2025","day":11,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07019 742 835","emailAddress":"emma.harrison@hotmail.com"},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"743 691 2823","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"28 January 1993","day":28,"month":0,"year":1993},"checking":true,"checkType":"supervisor","certificateReference":"26 702 539 147","channel":"Paper","imageReference":"2026 05 22 11 56 09N836100584","startDate":{"display":"6 July 2025","day":6,"month":6,"year":2025},"dueDate":{"display":"22 June 2025","day":22,"month":5,"year":2025},"endDate":{"display":"5 July 2026","day":5,"month":6,"year":2026},"childsDOB":{"display":"6 July 2025","day":6,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07020 853 749","emailAddress":"coleman.l@googlemail.com"},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"107 547 0642","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"15 January 1989","day":15,"month":0,"year":1989},"checking":true,"checkType":"quality","certificateReference":"38 965 748 959","channel":"Paper","imageReference":"2026 05 22 11 56 09N704480485","startDate":{"display":"26 May 2025","day":26,"month":4,"year":2025},"endDate":{"display":"25 May 2026","day":25,"month":4,"year":2026},"medicalCondition":["Epilepsy which needs continuous anticonvulsive therapy"],"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07031 984 625","emailAddress":"amber.murphy@googlemail.com"},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"795 310 8186","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"20 May 1971","day":20,"month":4,"year":1971},"checking":false,"certificateReference":"HRT YMRL VET0","channel":"Digital","startDate":{"display":"18 July 2025","day":18,"month":6,"year":2025},"endDate":{"display":"17 July 2026","day":17,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07042 195 783","emailAddress":"graham.s@gmail.com"},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"157 851 3803","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"21 July 1985","day":21,"month":6,"year":1985},"checking":false,"certificateReference":"98 410 225 368","channel":"Digital","startDate":{"display":"9 November 2025","day":9,"month":10,"year":2025},"endDate":{"display":"8 November 2026","day":8,"month":10,"year":2026},"medicalCondition":["Diabetes insipidus or other forms of hypopituitarism"],"certificateFulfilment":"email","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07053 268 917","emailAddress":"b.stevens@blueyonder.co.uk"},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"901 669 3772","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"3 March 1994","day":3,"month":2,"year":1994},"checking":true,"checkType":"supervisor","certificateReference":"39 941 135 502","channel":"Paper","imageReference":"2026 05 22 11 56 09N339577730","startDate":{"display":"28 July 2025","day":28,"month":6,"year":2025},"dueDate":{"display":"10 November 2025","day":10,"month":10,"year":2025},"endDate":{"display":"27 July 2026","day":27,"month":6,"year":2026},"childsDOB":{"display":"28 July 2025","day":28,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07064 371 528","emailAddress":"i.simpson@googlemail.com"},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"353 308 6076","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"26 April 1973","day":26,"month":3,"year":1973},"checking":false,"certificateReference":"HRT RU91 VKMM","channel":"Digital","startDate":{"display":"22 August 2025","day":22,"month":7,"year":2025},"endDate":{"display":"21 August 2026","day":21,"month":7,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07075 482 936","emailAddress":"h.butler@gmail.com"},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"511 013 9117","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"15 May 2006","day":15,"month":4,"year":2006},"checking":false,"certificateReference":"21 660 521 204","channel":"Digital","startDate":{"display":"20 August 2025","day":20,"month":7,"year":2025},"dueDate":{"display":"26 October 2025","day":26,"month":9,"year":2025},"endDate":{"display":"19 August 2026","day":19,"month":7,"year":2026},"childsDOB":{"display":"20 August 2025","day":20,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07086 593 147","emailAddress":"eleanor.chapman@outlook.com"},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"681 559 8901","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"28 November 1989","day":28,"month":10,"year":1989},"checking":false,"certificateReference":"42 262 816 216","channel":"Paper","imageReference":"2026 05 22 11 56 09N948364433","startDate":{"display":"9 September 2025","day":9,"month":8,"year":2025},"dueDate":{"display":"11 August 2025","day":11,"month":7,"year":2025},"endDate":{"display":"8 September 2026","day":8,"month":8,"year":2026},"childsDOB":{"display":"9 September 2025","day":9,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07097 614 258","emailAddress":"aisha.ali@hotmail.com"},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"606 795 4483","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"17 April 1989","day":17,"month":3,"year":1989},"checking":false,"certificateReference":"HRT ODAK 8QBD","channel":"Digital","startDate":{"display":"14 August 2025","day":14,"month":7,"year":2025},"endDate":{"display":"13 August 2026","day":13,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07018 725 369","emailAddress":"hussain.s@gmail.com"},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"526 023 3064","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"21 December 1979","day":21,"month":11,"year":1979},"checking":false,"certificateReference":"20 625 551 181","channel":"Paper","imageReference":"2026 05 22 11 56 09N204132481","startDate":{"display":"8 August 2025","day":8,"month":7,"year":2025},"endDate":{"display":"7 August 2026","day":7,"month":7,"year":2026},"medicalCondition":["Forms of hypoadrenalism (for example, Addison’s Disease) for which specific substitution therapy is essential"],"certificateFulfilment":"post","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07029 836 471"},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"252 299 1055","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"14 January 1993","day":14,"month":0,"year":1993},"checking":false,"certificateReference":"41 904 755 155","channel":"Paper","imageReference":"2026 05 22 11 56 09N075123058","startDate":{"display":"23 July 2025","day":23,"month":6,"year":2025},"dueDate":{"display":"20 September 2025","day":20,"month":8,"year":2025},"endDate":{"display":"22 July 2026","day":22,"month":6,"year":2026},"childsDOB":{"display":"23 July 2025","day":23,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07030 947 582","emailAddress":"begum.l@blueyonder.co.uk"},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"364 498 7392","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"5 June 1989","day":5,"month":5,"year":1989},"checking":false,"certificateReference":"87 587 741 558","channel":"Paper","imageReference":"2026 05 22 11 56 09N515121853","startDate":{"display":"27 June 2025","day":27,"month":5,"year":2025},"dueDate":{"display":"25 August 2025","day":25,"month":7,"year":2025},"endDate":{"display":"26 June 2026","day":26,"month":5,"year":2026},"childsDOB":{"display":"27 June 2025","day":27,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07042 058 693","emailAddress":"o’connor.n@blueyonder.co.uk"},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"920 197 8023","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"23 August 2004","day":23,"month":7,"year":2004},"checking":true,"checkType":"supervisor","certificateReference":"62 051 049 506","channel":"Paper","imageReference":"2026 05 22 11 56 09N982122341","startDate":{"display":"13 November 2025","day":13,"month":10,"year":2025},"dueDate":{"display":"11 October 2025","day":11,"month":9,"year":2025},"endDate":{"display":"12 November 2026","day":12,"month":10,"year":2026},"childsDOB":{"display":"13 November 2025","day":13,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07053 169 784","emailAddress":"a.kelly160@outlook.com"},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"562 661 2951","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"21 September 1983","day":21,"month":8,"year":1983},"checking":false,"certificateReference":"HRT MDMD 0MZO","channel":"Digital","startDate":{"display":"30 June 2025","day":30,"month":5,"year":2025},"endDate":{"display":"29 June 2026","day":29,"month":5,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07064 271 895","emailAddress":"e.mccarthy@hotmail.com"},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"722 340 0279","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"processing","dateOfBirth":{"display":"7 November 1981","day":7,"month":10,"year":1981},"checking":false,"certificateReference":"86 485 074 176","channel":"Paper","imageReference":"2026 05 22 11 56 09N605618265","startDate":{"display":"23 July 2025","day":23,"month":6,"year":2025},"endDate":{"display":"22 July 2026","day":22,"month":6,"year":2026},"medicalCondition":["A permanent fistula (for example, caecostomy, colostomy, laryngostomy or ileostomy) which needs continuous surgical dressing or an appliance"],"certificateFulfilment":"post","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07075 382 916","emailAddress":"Doyle919@blueyonder.co.uk"},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"891 473 5759","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"15 September 1993","day":15,"month":8,"year":1993},"checking":false,"certificateReference":"96 418 641 159","channel":"Digital","startDate":{"display":"20 August 2025","day":20,"month":7,"year":2025},"dueDate":{"display":"12 November 2025","day":12,"month":10,"year":2025},"endDate":{"display":"19 August 2026","day":19,"month":7,"year":2026},"childsDOB":{"display":"20 August 2025","day":20,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07086 493 127","emailAddress":"griffiths.c@hotmail.com"},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"298 849 2021","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"20 May 1990","day":20,"month":4,"year":1990},"checking":false,"certificateReference":"63 286 466 631","channel":"Paper","imageReference":"2026 05 22 11 56 09N935099966","startDate":{"display":"15 November 2025","day":15,"month":10,"year":2025},"dueDate":{"display":"28 September 2025","day":28,"month":8,"year":2025},"endDate":{"display":"14 November 2026","day":14,"month":10,"year":2026},"childsDOB":{"display":"15 November 2025","day":15,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07097 514 238","emailAddress":"megan.rees756@blueyonder.co.uk"},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"397 813 9678","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"19 October 1998","day":19,"month":9,"year":1998},"checking":false,"certificateReference":"05 212 283 994","channel":"Digital","startDate":{"display":"12 July 2025","day":12,"month":6,"year":2025},"dueDate":{"display":"12 October 2025","day":12,"month":9,"year":2025},"endDate":{"display":"11 July 2026","day":11,"month":6,"year":2026},"childsDOB":{"display":"12 July 2025","day":12,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07018 625 349","emailAddress":"Evans129@gmail.com"},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"816 958 8786","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"17 April 1993","day":17,"month":3,"year":1993},"checking":false,"certificateReference":"HRT S41S UA6Z","channel":"Digital","startDate":{"display":"15 September 2025","day":15,"month":8,"year":2025},"endDate":{"display":"14 September 2026","day":14,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07029 736 458","emailAddress":"MacDonald537@hotmail.com"},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"363 755 5662","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"24 April 1994","day":24,"month":3,"year":1994},"checking":false,"certificateReference":"HRT WXOG OUZ2","channel":"Digital","startDate":{"display":"16 June 2025","day":16,"month":5,"year":2025},"endDate":{"display":"15 June 2026","day":15,"month":5,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07030 847 569","emailAddress":"s.fraser@blueyonder.co.uk"},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"485 574 4086","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"17 July 2004","day":17,"month":6,"year":2004},"checking":false,"certificateReference":"53 182 005 694","channel":"Paper","imageReference":"2026 05 22 11 56 09N447057496","startDate":{"display":"16 June 2025","day":16,"month":5,"year":2025},"dueDate":{"display":"27 October 2025","day":27,"month":9,"year":2025},"endDate":{"display":"15 June 2026","day":15,"month":5,"year":2026},"childsDOB":{"display":"16 June 2025","day":16,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07041 958 672"},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"474 445 4935","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"5 November 1997","day":5,"month":10,"year":1997},"checking":false,"certificateReference":"17 075 544 462","channel":"Paper","imageReference":"2026 05 22 11 56 09N982110432","startDate":{"display":"3 September 2025","day":3,"month":8,"year":2025},"dueDate":{"display":"28 May 2025","day":28,"month":4,"year":2025},"endDate":{"display":"2 September 2026","day":2,"month":8,"year":2026},"childsDOB":{"display":"3 September 2025","day":3,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07052 069 783","emailAddress":"p.hunter@hotmail.com"},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"983 147 9427","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"8 September 1986","day":8,"month":8,"year":1986},"checking":false,"certificateReference":"20 901 606 293","channel":"Digital","startDate":{"display":"18 November 2025","day":18,"month":10,"year":2025},"endDate":{"display":"17 November 2026","day":17,"month":10,"year":2026},"medicalCondition":["Epilepsy which needs continuous anticonvulsive therapy"],"certificateFulfilment":"email","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07063 171 894","emailAddress":"clara.lawrence@gmail.com"},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"642 398 8990","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"10 March 1998","day":10,"month":2,"year":1998},"checking":true,"checkType":"supervisor","certificateReference":"81 921 079 537","channel":"Paper","imageReference":"2026 05 22 11 56 09N777405691","startDate":{"display":"12 July 2025","day":12,"month":6,"year":2025},"dueDate":{"display":"1 June 2025","day":1,"month":5,"year":2025},"endDate":{"display":"11 July 2026","day":11,"month":6,"year":2026},"childsDOB":{"display":"12 July 2025","day":12,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07074 282 915"},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"918 144 6380","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"9 February 1997","day":9,"month":1,"year":1997},"checking":false,"certificateReference":"68 245 304 360","channel":"Paper","imageReference":"2026 05 22 11 56 09N479600671","startDate":{"display":"7 November 2025","day":7,"month":10,"year":2025},"dueDate":{"display":"13 October 2025","day":13,"month":9,"year":2025},"endDate":{"display":"6 November 2026","day":6,"month":10,"year":2026},"childsDOB":{"display":"7 November 2025","day":7,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07085 393 126","emailAddress":"Rogers512@hotmail.com"},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"759 328 7471","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"12 November 1977","day":12,"month":10,"year":1977},"checking":false,"certificateReference":"08 461 967 035","channel":"Digital","startDate":{"display":"26 October 2025","day":26,"month":9,"year":2025},"endDate":{"display":"25 October 2026","day":25,"month":9,"year":2026},"medicalCondition":["Forms of hypoadrenalism (for example, Addison’s Disease) for which specific substitution therapy is essential"],"certificateFulfilment":"email","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07096 414 237","emailAddress":"Watts971@blueyonder.co.uk"},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"590 565 8210","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"expired","dateOfBirth":{"display":"26 October 1979","day":26,"month":9,"year":1979},"checking":false,"certificateReference":"84 099 704 616","channel":"Paper","imageReference":"2026 05 22 11 56 09N970729522","startDate":{"display":"5 August 2025","day":5,"month":7,"year":2025},"endDate":{"display":"4 August 2026","day":4,"month":7,"year":2026},"medicalCondition":["A continuing physical disability which means you cannot go out without the help of another person"],"certificateFulfilment":"post","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07017 525 348","emailAddress":"Henderson240@gmail.com"},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"275 247 1408","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"24 November 1993","day":24,"month":10,"year":1993},"checking":true,"checkType":"supervisor","certificateReference":"12 407 168 101","channel":"Paper","imageReference":"2026 05 22 11 56 09N404991414","startDate":{"display":"17 September 2025","day":17,"month":8,"year":2025},"dueDate":{"display":"2 October 2025","day":2,"month":9,"year":2025},"endDate":{"display":"16 September 2026","day":16,"month":8,"year":2026},"childsDOB":{"display":"17 September 2025","day":17,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07028 636 459","emailAddress":"rose.palmer@blueyonder.co.uk"},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"629 324 0557","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"8 March 2005","day":8,"month":2,"year":2005},"checking":true,"checkType":"supervisor","certificateReference":"25 618 214 540","channel":"Paper","imageReference":"2026 05 22 11 56 09N917872157","startDate":{"display":"14 July 2025","day":14,"month":6,"year":2025},"dueDate":{"display":"11 June 2025","day":11,"month":5,"year":2025},"endDate":{"display":"13 July 2026","day":13,"month":6,"year":2026},"childsDOB":{"display":"14 July 2025","day":14,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07039 747 561","emailAddress":"Nicholson761@hotmail.com"},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"786 309 6357","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"15 June 1999","day":15,"month":5,"year":1999},"checking":true,"checkType":"supervisor","certificateReference":"87 721 244 580","channel":"Paper","imageReference":"2026 05 22 11 56 09N924002688","startDate":{"display":"23 June 2025","day":23,"month":5,"year":2025},"dueDate":{"display":"30 October 2025","day":30,"month":9,"year":2025},"endDate":{"display":"22 June 2026","day":22,"month":5,"year":2026},"childsDOB":{"display":"23 June 2025","day":23,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07040 858 673"},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"937 265 5586","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"20 July 2002","day":20,"month":6,"year":2002},"checking":false,"certificateReference":"44 631 784 589","channel":"Paper","imageReference":"2026 05 22 11 56 09N965308794","startDate":{"display":"8 August 2025","day":8,"month":7,"year":2025},"dueDate":{"display":"26 October 2025","day":26,"month":9,"year":2025},"endDate":{"display":"7 August 2026","day":7,"month":7,"year":2026},"childsDOB":{"display":"8 August 2025","day":8,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07051 969 782","emailAddress":"Newton898@blueyonder.co.uk"},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"616 842 1415","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"processing","dateOfBirth":{"display":"22 September 1994","day":22,"month":8,"year":1994},"checking":false,"certificateReference":"60 115 034 439","channel":"Paper","imageReference":"2026 05 22 11 56 09N650474785","startDate":{"display":"25 May 2025","day":25,"month":4,"year":2025},"endDate":{"display":"24 May 2026","day":24,"month":4,"year":2026},"medicalCondition":["Diabetes insipidus or other forms of hypopituitarism"],"certificateFulfilment":"post","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07062 071 893","emailAddress":"Reed498@blueyonder.co.uk"},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"441 636 3191","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"2 September 1992","day":2,"month":8,"year":1992},"checking":false,"certificateReference":"HRT 3SCU 11ZL","channel":"Digital","startDate":{"display":"9 June 2025","day":9,"month":5,"year":2025},"endDate":{"display":"8 June 2026","day":8,"month":5,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07073 182 914","emailAddress":"victoria.harvey@gmail.com"},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"459 732 3726","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"22 May 2003","day":22,"month":4,"year":2003},"checking":false,"certificateReference":"61 863 902 839","channel":"Paper","imageReference":"2026 05 22 11 56 09N472087259","startDate":{"display":"14 October 2025","day":14,"month":9,"year":2025},"dueDate":{"display":"22 October 2025","day":22,"month":9,"year":2025},"endDate":{"display":"13 October 2026","day":13,"month":9,"year":2026},"childsDOB":{"display":"14 October 2025","day":14,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07084 293 125","emailAddress":"maria.fernandez@hotmail.com"},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"428 875 6739","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"5 December 1981","day":5,"month":11,"year":1981},"checking":false,"certificateReference":"HRT XTKB 05TI","channel":"Digital","startDate":{"display":"1 August 2025","day":1,"month":7,"year":2025},"endDate":{"display":"31 July 2026","day":31,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07095 314 236","emailAddress":"elena.silva@googlemail.com"},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"680 454 6263","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"3 October 1971","day":3,"month":9,"year":1971},"checking":false,"certificateReference":"HRT QWMI C3OE","channel":"Digital","startDate":{"display":"6 June 2025","day":6,"month":5,"year":2025},"endDate":{"display":"5 June 2026","day":5,"month":5,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07016 425 347","emailAddress":"leila.patel@gmail.com"},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"052 718 5952","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"4 October 1984","day":4,"month":9,"year":1984},"checking":false,"certificateReference":"50 440 787 944","channel":"Paper","imageReference":"2026 05 22 11 56 09N215277881","startDate":{"display":"14 November 2025","day":14,"month":10,"year":2025},"endDate":{"display":"13 November 2026","day":13,"month":10,"year":2026},"medicalCondition":["A permanent fistula (for example, caecostomy, colostomy, laryngostomy or ileostomy) which needs continuous surgical dressing or an appliance"],"certificateFulfilment":"post","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07027 536 458","emailAddress":"f.iqbal@aol.com"},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"426 492 1816","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"24 August 1989","day":24,"month":7,"year":1989},"checking":false,"certificateReference":"96 156 967 315","channel":"Paper","imageReference":"2026 05 22 11 56 09N818007131","startDate":{"display":"9 July 2025","day":9,"month":6,"year":2025},"endDate":{"display":"8 July 2026","day":8,"month":6,"year":2026},"medicalCondition":["Diabetes mellitus (not controlled by diet alone)"],"certificateFulfilment":"post","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07038 647 569","emailAddress":"jasmine.ahmed@blueyonder.co.uk"},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"429 603 9785","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"7 July 1993","day":7,"month":6,"year":1993},"checking":false,"certificateReference":"HRT SCXT Q251","channel":"Digital","startDate":{"display":"12 November 2025","day":12,"month":10,"year":2025},"endDate":{"display":"11 November 2026","day":11,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07049 758 671","emailAddress":"nadia.rashid@outlook.com"},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"822 146 5412","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"1 September 1983","day":1,"month":8,"year":1983},"checking":false,"certificateReference":"42 806 191 794","channel":"Digital","startDate":{"display":"27 June 2025","day":27,"month":5,"year":2025},"endDate":{"display":"26 June 2026","day":26,"month":5,"year":2026},"medicalCondition":["Diabetes mellitus (not controlled by diet alone)"],"certificateFulfilment":"email","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07050 869 782","emailAddress":"paterson.t@blueyonder.co.uk"},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"332 587 4468","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"5 March 1971","day":5,"month":2,"year":1971},"checking":false,"certificateReference":"08 616 566 437","channel":"Paper","imageReference":"2026 05 22 11 56 09N262505154","startDate":{"display":"16 November 2025","day":16,"month":10,"year":2025},"endDate":{"display":"15 November 2026","day":15,"month":10,"year":2026},"medicalCondition":["Diabetes mellitus (not controlled by diet alone)"],"certificateFulfilment":"post","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07061 971 893","emailAddress":"b.foster@outlook.com"},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"678 991 3682","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"5 October 1996","day":5,"month":9,"year":1996},"checking":false,"certificateReference":"HRT WFII FXC3","channel":"Pharmacy","startDate":{"display":"4 October 2025","day":4,"month":9,"year":2025},"endDate":{"display":"3 October 2026","day":3,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07072 082 914","emailAddress":"l.fox456@googlemail.com"},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"890 963 0504","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"4 June 1991","day":4,"month":5,"year":1991},"checking":true,"checkType":"supervisor","certificateReference":"71 617 874 749","channel":"Paper","imageReference":"2026 05 22 11 56 09N644578443","startDate":{"display":"4 November 2025","day":4,"month":10,"year":2025},"dueDate":{"display":"18 September 2025","day":18,"month":8,"year":2025},"endDate":{"display":"3 November 2026","day":3,"month":10,"year":2026},"childsDOB":{"display":"4 November 2025","day":4,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07083 193 125"},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"417 729 8629","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"14 October 1988","day":14,"month":9,"year":1988},"checking":false,"certificateReference":"HRT 4HFP 2YG6","channel":"Digital","startDate":{"display":"26 June 2025","day":26,"month":5,"year":2025},"endDate":{"display":"25 June 2026","day":25,"month":5,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07094 214 236","emailAddress":"Murray781@googlemail.com"},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"260 741 0356","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"24 July 1990","day":24,"month":6,"year":1990},"checking":false,"certificateReference":"77 718 478 283","channel":"Digital","startDate":{"display":"15 October 2025","day":15,"month":9,"year":2025},"dueDate":{"display":"17 September 2025","day":17,"month":8,"year":2025},"endDate":{"display":"14 October 2026","day":14,"month":9,"year":2026},"childsDOB":{"display":"15 October 2025","day":15,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07015 325 347","emailAddress":"ella-may.west@googlemail.com"},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"355 053 0735","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"5 February 1993","day":5,"month":1,"year":1993},"checking":true,"checkType":"supervisor","certificateReference":"18 232 476 072","channel":"Paper","imageReference":"2026 05 22 11 56 09N170927138","startDate":{"display":"20 August 2025","day":20,"month":7,"year":2025},"dueDate":{"display":"31 May 2025","day":31,"month":4,"year":2025},"endDate":{"display":"19 August 2026","day":19,"month":7,"year":2026},"childsDOB":{"display":"20 August 2025","day":20,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07026 436 458","emailAddress":"robyn.matthews@googlemail.com"},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"395 657 1424","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"21 June 1989","day":21,"month":5,"year":1989},"checking":false,"certificateReference":"84 979 350 451","channel":"Digital","startDate":{"display":"31 August 2025","day":31,"month":7,"year":2025},"dueDate":{"display":"30 September 2025","day":30,"month":8,"year":2025},"endDate":{"display":"30 August 2026","day":30,"month":7,"year":2026},"childsDOB":{"display":"31 August 2025","day":31,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07037 547 569","emailAddress":"k.holmes@googlemail.com"},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"345 316 2693","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"2 March 1984","day":2,"month":2,"year":1984},"checking":false,"certificateReference":"72 173 867 911","channel":"Digital","startDate":{"display":"22 September 2025","day":22,"month":8,"year":2025},"endDate":{"display":"21 September 2026","day":21,"month":8,"year":2026},"medicalCondition":["Cancer (treatment or effects of disease/treatment)"],"certificateFulfilment":"email","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07048 658 671","emailAddress":"l.walsh@aol.com"},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"415 823 7670","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"5 July 2007","day":5,"month":6,"year":2007},"checking":false,"certificateReference":"49 148 173 858","channel":"Paper","imageReference":"2026 05 22 11 56 09N428773882","startDate":{"display":"31 July 2025","day":31,"month":6,"year":2025},"dueDate":{"display":"9 June 2025","day":9,"month":5,"year":2025},"endDate":{"display":"30 July 2026","day":30,"month":6,"year":2026},"childsDOB":{"display":"31 July 2025","day":31,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07059 769 782"},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"209 771 2189","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"24 June 2005","day":24,"month":5,"year":2005},"checking":false,"certificateReference":"33 957 721 223","channel":"Paper","imageReference":"2026 05 22 11 56 09N673510507","startDate":{"display":"22 October 2025","day":22,"month":9,"year":2025},"dueDate":{"display":"3 October 2025","day":3,"month":9,"year":2025},"endDate":{"display":"21 October 2026","day":21,"month":9,"year":2026},"childsDOB":{"display":"22 October 2025","day":22,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07060 871 893"},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"461 785 0760","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"13 June 1982","day":13,"month":5,"year":1982},"checking":false,"certificateReference":"01 426 417 135","channel":"Digital","startDate":{"display":"10 June 2025","day":10,"month":5,"year":2025},"endDate":{"display":"9 June 2026","day":9,"month":5,"year":2026},"medicalCondition":["Myasthenia gravis"],"certificateFulfilment":"email","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07071 982 914","emailAddress":"beth.barrett@hotmail.com"},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"959 933 6565","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"5 November 1998","day":5,"month":10,"year":1998},"checking":true,"checkType":"supervisor","certificateReference":"21 664 849 644","channel":"Paper","imageReference":"2026 05 22 11 56 09N622705618","startDate":{"display":"26 June 2025","day":26,"month":5,"year":2025},"dueDate":{"display":"2 August 2025","day":2,"month":7,"year":2025},"endDate":{"display":"25 June 2026","day":25,"month":5,"year":2026},"childsDOB":{"display":"26 June 2025","day":26,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07082 093 125","emailAddress":"mollie.hayes@aol.com"},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"215 222 6298","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"20 July 1974","day":20,"month":6,"year":1974},"checking":false,"certificateReference":"HRT 8EWO Q2XD","channel":"Pharmacy","startDate":{"display":"12 November 2025","day":12,"month":10,"year":2025},"endDate":{"display":"11 November 2026","day":11,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07093 114 236","emailAddress":"f.cunningham@hotmail.com"},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"139 598 6394","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"18 December 1987","day":18,"month":11,"year":1987},"checking":true,"checkType":"quality","certificateReference":"76 007 987 589","channel":"Paper","imageReference":"2026 05 22 11 56 09N870961816","startDate":{"display":"2 June 2025","day":2,"month":5,"year":2025},"endDate":{"display":"1 June 2026","day":1,"month":5,"year":2026},"medicalCondition":["Diabetes mellitus (not controlled by diet alone)"],"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07014 225 347","emailAddress":"a.barber@googlemail.com"},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"913 684 4733","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"5 October 1993","day":5,"month":9,"year":1993},"checking":false,"certificateReference":"21 094 948 520","channel":"Paper","imageReference":"2026 05 22 11 56 09N180491996","startDate":{"display":"18 August 2025","day":18,"month":7,"year":2025},"endDate":{"display":"17 August 2026","day":17,"month":7,"year":2026},"medicalCondition":["A permanent fistula (for example, caecostomy, colostomy, laryngostomy or ileostomy) which needs continuous surgical dressing or an appliance"],"certificateFulfilment":"post","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07025 336 458","emailAddress":"knight.l@gmail.com"},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"699 527 0675","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"26 February 2006","day":26,"month":1,"year":2006},"checking":false,"certificateReference":"48 496 588 254","channel":"Paper","imageReference":"2026 05 22 11 56 09N839785100","startDate":{"display":"16 August 2025","day":16,"month":7,"year":2025},"dueDate":{"display":"5 June 2025","day":5,"month":5,"year":2025},"endDate":{"display":"15 August 2026","day":15,"month":7,"year":2026},"childsDOB":{"display":"16 August 2025","day":16,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07036 447 569","emailAddress":"eden.parsons282@gmail.com"},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"713 323 1427","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"9 January 2003","day":9,"month":0,"year":2003},"checking":false,"certificateReference":"97 353 213 349","channel":"Digital","startDate":{"display":"7 November 2025","day":7,"month":10,"year":2025},"dueDate":{"display":"7 June 2025","day":7,"month":5,"year":2025},"endDate":{"display":"6 November 2026","day":6,"month":10,"year":2026},"childsDOB":{"display":"7 November 2025","day":7,"month":10,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07047 558 671","emailAddress":"t.bates@gmail.com"},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"225 163 4516","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"6 January 2005","day":6,"month":0,"year":2005},"checking":false,"certificateReference":"16 715 738 151","channel":"Digital","startDate":{"display":"14 July 2025","day":14,"month":6,"year":2025},"dueDate":{"display":"3 June 2025","day":3,"month":5,"year":2025},"endDate":{"display":"13 July 2026","day":13,"month":6,"year":2026},"childsDOB":{"display":"14 July 2025","day":14,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07030 947 582","emailAddress":"Day870@googlemail.com"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"969 249 9732","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"16 November 2003","day":16,"month":10,"year":2003},"checking":true,"checkType":"supervisor","certificateReference":"89 771 008 274","channel":"Paper","imageReference":"2026 05 22 11 56 09N666272650","startDate":{"display":"26 July 2025","day":26,"month":6,"year":2025},"dueDate":{"display":"8 October 2025","day":8,"month":9,"year":2025},"endDate":{"display":"25 July 2026","day":25,"month":6,"year":2026},"childsDOB":{"display":"26 July 2025","day":26,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07029 736 458","emailAddress":"Francis864@aol.com"},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"190 710 7901","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"11 December 1989","day":11,"month":11,"year":1989},"checking":false,"certificateReference":"84 675 808 164","channel":"Paper","imageReference":"2026 05 22 11 56 09N707703844","startDate":{"display":"26 July 2025","day":26,"month":6,"year":2025},"dueDate":{"display":"9 September 2025","day":9,"month":8,"year":2025},"endDate":{"display":"25 July 2026","day":25,"month":6,"year":2026},"childsDOB":{"display":"26 July 2025","day":26,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07071 528 439","emailAddress":"h.burton@hotmail.com"}]';
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
