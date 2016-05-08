'use strict'

let React = require('react');
let ItemLink = require('./item-link');
let _ = require('lodash');

let Conference = React.createClass({
  displayName: 'ConferenceReact',

  _getLinks: (links) => {
    return _.map(links, (link) => {
      return <ItemLink text={link.text} href={link.href} key={link.text}/>
    });
  },

  _getDetail: (detail, show) => {
    if (show) {
      return (
        <p className='otherThings-category-list-item-detail'>
          { detail }
        </p>
      )
    }

    return null;
  },

  render: function() {
    let { conference, title, date, detail, links, eventModifier } = this.props;
    let wrapperClass = 'otherThings-category-list-item ' + eventModifier;

    return (
      <li className={ wrapperClass }>
        <h2 className='otherThings-category-list-item-conferenceTitle'>
          { conference }
        </h2>
        <h3 className='otherThings-category-list-item-presentationTitle'>
          { title }
        </h3>
        <time className='otherThings-category-list-item-date'>
          { date }
        </time>
        { this._getDetail(detail, eventModifier !== 'pastEvent') }
        { this._getLinks(links) }
      </li>)
  },
})

module.exports = Conference;
