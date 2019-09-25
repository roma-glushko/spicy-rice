import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './project-view.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ProgressBar from 'react-bootstrap/ProgressBar'

class ProjectView extends Component {

  getCurrentProject = () => {
    const { projects, match: {params: { projectId }} } = this.props

    return projects.find(project => projectId === project.id)
  }

  render = () => {
    const { areProjectsLoaded } = this.props
    const currentProject = this.getCurrentProject()

    if (!areProjectsLoaded) {
      return (<div>Project is loading...</div>)
    }

    return (
      <div>
        <Container className="projects-container">
          <Row>
            <Col><h1>{currentProject.name}</h1></Col>
          </Row>
          <Row>
            <Col>
              <Tab.Container className="project-details" defaultActiveKey="info">
                <Row>
                  <Col sm={12}>
                    <Nav className="project-tabs" variant="pills">
                      <Nav.Item>
                        <Nav.Link eventKey="info">Information</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="annotation">Annotations</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="export">Export</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="info">
                        <Container>
                          <Row>
                            <Col lg={4}>
                              <Card key={currentProject.id}>
                                <Card.Body>
                                    <Card.Title>{currentProject.name}</Card.Title>
                                    <Card.Text>
                                    {currentProject.description}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                  <ListGroupItem>Sentences: 1</ListGroupItem>
                                  <ListGroupItem>Words: 100</ListGroupItem>
                                  <ListGroupItem>Progress: 40%</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                  <Card.Link href={`/project/${currentProject.id}/remove`}>Remove</Card.Link>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col lg={8}></Col>
                          </Row>
                        </Container>
                      </Tab.Pane>
                      <Tab.Pane eventKey="annotation">
                          <Container>
                          <Row>
                            <Col className="project-annotation-progress-container"><ProgressBar className="project-annotation-progress" now={60} /></Col>
                          </Row>
                          <Row>
                            <Col lg={4}>
                              <ListGroup className="pieces" variant="flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                              </ListGroup>
                            </Col>
                            <Col lg={8}>

                            </Col>
                          </Row>
                        </Container>
                      </Tab.Pane>
                      <Tab.Pane eventKey="export">
                        test 3
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({project}) => ({
  projects: project.projects,
  areProjectsLoaded: project.areProjectsLoaded
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
