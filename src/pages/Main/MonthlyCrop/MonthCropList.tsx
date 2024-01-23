import { useGetMonthCrop } from 'api/CropAPI';
import React from 'react';
import styled from 'styled-components';
import MonthCropItem from './MonthCropItem';
import { BREAK_POINT } from 'constants/style';
import month1 from 'assets/main/month1.png';

const MonthCropList = ({ currentMonth }: { currentMonth: number }) => {
  const { data: monthCrop } = useGetMonthCrop({ month: currentMonth });

  return (
    <Container>
      <Img src={month1} />
      <ListWrapper>
        {monthCrop?.map(crop => (
          <MonthCropItem key={crop.id} cropInfo={crop} />
        ))}
      </ListWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (min-width: ${BREAK_POINT.TABLET}) {
    flex-direction: row;
    gap: 30px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 178px;
  border-radius: 10px;
  object-fit: cover;

  @media (min-width: ${BREAK_POINT.TABLET}) {
    width: 582px;
    height: 227px;
  }
`;

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 330px;
  width: 100%;
  overflow-y: scroll;

  @media (min-width: ${BREAK_POINT.TABLET}) {
    max-height: 228px;
  }
`;

export default MonthCropList;
