import React from 'react';
import styled from 'styled-components';
import MonthCropList from './MonthCropList';
import { BREAK_POINT } from 'constants/style';

const monthlyTitle = [
  null,
  '1월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '2월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '3월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '4월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '5월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '6월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '7월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '8월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '9월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '10월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '11월 추운 겨울 심기 좋은 작물 추천 해드려요!',
  '12월 추운 겨울 심기 좋은 작물 추천 해드려요!',
];

const MonthlyCrop = () => {
  const currentMonth = new Date().getMonth() + 1;

  return (
    <Wrapper>
      <Container>
        <Title>{monthlyTitle[currentMonth]}</Title>
        <MonthCropList currentMonth={currentMonth} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (min-width: ${BREAK_POINT.TABLET}) {
    height: 405px;
    background-color: #fff7ee;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  max-width: 1234px;
  width: 100%;
  padding: 0 20px;
  @media (min-width: ${BREAK_POINT.TABLET}) {
    padding: 50px 20px;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  word-break: keep-all;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 26px;
    font-weight: 700;
  }
`;

export default MonthlyCrop;
