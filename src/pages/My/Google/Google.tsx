import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Google = () => {
  const login = (e: any) => {
    console.log(e);
  };
  const handleError = (e: any) => {
    console.log(e);
  };
  return (
    <>
      <GoogleLogin
        onSuccess={e => {
          login(e);
        }}
        onError={() => console.log('error')}
      />
    </>
  );
};

export default Google;

const GoogleBtn = styled.button`
  margin-top: 31px;
  width: 532px;
  height: 116px;
  background-color: #a8d178;
  border-radius: 30px;
  font-size: 28px;
  font-weight: 600;
`;
// const nav = useNavigate();
// const login = useGoogleLogin({
//   onSuccess: async responseToken => {
//     const token = responseToken.access_token;
//     console.log(responseToken);
//     const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log(res);
//   },
//   onError: error => {
//     console.log(error);
//   },
//   scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
// });
