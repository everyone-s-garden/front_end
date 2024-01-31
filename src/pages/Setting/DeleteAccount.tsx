import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { BREAK_POINT } from 'constants/style';
const LiComponent = ({ children, main = false }: { children: string; main?: boolean }) => {
  const [checked, setChecked] = useState(false);
  return (
    <Li onClick={() => setChecked(!checked)} style={{ backgroundColor: main ? '#f1f7e4' : 'white' }}>
      <span>{children}</span>
      <div
        style={{
          backgroundColor: checked ? '#d7d7d7' : 'white',
        }}
      >
        {checked && <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: 13 }} />}
      </div>
    </Li>
  );
};

const DeleteAccount = () => {
  const nav = useNavigate();
  return (
    <Container>
      <Content>
        <H1>탈퇴 사유가 무엇인가요?</H1>
        <ul>
          <LiComponent main>찾는 작물 및 텃밭이 없어요.</LiComponent>
          <LiComponent>물품이 안팔려요.</LiComponent>
          <LiComponent>비매너 사용자를 만났어요.</LiComponent>
          <LiComponent>새 프로필을 만들고 싶어요.</LiComponent>
          <LiComponent>개인정보를 삭제하고 싶어요.</LiComponent>
        </ul>
        <p>계정을 삭제하면 게시글,채팅 등 모든 활동 정보가 삭제됩니다. 계정 삭제 후 7일간 다시 가입할 수 없어요.</p>
        <ButtonWrapper>
          <button onClick={() => nav(-1)} style={{ backgroundColor: '#9EC646', color: 'white' }}>
            뒤로가기
          </button>
          <button style={{ backgroundColor: '#F1F7E4', color: '#9EC646' }}>탈퇴하기</button>
        </ButtonWrapper>
      </Content>
    </Container>
  );
};

export default DeleteAccount;

const Container = styled.section`
  flex: 1;
  padding-top: 47px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    padding-top: 22px;
  }
`;

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 662px;
  p {
    font-size: 16px;
    font-weight: 500;
    padding: 0px 20px;
  }
  ul {
    margin-bottom: 39px;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      margin-bottom: 28px;
    }
  }
`;

const H1 = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #282828;
  margin-bottom: 60px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-bottom: 20px;
    padding: 0px 20px;
  }
`;

const Li = styled.li`
  padding: 18px 20.05px 18px 33.95px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
  div {
    border-radius: 99px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #d7d7d7;
    width: 24px;
    height: 24px;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    border: none;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10%;
  display: flex;
  button:first-child {
    margin-right: 21px;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      margin-right: 0;
    }
  }
  button {
    height: 56px;
    width: 320px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      border-radius: 0;
      width: 50%;
    }
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    bottom: 0;
    width: 100%;
  }
`;
