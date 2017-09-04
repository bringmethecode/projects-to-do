import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'
import moment from 'moment'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Toolbar from 'material-ui/Toolbar'
import { indigoA400, amber500 } from 'material-ui/styles/colors'

import firebase from '../../firebase'
import style from './addProject.css'

export default class AddProject extends Component {
  static propTypes = {
    addProject: PropTypes.func,
  }
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.pickedDate = this.pickedDate.bind(this)
    this.state = {
      newProject: {},
      title: '',
      categories: ['Web Development', 'Design', 'Publicity', 'Art', 'Other'],
      catValue: 0,
      selectedCat: 'Web Development',
      date: null,
      error: '',
    }
  }
  pickedDate(event, date) {
    this.setState({ date: moment(date) })
  }
  handleCategoryChange(event, index, value) {
    this.setState({ catValue: value, selectedCat: this.state.categories[value] })
  }
  handleSubmit(event) {
    event.preventDefault()
    if (this.state.title === '') {
      this.setState({ error: 'Name and date required >_>' })
    } else {
      const projectRef = firebase.database().ref('projects')
      const newProject = {
        id: uuidv4(),
        title: this.state.title,
        category: this.state.selectedCat,
        date: this.state.date.format(),
      }
      projectRef.push(newProject)
      this.props.addProject()
      this.setState({ title: '', catValue: 0, date: null })
    }
  }
  render() {
    return (
      <Toolbar
        style={{ backgroundColor: '#fff', borderBottom: '1px solid #F5F5F5' }}
      >
        <form className={style.form} onSubmit={this.handleSubmit}>
          <TextField
            className={style.formTextField}
            errorText={this.state.error}
            errorStyle={{ top: -47 }}
            underlineFocusStyle={{ borderColor: indigoA400 }}
            hintText="Project Title"
            value={this.state.title}
            onChange={event => this.setState({ title: event.target.value, error: '' })}
          />
          <SelectField
            className={style.formDropDown}
            value={this.state.catValue}
            onChange={this.handleCategoryChange}
            labelStyle={{ lineHeight: '56px' }}
          >
            <MenuItem value={0} primaryText={this.state.categories[0]} />
            <MenuItem value={1} primaryText={this.state.categories[1]} />
            <MenuItem value={2} primaryText={this.state.categories[2]} />
            <MenuItem value={3} primaryText={this.state.categories[3]} />
            <MenuItem value={4} primaryText={this.state.categories[4]} />
          </SelectField>
          <DatePicker
            className={style.formDatePicker}
            hintText="Due Date"
            textFieldStyle={{ maxWidth: '100px' }}
            value={this.state.date ? this.state.date.toDate() : null}
            onChange={this.pickedDate}
          />
          <RaisedButton
            label="ADD"
            backgroundColor={amber500}
            labelColor={indigoA400}
            style={{ height: '36px', alignSelf: 'center' }}
            labelStyle={{ lineHeight: '36px' }}
            type="submit"
          />
        </form>
      </Toolbar>
    )
  }
}
