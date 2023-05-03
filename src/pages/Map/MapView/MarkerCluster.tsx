import React, { useState } from 'react';
import { useNavermaps, useMap, Overlay } from 'react-naver-maps';

import testImage from 'assets/garden-image1.jpg';
import { makeMarkerClustering } from 'utils/makeMarkerClustering';
import testData from 'utils/testData';
import { OverlayProps } from 'react-naver-maps';

const MarkerCluster = () => {
  const navermaps = useNavermaps();
  const map = useMap();

  const MarkerClustering = makeMarkerClustering(window.naver);

  const clusterMarker1 = {
    content: `<div class="cluster_marker1"></div>`,
    size: new navermaps.Size(40, 40),
    anchor: new navermaps.Point(20, 20),
  };
  const clusterMarker2 = {
    content: `<div class="cluster_marker2"></div>`,
    size: new navermaps.Size(40, 40),
    anchor: new navermaps.Point(20, 20),
  };

  const data = testData.searchResult.accidentDeath;

  const [cluster] = useState(() => {
    const markers: naver.maps.Marker[] = [];

    data.forEach(dt => {
      const spot = dt,
        latlng = new naver.maps.LatLng(Number(spot.grd_la), Number(spot.grd_lo)),
        marker = new naver.maps.Marker({
          position: latlng,
          icon: {
            content: `<div class="marker">
                <svg
                  class="marker_icon"
                  viewBox="0 0 384 512"
                  fill="currentColor"
                  stroke="white" stroke-width="10"
                >
                  <path d="M384 192c0 87.4-117 243-168.3 307.2-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192 0 86 86 0 192 0s192 86 192 192z" />
                </svg>
                <img class="marker_image" src=${testImage} alt="텃밭 이미지" />
              </div>`,
            origin: new naver.maps.Point(0, 90),
            anchor: new naver.maps.Point(35, 90),
          },
        });

      // 마커 이벤트 등록
      const onClickHandler = () => {
        console.log(spot.x_coord);
      };
      // 마우스 호버시 마커를 앞으로 가져옴
      const onMouseOverHandler = () => {
        marker.setZIndex(101);
      };
      const onMouseOutHandler = () => {
        marker.setZIndex(100);
      };

      naver.maps.Event.addListener(marker, 'click', onClickHandler);
      naver.maps.Event.addListener(marker, 'mouseover', onMouseOverHandler);
      naver.maps.Event.addListener(marker, 'mouseout', onMouseOutHandler);

      markers.push(marker);
    });

    const cluster = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 13,
      map: map,
      markers: markers,
      disableClickZoom: false,
      gridSize: 180,
      icons: [clusterMarker1, clusterMarker2],
      indexGenerator: [10, 100],
      stylingFunction: function (clusterMarker: any, count: number) {
        clusterMarker.getElement().querySelector('div:first-child').innerText = count;
      },
    });

    return cluster;
  });

  return <Overlay element={cluster as any} />;
};

export default MarkerCluster;
