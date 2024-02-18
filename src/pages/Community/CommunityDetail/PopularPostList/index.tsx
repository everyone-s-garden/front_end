import { useGetPopularPosts } from 'api/CommunityAPI';
import PostList from 'components/PostList';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import React from 'react';
import styled from 'styled-components';

const PopularPostList = () => {
  const { data, fetchNextPage, hasNextPage } = useGetPopularPosts();

  const { ref } = useInfiniteScroll<HTMLDivElement>({
    fetchData: () => {
      fetchNextPage();
    },
    hasNextPage,
  });

  return (
    <Container>
      <Title>지금 인기글을 소개합니다</Title>
      {data && <PostList posts={data} />}
      <div ref={ref}></div>
    </Container>
  );
};

export default PopularPostList;

const Container = styled.section`
  max-width: 1194px;
  width: 100%;
  margin-inline: auto;
  padding-inline: 20px;
  margin-top: 24px;

  @media (${({ theme }) => theme.devices.mobile}) {
    margin-top: 45px;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};

  @media (${({ theme }) => theme.devices.mobile}) {
    font-size: 24px;
    margin-bottom: 24px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;
