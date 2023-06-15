import React from 'react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';

export interface LineGraphData {
  time: number;
  temp: string;
}

interface LineGraphProps {
  data: LineGraphData[];
}

function LineGraph({ data }: LineGraphProps) {
  const CustomizedLineLabel = (props: any) => {
    const { x, y, stroke, value } = props;

    return (
      <text x={x} y={y} dy={-10} fill={stroke} stroke="#AFAFAF" fontSize={10} fontWeight={200} textAnchor="middle">
        {value}˚
      </text>
    );
  };

  const CustomizedXAxisLabel = (props: any) => {
    const { x, y, stroke, payload } = props;

    return (
      <text x={x} y={y} fill={stroke} stroke="#AFAFAF" fontSize={10} fontWeight={200} textAnchor="middle">
        {payload.value} 시
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={90}>
      <LineChart data={data} margin={{ top: 25, right: 10, left: 10 }}>
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
  );
}

export default LineGraph;
