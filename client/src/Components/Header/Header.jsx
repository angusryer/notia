import React from 'react'
import styled from 'styled-components'

export default function Header() {
  return (
    <HeaderContainer>
      <Title>notia</Title>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  height: 60px;
  background: rgba(10, 10, 10, 0.1);
  display: flex;
  align-items: center;
  padding-left: 10px;
`

const Title = styled.h2`
  font-family: "Avenir"
`