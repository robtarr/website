'use strict';

const ps = require('./pubsub');

module.exports = (function() {
  if (!!window.EventSource) {
    let source = new EventSource('/stream/');

    source.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);

      ps.publish(`message-${data.type}`, data.content);
    }, false);
  }
})();
