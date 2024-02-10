import { useGetMonthCrop } from 'api/CropAPI';
import React from 'react';
import styled from 'styled-components';
import MonthCropItem from './MonthCropItem';
import getMonthImage from 'utils/getMonthImage';

const MonthCropList = ({ currentMonth }: { currentMonth: number }) => {
  const { data: monthCrops } = useGetMonthCrop();

  if (!monthCrops) return null;

  return (
    <Container>
      <PcImg src={getMonthImage(currentMonth).pc} />
      <MobileImg src={getMonthImage(currentMonth).mobile} />
      <ListWrapper>
        {monthCrops[currentMonth - 1].cropInfos.map(crop => (
          <MonthCropItem key={crop.name} cropInfo={crop} />
        ))}
      </ListWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: row;
    gap: 30px;
  }
`;

const PcImg = styled.img`
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  display: none;

  @media ${({ theme }) => theme.devices.mobile} {
    min-width: 305px;
    max-width: 582px;
    height: 227px;
    display: block;
  }
`;

const MobileImg = styled.img`
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  display: block;

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`;

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 330px;
  width: 100%;
  overflow-y: scroll;

  @media ${({ theme }) => theme.devices.mobile} {
    max-height: 228px;
    min-width: 265px;
  }
`;

export default MonthCropList;
