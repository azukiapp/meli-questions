/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var Q = require('q');
var sessionDecoder = require('rails-session-decoder');
var secret = 'ef3ec891066cdbcff86f83f28a36fdae184d2560834c38c243d94ef637237f1b33703174ec0a0ada50c12f1e5eae73fddff24ea5580b0bdd511753f792f9e789';
var decoder = sessionDecoder(secret);

// var decodeCookie = function (sample) {
//   var deferred = Q.defer();
//   decoder.decodeCookie(sample, deferred.resolve);
//   return deferred.promise;
// };

// module.exports = function(req, res, next) {
//   return Q.async(function *(req, res, next) {
//     var session = decodeCookie(req.cookies._meli_session);
//     console.log('\n>>---------\n session:', session, '\n>>---------\n');

//     return next();
//   });
// };
module.exports = function(req, res, next) {
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.cookies._meli_session) {
    var session = decoder.decodeCookie(req.cookies._meli_session, function (err, sessionData) {
      sails.log('\n>>---------\n sessionData:', sessionData, '\n>>---------\n');
      return sessionData;
    });

    console.log('\n>>---------\n session:', session, '\n>>---------\n');
    console.log('\n>>---------\n next:', next, '\n>>---------\n');

    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};

// module.exports = function(req, res, next) {

//   // User is allowed, proceed to the next policy,
//   // or if this is the last policy, the controller
//   if (req.cookies._meli_session) {
//     var session_dump;

//     var session = decodeCookie(req.cookies._meli_session)
//       .then(function (sessionData) {
//         sails.log('\n>>---------\n sessionData:', sessionData, '\n>>---------\n');
//         return sessionData;
//       })
//       .fail(sails.log.error)
//       ;

//     console.log('\n>>---------\n session:', session, '\n>>---------\n');

//     return next();
//   }

//   // User is not allowed
//   // (default res.forbidden() behavior can be overridden in `config/403.js`)
//   return res.forbidden('You are not permitted to perform this action.');
// };
