const csrf = require('@dr.pogodin/csurf');
const csrfProtection = csrf({ cookie: true, httpOnly: true, sameSite: 'strict' });

module.exports = function(req, res, next) {
  csrfProtection(req, res, function() {
    res.locals.csrfToken = req.csrfToken();
    next();
  })

}