import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Listener, NaverMap, useNavermaps } from 'react-naver-maps';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

import { gardensAtom, searchTypeAtom } from 'recoil/atom';
import MarkerCluster from './MarkerCluster';
import MyLocationBtn from './MyLocationBtn';
import MyLocationMarker from './MyLocationMarker';
import findMyGeoLocation from 'utils/findMyGeoLocation';
import MiniLoader from 'components/MiniLoader';
import { GardenAPI } from 'api/GardenAPI';

interface MyMapProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInitializing: React.Dispatch<React.SetStateAction<boolean>>;
  map: naver.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<naver.maps.Map | null>>;
}

const MyMap = ({ isLoading, setIsLoading, setIsInitializing, map, setMap }: MyMapProps) => {
  const navermaps = useNavermaps();
  const myLocation = useRef<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchType] = useRecoilState(searchTypeAtom);
  const [_, setGardens] = useRecoilState(gardensAtom);

  const fetchGardenData = () => {
    return GardenAPI.getGardenByCoordinate(searchType, map!);
  };
  const { data, refetch } = useQuery(['gardens', searchType], fetchGardenData, { enabled: map !== null });

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

  useEffect(() => {
    setGardens(data);
  }, [data]);

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

        <MarkerCluster />
        <MyLocationBtn onClick={moveMyLocation} />

        {myLocation.current && <MyLocationMarker myLocation={myLocation} />}

        <Listener type={'idle'} listener={refetch} />
      </NaverMap>
    </>
  );
};

export default MyMap;
