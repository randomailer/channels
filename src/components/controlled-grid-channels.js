import React, { Component } from 'react'
import styled from 'styled-components'

import { Channel } from './channel'
import { allowedKeys } from '../utils/allowedKeys'

const COLUMN_WIDTH = 308

const Container = styled.ul`
  width: ${({ columns }) => columns * COLUMN_WIDTH}px;
  height: 100%;
`

export class ControlledGridChannels extends Component {

  constructor () {
    super()
    this.state = {
      x: 1,
      y: 1,
      shift: 0
    }
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  componentWillReceiveProps (nextProps) {
    const { lastCoords, active, channels, columns } = nextProps

    if (active) {
      document.addEventListener('keydown', this.handleKeyPress)
    } else {
      document.removeEventListener('keydown', this.handleKeyPress)
    }

    if (nextProps.lastCoords !== this.props.lastCoords) {
      let y = 1

      if (channels.length / columns >= lastCoords.y) {
        y = lastCoords.y
      } else if (lastCoords.y > channels.length / columns) {
        y = channels.length / columns
      }

      this.setState({
        x: lastCoords.x,
        y: y
      })
    }

    return true
  }

  handleKeyPress = (evt) => {
    const { rows, columns, channels } = this.props

    if (!allowedKeys[evt.key]) {
      return
    }
    evt.preventDefault()

    if (evt.key === allowedKeys.ArrowLeft) {
      if (this.state.x === 1) {
        this.props.onLeaveLeft && this.props.onLeaveLeft(this.state.x, this.state.y)
      } else {
        this.setState({ x: this.state.x - 1 })
      }
    } else if (evt.key === allowedKeys.ArrowUp) {
      if (this.state.y === 1) {
        if (this.state.shift) {
          this.setState({ shift: this.state.shift - 1 })
        }
      } else {
        this.setState({ y: this.state.y - 1 })
      }
    } else if (evt.key === allowedKeys.ArrowRight) {
      if (this.state.x === columns) {
        this.props.onLeaveRight && this.props.onLeaveRight(this.state.x, this.state.y)
      } else {
        this.setState({ x: this.state.x + 1 })
      }
    } else if (evt.key === allowedKeys.ArrowDown) {
      if (this.state.y === Math.min(rows, channels.length)) {
        const fits = rows * columns + (this.state.shift + 1) * columns <= channels.length
        if (fits) {
          this.setState({ shift: this.state.shift + 1 })
        }
      } else {
        this.setState({ y: this.state.y + 1 })
      }
    } else if (evt.key === allowedKeys.Enter) {
      this.props.onEnter && this.props.onEnter(this.activeChannel)
    }
  }


  render () {
    const { channels, columns, rows, favoritesById } = this.props
    const l = Math.min(channels.length, columns * rows + this.state.shift * columns)
    let x
    let y

    const channelComponents = []
    for (let i = this.state.shift * columns; i < l; i++) {
      if (!x || x === columns) {
        x = 1

        if (!y) {
          y = 1
        } else if (x === 1 && y < rows) {
          y++
        }

      } else if (x < columns) {
        x++
      }

      const active = this.state.x === x && this.state.y === y
      const channel = channels[i]
      const favorite = !!favoritesById[channel.id]

      if (active) {
        this.activeChannel = channel
      }

      channelComponents.push(<Channel
        key={`list${channel.id}`}
        i={i + 1}
        active={active && this.props.active}
        favorite={favorite}
        data={channel}
      />)
    }

    return (
      <Container columns={columns} onKeyDown={this.handleKeyPress}>
        {channelComponents}
      </Container>
    )
  }
}