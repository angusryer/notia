import React from "react";
import styled from "styled-components";
import MenuItem from "../MenuItem/MenuItem";

export default function TagMenu({ caretPosition, tags }) {
  return (
    <TagMenuContainer position={caretPosition}>
      {tags.map((tag) => (
        <MenuItem key={tag}>{tag}</MenuItem>
      ))}
    </TagMenuContainer>
  );
}

const TagMenuContainer = styled.ul`
  height: auto;
  width: 60px;
  padding: 0;
  margin: 0;
  position: absolute;
  left: ${({ position }) => position.left};
  top: ${({ position }) => position.top};
`;
