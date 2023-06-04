import axios from 'axios';

const host = window.location.hostname === 'localhost' ? `http://${process.env.REACT_APP_API_BASE_URL}` : 'api';

const HttpRequest = axios.create({
  baseURL: host,
});

export default HttpRequest;
