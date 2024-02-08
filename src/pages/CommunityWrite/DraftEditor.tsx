import React, { MouseEvent, useCallback } from 'react';
import { useState } from 'react';
import { DraftEditorCommand, Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

type InlineStyles = 'BOLD' | 'ITALIC' | 'UNDERLINE';
type BlockStyles = 'unstyled' | 'header-one' | 'header-two' | 'header-three';

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

  const toggleInline = (e: MouseEvent<HTMLElement>, type: InlineStyles) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, type));
  };

  const toggleBlock = (e: MouseEvent<HTMLElement>, type: BlockStyles) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };

  return (
    <>
      <button onClick={e => toggleBlock(e, 'unstyled')}>본문</button>
      <button onClick={e => toggleBlock(e, 'header-one')}>제목 1</button>
      <button onClick={e => toggleBlock(e, 'header-two')}>제목 2</button>
      <button onClick={e => toggleBlock(e, 'header-three')}>제목 3</button>
      <button onClick={e => toggleInline(e, 'BOLD')}>Bdsfsd</button>
      <button onClick={e => toggleInline(e, 'ITALIC')}>Ifdsfds</button>
      <button onClick={e => toggleInline(e, 'UNDERLINE')}>Udsfds</button>
      <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} />
    </>
  );
};

export default DraftEditor;
