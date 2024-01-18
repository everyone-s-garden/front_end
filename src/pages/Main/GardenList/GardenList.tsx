import React from 'react';
import GardenItem from './GardenItem';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';

const GardenList = () => {
  return (
    <Container>
      <Title>모두의 텃밭에서 수도권 지역 텃밭을 추천드려요!</Title>
      <GardenItemWrapper>
        {Array.from({ length: 4 }).map((_, index) => (
          <GardenItem key={index} />
        ))}
      </GardenItemWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  max-width: 1234px;
  width: 100%;
  padding: 0 20px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    gap: 30px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  word-break: keep-all;
  line-height: 30px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 26px;
    font-weight: 700;
    line-height: normal;
  }
`;

const GardenItemWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  overflow-x: auto;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    gap: 30px;
  }
`;

export default GardenList;
