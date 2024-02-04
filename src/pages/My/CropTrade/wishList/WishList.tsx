import PostListItem from 'components/PostListItem';
import React from 'react';
import { items } from 'utils/dummydata';

const WishList = () => {
  return (
    <div style={{ flex: 1 }}>
      <ul>
        <PostListItem items={items} />
      </ul>
    </div>
  );
};

export default WishList;
