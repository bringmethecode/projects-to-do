import React, { Component } from 'react'
import firebase from 'firebase'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Card from 'material-ui/Card'
import Snackbar from 'material-ui/Snackbar';

import style from './App.css'
import Projects from './components/projects/projects'
import AddProject from './components/addProject/addProject'
import ProjectDialog from './components/dialog/dialog'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      projects: [],
      dialogOpen: false,
      idOpen: null,
      projectAdded: false,
      projectDone: false,
    }
    this.handleAddProject = this.handleAddProject.bind(this)
    this.dialogOpen = this.dialogOpen.bind(this)
    this.dialogClose = this.dialogClose.bind(this)
    this.handleDeleteProject = this.handleDeleteProject.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  componentDidMount() {
    const projectsRef = firebase.database().ref('projects')
    projectsRef.on('value', (snapshot) => {
      const newState = []
      snapshot.forEach((project) => {
        const dbProject = project.val()
        newState.push({
          key: project.key,
          id: dbProject.id,
          title: dbProject.title,
          category: dbProject.category,
          date: dbProject.date,
        })
      })
      this.setState({
        projects: newState,
      })
    })
  }

  handleAddProject(project) {
    this.setState({ projectAdded: true })
  }

  handleDeleteProject() {
    const projects = this.state.projects
    const indexOfProjects = projects.findIndex(x => x.id === this.state.idOpen)
    const projectSelected = projects[indexOfProjects]
    const projectsRef = firebase.database().ref('projects')
    projectsRef.child(projectSelected.key).remove()
    projectsRef.on('value', (snapshot) => {
      const newState = []
      snapshot.forEach((project) => {
        const dbProject = project.val()
        newState.push({
          key: project.key,
          id: dbProject.id,
          title: dbProject.title,
          category: dbProject.category,
          date: dbProject.date,
        })
      })
      this.setState({
        projects: newState,
        dialogOpen: false,
        idOpen: null,
        projectDone: true,
      })
    })
  }

  dialogOpen(id) {
    this.setState({ dialogOpen: true, idOpen: id })
  }
  dialogClose() {
    this.setState({ dialogOpen: false })
  }
  handleRequestClose() {
    this.setState({ projectAdded: false, projectDone: false })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className={style.header} />
          <Card className={style.card}>
            <p className={style.title}>
              project manager
              <sup className={style.version}>v0.1
              </sup>
            </p>
            <AddProject addProject={this.handleAddProject} projectAdded={this.state.projectAdded} />
            <Projects
              projects={this.state.projects}
              dialogOpen={this.dialogOpen}
            />
          </Card>
          {
            this.state.dialogOpen &&
            <ProjectDialog
              projectId={this.state.idOpen}
              dialogState={this.state.dialogOpen}
              dialogClose={this.dialogClose}
              onDelete={this.handleDeleteProject}
            />
          }
          <Snackbar
            open={this.state.projectAdded}
            message="Project added to the queue! Good luck young one"
            autoHideDuration={5000}
            onRequestClose={this.handleRequestClose}
          />
          <Snackbar
            open={this.state.projectDone}
            message="Project marked as done (I hope you are real...)"
            autoHideDuration={5000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}
