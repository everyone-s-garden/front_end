import React from 'react';
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
  max-width: 1440px;
  margin: 0 auto;
  gap: 40px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    gap: 80px;
  }
`;

export default Main;
