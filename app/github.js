'use strict';

const Promise = require('bluebird');
const github = require('octonode');
const _ = require('lodash');
const fs = require('fs');
const moment = require('moment');

const client = github.client();
const ghuser = client.user('robtarr');

module.exports = {
  get: function() {
    ghuser.events(function(err, data, headers) {
      if (err) { return }

      let latest = _.filter(data, function(item) {
        return item.type == 'PushEvent';
      })[0];

      if (latest.repo.name && latest.created_at) {
        let jsonString = JSON.stringify({
          repo: latest.repo.name,
          date: moment(new Date(latest.created_at)).fromNow(),
        });

        fs.writeFile('data/github.json', jsonString, function() {
          console.log('GitHub data updated.');
        });
      }
    });
  },
};
