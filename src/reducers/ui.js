export const CHANGE_VIEW = 'change view'

export const MODE_CHANNELS = 'mode channels'
export const MODE_FAVORITES = 'mode favorites'

const initialState = {
  mode: MODE_CHANNELS,
  lastCoords: {
    x: 1,
    y: 1
  }
}

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        mode: action.payload.mode,
        lastCoords: action.payload.coords
      }
    default:
      return state
  }
}