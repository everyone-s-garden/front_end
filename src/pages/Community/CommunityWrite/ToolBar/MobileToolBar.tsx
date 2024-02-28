import React, { MouseEvent, useState } from 'react';
import ToolBar from '.';
import { useFormContext } from 'react-hook-form';
import { BlockStyles, InlineStyles, Post } from '../types';
import { ArrowBelowIcon, BoldIcon, ItalicIcon, UnderlineIcon } from 'assets/community';
import { ALIGN_TYPE, SIZE_TYPE } from '../constants';
import { EditorState, RichUtils } from 'draft-js';
import styled from 'styled-components';
import Dropdown from 'components/Dropdown';

interface MobileToolBarProps {
  value: EditorState;
}

const alignArr = ['LEFT', 'CENTER', 'RIGHT'] as const;

const MobileToolBar = ({ value }: MobileToolBarProps) => {
  const [fontSize, setFontSize] = useState('본문');
  const [alignIdx, setAlignIdx] = useState(0);

  const { setValue } = useFormContext<Post>();

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

  const handleClickAlign = (e: MouseEvent<HTMLElement>, idx: number) => {
    const index = idx % 3;
    const type = alignArr[index];

    toggleBlock(e, type);
    setAlignIdx(index);
  };

  return (
    <Container>
      <ToolBar>
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
                <SizeLi key={index} onClick={e => handleClickSize(e, key as keyof typeof SIZE_TYPE)}>
                  <Dropdown.Item>{key}</Dropdown.Item>
                </SizeLi>
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
          <ToolBar.Tool>
            <button onClick={e => handleClickAlign(e, alignIdx + 1)}>{ALIGN_TYPE[alignArr[alignIdx]]}</button>
          </ToolBar.Tool>
        </ToolBar.Group>
      </ToolBar>
    </Container>
  );
};

export default MobileToolBar;

const Container = styled.div`
  @media (${({ theme }) => theme.devices.mobile}) {
    display: none;
  }
`;

const SizeLi = styled.li`
  & button {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }

  &:nth-child(2) {
    & button {
      font-size: 20px;
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
  }

  &:nth-child(3) {
    & button {
      font-size: 18px;
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }
  }

  &:nth-child(4) {
    & button {
      font-size: 14px;
    }
  }
`;
