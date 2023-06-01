export interface MyGeoLocation {
  location: {
    lat: number;
    lng: number;
  };
  errMsg: string;
}

export default function findMyGeoLocation(): Promise<MyGeoLocation> {
  return new Promise<MyGeoLocation>(resolve => {
    function success(position: { coords: { latitude: number; longitude: number } }) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      resolve({
        location: {
          lat: latitude,
          lng: longitude,
        },
        errMsg: '',
      });
    }

    function error() {
      // 사용자가 위치 사용 권한을 주지 않으면 고정 좌표 반환

      resolve({
        location: {
          lat: 37.3595704,
          lng: 127.105399,
        },
        errMsg: '위치 사용 권한을 허용해 주세요!',
      });
    }

    if (!navigator.geolocation) {
      // Geolocation을 사용할 수 없는 환경일 때도 고정 좌표 반환
      resolve({
        location: {
          lat: 37.3595704,
          lng: 127.105399,
        },
        errMsg: '위치 찾기 기능을 사용할 수 없는 환경입니다!',
      });
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });
}
