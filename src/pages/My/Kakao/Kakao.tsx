import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const REST_API_KEY = '';
const REDIRECT_URI = '';
const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

const KaKaoLogin = async () => {
  const response = await axios(url);
  console.log(response);
};
const KaKao = () => {
  return <KakaoBtn onClick={KaKaoLogin}>네이버로 로그인하기</KakaoBtn>;
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
