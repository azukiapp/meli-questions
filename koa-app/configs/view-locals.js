"use strict";
//view locals
module.exports = {
  name: 'koa-app',
  title: 'Koa-app',
  description: '',
  flash: function() {
    return this.flash;
  },
  user: function() {
    return this.request.user;
  },
  isAuthenticated: function() {
    return this.isAuthenticated && this.isAuthenticated();
  },
};
