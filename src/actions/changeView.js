import { CHANGE_VIEW } from '../reducers/ui'

export const changeView = ({ mode, x, y }) => {
  return {
    type: CHANGE_VIEW,
    payload: {
      mode,
      coords: {
        x,
        y
      }
    }
  }
}