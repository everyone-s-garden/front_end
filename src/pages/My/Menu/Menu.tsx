import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { BREAK_POINT } from 'constants/style';
import { isLoginAtom } from 'recoil/atom';
import Weather from '../Weather/Weather';
import heartIcon from 'assets/my/menu/heart-icon.svg';
import clockIcon from 'assets/my/menu/clock-icon.svg';
import docIcon from 'assets/my/menu/doc-icon.svg';
import illust from 'assets/my/menu/call-illust.svg';

function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin: boolean = useRecoilValue(isLoginAtom);

  return (
    <MenuWrapper url={location.pathname}>
      {isLogin && (
        <>
          <MenuTitle onClick={() => navigate('/my')}>마이페이지</MenuTitle>

          <MenuNavList>
            <NavBtn onClick={() => navigate('/my/like')} active={location.pathname === '/my/like'}>
              <NavIcon src={heartIcon} alt="아이콘" active={location.pathname === '/my/like'} />
              찜한 텃밭
            </NavBtn>
            <NavBtn onClick={() => navigate('/my/recent')} active={location.pathname === '/my/recent'}>
              <NavIcon src={clockIcon} alt="아이콘" active={location.pathname === '/my/recent'} />
              최근 본 텃밭
            </NavBtn>
            <NavBtn onClick={() => navigate('/my/mypost')} active={location.pathname === '/my/mypost'}>
              <NavIcon src={docIcon} alt="아이콘" active={location.pathname === '/my/mypost'} />
              내가 올린 글
            </NavBtn>
          </MenuNavList>

          <YellowBtn>
            <BtnTextBox>
              <span>제안사항이 있나요?</span>
              <span>유저의 소리함</span>
            </BtnTextBox>
            <img src={illust} alt="일러스트" />
          </YellowBtn>
        </>
      )}
      <YellowBtn>
        <BtnTextBox>
          <span>지금 시기에 맞는 작물 심기</span>
          <span>월별 추천 작물</span>
        </BtnTextBox>
      </YellowBtn>

      <Weather />
    </MenuWrapper>
  );
}

export default Menu;

const MenuWrapper = styled.aside<{ url: string }>`
  margin-right: 10%;
  margin-bottom: 40px;
  flex-shrink: 0;
  width: 204px;
  display: flex;
  flex-direction: column;
  transition: 0.2s ease-in-out;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-right: 0;
    width: 100%;
    display: ${props => (props.url === '/my' ? 'flex' : 'none')};
  }
`;

const MenuTitle = styled.h1`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 18px;
  color: #414c38;
  cursor: pointer;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const MenuNavList = styled.li`
  margin-bottom: 16px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 9px;

  button:nth-child(3) {
    border: none;
  }

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin: 36px 0;
    border: 0;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }
`;

const NavBtn = styled.button<{ active: boolean }>`
  padding: 0 24px;
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 400;
  font-size: 16px;
  color: ${props => (props.active ? '#414C38' : '#a9b6a9')};
  border-bottom: 1px solid #d9d9d9;
  transition: all 0.2s ease-in;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    padding: 0;
    color: #414c38;
    border: 0;
  }
`;

const NavIcon = styled.img<{ active: boolean }>`
  margin-right: 16px;
  transition: all 0.2s ease-in;
  filter: ${props => (props.active ? 'brightness(0.4)' : 'brightness(1)')};

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    filter: brightness(0.4);
  }
`;

const YellowBtn = styled.button`
  margin-bottom: 15px;
  padding: 14px 20px;
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7cc8a;
  border-radius: 11px;
  cursor: pointer;

  span:nth-child(1) {
    font-size: 12px;
  }

  span:nth-child(2) {
    font-size: 16px;
    font-weight: 500;
  }
`;

const BtnTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
