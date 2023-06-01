import React from 'react';
import { Marker, useNavermaps } from 'react-naver-maps';

interface MyLocationMarkerProps {
  myLocation: React.MutableRefObject<{
    lat: number;
    lng: number;
  } | null>;
}

export default function MyLocationMarker({ myLocation }: MyLocationMarkerProps) {
  const navermaps = useNavermaps();

  return (
    <Marker
      position={new navermaps.LatLng(myLocation.current!.lat, myLocation.current!.lng)}
      icon={{
        content: `<div class="circle"><div class="innerCircle"/></div>`,
      }}
    ></Marker>
  );
}
