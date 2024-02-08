import React, { MouseEvent, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { ContentBlock, DraftEditorCommand, Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';

type InlineStyles = 'BOLD' | 'ITALIC' | 'UNDERLINE' | string;
type BlockStyles = 'unstyled' | 'header-one' | 'header-two' | 'header-three' | string;

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleKeyCommand = useCallback((command: DraftEditorCommand, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }, []);

  console.log({ content: JSON.stringify(convertToRaw(editorState.getCurrentContent())) });

  const toggleInline = (e: MouseEvent<HTMLElement>, type: InlineStyles) => {
    e.preventDefault();
    console.log(type);
    setEditorState(RichUtils.toggleInlineStyle(editorState, type));
  };

  const toggleBlock = (e: MouseEvent<HTMLElement>, type: BlockStyles) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };

  const getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case 'LEFT':
        return 'align-left';
      case 'CENTER':
        return 'align-center';
      case 'RIGHT':
        return 'align-right';
      default:
        return '';
    }
  };

  return (
    <>
      <Tool>
        <button onClick={e => toggleBlock(e, 'unstyled')}>본문</button>
        <button onClick={e => toggleBlock(e, 'header-one')}>제목 1</button>
        <button onClick={e => toggleBlock(e, 'header-two')}>제목 2</button>
        <button onClick={e => toggleBlock(e, 'header-three')}>제목 3</button>
        <button onClick={e => toggleInline(e, 'BOLD')}>Bold</button>
        <button onClick={e => toggleInline(e, 'ITALIC')}>Italic</button>
        <button onClick={e => toggleInline(e, 'UNDERLINE')}>Underline</button>
        <button onClick={e => toggleBlock(e, 'RIGHT')}>오른</button>
        <button onClick={e => toggleBlock(e, 'CENTER')}>가운</button>
      </Tool>

      <Content>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          blockStyleFn={getBlockStyle}
        />
      </Content>
    </>
  );
};

export default DraftEditor;

const Tool = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  button {
    padding: 10px;
    border: 1px solid #000;
  }
`;

const Content = styled.div`
  & h1 {
    font-size: 22px;
  }
  & h2 {
    font-size: 20px;
  }
  & h3 {
    font-size: 18px;
  }
  & p {
    font-size: 16px;
  }
  & .align-left div {
    text-align: left;
  }
  & .align-center div {
    text-align: center;
  }
  & .align-right div {
    text-align: right;
  }
`;
