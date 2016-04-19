'use strict'

let React = require('react');
let Conference = require('./conference');
let _ = require('lodash');

let SpeakingPast = React.createClass({
  displayName: 'SpeakingReact',

  _convertDate: (date) => {
    // Let day = date.match(/([a-zA-Z]*) (\d*)-*(\d*), (.*)/);
    // return new Date(day[1] + ' ' + day[2] + ', ' + day[4]);
    return date;
  },

  _getConferences: function(conferences) {
    conferences = _.filter(conferences, (conference) => {
      return this._convertDate(conference.date) < Date.now();
    });

    return _.map(conferences, (conference) => {
      // Console.log('....', this._convertDate(conference.date));
      return <Conference
        conference={conference.conference}
        title={conference.title}
        date={conference.date}
        links={conference.links}
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
