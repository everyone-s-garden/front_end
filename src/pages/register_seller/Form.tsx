import React from 'react';
import styled from 'styled-components';
import icon from '../../assets/search_icon.svg';
const Form = () => {
  return (
    <InfoBox>
      <Content1>
        <span>텃밭 이름*</span>
        <FormInput>
          <input />
        </FormInput>
      </Content1>
      <Content2>
        <span>가격</span>
        <FormInput>
          <input />
          <Unit>원</Unit>
        </FormInput>
      </Content2>
      <Content3>
        <span>면적</span>
        <FormInput>
          <input />
          <Unit>평</Unit>
        </FormInput>
      </Content3>
      <Content4>
        <span>상태</span>
        <FormInput>
          <div>
            <Circle />
            모집 중
          </div>
          <div>상시모집</div>
          <div>마감</div>
        </FormInput>
      </Content4>
      <Content5>
        <span>위치</span>
        <div>
          위치검색
          <Icon src={icon} />
        </div>
      </Content5>
      <Content4>
        <span>시설</span>
        <FormInput>
          <div>화장실</div>
          <div>수도시설</div>
          <div>농기구</div>
        </FormInput>
      </Content4>
      <Content6>
        <span>상세내용</span>
        <textarea placeholder="화장실, 수로 등 상세 내용을 입력해주세요." />
      </Content6>
      <BtnBox>
        <Btn>완료</Btn>
      </BtnBox>
    </InfoBox>
  );
};

export default Form;
const InfoBox = styled.div`
  width: 497px;
  display: flex;
  flex-direction: column;
  div {
    height: fit-content;
  }
  span {
    font-weight: 400;
    font-size: 16px;
    color: #000000;
  }
`;

const Content1 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 44px;
  div {
    input {
      width: 334px;
      border: none;
      border-bottom: 1.3px solid #afd082;
    }
  }
`;
const Content2 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 49px;

  div {
    input {
      width: 87px;
      border: none;
      border-bottom: 1.3px solid #afd082;
    }
  }
`;
const Content3 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 43px;

  div {
    input {
      width: 49px;
      border: none;
      border-bottom: 1.3px solid #afd082;
    }
  }
`;
const Content4 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 66px;
  span {
    margin-top: 10px;
  }
  div {
    display: flex;
    justify-content: space-between;
    div {
      font-size: 16px;
      color: #d9d9d9;
      background-color: rgba(255, 255, 255, 0.8);
      border: 1.3px solid #d9d9d9;
      border-radius: 9px;
      padding: 6px 16px;
      width: fit-content;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    div:nth-child(2) {
      padding: 6px 18px;
    }
    :nth-child(3) {
      padding: 6px 16px;
    }
  }
`;
const Content5 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 66px;

  span {
    margin-top: 8px;
  }
  div {
    position: relative;
    width: 334px;
    height: 37px;
    background-color: grey;
    background: #f0f0f0;
    border-radius: 11px;
    display: flex;
    align-items: center;
    padding-left: 17px;
    color: #c8c8c8;
    cursor: default;
  }
`;
const Content6 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  textarea {
    width: 338px;
    height: 164px;
    border: 1px solid #bec8b3;
    border-radius: 16px;
    resize: none;
    padding: 21px 22px;
  }
`;

const FormInput = styled.div`
  width: 341px;
  display: flex;
  height: fit-content;
  input {
    margin-top: 18px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: end;
`;
const Btn = styled.button`
  width: 348px;
  height: 59px;
  background: #414c38;
  border-radius: 15px;
  margin-top: 36px;
  margin-bottom: 52px;
`;

const Circle = styled.div`
  width: 9px !important;
  height: 9px !important;
  background: #d9d9d9 !important;
  border-radius: 4.5px !important;
  padding: 0 !important;
  margin-right: 10px;
`;

const Unit = styled.span`
  margin-bottom: 12px;
  display: block;
`;

const Icon = styled.img`
  width: 20px;
  height: 19px;
  position: absolute;
  top: 8px;
  right: 20px;
  cursor: pointer;
`;
