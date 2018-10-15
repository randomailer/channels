import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadChannels } from './actions/loadChannels'
import { ChannelsList } from './components/channels-list'
import styled, { injectGlobal } from 'styled-components'
import { Favorites } from './components/favorites'
import './reset.css'

injectGlobal`

  #root {
    height: 100%;
  }
  html, body {
    font-family: 'Open Sans', sans-serif;
    height: 100%;
  }
`

const AppContainer = styled.div`
  display: flex;
  background: #000;
  width: 100%;
  height: 100%;
`

class AppComponent extends Component {

  componentDidMount() {
    this.props.loadChannels()
  }

  render() {
    return (
      <AppContainer>
        <Favorites/>
        <ChannelsList/>
      </AppContainer>
    );
  }
}

export const App = connect(null, {
  loadChannels
})(AppComponent)
