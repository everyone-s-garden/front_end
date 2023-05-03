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
        <span>로그인 하고 찜한 목록도 확인해보세요!</span>
        <Ul>
          <Item />
        </Ul>
      </Content2>
    </Container>
  );
};

export default BeforeLogin;
const Container = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

const Content = styled.section`
  width: fit-content;
  height: fit-content;
  display: flex;
  margin-top: 173px;
  align-items: end;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: column;
    align-items: center;
    margin: 173px auto;
  }
`;

const Icon = styled.img`
  width: 255px;
  height: 248px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 177px;
    height: 171px;
  }
`;
const ItemBox = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-left: 39px;
  margin-bottom: 20px;
  span {
    font-size: 26px !important;
    line-height: 36px;
    font-weight: 600;
    font-size: 30px;
    color: #414c38;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      font-size: 20px !important;
      line-height: 24px;
    }
  }
  button {
    margin-top: 19px;
    width: 393px;
    height: 86px;
    border-radius: 26.91px;
    border: 1px solid #4eb93d;
    font-size: 24px;
    line-height: 29px;
    font-weight: 600;
    color: #414c38;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      width: 261px;
      height: 57px;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
    }
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin: 0 auto;
  }
`;
const Content2 = styled.section`
  width: fit-content;
  height: fit-content;
  margin: 155px auto;
  span {
    color: #414c38;
    font-weight: 600;
    font-size: 22px;
    line-height: 26px;
  }
`;
const Ul = styled.div`
  width: fit-content;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
