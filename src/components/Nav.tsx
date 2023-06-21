import React, { useEffect, useState } from 'react';
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
import logoImg from 'assets/logo_horizon.png';
import mapImg from 'assets/map-icon.svg';
import homiImg from 'assets/homi-icon.svg';
import { ReactComponent as BackIcon } from 'assets/back-icon.svg';
import { useNavermaps } from 'react-naver-maps';
import { getQueryData } from 'pages/My/RegisterUser/query';
import { IData } from 'pages/My/RegisterUser/type';
import { AxiosResponse } from 'axios';
import ReactGA from 'react-ga';

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

  const [searchResults, setSearchResults] = useState<IData[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedResult, setSelectedResult] = useState<IData | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [GAinitialized, isGAinitialized] = useState<boolean>(false);

  // Google Analytics 설정
  console.log(process.env.REACT_APP_GA_TRACKING_ID!);
  const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID!;
  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(gaTrackingId);
      ReactGA.set({ page: window.location.pathname });
      isGAinitialized(true);
    }
  }, [gaTrackingId]);
  useEffect(() => {
    if (GAinitialized) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, [GAinitialized, location]);

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
  const getSearchResult = async (e: React.FormEvent<HTMLInputElement>) => {
    let query = e.currentTarget.value;
    setSearchText(query);
    if (query === '') {
      setSelectedResult(null);
      setSearchResults([]);
      setShow(false);
    } else {
      const res = (await getQueryData(query)) as AxiosResponse;
      setSearchResults(res.data);
      setShow(true);
    }
  };
  const selectGarden = (result: IData) => {
    setSearchText(result.name);
    setSelectedResult(result);
    setSearchResults([]);
    setShow(false);
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
            <LogoImageContainer onClick={() => navigate('/')}>
              <LogoImage src={logoImg} alt="로고" />
            </LogoImageContainer>

            {isMapPage && (
              <SearchWrapper>
                <RegionSearchInput onChange={getSearchResult} value={searchText} placeholder="지역명 검색" />{' '}
                <SearchResult check={searchResults.length === 0} len={show}>
                  <ResultUl>
                    {searchResults.length === 0 ? (
                      <NoResult>
                        <span>검색 결과가 없습니다.</span>
                        <span>정확한 검색어를 입력해주세요.</span>
                      </NoResult>
                    ) : (
                      searchResults.map(result => (
                        <ResultLi onClick={() => selectGarden(result)} key={result.id}>
                          <span>{result.name !== '' ? result.name : result.address}</span>
                        </ResultLi>
                      ))
                    )}
                  </ResultUl>
                </SearchResult>
              </SearchWrapper>
            )}

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
            <SearchWrapper>
              <RegionSearchInput onChange={getSearchResult} value={searchText} placeholder="지역명 검색" />{' '}
              <SearchResult check={searchResults.length === 0} len={show}>
                <ResultUl>
                  {searchResults.length === 0 ? (
                    <NoResult>
                      <span>검색 결과가 없습니다.</span>
                      <span>정확한 검색어를 입력해주세요.</span>
                    </NoResult>
                  ) : (
                    searchResults.map(result => (
                      <ResultLi onClick={() => selectGarden(result)} key={result.id}>
                        <span>{result.name !== '' ? result.name : result.address}</span>
                      </ResultLi>
                    ))
                  )}
                </ResultUl>
              </SearchResult>
            </SearchWrapper>
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
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 0 20px 20px 20px;
    border: none;
  }
`;

const Navbar = styled.nav<{ isMainPage: boolean }>`
  width: 100%;
  max-width: 1200px;
  display: ${props => (props.isMainPage ? 'flex' : 'none')};
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
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    margin: 0;
    height: 43px;
  }
`;

const LogoImageContainer = styled.div`
  width: 125px;
  height: 21px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  cursor: pointer;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 163px;
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
  padding: 12px 20px;
  width: 100%;
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
    height: 36px;
    font-size: 12px;
  }
`;

const ButtonContainer = styled.div`
  flex-shrink: 0;
  height: 100%;
  display: flex;
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

const SearchWrapper = styled.div`
  position: relative;
  padding-left: 20px;
  width: 444px;
  height: 43px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 268px;
    height: 36px;
    margin: 0 auto;
  }
`;
const SearchResult = styled.div<{ check: boolean; len: boolean }>`
  visibility: ${props => (props.len ? 'visibility' : 'hidden')};
  position: absolute;
  width: 100%;
  height: ${props => (props.check ? '110px' : '217px')};
  right: 0;
  top: 105%;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.06);
  border-radius: 11px;
  z-index: 99999999999;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    height: ${props => (props.check ? '90px' : '229px')};
  }
`;
const ResultUl = styled.ul`
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #888 #e0ebd4;

  &::-webkit-scrollbar {
    display: block !important; /* Chrome, Safari, Opera*/
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 7px;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 7px;
    border: 1px solid #f0f0f0;
  }
  &::-moz-scrollbar {
    width: 6px;
  }

  &::-moz-scrollbar-thumb {
    background-color: #888;
    border-radius: 7px;
  }

  &::-moz-scrollbar-track {
    background-color: white;
    border-radius: 7px;
    border: 1px solid #f0f0f0;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    align-items: center;
    width: 100%;
    height: 100%;

    &::-webkit-scrollbar {
      display: none !important; /* Chrome, Safari, Opera*/
    }
  }
`;

const ResultLi = styled.li`
  height: 20%;
  display: flex;
  align-items: center;
  border-bottom: 1.15625px solid #f0f0f0;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.08em;
  color: #414c38;
  width: 100%;
  cursor: pointer;
  span {
    margin-left: 15px;
  }
`;

const NoResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: row;
  span {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #c8c8c8;
    margin-right: 5px;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: column;
  }
`;
