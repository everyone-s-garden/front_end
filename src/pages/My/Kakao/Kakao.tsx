import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const REST_API_KEY = 'ff1f23ca4a518f6537d85a65694027cf';
const REDIRECT_URI = 'http://localhost:3000/my/oauth/kakao';
const HOST = 'https://kauth.kakao.com';
const KAKAO_URL = `${HOST}/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

const KaKao = () => {
  const Login = async () => {
    window.location.href = KAKAO_URL;
  };
  return <KakaoBtn onClick={Login}>카카오로 로그인하기</KakaoBtn>;
};

export default KaKao;

const KakaoBtn = styled.button`
  margin-top: 109px;
  width: 532px;
  height: 116px;
  background-color: #ffd764;
  border-radius: 30px;
  font-size: 28px;
  font-weight: 600;
`;
