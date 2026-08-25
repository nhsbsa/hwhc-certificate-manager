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
  filters.capitalise = function (term) {
    if (term) {
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
  // GET REFERENCE HTML FUNCTION
  //
  function _getReferenceHtml(reference) {
    const hasReference = reference && String(reference).trim();

    if (!hasReference) {
      return '<span class="nhsuk-hint">Not available</span>';
    }

    return reference;
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

          } else if (key === 'dateOfBirth') {

            const dayCheck = (searchTerms[key].day === row[key].day) ? true : false;
            const monthCheck = (searchTerms[key].month === row[key].month) ? true : false;
            const yearCheck = (searchTerms[key].year === row[key].year) ? true : false;

            if (dayCheck && monthCheck && yearCheck) {
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

    if (processorTable) {

      // Processor page view
      rows = [
        firstNameObj,
        { text: 'Address' },
        { text: 'Postcode' },
        { text: 'Date of birth' },
        { text: 'Type' },
        { text: 'Status' },
        { text: 'Application reference' },
        { text: 'Certificate reference' },
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
        { text: 'Application reference' },
        { text: 'Certificate reference' },
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

        switch (role) {

          case 'backOfficeSupervisor':

            if (patient.checkType === 'supervisor') {
              link = patient.certificateType + '/comparison--leave-feedback?patientID=' + patient.id;
            } else {
              link = patient.certificateType + '/comparison--has-feedback?patientID=' + patient.id;
            }
            break;

          case 'qualityControl':

            if (patient.checkType === 'quality') {
              link = patient.certificateType + '/comparison--leave-feedback?patientID=' + patient.id;
            } else {
              link = patient.certificateType + '/comparison--has-feedback?patientID=' + patient.id;
            }
            break;

          case 'backOffice':

            link = patient.certificateType + '/application--correction?patientID=' + patient.id;
            break;

          case 'callCentre':

            link = patient.certificateType + '/case--view--can-edit?patientID=' + patient.id;
            break;


        }

      } else {

        // Standard screens
        switch (patient.status) {

          case 'processing':

            if (role === 'backOffice' || role === 'backOfficeSupervisor') {
              link = 'process-application/matex?patientID=' + patient.id;
            } else if (role === 'qualityControl') {
              link = patient.certificateType + '/case--view--cannot-edit?patientID=' + patient.id;
            } else {
              link = patient.certificateType + '/case--view--can-edit?patientID=' + patient.id;
            }

            break;

   case 'on-hold':

  if (role === 'backOffice' || role === 'backOfficeSupervisor') {
    link = patient.certificateType + '/case--view--can-edit?patientID=' + patient.id;
  } else if (role === 'qualityControl') {
    link = patient.certificateType + '/case--view--cannot-edit?patientID=' + patient.id;
  } else {
    link = patient.certificateType + '/case--view--can-edit?patientID=' + patient.id;
  }

  break;

case 'rejected':

  if (role === 'qualityControl') {
    link = patient.certificateType + '/case--view--cannot-edit?patientID=' + patient.id;
  } else {
    link = patient.certificateType + '/case--view--can-edit?patientID=' + patient.id;
  }

  break;


        }

      }





      const checkedBy = (patient.checkType === 'supervisor') ? 'Supervisor' : 'Quality checker';

      // Hide address for DIGITAL MATEX
      let addressHtml = '';

      if (!((patient.certificateType === 'matex' || patient.certificateType === 'medex') && patient.channel === 'Digital')) {
        const fullAddressLine1 = patient.address.buildingNumber + ' ' + patient.address.streetName;
        const hadMore = patient.address.locality || patient.address.postTown || patient.address.county;

        addressHtml = hadMore
          ? fullAddressLine1 + '...'
          : fullAddressLine1;
      }

      const nameHTML = '<a class="nhsuk-link nhsuk-link--no-visited-state" href="' + link + '">' +
        '<strong>' + patient.firstName + ' ' + patient.lastName + '</strong>' +
        '<span class="nhsuk-u-visually-hidden">: Open ' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag(patient.certificateType) + ' certificate record </span>' +
        '</a>' +
        '<br /><span class="nhsuk-body-s">' + patient.nhsNumber + '</span>';


      let obj;

      if (processorTable) {

        obj = [
          { html: nameHTML },
          { html: addressHtml },
          { html: patient.address.postcode },
          { html: patient.dateOfBirth.display },
          { html: _getCertificateTypeTextOrTag(patient.certificateType, true) },
          { html: (patient.checking === true) ? _getStatusTextOrTag(patient.status, true) + ' ' + _getStatusTextOrTag('checking', true) : _getStatusTextOrTag(patient.status, true) },
          { html: patient.applicationReference || 'Not available' },
          { html: _getReferenceHtml(patient.certificateReference) },
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
          { html: patient.applicationReference || 'Not available' },
          { html: _getReferenceHtml(patient.certificateReference) },
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
            { html: patient.applicationReference || 'Not available' },
            { html: _getReferenceHtml(patient.certificateReference) }
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
            { html: patient.applicationReference || 'Not available' },
            { html: _getReferenceHtml(patient.certificateReference) }
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

      const dayCheck = (this.ctx.data.searchDateOfBirth.day && this.ctx.data.searchDateOfBirth.day.trim() !== '') ? true : false;
      const monthCheck = (this.ctx.data.searchDateOfBirth.month && this.ctx.data.searchDateOfBirth.month.trim() !== '') ? true : false;
      const yearCheck = (this.ctx.data.searchDateOfBirth.year && this.ctx.data.searchDateOfBirth.year.trim() !== '') ? true : false;

      if (dayCheck && monthCheck && yearCheck) {
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

    console.log('processAddress');

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
  _tidySearchDate = function (dateObj) {

    if (dateObj && dateObj.day && dateObj.month && dateObj.year) {

      dateObj.day = (!Number.isNaN(parseInt(dateObj.day))) ? parseInt(dateObj.day) : dateObj.day;
      dateObj.month = (!Number.isNaN(parseInt(dateObj.month))) ? parseInt(dateObj.month) - 1 : dateObj.month;
      dateObj.year = (!Number.isNaN(parseInt(dateObj.year))) ? parseInt(dateObj.year) : dateObj.year;

    }

    return dateObj

  }

  //
  // PROCESS DATE FUNCTION
  // Make sure to zero-index the month when you use this
  //
  _processDate = function (dateObj) {
    let date = '';
    if (dateObj && dateObj.day && dateObj.month && dateObj.year) {
      date = new Date(parseInt(dateObj.year), parseInt(dateObj.month), parseInt(dateObj.day), 0, 0, 0, 0);
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
  filters.processDate = function (dateObj) {
    return _processDate(dateObj);
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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"625 570 1394","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","checking":true,"checkType":"quality","dateOfBirth":{"display":"24 December 1979","day":24,"month":11,"year":1979},"applicationReference":" 20260825001029N696377055","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N540173314","startDate":{"display":"21 December 2025","day":21,"month":11,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"20 December 2035","day":20,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07031 284 591","emailAddress":"Smith525@aol.com"},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"864 254 4092","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"12 June 1982","day":12,"month":5,"year":1982},"checking":false,"applicationReference":" 20260821080816N325046162","certificateReference":"HRT 0FZM G8J1","channel":"Digital","imageReference":"2026 08 25 10 36 38N432526893","startDate":{"display":"23 October 2025","day":23,"month":9,"year":2025},"dueDate":{"display":"15 September 2025","day":15,"month":8,"year":2025},"endDate":{"display":"22 October 2026","day":22,"month":9,"year":2026},"childsDOB":{"display":"27 August 2025","day":27,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07049 823 716","emailAddress":"a.jones@blueyonder.co.uk"},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"874 118 0975","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"19 July 2003","day":19,"month":6,"year":2003},"checking":false,"checkType":"supervisor","applicationReference":" 20260818213817N938876424","certificateReference":"15 865 359 243","channel":"Paper","imageReference":"2026 08 25 10 36 39N078377898","startDate":{"display":"27 January 2026","day":27,"month":0,"year":2026},"dueDate":{"display":"13 September 2025","day":13,"month":8,"year":2025},"endDate":{"display":"26 January 2027","day":26,"month":0,"year":2027},"childsDOB":{"display":"27 January 2026","day":27,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 395 184","emailAddress":"i.taylor@blueyonder.co.uk"},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"468 894 7165","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"1 May 1994","day":1,"month":4,"year":1994},"checking":false,"checkType":"supervisor","applicationReference":" 20260820130112N780787221","certificateReference":"61 324 039 147","channel":"Digital","imageReference":"2026 08 25 10 36 38N958240552","startDate":{"display":"1 January 2026","day":1,"month":0,"year":2026},"dueDate":{"display":"8 February 2026","day":8,"month":1,"year":2026},"endDate":{"display":"31 December 2035","day":31,"month":11,"year":2035},"childsDOB":{"display":"3 January 2026","day":3,"month":0,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07071 528 439","emailAddress":"a.brown@hotmail.com","medicalCondition":["(4) Myxoedema"]},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"618 549 8966","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"28 May 2000","day":28,"month":4,"year":2000},"checking":false,"applicationReference":" 20260818194652N096087873","certificateReference":"60 665 527 374","channel":"Paper","imageReference":"2026 08 25 10 36 39N424664293","startDate":{"display":"18 October 2025","day":18,"month":9,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"17 October 2026","day":17,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07083 916 275","dueDate":{"display":"5 October 2025","day":5,"month":9,"year":2025},"childsDOB":{"display":"18 October 2025","day":18,"month":9,"year":2025}},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"644 599 4635","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"2 November 1972","day":2,"month":10,"year":1972},"checking":false,"applicationReference":" 20260820152136N159152486","certificateReference":"84 026 763 272","channel":"Paper","startDate":{"display":"8 February 2026","day":8,"month":1,"year":2026},"endDate":{"display":"7 February 2036","day":7,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07092 475 318","emailAddress":"Wilson750@gmail.com","checkType":"quality","imageReference":"2026 08 25 10 36 39N405458391","medicalCondition":["(4) Myxoedema","(7) Forms of hypoadrenalism","(8) Myasthenia gravis"]},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"541 385 7803","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"1 November 1988","day":1,"month":10,"year":1988},"checking":false,"applicationReference":" 20260818125145N124723144","certificateReference":"80 365 298 533","channel":"Digital","startDate":{"display":"24 January 2026","day":24,"month":0,"year":2026},"endDate":{"display":"23 January 2036","day":23,"month":0,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07015 648 293","emailAddress":"m.davies@blueyonder.co.uk","medicalCondition":["(5) Hypoparathyroidism","(7) Forms of hypoadrenalism"]},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"058 514 7408","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"15 August 1991","day":15,"month":7,"year":1991},"checking":true,"checkType":"supervisor","applicationReference":" 20260819072607N457922158","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N602133282","startDate":{"display":"19 December 2025","day":19,"month":11,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"18 December 2026","day":18,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 751 964","emailAddress":"e.evans@outlook.com","dueDate":{"display":"13 September 2025","day":13,"month":8,"year":2025},"childsDOB":{"display":"19 December 2025","day":19,"month":11,"year":2025}},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"672 746 8831","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"27 November 1973","day":27,"month":10,"year":1973},"checking":true,"applicationReference":" 20260819214236N627547421","certificateReference":"46 944 873 002","channel":"Paper","startDate":{"display":"10 January 2026","day":10,"month":0,"year":2026},"endDate":{"display":"9 January 2036","day":9,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07036 592 817","emailAddress":"thomas.g@googlemail.com","checkType":"quality","imageReference":"2026 08 25 10 36 39N415363388","medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"150 314 6840","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"23 December 1972","day":23,"month":11,"year":1972},"applicationReference":" 20260820064005N750664760","certificateReference":"80 968 866 706","channel":"Digital","imageReference":"2026 08 25 10 36 38N169766926","startDate":{"display":"26 November 2025","day":26,"month":10,"year":2025},"dueDate":{"display":"23 November 2025","day":23,"month":10,"year":2025},"endDate":{"display":"25 November 2035","day":25,"month":10,"year":2035},"childsDOB":{"display":"17 November 2025","day":17,"month":10,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07047 813 256","emailAddress":"l.roberts@aol.com","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"719 357 8323","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"11 November 1969","day":11,"month":10,"year":1969},"checking":false,"applicationReference":" 20260823000845N259457227","certificateReference":"08 659 932 165","channel":"Paper","startDate":{"display":"17 February 2026","day":17,"month":1,"year":2026},"dueDate":{"display":"18 October 2025","day":18,"month":9,"year":2025},"endDate":{"display":"16 February 2036","day":16,"month":1,"year":2036},"childsDOB":{"display":"23 December 2025","day":23,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07051 294 783","checkType":"quality","imageReference":"2026 08 25 10 36 39N740671387","medicalCondition":["(4) Myxoedema"]},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"425 065 2803","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"26 December 1988","day":26,"month":11,"year":1988},"checking":true,"applicationReference":" 20260823200157N297743800","certificateReference":"07 086 057 355","channel":"Paper","startDate":{"display":"14 October 2025","day":14,"month":9,"year":2025},"endDate":{"display":"13 October 2026","day":13,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07063 418 592","emailAddress":"lewis.c@gmail.com","checkType":"supervisor","imageReference":"2026 08 25 10 36 39N840432845","dueDate":{"display":"13 September 2025","day":13,"month":8,"year":2025},"childsDOB":{"display":"14 October 2025","day":14,"month":9,"year":2025}},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"857 771 3537","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"7 July 2001","day":7,"month":6,"year":2001},"checking":true,"checkType":"quality","applicationReference":" 20260818142219N836830436","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N687416598","startDate":{"display":"29 October 2025","day":29,"month":9,"year":2025},"dueDate":{"display":"2 December 2025","day":2,"month":11,"year":2025},"endDate":{"display":"28 October 2026","day":28,"month":9,"year":2026},"childsDOB":{"display":"29 October 2025","day":29,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07075 928 341","emailAddress":"walker.i@googlemail.com"},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"190 056 9678","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"12 October 1980","day":12,"month":9,"year":1980},"applicationReference":" 20260818182031N359583414","certificateReference":"30 611 559 432","channel":"Digital","imageReference":"2026 08 25 10 36 38N269634426","startDate":{"display":"19 February 2026","day":19,"month":1,"year":2026},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"18 February 2036","day":18,"month":1,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07084 372 659","emailAddress":"Hall391@outlook.com"},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"138 513 0701","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"14 December 1999","day":14,"month":11,"year":1999},"checking":false,"applicationReference":" 20260821031828N150092324","certificateReference":"74 133 489 156","channel":"Paper","imageReference":"2026 08 25 10 36 39N443571161","startDate":{"display":"27 August 2025","day":27,"month":7,"year":2025},"dueDate":{"display":"10 February 2026","day":10,"month":1,"year":2026},"endDate":{"display":"26 August 2026","day":26,"month":7,"year":2026},"childsDOB":{"display":"27 August 2025","day":27,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07091 837 426","emailAddress":"evie.clarke@blueyonder.co.uk"},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"986 950 1761","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"23 March 1967","day":23,"month":2,"year":1967},"checking":true,"applicationReference":" 20260821111849N007257311","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N203000461","startDate":{"display":"17 February 2026","day":17,"month":1,"year":2026},"dueDate":{"display":"29 January 2026","day":29,"month":0,"year":2026},"endDate":{"display":"16 February 2036","day":16,"month":1,"year":2036},"childsDOB":{"display":"19 January 2026","day":19,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 385 927","emailAddress":"Allen820@gmail.com","checkType":"supervisor","medicalCondition":["(2) Epilepsy"]},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"351 900 1990","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"1 November 1994","day":1,"month":10,"year":1994},"checking":false,"applicationReference":" 20260823203121N365568377","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N923098025","startDate":{"display":"1 February 2026","day":1,"month":1,"year":2026},"dueDate":{"display":"5 January 2026","day":5,"month":0,"year":2026},"endDate":{"display":"31 January 2027","day":31,"month":0,"year":2027},"childsDOB":{"display":"1 February 2026","day":1,"month":1,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07027 639 485"},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"638 517 5314","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","checking":false,"checkType":"quality","dateOfBirth":{"display":"7 January 1991","day":7,"month":0,"year":1991},"applicationReference":" 20260820220806N542894254","certificateReference":"05 484 473 161","channel":"Paper","imageReference":"2026 08 25 10 36 39N786708053","startDate":{"display":"30 December 2025","day":30,"month":11,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"29 December 2035","day":29,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07035 821 749","emailAddress":"h.king@gmail.com"},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"882 485 4729","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"deleted","checking":false,"checkType":"quality","dateOfBirth":{"display":"21 November 1966","day":21,"month":10,"year":1966},"applicationReference":" 20260818140953N416459493","certificateReference":"01 015 852 092","channel":"Digital","imageReference":"2026 08 25 10 36 38N861799596","startDate":{"display":"24 November 2025","day":24,"month":10,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"23 November 2035","day":23,"month":10,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07048 952 613","emailAddress":"m.wright@googlemail.com"},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"857 553 0402","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"27 March 1971","day":27,"month":2,"year":1971},"applicationReference":" 20260821085940N652978109","certificateReference":"HRT 8Y0I J81P","channel":"Digital","imageReference":"2026 08 25 10 36 38N743128419","startDate":{"display":"31 January 2026","day":31,"month":0,"year":2026},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"30 January 2027","day":30,"month":0,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07052 719 384","emailAddress":"e.green181@hotmail.com"},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"132 793 5604","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"7 November 1977","day":7,"month":10,"year":1977},"checking":true,"checkType":"supervisor","applicationReference":" 20260821034505N551757198","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N874606614","startDate":{"display":"4 October 2025","day":4,"month":9,"year":2025},"dueDate":{"display":"18 January 2026","day":18,"month":0,"year":2026},"endDate":{"display":"3 October 2035","day":3,"month":9,"year":2035},"childsDOB":{"display":"16 November 2025","day":16,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07064 837 295","emailAddress":"Baker979@aol.com","medicalCondition":["(7) Forms of hypoadrenalism"]},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"181 537 4074","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","checking":false,"checkType":"quality","dateOfBirth":{"display":"7 December 1974","day":7,"month":11,"year":1974},"applicationReference":" 20260818130725N465165041","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N594603214","startDate":{"display":"6 September 2025","day":6,"month":8,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"5 September 2035","day":5,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07073 491 826","emailAddress":"adams.r@gmail.com"},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"041 203 8183","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"9 December 1969","day":9,"month":11,"year":1969},"checking":true,"applicationReference":" 20260821103418N312296945","certificateReference":"23 554 503 578","channel":"Paper","imageReference":"2026 08 25 10 36 39N815403218","startDate":{"display":"27 October 2025","day":27,"month":9,"year":2025},"dueDate":{"display":"12 January 2026","day":12,"month":0,"year":2026},"endDate":{"display":"26 October 2035","day":26,"month":9,"year":2035},"childsDOB":{"display":"14 December 2025","day":14,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07085 623 941","checkType":"quality","medicalCondition":["(4) Myxoedema"]},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"957 543 6516","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"4 April 1996","day":4,"month":3,"year":1996},"applicationReference":" 20260823051606N104540879","certificateReference":"26 326 263 940","channel":"Digital","imageReference":"2026 08 25 10 36 38N683037559","startDate":{"display":"27 August 2025","day":27,"month":7,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism","(8) Myasthenia gravis"],"endDate":{"display":"26 August 2026","day":26,"month":7,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07096 718 235","emailAddress":"sienna.turner@hotmail.com","dueDate":{"display":"8 December 2025","day":8,"month":11,"year":2025},"childsDOB":{"display":"27 August 2025","day":27,"month":7,"year":2025}},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"865 930 6789","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"26 December 1967","day":26,"month":11,"year":1967},"checking":true,"checkType":"supervisor","applicationReference":" 20260824062015N599857041","certificateReference":"74 520 515 523","channel":"Paper","imageReference":"2026 08 25 10 36 39N819925970","startDate":{"display":"22 September 2025","day":22,"month":8,"year":2025},"dueDate":{"display":"20 September 2025","day":20,"month":8,"year":2025},"endDate":{"display":"21 September 2035","day":21,"month":8,"year":2035},"childsDOB":{"display":"26 January 2026","day":26,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07018 273 945","emailAddress":"carter.w@hotmail.com","medicalCondition":["(4) Myxoedema","(6) Diabetes insipidus","(8) Myasthenia gravis"]},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"739 765 2725","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"8 July 1966","day":8,"month":6,"year":1966},"checking":false,"applicationReference":" 20260822130958N330463485","certificateReference":"20 705 239 456","channel":"Paper","startDate":{"display":"11 November 2025","day":11,"month":10,"year":2025},"endDate":{"display":"10 November 2035","day":10,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07029 384 756","emailAddress":"Morris403@gmail.com","imageReference":"2026 08 25 10 36 39N347983415","medicalCondition":["(2) Epilepsy"]},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"237 526 0459","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"10 February 1990","day":10,"month":1,"year":1990},"checking":true,"checkType":"supervisor","applicationReference":" 20260820234435N076595061","certificateReference":"54 356 229 313","channel":"Paper","imageReference":"2026 08 25 10 36 39N877422336","startDate":{"display":"5 October 2025","day":5,"month":9,"year":2025},"dueDate":{"display":"3 November 2025","day":3,"month":10,"year":2025},"endDate":{"display":"4 October 2026","day":4,"month":9,"year":2026},"childsDOB":{"display":"5 October 2025","day":5,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07031 572 948","emailAddress":"m.hughes@hotmail.com"},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"270 748 8473","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"3 February 2006","day":3,"month":1,"year":2006},"applicationReference":" 20260821121127N333939974","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N340487596","startDate":{"display":"8 September 2025","day":8,"month":8,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"7 September 2026","day":7,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07042 619 583","emailAddress":"Ward372@googlemail.com","dueDate":{"display":"5 January 2026","day":5,"month":0,"year":2026},"childsDOB":{"display":"8 September 2025","day":8,"month":8,"year":2025}},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"879 846 5662","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"21 June 1988","day":21,"month":5,"year":1988},"checking":false,"applicationReference":" 20260824063656N876443061","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N452633459","startDate":{"display":"29 October 2025","day":29,"month":9,"year":2025},"dueDate":{"display":"24 November 2025","day":24,"month":10,"year":2025},"endDate":{"display":"28 October 2026","day":28,"month":9,"year":2026},"childsDOB":{"display":"29 October 2025","day":29,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07053 847 261","emailAddress":"r.price@gmail.com"},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"531 791 3276","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"16 October 2006","day":16,"month":9,"year":2006},"checking":true,"applicationReference":" 20260820175853N432687737","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N955299113","startDate":{"display":"24 October 2025","day":24,"month":9,"year":2025},"medicalCondition":["(1) Permanent fistula","(5) Hypoparathyroidism"],"endDate":{"display":"23 October 2026","day":23,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07064 928 137","checkType":"supervisor","dueDate":{"display":"21 September 2025","day":21,"month":8,"year":2025},"childsDOB":{"display":"24 October 2025","day":24,"month":9,"year":2025}},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"951 946 6825","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"processing","dateOfBirth":{"display":"20 May 1984","day":20,"month":4,"year":1984},"checking":false,"applicationReference":" 20260819111315N057851971","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N947425051","startDate":{"display":"6 November 2025","day":6,"month":10,"year":2025},"medicalCondition":["(4) Myxoedema","(8) Myasthenia gravis"],"endDate":{"display":"5 November 2035","day":5,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07075 283 916"},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"335 420 1960","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"21 April 1989","day":21,"month":3,"year":1989},"applicationReference":" 20260821224638N942886170","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N349928795","startDate":{"display":"26 August 2025","day":26,"month":7,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"25 August 2035","day":25,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07086 419 375","emailAddress":"l.parker@blueyonder.co.uk"},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"235 732 9144","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"rejected","checking":false,"checkType":"quality","dateOfBirth":{"display":"17 September 1975","day":17,"month":8,"year":1975},"applicationReference":" 20260823163352N805906908","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N842813610","startDate":{"display":"8 February 2026","day":8,"month":1,"year":2026},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"7 February 2036","day":7,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07097 531 284"},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"129 649 3773","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"19 January 2005","day":19,"month":0,"year":2005},"checking":true,"checkType":"supervisor","applicationReference":" 20260820194926N229267446","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N051290400","startDate":{"display":"4 September 2025","day":4,"month":8,"year":2025},"dueDate":{"display":"6 September 2025","day":6,"month":8,"year":2025},"endDate":{"display":"3 September 2026","day":3,"month":8,"year":2026},"childsDOB":{"display":"4 September 2025","day":4,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07018 642 597","emailAddress":"bennett.z@blueyonder.co.uk"},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"064 884 8503","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"expired","checking":false,"checkType":"quality","dateOfBirth":{"display":"18 December 1992","day":18,"month":11,"year":1992},"applicationReference":" 20260821074150N872353467","certificateReference":"64 420 598 899","channel":"Digital","imageReference":"2026 08 25 10 36 38N655413540","startDate":{"display":"18 November 2025","day":18,"month":10,"year":2025},"medicalCondition":["(2) Epilepsy","(7) Forms of hypoadrenalism","(10) Cancer"],"endDate":{"display":"17 November 2026","day":17,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07029 753 861","emailAddress":"cox.f@hotmail.com","dueDate":{"display":"4 January 2026","day":4,"month":0,"year":2026},"childsDOB":{"display":"18 November 2025","day":18,"month":10,"year":2025}},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"575 922 0845","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"11 November 2003","day":11,"month":10,"year":2003},"checking":false,"applicationReference":" 20260823161651N411395873","certificateReference":"36 714 029 689","channel":"Paper","imageReference":"2026 08 25 10 36 39N965135329","startDate":{"display":"11 January 2026","day":11,"month":0,"year":2026},"medicalCondition":["(5) Hypoparathyroidism","(9) Continuing physical disability"],"endDate":{"display":"10 January 2027","day":10,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07031 864 729","emailAddress":"maya.richardson@outlook.com","dueDate":{"display":"4 October 2025","day":4,"month":9,"year":2025},"childsDOB":{"display":"11 January 2026","day":11,"month":0,"year":2026}},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"981 396 0469","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"9 November 1969","day":9,"month":10,"year":1969},"applicationReference":" 20260824123929N481064159","certificateReference":"85 756 452 559","channel":"Paper","imageReference":"2026 08 25 10 36 39N370994578","startDate":{"display":"7 September 2025","day":7,"month":8,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"6 September 2035","day":6,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07042 987 513","emailAddress":"e.gray969@outlook.com"},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"663 896 2302","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"2 December 1996","day":2,"month":11,"year":1996},"applicationReference":" 20260821102841N035132707","certificateReference":"82 306 087 195","channel":"Paper","imageReference":"2026 08 25 10 36 39N035035209","startDate":{"display":"11 January 2026","day":11,"month":0,"year":2026},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"10 January 2027","day":10,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07054 129 876","dueDate":{"display":"16 December 2025","day":16,"month":11,"year":2025},"childsDOB":{"display":"11 January 2026","day":11,"month":0,"year":2026}},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"402 963 5694","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"10 October 1989","day":10,"month":9,"year":1989},"checking":true,"checkType":"supervisor","applicationReference":" 20260823032704N172350897","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N634514643","startDate":{"display":"9 December 2025","day":9,"month":11,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"8 December 2035","day":8,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07065 238 741"},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"332 076 7605","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"12 September 1993","day":12,"month":8,"year":1993},"checking":false,"checkType":"supervisor","applicationReference":" 20260820135112N184064925","certificateReference":"36 288 744 463","channel":"Digital","imageReference":"2026 08 25 10 36 38N266918041","startDate":{"display":"29 September 2025","day":29,"month":8,"year":2025},"dueDate":{"display":"3 November 2025","day":3,"month":10,"year":2025},"endDate":{"display":"28 September 2026","day":28,"month":8,"year":2026},"childsDOB":{"display":"29 September 2025","day":29,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07076 391 825","emailAddress":"e.cook@aol.com"},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"975 983 2906","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"4 April 1989","day":4,"month":3,"year":1989},"applicationReference":" 20260820054853N417095193","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N311888079","startDate":{"display":"16 February 2026","day":16,"month":1,"year":2026},"medicalCondition":["(10) Cancer"],"endDate":{"display":"15 February 2036","day":15,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07087 512 936"},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"293 597 1384","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"26 May 1972","day":26,"month":4,"year":1972},"applicationReference":" 20260820054113N883167423","certificateReference":"HRT 5PW2 YQIF","channel":"Digital","imageReference":"2026 08 25 10 36 38N676952633","startDate":{"display":"31 January 2026","day":31,"month":0,"year":2026},"dueDate":{"display":"29 October 2025","day":29,"month":9,"year":2025},"endDate":{"display":"30 January 2027","day":30,"month":0,"year":2027},"childsDOB":{"display":"22 October 2025","day":22,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07098 631 427","emailAddress":"Sanders888@googlemail.com"},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"688 118 3315","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"20 August 1984","day":20,"month":7,"year":1984},"checking":true,"applicationReference":" 20260819083002N146777310","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N258400440","startDate":{"display":"20 October 2025","day":20,"month":9,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"19 October 2035","day":19,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07019 742 835","emailAddress":"emma.harrison@blueyonder.co.uk","checkType":"supervisor"},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"318 669 8520","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"12 January 1968","day":12,"month":0,"year":1968},"checking":false,"applicationReference":" 20260822154953N959199585","certificateReference":"HRT BWW2 2CDR","channel":"Digital","imageReference":"2026 08 25 10 36 38N991084294","startDate":{"display":"5 September 2025","day":5,"month":8,"year":2025},"dueDate":{"display":"17 January 2026","day":17,"month":0,"year":2026},"endDate":{"display":"4 September 2026","day":4,"month":8,"year":2026},"childsDOB":{"display":"7 September 2025","day":7,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07020 853 749","emailAddress":"l.coleman@blueyonder.co.uk"},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"325 295 5501","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"12 January 1995","day":12,"month":0,"year":1995},"checking":false,"applicationReference":" 20260819145057N317202925","certificateReference":"HRT TICF KYL1","channel":"Pharmacy","startDate":{"display":"4 December 2025","day":4,"month":11,"year":2025},"endDate":{"display":"3 December 2026","day":3,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07031 984 625","emailAddress":"amber.murphy@blueyonder.co.uk"},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"923 990 1785","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"24 October 1990","day":24,"month":9,"year":1990},"applicationReference":" 20260823215336N226393373","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N484222830","startDate":{"display":"29 August 2025","day":29,"month":7,"year":2025},"medicalCondition":["(2) Epilepsy","(7) Forms of hypoadrenalism"],"endDate":{"display":"28 August 2026","day":28,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07042 195 783","emailAddress":"scarlett.graham@gmail.com","dueDate":{"display":"11 September 2025","day":11,"month":8,"year":2025},"childsDOB":{"display":"29 August 2025","day":29,"month":7,"year":2025}},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"781 654 1307","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"22 July 1971","day":22,"month":6,"year":1971},"checking":true,"checkType":"supervisor","applicationReference":" 20260822113452N586421830","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N291107649","startDate":{"display":"23 October 2025","day":23,"month":9,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"22 October 2035","day":22,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07053 268 917","emailAddress":"b.stevens@googlemail.com"},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"155 409 5129","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"25 March 1999","day":25,"month":2,"year":1999},"checking":true,"applicationReference":" 20260822181324N527360167","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N935231684","startDate":{"display":"29 December 2025","day":29,"month":11,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"28 December 2026","day":28,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07064 371 528","emailAddress":"imogen.simpson@outlook.com","checkType":"supervisor","dueDate":{"display":"12 January 2026","day":12,"month":0,"year":2026},"childsDOB":{"display":"29 December 2025","day":29,"month":11,"year":2025}},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"742 606 4859","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"28 April 1986","day":28,"month":3,"year":1986},"checking":false,"checkType":"supervisor","applicationReference":" 20260822213316N493972412","certificateReference":"HRT VBH1 IS3L","channel":"Digital","imageReference":"2026 08 25 10 36 38N261160261","startDate":{"display":"31 August 2025","day":31,"month":7,"year":2025},"dueDate":{"display":"25 November 2025","day":25,"month":10,"year":2025},"endDate":{"display":"30 August 2026","day":30,"month":7,"year":2026},"childsDOB":{"display":"2 October 2025","day":2,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07075 482 936","emailAddress":"harriet.butler@gmail.com"},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"385 370 2739","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"3 March 1995","day":3,"month":2,"year":1995},"checking":false,"checkType":"supervisor","applicationReference":" 20260823035339N736355984","certificateReference":"34 693 346 743","channel":"Paper","imageReference":"2026 08 25 10 36 39N020014313","startDate":{"display":"8 November 2025","day":8,"month":10,"year":2025},"dueDate":{"display":"13 September 2025","day":13,"month":8,"year":2025},"endDate":{"display":"7 November 2026","day":7,"month":10,"year":2026},"childsDOB":{"display":"8 November 2025","day":8,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07086 593 147","emailAddress":"Chapman430@googlemail.com"},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"623 543 3223","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"10 February 1970","day":10,"month":1,"year":1970},"checking":true,"applicationReference":" 20260822142518N369031057","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N065459032","startDate":{"display":"22 January 2026","day":22,"month":0,"year":2026},"dueDate":{"display":"11 February 2026","day":11,"month":1,"year":2026},"endDate":{"display":"21 January 2036","day":21,"month":0,"year":2036},"childsDOB":{"display":"2 January 2026","day":2,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07097 614 258","checkType":"supervisor","medicalCondition":["(5) Hypoparathyroidism"]},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"830 954 6174","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"processing","dateOfBirth":{"display":"23 May 1980","day":23,"month":4,"year":1980},"checking":false,"applicationReference":" 20260823025856N771016090","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N048359284","startDate":{"display":"25 November 2025","day":25,"month":10,"year":2025},"dueDate":{"display":"25 October 2025","day":25,"month":9,"year":2025},"endDate":{"display":"24 November 2035","day":24,"month":10,"year":2035},"childsDOB":{"display":"19 December 2025","day":19,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07018 725 369","emailAddress":"sofia.hussain@hotmail.com","medicalCondition":["(10) Cancer"]},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"001 644 4160","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"expired","checking":false,"checkType":"quality","dateOfBirth":{"display":"18 June 1983","day":18,"month":5,"year":1983},"applicationReference":" 20260823213832N267957494","certificateReference":"39 199 951 871","channel":"Digital","imageReference":"2026 08 25 10 36 38N314892943","startDate":{"display":"22 September 2025","day":22,"month":8,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"21 September 2035","day":21,"month":8,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07029 836 471","emailAddress":"a.khan434@blueyonder.co.uk"},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"253 427 4325","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"19 January 1980","day":19,"month":0,"year":1980},"checking":false,"applicationReference":" 20260822174151N629261150","certificateReference":"29 144 475 760","channel":"Digital","startDate":{"display":"13 February 2026","day":13,"month":1,"year":2026},"endDate":{"display":"12 February 2036","day":12,"month":1,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07030 947 582","emailAddress":"begum.l@aol.com","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"281 236 8414","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"6 January 1995","day":6,"month":0,"year":1995},"checking":false,"applicationReference":" 20260825044622N154919567","certificateReference":"","channel":"Paper","startDate":{"display":"26 September 2025","day":26,"month":8,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"25 September 2026","day":25,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07042 058 693","emailAddress":"O’Connor342@gmail.com","imageReference":"2026 08 25 10 36 39N774129306","dueDate":{"display":"15 November 2025","day":15,"month":10,"year":2025},"childsDOB":{"display":"26 September 2025","day":26,"month":8,"year":2025}},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"294 187 6844","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"14 March 1991","day":14,"month":2,"year":1991},"checking":false,"applicationReference":" 20260820064759N119777161","certificateReference":"56 234 325 444","channel":"Digital","imageReference":"2026 08 25 10 36 38N825092904","startDate":{"display":"24 November 2025","day":24,"month":10,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"23 November 2026","day":23,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07053 169 784","emailAddress":"a.kelly@hotmail.com","dueDate":{"display":"13 November 2025","day":13,"month":10,"year":2025},"childsDOB":{"display":"24 November 2025","day":24,"month":10,"year":2025}},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"922 274 2148","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"11 September 1994","day":11,"month":8,"year":1994},"checking":true,"applicationReference":" 20260822154414N852915215","certificateReference":"52 558 034 403","channel":"Paper","startDate":{"display":"31 August 2025","day":31,"month":7,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"30 August 2035","day":30,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07064 271 895","emailAddress":"erin.mccarthy@googlemail.com","checkType":"supervisor","imageReference":"2026 08 25 10 36 39N787003899"},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"685 449 8982","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"21 May 1986","day":21,"month":4,"year":1986},"checking":true,"applicationReference":" 20260820153927N231275230","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N082428182","startDate":{"display":"12 September 2025","day":12,"month":8,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"11 September 2035","day":11,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07075 382 916","emailAddress":"o.doyle794@hotmail.com","checkType":"supervisor"},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"337 480 0555","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","checking":false,"checkType":"quality","dateOfBirth":{"display":"20 July 1969","day":20,"month":6,"year":1969},"applicationReference":" 20260822092301N934258420","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N098918081","startDate":{"display":"8 December 2025","day":8,"month":11,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"7 December 2035","day":7,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07086 493 127","emailAddress":"Griffiths882@hotmail.com"},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"936 825 9748","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"24 May 1989","day":24,"month":4,"year":1989},"checking":false,"checkType":"quality","applicationReference":" 20260824141023N552605060","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N944857122","startDate":{"display":"17 September 2025","day":17,"month":8,"year":2025},"dueDate":{"display":"9 October 2025","day":9,"month":9,"year":2025},"endDate":{"display":"16 September 2035","day":16,"month":8,"year":2035},"childsDOB":{"display":"26 August 2025","day":26,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07097 514 238","emailAddress":"megan.rees@aol.com","medicalCondition":["(10) Cancer"]},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"291 183 1163","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"25 August 1975","day":25,"month":7,"year":1975},"checking":false,"applicationReference":" 20260820022234N003416926","certificateReference":"53 215 380 632","channel":"Paper","imageReference":"2026 08 25 10 36 39N851147136","startDate":{"display":"16 February 2026","day":16,"month":1,"year":2026},"dueDate":{"display":"29 October 2025","day":29,"month":9,"year":2025},"endDate":{"display":"15 February 2036","day":15,"month":1,"year":2036},"childsDOB":{"display":"21 January 2026","day":21,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07018 625 349","emailAddress":"Evans363@gmail.com","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"806 763 3614","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"21 August 1999","day":21,"month":7,"year":1999},"checking":true,"applicationReference":" 20260819182929N106766539","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N562037036","startDate":{"display":"28 December 2025","day":28,"month":11,"year":2025},"dueDate":{"display":"10 January 2026","day":10,"month":0,"year":2026},"endDate":{"display":"27 December 2026","day":27,"month":11,"year":2026},"childsDOB":{"display":"28 December 2025","day":28,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07029 736 458","emailAddress":"MacDonald520@googlemail.com","checkType":"supervisor"},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"825 749 3597","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"9 March 1967","day":9,"month":2,"year":1967},"checking":true,"applicationReference":" 20260821212134N955678502","certificateReference":"24 360 466 063","channel":"Paper","startDate":{"display":"28 September 2025","day":28,"month":8,"year":2025},"dueDate":{"display":"14 December 2025","day":14,"month":11,"year":2025},"endDate":{"display":"27 September 2035","day":27,"month":8,"year":2035},"childsDOB":{"display":"10 September 2025","day":10,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07030 847 569","emailAddress":"Fraser811@blueyonder.co.uk","checkType":"supervisor","imageReference":"2026 08 25 10 36 39N158717864","medicalCondition":["(10) Cancer"]},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"795 966 0770","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"4 December 1986","day":4,"month":11,"year":1986},"checking":false,"applicationReference":" 20260822043303N974933702","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N381747454","startDate":{"display":"10 October 2025","day":10,"month":9,"year":2025},"medicalCondition":["(3) Diabetes mellitus","(5) Hypoparathyroidism","(7) Forms of hypoadrenalism"],"endDate":{"display":"9 October 2035","day":9,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07041 958 672","emailAddress":"Armstrong519@gmail.com","checkType":"quality"},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"033 982 5594","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"25 May 1990","day":25,"month":4,"year":1990},"checking":true,"checkType":"supervisor","applicationReference":" 20260822112626N741227870","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N423861789","startDate":{"display":"5 January 2026","day":5,"month":0,"year":2026},"dueDate":{"display":"4 February 2026","day":4,"month":1,"year":2026},"endDate":{"display":"4 January 2027","day":4,"month":0,"year":2027},"childsDOB":{"display":"5 January 2026","day":5,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07052 069 783"},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"552 122 7349","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"19 December 1977","day":19,"month":11,"year":1977},"checking":false,"applicationReference":" 20260818220520N698489572","certificateReference":"","channel":"Paper","startDate":{"display":"23 October 2025","day":23,"month":9,"year":2025},"endDate":{"display":"22 October 2035","day":22,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07063 171 894","emailAddress":"clara.lawrence@gmail.com","checkType":"quality","imageReference":"2026 08 25 10 36 39N740255877","medicalCondition":["(2) Epilepsy","(4) Myxoedema","(9) Continuing physical disability"]},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"001 675 1353","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"expired","dateOfBirth":{"display":"24 March 1967","day":24,"month":2,"year":1967},"checking":false,"checkType":"quality","applicationReference":" 20260824093719N678390706","certificateReference":"83 055 193 623","channel":"Paper","imageReference":"2026 08 25 10 36 39N398180338","startDate":{"display":"8 December 2025","day":8,"month":11,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"7 December 2035","day":7,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07074 282 915","emailAddress":"Spencer223@blueyonder.co.uk"},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"118 361 3144","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"20 April 1980","day":20,"month":3,"year":1980},"checking":false,"applicationReference":" 20260821011940N793698938","certificateReference":"HRT VK2U 8MEB","channel":"Digital","startDate":{"display":"17 December 2025","day":17,"month":11,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"16 December 2026","day":16,"month":11,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07085 393 126","emailAddress":"nancy.rogers@aol.com"},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"213 202 7642","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"23 January 2005","day":23,"month":0,"year":2005},"checking":true,"checkType":"supervisor","applicationReference":" 20260825083747N865239072","certificateReference":"25 440 981 786","channel":"Paper","imageReference":"2026 08 25 10 36 39N287837466","startDate":{"display":"12 September 2025","day":12,"month":8,"year":2025},"dueDate":{"display":"14 September 2025","day":14,"month":8,"year":2025},"endDate":{"display":"11 September 2026","day":11,"month":8,"year":2026},"childsDOB":{"display":"12 September 2025","day":12,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07096 414 237","emailAddress":"annabelle.watts@aol.com"},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"832 207 5515","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"21 June 2005","day":21,"month":5,"year":2005},"checking":true,"applicationReference":" 20260820122328N558604417","certificateReference":"","channel":"Paper","startDate":{"display":"27 November 2025","day":27,"month":10,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"26 November 2026","day":26,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07017 525 348","checkType":"supervisor","imageReference":"2026 08 25 10 36 39N582026771","dueDate":{"display":"30 January 2026","day":30,"month":0,"year":2026},"childsDOB":{"display":"27 November 2025","day":27,"month":10,"year":2025}},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"660 541 0754","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"14 July 2003","day":14,"month":6,"year":2003},"checking":false,"applicationReference":" 20260824114823N162736686","certificateReference":"52 662 177 609","channel":"Digital","imageReference":"2026 08 25 10 36 38N631147770","startDate":{"display":"1 February 2026","day":1,"month":1,"year":2026},"dueDate":{"display":"22 November 2025","day":22,"month":10,"year":2025},"endDate":{"display":"31 January 2027","day":31,"month":0,"year":2027},"childsDOB":{"display":"1 February 2026","day":1,"month":1,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07028 636 459","emailAddress":"rose.palmer@outlook.com"},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"328 210 2453","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"processing","dateOfBirth":{"display":"7 February 1990","day":7,"month":1,"year":1990},"checking":false,"applicationReference":" 20260824093732N812182279","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N450484468","startDate":{"display":"27 January 2026","day":27,"month":0,"year":2026},"dueDate":{"display":"30 August 2025","day":30,"month":7,"year":2025},"endDate":{"display":"26 January 2027","day":26,"month":0,"year":2027},"childsDOB":{"display":"27 January 2026","day":27,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07039 747 561","emailAddress":"lara.nicholson@blueyonder.co.uk"},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"104 055 4377","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"28 April 1994","day":28,"month":3,"year":1994},"checking":true,"checkType":"supervisor","applicationReference":" 20260824224655N993267084","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N089001672","startDate":{"display":"20 January 2026","day":20,"month":0,"year":2026},"medicalCondition":["(10) Cancer"],"endDate":{"display":"19 January 2027","day":19,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07040 858 673","emailAddress":"gardner.j@outlook.com","dueDate":{"display":"24 January 2026","day":24,"month":0,"year":2026},"childsDOB":{"display":"20 January 2026","day":20,"month":0,"year":2026}},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"883 913 1606","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"26 September 1968","day":26,"month":8,"year":1968},"checking":false,"applicationReference":" 20260824220948N472075053","certificateReference":"HRT SQT5 ILDK","channel":"Digital","imageReference":"2026 08 25 10 36 38N900494336","startDate":{"display":"21 September 2025","day":21,"month":8,"year":2025},"medicalCondition":["(1) Permanent fistula","(8) Myasthenia gravis"],"endDate":{"display":"20 September 2026","day":20,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07051 969 782","emailAddress":"a.newton@gmail.com"},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"818 424 8344","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"4 May 1991","day":4,"month":4,"year":1991},"checking":true,"applicationReference":" 20260822085157N050096908","certificateReference":"","channel":"Paper","startDate":{"display":"1 October 2025","day":1,"month":9,"year":2025},"dueDate":{"display":"9 October 2025","day":9,"month":9,"year":2025},"endDate":{"display":"30 September 2026","day":30,"month":8,"year":2026},"childsDOB":{"display":"1 October 2025","day":1,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07062 071 893","emailAddress":"s.reed@gmail.com","checkType":"supervisor","imageReference":"2026 08 25 10 36 39N394116107"},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"301 682 8001","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"1 October 1970","day":1,"month":9,"year":1970},"checking":false,"checkType":"quality","applicationReference":" 20260824181329N567543712","certificateReference":"28 675 284 490","channel":"Paper","imageReference":"2026 08 25 10 36 39N998563624","startDate":{"display":"7 November 2025","day":7,"month":10,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"6 November 2035","day":6,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07073 182 914","emailAddress":"Harvey656@outlook.com"},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"580 820 2819","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","checking":false,"checkType":"quality","dateOfBirth":{"display":"25 January 1996","day":25,"month":0,"year":1996},"applicationReference":" 20260825033904N296689226","certificateReference":"HRT I0ZD 3GJH","channel":"Digital","imageReference":"2026 08 25 10 36 38N340124994","startDate":{"display":"8 October 2025","day":8,"month":9,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"7 October 2026","day":7,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07084 293 125","emailAddress":"maria.fernandez@googlemail.com"},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"016 458 3934","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","checking":false,"checkType":"quality","dateOfBirth":{"display":"16 August 2005","day":16,"month":7,"year":2005},"applicationReference":" 20260820221914N656662183","certificateReference":"74 023 958 701","channel":"Digital","imageReference":"2026 08 25 10 36 38N333284830","startDate":{"display":"2 February 2026","day":2,"month":1,"year":2026},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"1 February 2027","day":1,"month":1,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07095 314 236","emailAddress":"Silva555@hotmail.com","dueDate":{"display":"1 December 2025","day":1,"month":11,"year":2025},"childsDOB":{"display":"2 February 2026","day":2,"month":1,"year":2026}},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"908 137 9124","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"3 January 1971","day":3,"month":0,"year":1971},"checking":false,"applicationReference":" 20260820005452N695790567","certificateReference":"","channel":"Paper","startDate":{"display":"3 September 2025","day":3,"month":8,"year":2025},"dueDate":{"display":"15 February 2026","day":15,"month":1,"year":2026},"endDate":{"display":"2 September 2035","day":2,"month":8,"year":2035},"childsDOB":{"display":"13 September 2025","day":13,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07016 425 347","checkType":"quality","imageReference":"2026 08 25 10 36 39N442700881","medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"593 184 5654","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"3 May 1993","day":3,"month":4,"year":1993},"checking":true,"applicationReference":" 20260819032402N817349866","certificateReference":"","channel":"Paper","startDate":{"display":"6 September 2025","day":6,"month":8,"year":2025},"medicalCondition":["(10) Cancer"],"endDate":{"display":"5 September 2035","day":5,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07027 536 458","checkType":"supervisor","imageReference":"2026 08 25 10 36 39N234394657"},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"663 175 2189","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"16 March 1991","day":16,"month":2,"year":1991},"applicationReference":" 20260821235010N579611615","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N523412142","startDate":{"display":"26 October 2025","day":26,"month":9,"year":2025},"medicalCondition":["(3) Diabetes mellitus","(7) Forms of hypoadrenalism"],"endDate":{"display":"25 October 2026","day":25,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07038 647 569","emailAddress":"j.ahmed@hotmail.com","dueDate":{"display":"11 February 2026","day":11,"month":1,"year":2026},"childsDOB":{"display":"26 October 2025","day":26,"month":9,"year":2025}},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"712 975 5839","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"processing","dateOfBirth":{"display":"25 June 1994","day":25,"month":5,"year":1994},"checking":false,"applicationReference":" 20260819195134N329143563","certificateReference":"","channel":"Paper","startDate":{"display":"8 December 2025","day":8,"month":11,"year":2025},"dueDate":{"display":"8 November 2025","day":8,"month":10,"year":2025},"endDate":{"display":"7 December 2035","day":7,"month":11,"year":2035},"childsDOB":{"display":"9 November 2025","day":9,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07049 758 671","emailAddress":"nadia.rashid@aol.com","imageReference":"2026 08 25 10 36 39N039434709","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"428 090 5944","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"19 August 1978","day":19,"month":7,"year":1978},"checking":false,"applicationReference":" 20260822052131N242284464","certificateReference":"02 355 900 304","channel":"Paper","imageReference":"2026 08 25 10 36 39N758337988","startDate":{"display":"6 December 2025","day":6,"month":11,"year":2025},"medicalCondition":["(1) Permanent fistula","(2) Epilepsy"],"endDate":{"display":"5 December 2035","day":5,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07050 869 782","emailAddress":"paterson.t@googlemail.com","checkType":"quality"},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"601 302 4901","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"1 July 1996","day":1,"month":6,"year":1996},"checking":false,"applicationReference":" 20260819111628N977026208","certificateReference":"","channel":"Paper","startDate":{"display":"11 October 2025","day":11,"month":9,"year":2025},"dueDate":{"display":"11 February 2026","day":11,"month":1,"year":2026},"endDate":{"display":"10 October 2026","day":10,"month":9,"year":2026},"childsDOB":{"display":"11 October 2025","day":11,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07061 971 893","emailAddress":"b.foster@aol.com","imageReference":"2026 08 25 10 36 39N117518986"},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"494 763 4424","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","checking":false,"checkType":"quality","dateOfBirth":{"display":"17 June 1997","day":17,"month":5,"year":1997},"applicationReference":" 20260824045716N017180555","certificateReference":"87 204 274 478","channel":"Digital","imageReference":"2026 08 25 10 36 38N449631455","startDate":{"display":"25 January 2026","day":25,"month":0,"year":2026},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"24 January 2027","day":24,"month":0,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07072 082 914","emailAddress":"lauren.fox@blueyonder.co.uk","dueDate":{"display":"20 October 2025","day":20,"month":9,"year":2025},"childsDOB":{"display":"25 January 2026","day":25,"month":0,"year":2026}},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"761 353 0044","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"3 December 2002","day":3,"month":11,"year":2002},"checking":true,"applicationReference":" 20260818205749N997898342","certificateReference":"22 768 021 193","channel":"Paper","imageReference":"2026 08 25 10 36 39N387824795","startDate":{"display":"22 October 2025","day":22,"month":9,"year":2025},"dueDate":{"display":"14 September 2025","day":14,"month":8,"year":2025},"endDate":{"display":"21 October 2026","day":21,"month":9,"year":2026},"childsDOB":{"display":"22 October 2025","day":22,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07083 193 125","checkType":"supervisor"},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"830 375 6710","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"16 November 2006","day":16,"month":10,"year":2006},"checking":true,"applicationReference":" 20260825014249N045370295","certificateReference":"36 905 194 371","channel":"Paper","imageReference":"2026 08 25 10 36 39N867225152","startDate":{"display":"21 January 2026","day":21,"month":0,"year":2026},"medicalCondition":["(2) Epilepsy","(5) Hypoparathyroidism","(6) Diabetes insipidus"],"endDate":{"display":"20 January 2027","day":20,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07094 214 236","emailAddress":"Murray547@aol.com","checkType":"supervisor","dueDate":{"display":"3 January 2026","day":3,"month":0,"year":2026},"childsDOB":{"display":"21 January 2026","day":21,"month":0,"year":2026}},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"206 546 3257","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"16 February 2007","day":16,"month":1,"year":2007},"checking":false,"applicationReference":" 20260818163329N113569215","certificateReference":"83 591 520 596","channel":"Paper","startDate":{"display":"1 September 2025","day":1,"month":8,"year":2025},"endDate":{"display":"31 August 2026","day":31,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07015 325 347","imageReference":"2026 08 25 10 36 39N638144308","dueDate":{"display":"17 January 2026","day":17,"month":0,"year":2026},"childsDOB":{"display":"1 September 2025","day":1,"month":8,"year":2025}},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"213 522 9844","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"27 July 2007","day":27,"month":6,"year":2007},"checking":true,"applicationReference":" 20260822015356N585360513","certificateReference":"","channel":"Paper","startDate":{"display":"23 October 2025","day":23,"month":9,"year":2025},"endDate":{"display":"22 October 2026","day":22,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07026 436 458","checkType":"supervisor","imageReference":"2026 08 25 10 36 39N018341481","dueDate":{"display":"20 January 2026","day":20,"month":0,"year":2026},"childsDOB":{"display":"23 October 2025","day":23,"month":9,"year":2025}},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"560 127 1595","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"10 June 1986","day":10,"month":5,"year":1986},"checking":false,"checkType":"supervisor","applicationReference":" 20260819041147N832545634","certificateReference":"67 159 900 645","channel":"Paper","imageReference":"2026 08 25 10 36 39N426306242","startDate":{"display":"16 November 2025","day":16,"month":10,"year":2025},"medicalCondition":["(2) Epilepsy","(9) Continuing physical disability"],"endDate":{"display":"15 November 2035","day":15,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07037 547 569","emailAddress":"kayla.holmes@outlook.com"},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"775 028 5866","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"13 May 1974","day":13,"month":4,"year":1974},"checking":true,"checkType":"supervisor","applicationReference":" 20260823183753N029179337","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N356712993","startDate":{"display":"17 October 2025","day":17,"month":9,"year":2025},"dueDate":{"display":"22 January 2026","day":22,"month":0,"year":2026},"endDate":{"display":"16 October 2035","day":16,"month":9,"year":2035},"childsDOB":{"display":"6 December 2025","day":6,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07048 658 671","emailAddress":"lydia.walsh@hotmail.com","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"440 096 9891","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"2 October 2001","day":2,"month":9,"year":2001},"checking":false,"applicationReference":" 20260822122349N201428062","certificateReference":"","channel":"Paper","startDate":{"display":"29 January 2026","day":29,"month":0,"year":2026},"endDate":{"display":"28 January 2027","day":28,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07059 769 782","emailAddress":"alexandra.page@googlemail.com","imageReference":"2026 08 25 10 36 39N115898177","dueDate":{"display":"16 September 2025","day":16,"month":8,"year":2025},"childsDOB":{"display":"29 January 2026","day":29,"month":0,"year":2026}},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"028 249 7892","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"24 October 1992","day":24,"month":9,"year":1992},"checking":true,"applicationReference":" 20260823054948N024026734","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N344638980","startDate":{"display":"3 January 2026","day":3,"month":0,"year":2026},"dueDate":{"display":"2 February 2026","day":2,"month":1,"year":2026},"endDate":{"display":"2 January 2036","day":2,"month":0,"year":2036},"childsDOB":{"display":"31 August 2025","day":31,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07060 871 893","checkType":"supervisor","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"643 312 5190","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"10 April 1980","day":10,"month":3,"year":1980},"checking":false,"checkType":"supervisor","applicationReference":" 20260820060503N208415519","certificateReference":"10 179 724 555","channel":"Paper","imageReference":"2026 08 25 10 36 39N785213381","startDate":{"display":"8 January 2026","day":8,"month":0,"year":2026},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"7 January 2036","day":7,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07071 982 914","emailAddress":"beth.barrett@googlemail.com"},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"995 402 8046","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"26 May 1977","day":26,"month":4,"year":1977},"checking":false,"applicationReference":" 20260824232353N425311295","certificateReference":"14 524 251 479","channel":"Digital","startDate":{"display":"16 September 2025","day":16,"month":8,"year":2025},"medicalCondition":["(1) Permanent fistula","(3) Diabetes mellitus","(4) Myxoedema"],"endDate":{"display":"15 September 2035","day":15,"month":8,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07082 093 125","emailAddress":"hayes.m@gmail.com"},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"822 072 5789","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"23 May 1970","day":23,"month":4,"year":1970},"checking":false,"checkType":"supervisor","applicationReference":" 20260820165121N770788207","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 36 39N268063456","startDate":{"display":"1 November 2025","day":1,"month":10,"year":2025},"dueDate":{"display":"15 February 2026","day":15,"month":1,"year":2026},"endDate":{"display":"31 October 2035","day":31,"month":9,"year":2035},"childsDOB":{"display":"12 December 2025","day":12,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07093 114 236","emailAddress":"f.cunningham@googlemail.com","medicalCondition":["(4) Myxoedema","(5) Hypoparathyroidism","(6) Diabetes insipidus"]},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"328 195 7491","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"8 August 1997","day":8,"month":7,"year":1997},"checking":false,"checkType":"supervisor","applicationReference":" 20260820105816N406175044","certificateReference":"67 074 592 603","channel":"Paper","imageReference":"2026 08 25 10 36 39N506492309","startDate":{"display":"3 February 2026","day":3,"month":1,"year":2026},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"2 February 2027","day":2,"month":1,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 225 347","emailAddress":"a.barber@blueyonder.co.uk","dueDate":{"display":"12 February 2026","day":12,"month":1,"year":2026},"childsDOB":{"display":"3 February 2026","day":3,"month":1,"year":2026}},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"192 499 7217","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"3 October 1996","day":3,"month":9,"year":1996},"checking":false,"checkType":"supervisor","applicationReference":" 20260822064234N551156323","certificateReference":"14 546 155 291","channel":"Digital","imageReference":"2026 08 25 10 36 38N774339077","startDate":{"display":"8 September 2025","day":8,"month":8,"year":2025},"dueDate":{"display":"26 September 2025","day":26,"month":8,"year":2025},"endDate":{"display":"7 September 2035","day":7,"month":8,"year":2035},"childsDOB":{"display":"20 September 2025","day":20,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07025 336 458","emailAddress":"lucia.knight@hotmail.com","medicalCondition":["(10) Cancer"]},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"540 231 2031","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"22 July 2002","day":22,"month":6,"year":2002},"checking":false,"applicationReference":" 20260821172259N406421170","certificateReference":"80 920 309 671","channel":"Digital","startDate":{"display":"27 October 2025","day":27,"month":9,"year":2025},"endDate":{"display":"26 October 2026","day":26,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07036 447 569","emailAddress":"e.parsons@googlemail.com","dueDate":{"display":"2 November 2025","day":2,"month":10,"year":2025},"childsDOB":{"display":"27 October 2025","day":27,"month":9,"year":2025}},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"851 179 7040","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"8 February 1998","day":8,"month":1,"year":1998},"checking":true,"checkType":"supervisor","applicationReference":" 20260820084802N327218387","certificateReference":"37 067 597 742","channel":"Paper","imageReference":"2026 08 25 10 36 39N211922220","startDate":{"display":"30 August 2025","day":30,"month":7,"year":2025},"dueDate":{"display":"16 November 2025","day":16,"month":10,"year":2025},"endDate":{"display":"29 August 2026","day":29,"month":7,"year":2026},"childsDOB":{"display":"30 August 2025","day":30,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07047 558 671","emailAddress":"t.bates@gmail.com"},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"358 280 8412","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","checking":false,"checkType":"quality","dateOfBirth":{"display":"10 November 1970","day":10,"month":10,"year":1970},"applicationReference":" 20260823161911N243156958","certificateReference":"HRT V16G WWDP","channel":"Digital","imageReference":"2026 08 25 10 36 38N158344732","startDate":{"display":"24 February 2026","day":24,"month":1,"year":2026},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"23 February 2027","day":23,"month":1,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07029 753 861","emailAddress":"day.h@googlemail.com"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"743 557 4073","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","checking":false,"checkType":"quality","dateOfBirth":{"display":"3 May 1969","day":3,"month":4,"year":1969},"applicationReference":" 20260820055533N418460056","certificateReference":"HRT QY19 1W30","channel":"Digital","imageReference":"2026 08 25 10 36 38N610145808","startDate":{"display":"17 September 2025","day":17,"month":8,"year":2025},"medicalCondition":["(10) Cancer"],"endDate":{"display":"16 September 2026","day":16,"month":8,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07052 069 783","emailAddress":"i.francis@blueyonder.co.uk"},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"841 803 0003","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"11 May 1983","day":11,"month":4,"year":1983},"checking":true,"applicationReference":" 20260822003751N874788846","certificateReference":"49 090 356 921","channel":"Paper","imageReference":"2026 08 25 10 36 39N233208806","startDate":{"display":"28 August 2025","day":28,"month":7,"year":2025},"dueDate":{"display":"22 December 2025","day":22,"month":11,"year":2025},"endDate":{"display":"27 August 2035","day":27,"month":7,"year":2035},"childsDOB":{"display":"30 January 2026","day":30,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07040 858 673","checkType":"supervisor","medicalCondition":["(7) Forms of hypoadrenalism"]}]'
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

// LOAD NEXT CHECKING URL

filters.getNextCheckingUrl = function (currentPatientId) {

  const patients = JSON.parse(filters.getPatientData());

  const checkingPatients = patients.filter(
    p => p.checking === true
  );

  const currentIndex = checkingPatients.findIndex(
    p => String(p.id) === String(currentPatientId)
  );

  // End the journey after the 8th checking patient
  if (currentIndex >= 7) {
    return '/v1/change-complete';
  }

  const nextPatient = checkingPatients[currentIndex + 1];

  if (!nextPatient) {
    return '/v1/change-complete';
  }

  return '/v1/' + nextPatient.certificateType +
         '/application--correction?patientID=' +
         nextPatient.id;
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
  filters.isApplicationOrCertificate = function (status) {

    let document = 'application';

    if (status) {
      if (status === 'active' || status === 'expired' || status === 'deleted') {
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
