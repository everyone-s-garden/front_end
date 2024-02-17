import { BREAK_POINT } from 'constants/style';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Announcement = () => {
  return (
    <Container>
      <ContentWrapper>
        <Title>공지사항</Title>
        <Outlet />
      </ContentWrapper>
    </Container>
  );
};

export default Announcement;

const Container = styled.div`
  flex: 1;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  padding-bottom: 100px;
>>>>>>> ce0ea358495b325daec7f900e8123b46fa009f0f
=======
  padding-bottom: 100px;
>>>>>>> 62833b0086f350d45f8c02cd0b5e6aabbefe45c8
`;

const ContentWrapper = styled.div`
  max-width: 559px;
  margin-top: 47px;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 0;
  }
`;

const Title = styled.h1`
  color: #282828;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 48px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;
