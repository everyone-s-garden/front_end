import React from 'react';
import styled from 'styled-components';

import { BREAK_POINT } from 'constants/style';

function Footer() {
  return <Container>Footer</Container>;
}

export default Footer;

const Container = styled.footer`
  padding: 0 1rem;
  width: 100%;
  display: flex;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 0 1.5rem;
  }

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    padding: 0 2rem;
  }
`;
