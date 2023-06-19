import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { gardensAtom } from '../../../recoil/atom';
import GardenPost from './GardenPost';
<<<<<<< HEAD
import filterGardenData from '../../../utils/filterGardenData';
=======
import filterGardenData from 'utils/filterGardenData';
>>>>>>> refs/remotes/origin/master

function GardenList() {
  const [gardens] = useRecoilState(gardensAtom);

  return (
    <ListContainer>
      {gardens &&
        gardens.map(garden => {
          return (
            <GardenPost
              key={garden.id}
              id={garden.id}
              size={filterGardenData.filterSize(garden.size!)}
              name={garden.name}
              price={filterGardenData.filterPrice(garden.price!)}
              images={garden.images}
<<<<<<< HEAD
              status={garden.content}
=======
              status={garden.status}
>>>>>>> refs/remotes/origin/master
            />
          );
        })}
    </ListContainer>
  );
}

export default GardenList;

const ListContainer = styled.ol`
  width: 100%;
`;
