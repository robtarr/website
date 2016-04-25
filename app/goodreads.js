'use strict';

require('dot-env');
const fs = require('fs');
const request = require('request');
const parseString = require('xml2js').parseString;

const key = process.env.GOODREADS_KEY;

module.exports = {
  get: function() {
    function _processAPI(err, res, xmlData) {
      let bookData;

      parseString(xmlData, function(err, data) {
        let book = data.GoodreadsResponse.reviews[0].review[0].book[0]

        bookData = {
          title: book.title[0],
          link: book.link[0],
        };
      });

      console.log(bookData);

      fs.writeFile('data/books.json', JSON.stringify(bookData), function() {
        console.log('Goodreads data updated.');
      });
    }

    request(`https://www.goodreads.com/review/list/55152592.xml?key=${key}&v=2&shelf=currently-reading`, _processAPI);
  },
};
