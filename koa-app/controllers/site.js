"use strict";

//Site controller
module.exports = {
  index: function * () {
    var user = this.models.users.current(this.session);

    yield this.render('site/index', { user: user });
  },
  doContact: function () {
    this.body = {
      success: true
    };
  }
};
