import { BREAK_POINT } from 'constants/style';
import React from 'react';
import styled from 'styled-components';

const Weather = () => {
  return (
    <Container>
      <Title>위치찾기로 현 위치의 날씨를 확인해요</Title>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
  }
`;

export default Weather;
