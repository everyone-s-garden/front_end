import React, { useState } from 'react';
import './map.css';
import { Container as MapDiv } from 'react-naver-maps';
import styled from 'styled-components';

import { BREAK_POINT } from 'constants/style';
import Loader from 'components/Loader';
import MyMap from './MapView/MyMap';
import ListView from './ListView/ListView';
import OptionBar from './MapView/OptionBar';

const Map = () => {
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [selectedGarden, setSelectedGarden] = useState<boolean>(false);

  return (
    <MapPage>
      <Loader isLoading={isInitializing} />

      <OptionBar />
      <MapViewer>
        <MapDiv
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            transition: 'all 0.2s ease-in',
          }}
        >
          <MyMap
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setIsInitializing={setIsInitializing}
            isExpand={isExpand}
            setIsExpand={setIsExpand}
            setSelectedGarden={setSelectedGarden}
          />
        </MapDiv>
        <ListView isExpand={isExpand} selectedGarden={selectedGarden} setSelectedGarden={setSelectedGarden} />
      </MapViewer>
    </MapPage>
  );
};

export default Map;

const MapPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MapViewer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: row;
  }
`;
