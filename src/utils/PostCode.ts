import axios, { AxiosResponse } from 'axios';

const handleComplete = async (data: IAddressData) => {
  let fullAddress = data.address;
  let extraAddress = '';

  if (data.addressType === 'R') {
    if (data.bname !== '') {
      extraAddress += data.bname;
    }
    if (data.buildingName !== '') {
      extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    }
    fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
  }
  const postCode: string = data.zonecode;
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${
    process.env.REACT_APP_GOOGLE_API_KEY
  }` as const;
  const res: AxiosResponse<{ results: IResponse[] }> = await axios.get(apiUrl);
  const potential_address = res.data.results.find((i: IResponse) => i.formatted_address.startsWith('대한민국'));
  console.log(potential_address);
  if (potential_address) {
    const { lat, lng } = potential_address.geometry.location;
    const address_data = {
      lat: lat.toString(),
      lng: lng.toString(),
      address: fullAddress,
    };
    return address_data;
  } else {
    alert('주소를 찾을 수 없습니다.');
  }
};

export default handleComplete;

interface ILatLng {
  lat: string;
  lng: string;
}

interface IGeometry {
  bounds: {
    northeast: ILatLng;
    southwest: ILatLng;
  };
  location: ILatLng;
  viewport: {
    northeast: ILatLng;
    southwest: ILatLng;
  };
}

interface IResponse {
  formatted_address: string;
  geometry: IGeometry;
}
interface IAddressData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
}
