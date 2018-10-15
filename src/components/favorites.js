import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { ControlledGridChannels } from './controlled-grid-channels'
import { MODE_FAVORITES, MODE_CHANNELS } from '../reducers/ui'
import { changeView } from '../actions/changeView'
import { removeFavorite } from '../actions/removeFavorite'
import { getFavoritesById } from '../utils/getFavoriteById'

const FavoriteContainer = styled.div`
  display: inline-block;
  width: 304px;
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

class FavoritesComponent extends PureComponent {

  handleLeaveRight = (x, y) => {
    this.props.changeView({
      mode: MODE_CHANNELS,
      x,
      y
    })
  }

  handleEnter = (channel) => {
    if (this.props.channels.length === 1) {
      this.props.changeView({
        mode: MODE_CHANNELS,
        x: 1,
        y: 1
      })
    }
    this.props.removeFavorite(channel)
  }

  render () {
    const { channels, mode, lastCoords, favoritesById } = this.props

    return (
      <FavoriteContainer>
        <Header>Favorite channels ({channels.length})</Header>
        <ControlledGridChannelsContainer>
          <ControlledGridChannels
            channels={channels}
            favoritesById={favoritesById}
            columns={1}
            rows={8}
            onLeaveRight={this.handleLeaveRight}
            onEnter={this.handleEnter}
            active={mode === MODE_FAVORITES}
            lastCoords={lastCoords}
          />
        </ControlledGridChannelsContainer>
      </FavoriteContainer>
    )
  }
}

export const Favorites = connect(
  ({ favorites, ui }) => ({
    channels: favorites,
    favoritesById: getFavoritesById(favorites),
    mode: ui.mode,
    lastCoords: ui.lastCoords
  }), {
    changeView,
    removeFavorite
  }
)(FavoritesComponent)