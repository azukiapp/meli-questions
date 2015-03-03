"use strict";

//Site controller
module.exports = {
  index: function * () {
    var User = this.models.users;
    var session = this.session;
    var user_id = session['warden.user.user.key'][0][0];

    var user = yield User.findOne(user_id);

    yield this.render('messages/index', { user: user });
  },
  doContact: function () {
    this.body = {
      success: true
    };
  }
};
