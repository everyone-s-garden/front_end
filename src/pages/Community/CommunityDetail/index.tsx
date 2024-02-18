import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import Title from './Title';
import PopularPostList from './PopularPostList';
import PostImageSlider from './PostImageSlider';
import Content from './Content';
import Author from './Author';
import { useParams } from 'react-router-dom';
import { useGetPost } from 'api/CommunityAPI';
import Comments from './Comments';

const CommunityDetail = () => {
  const { postId } = useParams();
  const { data: post, isLoading } = useGetPost(Number(postId));

  // console.log(post);

  if (isLoading || !post || !postId) {
    return <></>;
  }

  return (
    <>
      <Helmet>
        <title>속닥속닥 상세 페이지</title>
      </Helmet>

      {/* TODO: 타입 달라고 하기 */}
      <Container>
        <Title type="ETC" createdAt={post.createdDate} title={post.title} />
        <PostImageSlider images={post.images} />
        <Content text={post.content} />
        <Author authorId={post.authorId} />
        {/* <Comments postId={postId} /> */}

        <PopularPostList />
      </Container>
    </>
  );
};

export default CommunityDetail;

const Container = styled.article`
  margin-bottom: 20px;
`;
