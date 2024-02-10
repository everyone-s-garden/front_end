import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import GardenList from './GardenList/GardenList';
import MonthlyCrop from './MonthlyCrop/MonthlyCrop';
import { BREAK_POINT } from 'constants/style';
import Weather from './Weather/Weather';

const Main = () => {
  return (
    <Container>
      <Helmet>
        <title>모두의 텃밭 메인페이지</title>
      </Helmet>
      <Banner />
      <GardenList />
      <MonthlyCrop />
      <Weather />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  gap: 40px;
  padding-bottom: 57px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    gap: 80px;
    padding-bottom: 92px;
  }
`;

export default Main;
