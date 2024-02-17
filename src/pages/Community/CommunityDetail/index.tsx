import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import Title from './Title';
import PopularPostList from './PopularPostList';
import PostImageSlider from './PostImageSlider';
import Content from './Content';
import Author from './Author';

const CommunityDetail = () => {
  // const;

  return (
    <>
      <Helmet>
        <title>속닥속닥 상세 페이지</title>
      </Helmet>

      <Container>
        <Title
          type="ETC"
          createdAt="2024-02-13T19:20:30.45+01:00"
          title="텃밭 자랑텃밭 자랑텃밭 자랑텃밭 자랑텃밭 자랑텃밭 자랑텃밭 자랑텃밭 자랑텃"
        />
        <PostImageSlider
          images={[
            'https://www.jadam.kr/news/photo/200910/5841_7727_3726.jpg',
            'https://www.jadam.kr/news/photo/200910/5841_7727_3726.jpg',
            'https://www.jadam.kr/news/photo/200910/5841_7727_3726.jpg',
            'https://www.jadam.kr/news/photo/200910/5841_7727_3726.jpg',
            'https://www.jadam.kr/news/photo/200910/5841_7727_3726.jpg',
          ]}
        />
        <Content text="" />
        <Author authorId={6} />
        <PopularPostList />
      </Container>
    </>
  );
};

export default CommunityDetail;

const Container = styled.article`
  margin-bottom: 20px;
`;
