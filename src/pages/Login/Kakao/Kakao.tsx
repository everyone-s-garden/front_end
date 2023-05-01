import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import KakaoLogo from '../../../assets/logo_kakao.svg';

const HOST = 'https://kauth.kakao.com';
const KAKAO_URL = `${HOST}/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;

const KaKao = () => {
  const Login = async () => {
    window.location.href = KAKAO_URL;
  };
  return (
    <KakaoBtn onClick={Login}>
      <Logo src={KakaoLogo} />
      카카오로 로그인하기
    </KakaoBtn>
  );
};

export default KaKao;

const KakaoBtn = styled.button`
  width: 532px;
  height: 81px;
  margin-top: 61px;
  background: #fee500;
  border: 1.3px solid #fee500;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 500;
  position: relative;
`;

const Logo = styled.img`
  width: 50px !important;
  height: 50px !important;
  position: absolute;
  left: 22px;
  bottom: 14px;
`;
