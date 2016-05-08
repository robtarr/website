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
        key={conference.conference}
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
        <svg className='otherThings-icon icon icon-speaking' viewBox='0 0 26 42'>
          <path d='M21.8253156,15.9923177 L21.8253156,21.8262654 C21.8253156,25.8919912 18.3915679,29.3257388 14.3258422,29.3257388 L10.9921578,29.3257388 C6.92643206,29.3257388 3.49268443,25.8906745 3.49268443,21.8262654 L3.49268443,15.9923177 L0.159,15.9923177 L0.159,21.8262654 C0.159,27.6983952 5.12002802,32.6594232 10.9921578,32.6594232 L10.9921578,38.493371 L3.90873668,38.493371 L3.90873668,41.8270554 L21.4092633,41.8270554 L21.4092633,38.493371 L14.3258422,38.493371 L14.3258422,32.6594232 C20.197972,32.6594232 25.159,27.6983952 25.159,21.8262654 L25.159,15.9923177 L21.8253156,15.9923177 L21.8253156,15.9923177 Z M10.9908412,26.8254755 L14.3245256,26.8254755 C16.7049764,26.8254755 18.8194698,24.9585068 19.2434217,22.6583699 L14.2902934,22.6583699 L14.2902934,20.9915277 L19.3250522,20.9915277 L19.3250522,19.3246855 L14.2902934,19.3246855 L14.2902934,17.6578433 L19.3250522,17.6578433 L19.3250522,15.9910011 L14.2902934,15.9910011 L14.2902934,14.3241588 L19.3250522,14.3241588 L19.3250522,12.6573166 L14.2902934,12.6573166 L14.2902934,10.9904744 L19.3250522,10.9904744 L19.3250522,9.32363219 L14.2902934,9.32363219 L14.2902934,7.65678997 L19.3250522,7.65678997 L19.3250522,5.98994776 L14.2902934,5.98994776 L14.2902934,4.32310554 L19.2434217,4.32310554 C18.8194698,2.02428523 16.7049764,0.156 14.3245256,0.156 L10.9908412,0.156 C8.32731683,0.156 5.99031451,2.4916857 5.99031451,5.15652665 L5.99031451,21.8236322 C5.99031451,24.4871565 8.32600021,26.8241588 10.9908412,26.8241588 L10.9908412,26.8254755 Z'></path>
        </svg>
        <h1 className='otherThings-category speaking'>
          Speaking
        </h1>
        <ul className='otherThings-category-list'>
          { conferences }
        </ul>
      </div>);
  },
})

module.exports = SpeakingFuture;
