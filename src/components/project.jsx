'use strict'

let React = require('react');
let ItemLink = require('./item-link');
let _ = require('lodash');

let Project = React.createClass({
  displayName: 'ProjectReact',

  _getLinks: (links) => {
    return _.map(links, (link) => {
      return <ItemLink text={link.text} href={link.href} key={link.href}/>
    });
  },

  render: function() {
    let { title, detail, links } = this.props;

    return (
      <li className='otherThings-category-list-item'>
        <h2 className='otherThings-category-list-item-projectTitle'>{ title }</h2>
        <p className='otherThings-category-list-item-detail'>{ detail }</p>
        { this._getLinks(links) }
      </li>)
  },
})

module.exports = Project;
