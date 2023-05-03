import axios from 'axios';
import { IData } from './type';
//redirect_rui 를 http://localhost:3000/my 로 하면 에러가난다
//구글 클라우드 콘솔에서 http://localhost:3000/my와
//http://localhostL3000둘 다 추가해줘야함
export const getToken = async (token: string) => {
  const res_google = await axios.post<IData>('https://oauth2.googleapis.com/token', {
    code: token,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    redirect_uri: 'http://localhost:3000',
    grant_type: 'authorization_code',
  });
  const data: IData = res_google.data;
  console.log(data);
  const res_server = await axios.post(
    'http://garden.jinkyumpark.com/auth/google',
    {
      accessToken: data.id_token,
    },
    {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    },
  );
  console.log(res_server);
};
