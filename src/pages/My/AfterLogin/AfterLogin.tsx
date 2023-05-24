import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';
import { Outlet, useNavigate } from 'react-router-dom';

const AfterLogin = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};
export default AfterLogin;

const Container = styled.section`
  width: fit-content;
  height: fit-content;
  margin-top: 112px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    height: 200vh;
  }
`;
