import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NaverMap, useNavermaps } from 'react-naver-maps';

import MarkerCluster from './MarkerCluster';
import MyLocationBtn from './MyLocationBtn';
import MyLocationMarker from './MyLocationMarker';
import findMyGeoLocation from 'utils/findMyGeoLocation';

interface MyMapProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyMap = ({ setIsLoading }: MyMapProps) => {
  const navermaps = useNavermaps();
  const myLocation = useRef<{
    lat: number;
    lng: number;
  } | null>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  const getMyLocation = useCallback(async () => {
    if (!map) return;

    const { location } = await findMyGeoLocation();
    myLocation.current = location;
    map.setCenter(new navermaps.LatLng(location.lat, location.lng));

    setIsLoading(false);
  }, [map, navermaps.LatLng, setIsLoading]);

  const moveMyLocation = async () => {
    if (!map) return;

    const { location } = await findMyGeoLocation();
    map.panTo(new navermaps.LatLng(location.lat, location.lng));
  };

  useEffect(() => {
    getMyLocation();
  }, [map, getMyLocation]);

  return (
    <>
      {/* <Loader isLoading={isLoading} /> */}
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
        <MarkerCluster />
        <MyLocationBtn onClick={moveMyLocation} />

        {myLocation.current && <MyLocationMarker myLocation={myLocation} />}
      </NaverMap>
    </>
  );
};

export default MyMap;
