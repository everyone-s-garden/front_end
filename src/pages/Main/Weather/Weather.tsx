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

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 30px;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 24px;
  }
`;

export default Weather;
