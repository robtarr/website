'use strict';

require('dot-env');
const Twitter = require('twitter');
const fs = require('fs');

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

let params = { screen_name: 'robtarr' };

module.exports = {
  get: function() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        let tweetData;

        try {
          tweetData = {
            date: tweets[0].created_at,
            text: tweets[0].text,
            link: `http://twitter.com/robtarr/status/${tweets[0].id_str}`,
          };
        } catch (e) {
          console.log(`Invalid tweet data: ${tweetData}`);
        }

        if (tweetData.date && tweetData.text && tweetData.link) {
          fs.writeFile('data/twitter.json', JSON.stringify(tweetData), function() {
            console.log('Twitter data updated.');
          });
        }
      }
    });
  },
};
