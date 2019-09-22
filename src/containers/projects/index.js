import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './projects.css';

import ProjectGridItem from '../../component/project-grid-item';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardColumns from 'react-bootstrap/CardColumns'

class Projects extends Component {

  render = () => {
    const {projects} = this.props

    return (
      <div>
        <Container className="projects-container">
          <Row>
            <Col>
              <h1>Projects</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <CardColumns>
              {
                projects && projects.length > 0 && projects.map((project) => (
                    <ProjectGridItem project={project} />
                ))
              }
              </CardColumns>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ project }) => ({
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
)(Projects)
