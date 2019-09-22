import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card'

class ProjectGridItem extends Component {
    render = () => {
        const {project} = this.props

        return (
            <Card key={project.id}>
                <Card.Body>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Text>
                    {project.description}
                    </Card.Text>
                    <Card.Link href={`/project/${project.id}/view`}>Open</Card.Link>
                    <Card.Link href={`/project/${project.id}/remove`}>Remove</Card.Link>
                </Card.Body>
            </Card>)
  }
}

const mapStateToProps = ({ project }) => ({
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

ProjectGridItem.propTypes = {
    project: PropTypes.element.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectGridItem)
