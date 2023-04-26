import React, { useState } from 'react';
import styled from 'styled-components';

import { BREAK_POINT, COLOR } from 'constants/style';

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
  border-bottom: 1px solid ${COLOR.BLACK[800]};

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
  height: 70px;
  display: flex;
  align-items: center;
`;

const OptionTitle = styled.span`
  margin-right: 0.4rem;
`;

const OptionButton = styled.button<{ active: boolean }>`
  margin: 0 1rem;
  font-size: 1rem;
  color: ${props => (props.active ? COLOR.BLACK[900] : COLOR.BLACK[400])};
`;
