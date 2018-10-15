import { createSelector } from 'reselect'

const levels = {
  sd: 1,
  hd: 2,
  uhd: 3
}

const qualitiesSelector = channel => channel.qualities

export const getMaxQuality = createSelector(
  qualitiesSelector,
  items => {
    let maxQuality
    items
      .forEach(item => {
        if (
          item.availability === 'available' &&
          item.logo_token &&
          (!maxQuality || levels[maxQuality.level] < levels[item])
        ) {
          maxQuality = item
        }
      });

    return maxQuality
  }
)