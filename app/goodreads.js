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
      let book;

      parseString(xmlData, function(err, data) {
        try {
          book = data.GoodreadsResponse.reviews[0].review[0].book[0]

          bookData = {
            title: book.title[0],
            link: book.link[0],
            author: book.authors[0].author[0].name[0],
            authorLink: book.authors[0].author[0].link[0],
          };
        } catch (e) {
          console.log(`Invalid Goodreads data: ${book}`);
        }
      });

      if (bookData.title && bookData.link && bookData.author && bookData.authorLink) {
        fs.writeFile('data/books.json', JSON.stringify(bookData), function() {
          console.log('Goodreads data updated.');
        });
      }
    }

    request(`https://www.goodreads.com/review/list/55152592.xml?key=${key}&v=2&shelf=currently-reading`, _processAPI);
  },
};
