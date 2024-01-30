import PostListItem from 'components/PostListItem';
import React from 'react';
import { items } from 'utils/dummydata';

const WhisperPost = () => {
  return (
    <ul>
      <PostListItem items={items} />
    </ul>
  );
};

export default WhisperPost;
