import React from 'react';
import styled from 'styled-components';

import { BREAK_POINT, FONT_WEIGHT } from 'constants/style';
import plusIcon from 'assets/plus-icon.svg';
import Post from './Post';

function RecentPost() {
  return (
    <Container>
      <Header>
        <Title>최근 본 공고</Title>
        <MoreBtn>더보기</MoreBtn>
      </Header>
      <PostContainer>
        <Post />
        <Post />
        <Post />

        <MorePostBtn>
          <MorePostIcon>
            <PlusIcon src={plusIcon} alt="더보기" />
          </MorePostIcon>
          더보기
        </MorePostBtn>
      </PostContainer>
    </Container>
  );
}

const Container = styled.section`
  margin-top: 44px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: ${FONT_WEIGHT.BOLD};

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 24px;
  }
`;

const MoreBtn = styled.button`
  color: #a8d178;
  font-size: 14px;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const PostContainer = styled.div`
  margin-top: 20px;
  height: 135px;
  display: grid;
  grid-column-gap: 35px;
  grid-template-columns: repeat(3, 310px) 32px;
  overflow: auto;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
    grid-template-columns: repeat(2, 1fr) 32px;
  }

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    grid-template-columns: repeat(3, 1fr) 32px;
  }
`;

const MorePostBtn = styled.button`
  margin: auto 0;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #afafaf;
  font-size: 12px;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
  transition: all 0.2s ease-in;
  display: none;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: block;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const MorePostIcon = styled.div`
  margin-bottom: 6px;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #afafaf;
  border-radius: 50%;
`;

const PlusIcon = styled.img`
  width: 11px;
  height: 11px;
`;

export default RecentPost;
