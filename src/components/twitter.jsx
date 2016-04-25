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
        <svg className='icon icon-twitter recentList-item-icon' viewBox='0 0 40 32'>
          <path d='M39.375,3.789 C37.926,4.432 36.369,4.866 34.735,5.061 C36.403,4.061 37.684,2.478 38.287,0.592 C36.726,1.518 34.997,2.19 33.157,2.552 C31.684,0.982 29.584,0.001 27.261,0.001 C22.8,0.001 19.183,3.618 19.183,8.079 C19.183,8.712 19.254,9.329 19.392,9.92 C12.678,9.583 6.726,6.367 2.742,1.48 C2.047,2.673 1.648,4.061 1.648,5.541 C1.648,8.344 3.074,10.816 5.242,12.265 C3.918,12.223 2.672,11.86 1.583,11.255 C1.582,11.289 1.582,11.322 1.582,11.357 C1.582,15.271 4.367,18.536 8.062,19.278 C7.384,19.463 6.671,19.561 5.934,19.561 C5.413,19.561 4.907,19.51 4.414,19.416 C5.442,22.625 8.425,24.961 11.96,25.026 C9.195,27.193 5.712,28.484 1.927,28.484 C1.275,28.484 0.632,28.446 -2.22044605e-15,28.371 C3.575,30.663 7.821,32.001 12.383,32.001 C27.242,32.001 35.367,19.692 35.367,9.016 C35.367,8.666 35.359,8.318 35.343,7.971 C36.922,6.832 38.291,5.409 39.374,3.789 L39.375,3.789 Z'></path>
        </svg>
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
