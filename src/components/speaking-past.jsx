'use strict'

let React = require('react');
let Conference = require('./conference');
let _ = require('lodash');

let SpeakingPast = React.createClass({
  displayName: 'SpeakingReact',

  _getConferences: (conferences) => {
    conferences = _.filter(conferences, (conference) => {
      let day = conference.date.match(/([a-zA-Z]*) (\d*)-*(\d*), (.*)/);
      let theDate = day[1] + ' ' + day[2] + ', ' + day[4];

      return new Date(theDate) < Date.now();
    });

    return _.map(conferences, (conference) => {
      return <Conference
        conference={conference.conference}
        title={conference.title}
        detail={conference.detail}
        date={conference.date}
        links={conference.links}
        key={conference.date}
        eventModifier='pastEvent'
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
        <h2 className='otherThings-subCategory'>
          Previous Events
        </h2>
        <ul className='otherThings-category-list'>
          { conferences }
        </ul>
      </div>);
  },
})

module.exports = SpeakingPast;
