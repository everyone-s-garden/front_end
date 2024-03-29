import { useGetMyLikedPosts } from 'api/CommunityAPI';
import PostListItem from 'components/PostListItem';
import React from 'react';
import { items } from 'utils/dummydata';

const Whisper = () => {
  const { data } = useGetMyLikedPosts();

  return (
    <ul>
      <PostListItem items={items} />
    </ul>
  );
};

export default Whisper;
