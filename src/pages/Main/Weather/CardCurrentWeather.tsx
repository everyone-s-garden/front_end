import { useGetAllWeather } from 'api/WeatherAPI';
import { WeatherData } from 'api/type';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { myLocationAtom } from 'recoil/atom';
import styled from 'styled-components';
import getWeatherIcon from 'utils/getWeatherIcon';

const CardCurrentWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [myLocation, setMyLocation] = useRecoilState(myLocationAtom);
  const { data, isSuccess } = useGetAllWeather();

  useEffect(() => {
    if (data) {
      const wt = data.find(weather => weather.regionName === myLocation.position);
      setCurrentWeather(wt ?? null);
    }
  }, [data, myLocation.position]);

  if (!isSuccess) return <div>로딩중</div>;

  if (!currentWeather) return <div>날씨 정보가 없습니다.</div>;

  return (
    <Container>
      <InfoWrapper>
        <Temp>{currentWeather.temperatureValue}°</Temp>
        <Divider />
        <Weather>{currentWeather.skyValue}</Weather>
        <WeatherInfoWrapper>
          <MinMaxTemp></MinMaxTemp>
          <Rainfall></Rainfall>
        </WeatherInfoWrapper>
      </InfoWrapper>
      <WeatherImg src={getWeatherIcon(currentWeather.skyValue)} />
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff4e7;
  height: 148px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: hidden;
  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 16px 30px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  gap: 22px;
  @media ${({ theme }) => theme.devices.mobile} {
    height: 100%;
    justify-content: center;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  @media ${({ theme }) => theme.devices.mobile} {
    height: 77px;
  }
`;

const Temp = styled.div`
  font-size: 32px;
  font-weight: 600;
  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 64px;
  }
`;

const Weather = styled.div`
  font-size: 14px;
  font-weight: 500;
  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 20px;
  }
`;

const WeatherInfoWrapper = styled.div``;

const MinMaxTemp = styled.div``;

const Rainfall = styled.div``;

const WeatherImg = styled.img`
  width: 140px;
  height: 140px;
  @media ${({ theme }) => theme.devices.mobile} {
    width: 228px;
    height: 228px;
  }
`;

export default CardCurrentWeather;
