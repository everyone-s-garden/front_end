import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { gardensAtom } from 'recoil/atom';
import GardenPost from './GardenPost';

function GardenList() {
  const [gardens] = useRecoilState(gardensAtom);
  console.log(gardens);
  const renderGardenPosts =
    gardens &&
    gardens.map(garden => {
      return (
        <GardenPost
          key={garden.id}
          id={garden.id}
          size={garden.size}
          name={garden.name}
          price={garden.price}
          images={garden.images}
        />
      );
    });

  return <ListContainer>{renderGardenPosts}</ListContainer>;
}

export default GardenList;

const ListContainer = styled.ol`
  width: 100%;
`;
