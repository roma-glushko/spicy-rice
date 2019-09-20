export const ADD_NEW_ENTITY_REQUESTED = 'annotator/ADD_NEW_ENTITY_REQUESTED'
export const ADD_NEW_ENTITY = 'annotator/ADD_NEW_ENTITY'
export const REMOVE_ENTITY_REQUESTED = 'annotator/REMOVE_ENTITY_REQUESTED'
export const REMOVE_ENTITY = 'annotator/REMOVE_ENTITY'
export const SELECT_ENTITY_CATEGORY_REQUESTED = 'annotator/SELECT_ENTITY_CATEGORY_REQUESTED'
export const SELECT_ENTITY_CATEGORY = 'annotator/SELECT_ENTITY_CATEGORY'

// todo: the rest of labels are there https://spacy.io/api/annotation#named-entities
const entityCategories = [
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
    'label': 'Work_of_art',
    'description': 'Titles of books, songs, etc.',
  },
  {
    'label': 'Language',
    'description': 'Any named language.',
  },
  {
    'label': 'Date',
    'description': 'Absolute or relative dates or periods.',
  },
  {
    'label': 'Time',
    'description': 'Times smaller than a day.',
  },
  {
    'label': 'Percent',
    'description': 'Percentage, including ”%“.',
  },
  {
    'label': 'Money',
    'description': 'Monetary values, including unit.',
  },
  {
    'label': 'Quantity',
    'description': 'Measurements, as of weight or distance.',
  },
  {
    'label': 'Ordinal',
    'description': '“first”, “second”, etc.',
  },
  {
    'label': 'Cardinal',
    'description': 'Numerals that do not fall under another type.',
  },
]

const initialState = {
  text: 'Magento empowers thousands of retailers and brands with the best eCommerce platforms and flexible cloud solutions to rapidly innovate and grow.',
  entities: [],
  currentEntityCategory: 'Person',
  entityCategories: entityCategories,
  isAddingEntity: false,
  isSelectingEntityCategory: false,
  isRemovingEntity: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_ENTITY_REQUESTED:
      return {
        ...state,
        isAddingEntity: true,
      }

    case ADD_NEW_ENTITY:
      return {
        ...state,
        isAddingEntity: false,
        entities: [
          ...state.entities,
          action.entity,
        ],
      }

    case REMOVE_ENTITY_REQUESTED:
      return {
        ...state,
        isRemovingEntity: true,
      }

    case REMOVE_ENTITY:
      return {
        ...state,
        isRemovingEntity: false,
        entities: state.entities.filter(entity =>
          entity.data.id == action.entity.data.id && 
          entity.text !== action.entity.text &&
          entity.start !== action.entity.start && 
          entity.end !== action.entity.end
        )
      }

    case SELECT_ENTITY_CATEGORY_REQUESTED:
        return {
          ...state,
          isSelectingEntityCategory: true,
        }
  
    case SELECT_ENTITY_CATEGORY:
      return {
        ...state,
        isSelectingEntityCategory: false,
        currentEntityCategory: action.entityCategory,
      }

    default:
      return state
  }
}

export const addNewEntity = (entity) => {
  return dispatch => {
    dispatch({
      type: ADD_NEW_ENTITY_REQUESTED
    })

    dispatch({
      type: ADD_NEW_ENTITY,
      entity,
    })
  }
}

export const removeEntity = (entity) => {
  return dispatch => {
    // todo: implement
    dispatch({
      type: REMOVE_ENTITY_REQUESTED
    })

    dispatch({
      type: REMOVE_ENTITY,
      entity,
    })
  }
}

export const selectEntityCategory = (entityCategory) => {
  return dispatch => {
    dispatch({
      type: SELECT_ENTITY_CATEGORY_REQUESTED
    })

    dispatch({
      type: SELECT_ENTITY_CATEGORY,
      entityCategory,
    })
  }
}