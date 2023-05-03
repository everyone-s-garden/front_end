import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleLogo from '../../../assets/logo_google.svg';
import { getToken } from './token/token';
import { BREAK_POINT } from 'constants/style';
const Google = () => {
  const nav = useNavigate();
  // button custom을 하기위해서 useGoogleLogin사용
  const login = useGoogleLogin({
    onSuccess: async responseToken => {
      const token: string = responseToken.code;
      //token 값을 보내서 id_token, refresh, access 토큰 값 가져옴
      getToken(token);
    },
    onError: error => {
      console.log(error);
    },
    //flow "auth-code" 설정을 해줘야만 id_token으로 반환해줌. 아니면 access토큰만 줌.
    flow: 'auth-code',
    scope: process.env.REACT_APP_GOOGLE_SCOPE,
  });

  return (
    <>
      <GoogleBtn onClick={() => login()}>
        <Logo src={GoogleLogo} />
        구글로 로그인하기
      </GoogleBtn>
    </>
  );
};

export default Google;

const GoogleBtn = styled.button`
  width: 532px;
  height: 81px;
  margin-top: 39px;
  background: #ffffff;
  border: 1.3px solid #d9d9d9;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 500;
  position: relative;
  transition: 0.3s ease-in-out;
  :hover {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 267px;
    height: 60px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }
`;
//왜인지 몰르겠으나 새로고침시 이미지크기가 자꾸변동됨(부모에서 상속되는것 같다.)
//40px로 지정해줘도 공간을 잡아먹어서 important로 고정위치잡아줌.
const Logo = styled.img`
  width: 40px !important;
  height: 40px !important;
  position: absolute;
  left: 25px;
  bottom: 18px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 25px !important;
    height: 25px !important;
  }
`;
