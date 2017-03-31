var express = require('express'),
    basicAuth = require('basic-auth'),
    gStatic = require('../js/getStatic');
    
var tStatic = gStatic.fStatic();

var router = express.Router();



var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === tStatic.ident.u && user.pass === tStatic.ident.p) {
    return next();
  } else {
    return unauthorized(res);
  };
};



router.get('/', auth, function(req, res, next) {
  res.render('users', {title: 'Authenticated.'});
});

module.exports = router;
