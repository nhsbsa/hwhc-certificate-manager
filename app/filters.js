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

            link = patient.certificateType + '/comparison--correction?patientID=' + patient.id;
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
              link = 'process-application/experimental--horizontal-labels?patientID=' + patient.id;
            } else if (role === 'qualityControl') {
              link = patient.certificateType + '/case--view--cannot-edit?patientID=' + patient.id;
            } else {
              link = patient.certificateType + '/case--view--can-edit?patientID=' + patient.id;
            }

            break;

          case 'on-hold':

            if (role === 'backOffice' || role === 'backOfficeSupervisor') {
              link = 'process-application/review-application--horizontal-labels--on-hold?patientID=' + patient.id;
            } else if (role === 'qualityControl') {
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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"121 707 2929","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"18 October 1984","day":18,"month":9,"year":1984},"checking":false,"checkType":"supervisor","certificateReference":"01 607 034 046","channel":"Paper","imageReference":"2026 06 30 13 24 36N300367563","startDate":{"display":"25 December 2025","day":25,"month":11,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"24 December 2035","day":24,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07031 284 591","dueDate":{"display":"7 November 2025","day":7,"month":10,"year":2025},"childsDOB":{"display":"28 December 2025","day":28,"month":11,"year":2025}},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"897 150 3520","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"expired","dateOfBirth":{"display":"4 August 1997","day":4,"month":7,"year":1997},"checking":false,"checkType":"quality","certificateReference":"93 529 160 471","channel":"Digital","imageReference":"2026 06 30 13 24 34N473077943","startDate":{"display":"17 October 2025","day":17,"month":9,"year":2025},"dueDate":{"display":"17 August 2025","day":17,"month":7,"year":2025},"endDate":{"display":"16 October 2026","day":16,"month":9,"year":2026},"childsDOB":{"display":"17 October 2025","day":17,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07049 823 716","emailAddress":"jones.a@outlook.com","medicalCondition":["(10) Cancer"]},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"696 120 6982","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"6 September 1983","day":6,"month":8,"year":1983},"checking":false,"checkType":"quality","certificateReference":"HRT LIE6 G3SV","channel":"Digital","imageReference":"2026 06 30 13 24 34N158165659","startDate":{"display":"22 December 2025","day":22,"month":11,"year":2025},"dueDate":{"display":"18 July 2025","day":18,"month":6,"year":2025},"endDate":{"display":"21 December 2026","day":21,"month":11,"year":2026},"childsDOB":{"display":"17 August 2025","day":17,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 395 184","emailAddress":"i.taylor@gmail.com","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"741 144 1842","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"22 February 1968","day":22,"month":1,"year":1968},"checking":true,"checkType":"quality","certificateReference":"68 292 665 863","channel":"Paper","imageReference":"2026 06 30 13 24 36N675848841","startDate":{"display":"2 September 2025","day":2,"month":8,"year":2025},"dueDate":{"display":"14 October 2025","day":14,"month":9,"year":2025},"endDate":{"display":"1 September 2035","day":1,"month":8,"year":2035},"childsDOB":{"display":"30 September 2025","day":30,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07071 528 439","emailAddress":"ava.brown@blueyonder.co.uk","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"716 776 7217","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"19 March 1997","day":19,"month":2,"year":1997},"checking":false,"certificateReference":"22 213 317 537","channel":"Digital","startDate":{"display":"10 July 2025","day":10,"month":6,"year":2025},"dueDate":{"display":"30 November 2025","day":30,"month":10,"year":2025},"endDate":{"display":"9 July 2026","day":9,"month":6,"year":2026},"childsDOB":{"display":"10 July 2025","day":10,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07083 916 275","emailAddress":"e.williams@hotmail.com","checkType":"quality","imageReference":"2026 06 30 13 24 34N671337335"},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"097 321 4442","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"17 November 1979","day":17,"month":10,"year":1979},"checking":false,"checkType":"supervisor","certificateReference":"01 782 045 004","channel":"Paper","imageReference":"2026 06 30 13 24 36N895604066","startDate":{"display":"14 August 2025","day":14,"month":7,"year":2025},"dueDate":{"display":"21 September 2025","day":21,"month":8,"year":2025},"endDate":{"display":"13 August 2035","day":13,"month":7,"year":2035},"childsDOB":{"display":"15 November 2025","day":15,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07092 475 318","emailAddress":"s.wilson@gmail.com","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"565 031 3899","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"10 June 1967","day":10,"month":5,"year":1967},"certificateReference":"88 839 951 463","channel":"Paper","imageReference":"2026 06 30 13 24 36N634870536","startDate":{"display":"13 August 2025","day":13,"month":7,"year":2025},"dueDate":{"display":"6 August 2025","day":6,"month":7,"year":2025},"endDate":{"display":"12 August 2030","day":12,"month":7,"year":2030},"childsDOB":{"display":"27 September 2025","day":27,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07015 648 293","emailAddress":"Davies443@blueyonder.co.uk","medicalCondition":["(10) Cancer"]},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"495 076 6010","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"23 September 1984","day":23,"month":8,"year":1984},"checking":false,"checkType":"quality","certificateReference":"71 379 719 359","channel":"Paper","imageReference":"2026 06 30 13 24 36N407086971","startDate":{"display":"28 November 2025","day":28,"month":10,"year":2025},"medicalCondition":["(10) Cancer"],"endDate":{"display":"27 November 2030","day":27,"month":10,"year":2030},"certificateFulfilment":"post","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 751 964","emailAddress":"Evans145@blueyonder.co.uk","dueDate":{"display":"11 October 2025","day":11,"month":9,"year":2025},"childsDOB":{"display":"3 November 2025","day":3,"month":10,"year":2025}},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"514 596 8372","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","checking":false,"checkType":"quality","dateOfBirth":{"display":"22 February 1967","day":22,"month":1,"year":1967},"certificateReference":"HRT JK40 PV0Q","channel":"Digital","imageReference":"2026 06 30 13 24 34N733101958","startDate":{"display":"22 August 2025","day":22,"month":7,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"21 August 2026","day":21,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07036 592 817","emailAddress":"grace.thomas@gmail.com"},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"657 103 3968","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"23 November 1984","day":23,"month":10,"year":1984},"checking":true,"certificateReference":"51 553 933 154","channel":"Paper","startDate":{"display":"16 December 2025","day":16,"month":11,"year":2025},"endDate":{"display":"15 December 2035","day":15,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07047 813 256","emailAddress":"l.roberts@googlemail.com","imageReference":"2026 06 30 13 24 36N035764920","dueDate":{"display":"26 December 2025","day":26,"month":11,"year":2025},"childsDOB":{"display":"15 September 2025","day":15,"month":8,"year":2025},"checkType":"supervisor","medicalCondition":["(2) Epilepsy","(6) Diabetes insipidus","(7) Forms of hypoadrenalism"]},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"717 191 9357","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"8 May 1971","day":8,"month":4,"year":1971},"checking":true,"certificateReference":"05 227 122 913","channel":"Paper","startDate":{"display":"15 August 2025","day":15,"month":7,"year":2025},"dueDate":{"display":"9 October 2025","day":9,"month":9,"year":2025},"endDate":{"display":"14 August 2035","day":14,"month":7,"year":2035},"childsDOB":{"display":"14 November 2025","day":14,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07051 294 783","emailAddress":"f.johnson@aol.com","checkType":"quality","imageReference":"2026 06 30 13 24 36N684226334","medicalCondition":["(9) Continuing physical disability"]},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"681 132 4846","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"14 October 2003","day":14,"month":9,"year":2003},"checking":false,"checkType":"supervisor","certificateReference":"18 848 332 441","channel":"Digital","imageReference":"2026 06 30 13 24 33N444045436","startDate":{"display":"19 September 2025","day":19,"month":8,"year":2025},"medicalCondition":["(1) Permanent fistula","(2) Epilepsy"],"endDate":{"display":"18 September 2026","day":18,"month":8,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07063 418 592","emailAddress":"charlotte.lewis@blueyonder.co.uk","dueDate":{"display":"10 August 2025","day":10,"month":7,"year":2025},"childsDOB":{"display":"19 September 2025","day":19,"month":8,"year":2025}},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"666 832 6914","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"2 February 2004","day":2,"month":1,"year":2004},"checking":false,"certificateReference":"62 588 368 079","channel":"Digital","imageReference":"2026 06 30 13 24 34N726639982","startDate":{"display":"8 November 2025","day":8,"month":10,"year":2025},"dueDate":{"display":"27 September 2025","day":27,"month":8,"year":2025},"endDate":{"display":"7 November 2026","day":7,"month":10,"year":2026},"childsDOB":{"display":"8 November 2025","day":8,"month":10,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07075 928 341","emailAddress":"i.walker@googlemail.com","checkType":"quality","medicalCondition":["(1) Permanent fistula","(4) Myxoedema","(5) Hypoparathyroidism"]},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"594 803 7792","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"10 December 2004","day":10,"month":11,"year":2004},"checking":false,"checkType":"supervisor","certificateReference":"03 836 999 970","channel":"Paper","imageReference":"2026 06 30 13 24 36N697724893","startDate":{"display":"26 July 2025","day":26,"month":6,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"25 July 2026","day":25,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07084 372 659","emailAddress":"hall.d@hotmail.com","dueDate":{"display":"5 July 2025","day":5,"month":6,"year":2025},"childsDOB":{"display":"26 July 2025","day":26,"month":6,"year":2025}},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"100 358 4145","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"22 May 1996","day":22,"month":4,"year":1996},"checking":true,"certificateReference":"94 984 456 141","channel":"Paper","startDate":{"display":"29 December 2025","day":29,"month":11,"year":2025},"dueDate":{"display":"28 July 2025","day":28,"month":6,"year":2025},"endDate":{"display":"28 December 2026","day":28,"month":11,"year":2026},"childsDOB":{"display":"29 December 2025","day":29,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07091 837 426","emailAddress":"e.clarke@hotmail.com","checkType":"quality","imageReference":"2026 06 30 13 24 36N780867673"},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"913 100 6989","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"21 March 1983","day":21,"month":2,"year":1983},"checking":false,"certificateReference":"HRT HMN2 C71A","channel":"Digital","startDate":{"display":"9 October 2025","day":9,"month":9,"year":2025},"dueDate":{"display":"9 September 2025","day":9,"month":8,"year":2025},"endDate":{"display":"8 October 2026","day":8,"month":9,"year":2026},"childsDOB":{"display":"28 July 2025","day":28,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 385 927","emailAddress":"Allen910@outlook.com","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"565 324 0065","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"11 September 1973","day":11,"month":8,"year":1973},"certificateReference":"88 633 890 163","channel":"Digital","imageReference":"2026 06 30 13 24 34N949330154","startDate":{"display":"25 October 2025","day":25,"month":9,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"24 October 2035","day":24,"month":9,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07027 639 485","emailAddress":"sophie.young251@googlemail.com","dueDate":{"display":"10 December 2025","day":10,"month":11,"year":2025},"childsDOB":{"display":"11 December 2025","day":11,"month":11,"year":2025}},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"817 281 5782","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"11 December 1980","day":11,"month":11,"year":1980},"checking":false,"certificateReference":"HRT BGH3 58O3","channel":"Pharmacy","imageReference":"2026 06 30 13 24 34N966242473","startDate":{"display":"16 November 2025","day":16,"month":10,"year":2025},"medicalCondition":["(10) Cancer"],"endDate":{"display":"15 November 2026","day":15,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07035 821 749","emailAddress":"h.king@googlemail.com","checkType":"supervisor"},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"569 153 1378","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"27 August 1999","day":27,"month":7,"year":1999},"checking":true,"checkType":"supervisor","certificateReference":"70 482 987 635","channel":"Paper","imageReference":"2026 06 30 13 24 36N731698819","startDate":{"display":"25 July 2025","day":25,"month":6,"year":2025},"dueDate":{"display":"10 November 2025","day":10,"month":10,"year":2025},"endDate":{"display":"24 July 2026","day":24,"month":6,"year":2026},"childsDOB":{"display":"25 July 2025","day":25,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07048 952 613","emailAddress":"wright.m@hotmail.com"},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"396 099 8226","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"16 October 2003","day":16,"month":9,"year":2003},"checking":true,"certificateReference":"86 105 768 864","channel":"Paper","startDate":{"display":"20 July 2025","day":20,"month":6,"year":2025},"dueDate":{"display":"28 December 2025","day":28,"month":11,"year":2025},"endDate":{"display":"19 July 2026","day":19,"month":6,"year":2026},"childsDOB":{"display":"20 July 2025","day":20,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07052 719 384","emailAddress":"ella-rose.green@outlook.com","checkType":"supervisor","imageReference":"2026 06 30 13 24 36N755207320"},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"217 952 3421","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"28 March 2008","day":28,"month":2,"year":2008},"checking":true,"certificateReference":"30 060 784 377","channel":"Paper","imageReference":"2026 06 30 13 24 36N848394620","startDate":{"display":"5 September 2025","day":5,"month":8,"year":2025},"dueDate":{"display":"20 December 2025","day":20,"month":11,"year":2025},"endDate":{"display":"4 September 2026","day":4,"month":8,"year":2026},"childsDOB":{"display":"5 September 2025","day":5,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07064 837 295","emailAddress":"Baker574@hotmail.com","checkType":"supervisor","medicalCondition":["(4) Myxoedema"]},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"801 995 7552","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","checking":false,"checkType":"quality","dateOfBirth":{"display":"16 December 1986","day":16,"month":11,"year":1986},"certificateReference":"HRT KBG2 N11E","channel":"Digital","imageReference":"2026 06 30 13 24 34N823801095","startDate":{"display":"8 November 2025","day":8,"month":10,"year":2025},"medicalCondition":["(2) Epilepsy","(4) Myxoedema","(7) Forms of hypoadrenalism"],"endDate":{"display":"7 November 2026","day":7,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07073 491 826","emailAddress":"adams.r@gmail.com"},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"953 956 5530","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"27 June 1996","day":27,"month":5,"year":1996},"checking":true,"certificateReference":"63 575 397 529","channel":"Paper","startDate":{"display":"27 November 2025","day":27,"month":10,"year":2025},"endDate":{"display":"26 November 2035","day":26,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07085 623 941","emailAddress":"Mitchell857@hotmail.com","imageReference":"2026 06 30 13 24 36N342430311","medicalCondition":["(2) Epilepsy","(4) Myxoedema"],"checkType":"supervisor"},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"701 427 6896","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"16 February 1988","day":16,"month":1,"year":1988},"checking":false,"certificateReference":"61 396 699 216","channel":"Paper","startDate":{"display":"18 July 2025","day":18,"month":6,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"17 July 2035","day":17,"month":6,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07096 718 235","emailAddress":"sienna.turner148@googlemail.com","imageReference":"2026 06 30 13 24 36N808434036"},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"554 568 5747","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"17 November 1991","day":17,"month":10,"year":1991},"checking":false,"certificateReference":"39 221 816 794","channel":"Paper","startDate":{"display":"12 December 2025","day":12,"month":11,"year":2025},"dueDate":{"display":"22 October 2025","day":22,"month":9,"year":2025},"endDate":{"display":"11 December 2026","day":11,"month":11,"year":2026},"childsDOB":{"display":"12 December 2025","day":12,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07018 273 945","emailAddress":"willow.carter@googlemail.com","checkType":"supervisor","imageReference":"2026 06 30 13 24 36N707097266","medicalCondition":["(2) Epilepsy"]},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"950 866 3191","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"23 April 1994","day":23,"month":3,"year":1994},"checking":true,"checkType":"supervisor","certificateReference":"02 599 423 575","channel":"Paper","imageReference":"2026 06 30 13 24 36N534749947","startDate":{"display":"9 September 2025","day":9,"month":8,"year":2025},"dueDate":{"display":"2 August 2025","day":2,"month":7,"year":2025},"endDate":{"display":"8 September 2026","day":8,"month":8,"year":2026},"childsDOB":{"display":"9 September 2025","day":9,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07029 384 756","emailAddress":"jessica.morris@hotmail.com"},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"576 197 8314","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"10 July 1979","day":10,"month":6,"year":1979},"checking":false,"certificateReference":"44 802 135 182","channel":"Paper","startDate":{"display":"6 December 2025","day":6,"month":11,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"5 December 2035","day":5,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07031 572 948","imageReference":"2026 06 30 13 24 36N801066612"},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"581 334 6074","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"23 June 2005","day":23,"month":5,"year":2005},"checking":true,"certificateReference":"11 899 853 565","channel":"Paper","imageReference":"2026 06 30 13 24 36N663147593","startDate":{"display":"6 November 2025","day":6,"month":10,"year":2025},"dueDate":{"display":"5 August 2025","day":5,"month":7,"year":2025},"endDate":{"display":"5 November 2026","day":5,"month":10,"year":2026},"childsDOB":{"display":"6 November 2025","day":6,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07042 619 583","checkType":"supervisor"},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"489 585 5526","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"11 May 1972","day":11,"month":4,"year":1972},"checking":false,"checkType":"quality","certificateReference":"34 715 014 975","channel":"Paper","imageReference":"2026 06 30 13 24 36N161980683","startDate":{"display":"27 December 2025","day":27,"month":11,"year":2025},"dueDate":{"display":"7 December 2025","day":7,"month":11,"year":2025},"endDate":{"display":"26 December 2035","day":26,"month":11,"year":2035},"childsDOB":{"display":"30 July 2025","day":30,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07053 847 261","emailAddress":"rosie.price@hotmail.com","medicalCondition":["(2) Epilepsy"]},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"602 696 6800","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"22 September 1972","day":22,"month":8,"year":1972},"checking":true,"checkType":"quality","certificateReference":"34 784 152 721","channel":"Paper","imageReference":"2026 06 30 13 24 36N699834453","startDate":{"display":"8 December 2025","day":8,"month":11,"year":2025},"dueDate":{"display":"5 July 2025","day":5,"month":6,"year":2025},"endDate":{"display":"7 December 2030","day":7,"month":11,"year":2030},"childsDOB":{"display":"1 October 2025","day":1,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07064 928 137","medicalCondition":["(10) Cancer"]},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"554 779 5206","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"7 January 1967","day":7,"month":0,"year":1967},"checking":false,"certificateReference":"39 628 098 503","channel":"Paper","startDate":{"display":"30 July 2025","day":30,"month":6,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"29 July 2035","day":29,"month":6,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07075 283 916","emailAddress":"Bailey997@hotmail.com","checkType":"quality","imageReference":"2026 06 30 13 24 36N332170684","dueDate":{"display":"8 July 2025","day":8,"month":6,"year":2025},"childsDOB":{"display":"3 August 2025","day":3,"month":7,"year":2025}},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"211 342 0806","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"19 April 1995","day":19,"month":3,"year":1995},"certificateReference":"57 887 246 809","channel":"Paper","imageReference":"2026 06 30 13 24 36N636522443","startDate":{"display":"12 December 2025","day":12,"month":11,"year":2025},"medicalCondition":["(2) Epilepsy","(3) Diabetes mellitus","(10) Cancer"],"endDate":{"display":"11 December 2035","day":11,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07086 419 375","emailAddress":"Parker569@aol.com","dueDate":{"display":"2 July 2025","day":2,"month":6,"year":2025},"childsDOB":{"display":"18 November 2025","day":18,"month":10,"year":2025}},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"577 419 4882","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"16 March 2007","day":16,"month":2,"year":2007},"checking":false,"certificateReference":"02 689 701 015","channel":"Digital","imageReference":"2026 06 30 13 24 34N097060331","startDate":{"display":"30 October 2025","day":30,"month":9,"year":2025},"dueDate":{"display":"15 November 2025","day":15,"month":10,"year":2025},"endDate":{"display":"29 October 2026","day":29,"month":9,"year":2026},"childsDOB":{"display":"30 October 2025","day":30,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07097 531 284","emailAddress":"hannah.phillips839@gmail.com","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"803 879 2579","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","checking":false,"checkType":"quality","dateOfBirth":{"display":"16 July 1998","day":16,"month":6,"year":1998},"certificateReference":"52 909 069 741","channel":"Paper","imageReference":"2026 06 30 13 24 36N016348407","startDate":{"display":"28 September 2025","day":28,"month":8,"year":2025},"medicalCondition":["(1) Permanent fistula","(6) Diabetes insipidus"],"endDate":{"display":"27 September 2026","day":27,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07018 642 597","emailAddress":"z.bennett@aol.com","dueDate":{"display":"22 December 2025","day":22,"month":11,"year":2025},"childsDOB":{"display":"28 September 2025","day":28,"month":8,"year":2025}},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"527 303 3310","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"26 June 1996","day":26,"month":5,"year":1996},"checking":false,"certificateReference":"03 460 637 938","channel":"Paper","imageReference":"2026 06 30 13 24 36N065747442","startDate":{"display":"7 December 2025","day":7,"month":11,"year":2025},"dueDate":{"display":"6 September 2025","day":6,"month":8,"year":2025},"endDate":{"display":"6 December 2026","day":6,"month":11,"year":2026},"childsDOB":{"display":"7 December 2025","day":7,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07029 753 861","emailAddress":"Cox549@googlemail.com","checkType":"supervisor"},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"851 405 8570","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"deleted","checking":false,"checkType":"quality","dateOfBirth":{"display":"23 September 1989","day":23,"month":8,"year":1989},"certificateReference":"76 889 360 648","channel":"Paper","imageReference":"2026 06 30 13 24 36N492481197","startDate":{"display":"3 July 2025","day":3,"month":6,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"2 July 2035","day":2,"month":6,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07031 864 729","emailAddress":"maya.richardson@hotmail.com"},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"806 448 1738","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"9 March 1992","day":9,"month":2,"year":1992},"checking":false,"certificateReference":"48 404 321 115","channel":"Digital","imageReference":"2026 06 30 13 24 34N753179701","startDate":{"display":"18 September 2025","day":18,"month":8,"year":2025},"dueDate":{"display":"12 September 2025","day":12,"month":8,"year":2025},"endDate":{"display":"17 September 2026","day":17,"month":8,"year":2026},"childsDOB":{"display":"18 September 2025","day":18,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07042 987 513","emailAddress":"Gray383@googlemail.com","checkType":"quality","medicalCondition":["(4) Myxoedema","(8) Myasthenia gravis"]},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"845 362 9014","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"15 September 1968","day":15,"month":8,"year":1968},"checking":false,"checkType":"supervisor","certificateReference":"38 067 289 826","channel":"Digital","imageReference":"2026 06 30 13 24 34N074509520","startDate":{"display":"9 August 2025","day":9,"month":7,"year":2025},"dueDate":{"display":"16 August 2025","day":16,"month":7,"year":2025},"endDate":{"display":"8 August 2035","day":8,"month":7,"year":2035},"childsDOB":{"display":"25 December 2025","day":25,"month":11,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07054 129 876","emailAddress":"i.ross@gmail.com","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"482 534 5126","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"12 January 1996","day":12,"month":0,"year":1996},"checking":false,"certificateReference":"82 083 843 879","channel":"Digital","startDate":{"display":"16 December 2025","day":16,"month":11,"year":2025},"dueDate":{"display":"30 November 2025","day":30,"month":10,"year":2025},"endDate":{"display":"15 December 2026","day":15,"month":11,"year":2026},"childsDOB":{"display":"16 December 2025","day":16,"month":11,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07065 238 741","emailAddress":"Bell672@hotmail.com","imageReference":"2026 06 30 13 24 34N361186474"},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"864 902 7324","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"12 March 1990","day":12,"month":2,"year":1990},"checking":false,"certificateReference":"54 667 238 067","channel":"Digital","imageReference":"2026 06 30 13 24 34N636348743","startDate":{"display":"28 July 2025","day":28,"month":6,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"27 July 2026","day":27,"month":6,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07076 391 825","emailAddress":"cook.e@aol.com","checkType":"quality","dueDate":{"display":"10 September 2025","day":10,"month":8,"year":2025},"childsDOB":{"display":"28 July 2025","day":28,"month":6,"year":2025}},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"286 126 7856","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"16 March 1987","day":16,"month":2,"year":1987},"checking":false,"checkType":"quality","certificateReference":"70 311 512 695","channel":"Paper","imageReference":"2026 06 30 13 24 36N061349689","startDate":{"display":"30 October 2025","day":30,"month":9,"year":2025},"dueDate":{"display":"6 September 2025","day":6,"month":8,"year":2025},"endDate":{"display":"29 October 2035","day":29,"month":9,"year":2035},"childsDOB":{"display":"6 August 2025","day":6,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07087 512 936","emailAddress":"thea.watson@googlemail.com","medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"933 859 8200","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"24 March 1970","day":24,"month":2,"year":1970},"checking":false,"certificateReference":"36 154 234 537","channel":"Paper","imageReference":"2026 06 30 13 24 36N174542553","startDate":{"display":"13 December 2025","day":13,"month":11,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"12 December 2035","day":12,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07098 631 427","emailAddress":"a.sanders@hotmail.com","checkType":"quality"},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"394 107 4861","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"expired","checking":false,"checkType":"quality","dateOfBirth":{"display":"25 July 2008","day":25,"month":6,"year":2008},"certificateReference":"96 580 449 795","channel":"Digital","imageReference":"2026 06 30 13 24 33N885396928","startDate":{"display":"16 December 2025","day":16,"month":11,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"15 December 2026","day":15,"month":11,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07019 742 835","emailAddress":"Harrison632@outlook.com","dueDate":{"display":"24 August 2025","day":24,"month":7,"year":2025},"childsDOB":{"display":"16 December 2025","day":16,"month":11,"year":2025}},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"331 746 2622","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"18 January 1999","day":18,"month":0,"year":1999},"checking":false,"certificateReference":"14 964 654 503","channel":"Paper","imageReference":"2026 06 30 13 24 36N974743920","startDate":{"display":"12 September 2025","day":12,"month":8,"year":2025},"dueDate":{"display":"19 September 2025","day":19,"month":8,"year":2025},"endDate":{"display":"11 September 2026","day":11,"month":8,"year":2026},"childsDOB":{"display":"12 September 2025","day":12,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07020 853 749","emailAddress":"coleman.l@googlemail.com","checkType":"supervisor","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"024 142 3802","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","checking":false,"checkType":"quality","dateOfBirth":{"display":"1 July 1966","day":1,"month":6,"year":1966},"certificateReference":"97 307 987 812","channel":"Paper","imageReference":"2026 06 30 13 24 36N646803792","startDate":{"display":"27 October 2025","day":27,"month":9,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"26 October 2035","day":26,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07031 984 625","emailAddress":"amber.murphy@blueyonder.co.uk","dueDate":{"display":"20 October 2025","day":20,"month":9,"year":2025},"childsDOB":{"display":"12 July 2025","day":12,"month":6,"year":2025}},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"494 821 5018","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"27 May 1985","day":27,"month":4,"year":1985},"checking":true,"certificateReference":"70 765 104 971","channel":"Paper","imageReference":"2026 06 30 13 24 36N949525876","startDate":{"display":"14 August 2025","day":14,"month":7,"year":2025},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"13 August 2035","day":13,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07042 195 783","emailAddress":"s.graham@hotmail.com","checkType":"supervisor"},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"113 426 5575","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"on-hold","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"24 November 1967","day":24,"month":10,"year":1967},"certificateReference":"10 658 284 648","channel":"Paper","imageReference":"2026 06 30 13 24 36N013056596","startDate":{"display":"20 September 2025","day":20,"month":8,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"19 September 2035","day":19,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07053 268 917","emailAddress":"b.stevens@hotmail.com"},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"932 550 2900","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"16 October 1991","day":16,"month":9,"year":1991},"checking":false,"checkType":"supervisor","certificateReference":"95 422 939 563","channel":"Paper","imageReference":"2026 06 30 13 24 36N606776825","startDate":{"display":"1 August 2025","day":1,"month":7,"year":2025},"medicalCondition":["(4) Myxoedema","(9) Continuing physical disability"],"endDate":{"display":"31 July 2035","day":31,"month":6,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07064 371 528","emailAddress":"imogen.simpson@aol.com","dueDate":{"display":"13 July 2025","day":13,"month":6,"year":2025},"childsDOB":{"display":"4 November 2025","day":4,"month":10,"year":2025}},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"399 541 6725","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"15 January 1990","day":15,"month":0,"year":1990},"checking":false,"certificateReference":"76 610 402 899","channel":"Paper","imageReference":"2026 06 30 13 24 36N556069313","startDate":{"display":"2 October 2025","day":2,"month":9,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"1 October 2035","day":1,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07075 482 936","emailAddress":"harriet.butler@googlemail.com","checkType":"quality"},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"956 175 6404","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"18 March 1989","day":18,"month":2,"year":1989},"checking":false,"certificateReference":"38 400 310 658","channel":"Paper","startDate":{"display":"26 November 2025","day":26,"month":10,"year":2025},"dueDate":{"display":"5 November 2025","day":5,"month":10,"year":2025},"endDate":{"display":"25 November 2035","day":25,"month":10,"year":2035},"childsDOB":{"display":"4 December 2025","day":4,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07086 593 147","emailAddress":"eleanor.chapman@hotmail.com","checkType":"quality","imageReference":"2026 06 30 13 24 36N149907353","medicalCondition":["(4) Myxoedema"]},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"203 806 5879","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"9 February 1993","day":9,"month":1,"year":1993},"checking":false,"checkType":"quality","certificateReference":"02 530 678 727","channel":"Paper","imageReference":"2026 06 30 13 24 36N734254504","startDate":{"display":"1 December 2025","day":1,"month":11,"year":2025},"dueDate":{"display":"21 October 2025","day":21,"month":9,"year":2025},"endDate":{"display":"30 November 2035","day":30,"month":10,"year":2035},"childsDOB":{"display":"8 July 2025","day":8,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07097 614 258","medicalCondition":["(2) Epilepsy"]},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"249 966 7778","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"16 April 1988","day":16,"month":3,"year":1988},"checking":false,"certificateReference":"61 230 918 019","channel":"Paper","imageReference":"2026 06 30 13 24 36N146569798","startDate":{"display":"22 October 2025","day":22,"month":9,"year":2025},"dueDate":{"display":"22 October 2025","day":22,"month":9,"year":2025},"endDate":{"display":"21 October 2026","day":21,"month":9,"year":2026},"childsDOB":{"display":"22 October 2025","day":22,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07018 725 369","emailAddress":"hussain.s@aol.com","checkType":"quality","medicalCondition":["(2) Epilepsy"]},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"756 494 6453","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"3 December 1995","day":3,"month":11,"year":1995},"checking":false,"certificateReference":"HRT CNVC 084S","channel":"Digital","imageReference":"2026 06 30 13 24 34N803685199","startDate":{"display":"24 August 2025","day":24,"month":7,"year":2025},"dueDate":{"display":"11 September 2025","day":11,"month":8,"year":2025},"endDate":{"display":"23 August 2026","day":23,"month":7,"year":2026},"childsDOB":{"display":"27 November 2025","day":27,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07029 836 471","emailAddress":"a.khan@blueyonder.co.uk","checkType":"quality","medicalCondition":["(6) Diabetes insipidus","(8) Myasthenia gravis"]},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"722 610 4340","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"16 September 1995","day":16,"month":8,"year":1995},"checking":false,"checkType":"quality","certificateReference":"92 647 508 498","channel":"Paper","imageReference":"2026 06 30 13 24 36N977736477","startDate":{"display":"6 September 2025","day":6,"month":8,"year":2025},"medicalCondition":["(1) Permanent fistula","(6) Diabetes insipidus","(10) Cancer"],"endDate":{"display":"5 September 2035","day":5,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07030 947 582","emailAddress":"l.begum@hotmail.com","dueDate":{"display":"13 July 2025","day":13,"month":6,"year":2025},"childsDOB":{"display":"26 November 2025","day":26,"month":10,"year":2025}},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"447 226 0273","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"10 January 1988","day":10,"month":0,"year":1988},"checking":false,"certificateReference":"HRT QJGH JDTF","channel":"Digital","imageReference":"2026 06 30 13 24 34N892379477","startDate":{"display":"5 October 2025","day":5,"month":9,"year":2025},"dueDate":{"display":"14 November 2025","day":14,"month":10,"year":2025},"endDate":{"display":"4 October 2026","day":4,"month":9,"year":2026},"childsDOB":{"display":"21 October 2025","day":21,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07042 058 693","emailAddress":"O’Connor859@outlook.com","checkType":"quality","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"049 304 3592","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"23 December 1992","day":23,"month":11,"year":1992},"checking":false,"certificateReference":"50 532 363 583","channel":"Paper","imageReference":"2026 06 30 13 24 36N553800568","startDate":{"display":"21 August 2025","day":21,"month":7,"year":2025},"dueDate":{"display":"6 December 2025","day":6,"month":11,"year":2025},"endDate":{"display":"20 August 2035","day":20,"month":7,"year":2035},"childsDOB":{"display":"14 September 2025","day":14,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07053 169 784","emailAddress":"aoife.kelly@hotmail.com","medicalCondition":["(5) Hypoparathyroidism"]},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"107 683 1514","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"25 January 1969","day":25,"month":0,"year":1969},"checking":true,"checkType":"supervisor","certificateReference":"91 906 572 440","channel":"Paper","imageReference":"2026 06 30 13 24 36N911046234","startDate":{"display":"14 October 2025","day":14,"month":9,"year":2025},"dueDate":{"display":"15 July 2025","day":15,"month":6,"year":2025},"endDate":{"display":"13 October 2035","day":13,"month":9,"year":2035},"childsDOB":{"display":"25 August 2025","day":25,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07064 271 895","medicalCondition":["(1) Permanent fistula","(4) Myxoedema"]},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"051 962 0287","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"21 October 1994","day":21,"month":9,"year":1994},"checking":false,"checkType":"supervisor","certificateReference":"87 065 969 508","channel":"Paper","imageReference":"2026 06 30 13 24 36N714887563","startDate":{"display":"22 August 2025","day":22,"month":7,"year":2025},"dueDate":{"display":"4 October 2025","day":4,"month":9,"year":2025},"endDate":{"display":"21 August 2026","day":21,"month":7,"year":2026},"childsDOB":{"display":"22 August 2025","day":22,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07075 382 916","emailAddress":"Doyle758@gmail.com","medicalCondition":["(2) Epilepsy"]},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"373 667 5515","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"9 June 1967","day":9,"month":5,"year":1967},"checking":false,"certificateReference":"26 268 490 399","channel":"Paper","startDate":{"display":"13 November 2025","day":13,"month":10,"year":2025},"endDate":{"display":"12 November 2035","day":12,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07086 493 127","emailAddress":"Griffiths467@outlook.com","checkType":"quality","imageReference":"2026 06 30 13 24 36N076391452","dueDate":{"display":"1 October 2025","day":1,"month":9,"year":2025},"childsDOB":{"display":"22 November 2025","day":22,"month":10,"year":2025},"medicalCondition":["(2) Epilepsy","(5) Hypoparathyroidism","(8) Myasthenia gravis"]},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"623 964 3844","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"8 March 1978","day":8,"month":2,"year":1978},"checking":false,"certificateReference":"56 475 465 874","channel":"Digital","imageReference":"2026 06 30 13 24 34N808684131","startDate":{"display":"24 August 2025","day":24,"month":7,"year":2025},"dueDate":{"display":"5 October 2025","day":5,"month":9,"year":2025},"endDate":{"display":"23 August 2035","day":23,"month":7,"year":2035},"childsDOB":{"display":"30 June 2025","day":30,"month":5,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07097 514 238","emailAddress":"m.rees@hotmail.com","checkType":"quality","medicalCondition":["(2) Epilepsy"]},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"128 217 3207","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"15 July 2000","day":15,"month":6,"year":2000},"certificateReference":"03 918 213 467","channel":"Paper","imageReference":"2026 06 30 13 24 36N963314550","startDate":{"display":"2 October 2025","day":2,"month":9,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"1 October 2026","day":1,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07018 625 349","emailAddress":"Evans935@googlemail.com","dueDate":{"display":"30 September 2025","day":30,"month":8,"year":2025},"childsDOB":{"display":"2 October 2025","day":2,"month":9,"year":2025}},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"057 983 2247","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"rejected","checking":false,"checkType":"quality","dateOfBirth":{"display":"12 April 2004","day":12,"month":3,"year":2004},"certificateReference":"79 045 342 727","channel":"Paper","imageReference":"2026 06 30 13 24 36N224728439","startDate":{"display":"9 August 2025","day":9,"month":7,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"8 August 2026","day":8,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07029 736 458","emailAddress":"MacDonald558@blueyonder.co.uk","dueDate":{"display":"5 July 2025","day":5,"month":6,"year":2025},"childsDOB":{"display":"9 August 2025","day":9,"month":7,"year":2025}},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"236 201 4906","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"22 January 1991","day":22,"month":0,"year":1991},"checking":true,"certificateReference":"29 693 991 019","channel":"Paper","startDate":{"display":"4 November 2025","day":4,"month":10,"year":2025},"endDate":{"display":"3 November 2026","day":3,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07030 847 569","checkType":"supervisor","imageReference":"2026 06 30 13 24 36N817122112","dueDate":{"display":"28 October 2025","day":28,"month":9,"year":2025},"childsDOB":{"display":"4 November 2025","day":4,"month":10,"year":2025}},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"271 428 3065","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"23 December 1994","day":23,"month":11,"year":1994},"checking":false,"certificateReference":"26 040 163 839","channel":"Paper","imageReference":"2026 06 30 13 24 36N918088998","startDate":{"display":"7 July 2025","day":7,"month":6,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"6 July 2026","day":6,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07041 958 672","emailAddress":"armstrong.m@blueyonder.co.uk","dueDate":{"display":"7 September 2025","day":7,"month":8,"year":2025},"childsDOB":{"display":"7 July 2025","day":7,"month":6,"year":2025}},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"704 611 0856","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"expired","dateOfBirth":{"display":"14 April 1997","day":14,"month":3,"year":1997},"checking":false,"certificateReference":"53 908 479 854","channel":"Digital","startDate":{"display":"30 July 2025","day":30,"month":6,"year":2025},"dueDate":{"display":"2 November 2025","day":2,"month":10,"year":2025},"endDate":{"display":"29 July 2026","day":29,"month":6,"year":2026},"childsDOB":{"display":"30 July 2025","day":30,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07052 069 783","emailAddress":"penelope.hunter@blueyonder.co.uk","imageReference":"2026 06 30 13 24 34N990470072","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"568 391 0069","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"9 September 1982","day":9,"month":8,"year":1982},"checking":false,"certificateReference":"HRT B5PZ NN2N","channel":"Digital","imageReference":"2026 06 30 13 24 34N251518045","startDate":{"display":"25 September 2025","day":25,"month":8,"year":2025},"dueDate":{"display":"20 November 2025","day":20,"month":10,"year":2025},"endDate":{"display":"24 September 2026","day":24,"month":8,"year":2026},"childsDOB":{"display":"16 September 2025","day":16,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07063 171 894","emailAddress":"lawrence.c@gmail.com","checkType":"supervisor","medicalCondition":["(5) Hypoparathyroidism","(6) Diabetes insipidus","(8) Myasthenia gravis"]},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"793 054 2860","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"9 February 1968","day":9,"month":1,"year":1968},"checking":false,"certificateReference":"56 697 842 411","channel":"Digital","imageReference":"2026 06 30 13 24 34N517884580","startDate":{"display":"16 August 2025","day":16,"month":7,"year":2025},"dueDate":{"display":"13 October 2025","day":13,"month":9,"year":2025},"endDate":{"display":"15 August 2035","day":15,"month":7,"year":2035},"childsDOB":{"display":"26 August 2025","day":26,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07074 282 915","emailAddress":"spencer.b@gmail.com","checkType":"supervisor","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"616 954 6713","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"6 May 1986","day":6,"month":4,"year":1986},"checking":false,"certificateReference":"17 764 359 918","channel":"Paper","imageReference":"2026 06 30 13 24 36N528647813","startDate":{"display":"29 October 2025","day":29,"month":9,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"28 October 2035","day":28,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07085 393 126","emailAddress":"n.rogers@googlemail.com","checkType":"quality"},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"797 929 3604","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"7 November 1977","day":7,"month":10,"year":1977},"checking":true,"certificateReference":"39 703 739 423","channel":"Paper","startDate":{"display":"30 November 2025","day":30,"month":10,"year":2025},"dueDate":{"display":"27 December 2025","day":27,"month":11,"year":2025},"endDate":{"display":"29 November 2035","day":29,"month":10,"year":2035},"childsDOB":{"display":"18 November 2025","day":18,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07096 414 237","emailAddress":"a.watts@hotmail.com","checkType":"supervisor","imageReference":"2026 06 30 13 24 36N660403674","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"207 707 6178","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"23 November 2007","day":23,"month":10,"year":2007},"checking":false,"certificateReference":"33 263 848 996","channel":"Digital","imageReference":"2026 06 30 13 24 34N314999558","startDate":{"display":"16 December 2025","day":16,"month":11,"year":2025},"dueDate":{"display":"1 November 2025","day":1,"month":10,"year":2025},"endDate":{"display":"15 December 2026","day":15,"month":11,"year":2026},"childsDOB":{"display":"16 December 2025","day":16,"month":11,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07017 525 348","emailAddress":"h.henderson@hotmail.com","checkType":"supervisor"},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"844 119 0528","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"6 August 1996","day":6,"month":7,"year":1996},"checking":false,"certificateReference":"02 947 038 055","channel":"Paper","startDate":{"display":"5 October 2025","day":5,"month":9,"year":2025},"dueDate":{"display":"29 July 2025","day":29,"month":6,"year":2025},"endDate":{"display":"4 October 2026","day":4,"month":9,"year":2026},"childsDOB":{"display":"5 October 2025","day":5,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07028 636 459","imageReference":"2026 06 30 13 24 36N769411015"},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"852 894 6828","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"9 August 1983","day":9,"month":7,"year":1983},"checking":true,"certificateReference":"94 327 948 058","channel":"Paper","imageReference":"2026 06 30 13 24 36N602329105","startDate":{"display":"29 December 2025","day":29,"month":11,"year":2025},"dueDate":{"display":"19 October 2025","day":19,"month":9,"year":2025},"endDate":{"display":"28 December 2030","day":28,"month":11,"year":2030},"childsDOB":{"display":"14 August 2025","day":14,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07039 747 561","emailAddress":"nicholson.l@googlemail.com","checkType":"supervisor","medicalCondition":["(10) Cancer"]},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"155 856 3276","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"16 May 1991","day":16,"month":4,"year":1991},"checking":true,"certificateReference":"41 282 468 394","channel":"Paper","startDate":{"display":"13 October 2025","day":13,"month":9,"year":2025},"dueDate":{"display":"30 September 2025","day":30,"month":8,"year":2025},"endDate":{"display":"12 October 2035","day":12,"month":9,"year":2035},"childsDOB":{"display":"11 September 2025","day":11,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07040 858 673","emailAddress":"julia.gardner@outlook.com","checkType":"supervisor","imageReference":"2026 06 30 13 24 36N719785127","medicalCondition":["(4) Myxoedema"]},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"421 674 6694","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"2 October 2008","day":2,"month":9,"year":2008},"checking":false,"certificateReference":"97 686 108 770","channel":"Paper","startDate":{"display":"31 July 2025","day":31,"month":6,"year":2025},"endDate":{"display":"30 July 2026","day":30,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07051 969 782","emailAddress":"a.newton@gmail.com","checkType":"supervisor","imageReference":"2026 06 30 13 24 36N488508210","medicalCondition":["(1) Permanent fistula"],"dueDate":{"display":"28 October 2025","day":28,"month":9,"year":2025},"childsDOB":{"display":"31 July 2025","day":31,"month":6,"year":2025}},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"853 877 4771","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"4 July 1978","day":4,"month":6,"year":1978},"checking":false,"certificateReference":"HRT 3LY6 2TFL","channel":"Pharmacy","imageReference":"2026 06 30 13 24 34N681521538","startDate":{"display":"20 November 2025","day":20,"month":10,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"19 November 2026","day":19,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07062 071 893","emailAddress":"summer.reed@hotmail.com","dueDate":{"display":"23 December 2025","day":23,"month":11,"year":2025},"childsDOB":{"display":"28 August 2025","day":28,"month":7,"year":2025}},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"274 988 2012","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"5 January 1980","day":5,"month":0,"year":1980},"certificateReference":"10 734 955 887","channel":"Paper","imageReference":"2026 06 30 13 24 36N751737606","startDate":{"display":"18 December 2025","day":18,"month":11,"year":2025},"dueDate":{"display":"31 August 2025","day":31,"month":7,"year":2025},"endDate":{"display":"17 December 2035","day":17,"month":11,"year":2035},"childsDOB":{"display":"26 July 2025","day":26,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07073 182 914","emailAddress":"Harvey502@googlemail.com","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"709 984 4799","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","checking":false,"checkType":"quality","dateOfBirth":{"display":"23 December 1972","day":23,"month":11,"year":1972},"certificateReference":"70 398 573 340","channel":"Paper","imageReference":"2026 06 30 13 24 36N554583907","startDate":{"display":"28 September 2025","day":28,"month":8,"year":2025},"medicalCondition":["(4) Myxoedema","(5) Hypoparathyroidism"],"endDate":{"display":"27 September 2035","day":27,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07084 293 125","emailAddress":"maria.fernandez@blueyonder.co.uk","dueDate":{"display":"12 September 2025","day":12,"month":8,"year":2025},"childsDOB":{"display":"13 October 2025","day":13,"month":9,"year":2025}},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"495 366 2576","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"1 January 1999","day":1,"month":0,"year":1999},"checking":false,"certificateReference":"03 561 432 531","channel":"Digital","startDate":{"display":"20 July 2025","day":20,"month":6,"year":2025},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"19 July 2026","day":19,"month":6,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07095 314 236","emailAddress":"Silva505@blueyonder.co.uk","checkType":"quality","imageReference":"2026 06 30 13 24 34N251713593","dueDate":{"display":"15 August 2025","day":15,"month":7,"year":2025},"childsDOB":{"display":"20 July 2025","day":20,"month":6,"year":2025}},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"667 986 0599","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"7 August 2006","day":7,"month":7,"year":2006},"checking":true,"certificateReference":"78 224 801 920","channel":"Paper","startDate":{"display":"30 June 2025","day":30,"month":5,"year":2025},"dueDate":{"display":"7 December 2025","day":7,"month":11,"year":2025},"endDate":{"display":"29 June 2026","day":29,"month":5,"year":2026},"childsDOB":{"display":"30 June 2025","day":30,"month":5,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07016 425 347","emailAddress":"l.patel@gmail.com","checkType":"supervisor","imageReference":"2026 06 30 13 24 36N463021950"},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"668 542 7090","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"23 July 1992","day":23,"month":6,"year":1992},"checking":false,"certificateReference":"21 380 807 115","channel":"Paper","imageReference":"2026 06 30 13 24 36N841558083","startDate":{"display":"28 December 2025","day":28,"month":11,"year":2025},"dueDate":{"display":"11 July 2025","day":11,"month":6,"year":2025},"endDate":{"display":"27 December 2026","day":27,"month":11,"year":2026},"childsDOB":{"display":"28 December 2025","day":28,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07027 536 458"},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"434 580 8464","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"11 December 1968","day":11,"month":11,"year":1968},"checking":false,"checkType":"quality","certificateReference":"86 174 858 614","channel":"Paper","imageReference":"2026 06 30 13 24 36N267802830","startDate":{"display":"23 August 2025","day":23,"month":7,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"22 August 2035","day":22,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07038 647 569","emailAddress":"ahmed.j@googlemail.com","dueDate":{"display":"21 July 2025","day":21,"month":6,"year":2025},"childsDOB":{"display":"15 July 2025","day":15,"month":6,"year":2025}},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"282 737 0670","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"2 June 1991","day":2,"month":5,"year":1991},"checking":false,"certificateReference":"75 841 599 058","channel":"Paper","startDate":{"display":"28 September 2025","day":28,"month":8,"year":2025},"endDate":{"display":"27 September 2035","day":27,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07049 758 671","emailAddress":"Rashid147@hotmail.com","medicalCondition":["(3) Diabetes mellitus","(4) Myxoedema","(7) Forms of hypoadrenalism"],"checkType":"quality","imageReference":"2026 06 30 13 24 36N348022203"},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"289 326 4964","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"10 August 1994","day":10,"month":7,"year":1994},"checking":false,"checkType":"supervisor","certificateReference":"70 714 313 476","channel":"Digital","imageReference":"2026 06 30 13 24 33N534632044","startDate":{"display":"10 July 2025","day":10,"month":6,"year":2025},"dueDate":{"display":"27 December 2025","day":27,"month":11,"year":2025},"endDate":{"display":"9 July 2026","day":9,"month":6,"year":2026},"childsDOB":{"display":"10 July 2025","day":10,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07050 869 782","emailAddress":"t.paterson@googlemail.com"},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"268 735 4060","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"14 December 1999","day":14,"month":11,"year":1999},"checking":true,"certificateReference":"81 134 619 603","channel":"Paper","imageReference":"2026 06 30 13 24 36N901999198","startDate":{"display":"11 November 2025","day":11,"month":10,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"10 November 2026","day":10,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07061 971 893","emailAddress":"b.foster@aol.com","checkType":"supervisor","dueDate":{"display":"11 December 2025","day":11,"month":11,"year":2025},"childsDOB":{"display":"11 November 2025","day":11,"month":10,"year":2025}},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"989 172 9273","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"24 January 1994","day":24,"month":0,"year":1994},"checking":false,"certificateReference":"33 618 085 246","channel":"Paper","imageReference":"2026 06 30 13 24 36N895284984","startDate":{"display":"25 December 2025","day":25,"month":11,"year":2025},"dueDate":{"display":"15 October 2025","day":15,"month":9,"year":2025},"endDate":{"display":"24 December 2035","day":24,"month":11,"year":2035},"childsDOB":{"display":"28 August 2025","day":28,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07072 082 914","emailAddress":"Fox660@aol.com","medicalCondition":["(5) Hypoparathyroidism"]},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"169 323 9286","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","checking":false,"checkType":"quality","dateOfBirth":{"display":"21 August 1995","day":21,"month":7,"year":1995},"certificateReference":"60 888 587 611","channel":"Paper","imageReference":"2026 06 30 13 24 36N106579499","startDate":{"display":"5 July 2025","day":5,"month":6,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"4 July 2026","day":4,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07083 193 125","emailAddress":"georgia.grant@googlemail.com","dueDate":{"display":"9 July 2025","day":9,"month":6,"year":2025},"childsDOB":{"display":"5 July 2025","day":5,"month":6,"year":2025}},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"764 259 9874","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"8 September 1988","day":8,"month":8,"year":1988},"checking":false,"certificateReference":"HRT VHRI HY8M","channel":"Digital","imageReference":"2026 06 30 13 24 34N907103295","startDate":{"display":"17 December 2025","day":17,"month":11,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"16 December 2026","day":16,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07094 214 236","emailAddress":"Murray274@gmail.com"},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"352 239 6183","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"processing","dateOfBirth":{"display":"1 August 1971","day":1,"month":7,"year":1971},"checking":false,"certificateReference":"26 355 345 008","channel":"Paper","imageReference":"2026 06 30 13 24 36N757687200","startDate":{"display":"14 September 2025","day":14,"month":8,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"13 September 2035","day":13,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07015 325 347","emailAddress":"west.e@googlemail.com","checkType":"supervisor"},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"454 325 8262","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"6 December 1995","day":6,"month":11,"year":1995},"checking":false,"certificateReference":"94 989 062 232","channel":"Digital","imageReference":"2026 06 30 13 24 34N278688510","startDate":{"display":"30 July 2025","day":30,"month":6,"year":2025},"dueDate":{"display":"29 October 2025","day":29,"month":9,"year":2025},"endDate":{"display":"29 July 2035","day":29,"month":6,"year":2035},"childsDOB":{"display":"9 November 2025","day":9,"month":10,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07026 436 458","emailAddress":"r.matthews@googlemail.com","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"225 129 1237","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"23 November 1969","day":23,"month":10,"year":1969},"checking":false,"certificateReference":"44 344 905 841","channel":"Paper","imageReference":"2026 06 30 13 24 36N368786243","startDate":{"display":"26 September 2025","day":26,"month":8,"year":2025},"dueDate":{"display":"24 October 2025","day":24,"month":9,"year":2025},"endDate":{"display":"25 September 2035","day":25,"month":8,"year":2035},"childsDOB":{"display":"12 August 2025","day":12,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07037 547 569","emailAddress":"k.holmes@outlook.com","checkType":"quality","medicalCondition":["(2) Epilepsy","(8) Myasthenia gravis"]},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"302 731 9784","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"12 November 2002","day":12,"month":10,"year":2002},"checking":false,"certificateReference":"99 792 074 955","channel":"Paper","startDate":{"display":"1 July 2025","day":1,"month":6,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"30 June 2026","day":30,"month":5,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07048 658 671","emailAddress":"lydia.walsh@aol.com","checkType":"supervisor","imageReference":"2026 06 30 13 24 36N282891440","dueDate":{"display":"5 August 2025","day":5,"month":7,"year":2025},"childsDOB":{"display":"1 July 2025","day":1,"month":6,"year":2025}},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"819 684 4330","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"11 April 1966","day":11,"month":3,"year":1966},"checking":false,"certificateReference":"HRT CV80 M4SQ","channel":"Digital","startDate":{"display":"18 July 2025","day":18,"month":6,"year":2025},"dueDate":{"display":"19 November 2025","day":19,"month":10,"year":2025},"endDate":{"display":"17 July 2026","day":17,"month":6,"year":2026},"childsDOB":{"display":"28 September 2025","day":28,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07059 769 782","emailAddress":"alexandra.page@gmail.com","checkType":"supervisor","imageReference":"2026 06 30 13 24 34N371993035"},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"416 513 2178","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"5 March 1967","day":5,"month":2,"year":1967},"checking":false,"checkType":"supervisor","certificateReference":"30 868 601 647","channel":"Digital","imageReference":"2026 06 30 13 24 33N047944366","startDate":{"display":"3 July 2025","day":3,"month":6,"year":2025},"dueDate":{"display":"21 August 2025","day":21,"month":7,"year":2025},"endDate":{"display":"2 July 2035","day":2,"month":6,"year":2035},"childsDOB":{"display":"3 July 2025","day":3,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07060 871 893","emailAddress":"n.jordan@hotmail.com","medicalCondition":["(2) Epilepsy"]},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"797 761 5456","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"22 June 2004","day":22,"month":5,"year":2004},"certificateReference":"83 494 661 850","channel":"Paper","imageReference":"2026 06 30 13 24 36N494077803","startDate":{"display":"5 October 2025","day":5,"month":9,"year":2025},"medicalCondition":["(1) Permanent fistula","(3) Diabetes mellitus","(4) Myxoedema"],"endDate":{"display":"4 October 2026","day":4,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07071 982 914","emailAddress":"beth.barrett117@gmail.com","dueDate":{"display":"25 July 2025","day":25,"month":6,"year":2025},"childsDOB":{"display":"5 October 2025","day":5,"month":9,"year":2025}},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"933 651 0660","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"13 May 1989","day":13,"month":4,"year":1989},"checking":true,"certificateReference":"45 056 195 064","channel":"Paper","startDate":{"display":"27 December 2025","day":27,"month":11,"year":2025},"dueDate":{"display":"3 October 2025","day":3,"month":9,"year":2025},"endDate":{"display":"26 December 2026","day":26,"month":11,"year":2026},"childsDOB":{"display":"27 December 2025","day":27,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07082 093 125","emailAddress":"mollie.hayes@blueyonder.co.uk","checkType":"supervisor","imageReference":"2026 06 30 13 24 36N770580557","medicalCondition":["(5) Hypoparathyroidism"]},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"052 392 9562","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"26 January 2000","day":26,"month":0,"year":2000},"checking":false,"certificateReference":"18 773 015 425","channel":"Digital","imageReference":"2026 06 30 13 24 34N965695516","startDate":{"display":"4 July 2025","day":4,"month":6,"year":2025},"dueDate":{"display":"21 August 2025","day":21,"month":7,"year":2025},"endDate":{"display":"3 July 2026","day":3,"month":6,"year":2026},"childsDOB":{"display":"4 July 2025","day":4,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07093 114 236","emailAddress":"francesca.cunningham376@gmail.com"},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"317 721 9851","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"9 July 1997","day":9,"month":6,"year":1997},"checking":false,"certificateReference":"53 261 871 720","channel":"Paper","imageReference":"2026 06 30 13 24 36N934665062","startDate":{"display":"4 October 2025","day":4,"month":9,"year":2025},"dueDate":{"display":"10 August 2025","day":10,"month":7,"year":2025},"endDate":{"display":"3 October 2026","day":3,"month":9,"year":2026},"childsDOB":{"display":"4 October 2025","day":4,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07014 225 347","emailAddress":"amelie.barber@outlook.com","checkType":"supervisor","medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"811 783 4727","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"17 June 1977","day":17,"month":5,"year":1977},"checking":false,"certificateReference":"HRT NWOJ KNH5","channel":"Telephony","imageReference":"2026 06 30 13 24 34N076360911","startDate":{"display":"24 September 2025","day":24,"month":8,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"23 September 2026","day":23,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07025 336 458","emailAddress":"l.knight@blueyonder.co.uk","dueDate":{"display":"13 November 2025","day":13,"month":10,"year":2025},"childsDOB":{"display":"16 August 2025","day":16,"month":7,"year":2025}},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"176 773 8281","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"5 July 1967","day":5,"month":6,"year":1967},"checking":true,"checkType":"supervisor","certificateReference":"90 965 856 963","channel":"Paper","imageReference":"2026 06 30 13 24 36N049787928","startDate":{"display":"19 October 2025","day":19,"month":9,"year":2025},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"18 October 2035","day":18,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07036 447 569","emailAddress":"Parsons876@googlemail.com"},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"993 901 0067","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"processing","dateOfBirth":{"display":"25 September 1986","day":25,"month":8,"year":1986},"checking":false,"certificateReference":"51 341 651 931","channel":"Paper","imageReference":"2026 06 30 13 24 36N522065485","startDate":{"display":"1 November 2025","day":1,"month":10,"year":2025},"dueDate":{"display":"27 July 2025","day":27,"month":6,"year":2025},"endDate":{"display":"31 October 2035","day":31,"month":9,"year":2035},"childsDOB":{"display":"27 August 2025","day":27,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07047 558 671","emailAddress":"tilly.bates@aol.com","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"080 651 7910","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"on-hold","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"27 June 1991","day":27,"month":5,"year":1991},"certificateReference":"40 242 401 559","channel":"Paper","imageReference":"2026 06 30 13 24 36N779419141","startDate":{"display":"9 December 2025","day":9,"month":11,"year":2025},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"8 December 2035","day":8,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07029 736 458","emailAddress":"holly.day@outlook.com"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"945 190 5689","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"processing","dateOfBirth":{"display":"5 October 1984","day":5,"month":9,"year":1984},"checking":false,"certificateReference":"59 862 352 952","channel":"Paper","startDate":{"display":"4 August 2025","day":4,"month":7,"year":2025},"endDate":{"display":"3 August 2035","day":3,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07084 372 659","checkType":"quality","imageReference":"2026 06 30 13 24 36N942225606","medicalCondition":["(2) Epilepsy","(4) Myxoedema","(7) Forms of hypoadrenalism"]},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"739 710 1105","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","dateOfBirth":{"display":"4 March 1989","day":4,"month":2,"year":1989},"checking":false,"certificateReference":"42 684 674 745","channel":"Paper","imageReference":"2026 06 30 13 24 36N498657150","startDate":{"display":"2 November 2025","day":2,"month":10,"year":2025},"dueDate":{"display":"15 July 2025","day":15,"month":6,"year":2025},"endDate":{"display":"1 November 2026","day":1,"month":10,"year":2026},"childsDOB":{"display":"2 November 2025","day":2,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07039 747 561","emailAddress":"hope.burton@gmail.com"}]'
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
