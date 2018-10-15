import { ADD_FAVORITE } from '../reducers/favorites'

export const addFavorite = (channel) => {
  return {
    type: ADD_FAVORITE,
    payload: channel
  }
}