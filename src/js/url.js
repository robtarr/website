'use strict';

require('dot-env');
module.exports = (function url() {

  function domain() {
    if (typeof process !== 'undefined' && process.env.DOMAIN) {
      return process.env.DOMAIN;
    }

    if (typeof location === 'undefined') {
      throw('No domain found');
    }

    let domain = location.hostname;

    if (location.port) {
      domain += ':' + location.port;
    }

    return domain;
  }

  function protocol() {
    return 'http:';
  }

  return {
    domain,
    protocol,
  };
})();
