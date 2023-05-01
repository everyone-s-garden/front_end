import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Loader from 'components/Loader';

interface IData {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
}
const Token = () => {
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  const getCode = async () => {
    const code = new URLSearchParams(window.location.search).get('code');
    const res_kakao = await axios.post<IData>(
      `https://kauth.kakao.com/oauth/token`,
      {
        grant_type: 'authorization_code',
        client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
        code: code,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const data: IData = res_kakao.data;
    console.log(data);
    // const res_server = await axios.post('http://localhost:8080/auth/kakao', {
    //   accessToken: data.access_token,
    // });
    // console.log(res_server);
  };
  useEffect(() => {
    getCode();
  }, []);
  return <Loader isLoading={isLoading} />;
};

export default Token;
