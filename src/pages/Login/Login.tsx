import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo-horizon.svg';
import Kakao from './Kakao/Kakao';
import Google from './Google/Google';
import Bubble from '../.././assets/Bubble.png';
import left from '../.././assets/left_vector.svg';
import { useNavigate } from 'react-router-dom';
import { BREAK_POINT } from 'constants/style';
import left_mobile from '../.././assets/left_vector_mobile.svg';

const Login = () => {
  const nav = useNavigate();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const mobile_size = Number(BREAK_POINT.MOBILE.replaceAll(/[a-z]/gi, ''));
  useEffect(() => {
    window.onresize = () => {
      setWidth(window.innerWidth);
    };
  }, [width]);

  return (
    <Container>
      {width < mobile_size ? (
        <BackBtnMobile>
          <img src={left_mobile} onClick={() => nav('/')} />
        </BackBtnMobile>
      ) : (
        <BackBtn>
          <img src={left} onClick={() => nav('/')} />
        </BackBtn>
      )}
      <Content>
        <BubbleBox>
          <Span>3초만에 로그인</Span>
        </BubbleBox>
        <Logo src={logo}></Logo>
        <Kakao />
        <Google />
      </Content>
    </Container>
  );
};

export default Login;

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: absolute;
  top: 0px;
  z-index: 9999;
  background-color: white;
`;

const Content = styled.div`
  width: fit-content;
  height: 510px;
  margin: 263px auto;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 258px;
  }
`;

const Logo = styled.img`
  width: 270px;
  height: 46px;
  margin: 13px auto;
  margin-bottom: 0px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 199.57px;
    height: 34px;
  }
`;

const Span = styled.span`
  width: fit-content;
  height: 21px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  margin-top: 15px;
  display: inline-block;
  color: #414c38;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    font-size: 12px;
    line-height: 14px;
    margin-top: 12px;
  }
`;

const BackBtn = styled.button`
  width: 22px !important;
  height: 39px !important;
  position: absolute;
  margin-top: 76px;
  margin-left: 57px;
`;

const BubbleBox = styled.div`
  width: 163px !important;
  height: 72px !important;
  background-image: url(${Bubble});
  background-repeat: no-repeat;
  background-size: contain;
  text-align: center;
  margin: 0 auto;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 116px !important;
    height: 49px !important;
  }
`;

const BackBtnMobile = styled.button`
  width: 22px !important;
  height: 39px !important;
  position: absolute;
  margin-top: 56px;
  margin-left: 20px;
`;
