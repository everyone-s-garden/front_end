import React from 'react';
import styled from 'styled-components';

import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import { setItem } from 'utils/session';

const Main = () => {
  setItem('isLogin', 'true');
  return (
    <Container>
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
