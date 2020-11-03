import React from "react";
import styled from 'styled-components'

export default function MenuItem({ children }) {
  return <BaseMenuItem>{children}</BaseMenuItem>;
}

const BaseMenuItem = styled.li`
  list-style-type: none;
`