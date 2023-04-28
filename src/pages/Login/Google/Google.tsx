import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleLogo from '../../../assets/logo_google.svg';

const CLIENT_ID = '999513273898-9fa6iu0cm3jbeancg8f82mjs53trr355.apps.googleusercontent.com';
const CLIENT_SECRET = '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';

const Google = () => {
  const nav = useNavigate();
  // button custom을 하기위해서 useGoogleLogin사용
  const login = useGoogleLogin({
    onSuccess: async responseToken => {
      const token = responseToken.code;
      //token 값을 보내서 id_token, refresh, access 토큰 값 가져옴
      const res = await axios.post('https://oauth2.googleapis.com/token', {
        code: token,
        clientId: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        //redirect_rui 를 http://localhost:3000/my 로 하면 에러가난다
        //구글 클라우드 콘솔에서 http://localhost:3000/my와
        //http://localhostL3000둘 다 추가해줘야함
        redirect_uri: 'http://localhost:3000',
        grant_type: 'authorization_code',
      });
      console.log(res);
    },
    onError: error => {
      console.log(error);
    },
    //flow "auth-code" 설정을 해줘야만 id_token으로 반환해줌. 아니면 access토큰만 줌.
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
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
`;
//왜인지 몰르겠으나 새로고침시 이미지크기가 자꾸변동됨(부모에서 상속되는것 같다.)
//40px로 지정해줘도 공간을 잡아먹어서 important로 고정위치잡아줌.
const Logo = styled.img`
  width: 40px !important;
  height: 40px !important;
  position: absolute;
  left: 25px;
  bottom: 18px;
`;
