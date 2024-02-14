import { useGetAllPosts } from 'api/CommunityAPI';
import PostList from 'components/PostList';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import React from 'react';

const CommunityPostList = () => {
  const { data, fetchNextPage, hasNextPage } = useGetAllPosts();

  const { ref } = useInfiniteScroll<HTMLDivElement>({
    fetchData: () => {
      fetchNextPage();
    },
    hasNextPage,
  });

  return (
    <>
      {data && <PostList posts={data} />}
      <div ref={ref}></div>
    </>
  );
};

export default CommunityPostList;
