import React from 'react';
import styled from 'styled-components';

import { BREAK_POINT, FONT_WEIGHT } from 'constants/style';

function TodayIngred() {
  return (
    <Container>
      <Title>오늘의 양분</Title>

      <PostContainer>
        <Post />
        <Post />
      </PostContainer>
    </Container>
  );
}

export default TodayIngred;

const Container = styled.section`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: ${FONT_WEIGHT.BOLD};

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 24px;
  }
`;

const PostContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 24px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    grid-gap: 90px;
    flex-direction: row;
  }
`;

const Post = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 15px;
  background-color: #dceac8;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: row;
    height: 200px;
    grid-gap: 90px;
  }
`;
