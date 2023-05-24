import { BREAK_POINT } from 'constants/style';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyFiled from '../myfiled/MyFiled';

const EmptyFiled = () => {
  const nav = useNavigate();
  const [field, setField] = useState(null);
  return field === null ? (
    <Container>
      <FieldImg />
      <ContentWrapper>
        <Content>
          <ImgBox />
          <button onClick={() => nav('/garden-register-user')}>나의 텃밭 등록하기</button>
        </Content>
        <Content>
          <ImgBox />
          <button onClick={() => nav('/garden-register-seller')}>판매하는 밭 등록하기</button>
        </Content>
      </ContentWrapper>
    </Container>
  ) : (
    <MyFiled />
  );
};

export default EmptyFiled;
const Container = styled.div`
  width: fit-content;
  height: fit-content;
  justify-content: space-between;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    height: fit-content;
    width: fit-content;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: center;
  button {
    width: 154px;
    height: 45px;
    border: 1px solid #414c38;
    border-radius: 10px;
    :hover {
      background-color: #afd082;
    }
  }
`;
const ImgBox = styled.div`
  width: 161px;
  height: 127px;
  background: #dde9c8;
  border-radius: 11px;
  margin-bottom: 27px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 54px;
  }
`;

const FieldImg = styled.div`
  width: 600px;
  height: 133px;
  background: #d9d9d9;
  border-radius: 11px;
  margin-bottom: 45px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
