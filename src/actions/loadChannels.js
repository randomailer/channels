import { LOAD_CHANNELS } from '../reducers/channels'
import { filterDuplicateChannels } from '../utils/filterDuplicateChannels'
import { addFavorite } from '../actions/addFavorite'


export const loadChannels = () => async (dispatch) => {
  try {
    const { channels } = await fetch('/channels.json')
      .then(resp => resp.json())

    const filteredChanels = filterDuplicateChannels(channels)

    dispatch({
      type: LOAD_CHANNELS,
      payload: filteredChanels
    })

    const randomFav = [
      filteredChanels[0],
      filteredChanels[5],
      filteredChanels[6],
      filteredChanels[7],
      filteredChanels[9],
      filteredChanels[10],
      filteredChanels[11],
      filteredChanels[12],
      filteredChanels[18],
    ]

    randomFav.forEach(channel => {
      dispatch(addFavorite(channel))
    })

  } catch (err) {
    console.log(err)
    alert('channels not available')
  }
}