import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { COLOR, FONT_WEIGHT } from 'constants/style';
import LineGraph from './LineGraph';
import WeekWeather from './WeekWeather';
import findMyGeoLocation from 'utils/findMyGeoLocation';
import cloudy from 'assets/weather/cloudy.svg';
import sunny from 'assets/weather/sunny.svg';
import snowy from 'assets/weather/snowy.svg';
import rainy from 'assets/weather/rainy.svg';
import { WeatherAPI } from 'api/WeatherAPI';
import MiniLoader from 'components/MiniLoader';

function Weather() {
  const today = new Date();
  const weekday = ['일', '월', '화', '수', '목', '금', '토'];
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const moveMyLocation = async () => {
    setIsLoading(true);
    const { location } = await findMyGeoLocation();
    setMyLocation(location);

    setIsLoading(false);
  };

  const getWeatherData = async () => {
    const data = await WeatherAPI.getAllWeather();
    // const data = await WeatherAPI.getWeeklyWeather(37.545593, 127.100706);
    console.log(data);
  };

  useEffect(() => {
    // getWeatherData();
  }, []);

  return (
    <Container>
      <LoaderContainer>
        <MiniLoader isLoading={isLoading} scale={0.6} />
      </LoaderContainer>

      <TodayDate>
        {month}.{date} {weekday[day]}
      </TodayDate>

      <CurrentWeather>
        <CurrentSkyImg src={cloudy} alt="날씨 이모티콘" />
        20˚
        <Info>
          <Location>서울</Location>
          <Sky>흐림</Sky>
        </Info>
      </CurrentWeather>

      {myLocation ? (
        <>
          <WeatherPerTime>
            <SubjectTitle>시간대별 기온</SubjectTitle>
            <LineGraph />
          </WeatherPerTime>

          <WeeklyWeather>
            <SubjectTitle>주간 날씨</SubjectTitle>
            <WeeklyWeatherBox>
              <WeekWeather imgFile={sunny} weekday={weekday[day]} isToday={true} />
              <WeekWeather imgFile={sunny} weekday={weekday[(day + 1) % 7]} />
              <WeekWeather imgFile={sunny} weekday={weekday[(day + 2) % 7]} />
              <WeekWeather imgFile={sunny} weekday={weekday[(day + 3) % 7]} />
              <WeekWeather imgFile={sunny} weekday={weekday[(day + 4) % 7]} />
              <WeekWeather imgFile={sunny} weekday={weekday[(day + 5) % 7]} />
              <WeekWeather imgFile={sunny} weekday={weekday[(day + 6) % 7]} />
            </WeeklyWeatherBox>
          </WeeklyWeather>

          <Rainfall>
            <SubjectTitle>현재 강수확률</SubjectTitle>
            <Percentage>30%</Percentage>
          </Rainfall>
        </>
      ) : (
        <>
          <FindMyLocBtn onClick={moveMyLocation}>내 위치찾기</FindMyLocBtn>
          <Instruction>
            위치 찾기로 현 위치의 <br />
            시간대별, 주간 날씨를 확인해요
          </Instruction>
        </>
      )}
    </Container>
  );
}

export default Weather;

const Container = styled.section`
  position: relative;
  align-self: center;
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
`;

const TodayDate = styled.span`
  color: #afafaf;
  font-size: 8px;
`;

const CurrentWeather = styled.div`
  margin-top: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  color: #414c38;
  font-size: 32px;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
`;

const CurrentSkyImg = styled.img`
  margin-right: 14px;
  width: 50px;
`;

const Info = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Location = styled.div`
  font-size: 12px;
`;

const Sky = styled.div`
  font-size: 14px;
`;

const WeatherPerTime = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const SubjectTitle = styled.h4`
  color: #76806c;
  font-size: 12px;
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const WeeklyWeather = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
`;

const WeeklyWeatherBox = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
`;

const Rainfall = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const Percentage = styled.span`
  margin-left: 7px;
  color: #f77800;
  font-size: 16px;
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const FindMyLocBtn = styled.button`
  margin: 20px 0 16px 0;
  align-self: center;
  width: 84px;
  height: 30px;
  color: #96d058;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #96d058;
  border-radius: 16px;
  transition: all 0.1s ease-in;

  &:hover {
    color: ${COLOR.BACKGROUND};
    background-color: #96d058;
  }
`;

const Instruction = styled.p`
  color: #76806c;
  font-size: 12px;
  font-weight: 500;
`;
