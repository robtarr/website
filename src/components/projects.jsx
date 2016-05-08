'use strict'

let React = require('react');
let Project = require('./project');
let _ = require('lodash');

let Projects = React.createClass({
  displayName: 'ProjectsReact',

  _getProjects: (projects) => {
    return _.map(projects, (project) => {
      return <Project title={project.title} detail={project.detail} links={project.links} key={project.title}/>
    });
  },

  render: function() {
    return (
      <ul className='otherThings-category-list'>
        { this._getProjects(this.props) }
      </ul>)
  },
})

module.exports = Projects;
