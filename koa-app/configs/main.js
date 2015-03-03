"use strict";
var path = require('path');

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
// var host = 'http://localhost' + (port != 80 ? ':' + port : '');

var DEBUG = env !== 'production';

module.exports = {
  //http://koajs.com/#application
  name: "koa-app",
  // keys: ['b2fef13fc9e78cbd3aa0463c779a977c3850058a', '_meli_session'],
  // secret: 'ef3ec891066cdbcff86f83f28a36fdae184d2560834c38c243d94ef637237f1b' +
  //         '33703174ec0a0ada50c12f1e5eae73fddff24ea5580b0bdd511753f792f9e789',
  env: env,
  port: port,
  //https://github.com/koajs/static#options
  static: {
    directory: path.resolve(__dirname, '../web')
  },
  //https://github.com/koajs/body-parser#options
  bodyparser: {},
  //https://github.com/koajs/generic-session#options
  session: {
    key: '_meli_session',
    signed: false,
    secret: 'ef3ec891066cdbcff86f83f28a36fdae184d2560834c38c243d94ef637237f1b' +
            '33703174ec0a0ada50c12f1e5eae73fddff24ea5580b0bdd511753f792f9e789',
    domain: "all",
    // cookie: {
    //   signed: false,
    //   // maxAge: 1000 * 60 * 60 * 24 //24 hours
    // }
  },
  //https://github.com/rkusa/koa-passport
  auth: {},
  //https://github.com/koajs/ejs
  view: {
    root: path.resolve(__dirname, '../views'),
    cache: DEBUG ? false : 'memory',
    locals: require('./view-locals'),
    filters: require('./view-filters'),
    layout: 'layouts/main',
  },
  //https://github.com/fundon/koa-locale#usage
  locale: {},
  //https://github.com/fundon/koa-i18n
  i18n: {
    directory: path.resolve(__dirname, '../locales'),
    defaultLocale: 'en', //When you pass in an array of locales the first locale is automatically set as the defaultLocale.
    locales: ['en'],
    query: false,
    subdomain: true,
    cookie: false,
    header: false
  },
  //https://github.com/balderdashy/waterline
  //https://github.com/balderdashy/waterline-docs#supported-adapters
  database: {
    // Setup Adapters
    // Creates named adapters that have been required
    adapters: {
      'default': require('sails-mongo'),
    },
    // Build Connections Config
    // Setup connections using the named adapter configs
    connections: {
      'default': {
        adapter: 'default',
        url: process.env.MONGODB_URI,
        pool: false,
        ssl: false
      }
    },
    defaults: {
      migrate: 'safe'
      // migrate: 'alter'
    }

  },
  //https://github.com/gusnips/koa-error-ejs
  error: {
    view: 'error/error',
    layout: 'layouts/error',
    custom: {
      401: 'error/401',
      403: 'error/403',
      404: 'error/404',
    },
  },
}
