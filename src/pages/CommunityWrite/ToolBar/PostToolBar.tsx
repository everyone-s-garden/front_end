import React, { MouseEvent, useState } from 'react';
import ToolBar from '.';
import Dropdown from '../Dropdown';
import { useFormContext } from 'react-hook-form';
import { BlockStyles, InlineStyles, Post } from '../types';
import { ArrowBelowIcon, BoldIcon, ItalicIcon, UnderlineIcon } from 'assets/community';
import { ALIGN_TYPE, SIZE_TYPE } from '../constants';
import { EditorState, RichUtils } from 'draft-js';
import styled from 'styled-components';

const postTypes = ['정보 공유', '텃밭 자랑', '질문하기', '기타'] as const;

interface PostToolBarProps {
  value: EditorState;
}

const PostToolBar = ({ value }: PostToolBarProps) => {
  const [fontSize, setFontSize] = useState('본문');
  const [align, setAlign] = useState<'LEFT' | 'CENTER' | 'RIGHT'>('LEFT');

  const {
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext<Post>();

  const toggleInline = (e: MouseEvent<HTMLElement>, type: InlineStyles) => {
    e.preventDefault();
    setValue('content', RichUtils.toggleInlineStyle(value, type));
  };

  const toggleBlock = (e: MouseEvent<HTMLElement>, type: BlockStyles) => {
    e.preventDefault();
    setValue('content', RichUtils.toggleBlockType(value, type));
  };

  const handleClickSize = (e: MouseEvent<HTMLElement>, key: keyof typeof SIZE_TYPE) => {
    toggleBlock(e, SIZE_TYPE[key]);
    setFontSize(key);
  };

  const handleClickAlign = (e: MouseEvent<HTMLElement>, type: 'LEFT' | 'CENTER' | 'RIGHT') => {
    toggleBlock(e, type);
    setAlign(type);
  };

  const postType = watch('postType');

  return (
    <ToolBar>
      <ToolBar.Group>
        <Dropdown>
          <Dropdown.Trigger>
            <ToolBar.Tool>
              <PostType errorState={!!errors.postType}>{postType}</PostType>
              <ArrowBelowIcon />
            </ToolBar.Tool>
          </Dropdown.Trigger>
          <Dropdown.Menu top={45}>
            {postTypes.map((type, index) => (
              <li
                key={index}
                onClick={() => {
                  setValue('postType', type);
                  clearErrors('postType');
                }}
              >
                <Dropdown.Item>{type}</Dropdown.Item>
              </li>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </ToolBar.Group>

      <ToolBar.Group>
        <Dropdown>
          <Dropdown.Trigger>
            <ToolBar.Tool>
              <span>{fontSize}</span>
              <ArrowBelowIcon />
            </ToolBar.Tool>
          </Dropdown.Trigger>
          <Dropdown.Menu top={45}>
            {Object.keys(SIZE_TYPE).map((key, index) => (
              <li key={index} onClick={e => handleClickSize(e, key as keyof typeof SIZE_TYPE)}>
                <Dropdown.Item>{key}</Dropdown.Item>
              </li>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </ToolBar.Group>

      <ToolBar.Group>
        <ToolBar.Tool>
          <button onClick={e => toggleInline(e, 'BOLD')}>
            <BoldIcon />
          </button>
        </ToolBar.Tool>
        <ToolBar.Tool>
          <button onClick={e => toggleInline(e, 'ITALIC')}>
            <ItalicIcon />
          </button>
        </ToolBar.Tool>
        <ToolBar.Tool>
          <button onClick={e => toggleInline(e, 'UNDERLINE')}>
            <UnderlineIcon />
          </button>
        </ToolBar.Tool>
      </ToolBar.Group>

      <ToolBar.Group>
        <Dropdown>
          <Dropdown.Trigger>
            <ToolBar.Tool>
              {ALIGN_TYPE[align]}
              <ArrowBelowIcon />
            </ToolBar.Tool>
          </Dropdown.Trigger>
          <Dropdown.Menu top={45}>
            {Object.keys(ALIGN_TYPE).map((key, index) => (
              <li key={index} onClick={e => handleClickAlign(e, key as 'LEFT' | 'CENTER' | 'RIGHT')}>
                <Dropdown.Item>{ALIGN_TYPE[key as 'LEFT' | 'CENTER' | 'RIGHT']}</Dropdown.Item>
              </li>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </ToolBar.Group>
    </ToolBar>
  );
};

export default PostToolBar;

const PostType = styled.span<{ errorState?: boolean }>`
  color: ${({ errorState, theme }) => (errorState ? theme.colors.error : '')};
`;
