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
          { text: patient.startDate },
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

          if (!(patient.certificateType === 'matex' && patient.channel === 'Digital')) {
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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"873 881 7800","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"11 June 1999","day":11,"month":5,"year":1999},"checking":true,"checkType":"supervisor","certificateReference":"67 877 157 596","channel":"Paper","imageReference":"2026 05 15 14 11 32N100114359","startDate":"19 July 2025","dueDate":"29 August 2025","endDate":"18 July 2026","childsDOB":{"display":"19 July 2025","day":19,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07031 284 591","emailAddress":"o.smith673@googlemail.com"},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"771 929 1409","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"24 March 1992","day":24,"month":2,"year":1992},"checking":false,"certificateReference":"74 031 407 591","channel":"Paper","imageReference":"2026 05 15 14 11 32N672443906","startDate":"31 August 2025","dueDate":"14 June 2025","endDate":"30 August 2026","childsDOB":{"display":"31 August 2025","day":31,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07049 823 716","emailAddress":"a.jones@gmail.com"},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"711 457 7166","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"23 August 1982","day":23,"month":7,"year":1982},"checking":false,"certificateReference":"HRT 3ONU S63U","channel":"Digital","startDate":"23 June 2025","endDate":"22 June 2026","certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 395 184","emailAddress":"i.taylor@aol.com"},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"907 406 4830","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"23 February 1973","day":23,"month":1,"year":1973},"checking":false,"certificateReference":"HRT GW7Y NP37","channel":"Digital","startDate":"19 September 2025","endDate":"18 September 2026","certificateFulfilment":"email","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07071 528 439","emailAddress":"ava.brown@hotmail.com"},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"952 191 2130","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"3 November 1993","day":3,"month":10,"year":1993},"checking":false,"certificateReference":"HRT 4DAH 4EXJ","channel":"Digital","startDate":"22 September 2025","endDate":"21 September 2026","certificateFulfilment":"post","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07083 916 275","emailAddress":"emily.williams@blueyonder.co.uk"},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"049 195 7329","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"3 February 1991","day":3,"month":1,"year":1991},"checking":false,"certificateReference":"HRT 5TF7 EDZZ","channel":"Digital","startDate":"31 October 2025","endDate":"30 October 2026","certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07092 475 318","emailAddress":"s.wilson@gmail.com"},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"750 955 9564","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"4 February 1998","day":4,"month":1,"year":1998},"checking":true,"checkType":"supervisor","certificateReference":"64 245 967 396","channel":"Paper","imageReference":"2026 05 15 14 11 32N834965567","startDate":"20 May 2025","dueDate":"17 October 2025","endDate":"19 May 2026","childsDOB":{"display":"20 May 2025","day":20,"month":4,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07015 648 293","emailAddress":"Davies211@hotmail.com"},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"721 217 1562","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"23 August 1991","day":23,"month":7,"year":1991},"checking":false,"certificateReference":"HRT D26L CGBN","channel":"Digital","startDate":"17 October 2025","endDate":"16 October 2026","certificateFulfilment":"email","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 751 964","emailAddress":"Evans637@googlemail.com"},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"136 085 8944","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"5 February 2001","day":5,"month":1,"year":2001},"checking":true,"checkType":"supervisor","certificateReference":"71 296 492 196","channel":"Paper","imageReference":"2026 05 15 14 11 32N918457914","startDate":"22 May 2025","dueDate":"24 July 2025","endDate":"21 May 2026","childsDOB":{"display":"22 May 2025","day":22,"month":4,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07036 592 817"},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"471 660 1594","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"25 April 2006","day":25,"month":3,"year":2006},"checking":true,"checkType":"supervisor","certificateReference":"27 341 205 693","channel":"Paper","imageReference":"2026 05 15 14 11 32N907083948","startDate":"2 June 2025","dueDate":"19 May 2025","endDate":"1 June 2026","childsDOB":{"display":"2 June 2025","day":2,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07047 813 256"},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"437 046 8136","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"22 September 1988","day":22,"month":8,"year":1988},"checking":true,"checkType":"supervisor","certificateReference":"99 657 994 186","channel":"Paper","imageReference":"2026 05 15 14 11 32N262485923","startDate":"23 June 2025","dueDate":"29 October 2025","endDate":"22 June 2026","childsDOB":{"display":"23 June 2025","day":23,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07051 294 783","emailAddress":"freya.johnson@googlemail.com"},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"038 036 4255","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"26 September 2007","day":26,"month":8,"year":2007},"checking":true,"checkType":"supervisor","certificateReference":"44 133 642 443","channel":"Paper","imageReference":"2026 05 15 14 11 32N848293193","startDate":"7 September 2025","dueDate":"26 July 2025","endDate":"6 September 2026","childsDOB":{"display":"7 September 2025","day":7,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07063 418 592","emailAddress":"charlotte.lewis@gmail.com"},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"691 044 9260","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"26 August 1998","day":26,"month":7,"year":1998},"checking":true,"checkType":"quality","certificateReference":"36 932 454 615","channel":"Paper","imageReference":"2026 05 15 14 11 32N399261587","startDate":"31 August 2025","dueDate":"14 August 2025","endDate":"30 August 2026","childsDOB":{"display":"31 August 2025","day":31,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07075 928 341","emailAddress":"isabella.walker@outlook.com"},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"158 613 7967","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"17 March 1966","day":17,"month":2,"year":1966},"checking":false,"certificateReference":"HRT LP6B EZKF","channel":"Digital","startDate":"10 October 2025","endDate":"9 October 2026","certificateFulfilment":"post","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07084 372 659","emailAddress":"daisy.hall@blueyonder.co.uk"},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"814 376 6785","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"9 October 1989","day":9,"month":9,"year":1989},"checking":false,"certificateReference":"HRT 7JNL C10S","channel":"Digital","startDate":"6 August 2025","endDate":"5 August 2026","certificateFulfilment":"email","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07091 837 426","emailAddress":"evie.clarke209@googlemail.com"},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"813 904 9065","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"4 October 1991","day":4,"month":9,"year":1991},"checking":false,"certificateReference":"HRT THMB GVJT","channel":"Digital","startDate":"16 July 2025","endDate":"15 July 2026","certificateFulfilment":"email","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 385 927","emailAddress":"p.allen@gmail.com"},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"734 382 1111","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"2 May 1989","day":2,"month":4,"year":1989},"checking":true,"checkType":"supervisor","certificateReference":"57 090 306 656","channel":"Paper","imageReference":"2026 05 15 14 11 32N016711812","startDate":"20 October 2025","dueDate":"3 June 2025","endDate":"19 October 2026","childsDOB":{"display":"20 October 2025","day":20,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07027 639 485","emailAddress":"Young512@googlemail.com"},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"891 049 0887","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"25 March 1994","day":25,"month":2,"year":1994},"checking":false,"certificateReference":"27 040 926 955","channel":"Digital","startDate":"12 August 2025","dueDate":"6 August 2025","endDate":"11 August 2026","childsDOB":{"display":"12 August 2025","day":12,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07035 821 749","emailAddress":"h.king809@hotmail.com"},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"841 990 9994","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"12 July 1997","day":12,"month":6,"year":1997},"checking":false,"certificateReference":"15 972 506 523","channel":"Paper","imageReference":"2026 05 15 14 11 32N260838650","startDate":"27 June 2025","dueDate":"4 July 2025","endDate":"26 June 2026","childsDOB":{"display":"27 June 2025","day":27,"month":5,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07048 952 613","emailAddress":"Wright675@googlemail.com"},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"777 323 4908","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"11 June 1989","day":11,"month":5,"year":1989},"checking":false,"certificateReference":"44 606 904 108","channel":"Digital","startDate":"18 July 2025","dueDate":"9 September 2025","endDate":"17 July 2026","childsDOB":{"display":"18 July 2025","day":18,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07052 719 384","emailAddress":"ella-rose.green@outlook.com"},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"782 412 5328","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"25 November 2004","day":25,"month":10,"year":2004},"checking":false,"certificateReference":"87 041 649 793","channel":"Paper","imageReference":"2026 05 15 14 11 32N995050192","startDate":"9 October 2025","dueDate":"6 August 2025","endDate":"8 October 2026","childsDOB":{"display":"9 October 2025","day":9,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07064 837 295","emailAddress":"p.baker@hotmail.com"},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"235 032 3846","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"21 April 1976","day":21,"month":3,"year":1976},"checking":false,"certificateReference":"HRT 43Q7 OD7B","channel":"Digital","startDate":"15 May 2025","endDate":"14 May 2026","certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07073 491 826","emailAddress":"adams.r@outlook.com"},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"796 701 8491","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"26 August 1988","day":26,"month":7,"year":1988},"checking":false,"certificateReference":"98 539 223 397","channel":"Paper","imageReference":"2026 05 15 14 11 32N434412325","startDate":"9 July 2025","dueDate":"5 July 2025","endDate":"8 July 2026","childsDOB":{"display":"9 July 2025","day":9,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07085 623 941","emailAddress":"c.mitchell565@googlemail.com"},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"545 266 4484","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"expired","dateOfBirth":{"display":"6 May 2004","day":6,"month":4,"year":2004},"checking":false,"certificateReference":"10 246 540 713","channel":"Digital","startDate":"25 October 2025","dueDate":"16 June 2025","endDate":"24 October 2026","childsDOB":{"display":"25 October 2025","day":25,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07096 718 235","emailAddress":"s.turner@gmail.com"},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"866 701 4721","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"9 December 2004","day":9,"month":11,"year":2004},"checking":true,"checkType":"quality","certificateReference":"99 044 334 153","channel":"Paper","imageReference":"2026 05 15 14 11 32N993485728","startDate":"9 September 2025","dueDate":"8 July 2025","endDate":"8 September 2026","childsDOB":{"display":"9 September 2025","day":9,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07018 273 945"},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"788 931 7844","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"10 January 2006","day":10,"month":0,"year":2006},"checking":true,"checkType":"quality","certificateReference":"76 025 852 345","channel":"Paper","imageReference":"2026 05 15 14 11 32N698218893","startDate":"15 September 2025","dueDate":"16 May 2025","endDate":"14 September 2026","childsDOB":{"display":"15 September 2025","day":15,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07029 384 756"},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"253 727 1585","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"7 March 1993","day":7,"month":2,"year":1993},"checking":false,"certificateReference":"HRT O4WI HJBO","channel":"Digital","startDate":"2 July 2025","endDate":"1 July 2026","certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07031 572 948","emailAddress":"m.hughes@blueyonder.co.uk"},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"694 194 0188","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"21 August 1994","day":21,"month":7,"year":1994},"checking":false,"certificateReference":"25 602 211 951","channel":"Digital","startDate":"4 October 2025","dueDate":"24 October 2025","endDate":"3 October 2026","childsDOB":{"display":"4 October 2025","day":4,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07042 619 583","emailAddress":"e.ward121@blueyonder.co.uk"},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"337 448 8830","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"6 July 1990","day":6,"month":6,"year":1990},"checking":false,"certificateReference":"HRT 3G1W KXVH","channel":"Digital","startDate":"22 September 2025","endDate":"21 September 2026","certificateFulfilment":"post","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07053 847 261","emailAddress":"rosie.price@hotmail.com"},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"495 766 3955","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"12 August 1973","day":12,"month":7,"year":1973},"checking":false,"certificateReference":"HRT N22X XUNY","channel":"Digital","startDate":"28 May 2025","endDate":"27 May 2026","certificateFulfilment":"email","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07064 928 137","emailAddress":"aria.cooper@hotmail.com"},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"841 951 9750","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"10 November 1999","day":10,"month":10,"year":1999},"checking":true,"checkType":"supervisor","certificateReference":"89 583 116 045","channel":"Paper","imageReference":"2026 05 15 14 11 32N495407534","startDate":"3 October 2025","dueDate":"17 August 2025","endDate":"2 October 2026","childsDOB":{"display":"3 October 2025","day":3,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07075 283 916","emailAddress":"layla.bailey@hotmail.com"},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"702 636 6957","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"4 July 2004","day":4,"month":6,"year":2004},"checking":false,"certificateReference":"04 598 359 309","channel":"Digital","startDate":"24 June 2025","dueDate":"18 July 2025","endDate":"23 June 2026","childsDOB":{"display":"24 June 2025","day":24,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07086 419 375","emailAddress":"luna.parker786@aol.com"},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"211 621 1989","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"20 January 1982","day":20,"month":0,"year":1982},"checking":false,"certificateReference":"HRT ODK2 FOV1","channel":"Digital","startDate":"2 August 2025","endDate":"1 August 2026","certificateFulfilment":"email","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07097 531 284","emailAddress":"Phillips677@gmail.com"},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"372 132 1525","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"8 November 1985","day":8,"month":10,"year":1985},"checking":false,"certificateReference":"HRT 4EJB CSE1","channel":"Digital","startDate":"11 June 2025","endDate":"10 June 2026","certificateFulfilment":"post","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07018 642 597","emailAddress":"z.bennett@outlook.com"},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"328 224 9631","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"10 September 1993","day":10,"month":8,"year":1993},"checking":false,"certificateReference":"04 236 872 809","channel":"Paper","imageReference":"2026 05 15 14 11 32N864301319","startDate":"8 October 2025","dueDate":"26 June 2025","endDate":"7 October 2026","childsDOB":{"display":"8 October 2025","day":8,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07029 753 861","emailAddress":"cox.f@googlemail.com"},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"819 290 6200","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"20 November 1969","day":20,"month":10,"year":1969},"checking":false,"certificateReference":"HRT TQKE QY5T","channel":"Digital","startDate":"16 May 2025","endDate":"15 May 2026","certificateFulfilment":"email","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07031 864 729","emailAddress":"Richardson829@googlemail.com"},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"655 453 3021","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"18 January 1985","day":18,"month":0,"year":1985},"checking":false,"certificateReference":"HRT C5SH HRPH","channel":"Digital","startDate":"11 July 2025","endDate":"10 July 2026","certificateFulfilment":"post","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07042 987 513","emailAddress":"esme.gray@outlook.com"},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"632 525 5688","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"21 August 1991","day":21,"month":7,"year":1991},"checking":true,"checkType":"supervisor","certificateReference":"07 412 664 170","channel":"Paper","imageReference":"2026 05 15 14 11 32N206751476","startDate":"4 July 2025","dueDate":"25 August 2025","endDate":"3 July 2026","childsDOB":{"display":"4 July 2025","day":4,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07054 129 876","emailAddress":"Ross386@blueyonder.co.uk"},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"301 631 2652","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"17 May 1968","day":17,"month":4,"year":1968},"checking":false,"certificateReference":"HRT KYIJ HBR4","channel":"Digital","startDate":"25 June 2025","endDate":"24 June 2026","certificateFulfilment":"post","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07065 238 741","emailAddress":"arabella.bell666@gmail.com"},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"878 800 7398","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"18 November 2004","day":18,"month":10,"year":2004},"checking":false,"certificateReference":"68 566 220 083","channel":"Paper","imageReference":"2026 05 15 14 11 32N745921045","startDate":"26 August 2025","dueDate":"22 July 2025","endDate":"25 August 2026","childsDOB":{"display":"26 August 2025","day":26,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07076 391 825","emailAddress":"e.cook@aol.com"},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"103 216 4868","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"18 September 1996","day":18,"month":8,"year":1996},"checking":true,"checkType":"supervisor","certificateReference":"61 694 937 881","channel":"Paper","imageReference":"2026 05 15 14 11 32N230811579","startDate":"30 August 2025","dueDate":"24 August 2025","endDate":"29 August 2026","childsDOB":{"display":"30 August 2025","day":30,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07087 512 936","emailAddress":"Watson648@googlemail.com"},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"342 272 0603","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"24 May 2001","day":24,"month":4,"year":2001},"checking":false,"certificateReference":"15 444 678 656","channel":"Digital","startDate":"14 November 2025","dueDate":"19 August 2025","endDate":"13 November 2026","childsDOB":{"display":"14 November 2025","day":14,"month":10,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07098 631 427","emailAddress":"Sanders799@blueyonder.co.uk"},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"450 217 9552","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"19 February 1984","day":19,"month":1,"year":1984},"checking":false,"certificateReference":"HRT D1O5 VB2W","channel":"Digital","startDate":"22 July 2025","endDate":"21 July 2026","certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07019 742 835","emailAddress":"e.harrison@blueyonder.co.uk"},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"283 426 0718","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"13 September 1997","day":13,"month":8,"year":1997},"checking":true,"checkType":"supervisor","certificateReference":"34 946 957 376","channel":"Paper","imageReference":"2026 05 15 14 11 32N191018750","startDate":"12 September 2025","dueDate":"5 October 2025","endDate":"11 September 2026","childsDOB":{"display":"12 September 2025","day":12,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07020 853 749","emailAddress":"lottie.coleman@hotmail.com"},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"135 312 6261","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"6 February 1988","day":6,"month":1,"year":1988},"checking":false,"certificateReference":"HRT O2AM Q4NV","channel":"Digital","startDate":"18 July 2025","endDate":"17 July 2026","certificateFulfilment":"email","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07031 984 625","emailAddress":"murphy.a@googlemail.com"},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"027 011 8864","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"16 December 1989","day":16,"month":11,"year":1989},"checking":false,"certificateReference":"17 240 613 177","channel":"Paper","imageReference":"2026 05 15 14 11 32N649767594","startDate":"3 August 2025","dueDate":"2 June 2025","endDate":"2 August 2026","childsDOB":{"display":"3 August 2025","day":3,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07042 195 783","emailAddress":"scarlett.graham419@aol.com"},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"021 097 9206","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"12 April 1968","day":12,"month":3,"year":1968},"checking":false,"certificateReference":"HRT EH7X IQH5","channel":"Digital","startDate":"22 October 2025","endDate":"21 October 2026","certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07053 268 917","emailAddress":"bonnie.stevens@hotmail.com"},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"316 480 2497","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"processing","dateOfBirth":{"display":"20 April 2005","day":20,"month":3,"year":2005},"checking":false,"certificateReference":"22 346 135 769","channel":"Paper","imageReference":"2026 05 15 14 11 32N315993149","startDate":"2 September 2025","dueDate":"4 July 2025","endDate":"1 September 2026","childsDOB":{"display":"2 September 2025","day":2,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07064 371 528"},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"294 216 8814","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"7 March 1994","day":7,"month":2,"year":1994},"checking":false,"certificateReference":"HRT VGK8 8DTJ","channel":"Digital","startDate":"18 September 2025","endDate":"17 September 2026","certificateFulfilment":"post","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07075 482 936","emailAddress":"h.butler@gmail.com"},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"141 937 4319","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"24 July 2007","day":24,"month":6,"year":2007},"checking":true,"checkType":"supervisor","certificateReference":"46 932 972 434","channel":"Paper","imageReference":"2026 05 15 14 11 32N167891982","startDate":"29 July 2025","dueDate":"4 November 2025","endDate":"28 July 2026","childsDOB":{"display":"29 July 2025","day":29,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07086 593 147"},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"154 166 1814","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"6 July 1977","day":6,"month":6,"year":1977},"checking":false,"certificateReference":"HRT 83WK 3ESN","channel":"Pharmacy","startDate":"26 June 2025","endDate":"25 June 2026","certificateFulfilment":"post","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07097 614 258","emailAddress":"ali.a@gmail.com"},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"194 155 8999","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"11 January 1990","day":11,"month":0,"year":1990},"checking":false,"certificateReference":"12 692 581 714","channel":"Paper","imageReference":"2026 05 15 14 11 32N187452965","startDate":"11 July 2025","dueDate":"15 July 2025","endDate":"10 July 2026","childsDOB":{"display":"11 July 2025","day":11,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07018 725 369","emailAddress":"Hussain559@gmail.com"},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"287 011 9157","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"expired","dateOfBirth":{"display":"1 June 1993","day":1,"month":5,"year":1993},"checking":false,"certificateReference":"86 223 309 543","channel":"Paper","imageReference":"2026 05 15 14 11 32N734775765","startDate":"24 July 2025","dueDate":"22 September 2025","endDate":"23 July 2026","childsDOB":{"display":"24 July 2025","day":24,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07029 836 471"},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"751 657 5901","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"2 July 2002","day":2,"month":6,"year":2002},"checking":false,"certificateReference":"57 541 356 350","channel":"Paper","imageReference":"2026 05 15 14 11 32N028425394","startDate":"23 July 2025","dueDate":"1 September 2025","endDate":"22 July 2026","childsDOB":{"display":"23 July 2025","day":23,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07030 947 582"},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"598 492 6418","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","dateOfBirth":{"display":"4 June 1992","day":4,"month":5,"year":1992},"checking":false,"certificateReference":"36 178 720 295","channel":"Paper","imageReference":"2026 05 15 14 11 32N736131534","startDate":"3 June 2025","dueDate":"18 May 2025","endDate":"2 June 2026","childsDOB":{"display":"3 June 2025","day":3,"month":5,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07042 058 693"},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"703 215 5831","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"6 October 1999","day":6,"month":9,"year":1999},"checking":false,"certificateReference":"10 224 461 369","channel":"Paper","imageReference":"2026 05 15 14 11 32N673358726","startDate":"21 May 2025","dueDate":"13 October 2025","endDate":"20 May 2026","childsDOB":{"display":"21 May 2025","day":21,"month":4,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07053 169 784","emailAddress":"a.kelly@outlook.com"},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"475 340 2409","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"23 July 1971","day":23,"month":6,"year":1971},"checking":false,"certificateReference":"HRT YRQW 0SSO","channel":"Digital","startDate":"3 June 2025","endDate":"2 June 2026","certificateFulfilment":"post","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07064 271 895","emailAddress":"McCarthy677@googlemail.com"},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"171 742 9676","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"2 January 1973","day":2,"month":0,"year":1973},"checking":false,"certificateReference":"HRT 6O47 LBGJ","channel":"Pharmacy","startDate":"21 August 2025","endDate":"20 August 2026","certificateFulfilment":"email","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07075 382 916","emailAddress":"o.doyle@outlook.com"},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"593 495 4998","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"28 September 1974","day":28,"month":8,"year":1974},"checking":false,"certificateReference":"HRT 865M WVCT","channel":"Digital","startDate":"12 November 2025","endDate":"11 November 2026","certificateFulfilment":"email","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07086 493 127","emailAddress":"c.griffiths@googlemail.com"},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"086 613 1945","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"20 March 1981","day":20,"month":2,"year":1981},"checking":false,"certificateReference":"HRT 6GTT 7WM7","channel":"Digital","startDate":"5 September 2025","endDate":"4 September 2026","certificateFulfilment":"email","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07097 514 238","emailAddress":"megan.rees@hotmail.com"},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"750 788 7400","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"16 November 1995","day":16,"month":10,"year":1995},"checking":false,"certificateReference":"40 783 045 128","channel":"Digital","startDate":"13 September 2025","dueDate":"25 July 2025","endDate":"12 September 2026","childsDOB":{"display":"13 September 2025","day":13,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07018 625 349","emailAddress":"f.evans@aol.com"},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"639 260 1520","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"27 May 2004","day":27,"month":4,"year":2004},"checking":true,"checkType":"supervisor","certificateReference":"85 365 164 442","channel":"Paper","imageReference":"2026 05 15 14 11 32N384533453","startDate":"30 September 2025","dueDate":"2 July 2025","endDate":"29 September 2026","childsDOB":{"display":"30 September 2025","day":30,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07029 736 458","emailAddress":"e.macdonald@googlemail.com"},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"265 236 1211","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"26 May 2003","day":26,"month":4,"year":2003},"checking":false,"certificateReference":"46 114 465 126","channel":"Paper","imageReference":"2026 05 15 14 11 32N121882730","startDate":"10 June 2025","dueDate":"22 June 2025","endDate":"9 June 2026","childsDOB":{"display":"10 June 2025","day":10,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07030 847 569","emailAddress":"s.fraser@outlook.com"},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"041 562 3022","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"4 April 1973","day":4,"month":3,"year":1973},"checking":false,"certificateReference":"HRT T90A Q1MQ","channel":"Digital","startDate":"22 September 2025","endDate":"21 September 2026","certificateFulfilment":"post","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07041 958 672","emailAddress":"Armstrong177@hotmail.com"},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"315 903 5658","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"4 April 1993","day":4,"month":3,"year":1993},"checking":false,"certificateReference":"HRT PN91 EKB7","channel":"Digital","startDate":"7 July 2025","endDate":"6 July 2026","certificateFulfilment":"email","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07052 069 783","emailAddress":"p.hunter@blueyonder.co.uk"},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"084 321 0724","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"8 September 1996","day":8,"month":8,"year":1996},"checking":true,"checkType":"supervisor","certificateReference":"31 948 639 712","channel":"Paper","imageReference":"2026 05 15 14 11 32N005992131","startDate":"12 October 2025","dueDate":"9 August 2025","endDate":"11 October 2026","childsDOB":{"display":"12 October 2025","day":12,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07063 171 894","emailAddress":"Lawrence142@gmail.com"},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"232 822 2342","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"expired","dateOfBirth":{"display":"24 November 1989","day":24,"month":10,"year":1989},"checking":false,"certificateReference":"36 808 357 152","channel":"Paper","imageReference":"2026 05 15 14 11 32N721239546","startDate":"27 October 2025","dueDate":"23 July 2025","endDate":"26 October 2026","childsDOB":{"display":"27 October 2025","day":27,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07074 282 915","emailAddress":"b.spencer@hotmail.com"},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"031 214 6854","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"expired","dateOfBirth":{"display":"10 July 2005","day":10,"month":6,"year":2005},"checking":false,"certificateReference":"17 398 769 842","channel":"Paper","imageReference":"2026 05 15 14 11 32N540570152","startDate":"26 June 2025","dueDate":"22 September 2025","endDate":"25 June 2026","childsDOB":{"display":"26 June 2025","day":26,"month":5,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07085 393 126","emailAddress":"rogers.n@hotmail.com"},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"619 631 4117","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"19 July 1994","day":19,"month":6,"year":1994},"checking":true,"checkType":"supervisor","certificateReference":"78 739 922 704","channel":"Paper","imageReference":"2026 05 15 14 11 32N020342907","startDate":"11 August 2025","dueDate":"22 July 2025","endDate":"10 August 2026","childsDOB":{"display":"11 August 2025","day":11,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07096 414 237"},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"806 573 5566","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"5 November 1977","day":5,"month":10,"year":1977},"checking":false,"certificateReference":"HRT 7DMZ YZ55","channel":"Digital","startDate":"30 September 2025","endDate":"29 September 2026","certificateFulfilment":"post","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07017 525 348","emailAddress":"h.henderson@gmail.com"},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"605 157 2102","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"6 July 1981","day":6,"month":6,"year":1981},"checking":false,"certificateReference":"HRT 838T EI1W","channel":"Digital","startDate":"24 May 2025","endDate":"23 May 2026","certificateFulfilment":"email","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 636 459","emailAddress":"r.palmer@hotmail.com"},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"015 759 7352","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"3 February 1993","day":3,"month":1,"year":1993},"checking":true,"checkType":"supervisor","certificateReference":"07 817 353 748","channel":"Paper","imageReference":"2026 05 15 14 11 32N432418223","startDate":"8 September 2025","dueDate":"18 September 2025","endDate":"7 September 2026","childsDOB":{"display":"8 September 2025","day":8,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07039 747 561","emailAddress":"nicholson.l@hotmail.com"},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"260 898 6684","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"16 March 1989","day":16,"month":2,"year":1989},"checking":false,"certificateReference":"HRT UWBK V8NV","channel":"Digital","startDate":"15 September 2025","endDate":"14 September 2026","certificateFulfilment":"email","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07040 858 673","emailAddress":"julia.gardner@googlemail.com"},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"311 667 6584","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"26 August 1981","day":26,"month":7,"year":1981},"checking":false,"certificateReference":"HRT NHPB IPQQ","channel":"Digital","startDate":"21 September 2025","endDate":"20 September 2026","certificateFulfilment":"email","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07051 969 782","emailAddress":"ada.newton@outlook.com"},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"770 708 9829","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"18 April 1976","day":18,"month":3,"year":1976},"checking":false,"certificateReference":"HRT KX97 0Y2T","channel":"Digital","startDate":"29 August 2025","endDate":"28 August 2026","certificateFulfilment":"email","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 071 893","emailAddress":"s.reed@googlemail.com"},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"001 396 9012","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"6 December 1995","day":6,"month":11,"year":1995},"checking":false,"certificateReference":"82 343 122 019","channel":"Paper","imageReference":"2026 05 15 14 11 32N599359078","startDate":"15 July 2025","dueDate":"26 September 2025","endDate":"14 July 2026","childsDOB":{"display":"15 July 2025","day":15,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07073 182 914","emailAddress":"v.harvey303@gmail.com"},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"748 272 2920","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"6 July 1994","day":6,"month":6,"year":1994},"checking":false,"certificateReference":"HRT 8JCJ CCPW","channel":"Digital","startDate":"3 August 2025","endDate":"2 August 2026","certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07084 293 125","emailAddress":"fernandez.m@hotmail.com"},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"810 577 2367","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"11 June 2008","day":11,"month":5,"year":2008},"checking":true,"checkType":"supervisor","certificateReference":"61 288 752 995","channel":"Paper","imageReference":"2026 05 15 14 11 32N885784547","startDate":"19 May 2025","dueDate":"30 July 2025","endDate":"18 May 2026","childsDOB":{"display":"19 May 2025","day":19,"month":4,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07095 314 236"},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"614 775 9442","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"15 April 1997","day":15,"month":3,"year":1997},"checking":true,"checkType":"supervisor","certificateReference":"93 815 530 928","channel":"Paper","imageReference":"2026 05 15 14 11 32N704768678","startDate":"19 October 2025","dueDate":"5 October 2025","endDate":"18 October 2026","childsDOB":{"display":"19 October 2025","day":19,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07016 425 347"},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"558 159 6769","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"20 July 1974","day":20,"month":6,"year":1974},"checking":false,"certificateReference":"HRT 9CU9 8RM4","channel":"Digital","startDate":"25 June 2025","endDate":"24 June 2026","certificateFulfilment":"email","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07027 536 458","emailAddress":"fatima.iqbal@aol.com"},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"525 704 9360","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"8 January 1988","day":8,"month":0,"year":1988},"checking":true,"checkType":"quality","certificateReference":"65 443 104 961","channel":"Paper","imageReference":"2026 05 15 14 11 32N228328666","startDate":"8 August 2025","dueDate":"10 October 2025","endDate":"7 August 2026","childsDOB":{"display":"8 August 2025","day":8,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07038 647 569","emailAddress":"j.ahmed@blueyonder.co.uk"},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"744 139 7360","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"7 April 1992","day":7,"month":3,"year":1992},"checking":false,"certificateReference":"HRT 6LXV 8OS0","channel":"Digital","startDate":"30 May 2025","endDate":"29 May 2026","certificateFulfilment":"email","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07049 758 671","emailAddress":"Rashid335@blueyonder.co.uk"},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"429 172 2017","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"15 November 1979","day":15,"month":10,"year":1979},"checking":false,"certificateReference":"HRT 3CAB DNAM","channel":"Digital","startDate":"1 July 2025","endDate":"30 June 2026","certificateFulfilment":"email","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07050 869 782","emailAddress":"tara.paterson@gmail.com"},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"906 508 9080","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"expired","dateOfBirth":{"display":"6 October 1991","day":6,"month":9,"year":1991},"checking":false,"certificateReference":"34 009 032 947","channel":"Paper","imageReference":"2026 05 15 14 11 32N723872809","startDate":"5 July 2025","dueDate":"19 October 2025","endDate":"4 July 2026","childsDOB":{"display":"5 July 2025","day":5,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07061 971 893"},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"839 408 6125","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"9 February 1999","day":9,"month":1,"year":1999},"checking":true,"checkType":"supervisor","certificateReference":"67 338 735 439","channel":"Paper","imageReference":"2026 05 15 14 11 32N471135269","startDate":"12 September 2025","dueDate":"27 July 2025","endDate":"11 September 2026","childsDOB":{"display":"12 September 2025","day":12,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07072 082 914","emailAddress":"fox.l@outlook.com"},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"514 105 6583","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"14 January 1984","day":14,"month":0,"year":1984},"checking":false,"certificateReference":"HRT SQOG 1KDZ","channel":"Digital","startDate":"20 June 2025","endDate":"19 June 2026","certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07083 193 125","emailAddress":"georgia.grant@outlook.com"},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"283 144 4889","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"22 December 1996","day":22,"month":11,"year":1996},"checking":false,"certificateReference":"HRT 5FHE U8FG","channel":"Digital","startDate":"13 September 2025","endDate":"12 September 2026","certificateFulfilment":"email","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07094 214 236","emailAddress":"Murray338@hotmail.com"},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"095 477 9915","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"13 July 1990","day":13,"month":6,"year":1990},"checking":false,"certificateReference":"HRT Q2Q8 5RUF","channel":"Pharmacy","startDate":"13 November 2025","endDate":"12 November 2026","certificateFulfilment":"post","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07015 325 347","emailAddress":"west.e@googlemail.com"},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"412 739 1592","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"25 May 1992","day":25,"month":4,"year":1992},"checking":false,"certificateReference":"HRT HHGY DGHR","channel":"Digital","startDate":"25 October 2025","endDate":"24 October 2026","certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07026 436 458","emailAddress":"Matthews131@gmail.com"},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"795 263 7803","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"7 November 1971","day":7,"month":10,"year":1971},"checking":false,"certificateReference":"HRT Z6PN P3GR","channel":"Digital","startDate":"12 October 2025","endDate":"11 October 2026","certificateFulfilment":"post","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07037 547 569","emailAddress":"holmes.k@gmail.com"},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"357 702 5366","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"4 January 2007","day":4,"month":0,"year":2007},"checking":true,"checkType":"supervisor","certificateReference":"10 993 652 347","channel":"Paper","imageReference":"2026 05 15 14 11 32N653448138","startDate":"31 October 2025","dueDate":"1 October 2025","endDate":"30 October 2026","childsDOB":{"display":"31 October 2025","day":31,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07048 658 671","emailAddress":"lydia.walsh@googlemail.com"},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"222 775 2133","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"17 February 2002","day":17,"month":1,"year":2002},"checking":false,"certificateReference":"54 442 957 751","channel":"Paper","imageReference":"2026 05 15 14 11 32N270118852","startDate":"12 November 2025","dueDate":"25 May 2025","endDate":"11 November 2026","childsDOB":{"display":"12 November 2025","day":12,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07059 769 782"},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"771 873 3704","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"7 April 1996","day":7,"month":3,"year":1996},"checking":false,"certificateReference":"05 673 414 351","channel":"Paper","imageReference":"2026 05 15 14 11 32N496514173","startDate":"8 September 2025","dueDate":"22 October 2025","endDate":"7 September 2026","childsDOB":{"display":"8 September 2025","day":8,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07060 871 893","emailAddress":"n.jordan109@googlemail.com"},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"011 556 0362","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"23 August 2005","day":23,"month":7,"year":2005},"checking":false,"certificateReference":"46 566 089 862","channel":"Paper","imageReference":"2026 05 15 14 11 32N213113011","startDate":"5 September 2025","dueDate":"28 October 2025","endDate":"4 September 2026","childsDOB":{"display":"5 September 2025","day":5,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07071 982 914","emailAddress":"beth.barrett@googlemail.com"},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"497 354 8872","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"26 September 1969","day":26,"month":8,"year":1969},"checking":false,"certificateReference":"HRT 7GCV 42W6","channel":"Digital","startDate":"12 August 2025","endDate":"11 August 2026","certificateFulfilment":"email","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07082 093 125","emailAddress":"hayes.m@googlemail.com"},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"848 338 8476","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"12 December 2006","day":12,"month":11,"year":2006},"checking":false,"certificateReference":"07 473 906 144","channel":"Paper","imageReference":"2026 05 15 14 11 32N040797771","startDate":"18 July 2025","dueDate":"21 August 2025","endDate":"17 July 2026","childsDOB":{"display":"18 July 2025","day":18,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07093 114 236","emailAddress":"francesca.cunningham@outlook.com"},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"178 722 5589","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"26 July 1967","day":26,"month":6,"year":1967},"checking":false,"certificateReference":"HRT CRZY 6N2A","channel":"Digital","startDate":"29 August 2025","endDate":"28 August 2026","certificateFulfilment":"email","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07014 225 347","emailAddress":"Barber227@hotmail.com"},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"531 076 3996","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"5 March 2000","day":5,"month":2,"year":2000},"checking":true,"checkType":"supervisor","certificateReference":"63 007 821 289","channel":"Paper","imageReference":"2026 05 15 14 11 32N844742085","startDate":"8 July 2025","dueDate":"15 October 2025","endDate":"7 July 2026","childsDOB":{"display":"8 July 2025","day":8,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07025 336 458","emailAddress":"Knight111@blueyonder.co.uk"},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"171 928 4943","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"19 November 1972","day":19,"month":10,"year":1972},"checking":false,"certificateReference":"HRT ZS3K ONCI","channel":"Digital","startDate":"24 October 2025","endDate":"23 October 2026","certificateFulfilment":"email","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07036 447 569","emailAddress":"Parsons174@gmail.com"},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"827 459 9705","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"7 July 1980","day":7,"month":6,"year":1980},"checking":false,"certificateReference":"HRT 5VRQ GWKM","channel":"Pharmacy","startDate":"7 October 2025","endDate":"6 October 2026","certificateFulfilment":"email","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07047 558 671","emailAddress":"t.bates@blueyonder.co.uk"},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"693 058 6076","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"3 December 1994","day":3,"month":11,"year":1994},"checking":false,"certificateReference":"HRT ZILB 9G55","channel":"Digital","startDate":"27 September 2025","endDate":"26 September 2026","certificateFulfilment":"post","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07042 195 783","emailAddress":"h.day@hotmail.com"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"280 030 9557","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"12 September 1995","day":12,"month":8,"year":1995},"checking":false,"certificateReference":"65 391 576 027","channel":"Digital","startDate":"13 October 2025","dueDate":"30 September 2025","endDate":"12 October 2026","childsDOB":{"display":"13 October 2025","day":13,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07051 294 783","emailAddress":"indie.francis@googlemail.com"},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"647 006 6271","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"16 September 1998","day":16,"month":8,"year":1998},"checking":false,"certificateReference":"06 887 435 225","channel":"Paper","imageReference":"2026 05 15 14 11 32N709575457","startDate":"3 June 2025","dueDate":"23 May 2025","endDate":"2 June 2026","childsDOB":{"display":"3 June 2025","day":3,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07042 058 693"}]';
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
