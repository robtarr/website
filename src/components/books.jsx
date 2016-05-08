'use strict'

const React = require('react');
const ps = require('../js/pubsub');

module.exports = React.createClass({
  displayName: 'BooksReact',

  componentDidMount: function() {
    ps.subscribe('message-books', (data) => {
      this.setState(data);
    });
  },

  getInitialState: function() {
    if (typeof initialData === 'object' &&
        typeof initialData.books === 'object') {

      return initialData.books;
    }

    return this.props;
  },

  render: function() {
    let { title, link, author, authorLink } = this.state;

    return (
      <div>
        <svg className='icon icon-books recentList-item-icon' viewBox='0 0 39 44'>
          <path d='M35.75,5.5 L35.75,41.25 L6.875,41.25 C4.59525,41.25 2.75,39.402 2.75,37.125 C2.75,34.848 4.59525,33 6.875,33 L33,33 L33,0 L5.5,0 C2.475,0 0,2.475 0,5.5 L0,38.5 C0,41.525 2.475,44 5.5,44 L38.5,44 L38.5,5.5 L35.75,5.5 L35.75,5.5 L35.75,5.5 Z'></path>
          <path d='M6.87775,35.75 L6.87775,35.75 L6.875,35.75 C6.116,35.75 5.5,36.366 5.5,37.125 C5.5,37.884 6.116,38.5 6.875,38.5 L6.87775,38.5 L6.87775,38.5 L32.99725,38.5 L32.99725,35.75 L6.87775,35.75 L6.87775,35.75 L6.87775,35.75 Z'></path>
        </svg>

        <h1 className='recentList-item-heading'>What I’m Reading</h1>
        <a className='recentList-item-primaryLink recentList-item-externalLink' href={ link }>
          { title }
        </a>
        <article>
          <div className='recentList-item-detail'>
            <p>
              <span>by: </span>
              <a className='recentList-item-externalLink' href={ authorLink }>
                { author }
              </a>
            </p>
          </div>
        </article>
      </div>)
  },
})
