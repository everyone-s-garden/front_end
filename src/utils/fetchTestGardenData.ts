export default function fetchTestGardenData(): Promise<TestGardenData[]> {
  return new Promise(res => {
    setTimeout(() => {
      res(test_garden_data);
    }, 1000);
  });
}

export interface TestGardenData {
  type: string;
  title: string;
  address: string;
  location: { lat: number; lng: number };
  area: 330.58;
  period: string[];
  price: number;
  contact: string;
  pictures: string[];
}

const test_garden_data: TestGardenData[] = [
  {
    type: '민간',
    title: '',
    address: '서울 영등포구 경인로 838-1',
    location: { lat: 37.4984394, lng: 126.9468442 },
    area: 330.58,
    period: ['2023/03/13', '2023/05/16'],
    price: 0,
    contact: '010-1234-5678',
    pictures: [],
  },
  {
    type: '민간',
    title: '',
    address: '서울 금천구 벚꽃로 316',
    location: { lat: 37.5183661, lng: 126.9472516 },
    area: 330.58,
    period: ['2023/03/13', '2023/05/16'],
    price: 2000,
    contact: '010-1234-5678',
    pictures: [],
  },
  {
    type: '공공',
    title: '',
    address: '서울 영등포구 선유로9길 10',
    location: { lat: 37.5234394, lng: 126.9368442 },
    area: 330.58,
    period: ['2023/03/13', '2023/05/16'],
    price: 10000,
    contact: '010-1234-5678',
    pictures: [],
  },
];
