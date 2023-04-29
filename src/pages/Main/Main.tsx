import React from 'react';

import styled from 'styled-components';
import { BREAK_POINT, FONT_WEIGHT } from '../../constants/style';
import testImg from '../../assets/garden-image1.jpg';

const Main = () => {
  return (
    <Container>
      <MainDiv>
        <Banner>
          <BannerImage src={testImg} alt="배너 이미지" />
        </Banner>
        <Title>최근 본 공고</Title>
        <PostContainer>
          <Post>최근 본 공고</Post>
          <Post>최근 본 공고</Post>
          <Post>최근 본 공고</Post>
          <Post>최근 본 공고</Post>
        </PostContainer>
      </MainDiv>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  width: 100%;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 0 1.5rem;
  }

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    padding: 0 2rem;
  }
`;

const MainDiv = styled.div`
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
`;

const Banner = styled.div`
  width: 100%;
  height: 415px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: white;
  background-color: gray;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.div`
  width: 100%;
  height: 92px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const PostContainer = styled.div`
  width: 100%;
  height: 192px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
`;

const Post = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: gray;
`;
