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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"238 728 5220","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"26 February 1976","day":26,"month":1,"year":1976},"checking":true,"checkType":"quality","applicationReference":" 20260930110419N332670708","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N106973093","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07031 284 591","emailAddress":"o.smith@aol.com"},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"780 737 6093","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"27 June 1976","day":27,"month":5,"year":1976},"checking":true,"checkType":"supervisor","applicationReference":" 20261002070341N596316535","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N831688850","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07049 823 716"},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"524 839 7221","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"expired","dateOfBirth":{"display":"15 July 1989","day":15,"month":6,"year":1989},"checking":false,"applicationReference":" 20261002142341N676608725","certificateReference":"73 848 179 812","channel":"Digital","startDate":{"display":"27 Jan 2026","day":27,"month":0,"year":2026},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"26 Jan 2036","day":26,"month":0,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 395 184","emailAddress":"isla.taylor@hotmail.com"},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"037 142 9002","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"24 August 1994","day":24,"month":7,"year":1994},"applicationReference":" 20261006184304N486077589","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N555023584","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07071 528 439"},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"514 329 9037","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"rejected","checking":true,"checkType":"quality","dateOfBirth":{"display":"10 May 1995","day":10,"month":4,"year":1995},"applicationReference":" 20260930141447N504563694","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N889380330","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07083 916 275"},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"139 348 9594","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"rejected","checking":false,"checkType":"quality","dateOfBirth":{"display":"7 September 1991","day":7,"month":8,"year":1991},"applicationReference":" 20261003234514N668546697","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N821545634","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07092 475 318","emailAddress":"s.wilson@blueyonder.co.uk"},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"924 637 9641","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"10 August 1985","day":10,"month":7,"year":1985},"checking":false,"applicationReference":" 20261002195755N367997507","certificateReference":"94 783 684 023","channel":"Digital","startDate":{"display":"25 Dec 2025","day":25,"month":11,"year":2025},"medicalCondition":["(10) Cancer"],"endDate":{"display":"24 Dec 2035","day":24,"month":11,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07015 648 293","emailAddress":"mia.davies@hotmail.com"},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"718 913 8227","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"12 November 1987","day":12,"month":10,"year":1987},"checking":false,"applicationReference":" 20261005175332N885393562","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N778068918","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 751 964","emailAddress":"ella.evans@blueyonder.co.uk"},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"239 077 9864","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"19 January 1976","day":19,"month":0,"year":1976},"checking":true,"checkType":"supervisor","applicationReference":" 20261007043847N298531427","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N071210312","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07036 592 817","emailAddress":"g.thomas@googlemail.com"},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"366 142 2295","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"5 March 1977","day":5,"month":2,"year":1977},"checking":false,"applicationReference":" 20261001044251N173341117","certificateReference":"HRT M9E9 0FYF","channel":"Digital","startDate":{"display":"21 Oct 2025","day":21,"month":9,"year":2025},"endDate":{"display":"20 Oct 2026","day":20,"month":9,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07047 813 256","emailAddress":"lily.roberts@hotmail.com"},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"878 309 7420","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"26 October 1968","day":26,"month":9,"year":1968},"checking":false,"applicationReference":" 20261002200802N599061538","certificateReference":"HRT 4Y6B PWDO","channel":"Digital","startDate":{"display":"24 Nov 2025","day":24,"month":10,"year":2025},"endDate":{"display":"23 Nov 2026","day":23,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07051 294 783","emailAddress":"Johnson238@blueyonder.co.uk"},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"210 799 0722","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"8 April 1976","day":8,"month":3,"year":1976},"checking":false,"applicationReference":" 20261004045840N358080794","certificateReference":"HRT PXI8 8ZLK","channel":"Digital","startDate":{"display":"4 Feb 2026","day":4,"month":1,"year":2026},"endDate":{"display":"3 Feb 2027","day":3,"month":1,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07063 418 592","emailAddress":"lewis.c@outlook.com"},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"287 660 5948","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"3 December 1994","day":3,"month":11,"year":1994},"checking":false,"applicationReference":" 20261007082719N511318081","certificateReference":"05 817 578 483","channel":"Paper","imageReference":"2026 10 07 09 45 08N691674305","startDate":{"display":"2 Jan 2026","day":2,"month":0,"year":2026},"dueDate":{"display":"7 Nov 2025","day":7,"month":10,"year":2025},"endDate":{"display":"1 Jan 2027","day":1,"month":0,"year":2027},"childsDOB":{"display":"2 January 2026","day":2,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07075 928 341","emailAddress":"isabella.walker358@hotmail.com"},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"394 434 3319","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","checking":true,"checkType":"quality","dateOfBirth":{"display":"19 November 1971","day":19,"month":10,"year":1971},"applicationReference":" 20261001220133N448534471","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N031041939","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07084 372 659"},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"285 847 8716","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"active","dateOfBirth":{"display":"10 August 1994","day":10,"month":7,"year":1994},"checking":false,"applicationReference":" 20261001210914N526504413","certificateReference":"12 949 886 353","channel":"Digital","startDate":{"display":"15 Nov 2025","day":15,"month":10,"year":2025},"dueDate":{"display":"20 Nov 2025","day":20,"month":10,"year":2025},"endDate":{"display":"14 Nov 2026","day":14,"month":10,"year":2026},"childsDOB":{"display":"15 November 2025","day":15,"month":10,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07091 837 426","emailAddress":"clarke.e@blueyonder.co.uk"},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"881 944 9342","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"14 August 2002","day":14,"month":7,"year":2002},"checking":true,"checkType":"supervisor","applicationReference":" 20261002213421N994931040","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N011035548","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 385 927","emailAddress":"p.allen@blueyonder.co.uk"},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"285 043 6157","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"23 August 1998","day":23,"month":7,"year":1998},"checking":false,"applicationReference":" 20260930130914N485139256","certificateReference":"48 890 377 270","channel":"Paper","imageReference":"2026 10 07 09 45 08N132812894","startDate":{"display":"3 Jan 2026","day":3,"month":0,"year":2026},"dueDate":{"display":"24 Oct 2025","day":24,"month":9,"year":2025},"endDate":{"display":"2 Jan 2027","day":2,"month":0,"year":2027},"childsDOB":{"display":"3 January 2026","day":3,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07027 639 485","emailAddress":"s.young@hotmail.com"},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"211 091 0497","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"8 August 1997","day":8,"month":7,"year":1997},"checking":false,"applicationReference":" 20261002113808N998327294","certificateReference":"87 150 432 056","channel":"Paper","imageReference":"2026 10 07 09 45 08N176937432","startDate":{"display":"16 Nov 2025","day":16,"month":10,"year":2025},"dueDate":{"display":"2 Mar 2026","day":2,"month":2,"year":2026},"endDate":{"display":"15 Nov 2026","day":15,"month":10,"year":2026},"childsDOB":{"display":"16 November 2025","day":16,"month":10,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07035 821 749","emailAddress":"h.king969@gmail.com"},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"587 939 8406","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"5 January 1988","day":5,"month":0,"year":1988},"checking":false,"applicationReference":" 20261001010739N676980787","certificateReference":"75 448 302 386","channel":"Digital","startDate":{"display":"29 Oct 2025","day":29,"month":9,"year":2025},"medicalCondition":["(10) Cancer"],"endDate":{"display":"28 Oct 2035","day":28,"month":9,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07048 952 613","emailAddress":"m.wright@outlook.com"},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"384 951 9475","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"23 August 1979","day":23,"month":7,"year":1979},"checking":false,"applicationReference":" 20261006152822N682347284","certificateReference":"10 160 161 705","channel":"Digital","startDate":{"display":"11 Nov 2025","day":11,"month":10,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"10 Nov 2035","day":10,"month":10,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07052 719 384","emailAddress":"e.green@blueyonder.co.uk"},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"214 474 8895","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"processing","dateOfBirth":{"display":"22 September 1987","day":22,"month":8,"year":1987},"checking":false,"applicationReference":" 20261003135452N473247311","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N561931021","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07064 837 295","emailAddress":"Baker596@gmail.com"},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"522 742 3666","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"8 May 1993","day":8,"month":4,"year":1993},"checking":false,"applicationReference":" 20261006214753N795365641","certificateReference":"28 966 341 396","channel":"Paper","imageReference":"2026 10 07 09 45 08N446431237","startDate":{"display":"30 Dec 2025","day":30,"month":11,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"29 Dec 2035","day":29,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07073 491 826"},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"123 141 2177","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"26 November 1984","day":26,"month":10,"year":1984},"checking":false,"applicationReference":" 20261002184059N828849010","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N289961538","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07085 623 941","emailAddress":"Mitchell491@googlemail.com"},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"192 669 7022","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","checking":false,"checkType":"quality","dateOfBirth":{"display":"19 September 1993","day":19,"month":8,"year":1993},"applicationReference":" 20260930110542N986158510","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N339609242","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07096 718 235"},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"516 048 6217","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"20 August 1968","day":20,"month":7,"year":1968},"checking":false,"applicationReference":" 20261006224721N865939844","certificateReference":"HRT VUIN RMUO","channel":"Digital","startDate":{"display":"21 Nov 2025","day":21,"month":10,"year":2025},"endDate":{"display":"20 Nov 2026","day":20,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07018 273 945","emailAddress":"w.carter@blueyonder.co.uk"},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"542 134 2391","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"25 June 1968","day":25,"month":5,"year":1968},"checking":true,"checkType":"supervisor","applicationReference":" 20261006003801N024633298","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N014917068","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07029 384 756","emailAddress":"j.morris@aol.com"},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"619 620 5503","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","checking":true,"checkType":"quality","dateOfBirth":{"display":"2 February 1975","day":2,"month":1,"year":1975},"applicationReference":" 20261007052316N258695068","certificateReference":"36 652 805 407","channel":"Paper","imageReference":"2026 10 07 09 45 08N129424834","startDate":{"display":"15 Mar 2026","day":15,"month":2,"year":2026},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"14 Mar 2036","day":14,"month":2,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07031 572 948"},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"026 300 8335","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"24 December 1991","day":24,"month":11,"year":1991},"checking":false,"applicationReference":" 20261001074656N861825108","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N710572896","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07042 619 583","emailAddress":"elsie.ward@outlook.com"},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"443 886 8211","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"18 April 1993","day":18,"month":3,"year":1993},"applicationReference":" 20261003141022N418148276","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N047520670","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07053 847 261"},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"366 562 8134","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"21 March 1997","day":21,"month":2,"year":1997},"checking":false,"applicationReference":" 20261007022131N725512345","certificateReference":"23 027 930 147","channel":"Paper","imageReference":"2026 10 07 09 45 08N996182635","startDate":{"display":"11 Feb 2026","day":11,"month":1,"year":2026},"dueDate":{"display":"6 Dec 2025","day":6,"month":11,"year":2025},"endDate":{"display":"10 Feb 2027","day":10,"month":1,"year":2027},"childsDOB":{"display":"11 February 2026","day":11,"month":1,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07064 928 137"},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"768 530 5048","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"active","dateOfBirth":{"display":"16 February 1991","day":16,"month":1,"year":1991},"checking":false,"applicationReference":" 20261004122747N553908537","certificateReference":"98 959 434 516","channel":"Digital","startDate":{"display":"12 Jan 2026","day":12,"month":0,"year":2026},"dueDate":{"display":"8 Mar 2026","day":8,"month":2,"year":2026},"endDate":{"display":"11 Jan 2027","day":11,"month":0,"year":2027},"childsDOB":{"display":"12 January 2026","day":12,"month":0,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07075 283 916","emailAddress":"Bailey491@gmail.com"},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"898 465 9649","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"processing","dateOfBirth":{"display":"20 September 2007","day":20,"month":8,"year":2007},"checking":false,"applicationReference":" 20261002001049N172561319","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N113683447","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07086 419 375"},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"620 202 2885","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"13 May 1995","day":13,"month":4,"year":1995},"checking":true,"checkType":"supervisor","applicationReference":" 20261001105118N754662015","certificateReference":"28 604 771 561","channel":"Paper","imageReference":"2026 10 07 09 45 08N677809810","startDate":{"display":"7 Mar 2026","day":7,"month":2,"year":2026},"dueDate":{"display":"22 Dec 2025","day":22,"month":11,"year":2025},"endDate":{"display":"6 Mar 2027","day":6,"month":2,"year":2027},"childsDOB":{"display":"7 March 2026","day":7,"month":2,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07097 531 284","emailAddress":"Phillips802@hotmail.com"},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"555 213 4564","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"3 June 1994","day":3,"month":5,"year":1994},"applicationReference":" 20261005094557N128236449","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N510103854","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07018 642 597","emailAddress":"zara.bennett@gmail.com"},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"759 760 1934","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"21 March 2003","day":21,"month":2,"year":2003},"checking":false,"applicationReference":" 20261007030603N571176881","certificateReference":"93 756 967 028","channel":"Digital","startDate":{"display":"8 Oct 2025","day":8,"month":9,"year":2025},"dueDate":{"display":"2 Feb 2026","day":2,"month":1,"year":2026},"endDate":{"display":"7 Oct 2026","day":7,"month":9,"year":2026},"childsDOB":{"display":"8 October 2025","day":8,"month":9,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07029 753 861","emailAddress":"f.cox@aol.com"},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"248 910 5166","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"13 July 1969","day":13,"month":6,"year":1969},"applicationReference":" 20261007050714N522680467","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N507682034","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07031 864 729"},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"336 221 4952","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"8 July 1995","day":8,"month":6,"year":1995},"checking":false,"applicationReference":" 20261003095838N137936893","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N110167522","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07042 987 513"},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"998 842 4940","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"15 July 1974","day":15,"month":6,"year":1974},"checking":false,"applicationReference":" 20261001221316N646888614","certificateReference":"HRT 5JFC DDZ4","channel":"Digital","startDate":{"display":"5 Nov 2025","day":5,"month":10,"year":2025},"endDate":{"display":"4 Nov 2026","day":4,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07054 129 876","emailAddress":"Ross981@blueyonder.co.uk"},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"425 822 2074","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"20 February 1992","day":20,"month":1,"year":1992},"checking":false,"applicationReference":" 20261007025759N387082149","certificateReference":"HRT IQGW TBX8","channel":"Digital","startDate":{"display":"6 Apr 2026","day":6,"month":3,"year":2026},"endDate":{"display":"5 Apr 2027","day":5,"month":3,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07065 238 741","emailAddress":"arabella.bell@googlemail.com"},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"087 225 2445","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"8 February 2005","day":8,"month":1,"year":2005},"checking":false,"applicationReference":" 20261006125936N781843098","certificateReference":"87 901 927 239","channel":"Digital","startDate":{"display":"8 Mar 2026","day":8,"month":2,"year":2026},"dueDate":{"display":"5 Nov 2025","day":5,"month":10,"year":2025},"endDate":{"display":"7 Mar 2027","day":7,"month":2,"year":2027},"childsDOB":{"display":"8 March 2026","day":8,"month":2,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07076 391 825","emailAddress":"Cook518@blueyonder.co.uk"},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"644 330 3386","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"23 December 1989","day":23,"month":11,"year":1989},"checking":true,"checkType":"supervisor","applicationReference":" 20261001205758N143588925","certificateReference":"78 776 116 022","channel":"Paper","imageReference":"2026 10 07 09 45 08N897596827","startDate":{"display":"20 Feb 2026","day":20,"month":1,"year":2026},"dueDate":{"display":"24 Mar 2026","day":24,"month":2,"year":2026},"endDate":{"display":"19 Feb 2027","day":19,"month":1,"year":2027},"childsDOB":{"display":"20 February 2026","day":20,"month":1,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07087 512 936","emailAddress":"t.watson@gmail.com"},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"500 279 0729","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"28 September 1985","day":28,"month":8,"year":1985},"applicationReference":" 20261002213531N845275766","certificateReference":"99 469 629 515","channel":"Paper","imageReference":"2026 10 07 09 45 08N878177959","startDate":{"display":"9 Mar 2026","day":9,"month":2,"year":2026},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"8 Mar 2036","day":8,"month":2,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07098 631 427"},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"867 378 3891","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"processing","dateOfBirth":{"display":"12 October 2002","day":12,"month":9,"year":2002},"checking":false,"applicationReference":" 20261006195550N013733293","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N346300528","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07019 742 835","emailAddress":"e.harrison@outlook.com"},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"854 442 8863","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"6 March 1986","day":6,"month":2,"year":1986},"checking":false,"applicationReference":" 20261002080036N160185551","certificateReference":"13 917 003 867","channel":"Paper","imageReference":"2026 10 07 09 45 08N207089438","startDate":{"display":"23 Nov 2025","day":23,"month":10,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"22 Nov 2035","day":22,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07020 853 749","emailAddress":"l.coleman@hotmail.com"},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"428 364 3373","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"10 September 1996","day":10,"month":8,"year":1996},"checking":false,"applicationReference":" 20261002044711N470636093","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N489029951","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07031 984 625"},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"325 586 8963","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"25 May 2000","day":25,"month":4,"year":2000},"checking":true,"checkType":"supervisor","applicationReference":" 20261004031746N916385027","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N860040919","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07042 195 783"},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"497 615 1537","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"9 December 1988","day":9,"month":11,"year":1988},"checking":false,"applicationReference":" 20261001092828N845204776","certificateReference":"06 405 880 133","channel":"Digital","startDate":{"display":"19 Feb 2026","day":19,"month":1,"year":2026},"medicalCondition":["(9) Continuing physical disability"],"endDate":{"display":"18 Feb 2036","day":18,"month":1,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07053 268 917","emailAddress":"stevens.b@hotmail.com"},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"163 591 7948","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"processing","dateOfBirth":{"display":"12 July 1977","day":12,"month":6,"year":1977},"checking":false,"applicationReference":" 20261001185210N457831843","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N990752090","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07064 371 528","emailAddress":"i.simpson@hotmail.com"},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"713 751 6848","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"20 June 1968","day":20,"month":5,"year":1968},"checking":false,"applicationReference":" 20261003214701N036537148","certificateReference":"30 602 924 821","channel":"Digital","startDate":{"display":"2 Nov 2025","day":2,"month":10,"year":2025},"medicalCondition":["(3) Diabetes mellitus","(9) Continuing physical disability"],"endDate":{"display":"1 Nov 2035","day":1,"month":10,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07075 482 936","emailAddress":"harriet.butler@blueyonder.co.uk"},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"099 503 2134","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"18 October 1975","day":18,"month":9,"year":1975},"checking":false,"applicationReference":" 20261006055640N712097903","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N171260919","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07086 593 147"},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"828 735 2610","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"4 October 1981","day":4,"month":9,"year":1981},"applicationReference":" 20261001042439N453595795","certificateReference":"56 248 480 667","channel":"Paper","imageReference":"2026 10 07 09 45 08N330279387","startDate":{"display":"31 Oct 2025","day":31,"month":9,"year":2025},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"30 Oct 2035","day":30,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07097 614 258","emailAddress":"a.ali@blueyonder.co.uk"},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"347 998 9505","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"11 July 1993","day":11,"month":6,"year":1993},"checking":true,"checkType":"supervisor","applicationReference":" 20261002224526N632618119","certificateReference":"43 693 739 945","channel":"Paper","imageReference":"2026 10 07 09 45 08N974222500","startDate":{"display":"2 Mar 2026","day":2,"month":2,"year":2026},"dueDate":{"display":"6 Feb 2026","day":6,"month":1,"year":2026},"endDate":{"display":"1 Mar 2027","day":1,"month":2,"year":2027},"childsDOB":{"display":"2 March 2026","day":2,"month":2,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07018 725 369","emailAddress":"Hussain845@googlemail.com"},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"068 098 5567","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"13 November 1993","day":13,"month":10,"year":1993},"checking":false,"applicationReference":" 20260930182440N596833521","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N327452976","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07029 836 471"},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"138 617 0518","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"10 May 1991","day":10,"month":4,"year":1991},"checking":true,"checkType":"supervisor","applicationReference":" 20261002112036N925273731","certificateReference":"29 817 524 354","channel":"Paper","imageReference":"2026 10 07 09 45 08N254635400","startDate":{"display":"19 Dec 2025","day":19,"month":11,"year":2025},"dueDate":{"display":"13 Feb 2026","day":13,"month":1,"year":2026},"endDate":{"display":"18 Dec 2026","day":18,"month":11,"year":2026},"childsDOB":{"display":"19 December 2025","day":19,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07030 947 582","emailAddress":"begum.l@gmail.com"},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"825 289 4698","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"5 April 2008","day":5,"month":3,"year":2008},"checking":true,"checkType":"supervisor","applicationReference":" 20260930143417N368946351","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N184923675","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07042 058 693","emailAddress":"O’Connor967@outlook.com"},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"929 236 6232","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"processing","dateOfBirth":{"display":"21 June 1993","day":21,"month":5,"year":1993},"checking":false,"applicationReference":" 20261005124637N144224214","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N216031919","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07053 169 784"},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"685 156 1733","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"8 June 1983","day":8,"month":5,"year":1983},"applicationReference":" 20260930193149N287381849","certificateReference":"11 791 646 371","channel":"Paper","imageReference":"2026 10 07 09 45 08N241837136","startDate":{"display":"16 Dec 2025","day":16,"month":11,"year":2025},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"15 Dec 2035","day":15,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07064 271 895","emailAddress":"e.mccarthy@gmail.com"},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"500 772 1057","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"8 February 1992","day":8,"month":1,"year":1992},"checking":false,"applicationReference":" 20261007051804N223930342","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N324736703","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07075 382 916","emailAddress":"Doyle599@outlook.com"},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"063 830 6864","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"expired","dateOfBirth":{"display":"25 September 1986","day":25,"month":8,"year":1986},"checking":false,"applicationReference":" 20261006162550N190888543","certificateReference":"97 090 912 171","channel":"Digital","startDate":{"display":"12 Mar 2026","day":12,"month":2,"year":2026},"medicalCondition":["(3) Diabetes mellitus","(6) Diabetes insipidus"],"endDate":{"display":"11 Mar 2036","day":11,"month":2,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07086 493 127","emailAddress":"Griffiths354@googlemail.com"},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"935 910 1332","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"3 June 1998","day":3,"month":5,"year":1998},"checking":true,"checkType":"supervisor","applicationReference":" 20261006092427N365811003","certificateReference":"07 936 632 774","channel":"Paper","imageReference":"2026 10 07 09 45 08N005195640","startDate":{"display":"26 Mar 2026","day":26,"month":2,"year":2026},"dueDate":{"display":"27 Jan 2026","day":27,"month":0,"year":2026},"endDate":{"display":"25 Mar 2027","day":25,"month":2,"year":2027},"childsDOB":{"display":"26 March 2026","day":26,"month":2,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07097 514 238","emailAddress":"rees.m@blueyonder.co.uk"},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"644 641 8757","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"deleted","dateOfBirth":{"display":"16 November 1981","day":16,"month":10,"year":1981},"checking":false,"applicationReference":" 20260930200923N637056324","certificateReference":"89 827 747 173","channel":"Digital","startDate":{"display":"18 Nov 2025","day":18,"month":10,"year":2025},"medicalCondition":["(10) Cancer"],"endDate":{"display":"17 Nov 2035","day":17,"month":10,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07018 625 349","emailAddress":"ffion.evans@googlemail.com"},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"163 681 6518","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"15 May 1989","day":15,"month":4,"year":1989},"checking":true,"checkType":"supervisor","applicationReference":" 20261001074115N012128467","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N503753146","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07029 736 458","emailAddress":"e.macdonald@aol.com"},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"560 964 2784","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"25 June 1967","day":25,"month":5,"year":1967},"applicationReference":" 20261003154500N285437371","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N394799358","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07030 847 569","emailAddress":"Fraser862@blueyonder.co.uk"},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"167 889 4206","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"4 September 2006","day":4,"month":8,"year":2006},"applicationReference":" 20261004112633N418791980","certificateReference":"25 153 897 317","channel":"Paper","imageReference":"2026 10 07 09 45 08N313263528","startDate":{"display":"11 Oct 2025","day":11,"month":9,"year":2025},"dueDate":{"display":"19 Mar 2026","day":19,"month":2,"year":2026},"endDate":{"display":"10 Oct 2026","day":10,"month":9,"year":2026},"childsDOB":{"display":"11 October 2025","day":11,"month":9,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07041 958 672","emailAddress":"Armstrong402@outlook.com"},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"952 420 3013","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"24 March 1992","day":24,"month":2,"year":1992},"checking":false,"applicationReference":" 20261003123612N727418688","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N427834129","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07052 069 783"},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"601 730 5089","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"13 November 1984","day":13,"month":10,"year":1984},"checking":false,"applicationReference":" 20261005145600N307809350","certificateReference":"HRT LBSC SZOP","channel":"Digital","startDate":{"display":"31 Dec 2025","day":31,"month":11,"year":2025},"endDate":{"display":"30 Dec 2026","day":30,"month":11,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07063 171 894","emailAddress":"c.lawrence@hotmail.com"},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"686 423 3933","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"23 December 1967","day":23,"month":11,"year":1967},"checking":false,"applicationReference":" 20260930133842N208110538","certificateReference":"83 882 279 943","channel":"Paper","imageReference":"2026 10 07 09 45 08N152534606","startDate":{"display":"16 Dec 2025","day":16,"month":11,"year":2025},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"15 Dec 2035","day":15,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07074 282 915","emailAddress":"b.spencer@hotmail.com"},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"812 373 4983","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"18 August 1968","day":18,"month":7,"year":1968},"checking":true,"checkType":"supervisor","applicationReference":" 20261003181209N268848319","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N911078673","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07085 393 126","emailAddress":"rogers.n@hotmail.com"},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"999 677 1482","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"28 July 1979","day":28,"month":6,"year":1979},"checking":true,"checkType":"supervisor","applicationReference":" 20261003075811N162893183","certificateReference":"43 677 110 832","channel":"Paper","imageReference":"2026 10 07 09 45 08N999781697","startDate":{"display":"27 Jan 2026","day":27,"month":0,"year":2026},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"26 Jan 2036","day":26,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07096 414 237","emailAddress":"annabelle.watts@gmail.com"},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"341 514 6229","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"14 July 1981","day":14,"month":6,"year":1981},"checking":false,"applicationReference":" 20261001111437N983516557","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N309533917","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07017 525 348"},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"474 209 5679","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"3 May 1978","day":3,"month":4,"year":1978},"checking":false,"applicationReference":" 20261005053118N564316490","certificateReference":"HRT T22B YOVD","channel":"Pharmacy","startDate":{"display":"30 Oct 2025","day":30,"month":9,"year":2025},"endDate":{"display":"29 Oct 2026","day":29,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07028 636 459","emailAddress":"rose.palmer@blueyonder.co.uk"},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"583 458 0340","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"18 May 1989","day":18,"month":4,"year":1989},"checking":false,"applicationReference":" 20261002012232N386026307","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N822637455","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07039 747 561","emailAddress":"l.nicholson@outlook.com"},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"026 323 8048","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"deleted","dateOfBirth":{"display":"25 February 2005","day":25,"month":1,"year":2005},"checking":false,"applicationReference":" 20261002232812N420567889","certificateReference":"46 946 360 838","channel":"Digital","startDate":{"display":"13 Mar 2026","day":13,"month":2,"year":2026},"dueDate":{"display":"24 Feb 2026","day":24,"month":1,"year":2026},"endDate":{"display":"12 Mar 2027","day":12,"month":2,"year":2027},"childsDOB":{"display":"13 March 2026","day":13,"month":2,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07040 858 673","emailAddress":"gardner.j@outlook.com"},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"606 482 8857","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"17 September 2001","day":17,"month":8,"year":2001},"checking":true,"checkType":"supervisor","applicationReference":" 20261007081654N079538996","certificateReference":"84 726 056 210","channel":"Paper","imageReference":"2026 10 07 09 45 08N933542712","startDate":{"display":"25 Feb 2026","day":25,"month":1,"year":2026},"dueDate":{"display":"14 Feb 2026","day":14,"month":1,"year":2026},"endDate":{"display":"24 Feb 2027","day":24,"month":1,"year":2027},"childsDOB":{"display":"25 February 2026","day":25,"month":1,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07051 969 782","emailAddress":"a.newton@gmail.com"},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"614 896 6884","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"21 June 1995","day":21,"month":5,"year":1995},"applicationReference":" 20260930174105N447728966","certificateReference":"85 446 477 908","channel":"Paper","imageReference":"2026 10 07 09 45 08N839395469","startDate":{"display":"13 Mar 2026","day":13,"month":2,"year":2026},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"12 Mar 2036","day":12,"month":2,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07062 071 893","emailAddress":"s.reed@hotmail.com"},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"118 820 0653","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"8 February 2001","day":8,"month":1,"year":2001},"checking":false,"applicationReference":" 20261002113827N896699104","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N798526362","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07073 182 914","emailAddress":"v.harvey@hotmail.com"},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"600 173 5336","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"24 November 1987","day":24,"month":10,"year":1987},"checking":false,"applicationReference":" 20261005104814N003912060","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N151066521","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07084 293 125","emailAddress":"maria.fernandez@blueyonder.co.uk"},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"469 937 5506","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"12 December 1977","day":12,"month":11,"year":1977},"checking":false,"applicationReference":" 20261006033953N591195871","certificateReference":"HRT OMHE BEL5","channel":"Digital","startDate":{"display":"7 Oct 2025","day":7,"month":9,"year":2025},"endDate":{"display":"6 Oct 2026","day":6,"month":9,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07095 314 236","emailAddress":"Silva754@googlemail.com"},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"379 315 7349","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"20 September 1980","day":20,"month":8,"year":1980},"checking":false,"applicationReference":" 20261006075002N513713248","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N388542395","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07016 425 347","emailAddress":"leila.patel@blueyonder.co.uk"},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"975 419 3578","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","checking":false,"checkType":"quality","dateOfBirth":{"display":"22 March 1989","day":22,"month":2,"year":1989},"applicationReference":" 20261003235442N432847348","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N479291319","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07027 536 458"},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"619 725 8075","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"19 December 1988","day":19,"month":11,"year":1988},"checking":false,"applicationReference":" 20261001190805N477775199","certificateReference":"HRT CQNX 1D6V","channel":"Digital","startDate":{"display":"23 Jan 2026","day":23,"month":0,"year":2026},"endDate":{"display":"22 Jan 2027","day":22,"month":0,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07038 647 569","emailAddress":"jasmine.ahmed@hotmail.com"},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"373 903 6180","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"17 March 1968","day":17,"month":2,"year":1968},"checking":false,"applicationReference":" 20261003175506N696877128","certificateReference":"03 761 429 824","channel":"Paper","imageReference":"2026 10 07 09 45 08N077574141","startDate":{"display":"6 Dec 2025","day":6,"month":11,"year":2025},"medicalCondition":["(2) Epilepsy","(3) Diabetes mellitus"],"endDate":{"display":"5 Dec 2035","day":5,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07049 758 671","emailAddress":"n.rashid@aol.com"},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"972 475 1442","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"9 May 1972","day":9,"month":4,"year":1972},"applicationReference":" 20260930110236N521468314","certificateReference":"46 931 821 563","channel":"Paper","imageReference":"2026 10 07 09 45 08N350920561","startDate":{"display":"4 Jan 2026","day":4,"month":0,"year":2026},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"3 Jan 2036","day":3,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07050 869 782","emailAddress":"tara.paterson@googlemail.com"},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"875 022 9620","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"18 August 1976","day":18,"month":7,"year":1976},"checking":false,"applicationReference":" 20260930201555N339827324","certificateReference":"HRT BR4E 1Q4L","channel":"Digital","startDate":{"display":"4 Jan 2026","day":4,"month":0,"year":2026},"endDate":{"display":"3 Jan 2027","day":3,"month":0,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07061 971 893","emailAddress":"Foster386@hotmail.com"},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"931 733 0022","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"19 September 1996","day":19,"month":8,"year":1996},"checking":true,"checkType":"supervisor","applicationReference":" 20261005002511N029236300","certificateReference":"58 470 611 156","channel":"Paper","imageReference":"2026 10 07 09 45 08N636495760","startDate":{"display":"3 Jan 2026","day":3,"month":0,"year":2026},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"2 Jan 2036","day":2,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07072 082 914","emailAddress":"lauren.fox271@hotmail.com"},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"353 715 7246","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"12 October 1978","day":12,"month":9,"year":1978},"applicationReference":" 20261007024301N346887883","certificateReference":"80 122 310 477","channel":"Paper","imageReference":"2026 10 07 09 45 08N396998565","startDate":{"display":"5 Feb 2026","day":5,"month":1,"year":2026},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"4 Feb 2036","day":4,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07083 193 125"},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"361 534 4152","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"20 September 1988","day":20,"month":8,"year":1988},"checking":false,"applicationReference":" 20261001205524N761260877","certificateReference":"29 012 400 230","channel":"Digital","startDate":{"display":"14 Oct 2025","day":14,"month":9,"year":2025},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"13 Oct 2035","day":13,"month":9,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07094 214 236","emailAddress":"a.murray@hotmail.com"},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"684 316 0332","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"24 February 2005","day":24,"month":1,"year":2005},"checking":true,"checkType":"supervisor","applicationReference":" 20261004133253N539498540","certificateReference":"51 409 426 704","channel":"Paper","imageReference":"2026 10 07 09 45 08N036868826","startDate":{"display":"24 Dec 2025","day":24,"month":11,"year":2025},"dueDate":{"display":"21 Nov 2025","day":21,"month":10,"year":2025},"endDate":{"display":"23 Dec 2026","day":23,"month":11,"year":2026},"childsDOB":{"display":"24 December 2025","day":24,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07015 325 347","emailAddress":"ella-may.west@hotmail.com"},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"731 310 5564","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"active","dateOfBirth":{"display":"10 September 1968","day":10,"month":8,"year":1968},"checking":false,"applicationReference":" 20261006101341N996517500","certificateReference":"57 098 165 788","channel":"Digital","startDate":{"display":"29 Mar 2026","day":29,"month":2,"year":2026},"medicalCondition":["(8) Myasthenia gravis","(9) Continuing physical disability","(10) Cancer"],"endDate":{"display":"28 Mar 2036","day":28,"month":2,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07026 436 458","emailAddress":"robyn.matthews@blueyonder.co.uk"},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"340 765 4500","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"17 December 1971","day":17,"month":11,"year":1971},"checking":false,"applicationReference":" 20261002042504N676678292","certificateReference":"HRT NT74 6V4S","channel":"Digital","startDate":{"display":"20 Nov 2025","day":20,"month":10,"year":2025},"endDate":{"display":"19 Nov 2026","day":19,"month":10,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07037 547 569","emailAddress":"kayla.holmes@hotmail.com"},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"450 305 2111","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"26 November 1970","day":26,"month":10,"year":1970},"checking":false,"applicationReference":" 20261003142056N883139936","certificateReference":"26 658 903 925","channel":"Paper","imageReference":"2026 10 07 09 45 08N188364417","startDate":{"display":"29 Nov 2025","day":29,"month":10,"year":2025},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"28 Nov 2035","day":28,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07048 658 671","emailAddress":"walsh.l@googlemail.com"},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"706 748 7209","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"9 August 1986","day":9,"month":7,"year":1986},"applicationReference":" 20261001115846N756336633","certificateReference":"53 516 563 274","channel":"Paper","imageReference":"2026 10 07 09 45 08N772080701","startDate":{"display":"2 Nov 2025","day":2,"month":10,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"1 Nov 2035","day":1,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07059 769 782"},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"626 374 1138","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"3 February 2002","day":3,"month":1,"year":2002},"checking":false,"applicationReference":" 20261003214426N205877525","certificateReference":"98 852 387 089","channel":"Digital","startDate":{"display":"5 Nov 2025","day":5,"month":10,"year":2025},"dueDate":{"display":"6 Jan 2026","day":6,"month":0,"year":2026},"endDate":{"display":"4 Nov 2026","day":4,"month":10,"year":2026},"childsDOB":{"display":"5 November 2025","day":5,"month":10,"year":2025},"certificateFulfilment":"email","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07060 871 893","emailAddress":"natalie.jordan@outlook.com"},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"139 116 5996","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"15 July 1972","day":15,"month":6,"year":1972},"checking":false,"applicationReference":" 20261007005852N534049578","certificateReference":"22 569 626 200","channel":"Paper","imageReference":"2026 10 07 09 45 08N217584685","startDate":{"display":"26 Dec 2025","day":26,"month":11,"year":2025},"medicalCondition":["(1) Permanent fistula"],"endDate":{"display":"25 Dec 2035","day":25,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07071 982 914"},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"790 244 8238","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"3 June 1999","day":3,"month":5,"year":1999},"applicationReference":" 20261006130741N839252522","certificateReference":"27 861 333 426","channel":"Paper","imageReference":"2026 10 07 09 45 08N486025672","startDate":{"display":"2 Mar 2026","day":2,"month":2,"year":2026},"dueDate":{"display":"6 Feb 2026","day":6,"month":1,"year":2026},"endDate":{"display":"1 Mar 2027","day":1,"month":2,"year":2027},"childsDOB":{"display":"2 March 2026","day":2,"month":2,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07082 093 125","emailAddress":"hayes.m@blueyonder.co.uk"},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"126 218 9933","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"7 September 1981","day":7,"month":8,"year":1981},"checking":true,"checkType":"supervisor","applicationReference":" 20261005013200N032254219","certificateReference":"54 052 577 281","channel":"Paper","imageReference":"2026 10 07 09 45 08N929101903","startDate":{"display":"22 Dec 2025","day":22,"month":11,"year":2025},"medicalCondition":["(1) Permanent fistula","(3) Diabetes mellitus","(10) Cancer"],"endDate":{"display":"21 Dec 2035","day":21,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07093 114 236"},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"779 155 4612","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"4 July 1981","day":4,"month":6,"year":1981},"applicationReference":" 20261004065047N810416032","certificateReference":"95 307 786 383","channel":"Paper","imageReference":"2026 10 07 09 45 08N585204730","startDate":{"display":"4 Feb 2026","day":4,"month":1,"year":2026},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"3 Feb 2036","day":3,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07014 225 347","emailAddress":"barber.a@blueyonder.co.uk"},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"900 280 0536","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"7 October 1998","day":7,"month":9,"year":1998},"checking":false,"applicationReference":" 20261002021451N553728864","certificateReference":"01 753 322 614","channel":"Paper","imageReference":"2026 10 07 09 45 08N000047771","startDate":{"display":"10 Jan 2026","day":10,"month":0,"year":2026},"dueDate":{"display":"30 Nov 2025","day":30,"month":10,"year":2025},"endDate":{"display":"9 Jan 2027","day":9,"month":0,"year":2027},"childsDOB":{"display":"10 January 2026","day":10,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07025 336 458"},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"573 191 2209","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"3 March 1970","day":3,"month":2,"year":1970},"checking":false,"applicationReference":" 20261005120853N504041240","certificateReference":"HRT IONQ TJQV","channel":"Digital","startDate":{"display":"26 Nov 2025","day":26,"month":10,"year":2025},"endDate":{"display":"25 Nov 2026","day":25,"month":10,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07036 447 569","emailAddress":"eden.parsons@gmail.com"},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"425 419 2042","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","checking":false,"checkType":"quality","dateOfBirth":{"display":"8 December 1989","day":8,"month":11,"year":1989},"applicationReference":" 20261001045244N020263472","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N665843971","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07047 558 671"},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"263 279 9899","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"10 December 1988","day":10,"month":11,"year":1988},"checking":true,"checkType":"supervisor","applicationReference":" 20261001102942N724032982","certificateReference":"","channel":"Paper","imageReference":"2026 10 07 09 45 08N384202343","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07047 813 256","emailAddress":"h.day@blueyonder.co.uk"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"986 324 7950","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"19 April 1975","day":19,"month":3,"year":1975},"applicationReference":" 20261006050947N875164344","certificateReference":"63 196 586 648","channel":"Paper","imageReference":"2026 10 07 09 45 08N272848257","startDate":{"display":"21 Oct 2025","day":21,"month":9,"year":2025},"medicalCondition":["(2) Epilepsy"],"endDate":{"display":"20 Oct 2035","day":20,"month":9,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07029 836 471","emailAddress":"indie.francis@blueyonder.co.uk"},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"401 992 5822","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"21 July 1993","day":21,"month":6,"year":1993},"applicationReference":" 20261001154348N798895822","certificateReference":"01 702 146 228","channel":"Paper","imageReference":"2026 10 07 09 45 08N127160732","startDate":{"display":"3 Jan 2026","day":3,"month":0,"year":2026},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"2 Jan 2036","day":2,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07031 572 948","emailAddress":"burton.h@hotmail.com"}]'
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
