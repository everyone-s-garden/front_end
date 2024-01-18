import React from 'react';
import styled from 'styled-components';
import month1 from 'assets/main/month1.png';

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

const MonthImage = ({ currentMonth }: { currentMonth: number }) => {
  return (
    <Container>
      <Title>{monthlyTitle[currentMonth]}</Title>
      <Img src={month1} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const Img = styled.img`
  width: 100%;
  height: 178px;
  border-radius: 10px;
  object-fit: cover;
`;

export default MonthImage;
