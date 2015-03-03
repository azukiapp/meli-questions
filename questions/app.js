var proxy = require('express-http-proxy');
var express = require('express');
var fs      = require('fs');
var url     = require('url');
var _       = require('lodash');
var Meli    = require('./lib/meli');
var bodyParser = require('body-parser')

// Configs
var PORT     = process.env.HTTP_PORT || 3000;
var AZK_UID  = process.env.AZK_UID;
var AUTH_URL = process.env.AUTH_URL;

// Database is configured
var client;
if (process.env.DATABASE_URL) {
  var redis   = require('redis');
  var options = url.parse(process.env.DATABASE_URL);
  client = redis.createClient(options.port, options.hostname);
}

// App
var app    = express();
var server = require('http').Server(app);
var io     = require('socket.io')(server);

// set the view engine to ejs
app.set('view engine', 'ejs');

/// middleware

// parse application/json
app.use(bodyParser.json())

// simple logger
app.use(function(req, res, next){
  console.log('%s: %s %s', AZK_UID, req.method, req.url);
  next();
});

// Session
app.use(require('cookie-parser')());
app.use(require('./lib/rails_session')('_session', process.env.RAILS_COOKIE_SECRET));

var auth_entries = ['login', 'logout', 'auth'];
_.each(auth_entries, function(entry) {
  entry = "/" + entry;
  app.use(entry, proxy(AUTH_URL, {
    forwardPath: function(req, res) {
      return entry + require('url').parse(req.url).path;
    },
    decorateRequest: function(req) {
      req.headers['x-forwarded-host'] = 'questions.dev.azk.io';
      return req;
    }
  }));
});

app.get('/', function (req, res) {
  var session = req.cookies['_session'];

  if (_.isEmpty(session) || _.isEmpty(session['mercadolibre.credentials'])) {
    return res.redirect('/login');
  }

  Meli.questions(session['mercadolibre.credentials'].token)
    .spread(function(response, body) {
      res.render('pages/index', { questions: body.questions });
    }, function(err) {
      res.render('pages/index');
    });
});

app.post('/webhooks', function(req, res) {
  Meli.get(req.body.resource)
    .spread(function(response, body) {
      io.sockets.emit('questions', body);
    });
  res.send("ok");
});

server.listen(PORT);
console.log('Service %s is already done in port: %s', AZK_UID, PORT);
