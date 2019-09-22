import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './home.css';
import NewProjectForm from '../../component/new-project-form';
import ProjectGridItem from '../../component/project-grid-item';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Image from 'react-bootstrap/Image'

class Home extends Component {

  render = () => {
    const { projects } = this.props;

    const projectCount = projects.length;
    const projectToShow = projects.slice(-2) // last two added projects

    return (
      <div>
        <Container className="manage-projects-jumbotron-container">
          <Row>
            <Col>
              <Jumbotron>
                <Image className="jumbotron-logo" src="/favicon/favicon.png" roundedCircle />
                <h1>Spicy Rice!</h1>
                <p className="jumbotron-description">An open source text annotator (NER) for your tiny/hobby NLP projects.</p>
                <div className="jumbotron-bagde-container">
                  <Badge variant="info">zero-configuration</Badge>
                  <Badge variant="info">cross-platform</Badge>
                  <Badge variant="info">no-backend</Badge>
                </div>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
        <Container className="row-divided manage-projects-container">
          <Row>
            <Col xs={12} lg={6} className="column-one">
              <h2>New Project</h2>
              <NewProjectForm />
            </Col>
            <div className="vertical-divider">or</div>
            <Col xs={12} lg={6} className="column-two">
              <h2>Existing Projects</h2>
              <div className="project-grid-container">
                {projectToShow && projectToShow.map((project) => (
                  <ProjectGridItem project={project} />
                ))}
                {
                  projectCount > 2 && (
                    <div className="all-projects-container">
                      <Button variant="info">All Projects</Button>                    
                    </div>
                  )
                }
              </div>
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
)(Home)
