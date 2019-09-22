import React, { Component }  from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  setupDemoData,
} from '../../modules/project'

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

import './global.css';
import Home from '../home'
import Projects from '../projects'
import ProjectView from '../project-view'
import AnnotateProject from '../annotate-project'
import About from '../about'

class App extends Component {

  getPageClass = () => {
    const { currentPath } = this.props
    
    if (!currentPath || currentPath.length === 0) {
      return ''
    }
    
    if (currentPath === '/') {
      return 'page-manage-projects'
    }

    return 'page' + currentPath.split("/").join("-")
  }

  componentDidMount() {
    const { setupDemoData } = this.props

    setupDemoData()
  }

  render = () => {
    const pageClass = this.getPageClass()

    return (
      <div className={`app-container ${pageClass}`}>
        <div className="navigation">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/"><span role="img" aria-label="Rice">🍚</span>Spicy Rice!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/projects">Projects</Nav.Link>
                <Nav.Link href="/about-us">About</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/projects">Projects</Breadcrumb.Item>
            <Breadcrumb.Item active>Sample NLP project</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <main className="page-container">
          <Route exact path="/" component={Home} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/project/:projectId?/view" component={ProjectView} />
          <Route exact path="/project/:projectId?/annotate" component={AnnotateProject} />
          <Route exact path="/about-us" component={About} />
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ router }) => ({
  currentPath: router.location.pathname,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setupDemoData
    },
    dispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)