import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { isExpandAtom, selectedGardenIdAtom } from 'recoil/atom';
import { BREAK_POINT, COLOR } from 'constants/style';
import GardenList from './GardenList';
import GardenDetail from './GardenDetail';
import ExpandBtn from './ExpandBtn';

interface ListViewProps {
  map: naver.maps.Map | null;
}

function ListView({ map }: ListViewProps) {
  const [isExpand] = useRecoilState(isExpandAtom);
  const [selectedGarden] = useRecoilState(selectedGardenIdAtom);

  return (
    <ListContainer isExpand={isExpand}>
      <ListDiv>{selectedGarden ? <GardenDetail /> : <GardenList />}</ListDiv>

      <ExpandBtn map={map} />
    </ListContainer>
  );
}

export default ListView;

const ListContainer = styled.div<{ isExpand: boolean }>`
  z-index: 10;
  flex-shrink: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${props => (props.isExpand ? 'calc(var(--vh, 1vh) * 100 - 150px)' : '2%')};
  background-color: ${COLOR.BACKGROUND};
  transition: all 0.2s ease-in;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    position: relative;
    width: ${props => (props.isExpand ? '379px' : '0%')};
    height: 100%;
  }
`;

const ListDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #afafaf;
  overflow-y: scroll;
  transition: all 0.2s ease-in;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: column;
    border-top: 0;
    border-left: 1px solid #afafaf;
  }
`;
