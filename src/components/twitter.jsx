'use strict'

const React = require('react');
const ps = require('../js/pubsub');
const howLongAgo = require('../js/how-long-ago');

const Twitter = React.createClass({
  displayName: 'TwitterReact',

  componentDidMount: function() {
    ps.subscribe('message-twitter', (data) => {
      this.setState(data);
    });
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
        <svg className='icon icon-twitter recentList-item-icon' viewBox='0 0 55 44'>
          <path d='M54.140625,5.2095 C52.14825,6.093625 50.007375,6.690375 47.760625,6.9585 C50.054125,5.5835 51.8155,3.406875 52.644625,0.813625 C50.49825,2.086875 48.120875,3.010875 45.590875,3.508625 C43.5655,1.349875 40.678,0.001 37.483875,0.001 C31.35,0.001 26.376625,4.974375 26.376625,11.10825 C26.376625,11.978625 26.47425,12.827 26.664,13.639625 C17.43225,13.17625 9.24825,8.75425 3.77025,2.034625 C2.814625,3.675 2.266,5.5835 2.266,7.6185 C2.266,11.472625 4.22675,14.871625 7.20775,16.864 C5.38725,16.80625 3.674,16.307125 2.176625,15.47525 C2.17525,15.522 2.17525,15.567375 2.17525,15.6155 C2.17525,20.99725 6.004625,25.486625 11.08525,26.506875 C10.153,26.76125 9.172625,26.896 8.15925,26.896 C7.442875,26.896 6.747125,26.825875 6.06925,26.696625 C7.48275,31.109 11.584375,34.321 16.445,34.410375 C12.643125,37.39 7.854,39.165125 2.649625,39.165125 C1.753125,39.165125 0.869,39.112875 -5.77315973e-15,39.00975 C4.915625,42.16125 10.753875,44.001 17.026625,44.001 C37.45775,44.001 48.629625,27.076125 48.629625,12.396625 C48.629625,11.915375 48.618625,11.436875 48.596625,10.95975 C50.76775,9.393625 52.650125,7.437 54.13925,5.2095 L54.140625,5.2095 L54.140625,5.2095 Z'></path>
        </svg>
        <h1 className='recentList-item-heading'>What I’m Talking About</h1>
        <a className='recentList-item-primaryLink recentList-item-externalLink' data-category='twitter' href='//twitter.com/robtarr'>
          @robtarr
        </a>
        <article>
          <div className='recentList-item-detail'>
            <p>
              { text }
              <span className='meta'>
                <a className='time' href={ link }>
                  { howLongAgo(date) }
                </a>
              </span>
            </p>
          </div>
        </article>
      </div>)
  },
})

module.exports = Twitter;
