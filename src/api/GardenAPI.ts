import customAxios from 'utils/token';
import HttpRequest from './HttpRequest';
import { getItem } from 'utils/session';

export const GardenAPI = {
  getGardenByRegion: async (type: number, region: string) => {
    const typeList = ['all', 'public', 'private'];
    const { data } = await HttpRequest.get(`v1/garden/${typeList[type]}/by-region?region=${region}&page=1&size=100`);
    return data;
  },
  getGardenByCoordinate: async (type: number, map: naver.maps.Map) => {
    const bounds = map.getBounds();
    const typeList = ['All', 'PUBLIC', 'PRIVATE'];

    const { data } = await HttpRequest.get(
<<<<<<< HEAD
      `/v2/gardens/by-complexes?gardenType=${
        typeList[type]
      }&pageNumber=0&startLat=${bounds.minY()}&startLong=${bounds.minX()}&endLat=${bounds.maxY()}&endLong=${bounds.maxX()}`,
    );
    // console.log('publicData', data.gardenByComplexesResponses);
=======
      `/v2/gardens/by-complexes?gardenType=PUBLIC&pageNumber=0&startLat=${bounds.minY()}&startLong=${bounds.minX()}&endLat=${bounds.maxY()}&endLong=${bounds.maxX()}`,
    );
    console.log('publicData', data.gardenByComplexesResponses);
>>>>>>> 56548e554b27e041a8a20449eafad3f0be5e6021
    return data.gardenByComplexesResponses;
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
