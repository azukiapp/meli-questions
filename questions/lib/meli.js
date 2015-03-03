var req  = require('request');
var Q    = require('q');
var _    = require('lodash');

module.exports = {
  url: function(path) {
    return "https://api.mercadolibre.com" + path;
  },

  request: function(method, path, opts) {
    if (_.isEmpty(opts)) { opts = {}; };
    var request = _.defaults(opts, {
      url : this.url(path),
      json: true,
    });

    console.log('Meli %s - %s : %s', method, path, request);
    var promise = Q.ninvoke(req, method, request);

    return promise.then(function(result) {
      console.log('Meli response:', result[1]);
      return result;
    })
  },

  get: function() {
    var args = _.toArray(arguments);
    args.unshift('get');
    return this.request.apply(this, args);
  },

  questions: function(token) {
    var path = '/my/received_questions/search';
    var opts = { qs: { access_token: token }};
    return this.get(path, opts)
      .spread(function(response, body) {
        return _.reduce(body.questions, function(items, question) {
          var item = items[question.item_id] || [];
          item.push(question);
          items[question.item_id] = item;
          return items;
        }, {});
      });
  }
};
