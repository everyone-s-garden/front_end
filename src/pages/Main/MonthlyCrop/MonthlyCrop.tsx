import React from 'react';
import styled from 'styled-components';
import MonthCropList from './MonthCropList';
import MonthlyImage from './MonthImage';
import { BREAK_POINT } from 'constants/style';

const MonthlyCrop = () => {
  const currentMonth = new Date().getMonth() + 1;

  return (
    <Container>
      <MonthlyImage currentMonth={currentMonth} />
      <MonthCropList currentMonth={currentMonth} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1234px;
  width: 100%;
  padding: 0 20px;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    height: 405px;
    background-color: #fff7ee;
  }
`;

export default MonthlyCrop;
