var req  = require('request');
var Q    = require('q');
var _    = require('lodash');

module.exports = {
  url: function(path) {
    return "https://api.mercadolibre.com" + path;
  },

  request: function(method, path, opts) {
    if (_.isEmpty(opts)) { opts = {}; };
    return Q.ninvoke(req, method, _.defaults(opts, {
      url : this.url(path),
      json: true,
    }));
  },

  get: function() {
    var args = _.toArray(arguments);
    args.unshift('get');
    return this.request.apply(this, args);
  },

  questions: function(token) {
    return this.get('/my/received_questions/search', { qs: { access_token: token }});
  }
};
