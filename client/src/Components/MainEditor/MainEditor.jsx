import React, { useState, useRef, useEffect } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import TagMenu from '../TagMenu/TagMenu'
import styled from "styled-components";

export default function MainEditor({tags}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [borderActive, setBorderActive] = useState(false);
  const [caretPosition, setCaretPosition] = useState({});
  const [activeMenu, setActiveMenu] = useState(false);
  const editor = useRef(null);

  const focusEditor = (bool) => {
    if (bool) {
      editor.current.focus();
    }
    setBorderActive(bool);
  };

  const onKeyPress = (editorState) => {
    const textBlocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const lastBlock = textBlocks[textBlocks.length - 1].text.split("");
    const lastTwoChars = lastBlock
      .slice(lastBlock.length - 2, lastBlock.length)
      .join("");
    if (lastTwoChars === ",,") {
      setCaretPosition(getCaretTopPoint());
      setActiveMenu(true);
    } else {
      setCaretPosition({});
      setActiveMenu(false);
    }
    setEditorState(editorState);
  };

  const onKeyComboPress = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
    }
  };

  useEffect(() => {
    focusEditor(true);
  }, []);

  return (
    <EditorContainer
      borderColour={borderActive ? "lightgrey" : "none"}
      onClick={() => focusEditor(true)}
      onBlur={() => focusEditor(false)}
    >
      {activeMenu && <TagMenu caretPosition={caretPosition} tags={tags} />}
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={(editorState) => onKeyPress(editorState)}
        handleKeyCommand={(command, editorState) =>
          onKeyComboPress(command, editorState)
        }
      />
    </EditorContainer>
  );
}

const EditorContainer = styled.div`
  margin: 5px;
  padding: 5px;
  border: 1px solid ${props => props.borderColour};
  border-radius: 4px;
  height: calc(100vh - 80px);
`;

/**
 * Get the caret position in all cases
 *
 * @returns {object} left, top distance in pixels
 */
function getCaretTopPoint() {
  const sel = document.getSelection();
  const r = sel.getRangeAt(0);
  let rect;
  let r2;
  // supposed to be textNode in most cases
  // but div[contenteditable] when empty
  const node = r.startContainer;
  const offset = r.startOffset;
  if (offset > 0) {
    // new range, don't influence DOM state
    r2 = document.createRange();
    r2.setStart(node, offset - 1);
    r2.setEnd(node, offset);
    // https://developer.mozilla.org/en-US/docs/Web/API/range.getBoundingClientRect
    // IE9, Safari?(but look good in Safari 8)
    rect = r2.getBoundingClientRect();
    return { left: rect.right, top: rect.top };
  } else if (offset < node.length) {
    r2 = document.createRange();
    // similar but select next on letter
    r2.setStart(node, offset);
    r2.setEnd(node, offset + 1);
    rect = r2.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  } else {
    // textNode has length
    // https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
    rect = node.getBoundingClientRect();
    const styles = getComputedStyle(node);
    const lineHeight = parseInt(styles.lineHeight);
    const fontSize = parseInt(styles.fontSize);
    // roughly half the whitespace... but not exactly
    const delta = (lineHeight - fontSize) / 2;
    return { left: rect.left, top: rect.top + delta };
  }
}
