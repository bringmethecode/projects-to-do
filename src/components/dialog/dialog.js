import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { indigoA400, redA400 } from 'material-ui/styles/colors'

export default class ProjectDialog extends Component {
  static propTypes = {
    dialogClose: PropTypes.func,
    dialogState: PropTypes.bool.isRequired,
    onDelete: PropTypes.func,
  }

  render() {
    const actions = [
      <FlatButton
        label="Not Yet"
        labelStyle={{ color: indigoA400 }}
        primary={true}
        onClick={this.props.dialogClose}
      />,
      <FlatButton
        label="Yeah!"
        labelStyle={{ color: redA400 }}
        primary={true}
        onClick={this.props.onDelete}
      />,
    ];
    return (
      <Dialog
        title="DELETE PROJECT"
        actions={actions}
        contentStyle={{ width: '300px' }}
        modal={false}
        open={this.props.dialogState}
        onRequestClose={this.props.dialogClose}
      >
        Are you done with this project?
      </Dialog>
    );
  }
}
