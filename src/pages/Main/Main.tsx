import React from 'react';
import styled from 'styled-components';

import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
const Main = () => {
  return (
    <Container>
      <Helmet>
        <title>모두의 텃밭 메인페이지</title>
      </Helmet>
      {/* <FirstSection /> */}
      {/* <SecondSection /> */}
      <Banner />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export default Main;
