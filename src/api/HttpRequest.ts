import axios from 'axios';
import { getItem } from 'utils/session';

const HttpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

HttpRequest.interceptors.request.use(config => {
  const token = getItem('access_token');

  if (token) {
    config.headers['access-token'] = token;
  }

  return config;
});

export default HttpRequest;
