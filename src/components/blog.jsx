'use strict'

const React = require('react');
const ps = require('../js/pubsub');

module.exports = React.createClass({
  displayName: 'BlogReact',

  componentDidMount: function() {
    ps.subscribe('message-blog', (data) => {
      this.setState(data);
    });
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
        <svg className='icon icon-writing recentList-item-icon'>
          <path d='M1.66 1.66c-2.002 2.002-2.002 5.248 0 7.25l7.25-7.25c-2.002-2.002-5.248-2.002-7.25 0zM19.434 26.683l12.379 5.13-5.13-12.379-15.79-15.789-7.25 7.249 15.79 15.789zM21.083 23.471c0.659-0.66 1.907-0.48 2.182-0.205-0.275-0.275-0.455-1.523 0.205-2.182s1.976-0.893 1.976-0.893l2.947 7.113-1.091 1.091-7.113-2.947c0 0 0.235-1.317 0.894-1.976v0z'></path>
        </svg>

        <h1 className='recentList-item-heading'>What I’m Writing</h1>
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
