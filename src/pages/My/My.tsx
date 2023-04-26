import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo-horizon.svg';
import Kakao from './Kakao/Kakao';
import Google from './Google/Google';

const My = () => {
  return (
    <Container>
      <BackBtn />
      <Content>
        <Span>3초 만에 로그인</Span>
        <img src={logo}></img>
        <Kakao />
        <Google />
      </Content>
    </Container>
  );
};

export default My;

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: absolute;
  top: 0px;
  z-index: 999999999999999;
  background-color: white;
`;

const Content = styled.div`
  width: fit-content;
  height: 510px;
  margin: 263px auto;
  display: flex;
  flex-direction: column;
  img {
    width: 398px;
    height: 68px;
    margin: 31px auto;
    margin-bottom: 0px;
  }
`;

const Span = styled.span`
  font-size: 28px;
  font-weight: 600;
  display: inline;
  margin: 0 auto;
`;

const BackBtn = styled.button`
  width: 105px;
  height: 105px;
  position: absolute;
  background-color: #d9d9d9;
  margin-top: 89px;
  margin-left: 93px;
`;
