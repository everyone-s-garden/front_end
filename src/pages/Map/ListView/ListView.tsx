import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { isExpandAtom, selectedGardenIdAtom } from 'recoil/atom';
import { BREAK_POINT } from 'constants/style';
import GardenList from './GardenList';
import GardenDetail from './GardenDetail';

function ListView() {
  const [isExpand] = useRecoilState(isExpandAtom);
  const [selectedGarden] = useRecoilState(selectedGardenIdAtom);

  return <ListDiv isExpand={isExpand}>{selectedGarden ? <GardenDetail /> : <GardenList />}</ListDiv>;
}

export default ListView;

const ListDiv = styled.div<{ isExpand: boolean }>`
  flex-shrink: 0;
  width: 100%;
  height: ${props => (props.isExpand ? '5%' : '95%')};
  display: flex;
  flex-direction: row;
  border-top: 1px solid #afafaf;
  overflow-y: auto;
  transition: all 0.2s ease-in;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: ${props => (props.isExpand ? '0%' : '379px')};
    height: 100%;
    flex-direction: column;
    border-top: 0;
    border-left: 1px solid #afafaf;
  }
`;
