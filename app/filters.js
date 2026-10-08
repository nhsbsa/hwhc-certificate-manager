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
  // filters.getSupervisorDashboardRows = function (processors) {

  //   const rows = [];

  //   Object.entries(processors).forEach(function (p) {

  //     const processor = p[1]; // Weird quirk in how Object.entries works...

  //     const arr = [
  //       { html: '<a class="nhsuk-link nhsuk-link--no-visited-state" href="processor?searchChecking=true&searchProcessor=' + p[0] + '">' + processor.name + '</a>' },
  //       { text: p[0] },
  //       { text: processor.stats[0] },
  //       { text: processor.stats[1] },
  //       { text: processor.stats[2] },
  //       { text: processor.stats[3] },
  //       { text: processor.stats[4] },
  //       { html: (processor.level === 'trainee') ? '<strong>10</strong> <span class="nhsuk-u-font-size-14">(' + processor.checkingLevel + '%)</span></strong>' : '<strong>0</strong>' }
  //     ];


  //     rows.push(arr);

  //   });

  //   return rows;

  // };

filters.getSupervisorDashboardRows = function (processors) {

  const rows = [];
  const totals = [0, 0, 0, 0, 0];
  let totalForYouToCheck = 0;

  Object.entries(processors).forEach(function (p) {

    const processor = p[1];
    const stats = processor.stats || [0, 0, 0, 0, 0];
    const forYouToCheck = (processor.level === 'trainee') ? 10 : 0;

    stats.forEach(function (value, index) {
      totals[index] += Number(value || 0);
    });

    totalForYouToCheck += forYouToCheck;

    rows.push([
      {
        html: '<a class="nhsuk-link nhsuk-link--no-visited-state" href="processor?searchChecking=true&searchProcessor=' + p[0] + '">' + processor.name + '</a>'
      },
      { text: p[0] },
      { text: stats[0] },
      { text: stats[1] },
      { text: stats[2] },
      { text: stats[3] },
      { text: stats[4] },
      {
        html: (processor.level === 'trainee')
          ? '<strong>' + forYouToCheck + '</strong> <span class="nhsuk-u-font-size-14">(' + processor.checkingLevel + '%)</span>'
          : '<strong>0</strong>'
      }
    ]);

  });

  rows.push([
    { html: '<strong>Total</strong>' },
    { text: '' },
    { text: totals[0] },
    { text: totals[1] },
    { text: totals[2] },
    { text: totals[3] },
    { text: totals[4] },
    { html: '<strong>' + totalForYouToCheck + '</strong>' }
  ]);

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

      if (processorTable) {

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
                link = patient.certificateType + '/comparison--has-feedback?patientID=' + patient.id;
              } else {
                link = patient.certificateType + '/comparison--no-feedback?patientID=' + patient.id;
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

        const hasCertificateReference = patient.certificateReference && String(patient.certificateReference).trim() !== '';

        obj = [
          { html: nameHTML },
          { html: addressHtml },
          { html: patient.address.postcode },
          { html: patient.dateOfBirth.display },
          { html: _getCertificateTypeTextOrTag(patient.certificateType, true) },
          { html: _getStatusTextOrTag(patient.status, true) },
          { html: patient.applicationReference || 'Not available' },
          { html: _getReferenceHtml(patient.certificateReference) },
          { html: hasCertificateReference ? (patient.startDate && patient.startDate.display) || '<span class="nhsuk-hint">Not available</span>' : '<span class="nhsuk-hint">Not available</span>' },
          { html: hasCertificateReference ? (patient.endDate && patient.endDate.display) || '<span class="nhsuk-hint">Not available</span>' : '<span class="nhsuk-hint">Not available</span>' }
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

          const url = (patient.checkType === 'quality' || patient.feedbackPresent === true)
            ? patient.certificateType + '/comparison--has-feedback?patientID=' + patient.id
            : patient.certificateType + '/comparison--no-feedback?patientID=' + patient.id;


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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"752 024 0693","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"21 April 1975","day":21,"month":3,"year":1975},"checking":false,"applicationReference":" 20261004122546N848102114","certificateReference":"HRT DHE8 V84Z","channel":"Digital","startDate":{"display":"17 Nov 2025","day":17,"month":10,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"16 Nov 2026","day":16,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07031 284 591","emailAddress":"olivia.smith@googlemail.com","checkType":"supervisor","imageReference":"2026 10 07 17 48 10N361134669"},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"842 432 4447","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"22 February 1967","day":22,"month":1,"year":1967},"checking":false,"applicationReference":" 20261002201451N181546213","certificateReference":"95 266 190 381","channel":"Digital","imageReference":"2026 10 07 17 48 05N742568412","startDate":{"display":"21 Nov 2025","day":21,"month":10,"year":2025},"endDate":{"display":"20 Nov 2035","day":20,"month":10,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07049 823 716","emailAddress":"jones.a@gmail.com","dueDate":{"display":"26 Dec 2025","day":26,"month":11,"year":2025},"childsDOB":{"display":"12 February 2026","day":12,"month":1,"year":2026},"medicalCondition":["(7) Forms of hypoadrenalism"]},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"540 083 2804","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"27 June 1985","day":27,"month":5,"year":1985},"checking":true,"applicationReference":" 20261001133649N339242269","certificateReference":"78 606 456 136","channel":"Paper","startDate":{"display":"29 Nov 2025","day":29,"month":10,"year":2025},"endDate":{"display":"28 Nov 2035","day":28,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 395 184","checkType":"supervisor","imageReference":"2026 10 07 17 48 39N310432919","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"955 750 3459","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"17 October 1972","day":17,"month":9,"year":1972},"checking":false,"applicationReference":" 20261006193610N087474184","certificateReference":"HRT S304 OC8N","channel":"Digital","startDate":{"display":"12 Jan 2026","day":12,"month":0,"year":2026},"medicalCondition":["(1) Permanent fistula","(9) Continuing physical disability","(10) Cancer"],"endDate":{"display":"11 Jan 2027","day":11,"month":0,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07071 528 439","emailAddress":"brown.a@gmail.com","imageReference":"2026 10 07 17 48 10N890463761"},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"138 791 4997","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"2 September 1974","day":2,"month":8,"year":1974},"checking":true,"applicationReference":" 20261004012458N091645371","certificateReference":"74 169 820 108","channel":"Paper","startDate":{"display":"25 Feb 2026","day":25,"month":1,"year":2026},"endDate":{"display":"24 Feb 2036","day":24,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07083 916 275","emailAddress":"emily.williams524@blueyonder.co.uk","medicalCondition":["(1) Permanent fistula"],"checkType":"quality","imageReference":"2026 10 07 17 48 39N659613166"},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"821 038 4828","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"1 May 1971","day":1,"month":4,"year":1971},"checking":false,"applicationReference":" 20261007063802N464158161","certificateReference":"HRT 6N0R JLXP","channel":"Digital","imageReference":"2026 10 07 17 48 10N087708964","startDate":{"display":"21 Feb 2026","day":21,"month":1,"year":2026},"endDate":{"display":"20 Feb 2027","day":20,"month":1,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07092 475 318","emailAddress":"wilson.s@blueyonder.co.uk","checkType":"supervisor"},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"625 958 4071","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"10 June 1989","day":10,"month":5,"year":1989},"checking":false,"applicationReference":" 20261007062333N303046191","certificateReference":"HRT MI4I 9FJF","channel":"Digital","startDate":{"display":"16 Mar 2026","day":16,"month":2,"year":2026},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"15 Mar 2027","day":15,"month":2,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07015 648 293","emailAddress":"mia.davies@googlemail.com","checkType":"supervisor","imageReference":"2026 10 07 17 48 10N612155690"},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"240 252 2574","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"9 June 2002","day":9,"month":5,"year":2002},"checking":false,"applicationReference":" 20261005223423N547910913","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 751 964","emailAddress":"Evans940@hotmail.com","checkType":"supervisor","imageReference":"2026 10 07 17 48 39N225755442"},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"956 590 3007","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"expired","dateOfBirth":{"display":"20 January 1995","day":20,"month":0,"year":1995},"checking":false,"applicationReference":" 20261006144239N946903686","certificateReference":"82 987 668 246","channel":"Digital","startDate":{"display":"16 Oct 2025","day":16,"month":9,"year":2025},"dueDate":{"display":"28 Feb 2026","day":28,"month":1,"year":2026},"endDate":{"display":"15 Oct 2026","day":15,"month":9,"year":2026},"childsDOB":{"display":"16 October 2025","day":16,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07036 592 817","emailAddress":"g.thomas@googlemail.com","checkType":"quality","imageReference":"2026 10 07 17 48 10N382138803"},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"427 686 5627","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"16 January 1981","day":16,"month":0,"year":1981},"checking":false,"applicationReference":" 20261001232645N989628708","certificateReference":"HRT X7UN DK65","channel":"Digital","imageReference":"2026 10 07 17 48 10N605750992","startDate":{"display":"28 Mar 2026","day":28,"month":2,"year":2026},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"27 Mar 2027","day":27,"month":2,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07047 813 256","emailAddress":"roberts.l@aol.com","checkType":"quality"},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"913 952 6054","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"25 May 1982","day":25,"month":4,"year":1982},"checking":true,"checkType":"supervisor","applicationReference":" 20261001221454N872358321","certificateReference":"45 085 183 282","channel":"Paper","imageReference":"2026 10 07 17 48 39N899179103","startDate":{"display":"8 Dec 2025","day":8,"month":11,"year":2025},"endDate":{"display":"7 Dec 2035","day":7,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07051 294 783","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"537 384 3388","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"14 February 1967","day":14,"month":1,"year":1967},"checking":true,"checkType":"quality","applicationReference":" 20261002160541N854721362","certificateReference":"06 852 116 320","channel":"Paper","imageReference":"2026 10 07 17 48 39N366389339","startDate":{"display":"27 Jan 2026","day":27,"month":0,"year":2026},"endDate":{"display":"26 Jan 2036","day":26,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07063 418 592","emailAddress":"c.lewis317@googlemail.com","medicalCondition":["(1) Permanent fistula","(2) Epilepsy"]},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"563 182 6924","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"16 November 1993","day":16,"month":10,"year":1993},"checking":true,"applicationReference":" 20261004222441N857871135","certificateReference":"31 958 633 382","channel":"Paper","imageReference":"2026 10 07 17 48 39N740998233","startDate":{"display":"4 Dec 2025","day":4,"month":11,"year":2025},"dueDate":{"display":"21 Nov 2025","day":21,"month":10,"year":2025},"endDate":{"display":"3 Dec 2026","day":3,"month":11,"year":2026},"childsDOB":{"display":"4 December 2025","day":4,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07075 928 341","emailAddress":"i.walker141@gmail.com","checkType":"supervisor"},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"252 609 2841","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"10 March 1972","day":10,"month":2,"year":1972},"applicationReference":" 20261003153950N328398496","certificateReference":"HRT XUEC 5G10","channel":"Digital","imageReference":"2026 10 07 17 48 10N981444660","startDate":{"display":"7 Jan 2026","day":7,"month":0,"year":2026},"dueDate":{"display":"24 Mar 2026","day":24,"month":2,"year":2026},"endDate":{"display":"6 Jan 2027","day":6,"month":0,"year":2027},"childsDOB":{"display":"10 March 2026","day":10,"month":2,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07084 372 659","emailAddress":"d.hall144@hotmail.com"},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"768 825 9152","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"26 October 1992","day":26,"month":9,"year":1992},"checking":true,"applicationReference":" 20261006051335N159673688","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07091 837 426","checkType":"supervisor","imageReference":"2026 10 07 17 48 39N082543480"},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"665 021 2239","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"3 February 1991","day":3,"month":1,"year":1991},"checking":true,"applicationReference":" 20261005113447N870650309","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"dueDate":{"display":"19 Feb 2026","day":19,"month":1,"year":2026},"endDate":{"display":"","day":"","month":"","year":""},"childsDOB":{"display":"30 November 2025","day":30,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 385 927","emailAddress":"p.allen@hotmail.com","checkType":"supervisor","imageReference":"2026 10 07 17 48 39N038887153","medicalCondition":["(2) Epilepsy","(7) Forms of hypoadrenalism"]},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"858 781 6998","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"3 January 1975","day":3,"month":0,"year":1975},"checking":true,"applicationReference":" 20261001174210N431117998","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07027 639 485","emailAddress":"sophie.young@hotmail.com","imageReference":"2026 10 07 17 48 39N427755767","dueDate":{"display":"6 Feb 2026","day":6,"month":1,"year":2026},"childsDOB":{"display":"24 March 2026","day":24,"month":2,"year":2026},"checkType":"supervisor"},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"415 750 4191","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"21 August 1976","day":21,"month":7,"year":1976},"checking":false,"applicationReference":" 20261004225449N902694300","certificateReference":"HRT XN1C MIPP","channel":"Digital","startDate":{"display":"4 Jan 2026","day":4,"month":0,"year":2026},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"3 Jan 2027","day":3,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07035 821 749","emailAddress":"h.king138@aol.com","imageReference":"2026 10 07 17 48 10N908426847"},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"217 362 0948","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"23 October 1996","day":23,"month":9,"year":1996},"checking":true,"checkType":"supervisor","applicationReference":" 20261001071528N838954710","certificateReference":"71 208 082 785","channel":"Paper","imageReference":"2026 10 07 17 48 39N143361825","startDate":{"display":"18 Jan 2026","day":18,"month":0,"year":2026},"endDate":{"display":"17 Jan 2027","day":17,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07048 952 613","emailAddress":"millie.wright@gmail.com","dueDate":{"display":"2 Feb 2026","day":2,"month":1,"year":2026},"childsDOB":{"display":"18 January 2026","day":18,"month":0,"year":2026}},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"116 261 9653","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"expired","dateOfBirth":{"display":"1 March 1996","day":1,"month":2,"year":1996},"checking":false,"applicationReference":" 20261006051329N733409558","certificateReference":"44 418 699 633","channel":"Digital","startDate":{"display":"17 Mar 2026","day":17,"month":2,"year":2026},"endDate":{"display":"16 Mar 2027","day":16,"month":2,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07052 719 384","emailAddress":"e.green977@gmail.com","checkType":"quality","imageReference":"2026 10 07 17 48 10N304647661","medicalCondition":["(4) Myxoedema"],"dueDate":{"display":"26 Oct 2025","day":26,"month":9,"year":2025},"childsDOB":{"display":"17 March 2026","day":17,"month":2,"year":2026}},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"273 718 6586","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"11 October 1991","day":11,"month":9,"year":1991},"checking":false,"applicationReference":" 20261001010806N890661393","certificateReference":"HRT CS5E HSUC","channel":"Digital","imageReference":"2026 10 07 17 48 05N363962211","startDate":{"display":"12 Nov 2025","day":12,"month":10,"year":2025},"endDate":{"display":"11 Nov 2026","day":11,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07064 837 295","emailAddress":"p.baker@googlemail.com"},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"046 529 3683","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"19 December 1993","day":19,"month":11,"year":1993},"checking":false,"applicationReference":" 20261003200026N302742898","certificateReference":"24 062 587 991","channel":"Digital","imageReference":"2026 10 07 17 48 05N220377681","startDate":{"display":"2 Dec 2025","day":2,"month":11,"year":2025},"medicalCondition":["(2) Epilepsy","(7) Forms of hypoadrenalism","(9) Continuing physical disability"],"endDate":{"display":"1 Dec 2026","day":1,"month":11,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07073 491 826","emailAddress":"ruby.adams@googlemail.com","dueDate":{"display":"1 Jan 2026","day":1,"month":0,"year":2026},"childsDOB":{"display":"2 December 2025","day":2,"month":11,"year":2025}},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"311 444 5544","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"24 August 1995","day":24,"month":7,"year":1995},"checking":true,"applicationReference":" 20261003111814N995070651","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07085 623 941","emailAddress":"chloe.mitchell@gmail.com","checkType":"supervisor","imageReference":"2026 10 07 17 48 39N407734715"},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"426 586 3302","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"15 August 1993","day":15,"month":7,"year":1993},"checking":true,"checkType":"supervisor","applicationReference":" 20261004083541N129142520","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N652901442","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07096 718 235","emailAddress":"sienna.turner@aol.com"},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"165 278 3974","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"27 October 1972","day":27,"month":9,"year":1972},"checking":true,"applicationReference":" 20261007023106N144655892","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(2) Epilepsy","(5) Hypoparathyroidism","(10) Cancer"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07018 273 945","checkType":"quality","imageReference":"2026 10 07 17 48 39N180113552"},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"604 672 8503","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"23 July 2004","day":23,"month":6,"year":2004},"checking":true,"checkType":"supervisor","applicationReference":" 20261006074912N830749659","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N396645540","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(10) Cancer"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07029 384 756","emailAddress":"jessica.morris@googlemail.com"},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"310 573 4311","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"25 April 2005","day":25,"month":3,"year":2005},"checking":false,"checkType":"supervisor","applicationReference":" 20261002195053N876378076","certificateReference":"22 808 021 433","channel":"Digital","imageReference":"2026 10 07 17 48 10N479201255","startDate":{"display":"28 Mar 2026","day":28,"month":2,"year":2026},"endDate":{"display":"27 Mar 2027","day":27,"month":2,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07031 572 948","emailAddress":"Hughes150@gmail.com","dueDate":{"display":"14 Jan 2026","day":14,"month":0,"year":2026},"childsDOB":{"display":"28 March 2026","day":28,"month":2,"year":2026}},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"728 016 5614","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"processing","dateOfBirth":{"display":"21 April 1968","day":21,"month":3,"year":1968},"checking":false,"applicationReference":" 20261005025527N444046055","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N450420619","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07042 619 583","emailAddress":"Ward104@outlook.com","checkType":"supervisor"},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"415 830 1950","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"25 March 1978","day":25,"month":2,"year":1978},"applicationReference":" 20261007091625N584563282","certificateReference":"74 173 763 787","channel":"Paper","startDate":{"display":"16 Dec 2025","day":16,"month":11,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"15 Dec 2035","day":15,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07053 847 261","imageReference":"2026 10 07 17 48 39N605036398"},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"786 996 1209","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"20 July 1995","day":20,"month":6,"year":1995},"applicationReference":" 20261005081813N164232115","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N942031529","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07064 928 137","emailAddress":"aria.cooper@googlemail.com"},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"922 989 1983","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"26 August 1983","day":26,"month":7,"year":1983},"checking":true,"applicationReference":" 20261005215620N626103756","certificateReference":"26 855 436 015","channel":"Paper","imageReference":"2026 10 07 17 48 39N773363876","startDate":{"display":"21 Jan 2026","day":21,"month":0,"year":2026},"endDate":{"display":"20 Jan 2036","day":20,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07075 283 916","checkType":"quality","medicalCondition":["(5) Hypoparathyroidism"]},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"030 871 2314","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"19 March 1993","day":19,"month":2,"year":1993},"checking":true,"applicationReference":" 20261002035530N500038423","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N516670340","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(1) Permanent fistula","(3) Diabetes mellitus"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07086 419 375","emailAddress":"luna.parker@blueyonder.co.uk","checkType":"supervisor"},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"167 797 1866","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"8 August 1984","day":8,"month":7,"year":1984},"checking":true,"applicationReference":" 20261006083342N920996911","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07097 531 284","emailAddress":"hannah.phillips@googlemail.com","imageReference":"2026 10 07 17 48 39N239665255","checkType":"supervisor"},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"108 047 4124","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"18 October 1992","day":18,"month":9,"year":1992},"checking":true,"applicationReference":" 20261006134838N399051261","certificateReference":"32 771 037 110","channel":"Paper","startDate":{"display":"17 Dec 2025","day":17,"month":11,"year":2025},"dueDate":{"display":"11 Jan 2026","day":11,"month":0,"year":2026},"endDate":{"display":"16 Dec 2026","day":16,"month":11,"year":2026},"childsDOB":{"display":"17 December 2025","day":17,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07018 642 597","emailAddress":"zara.bennett@blueyonder.co.uk","imageReference":"2026 10 07 17 48 39N640389950","checkType":"supervisor"},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"398 300 8161","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"5 November 1987","day":5,"month":10,"year":1987},"checking":false,"applicationReference":" 20261002152422N576129087","certificateReference":"58 292 632 586","channel":"Digital","imageReference":"2026 10 07 17 48 10N326402727","startDate":{"display":"5 Apr 2026","day":5,"month":3,"year":2026},"dueDate":{"display":"29 Mar 2026","day":29,"month":2,"year":2026},"endDate":{"display":"4 Apr 2036","day":4,"month":3,"year":2036},"childsDOB":{"display":"20 February 2026","day":20,"month":1,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07029 753 861","emailAddress":"florence.cox@gmail.com","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"904 673 7663","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"11 July 1996","day":11,"month":6,"year":1996},"checking":true,"applicationReference":" 20261007035011N271781959","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07031 864 729","emailAddress":"maya.richardson@hotmail.com","checkType":"supervisor","imageReference":"2026 10 07 17 48 39N169038210"},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"456 831 5537","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"11 November 1995","day":11,"month":10,"year":1995},"checking":false,"applicationReference":" 20260930210006N208433406","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N431435560","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07042 987 513","checkType":"supervisor","medicalCondition":["(7) Forms of hypoadrenalism"]},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"074 043 6239","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"13 October 1996","day":13,"month":9,"year":1996},"checking":false,"applicationReference":" 20261001144858N134400185","certificateReference":"37 743 854 531","channel":"Digital","startDate":{"display":"3 Mar 2026","day":3,"month":2,"year":2026},"endDate":{"display":"2 Mar 2027","day":2,"month":2,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07054 129 876","emailAddress":"Ross952@aol.com","dueDate":{"display":"15 Oct 2025","day":15,"month":9,"year":2025},"childsDOB":{"display":"3 March 2026","day":3,"month":2,"year":2026}},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"793 504 1239","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"expired","dateOfBirth":{"display":"2 April 1991","day":2,"month":3,"year":1991},"checking":false,"applicationReference":" 20261006160054N617468036","certificateReference":"17 569 711 916","channel":"Paper","startDate":{"display":"23 Nov 2025","day":23,"month":10,"year":2025},"dueDate":{"display":"30 Nov 2025","day":30,"month":10,"year":2025},"endDate":{"display":"22 Nov 2026","day":22,"month":10,"year":2026},"childsDOB":{"display":"23 November 2025","day":23,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07065 238 741","imageReference":"2026 10 07 17 48 39N174610534"},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"499 586 2760","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"20 July 1982","day":20,"month":6,"year":1982},"checking":false,"applicationReference":" 20261003032919N665607660","certificateReference":"23 350 549 906","channel":"Paper","imageReference":"2026 10 07 17 48 39N224674586","startDate":{"display":"18 Nov 2025","day":18,"month":10,"year":2025},"endDate":{"display":"17 Nov 2035","day":17,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07076 391 825","emailAddress":"evelyn.cook@hotmail.com","checkType":"quality","medicalCondition":["(9) Continuing physical disability"]},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"488 078 8333","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"expired","dateOfBirth":{"display":"17 April 1967","day":17,"month":3,"year":1967},"checking":false,"checkType":"quality","applicationReference":" 20261002212357N265245688","certificateReference":"62 650 417 307","channel":"Paper","imageReference":"2026 10 07 17 48 39N945754471","startDate":{"display":"26 Mar 2026","day":26,"month":2,"year":2026},"endDate":{"display":"25 Mar 2036","day":25,"month":2,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07087 512 936","emailAddress":"thea.watson@gmail.com","medicalCondition":["(2) Epilepsy"]},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"400 028 0963","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"19 September 1977","day":19,"month":8,"year":1977},"checking":true,"applicationReference":" 20261001051833N837139461","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07098 631 427","checkType":"supervisor","imageReference":"2026 10 07 17 48 39N354591205"},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"298 772 1683","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"1 February 1997","day":1,"month":1,"year":1997},"checking":false,"applicationReference":" 20261007151938N098032163","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07019 742 835","emailAddress":"emma.harrison@outlook.com","imageReference":"2026 10 07 17 48 39N480383575"},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"199 907 0875","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"5 August 1989","day":5,"month":7,"year":1989},"applicationReference":" 20261004085710N135491515","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N490421531","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07020 853 749","emailAddress":"coleman.l@gmail.com","medicalCondition":["(7) Forms of hypoadrenalism"]},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"636 277 3231","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"16 November 1977","day":16,"month":10,"year":1977},"checking":false,"applicationReference":" 20261004195027N971954127","certificateReference":"15 337 081 295","channel":"Paper","imageReference":"2026 10 07 17 48 39N740590594","startDate":{"display":"26 Dec 2025","day":26,"month":11,"year":2025},"endDate":{"display":"25 Dec 2035","day":25,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07031 984 625","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"326 363 7918","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"14 September 1992","day":14,"month":8,"year":1992},"checking":false,"checkType":"supervisor","applicationReference":" 20261006095523N243308049","certificateReference":"43 271 968 252","channel":"Paper","imageReference":"2026 10 07 17 48 39N242965016","startDate":{"display":"12 Nov 2025","day":12,"month":10,"year":2025},"dueDate":{"display":"1 Dec 2025","day":1,"month":11,"year":2025},"endDate":{"display":"11 Nov 2026","day":11,"month":10,"year":2026},"childsDOB":{"display":"12 November 2025","day":12,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07042 195 783","emailAddress":"Graham958@googlemail.com","medicalCondition":["(2) Epilepsy"]},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"554 279 0742","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"16 April 1972","day":16,"month":3,"year":1972},"checking":false,"checkType":"supervisor","applicationReference":" 20261003123147N738357772","certificateReference":"58 986 718 071","channel":"Digital","imageReference":"2026 10 07 17 48 05N126005441","startDate":{"display":"14 Mar 2026","day":14,"month":2,"year":2026},"endDate":{"display":"13 Mar 2036","day":13,"month":2,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07053 268 917","emailAddress":"b.stevens@gmail.com","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"639 531 6886","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"28 March 2003","day":28,"month":2,"year":2003},"checking":true,"applicationReference":" 20260930182120N223167679","certificateReference":"55 846 447 591","channel":"Paper","startDate":{"display":"9 Dec 2025","day":9,"month":11,"year":2025},"endDate":{"display":"8 Dec 2026","day":8,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07064 371 528","emailAddress":"i.simpson@hotmail.com","checkType":"supervisor","imageReference":"2026 10 07 17 48 39N992957359","medicalCondition":["(5) Hypoparathyroidism"],"dueDate":{"display":"13 Dec 2025","day":13,"month":11,"year":2025},"childsDOB":{"display":"9 December 2025","day":9,"month":11,"year":2025}},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"915 291 6165","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"5 April 2002","day":5,"month":3,"year":2002},"checking":true,"applicationReference":" 20261002022420N284995796","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N420881714","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07075 482 936","emailAddress":"harriet.butler@blueyonder.co.uk","checkType":"supervisor"},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"642 878 7942","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"10 June 1971","day":10,"month":5,"year":1971},"checking":false,"checkType":"supervisor","applicationReference":" 20261007041525N625827046","certificateReference":"HRT WI4N WTRT","channel":"Digital","imageReference":"2026 10 07 17 48 10N980933158","startDate":{"display":"22 Feb 2026","day":22,"month":1,"year":2026},"endDate":{"display":"21 Feb 2027","day":21,"month":1,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07086 593 147","emailAddress":"Chapman287@outlook.com"},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"442 337 8941","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"expired","dateOfBirth":{"display":"12 December 1968","day":12,"month":11,"year":1968},"checking":false,"applicationReference":" 20261001083233N054324077","certificateReference":"15 994 456 432","channel":"Digital","startDate":{"display":"9 Oct 2025","day":9,"month":9,"year":2025},"dueDate":{"display":"29 Dec 2025","day":29,"month":11,"year":2025},"endDate":{"display":"8 Oct 2035","day":8,"month":9,"year":2035},"childsDOB":{"display":"6 April 2026","day":6,"month":3,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07097 614 258","emailAddress":"a.ali@outlook.com","checkType":"quality","imageReference":"2026 10 07 17 48 10N267211635","medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"437 978 4864","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","checking":false,"checkType":"quality","dateOfBirth":{"display":"20 May 1979","day":20,"month":4,"year":1979},"applicationReference":" 20261001200539N747052528","certificateReference":"HRT ZY3K EYPP","channel":"Digital","imageReference":"2026 10 07 17 48 05N190006869","startDate":{"display":"27 Nov 2025","day":27,"month":10,"year":2025},"medicalCondition":["(1) Permanent fistula","(5) Hypoparathyroidism","(10) Cancer"],"endDate":{"display":"26 Nov 2026","day":26,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07018 725 369","emailAddress":"s.hussain@gmail.com"},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"660 272 1052","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"2 May 1990","day":2,"month":4,"year":1990},"checking":false,"applicationReference":" 20261006081018N787188183","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07029 836 471","emailAddress":"Khan851@blueyonder.co.uk","imageReference":"2026 10 07 17 48 39N983090014","checkType":"quality"},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"388 355 1592","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"20 October 1990","day":20,"month":9,"year":1990},"checking":true,"checkType":"supervisor","applicationReference":" 20261004111653N423896368","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N537444364","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(4) Myxoedema","(5) Hypoparathyroidism","(10) Cancer"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07030 947 582","emailAddress":"Begum908@googlemail.com"},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"466 624 8242","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","dateOfBirth":{"display":"20 January 2005","day":20,"month":0,"year":2005},"checking":false,"checkType":"supervisor","applicationReference":" 20261005183241N307177032","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N243050871","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07042 058 693","emailAddress":"niamh.o’connor@blueyonder.co.uk"},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"833 002 4280","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"9 January 1984","day":9,"month":0,"year":1984},"applicationReference":" 20261001001934N417488366","certificateReference":"14 909 974 474","channel":"Digital","imageReference":"2026 10 07 17 48 10N795792663","startDate":{"display":"17 Mar 2026","day":17,"month":2,"year":2026},"endDate":{"display":"16 Mar 2036","day":16,"month":2,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07053 169 784","emailAddress":"kelly.a@blueyonder.co.uk","medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"524 385 1389","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"15 February 1989","day":15,"month":1,"year":1989},"checking":false,"applicationReference":" 20261005094029N606391088","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07064 271 895","emailAddress":"erin.mccarthy554@googlemail.com","checkType":"quality","imageReference":"2026 10 07 17 48 39N839536019","dueDate":{"display":"24 Nov 2025","day":24,"month":10,"year":2025},"childsDOB":{"display":"21 November 2025","day":21,"month":10,"year":2025}},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"729 160 2320","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"11 January 1994","day":11,"month":0,"year":1994},"applicationReference":" 20261003115220N637766871","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N241526945","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07075 382 916","medicalCondition":["(5) Hypoparathyroidism","(8) Myasthenia gravis"]},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"081 178 7910","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"25 July 1992","day":25,"month":6,"year":1992},"checking":false,"checkType":"supervisor","applicationReference":" 20261003165433N772340624","certificateReference":"HRT 569G J05Q","channel":"Pharmacy","imageReference":"2026 10 07 17 48 10N531178351","startDate":{"display":"27 Dec 2025","day":27,"month":11,"year":2025},"endDate":{"display":"26 Dec 2026","day":26,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07086 493 127","emailAddress":"c.griffiths@gmail.com"},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"971 357 3471","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"16 September 2008","day":16,"month":8,"year":2008},"checking":false,"applicationReference":" 20261007011438N635638178","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N657183327","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07097 514 238","checkType":"quality"},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"561 704 4533","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"11 February 1994","day":11,"month":1,"year":1994},"checking":false,"applicationReference":" 20261004180206N548306758","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07018 625 349","emailAddress":"ffion.evans@outlook.com","imageReference":"2026 10 07 17 48 39N370365972","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"301 607 1160","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"16 November 2003","day":16,"month":10,"year":2003},"checking":true,"checkType":"supervisor","applicationReference":" 20261007141543N426611525","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N688879731","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07029 736 458","emailAddress":"MacDonald407@outlook.com","medicalCondition":["(9) Continuing physical disability"]},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"700 309 7289","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","checking":false,"checkType":"quality","dateOfBirth":{"display":"6 May 1995","day":6,"month":4,"year":1995},"applicationReference":" 20261006072816N907112728","certificateReference":"14 732 839 131","channel":"Paper","imageReference":"2026 10 07 17 48 39N289213130","startDate":{"display":"4 Mar 2026","day":4,"month":2,"year":2026},"medicalCondition":["(3) Diabetes mellitus","(4) Myxoedema"],"endDate":{"display":"3 Mar 2027","day":3,"month":2,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07030 847 569","emailAddress":"s.fraser@googlemail.com","dueDate":{"display":"20 Oct 2025","day":20,"month":9,"year":2025},"childsDOB":{"display":"4 March 2026","day":4,"month":2,"year":2026}},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"323 745 9476","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"25 November 2004","day":25,"month":10,"year":2004},"checking":false,"applicationReference":" 20261003001654N063018500","certificateReference":"15 136 213 416","channel":"Paper","startDate":{"display":"12 Nov 2025","day":12,"month":10,"year":2025},"endDate":{"display":"11 Nov 2026","day":11,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07041 958 672","emailAddress":"maisie.armstrong@blueyonder.co.uk","imageReference":"2026 10 07 17 48 39N403149233","dueDate":{"display":"7 Feb 2026","day":7,"month":1,"year":2026},"childsDOB":{"display":"12 November 2025","day":12,"month":10,"year":2025}},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"535 600 1195","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"11 December 1993","day":11,"month":11,"year":1993},"applicationReference":" 20261005065644N680795373","certificateReference":"HRT 82W6 VE15","channel":"Digital","imageReference":"2026 10 07 17 48 10N169005792","startDate":{"display":"9 Dec 2025","day":9,"month":11,"year":2025},"endDate":{"display":"8 Dec 2026","day":8,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07052 069 783","emailAddress":"Hunter967@googlemail.com"},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"095 389 4763","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"processing","dateOfBirth":{"display":"2 April 1994","day":2,"month":3,"year":1994},"checking":false,"applicationReference":" 20260930212111N839698663","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07063 171 894","emailAddress":"c.lawrence@blueyonder.co.uk","checkType":"quality","imageReference":"2026 10 07 17 48 39N585785783","medicalCondition":["(2) Epilepsy"]},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"624 085 1973","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"27 November 1988","day":27,"month":10,"year":1988},"applicationReference":" 20261004001323N370012187","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N113260138","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(2) Epilepsy","(4) Myxoedema","(6) Diabetes insipidus"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07074 282 915","emailAddress":"beatrice.spencer960@hotmail.com"},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"592 598 3922","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"26 August 1967","day":26,"month":7,"year":1967},"checking":false,"applicationReference":" 20261004181056N558574239","certificateReference":"HRT I310 O0WL","channel":"Digital","startDate":{"display":"8 Feb 2026","day":8,"month":1,"year":2026},"endDate":{"display":"7 Feb 2027","day":7,"month":1,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07085 393 126","emailAddress":"n.rogers@blueyonder.co.uk"},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"607 775 7672","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"10 March 1970","day":10,"month":2,"year":1970},"checking":true,"applicationReference":" 20261001194113N891652766","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N760137269","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07096 414 237","emailAddress":"annabelle.watts@gmail.com","checkType":"supervisor","dueDate":{"display":"27 Feb 2026","day":27,"month":1,"year":2026},"childsDOB":{"display":"6 December 2025","day":6,"month":11,"year":2025}},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"522 380 5626","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"6 June 1967","day":6,"month":5,"year":1967},"checking":false,"applicationReference":" 20261006004039N269312019","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N645261418","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07017 525 348","emailAddress":"heidi.henderson@gmail.com","checkType":"quality"},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"523 497 1100","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"expired","dateOfBirth":{"display":"5 October 1991","day":5,"month":9,"year":1991},"checking":false,"checkType":"quality","applicationReference":" 20261006173844N697159674","certificateReference":"99 698 982 074","channel":"Digital","imageReference":"2026 10 07 17 48 05N821011968","startDate":{"display":"13 Jan 2026","day":13,"month":0,"year":2026},"endDate":{"display":"12 Jan 2036","day":12,"month":0,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07028 636 459","emailAddress":"rose.palmer@gmail.com","medicalCondition":["(2) Epilepsy"]},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"524 592 6926","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"7 October 1989","day":7,"month":9,"year":1989},"checking":false,"applicationReference":" 20261001173426N917719253","certificateReference":"HRT FLRD N6PZ","channel":"Digital","imageReference":"2026 10 07 17 48 05N318601424","startDate":{"display":"11 Jan 2026","day":11,"month":0,"year":2026},"endDate":{"display":"10 Jan 2027","day":10,"month":0,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07039 747 561","emailAddress":"nicholson.l@gmail.com","dueDate":{"display":"17 Oct 2025","day":17,"month":9,"year":2025},"childsDOB":{"display":"3 April 2026","day":3,"month":3,"year":2026}},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"244 880 8028","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"24 June 1995","day":24,"month":5,"year":1995},"checking":false,"applicationReference":" 20260930211758N751365789","certificateReference":"HRT XS63 I18S","channel":"Digital","imageReference":"2026 10 07 17 48 05N230417841","startDate":{"display":"26 Dec 2025","day":26,"month":11,"year":2025},"dueDate":{"display":"26 Mar 2026","day":26,"month":2,"year":2026},"endDate":{"display":"25 Dec 2026","day":25,"month":11,"year":2026},"childsDOB":{"display":"22 October 2025","day":22,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07040 858 673","emailAddress":"gardner.j@hotmail.com","medicalCondition":["(7) Forms of hypoadrenalism"]},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"118 003 6994","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"23 October 1987","day":23,"month":9,"year":1987},"applicationReference":" 20261006214427N232338672","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N292725414","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07051 969 782"},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"210 956 6801","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"14 April 1979","day":14,"month":3,"year":1979},"checking":true,"checkType":"supervisor","applicationReference":" 20261006225918N666070912","certificateReference":"12 163 225 436","channel":"Paper","imageReference":"2026 10 07 17 48 39N210135007","startDate":{"display":"16 Oct 2025","day":16,"month":9,"year":2025},"endDate":{"display":"15 Oct 2035","day":15,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07062 071 893","medicalCondition":["(2) Epilepsy"]},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"284 015 7828","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"11 June 1996","day":11,"month":5,"year":1996},"checking":false,"applicationReference":" 20261002032853N680482238","certificateReference":"HRT WYVE UVQO","channel":"Digital","startDate":{"display":"23 Mar 2026","day":23,"month":2,"year":2026},"dueDate":{"display":"20 Feb 2026","day":20,"month":1,"year":2026},"endDate":{"display":"22 Mar 2027","day":22,"month":2,"year":2027},"childsDOB":{"display":"1 January 2026","day":1,"month":0,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07073 182 914","emailAddress":"Harvey767@blueyonder.co.uk"},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"707 837 1906","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"17 April 2007","day":17,"month":3,"year":2007},"checking":false,"applicationReference":" 20261005043106N628527545","certificateReference":"99 820 147 564","channel":"Paper","startDate":{"display":"16 Jan 2026","day":16,"month":0,"year":2026},"dueDate":{"display":"22 Nov 2025","day":22,"month":10,"year":2025},"endDate":{"display":"15 Jan 2027","day":15,"month":0,"year":2027},"childsDOB":{"display":"16 January 2026","day":16,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07084 293 125","emailAddress":"fernandez.m@aol.com","checkType":"supervisor","imageReference":"2026 10 07 17 48 39N219387528"},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"354 610 1829","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"2 October 1979","day":2,"month":9,"year":1979},"checking":false,"applicationReference":" 20261002124552N132916813","certificateReference":"97 373 171 601","channel":"Digital","startDate":{"display":"7 Mar 2026","day":7,"month":2,"year":2026},"endDate":{"display":"6 Mar 2036","day":6,"month":2,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07095 314 236","emailAddress":"elena.silva@gmail.com","medicalCondition":["(4) Myxoedema"]},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"201 591 3288","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"5 June 1984","day":5,"month":5,"year":1984},"checking":false,"checkType":"quality","applicationReference":" 20261004020916N578906731","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N177729618","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07016 425 347","emailAddress":"l.patel@googlemail.com"},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"444 234 8240","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"6 June 2003","day":6,"month":5,"year":2003},"applicationReference":" 20261006133808N184329101","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N434888789","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(10) Cancer"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07027 536 458","emailAddress":"fatima.iqbal@gmail.com"},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"939 809 6062","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"7 October 2007","day":7,"month":9,"year":2007},"checking":true,"checkType":"supervisor","applicationReference":" 20261003041828N758404340","certificateReference":"83 571 986 904","channel":"Paper","imageReference":"2026 10 07 17 48 39N198679971","startDate":{"display":"1 Feb 2026","day":1,"month":1,"year":2026},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"31 Jan 2027","day":31,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07038 647 569","emailAddress":"j.ahmed@googlemail.com","dueDate":{"display":"13 Oct 2025","day":13,"month":9,"year":2025},"childsDOB":{"display":"1 February 2026","day":1,"month":1,"year":2026}},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"767 161 8696","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"25 May 1989","day":25,"month":4,"year":1989},"checking":false,"applicationReference":" 20261005204144N226434878","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N723557849","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07049 758 671","emailAddress":"nadia.rashid@outlook.com"},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"150 906 5564","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"7 May 1981","day":7,"month":4,"year":1981},"checking":false,"applicationReference":" 20261003083626N319687952","certificateReference":"HRT I2J3 IFVW","channel":"Digital","imageReference":"2026 10 07 17 48 10N698580206","startDate":{"display":"21 Jan 2026","day":21,"month":0,"year":2026},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"20 Jan 2027","day":20,"month":0,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07050 869 782","emailAddress":"paterson.t@googlemail.com"},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"816 239 4735","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"expired","dateOfBirth":{"display":"7 August 1989","day":7,"month":7,"year":1989},"checking":false,"checkType":"supervisor","applicationReference":" 20261003153220N372739149","certificateReference":"14 331 623 352","channel":"Paper","imageReference":"2026 10 07 17 48 39N676769140","startDate":{"display":"17 Jan 2026","day":17,"month":0,"year":2026},"endDate":{"display":"16 Jan 2027","day":16,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07061 971 893","emailAddress":"bethany.foster@googlemail.com","medicalCondition":["(9) Continuing physical disability"],"dueDate":{"display":"12 Mar 2026","day":12,"month":2,"year":2026},"childsDOB":{"display":"17 January 2026","day":17,"month":0,"year":2026}},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"607 265 7019","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"3 January 1974","day":3,"month":0,"year":1974},"checking":true,"applicationReference":" 20261006083628N924998892","certificateReference":"24 211 009 721","channel":"Paper","imageReference":"2026 10 07 17 48 39N394863498","startDate":{"display":"30 Jan 2026","day":30,"month":0,"year":2026},"endDate":{"display":"29 Jan 2036","day":29,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07072 082 914","emailAddress":"lauren.fox@outlook.com","dueDate":{"display":"1 Jan 2026","day":1,"month":0,"year":2026},"childsDOB":{"display":"16 December 2025","day":16,"month":11,"year":2025},"checkType":"supervisor","medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"819 151 6949","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"9 March 2003","day":9,"month":2,"year":2003},"checking":true,"applicationReference":" 20261001223327N306747695","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"dueDate":{"display":"18 Feb 2026","day":18,"month":1,"year":2026},"endDate":{"display":"","day":"","month":"","year":""},"childsDOB":{"display":"12 February 2026","day":12,"month":1,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07083 193 125","emailAddress":"g.grant@gmail.com","checkType":"supervisor","imageReference":"2026 10 07 17 48 39N537032521"},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"719 775 0093","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"6 April 1991","day":6,"month":3,"year":1991},"checking":false,"applicationReference":" 20261003023625N988409433","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"dueDate":{"display":"14 Dec 2025","day":14,"month":11,"year":2025},"endDate":{"display":"","day":"","month":"","year":""},"childsDOB":{"display":"18 October 2025","day":18,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07094 214 236","emailAddress":"a.murray@blueyonder.co.uk","checkType":"supervisor","imageReference":"2026 10 07 17 48 39N824166827"},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"570 567 8271","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"17 March 1986","day":17,"month":2,"year":1986},"checking":false,"applicationReference":" 20261007010900N532152333","certificateReference":"HRT N1S4 LT6P","channel":"Telephony","startDate":{"display":"4 Feb 2026","day":4,"month":1,"year":2026},"medicalCondition":["(1) Permanent fistula","(4) Myxoedema","(7) Forms of hypoadrenalism"],"endDate":{"display":"3 Feb 2027","day":3,"month":1,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07015 325 347","emailAddress":"West970@googlemail.com","imageReference":"2026 10 07 17 48 10N148113853"},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"068 256 2950","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"27 August 1967","day":27,"month":7,"year":1967},"checking":false,"checkType":"supervisor","applicationReference":" 20261006150943N458434391","certificateReference":"10 371 223 417","channel":"Paper","imageReference":"2026 10 07 17 48 39N153456191","startDate":{"display":"5 Jan 2026","day":5,"month":0,"year":2026},"endDate":{"display":"4 Jan 2036","day":4,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07026 436 458","medicalCondition":["(2) Epilepsy","(4) Myxoedema","(8) Myasthenia gravis"]},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"684 208 1136","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"5 October 1981","day":5,"month":9,"year":1981},"checking":false,"checkType":"supervisor","applicationReference":" 20261001222847N384778616","certificateReference":"28 860 718 235","channel":"Digital","imageReference":"2026 10 07 17 48 05N168550620","startDate":{"display":"23 Feb 2026","day":23,"month":1,"year":2026},"endDate":{"display":"22 Feb 2036","day":22,"month":1,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07037 547 569","emailAddress":"kayla.holmes@aol.com","medicalCondition":["(2) Epilepsy"]},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"302 776 8216","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"18 March 2000","day":18,"month":2,"year":2000},"applicationReference":" 20261004135832N846125760","certificateReference":"69 684 464 422","channel":"Paper","startDate":{"display":"22 Jan 2026","day":22,"month":0,"year":2026},"medicalCondition":["(7) Forms of hypoadrenalism"],"endDate":{"display":"21 Jan 2027","day":21,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07048 658 671","emailAddress":"l.walsh@gmail.com","imageReference":"2026 10 07 17 48 39N593447939","dueDate":{"display":"28 Nov 2025","day":28,"month":10,"year":2025},"childsDOB":{"display":"22 January 2026","day":22,"month":0,"year":2026}},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"468 872 6873","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"3 August 1994","day":3,"month":7,"year":1994},"checking":true,"applicationReference":" 20261006170613N110454677","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 17 48 39N486862994","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07059 769 782","emailAddress":"Page442@hotmail.com","dueDate":{"display":"17 Dec 2025","day":17,"month":11,"year":2025},"childsDOB":{"display":"25 January 2026","day":25,"month":0,"year":2026},"checkType":"supervisor"},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"912 844 5720","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"3 May 1994","day":3,"month":4,"year":1994},"checking":false,"applicationReference":" 20261003054224N781542935","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07060 871 893","emailAddress":"Jordan147@googlemail.com","imageReference":"2026 10 07 17 48 39N818507884"},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"740 433 0949","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"7 February 1994","day":7,"month":1,"year":1994},"checking":false,"applicationReference":" 20261001010358N260861669","certificateReference":"76 411 572 131","channel":"Digital","imageReference":"2026 10 07 17 48 10N853420152","startDate":{"display":"5 Mar 2026","day":5,"month":2,"year":2026},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"4 Mar 2036","day":4,"month":2,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07071 982 914","emailAddress":"b.barrett@gmail.com","checkType":"supervisor"},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"914 473 2111","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"rejected","checking":false,"checkType":"quality","dateOfBirth":{"display":"6 June 1977","day":6,"month":5,"year":1977},"applicationReference":" 20261007071007N369198471","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07082 093 125","emailAddress":"m.hayes@outlook.com","imageReference":"2026 10 07 17 48 39N196134379"},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"528 800 1357","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"2 June 2004","day":2,"month":5,"year":2004},"checking":true,"applicationReference":" 20261001161419N300285916","certificateReference":"53 717 435 929","channel":"Paper","imageReference":"2026 10 07 17 48 39N184764126","startDate":{"display":"15 Feb 2026","day":15,"month":1,"year":2026},"endDate":{"display":"14 Feb 2027","day":14,"month":1,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07093 114 236","emailAddress":"Cunningham955@hotmail.com","checkType":"supervisor","dueDate":{"display":"20 Nov 2025","day":20,"month":10,"year":2025},"childsDOB":{"display":"15 February 2026","day":15,"month":1,"year":2026}},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"602 581 9026","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"20 February 1994","day":20,"month":1,"year":1994},"checking":false,"checkType":"supervisor","applicationReference":" 20261002143019N172165636","certificateReference":"95 573 959 095","channel":"Paper","imageReference":"2026 10 07 17 48 39N564086846","startDate":{"display":"18 Nov 2025","day":18,"month":10,"year":2025},"endDate":{"display":"17 Nov 2026","day":17,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07014 225 347","emailAddress":"a.barber@hotmail.com","medicalCondition":["(8) Myasthenia gravis"],"dueDate":{"display":"19 Nov 2025","day":19,"month":10,"year":2025},"childsDOB":{"display":"18 November 2025","day":18,"month":10,"year":2025}},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"572 015 4722","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"1 September 1987","day":1,"month":8,"year":1987},"checking":false,"checkType":"supervisor","applicationReference":" 20261006131955N856721426","certificateReference":"15 852 252 823","channel":"Digital","imageReference":"2026 10 07 17 48 10N370229596","startDate":{"display":"26 Jan 2026","day":26,"month":0,"year":2026},"medicalCondition":["(3) Diabetes mellitus","(6) Diabetes insipidus","(8) Myasthenia gravis"],"endDate":{"display":"25 Jan 2036","day":25,"month":0,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07025 336 458","emailAddress":"l.knight@hotmail.com"},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"205 706 5575","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"19 June 1977","day":19,"month":5,"year":1977},"checking":false,"applicationReference":" 20261004183432N991137729","certificateReference":"HRT JNUN J2CW","channel":"Digital","imageReference":"2026 10 07 17 48 05N566066614","startDate":{"display":"27 Dec 2025","day":27,"month":11,"year":2025},"endDate":{"display":"26 Dec 2026","day":26,"month":11,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07036 447 569","emailAddress":"Parsons189@hotmail.com","medicalCondition":["(8) Myasthenia gravis"]},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"345 849 8975","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"active","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"26 October 1995","day":26,"month":9,"year":1995},"applicationReference":" 20261005042632N884706846","certificateReference":"HRT WCS8 DIVV","channel":"Digital","imageReference":"2026 10 07 17 48 10N267091561","startDate":{"display":"7 Dec 2025","day":7,"month":11,"year":2025},"endDate":{"display":"6 Dec 2026","day":6,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07047 558 671","emailAddress":"tilly.bates@aol.com"},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"135 076 7445","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"4 April 1999","day":4,"month":3,"year":1999},"checking":false,"applicationReference":" 20261007011532N762886619","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07050 869 782","emailAddress":"h.day@aol.com","imageReference":"2026 10 07 17 48 39N453027007"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"233 044 6765","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"1 January 1969","day":1,"month":0,"year":1969},"checking":false,"applicationReference":" 20261003220452N836792570","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07028 751 964","emailAddress":"i.francis@gmail.com","checkType":"quality","imageReference":"2026 10 07 17 48 39N292205711"},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"753 734 3470","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"4 December 1978","day":4,"month":11,"year":1978},"checking":true,"checkType":"supervisor","applicationReference":" 20260930223229N751801757","certificateReference":"83 337 275 086","channel":"Paper","imageReference":"2026 10 07 17 48 39N278695006","startDate":{"display":"7 Jan 2026","day":7,"month":0,"year":2026},"endDate":{"display":"6 Jan 2036","day":6,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07048 658 671","medicalCondition":["(1) Permanent fistula"]}]'
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

  filters.getNextProcessorCheckingUrl = function (currentPatientId, processorCode) {

    const patients = JSON.parse(filters.getPatientData());
    const processor = processorCode || this.ctx.data.searchProcessor;

    const checkingPatients = patients.filter(
      p => p.checking === true && (!processor || p.processor === processor)
    );

    if (!checkingPatients.length) {
      return '/v1/processor?searchProcessor=' + encodeURIComponent(processor || '');
    }

    const currentIndex = checkingPatients.findIndex(
      p => String(p.id) === String(currentPatientId)
    );

    const nextPatient = (currentIndex >= 0)
      ? checkingPatients[currentIndex + 1]
      : checkingPatients[0];

    if (!nextPatient) {
      return '/v1/processor?searchProcessor=' + encodeURIComponent(processor || '');
    }

    return '/v1/' + nextPatient.certificateType +
      '/comparison--leave-feedback?patientID=' +
      nextPatient.id +
      '&searchProcessor=' + encodeURIComponent(nextPatient.processor || processor || '');
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
