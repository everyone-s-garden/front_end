import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { setItem } from 'utils/session';
import { isLoginAtom } from 'recoil/atom';
import { useSetRecoilState } from 'recoil';
const NaverToken = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const nav = useNavigate();
  const setIsLogin = useSetRecoilState<boolean>(isLoginAtom);
  const location = useLocation();

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    return token;
  };

  const getCode = async () => {
    try {
      const accessToken = getNaverToken();
      const server_response = await axios.post(
        `https://every-garden.kro.kr/v1/auth/naver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const { access_token, refresh_token } = server_response.data;
      // setItem('name', res_server.data.name);
      // setItem('userId', res_server.data.userId);
      setItem('access_token', access_token);
      setItem('refresh_token', refresh_token);
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

export default NaverToken;
