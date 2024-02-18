import { IPostListItem } from 'api/type';
import PostListItem from 'components/PostListItem';
import React, { useEffect, useState } from 'react';
import { items } from 'utils/dummydata';
import { getMyGardensAPI } from 'utils/fetchGardenData';

const RecentPosts = () => {
  const [gardens, setGardens] = useState<IPostListItem[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getMyGardensAPI.fetchRecentGardensAPI();
      const { recentGardenResponses } = response.data;

      setGardens([...recentGardenResponses]);
    })();
    return () => {};
  }, []);
  console.log(gardens);

  if (gardens.length === 0) {
    return <h1>최근 본 게시글이 존재하지 않습니다.</h1>;
  }
  return (
    <div style={{ flex: 1 }}>
      <ul>
        <PostListItem items={gardens} />
      </ul>
    </div>
  );
};

export default RecentPosts;
