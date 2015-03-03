"use strict";
var passport = require('koa-passport');

module.exports = function(app, config) {
  // var sessionDecoder = require('rails-session-decoder');
  // var secret = 'ef3ec891066cdbcff86f83f28a36fdae184d2560834c38c243d94ef637237f1b33703174ec0a0ada50c12f1e5eae73fddff24ea5580b0bdd511753f792f9e789';
  // var decoder = sessionDecoder(secret);


  console.log('\n>>---------\n app.request.cookies:', app.request.cookies, '\n>>---------\n');

  // console.log('\n>>---------\n isAuthnticated:\n', this.request, '\n\n', res, '\n\n', next, '\n\n', '\n>>---------\n');
  // console.log('\n>>---------\n app:\n', app, '\n>>---------\n');
  // console.log('\n>>---------\n config:', config, '\n>>---------\n');



  // // console.log('\n>>---------\n app.cookies:', app.cookies, '\n>>---------\n');
  // // console.log('\n>>---------\n app.keys:', app.keys, '\n>>---------\n');





  // passport.serializeUser(function(user, done) {
  //   console.log('\n>>---------\n serializeUser:', user, '\n>>---------\n');
  //   done(null, user.id);
  // });

  // passport.deserializeUser(function(id, done) {
  //   console.log('\n>>---------\n deserializeUser:', id, '\n>>---------\n');
  //   let user = { id: 1, username: 'admin' };
  //   done(null, user);
  // });

  // var RememberMeStrategy = require('passport-remember-me').Strategy;
  // var LocalStrategy = require('passport-local').Strategy;

  // passport.use(new LocalStrategy(function(username, password, done) {
  //   console.log('\n>>---------\n username:', username, '\n>>---------\n');

  //   let user = { id: 1, username: 'admin' };
  //   if (username === 'admin' && password === 'admin') {
  //     done(null, user);
  //   } else {
  //     done(null, false);
  //   }
  // }));

  // var tokens = {}

  // function consumeRememberMeToken(token, fn) {
  //   var uid = tokens[token];
  //   // invalidate the single-use token
  //   delete tokens[token];
  //   return fn(null, uid);
  // }

  // function saveRememberMeToken(token, uid, fn) {
  //   tokens[token] = uid;
  //   return fn();
  // }

  // // Remember Me cookie strategy
  // //   This strategy consumes a remember me token, supplying the user the
  // //   token was originally issued to.  The token is single-use, so a new
  // //   token is then issued to replace it.
  // passport.use(new RememberMeStrategy(
  //   function(token, done) {
  //     console.log('\n>>---------\n token:', token, '\n>>---------\n');
  //     consumeRememberMeToken(token, function(err, uid) {
  //       if (err) { return done(err); }
  //       if (!uid) { return done(null, false); }

  //       // findById(uid, function(err, user) {
  //       //   if (err) { return done(err); }
  //       //   if (!user) { return done(null, false); }
  //       //   return done(null, user);
  //       // });
  //     });
  //   },
  //   issueToken
  // ));

  // function issueToken(user, done) {
  //   var token = utils.randomString(64);
  //   saveRememberMeToken(token, user.id, function(err) {
  //     if (err) { return done(err); }
  //     return done(null, token);
  //   });
  // }

  return passport;
};
