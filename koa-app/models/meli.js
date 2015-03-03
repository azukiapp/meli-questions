"use strict";

var util = require('util');
var ApiClient = require('simple-api-client');

var Meli = function () {
  ApiClient.apply(this, 'https://api.mercadolibre.com/');
};

util.inherits(Meli, ApiClient);

Meli.prototype.getMessages = function (cb) {
  this.get('questions', cb);
};

// Meli lib
module.exports = Meli;
