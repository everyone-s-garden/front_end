import React, { useState } from 'react';
import styled from 'styled-components';

import { BREAK_POINT, COLOR, FONT_WEIGHT } from 'constants/style';
import SelectOption from './SelectOption';
import arrowIcon from 'assets/select-arrow.svg';

function SelectList() {
  const [title, setTitle] = useState<string>('둘다 표시');
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const options = ['공공', '개인', '둘다 표시'];

  const renderOptions = options.map((option, index) => {
    return <SelectOption key={index} title={option} setTitle={setTitle} />;
  });

  return (
    <SelectDiv>
      <SelectBtn onFocus={() => setIsListOpen(true)} onBlur={() => setIsListOpen(false)}>
        {title}
        <ArrowIcon src={arrowIcon} alt="펼치기" isListOpen={isListOpen} />
      </SelectBtn>

      <OptionList isListOpen={isListOpen} tabIndex={-1}>
        {renderOptions}
      </OptionList>
    </SelectDiv>
  );
}

export default SelectList;

const SelectDiv = styled.div`
  width: 92px;
  display: relative;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const SelectBtn = styled.button`
  padding: 8px 14px;
  width: 92px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: ${FONT_WEIGHT.MEDIUM};
  color: #5a8534;
  background-color: #ebf6df;
  border-radius: 7px;
`;

const ArrowIcon = styled.img<{ isListOpen: boolean }>`
  transform: ${props => (props.isListOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: all 0.3s ease-in;
`;

const OptionList = styled.ul<{ isListOpen: boolean }>`
  z-index: 10;
  position: absolute;
  width: 92px;
  max-height: 200px;
  overflow-y: auto;
  font-size: 14px;
  font-weight: ${FONT_WEIGHT.MEDIUM};
  border-radius: 6px;
  background-color: ${COLOR.BACKGROUND};
  opacity: ${props => (props.isListOpen ? '1' : '0')};
  visibility: ${props => (props.isListOpen ? 'visible' : 'hidden')};
  transition: all 0.2s ease-in;
`;
