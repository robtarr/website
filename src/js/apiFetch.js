'use strict'

require('es6-promise').polyfill();
require('isomorphic-fetch');
const moment = require('moment');
const url = require('./url');

const domain = url.domain();
const protocol = url.protocol();

module.exports = function(url) {
  return fetch(`${protocol}//${domain}${url}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.date) {
        data.date = moment(new Date(data.date)).fromNow();
      }

      return data;
    })
    .catch((e) => {
      console.log(e);
    });
};
