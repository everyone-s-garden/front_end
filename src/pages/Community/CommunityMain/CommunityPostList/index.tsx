import { useGetAllPosts } from 'api/CommunityAPI';
import PostList from 'components/PostList';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import React, { Suspense } from 'react';
import { useRecoilState } from 'recoil';
import { communityParamsAtom } from 'recoil/atom';

const CommunityPostList = () => {
  const [params, setParams] = useRecoilState(communityParamsAtom);

  const { data, fetchNextPage, hasNextPage, refetch } = useGetAllPosts(params);

  console.log(params);

  const { ref } = useInfiniteScroll<HTMLDivElement>({
    fetchData: () => {
      fetchNextPage();
    },
    hasNextPage,
  });

  return (
    <>
      <Suspense>
        <PostList />
      </Suspense>
      <div ref={ref}></div>
    </>
  );
};

export default CommunityPostList;
