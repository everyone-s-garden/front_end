import HttpRequest from './HttpRequest';
import { GetAllWeatherResponse, GetPerTimeWeatherResponse, GetWeeklyWeatherResponse } from './type';

export const WeatherAPI = {
  getAllWeather: async (): Promise<GetAllWeatherResponse> => {
    // const res = await HttpRequest.get(`v1/weather/all`);
    return {
      weatherApiResult: [
        {
          regionName: '강원도',
          skyValue: '맑음',
          temperatureValue: '5.5',
        },
        {
          regionName: '서울특별시',
          skyValue: '맑음',
          temperatureValue: '8.1',
        },
        {
          regionName: '경기도',
          skyValue: '맑음',
          temperatureValue: '9.6',
        },
        {
          regionName: '경상남도',
          skyValue: '맑음',
          temperatureValue: '9.6',
        },
        {
          regionName: '경상북도',
          skyValue: '맑음',
          temperatureValue: '7.5',
        },
        {
          regionName: '광주광역시',
          skyValue: '맑음',
          temperatureValue: '11.4',
        },
        {
          regionName: '대구광역시',
          skyValue: '맑음',
          temperatureValue: '7.5',
        },
        {
          regionName: '대전광역시',
          skyValue: '맑음',
          temperatureValue: '9.2',
        },
        {
          regionName: '부산광역시',
          skyValue: '맑음',
          temperatureValue: '10.7',
        },
        {
          regionName: '세종특별자치시',
          skyValue: '맑음',
          temperatureValue: '9.5',
        },
        {
          regionName: '울산광역시',
          skyValue: '맑음',
          temperatureValue: '7.6',
        },
        {
          regionName: '인천광역시',
          skyValue: '맑음',
          temperatureValue: '9',
        },
        {
          regionName: '전라남도',
          skyValue: '비',
          temperatureValue: '11.2',
        },
        {
          regionName: '전라북도',
          skyValue: '맑음',
          temperatureValue: '12',
        },
        {
          regionName: '제주특별자치도',
          skyValue: '비',
          temperatureValue: '16.3',
        },
        {
          regionName: '충청남도',
          skyValue: '맑음',
          temperatureValue: '8.9',
        },
        {
          regionName: '충청북도',
          skyValue: '맑음',
          temperatureValue: '10.7',
        },
      ],
    };
  },
  // getPerTimeWeather: async (lat: number, long: number) => {
  //   const { data } = await HttpRequest.get(`v1/weather/time?lat=${lat}&long=${long}`);
  //   return data;
  // },

  getPerTimeWeather: async (lat: number, long: number): Promise<GetPerTimeWeatherResponse> => {
    return {
      weatherTimeResponses: [
        {
          baseDate: '20231214',
          temperature: '9',
          skyStatus: '비',
          fsctDate: '20231214',
          fsctTime: '1000',
        },
        {
          baseDate: '20231214',
          temperature: '9',
          skyStatus: '비',
          fsctDate: '20231214',
          fsctTime: '1100',
        },
        {
          baseDate: '20231214',
          temperature: '9',
          skyStatus: '비',
          fsctDate: '20231214',
          fsctTime: '1200',
        },
        {
          baseDate: '20231214',
          temperature: '10',
          skyStatus: '비',
          fsctDate: '20231214',
          fsctTime: '1300',
        },
        {
          baseDate: '20231214',
          temperature: '9',
          skyStatus: '비',
          fsctDate: '20231214',
          fsctTime: '1400',
        },
        {
          baseDate: '20231215',
          temperature: '7',
          skyStatus: '비',
          fsctDate: '20231215',
          fsctTime: '1200',
        },
      ],
      regionName: '경기도',
    };
  },

  // getWeeklyWeather: async (lat: number, long: number) => {
  //   const { data } = await HttpRequest.get(`v1/weather/week?lat=${lat}&long=${long}`);
  //   return data;
  // },
  getWeeklyWeather: async (lat: number, long: number): Promise<GetWeeklyWeatherResponse> => {
    return {
      skyStatusTwoDaysAfter: '구름많음',
      skyStatusThreeDaysAfter: '맑음',
      skyStatusFourDaysAfter: '흐림',
      skyStatusFiveDaysAfter: '맑음',
      skyStatusSixDaysAfter: '맑음',
      regionName: '경기도',
    };
  },
};
