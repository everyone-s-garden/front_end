import React from 'react';

import styled from 'styled-components';
import { BREAK_POINT, FONT_WEIGHT } from '../../constants/style';
import testImg from '../../assets/garden-image1.jpg';

const Container = styled.div`
  margin: 40px auto;
  padding: 0 1rem;
  max-width: 1200px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 0 1.5rem;
  }

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    padding: 0 2rem;
  }
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

const Main = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default Main;
