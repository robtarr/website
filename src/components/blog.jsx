'use strict'

let React = require('react');
let apiFetch = require('../js/apiFetch.js');

module.exports = React.createClass({
  displayName: 'BlogReact',
  refreshTime: 1000 * 60,

  componentDidMount: function() {
    let _getInfo = () => {
      apiFetch('/data/blog.json')
        .then((data) => {
          this.setState(data);
        })
    };

    setInterval(_getInfo, this.refreshTime);
  },

  getInitialState: function() {
    if (typeof initialData === 'object' &&
        typeof initialData.blog === 'object') {

      return initialData.blog;
    }

    return this.props;
  },

  render: function() {
    let { name, title, link, date } = this.state;

    return (
      <div>
        <span className='recentList-item-icon icon-writing'></span>
        <h1 className='recentList-item-heading'>What I&rsquo;m Writing</h1>
        <a className='recentList-item-externalLink' data-category='sparkbox' href={ name }>
          { name }
        </a>
        <article>
          <div className='recentList-item-detail'>
            <p>
              <a href={ link }>{ title }</a>
              <span className='meta'>
                { date }
              </span>
            </p>
          </div>
        </article>
      </div>)
  },
})
