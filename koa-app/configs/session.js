"use strict";
var passport = require('koa-passport');
var sessionDecoder = require('rails-session-decoder');

module.exports = function(app, config) {
  var decoder = sessionDecoder(config.secret);
  // var session_cookie = app.cookies.get('_meli_session')
  // console.log('\n>>---------\n session_cookie:', session_cookie, '\n>>---------\n');

  // var session = decoder.decodeCookie(session_cookie, function (err, sessionData) {
  //   console.log('\n>>---------\n sessionData:', sessionData, '\n>>---------\n');
  //   return sessionData;
  // });


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
