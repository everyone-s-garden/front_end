import React, { useState } from 'react';
import './map.css';
import { Container as MapDiv } from 'react-naver-maps';
import styled from 'styled-components';

import Loader from 'components/Loader';
import MyMap from './MapView/MyMap';
import ListView from './ListView/ListView';
import OptionBar from './MapView/OptionBar';

const Map = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <MapPage>
      <Loader isLoading={isLoading} />

      <OptionBar />
      <MapViewer>
        <MapDiv
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <MyMap setIsLoading={setIsLoading} />
        </MapDiv>
        <ListView />
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
  overflow: hidden;
`;
