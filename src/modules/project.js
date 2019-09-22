
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
  isAddingProject: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_PROJECT_REQUESTED:
      return {
        ...state,
        isAddingProject: true,
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

    default:
      return state
  }
}

export const addNewProject = (projectData) => {
  return dispatch => {
    dispatch({
      type: ADD_NEW_PROJECT_REQUESTED
    })

    dispatch({
      type: ADD_NEW_PROJECT,
      project: {
        id: projectData.id,
        name: projectData.name,
        description: projectData.description,
        entityCategories: defaultEntityCategories,
        sentences: [],
      },
    })
  }
}