import React from 'react';
import styled from 'styled-components';

import GardenPost from './GardenPost';

interface GardenListProps {
  setSelectedGarden: React.Dispatch<React.SetStateAction<boolean>>;
}

function GardenList({ setSelectedGarden }: GardenListProps) {
  return (
    <ListContainer>
      <GardenPost setSelectedGarden={setSelectedGarden} />
    </ListContainer>
  );
}

export default GardenList;

const ListContainer = styled.ol`
  width: 100%;
`;
