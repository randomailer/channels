import React from 'react'
import styled from 'styled-components'

import { getMaxQuality } from '../utils/getMaxQuality'

const ChannelContainer = styled.li`
  display: inline-block;
  background: #dadada;
  border-radius: 3px;
  list-style: none;
  width: 300px;
  height: 70px;
  position: relative;
  margin: 8px 0 0 8px;

  ${({ active }) => active && `
  &::before {
    content: '';
    position: absolute;
    border: 2px solid;
    border-color: rgba(14 ,57 ,232 , 1);
    border-radius: 6px;
    box-shadow: 0px 0px 36px 7px rgba(14 ,57 ,232 , .7);
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
  }`}
`

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`

const ChannelNumber = styled.div`
  display: inline-block;
  background: #464646;
  color: #fff;
  border-radius: 3px;
  font-weight: bold;
  padding: 2px 5px;
  font-size: 18px;
  margin-left: 8px;
`

const Logo = styled.img`
  width: 59px;
  margin-left: 16px
`

const ChannelName = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 8px;
  flex-grow: 2;
`

const Favorite = styled.div`
  &::before {
    color: #ff9900;
    content: '${({ checked }) => checked ? '★' : '☆'}';
    font-size: 24px;
    margin-right: 8px;
  }
`

const Minus = styled.div`
  &::before {
    content: '−';
    margin-right: 8px;
  }
`

const Sort = styled.div`
  &::before {
    content: '↕';
    margin-right: 8px;
  }
`

export const Channel = (props) => {
  const { i, minus, sort, active, favorite } = props
  const { title } = props.data
  const maxQuality = getMaxQuality(props.data)
  const logoUrl = `https://images.zattic.com/logos/${maxQuality.logo_token}/white/240x135.png`

  return (
    <ChannelContainer active={active}>
      <InfoContainer>
        <ChannelNumber>{i.toString().padStart(3, '0')}</ChannelNumber>
        <Logo src={logoUrl} alt={title} width="59" />
        <ChannelName>{title}</ChannelName>
        <Favorite checked={favorite} />
        {minus && <Minus />}
        {sort && <Sort />}
      </InfoContainer>
    </ChannelContainer>
  )
}