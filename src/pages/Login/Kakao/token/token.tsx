import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { IData, IData_Sever } from './type';
import { setItem } from 'utils/session';
import { isLoginAtom } from 'utils/atom';
import { useSetRecoilState } from 'recoil';
const Token = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const nav = useNavigate();
  const setIsLogin = useSetRecoilState<boolean>(isLoginAtom);
  const getCode = async () => {
    const code: string | null = new URLSearchParams(window.location.search).get('code');

    const res_kakao: AxiosResponse = await axios.post<IData>(
      `https://kauth.kakao.com/oauth/token`,
      {
        grant_type: 'authorization_code',
        client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
        code: code,
        client_secret: 'DyYVeTmjemqauNn4OWNPgNyfXdnbFvc5',
        redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const data: IData = res_kakao.data;
    const res_server: AxiosResponse = await axios.get<IData_Sever>('http://garden.jinkyumpark.com/auth/kakao', {
      headers: {
        Authorization: `${data.access_token}`,
      },
    });
    setItem('access_token', res_server.data.appToken);
    setItem('isLogin', 'true');
    setIsLogin(true);
    nav('/');
  };
  useEffect(() => {
    getCode();
  }, []);
  return <Loader isLoading={isLoading} />;
};

export default Token;
