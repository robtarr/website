'use strict';

const Promise = require('bluebird');
const github = require('octonode');
const _ = require('lodash');
const fs = require('fs');

const client = github.client();
const ghuser = client.user('robtarr');

module.exports = {
  get: function() {
    ghuser.events(function(err, data, headers) {
      let latest = _.filter(data, function(item) {
        return item.type == 'PushEvent';
      })[0];

      let jsonString = JSON.stringify({
        repo: latest.repo.name,
        date: latest.created_at,
      });

      fs.writeFile('data/github.json', jsonString, function() {
        console.log('GitHub data updated.');
      });
    });
  },
};
