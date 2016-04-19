require('babel-core/register')

const express = require('express');
const app = express();
const helmet = require('helmet');
const loadPartials = require('./lib/load-partials');

const React = require('react');
const ReactDOM = require('react-dom/server');
const apiFetch = require('./src/js/apiFetch');

const Twitter = require('./src/components/twitter');
const Github = require('./src/components/github');
const Blog = require('./src/components/blog');
const Projects = require('./src/components/projects');
const SpeakingFuture = require('./src/components/speaking-future');
const SpeakingPast = require('./src/components/speaking-past');

const twitter = React.createFactory(Twitter);
const github = React.createFactory(Github);
const blog = React.createFactory(Blog);
const projects = React.createFactory(Projects);
const speakingFuture = React.createFactory(SpeakingFuture);
const speakingPast = React.createFactory(SpeakingPast);

app.use('/', express.static('assets'));
app.use('/data', express.static('data'));
app.use(helmet());

app.set('view engine', 'hbs');
app.set('views', __dirname);

loadPartials('src/partials');

function getData(type, renderData) {
  return apiFetch('/data/' + type + '.json')
    .then((data) => {
      renderData[type] = data;
    });
}

// 🔑
app.get('/%F0%9F%94%91', function(req, res) {
  res.render('./src/key', {
    ga: process.env.GA,
  });
});

app.get('/', function(req, res) {
  var renderData = {};

  getData('twitter', renderData)
  .then(() => getData('github', renderData))
  .then(() => getData('blog', renderData))
  .then(() => getData('projects', renderData))
  .then(() => getData('speaking', renderData))
  .then((data) => {
    res.render('./src/index', {
      ga: process.env.GA,
      twitter: ReactDOM.renderToString(twitter(renderData.twitter)),
      github: ReactDOM.renderToString(github(renderData.github)),
      blog: ReactDOM.renderToString(blog(renderData.blog)),
      twitterData: JSON.stringify(renderData.twitter),
      githubData: JSON.stringify(renderData.github),
      blogData: JSON.stringify(renderData.blog),
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
