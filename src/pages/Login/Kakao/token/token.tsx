import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { IData } from './type';

const Token = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const nav = useNavigate();

  const getCode = async () => {
    const code: string | null = new URLSearchParams(window.location.search).get('code');
    const res_kakao = await axios.post<IData>(
      `https://kauth.kakao.com/oauth/token`,
      {
        grant_type: 'authorization_code',
        client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
        code: code,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );
    console.log(res_kakao);
    // const data: IData = res_kakao.data;
    // const res_server = await axios.post(
    //   'http://garden.jinkyumpark.com/auth/kakao',
    //   {
    //     accessToken: data.access_token,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${data.access_token}`,
    //     },
    //   },
    // );
    // console.log(res_server);
  };
  useEffect(() => {
    getCode();
  }, []);
  return <Loader isLoading={isLoading} />;
};

export default Token;
