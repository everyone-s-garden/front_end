import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BeforeLogin from './BeforeLogin/BeforeLogin';
import { isLoginAtom } from 'utils/atom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';
import AfterLogin from './AfterLogin/AfterLogin';
const Mypage = () => {
  const nav = useNavigate();
  const isLogin: boolean = useRecoilValue(isLoginAtom);
  useEffect(() => {}, [isLogin]);
  return (
    <Container>
      <MenuWrapper isLogin={isLogin}>
        <MenuContent>
          <PageName onClick={() => nav('/my')} isLogin={isLogin}>
            마이페이지
          </PageName>
          <MenuBtnWrapper isLogin={isLogin}>
            <MenuBtn onClick={() => nav('/my/like')}>찜한 텃밭</MenuBtn>
            <MenuBtn onClick={() => nav('/my/recent')}>최근 본 텃밭</MenuBtn>
            <MenuBtn onClick={() => nav('/my/mypost')}>내가 올린 글</MenuBtn>
          </MenuBtnWrapper>
          {isLogin && (
            <Btn>
              <BtnTextBox>
                <span>제안사항이 있나요?</span>
                <span>유저의 소리함</span>
              </BtnTextBox>
            </Btn>
          )}
          <Btn>
            <BtnTextBox>
              <span>지금 시기에 맞는 작물 심기</span>
              <span>월별 추천 작물</span>
            </BtnTextBox>
          </Btn>
          <WeaderWrapper />
        </MenuContent>
      </MenuWrapper>
      {isLogin ? <AfterLogin /> : <BeforeLogin isLogin={isLogin} />}
    </Container>
  );
};

export default Mypage;

interface IIsLogin {
  isLogin: boolean;
}

const Container = styled.div`
  width: 100vw;
  height: 400vh;
  display: flex;
  margin: 0 auto;
  background-color: green;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: column-reverse;
  }
`;
const Inner = styled.div`
  width: 100%;
  height: 100%;
  background-color: yellow;
`;
const MenuWrapper = styled.div<IIsLogin>`
  width: 24%;
  height: fit-content;
  position: sticky;
  min-width: fit-content;
  top: ${props => (props.isLogin ? '160px' : '190px')};
  display: flex;
  justify-content: end;
  margin-right: 6%;
  transition: 0.2s ease-in-out;
  background-color: red;
  @media screen and (max-width: ${BREAK_POINT.TABLET}) {
    width: fit-content;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
  }
`;

const WeaderWrapper = styled.div`
  width: 204px;
  height: 330px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  cursor: pointer;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
  }
`;

const Btn = styled.div`
  width: 203px;
  height: 65px;
  background-color: #f7cc8a;
  border-radius: 11px;
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  span:nth-child(1) {
    font-size: 12px;
  }
  span:nth-child(2) {
    font-size: 16px;
    font-weight: 500;
  }
`;

const BtnTextBox = styled.div`
  width: 142px;
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const MenuContent = styled.div``;

const PageName = styled.h1<IIsLogin>`
  display: ${props => (props.isLogin ? 'inline-block' : 'none')};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 18px;
  color: #414c38;
  cursor: pointer;
`;

const MenuBtnWrapper = styled.div<IIsLogin>`
  display: ${props => (props.isLogin ? 'block' : 'none')};
  margin-bottom: 16px;
`;

const MenuBtn = styled.div`
  width: 203px;
  height: 54px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #a9b6a9;
  display: flex;
  align-items: center;
  justify-content: center;
`;
