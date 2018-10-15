import { createSelector } from 'reselect'

const getFavorites = favorites => favorites

export const getFavoritesById = createSelector(
  getFavorites,
  items => items.reduce((memo, item) => {
    memo[item.id] = item

    return memo
  }, {})
)