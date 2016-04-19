'use strict'

let React = require('react');
let apiFetch = require('../js/apiFetch.js');

module.exports = React.createClass({
  displayName: 'GithubReact',
  refreshTime: 1000 * 60,

  componentDidMount: function() {
    let _getInfo = () => {
      apiFetch('/data/github.json')
        .then((data) => {
          this.setState(data);
        })
    };

    setInterval(_getInfo, this.refreshTime);
  },

  getInitialState: function() {
    if (typeof initialData === 'object' &&
        typeof initialData.github === 'object') {

      return initialData.github;
    }

    return this.props;
  },

  render: function() {
    let { repo, date } = this.state;
    let url = 'http://github.com/' + this.state.repo;

    return (
      <div>
        <span className='recentList-item-icon icon-github'></span>
        <h1 className='recentList-item-heading'>What I’m Working On</h1>
        <a className='recentList-item-externalLink' data-category='github' href='//github.com/robtarr'>
          github.com
        </a>
        <article>
          <div className='recentList-item-detail'>
            <p>
              Pushed code to <a href={ url }>{ repo }</a>
              <span className='meta'>
                { date }
              </span>
            </p>
          </div>
        </article>
      </div>)
  },
})
