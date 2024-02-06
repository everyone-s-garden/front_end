import PostListItem from 'components/PostListItem';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { items } from 'utils/dummydata';
import { getMyGardensAPI } from 'utils/fetchGardenData';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getMyGardensAPI.fetchMineGardensAPI();
      console.log(response);
    })();
    return () => {};
  }, []);
  return (
    <Container>
      <PostListItem items={items} />
    </Container>
  );
};

export default MyPosts;

const Container = styled.ul`
  display: flex;
  flex: 1;
  max-width: 662px;
  min-width: 334px;
`;
