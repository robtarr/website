'use strict'

let React = require('react');

let ItemLink = React.createClass({
  displayName: 'ProjectLinkReact',

  render: function() {
    let { text, href } = this.props;

    return (
      <a className='otherThings-category-list-item-externalLink' href={ href }>
        { text }
      </a>)
  },
})

module.exports = ItemLink;
