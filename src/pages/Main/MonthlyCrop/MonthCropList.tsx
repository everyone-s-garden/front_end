import { useGetMonthCrop } from 'api/CropAPI';
import React from 'react';
import styled from 'styled-components';
import MonthCropItem from './MonthCropItem';

const MonthCropList = ({ currentMonth }: { currentMonth: number }) => {
  const { data: monthCrop } = useGetMonthCrop({ month: currentMonth });

  return (
    <Container>
      {monthCrop?.map(crop => (
        <MonthCropItem key={crop.id} cropInfo={crop} />
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
  height: fit-content;
  max-height: 330px;
  overflow-y: scroll;
`;

export default MonthCropList;
