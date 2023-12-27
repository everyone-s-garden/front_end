import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { COLOR, FONT_WEIGHT } from 'constants/style';
import { WeatherAPI } from 'api/WeatherAPI';
import LineGraph, { LineGraphData } from './LineGraph';
import WeekWeather from './WeekWeather';
import findMyGeoLocation from 'utils/findMyGeoLocation';
import MiniLoader from 'components/MiniLoader';

import cloudy from 'assets/weather/cloudy.svg';
import sunny from 'assets/weather/sunny.svg';
import snowy from 'assets/weather/snowy.svg';
import rainy from 'assets/weather/rainy.svg';
import { WeatherData } from '../../../api/type';

function Weather() {
  const today = new Date();
  const weekday = ['일', '월', '화', '수', '목', '금', '토'];
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();
  const regions = [
    '서울',
    '강원',
    '경기',
    '경북',
    '경남',
    '광주',
    '대구',
    '대전',
    '부산',
    '세종',
    '울산',
    '인천',
    '전남',
    '전북',
    '제주',
    '충남',
    '충북',
  ];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [region, setRegion] = useState<string>('');
  const [sky, setSky] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [pTimeData, setPTimeData] = useState<LineGraphData[] | null>(null);
  const [weeklyData, setWeeklyData] = useState<string[] | null>(null);

  const getMyLocation = async () => {
    setIsLoading(true);
    const { location } = await findMyGeoLocation();
    setMyLocation(location);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true);
        const data = await WeatherAPI.getAllWeather();
        setIsLoading(false);
        return data.weatherApiResult;
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        return null;
      }
    };

    const updateWeather = (weatherData: WeatherData[]) => {
      let index = 0;
      return () => {
        const cur = weatherData[index];
        setRegion(cur.regionName);
        setSky(cur.skyValue);
        setTemperature(cur.temperatureValue);
        index = (index + 1) % regions.length;
      };
    };

    const initWeather = async () => {
      const weatherData = await fetchWeatherData();
      if (!weatherData) return; // 데이터가 없으면 업데이트 중단

      const updateWeatherFn = updateWeather(weatherData);
      updateWeatherFn(); // 초기 업데이트

      const intervalId = setInterval(updateWeatherFn, 8000);
      return () => clearInterval(intervalId); // 클린업 함수
    };

    initWeather();
  }, []);

  useEffect(() => {
    if (myLocation) {
      const getWeatherData = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
          const [perTData, weeklyData] = await Promise.all([
            WeatherAPI.getPerTimeWeather(myLocation.lat, myLocation.lng),
            WeatherAPI.getWeeklyWeather(myLocation.lat, myLocation.lng),
          ]);

          /* getWeeklyWeather API가 기상청 API를 그대로 보내주는데
           * 기상청 API가 오늘날짜로 부터 2일 후 날씨 정보만 주고 있어 내일 날씨정보를 알 수 없는 문제가 발생됨
           * getPerTimeWeather의 weatherTimeResponses 마지막 인덱스에 다음날 날씨 정보를 넣어서 주기로 함
           * **/
          const tempPTData = perTData.weatherTimeResponses
            .slice(0, 5)
            .map(data => ({ time: Number(data.fsctTime) / 100, temp: data.temperature }));

          const tempWeeklyData = [
            perTData.weatherTimeResponses[0].skyStatus,
            ...perTData.weatherTimeResponses.slice(5).map(data => data.skyStatus),
            weeklyData.skyStatusTwoDaysAfter,
            weeklyData.skyStatusThreeDaysAfter,
            weeklyData.skyStatusFourDaysAfter,
            weeklyData.skyStatusFiveDaysAfter,
            weeklyData.skyStatusSixDaysAfter,
          ];

          setPTimeData(tempPTData);
          setWeeklyData(tempWeeklyData);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      getWeatherData();
      setIsLoading(false);
    }
  }, [myLocation]);

  return (
    <Container>
      <LoaderContainer>
        <MiniLoader isLoading={isLoading} scale={0.6} />
      </LoaderContainer>

      {isError && (
        <ErrorMessage>
          <span>죄송합니다</span>
          <p>
            날씨를 불러오는 도중 오류가 <br /> 발생했습니다
          </p>
        </ErrorMessage>
      )}

      {!isError && (
        <>
          <TodayDate>
            {month}.{date} {weekday[day]}
          </TodayDate>

          {region !== '' && (
            <CurrentWeather>
              <CurrentSkyImg
                src={sky === '맑음' ? sunny : sky === '흐림' ? cloudy : sky === '비' ? rainy : snowy}
                alt="날씨 이모티콘"
              />
              {temperature}˚
              <Info>
                <Location>{region}</Location>
                <Sky>{sky}</Sky>
              </Info>
            </CurrentWeather>
          )}

          {pTimeData && weeklyData ? (
            <>
              <WeatherPerTime>
                <SubjectTitle>시간대별 기온</SubjectTitle>
                <LineGraph data={pTimeData} />
              </WeatherPerTime>

              <WeeklyWeather>
                <SubjectTitle>주간 날씨</SubjectTitle>
                <WeeklyWeatherBox>
                  <WeekWeather
                    imgFile={
                      weeklyData[0] === '맑음'
                        ? sunny
                        : weeklyData[0] === '흐림'
                        ? cloudy
                        : weeklyData[0] === '눈'
                        ? snowy
                        : rainy
                    }
                    weekday={weekday[day]}
                    isToday={true}
                  />
                  <WeekWeather
                    imgFile={
                      weeklyData[1] === '맑음'
                        ? sunny
                        : weeklyData[1] === '흐림'
                        ? cloudy
                        : weeklyData[1] === '눈'
                        ? snowy
                        : rainy
                    }
                    weekday={weekday[(day + 1) % 7]}
                  />
                  <WeekWeather
                    imgFile={
                      weeklyData[2] === '맑음'
                        ? sunny
                        : weeklyData[2] === '흐림'
                        ? cloudy
                        : weeklyData[2] === '눈'
                        ? snowy
                        : rainy
                    }
                    weekday={weekday[(day + 2) % 7]}
                  />
                  <WeekWeather
                    imgFile={
                      weeklyData[3] === '맑음'
                        ? sunny
                        : weeklyData[3] === '흐림'
                        ? cloudy
                        : weeklyData[3] === '눈'
                        ? snowy
                        : rainy
                    }
                    weekday={weekday[(day + 3) % 7]}
                  />
                  <WeekWeather
                    imgFile={
                      weeklyData[4] === '맑음'
                        ? sunny
                        : weeklyData[4] === '흐림'
                        ? cloudy
                        : weeklyData[4] === '눈'
                        ? snowy
                        : rainy
                    }
                    weekday={weekday[(day + 4) % 7]}
                  />
                  <WeekWeather
                    imgFile={
                      weeklyData[5] === '맑음'
                        ? sunny
                        : weeklyData[5] === '흐림'
                        ? cloudy
                        : weeklyData[5] === '눈'
                        ? snowy
                        : rainy
                    }
                    weekday={weekday[(day + 5) % 7]}
                  />
                  <WeekWeather
                    imgFile={
                      weeklyData[6] === '맑음'
                        ? sunny
                        : weeklyData[6] === '흐림'
                        ? cloudy
                        : weeklyData[6] === '눈'
                        ? snowy
                        : rainy
                    }
                    weekday={weekday[(day + 6) % 7]}
                  />
                </WeeklyWeatherBox>
              </WeeklyWeather>

              <Rainfall>
                <SubjectTitle>현재 강수확률</SubjectTitle>
                <Percentage>30%</Percentage>
              </Rainfall>
            </>
          ) : (
            <>
              <FindMyLocBtn onClick={getMyLocation}>내 위치찾기</FindMyLocBtn>
              <Instruction>
                위치 찾기로 현 위치의 <br />
                시간대별, 주간 날씨를 확인해요
              </Instruction>
            </>
          )}
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

const ErrorMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    color: #96d058;
    font-size: 20px;
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
  }
  & > p {
    margin-top: 6px;
    color: #414c38;
    font-size: 12px;
    font-weight: ${FONT_WEIGHT.MEDIUM};
    text-align: center;
  }
`;

const TodayDate = styled.span`
  color: #afafaf;
  font-size: 8px;
`;

const CurrentWeather = styled.div`
  flex-shrink: 0;
  margin-top: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #414c38;
  font-size: 30px;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
`;

const CurrentSkyImg = styled.img`
  margin-right: 14px;
  width: 50px;
  height: 50px;
`;

const Info = styled.div`
  flex-shrink: 0;
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
