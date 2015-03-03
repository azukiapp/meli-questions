"use strict";
//https://github.com/alexmingoia/koa-router
var Router = require('koa-router');

// var secured = function *(next) {
//   console.log('\n>>---------\n secured:', next, '\n>>---------\n');

//   if (this.isAuthenticated()) {
//     yield next;
//   } else {
//     this.status = 401;
//   }
// };

module.exports = function(app, passport) {
  var router = new Router();
  ///// Site
  var siteController = require('../controllers/site');
  // var authController = require('../controllers/auth');

  //main
  router.get('/', siteController.index);
  //contact
  router.post('/contact', siteController.doContact);

      //register
  // router.get('/register', authController.register);
  // router.post('/register', authController.doRegister);

  //auth
  // router.get('/login', authController.login);
  // router.post('/login', authController.doLogin);
  // router.all('/logout', authController.logout);

  return router.middleware();
}
