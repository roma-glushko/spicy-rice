import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uuid from 'uuid';

import {
    addNewProject,
  } from '../../modules/project'

import { toaster } from 'evergreen-ui'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class NewProjectForm extends Component {
    constructor (props) {
        super(props)

        this.state = {
            id: uuid(),
            name: "",
            description: "",
        }
    }

    createNewProject = () => {
        const { addNewProject } = this.props

        addNewProject(this.state)

        toaster.success(`Project "${this.state.name}" has been created`)

        this.reset()
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }

    reset = () => {
        this.setState({
            name: "",
            description: "",
            id: uuid(),
        })
    }

    render = () => {
        const {isAddingProject} = this.props

        return (
            <div className="new-project-form-container">
                <Form className="new-project-form">
                    <Form.Group controlId="newProjectForm.ControlProjectName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control value={this.state.name} onChange={this.handleNameChange} type="project-name" placeholder="e.g. Tech News Sentimental Analysis" />
                    </Form.Group>
                    <Form.Group controlId="newProjectForm.ControlDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={this.state.description} onChange={this.handleDescriptionChange} as="textarea" rows="3" placeholder="What this project about?" />
                    </Form.Group>
                </Form>
                <p className="create-new-project-container">
                    <Button variant="info" disabled={isAddingProject} onClick={this.createNewProject}>
                        {isAddingProject ? "Creating.." : "Create Project"}
                    </Button>
                </p>
            </div>)
  }
}

const mapStateToProps = ({ project }) => ({
  isAddingProject: project.isAddingProject,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        addNewProject
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProjectForm)
