import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  addNewEntity,
  removeEntity,
} from '../../modules/annotator'

import '../../component/annotator.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import Highlightable from '../../component/highlightable/Highlightable'

// todo: the rest of labels are there https://spacy.io/api/annotation#named-entities
const labels = [
  {
    'label': 'Person',
    'description': 'People, including fictional.',
  },
  {
    'label': 'NORP',
    'description': 'Nationalities or religious or political groups.',
  },
  {
    'label': 'FAC',
    'description': 'Buildings, airports, highways, bridges, etc.',
  },
  {
    'label': 'ORG',
    'description': 'Companies, agencies, institutions, etc.',
  },
  {
    'label': 'GPE',
    'description': 'Countries, cities, states.',
  },
  {
    'label': 'LOC',
    'description': 'Non-GPE locations, mountain ranges, bodies of water.',
  },
  {
    'label': 'Product',
    'description': 'Objects, vehicles, foods, etc. (Not services.)',
  },
  {
    'label': 'Event',
    'description': 'Named hurricanes, battles, wars, sports events, etc.',
  },
  {
    'label': 'WORK_OF_ART',
    'description': 'Titles of books, songs, etc.',
  },
  {
    'label': 'LANGUAGE',
    'description': 'Any named language.',
  },
  {
    'label': 'DATE',
    'description': 'Absolute or relative dates or periods.',
  },
]

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

  rangeRenderer = (letterGroup, range, textCharIndex) => {
    return (<span className="selected-entity">{letterGroup}<span className="remove-selected-entity" onClick={() => {this.removeEntity(range)}}>❌</span></span>)
  }

  render = () => {
    const { text, entities } = this.props

    return (
      <Container className="annotator">
        <Row>
          <Col xs={12} md={12}>
            <div>
              {
                labels && labels.length > 0 && labels.map((({label, description}) => (
                  <OverlayTrigger
                    key={`overlay-trigger-label-${label}`}
                    placement="bottom"
                    overlay={
                      <Tooltip id={`tooltip-label-${label}`}>
                        {description}
                      </Tooltip>
                    }
                  >
                    <Badge variant="primary">{label}</Badge>
                  </OverlayTrigger>
                )
              ))}
            </div>
            <Highlightable ranges={entities}
              enabled={true}
              onTextHighlighted={this.onTextHighlightedCallback}
              id="highlightable"
              onMouseOverHighlightedWord={this.onMouseOverHighlightedWordCallback}
              rangeRenderer={this.rangeRenderer}
              text={text}
              className="annotator-area"
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = ({ annotator }) => ({
  text: annotator.text,
  entities: annotator.entities,
  isAddingEntity: annotator.isAddingEntity,
  isRemovingEntity: annotator.isRemovingEntity,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addNewEntity,
      removeEntity,
      changePage: () => push('/about-us'),
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
