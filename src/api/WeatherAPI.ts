import HttpRequest from './HttpRequest';

export const WeatherAPI = {
  getAllWeather: async () => {
    const { data } = await HttpRequest.get(`http://localhost:8080/v1/weathers/all`);
    return data;
  },
  // getAllWeather: async () => {
  //   const { data } = await HttpRequest.get(`v1/weather/all`);
  //   return data;
  // },
  getPerTimeWeather: async (lat: number, long: number) => {
    const { data } = await HttpRequest.get(`http://localhost:8080/v1/weathers/time?lat=${lat}&long=${long}`);
    return data;
  },
  // getPerTimeWeather: async (lat: number, long: number) => {
  //   const { data } = await HttpRequest.get(`v1/weather/time?lat=${lat}&long=${long}`);
  //   return data;
  // },
  getWeeklyWeather: async (lat: number, long: number) => {
    const { data } = await HttpRequest.get(`http://localhost:8080/v1/weathers/week?lat=${lat}&long=${long}`);
    return data;
  },
  // getWeeklyWeather: async (lat: number, long: number) => {
  //   const { data } = await HttpRequest.get(`v1/weather/week?lat=${lat}&long=${long}`);
  //   return data;
  // },
};
