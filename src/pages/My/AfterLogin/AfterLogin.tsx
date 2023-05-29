import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { BREAK_POINT } from 'constants/style';

const AfterLogin = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};
export default AfterLogin;

const Container = styled.section`
  flex-grow: 1;
  margin-right: auto;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin: 0;
  }
`;
