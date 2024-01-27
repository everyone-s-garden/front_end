import { BREAK_POINT } from 'constants/style';
import React from 'react';
import styled from 'styled-components';
import WeatherCard from './WeatherCard';

const Weather = () => {
  return (
    <Container>
      <Title>위치찾기로 현 위치의 날씨를 확인해요</Title>
      <WeatherCard />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  max-width: 1234px;
  width: 100%;
  padding: 0 20px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    gap: 30px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 26px;
    font-weight: 700;
  }
`;

export default Weather;
