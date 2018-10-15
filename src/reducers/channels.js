

export const LOAD_CHANNELS = 'load channels'

const initialState = []


export const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CHANNELS:
      return action.payload
    default:
      return state
  }
}