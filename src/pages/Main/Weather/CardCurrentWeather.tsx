import { useGetAllWeather } from 'api/WeatherAPI';
import { WeatherData } from 'api/type';
import Spinner from 'components/Spinner';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { myLocationAtom } from 'recoil/atom';
import styled from 'styled-components';
import getWeatherIcon from 'utils/getWeatherIcon';
import SunnyIcon from 'assets/main/weather/sunny-card.svg';

const CardCurrentWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const myLocation = useRecoilValue(myLocationAtom);
  const { data, isSuccess } = useGetAllWeather();

  useEffect(() => {
    if (data) {
      const wt = data.find(weather => weather.regionName === myLocation.position);
      setCurrentWeather(wt ?? null);
    }
  }, [data, myLocation.position]);

  return (
    <Container>
      {isSuccess && currentWeather ? (
        <>
          <WeatherImg src={currentWeather.skyValue === '맑음' ? SunnyIcon : getWeatherIcon(currentWeather.skyValue)} />
          <InfoWrapper>
            <Temp>{currentWeather.temperatureValue}°</Temp>
            <Divider />
            <Weather>{currentWeather.skyValue}</Weather>
          </InfoWrapper>
        </>
      ) : (
        <LoaderWrapper>
          <Spinner />
        </LoaderWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff4e7;
  padding: 25px 25px 25px 15px;
  height: 100px;
  display: flex;
  gap: 15px;
  overflow: hidden;
  justify-content: space-between;
  @media ${({ theme }) => theme.devices.mobile} {
    height: 148px;
    padding: 16px 60px 16px 50px;
  }
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  gap: 22px;
  justify-content: center;
  height: 100%;
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

const WeatherImg = styled.img`
  width: 140px;
  height: 140px;
  @media ${({ theme }) => theme.devices.mobile} {
    margin-top: 15px;
    width: 228px;
    height: 228px;
  }
`;

export default CardCurrentWeather;
