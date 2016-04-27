'use strict';

const fs = require('fs');
const chokidar = require('chokidar');

module.exports = (function() {
  let connections;
  let lastData = {};

  function _send(type, data) {
    connections.forEach(connection => {
      console.log('Sending new ', type);
      connection.sseSend({
        type: type,
        content: data,
      });
    });
  }

  function init(c) {
    connections = c;
    chokidar.watch('./data/*.json', {ignored: /[\/\\]\./}).on('all', (event, path) => {
      fs.readFile(path, (err, data) => {
        const type = (/data\/(.*)\.json/).exec(path)[1];
        _send(type, JSON.parse(data));
      });
    });
  }

  return {
    init,
  };
})();
