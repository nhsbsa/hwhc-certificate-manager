/**
 * @param {Environment} env
 */
module.exports = function (env) {
  const filters = {}


  //
  // GET RANDOM NUMBER
  //
  filters.getRandomNumber = function( max ){
    return Math.round(Math.random()*max);
  }

  // 
  // GET JOB TITLE FILTER
  //
  filters.getJobTitle = function ( role ) {

    let jobTitle = '';
    switch( role ){
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
  // DWP ADDRESS PATTERN GET RESULTS STATUS FILTER
  //
  filters.dwpAddressPatternGetResultsStatus = function( results, postcode, buildingNumberOrName ){

    let html = '';

    postcode = ( postcode ) ? postcode.trim() : '';
    buildingNumberOrName = ( buildingNumberOrName ) ? buildingNumberOrName.trim() : '';

    const finalSentence = 'You can search again or enter the address manually</a>.';
    const finalLink = '<a class="nhsuk-link" href="address-lookup">Search again</a>';

    if( !Array.isArray(results) || results.length === 0  ){

      // No results
      if( postcode ){
        html = '<p class="nhsuk-body">We could not find an address that matches <strong>' + postcode + '</strong>';
        if( buildingNumberOrName ){
          html += ' and <strong>' + buildingNumberOrName + '</strong>';
        }
        html += '. ' + finalSentence + '</p>';
      } else {
        html = '<p class="nhsuk-body">We could not find an address that matches <strong>' + buildingNumberOrName + '</strong>. ' + finalSentence + '</p>';
      }      

    } else if( Array.isArray(results) && results.length > 0 ) {

      // More than one result
      const noOfResults = ( results.length === 1 ) ? '<strong>1</strong> result' : '<strong>'+results.length+'</strong> results';

      if( postcode ){
        html = '<p class="nhsuk-body">' + noOfResults + ' found for <strong>' + postcode + '</strong>';
        if( buildingNumberOrName ){
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
  filters.getResultsStatus = function( results, postcode, buildingNumberOrName ){
    
    let html = '';

    postcode = (postcode) ? postcode.trim() : '';
    buildingNumberOrName = (buildingNumberOrName) ? buildingNumberOrName.trim() : '';

    const finalSentence = 'You can search again or enter the address manually.';
    const finalLink = '<a class="nhsuk-link" href="address-lookup">Search again</a>';

    if( !Array.isArray(results) || results.length === 0  ){

      // No results
      if( postcode ){
        html = '<p class="nhsuk-body">We could not find an address that matches <strong>' + postcode + '</strong>';
        if( buildingNumberOrName ){
          html += ' and <strong>' + buildingNumberOrName + '</strong>';
        }
        html += '. ' + finalSentence + '</p>';
      } else if( buildingNumberOrName ) {
        html = '<p class="nhsuk-body">We could not find an address that matches <strong>' + buildingNumberOrName + '</strong>. ' + finalSentence + '</p>';
      } else {
        html = '<p class="nhsuk-body">We could not find an address. ' + finalSentence + '</p>';
      }

    } else if( Array.isArray(results) && results.length > 0 ) {

      // More than one result
      const noOfResults = ( results.length === 1 ) ? '<strong>1</strong> result' : '<strong>'+results.length+'</strong> results';

      if( postcode ){
        html = '<p class="nhsuk-body">' + noOfResults + ' found for <strong>' + postcode + '</strong>';
        if( buildingNumberOrName ){
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
  filters.getAddressSelectResults = function(){

    let results = ( Array.isArray( this.ctx.data.addressSearchResults ) ) ? this.ctx.data.addressSearchResults : [];
    if ( results.length > 0 ){
      if( results[0].text !== 'Please select' ){
        results.unshift({ text: 'Please select', value: '' });
      }
    }
    return results;

  };


  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* keep the following line to return your filters to the app  */
  return filters
}

/**
 * @import { Environment } from 'nunjucks'
 */
