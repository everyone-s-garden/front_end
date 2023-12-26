import axios, { AxiosResponse } from 'axios';
import { IData, IData_Sever } from './type';
import { setItem } from 'utils/session';

const fetchGoogleApi = async (token: string) => {
  if (token === null) {
    throw new Error('response google token is missing');
  }
  try {
    const res_google: AxiosResponse = await axios.post<IData>('https://oauth2.googleapis.com/token', {
      code: token,
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URL,
      grant_type: 'authorization_code',
    });
    return res_google.data;
  } catch (err) {
    throw new Error(`google api error:${err}`);
  }
};
const fetchServerApi = async (accessToken: string) => {
  if (accessToken === null) {
    throw new Error('request to server access token is null');
  }
  try {
    const res_server: AxiosResponse = await axios.get<IData_Sever>(`${process.env.REACT_APP_API_BASE_URL}auth/google`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return res_server.data;
  } catch (err) {
    throw new Error(`server api error : ${err}`);
  }
};

export const getToken = async (token: string) => {
  const responseGoogle = fetchGoogleApi(token);
  const data: IData = await responseGoogle;
  const responseServer = await fetchServerApi(data.access_token);
  setItem('name', responseServer.name);
  setItem('userId', responseServer.userId);
  setItem('access_token', responseServer.appToken);
  setItem('isLogin', 'true');
  return true;
};
