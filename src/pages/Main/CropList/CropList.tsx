import React from 'react';
import styled from 'styled-components';
import MonthlyCrop from './MonthlyCrop';
import MonthlyImage from './MonthlyImage';

const CropList = () => {
  const date = new Date().getMonth();

  return (
    <Container>
      <MonthlyCrop />
      <MonthlyImage />
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff7ee;
  height: 405px;
`;

export default CropList;
