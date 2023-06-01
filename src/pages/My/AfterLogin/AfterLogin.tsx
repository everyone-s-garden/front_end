import React from 'react';
import styled from 'styled-components';
import { Outlet, useOutletContext } from 'react-router-dom';
import { BREAK_POINT } from 'constants/style';

type AfterLoginProps = {
  navermaps: typeof naver.maps;
};

const AfterLogin = () => {
  const { navermaps } = useOutletContext<AfterLoginProps>();

  return (
    <Container>
      <Outlet context={{ navermaps }} />
    </Container>
  );
};
export default AfterLogin;

const Container = styled.section`
  flex-grow: 1;
  margin-right: auto;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin: 0;
  }
`;
