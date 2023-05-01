import React from 'react';
import calendar from '../../assets/calendar.svg';
import styled from 'styled-components';
import heart from '../../assets/heart.svg';
import { useNavigate } from 'react-router-dom';
const Mypage = () => {
  const nav = useNavigate();
  return (
    <>
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
          <Li>
            <ImageBox>
              <Image src={heart} />
            </ImageBox>
            <TextBox>
              <First />
              <Second />
              <Third />
            </TextBox>
          </Li>
          <Li>
            <ImageBox>
              <Image src={heart} />
            </ImageBox>
            <TextBox>
              <First />
              <Second />
              <Third />
            </TextBox>
          </Li>
        </Ul>
      </Content2>
    </>
  );
};

export default Mypage;

const Content = styled.section`
  width: fit-content;
  height: fit-content;
  display: flex;
  margin: 0 auto;
  margin-top: 220px;
`;

const Icon = styled.img`
  width: 130px;
  height: 127px;
`;
const ItemBox = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  span {
    font-size: 26px !important;
    line-height: 36px;
    font-weight: 600;
    font-size: 30px;
    color: #414c38;
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
  }
`;
const Content2 = styled.section`
  width: fit-content;
  height: fit-content;
  margin: 224px auto;
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
`;

const Li = styled.div`
  width: fit-content;
  margin-top: 17px;
  margin-right: 43px;
  display: flex;
  cursor: pointer;
`;
const ImageBox = styled.div`
  width: 218px;
  height: 164px;
  background-color: #f1f7e8;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 45px;
  height: 38px;
`;
const TextBox = styled.div`
  width: fit-content;
  height: 100%;
  margin-left: 19px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const First = styled.div`
  width: 130px;
  height: 26px;
  background: #dee2dc;
  border-radius: 8px;
`;
const Second = styled.div`
  width: 89px;
  height: 19px;
  background: #edf0ec;
  border-radius: 7px;
  margin-top: 12px;
`;
const Third = styled.div`
  width: 119px;
  height: 19px;
  background: #edf0ec;
  border-radius: 7px;
  margin-top: 12px;
`;
