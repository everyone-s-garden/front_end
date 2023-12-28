import React, { isValidElement, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { IData, IData_Sever } from './type';
import { setItem } from 'utils/session';
import { isLoginAtom } from 'recoil/atom';
import { useSetRecoilState } from 'recoil';
import { setCookie } from 'utils/cookie';
const KaKaoToken = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const nav = useNavigate();
  const setIsLogin = useSetRecoilState<boolean>(isLoginAtom);

<<<<<<< HEAD
  const fetchKakaoApi = async (code: string | null) => {
    if (code === null) {
      throw new Error('get kakao code is missing');
    }
=======
  const getKakaoApi = async (code: string | null) => {
    if (!code) return;
>>>>>>> 56548e554b27e041a8a20449eafad3f0be5e6021
    try {
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
<<<<<<< HEAD
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
=======
      const data: IData = res_kakao.data;
      return data;
    } catch (error) {
      if (error instanceof Error) throw new Error('카카오 api 에러 : ', error);
    }
  };

  const getServerApi = async (data: IData | undefined) => {
    if (!data) return;
    try {
      const response_server: AxiosResponse = await axios.post<IData_Sever>(
        `${process.env.REACT_APP_API_BASE_URL}v1/auth/kakao`,
        {},
>>>>>>> 56548e554b27e041a8a20449eafad3f0be5e6021
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        },
      );
<<<<<<< HEAD
      return res_server.data;
    } catch (err) {
      throw new Error(`server api error : ${err}`);
=======
      return response_server.data;
    } catch (err) {
      if (err instanceof Error) throw new Error('서버 api 에러 :', err);
>>>>>>> 56548e554b27e041a8a20449eafad3f0be5e6021
    }
  };

  const getCode = async () => {
    try {
      const code: string | null = new URLSearchParams(window.location.search).get('code');
<<<<<<< HEAD
      const responseKakao: IData = await fetchKakaoApi(code);
      const responseServer = await fetchServerApi(responseKakao);
      setItem('name', responseServer.name);
      setItem('userId', responseServer.userId);
      setItem('access_token', responseServer.appToken);
=======
      const kakao_token = await getKakaoApi(code);
      const response_server = await getServerApi(kakao_token);
      const { accessToken, refreshToken } = response_server;
      setItem('access_token', accessToken);
      setCookie('refresh_token', refreshToken);
>>>>>>> 56548e554b27e041a8a20449eafad3f0be5e6021
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
