'use strict';

const Promise = require('bluebird');
const request = require('request');
const _ = require('lodash');
const fs = require('fs');
const moment = require('moment');

Promise.promisifyAll(request);

const urlList = [
  process.env.BLOG_SPARKBOX,
  process.env.BLOG_PERSONAL,
];

module.exports = {
  get: function() {
    Promise.map(urlList, function(url) {
      return request.getAsync(url).spread(function(request) {
        let json = JSON.parse(request.body)[0];

        if (json.permalink) {
          return {
            name: 'seesparkbox.com',
            title: json.title,
            link: json.permalink,
            date: moment(Number(json.pub_date) * 1000).format('YYYY-MM-DDTHH:MM:SS'),
          };
        } else {
          return {
            name: 'blog.robtarr.net',
            title: json.title.rendered,
            link: json.link,
            date: json.date,
          };
        }
      });
    }).then(function(posts) {
      let post = _.sortBy(posts, 'date')[posts.length - 1];
      let jsonString = JSON.stringify(post);

      fs.writeFile('data/blog.json', jsonString, function() {
        console.log('Blog data updated.');
      });
    }).catch(function(err) {
      console.log('Error getting blog posts.', err);
    });
  },
};
