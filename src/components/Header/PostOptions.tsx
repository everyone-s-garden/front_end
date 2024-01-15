import { BREAK_POINT } from 'constants/style';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const postOptions = [
  {
    title: '나의 밭 등록하기',
    describe: '현재 가지고 있는 밭을 등록해요',
    link: '/',
  },
  {
    title: '판매하는 밭 등록하기',
    describe: '판매 할 개인 밭을 등록해요',
    link: '/',
  },
  {
    title: '작물 거래 글쓰기',
    describe: '다양한 작물을 판매하는 글을 등록해요',
    link: '/',
  },
  {
    title: '속닥속닥 글쓰기',
    describe: '질문, 자랑, 공유 등 다양한 글을 작성해요',
    link: '/',
  },
];

const PostOptions = () => {
  return (
    <Container>
      {postOptions.map(option => (
        <StyledLink to={option.link} key={option.link}>
          <Title>{option.title}</Title>
          <Describe>{option.describe}</Describe>
        </StyledLink>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  z-index: 100000;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  display: none;
  @media (min-width: ${BREAK_POINT.TABLET}) {
    display: block;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Describe = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #494949;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
  height: 80px;
  padding: 18px 0 21px 20px;
  text-decoration: none;
  border-bottom: 1px solid #d9d9d9;
  color: #000;
  &:hover {
    background-color: #f5f5f5;
  }
  &:first-of-type {
    border-radius: 10px 10px 0 0;
  }

  &:last-of-type {
    border-bottom: none;
    border-radius: 0 0 10px 10px;
  }
`;

export default PostOptions;
