import { useQuery } from '@tanstack/react-query';
import HttpRequest from './HttpRequest';
import { GetAllWeatherResponse, GetPerTimeWeatherResponse, GetWeeklyWeatherResponse, WeatherData } from './type';

// TODO: react-query 적용 후 삭제
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

const getAllWeather = async (): Promise<WeatherData[]> => {
  const { data } = await HttpRequest.get(`v1/weathers/all`);
  return data.weatherApiResult;
};

const getPerTimeWeather = async (lat: number, long: number): Promise<GetPerTimeWeatherResponse> => {
  const { data } = await HttpRequest.get(`v1/weathers/time?latitude=${lat}&longitude=${long}`);
  return data;
};

const getWeeklyWeather = async (lat: number, long: number): Promise<GetWeeklyWeatherResponse> => {
  const { data } = await HttpRequest.get(`v1/weathers/week?latitude=${lat}&longitude=${long}`);
  return data;
};

export const useGetAllWeather = () => {
  return useQuery({
    queryKey: ['allWeather'],
    queryFn: getAllWeather,
  });
};

export const useGetPerTimeWeather = (lat: number, long: number) => {
  return useQuery({
    queryKey: ['perTimeWeather', { lat, long }],
    queryFn: () => getPerTimeWeather(lat, long),
  });
};

export const useGetWeeklyWeather = (lat: number, long: number) => {
  return useQuery({
    queryKey: ['weeklyWeather', { lat, long }],
    queryFn: () => getWeeklyWeather(lat, long),
  });
};
