'use strict';

const schedule = require('node-schedule');
const github = require('./github');
const writing = require('./writing');
const twitter = require('./twitter');
const goodreads = require('./goodreads');

function _getData() {
  console.log('Getting GitHub data.');
  github.get();

  console.log('Getting Twitter data.');
  twitter.get();

  console.log('Getting blog data.');
  writing.get();

  console.log('Getting book data.');
  goodreads.get();
}

schedule.scheduleJob('*/5 * * * *', function() {
  _getData();
});

_getData();
