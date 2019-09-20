export const ADD_NEW_ENTITY_REQUESTED = 'annotator/ADD_NEW_ENTITY_REQUESTED'
export const ADD_NEW_ENTITY = 'annotator/ADD_NEW_ENTITY'
export const REMOVE_ENTITY_REQUESTED = 'annotator/REMOVE_ENTITY_REQUESTED'
export const REMOVE_ENTITY = 'annotator/REMOVE_ENTITY'

const initialState = {
  text: 'Magento empowers thousands of retailers and brands with the best eCommerce platforms and flexible cloud solutions to rapidly innovate and grow.',
  entities: [],
  isAddingEntity: false,
  isRemovingEntity: false
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
          entity.data.id !== action.entity.data.id
        )
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
