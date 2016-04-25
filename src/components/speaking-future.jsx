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
          <svg className='icon icon-speaking'>
            <path class='path1' d='M16.615 12.184v4.431c0 3.088-2.608 5.696-5.696 5.696h-2.532c-3.088 0-5.696-2.609-5.696-5.696v-4.431h-2.532v4.431c0 4.46 3.768 8.228 8.228 8.228v4.431h-5.38v2.532h13.292v-2.532h-5.38v-4.431c4.46 0 8.228-3.768 8.228-8.228v-4.431h-2.532zM8.386 20.412h2.532c1.808 0 3.414-1.418 3.736-3.165h-3.762v-1.266h3.824v-1.266h-3.824v-1.266h3.824v-1.266h-3.824v-1.266h3.824v-1.266h-3.824v-1.266h3.824v-1.266h-3.824v-1.266h3.824v-1.266h-3.824v-1.266h3.762c-0.322-1.746-1.928-3.165-3.736-3.165h-2.532c-2.023 0-3.798 1.774-3.798 3.798v12.659c0 2.023 1.774 3.798 3.798 3.798z'></path>
          </svg>
          Speaking
        </h1>
        <ul className='otherThings-category-list'>
          { conferences }
        </ul>
      </div>);
  },
})

module.exports = SpeakingFuture;
