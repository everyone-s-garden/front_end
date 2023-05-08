import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import searchIcon from 'assets/search.svg';
const Form = () => {
  const { watch, getValues, register } = useForm();

  return (
    <FormBox>
      <NameTag>
        <span style={{ marginBottom: '87px' }}>텃밭 정보</span>
        <span style={{ marginBottom: '71px' }}>기간</span>
        <span>위치</span>
      </NameTag>
      <Content>
        <div style={{ display: 'flex' }}>
          <RelItem>
            <Input placeholder="텃밭 검색" />
            <SearchImg src={searchIcon} />
          </RelItem>
          <CheckBox type="checkbox" />
          <span style={{ marginTop: '12px' }}>직접 입력할게요</span>
        </div>
        <DateBox>
          <Start>
            <span>사용 시작일</span>
            <input {...register('start')} placeholder="yyyy-mm-dd" type="date"></input>
          </Start>
          <End>
            <span>사용 종료일</span>
            <input {...register('end')} placeholder="yyyy-mm-dd" type="date"></input>
          </End>
        </DateBox>
        <RelItem>
          <Input placeholder="위치 검색" />
          <SearchImg src={searchIcon} />
        </RelItem>
        <div>
          <Btn>완료</Btn>
        </div>
      </Content>
    </FormBox>
  );
};

export default Form;

const FormBox = styled.form`
  display: flex;
  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
  }
`;

const NameTag = styled.div`
  width: fit-content;
  height: inherit;
  display: flex;
  flex-direction: column;
  margin-top: 9px;
  margin-right: 89px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
`;
const Content = styled.div``;

const Input = styled.input`
  width: 334px;
  height: 47px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 11px;
  padding: 0px 19px;
  margin-right: 18px;
  margin-bottom: 42px;
  ::placeholder {
    color: #afafaf;
  }
`;
const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  background: #ffffff;
  border: 1.3px solid #414c38;
  border-radius: 4px;
  margin-right: 9px;
  margin-top: 9px;
`;
const DateBox = styled.div`
  display: flex;
  margin-bottom: 33px;
  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #afafaf;
    margin-bottom: 6px;
  }
  div {
    width: 178px;
    height: 67px;
    background: #f0f0f0;
    border-radius: 12px;
    margin-right: 32px;
    padding: 11px 17px;
    display: flex;
    flex-direction: column;
  }
  input {
    border: none;
    background: inherit;
    margin: 0 auto;
    width: fit-content;
  }
`;
const Start = styled.div`
  overflow: hidden;
`;
const End = styled.div`
  overflow: hidden;
`;

const Btn = styled.button`
  width: 348px;
  height: 59px;
  background-color: green;
  border-radius: 1rem;
  margin-bottom: 48px;
`;
const SearchImg = styled.img`
  position: absolute;
  right: 10%;
  top: 12%;
  cursor: pointer;
`;
const RelItem = styled.div`
  position: relative;
  width: fit-content;
`;
