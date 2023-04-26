import React from 'react';
import styled from 'styled-components';

import { COLOR } from 'constants/style';
import GardenList from './GardenList';

function ListView() {
  return (
    <ListDiv>
      <GardenList />
    </ListDiv>
  );
}

export default ListView;

const ListDiv = styled.div`
  flex-shrink: 0;
  width: 480px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${COLOR.BLACK[800]};
  overflow-y: auto;
`;
