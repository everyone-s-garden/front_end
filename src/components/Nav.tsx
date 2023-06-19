import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { BREAK_POINT, COLOR, FONT_WEIGHT } from '../constants/style';
import { isCropOpenAtom, isFeedbackOpenAtom, isLoginAtom, isReportOpenAtom } from 'recoil/atom';
import { getItem } from 'utils/session';
import ReportModal from './Modal/ReportModal';
import UserFeedbackModal from './Modal/UserFeedbackModal';
import MonthCrop from './Modal/MonthCrop';
import Notification from './Notification';
import logoImg from 'assets/logo-horizon.svg';
import mapImg from 'assets/map-icon.svg';
import homiImg from 'assets/homi-icon.svg';
import { ReactComponent as BackIcon } from 'assets/back-icon.svg';
import { useNavermaps } from 'react-naver-maps';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navermaps = useNavermaps();
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [isReportOpen, setIsReportOpen] = useRecoilState(isReportOpenAtom);
  const [isFeedbackOpen, setIsFeedbackOpen] = useRecoilState(isFeedbackOpenAtom);
  const [isCropOpen, setIsCropOpen] = useRecoilState(isCropOpenAtom);

  const isMainPage = location.pathname === '/';
  const isMapPage = location.pathname === '/map';
  const isMyPage = location.pathname === '/my';
  const isLikePage = location.pathname === '/my/like';
  const isRecentPage = location.pathname === '/my/recent';
  const isMyPostPage = location.pathname === '/my/mypost';
  const isRegisterPage = location.pathname === '/my/garden-register-user';
  const isSellerPage = location.pathname === '/my/garden-register-seller';

  useEffect(() => {
    setIsLogin(Boolean(getItem('isLogin')));
  }, [isLogin, setIsLogin]);

  const login = () => {
    navigate('/login');
  };

  const logout = () => {
    sessionStorage.clear();
    setIsLogin(false);
    navigate('/');
  };

  const getBackNavURL = () => {
    if (isMapPage || isMyPage) return '/';
    else return '/my';
  };

  return (
    <>
      <Container isMainPage={isMainPage} isMapPage={isMapPage}>
        <Navbar isMainPage={location.pathname === '/'}>
          <LoginBar>
            {isLogin === true ? (
              <LoginBtn onClick={logout}>로그아웃</LoginBtn>
            ) : (
              <LoginBtn onClick={login}>로그인</LoginBtn>
            )}
          </LoginBar>
          <MenuBar>
            <LogoImageContainer onClick={() => navigate(`/`)}>
              {/* <LogoImage src={logoImg} alt="로고" /> */}
            </LogoImageContainer>

            {isMapPage && <RegionSearchInput placeholder="지역명 검색" />}

            <ButtonContainer>
              <Button active={isMapPage} onClick={() => navigate(`/map`)}>
                <ButtonImage src={mapImg} alt="맵아이콘" />
                <ButtonSpan>내 주변 분양</ButtonSpan>
              </Button>
              <Button active={isMyPage} onClick={() => navigate(`/my`)}>
                <ButtonImage src={homiImg} alt="맵아이콘" />
                <ButtonSpan>마이페이지</ButtonSpan>
              </Button>
            </ButtonContainer>
          </MenuBar>
        </Navbar>

        <MobileNav isMainPage={isMainPage} isMapPage={isMapPage}>
          <button onClick={() => navigate(getBackNavURL())}>
            <BackIcon width="11" height="20" stroke="#BEC8B3" strokeWidth="2" />
          </button>

          {isMapPage ? (
            <RegionSearchInput placeholder="지역명 검색" />
          ) : (
            <NavTitle>
              <h1>
                {isMyPage && '마이페이지'}
                {isLikePage && '찜한 텃밭'}
                {isRecentPage && '최근 본 텃밭'}
                {isMyPostPage && '내 분양글'}
                {isRegisterPage && '나의 텃밭 등록하기'}
                {isSellerPage && '판매 텃밭 등록하기'}
              </h1>
            </NavTitle>
          )}
        </MobileNav>
      </Container>

      <ReportModal isOpen={isReportOpen} setIsOpen={setIsReportOpen} />
      <UserFeedbackModal isOpen={isFeedbackOpen} setIsOpen={setIsFeedbackOpen} />
      <MonthCrop isOpen={isCropOpen} setIsOpen={setIsCropOpen} />
      <Notification />

      <Main url={location.pathname}>
        <Outlet context={{ navermaps }} />
      </Main>
    </>
  );
};

export default Nav;

const Container = styled.div<{ isMainPage: boolean; isMapPage: boolean }>`
  z-index: 500;
  position: sticky;
  top: 0;
  padding: ${props => (props.isMainPage ? '0 20px 20px 20px' : props.isMapPage ? '0' : '40px 0 14px 0')};
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${COLOR.BACKGROUND};
  border-bottom: 1px solid #e1e1e1;
  border-bottom: ${props => (props.isMainPage || props.isMapPage ? 'none' : '1px solid #e1e1e1')};
  background-color: red;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 0 20px 20px 20px;
    border: none;
  }
`;

const Navbar = styled.nav<{ isMainPage: boolean }>`
  width: 100%;
  max-width: 1200px;
  display: ${props => (props.isMainPage ? 'flex' : 'none')};
  background-color: blue;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: flex;
    flex-direction: column;
  }
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
  margin-right: 12px;
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
  background-color: green;
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

const RegionSearchInput = styled.input`
  flex-grow: 1;
  margin: 0 20px 0 40px;
  padding: 12px 20px;
  max-width: 440px;
  height: 100%;
  color: #414c38;
  font-size: 16px;
  font-weight: 400;
  background-color: #f0f0f0;
  border: none;
  border-radius: 12px;

  ::placeholder {
    color: #c8c8c8;
    font-weight: 400;
  }

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin: 0 40px;
    height: 36px;
    font-size: 12px;
  }
`;

const ButtonContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  background-color: orange;
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

const Main = styled.main<{ url: string }>`
  flex: 1 1 auto;
  width: 100%;
  overflow: ${props => (props.url === '/map' ? 'hidden' : 'visible')};
`;

const MobileNav = styled.div<{ isMainPage: boolean; isMapPage: boolean }>`
  padding: ${props => (props.isMapPage ? '15px 16px 0 16px' : '0 16px')};
  width: 100%;
  display: ${props => (props.isMainPage ? 'none' : 'flex')};
  align-items: center;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const NavTitle = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;

  h1 {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #414c38;
  }
`;
