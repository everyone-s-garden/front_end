import HttpRequest from './HttpRequest';
import { GetAllWeatherResponse, GetPerTimeWeatherResponse, GetWeeklyWeatherResponse } from './type';

export const WeatherAPI = {
  getAllWeather: async (): Promise<GetAllWeatherResponse> => {
    const { data } = await HttpRequest.get(`v1/weathers/all`);
    return data;
  },

  getPerTimeWeather: async (lat: number, long: number): Promise<GetPerTimeWeatherResponse> => {
    const { data } = await HttpRequest.get(`v1/weathers/time?latitude=${lat}&longitude=${long}`);
    return data;
  },

  getWeeklyWeather: async (lat: number, long: number): Promise<GetWeeklyWeatherResponse> => {
    const { data } = await HttpRequest.get(`v1/weathers/week?latitude=${lat}&longitude=${long}`);
    return data;
  },
};
