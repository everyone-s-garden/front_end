import axios, { AxiosResponse } from 'axios';
import { IData, IData_Sever } from './type';
import { setItem } from 'utils/session';
//redirect_rui 를 http://localhost:3000/my 로 하면 에러가난다
//구글 클라우드 콘솔에서 http://localhost:3000/my와
//http://localhostL3000둘 다 추가해줘야함
export const getToken = async (token: string) => {
  const res_google: AxiosResponse = await axios.post<IData>('https://oauth2.googleapis.com/token', {
    code: token,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URL,
    grant_type: 'authorization_code',
  });
  const data: IData = res_google.data;
  const res_server: AxiosResponse = await axios.get<IData_Sever>('https://garden.jinkyumpark.com/auth/google', {
    headers: {
      Authorization: `${data.access_token}`,
    },
  });
  setItem('name', res_server.data.name);
  setItem('userId', res_server.data.userId);
  setItem('access_token', res_server.data.appToken);
  setItem('isLogin', 'true');
  return true;
};
