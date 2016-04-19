'use strict'

let React = require('react');
let Conference = require('./conference');
let _ = require('lodash');

let SpeakingFuture = React.createClass({
  displayName: 'SpeakingFutureReact',

  _getConferences: (conferences) => {
    conferences = _.filter(conferences, (conference) => {
      let day = conference.date.match(/([a-zA-Z]*) (\d*)-*(\d*), (.*)/);
      let theDate = day[1] + ' ' + day[2] + ', ' + day[4];

      return new Date(theDate) > Date.now();
    });

    return _.map(conferences, (conference) => {
      return <Conference
        conference={conference.conference}
        title={conference.title}
        detail={conference.detail}
        date={conference.date}
        links={conference.links}
      />
    });
  },

  render: function() {
    let conferences = this._getConferences(this.props);

    if (conferences === '') {
      return ''
    }

    return (
      <div>
        <h1 className='otherThings-category'>
          <span className='otherThings-category-icon icon-speaking'></span>
          Speaking
        </h1>
        <ul className='otherThings-category-list'>
          { conferences }
        </ul>
      </div>);
  },
})

module.exports = SpeakingFuture;
