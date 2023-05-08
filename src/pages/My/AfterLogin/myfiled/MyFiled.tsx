import React from 'react';
import styled from 'styled-components';
import icon from 'assets/field.png';
import groundicon from 'assets/groundicon.svg';
import dateicon from 'assets/dateicon.svg';
import { BREAK_POINT } from 'constants/style';

const MyFiled = () => {
  return (
    <MyField>
      <H1>나의 텃밭</H1>
      <Edit>편집</Edit>
      <Img src={icon} />
      <Content>
        <Info>
          <Ground>
            <IconBox>
              <FieldIcon src={groundicon} />
            </IconBox>
            <Span>
              <span>양주 공공 텃밭</span>을 이용 중이에요.
            </Span>
          </Ground>
          <Date>
            <IconBox>
              <FieldIcon src={dateicon} />
            </IconBox>
            <TextBox>
              <Span style={{ fontSize: '12px' }}>30일째 사용 중!</Span>
              <Span style={{ fontSize: '14px' }}>3개월 하고 2일 남았어요.</Span>
            </TextBox>
          </Date>
        </Info>
        <MapBox></MapBox>
      </Content>
    </MyField>
  );
};
export default MyFiled;

const MyField = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  text-align: center;
  margin-top: 62px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
  }
`;
const H1 = styled.h1`
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  margin-bottom: 15px;
  /* identical to box height */

  color: #414c38;
`;
const Img = styled.img`
  width: 642px;
  height: 166px;
  border-radius: 2rem;
  margin-bottom: 28px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 350px;
    height: 166px;
  }
`;
const Content = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Info = styled.div`
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-bottom: 38.65px;
  }
`;
const Ground = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
`;
const IconBox = styled.div`
  width: 45px;
  height: 45px;
  background: #f0fbe4;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15.67px;
`;
const FieldIcon = styled.img`
  width: 25.26px;
  height: 20.29px;
`;

const Span = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #414c38;
  span {
    text-decoration-line: underline;
  }
`;
const Date = styled.div`
  margin-top: 33.71px;
  display: flex;
  align-items: center;
  width: fit-content;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  :first-child {
    color: white;
  }
`;

const MapBox = styled.div`
  width: 304.19px;
  height: 159.89px;
  background-color: grey;
  border-radius: 1rem;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin: 0 auto;
  }
`;
const Edit = styled.div`
  text-align: end;
  padding-right: 20px;
  font-size: 12px;
  line-height: 16px;
  color: #afafaf;
  cursor: pointer;
`;
