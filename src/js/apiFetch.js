'use strict'

require('es6-promise').polyfill();
require('isomorphic-fetch');
const url = require('./url');

const domain = url.domain();
const protocol = url.protocol();

module.exports = function(url) {
  return fetch(`${protocol}//${domain}${url}`)
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    });
};
