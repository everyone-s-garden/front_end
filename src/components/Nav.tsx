import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { BREAK_POINT, FONT_WEIGHT } from '../constants/style';
import logoImg from 'assets/logo-horizon.svg';
import mapImg from 'assets/map-icon.svg';
import homiImg from 'assets/homi-icon.svg';
import Footer from './Footer';
import { getItem } from 'utils/session';
import { useRecoilState } from 'recoil';
import { isLoginAtom } from 'utils/atom';
import left_mobile from '../assets/left_vector_mobile.svg';
const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [width, setWidth] = useState(window.innerWidth);
  const mainMatch = useMatch('/');
  const mapMatch = useMatch('/map');
  const registerMatch = useMatch('/garden-register-user');
  const sellerMatch = useMatch('/garden-register-seller');
  const myMatch = useMatch('/my');
  const loginMatch = useMatch('/login');

  const getIsLogin = async () => {
    const getLogin = await Boolean(getItem('isLogin'));
    setIsLogin(getLogin);
  };
  useEffect(() => {
    getIsLogin();
  }, [isLogin]);

  const login = () => {
    navigate('/login');
  };
  const logout = () => {
    sessionStorage.clear();
    setIsLogin(false);
    navigate('/');
  };
  useEffect(() => {
    window.onresize = () => {
      setWidth(window.innerWidth);
    };
  }, []);
  return (
    <>
      <Container>
        {width > 687 || mainMatch !== null || mapMatch !== null ? (
          <Navbar>
            <LoginBar>
              {isLogin === true ? (
                <LoginBtn onClick={logout}>로그아웃</LoginBtn>
              ) : (
                <LoginBtn onClick={login}>로그인</LoginBtn>
              )}
            </LoginBar>
            <MenuBar>
              <LogoImageContainer onClick={() => navigate(`/`)}>
                <LogoImage src={logoImg} alt="로고" />
              </LogoImageContainer>
              <ButtonContainer>
                <Button active={location.pathname === '/map'} onClick={() => navigate(`/map`)}>
                  <ButtonImage src={mapImg} alt="맵아이콘" />
                  <ButtonSpan>내 주변 분양</ButtonSpan>
                </Button>
                <Button active={location.pathname === '/my'} onClick={() => navigate(`/my`)}>
                  <ButtonImage src={homiImg} alt="맵아이콘" />
                  <ButtonSpan>마이페이지</ButtonSpan>
                </Button>
              </ButtonContainer>
            </MenuBar>
          </Navbar>
        ) : (
          <MobileNav>
            <img src={left_mobile} onClick={() => navigate(-1)} />
            {myMatch && <h1>마이페이지 </h1>}
            {registerMatch && <h1>나의 텃밭 등록하기</h1>}
            {sellerMatch && <h1>판매 텃밭 등록하기</h1>}
          </MobileNav>
        )}
      </Container>
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default Nav;

const Container = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: center;
  width: 100%;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 0 24px;
  }

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    padding: 0 26px;
  }
`;

const Navbar = styled.nav`
  z-index: 1000;
  position: relative;
  flex-grow: 1;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
`;

const LoginBar = styled.div`
  width: 100%;
  height: 43px;
  display: flex;
  justify-content: flex-end;
  display: none;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: flex;
  }
`;

const LoginBtn = styled.button`
  padding-top: 14px;
  color: #a0aa95;
  font-size: 12px;
  font-weight: ${FONT_WEIGHT.MEDIUM};
`;

const MenuBar = styled.div`
  margin-top: 25px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    margin: 0;
    height: 43px;
  }
`;

const LogoImageContainer = styled.div`
  width: auto;
  height: 24px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  cursor: pointer;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    height: 28px;
  }
`;

const LogoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  height: 100%;
  display: flex;
  flex-shrink: 0;
  align-items: center;
`;

const Button = styled.button<{ active: boolean }>`
  margin-left: 8px;
  padding: 0 12px;
  width: 45px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
  background-color: ${props => (props.active ? '#EAF1E8' : 'transparent')};
  border-radius: 15px;
  transition: all 0.2s ease-in;

  &:hover {
    transform: translateY(-3px);
  }

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    margin-left: 30px;
    width: fit-content;
    height: 43px;
  }
`;

const ButtonImage = styled.img`
  height: 24px;
`;

const ButtonSpan = styled.span`
  margin-left: 10px;
  font-weight: ${FONT_WEIGHT.MEDIUM};
  display: none;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: block;
  }
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
`;

const MobileNav = styled.div`
  position: absolute;
  top: 20px;
  width: 100%;
  display: flex;
  h1 {
    display: block;
    margin: 0 auto;
    left: 50%;
    font-weight: 400;
    font-size: 20px;
    line-height: 27px;
    color: #414c38;
  }
  img {
    position: absolute;
    left: 17px;
    cursor: pointer;
  }
`;
