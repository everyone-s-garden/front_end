import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo-horizon.svg';
import Naver from './Naver/Naver';
import Google from './Google/Google';

const My = () => {
  return (
    <Container>
      <Content>
        <Span>3초 만에 로그인</Span>
        <img src={logo}></img>
        <Naver />
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
`;

const Content = styled.div`
  width: fit-content;
  height: 510px;
  margin: 160px auto;
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
