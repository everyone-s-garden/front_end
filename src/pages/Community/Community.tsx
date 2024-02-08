import { useGetAllPosts } from 'api/CommunityAPI';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Community = () => {
  const { data, fetchNextPage } = useGetAllPosts();

  console.log(data);

  return (
    <>
      <div>ㅎㅇ</div>
      <Helmet>
        <title>속닥속닥 페이지</title>
      </Helmet>
    </>
  );
};

export default Community;
