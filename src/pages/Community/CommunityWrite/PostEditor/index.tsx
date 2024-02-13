import { ContentBlock, DraftEditorCommand, Editor, EditorState, RichUtils } from 'draft-js';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Post } from '../types';
import styled from 'styled-components';

interface PostEditorProps {
  value: EditorState;
  onChange: (...event: any[]) => void;
}

const PostEditor = ({ value, onChange }: PostEditorProps) => {
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext<Post>();

  const handleKeyCommand = useCallback(
    (command: DraftEditorCommand, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        setValue('content', newState);
        return 'handled';
      }

      return 'not-handled';
    },
    [setValue],
  );

  const getBlockStyle = useCallback((block: ContentBlock) => {
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
  }, []);

  return (
    <Container>
      <TitleContainer>
        <Title {...register('title', { required: '필수 입력 항목입니다.' })} placeholder="제목" />
        {errors.title && <ErrorMsg>{errors.title.message}</ErrorMsg>}
      </TitleContainer>
      <EditorContainer>
        <Editor
          editorState={value}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          blockStyleFn={getBlockStyle}
          placeholder="질문, 자랑, 공유 등 다양한 글을 작성해보세요."
        />
        {errors.content && <ErrorMsg>{errors.content.message}</ErrorMsg>}
      </EditorContainer>
    </Container>
  );
};

export default PostEditor;

const Container = styled.div`
  max-width: 1188px;
  width: 100%;
  flex-grow: 1;
  font-size: 16px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  & h1 {
    font-size: 20px;
  }
  & h2 {
    font-size: 18px;
  }
  & h3 {
    font-size: 14px;
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

  @media (${({ theme }) => theme.devices.mobile}) {
    margin-top: 48px;
  }
`;

const TitleContainer = styled.section`
  position: relative;

  padding: 0 20px;

  @media (${({ theme }) => theme.devices.mobile}) {
    padding: 0;
  }
`;

const Title = styled.input`
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  padding: 8px 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};

  @media (${({ theme }) => theme.devices.mobile}) {
    font-size: 24px;
  }
`;

const EditorContainer = styled.section`
  margin-top: 40px;
  position: relative;
  flex-grow: 1;

  .DraftEditor-editorContainer,
  .public-DraftEditor-content {
    height: 100%;
  }
  .DraftEditor-root {
    position: relative;
    height: 100%;
  }
  .public-DraftEditorPlaceholder-root {
    position: relative;
  }
  .public-DraftEditorPlaceholder-inner {
    color: ${({ theme }) => theme.colors.gray[300]};
    position: absolute;
  }
  .DraftEditor-editorContainer {
    background-color: rgba(255, 255, 255, 0);
    border-left: 0.1px solid transparent;
    position: relative;
    z-index: 1;
  }

  padding: 0 20px;

  @media (${({ theme }) => theme.devices.mobile}) {
    padding: 0;
  }
`;

const ErrorMsg = styled.p`
  position: absolute;
  bottom: -24px;
  color: ${({ theme }) => theme.colors.error};
`;
