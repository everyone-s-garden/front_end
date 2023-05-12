import HttpRequest from './HttpRequest';

export const GardenAPI = {
  getGardenByRegion: async (type: string, region: string) => {
    const { data } = await HttpRequest.get(`v1/garden/${type}/by-region?region=${region}&page=1&size=10`);
    return data;
  },
  getGardenByCoordinate: async (type: string, map: naver.maps.Map) => {
    const bounds = map.getBounds();
    const { data } = await HttpRequest.get(
      `v1/garden/${type}/by-coordinate?x=${bounds.minY()},${bounds.maxY()}&y=${bounds.minX()},${bounds.maxX()}`,
    );

    return data;
  },
};
