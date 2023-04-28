import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo-horizon.svg';
import Kakao from './Kakao/Kakao';
import Google from './Google/Google';
import Bubble from '../.././assets/Bubble.png';

const Login = () => {
  return (
    <Container>
      <BackBtn />
      <Content>
        <BubbleBox>
          <Span>3초만에 로그인</Span>
        </BubbleBox>
        <img src={logo}></img>
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
  img {
    width: 270px;
    height: 46px;
    margin: 13px auto;
    margin-bottom: 0px;
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
  margin-top: 13px;
  display: inline-block;
  color: #414c38;
`;

const BackBtn = styled.button`
  width: 105px;
  height: 105px;
  position: absolute;
  background-color: #d9d9d9;
  margin-top: 89px;
  margin-left: 93px;
`;

const BubbleBox = styled.div`
  width: 163px !important;
  height: 72px !important;
  background-image: url(${Bubble});
  background-repeat: no-repeat;
  background-size: contain;
  text-align: center;
  margin: 0 auto;
`;