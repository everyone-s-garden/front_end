import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import KakaoLogo from '../../../assets/logo_kakao.svg';
import { BREAK_POINT } from 'constants/style';
//카카오 로그인 잘못됨 accessToken 다른방식으로
const HOST: string = 'https://kauth.kakao.com' as const;
const KAKAO_URL: string = `${HOST}/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
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
  background-color: #fee500;
  border: 1.3px solid #fee500;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 500;
  transition: 0.3s ease-in-out;
  position: relative;
  :hover {
    background-color: white;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 267px;
    height: 60px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin-top: 52px;
  }
`;

const Logo = styled.img`
  width: 42px;
  height: 40px;
  position: absolute;
  left: 21px;
  top: 19px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 25px !important;
    height: 25px !important;
  }
`;
