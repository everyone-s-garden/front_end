import React from 'react';
import styled from 'styled-components';

import { BREAK_POINT } from 'constants/style';
import testImg from 'assets/garden-image1.jpg';
import RecentPost from './RecentPost';
import TodayIngred from './TodayIngred';
import { setItem } from 'utils/session';
const Main = () => {
  return (
    <Container>
      <MainDiv>
        <Banner>
          <BannerImage src={testImg} alt="배너 이미지" />
        </Banner>

        <RecentPost />

        <TodayIngred />
      </MainDiv>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: center;
  width: 100%;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 0 24px;
  }

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    padding: 0 26px;
  }
`;

const MainDiv = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1200px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    margin: 25px 0;
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 225px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: gray;
  border-radius: 23px;
  overflow: hidden;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    height: 370px;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export default Main;
