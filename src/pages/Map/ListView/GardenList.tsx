import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { gardensAtom } from '../../../recoil/atom';
import GardenPost from './GardenPost';
import filterGardenData from '../../../utils/filterGardenData';
import faceImg from 'assets/map/no_garden_illust.jpg';

function GardenList() {
  const [gardens] = useRecoilState(gardensAtom);
  return (
    <ListContainer>
      {gardens && gardens.length > 0 ? (
        gardens.map((garden, index) => {
          return (
            <GardenPost
              key={index}
              id={garden.id}
              size={filterGardenData.filterSize(garden.size!)}
              name={garden.gardenName}
              price={filterGardenData.filterPrice(garden.price!)}
              images={garden.images}
              status={garden.status}
            />
          );
        })
      ) : (
        <EmptyList>
          <img src={faceImg} />
          <h2>해당 지역에는 텃밭이 없어요!</h2>
          <p>지도를 다른 곳으로 움직여보세요.</p>
        </EmptyList>
      )}
    </ListContainer>
  );
}

export default GardenList;

const ListContainer = styled.ol`
  width: 100%;
  height: 100%;
`;

const EmptyList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h2 {
    margin-top: 16px;
    color: #80ac49;
    font-size: 18px;
    font-weight: 500;
  }
  & > p {
    margin-top: 6px;
    color: #80ac49;
    font-size: 16px;
    font-weight: 300;
  }
`;
