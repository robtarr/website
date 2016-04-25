/** @jsx React.DOM */
'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Twitter = require('./components/twitter');
let Github = require('./components/github');
let Blog = require('./components/blog');
let Books = require('./components/books');

ReactDOM.render(<Twitter />, document.getElementById('twitter-component'))
ReactDOM.render(<Github />, document.getElementById('github-component'))
ReactDOM.render(<Blog />, document.getElementById('blog-component'))
ReactDOM.render(<Books />, document.getElementById('books-component'))
