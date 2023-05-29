import HttpRequest from './HttpRequest';

export const WeatherAPI = {
  getAllWeather: async () => {
    const { data } = await HttpRequest.get(`v1/weather/all`);
    return data;
  },
};
