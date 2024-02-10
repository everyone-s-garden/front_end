import React from 'react';
import styled from 'styled-components';
import CardHeader from './CardHeader';
import CardCurrentWeather from './CardCurrentWeather';
import CardNextWeather from './CardNextWeather';

const WeatherCard = () => {
  return (
    <Container>
      <CardHeader />
      <CardCurrentWeather />
      <CardNextWeather />
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: 10px;
`;
export default WeatherCard;
