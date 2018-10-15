import { getMaxQuality } from './getMaxQuality'

export const filterDuplicateChannels = (channels) => {
  const channelsById = {}
  channels.forEach(channel => {
    if (!channelsById[channel.id] && getMaxQuality(channel)) {
      channelsById[channel.id] = channel
    }
  })

  return Object.values(channelsById)
}
