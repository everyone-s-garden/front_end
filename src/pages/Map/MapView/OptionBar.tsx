import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { searchTypeAtom } from 'recoil/atom';
import { BREAK_POINT, COLOR, FONT_WEIGHT } from 'constants/style';
import SelectList from 'components/SelectList';

function OptionBar() {
  const [searchType, setSearchType] = useRecoilState(searchTypeAtom);

  return (
    <Container>
      <Option>
        <OptionTitle>분양주체</OptionTitle>

        <OptionBox>
          <OptionButton active={searchType === 1} onClick={() => setSearchType(1)}>
            공공
          </OptionButton>
          <OptionButton active={searchType === 2} onClick={() => setSearchType(2)}>
            개인
          </OptionButton>
          <OptionButton active={searchType === 0} onClick={() => setSearchType(0)}>
            둘다 표시
          </OptionButton>
        </OptionBox>

        <SelectList />
      </Option>
    </Container>
  );
}

export default OptionBar;

const Container = styled.div`
  padding: 0 1rem;
  padding-bottom: 6px;
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #afafaf;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 0 1.5rem;
  }

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    padding: 0 2rem;
  }
`;

const Option = styled.div`
  z-index: 100;
  padding-top: 10px;
  position: relative;
  flex-grow: 1;
  max-width: 1200px;
  height: 57px;
  display: flex;
  align-items: center;
`;

const OptionTitle = styled.span`
  margin: 0 18px;
  font-size: 15px;
  font-weight: ${FONT_WEIGHT.MEDIUM};

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    margin-left: 0;
    margin-right: 36px;
  }
`;

const OptionBox = styled.div`
  display: none;
  align-items: center;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: flex;
  }
`;

const OptionButton = styled.button<{ active: boolean }>`
  margin-right: 32px;
  font-size: 18px;
  font-weight: ${props => (props.active ? FONT_WEIGHT.SEMIBOLD : FONT_WEIGHT.MEDIUM)};
  color: ${props => (props.active ? COLOR.BLACK : '#C5CFBD')};
`;
