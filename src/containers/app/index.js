import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <div>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">🍚Spicy Rice!</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about-us">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
)

export default App
