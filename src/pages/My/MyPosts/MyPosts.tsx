import { IPostListItem } from 'api/type';
import PostListItem from 'components/PostListItem';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { items } from 'utils/dummydata';
import { getMyGardensAPI } from 'utils/fetchGardenData';

const MyPosts = () => {
  const [gardens, setGardens] = useState<IPostListItem[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getMyGardensAPI.fetchMineGardensAPI();
      const { gardenMineResponses } = response.data;
      setGardens([...gardenMineResponses]);
    })();
    return () => {};
  }, []);
  return (
    <Container>
      <PostListItem items={gardens} />
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
