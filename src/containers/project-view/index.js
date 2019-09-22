import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './project-view.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class ProjectView extends Component {

  constructor (props) {
    super(props)

    const { projects, match: {params: { projectId }} } = props
    const currentProject = projects.find(project => project.id === projectId)

    this.state = {
      projectId,
      currentProject
    }
  }

  render = () => {
    const { currentProject } = this.state

    console.log(this.state)

    return (
      <div>
        <Container className="projects-container">
          <Row>
            <Col>
              <h1>Project "{currentProject.name}"</h1>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({project}) => ({
  projects: project.projects,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectView)
