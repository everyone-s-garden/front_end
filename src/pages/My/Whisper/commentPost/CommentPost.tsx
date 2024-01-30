import PostListItem from 'components/PostListItem';
import React from 'react';
import { items } from 'utils/dummydata';

const CommentPost = () => {
  return (
    <ul>
      <PostListItem items={items} />
    </ul>
  );
};

export default CommentPost;
