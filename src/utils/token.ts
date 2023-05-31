import axios, {
  AxiosError,
  AxiosInstance,
  // AxiosRequestConfig, // Change to InternalAxiosRequestConfig
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig,
  Axios,
} from 'axios';
import { getItem, removeItem } from './session';
// Request Interceptor
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const { method, url } = config;
  // Set Headers Here
  // Check Authentication Here
  // Set Loading Start Here
  const token = getItem('access_token') as string;
  let replaced_str = token.replaceAll('"', '');
  if (method === 'get') {
    // config.timeout = 15000;
    config.headers.Authorization = `Bearer ${replaced_str}`;
  } else if (method === 'post') {
    // config.timeout = 15000;
    config.headers.Authorization = `Bearer ${replaced_str}`;
  }
  return config;
};
const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;
  // Set Loading End Here
  // Handle Response Data Here
  return response;
};
const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { statusText, status } = (error.response as AxiosResponse) ?? {};

    switch (status) {
      case 401: {
        // "Login required"
        break;
      }
      case 403: {
        // "Permission denied"
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

    if (status === 401) {
      // Delete Token & Go To Login Page if you required.
      removeItem('access_token');
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
