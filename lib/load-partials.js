'use strict';

const hbs = require('hbs');
const fs = require('fs');
const path = require('path');

module.exports = function(partialsDir) {
  const filenames = fs.readdirSync(partialsDir);

  console.log(`Registering partials from '${partialsDir}'`);
  filenames.forEach(function(filename) {
    let matches = /^([^.]+).hbs$/.exec(filename);

    if (!matches) {
      return;
    }

    let name = matches[1];
    let template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    hbs.registerPartial(name, template);
  });
};
