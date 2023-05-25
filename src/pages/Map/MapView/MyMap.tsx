import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Listener, NaverMap, useNavermaps } from 'react-naver-maps';
import { useQuery } from '@tanstack/react-query';

import MarkerCluster from './MarkerCluster';
import MyLocationBtn from './MyLocationBtn';
import ExpandBtn from './ExpandBtn';
import MyLocationMarker from './MyLocationMarker';
import findMyGeoLocation from 'utils/findMyGeoLocation';
import MiniLoader from 'components/MiniLoader';
import { GardenAPI } from 'api/GardenAPI';
import { GardenData } from 'api/type';

interface MyMapProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInitializing: React.Dispatch<React.SetStateAction<boolean>>;
  isExpand: boolean;
  setIsExpand: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedGarden: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyMap = ({
  isLoading,
  setIsLoading,
  setIsInitializing,
  isExpand,
  setIsExpand,
  setSelectedGarden,
}: MyMapProps) => {
  const navermaps = useNavermaps();
  const myLocation = useRef<{
    lat: number;
    lng: number;
  } | null>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [gardens, setGardens] = useState<GardenData[]>([]);

  const fetchGardenData = () => {
    return GardenAPI.getGardenByCoordinate('public', map!);
  };
  const { data, refetch } = useQuery(['gardens'], fetchGardenData, { enabled: !!map });
  useEffect(() => {
    setGardens(data);
  }, [data]);

  const getMyLocation = useCallback(async () => {
    if (!map) return;

    const { location } = await findMyGeoLocation();
    myLocation.current = location;
    map.setCenter(new navermaps.LatLng(location.lat, location.lng));

    setIsInitializing(false);
  }, [map, navermaps.LatLng, setIsInitializing]);

  const moveMyLocation = async () => {
    if (!map) return;
    setIsLoading(true);

    const { location } = await findMyGeoLocation();
    map.panTo(new navermaps.LatLng(location.lat, location.lng));
    setIsLoading(false);
  };

  useEffect(() => {
    getMyLocation();
  }, [map, getMyLocation]);

  return (
    <>
      <NaverMap
        ref={setMap}
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={12}
        zoomControl
        zoomControlOptions={{
          style: naver.maps.ZoomControlStyle.SMALL,
          position: navermaps.Position.TOP_LEFT,
        }}
      >
        <MiniLoader isLoading={isLoading} />

        <MarkerCluster gardens={gardens} setSelectedGarden={setSelectedGarden} />
        <MyLocationBtn onClick={moveMyLocation} />
        <ExpandBtn map={map} isExpand={isExpand} setIsExpand={setIsExpand} />

        {myLocation.current && <MyLocationMarker myLocation={myLocation} />}

        <Listener type={'idle'} listener={refetch} />
      </NaverMap>
    </>
  );
};

export default MyMap;
