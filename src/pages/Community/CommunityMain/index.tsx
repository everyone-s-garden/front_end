import { useGetAllPosts } from 'api/CommunityAPI';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CommunityHeader from './CommunityHeader';
import styled from 'styled-components';
import OrderDropdown from './OrderDropdown';
import PostList from 'components/PostList';

const Community = () => {
  const { data, fetchNextPage, hasNextPage, refetch } = useGetAllPosts();

  const { ref } = useInfiniteScroll<HTMLDivElement>({
    fetchData: () => {
      fetchNextPage();
    },
    hasNextPage,
  });

  return (
    <>
      <Helmet>
        <title>속닥속닥 페이지</title>
      </Helmet>
      <CommunityHeader />

      <Container>
        <OrderDropdown />
        <PostList />
      </Container>
      <div ref={ref}></div>
    </>
  );
};

export default Community;

const Container = styled.section`
  max-width: 1194px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  margin-bottom: 20px;
`;
