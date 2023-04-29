import React from 'react';
import styled from 'styled-components';

import { BREAK_POINT, COLOR } from 'constants/style';
import GardenList from './GardenList';
import GardenDetail from './GardenDetail';

interface ListViewProps {
  isExpand: boolean;
}

function ListView({ isExpand }: ListViewProps) {
  return (
    <ListDiv isExpand={isExpand}>
      <GardenList />
      {/* <GardenDetail /> */}
    </ListDiv>
  );
}

export default ListView;

const ListDiv = styled.div<{ isExpand: boolean }>`
  flex-shrink: 0;
  width: 100%;
  height: ${props => (props.isExpand ? '0%' : '280px')};
  display: flex;
  flex-direction: row;
  border-top: 1px solid ${COLOR.BLACK[500]};
  overflow-y: auto;
  transition: all 0.2s ease-in;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: ${props => (props.isExpand ? '0%' : '400px')};
    height: 100%;
    flex-direction: column;
    border-top: 0;
    border-left: 1px solid ${COLOR.BLACK[500]};
  }
`;
