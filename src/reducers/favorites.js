export const ADD_FAVORITE = 'add favorite'
export const REMOVE_FAVORITE = 'remove favorite'

const initialState = []

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.payload]
    case REMOVE_FAVORITE:
      const newState = [...state]
      newState.splice(newState.indexOf(action.payload), 1)
      return newState
    default:
      return state
  }
}