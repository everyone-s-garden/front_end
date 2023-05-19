import { BREAK_POINT } from 'constants/style';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const EmptyFiled = () => {
  const nav = useNavigate();
  return (
    <Container>
      <>
        <Content>
          <ImgBox />
          <button onClick={() => nav('/garden-register-user')}>나의 텃밭 등록하기</button>
        </Content>
      </>
      <>
        <Content>
          <ImgBox />
          <button onClick={() => nav('/garden-register-seller')}>판매하는 밭 등록하기</button>
        </Content>
      </>
    </Container>
  );
};

export default EmptyFiled;
const Container = styled.div`
  width: 539px;
  height: 197px;
  margin: 0 auto;
  margin-top: 182px;
  display: flex;
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
    margin-top: 26px;
    width: 154px;
    height: 45px;
    background: #ffffff;
    border: 1px solid #afd082;
    border-radius: 10px;
    transition: 0.3s ease-in-out;
    :hover {
      background-color: #afd082;
    }
  }
`;
const ImgBox = styled.div`
  width: 126px;
  height: 126px;
  background: #d9d9d9;
  border-radius: 63px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 54px;
  }
`;
