import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { setItem } from 'utils/session';
import { isLoginAtom, memberIdAtom } from 'recoil/atom';
import { useSetRecoilState } from 'recoil';
import { setCookie } from 'utils/cookie';

const NaverToken = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const nav = useNavigate();
  const setIsLogin = useSetRecoilState<boolean>(isLoginAtom);
  const setMemberId = useSetRecoilState(memberIdAtom);
  const location = useLocation();

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    return token;
  };

  const getServerApi = async () => {
    const naver_access_token = getNaverToken();
    const server_response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}v1/auth/naver`,
      {},
      {
        headers: {
          Authorization: `Bearer ${naver_access_token}`,
        },
      },
    );

    return server_response.data;
  };
  const getCode = async () => {
    try {
      const response_server = await getServerApi();

      // setItem('name', res_server.data.name);
      // setItem('userId', res_server.data.userId);
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

export default NaverToken;
