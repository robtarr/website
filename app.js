'use strict';

require('babel-core/register')

const express = require('express');
const app = express();
const helmet = require('helmet');
const sse = require('./lib/sse');
const dataMonitor = require('./lib/data-monitor');

const loadPartials = require('./lib/load-partials');

const React = require('react');
const ReactDOM = require('react-dom/server');
const apiFetch = require('./src/js/apiFetch');

const Twitter = require('./src/components/twitter');
const Github = require('./src/components/github');
const Blog = require('./src/components/blog');
const Books = require('./src/components/books');
const Projects = require('./src/components/projects');
const SpeakingFuture = require('./src/components/speaking-future');
const SpeakingPast = require('./src/components/speaking-past');

const twitter = React.createFactory(Twitter);
const github = React.createFactory(Github);
const blog = React.createFactory(Blog);
const books = React.createFactory(Books);
const projects = React.createFactory(Projects);
const speakingFuture = React.createFactory(SpeakingFuture);
const speakingPast = React.createFactory(SpeakingPast);

let connections = [];

app.use('/', express.static('assets'));
app.use('/data', express.static('data'));
app.use(helmet());
app.use(sse);
app.set('view engine', 'hbs');
app.set('views', __dirname);

dataMonitor.init(connections);
loadPartials('src/partials');

function getData(type, renderData) {
  return apiFetch('/data/' + type + '.json')
    .then((data) => {
      renderData[type] = data;
    });
}

app.get(encodeURI('🔑'), function(req, res) {
  res.render('./src/gpg-key');
});

app.get('/stream', function(req, res) {
  res.sseSetup();
  connections.push(res);
});

app.get('/', function(req, res) {
  var renderData = {};

  getData('twitter', renderData)
  .then(() => getData('github', renderData))
  .then(() => getData('blog', renderData))
  .then(() => getData('books', renderData))
  .then(() => getData('projects', renderData))
  .then(() => getData('speaking', renderData))
  .then((data) => {
    res.render('./src/index', {
      ga: process.env.GA,
      twitter: ReactDOM.renderToString(twitter(renderData.twitter)),
      github: ReactDOM.renderToString(github(renderData.github)),
      blog: ReactDOM.renderToString(blog(renderData.blog)),
      books: ReactDOM.renderToString(books(renderData.books)),
      twitterData: JSON.stringify(renderData.twitter),
      githubData: JSON.stringify(renderData.github),
      blogData: JSON.stringify(renderData.blog),
      booksData: JSON.stringify(renderData.books),
      projects: ReactDOM.renderToString(projects(renderData.projects)),
      speakingFuture: ReactDOM.renderToString(speakingFuture(renderData.speaking)),
      speakingPast: ReactDOM.renderToString(speakingPast(renderData.speaking)),
    });
  })
  .catch(function(e) {
    console.log(e);
  });
});

app.listen(process.env.PORT, function() {
  console.log('robtarr.net listening on port ' + process.env.PORT + '...');
});
