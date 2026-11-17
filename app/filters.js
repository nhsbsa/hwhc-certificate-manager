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
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--pink">HRT PPC</strong>' : 'HRT PPC';
        break;

      case 'ppc':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--blue">PPC</strong>' : 'PPC';
        break;

      case 'matex':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--aqua-green">MATEX</strong>' : 'MATEX';
        break;

      case 'medex':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--purple">MEDEX</strong>' : 'MEDEX';
        break;

      case 'lis-hc2':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--orange">LIS HC2</strong>' : 'LIS HC2';
        break;

      case 'lis-hc3':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--yellow">LIS HC3</strong>' : 'LIS HC3';
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
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--white">Processing</strong>' : 'Processing';
        break;

      case 'checking':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--white dashed">Checking</strong>' : 'Checking';
        break;

      case 'cancelled':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--expired-grey">Cancelled</strong>' : 'Cancelled';
        break;

      case 'expired':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--expired-grey">Expired</strong>' : 'Expired';
        break;

      case 'on-hold':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--grey">On hold</strong>' : 'On hold';
        break;

      case 'awaiting-payment':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--grey">Awaiting payment</strong>' : 'Awaiting payment';
        break;

      case 'accepted':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--green">Accepted</strong>' : 'Accepted';
        break;

      case 'active':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--green">Active</strong>' : 'Active';
        break;

      case 'rejected':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--red">Rejected</strong>' : 'Rejected';
        break;

      case 'deleted':
        txt = (isTag) ? '<strong class="nhsuk-tag nhsuk-tag--deleted-grey">Deleted</strong>' : 'Deleted';
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

      const certificateType = String(patient.certificateType || '');
      const isClickableCertificateType = ['hrtppc', 'matex', 'medex'].includes(certificateType);
      let link = isClickableCertificateType ? certificateType + '/case?patientID=' + patient.id : '';

      if (processorTable && isClickableCertificateType) {

        if (patient.checking === true) {

          // Checking screens
          switch (role) {

            case 'backOfficeSupervisor':

              if (patient.checkType === 'supervisor') {
                link = certificateType + '/comparison--leave-feedback?patientID=' + patient.id;
              } else {
                link = certificateType + '/comparison--has-feedback?patientID=' + patient.id;
              }
              break;

            case 'qualityControl':

              if (patient.checkType === 'quality') {
                link = certificateType + '/comparison--has-feedback?patientID=' + patient.id;
              } else {
                link = certificateType + '/comparison--no-feedback?patientID=' + patient.id;
              }
              break;

            case 'backOffice':

              link = certificateType + '/application--correction?patientID=' + patient.id;
              break;

            case 'callCentre':

              link = certificateType + '/case--view--can-edit?patientID=' + patient.id;
              break;

          }

        } else {

          // Standard screens
          switch (patient.status) {

            case 'processing':

              if (role === 'backOffice' || role === 'backOfficeSupervisor') {
                link = 'process-application/matex?patientID=' + patient.id;
              } else if (role === 'qualityControl') {
                link = certificateType + '/case--view--cannot-edit?patientID=' + patient.id;
              } else {
                link = certificateType + '/case--view--can-edit?patientID=' + patient.id;
              }

              break;

            case 'on-hold':

              if (role === 'backOffice' || role === 'backOfficeSupervisor') {
                link = certificateType + '/case--view--can-edit?patientID=' + patient.id;
              } else if (role === 'qualityControl') {
                link = certificateType + '/case--view--cannot-edit?patientID=' + patient.id;
              } else {
                link = certificateType + '/case--view--can-edit?patientID=' + patient.id;
              }

              break;

            case 'rejected':

              if (role === 'qualityControl') {
                link = certificateType + '/case--view--cannot-edit?patientID=' + patient.id;
              } else {
                link = certificateType + '/case--view--can-edit?patientID=' + patient.id;
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
          ? fullAddressLine1 
          : fullAddressLine1;
      }

      const nameHTML = isClickableCertificateType
        ? '<a class="nhsuk-link nhsuk-link--no-visited-state" href="' + link + '">' +
          '<strong>' + patient.firstName + ' ' + patient.lastName + '</strong>' +
          '<span class="nhsuk-u-visually-hidden">: Open ' + patient.firstName + ' ' + patient.lastName + '\'s ' + _getCertificateTypeTextOrTag(patient.certificateType) + ' certificate record </span>' +
          '</a>' +
          '<br /><span class="nhsuk-body-s">' + patient.nhsNumber + '</span>'
        : '<strong>' + patient.firstName + ' ' + patient.lastName + '</strong>' +
          '<br /><span class="nhsuk-body-s">' + patient.nhsNumber + '</span>';


      let obj;

      if (processorTable) {

        obj = [
          { html: nameHTML },
          { html: addressHtml },
          { html: patient.address.postcode },
          { html: patient.dateOfBirth.display },
          { html: _getCertificateTypeTextOrTag(patient.certificateType, true) },
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
  // GET PROCESSING TABLE ROWS
  //
  filters.getProcessingTableRows = function (patientData) {

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
    let processingIndex = 0;
    let processingTotal = 0;

    for (let i = 0; i < patientData.length; i++) {
      const patient = patientData[i];

      if (patient.status !== 'on-hold') {
        continue;
      }

      processingTotal++;

      if (processingIndex >= start && processingIndex < end) {
        let addressHtml = '';

        if (!((patient.certificateType === 'matex' || patient.certificateType === 'medex') && patient.channel === 'Digital')) {
          const fullAddressLine1 = patient.address.buildingNumber + ' ' + patient.address.streetName;
          const hadMore = patient.address.locality || patient.address.postTown || patient.address.county;

          addressHtml = hadMore
            ? fullAddressLine1
            : fullAddressLine1;
        }

        rows.push([
          {
            html:
              '<a class="nhsuk-link nhsuk-link--no-visited-state" href="process-application/matex?patientID=' + patient.id + '"><strong>' +
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
          { html: patient.applicationReference || 'Not available' },
          { html: _getReferenceHtml(patient.certificateReference) }
        ]);
      }

      processingIndex++;
    }

    this.ctx.data.noOfProcessingRows = processingTotal;
    return rows;
  };


  //
  // PROCESSING PAGINATION LINKS
  //
  filters.getProcessingPaginationLinks = function (classes) {

    const rowsPerPage = 5;
    const currentPage = Number.isInteger(parseInt(this.ctx.data.currentPage))
      ? parseInt(this.ctx.data.currentPage)
      : 0;

    const total = Number.isInteger(this.ctx.data.noOfProcessingRows)
      ? this.ctx.data.noOfProcessingRows
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


  //
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
              ? fullAddressLine1 
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

    let patientData = '[{"firstName":"Olivia","lastName":"Smith","id":0,"nhsNumber":"401 146 7204","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"28 February 1983","day":28,"month":1,"year":1983},"checking":false,"applicationReference":" 20261115115745N579158832","certificateReference":"HRT 3YC2 1HBM","channel":"Digital","startDate":{"display":"7 Feb 2026","day":7,"month":1,"year":2026},"endDate":{"display":"6 Feb 2027","day":6,"month":1,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"12","streetName":"Maple Grove","locality":"Ashford Hill","postTown":"Reading","county":"Berkshire","postcode":"RG4 8ZT"},"phoneNumber":"07031 284 591","emailAddress":"o.smith@outlook.com"},{"firstName":"Amelia","lastName":"Jones","id":1,"nhsNumber":"699 498 4423","processor":"PRPAT","processorName":"Priya Patel","certificateType":"lis-hc2","status":"active","dateOfBirth":{"display":"17 January 1986","day":17,"month":0,"year":1986},"checking":false,"checkType":"quality","applicationReference":" 20261117012607N074380826","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N327192003","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"44","streetName":"Bramley Road","locality":"East Mere","postTown":"Norwich","county":"Norfolk","postcode":"NR3 5QN"},"phoneNumber":"07049 823 716","emailAddress":"Jones995@hotmail.com"},{"firstName":"Isla","lastName":"Taylor","id":2,"nhsNumber":"970 254 3962","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"16 November 1996","day":16,"month":10,"year":1996},"checking":false,"checkType":"supervisor","applicationReference":" 20261115025921N868749777","certificateReference":"HRT 8Y52 80OV","channel":"Digital","imageReference":"2026 11 17 17 27 51N000676951","startDate":{"display":"1 Mar 2026","day":1,"month":2,"year":2026},"endDate":{"display":"28 Feb 2027","day":28,"month":1,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Kestrel Close","locality":"Winterfold","postTown":"Guildford","county":"Surrey","postcode":"GU3 9LP"},"phoneNumber":"07062 395 184","emailAddress":"i.taylor@blueyonder.co.uk"},{"firstName":"Ava","lastName":"Brown","id":3,"nhsNumber":"688 741 2552","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"expired","dateOfBirth":{"display":"4 December 1982","day":4,"month":11,"year":1982},"checking":false,"applicationReference":" 20261116034522N278806221","certificateReference":"40 654 447 128","channel":"Paper","startDate":{"display":"26 Feb 2026","day":26,"month":1,"year":2026},"endDate":{"display":"25 Feb 2036","day":25,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"82","streetName":"Oakfield Lane","locality":"Hilltop View","postTown":"Exeter","county":"Devon","postcode":"EX2 7SJ"},"phoneNumber":"07071 528 439","emailAddress":"a.brown215@hotmail.com","imageReference":"2026 11 17 17 27 52N553221471","medicalCondition":["(10) Cancer"]},{"firstName":"Emily","lastName":"Williams","id":4,"nhsNumber":"997 455 2796","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"5 April 2005","day":5,"month":3,"year":2005},"checking":true,"applicationReference":" 20261111110918N328353038","certificateReference":"38 119 317 416","channel":"Paper","startDate":{"display":"23 Feb 2026","day":23,"month":1,"year":2026},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"22 Feb 2027","day":22,"month":1,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07083 916 275","emailAddress":"emily.williams476@hotmail.com","checkType":"supervisor","imageReference":"2026 11 17 17 27 52N034622180","dueDate":{"display":"10 Feb 2026","day":10,"month":1,"year":2026},"childsDOB":{"display":"23 February 2026","day":23,"month":1,"year":2026}},{"firstName":"Sophia","lastName":"Wilson","id":5,"nhsNumber":"512 062 6494","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"21 February 1986","day":21,"month":1,"year":1986},"checking":true,"checkType":"supervisor","applicationReference":" 20261116131528N880339321","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N130313696","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07092 475 318","emailAddress":"sophia.wilson@blueyonder.co.uk"},{"firstName":"Mia","lastName":"Davies","id":6,"nhsNumber":"847 780 5453","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"25 November 1978","day":25,"month":10,"year":1978},"checking":true,"checkType":"quality","applicationReference":" 20261116184550N486115359","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N430990645","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"63","streetName":"Riverstone Court","locality":"Longmead","postTown":"Taunton","county":"Somerset","postcode":"TA2 3UP"},"phoneNumber":"07015 648 293","emailAddress":"mia.davies@gmail.com"},{"firstName":"Ella","lastName":"Evans","id":7,"nhsNumber":"890 406 3759","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"6 April 1995","day":6,"month":3,"year":1995},"checking":true,"applicationReference":" 20261117112056N578459584","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"28","streetName":"Birch Avenue","locality":"Northcrest","postTown":"Leicester","county":"Leicestershire","postcode":"LE5 8YU"},"phoneNumber":"07028 751 964","emailAddress":"evans.e@hotmail.com","checkType":"quality","imageReference":"2026 11 17 17 27 52N443812082"},{"firstName":"Grace","lastName":"Thomas","id":8,"nhsNumber":"060 190 7574","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"25 February 1987","day":25,"month":1,"year":1987},"applicationReference":" 20261112195024N528521528","certificateReference":"79 901 548 865","channel":"Paper","startDate":{"display":"19 Dec 2025","day":19,"month":11,"year":2025},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"18 Dec 2035","day":18,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07036 592 817","emailAddress":"g.thomas@gmail.com","imageReference":"2026 11 17 17 27 52N360659444"},{"firstName":"Lily","lastName":"Roberts","id":9,"nhsNumber":"233 902 7379","processor":"PRPAT","processorName":"Priya Patel","certificateType":"lis-hc3","status":"rejected","dateOfBirth":{"display":"15 December 1977","day":15,"month":11,"year":1977},"checking":false,"applicationReference":" 20261117090123N322258621","certificateReference":"","channel":"Digital","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"14","streetName":"Windsor Rise","locality":"Redford","postTown":"Derby","county":"Derbyshire","postcode":"DE1 4SX"},"phoneNumber":"07047 813 256","emailAddress":"l.roberts@blueyonder.co.uk"},{"firstName":"Freya","lastName":"Johnson","id":10,"nhsNumber":"680 810 1290","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"17 November 2002","day":17,"month":10,"year":2002},"checking":true,"applicationReference":" 20261115153710N327571150","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"51","streetName":"Hawthorne Road","locality":"Claymere","postTown":"Chester","county":"Cheshire","postcode":"CH4 2MB"},"phoneNumber":"07051 294 783","emailAddress":"johnson.f@hotmail.com","checkType":"quality","imageReference":"2026 11 17 17 27 52N585532718"},{"firstName":"Charlotte","lastName":"Lewis","id":11,"nhsNumber":"277 553 9176","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"7 September 1986","day":7,"month":8,"year":1986},"checking":false,"checkType":"quality","applicationReference":" 20261117042141N549167585","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N128071977","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"3","streetName":"Mallow Street","locality":"Eastwood Vale","postTown":"Nottingham","county":"Nottinghamshire","postcode":"NG5 3JU"},"phoneNumber":"07063 418 592","emailAddress":"charlotte.lewis@outlook.com"},{"firstName":"Isabella","lastName":"Walker","id":12,"nhsNumber":"571 379 0101","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"lis-hc2","status":"active","checking":false,"checkType":"quality","dateOfBirth":{"display":"21 January 1980","day":21,"month":0,"year":1980},"applicationReference":" 20261111025737N419965726","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N525254288","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07075 928 341","emailAddress":"i.walker@blueyonder.co.uk"},{"firstName":"Daisy","lastName":"Hall","id":13,"nhsNumber":"510 153 4337","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"5 January 1990","day":5,"month":0,"year":1990},"checking":false,"applicationReference":" 20261111201302N032603960","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07084 372 659","emailAddress":"Hall732@outlook.com","imageReference":"2026 11 17 17 27 52N342536833"},{"firstName":"Evie","lastName":"Clarke","id":14,"nhsNumber":"745 903 9233","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"18 January 1989","day":18,"month":0,"year":1989},"checking":false,"applicationReference":" 20261116115314N666111837","certificateReference":"HRT VBUI LIWN","channel":"Digital","startDate":{"display":"25 Dec 2025","day":25,"month":11,"year":2025},"endDate":{"display":"24 Dec 2026","day":24,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07091 837 426","emailAddress":"e.clarke@googlemail.com"},{"firstName":"Phoebe","lastName":"Allen","id":15,"nhsNumber":"584 653 1172","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"4 August 1971","day":4,"month":7,"year":1971},"checking":true,"applicationReference":" 20261113032827N670389057","certificateReference":"69 253 179 170","channel":"Paper","imageReference":"2026 11 17 17 27 52N152079106","startDate":{"display":"18 Feb 2026","day":18,"month":1,"year":2026},"endDate":{"display":"17 Feb 2036","day":17,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Rose Mews","locality":"Kingswell","postTown":"Oxford","county":"Oxfordshire","postcode":"OX3 9DQ"},"phoneNumber":"07014 385 927","checkType":"supervisor","medicalCondition":["(4) Myxoedema"]},{"firstName":"Sophie","lastName":"Young","id":16,"nhsNumber":"537 361 6274","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"19 October 1983","day":19,"month":9,"year":1983},"checking":false,"applicationReference":" 20261115201000N055559541","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"8","streetName":"Elmbrook Gardens","locality":"Gransfield","postTown":"Peterborough","county":"Cambridgeshire","postcode":"PE2 7QF"},"phoneNumber":"07027 639 485","emailAddress":"sophie.young@hotmail.com","imageReference":"2026 11 17 17 27 52N054785357"},{"firstName":"Harper","lastName":"King","id":17,"nhsNumber":"044 986 4994","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"1 July 1993","day":1,"month":6,"year":1993},"checking":true,"applicationReference":" 20261113134217N013393499","certificateReference":"46 193 154 493","channel":"Paper","imageReference":"2026 11 17 17 27 52N992544015","startDate":{"display":"18 Feb 2026","day":18,"month":1,"year":2026},"medicalCondition":["(1) Permanent fistula","(3) Diabetes mellitus","(10) Cancer"],"endDate":{"display":"17 Feb 2036","day":17,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"65","streetName":"Pine Hollow","locality":"Northbrook","postTown":"Cheltenham","county":"Gloucestershire","postcode":"GL3 4HT"},"phoneNumber":"07035 821 749","checkType":"supervisor"},{"firstName":"Millie","lastName":"Wright","id":18,"nhsNumber":"982 756 3389","processor":"PRPAT","processorName":"Priya Patel","certificateType":"lis-hc3","status":"on-hold","dateOfBirth":{"display":"25 February 1988","day":25,"month":1,"year":1988},"checking":false,"applicationReference":" 20261110205756N839943174","certificateReference":"","channel":"Digital","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07048 952 613","emailAddress":"Wright667@gmail.com"},{"firstName":"Ella-Rose","lastName":"Green","id":19,"nhsNumber":"988 871 9087","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"15 July 1975","day":15,"month":6,"year":1975},"applicationReference":" 20261116073011N576785250","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N709834848","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07052 719 384","emailAddress":"green.e@blueyonder.co.uk"},{"firstName":"Poppy","lastName":"Baker","id":20,"nhsNumber":"816 502 0283","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"5 May 1995","day":5,"month":4,"year":1995},"checking":true,"checkType":"quality","applicationReference":" 20261112053916N662484520","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N841895935","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"33","streetName":"Yew Tree Court","locality":"Silverbrook","postTown":"Shrewsbury","county":"Shropshire","postcode":"SY2 8RR"},"phoneNumber":"07064 837 295"},{"firstName":"Ruby","lastName":"Adams","id":21,"nhsNumber":"036 825 4051","processor":"PRPAT","processorName":"Priya Patel","certificateType":"lis-hc3","status":"on-hold","dateOfBirth":{"display":"5 August 1993","day":5,"month":7,"year":1993},"checking":false,"checkType":"supervisor","applicationReference":" 20261111030329N654288405","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N734216294","startDate":{"display":"","day":"","month":"","year":""},"dueDate":{"display":"20 Apr 2026","day":20,"month":3,"year":2026},"endDate":{"display":"","day":"","month":"","year":""},"childsDOB":{"display":"4 January 2026","day":4,"month":0,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"4","streetName":"Osprey Road","locality":"Heathwick","postTown":"Birmingham","county":"West Midlands","postcode":"B15 8RT"},"phoneNumber":"07073 491 826","emailAddress":"r.adams@outlook.com"},{"firstName":"Chloe","lastName":"Mitchell","id":22,"nhsNumber":"889 847 6926","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"expired","dateOfBirth":{"display":"10 December 1967","day":10,"month":11,"year":1967},"checking":false,"applicationReference":" 20261112142456N241769882","certificateReference":"88 204 903 973","channel":"Paper","startDate":{"display":"21 Feb 2026","day":21,"month":1,"year":2026},"endDate":{"display":"20 Feb 2036","day":20,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"22","streetName":"Stonemill Drive","locality":"Hawkinge Vale","postTown":"Canterbury","county":"Kent","postcode":"CT3 6LW"},"phoneNumber":"07085 623 941","emailAddress":"Mitchell629@blueyonder.co.uk","imageReference":"2026 11 17 17 27 52N746044858","medicalCondition":["(3) Diabetes mellitus"]},{"firstName":"Sienna","lastName":"Turner","id":23,"nhsNumber":"801 358 3303","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"expired","dateOfBirth":{"display":"7 May 1972","day":7,"month":4,"year":1972},"checking":false,"checkType":"supervisor","applicationReference":" 20261111102529N215980551","certificateReference":"94 453 440 020","channel":"Paper","imageReference":"2026 11 17 17 27 52N385746537","startDate":{"display":"21 Dec 2025","day":21,"month":11,"year":2025},"endDate":{"display":"20 Dec 2035","day":20,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"9","streetName":"Willowbank Way","locality":"East Harling","postTown":"Ipswich","county":"Suffolk","postcode":"IP5 0YN"},"phoneNumber":"07096 718 235","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Willow","lastName":"Carter","id":24,"nhsNumber":"664 192 4799","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"3 May 1969","day":3,"month":4,"year":1969},"checking":false,"applicationReference":" 20261117093759N341082740","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"dueDate":{"display":"31 Mar 2026","day":31,"month":2,"year":2026},"endDate":{"display":"","day":"","month":"","year":""},"childsDOB":{"display":"17 January 2026","day":17,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"56","streetName":"Sandpiper Crescent","locality":"Cove Hill","postTown":"Southampton","county":"Hampshire","postcode":"SO9 7MC"},"phoneNumber":"07018 273 945","emailAddress":"carter.w@gmail.com","checkType":"quality","imageReference":"2026 11 17 17 27 52N323145694"},{"firstName":"Jessica","lastName":"Morris","id":25,"nhsNumber":"860 398 9704","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"19 December 1968","day":19,"month":11,"year":1968},"checking":false,"applicationReference":" 20261116191734N850878741","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07029 384 756","emailAddress":"j.morris102@gmail.com","checkType":"quality","imageReference":"2026 11 17 17 27 52N239222826"},{"firstName":"Matilda","lastName":"Hughes","id":26,"nhsNumber":"970 197 6641","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"lis-hc3","status":"on-hold","dateOfBirth":{"display":"24 December 1985","day":24,"month":11,"year":1985},"checking":false,"checkType":"supervisor","applicationReference":" 20261114161112N133773763","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N131419698","startDate":{"display":"","day":"","month":"","year":""},"dueDate":{"display":"23 Nov 2025","day":23,"month":10,"year":2025},"endDate":{"display":"","day":"","month":"","year":""},"childsDOB":{"display":"18 February 2026","day":18,"month":1,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"101","streetName":"Elm Walk","locality":"Hillford","postTown":"Harlow","county":"Essex","postcode":"CM19 6JQ"},"phoneNumber":"07031 572 948","emailAddress":"Hughes421@aol.com"},{"firstName":"Elsie","lastName":"Ward","id":27,"nhsNumber":"753 910 8503","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"7 April 2000","day":7,"month":3,"year":2000},"applicationReference":" 20261117142935N557217255","certificateReference":"34 918 713 203","channel":"Paper","imageReference":"2026 11 17 17 27 52N874504871","startDate":{"display":"17 Feb 2026","day":17,"month":1,"year":2026},"endDate":{"display":"16 Feb 2027","day":16,"month":1,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"2","streetName":"Clearwater Road","locality":"Riverside","postTown":"Colchester","county":"Essex","postcode":"CO5 3LP"},"phoneNumber":"07042 619 583","emailAddress":"elsie.ward254@hotmail.com","dueDate":{"display":"26 Nov 2025","day":26,"month":10,"year":2025},"childsDOB":{"display":"17 February 2026","day":17,"month":1,"year":2026}},{"firstName":"Rosie","lastName":"Price","id":28,"nhsNumber":"568 432 5279","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"3 December 1967","day":3,"month":11,"year":1967},"checking":true,"applicationReference":" 20261114154002N891605982","certificateReference":"68 872 267 913","channel":"Paper","startDate":{"display":"28 Jan 2026","day":28,"month":0,"year":2026},"endDate":{"display":"27 Jan 2036","day":27,"month":0,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07053 847 261","checkType":"supervisor","imageReference":"2026 11 17 17 27 52N432336219","medicalCondition":["(10) Cancer"]},{"firstName":"Aria","lastName":"Cooper","id":29,"nhsNumber":"527 003 5563","processor":"AICOL","processorName":"Aisha Collins","certificateType":"lis-hc2","status":"rejected","dateOfBirth":{"display":"17 July 1988","day":17,"month":6,"year":1988},"checking":false,"applicationReference":" 20261115003314N323171893","certificateReference":"","channel":"Digital","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"72","streetName":"Greyfriars Way","locality":"Bellstead","postTown":"Bedford","county":"Bedfordshire","postcode":"MK41 1RF"},"phoneNumber":"07064 928 137","emailAddress":"a.cooper@gmail.com"},{"firstName":"Layla","lastName":"Bailey","id":30,"nhsNumber":"766 329 2131","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"11 November 1977","day":11,"month":10,"year":1977},"checking":false,"applicationReference":" 20261115065305N057813541","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N564098945","startDate":{"display":"","day":"","month":"","year":""},"dueDate":{"display":"6 May 2026","day":6,"month":4,"year":2026},"endDate":{"display":"","day":"","month":"","year":""},"childsDOB":{"display":"30 January 2026","day":30,"month":0,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"36","streetName":"Highcliff Road","locality":"Marshgate","postTown":"Grimsby","county":"Lincolnshire","postcode":"DN3 7NS"},"phoneNumber":"07075 283 916","emailAddress":"bailey.l@googlemail.com","checkType":"quality"},{"firstName":"Luna","lastName":"Parker","id":31,"nhsNumber":"331 357 1024","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"15 September 1975","day":15,"month":8,"year":1975},"checking":false,"applicationReference":" 20261111141911N015784575","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07086 419 375","emailAddress":"Parker542@gmail.com","imageReference":"2026 11 17 17 27 52N889325376"},{"firstName":"Hannah","lastName":"Phillips","id":32,"nhsNumber":"945 747 1405","processor":"PRPAT","processorName":"Priya Patel","certificateType":"lis-hc3","status":"on-hold","dateOfBirth":{"display":"26 February 1970","day":26,"month":1,"year":1970},"checking":false,"checkType":"supervisor","applicationReference":" 20261111200726N447198052","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N102728151","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"41","streetName":"Tansy Court","locality":"Littlebourne","postTown":"Canterbury","county":"Kent","postcode":"CT4 1JX"},"phoneNumber":"07097 531 284","emailAddress":"hannah.phillips771@googlemail.com"},{"firstName":"Zara","lastName":"Bennett","id":33,"nhsNumber":"012 222 6614","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"22 February 1990","day":22,"month":1,"year":1990},"checking":false,"applicationReference":" 20261114141718N459313143","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N216328560","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(5) Hypoparathyroidism"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07018 642 597","emailAddress":"z.bennett@hotmail.com"},{"firstName":"Florence","lastName":"Cox","id":34,"nhsNumber":"809 099 7201","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"expired","dateOfBirth":{"display":"22 November 1987","day":22,"month":10,"year":1987},"checking":false,"checkType":"supervisor","applicationReference":" 20261112040349N539867410","certificateReference":"12 717 706 421","channel":"Paper","imageReference":"2026 11 17 17 27 52N849589270","startDate":{"display":"4 Feb 2026","day":4,"month":1,"year":2026},"endDate":{"display":"3 Feb 2036","day":3,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"30","streetName":"Larch Lane","locality":"Warren Hill","postTown":"Hull","county":"East Yorkshire","postcode":"HU6 4ZY"},"phoneNumber":"07029 753 861","medicalCondition":["(7) Forms of hypoadrenalism"]},{"firstName":"Maya","lastName":"Richardson","id":35,"nhsNumber":"351 644 1721","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"lis-hc3","status":"active","dateOfBirth":{"display":"3 December 1993","day":3,"month":11,"year":1993},"checking":false,"applicationReference":" 20261115092243N642808127","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N435679908","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"62","streetName":"Poppyfield Way","locality":"Marston Ridge","postTown":"Oxford","county":"Oxfordshire","postcode":"OX4 7GE"},"phoneNumber":"07031 864 729","emailAddress":"m.richardson226@aol.com"},{"firstName":"Esme","lastName":"Gray","id":36,"nhsNumber":"318 632 8739","processor":"AICOL","processorName":"Aisha Collins","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"4 April 2004","day":4,"month":3,"year":2004},"checking":false,"applicationReference":" 20261111225956N037974336","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07042 987 513","emailAddress":"e.gray915@gmail.com","imageReference":"2026 11 17 17 27 52N078596204"},{"firstName":"Ivy","lastName":"Ross","id":37,"nhsNumber":"932 184 1704","processor":"AICOL","processorName":"Aisha Collins","certificateType":"lis-hc2","status":"active","dateOfBirth":{"display":"5 January 1982","day":5,"month":0,"year":1982},"checking":false,"applicationReference":" 20261116192651N346059350","certificateReference":"","channel":"Digital","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07054 129 876","emailAddress":"ivy.ross@outlook.com"},{"firstName":"Arabella","lastName":"Bell","id":38,"nhsNumber":"554 771 4525","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"24 September 1976","day":24,"month":8,"year":1976},"checking":false,"applicationReference":" 20261111012540N114810260","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N698689758","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07065 238 741","emailAddress":"Bell832@googlemail.com"},{"firstName":"Evelyn","lastName":"Cook","id":39,"nhsNumber":"448 362 0444","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"active","dateOfBirth":{"display":"7 December 1973","day":7,"month":11,"year":1973},"checking":false,"checkType":"supervisor","applicationReference":" 20261116080542N400552272","certificateReference":"17 593 447 074","channel":"Digital","imageReference":"2026 11 17 17 27 51N756427465","startDate":{"display":"28 Jan 2026","day":28,"month":0,"year":2026},"endDate":{"display":"27 Jan 2036","day":27,"month":0,"year":2036},"certificateFulfilment":"email","address":{"buildingNumber":"26","streetName":"Primrose Lane","locality":"Wickford Heath","postTown":"Basildon","county":"Essex","postcode":"SS14 3SR"},"phoneNumber":"07076 391 825","emailAddress":"e.cook@hotmail.com","medicalCondition":["(4) Myxoedema"]},{"firstName":"Thea","lastName":"Watson","id":40,"nhsNumber":"525 951 8964","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"9 May 1982","day":9,"month":4,"year":1982},"checking":false,"checkType":"quality","applicationReference":" 20261115200122N115583281","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N761089893","startDate":{"display":"","day":"","month":"","year":""},"dueDate":{"display":"17 Dec 2025","day":17,"month":11,"year":2025},"endDate":{"display":"","day":"","month":"","year":""},"childsDOB":{"display":"19 March 2026","day":19,"month":2,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"59","streetName":"Regent Gardens","locality":"Kingsreach","postTown":"Coventry","county":"West Midlands","postcode":"CV3 1BN"},"phoneNumber":"07087 512 936","emailAddress":"watson.t@outlook.com"},{"firstName":"Alice","lastName":"Sanders","id":41,"nhsNumber":"416 725 3548","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"lis-hc3","status":"rejected","dateOfBirth":{"display":"23 August 1980","day":23,"month":7,"year":1980},"checking":false,"applicationReference":" 20261111104110N136586791","certificateReference":"","channel":"Digital","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07098 631 427","emailAddress":"Sanders977@gmail.com"},{"firstName":"Emma","lastName":"Harrison","id":42,"nhsNumber":"345 997 5620","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"11 April 1990","day":11,"month":3,"year":1990},"checking":false,"checkType":"quality","applicationReference":" 20261115175650N486562483","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N864183863","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Wisteria Court","locality":"Cresthaven","postTown":"St Albans","county":"Hertfordshire","postcode":"AL4 8FJ"},"phoneNumber":"07019 742 835","emailAddress":"e.harrison@googlemail.com"},{"firstName":"Lottie","lastName":"Coleman","id":43,"nhsNumber":"958 313 3758","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"expired","dateOfBirth":{"display":"18 July 1997","day":18,"month":6,"year":1997},"checking":false,"checkType":"supervisor","applicationReference":" 20261115180309N805068053","certificateReference":"84 092 829 061","channel":"Digital","imageReference":"2026 11 17 17 27 51N411187770","startDate":{"display":"4 Apr 2026","day":4,"month":3,"year":2026},"endDate":{"display":"3 Apr 2027","day":3,"month":3,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07020 853 749","emailAddress":"l.coleman338@hotmail.com","dueDate":{"display":"4 Jan 2026","day":4,"month":0,"year":2026},"childsDOB":{"display":"4 April 2026","day":4,"month":3,"year":2026}},{"firstName":"Amber","lastName":"Murphy","id":44,"nhsNumber":"606 004 3085","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"5 April 1986","day":5,"month":3,"year":1986},"checking":true,"applicationReference":" 20261113114055N210736520","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07031 984 625","emailAddress":"Murphy372@gmail.com","checkType":"supervisor","imageReference":"2026 11 17 17 27 52N295573532"},{"firstName":"Scarlett","lastName":"Graham","id":45,"nhsNumber":"583 426 7323","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"expired","dateOfBirth":{"display":"9 April 1968","day":9,"month":3,"year":1968},"checking":false,"applicationReference":" 20261115155834N405511673","certificateReference":"90 236 599 501","channel":"Paper","startDate":{"display":"11 May 2026","day":11,"month":4,"year":2026},"endDate":{"display":"10 May 2036","day":10,"month":4,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"53","streetName":"Laurel Drive","locality":"Kingswood Park","postTown":"Bristol","county":"Bristol","postcode":"BS16 4DX"},"phoneNumber":"07042 195 783","emailAddress":"scarlett.graham@hotmail.com","checkType":"quality","imageReference":"2026 11 17 17 27 52N110642524","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Bonnie","lastName":"Stevens","id":46,"nhsNumber":"434 292 4946","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"lis-hc3","status":"on-hold","dateOfBirth":{"display":"12 May 1977","day":12,"month":4,"year":1977},"checking":false,"applicationReference":" 20261112111758N047093279","certificateReference":"","channel":"Digital","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07053 268 917","emailAddress":"b.stevens@hotmail.com"},{"firstName":"Imogen","lastName":"Simpson","id":47,"nhsNumber":"284 440 8387","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"9 August 1969","day":9,"month":7,"year":1969},"checking":false,"applicationReference":" 20261111120435N733293085","certificateReference":"66 071 921 913","channel":"Paper","startDate":{"display":"23 Dec 2025","day":23,"month":11,"year":2025},"endDate":{"display":"22 Dec 2035","day":22,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07064 371 528","emailAddress":"Simpson778@blueyonder.co.uk","imageReference":"2026 11 17 17 27 52N339306839","medicalCondition":["(1) Permanent fistula","(7) Forms of hypoadrenalism"]},{"firstName":"Harriet","lastName":"Butler","id":48,"nhsNumber":"373 768 9956","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"18 June 1974","day":18,"month":5,"year":1974},"checking":false,"applicationReference":" 20261111072715N572716713","certificateReference":"HRT N20S QI6K","channel":"Telephony","startDate":{"display":"20 Dec 2025","day":20,"month":11,"year":2025},"endDate":{"display":"19 Dec 2026","day":19,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"98","streetName":"Stag Lane","locality":"Marbleham","postTown":"Brighton","county":"East Sussex","postcode":"BN2 1WE"},"phoneNumber":"07075 482 936","emailAddress":"Butler350@hotmail.com"},{"firstName":"Eleanor","lastName":"Chapman","id":49,"nhsNumber":"513 248 3966","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"2 April 2003","day":2,"month":3,"year":2003},"checking":true,"applicationReference":" 20261110235432N286509970","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N889361964","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"27","streetName":"Whistler Road","locality":"East Densford","postTown":"Portsmouth","county":"Hampshire","postcode":"PO4 7JF"},"phoneNumber":"07086 593 147","checkType":"supervisor"},{"firstName":"Aisha","lastName":"Ali","id":50,"nhsNumber":"162 891 4824","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"22 June 1996","day":22,"month":5,"year":1996},"checking":true,"applicationReference":" 20261111124134N865436902","certificateReference":"24 507 167 791","channel":"Paper","startDate":{"display":"12 Feb 2026","day":12,"month":1,"year":2026},"medicalCondition":["(4) Myxoedema"],"endDate":{"display":"11 Feb 2027","day":11,"month":1,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"75","streetName":"Gorse Way","locality":"Heathrow End","postTown":"Hounslow","county":"Greater London","postcode":"TW4 5ZA"},"phoneNumber":"07097 614 258","emailAddress":"Ali813@googlemail.com","checkType":"supervisor","imageReference":"2026 11 17 17 27 52N399713886","dueDate":{"display":"21 Dec 2025","day":21,"month":11,"year":2025},"childsDOB":{"display":"12 February 2026","day":12,"month":1,"year":2026}},{"firstName":"Sofia","lastName":"Hussain","id":51,"nhsNumber":"818 033 5730","processor":"PRPAT","processorName":"Priya Patel","certificateType":"lis-hc3","status":"active","dateOfBirth":{"display":"8 December 1985","day":8,"month":11,"year":1985},"checking":false,"checkType":"supervisor","applicationReference":" 20261114071152N282718786","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N914848479","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"3","streetName":"Juniper Walk","locality":"Woodleigh","postTown":"Enfield","county":"Greater London","postcode":"EN3 1TP"},"phoneNumber":"07018 725 369","emailAddress":"hussain.s@aol.com"},{"firstName":"Amira","lastName":"Khan","id":52,"nhsNumber":"597 679 5056","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"lis-hc2","status":"processing","dateOfBirth":{"display":"14 March 1967","day":14,"month":2,"year":1967},"checking":false,"applicationReference":" 20261114123158N869521906","certificateReference":"","channel":"Digital","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"58","streetName":"Chapel Row","locality":"Millthorpe","postTown":"Wakefield","county":"West Yorkshire","postcode":"WF3 8KD"},"phoneNumber":"07029 836 471","emailAddress":"a.khan302@aol.com"},{"firstName":"Leah","lastName":"Begum","id":53,"nhsNumber":"281 451 1342","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"active","dateOfBirth":{"display":"4 September 1989","day":4,"month":8,"year":1989},"checking":false,"applicationReference":" 20261115000227N996538318","certificateReference":"15 478 909 696","channel":"Paper","startDate":{"display":"10 Apr 2026","day":10,"month":3,"year":2026},"endDate":{"display":"9 Apr 2036","day":9,"month":3,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"13","streetName":"Stonewall Lane","locality":"Northbridge","postTown":"Bradford","county":"West Yorkshire","postcode":"BD7 5TE"},"phoneNumber":"07030 947 582","imageReference":"2026 11 17 17 27 52N746148085","medicalCondition":["(2) Epilepsy"]},{"firstName":"Niamh","lastName":"O’Connor","id":54,"nhsNumber":"156 277 9945","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"15 June 1989","day":15,"month":5,"year":1989},"checking":true,"applicationReference":" 20261115101507N023644906","certificateReference":"86 962 789 725","channel":"Paper","startDate":{"display":"31 Mar 2026","day":31,"month":2,"year":2026},"endDate":{"display":"30 Mar 2027","day":30,"month":2,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07042 058 693","emailAddress":"niamh.o’connor@googlemail.com","checkType":"supervisor","imageReference":"2026 11 17 17 27 52N167378179","dueDate":{"display":"12 Mar 2026","day":12,"month":2,"year":2026},"childsDOB":{"display":"31 March 2026","day":31,"month":2,"year":2026}},{"firstName":"Aoife","lastName":"Kelly","id":55,"nhsNumber":"037 957 0998","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"2 March 1992","day":2,"month":2,"year":1992},"checking":false,"applicationReference":" 20261115153829N250134848","certificateReference":"HRT TEXY 3CW5","channel":"Digital","startDate":{"display":"23 Jan 2026","day":23,"month":0,"year":2026},"medicalCondition":["(6) Diabetes insipidus"],"endDate":{"display":"22 Jan 2027","day":22,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"17","streetName":"Buttercup Close","locality":"Little Havers","postTown":"Stevenage","county":"Hertfordshire","postcode":"SG2 0YG"},"phoneNumber":"07053 169 784","emailAddress":"Kelly670@blueyonder.co.uk"},{"firstName":"Erin","lastName":"McCarthy","id":56,"nhsNumber":"749 195 2417","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"5 December 2006","day":5,"month":11,"year":2006},"checking":true,"applicationReference":" 20261115153232N165079351","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N722298203","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(1) Permanent fistula","(7) Forms of hypoadrenalism"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07064 271 895","checkType":"supervisor"},{"firstName":"Orla","lastName":"Doyle","id":57,"nhsNumber":"889 488 6962","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"1 August 2004","day":1,"month":7,"year":2004},"checking":false,"applicationReference":" 20261111193405N973843944","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(1) Permanent fistula","(2) Epilepsy"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"39","streetName":"Arbour Road","locality":"Phoenix Rise","postTown":"Manchester","county":"Greater Manchester","postcode":"M14 2YQ"},"phoneNumber":"07075 382 916","emailAddress":"doyle.o@googlemail.com","imageReference":"2026 11 17 17 27 52N884381242"},{"firstName":"Cerys","lastName":"Griffiths","id":58,"nhsNumber":"422 513 6482","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"hrtppc","status":"active","dateOfBirth":{"display":"23 September 1978","day":23,"month":8,"year":1978},"checking":false,"applicationReference":" 20261116011132N458566378","certificateReference":"HRT J1QB JFJS","channel":"Digital","startDate":{"display":"5 Dec 2025","day":5,"month":11,"year":2025},"endDate":{"display":"4 Dec 2026","day":4,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"4","streetName":"Cherrytree Court","locality":"Stonemoor","postTown":"Stockport","county":"Greater Manchester","postcode":"SK4 3EW"},"phoneNumber":"07086 493 127","emailAddress":"griffiths.c@aol.com"},{"firstName":"Megan","lastName":"Rees","id":59,"nhsNumber":"234 899 2318","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"accepted","checking":false,"checkType":"quality","dateOfBirth":{"display":"24 July 1976","day":24,"month":6,"year":1976},"applicationReference":" 20261113214251N976787417","certificateReference":"70 549 740 776","channel":"Paper","imageReference":"2026 11 17 17 27 52N582952759","startDate":{"display":"8 Mar 2026","day":8,"month":2,"year":2026},"endDate":{"display":"7 Mar 2036","day":7,"month":2,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07097 514 238","emailAddress":"m.rees@blueyonder.co.uk","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Ffion","lastName":"Evans","id":60,"nhsNumber":"668 115 6877","processor":"AICOL","processorName":"Aisha Collins","certificateType":"lis-hc2","status":"on-hold","dateOfBirth":{"display":"9 January 1973","day":9,"month":0,"year":1973},"checking":false,"applicationReference":" 20261113021705N334904082","certificateReference":"","channel":"Digital","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"20","streetName":"Honeysuckle Way","locality":"Oakwood Hill","postTown":"Preston","county":"Lancashire","postcode":"PR3 8LN"},"phoneNumber":"07018 625 349","emailAddress":"ffion.evans@googlemail.com"},{"firstName":"Eilidh","lastName":"MacDonald","id":61,"nhsNumber":"575 451 0384","processor":"AICOL","processorName":"Aisha Collins","certificateType":"lis-hc3","status":"active","dateOfBirth":{"display":"17 November 1975","day":17,"month":10,"year":1975},"checking":false,"applicationReference":" 20261111020055N407150348","certificateReference":"","channel":"Digital","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"95","streetName":"Old Forge Street","locality":"Daleham","postTown":"Carlisle","county":"Cumbria","postcode":"CA2 5NJ"},"phoneNumber":"07029 736 458","emailAddress":"e.macdonald@hotmail.com"},{"firstName":"Skye","lastName":"Fraser","id":62,"nhsNumber":"542 606 3949","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"21 May 1972","day":21,"month":4,"year":1972},"checking":true,"applicationReference":" 20261111141914N128343106","certificateReference":"98 923 670 569","channel":"Paper","imageReference":"2026 11 17 17 27 52N343892206","startDate":{"display":"6 Feb 2026","day":6,"month":1,"year":2026},"endDate":{"display":"5 Feb 2036","day":5,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"43","streetName":"Nightingale Row","locality":"Brambleton","postTown":"Durham","county":"County Durham","postcode":"DH1 3GP"},"phoneNumber":"07030 847 569","emailAddress":"skye.fraser@gmail.com","checkType":"supervisor","medicalCondition":["(7) Forms of hypoadrenalism"]},{"firstName":"Maisie","lastName":"Armstrong","id":63,"nhsNumber":"380 146 5568","processor":"AICOL","processorName":"Aisha Collins","certificateType":"lis-hc3","status":"expired","dateOfBirth":{"display":"28 October 1977","day":28,"month":9,"year":1977},"checking":false,"applicationReference":" 20261115081039N383781631","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N255744482","startDate":{"display":"","day":"","month":"","year":""},"dueDate":{"display":"13 Dec 2025","day":13,"month":11,"year":2025},"endDate":{"display":"","day":"","month":"","year":""},"childsDOB":{"display":"25 January 2026","day":25,"month":0,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07041 958 672","emailAddress":"m.armstrong@blueyonder.co.uk"},{"firstName":"Penelope","lastName":"Hunter","id":64,"nhsNumber":"595 054 2338","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"18 May 1986","day":18,"month":4,"year":1986},"checking":false,"checkType":"quality","applicationReference":" 20261115191416N090951532","certificateReference":"85 248 070 150","channel":"Paper","imageReference":"2026 11 17 17 27 52N111683426","startDate":{"display":"13 May 2026","day":13,"month":4,"year":2026},"dueDate":{"display":"6 Dec 2025","day":6,"month":11,"year":2025},"endDate":{"display":"12 May 2036","day":12,"month":4,"year":2036},"childsDOB":{"display":"1 March 2026","day":1,"month":2,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"86","streetName":"Copse Lane","locality":"Hillmead","postTown":"Newcastle","county":"Tyne and Wear","postcode":"NE5 2PA"},"phoneNumber":"07052 069 783","emailAddress":"p.hunter@blueyonder.co.uk","medicalCondition":["(7) Forms of hypoadrenalism"]},{"firstName":"Clara","lastName":"Lawrence","id":65,"nhsNumber":"810 346 0090","processor":"PRPAT","processorName":"Priya Patel","certificateType":"lis-hc2","status":"on-hold","dateOfBirth":{"display":"17 February 1977","day":17,"month":1,"year":1977},"checking":false,"applicationReference":" 20261114120713N213343671","certificateReference":"","channel":"Digital","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07063 171 894","emailAddress":"clara.lawrence@outlook.com"},{"firstName":"Beatrice","lastName":"Spencer","id":66,"nhsNumber":"555 039 5640","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"24 July 1984","day":24,"month":6,"year":1984},"checking":false,"applicationReference":" 20261112192336N235491937","certificateReference":"HRT TVK0 QOQ9","channel":"Digital","startDate":{"display":"28 Dec 2025","day":28,"month":11,"year":2025},"endDate":{"display":"27 Dec 2026","day":27,"month":11,"year":2026},"certificateFulfilment":"post","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07074 282 915","emailAddress":"beatrice.spencer@hotmail.com"},{"firstName":"Nancy","lastName":"Rogers","id":67,"nhsNumber":"338 746 2335","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"processing","dateOfBirth":{"display":"16 February 1994","day":16,"month":1,"year":1994},"checking":false,"applicationReference":" 20261113095306N543394036","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07085 393 126","emailAddress":"Rogers752@aol.com","imageReference":"2026 11 17 17 27 52N651783848"},{"firstName":"Annabelle","lastName":"Watts","id":68,"nhsNumber":"091 457 2737","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"lis-hc2","status":"on-hold","dateOfBirth":{"display":"8 December 1978","day":8,"month":11,"year":1978},"checking":false,"checkType":"supervisor","applicationReference":" 20261112125725N444996408","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N987577040","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07096 414 237","emailAddress":"annabelle.watts790@hotmail.com"},{"firstName":"Heidi","lastName":"Henderson","id":69,"nhsNumber":"706 852 4674","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"lis-hc2","status":"active","dateOfBirth":{"display":"9 October 1979","day":9,"month":9,"year":1979},"checking":false,"checkType":"supervisor","applicationReference":" 20261114200900N500506164","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N306230877","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"1","streetName":"Foxglove Lane","locality":"Brindlehurst","postTown":"Lancaster","county":"Lancashire","postcode":"LA3 7UH"},"phoneNumber":"07017 525 348","emailAddress":"heidi.henderson@outlook.com"},{"firstName":"Rose","lastName":"Palmer","id":70,"nhsNumber":"070 789 6618","processor":"PRPAT","processorName":"Priya Patel","certificateType":"lis-hc2","status":"on-hold","dateOfBirth":{"display":"6 November 1973","day":6,"month":10,"year":1973},"checking":false,"checkType":"supervisor","applicationReference":" 20261112074516N269616952","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N084227446","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(4) Myxoedema","(7) Forms of hypoadrenalism","(10) Cancer"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"15","streetName":"Beacon Lane","locality":"Craybourne","postTown":"Maidstone","county":"Kent","postcode":"ME16 2RS"},"phoneNumber":"07028 636 459","emailAddress":"rose.palmer@gmail.com"},{"firstName":"Lara","lastName":"Nicholson","id":71,"nhsNumber":"061 507 6546","processor":"PRPAT","processorName":"Priya Patel","certificateType":"matex","status":"rejected","dateOfBirth":{"display":"4 August 2003","day":4,"month":7,"year":2003},"checking":false,"checkType":"supervisor","applicationReference":" 20261112145007N451277961","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N285145109","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07039 747 561","emailAddress":"l.nicholson@blueyonder.co.uk"},{"firstName":"Julia","lastName":"Gardner","id":72,"nhsNumber":"925 520 2793","processor":"AICOL","processorName":"Aisha Collins","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"15 August 1970","day":15,"month":7,"year":1970},"checking":false,"applicationReference":" 20261112171740N743494294","certificateReference":"72 633 232 529","channel":"Paper","startDate":{"display":"5 May 2026","day":5,"month":4,"year":2026},"medicalCondition":["(2) Epilepsy","(3) Diabetes mellitus","(7) Forms of hypoadrenalism"],"endDate":{"display":"4 May 2036","day":4,"month":4,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"16","streetName":"Harrier Way","locality":"Loxwood Green","postTown":"Horsham","county":"West Sussex","postcode":"RH13 7BN"},"phoneNumber":"07040 858 673","emailAddress":"Gardner126@blueyonder.co.uk","checkType":"quality","imageReference":"2026 11 17 17 27 52N612666497"},{"firstName":"Ada","lastName":"Newton","id":73,"nhsNumber":"644 079 1753","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"expired","dateOfBirth":{"display":"18 October 1983","day":18,"month":9,"year":1983},"checking":false,"applicationReference":" 20261112014334N550246543","certificateReference":"67 686 209 054","channel":"Digital","startDate":{"display":"29 Dec 2025","day":29,"month":11,"year":2025},"endDate":{"display":"28 Dec 2035","day":28,"month":11,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"11","streetName":"Ashen Close","locality":"Brookhill","postTown":"Slough","county":"Berkshire","postcode":"SL2 9MT"},"phoneNumber":"07051 969 782","emailAddress":"a.newton@googlemail.com","checkType":"quality","medicalCondition":["(6) Diabetes insipidus"]},{"firstName":"Summer","lastName":"Reed","id":74,"nhsNumber":"226 547 8120","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"22 August 1976","day":22,"month":7,"year":1976},"checking":true,"checkType":"supervisor","applicationReference":" 20261114002553N154800522","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N582479387","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07062 071 893"},{"firstName":"Victoria","lastName":"Harvey","id":75,"nhsNumber":"937 799 7668","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"24 October 1975","day":24,"month":9,"year":1975},"checking":false,"applicationReference":" 20261115005729N769029508","certificateReference":"47 278 990 022","channel":"Digital","imageReference":"2026 11 17 17 27 51N305463676","startDate":{"display":"13 Mar 2026","day":13,"month":2,"year":2026},"dueDate":{"display":"7 Dec 2025","day":7,"month":11,"year":2025},"endDate":{"display":"12 Mar 2036","day":12,"month":2,"year":2036},"childsDOB":{"display":"25 January 2026","day":25,"month":0,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07073 182 914","emailAddress":"v.harvey@blueyonder.co.uk","medicalCondition":["(4) Myxoedema"]},{"firstName":"Maria","lastName":"Fernandez","id":76,"nhsNumber":"838 557 1522","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"26 February 1996","day":26,"month":1,"year":1996},"checking":true,"applicationReference":" 20261111004743N240985990","certificateReference":"42 890 622 334","channel":"Paper","imageReference":"2026 11 17 17 27 52N563762445","startDate":{"display":"29 Mar 2026","day":29,"month":2,"year":2026},"medicalCondition":["(3) Diabetes mellitus"],"endDate":{"display":"28 Mar 2036","day":28,"month":2,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"76","streetName":"Peach Tree Way","locality":"Brookfell","postTown":"York","county":"North Yorkshire","postcode":"YO3 6AP"},"phoneNumber":"07084 293 125","checkType":"supervisor"},{"firstName":"Elena","lastName":"Silva","id":77,"nhsNumber":"454 832 1121","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"21 May 1992","day":21,"month":4,"year":1992},"checking":true,"applicationReference":" 20261111131744N701534710","certificateReference":"44 050 581 512","channel":"Paper","startDate":{"display":"22 Nov 2025","day":22,"month":10,"year":2025},"endDate":{"display":"21 Nov 2035","day":21,"month":10,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"10","streetName":"Redwood Close","locality":"Southholm","postTown":"Sunderland","county":"Tyne and Wear","postcode":"SR3 1FQ"},"phoneNumber":"07095 314 236","emailAddress":"Silva748@gmail.com","checkType":"supervisor","imageReference":"2026 11 17 17 27 52N674666633","medicalCondition":["(2) Epilepsy"]},{"firstName":"Leila","lastName":"Patel","id":78,"nhsNumber":"446 730 2581","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"deleted","dateOfBirth":{"display":"21 May 1994","day":21,"month":4,"year":1994},"checking":false,"checkType":"supervisor","applicationReference":" 20261113093053N466620376","certificateReference":"HRT 48HU GZOR","channel":"Digital","imageReference":"2026 11 17 17 27 51N588902456","startDate":{"display":"8 Jan 2026","day":8,"month":0,"year":2026},"endDate":{"display":"7 Jan 2027","day":7,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"85","streetName":"Sparrow Lane","locality":"Northwood Vale","postTown":"Watford","county":"Hertfordshire","postcode":"WD24 6PH"},"phoneNumber":"07016 425 347","emailAddress":"leila.patel@outlook.com"},{"firstName":"Fatima","lastName":"Iqbal","id":79,"nhsNumber":"217 986 6803","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"10 January 2008","day":10,"month":0,"year":2008},"checking":true,"applicationReference":" 20261113081001N555310586","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N181425053","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"92","streetName":"Meadowbank Road","locality":"Harefield Park","postTown":"Liverpool","county":"Merseyside","postcode":"L8 6FP"},"phoneNumber":"07027 536 458","emailAddress":"fatima.iqbal@hotmail.com","checkType":"supervisor"},{"firstName":"Jasmine","lastName":"Ahmed","id":80,"nhsNumber":"894 265 5726","processor":"PRPAT","processorName":"Priya Patel","certificateType":"medex","status":"active","dateOfBirth":{"display":"15 January 1969","day":15,"month":0,"year":1969},"checking":false,"applicationReference":" 20261111124822N115524132","certificateReference":"74 814 733 502","channel":"Digital","startDate":{"display":"8 Dec 2025","day":8,"month":11,"year":2025},"endDate":{"display":"7 Dec 2035","day":7,"month":11,"year":2035},"certificateFulfilment":"email","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07038 647 569","emailAddress":"j.ahmed@hotmail.com","medicalCondition":["(5) Hypoparathyroidism"]},{"firstName":"Nadia","lastName":"Rashid","id":81,"nhsNumber":"731 838 6494","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"12 October 1991","day":12,"month":9,"year":1991},"checking":false,"applicationReference":" 20261112054507N922655812","certificateReference":"HRT M070 PLZT","channel":"Digital","startDate":{"display":"5 May 2026","day":5,"month":4,"year":2026},"endDate":{"display":"4 May 2027","day":4,"month":4,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"14","streetName":"Oakridge Row","locality":"Firrendown","postTown":"Swansea","county":"West Glamorgan","postcode":"SA6 8PP"},"phoneNumber":"07049 758 671","emailAddress":"nadia.rashid@googlemail.com"},{"firstName":"Tara","lastName":"Paterson","id":82,"nhsNumber":"429 612 5866","processor":"AICOL","processorName":"Aisha Collins","certificateType":"lis-hc2","status":"processing","dateOfBirth":{"display":"3 October 1980","day":3,"month":9,"year":1980},"checking":false,"applicationReference":" 20261113011046N824904762","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N006047003","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(3) Diabetes mellitus","(9) Continuing physical disability"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"37","streetName":"Weavers Lane","locality":"Northgate","postTown":"Wolverhampton","county":"West Midlands","postcode":"WV4 3TT"},"phoneNumber":"07050 869 782","emailAddress":"tara.paterson@blueyonder.co.uk"},{"firstName":"Bethany","lastName":"Foster","id":83,"nhsNumber":"567 106 8071","processor":"PRPAT","processorName":"Priya Patel","certificateType":"lis-hc3","status":"processing","checking":false,"checkType":"quality","dateOfBirth":{"display":"5 April 1991","day":5,"month":3,"year":1991},"applicationReference":" 20261116015223N905918241","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N060047739","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(3) Diabetes mellitus","(5) Hypoparathyroidism","(10) Cancer"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"5","streetName":"Linton Walk","locality":"Southgate Park","postTown":"Crawley","county":"West Sussex","postcode":"RH11 4XW"},"phoneNumber":"07061 971 893","emailAddress":"b.foster@gmail.com"},{"firstName":"Lauren","lastName":"Fox","id":84,"nhsNumber":"516 879 5253","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"11 December 2007","day":11,"month":11,"year":2007},"checking":true,"applicationReference":" 20261112020600N479155472","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N093770054","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"24","streetName":"Millstream Row","locality":"Havenfield","postTown":"Lincoln","county":"Lincolnshire","postcode":"LN2 8FP"},"phoneNumber":"07072 082 914","checkType":"supervisor"},{"firstName":"Georgia","lastName":"Grant","id":85,"nhsNumber":"766 992 9354","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"3 March 1968","day":3,"month":2,"year":1968},"checking":false,"applicationReference":" 20261116093220N724470257","certificateReference":"HRT W6A9 T7D3","channel":"Digital","startDate":{"display":"10 Dec 2025","day":10,"month":11,"year":2025},"endDate":{"display":"9 Dec 2026","day":9,"month":11,"year":2026},"certificateFulfilment":"email","address":{"buildingNumber":"60","streetName":"Queensbury Court","locality":"Palmstead","postTown":"Blackpool","county":"Lancashire","postcode":"FY2 9AH"},"phoneNumber":"07083 193 125","emailAddress":"georgia.grant@outlook.com"},{"firstName":"Abigail","lastName":"Murray","id":86,"nhsNumber":"386 239 2504","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"10 April 1993","day":10,"month":3,"year":1993},"checking":true,"applicationReference":" 20261111062100N469021245","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N739487125","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"48","streetName":"Lavender Street","locality":"Westford","postTown":"Cambridge","county":"Cambridgeshire","postcode":"CB3 9UE"},"phoneNumber":"07094 214 236","emailAddress":"a.murray@aol.com","checkType":"supervisor"},{"firstName":"Ella-May","lastName":"West","id":87,"nhsNumber":"333 390 8536","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"matex","status":"active","dateOfBirth":{"display":"19 October 1990","day":19,"month":9,"year":1990},"checking":false,"applicationReference":" 20261113233858N337765717","certificateReference":"44 443 769 071","channel":"Paper","startDate":{"display":"2 May 2026","day":2,"month":4,"year":2026},"endDate":{"display":"1 May 2027","day":1,"month":4,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"7","streetName":"Thornfield Way","locality":"Greenhollow","postTown":"Gloucester","county":"Gloucestershire","postcode":"GL1 5UP"},"phoneNumber":"07015 325 347","emailAddress":"west.e@googlemail.com","imageReference":"2026 11 17 17 27 52N707979927","dueDate":{"display":"19 Jan 2026","day":19,"month":0,"year":2026},"childsDOB":{"display":"2 May 2026","day":2,"month":4,"year":2026}},{"firstName":"Robyn","lastName":"Matthews","id":88,"nhsNumber":"098 576 1317","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"medex","status":"on-hold","dateOfBirth":{"display":"18 May 1975","day":18,"month":4,"year":1975},"checking":false,"checkType":"quality","applicationReference":" 20261110232848N053996671","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N682721938","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"18","streetName":"Myrtle Row","locality":"Oldacre","postTown":"Warrington","county":"Cheshire","postcode":"WA3 2XT"},"phoneNumber":"07026 436 458","emailAddress":"matthews.r@blueyonder.co.uk"},{"firstName":"Kayla","lastName":"Holmes","id":89,"nhsNumber":"051 140 5820","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"medex","status":"rejected","dateOfBirth":{"display":"11 November 1992","day":11,"month":10,"year":1992},"checking":false,"applicationReference":" 20261114052323N845616508","certificateReference":"","channel":"Paper","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(2) Epilepsy","(4) Myxoedema","(6) Diabetes insipidus"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"88","streetName":"Fenton Close","locality":"Broadwood","postTown":"Sheffield","county":"South Yorkshire","postcode":"S11 6TB"},"phoneNumber":"07037 547 569","emailAddress":"holmes.k@blueyonder.co.uk","checkType":"quality","imageReference":"2026 11 17 17 27 52N705400992"},{"firstName":"Lydia","lastName":"Walsh","id":90,"nhsNumber":"293 850 7652","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"13 June 1988","day":13,"month":5,"year":1988},"checking":true,"applicationReference":" 20261114070931N146732637","certificateReference":"81 591 525 659","channel":"Paper","startDate":{"display":"19 Apr 2026","day":19,"month":3,"year":2026},"endDate":{"display":"18 Apr 2036","day":18,"month":3,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"81","streetName":"Bridgewater Drive","locality":"Lancot Green","postTown":"Luton","county":"Bedfordshire","postcode":"LU4 9WB"},"phoneNumber":"07048 658 671","emailAddress":"l.walsh@outlook.com","checkType":"supervisor","imageReference":"2026 11 17 17 27 52N802045679","medicalCondition":["(1) Permanent fistula"]},{"firstName":"Alexandra","lastName":"Page","id":91,"nhsNumber":"285 986 3627","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"lis-hc3","status":"active","dateOfBirth":{"display":"5 June 1976","day":5,"month":5,"year":1976},"checking":false,"checkType":"supervisor","applicationReference":" 20261112102806N767875343","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N797730345","startDate":{"display":"","day":"","month":"","year":""},"medicalCondition":["(8) Myasthenia gravis"],"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"40","streetName":"Cedar Brook","locality":"Ashvale","postTown":"High Wycombe","county":"Buckinghamshire","postcode":"HP12 8PD"},"phoneNumber":"07059 769 782","emailAddress":"a.page@googlemail.com"},{"firstName":"Natalie","lastName":"Jordan","id":92,"nhsNumber":"452 881 5740","processor":"DATHO","processorName":"Daniel Thompson","certificateType":"lis-hc3","status":"rejected","dateOfBirth":{"display":"25 February 1992","day":25,"month":1,"year":1992},"checking":false,"checkType":"supervisor","applicationReference":" 20261113080900N226765178","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N310706395","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"29","streetName":"Falcon Street","locality":"Ridgebury","postTown":"Worcester","county":"Worcestershire","postcode":"WR1 6JS"},"phoneNumber":"07060 871 893","emailAddress":"jordan.n@hotmail.com"},{"firstName":"Beth","lastName":"Barrett","id":93,"nhsNumber":"863 791 8496","processor":"AICOL","processorName":"Aisha Collins","certificateType":"hrtppc","status":"active","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"3 February 1978","day":3,"month":1,"year":1978},"applicationReference":" 20261115114500N975759608","certificateReference":"HRT URQU JTIL","channel":"Digital","imageReference":"2026 11 17 17 27 51N463768296","startDate":{"display":"16 May 2026","day":16,"month":4,"year":2026},"endDate":{"display":"15 May 2027","day":15,"month":4,"year":2027},"certificateFulfilment":"email","address":{"buildingNumber":"90","streetName":"Fernbrook Drive","locality":"Westerleigh","postTown":"Bath","county":"Somerset","postcode":"BA2 9PF"},"phoneNumber":"07071 982 914","emailAddress":"barrett.b@googlemail.com"},{"firstName":"Mollie","lastName":"Hayes","id":94,"nhsNumber":"575 693 9959","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"lis-hc3","status":"processing","dateOfBirth":{"display":"26 February 1986","day":26,"month":1,"year":1986},"checking":false,"applicationReference":" 20261111185259N583136988","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N294408906","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"66","streetName":"Fieldhouse Lane","locality":"Greywood","postTown":"Bolton","county":"Greater Manchester","postcode":"BL3 9HB"},"phoneNumber":"07082 093 125","emailAddress":"mollie.hayes@gmail.com"},{"firstName":"Francesca","lastName":"Cunningham","id":95,"nhsNumber":"798 912 9127","processor":"ZAKHA","processorName":"Zara Khan","certificateType":"matex","status":"active","dateOfBirth":{"display":"13 January 1999","day":13,"month":0,"year":1999},"checking":false,"checkType":"supervisor","applicationReference":" 20261111065008N828104838","certificateReference":"93 399 035 663","channel":"Paper","imageReference":"2026 11 17 17 27 52N336426907","startDate":{"display":"7 Mar 2026","day":7,"month":2,"year":2026},"endDate":{"display":"6 Mar 2027","day":6,"month":2,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07093 114 236","emailAddress":"f.cunningham@googlemail.com","dueDate":{"display":"15 Apr 2026","day":15,"month":3,"year":2026},"childsDOB":{"display":"7 March 2026","day":7,"month":2,"year":2026}},{"firstName":"Amelie","lastName":"Barber","id":96,"nhsNumber":"165 516 6989","processor":"PRPAT","processorName":"Priya Patel","certificateType":"hrtppc","status":"expired","dateOfBirth":{"display":"1 December 1978","day":1,"month":11,"year":1978},"checking":false,"applicationReference":" 20261112032831N415989126","certificateReference":"HRT 0F6B M54C","channel":"Digital","startDate":{"display":"18 Jan 2026","day":18,"month":0,"year":2026},"endDate":{"display":"17 Jan 2027","day":17,"month":0,"year":2027},"certificateFulfilment":"post","address":{"buildingNumber":"97","streetName":"Sunnyside Avenue","locality":"Greenleigh","postTown":"Leeds","county":"West Yorkshire","postcode":"LS7 2PQ"},"phoneNumber":"07014 225 347","emailAddress":"amelie.barber488@aol.com"},{"firstName":"Lucia","lastName":"Knight","id":97,"nhsNumber":"403 369 0861","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"on-hold","dateOfBirth":{"display":"5 February 2004","day":5,"month":1,"year":2004},"checking":true,"applicationReference":" 20261111203306N609753127","certificateReference":"","channel":"Paper","imageReference":"2026 11 17 17 27 52N501574447","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"post","address":{"buildingNumber":"52","streetName":"Warren Terrace","locality":"Elmwick","postTown":"Scarborough","county":"North Yorkshire","postcode":"YO14 2JG"},"phoneNumber":"07025 336 458","checkType":"supervisor"},{"firstName":"Eden","lastName":"Parsons","id":98,"nhsNumber":"481 606 5060","processor":"PRPAT","processorName":"Priya Patel","certificateType":"lis-hc3","status":"active","checking":false,"checkType":"supervisor","dateOfBirth":{"display":"8 January 1972","day":8,"month":0,"year":1972},"applicationReference":" 20261111161353N023358137","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N333338697","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"21","streetName":"Ivywood Street","locality":"Southmere","postTown":"Cardiff","county":"South Glamorgan","postcode":"CF5 2JD"},"phoneNumber":"07036 447 569","emailAddress":"eden.parsons@hotmail.com"},{"firstName":"Tilly","lastName":"Bates","id":99,"nhsNumber":"062 811 7044","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","checking":true,"checkType":"supervisor","dateOfBirth":{"display":"19 December 1990","day":19,"month":11,"year":1990},"applicationReference":" 20261111084959N354952603","certificateReference":"76 016 466 165","channel":"Paper","imageReference":"2026 11 17 17 27 52N370955237","startDate":{"display":"7 Dec 2025","day":7,"month":11,"year":2025},"endDate":{"display":"6 Dec 2035","day":6,"month":11,"year":2035},"certificateFulfilment":"post","address":{"buildingNumber":"6","streetName":"Brookview Way","locality":"Langwood","postTown":"Harrogate","county":"North Yorkshire","postcode":"HG3 9QL"},"phoneNumber":"07047 558 671","emailAddress":"bates.t@googlemail.com","medicalCondition":["(4) Myxoedema","(5) Hypoparathyroidism"]},{"firstName":"Holly","lastName":"Day","id":100,"nhsNumber":"634 397 6009","processor":"PRPAT","processorName":"Priya Patel","certificateType":"lis-hc3","status":"rejected","dateOfBirth":{"display":"27 July 1969","day":27,"month":6,"year":1969},"checking":false,"checkType":"supervisor","applicationReference":" 20261116152521N294874824","certificateReference":"","channel":"Digital","imageReference":"2026 11 17 17 27 51N808473413","startDate":{"display":"","day":"","month":"","year":""},"endDate":{"display":"","day":"","month":"","year":""},"certificateFulfilment":"email","address":{"buildingNumber":"47","streetName":"Cloverbank Court","locality":"Iverston","postTown":"Middlesbrough","county":"North Yorkshire","postcode":"TS4 1WW"},"phoneNumber":"07026 436 458","emailAddress":"holly.day@gmail.com"},{"firstName":"Indie","lastName":"Francis","id":101,"nhsNumber":"587 252 1864","processor":"JASMI","processorName":"James Smith","certificateType":"medex","status":"accepted","dateOfBirth":{"display":"13 November 1970","day":13,"month":10,"year":1970},"checking":true,"checkType":"supervisor","applicationReference":" 20261116183206N420062544","certificateReference":"95 417 475 323","channel":"Paper","imageReference":"2026 11 17 17 27 52N655875611","startDate":{"display":"5 Feb 2026","day":5,"month":1,"year":2026},"endDate":{"display":"4 Feb 2036","day":4,"month":1,"year":2036},"certificateFulfilment":"post","address":{"buildingNumber":"19","streetName":"Crown Street","locality":"Millbridge","postTown":"Plymouth","county":"Devon","postcode":"PL6 1TD"},"phoneNumber":"07047 558 671","medicalCondition":["(10) Cancer"]},{"firstName":"Hope","lastName":"Burton","id":102,"nhsNumber":"570 204 2939","processor":"JASMI","processorName":"James Smith","certificateType":"matex","status":"accepted","dateOfBirth":{"display":"19 May 2002","day":19,"month":4,"year":2002},"checking":true,"applicationReference":" 20261116131451N821747779","certificateReference":"68 216 201 957","channel":"Paper","imageReference":"2026 11 17 17 27 52N992463470","startDate":{"display":"16 Dec 2025","day":16,"month":11,"year":2025},"dueDate":{"display":"19 Dec 2025","day":19,"month":11,"year":2025},"endDate":{"display":"15 Dec 2026","day":15,"month":11,"year":2026},"childsDOB":{"display":"16 December 2025","day":16,"month":11,"year":2025},"certificateFulfilment":"post","address":{"buildingNumber":"31","streetName":"Wildflower Road","locality":"Whitestone","postTown":"Darlington","county":"County Durham","postcode":"DL2 6MX"},"phoneNumber":"07048 952 613","emailAddress":"burton.h@hotmail.com","checkType":"supervisor"}]'
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
