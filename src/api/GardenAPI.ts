import customAxios from 'utils/token';
import HttpRequest from './HttpRequest';
import { getItem } from 'utils/session';
import customAxios from 'utils/token';

export const GardenAPI = {
  getGardenByRegion: async (type: number, region: string) => {
    const typeList = ['all', 'public', 'private'];
    const { data } = await HttpRequest.get(`v1/garden/${typeList[type]}/by-region?region=${region}&page=1&size=50`);
    return data;
  },
  getGardenByCoordinate: async (type: number, map: naver.maps.Map) => {
    const bounds = map.getBounds();
    const typeList = ['all', 'public', 'private'];

    const { data } = await HttpRequest.get(
      `v1/garden/${
        typeList[type]
      }/by-coordinate?lat=${bounds.minY()},${bounds.maxY()}&long=${bounds.minX()},${bounds.maxX()}&page=1&size=50`,
    );

    return data;
  },
  getGardenDetail: async (gardenID: number) => {
    const token = getItem('access_token');
    if (token) {
      const data = await customAxios.get(`/v1/garden/${gardenID}`);
      return data;
    } else {
      const data = await HttpRequest.get(`/v1/garden/${gardenID}`);
      return data;
    }
  },
};
