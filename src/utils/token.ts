import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getItem } from './session';
import { Axios } from 'axios';

// 요청 인터셉터 타입
type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

// 응답 인터셉터 타입
type ResponseInterceptor<T> = (response: AxiosResponse<T>) => AxiosResponse<T> | Promise<AxiosResponse<T>>;

// axios instance 생성 함수
const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 5000,
});
const access_token = getItem('access_token');
const token = access_token ? JSON.parse(access_token) : null;
// 요청 인터셉터 등록
instance.interceptors.request.use(
  config => {
    // 요청이 시작되기 전에 수행할 작업 (ex. 토큰을 헤더에 추가)
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    // 요청에 실패한 경우 수행할 작업
    return Promise.reject(error);
  },
);

// 응답 인터셉터 등록
instance.interceptors.response.use(
  response => {
    // 응답 데이터를 가공한 후 반환
    return response;
  },
  error => {
    // 응답 에러를 처리
    return Promise.reject(error);
  },
);

export const axiosInstance: AxiosInstance = instance;

// const url = config.url;
// if (url.startsWith('/api/auth')) {
//   const access_token = getItem('access_token');
//   const token = access_token ? JSON.parse(access_token) : null;
//   config.headers.Authorization = `Bearer ${token}`;
// }
