import React from 'react';
import styled from 'styled-components';

import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import Weather from './Weather';

const Main = () => {
  return (
    <Container>
      <Weather />
      <FirstSection />
      <SecondSection />
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
