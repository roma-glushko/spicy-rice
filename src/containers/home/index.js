import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  addNewEntity,
  removeEntity,
  selectEntityCategory,
} from '../../modules/annotator'

import '../../component/annotator.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import Highlightable from '../../component/highlightable/Highlightable'

class Home extends Component {

  onTextHighlightedCallback = (newRange) => {
    const { addNewEntity } = this.props
    
    addNewEntity(newRange)
  }
  
  onMouseOverHighlightedWordCallback = (e) => {
    console.log(e)
  }
  
  removeEntity = (entity) => {
    const { removeEntity } = this.props

    removeEntity(entity)
  }

  rangeRenderer = (letterGroup, range) => {
    const { currentEntityCategory } = this.props

    return (
      <span className="entity-selection-container">
        {letterGroup}
        <span className="entity-selection-info">
          <span className="entity-label">{currentEntityCategory}</span>
          <span className="remove-entity-selection" onClick={() => {this.removeEntity(range)}}>×</span>
        </span>
      </span>)
  }

  render = () => {
    const { text, currentEntityCategory, entityCategories, entities, selectEntityCategory } = this.props

    return (
      <Container className="annotator">
        <Row>
          <Col xs={12} md={{"span": 8, "offset": 2}}>
            <div className="entity-container">
              {
                entityCategories && entityCategories.length > 0 && entityCategories.map((({label, description}) => (
                  <OverlayTrigger
                    key={`overlay-trigger-label-${label}`}
                    placement="bottom"
                    overlay={
                      <Tooltip id={`tooltip-label-${label}`}>
                        {description}
                      </Tooltip>
                    }
                  >
                    <span onClick={() => {selectEntityCategory(label)}} className={`entity ${currentEntityCategory == label ? 'selected' : ''}`}>{label}</span>
                  </OverlayTrigger>
                )
              ))}
            </div>
            <div className="text-container">
              <Highlightable ranges={entities}
                enabled={true}
                onTextHighlighted={this.onTextHighlightedCallback}
                id="highlightable"
                onMouseOverHighlightedWord={this.onMouseOverHighlightedWordCallback}
                rangeRenderer={this.rangeRenderer}
                text={text}
              />
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = ({ annotator }) => ({
  text: annotator.text,
  currentEntityCategory: annotator.currentEntityCategory,
  entityCategories: annotator.entityCategories,
  entities: annotator.entities,
  isAddingEntity: annotator.isAddingEntity,
  isRemovingEntity: annotator.isRemovingEntity,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addNewEntity,
      removeEntity,
      selectEntityCategory,
      changePage: () => push('/about-us'),
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
