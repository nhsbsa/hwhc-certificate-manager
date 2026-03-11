// External dependencies
const express = require('express');
const router = express.Router();

//
// JSON TEST
//
router.post('/v1/data.json', function(req, res){

    return res.status(200).json({
      host: req.protocol + '://' + req.get('host')
    });

});

//
// DETECT CURRENT VERSION
//
router.use((req, res, next) => {

  console.log('-----------------------------------');
  console.log(req.method + ': ' + req.originalUrl);

  // Versions
  const versions = ['v1','v2'];

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
