'use strict'

let React = require('react');
let apiFetch = require('../js/apiFetch.js');

module.exports = React.createClass({
  displayName: 'BooksReact',
  refreshTime: 1000 * 60,

  componentDidMount: function() {
    let _getInfo = () => {
      apiFetch('/data/gooodreads.json')
        .then((data) => {
          this.setState(data);
        })
    };

    setInterval(_getInfo, this.refreshTime);
  },

  getInitialState: function() {
    if (typeof initialData === 'object' &&
        typeof initialData.books === 'object') {

      return initialData.books;
    }

    return this.props;
  },

  render: function() {
    let { title, link } = this.state;

    return (
      <div>
        <svg className='icon icon-books recentList-item-icon'>
          <path d='M26,4 L26,30 L5,30 C3.342,30 2,28.656 2,27 C2,25.344 3.342,24 5,24 L24,24 L24,0 L4,0 C1.8,0 0,1.8 0,4 L0,28 C0,30.2 1.8,32 4,32 L28,32 L28,4 L26,4 L26,4 Z'></path>
          <path d='M5.002,26 L5.002,26 L5,26 C4.448,26 4,26.448 4,27 C4,27.552 4.448,28 5,28 L5.002,28 L5.002,28 L23.998,28 L23.998,26 L5.002,26 L5.002,26 Z'></path>
        </svg>

        <h1 className='recentList-item-heading'>What I’m Reading</h1>
        <a className='recentList-item-externalLink' href={ link }>
          { title }
        </a>
      </div>)
  },
})
