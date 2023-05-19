import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import searchIcon from 'assets/search.svg';
import { BREAK_POINT } from 'constants/style';
const Form = () => {
  const { watch, getValues, register } = useForm();
  const [check, setCheck] = useState<boolean>(false);

  return (
    <>
      <FormBox>
        <NameTag>
          <span>텃밭 정보</span>
          <span>기간</span>
          <span>위치</span>
        </NameTag>
        <Content>
          <FirstItem>
            <RelItem>
              <Input check={check} placeholder="텃밭 검색" />
              <SearchImg check={check} src={searchIcon} />
            </RelItem>
            <CheckWrapper>
              <CheckBox onClick={() => setCheck(prev => !prev)} type="checkbox" />
              <span>직접 입력할게요</span>
            </CheckWrapper>
          </FirstItem>
          <DateBox check={check}>
            <Start>
              <span>사용 시작일</span>
              <input {...register('start')} placeholder="yyyy-mm-dd" type="text" disabled={!check}></input>
            </Start>
            <End>
              <span>사용 종료일</span>
              <input {...register('end')} placeholder="yyyy-mm-dd" type="text" disabled={!check}></input>
            </End>
          </DateBox>
          <RelItem>
            <Input check={check} placeholder="위치 검색" />
            <SearchImg check={check} src={searchIcon} />
          </RelItem>
        </Content>
      </FormBox>
      <Btn>완료</Btn>
    </>
  );
};

export default Form;
interface ICheck {
  check: boolean;
}

const FormBox = styled.form`
  display: flex;
  margin-bottom: 104px;
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
  span:nth-child(1) {
    margin-bottom: 87px;
  }
  span:nth-child(2) {
    margin-bottom: 71px;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-right: 21px;
  }
`;
const FirstItem = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  height: fit-content;
  margin-bottom: 42px;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: column;
    align-items: end;
    margin-bottom: 29px;
  }
`;
const CheckWrapper = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 10px;
    span {
      font-size: 12px;
    }
  }
`;
const Content = styled.div``;

const Input = styled.input<ICheck>`
  width: 334px;
  height: 47px;
  background-color: ${props => (props.check ? 'white ' : '#f0f0f0')};
  border: none;
  border-radius: ${props => (props.check ? 'none' : '11px')};
  border-bottom: ${props => (props.check ? '1.3px solid #AFD082' : 'none')};
  padding: 0px 19px;
  margin-right: 18px;
  transition: 0.3s ease-in-out;
  ::placeholder {
    color: #afafaf;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-bottom: 0px;
    margin-right: 0px;
    width: 261px;
    height: 47px;
  }
`;
const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  background: #ffffff;
  border: 1.3px solid #414c38;
  border-radius: 4px;
  margin-right: 9px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 0px;
  }
`;
const DateBox = styled.div<ICheck>`
  display: flex;
  margin-bottom: 33px;
  transition: 0.3s ease-in-out;

  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #afafaf;
    margin-bottom: ${props => (props.check ? '15px' : '6px')};
    margin-left: ${props => (props.check ? '11px' : '0px')};
    transition: 0.3s ease-in-out;
  }
  div {
    width: 178px;
    height: 67px;
    background-color: ${props => (props.check ? 'white' : '#f0f0f0')};
    border-radius: 12px;
    padding: ${props => (props.check ? '0px' : '11px 17px')};
    display: flex;
    flex-direction: column;
    transition: 0.3s ease-in-out;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      width: 123px;
    }
  }
  input {
    border: none;
    background: inherit;
    margin: 0 auto;
    width: ${props => (props.check ? 'fit-content' : 'fit-content')};
    border-bottom: ${props => (props.check ? '1.3px solid #AFD082' : 'none')};
    padding: ${props => (props.check ? '6px 12px' : '0px')};
    transition: 0.3s ease-in-out;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-bottom: 50px;
  }
`;
const Start = styled.div`
  overflow: hidden;
  margin-right: 32px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-right: 10px;
  }
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
const SearchImg = styled.img<ICheck>`
  display: ${props => (props.check ? 'none' : 'block')};
  position: absolute;
  right: 10%;
  top: 20%;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    right: 5%;
    top: 20%;
  }
`;
const RelItem = styled.div`
  position: relative;
  width: fit-content;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
  }
`;
