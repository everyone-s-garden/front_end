import React, { isValidElement, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { IData, IData_Sever } from './type';
import { setItem } from 'utils/session';
import { isLoginAtom, memberIdAtom } from 'recoil/atom';
import { useSetRecoilState } from 'recoil';
import { setCookie } from 'utils/cookie';
const KaKaoToken = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const setMemberId = useSetRecoilState(memberIdAtom);
  const nav = useNavigate();
  const setIsLogin = useSetRecoilState<boolean>(isLoginAtom);

  const getKakaoApi = async (code: string | null) => {
    if (!code) return;

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
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        },
      );
      return response_server.data;
    } catch (err) {
      if (err instanceof Error) throw new Error('서버 api 에러 :', err);
    }
  };

  const getCode = async () => {
    try {
      const code: string | null = new URLSearchParams(window.location.search).get('code');

      console.log('REACT_APP_NAVER_API_KEY', process.env.REACT_APP_NAVER_API_KEY);
      console.log('REACT_APP_NAVER_CLIENT_SECRET', process.env.REACT_APP_NAVER_CLIENT_SECRET);
      console.log('REACT_APP_NAVER_SCOPE', process.env.REACT_APP_NAVER_SCOPE);
      console.log('REACT_APP_NAVER_REDIRECT_URL`', process.env.REACT_APP_NAVER_REDIRECT_URL);
      console.log('REACT_APP_KAKAO_REDIRECT_URI`', process.env.REACT_APP_KAKAO_REDIRECT_URI);
      console.log('REACT_APP_NAVER_CLIENT_ID`', process.env.REACT_APP_NAVER_CLIENT_ID);
      console.log('REACT_APP_API_BASE_URL`', process.env.REACT_APP_API_BASE_URL);
      console.log('REACT_APP_KAKAO_REST_API_KEY`', process.env.REACT_APP_KAKAO_REST_API_KEY);
      console.log('REACT_APP_API_KAKAO_CLIENT_SECRET`', process.env.REACT_APP_API_KAKAO_CLIENT_SECRET);

      const kakao_token = await getKakaoApi(code);
      const response_server = await getServerApi(kakao_token);
      const { accessToken, refreshToken, memberId } = response_server;
      setItem('member_id', memberId);
      setItem('access_token', accessToken);
      setCookie('refresh_token', refreshToken);
      setItem('isLogin', 'true');
      setIsLogin(true);
      setMemberId(memberId);
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
