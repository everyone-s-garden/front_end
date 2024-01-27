import clear from 'assets/main/weather/clear.svg';
import cloudy from 'assets/main/weather/cloudy.svg';
import rainy from 'assets/main/weather/rainy.svg';
import snow from 'assets/main/weather/snow.svg';
import wind from 'assets/main/weather/wind.svg';
import cloudRain from 'assets/main/weather/cloud-rain.svg';
import cloudSnow from 'assets/main/weather/cloud-snow.svg';
import lightning from 'assets/main/weather/lightning.svg';
import cloud from 'assets/main/weather/cloud.svg';
import hazy from 'assets/main/weather/hazy.svg';

const getWeatherIcon = (weather: string): string => {
  switch (weather) {
    case '맑음':
      return clear;
    case '흐림':
      return cloudy;
    case '비':
      return rainy;
    case '눈':
      return snow;
    case '바람':
      return wind;
    case '흐리고비':
      return cloudRain;
    case '흐리고눈':
      return cloudSnow;
    case '번개':
      return lightning;
    case '구름':
      return cloud;
    case '구름약간':
      return hazy;
    default:
      return clear;
  }
};

export default getWeatherIcon;
