import React, { useState } from 'react';
import styled from 'styled-components';

import { BREAK_POINT, COLOR, FONT_WEIGHT } from 'constants/style';

function OptionBar() {
  const [provider, setProvider] = useState<string>('둘다 표시');

  return (
    <Container>
      <Option>
        <OptionTitle>분양주체</OptionTitle>
        <OptionButton active={provider === '공공'} onClick={() => setProvider('공공')}>
          공공
        </OptionButton>
        <OptionButton active={provider === '개인'} onClick={() => setProvider('개인')}>
          개인
        </OptionButton>
        <OptionButton active={provider === '둘다 표시'} onClick={() => setProvider('둘다 표시')}>
          둘다 표시
        </OptionButton>
      </Option>
    </Container>
  );
}

export default OptionBar;

const Container = styled.div`
  padding: 0 1rem;
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
  margin-right: 36px;
  font-size: 15px;
  font-weight: ${FONT_WEIGHT.MEDIUM};
`;

const OptionButton = styled.button<{ active: boolean }>`
  margin-right: 32px;
  font-size: 18px;
  font-weight: ${props => (props.active ? FONT_WEIGHT.SEMIBOLD : FONT_WEIGHT.MEDIUM)};
  color: ${props => (props.active ? COLOR.BLACK : '#C5CFBD')};
`;
