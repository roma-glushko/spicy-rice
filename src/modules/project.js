
import Dexie from 'dexie'
import db, { DB_NAME } from '../db'

export const SETUP_DEMO_DATA_REQUESTED = 'project/SETUP_DEMO_DATA_REQUESTED'
export const SETUP_DEMO_DATA = 'project/SETUP_DEMO_DATA'
export const SETUP_NO_DEMO_DATA = 'project/SETUP_NO_DEMO_DATA'
export const SETUP_DEMO_DATA_ERROR = 'project/SETUP_DEMO_DATA_ERROR'
export const LOAD_PROJECTS_REQUESTED = 'project/LOAD_PROJECTS_REQUESTED'
export const LOAD_PROJECTS = 'project/LOAD_PROJECTS'
export const ADD_NEW_PROJECT_REQUESTED = 'project/ADD_NEW_PROJECT_REQUESTED'
export const ADD_NEW_PROJECT = 'project/ADD_NEW_PROJECT'

// todo: the rest of labels are there https://spacy.io/api/annotation#named-entities
const defaultEntityCategories = [
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
  projects: [
    {
      id: "sample-project-abc-123",
      name: "Sample Project",
      description: "This is a sample project to show you how Spicy Rice works",
      entityCategories: defaultEntityCategories,
      sentences: [
        {
          text: "Magento empowers thousands of retailers and brands with the best eCommerce platforms and flexible cloud solutions to rapidly innovate and grow.",
          entities: []
        }
      ],
    }
  ],
  isSettingDemoData: false,
  wasDemoDataAlreadySetup: false,
  wasDemoDataSetup: false,
  isDemoDataSetupError: false,
  demoDataSetupError: "",
  isLoadingProject: false,
  isAddingProject: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROJECTS_REQUESTED:
      return {
        ...state,
        isLoadingProject: true,
      }

    case LOAD_PROJECTS:
      return {
        ...state,
        isLoadingProject: false,
        projects: action.projects
      }

    case ADD_NEW_PROJECT_REQUESTED:
      return {
        ...state,
        isLoadingProject: true,
      }

    case ADD_NEW_PROJECT:
      return {
        ...state,
        isAddingProject: false,
        projects: [
          ...state.projects,
          action.project,
        ],
      }

    case SETUP_DEMO_DATA_REQUESTED:
        return {
          ...state,
          isSettingDemoData: true,
        }

    case SETUP_DEMO_DATA:
        return {
          ...state,
          isSettingDemoData: false,
          wasDemoDataSetup: true
        }

    case SETUP_NO_DEMO_DATA:
        return {
          ...state,
          isSettingDemoData: false,
          wasDemoDataAlreadySetup: true
        }

    case SETUP_DEMO_DATA_ERROR:
        return {
          ...state,
          isSettingDemoData: false,
          isDemoDataSetupError: true,
          demoDataSetupError: action.errorMessage
        }

    default:
      return state
  }
}

export function setupDemoData() {
  return (dispatch) => {
    dispatch({
      type: SETUP_DEMO_DATA_REQUESTED
    })

    Dexie.exists(DB_NAME).then((exists) => {
      if (exists) {
        dispatch({
          type: SETUP_NO_DEMO_DATA,
        });

        dispatch(loadProjects())

        return
      }

      // setup demo data

      db().transaction('rw', db().projects, function () {
        db().projects.bulkAdd(initialState.projects);
      }).then(() => {
        dispatch({
          type: SETUP_DEMO_DATA,
        });
      }).catch(ex => {
        dispatch({
          type: SETUP_DEMO_DATA_ERROR,
          errorMessage: ex.message
        });
      });
      
    });
  };
}

export function loadProjects() {
  return (dispatch) => {
    dispatch({
      type: LOAD_PROJECTS_REQUESTED
    })

    db().table('projects')
      .toArray()
      .then((projects) => {
        dispatch({
          type: LOAD_PROJECTS,
          projects: projects,
        });
      });
  };
}

export const addNewProject = (projectData) => {
  return dispatch => {
    dispatch({
      type: ADD_NEW_PROJECT_REQUESTED
    })

    const newProject = {
      id: projectData.id,
      name: projectData.name,
      description: projectData.description,
      entityCategories: defaultEntityCategories,
      sentences: [],
    }

    db().table('projects')
    .add(newProject)
    .then((id) => {
      dispatch({
        type: ADD_NEW_PROJECT,
        project: newProject,
      })
    })
  }
}