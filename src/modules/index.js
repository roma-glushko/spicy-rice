import { combineReducers } from 'redux'
import project from './project'
import annotator from './annotator'

export default combineReducers({
  project,
  annotator
})
