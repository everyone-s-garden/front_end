import React from 'react';
import styled from 'styled-components';

import { FONT_WEIGHT } from 'constants/style';

interface WeekWeatherProps {
  imgFile: string;
  weekday: string;
  isToday?: boolean;
}

function WeekWeather({ imgFile, weekday, isToday = false }: WeekWeatherProps) {
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
