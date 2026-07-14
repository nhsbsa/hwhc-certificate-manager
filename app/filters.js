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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"856 254 1348","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"26 December 1992","day":26,"month":11,"year":1992},"checking":false,"certificateReference":"56 975 594 473","channel":"Digital","imageReference":"2026 07 02 15 13 03N510585816","startDate":{"display":"7 September 2025","day":7,"month":8,"year":2025},"dueDate":{"display":"25 October 2025","day":25,"month":9,"year":2025},"endDate":{"display":"6 September 2035","day":6,"month":8,"year":2035},"childsDOB":{"display":"5 September 2025","day":5,"month":8,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07031 284 591","emailAddress":"olivia.smith@aol.com","medicalCondition":["(3) Diabetes mellitus","(8) Myasthenia gravis"]},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"934 737 5731","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"5 August 2007","day":5,"month":7,"year":2007},"checking":false,"certificateReference":"71 054 607 792","channel":"Digital","startDate":{"display":"10 December 2025","day":10,"month":11,"year":2025},"dueDate":{"display":"28 August 2025","day":28,"month":7,"year":2025},"endDate":{"display":"9 December 2026","day":9,"month":11,"year":2026},"childsDOB":{"display":"10 December 2025","day":10,"month":11,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07049 823 716","emailAddress":"amelia.jones@googlemail.com"},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"255 968 5569","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","checking":true,"checkType":"quality","dateOfBirth":{"display":"23 July 1975","day":23,"month":6,"year":1975},"certificateReference":"56 698 191 601","channel":"Paper","imageReference":"2026 07 02 15 13 05N025363292","startDate":{"display":"11 July 2025","day":11,"month":6,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"10 July 2035","day":10,"month":6,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 395 184","emailAddress":"i.taylor429@googlemail.com"},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"104 013 1310","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"14 March 1980","day":14,"month":2,"year":1980},"checking":true,"certificateReference":"88 397 864 988","channel":"Paper","imageReference":"2026 07 02 15 13 05N173679294","startDate":{"display":"30 September 2025","day":30,"month":8,"year":2025},"medicalCondition":["(2) Epilepsy","(6) Diabetes insipidus","(9) Continuing physical disability"],"endDate":{"display":"29 September 2035","day":29,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07071 528 439","checkType":"quality"},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"669 093 5957","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"16 November 1986","day":16,"month":10,"year":1986},"checking":true,"certificateReference":"61 499 775 379","channel":"Paper","imageReference":"2026 07 02 15 13 05N412688575","startDate":{"display":"9 December 2025","day":9,"month":11,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"8 December 2035","day":8,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07083 916 275","emailAddress":"e.williams@googlemail.com","checkType":"supervisor"},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"617 863 1276","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"16 September 1996","day":16,"month":8,"year":1996},"checking":true,"certificateReference":"54 356 324 288","channel":"Paper","startDate":{"display":"28 September 2025","day":28,"month":8,"year":2025},"dueDate":{"display":"27 December 2025","day":27,"month":11,"year":2025},"endDate":{"display":"27 September 2035","day":27,"month":8,"year":2035},"childsDOB":{"display":"20 November 2025","day":20,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07092 475 318","emailAddress":"wilson.s@outlook.com","checkType":"supervisor","imageReference":"2026 07 02 15 13 05N971200022","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"814 766 9767","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"6 February 2007","day":6,"month":1,"year":2007},"checking":false,"certificateReference":"09 940 168 034","channel":"Digital","imageReference":"2026 07 02 15 13 03N287684797","startDate":{"display":"25 December 2025","day":25,"month":11,"year":2025},"medicalCondition":["(5) Hypoparathyroidism","(7) Forms of hypoadrenalism"],"endDate":{"display":"24 December 2026","day":24,"month":11,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07015 648 293","emailAddress":"mia.davies@aol.com","dueDate":{"display":"24 August 2025","day":24,"month":7,"year":2025},"childsDOB":{"display":"25 December 2025","day":25,"month":11,"year":2025}},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"994 351 2760","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","checking":true,"checkType":"quality","dateOfBirth":{"display":"23 July 1991","day":23,"month":6,"year":1991},"certificateReference":"16 881 122 690","channel":"Paper","imageReference":"2026 07 02 15 13 05N333959130","startDate":{"display":"25 December 2025","day":25,"month":11,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"24 December 2026","day":24,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 751 964","emailAddress":"ella.evans191@blueyonder.co.uk","dueDate":{"display":"7 December 2025","day":7,"month":11,"year":2025},"childsDOB":{"display":"25 December 2025","day":25,"month":11,"year":2025}},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"419 818 0221","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","dateOfBirth":{"display":"12 April 1999","day":12,"month":3,"year":1999},"checking":false,"certificateReference":"55 060 863 560","channel":"Paper","startDate":{"display":"27 November 2025","day":27,"month":10,"year":2025},"dueDate":{"display":"31 December 2025","day":31,"month":11,"year":2025},"endDate":{"display":"26 November 2026","day":26,"month":10,"year":2026},"childsDOB":{"display":"27 November 2025","day":27,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07036 592 817","emailAddress":"thomas.g@googlemail.com","imageReference":"2026 07 02 15 13 05N899103647"},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"656 552 9637","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"expired","checking":false,"checkType":"quality","dateOfBirth":{"display":"13 June 1994","day":13,"month":5,"year":1994},"certificateReference":"40 836 330 023","channel":"Paper","imageReference":"2026 07 02 15 13 05N789031838","startDate":{"display":"8 October 2025","day":8,"month":9,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"7 October 2035","day":7,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07047 813 256","emailAddress":"l.roberts@gmail.com"},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"641 600 8805","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"11 March 1971","day":11,"month":2,"year":1971},"checking":false,"checkType":"supervisor","certificateReference":"74 725 029 737","channel":"Paper","imageReference":"2026 07 02 15 13 05N434158003","startDate":{"display":"14 December 2025","day":14,"month":11,"year":2025},"dueDate":{"display":"5 August 2025","day":5,"month":7,"year":2025},"endDate":{"display":"13 December 2035","day":13,"month":11,"year":2035},"childsDOB":{"display":"30 December 2025","day":30,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07051 294 783","emailAddress":"f.johnson@googlemail.com","medicalCondition":["(1) Permanent fistula","(7) Forms of hypoadrenalism"]},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"775 809 1092","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"25 November 1976","day":25,"month":10,"year":1976},"checking":false,"certificateReference":"32 927 423 921","channel":"Paper","startDate":{"display":"7 July 2025","day":7,"month":6,"year":2025},"endDate":{"display":"6 July 2035","day":6,"month":6,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07063 418 592","emailAddress":"lewis.c@googlemail.com","imageReference":"2026 07 02 15 13 05N051067378","medicalCondition":["(3) Diabetes mellitus","(4) Myxoedema","(9) Continuing physical disability"]},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"740 001 6979","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"expired","dateOfBirth":{"display":"3 April 2005","day":3,"month":3,"year":2005},"checking":false,"checkType":"supervisor","certificateReference":"05 659 080 551","channel":"Paper","imageReference":"2026 07 02 15 13 05N702296579","startDate":{"display":"6 September 2025","day":6,"month":8,"year":2025},"dueDate":{"display":"24 September 2025","day":24,"month":8,"year":2025},"endDate":{"display":"5 September 2026","day":5,"month":8,"year":2026},"childsDOB":{"display":"6 September 2025","day":6,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07075 928 341","emailAddress":"i.walker801@outlook.com"},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"266 203 7367","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"processing","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"2 February 1989","day":2,"month":1,"year":1989},"certificateReference":"69 861 685 175","channel":"Paper","imageReference":"2026 07 02 15 13 05N784350768","startDate":{"display":"1 November 2025","day":1,"month":10,"year":2025},"dueDate":{"display":"15 December 2025","day":15,"month":11,"year":2025},"endDate":{"display":"31 October 2035","day":31,"month":9,"year":2035},"childsDOB":{"display":"10 November 2025","day":10,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07084 372 659","medicalCondition":["(2) Epilepsy","(4) Myxoedema","(8) Myasthenia gravis"]},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"271 773 0098","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"18 October 2006","day":18,"month":9,"year":2006},"checking":true,"checkType":"supervisor","certificateReference":"11 568 222 772","channel":"Paper","imageReference":"2026 07 02 15 13 05N249552046","startDate":{"display":"12 December 2025","day":12,"month":11,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"11 December 2026","day":11,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07091 837 426","emailAddress":"clarke.e@aol.com","dueDate":{"display":"2 December 2025","day":2,"month":11,"year":2025},"childsDOB":{"display":"12 December 2025","day":12,"month":11,"year":2025}},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"264 709 7404","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"19 April 2007","day":19,"month":3,"year":2007},"certificateReference":"46 122 135 814","channel":"Paper","imageReference":"2026 07 02 15 13 05N767655000","startDate":{"display":"19 September 2025","day":19,"month":8,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"18 September 2026","day":18,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 385 927","dueDate":{"display":"23 November 2025","day":23,"month":10,"year":2025},"childsDOB":{"display":"19 September 2025","day":19,"month":8,"year":2025}},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"324 599 0414","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"10 September 1991","day":10,"month":8,"year":1991},"checking":false,"certificateReference":"64 376 152 444","channel":"Digital","startDate":{"display":"25 October 2025","day":25,"month":9,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"24 October 2026","day":24,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07027 639 485","emailAddress":"sophie.young219@googlemail.com","dueDate":{"display":"21 November 2025","day":21,"month":10,"year":2025},"childsDOB":{"display":"25 October 2025","day":25,"month":9,"year":2025}},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"411 825 7626","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"23 August 1992","day":23,"month":7,"year":1992},"checking":true,"certificateReference":"83 837 557 300","channel":"Paper","startDate":{"display":"28 November 2025","day":28,"month":10,"year":2025},"dueDate":{"display":"1 August 2025","day":1,"month":7,"year":2025},"endDate":{"display":"27 November 2026","day":27,"month":10,"year":2026},"childsDOB":{"display":"28 November 2025","day":28,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07035 821 749","emailAddress":"h.king@hotmail.com","checkType":"supervisor","imageReference":"2026 07 02 15 13 05N271073176"},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"322 617 3710","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"24 April 1986","day":24,"month":3,"year":1986},"checking":false,"checkType":"quality","certificateReference":"HRT NIT2 B345","channel":"Pharmacy","imageReference":"2026 07 02 15 13 03N253329170","startDate":{"display":"27 September 2025","day":27,"month":8,"year":2025},"dueDate":{"display":"19 November 2025","day":19,"month":10,"year":2025},"endDate":{"display":"26 September 2026","day":26,"month":8,"year":2026},"childsDOB":{"display":"9 December 2025","day":9,"month":11,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07048 952 613","emailAddress":"wright.m@hotmail.com"},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"528 979 4208","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"5 July 1994","day":5,"month":6,"year":1994},"checking":true,"checkType":"quality","certificateReference":"89 227 100 018","channel":"Paper","imageReference":"2026 07 02 15 13 05N846853970","startDate":{"display":"19 October 2025","day":19,"month":9,"year":2025},"dueDate":{"display":"17 October 2025","day":17,"month":9,"year":2025},"endDate":{"display":"18 October 2035","day":18,"month":9,"year":2035},"childsDOB":{"display":"23 September 2025","day":23,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07052 719 384","emailAddress":"ella-rose.green516@googlemail.com","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"400 162 6162","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"5 April 1971","day":5,"month":3,"year":1971},"checking":false,"certificateReference":"09 015 809 687","channel":"Paper","startDate":{"display":"6 November 2025","day":6,"month":10,"year":2025},"dueDate":{"display":"5 December 2025","day":5,"month":11,"year":2025},"endDate":{"display":"5 November 2035","day":5,"month":10,"year":2035},"childsDOB":{"display":"30 December 2025","day":30,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07064 837 295","checkType":"quality","imageReference":"2026 07 02 15 13 05N285513083","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"614 949 6535","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"14 March 2007","day":14,"month":2,"year":2007},"checking":false,"certificateReference":"57 117 224 500","channel":"Paper","startDate":{"display":"21 November 2025","day":21,"month":10,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"20 November 2026","day":20,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07073 491 826","emailAddress":"ruby.adams916@googlemail.com","imageReference":"2026 07 02 15 13 05N511042502","dueDate":{"display":"2 October 2025","day":2,"month":9,"year":2025},"childsDOB":{"display":"21 November 2025","day":21,"month":10,"year":2025}},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"867 030 7928","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"5 May 1993","day":5,"month":4,"year":1993},"checking":false,"certificateReference":"18 444 584 011","channel":"Paper","startDate":{"display":"4 December 2025","day":4,"month":11,"year":2025},"dueDate":{"display":"4 November 2025","day":4,"month":10,"year":2025},"endDate":{"display":"3 December 2035","day":3,"month":11,"year":2035},"childsDOB":{"display":"25 November 2025","day":25,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07085 623 941","emailAddress":"mitchell.c@googlemail.com","imageReference":"2026 07 02 15 13 05N958171640","medicalCondition":["(4) Myxoedema"]},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"999 303 6381","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"20 February 2004","day":20,"month":1,"year":2004},"checking":false,"certificateReference":"24 774 200 342","channel":"Paper","imageReference":"2026 07 02 15 13 05N472158642","startDate":{"display":"21 November 2025","day":21,"month":10,"year":2025},"medicalCondition":["(6) Diabetes insipidus","(7) Forms of hypoadrenalism"],"endDate":{"display":"20 November 2026","day":20,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07096 718 235","emailAddress":"Turner124@googlemail.com","dueDate":{"display":"16 July 2025","day":16,"month":6,"year":2025},"childsDOB":{"display":"21 November 2025","day":21,"month":10,"year":2025}},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"856 723 1419","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"5 December 1969","day":5,"month":11,"year":1969},"checking":false,"checkType":"quality","certificateReference":"49 289 258 976","channel":"Paper","imageReference":"2026 07 02 15 13 05N806816138","startDate":{"display":"7 November 2025","day":7,"month":10,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"6 November 2035","day":6,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07018 273 945"},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"636 157 6033","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"6 July 1987","day":6,"month":6,"year":1987},"checking":false,"certificateReference":"03 261 172 484","channel":"Paper","startDate":{"display":"3 August 2025","day":3,"month":7,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"2 August 2035","day":2,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07029 384 756","emailAddress":"morris.j@aol.com","imageReference":"2026 07 02 15 13 05N563263385"},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"819 351 4554","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"9 September 1970","day":9,"month":8,"year":1970},"checking":false,"checkType":"quality","certificateReference":"70 402 891 877","channel":"Paper","imageReference":"2026 07 02 15 13 05N705347978","startDate":{"display":"17 July 2025","day":17,"month":6,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"16 July 2035","day":16,"month":6,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07031 572 948","emailAddress":"matilda.hughes741@googlemail.com"},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"538 121 1709","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"20 September 1987","day":20,"month":8,"year":1987},"checking":false,"certificateReference":"00 773 281 896","channel":"Paper","imageReference":"2026 07 02 15 13 05N034182969","startDate":{"display":"12 August 2025","day":12,"month":7,"year":2025},"dueDate":{"display":"3 December 2025","day":3,"month":11,"year":2025},"endDate":{"display":"11 August 2035","day":11,"month":7,"year":2035},"childsDOB":{"display":"17 September 2025","day":17,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07042 619 583","emailAddress":"elsie.ward@googlemail.com","checkType":"quality","medicalCondition":["(5) Hypoparathyroidism"]},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"268 758 8049","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"5 February 1993","day":5,"month":1,"year":1993},"certificateReference":"30 343 335 386","channel":"Paper","imageReference":"2026 07 02 15 13 05N692279580","startDate":{"display":"21 September 2025","day":21,"month":8,"year":2025},"medicalCondition":["(4) Myxoedema","(7) Forms of hypoadrenalism"],"endDate":{"display":"20 September 2026","day":20,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07053 847 261","dueDate":{"display":"21 November 2025","day":21,"month":10,"year":2025},"childsDOB":{"display":"21 September 2025","day":21,"month":8,"year":2025}},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"437 714 1542","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"8 May 1994","day":8,"month":4,"year":1994},"checking":false,"certificateReference":"12 707 675 588","channel":"Paper","imageReference":"2026 07 02 15 13 05N269801971","startDate":{"display":"18 September 2025","day":18,"month":8,"year":2025},"dueDate":{"display":"2 October 2025","day":2,"month":9,"year":2025},"endDate":{"display":"17 September 2030","day":17,"month":8,"year":2030},"childsDOB":{"display":"3 December 2025","day":3,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07064 928 137","emailAddress":"a.cooper@googlemail.com","medicalCondition":["(10) Cancer treatments"]},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"376 495 8044","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"9 January 1981","day":9,"month":0,"year":1981},"checking":false,"checkType":"supervisor","certificateReference":"20 113 039 880","channel":"Paper","imageReference":"2026 07 02 15 13 05N678111273","startDate":{"display":"7 November 2025","day":7,"month":10,"year":2025},"medicalCondition":["(5) Hypoparathyroidism","(8) Myasthenia gravis"],"endDate":{"display":"6 November 2035","day":6,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07075 283 916"},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"586 789 9693","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"20 January 1994","day":20,"month":0,"year":1994},"checking":false,"checkType":"supervisor","certificateReference":"20 884 902 269","channel":"Digital","imageReference":"2026 07 02 15 13 03N828237617","startDate":{"display":"13 October 2025","day":13,"month":9,"year":2025},"dueDate":{"display":"27 October 2025","day":27,"month":9,"year":2025},"endDate":{"display":"12 October 2035","day":12,"month":9,"year":2035},"childsDOB":{"display":"27 October 2025","day":27,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07086 419 375","emailAddress":"luna.parker@gmail.com","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"693 897 8420","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"rejected","checking":false,"checkType":"quality","dateOfBirth":{"display":"25 February 1987","day":25,"month":1,"year":1987},"certificateReference":"80 584 337 360","channel":"Paper","imageReference":"2026 07 02 15 13 05N395866663","startDate":{"display":"19 August 2025","day":19,"month":7,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"18 August 2035","day":18,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07097 531 284","emailAddress":"h.phillips@blueyonder.co.uk"},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"480 513 7527","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"3 April 1967","day":3,"month":3,"year":1967},"checking":false,"certificateReference":"HRT R190 3LRR","channel":"Digital","startDate":{"display":"22 July 2025","day":22,"month":6,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"21 July 2026","day":21,"month":6,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07018 642 597","emailAddress":"Bennett867@blueyonder.co.uk"},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"934 301 5454","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"8 April 1972","day":8,"month":3,"year":1972},"certificateReference":"76 060 334 208","channel":"Paper","imageReference":"2026 07 02 15 13 05N972763693","startDate":{"display":"9 October 2025","day":9,"month":9,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"8 October 2035","day":8,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07029 753 861","emailAddress":"cox.f@hotmail.com"},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"257 335 4529","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"11 January 1980","day":11,"month":0,"year":1980},"checking":false,"certificateReference":"HRT 3JQ0 D0FJ","channel":"Digital","imageReference":"2026 07 02 15 13 03N234817208","startDate":{"display":"11 October 2025","day":11,"month":9,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"10 October 2026","day":10,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07031 864 729","emailAddress":"m.richardson@aol.com"},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"760 748 1326","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"18 September 1994","day":18,"month":8,"year":1994},"checking":false,"certificateReference":"88 189 598 570","channel":"Paper","imageReference":"2026 07 02 15 13 05N763771905","startDate":{"display":"20 July 2025","day":20,"month":6,"year":2025},"dueDate":{"display":"28 October 2025","day":28,"month":9,"year":2025},"endDate":{"display":"19 July 2035","day":19,"month":6,"year":2035},"childsDOB":{"display":"10 October 2025","day":10,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07042 987 513","checkType":"quality","medicalCondition":["(2) Epilepsy","(4) Myxoedema","(8) Myasthenia gravis"]},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"200 535 7879","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"27 June 1968","day":27,"month":5,"year":1968},"checking":false,"certificateReference":"HRT UJYL LOS9","channel":"Digital","startDate":{"display":"4 October 2025","day":4,"month":9,"year":2025},"endDate":{"display":"3 October 2026","day":3,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07054 129 876","emailAddress":"ivy.ross@aol.com"},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"193 570 2556","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"25 January 1991","day":25,"month":0,"year":1991},"checking":false,"checkType":"supervisor","certificateReference":"21 747 345 567","channel":"Digital","imageReference":"2026 07 02 15 13 03N232286530","startDate":{"display":"29 August 2025","day":29,"month":7,"year":2025},"dueDate":{"display":"20 December 2025","day":20,"month":11,"year":2025},"endDate":{"display":"28 August 2026","day":28,"month":7,"year":2026},"childsDOB":{"display":"29 August 2025","day":29,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07065 238 741","emailAddress":"arabella.bell@blueyonder.co.uk"},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"205 334 6582","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"7 November 1988","day":7,"month":10,"year":1988},"checking":false,"certificateReference":"82 906 445 512","channel":"Paper","startDate":{"display":"7 November 2025","day":7,"month":10,"year":2025},"medicalCondition":["(1) Permanent fistula","(2) Epilepsy"],"endDate":{"display":"6 November 2035","day":6,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07076 391 825","emailAddress":"evelyn.cook@blueyonder.co.uk","checkType":"quality","imageReference":"2026 07 02 15 13 05N248487458"},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"780 626 1240","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"18 December 1966","day":18,"month":11,"year":1966},"certificateReference":"35 259 233 785","channel":"Paper","imageReference":"2026 07 02 15 13 05N279884999","startDate":{"display":"30 November 2025","day":30,"month":10,"year":2025},"dueDate":{"display":"26 August 2025","day":26,"month":7,"year":2025},"endDate":{"display":"29 November 2035","day":29,"month":10,"year":2035},"childsDOB":{"display":"17 December 2025","day":17,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07087 512 936","emailAddress":"t.watson@googlemail.com","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"338 592 8401","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"12 March 2003","day":12,"month":2,"year":2003},"checking":true,"certificateReference":"56 430 494 812","channel":"Paper","startDate":{"display":"11 August 2025","day":11,"month":7,"year":2025},"endDate":{"display":"10 August 2026","day":10,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07098 631 427","emailAddress":"Sanders682@gmail.com","checkType":"supervisor","imageReference":"2026 07 02 15 13 05N306538416","dueDate":{"display":"25 August 2025","day":25,"month":7,"year":2025},"childsDOB":{"display":"11 August 2025","day":11,"month":7,"year":2025}},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"131 404 2153","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"25 February 1984","day":25,"month":1,"year":1984},"checking":false,"certificateReference":"HRT GX1V NEGM","channel":"Digital","imageReference":"2026 07 02 15 13 03N063152211","startDate":{"display":"21 December 2025","day":21,"month":11,"year":2025},"dueDate":{"display":"10 August 2025","day":10,"month":7,"year":2025},"endDate":{"display":"20 December 2026","day":20,"month":11,"year":2026},"childsDOB":{"display":"3 August 2025","day":3,"month":7,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07019 742 835","emailAddress":"e.harrison@gmail.com"},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"395 817 3442","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"18 March 1994","day":18,"month":2,"year":1994},"checking":true,"checkType":"supervisor","certificateReference":"19 315 683 459","channel":"Paper","imageReference":"2026 07 02 15 13 05N421541410","startDate":{"display":"9 September 2025","day":9,"month":8,"year":2025},"medicalCondition":["(1) Permanent fistula","(5) Hypoparathyroidism","(9) Continuing physical disability"],"endDate":{"display":"8 September 2026","day":8,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07020 853 749","dueDate":{"display":"12 July 2025","day":12,"month":6,"year":2025},"childsDOB":{"display":"9 September 2025","day":9,"month":8,"year":2025}},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"022 381 3393","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"6 September 1985","day":6,"month":8,"year":1985},"checking":true,"checkType":"supervisor","certificateReference":"95 360 430 412","channel":"Paper","imageReference":"2026 07 02 15 13 05N587400560","startDate":{"display":"6 September 2025","day":6,"month":8,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"5 September 2035","day":5,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07031 984 625","emailAddress":"amber.murphy@hotmail.com"},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"649 374 2502","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"expired","checking":false,"checkType":"quality","dateOfBirth":{"display":"20 July 1992","day":20,"month":6,"year":1992},"certificateReference":"97 342 855 992","channel":"Digital","imageReference":"2026 07 02 15 13 03N058859947","startDate":{"display":"9 July 2025","day":9,"month":6,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"8 July 2026","day":8,"month":6,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07042 195 783","emailAddress":"s.graham589@blueyonder.co.uk","dueDate":{"display":"6 October 2025","day":6,"month":9,"year":2025},"childsDOB":{"display":"9 July 2025","day":9,"month":6,"year":2025}},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"378 652 9420","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","checking":false,"checkType":"quality","dateOfBirth":{"display":"27 July 1999","day":27,"month":6,"year":1999},"certificateReference":"78 799 773 510","channel":"Digital","imageReference":"2026 07 02 15 13 03N058863362","startDate":{"display":"4 November 2025","day":4,"month":10,"year":2025},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"3 November 2026","day":3,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07053 268 917","emailAddress":"b.stevens@googlemail.com","dueDate":{"display":"28 July 2025","day":28,"month":6,"year":2025},"childsDOB":{"display":"4 November 2025","day":4,"month":10,"year":2025}},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"463 828 0811","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"22 April 1989","day":22,"month":3,"year":1989},"checking":true,"checkType":"supervisor","certificateReference":"53 206 589 424","channel":"Paper","imageReference":"2026 07 02 15 13 05N560864142","startDate":{"display":"14 August 2025","day":14,"month":7,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"13 August 2035","day":13,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07064 371 528"},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"280 719 2766","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"8 June 1973","day":8,"month":5,"year":1973},"checking":false,"certificateReference":"69 962 362 062","channel":"Paper","imageReference":"2026 07 02 15 13 05N866535188","startDate":{"display":"28 August 2025","day":28,"month":7,"year":2025},"dueDate":{"display":"26 September 2025","day":26,"month":8,"year":2025},"endDate":{"display":"27 August 2035","day":27,"month":7,"year":2035},"childsDOB":{"display":"24 July 2025","day":24,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07075 482 936","emailAddress":"harriet.butler@aol.com","checkType":"quality","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"514 971 5828","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"19 March 1967","day":19,"month":2,"year":1967},"checking":false,"checkType":"supervisor","certificateReference":"33 124 517 138","channel":"Paper","imageReference":"2026 07 02 15 13 05N321599684","startDate":{"display":"3 November 2025","day":3,"month":10,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"2 November 2035","day":2,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07086 593 147","emailAddress":"eleanor.chapman@googlemail.com"},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"007 690 6489","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","checking":false,"checkType":"quality","dateOfBirth":{"display":"18 January 1999","day":18,"month":0,"year":1999},"certificateReference":"73 882 310 792","channel":"Digital","imageReference":"2026 07 02 15 13 03N977562470","startDate":{"display":"18 October 2025","day":18,"month":9,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"17 October 2026","day":17,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07097 614 258","emailAddress":"aisha.ali@googlemail.com","dueDate":{"display":"23 September 2025","day":23,"month":8,"year":2025},"childsDOB":{"display":"18 October 2025","day":18,"month":9,"year":2025}},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"694 218 1497","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"expired","dateOfBirth":{"display":"4 February 1989","day":4,"month":1,"year":1989},"checking":false,"certificateReference":"01 032 460 888","channel":"Digital","imageReference":"2026 07 02 15 13 03N935278981","startDate":{"display":"16 August 2025","day":16,"month":7,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"15 August 2026","day":15,"month":7,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07018 725 369","emailAddress":"s.hussain@blueyonder.co.uk","dueDate":{"display":"3 November 2025","day":3,"month":10,"year":2025},"childsDOB":{"display":"16 August 2025","day":16,"month":7,"year":2025}},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"650 455 7577","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"14 December 1992","day":14,"month":11,"year":1992},"certificateReference":"HRT 11UN KXZC","channel":"Digital","imageReference":"2026 07 02 15 13 03N162111650","startDate":{"display":"6 August 2025","day":6,"month":7,"year":2025},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"5 August 2026","day":5,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07029 836 471","emailAddress":"Khan646@aol.com"},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"886 193 5818","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"12 August 1988","day":12,"month":7,"year":1988},"certificateReference":"66 424 531 216","channel":"Paper","imageReference":"2026 07 02 15 13 05N093590266","startDate":{"display":"4 September 2025","day":4,"month":8,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"3 September 2035","day":3,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07030 947 582","emailAddress":"leah.begum@googlemail.com"},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"948 694 7266","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"18 January 1990","day":18,"month":0,"year":1990},"checking":false,"certificateReference":"16 548 365 580","channel":"Paper","startDate":{"display":"1 December 2025","day":1,"month":11,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"30 November 2026","day":30,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07042 058 693","emailAddress":"n.o’connor@outlook.com","imageReference":"2026 07 02 15 13 05N797460033","dueDate":{"display":"27 October 2025","day":27,"month":9,"year":2025},"childsDOB":{"display":"1 December 2025","day":1,"month":11,"year":2025}},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"336 501 1536","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","checking":false,"checkType":"quality","dateOfBirth":{"display":"24 June 1998","day":24,"month":5,"year":1998},"certificateReference":"86 709 838 545","channel":"Digital","imageReference":"2026 07 02 15 13 03N163176017","startDate":{"display":"2 July 2025","day":2,"month":6,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"1 July 2026","day":1,"month":6,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07053 169 784","emailAddress":"aoife.kelly@googlemail.com","dueDate":{"display":"5 September 2025","day":5,"month":8,"year":2025},"childsDOB":{"display":"2 July 2025","day":2,"month":6,"year":2025}},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"673 837 5677","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"10 August 2000","day":10,"month":7,"year":2000},"checking":false,"certificateReference":"65 654 452 640","channel":"Digital","startDate":{"display":"30 October 2025","day":30,"month":9,"year":2025},"endDate":{"display":"29 October 2026","day":29,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07064 271 895","emailAddress":"erin.mccarthy@googlemail.com","dueDate":{"display":"21 November 2025","day":21,"month":10,"year":2025},"childsDOB":{"display":"30 October 2025","day":30,"month":9,"year":2025}},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"016 052 8648","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"22 March 1969","day":22,"month":2,"year":1969},"checking":false,"certificateReference":"62 045 397 389","channel":"Digital","startDate":{"display":"16 November 2025","day":16,"month":10,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"15 November 2035","day":15,"month":10,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07075 382 916","emailAddress":"o.doyle@hotmail.com"},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"948 760 5527","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"3 December 1992","day":3,"month":11,"year":1992},"certificateReference":"05 826 718 345","channel":"Paper","imageReference":"2026 07 02 15 13 05N239581972","startDate":{"display":"7 December 2025","day":7,"month":11,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"6 December 2026","day":6,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07086 493 127","dueDate":{"display":"7 September 2025","day":7,"month":8,"year":2025},"childsDOB":{"display":"7 December 2025","day":7,"month":11,"year":2025}},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"719 253 0970","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"27 July 1978","day":27,"month":6,"year":1978},"checking":false,"certificateReference":"14 047 467 982","channel":"Paper","imageReference":"2026 07 02 15 13 05N044977195","startDate":{"display":"18 December 2025","day":18,"month":11,"year":2025},"medicalCondition":["(6) Diabetes insipidus","(7) Forms of hypoadrenalism","(9) Continuing physical disability"],"endDate":{"display":"17 December 2035","day":17,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07097 514 238","emailAddress":"megan.rees@googlemail.com","checkType":"quality"},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"688 553 5781","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"24 January 1969","day":24,"month":0,"year":1969},"checking":true,"certificateReference":"91 804 352 802","channel":"Paper","startDate":{"display":"17 October 2025","day":17,"month":9,"year":2025},"dueDate":{"display":"31 August 2025","day":31,"month":7,"year":2025},"endDate":{"display":"16 October 2035","day":16,"month":9,"year":2035},"childsDOB":{"display":"16 September 2025","day":16,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07018 625 349","checkType":"supervisor","imageReference":"2026 07 02 15 13 05N272421590","medicalCondition":["(4) Myxoedema"]},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"916 971 2622","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"6 March 1972","day":6,"month":2,"year":1972},"checking":false,"certificateReference":"42 482 255 621","channel":"Paper","startDate":{"display":"2 July 2025","day":2,"month":6,"year":2025},"dueDate":{"display":"13 August 2025","day":13,"month":7,"year":2025},"endDate":{"display":"1 July 2035","day":1,"month":6,"year":2035},"childsDOB":{"display":"9 July 2025","day":9,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07029 736 458","emailAddress":"e.macdonald@gmail.com","checkType":"quality","imageReference":"2026 07 02 15 13 05N806585181","medicalCondition":["(5) Hypoparathyroidism"]},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"058 247 5651","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"7 March 1972","day":7,"month":2,"year":1972},"checking":true,"certificateReference":"98 971 636 030","channel":"Paper","startDate":{"display":"14 September 2025","day":14,"month":8,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"13 September 2035","day":13,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07030 847 569","emailAddress":"Fraser499@hotmail.com","checkType":"supervisor","imageReference":"2026 07 02 15 13 05N951472163"},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"889 834 5961","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"11 October 1970","day":11,"month":9,"year":1970},"checking":false,"certificateReference":"08 540 761 136","channel":"Paper","startDate":{"display":"19 September 2025","day":19,"month":8,"year":2025},"medicalCondition":["(1) Permanent fistula","(2) Epilepsy"],"endDate":{"display":"18 September 2035","day":18,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07041 958 672","emailAddress":"armstrong.m@blueyonder.co.uk","imageReference":"2026 07 02 15 13 05N952096762"},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"283 163 2471","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"23 August 2005","day":23,"month":7,"year":2005},"checking":false,"certificateReference":"98 361 274 401","channel":"Paper","imageReference":"2026 07 02 15 13 05N569461559","startDate":{"display":"31 July 2025","day":31,"month":6,"year":2025},"medicalCondition":["(4) Myxoedema","(7) Forms of hypoadrenalism","(9) Continuing physical disability"],"endDate":{"display":"30 July 2026","day":30,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07052 069 783","emailAddress":"p.hunter@hotmail.com","dueDate":{"display":"10 December 2025","day":10,"month":11,"year":2025},"childsDOB":{"display":"31 July 2025","day":31,"month":6,"year":2025}},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"644 261 8240","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"19 February 1974","day":19,"month":1,"year":1974},"checking":true,"certificateReference":"36 797 815 379","channel":"Paper","startDate":{"display":"15 November 2025","day":15,"month":10,"year":2025},"endDate":{"display":"14 November 2035","day":14,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07063 171 894","emailAddress":"c.lawrence@hotmail.com","checkType":"supervisor","imageReference":"2026 07 02 15 13 05N187531459","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"432 598 9108","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"11 October 1980","day":11,"month":9,"year":1980},"certificateReference":"56 191 495 344","channel":"Paper","imageReference":"2026 07 02 15 13 05N224090092","startDate":{"display":"28 July 2025","day":28,"month":6,"year":2025},"medicalCondition":["(4) Myxoedema","(7) Forms of hypoadrenalism"],"endDate":{"display":"27 July 2035","day":27,"month":6,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07074 282 915"},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"444 809 5785","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"15 December 1971","day":15,"month":11,"year":1971},"checking":true,"certificateReference":"60 274 492 889","channel":"Paper","startDate":{"display":"26 October 2025","day":26,"month":9,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"25 October 2035","day":25,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07085 393 126","checkType":"supervisor","imageReference":"2026 07 02 15 13 05N065247325"},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"528 730 1933","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"22 February 1990","day":22,"month":1,"year":1990},"checking":true,"certificateReference":"22 396 820 292","channel":"Paper","startDate":{"display":"7 December 2025","day":7,"month":11,"year":2025},"dueDate":{"display":"12 October 2025","day":12,"month":9,"year":2025},"endDate":{"display":"6 December 2035","day":6,"month":11,"year":2035},"childsDOB":{"display":"11 July 2025","day":11,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07096 414 237","checkType":"supervisor","imageReference":"2026 07 02 15 13 05N536313182","medicalCondition":["(2) Epilepsy"]},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"583 795 4494","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"9 May 1971","day":9,"month":4,"year":1971},"checking":false,"certificateReference":"14 144 345 249","channel":"Paper","startDate":{"display":"17 September 2025","day":17,"month":8,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"16 September 2035","day":16,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07017 525 348","emailAddress":"henderson.h@googlemail.com","imageReference":"2026 07 02 15 13 05N395576225"},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"623 915 0440","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"8 April 1992","day":8,"month":3,"year":1992},"checking":false,"certificateReference":"34 863 342 268","channel":"Paper","imageReference":"2026 07 02 15 13 05N193681295","startDate":{"display":"27 December 2025","day":27,"month":11,"year":2025},"dueDate":{"display":"4 November 2025","day":4,"month":10,"year":2025},"endDate":{"display":"26 December 2035","day":26,"month":11,"year":2035},"childsDOB":{"display":"18 September 2025","day":18,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07028 636 459","checkType":"quality","medicalCondition":["(7) Forms of hypoadrenalism"]},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"541 209 7198","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"9 September 2001","day":9,"month":8,"year":2001},"checking":true,"checkType":"supervisor","certificateReference":"07 468 746 716","channel":"Paper","imageReference":"2026 07 02 15 13 05N225020932","startDate":{"display":"14 August 2025","day":14,"month":7,"year":2025},"medicalCondition":["(1) Permanent fistula","(3) Diabetes mellitus","(8) Myasthenia gravis"],"endDate":{"display":"13 August 2026","day":13,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07039 747 561","emailAddress":"nicholson.l@blueyonder.co.uk","dueDate":{"display":"23 October 2025","day":23,"month":9,"year":2025},"childsDOB":{"display":"14 August 2025","day":14,"month":7,"year":2025}},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"399 904 6183","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"16 June 1968","day":16,"month":5,"year":1968},"checking":false,"certificateReference":"94 668 504 681","channel":"Paper","startDate":{"display":"28 September 2025","day":28,"month":8,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"27 September 2035","day":27,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07040 858 673","emailAddress":"julia.gardner@aol.com","imageReference":"2026 07 02 15 13 05N286968412"},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"783 286 9403","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"7 October 1977","day":7,"month":9,"year":1977},"certificateReference":"85 728 851 011","channel":"Digital","imageReference":"2026 07 02 15 13 03N857304102","startDate":{"display":"13 November 2025","day":13,"month":10,"year":2025},"dueDate":{"display":"21 November 2025","day":21,"month":10,"year":2025},"endDate":{"display":"12 November 2035","day":12,"month":10,"year":2035},"childsDOB":{"display":"15 October 2025","day":15,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07051 969 782","emailAddress":"a.newton@hotmail.com","medicalCondition":["(3) Diabetes mellitus","(8) Myasthenia gravis"]},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"135 036 9112","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"3 February 2001","day":3,"month":1,"year":2001},"checking":true,"certificateReference":"21 197 143 143","channel":"Paper","imageReference":"2026 07 02 15 13 05N914199486","startDate":{"display":"12 September 2025","day":12,"month":8,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"11 September 2026","day":11,"month":8,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07062 071 893","checkType":"supervisor","dueDate":{"display":"21 July 2025","day":21,"month":6,"year":2025},"childsDOB":{"display":"12 September 2025","day":12,"month":8,"year":2025}},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"460 457 2441","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"13 November 1988","day":13,"month":10,"year":1988},"checking":true,"certificateReference":"74 381 099 073","channel":"Paper","imageReference":"2026 07 02 15 13 05N129768973","startDate":{"display":"30 December 2025","day":30,"month":11,"year":2025},"dueDate":{"display":"7 September 2025","day":7,"month":8,"year":2025},"endDate":{"display":"29 December 2035","day":29,"month":11,"year":2035},"childsDOB":{"display":"11 September 2025","day":11,"month":8,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07073 182 914","emailAddress":"v.harvey@gmail.com","checkType":"supervisor","medicalCondition":["(1) Permanent fistula","(8) Myasthenia gravis","(10) Cancer treatments"]},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"270 088 2535","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"25 August 1989","day":25,"month":7,"year":1989},"checking":false,"certificateReference":"45 735 617 080","channel":"Digital","imageReference":"2026 07 02 15 13 03N413059597","startDate":{"display":"31 August 2025","day":31,"month":7,"year":2025},"medicalCondition":["(2) Epilepsy","(7) Forms of hypoadrenalism","(8) Myasthenia gravis"],"endDate":{"display":"30 August 2026","day":30,"month":7,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07084 293 125","emailAddress":"maria.fernandez@googlemail.com","dueDate":{"display":"17 October 2025","day":17,"month":9,"year":2025},"childsDOB":{"display":"31 August 2025","day":31,"month":7,"year":2025}},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"455 260 1250","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"processing","checking":false,"checkType":"quality","dateOfBirth":{"display":"7 September 1996","day":7,"month":8,"year":1996},"certificateReference":"94 771 409 411","channel":"Paper","imageReference":"2026 07 02 15 13 05N690502125","startDate":{"display":"8 August 2025","day":8,"month":7,"year":2025},"medicalCondition":["(3) Diabetes mellitus","(4) Myxoedema","(8) Myasthenia gravis"],"endDate":{"display":"7 August 2026","day":7,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07095 314 236","emailAddress":"elena.silva@outlook.com","dueDate":{"display":"19 December 2025","day":19,"month":11,"year":2025},"childsDOB":{"display":"8 August 2025","day":8,"month":7,"year":2025}},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"774 984 8579","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"18 October 1986","day":18,"month":9,"year":1986},"checking":false,"certificateReference":"97 947 203 728","channel":"Digital","imageReference":"2026 07 02 15 13 03N973435630","startDate":{"display":"23 August 2025","day":23,"month":7,"year":2025},"dueDate":{"display":"9 October 2025","day":9,"month":9,"year":2025},"endDate":{"display":"22 August 2035","day":22,"month":7,"year":2035},"childsDOB":{"display":"5 November 2025","day":5,"month":10,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07016 425 347","emailAddress":"l.patel@gmail.com","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"457 053 6071","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"3 January 1992","day":3,"month":0,"year":1992},"checking":false,"certificateReference":"21 558 496 903","channel":"Paper","startDate":{"display":"4 October 2025","day":4,"month":9,"year":2025},"endDate":{"display":"3 October 2035","day":3,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07027 536 458","imageReference":"2026 07 02 15 13 05N177554304","medicalCondition":["(1) Permanent fistula","(4) Myxoedema","(8) Myasthenia gravis"]},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"428 988 0749","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"21 May 1968","day":21,"month":4,"year":1968},"certificateReference":"65 062 837 882","channel":"Paper","imageReference":"2026 07 02 15 13 05N487748312","startDate":{"display":"6 October 2025","day":6,"month":9,"year":2025},"medicalCondition":["(2) Epilepsy","(3) Diabetes mellitus","(6) Diabetes insipidus"],"endDate":{"display":"5 October 2035","day":5,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07038 647 569"},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"888 756 4320","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"expired","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"11 March 1970","day":11,"month":2,"year":1970},"certificateReference":"63 622 884 767","channel":"Digital","imageReference":"2026 07 02 15 13 03N270190993","startDate":{"display":"11 August 2025","day":11,"month":7,"year":2025},"dueDate":{"display":"5 December 2025","day":5,"month":11,"year":2025},"endDate":{"display":"10 August 2035","day":10,"month":7,"year":2035},"childsDOB":{"display":"15 October 2025","day":15,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07049 758 671","emailAddress":"rashid.n@outlook.com","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"249 431 4593","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"7 October 1979","day":7,"month":9,"year":1979},"checking":true,"checkType":"supervisor","certificateReference":"59 916 173 954","channel":"Paper","imageReference":"2026 07 02 15 13 05N973503724","startDate":{"display":"3 August 2025","day":3,"month":7,"year":2025},"dueDate":{"display":"31 August 2025","day":31,"month":7,"year":2025},"endDate":{"display":"2 August 2035","day":2,"month":7,"year":2035},"childsDOB":{"display":"16 October 2025","day":16,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07050 869 782","emailAddress":"tara.paterson@blueyonder.co.uk","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"507 105 7956","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"9 August 1973","day":9,"month":7,"year":1973},"checking":false,"checkType":"supervisor","certificateReference":"HRT JVYC MI3P","channel":"Digital","imageReference":"2026 07 02 15 13 03N211220666","startDate":{"display":"16 December 2025","day":16,"month":11,"year":2025},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"15 December 2026","day":15,"month":11,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07061 971 893","emailAddress":"b.foster@gmail.com"},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"989 326 2921","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"13 February 2008","day":13,"month":1,"year":2008},"checking":false,"certificateReference":"67 938 126 902","channel":"Paper","imageReference":"2026 07 02 15 13 05N738211739","startDate":{"display":"10 December 2025","day":10,"month":11,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"9 December 2026","day":9,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07072 082 914","emailAddress":"lauren.fox@blueyonder.co.uk","dueDate":{"display":"31 December 2025","day":31,"month":11,"year":2025},"childsDOB":{"display":"10 December 2025","day":10,"month":11,"year":2025}},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"154 259 4588","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"11 October 1991","day":11,"month":9,"year":1991},"checking":true,"certificateReference":"53 611 093 246","channel":"Paper","startDate":{"display":"4 July 2025","day":4,"month":6,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"3 July 2035","day":3,"month":6,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07083 193 125","emailAddress":"georgia.grant@aol.com","checkType":"supervisor","imageReference":"2026 07 02 15 13 05N877171649"},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"046 742 4403","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"18 April 1993","day":18,"month":3,"year":1993},"checking":false,"checkType":"quality","certificateReference":"26 286 899 821","channel":"Paper","imageReference":"2026 07 02 15 13 05N584799619","startDate":{"display":"1 November 2025","day":1,"month":10,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"31 October 2035","day":31,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07094 214 236"},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"379 945 0473","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"9 July 1967","day":9,"month":6,"year":1967},"checking":false,"certificateReference":"48 952 675 780","channel":"Paper","imageReference":"2026 07 02 15 13 05N282669646","startDate":{"display":"21 July 2025","day":21,"month":6,"year":2025},"dueDate":{"display":"18 October 2025","day":18,"month":9,"year":2025},"endDate":{"display":"20 July 2035","day":20,"month":6,"year":2035},"childsDOB":{"display":"31 August 2025","day":31,"month":7,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07015 325 347","emailAddress":"e.west@googlemail.com","medicalCondition":["(2) Epilepsy","(6) Diabetes insipidus","(10) Cancer treatments"]},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"058 698 3533","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"26 March 1986","day":26,"month":2,"year":1986},"checking":true,"certificateReference":"04 517 272 271","channel":"Paper","startDate":{"display":"25 November 2025","day":25,"month":10,"year":2025},"endDate":{"display":"24 November 2035","day":24,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07026 436 458","emailAddress":"Matthews385@gmail.com","checkType":"supervisor","imageReference":"2026 07 02 15 13 05N357631439","medicalCondition":["(2) Epilepsy"]},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"731 807 7892","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"21 October 2007","day":21,"month":9,"year":2007},"checking":false,"certificateReference":"44 571 157 716","channel":"Digital","imageReference":"2026 07 02 15 13 03N291188016","startDate":{"display":"7 July 2025","day":7,"month":6,"year":2025},"dueDate":{"display":"4 July 2025","day":4,"month":6,"year":2025},"endDate":{"display":"6 July 2026","day":6,"month":6,"year":2026},"childsDOB":{"display":"7 July 2025","day":7,"month":6,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07037 547 569","emailAddress":"Holmes981@blueyonder.co.uk"},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"336 083 7648","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"22 September 1976","day":22,"month":8,"year":1976},"checking":false,"checkType":"quality","certificateReference":"HRT EJEO YIFW","channel":"Digital","imageReference":"2026 07 02 15 13 03N228602761","startDate":{"display":"14 August 2025","day":14,"month":7,"year":2025},"medicalCondition":["(4) Myxoedema","(8) Myasthenia gravis","(10) Cancer treatments"],"endDate":{"display":"13 August 2026","day":13,"month":7,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07048 658 671","emailAddress":"walsh.l@blueyonder.co.uk"},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"444 933 7110","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"18 October 1996","day":18,"month":9,"year":1996},"checking":true,"checkType":"supervisor","certificateReference":"93 302 965 969","channel":"Paper","imageReference":"2026 07 02 15 13 05N533859954","startDate":{"display":"14 July 2025","day":14,"month":6,"year":2025},"dueDate":{"display":"11 September 2025","day":11,"month":8,"year":2025},"endDate":{"display":"13 July 2026","day":13,"month":6,"year":2026},"childsDOB":{"display":"14 July 2025","day":14,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07059 769 782","emailAddress":"a.page@aol.com"},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"289 159 8625","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"7 February 1984","day":7,"month":1,"year":1984},"checking":false,"certificateReference":"76 580 410 741","channel":"Paper","startDate":{"display":"13 August 2025","day":13,"month":7,"year":2025},"dueDate":{"display":"4 October 2025","day":4,"month":9,"year":2025},"endDate":{"display":"12 August 2035","day":12,"month":7,"year":2035},"childsDOB":{"display":"29 July 2025","day":29,"month":6,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07060 871 893","emailAddress":"Jordan904@gmail.com","imageReference":"2026 07 02 15 13 05N059434612","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"466 853 8054","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"3 December 2005","day":3,"month":11,"year":2005},"checking":true,"checkType":"supervisor","certificateReference":"53 608 324 706","channel":"Paper","imageReference":"2026 07 02 15 13 05N843552773","startDate":{"display":"29 July 2025","day":29,"month":6,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"28 July 2026","day":28,"month":6,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07071 982 914","dueDate":{"display":"29 November 2025","day":29,"month":10,"year":2025},"childsDOB":{"display":"29 July 2025","day":29,"month":6,"year":2025}},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"094 321 4466","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"5 November 1992","day":5,"month":10,"year":1992},"checking":false,"certificateReference":"94 575 974 080","channel":"Paper","imageReference":"2026 07 02 15 13 05N132542987","startDate":{"display":"19 October 2025","day":19,"month":9,"year":2025},"dueDate":{"display":"22 August 2025","day":22,"month":7,"year":2025},"endDate":{"display":"18 October 2030","day":18,"month":9,"year":2030},"childsDOB":{"display":"22 November 2025","day":22,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07082 093 125","medicalCondition":["(10) Cancer treatments"]},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"994 031 4265","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"8 January 2002","day":8,"month":0,"year":2002},"checking":false,"certificateReference":"86 790 842 141","channel":"Digital","imageReference":"2026 07 02 15 13 03N834724965","startDate":{"display":"16 December 2025","day":16,"month":11,"year":2025},"dueDate":{"display":"23 December 2025","day":23,"month":11,"year":2025},"endDate":{"display":"15 December 2026","day":15,"month":11,"year":2026},"childsDOB":{"display":"16 December 2025","day":16,"month":11,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07093 114 236","emailAddress":"cunningham.f@outlook.com"},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"482 124 6209","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"16 October 1980","day":16,"month":9,"year":1980},"checking":false,"certificateReference":"17 622 527 398","channel":"Paper","imageReference":"2026 07 02 15 13 05N493581687","startDate":{"display":"21 September 2025","day":21,"month":8,"year":2025},"medicalCondition":["(1) Permanent fistula","(5) Hypoparathyroidism","(10) Cancer treatments"],"endDate":{"display":"20 September 2035","day":20,"month":8,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07014 225 347","emailAddress":"amelie.barber@gmail.com","checkType":"quality"},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"090 246 1518","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"13 October 1972","day":13,"month":9,"year":1972},"checking":true,"certificateReference":"02 697 397 495","channel":"Paper","startDate":{"display":"27 August 2025","day":27,"month":7,"year":2025},"endDate":{"display":"26 August 2035","day":26,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07025 336 458","emailAddress":"l.knight@hotmail.com","checkType":"supervisor","imageReference":"2026 07 02 15 13 05N305753989","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"273 526 5178","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"23 February 1996","day":23,"month":1,"year":1996},"certificateReference":"70 124 536 533","channel":"Paper","imageReference":"2026 07 02 15 13 05N806575466","startDate":{"display":"7 October 2025","day":7,"month":9,"year":2025},"medicalCondition":["(8) Myasthenia gravis","(10) Cancer treatments"],"endDate":{"display":"6 October 2026","day":6,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07036 447 569","dueDate":{"display":"17 August 2025","day":17,"month":7,"year":2025},"childsDOB":{"display":"7 October 2025","day":7,"month":9,"year":2025}},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"021 512 3287","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"9 May 1989","day":9,"month":4,"year":1989},"checking":true,"certificateReference":"91 167 735 291","channel":"Paper","imageReference":"2026 07 02 15 13 05N267807063","startDate":{"display":"21 November 2025","day":21,"month":10,"year":2025},"dueDate":{"display":"26 December 2025","day":26,"month":11,"year":2025},"endDate":{"display":"20 November 2026","day":20,"month":10,"year":2026},"childsDOB":{"display":"21 November 2025","day":21,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07047 558 671","emailAddress":"t.bates826@blueyonder.co.uk","checkType":"supervisor"},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"630 370 3191","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"11 September 1969","day":11,"month":8,"year":1969},"checking":true,"certificateReference":"19 611 269 075","channel":"Paper","imageReference":"2026 07 02 15 13 05N431909106","startDate":{"display":"5 December 2025","day":5,"month":11,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"4 December 2035","day":4,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07098 631 427","emailAddress":"h.day@gmail.com","checkType":"supervisor"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"526 793 8786","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"15 March 1993","day":15,"month":2,"year":1993},"checking":true,"certificateReference":"63 020 938 945","channel":"Paper","imageReference":"2026 07 02 15 13 05N813072912","startDate":{"display":"25 August 2025","day":25,"month":7,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"24 August 2035","day":24,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07047 813 256","checkType":"supervisor"},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"566 812 8731","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"11 July 1988","day":11,"month":6,"year":1988},"checking":true,"certificateReference":"43 530 577 143","channel":"Paper","startDate":{"display":"7 August 2025","day":7,"month":7,"year":2025},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"6 August 2035","day":6,"month":7,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07048 952 613","checkType":"supervisor","imageReference":"2026 07 02 15 13 05N793834286"}]'
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

  const nextPatient = checkingPatients[currentIndex + 1];

  if (!nextPatient) {
    return '/v1/dashboard';
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
