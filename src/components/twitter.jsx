'use strict'

let React = require('react');
let apiFetch = require('../js/apiFetch.js');

let Twitter = React.createClass({
  displayName: 'TwitterReact',
  refreshTime: 1000 * 60,

  componentDidMount: function() {
    let _getInfo = () => {
      apiFetch('/data/twitter.json')
        .then((data) => {
          this.setState(data);
        })
    };

    setInterval(_getInfo, this.refreshTime);
  },

  getInitialState: function() {
    if (typeof initialData === 'object' &&
        typeof initialData.twitter === 'object') {

      return initialData.twitter;
    }

    return this.props;
  },

  render: function() {
    let { text, link, date } = this.state;

    return (
      <div>
        <span className='recentList-item-icon icon-twitter'></span>
        <h1 className='recentList-item-heading'>What I’m Talking About</h1>
        <a className='recentList-item-externalLink' data-category='twitter' href='//twitter.com/robtarr'>
          @robtarr
        </a>
        <article>
          <div className='recentList-item-detail'>
            <p>
              { text }
              <span className='meta'>
                <a className='time' href={ link }>
                  { date }
                </a>
              </span>
            </p>
          </div>
        </article>
      </div>)
  },
})

module.exports = Twitter;
