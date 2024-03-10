import React, { useEffect, useRef, useCallback } from 'react';
import { Listener, NaverMap, useNavermaps } from 'react-naver-maps';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { gardensAtom, isExpandAtom, searchTypeAtom, selectedGardenIdAtom, selectedMapLocationAtom } from 'recoil/atom';
import MarkerCluster from './MarkerCluster';
import MyLocationBtn from './MyLocationBtn';
import MyLocationMarker from './MyLocationMarker';
import findMyGeoLocation from 'utils/findMyGeoLocation';
import MiniLoader from 'components/MiniLoader';
import { GardenAPI } from 'api/GardenAPI';
import { useLocation } from 'react-router-dom';

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
  const selectedLocation = useRecoilValue(selectedMapLocationAtom);
  const locationRouter = useLocation();
  const setSelectedGarden = useSetRecoilState(selectedGardenIdAtom);
  const setIsExpand = useSetRecoilState(isExpandAtom);

  const fetchGardenData = () => {
    return GardenAPI.getGardenByCoordinate(searchType, map!);
  };
  const { data, refetch, status } = useQuery({
    queryKey: ['gardens', searchType],
    queryFn: fetchGardenData,
    enabled: map !== null,
  });
  const getMyLocation = useCallback(async () => {
    if (!map) return;

    const { location } = await findMyGeoLocation();
    myLocation.current = location;

    if (locationRouter.state) {
      map.setCenter(new navermaps.LatLng(locationRouter.state.latitude, locationRouter.state.longitude));
      setSelectedGarden(locationRouter.state.gardenId);
      setIsExpand(true);
    } else {
      map.setCenter(new navermaps.LatLng(location.lat, location.lng));
    }

    setIsInitializing(false);
  }, [map, navermaps.LatLng, setIsInitializing, locationRouter.state, setSelectedGarden, setIsExpand]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!map || !selectedLocation) return;
    map.panTo(new navermaps.LatLng(selectedLocation?.latitude, selectedLocation?.longitude));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation]);

  return (
    <>
      <NaverMap
        ref={setMap}
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        mapDataControl={false}
        scaleControl={false}
        defaultZoom={10}
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
