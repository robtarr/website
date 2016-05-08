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
    let { name, siteLink, title, link, date } = this.state;

    return (
      <div>
        <svg className='icon icon-writing recentList-item-icon' viewBox='0 0 45 45'>
          <path d='M2.24559662,2.24559662 C-0.537198874,5.02839212 -0.537198874,9.54035724 2.24559662,12.3231527 L12.3231527,2.24559662 C9.54035724,-0.537198874 5.02839212,-0.537198874 2.24559662,2.24559662 L2.24559662,2.24559662 Z M44.1585,44.1585 L37.0277603,26.9515942 L15.0795381,5.00476198 L5.00198197,15.0809281 L26.9502042,37.0277603 L44.1585,44.1585 Z M29.243717,32.5630554 C30.1597321,31.6456503 31.8944617,31.8958517 32.2767138,32.2781038 C31.8944617,31.8958517 31.6442603,30.1611221 32.5616654,29.245107 C33.4790705,28.3290919 35.3083207,28.00383 35.3083207,28.00383 L39.4046735,37.8909551 L37.8881751,39.4074535 L28.00105,35.3111007 C28.00105,35.3111007 28.3277019,33.4804605 29.243717,32.5644454 L29.243717,32.5644454 L29.243717,32.5630554 Z'></path>
        </svg>

        <h1 className='recentList-item-heading'>What I’m Writing</h1>
        <a className='recentList-item-primaryLink recentList-item-externalLink' data-category='sparkbox' href={ siteLink }>
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
