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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"695 799 5762","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"3 May 1993","day":3,"month":4,"year":1993},"checking":false,"applicationReference":" 20260821 084328 N0407","certificateReference":"70 128 006 393","channel":"Digital","startDate":{"display":"23 December 2025","day":23,"month":11,"year":2025},"dueDate":{"display":"19 October 2025","day":19,"month":9,"year":2025},"endDate":{"display":"22 December 2026","day":22,"month":11,"year":2026},"childsDOB":{"display":"23 December 2025","day":23,"month":11,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07031 284 591","emailAddress":"o.smith890@blueyonder.co.uk"},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"602 011 6321","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"27 October 1992","day":27,"month":9,"year":1992},"checking":false,"applicationReference":" 20260824 090723 N0694","certificateReference":"12 531 887 858","channel":"Paper","imageReference":"2026 08 25 10 21 53N491838684","startDate":{"display":"14 October 2025","day":14,"month":9,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"13 October 2035","day":13,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07049 823 716","emailAddress":"a.jones@hotmail.com"},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"880 949 7511","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"27 September 1999","day":27,"month":8,"year":1999},"checking":false,"applicationReference":" 20260819 160035 N0028","certificateReference":"31 106 750 660","channel":"Paper","imageReference":"2026 08 25 10 21 53N164466551","startDate":{"display":"3 December 2025","day":3,"month":11,"year":2025},"dueDate":{"display":"22 February 2026","day":22,"month":1,"year":2026},"endDate":{"display":"2 December 2026","day":2,"month":11,"year":2026},"childsDOB":{"display":"3 December 2025","day":3,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 395 184","emailAddress":"i.taylor@hotmail.com"},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"702 838 3704","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"20 April 1967","day":20,"month":3,"year":1967},"checking":false,"applicationReference":" 20260823 122533 N0567","certificateReference":"HRT WIIC YU09","channel":"Digital","startDate":{"display":"2 November 2025","day":2,"month":10,"year":2025},"endDate":{"display":"1 November 2026","day":1,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07071 528 439","emailAddress":"ava.brown@blueyonder.co.uk"},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"730 049 6539","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"26 January 1992","day":26,"month":0,"year":1992},"checking":false,"applicationReference":" 20260821 195840 N0725","certificateReference":"HRT VFTJ BM1S","channel":"Digital","startDate":{"display":"27 August 2025","day":27,"month":7,"year":2025},"endDate":{"display":"26 August 2026","day":26,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07083 916 275","emailAddress":"e.williams@blueyonder.co.uk"},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"165 182 9266","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"on-hold","checking":true,"checkType":"quality","dateOfBirth":{"display":"2 July 1990","day":2,"month":6,"year":1990},"applicationReference":" 20260822 210758 N0436","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N863075073","startDate":{"display":"10 February 2026","day":10,"month":1,"year":2026},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"9 February 2036","day":9,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07092 475 318","emailAddress":"s.wilson@hotmail.com"},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"740 932 3775","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"6 February 1993","day":6,"month":1,"year":1993},"checking":true,"checkType":"supervisor","applicationReference":" 20260821 174912 N0949","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N045979730","startDate":{"display":"30 October 2025","day":30,"month":9,"year":2025},"dueDate":{"display":"9 October 2025","day":9,"month":9,"year":2025},"endDate":{"display":"29 October 2026","day":29,"month":9,"year":2026},"childsDOB":{"display":"30 October 2025","day":30,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07015 648 293"},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"206 411 5536","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"10 August 1992","day":10,"month":7,"year":1992},"checking":false,"applicationReference":" 20260821 060237 N0536","certificateReference":"HRT 62KP I8ML","channel":"Digital","startDate":{"display":"17 September 2025","day":17,"month":8,"year":2025},"endDate":{"display":"16 September 2026","day":16,"month":8,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 751 964","emailAddress":"ella.evans@googlemail.com"},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"576 576 3440","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"15 April 1983","day":15,"month":3,"year":1983},"applicationReference":" 20260822 082949 N0276","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N657011738","startDate":{"display":"15 December 2025","day":15,"month":11,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"14 December 2035","day":14,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07036 592 817","emailAddress":"g.thomas925@blueyonder.co.uk"},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"716 380 3217","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"25 May 1971","day":25,"month":4,"year":1971},"applicationReference":" 20260821 001114 N0086","certificateReference":"30 043 102 098","channel":"Paper","imageReference":"2026 08 25 10 21 53N307942942","startDate":{"display":"4 October 2025","day":4,"month":9,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"3 October 2035","day":3,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07047 813 256","emailAddress":"lily.roberts@gmail.com"},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"007 181 9663","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"23 August 1988","day":23,"month":7,"year":1988},"checking":false,"applicationReference":" 20260821 024735 N0949","certificateReference":"30 498 078 372","channel":"Digital","startDate":{"display":"4 November 2025","day":4,"month":10,"year":2025},"dueDate":{"display":"31 August 2025","day":31,"month":7,"year":2025},"endDate":{"display":"3 November 2026","day":3,"month":10,"year":2026},"childsDOB":{"display":"4 November 2025","day":4,"month":10,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07051 294 783","emailAddress":"freya.johnson804@aol.com"},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"707 955 3535","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"23 May 1995","day":23,"month":4,"year":1995},"checking":false,"applicationReference":" 20260819 172214 N0188","certificateReference":"98 137 825 070","channel":"Paper","imageReference":"2026 08 25 10 21 53N417490836","startDate":{"display":"11 February 2026","day":11,"month":1,"year":2026},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"10 February 2036","day":10,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07063 418 592","emailAddress":"Lewis949@blueyonder.co.uk"},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"591 032 8361","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"10 December 1995","day":10,"month":11,"year":1995},"checking":true,"checkType":"supervisor","applicationReference":" 20260823 211136 N0431","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N349236056","startDate":{"display":"10 October 2025","day":10,"month":9,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"9 October 2035","day":9,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07075 928 341"},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"470 303 6508","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"16 August 1992","day":16,"month":7,"year":1992},"checking":false,"applicationReference":" 20260821 014452 N0643","certificateReference":"73 460 673 473","channel":"Paper","imageReference":"2026 08 25 10 21 53N700962121","startDate":{"display":"18 November 2025","day":18,"month":10,"year":2025},"dueDate":{"display":"22 October 2025","day":22,"month":9,"year":2025},"endDate":{"display":"17 November 2026","day":17,"month":10,"year":2026},"childsDOB":{"display":"18 November 2025","day":18,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07084 372 659","emailAddress":"d.hall@blueyonder.co.uk"},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"185 305 7732","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"expired","dateOfBirth":{"display":"16 July 1993","day":16,"month":6,"year":1993},"checking":false,"applicationReference":" 20260822 034610 N0684","certificateReference":"89 426 790 132","channel":"Paper","imageReference":"2026 08 25 10 21 53N588408378","startDate":{"display":"31 January 2026","day":31,"month":0,"year":2026},"dueDate":{"display":"30 August 2025","day":30,"month":7,"year":2025},"endDate":{"display":"30 January 2027","day":30,"month":0,"year":2027},"childsDOB":{"display":"31 January 2026","day":31,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07091 837 426"},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"108 437 8457","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"21 July 1987","day":21,"month":6,"year":1987},"checking":false,"applicationReference":" 20260825 094337 N0880","certificateReference":"HRT ISMT H24U","channel":"Digital","startDate":{"display":"20 October 2025","day":20,"month":9,"year":2025},"endDate":{"display":"19 October 2026","day":19,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 385 927","emailAddress":"phoebe.allen@googlemail.com"},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"482 767 3832","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","checking":true,"checkType":"quality","dateOfBirth":{"display":"8 October 1996","day":8,"month":9,"year":1996},"applicationReference":" 20260819 183239 N0477","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N616656671","startDate":{"display":"10 September 2025","day":10,"month":8,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"9 September 2035","day":9,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07027 639 485","emailAddress":"s.young@blueyonder.co.uk"},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"102 011 7359","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"2 October 1977","day":2,"month":9,"year":1977},"checking":false,"applicationReference":" 20260821 102259 N0855","certificateReference":"HRT 2M60 QYKE","channel":"Digital","startDate":{"display":"15 January 2026","day":15,"month":0,"year":2026},"endDate":{"display":"14 January 2027","day":14,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07035 821 749","emailAddress":"h.king@aol.com"},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"622 743 2878","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"processing","dateOfBirth":{"display":"10 March 1992","day":10,"month":2,"year":1992},"checking":false,"applicationReference":" 20260820 064917 N0092","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N994950892","startDate":{"display":"9 September 2025","day":9,"month":8,"year":2025},"dueDate":{"display":"1 February 2026","day":1,"month":1,"year":2026},"endDate":{"display":"8 September 2026","day":8,"month":8,"year":2026},"childsDOB":{"display":"9 September 2025","day":9,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07048 952 613","emailAddress":"millie.wright@blueyonder.co.uk"},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"313 862 1403","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"27 June 2000","day":27,"month":5,"year":2000},"checking":true,"checkType":"quality","applicationReference":" 20260824 080803 N0935","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N879490995","startDate":{"display":"28 August 2025","day":28,"month":7,"year":2025},"dueDate":{"display":"7 February 2026","day":7,"month":1,"year":2026},"endDate":{"display":"27 August 2026","day":27,"month":7,"year":2026},"childsDOB":{"display":"28 August 2025","day":28,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07052 719 384"},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"218 629 4516","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"22 May 1982","day":22,"month":4,"year":1982},"checking":false,"applicationReference":" 20260823 173310 N0866","certificateReference":"86 335 257 799","channel":"Digital","startDate":{"display":"18 September 2025","day":18,"month":8,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"17 September 2035","day":17,"month":8,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07064 837 295","emailAddress":"poppy.baker368@aol.com"},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"513 844 6115","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"27 May 1991","day":27,"month":4,"year":1991},"checking":false,"applicationReference":" 20260823 204208 N0266","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N984922717","startDate":{"display":"14 January 2026","day":14,"month":0,"year":2026},"dueDate":{"display":"15 October 2025","day":15,"month":9,"year":2025},"endDate":{"display":"13 January 2027","day":13,"month":0,"year":2027},"childsDOB":{"display":"14 January 2026","day":14,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07073 491 826"},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"676 405 8853","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"12 January 1991","day":12,"month":0,"year":1991},"checking":true,"checkType":"supervisor","applicationReference":" 20260819 181143 N0874","certificateReference":"54 236 499 222","channel":"Paper","imageReference":"2026 08 25 10 21 53N422279166","startDate":{"display":"27 October 2025","day":27,"month":9,"year":2025},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"26 October 2035","day":26,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07085 623 941","emailAddress":"mitchell.c@aol.com"},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"964 220 4522","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"23 February 1983","day":23,"month":1,"year":1983},"checking":false,"applicationReference":" 20260824 143534 N0468","certificateReference":"38 000 313 091","channel":"Digital","startDate":{"display":"18 September 2025","day":18,"month":8,"year":2025},"medicalCondition":["(2) Epilepsy","(5) Hypoparathyroidism"],"endDate":{"display":"17 September 2035","day":17,"month":8,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07096 718 235","emailAddress":"s.turner992@gmail.com"},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"725 989 7385","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"8 December 1986","day":8,"month":11,"year":1986},"checking":true,"checkType":"quality","applicationReference":" 20260823 213040 N0563","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N528998034","startDate":{"display":"10 November 2025","day":10,"month":10,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"9 November 2035","day":9,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07018 273 945","emailAddress":"w.carter@outlook.com"},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"881 406 0815","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"12 August 1989","day":12,"month":7,"year":1989},"checking":false,"applicationReference":" 20260823 063657 N0163","certificateReference":"87 306 106 389","channel":"Digital","startDate":{"display":"3 September 2025","day":3,"month":8,"year":2025},"dueDate":{"display":"3 December 2025","day":3,"month":11,"year":2025},"endDate":{"display":"2 September 2026","day":2,"month":8,"year":2026},"childsDOB":{"display":"3 September 2025","day":3,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07029 384 756","emailAddress":"j.morris@gmail.com"},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"026 001 2574","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"16 August 1980","day":16,"month":7,"year":1980},"applicationReference":" 20260823 044951 N0908","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N891753073","startDate":{"display":"4 October 2025","day":4,"month":9,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"3 October 2035","day":3,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07031 572 948"},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"666 083 1678","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"3 May 1998","day":3,"month":4,"year":1998},"checking":false,"applicationReference":" 20260821 230109 N0096","certificateReference":"24 400 236 364","channel":"Paper","imageReference":"2026 08 25 10 21 53N919056434","startDate":{"display":"31 October 2025","day":31,"month":9,"year":2025},"dueDate":{"display":"20 October 2025","day":20,"month":9,"year":2025},"endDate":{"display":"30 October 2026","day":30,"month":9,"year":2026},"childsDOB":{"display":"31 October 2025","day":31,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07042 619 583","emailAddress":"e.ward652@gmail.com"},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"241 211 8792","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"27 December 1978","day":27,"month":11,"year":1978},"applicationReference":" 20260825 063531 N0456","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N023324997","startDate":{"display":"14 February 2026","day":14,"month":1,"year":2026},"medicalCondition":["(6) Diabetes insipidus","(8) Myasthenia gravis"],"endDate":{"display":"13 February 2036","day":13,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07053 847 261","emailAddress":"rosie.price@googlemail.com"},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"034 508 9718","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"26 November 1990","day":26,"month":10,"year":1990},"checking":false,"applicationReference":" 20260825 085141 N0419","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N610915799","startDate":{"display":"16 October 2025","day":16,"month":9,"year":2025},"dueDate":{"display":"7 December 2025","day":7,"month":11,"year":2025},"endDate":{"display":"15 October 2026","day":15,"month":9,"year":2026},"childsDOB":{"display":"16 October 2025","day":16,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07064 928 137","emailAddress":"a.cooper285@googlemail.com"},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"410 749 4774","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"2 July 1980","day":2,"month":6,"year":1980},"applicationReference":" 20260824 201039 N0554","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N686826692","startDate":{"display":"5 November 2025","day":5,"month":10,"year":2025},"medicalCondition":["(3) Diabetes mellitus","(10) Cancer"],"endDate":{"display":"4 November 2035","day":4,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07075 283 916","emailAddress":"l.bailey387@blueyonder.co.uk"},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"977 172 6496","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"28 May 1971","day":28,"month":4,"year":1971},"checking":false,"applicationReference":" 20260820 195940 N0477","certificateReference":"20 342 688 690","channel":"Digital","startDate":{"display":"23 December 2025","day":23,"month":11,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"22 December 2035","day":22,"month":11,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07086 419 375","emailAddress":"l.parker@googlemail.com"},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"382 839 5504","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"3 January 1992","day":3,"month":0,"year":1992},"applicationReference":" 20260819 083836 N0583","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N023731867","startDate":{"display":"6 January 2026","day":6,"month":0,"year":2026},"medicalCondition":["(1) Permanent fistula","(4) Myxoedema","(9) Continuing physical disability"],"endDate":{"display":"5 January 2036","day":5,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07097 531 284","emailAddress":"h.phillips@blueyonder.co.uk"},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"409 735 4942","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"20 October 1980","day":20,"month":9,"year":1980},"checking":true,"checkType":"supervisor","applicationReference":" 20260823 194437 N0839","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N589591319","startDate":{"display":"20 January 2026","day":20,"month":0,"year":2026},"medicalCondition":["(5) Hypoparathyroidism","(7) Forms of hypoadrenalism","(8) Myasthenia gravis"],"endDate":{"display":"19 January 2036","day":19,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07018 642 597","emailAddress":"Bennett363@hotmail.com"},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"321 592 5648","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"12 February 1969","day":12,"month":1,"year":1969},"checking":false,"applicationReference":" 20260825 083746 N0864","certificateReference":"HRT G575 37I3","channel":"Digital","startDate":{"display":"31 August 2025","day":31,"month":7,"year":2025},"endDate":{"display":"30 August 2026","day":30,"month":7,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07029 753 861","emailAddress":"cox.f@aol.com"},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"895 670 5300","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"24 May 2004","day":24,"month":4,"year":2004},"checking":false,"applicationReference":" 20260825 041246 N0968","certificateReference":"33 115 713 455","channel":"Digital","startDate":{"display":"5 December 2025","day":5,"month":11,"year":2025},"dueDate":{"display":"21 October 2025","day":21,"month":9,"year":2025},"endDate":{"display":"4 December 2026","day":4,"month":11,"year":2026},"childsDOB":{"display":"5 December 2025","day":5,"month":11,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07031 864 729","emailAddress":"m.richardson971@blueyonder.co.uk"},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"908 192 4416","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"22 May 1978","day":22,"month":4,"year":1978},"checking":true,"checkType":"supervisor","applicationReference":" 20260821 095808 N0278","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N136650012","startDate":{"display":"11 October 2025","day":11,"month":9,"year":2025},"medicalCondition":["(4) Myxoedema","(7) Forms of hypoadrenalism","(8) Myasthenia gravis"],"endDate":{"display":"10 October 2035","day":10,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07042 987 513","emailAddress":"e.gray184@gmail.com"},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"137 833 9791","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"27 May 2005","day":27,"month":4,"year":2005},"checking":false,"applicationReference":" 20260820 122727 N0897","certificateReference":"89 456 334 207","channel":"Paper","imageReference":"2026 08 25 10 21 53N044151315","startDate":{"display":"19 October 2025","day":19,"month":9,"year":2025},"dueDate":{"display":"11 November 2025","day":11,"month":10,"year":2025},"endDate":{"display":"18 October 2026","day":18,"month":9,"year":2026},"childsDOB":{"display":"19 October 2025","day":19,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07054 129 876","emailAddress":"i.ross@blueyonder.co.uk"},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"794 001 8789","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"7 April 1993","day":7,"month":3,"year":1993},"checking":false,"applicationReference":" 20260822 161702 N0297","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N345170356","startDate":{"display":"26 November 2025","day":26,"month":10,"year":2025},"dueDate":{"display":"24 October 2025","day":24,"month":9,"year":2025},"endDate":{"display":"25 November 2026","day":25,"month":10,"year":2026},"childsDOB":{"display":"26 November 2025","day":26,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07065 238 741","emailAddress":"Bell697@hotmail.com"},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"454 194 2770","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"25 June 1978","day":25,"month":5,"year":1978},"checking":false,"applicationReference":" 20260824 142205 N0360","certificateReference":"HRT DTS8 G5YC","channel":"Digital","startDate":{"display":"21 January 2026","day":21,"month":0,"year":2026},"endDate":{"display":"20 January 2027","day":20,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07076 391 825","emailAddress":"e.cook@hotmail.com"},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"351 888 0955","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"28 November 1996","day":28,"month":10,"year":1996},"checking":false,"applicationReference":" 20260820 024216 N0527","certificateReference":"29 558 938 954","channel":"Paper","imageReference":"2026 08 25 10 21 53N768050264","startDate":{"display":"25 August 2025","day":25,"month":7,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"24 August 2035","day":24,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07087 512 936","emailAddress":"t.watson@googlemail.com"},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"614 428 6822","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"15 September 1975","day":15,"month":8,"year":1975},"checking":false,"applicationReference":" 20260819 012753 N0865","certificateReference":"02 392 788 698","channel":"Digital","startDate":{"display":"21 January 2026","day":21,"month":0,"year":2026},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"20 January 2036","day":20,"month":0,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07098 631 427","emailAddress":"alice.sanders@hotmail.com"},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"617 131 1280","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"22 February 1994","day":22,"month":1,"year":1994},"applicationReference":" 20260824 005507 N0136","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N353722425","startDate":{"display":"3 January 2026","day":3,"month":0,"year":2026},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"2 January 2036","day":2,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07019 742 835","emailAddress":"e.harrison@hotmail.com"},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"857 254 9724","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"6 April 1980","day":6,"month":3,"year":1980},"checking":false,"applicationReference":" 20260825 062455 N0914","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N040649852","startDate":{"display":"23 November 2025","day":23,"month":10,"year":2025},"medicalCondition":["(4) Myxoedema","(6) Diabetes insipidus","(7) Forms of hypoadrenalism"],"endDate":{"display":"22 November 2035","day":22,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07020 853 749","emailAddress":"l.coleman@gmail.com"},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"105 299 5702","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"22 April 1994","day":22,"month":3,"year":1994},"checking":true,"checkType":"supervisor","applicationReference":" 20260823 034435 N0185","certificateReference":"06 819 523 789","channel":"Paper","imageReference":"2026 08 25 10 21 53N320062059","startDate":{"display":"25 November 2025","day":25,"month":10,"year":2025},"dueDate":{"display":"29 August 2025","day":29,"month":7,"year":2025},"endDate":{"display":"24 November 2026","day":24,"month":10,"year":2026},"childsDOB":{"display":"25 November 2025","day":25,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07031 984 625","emailAddress":"amber.murphy@googlemail.com"},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"914 034 8114","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"24 January 1966","day":24,"month":0,"year":1966},"checking":false,"applicationReference":" 20260823 211731 N0753","certificateReference":"87 755 176 410","channel":"Digital","startDate":{"display":"26 November 2025","day":26,"month":10,"year":2025},"medicalCondition":["(1) Permanent fistula","(6) Diabetes insipidus","(7) Forms of hypoadrenalism"],"endDate":{"display":"25 November 2035","day":25,"month":10,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07042 195 783","emailAddress":"s.graham535@gmail.com"},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"749 030 1667","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"12 February 1995","day":12,"month":1,"year":1995},"checking":false,"applicationReference":" 20260825 060850 N0282","certificateReference":"HRT IUPH AXVK","channel":"Digital","startDate":{"display":"13 November 2025","day":13,"month":10,"year":2025},"endDate":{"display":"12 November 2026","day":12,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07053 268 917","emailAddress":"stevens.b@aol.com"},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"733 775 5805","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"5 July 1994","day":5,"month":6,"year":1994},"checking":false,"applicationReference":" 20260822 073916 N0556","certificateReference":"HRT TTV6 JDD0","channel":"Digital","startDate":{"display":"17 January 2026","day":17,"month":0,"year":2026},"endDate":{"display":"16 January 2027","day":16,"month":0,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07064 371 528","emailAddress":"imogen.simpson@aol.com"},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"613 604 9320","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"17 May 1975","day":17,"month":4,"year":1975},"checking":false,"applicationReference":" 20260823 041829 N0117","certificateReference":"HRT 045B RMCG","channel":"Digital","startDate":{"display":"24 November 2025","day":24,"month":10,"year":2025},"endDate":{"display":"23 November 2026","day":23,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07075 482 936","emailAddress":"h.butler@blueyonder.co.uk"},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"715 441 3894","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"10 October 1998","day":10,"month":9,"year":1998},"checking":false,"applicationReference":" 20260818 160758 N0986","certificateReference":"36 072 057 414","channel":"Paper","imageReference":"2026 08 25 10 21 53N682211181","startDate":{"display":"15 February 2026","day":15,"month":1,"year":2026},"dueDate":{"display":"11 October 2025","day":11,"month":9,"year":2025},"endDate":{"display":"14 February 2027","day":14,"month":1,"year":2027},"childsDOB":{"display":"15 February 2026","day":15,"month":1,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07086 593 147","emailAddress":"Chapman289@blueyonder.co.uk"},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"675 013 4947","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"10 May 1978","day":10,"month":4,"year":1978},"checking":true,"checkType":"supervisor","applicationReference":" 20260824 101355 N0396","certificateReference":"38 849 085 038","channel":"Paper","imageReference":"2026 08 25 10 21 53N291620088","startDate":{"display":"17 September 2025","day":17,"month":8,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"16 September 2035","day":16,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07097 614 258","emailAddress":"a.ali@blueyonder.co.uk"},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"992 201 9062","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"18 January 1968","day":18,"month":0,"year":1968},"checking":false,"applicationReference":" 20260820 110807 N0803","certificateReference":"94 511 366 527","channel":"Digital","startDate":{"display":"13 November 2025","day":13,"month":10,"year":2025},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"12 November 2035","day":12,"month":10,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07018 725 369","emailAddress":"hussain.s@blueyonder.co.uk"},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"716 944 0035","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"processing","dateOfBirth":{"display":"9 April 1991","day":9,"month":3,"year":1991},"checking":false,"applicationReference":" 20260819 150012 N0042","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N526379455","startDate":{"display":"15 December 2025","day":15,"month":11,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"14 December 2035","day":14,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07029 836 471","emailAddress":"Khan182@googlemail.com"},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"917 928 6363","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"10 August 1994","day":10,"month":7,"year":1994},"applicationReference":" 20260820 112106 N0869","certificateReference":"06 518 115 365","channel":"Paper","imageReference":"2026 08 25 10 21 53N499556448","startDate":{"display":"16 February 2026","day":16,"month":1,"year":2026},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"15 February 2036","day":15,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07030 947 582","emailAddress":"leah.begum@hotmail.com"},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"014 959 5343","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"15 May 1966","day":15,"month":4,"year":1966},"checking":true,"checkType":"supervisor","applicationReference":" 20260819 153437 N0144","certificateReference":"15 157 324 621","channel":"Paper","imageReference":"2026 08 25 10 21 53N074922634","startDate":{"display":"19 October 2025","day":19,"month":9,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"18 October 2035","day":18,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07042 058 693"},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"545 108 2986","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"6 November 2002","day":6,"month":10,"year":2002},"checking":false,"applicationReference":" 20260818 144051 N0656","certificateReference":"82 038 154 466","channel":"Digital","startDate":{"display":"13 November 2025","day":13,"month":10,"year":2025},"dueDate":{"display":"12 January 2026","day":12,"month":0,"year":2026},"endDate":{"display":"12 November 2026","day":12,"month":10,"year":2026},"childsDOB":{"display":"13 November 2025","day":13,"month":10,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07053 169 784","emailAddress":"aoife.kelly868@hotmail.com"},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"513 414 5110","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"13 August 1967","day":13,"month":7,"year":1967},"checking":false,"applicationReference":" 20260824 013752 N0254","certificateReference":"HRT KFSW V7WO","channel":"Digital","startDate":{"display":"7 December 2025","day":7,"month":11,"year":2025},"endDate":{"display":"6 December 2026","day":6,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07064 271 895","emailAddress":"erin.mccarthy@outlook.com"},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"074 507 6005","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"10 September 1990","day":10,"month":8,"year":1990},"checking":false,"applicationReference":" 20260820 051610 N0573","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N715699387","startDate":{"display":"8 October 2025","day":8,"month":9,"year":2025},"dueDate":{"display":"18 September 2025","day":18,"month":8,"year":2025},"endDate":{"display":"7 October 2026","day":7,"month":9,"year":2026},"childsDOB":{"display":"8 October 2025","day":8,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07075 382 916"},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"779 870 7910","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"22 December 1987","day":22,"month":11,"year":1987},"checking":true,"checkType":"supervisor","applicationReference":" 20260818 102444 N0031","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N326456590","startDate":{"display":"3 November 2025","day":3,"month":10,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"2 November 2035","day":2,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07086 493 127","emailAddress":"c.griffiths@blueyonder.co.uk"},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"798 907 1597","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"2 April 1986","day":2,"month":3,"year":1986},"checking":false,"applicationReference":" 20260819 001542 N0570","certificateReference":"52 807 830 009","channel":"Paper","imageReference":"2026 08 25 10 21 53N540987812","startDate":{"display":"14 February 2026","day":14,"month":1,"year":2026},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"13 February 2036","day":13,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07097 514 238","emailAddress":"megan.rees@aol.com"},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"929 513 9186","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"19 June 2003","day":19,"month":5,"year":2003},"checking":false,"applicationReference":" 20260818 114101 N0924","certificateReference":"87 798 459 444","channel":"Paper","imageReference":"2026 08 25 10 21 53N714089712","startDate":{"display":"11 January 2026","day":11,"month":0,"year":2026},"dueDate":{"display":"27 January 2026","day":27,"month":0,"year":2026},"endDate":{"display":"10 January 2027","day":10,"month":0,"year":2027},"childsDOB":{"display":"11 January 2026","day":11,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07018 625 349","emailAddress":"f.evans@hotmail.com"},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"963 600 4190","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"15 September 1976","day":15,"month":8,"year":1976},"checking":true,"checkType":"supervisor","applicationReference":" 20260823 201453 N0414","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N458333099","startDate":{"display":"17 September 2025","day":17,"month":8,"year":2025},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"16 September 2035","day":16,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07029 736 458","emailAddress":"macdonald.e@gmail.com"},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"474 581 4346","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"23 July 1993","day":23,"month":6,"year":1993},"checking":false,"applicationReference":" 20260823 113154 N0268","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N652636018","startDate":{"display":"5 February 2026","day":5,"month":1,"year":2026},"medicalCondition":["(5) Hypoparathyroidism","(6) Diabetes insipidus","(8) Myasthenia gravis"],"endDate":{"display":"4 February 2036","day":4,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07030 847 569","emailAddress":"Fraser726@blueyonder.co.uk"},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"587 463 5240","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"28 August 2004","day":28,"month":7,"year":2004},"checking":true,"checkType":"supervisor","applicationReference":" 20260818 122813 N0675","certificateReference":"06 710 820 628","channel":"Paper","imageReference":"2026 08 25 10 21 53N494954977","startDate":{"display":"4 November 2025","day":4,"month":10,"year":2025},"dueDate":{"display":"28 December 2025","day":28,"month":11,"year":2025},"endDate":{"display":"3 November 2026","day":3,"month":10,"year":2026},"childsDOB":{"display":"4 November 2025","day":4,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07041 958 672","emailAddress":"maisie.armstrong@aol.com"},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"091 584 9408","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"27 October 1991","day":27,"month":9,"year":1991},"applicationReference":" 20260824 015838 N0014","certificateReference":"42 962 769 212","channel":"Paper","imageReference":"2026 08 25 10 21 53N387931775","startDate":{"display":"15 February 2026","day":15,"month":1,"year":2026},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"14 February 2036","day":14,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07052 069 783","emailAddress":"penelope.hunter@googlemail.com"},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"620 013 8466","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"4 October 2002","day":4,"month":9,"year":2002},"checking":false,"applicationReference":" 20260823 132435 N0610","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N896883983","startDate":{"display":"1 December 2025","day":1,"month":11,"year":2025},"dueDate":{"display":"5 October 2025","day":5,"month":9,"year":2025},"endDate":{"display":"30 November 2026","day":30,"month":10,"year":2026},"childsDOB":{"display":"1 December 2025","day":1,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07063 171 894","emailAddress":"clara.lawrence406@outlook.com"},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"766 481 3787","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"5 December 1995","day":5,"month":11,"year":1995},"applicationReference":" 20260822 175941 N0924","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N490153019","startDate":{"display":"27 January 2026","day":27,"month":0,"year":2026},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"26 January 2036","day":26,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07074 282 915","emailAddress":"b.spencer@outlook.com"},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"742 971 8853","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"12 January 1980","day":12,"month":0,"year":1980},"checking":false,"applicationReference":" 20260819 203341 N0617","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N309057793","startDate":{"display":"6 December 2025","day":6,"month":11,"year":2025},"medicalCondition":["(1) Permanent fistula","(6) Diabetes insipidus"],"endDate":{"display":"5 December 2035","day":5,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07085 393 126"},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"796 691 2719","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"20 February 2005","day":20,"month":1,"year":2005},"applicationReference":" 20260823 055401 N0118","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N442753142","startDate":{"display":"7 September 2025","day":7,"month":8,"year":2025},"dueDate":{"display":"19 January 2026","day":19,"month":0,"year":2026},"endDate":{"display":"6 September 2026","day":6,"month":8,"year":2026},"childsDOB":{"display":"7 September 2025","day":7,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07096 414 237","emailAddress":"watts.a@hotmail.com"},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"850 333 3032","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"25 June 1984","day":25,"month":5,"year":1984},"applicationReference":" 20260820 211042 N0471","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N439350294","startDate":{"display":"18 September 2025","day":18,"month":8,"year":2025},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"17 September 2035","day":17,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07017 525 348"},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"737 193 5697","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"5 January 1999","day":5,"month":0,"year":1999},"applicationReference":" 20260819 191357 N0376","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N763145832","startDate":{"display":"23 September 2025","day":23,"month":8,"year":2025},"dueDate":{"display":"23 September 2025","day":23,"month":8,"year":2025},"endDate":{"display":"22 September 2026","day":22,"month":8,"year":2026},"childsDOB":{"display":"23 September 2025","day":23,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07028 636 459","emailAddress":"rose.palmer@hotmail.com"},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"446 176 5577","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"7 May 1989","day":7,"month":4,"year":1989},"checking":true,"checkType":"supervisor","applicationReference":" 20260822 205429 N0457","certificateReference":"19 369 365 243","channel":"Paper","imageReference":"2026 08 25 10 21 53N417561030","startDate":{"display":"3 September 2025","day":3,"month":8,"year":2025},"dueDate":{"display":"26 January 2026","day":26,"month":0,"year":2026},"endDate":{"display":"2 September 2026","day":2,"month":8,"year":2026},"childsDOB":{"display":"3 September 2025","day":3,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07039 747 561","emailAddress":"lara.nicholson@hotmail.com"},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"345 094 3558","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"18 May 2006","day":18,"month":4,"year":2006},"checking":false,"applicationReference":" 20260821 084620 N0081","certificateReference":"12 373 393 438","channel":"Paper","imageReference":"2026 08 25 10 21 53N639319601","startDate":{"display":"20 November 2025","day":20,"month":10,"year":2025},"dueDate":{"display":"2 November 2025","day":2,"month":10,"year":2025},"endDate":{"display":"19 November 2026","day":19,"month":10,"year":2026},"childsDOB":{"display":"20 November 2025","day":20,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07040 858 673","emailAddress":"gardner.j@aol.com"},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"938 246 2008","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"22 January 1996","day":22,"month":0,"year":1996},"checking":true,"checkType":"supervisor","applicationReference":" 20260824 005524 N0559","certificateReference":"39 266 771 668","channel":"Paper","imageReference":"2026 08 25 10 21 53N585117887","startDate":{"display":"8 December 2025","day":8,"month":11,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"7 December 2035","day":7,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07051 969 782","emailAddress":"ada.newton@gmail.com"},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"761 411 5557","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"22 October 2004","day":22,"month":9,"year":2004},"checking":false,"applicationReference":" 20260822 095404 N0210","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N592524696","startDate":{"display":"30 August 2025","day":30,"month":7,"year":2025},"dueDate":{"display":"10 September 2025","day":10,"month":8,"year":2025},"endDate":{"display":"29 August 2026","day":29,"month":7,"year":2026},"childsDOB":{"display":"30 August 2025","day":30,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07062 071 893","emailAddress":"Reed610@outlook.com"},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"888 184 2385","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"24 February 1975","day":24,"month":1,"year":1975},"applicationReference":" 20260819 222526 N0133","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N103788278","startDate":{"display":"5 November 2025","day":5,"month":10,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"4 November 2035","day":4,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07073 182 914"},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"222 686 9852","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"5 December 1989","day":5,"month":11,"year":1989},"checking":false,"applicationReference":" 20260819 002329 N0163","certificateReference":"80 512 138 089","channel":"Digital","startDate":{"display":"15 February 2026","day":15,"month":1,"year":2026},"medicalCondition":["(1) Permanent fistula","(7) Forms of hypoadrenalism","(9) Continuing physical disability"],"endDate":{"display":"14 February 2036","day":14,"month":1,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07084 293 125","emailAddress":"m.fernandez@googlemail.com"},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"133 542 8040","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"2 October 1970","day":2,"month":9,"year":1970},"checking":false,"applicationReference":" 20260819 002354 N0520","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N856317998","startDate":{"display":"11 November 2025","day":11,"month":10,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"10 November 2035","day":10,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07095 314 236","emailAddress":"Silva444@gmail.com"},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"982 462 8385","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"28 September 1981","day":28,"month":8,"year":1981},"checking":false,"applicationReference":" 20260820 120445 N0944","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N362425839","startDate":{"display":"10 October 2025","day":10,"month":9,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"9 October 2035","day":9,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07016 425 347","emailAddress":"patel.l@blueyonder.co.uk"},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"146 011 5756","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"28 June 1992","day":28,"month":5,"year":1992},"checking":true,"checkType":"supervisor","applicationReference":" 20260825 072916 N0153","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N467350691","startDate":{"display":"30 October 2025","day":30,"month":9,"year":2025},"dueDate":{"display":"21 December 2025","day":21,"month":11,"year":2025},"endDate":{"display":"29 October 2026","day":29,"month":9,"year":2026},"childsDOB":{"display":"30 October 2025","day":30,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07027 536 458","emailAddress":"Iqbal379@gmail.com"},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"067 873 0237","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","checking":false,"checkType":"quality","dateOfBirth":{"display":"13 September 1993","day":13,"month":8,"year":1993},"applicationReference":" 20260824 005558 N0046","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N100453639","startDate":{"display":"14 October 2025","day":14,"month":9,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"13 October 2035","day":13,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07038 647 569"},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"337 525 1501","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"22 September 1976","day":22,"month":8,"year":1976},"applicationReference":" 20260821 002107 N0001","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N282279161","startDate":{"display":"12 January 2026","day":12,"month":0,"year":2026},"medicalCondition":["(2) Epilepsy","(3) Diabetes mellitus","(5) Hypoparathyroidism"],"endDate":{"display":"11 January 2036","day":11,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07049 758 671","emailAddress":"Rashid379@aol.com"},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"490 968 8935","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"9 January 1978","day":9,"month":0,"year":1978},"applicationReference":" 20260823 064309 N0373","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N283228079","startDate":{"display":"7 November 2025","day":7,"month":10,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"6 November 2035","day":6,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07050 869 782"},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"215 270 1884","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"22 June 2001","day":22,"month":5,"year":2001},"checking":false,"applicationReference":" 20260823 042905 N0561","certificateReference":"75 403 396 099","channel":"Digital","startDate":{"display":"22 December 2025","day":22,"month":11,"year":2025},"dueDate":{"display":"8 September 2025","day":8,"month":8,"year":2025},"endDate":{"display":"21 December 2026","day":21,"month":11,"year":2026},"childsDOB":{"display":"22 December 2025","day":22,"month":11,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07061 971 893","emailAddress":"bethany.foster@gmail.com"},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"228 395 3970","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"21 September 1982","day":21,"month":8,"year":1982},"checking":true,"checkType":"supervisor","applicationReference":" 20260818 201637 N0457","certificateReference":"49 185 739 704","channel":"Paper","imageReference":"2026 08 25 10 21 53N270650595","startDate":{"display":"25 November 2025","day":25,"month":10,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"24 November 2035","day":24,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07072 082 914","emailAddress":"l.fox@googlemail.com"},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"655 959 8273","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"21 December 1994","day":21,"month":11,"year":1994},"applicationReference":" 20260824 144610 N0806","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N375166532","startDate":{"display":"6 September 2025","day":6,"month":8,"year":2025},"medicalCondition":["(1) Permanent fistula","(7) Forms of hypoadrenalism"],"endDate":{"display":"5 September 2035","day":5,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07083 193 125"},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"581 788 1236","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"9 December 1998","day":9,"month":11,"year":1998},"checking":false,"applicationReference":" 20260818 212152 N0896","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N506670093","startDate":{"display":"4 January 2026","day":4,"month":0,"year":2026},"dueDate":{"display":"1 September 2025","day":1,"month":8,"year":2025},"endDate":{"display":"3 January 2027","day":3,"month":0,"year":2027},"childsDOB":{"display":"4 January 2026","day":4,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07094 214 236"},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"353 345 6199","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"22 November 1981","day":22,"month":10,"year":1981},"applicationReference":" 20260819 062748 N0647","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N890051873","startDate":{"display":"2 December 2025","day":2,"month":11,"year":2025},"medicalCondition":["(2) Epilepsy","(7) Forms of hypoadrenalism"],"endDate":{"display":"1 December 2035","day":1,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07015 325 347","emailAddress":"west.e@hotmail.com"},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"218 797 1596","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"1 April 2008","day":1,"month":3,"year":2008},"checking":false,"applicationReference":" 20260823 121247 N0967","certificateReference":"77 617 277 479","channel":"Digital","startDate":{"display":"6 October 2025","day":6,"month":9,"year":2025},"dueDate":{"display":"25 September 2025","day":25,"month":8,"year":2025},"endDate":{"display":"5 October 2026","day":5,"month":9,"year":2026},"childsDOB":{"display":"6 October 2025","day":6,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07026 436 458","emailAddress":"r.matthews@googlemail.com"},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"066 361 7651","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"3 February 1979","day":3,"month":1,"year":1979},"applicationReference":" 20260819 081410 N0339","certificateReference":"80 356 892 998","channel":"Paper","imageReference":"2026 08 25 10 21 53N006341978","startDate":{"display":"5 February 2026","day":5,"month":1,"year":2026},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"4 February 2036","day":4,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07037 547 569","emailAddress":"k.holmes675@googlemail.com"},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"383 105 3365","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"20 November 1996","day":20,"month":10,"year":1996},"applicationReference":" 20260825 015045 N0407","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N208093596","startDate":{"display":"25 August 2025","day":25,"month":7,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"24 August 2035","day":24,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07048 658 671","emailAddress":"walsh.l@aol.com"},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"119 901 4724","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"1 February 1990","day":1,"month":1,"year":1990},"checking":false,"applicationReference":" 20260818 233224 N0252","certificateReference":"01 813 950 391","channel":"Digital","startDate":{"display":"14 November 2025","day":14,"month":10,"year":2025},"dueDate":{"display":"15 November 2025","day":15,"month":10,"year":2025},"endDate":{"display":"13 November 2026","day":13,"month":10,"year":2026},"childsDOB":{"display":"14 November 2025","day":14,"month":10,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07059 769 782","emailAddress":"a.page@blueyonder.co.uk"},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"970 828 0789","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"19 May 1980","day":19,"month":4,"year":1980},"checking":true,"checkType":"supervisor","applicationReference":" 20260823 223711 N0269","certificateReference":"89 960 103 091","channel":"Paper","imageReference":"2026 08 25 10 21 53N700509742","startDate":{"display":"2 September 2025","day":2,"month":8,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"1 September 2035","day":1,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07060 871 893","emailAddress":"Jordan151@outlook.com"},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"989 196 4913","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"3 January 2004","day":3,"month":0,"year":2004},"checking":false,"applicationReference":" 20260825 072720 N0962","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N826170606","startDate":{"display":"25 August 2025","day":25,"month":7,"year":2025},"dueDate":{"display":"21 January 2026","day":21,"month":0,"year":2026},"endDate":{"display":"24 August 2026","day":24,"month":7,"year":2026},"childsDOB":{"display":"25 August 2025","day":25,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07071 982 914","emailAddress":"beth.barrett@blueyonder.co.uk"},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"832 795 9823","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"26 October 2001","day":26,"month":9,"year":2001},"applicationReference":" 20260818 233656 N0345","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N584272556","startDate":{"display":"23 November 2025","day":23,"month":10,"year":2025},"dueDate":{"display":"15 November 2025","day":15,"month":10,"year":2025},"endDate":{"display":"22 November 2026","day":22,"month":10,"year":2026},"childsDOB":{"display":"23 November 2025","day":23,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07082 093 125","emailAddress":"Hayes262@googlemail.com"},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"168 582 2694","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"23 March 1972","day":23,"month":2,"year":1972},"checking":false,"applicationReference":" 20260824 123420 N0909","certificateReference":"HRT UIA5 7O3E","channel":"Digital","startDate":{"display":"31 October 2025","day":31,"month":9,"year":2025},"endDate":{"display":"30 October 2026","day":30,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07093 114 236","emailAddress":"cunningham.f@outlook.com"},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"422 322 9168","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"13 March 1992","day":13,"month":2,"year":1992},"checking":false,"applicationReference":" 20260824 011138 N0419","certificateReference":"HRT 6DUH CNG0","channel":"Digital","startDate":{"display":"26 October 2025","day":26,"month":9,"year":2025},"endDate":{"display":"25 October 2026","day":25,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07014 225 347","emailAddress":"barber.a@gmail.com"},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"657 052 3141","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"15 August 1989","day":15,"month":7,"year":1989},"checking":true,"checkType":"supervisor","applicationReference":" 20260820 122949 N0309","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N815839610","startDate":{"display":"16 February 2026","day":16,"month":1,"year":2026},"medicalCondition":["(4) Myxoedema","(6) Diabetes insipidus","(7) Forms of hypoadrenalism"],"endDate":{"display":"15 February 2036","day":15,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07025 336 458","emailAddress":"lucia.knight@googlemail.com"},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"896 411 3859","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"13 July 1969","day":13,"month":6,"year":1969},"checking":false,"applicationReference":" 20260818 132139 N0151","certificateReference":"84 207 939 252","channel":"Digital","startDate":{"display":"19 February 2026","day":19,"month":1,"year":2026},"medicalCondition":["(1) Permanent fistula","(4) Myxoedema","(5) Hypoparathyroidism"],"endDate":{"display":"18 February 2036","day":18,"month":1,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07036 447 569","emailAddress":"Parsons629@hotmail.com"},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"532 226 6999","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"17 November 2002","day":17,"month":10,"year":2002},"checking":false,"applicationReference":" 20260822 152806 N0240","certificateReference":"22 477 782 571","channel":"Digital","startDate":{"display":"9 January 2026","day":9,"month":0,"year":2026},"dueDate":{"display":"15 December 2025","day":15,"month":11,"year":2025},"endDate":{"display":"8 January 2027","day":8,"month":0,"year":2027},"childsDOB":{"display":"9 January 2026","day":9,"month":0,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07047 558 671","emailAddress":"Bates861@hotmail.com"},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"515 697 7739","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"11 November 1990","day":11,"month":10,"year":1990},"applicationReference":" 20260823 022101 N0780","certificateReference":"99 246 632 420","channel":"Paper","imageReference":"2026 08 25 10 21 53N630491460","startDate":{"display":"5 January 2026","day":5,"month":0,"year":2026},"medicalCondition":["(10) Cancer"],"endDate":{"display":"4 January 2036","day":4,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07086 493 127","emailAddress":"h.day@hotmail.com"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"809 663 8573","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"17 October 1981","day":17,"month":9,"year":1981},"checking":true,"checkType":"supervisor","applicationReference":" 20260823 225242 N0373","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N292114363","startDate":{"display":"20 October 2025","day":20,"month":9,"year":2025},"medicalCondition":["(1) Permanent fistula","(2) Epilepsy"],"endDate":{"display":"19 October 2035","day":19,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07083 916 275","emailAddress":"indie.francis@hotmail.com"},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"032 293 2669","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"7 December 1967","day":7,"month":11,"year":1967},"checking":false,"applicationReference":" 20260820 032031 N0579","certificateReference":"","channel":"Paper","imageReference":"2026 08 25 10 21 53N111796479","startDate":{"display":"23 September 2025","day":23,"month":8,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"22 September 2035","day":22,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07093 114 236","emailAddress":"hope.burton@hotmail.com"}]'
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
