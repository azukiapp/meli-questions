"use strict";
var config = require('./configs/main');
var session = require('./lib/rails-session');
var app = require('koa')();

app.name = config.name;
// app.keys = config.keys;
app.keys = ['_meli_session'];
app.env = config.env;

if (config.env === 'development') {
  var debug = require('debug')('koa-app');
}

app.use(require('koa-bodyparser')(config.bodyparser));
require('koa-locale')(app);
app.use(require('koa-i18n')(app, config.i18n));
app.use(require('koa-static')(config.static.directory, config.static));

// Sessions
app.use(session(config.session, app));

// app.use(require('koa-generic-session')(config.session));
// app.use(session({
//   store: new RedisStore()
// }));
//
app.use(require('koa-flash')(config.flash));

require('koa-ejs')(app, config.view);
app.use(require('koa-error-ejs')(config.error));

// var sessions = require('./configs/session')(app, config.auth);
// var passport = require('./configs/auth')(app, config.auth);
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passport.authenticate('remember-me'));
// app.use(require('./configs/routes')(app, passport));

app.use(require('./configs/routes')(app));
require('./configs/database')(app, config.database, function(err, ontology) {
  if (err) {
    throw err;
  }
  app.context.models = ontology.collections;
  console.log('database adapter initialized');
});

if (!module.parent) {
  app.listen(config.port || 3000, function() {
    console.log('Server running on port ' + config.port || 3000);
  });
}

module.exports = app;
