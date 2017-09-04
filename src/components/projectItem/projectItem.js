import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { ListItem } from 'material-ui/List'
import Note from 'material-ui-icons/Note'
import Avatar from 'material-ui/Avatar'
import ActionInfo from 'material-ui/svg-icons/action/info'
import { amber500, grey500 } from 'material-ui/styles/colors'

import style from './projectItem.css'

export default class ProjectItem extends Component {
  static propTypes = {
    project: PropTypes.object,
    dialogOpen: PropTypes.func,
  }
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  clickEvent() {
    this.clickEvent.bind(this)
    this.props.dialogOpen()
  }
  handleClick() {
    this.props.dialogOpen(this.props.project.id)
  }

  render() {
    return (
      <ListItem
        className={style.listItem}
        onClick={this.handleClick}
        leftAvatar={<Avatar icon={<Note />} backgroundColor={amber500} />}
        rightIcon={<ActionInfo color={grey500} />}
        primaryText={
          <div>
            {this.props.project.title}
            <br /><span className={style.projectDate}>
              Due: {this.props.project.date ? moment(this.props.project.date).format('MMM DD') : null}
            </span>
          </div>
        }
        secondaryText={this.props.project.category}
      />
    );
  }
}
