import { GetPerTimeWeatherResponse } from 'api/type';
import React from 'react';
import styled from 'styled-components';
import getWeatherIcon from 'utils/getWeatherIcon';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import { BREAK_POINT } from 'constants/style';

const TimeWeather = ({ timeData }: { timeData: GetPerTimeWeatherResponse }) => {
  const timeWeather = timeData.weatherTimeResponses.sort((a, b) => {
    if (a.fsctDate < b.fsctDate) return -1;
    if (a.fsctDate > b.fsctDate) return 1;

    if (a.fsctTime < b.fsctTime) return -1;
    if (a.fsctTime > b.fsctTime) return 1;

    return 0;
  });

  const CustomLabel = (props: any) => {
    const { index, x, y } = props;

    return (
      <g>
        <ForeignObject x={x - 10} y={y - 10}>
          <WeatherImg src={getWeatherIcon(timeWeather[index].skyStatus)} />
        </ForeignObject>
      </g>
    );
  };

  const CustomTick = (props: any) => {
    const { x, y, payload, index } = props;

    return (
      <>
        <Time x={x} y={y}>
          {payload.value.slice(0, 2)} 시
        </Time>
        <MobileTemp x={x} y={y + 20}>
          {timeWeather[index].temperature}°
        </MobileTemp>
        <Temp x={x} y={y + 35}>
          {timeWeather[index].temperature}°
        </Temp>
      </>
    );
  };

  return (
    <>
      <MobileContainer width="100%" height="100%">
        <LineChart
          data={timeWeather}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 40,
          }}
        >
          <Line
            type="linear"
            dot={false}
            dataKey="temperature"
            stroke="#F77700"
            strokeWidth={1}
            label={<CustomLabel />}
          />
          <XAxis
            tickMargin={40}
            dataKey="fsctTime"
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={<CustomTick />}
          />
        </LineChart>
      </MobileContainer>
      <Container width="100%" height="100%">
        <LineChart
          data={timeWeather}
          margin={{
            top: 35,
            right: 80,
            left: 80,
            bottom: 90,
          }}
        >
          <Line
            type="linear"
            dot={false}
            dataKey="temperature"
            stroke="#F77700"
            strokeWidth={1}
            label={<CustomLabel />}
          />
          <XAxis
            tickMargin={75}
            dataKey="fsctTime"
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={<CustomTick />}
          />
        </LineChart>
      </Container>
    </>
  );
};

const MobileContainer = styled(ResponsiveContainer)`
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const Container = styled(ResponsiveContainer)`
  display: none;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: block;
  }
`;

const ForeignObject = styled.foreignObject<{ x: number; y: number }>`
  width: 20px;
  height: 20px;

  x: ${props => props.x};
  y: ${props => props.y};

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 40px;
    height: 40px;

    x: ${props => props.x - 10};
    y: ${props => props.y - 10};
  }
`;

const WeatherImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Time = styled.text`
  font-size: 12px;
  font-weight: 500;
  text-anchor: middle;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 24px;
  }
`;

const Temp = styled.text`
  font-size: 24px;
  font-weight: 500;
  text-anchor: middle;
  display: none;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: block;
  }
`;

const MobileTemp = styled.text`
  font-size: 12px;
  font-weight: 500;
  text-anchor: middle;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

export default TimeWeather;
