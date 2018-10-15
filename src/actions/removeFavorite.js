import { REMOVE_FAVORITE } from '../reducers/favorites'

export const removeFavorite = (channel) => {
  return {
    type: REMOVE_FAVORITE,
    payload: channel
  }
}