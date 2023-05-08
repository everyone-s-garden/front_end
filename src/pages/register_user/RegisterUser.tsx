import React, { useState } from 'react';
import styled from 'styled-components';
import add from 'assets/add_img.png';
import Form from './Form';
const RegisterUser = () => {
  const [value, setValue] = useState('');

  return (
    <Container>
      <H1>나의 텃밭 등록하기</H1>
      <ImgRegister>
        <AddImg src={add} />
        <span>사진등록</span>
      </ImgRegister>
      <Tip>텃밭을 검색해서 등록하면 기한, 위치가 자동으로 불러와져요</Tip>
      <Form />
    </Container>
  );
};

export default RegisterUser;

const Container = styled.div`
  margin: 0 auto;
  margin-top: 54px;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const H1 = styled.h1`
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  color: #414c38;
  margin-bottom: 20px;
`;

const ImgRegister = styled.div`
  width: 642px;
  height: 166px;
  background: #f0fbe4;
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 43px;
  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #afd082;
  }
`;
const AddImg = styled.img`
  width: 33px;
  height: 33px;
  margin-bottom: 13px;
  cursor: pointer;
`;
const Tip = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #414c38;
  margin-bottom: 6px;
`;
