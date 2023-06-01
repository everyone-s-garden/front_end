import React from 'react';
import calendar from '../../../assets/calendar.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Item from './Item/Item';
import { BREAK_POINT } from 'constants/style';

const BeforeLogin = () => {
  const nav = useNavigate();
  return (
    <Container>
      <Content>
        <Icon src={calendar} />
        <ItemBox>
          <span>밭의 남은 사용 기간을 알려드려요</span>
          <button onClick={() => nav('/login')}>로그인해주세요</button>
        </ItemBox>
      </Content>
      <Content2>
        <SpanWrapper>
          <Span>로그인 하고&nbsp;</Span>
          <Span>찜한 목록도 확인해보세요!</Span>
        </SpanWrapper>
        <Ul>
          <Item />
        </Ul>
      </Content2>
    </Container>
  );
};

export default BeforeLogin;

const Container = styled.section`
  flex-grow: 1;
  margin-right: auto;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin: 0;
  }
`;

const Content = styled.section`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: ${BREAK_POINT.TABLET}) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

const Icon = styled.img`
  width: 190px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 170px;
  }
`;

const ItemBox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  span {
    font-size: 20px;
    font-weight: 400;
    color: #414c38;

    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      font-size: 20px;
    }
  }

  button {
    margin-top: 16px;
    width: 100%;
    height: 58.31px;
    border: 1.8px solid #afd082;
    border-radius: 15px;
    font-size: 16px;
    font-weight: 400;
    color: #414c38;
    transition: 0.3s ease-in-out;

    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      width: 261px;
      height: 57px;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
    }
    :hover {
      background-color: #afd082;
    }
  }

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin: 0 auto;
  }
`;

const Content2 = styled.section`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Span = styled.span`
  font-size: 20px;
  font-weight: 400;
  color: #414c38;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    font-size: 20px;
  }
`;

const SpanWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: column;
  }
`;

const Ul = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 35px;

  @media screen and (max-width: ${BREAK_POINT.TABLET}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
