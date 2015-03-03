"use strict";
//https://github.com/balderdashy/waterline-docs
var Waterline = require('waterline');

var User = Waterline.Collection.extend({
  identity: 'users',
  connection: 'default',
  attributes: {
    first_name:             'string',
    last_name:              'string',
    username:               'string',
    email:                  'string',
    // encrypted_password:     'string',

    // uid:                    'string',
    // token:                  'string',
    // refresh_token:          'string',
    // token_expires_at:       'string',
    // // Recoverable
    // reset_password_token:   'string',
    // reset_password_sent_at: 'date',

    // // Rememberable
    // remember_created_at:    'date',

    // // Trackable
    // sign_in_count:          'integer',
    // current_sign_in_at:     'date',
    // last_sign_in_at:        'date',
    // current_sign_in_ip:     'string',
    // last_sign_in_ip:        'string',

    // Full Name
    // name: function() {
    //   return [this.first_name, this.last_name].join('\s');
    // }
  },
  current: function * (session) {
    if (!session) { return null; }

    var user_id = session['warden.user.user.key'][0][0];
    var user = yield this.findOne(user_id);

    return user;
  }
});

module.exports = User;
