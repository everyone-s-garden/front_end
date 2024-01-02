import { BREAK_POINT } from 'constants/style';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import NaverLogo from '../../../assets/logo_naver.png';
declare global {
  interface Window {
    naver: any;
  }
}
const Naver = () => {
  const naver_auth_url = `https://nid.naver.com/oauth2.0/authorize?client_id=${
    process.env.REACT_APP_NAVER_CLIENT_ID
  }&response_type=code&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URL}&state=${false}`;

  const naverLogin = () => {
    window.location.href = naver_auth_url;
  };

  const initNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_REDIRECT_URL,
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: 60 },
      callbackHandle: true,
    });
    naverLogin.init();
  };
  const getData = () => {
    if (window.location.href.includes('access_token')) {
      console.log('We got AccessToken');
    }
  };
  const handleNaverClick = () => {
    const naverLoginButton = document.getElementById('naverIdLogin_loginButton');
    if (naverLoginButton) naverLoginButton.click();
  };

  useEffect(() => {
    initNaverLogin();
    getData();
  }, []);

  return (
    <React.Fragment>
      <NaverBtn onClick={handleNaverClick}>
        <Logo src={NaverLogo} />
        네이버로 로그인하기
      </NaverBtn>
      <div id="naverIdLogin" style={{ display: 'none' }} />
    </React.Fragment>
  );
};

export default Naver;

const NaverBtn = styled.button`
  width: 532px;
  height: 81px;
  margin-top: 61px;
  background-color: #2ec100;
  border: 1.3px solid #2ec100;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 500;
  transition: 0.3s ease-in-out;
  position: relative;
  color: white;
  :hover {
    background-color: white;
    color: black;
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
