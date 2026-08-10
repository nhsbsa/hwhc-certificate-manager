// External dependencies
const express = require('express');
const router = express.Router();

//
// JSON TEST
//
router.post('/v1/data.json', function (req, res) {

  return res.status(200).json({
    host: req.protocol + '://' + req.get('host')
  });

});

//
//MANUAL MATEX APPLICATION ROUTING
//
router.post(
  '/v1/process-application/manual-matex-application',
  function (req, res) {
    console.log('MANUAL MATEX APPLICATION POST HIT')
    console.log('Form data:', req.body)

    const data = req.session.data

    // Values used by the shared confirmation pages
    data.certificateType = req.body.certificateType
    data.approvedFirstName = req.body.imageFirstName
    data.approvedLastName = req.body.imageLastName

      const formVersion = req.body.formVersion

    // Not an official form
    if (formVersion === 'Not an official form') {
      return res.redirect(
        '/v1/process-application/manual/not-official-form'
      )
    }

    const postcode = req.body.imagePostcode
    const patientSignature = req.body.imagePatientSignature
    const practitionerSignature =
      req.body.imageHealthcarePractitionerSignature

    // Missing postcode takes priority
    if (!postcode || postcode.trim() === '') {
      console.log('Result: further information')

      return res.redirect(
        '/v1/process-application/manual/further-information'
      )
    }

    // Either signature missing or marked no
    if (
      patientSignature !== 'yes' ||
      practitionerSignature !== 'yes'
    ) {
      console.log('Result: reject')

      return res.redirect(
        '/v1/process-application/manual/reject'
      )
    }

    // Default result
    console.log('Result: accepted')

    return res.redirect(
      '/v1/process-application/manual/accepted'
    )
  }
)

//
//MANUAL MEDEX APPLICATION ROUTING
//
router.post(
  '/v1/process-application/manual-medex-application',
  function (req, res) {
    console.log('MANUAL MEDEX APPLICATION POST HIT')
    console.log('Form data:', req.body)

    const data = req.session.data

    // Values used by the shared confirmation pages
    data.certificateType = req.body.certificateType
    data.approvedFirstName = req.body.imageFirstName
    data.approvedLastName = req.body.imageLastName

      const formVersion = req.body.formVersion

    // Not an official form
    if (formVersion === 'Not an official form') {
      return res.redirect(
        '/v1/process-application/manual/not-official-form'
      )
    }

    const postcode = req.body.imagePostcode
    const patientSignature = req.body.imagePatientSignature
    const practitionerSignature =
      req.body.imageHealthcarePractitionerSignature

    // Missing postcode takes priority
    if (!postcode || postcode.trim() === '') {
      console.log('Result: further information')

      return res.redirect(
        '/v1/process-application/manual/further-information'
      )
    }

    // Either signature missing or marked no
    if (
      patientSignature !== 'yes' ||
      practitionerSignature !== 'yes'
    ) {
      console.log('Result: reject')

      return res.redirect(
        '/v1/process-application/manual/reject'
      )
    }

    // Default result
    console.log('Result: accepted')

    return res.redirect(
      '/v1/process-application/manual/accepted'
    )
  }
)


//
//MANUAL HRT-PPC APPLICATION ROUTING
//
router.post(
  '/v1/process-application/manual-hrt-ppc-application',
  function (req, res) {
    console.log('MANUAL HRT-PPC APPLICATION POST HIT')
    console.log('Form data:', req.body)

    const data = req.session.data

    // Values used by the shared confirmation pages
    data.certificateType = req.body.certificateType
    data.approvedFirstName = req.body.imageFirstName
    data.approvedLastName = req.body.imageLastName

      const formVersion = req.body.formVersion

    // Not an official form
    if (formVersion === 'Not an official form') {
      return res.redirect(
        '/v1/process-application/manual/not-official-form'
      )
    }

    const postcode = req.body.imagePostcode
    const patientSignature = req.body.imagePatientSignature
    const practitionerSignature =
      req.body.imageHealthcarePractitionerSignature

    // Missing postcode takes priority
    if (!postcode || postcode.trim() === '') {
      console.log('Result: further information')

      return res.redirect(
        '/v1/process-application/manual/further-information'
      )
    }

    // Either signature missing or marked no
    if (
      patientSignature !== 'yes' ||
      practitionerSignature !== 'yes'
    ) {
      console.log('Result: reject')

      return res.redirect(
        '/v1/process-application/manual/reject'
      )
    }

    // Default result
    console.log('Result: accepted')

    return res.redirect(
      '/v1/process-application/manual/accepted'
    )
  }
)


//
// DETECT CURRENT VERSION
//
router.use((req, res, next) => {

  console.log('-----------------------------------');
  console.log(req.method + ': ' + req.originalUrl);

  // Versions
  const versions = ['v1', 'v2'];

  // Clear current routes 
  router.stack = router.stack.filter(layer => layer.name !== 'router');

  // Get the current version needed
  let version = '';
  versions.forEach(function (vers) {
    if (req.originalUrl.toLowerCase().indexOf('/' + vers + '/') > -1) {
      version = vers;
    }
  });

  res.locals.version = version;
  res.locals.currentURL = req.originalUrl;
  //res.locals.csrfToken = req.csrfToken();

  // Load the required routes
  if (version) {
    console.log('Loading routes for ' + version);
    router.use('/' + version, require('./views/' + version + '/_routes'));
  }

  next();


});

module.exports = router;
