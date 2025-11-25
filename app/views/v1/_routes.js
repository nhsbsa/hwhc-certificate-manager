// External dependencies
const express = require('express');
const router = express.Router();

router.post(/index/, function (req, res) {
    let destination = 'search';
    if( req.session.data.role === 'backOffice' ){
        destination = 'back-office-dashboard'
    }
    res.redirect( destination );
});

router.post(/search/, function (req, res) {
    const destination = 'search-results';
    res.redirect( destination );
});

router.post(/process-form/, function (req, res) {
    const destination = 'confirm-form';
    res.redirect( destination );
});

router.post(/request-more-information/, function( req, res){
    const destination = 'confirmation-letter-sent';
    res.redirect( destination );
})

module.exports = router;
