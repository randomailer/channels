import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ControlledGridChannels } from './controlled-grid-channels'
import { MODE_FAVORITES, MODE_CHANNELS } from '../reducers/ui'
import { changeView } from '../actions/changeView'
import { addFavorite } from '../actions/addFavorite'
import { removeFavorite } from '../actions/removeFavorite'
import { getFavoritesById } from '../utils/getFavoriteById'


const COLUMN_WIDTH = 304

const ChannelListBlock = styled.div`
  display: inline-block;
  width: ${({ columns }) => (columns * COLUMN_WIDTH)}px;
  margin-left: 32px;
  position: relative;
`

const ControlledGridChannelsContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 32px;
  bottom: 0;
`

const Header = styled.h2`
  color: #fff;
  margin: 8px 0 0;
  text-align: center;
`

class ChannelsListComponent extends PureComponent {

  handleLeaveLeft = (x, y) => {
    this.props.changeView({
      mode: MODE_FAVORITES,
      x,
      y
    })
  }

  handleEnter = (channel) => {
    if (this.props.favoritesById[channel.id]) {
      this.props.removeFavorite(channel)
    } else {
      this.props.addFavorite(channel)
    }
  }

  render () {
    const { channels, mode, lastCoords, favoritesById } = this.props

    return (
      <ChannelListBlock columns={2}>
        <Header>All channels</Header>
        <ControlledGridChannelsContainer>
          <ControlledGridChannels
            channels={channels}
            favoritesById={favoritesById}
            columns={2}
            rows={8}
            onLeaveLeft={this.handleLeaveLeft}
            onEnter={this.handleEnter}
            active={mode === MODE_CHANNELS}
            lastCoords={lastCoords}
          />
        </ControlledGridChannelsContainer>
      </ChannelListBlock>
    )
  }
}

export const ChannelsList = connect(
  ({ channels, ui, favorites }) => ({
    channels,
    favoritesById: getFavoritesById(favorites),
    mode: ui.mode,
    lastCoords: ui.lastCoords
  }), {
    changeView,
    addFavorite,
    removeFavorite
  }
)(ChannelsListComponent)