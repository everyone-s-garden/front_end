import { GetWeeklyWeatherResponse } from 'api/type';
import { BREAK_POINT } from 'constants/style';
import React from 'react';
import styled from 'styled-components';
import getWeatherIcon from 'utils/getWeatherIcon';

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

const WeeklyWeather = ({ weeklyData }: { weeklyData: GetWeeklyWeatherResponse }) => {
  const today = new Date().getDay();

  return (
    <Container>
      <WeatherItem>
        <WeatherImg src={getWeatherIcon(weeklyData.skyStatusTwoDaysAfter)} />
        <Day>{WEEK[(today + 1) % 7]}</Day>
      </WeatherItem>
      <WeatherItem>
        <WeatherImg src={getWeatherIcon(weeklyData.skyStatusThreeDaysAfter)} />
        <Day>{WEEK[(today + 2) % 7]}</Day>
      </WeatherItem>
      <WeatherItem>
        <WeatherImg src={getWeatherIcon(weeklyData.skyStatusFourDaysAfter)} />
        <Day>{WEEK[(today + 3) % 7]}</Day>
      </WeatherItem>
      <WeatherItem>
        <WeatherImg src={getWeatherIcon(weeklyData.skyStatusFiveDaysAfter)} />
        <Day>{WEEK[(today + 4) % 7]}</Day>
      </WeatherItem>
      <WeatherItem>
        <WeatherImg src={getWeatherIcon(weeklyData.skyStatusSixDaysAfter)} />
        <Day>{WEEK[(today + 5) % 7]}</Day>
      </WeatherItem>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const WeatherItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    gap: 34px;
  }
`;

const WeatherImg = styled.img`
  width: 30px;
  height: 30px;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 48px;
    height: 48px;
  }
`;

const Day = styled.div`
  font-size: 12px;
  font-weight: 500;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 24px;
  }
`;

export default WeeklyWeather;
