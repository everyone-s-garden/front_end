import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { IData, IData_Sever } from './type';
import { setItem } from 'utils/session';
import { isLoginAtom } from 'recoil/atom';
import { useSetRecoilState } from 'recoil';
const KaKaoToken = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const nav = useNavigate();
  const setIsLogin = useSetRecoilState<boolean>(isLoginAtom);
  const getCode = async () => {
    try {
      const code: string | null = new URLSearchParams(window.location.search).get('code');
      const res_kakao: AxiosResponse = await axios.post<IData>(
        `https://kauth.kakao.com/oauth/token`,
        {
          grant_type: 'authorization_code',
          client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
          code: code,
          // client_secret: process.env.REACT_APP_API_KAKAO_CLIENT_SECRET,
          redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      const data: IData = res_kakao.data;
      const res_server: AxiosResponse = await axios.get<IData_Sever>(
        `${process.env.REACT_APP_API_BASE_URL}auth/kakao`,
        {
          headers: {
            Authorization: `${data.access_token}`,
          },
        },
      );
      setItem('name', res_server.data.name);
      setItem('userId', res_server.data.userId);
      setItem('access_token', res_server.data.appToken);
      setItem('isLogin', 'true');
      setIsLogin(true);
      nav('/');
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCode();
  }, []);
  return <Loader isLoading={isLoading} />;
};

export default KaKaoToken;
