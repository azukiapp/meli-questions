"use strict";

//Site controller
var Meli = {
  index: function * () {
    var user = this.models.users.current(this.session);

    yield this.render('messages/index', { user: user });
  }
};

module.exports = Meli;
