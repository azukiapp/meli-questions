var crypto = require('crypto');
var sessionDecoder = require('rails-session-decoder');

module.exports = function (name, secret) {
  var decoder = new sessionDecoder(secret);

  return function (req, res, next) {
    // req.cookies should be available from cookie-parser
    if (req.cookies && req.cookies[name]) {
      var m = decoder.decodeCookieSync(req.cookies[name]);
      req.cookies[name] = JSON.parse(m);
      next();
    }
    else {
      next();
    }
  };
};
