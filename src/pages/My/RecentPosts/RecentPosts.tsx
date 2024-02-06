import PostListItem from 'components/PostListItem';
import React, { useEffect, useState } from 'react';
import { items } from 'utils/dummydata';
import { getMyGardensAPI } from 'utils/fetchGardenData';

const RecentPosts = () => {
  useEffect(() => {
    (async () => {
      const response = await getMyGardensAPI.fetchRecentGardensAPI();
      console.log(response);
    })();
    return () => {};
  }, []);
  return (
    <div style={{ flex: 1 }}>
      <ul>
        <PostListItem items={items} />
      </ul>
    </div>
  );
};

export default RecentPosts;
