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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"178 560 7255","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"16 August 1991","day":16,"month":7,"year":1991},"checking":true,"checkType":"quality","certificateReference":"12 066 582 671","channel":"Paper","imageReference":"2026 05 27 16 12 26N517537603","startDate":{"display":"12 July 2025","day":12,"month":6,"year":2025},"endDate":{"display":"11 July 2026","day":11,"month":6,"year":2026},"medicalCondition":["(4) Myxoedema"],"certificateFulfilment":"post","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07031 284 591","emailAddress":"olivia.smith@aol.com"},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"966 384 0813","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"16 June 1994","day":16,"month":5,"year":1994},"checking":true,"checkType":"supervisor","certificateReference":"71 325 278 560","channel":"Paper","imageReference":"2026 05 27 16 12 26N793161348","startDate":{"display":"13 June 2025","day":13,"month":5,"year":2025},"dueDate":{"display":"20 June 2025","day":20,"month":5,"year":2025},"endDate":{"display":"12 June 2026","day":12,"month":5,"year":2026},"childsDOB":{"display":"13 June 2025","day":13,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07049 823 716","emailAddress":"a.jones@googlemail.com"},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"494 692 0185","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"25 May 1992","day":25,"month":4,"year":1992},"checking":false,"certificateReference":"59 069 997 132","channel":"Paper","imageReference":"2026 05 27 16 12 26N172249473","startDate":{"display":"17 August 2025","day":17,"month":7,"year":2025},"dueDate":{"display":"16 October 2025","day":16,"month":9,"year":2025},"endDate":{"display":"16 August 2026","day":16,"month":7,"year":2026},"childsDOB":{"display":"17 August 2025","day":17,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 395 184","emailAddress":"i.taylor239@hotmail.com"},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"738 698 2047","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"22 September 1996","day":22,"month":8,"year":1996},"checking":true,"checkType":"quality","certificateReference":"21 022 537 050","channel":"Paper","imageReference":"2026 05 27 16 12 26N465877914","startDate":{"display":"15 June 2025","day":15,"month":5,"year":2025},"endDate":{"display":"14 June 2026","day":14,"month":5,"year":2026},"medicalCondition":["(1) Permanent fistula","(2) Epilepsy","(4) Myxoedema"],"certificateFulfilment":"post","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07071 528 439"},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"427 841 9523","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"5 October 1992","day":5,"month":9,"year":1992},"checking":true,"checkType":"supervisor","certificateReference":"51 422 248 906","channel":"Paper","imageReference":"2026 05 27 16 12 26N418800182","startDate":{"display":"11 August 2025","day":11,"month":7,"year":2025},"dueDate":{"display":"23 June 2025","day":23,"month":5,"year":2025},"endDate":{"display":"10 August 2026","day":10,"month":7,"year":2026},"childsDOB":{"display":"11 August 2025","day":11,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07083 916 275","emailAddress":"williams.e@googlemail.com"},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"372 467 4393","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"9 July 2003","day":9,"month":6,"year":2003},"checking":false,"certificateReference":"03 789 331 873","channel":"Paper","imageReference":"2026 05 27 16 12 26N089213452","startDate":{"display":"1 November 2025","day":1,"month":10,"year":2025},"dueDate":{"display":"22 October 2025","day":22,"month":9,"year":2025},"endDate":{"display":"31 October 2026","day":31,"month":9,"year":2026},"childsDOB":{"display":"1 November 2025","day":1,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07092 475 318"},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"606 460 5650","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"24 January 1992","day":24,"month":0,"year":1992},"checking":false,"certificateReference":"72 339 880 625","channel":"Paper","imageReference":"2026 05 27 16 12 26N572327110","startDate":{"display":"13 August 2025","day":13,"month":7,"year":2025},"dueDate":{"display":"4 July 2025","day":4,"month":6,"year":2025},"endDate":{"display":"12 August 2026","day":12,"month":7,"year":2026},"childsDOB":{"display":"13 August 2025","day":13,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07015 648 293","emailAddress":"davies.m@outlook.com"},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"134 042 8943","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"21 January 1986","day":21,"month":0,"year":1986},"checking":true,"checkType":"quality","certificateReference":"58 918 834 179","channel":"Paper","imageReference":"2026 05 27 16 12 26N514258835","startDate":{"display":"4 November 2025","day":4,"month":10,"year":2025},"endDate":{"display":"3 November 2026","day":3,"month":10,"year":2026},"medicalCondition":["(4) Myxoedema"],"certificateFulfilment":"post","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 751 964","emailAddress":"Evans547@hotmail.com"},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"326 326 5854","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"17 October 1990","day":17,"month":9,"year":1990},"checking":false,"certificateReference":"21 009 369 263","channel":"Digital","startDate":{"display":"7 July 2025","day":7,"month":6,"year":2025},"endDate":{"display":"6 July 2026","day":6,"month":6,"year":2026},"medicalCondition":["(3) Diabetes mellitus","(7) Forms of hypoadrenalism","(10) Cancer"],"certificateFulfilment":"email","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07036 592 817","emailAddress":"Thomas356@outlook.com"},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"409 946 3750","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"10 June 1979","day":10,"month":5,"year":1979},"checking":false,"certificateReference":"HRT LV11 VBBE","channel":"Digital","startDate":{"display":"18 July 2025","day":18,"month":6,"year":2025},"endDate":{"display":"17 July 2026","day":17,"month":6,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07047 813 256","emailAddress":"lily.roberts@hotmail.com"},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"412 695 7315","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"18 December 2006","day":18,"month":11,"year":2006},"checking":true,"checkType":"supervisor","certificateReference":"62 275 410 291","channel":"Paper","imageReference":"2026 05 27 16 12 26N421143616","startDate":{"display":"4 June 2025","day":4,"month":5,"year":2025},"dueDate":{"display":"14 July 2025","day":14,"month":6,"year":2025},"endDate":{"display":"3 June 2026","day":3,"month":5,"year":2026},"childsDOB":{"display":"4 June 2025","day":4,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07051 294 783","emailAddress":"johnson.f@outlook.com"},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"217 190 7922","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"21 January 2006","day":21,"month":0,"year":2006},"checking":true,"checkType":"supervisor","certificateReference":"71 226 083 976","channel":"Paper","imageReference":"2026 05 27 16 12 26N345562394","startDate":{"display":"29 October 2025","day":29,"month":9,"year":2025},"dueDate":{"display":"20 September 2025","day":20,"month":8,"year":2025},"endDate":{"display":"28 October 2026","day":28,"month":9,"year":2026},"childsDOB":{"display":"29 October 2025","day":29,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07063 418 592"},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"805 091 2877","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"21 February 1991","day":21,"month":1,"year":1991},"checking":false,"certificateReference":"37 447 807 018","channel":"Paper","imageReference":"2026 05 27 16 12 26N813017748","startDate":{"display":"19 October 2025","day":19,"month":9,"year":2025},"endDate":{"display":"18 October 2026","day":18,"month":9,"year":2026},"medicalCondition":["(6) Diabetes insipidus","(7) Forms of hypoadrenalism","(8) Myasthenia gravis"],"certificateFulfilment":"post","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07075 928 341","emailAddress":"i.walker@hotmail.com"},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"885 520 0809","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"25 May 1997","day":25,"month":4,"year":1997},"checking":false,"certificateReference":"95 168 737 811","channel":"Digital","startDate":{"display":"22 September 2025","day":22,"month":8,"year":2025},"dueDate":{"display":"19 November 2025","day":19,"month":10,"year":2025},"endDate":{"display":"21 September 2026","day":21,"month":8,"year":2026},"childsDOB":{"display":"22 September 2025","day":22,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07084 372 659","emailAddress":"daisy.hall@blueyonder.co.uk"},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"294 968 1030","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"processing","dateOfBirth":{"display":"24 April 2005","day":24,"month":3,"year":2005},"checking":false,"certificateReference":"96 357 928 597","channel":"Paper","imageReference":"2026 05 27 16 12 26N894127295","startDate":{"display":"12 July 2025","day":12,"month":6,"year":2025},"dueDate":{"display":"30 August 2025","day":30,"month":7,"year":2025},"endDate":{"display":"11 July 2026","day":11,"month":6,"year":2026},"childsDOB":{"display":"12 July 2025","day":12,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07091 837 426"},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"184 589 1532","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"22 October 1990","day":22,"month":9,"year":1990},"checking":true,"checkType":"supervisor","certificateReference":"12 198 034 497","channel":"Paper","imageReference":"2026 05 27 16 12 26N683270118","startDate":{"display":"27 June 2025","day":27,"month":5,"year":2025},"dueDate":{"display":"17 August 2025","day":17,"month":7,"year":2025},"endDate":{"display":"26 June 2026","day":26,"month":5,"year":2026},"childsDOB":{"display":"27 June 2025","day":27,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 385 927","emailAddress":"p.allen@blueyonder.co.uk"},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"764 480 6257","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"7 January 1996","day":7,"month":0,"year":1996},"checking":false,"certificateReference":"HRT 0R78 Z3KG","channel":"Digital","startDate":{"display":"24 August 2025","day":24,"month":7,"year":2025},"endDate":{"display":"23 August 2026","day":23,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07027 639 485","emailAddress":"sophie.young@aol.com"},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"334 846 4640","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"6 October 2002","day":6,"month":9,"year":2002},"checking":false,"certificateReference":"81 118 621 512","channel":"Digital","startDate":{"display":"4 August 2025","day":4,"month":7,"year":2025},"dueDate":{"display":"15 August 2025","day":15,"month":7,"year":2025},"endDate":{"display":"3 August 2026","day":3,"month":7,"year":2026},"childsDOB":{"display":"4 August 2025","day":4,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07035 821 749","emailAddress":"h.king@blueyonder.co.uk"},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"663 620 3571","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"8 August 1996","day":8,"month":7,"year":1996},"checking":false,"certificateReference":"05 683 213 613","channel":"Paper","imageReference":"2026 05 27 16 12 26N185416487","startDate":{"display":"25 September 2025","day":25,"month":8,"year":2025},"dueDate":{"display":"3 July 2025","day":3,"month":6,"year":2025},"endDate":{"display":"24 September 2026","day":24,"month":8,"year":2026},"childsDOB":{"display":"25 September 2025","day":25,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07048 952 613","emailAddress":"m.wright485@blueyonder.co.uk"},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"997 589 8165","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"25 February 2005","day":25,"month":1,"year":2005},"checking":false,"certificateReference":"16 014 502 820","channel":"Paper","imageReference":"2026 05 27 16 12 26N472825907","startDate":{"display":"17 August 2025","day":17,"month":7,"year":2025},"dueDate":{"display":"3 October 2025","day":3,"month":9,"year":2025},"endDate":{"display":"16 August 2026","day":16,"month":7,"year":2026},"childsDOB":{"display":"17 August 2025","day":17,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07052 719 384"},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"765 925 6697","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"4 July 1976","day":4,"month":6,"year":1976},"checking":false,"certificateReference":"56 446 246 786","channel":"Paper","imageReference":"2026 05 27 16 12 26N759217968","startDate":{"display":"19 September 2025","day":19,"month":8,"year":2025},"endDate":{"display":"18 September 2026","day":18,"month":8,"year":2026},"medicalCondition":["(1) Permanent fistula"],"certificateFulfilment":"post","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07064 837 295","emailAddress":"poppy.baker@googlemail.com"},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"587 913 5951","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"14 February 1977","day":14,"month":1,"year":1977},"checking":false,"certificateReference":"HRT UYOK UUQ1","channel":"Digital","startDate":{"display":"8 July 2025","day":8,"month":6,"year":2025},"endDate":{"display":"7 July 2026","day":7,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07073 491 826","emailAddress":"adams.r@aol.com"},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"251 408 1560","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"13 May 1995","day":13,"month":4,"year":1995},"checking":true,"checkType":"supervisor","certificateReference":"28 533 936 365","channel":"Paper","imageReference":"2026 05 27 16 12 26N743095476","startDate":{"display":"23 June 2025","day":23,"month":5,"year":2025},"dueDate":{"display":"28 September 2025","day":28,"month":8,"year":2025},"endDate":{"display":"22 June 2026","day":22,"month":5,"year":2026},"childsDOB":{"display":"23 June 2025","day":23,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07085 623 941"},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"306 139 9797","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"processing","dateOfBirth":{"display":"18 August 1992","day":18,"month":7,"year":1992},"checking":false,"certificateReference":"42 267 481 159","channel":"Paper","imageReference":"2026 05 27 16 12 26N538018211","startDate":{"display":"21 November 2025","day":21,"month":10,"year":2025},"endDate":{"display":"20 November 2026","day":20,"month":10,"year":2026},"medicalCondition":["(4) Myxoedema"],"certificateFulfilment":"post","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07096 718 235"},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"371 229 3607","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"23 June 2007","day":23,"month":5,"year":2007},"checking":false,"certificateReference":"62 085 997 745","channel":"Paper","imageReference":"2026 05 27 16 12 26N374445720","startDate":{"display":"27 October 2025","day":27,"month":9,"year":2025},"dueDate":{"display":"27 June 2025","day":27,"month":5,"year":2025},"endDate":{"display":"26 October 2026","day":26,"month":9,"year":2026},"childsDOB":{"display":"27 October 2025","day":27,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07018 273 945","emailAddress":"carter.w@googlemail.com"},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"147 725 3022","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"26 March 1985","day":26,"month":2,"year":1985},"checking":false,"certificateReference":"15 345 108 491","channel":"Paper","imageReference":"2026 05 27 16 12 26N936907862","startDate":{"display":"9 July 2025","day":9,"month":6,"year":2025},"endDate":{"display":"8 July 2026","day":8,"month":6,"year":2026},"medicalCondition":["(2) Epilepsy","(7) Forms of hypoadrenalism","(8) Myasthenia gravis"],"certificateFulfilment":"post","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07029 384 756"},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"119 553 6463","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"18 November 1984","day":18,"month":10,"year":1984},"checking":false,"certificateReference":"HRT 7M1K 75NO","channel":"Digital","startDate":{"display":"23 October 2025","day":23,"month":9,"year":2025},"endDate":{"display":"22 October 2026","day":22,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07031 572 948","emailAddress":"m.hughes774@googlemail.com"},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"382 091 0651","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"27 December 1997","day":27,"month":11,"year":1997},"checking":true,"checkType":"supervisor","certificateReference":"04 588 260 612","channel":"Paper","imageReference":"2026 05 27 16 12 26N303670195","startDate":{"display":"16 November 2025","day":16,"month":10,"year":2025},"dueDate":{"display":"5 November 2025","day":5,"month":10,"year":2025},"endDate":{"display":"15 November 2026","day":15,"month":10,"year":2026},"childsDOB":{"display":"16 November 2025","day":16,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07042 619 583","emailAddress":"ward.e@blueyonder.co.uk"},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"358 732 5594","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"2 July 1981","day":2,"month":6,"year":1981},"checking":false,"certificateReference":"23 181 229 227","channel":"Paper","imageReference":"2026 05 27 16 12 26N376191233","startDate":{"display":"22 July 2025","day":22,"month":6,"year":2025},"endDate":{"display":"21 July 2026","day":21,"month":6,"year":2026},"medicalCondition":["(5) Hypoparathyroidism"],"certificateFulfilment":"post","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07053 847 261","emailAddress":"r.price976@blueyonder.co.uk"},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"286 740 9265","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"10 July 1995","day":10,"month":6,"year":1995},"checking":true,"checkType":"supervisor","certificateReference":"10 315 059 521","channel":"Paper","imageReference":"2026 05 27 16 12 26N779297173","startDate":{"display":"14 August 2025","day":14,"month":7,"year":2025},"dueDate":{"display":"29 June 2025","day":29,"month":5,"year":2025},"endDate":{"display":"13 August 2026","day":13,"month":7,"year":2026},"childsDOB":{"display":"14 August 2025","day":14,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07064 928 137","emailAddress":"aria.cooper@hotmail.com"},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"658 629 8631","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"19 December 2008","day":19,"month":11,"year":2008},"checking":false,"certificateReference":"64 835 819 593","channel":"Paper","imageReference":"2026 05 27 16 12 26N398728644","startDate":{"display":"18 September 2025","day":18,"month":8,"year":2025},"dueDate":{"display":"23 August 2025","day":23,"month":7,"year":2025},"endDate":{"display":"17 September 2026","day":17,"month":8,"year":2026},"childsDOB":{"display":"18 September 2025","day":18,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07075 283 916","emailAddress":"layla.bailey@googlemail.com"},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"433 852 7834","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"15 February 1995","day":15,"month":1,"year":1995},"checking":false,"certificateReference":"04 727 660 755","channel":"Paper","imageReference":"2026 05 27 16 12 26N228407683","startDate":{"display":"1 October 2025","day":1,"month":9,"year":2025},"endDate":{"display":"30 September 2026","day":30,"month":8,"year":2026},"medicalCondition":["(6) Diabetes insipidus"],"certificateFulfilment":"post","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07086 419 375"},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"394 784 8798","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"12 July 1967","day":12,"month":6,"year":1967},"checking":false,"certificateReference":"HRT P15B 55P6","channel":"Pharmacy","startDate":{"display":"27 June 2025","day":27,"month":5,"year":2025},"endDate":{"display":"26 June 2026","day":26,"month":5,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07097 531 284","emailAddress":"h.phillips@blueyonder.co.uk"},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"198 064 8447","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"1 January 1984","day":1,"month":0,"year":1984},"checking":false,"certificateReference":"HRT 2GCM L80I","channel":"Digital","startDate":{"display":"24 October 2025","day":24,"month":9,"year":2025},"endDate":{"display":"23 October 2026","day":23,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07018 642 597","emailAddress":"zara.bennett@hotmail.com"},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"839 696 0133","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"28 March 2006","day":28,"month":2,"year":2006},"checking":true,"checkType":"supervisor","certificateReference":"74 553 987 243","channel":"Paper","imageReference":"2026 05 27 16 12 26N553601575","startDate":{"display":"21 October 2025","day":21,"month":9,"year":2025},"dueDate":{"display":"7 June 2025","day":7,"month":5,"year":2025},"endDate":{"display":"20 October 2026","day":20,"month":9,"year":2026},"childsDOB":{"display":"21 October 2025","day":21,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07029 753 861"},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"516 518 8074","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"19 April 1968","day":19,"month":3,"year":1968},"checking":false,"certificateReference":"HRT CF7U T0V0","channel":"Digital","startDate":{"display":"9 September 2025","day":9,"month":8,"year":2025},"endDate":{"display":"8 September 2026","day":8,"month":8,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07031 864 729","emailAddress":"m.richardson@googlemail.com"},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"130 762 8212","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"20 December 1981","day":20,"month":11,"year":1981},"checking":false,"certificateReference":"07 379 463 981","channel":"Digital","startDate":{"display":"25 June 2025","day":25,"month":5,"year":2025},"endDate":{"display":"24 June 2026","day":24,"month":5,"year":2026},"medicalCondition":["(1) Permanent fistula","(2) Epilepsy","(7) Forms of hypoadrenalism"],"certificateFulfilment":"email","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07042 987 513","emailAddress":"esme.gray@aol.com"},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"660 961 9451","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"3 May 1969","day":3,"month":4,"year":1969},"checking":false,"certificateReference":"HRT FWNI VENS","channel":"Digital","startDate":{"display":"5 September 2025","day":5,"month":8,"year":2025},"endDate":{"display":"4 September 2026","day":4,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07054 129 876","emailAddress":"ivy.ross@outlook.com"},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"129 964 1046","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"27 March 1971","day":27,"month":2,"year":1971},"checking":false,"certificateReference":"57 758 529 398","channel":"Digital","startDate":{"display":"22 October 2025","day":22,"month":9,"year":2025},"endDate":{"display":"21 October 2026","day":21,"month":9,"year":2026},"medicalCondition":["(2) Epilepsy"],"certificateFulfilment":"email","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07065 238 741","emailAddress":"arabella.bell@hotmail.com"},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"474 413 5438","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"3 May 1999","day":3,"month":4,"year":1999},"checking":true,"checkType":"supervisor","certificateReference":"71 328 529 667","channel":"Paper","imageReference":"2026 05 27 16 12 26N766073455","startDate":{"display":"16 October 2025","day":16,"month":9,"year":2025},"dueDate":{"display":"5 June 2025","day":5,"month":5,"year":2025},"endDate":{"display":"15 October 2026","day":15,"month":9,"year":2026},"childsDOB":{"display":"16 October 2025","day":16,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07076 391 825","emailAddress":"e.cook@hotmail.com"},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"593 095 7050","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"19 August 1981","day":19,"month":7,"year":1981},"checking":false,"certificateReference":"77 680 422 547","channel":"Paper","imageReference":"2026 05 27 16 12 26N987523155","startDate":{"display":"16 October 2025","day":16,"month":9,"year":2025},"endDate":{"display":"15 October 2026","day":15,"month":9,"year":2026},"medicalCondition":["(7) Forms of hypoadrenalism"],"certificateFulfilment":"post","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07087 512 936","emailAddress":"t.watson@outlook.com"},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"028 066 6919","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"18 April 2008","day":18,"month":3,"year":2008},"checking":true,"checkType":"supervisor","certificateReference":"78 524 224 864","channel":"Paper","imageReference":"2026 05 27 16 12 26N346165809","startDate":{"display":"8 August 2025","day":8,"month":7,"year":2025},"dueDate":{"display":"18 July 2025","day":18,"month":6,"year":2025},"endDate":{"display":"7 August 2026","day":7,"month":7,"year":2026},"childsDOB":{"display":"8 August 2025","day":8,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07098 631 427","emailAddress":"Sanders176@googlemail.com"},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"078 349 1536","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"11 May 1995","day":11,"month":4,"year":1995},"checking":true,"checkType":"supervisor","certificateReference":"61 846 793 210","channel":"Paper","imageReference":"2026 05 27 16 12 26N370353442","startDate":{"display":"14 November 2025","day":14,"month":10,"year":2025},"dueDate":{"display":"26 October 2025","day":26,"month":9,"year":2025},"endDate":{"display":"13 November 2026","day":13,"month":10,"year":2026},"childsDOB":{"display":"14 November 2025","day":14,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07019 742 835","emailAddress":"emma.harrison@gmail.com"},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"257 407 4554","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"expired","dateOfBirth":{"display":"15 November 2007","day":15,"month":10,"year":2007},"checking":false,"certificateReference":"26 188 977 491","channel":"Digital","startDate":{"display":"13 September 2025","day":13,"month":8,"year":2025},"dueDate":{"display":"31 July 2025","day":31,"month":6,"year":2025},"endDate":{"display":"12 September 2026","day":12,"month":8,"year":2026},"childsDOB":{"display":"13 September 2025","day":13,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07020 853 749","emailAddress":"lottie.coleman@aol.com"},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"298 493 5140","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"13 March 1999","day":13,"month":2,"year":1999},"checking":true,"checkType":"supervisor","certificateReference":"34 201 224 967","channel":"Paper","imageReference":"2026 05 27 16 12 26N919479940","startDate":{"display":"29 June 2025","day":29,"month":5,"year":2025},"dueDate":{"display":"24 August 2025","day":24,"month":7,"year":2025},"endDate":{"display":"28 June 2026","day":28,"month":5,"year":2026},"childsDOB":{"display":"29 June 2025","day":29,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07031 984 625","emailAddress":"Murphy458@hotmail.com"},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"482 514 0160","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"17 September 1987","day":17,"month":8,"year":1987},"checking":false,"certificateReference":"HRT T465 8NFC","channel":"Digital","startDate":{"display":"10 October 2025","day":10,"month":9,"year":2025},"endDate":{"display":"9 October 2026","day":9,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07042 195 783","emailAddress":"Graham408@outlook.com"},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"033 922 9052","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"3 September 2003","day":3,"month":8,"year":2003},"checking":true,"checkType":"supervisor","certificateReference":"53 234 296 250","channel":"Paper","imageReference":"2026 05 27 16 12 26N809483496","startDate":{"display":"17 July 2025","day":17,"month":6,"year":2025},"dueDate":{"display":"18 September 2025","day":18,"month":8,"year":2025},"endDate":{"display":"16 July 2026","day":16,"month":6,"year":2026},"childsDOB":{"display":"17 July 2025","day":17,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07053 268 917","emailAddress":"bonnie.stevens@gmail.com"},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"664 851 3257","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"28 June 1995","day":28,"month":5,"year":1995},"checking":false,"certificateReference":"40 392 481 286","channel":"Paper","imageReference":"2026 05 27 16 12 26N646371090","startDate":{"display":"2 October 2025","day":2,"month":9,"year":2025},"endDate":{"display":"1 October 2026","day":1,"month":9,"year":2026},"medicalCondition":["(3) Diabetes mellitus","(4) Myxoedema"],"certificateFulfilment":"post","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07064 371 528","emailAddress":"imogen.simpson@googlemail.com"},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"081 508 4212","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"5 July 1989","day":5,"month":6,"year":1989},"checking":true,"checkType":"supervisor","certificateReference":"75 195 086 040","channel":"Paper","imageReference":"2026 05 27 16 12 26N099495940","startDate":{"display":"15 October 2025","day":15,"month":9,"year":2025},"dueDate":{"display":"6 August 2025","day":6,"month":7,"year":2025},"endDate":{"display":"14 October 2026","day":14,"month":9,"year":2026},"childsDOB":{"display":"15 October 2025","day":15,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07075 482 936","emailAddress":"harriet.butler@blueyonder.co.uk"},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"295 954 1864","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"10 November 2002","day":10,"month":10,"year":2002},"checking":true,"checkType":"supervisor","certificateReference":"14 975 394 542","channel":"Paper","imageReference":"2026 05 27 16 12 26N544268340","startDate":{"display":"10 June 2025","day":10,"month":5,"year":2025},"dueDate":{"display":"15 August 2025","day":15,"month":7,"year":2025},"endDate":{"display":"9 June 2026","day":9,"month":5,"year":2026},"childsDOB":{"display":"10 June 2025","day":10,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07086 593 147","emailAddress":"Chapman417@hotmail.com"},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"835 619 2280","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"23 June 1996","day":23,"month":5,"year":1996},"checking":false,"certificateReference":"44 927 767 574","channel":"Digital","startDate":{"display":"12 November 2025","day":12,"month":10,"year":2025},"endDate":{"display":"11 November 2026","day":11,"month":10,"year":2026},"medicalCondition":["(3) Diabetes mellitus","(6) Diabetes insipidus"],"certificateFulfilment":"email","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07097 614 258","emailAddress":"Ali342@gmail.com"},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"937 541 8549","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"13 August 1995","day":13,"month":7,"year":1995},"checking":true,"checkType":"supervisor","certificateReference":"37 544 511 870","channel":"Paper","imageReference":"2026 05 27 16 12 26N860259338","startDate":{"display":"3 June 2025","day":3,"month":5,"year":2025},"dueDate":{"display":"6 September 2025","day":6,"month":8,"year":2025},"endDate":{"display":"2 June 2026","day":2,"month":5,"year":2026},"childsDOB":{"display":"3 June 2025","day":3,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07018 725 369"},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"264 008 8667","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"7 October 1980","day":7,"month":9,"year":1980},"checking":false,"certificateReference":"HRT 483R ZXX6","channel":"Digital","startDate":{"display":"1 September 2025","day":1,"month":8,"year":2025},"endDate":{"display":"31 August 2026","day":31,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07029 836 471","emailAddress":"Khan423@aol.com"},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"228 647 9506","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"6 April 1975","day":6,"month":3,"year":1975},"checking":false,"certificateReference":"HRT AE06 OO7W","channel":"Pharmacy","startDate":{"display":"12 July 2025","day":12,"month":6,"year":2025},"endDate":{"display":"11 July 2026","day":11,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07030 947 582","emailAddress":"l.begum@hotmail.com"},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"356 703 4614","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"7 October 1971","day":7,"month":9,"year":1971},"checking":false,"certificateReference":"HRT EGMV LL0V","channel":"Digital","startDate":{"display":"13 August 2025","day":13,"month":7,"year":2025},"endDate":{"display":"12 August 2026","day":12,"month":7,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07042 058 693","emailAddress":"n.o’connor@blueyonder.co.uk"},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"061 704 0949","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"processing","dateOfBirth":{"display":"21 November 1989","day":21,"month":10,"year":1989},"checking":false,"certificateReference":"91 442 899 892","channel":"Paper","imageReference":"2026 05 27 16 12 26N452161928","startDate":{"display":"14 November 2025","day":14,"month":10,"year":2025},"endDate":{"display":"13 November 2026","day":13,"month":10,"year":2026},"medicalCondition":["(8) Myasthenia gravis","(10) Cancer"],"certificateFulfilment":"post","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07053 169 784","emailAddress":"kelly.a@blueyonder.co.uk"},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"397 447 5739","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"2 July 1968","day":2,"month":6,"year":1968},"checking":false,"certificateReference":"HRT BHG9 LO8Y","channel":"Digital","startDate":{"display":"19 June 2025","day":19,"month":5,"year":2025},"endDate":{"display":"18 June 2026","day":18,"month":5,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07064 271 895","emailAddress":"McCarthy134@gmail.com"},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"481 431 3948","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"27 October 1966","day":27,"month":9,"year":1966},"checking":false,"certificateReference":"HRT Z8OT 165E","channel":"Digital","startDate":{"display":"1 October 2025","day":1,"month":9,"year":2025},"endDate":{"display":"30 September 2026","day":30,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07075 382 916","emailAddress":"Doyle185@outlook.com"},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"040 896 8632","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"6 August 1987","day":6,"month":7,"year":1987},"checking":false,"certificateReference":"HRT C0UT 34IC","channel":"Digital","startDate":{"display":"15 June 2025","day":15,"month":5,"year":2025},"endDate":{"display":"14 June 2026","day":14,"month":5,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07086 493 127","emailAddress":"griffiths.c@hotmail.com"},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"910 369 1077","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"15 February 1996","day":15,"month":1,"year":1996},"checking":true,"checkType":"quality","certificateReference":"03 037 283 373","channel":"Paper","imageReference":"2026 05 27 16 12 26N117792912","startDate":{"display":"28 August 2025","day":28,"month":7,"year":2025},"endDate":{"display":"27 August 2026","day":27,"month":7,"year":2026},"medicalCondition":["(1) Permanent fistula","(2) Epilepsy"],"certificateFulfilment":"post","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07097 514 238","emailAddress":"m.rees891@blueyonder.co.uk"},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"448 240 9280","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"24 November 1991","day":24,"month":10,"year":1991},"checking":false,"certificateReference":"90 554 964 314","channel":"Paper","imageReference":"2026 05 27 16 12 26N085427389","startDate":{"display":"6 August 2025","day":6,"month":7,"year":2025},"dueDate":{"display":"6 August 2025","day":6,"month":7,"year":2025},"endDate":{"display":"5 August 2026","day":5,"month":7,"year":2026},"childsDOB":{"display":"6 August 2025","day":6,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07018 625 349","emailAddress":"Evans290@aol.com"},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"485 949 3477","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"17 April 1993","day":17,"month":3,"year":1993},"checking":false,"certificateReference":"HRT WBUJ EBHK","channel":"Digital","startDate":{"display":"19 September 2025","day":19,"month":8,"year":2025},"endDate":{"display":"18 September 2026","day":18,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07029 736 458","emailAddress":"MacDonald305@outlook.com"},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"545 594 1513","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"11 February 1970","day":11,"month":1,"year":1970},"checking":false,"certificateReference":"69 080 741 001","channel":"Paper","imageReference":"2026 05 27 16 12 26N274980275","startDate":{"display":"26 October 2025","day":26,"month":9,"year":2025},"endDate":{"display":"25 October 2026","day":25,"month":9,"year":2026},"medicalCondition":["(2) Epilepsy"],"certificateFulfilment":"post","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07030 847 569"},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"149 893 3555","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"5 March 1991","day":5,"month":2,"year":1991},"checking":true,"checkType":"supervisor","certificateReference":"73 626 968 770","channel":"Paper","imageReference":"2026 05 27 16 12 26N126286298","startDate":{"display":"12 July 2025","day":12,"month":6,"year":2025},"dueDate":{"display":"8 August 2025","day":8,"month":7,"year":2025},"endDate":{"display":"11 July 2026","day":11,"month":6,"year":2026},"childsDOB":{"display":"12 July 2025","day":12,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07041 958 672"},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"809 621 3714","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"2 May 1992","day":2,"month":4,"year":1992},"checking":true,"checkType":"supervisor","certificateReference":"31 057 782 782","channel":"Paper","imageReference":"2026 05 27 16 12 26N100492907","startDate":{"display":"23 September 2025","day":23,"month":8,"year":2025},"dueDate":{"display":"7 June 2025","day":7,"month":5,"year":2025},"endDate":{"display":"22 September 2026","day":22,"month":8,"year":2026},"childsDOB":{"display":"23 September 2025","day":23,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07052 069 783","emailAddress":"penelope.hunter@googlemail.com"},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"778 385 1271","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"21 September 1977","day":21,"month":8,"year":1977},"checking":false,"certificateReference":"07 201 382 387","channel":"Paper","imageReference":"2026 05 27 16 12 26N862663038","startDate":{"display":"15 July 2025","day":15,"month":6,"year":2025},"endDate":{"display":"14 July 2026","day":14,"month":6,"year":2026},"medicalCondition":["(1) Permanent fistula","(5) Hypoparathyroidism"],"certificateFulfilment":"post","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07063 171 894"},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"682 166 5842","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"16 May 2005","day":16,"month":4,"year":2005},"checking":true,"checkType":"supervisor","certificateReference":"66 304 171 889","channel":"Paper","imageReference":"2026 05 27 16 12 26N774571585","startDate":{"display":"28 September 2025","day":28,"month":8,"year":2025},"dueDate":{"display":"31 May 2025","day":31,"month":4,"year":2025},"endDate":{"display":"27 September 2026","day":27,"month":8,"year":2026},"childsDOB":{"display":"28 September 2025","day":28,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07074 282 915","emailAddress":"beatrice.spencer@gmail.com"},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"428 114 6225","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"5 March 1995","day":5,"month":2,"year":1995},"checking":false,"certificateReference":"HRT 4HT7 4E7T","channel":"Digital","startDate":{"display":"14 November 2025","day":14,"month":10,"year":2025},"endDate":{"display":"13 November 2026","day":13,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07085 393 126","emailAddress":"n.rogers@blueyonder.co.uk"},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"030 068 0143","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"8 June 1989","day":8,"month":5,"year":1989},"checking":true,"checkType":"supervisor","certificateReference":"13 275 056 321","channel":"Paper","imageReference":"2026 05 27 16 12 26N975475323","startDate":{"display":"28 August 2025","day":28,"month":7,"year":2025},"dueDate":{"display":"24 November 2025","day":24,"month":10,"year":2025},"endDate":{"display":"27 August 2026","day":27,"month":7,"year":2026},"childsDOB":{"display":"28 August 2025","day":28,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07096 414 237","emailAddress":"Watts509@gmail.com"},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"322 661 5641","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"17 November 1993","day":17,"month":10,"year":1993},"checking":false,"certificateReference":"HRT Q23W CX6Z","channel":"Digital","startDate":{"display":"12 August 2025","day":12,"month":7,"year":2025},"endDate":{"display":"11 August 2026","day":11,"month":7,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07017 525 348","emailAddress":"Henderson293@hotmail.com"},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"753 182 7510","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"25 July 1989","day":25,"month":6,"year":1989},"checking":false,"certificateReference":"20 834 779 064","channel":"Paper","imageReference":"2026 05 27 16 12 26N531968443","startDate":{"display":"16 July 2025","day":16,"month":6,"year":2025},"endDate":{"display":"15 July 2026","day":15,"month":6,"year":2026},"medicalCondition":["(3) Diabetes mellitus","(6) Diabetes insipidus"],"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07028 636 459","emailAddress":"rose.palmer@googlemail.com"},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"967 616 2432","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"10 April 2003","day":10,"month":3,"year":2003},"checking":true,"checkType":"supervisor","certificateReference":"65 474 559 710","channel":"Paper","imageReference":"2026 05 27 16 12 26N864384279","startDate":{"display":"1 October 2025","day":1,"month":9,"year":2025},"dueDate":{"display":"2 June 2025","day":2,"month":5,"year":2025},"endDate":{"display":"30 September 2026","day":30,"month":8,"year":2026},"childsDOB":{"display":"1 October 2025","day":1,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07039 747 561"},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"664 410 3755","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"14 April 1990","day":14,"month":3,"year":1990},"checking":false,"certificateReference":"HRT XUFL CX88","channel":"Digital","startDate":{"display":"17 November 2025","day":17,"month":10,"year":2025},"endDate":{"display":"16 November 2026","day":16,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07040 858 673","emailAddress":"julia.gardner529@aol.com"},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"108 102 1453","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"2 January 1988","day":2,"month":0,"year":1988},"checking":false,"certificateReference":"00 834 221 758","channel":"Digital","startDate":{"display":"1 August 2025","day":1,"month":7,"year":2025},"endDate":{"display":"31 July 2026","day":31,"month":6,"year":2026},"medicalCondition":["(6) Diabetes insipidus"],"certificateFulfilment":"email","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07051 969 782","emailAddress":"newton.a@outlook.com"},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"357 440 3167","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"21 July 1999","day":21,"month":6,"year":1999},"checking":false,"certificateReference":"52 068 817 090","channel":"Paper","imageReference":"2026 05 27 16 12 26N962267870","startDate":{"display":"1 July 2025","day":1,"month":6,"year":2025},"dueDate":{"display":"19 June 2025","day":19,"month":5,"year":2025},"endDate":{"display":"30 June 2026","day":30,"month":5,"year":2026},"childsDOB":{"display":"1 July 2025","day":1,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07062 071 893"},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"350 684 8672","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"16 May 1999","day":16,"month":4,"year":1999},"checking":false,"certificateReference":"31 351 965 575","channel":"Paper","imageReference":"2026 05 27 16 12 26N163736146","startDate":{"display":"9 November 2025","day":9,"month":10,"year":2025},"dueDate":{"display":"19 November 2025","day":19,"month":10,"year":2025},"endDate":{"display":"8 November 2026","day":8,"month":10,"year":2026},"childsDOB":{"display":"9 November 2025","day":9,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07073 182 914"},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"128 281 3637","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"15 October 1978","day":15,"month":9,"year":1978},"checking":false,"certificateReference":"HRT CKXV 25KL","channel":"Digital","startDate":{"display":"20 November 2025","day":20,"month":10,"year":2025},"endDate":{"display":"19 November 2026","day":19,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07084 293 125","emailAddress":"maria.fernandez736@googlemail.com"},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"954 646 8728","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"6 February 1989","day":6,"month":1,"year":1989},"checking":true,"checkType":"supervisor","certificateReference":"49 609 837 634","channel":"Paper","imageReference":"2026 05 27 16 12 26N969973111","startDate":{"display":"6 November 2025","day":6,"month":10,"year":2025},"dueDate":{"display":"8 June 2025","day":8,"month":5,"year":2025},"endDate":{"display":"5 November 2026","day":5,"month":10,"year":2026},"childsDOB":{"display":"6 November 2025","day":6,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07095 314 236","emailAddress":"e.silva@gmail.com"},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"881 273 5912","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"19 March 2007","day":19,"month":2,"year":2007},"checking":false,"certificateReference":"74 612 956 860","channel":"Digital","startDate":{"display":"12 June 2025","day":12,"month":5,"year":2025},"dueDate":{"display":"7 September 2025","day":7,"month":8,"year":2025},"endDate":{"display":"11 June 2026","day":11,"month":5,"year":2026},"childsDOB":{"display":"12 June 2025","day":12,"month":5,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07016 425 347","emailAddress":"l.patel922@aol.com"},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"158 483 0457","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"7 July 1969","day":7,"month":6,"year":1969},"checking":false,"certificateReference":"31 096 911 709","channel":"Paper","imageReference":"2026 05 27 16 12 26N454560236","startDate":{"display":"1 November 2025","day":1,"month":10,"year":2025},"endDate":{"display":"31 October 2026","day":31,"month":9,"year":2026},"medicalCondition":["(5) Hypoparathyroidism"],"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07027 536 458","emailAddress":"iqbal.f@blueyonder.co.uk"},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"151 653 6048","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"13 July 1978","day":13,"month":6,"year":1978},"checking":false,"certificateReference":"01 486 985 916","channel":"Paper","imageReference":"2026 05 27 16 12 26N136294520","startDate":{"display":"25 July 2025","day":25,"month":6,"year":2025},"endDate":{"display":"24 July 2026","day":24,"month":6,"year":2026},"medicalCondition":["(2) Epilepsy","(3) Diabetes mellitus","(9) Continuing physical disability"],"certificateFulfilment":"post","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07038 647 569","emailAddress":"j.ahmed@hotmail.com"},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"634 960 8266","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"18 December 1981","day":18,"month":11,"year":1981},"checking":false,"certificateReference":"88 951 902 883","channel":"Digital","startDate":{"display":"5 October 2025","day":5,"month":9,"year":2025},"endDate":{"display":"4 October 2026","day":4,"month":9,"year":2026},"medicalCondition":["(3) Diabetes mellitus","(5) Hypoparathyroidism","(7) Forms of hypoadrenalism"],"certificateFulfilment":"email","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07049 758 671","emailAddress":"nadia.rashid@aol.com"},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"840 449 4739","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"24 November 1993","day":24,"month":10,"year":1993},"checking":false,"certificateReference":"HRT CZVI TRTH","channel":"Digital","startDate":{"display":"18 September 2025","day":18,"month":8,"year":2025},"endDate":{"display":"17 September 2026","day":17,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07050 869 782","emailAddress":"t.paterson111@gmail.com"},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"691 694 7085","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"expired","dateOfBirth":{"display":"13 January 1969","day":13,"month":0,"year":1969},"checking":false,"certificateReference":"83 414 309 166","channel":"Digital","startDate":{"display":"12 June 2025","day":12,"month":5,"year":2025},"endDate":{"display":"11 June 2026","day":11,"month":5,"year":2026},"medicalCondition":["(6) Diabetes insipidus","(8) Myasthenia gravis","(10) Cancer"],"certificateFulfilment":"email","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07061 971 893","emailAddress":"b.foster539@hotmail.com"},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"623 785 7149","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"5 June 1980","day":5,"month":5,"year":1980},"checking":false,"certificateReference":"05 467 001 681","channel":"Paper","imageReference":"2026 05 27 16 12 26N527720984","startDate":{"display":"12 July 2025","day":12,"month":6,"year":2025},"endDate":{"display":"11 July 2026","day":11,"month":6,"year":2026},"medicalCondition":["(5) Hypoparathyroidism"],"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07072 082 914"},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"499 768 8124","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"4 July 1992","day":4,"month":6,"year":1992},"checking":false,"certificateReference":"24 295 068 601","channel":"Paper","imageReference":"2026 05 27 16 12 26N732369163","startDate":{"display":"23 November 2025","day":23,"month":10,"year":2025},"dueDate":{"display":"16 November 2025","day":16,"month":10,"year":2025},"endDate":{"display":"22 November 2026","day":22,"month":10,"year":2026},"childsDOB":{"display":"23 November 2025","day":23,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07083 193 125","emailAddress":"Grant496@hotmail.com"},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"345 780 3670","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"5 March 2006","day":5,"month":2,"year":2006},"checking":true,"checkType":"supervisor","certificateReference":"97 527 888 344","channel":"Paper","imageReference":"2026 05 27 16 12 26N827427762","startDate":{"display":"28 September 2025","day":28,"month":8,"year":2025},"dueDate":{"display":"25 November 2025","day":25,"month":10,"year":2025},"endDate":{"display":"27 September 2026","day":27,"month":8,"year":2026},"childsDOB":{"display":"28 September 2025","day":28,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07094 214 236","emailAddress":"abigail.murray@gmail.com"},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"287 316 1251","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"23 August 1976","day":23,"month":7,"year":1976},"checking":false,"certificateReference":"96 981 106 011","channel":"Digital","startDate":{"display":"17 August 2025","day":17,"month":7,"year":2025},"endDate":{"display":"16 August 2026","day":16,"month":7,"year":2026},"medicalCondition":["(1) Permanent fistula","(3) Diabetes mellitus","(5) Hypoparathyroidism"],"certificateFulfilment":"email","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07015 325 347","emailAddress":"ella-may.west@blueyonder.co.uk"},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"344 947 9015","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"12 October 2008","day":12,"month":9,"year":2008},"checking":false,"certificateReference":"62 958 957 834","channel":"Paper","imageReference":"2026 05 27 16 12 26N698541686","startDate":{"display":"13 June 2025","day":13,"month":5,"year":2025},"dueDate":{"display":"20 August 2025","day":20,"month":7,"year":2025},"endDate":{"display":"12 June 2026","day":12,"month":5,"year":2026},"childsDOB":{"display":"13 June 2025","day":13,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07026 436 458","emailAddress":"r.matthews359@hotmail.com"},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"801 863 3191","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"20 March 2000","day":20,"month":2,"year":2000},"checking":true,"checkType":"supervisor","certificateReference":"01 512 536 544","channel":"Paper","imageReference":"2026 05 27 16 12 26N607016129","startDate":{"display":"18 August 2025","day":18,"month":7,"year":2025},"dueDate":{"display":"29 June 2025","day":29,"month":5,"year":2025},"endDate":{"display":"17 August 2026","day":17,"month":7,"year":2026},"childsDOB":{"display":"18 August 2025","day":18,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07037 547 569","emailAddress":"kayla.holmes@outlook.com"},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"050 368 1488","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"23 March 1988","day":23,"month":2,"year":1988},"checking":false,"certificateReference":"01 687 349 041","channel":"Paper","imageReference":"2026 05 27 16 12 26N225798989","startDate":{"display":"26 July 2025","day":26,"month":6,"year":2025},"endDate":{"display":"25 July 2026","day":25,"month":6,"year":2026},"medicalCondition":["(1) Permanent fistula","(2) Epilepsy"],"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07048 658 671"},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"308 813 1485","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"21 April 2007","day":21,"month":3,"year":2007},"checking":true,"checkType":"supervisor","certificateReference":"30 182 452 940","channel":"Paper","imageReference":"2026 05 27 16 12 26N993765666","startDate":{"display":"25 October 2025","day":25,"month":9,"year":2025},"dueDate":{"display":"5 September 2025","day":5,"month":8,"year":2025},"endDate":{"display":"24 October 2026","day":24,"month":9,"year":2026},"childsDOB":{"display":"25 October 2025","day":25,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07059 769 782","emailAddress":"a.page@hotmail.com"},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"909 851 0786","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"7 November 1989","day":7,"month":10,"year":1989},"checking":false,"certificateReference":"HRT ZRC5 F42V","channel":"Digital","startDate":{"display":"26 June 2025","day":26,"month":5,"year":2025},"endDate":{"display":"25 June 2026","day":25,"month":5,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07060 871 893","emailAddress":"natalie.jordan@blueyonder.co.uk"},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"029 809 4007","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"2 October 1978","day":2,"month":9,"year":1978},"checking":false,"certificateReference":"HRT 4SBK QN53","channel":"Pharmacy","startDate":{"display":"13 August 2025","day":13,"month":7,"year":2025},"endDate":{"display":"12 August 2026","day":12,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07071 982 914","emailAddress":"b.barrett@hotmail.com"},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"018 597 4639","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"7 August 1987","day":7,"month":7,"year":1987},"checking":false,"certificateReference":"HRT 05TG KOLI","channel":"Digital","startDate":{"display":"27 August 2025","day":27,"month":7,"year":2025},"endDate":{"display":"26 August 2026","day":26,"month":7,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07082 093 125","emailAddress":"m.hayes@hotmail.com"},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"730 535 6661","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"6 July 1983","day":6,"month":6,"year":1983},"checking":false,"certificateReference":"12 837 486 906","channel":"Paper","imageReference":"2026 05 27 16 12 26N535380003","startDate":{"display":"3 August 2025","day":3,"month":7,"year":2025},"endDate":{"display":"2 August 2026","day":2,"month":7,"year":2026},"medicalCondition":["(7) Forms of hypoadrenalism","(8) Myasthenia gravis","(10) Cancer"],"certificateFulfilment":"post","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07093 114 236"},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"597 843 0635","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"21 August 1969","day":21,"month":7,"year":1969},"checking":false,"certificateReference":"HRT SFR0 J7ZE","channel":"Digital","startDate":{"display":"11 October 2025","day":11,"month":9,"year":2025},"endDate":{"display":"10 October 2026","day":10,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07014 225 347","emailAddress":"barber.a@aol.com"},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"664 963 6047","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"18 July 1974","day":18,"month":6,"year":1974},"checking":false,"certificateReference":"59 317 788 524","channel":"Paper","imageReference":"2026 05 27 16 12 26N455701977","startDate":{"display":"1 October 2025","day":1,"month":9,"year":2025},"endDate":{"display":"30 September 2026","day":30,"month":8,"year":2026},"medicalCondition":["(5) Hypoparathyroidism","(8) Myasthenia gravis"],"certificateFulfilment":"post","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07025 336 458","emailAddress":"knight.l@gmail.com"},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"648 502 6285","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"3 March 1970","day":3,"month":2,"year":1970},"checking":false,"certificateReference":"HRT OV2Z ZDS5","channel":"Digital","startDate":{"display":"24 September 2025","day":24,"month":8,"year":2025},"endDate":{"display":"23 September 2026","day":23,"month":8,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07036 447 569","emailAddress":"eden.parsons@gmail.com"},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"527 555 1089","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"11 December 1996","day":11,"month":11,"year":1996},"checking":true,"checkType":"supervisor","certificateReference":"66 235 339 552","channel":"Paper","imageReference":"2026 05 27 16 12 26N241609748","startDate":{"display":"1 November 2025","day":1,"month":10,"year":2025},"dueDate":{"display":"13 August 2025","day":13,"month":7,"year":2025},"endDate":{"display":"31 October 2026","day":31,"month":9,"year":2026},"childsDOB":{"display":"1 November 2025","day":1,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07047 558 671"},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"502 633 1140","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"27 November 2003","day":27,"month":10,"year":2003},"checking":false,"certificateReference":"03 834 936 839","channel":"Paper","imageReference":"2026 05 27 16 12 26N126980370","startDate":{"display":"29 September 2025","day":29,"month":8,"year":2025},"dueDate":{"display":"19 September 2025","day":19,"month":8,"year":2025},"endDate":{"display":"28 September 2026","day":28,"month":8,"year":2026},"childsDOB":{"display":"29 September 2025","day":29,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07042 195 783","emailAddress":"holly.day@gmail.com"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"392 186 3126","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"7 October 1999","day":7,"month":9,"year":1999},"checking":true,"checkType":"supervisor","certificateReference":"68 649 529 063","channel":"Paper","imageReference":"2026 05 27 16 12 26N857561188","startDate":{"display":"7 August 2025","day":7,"month":7,"year":2025},"dueDate":{"display":"21 August 2025","day":21,"month":7,"year":2025},"endDate":{"display":"6 August 2026","day":6,"month":7,"year":2026},"childsDOB":{"display":"7 August 2025","day":7,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07049 823 716","emailAddress":"i.francis435@aol.com"},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"596 969 5957","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"4 August 1970","day":4,"month":7,"year":1970},"checking":false,"certificateReference":"HRT CG3K SGDT","channel":"Digital","startDate":{"display":"14 August 2025","day":14,"month":7,"year":2025},"endDate":{"display":"13 August 2026","day":13,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07086 493 127","emailAddress":"h.burton@blueyonder.co.uk"}]';
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
