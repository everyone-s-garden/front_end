import React, { useEffect, useState } from 'react';
import calendar from '../../../assets/calendar.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Item from './Item/Item';
import { BREAK_POINT, COLOR } from 'constants/style';

const BeforeLogin = () => {
  const nav = useNavigate();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const mobile_size: number = Number(BREAK_POINT.MOBILE.replaceAll(/[a-z]/gi, ''));
  useEffect(() => {
    window.onresize = () => {
      setWidth(window.innerWidth);
    };
  }, [width]);
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
        {width < mobile_size ? (
          <MobileSpanWrapper>
            <Span>로그인 하고</Span>
            <Span>찜한 목록도 확인해보세요!</Span>
          </MobileSpanWrapper>
        ) : (
          <Span>로그인 하고 찜한 목록도 확인해보세요!</Span>
        )}

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
  margin-top: 130px;
  align-items: end;
  margin-left: 54px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: column;
    align-items: center;
    margin: 173px auto;
  }
`;

const Icon = styled.img`
  width: 197px;
  height: 191px;
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
  margin-left: 65px;
  margin-bottom: 20px;
  span {
    font-size: 26px !important;
    line-height: 36px;
    font-weight: 600;
    font-size: 20px !important;
    color: #414c38;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      line-height: 24px;
      margin-top: 32px;
    }
  }
  button {
    margin-top: 15.99px;
    margin-bottom: 12px;
    width: 300px;
    height: 58.31px;
    border: 1.3px solid #afd082;
    border-radius: 15px;
    font-size: 16px;
    line-height: 19px;
    font-weight: 600;
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
      background-color: ${COLOR.GREEN[300]};
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
`;
const Ul = styled.div`
  width: fit-content;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 35px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const Span = styled.span`
  color: #414c38;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  display: inline-block;
`;

const MobileSpanWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
