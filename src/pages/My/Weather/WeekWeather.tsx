import React from 'react';
import styled from 'styled-components';
import { FONT_WEIGHT } from 'constants/style';
import cloudy from 'assets/weather/cloudy.svg';
import sunny from 'assets/weather/sunny.svg';
import snowy from 'assets/weather/snowy.svg';
import rainy from 'assets/weather/rainy.svg';

interface WeekWeatherProps {
  imageType: string;
  weekday: string;
  isToday?: boolean;
}

function WeekWeather({ imageType, weekday, isToday = false }: WeekWeatherProps) {
  let imgFile;
  switch (imageType) {
    case '맑음':
      imgFile = sunny;
      break;
    case '흐림':
      imgFile = cloudy;
      break;
    case '구름많음':
      imgFile = cloudy;
      break;
    case '눈':
      imgFile = snowy;
      break;
    case '비':
      imgFile = rainy;
      break;
    case '흐리고 비/눈':
      imgFile = rainy;
      break;
  }

  return (
    <Container>
      <SkyImg src={imgFile} alt="날씨 이모지" />
      <Day isToday={isToday}>{weekday}</Day>
    </Container>
  );
}

export default WeekWeather;

const Container = styled.div`
  width: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkyImg = styled.img`
  width: 20px;
  height: 20px;
`;

const Day = styled.div<{ isToday: boolean }>`
  margin-top: 10px;
  color: ${props => (props.isToday ? '#549ff8' : '#afafaf')};
  font-size: 12px;
  font-weight: ${FONT_WEIGHT.BOLD};
`;
