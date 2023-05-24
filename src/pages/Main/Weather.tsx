import React from 'react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

import { FONT_WEIGHT } from 'constants/style';
import cloudy from 'assets/weather/cloudy.svg';

function Weather() {
  const today = new Date();
  const weekday = ['일', '월', '화', '수', '목', '금', '토'];

  const data = [
    { time: '0시', temp: 20 },
    { time: '6시', temp: 22 },
    { time: '9시', temp: 15 },
    { time: '12시', temp: 22 },
    { time: '15시', temp: 17 },
    { time: '18시', temp: 22 },
    { time: '21시', temp: 3 },
  ];

  const CustomizedLineLabel = (props: any) => {
    const { x, y, stroke, value } = props;

    return (
      <text x={x} y={y} dy={-10} fill={stroke} stroke="#AFAFAF" fontSize={8} fontWeight={200} textAnchor="middle">
        {value}˚
      </text>
    );
  };

  const CustomizedXAxisLabel = (props: any) => {
    const { x, y, stroke, payload } = props;

    return (
      <text x={x} y={y} fill={stroke} stroke="#AFAFAF" fontSize={8} fontWeight={200} textAnchor="middle">
        {payload.value}
      </text>
    );
  };

  return (
    <Container>
      <TodayDate>
        {today.getMonth() + 1}.{today.getDate()} {weekday[today.getDay()]}
      </TodayDate>

      <CurrentWeather>
        <CurrentSkyImg src={cloudy} alt="날씨 이모티콘" />
        20˚
        <Info>
          <Location>서울</Location>
          <Sky>흐림</Sky>
        </Info>
      </CurrentWeather>

      <ResponsiveContainer width={170} height={80}>
        <LineChart data={data} margin={{ top: 20, right: 10, left: 10 }}>
          <Line
            type="linear"
            dot={false}
            dataKey="temp"
            stroke="#C6E79A"
            strokeWidth={2}
            label={<CustomizedLineLabel />}
          />
          <XAxis dataKey="time" axisLine={false} tickLine={false} interval={0} tick={<CustomizedXAxisLabel />} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default Weather;

const Container = styled.section`
  align-self: center;
  padding: 16px;
  width: 200px;
  height: 340px;
  display: flex;
  flex-direction: column;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
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
