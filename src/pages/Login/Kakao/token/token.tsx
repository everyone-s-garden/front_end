import React, { isValidElement, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { IData, IData_Sever } from './type';
import { setItem } from 'utils/session';
import { isLoginAtom } from 'recoil/atom';
import { useSetRecoilState } from 'recoil';
const Token = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const nav = useNavigate();
  const setIsLogin = useSetRecoilState<boolean>(isLoginAtom);

  const fetchKakaoApi = async (code: string | null) => {
    if (code === null) {
      throw new Error('get kakao code is missing');
    }
    try {
      const res_kakao: AxiosResponse = await axios.post<IData>(
        `https://kauth.kakao.com/oauth/token`,
        {
          grant_type: 'authorization_code',
          client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
          code: code,
          client_secret: process.env.REACT_APP_API_KAKAO_CLIENT_SECRET,
          redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return res_kakao.data;
    } catch (err) {
      console.log('err reason :', err);
      throw new Error(`kakao api error : ${err}`);
    }
  };

  const fetchServerApi = async (data: IData) => {
    if (data === null) {
      throw new Error('to request server data is missing');
    }
    try {
      const res_server: AxiosResponse = await axios.get<IData_Sever>(
        `${process.env.REACT_APP_API_BASE_URL}auth/kakao`,
        {
          headers: {
            Authorization: `${data.access_token}`,
          },
        },
      );
      return res_server.data;
    } catch (err) {
      throw new Error(`server api error : ${err}`);
    }
  };

  const getCode = async () => {
    try {
      const code: string | null = new URLSearchParams(window.location.search).get('code');
      const responseKakao: IData = await fetchKakaoApi(code);
      const responseServer = await fetchServerApi(responseKakao);
      setItem('name', responseServer.name);
      setItem('userId', responseServer.userId);
      setItem('access_token', responseServer.appToken);
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

export default Token;
