import PostListItem from 'components/PostListItem';
import React, { useEffect, useState } from 'react';
import { items } from 'utils/dummydata';
import { ICropTradeItem } from 'api/type';
import { getCropTradeAPI } from 'utils/fetchGardenData';
const WishList = () => {
  const [wishList, setWishList] = useState<ICropTradeItem[]>([]);
  useEffect(() => {
    (async () => {
      const res = await getCropTradeAPI.fetchWishListAPI();

      const { cropInfos } = res.data;
      setWishList([...cropInfos]);
    })();
  }, []);

  if (wishList.length === 0) {
    return <h1>북마크한 게시글이 존재하지 않습니다.</h1>;
  }

  return (
    <div style={{ flex: 1 }}>
      <ul>
        <PostListItem tradeItems={wishList} />
      </ul>
    </div>
  );
};

export default WishList;
