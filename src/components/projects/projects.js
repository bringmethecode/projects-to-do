import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from 'material-ui/List';

import ProjectItem from '../projectItem/projectItem';
import style from './projects.css'

export default class Projects extends Component {
  static propTypes = {
    projects: PropTypes.array,
    dialogOpen: PropTypes.func,
  }
  render() {
    let projectItems;
    if (this.props.projects) {
      projectItems = this.props.projects.map(project => (
        <ProjectItem
          onDelete={this.deleteProject}
          key={project.id}
          project={project}
          dialogOpen={this.props.dialogOpen}
        />
      ));
    }
    return (
      <List className={style.projectList}>
        {projectItems}
      </List>
    );
  }
}
