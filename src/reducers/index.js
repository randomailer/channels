import { channelsReducer } from './channels'
import { favoritesReducer } from './favorites'
import { uiReducer } from './ui'

export const reducers = {
  channels: channelsReducer,
  favorites: favoritesReducer,
  ui: uiReducer
}