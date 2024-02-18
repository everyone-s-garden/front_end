import axios, {
  AxiosError,
  AxiosInstance,
  // AxiosRequestConfig, // Change to InternalAxiosRequestConfig
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig,
  Axios,
} from 'axios';
import { getCookie } from './cookie';
import { getItem, removeItem, setItem } from './session';
// Request Interceptor
const token = getItem('access_token') as string;

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const { method, url } = config;
  // Set Headers Here
  // Check Authentication Here
  // Set Loading Start Here
  // let replaced_str = token.replaceAll('"', '');
  if (method === 'get') {
    config.timeout = 15000;
    // config.headers.Authorization = `Bearer ${replaced_str}`;
    config.headers['access-token'] = token;
  } else if (method === 'post') {
    config.timeout = 15000;
    // config.headers.Authorization = `Bearer ${replaced_str}`;
    config.headers['access-token'] = token;
  } else if (method === 'delete') {
    config.timeout = 15000;
    // config.headers.Authorization = `Bearer ${replaced_str}`;
    config.headers['access-token'] = token;
  } else if (method === 'patch') {
    config.timeout = 15000;
    // config.headers.Authorization = `Bearer ${replaced_str}`;
    config.headers['access-token'] = token;
  } else if (method === 'put') {
    config.timeout = 15000;
    // config.headers.Authorization = `Bearer ${replaced_str}`;
    config.headers['access-token'] = token;
  }
  return config;
};
const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;
  return response;
};

const handle400error = async () => {
  const refresh_token = getCookie('refresh_token');
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}v1/auth/refresh`,
    {},
    {
      headers: {
        Refresh: refresh_token, // 'Refresh' 값을 요청 헤더에 추가
      },
    },
  );
  const { accessToken } = res.data;
  setItem('access_token', accessToken);
};
const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { statusText, status } = (error.response as AxiosResponse) ?? {};
    switch (status) {
      case 400: {
        handle400error();
        break;
      }
      case 401: {
        break;
      }
      case 403: {
        sessionStorage.clear();
        window.location.href = '/login';
        break;
      }
      case 404: {
        // "Invalid request"
        break;
      }
      case 500: {
        // "Server error"
        break;
      }
      default: {
        // "Unknown error occurred"
        break;
      }
    }
  } else {
    console.log(error);
  }

  return Promise.reject(error);
};
const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest, onErrorResponse);
  instance.interceptors.response.use(onResponse, onErrorResponse);

  return instance;
};

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});

const customAxios = setupInterceptors(api);

export default customAxios;
