import { BREAK_POINT } from 'constants/style';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Faq = () => {
  return (
    <Container>
      <Header>
        <span>자주묻는 질문</span>
        <span>자주뭍는 질문을 통해 궁금한 것을 알아갈 수 있어요</span>
        <button>1:1 문의하기</button>
      </Header>
      <Outlet />
    </Container>
  );
};

export default Faq;

const Container = styled.div`
  flex: 1;
  padding-bottom: 90px;
`;
const Header = styled.div`
  flex: 1;
  height: 218px;
  background-color: #f1f7e4;
  display: flex;
  flex-direction: column;
  padding-top: 42px;
  align-items: center;
  span:first-child {
    color: #282828;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  span:nth-child(2) {
    font-size: 18px;
    color: #5a5a5a;
    font-weight: 400;
    margin-bottom: 24px;
  }
  button {
    padding: 16px 104px;
    background-color: #9ec646;
    color: white;
    font-size: 18px;
    font-weight: 600;
    border-radius: 10px;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;
