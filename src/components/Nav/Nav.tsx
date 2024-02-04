import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { BREAK_POINT, COLOR, FONT_WEIGHT } from '../../constants/style';
import {
  imageMagnifImagesAtom,
  isCropOpenAtom,
  isFeedbackOpenAtom,
  isLoginAtom,
  isMyPostOpenAtom,
  isReportOpenAtom,
  selectedMapLocationAtom,
  windowOffsetAtom,
} from 'recoil/atom';
import { getItem } from 'utils/session';
import ReportModal from '../Modal/ReportModal';
import UserFeedbackModal from '../Modal/UserFeedbackModal';
import MonthCrop from '../Modal/MonthCrop';
import Notification from '../Notification';
import logoImg from 'assets/logo_horizon.png';
import mapImg from 'assets/map-icon.svg';
import userImg from 'assets/user.svg';
import { ReactComponent as BackIcon } from 'assets/back-icon.svg';
import { useNavermaps } from 'react-naver-maps';
import { AxiosResponse } from 'axios';
import HttpRequest from 'api/HttpRequest';
import ReactGA from 'react-ga4';
import ImageMagnifModal from '../Modal/ImageMagnifModal';
import MyPostRemoveModal from '../Modal/MyPostRemoveModal';
import { removeCookie } from 'utils/cookie';
import notification_image from 'assets/notification.png';
export interface ILocation {
  position: string;
  latitude: number;
  longitude: number;
}

// const NotificationComponenet = ({}) => {
//   return null;
// };

const mockData = [
  {
    category: '알람',
    payload: '새싹님과의 거래가 30분 남았습니다 !\n우리씨앗농장에서 12:00PM에 보아요',
    createdAt: Date.now(),
  },
  {
    category: '후기',
    payload: '텃린이님과의 거래를 잘 완료하셨나요? \n거래 후기를 남기고 후기를 확인해보세요! ',
    createdAt: Date.now(),
  },
  {
    category: '알람',
    payload: '텃밭장인님의 찜한 텃밭이 마감 하루 전 입니다 ✨ \n오늘 마감되는 텃밭을 확인해보세요 !',
    createdAt: Date.now(),
  },
  {
    category: '알람',
    payload: '텃밭장인님의 찜한 텃밭이 마감 하루 전 입니다 ✨ \n오늘 마감되는 텃밭을 확인해보세요 !',
    createdAt: Date.now(),
  },
  {
    category: '알람',
    payload: '텃밭장인님의 찜한 텃밭이 마감 하루 전 입니다 ✨ \n오늘 마감되는 텃밭을 확인해보세요 !',
    createdAt: Date.now(),
  },
  {
    category: '알람',
    payload: '텃밭장인님의 찜한 텃밭이 마감 하루 전 입니다 ✨ \n오늘 마감되는 텃밭을 확인해보세요 !',
    createdAt: Date.now(),
  },
  {
    category: '알람',
    payload: '텃밭장인님의 찜한 텃밭이 마감 하루 전 입니다 ✨ \n오늘 마감되는 텃밭을 확인해보세요 !',
    createdAt: Date.now(),
  },
];

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navermaps = useNavermaps();
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [isReportOpen, setIsReportOpen] = useRecoilState(isReportOpenAtom);
  const [isFeedbackOpen, setIsFeedbackOpen] = useRecoilState(isFeedbackOpenAtom);
  const [isCropOpen, setIsCropOpen] = useRecoilState(isCropOpenAtom);
  const [imageMagnifImages, setImageMagnifImages] = useRecoilState(imageMagnifImagesAtom);
  const [isMyPostOpen, setIsMyPostOpen] = useRecoilState(isMyPostOpenAtom);
  const setSelectedLocation = useSetRecoilState(selectedMapLocationAtom);

  const isMainPage = location.pathname === '/';
  const isMapPage = location.pathname === '/map';
  const isMyPage = location.pathname === '/my';
  const isLikePage = location.pathname === '/my/like';
  const isRecentPage = location.pathname === '/my/recent';
  const isMyPostPage = location.pathname === '/my/mypost';
  const isRegisterPage = location.pathname === '/my/garden-register-user';
  const isSellerPage = location.pathname === '/my/garden-register-seller';

  const [searchResults, setSearchResults] = useState<ILocation[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [initialized, setInitialized] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [Offset, setOffset] = useRecoilState(windowOffsetAtom);

  function formatDateToYYYYMMDD(timestamp: number) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  function getDayOfWeek(timestamp: number) {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(timestamp);
    const dayOfWeekIndex = date.getDay(); // 0부터 6까지의 숫자

    return daysOfWeek[dayOfWeekIndex];
  }

  // Google Analytics 설정
  useEffect(() => {
    // localhost는 기록하지 않음
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID!);
      setInitialized(true);
    }
  }, []);

  // location 변경 감지시 pageview 이벤트 전송
  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send('pageview');
    }
  }, [initialized, location]);

  const login = () => {
    navigate('/login');
  };

  const logout = () => {
    removeCookie('refresh_token');
    sessionStorage.clear();
    setIsLogin(false);
    navigate('/');
  };
  useEffect(() => {
    setIsLogin(Boolean(getItem('isLogin')));
  }, [isLogin, setIsLogin]);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setOffset({ width, height });
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getBackNavURL = () => {
    if (isMapPage || isMyPage) return '/';
    else return '/my';
  };

  const getLocationData = async (query: string) => {
    try {
      const res: AxiosResponse = await HttpRequest.get(`v1/location?address=${query}`);
      return res;
    } catch (err) {
      return err;
    }
  };

  const getSearchResult = async (e: React.FormEvent<HTMLInputElement>) => {
    let query = e.currentTarget.value;
    setSearchText(query);
    if (query === '') {
      setSelectedLocation(null);
      setSearchResults([]);
      setShow(false);
    } else {
      const res = (await getLocationData(query)) as AxiosResponse;
      setSearchResults(res.data);
      setShow(true);
    }
  };

  const selectGarden = (result: ILocation) => {
    setSearchText(result.position);
    setSelectedLocation(result);
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
                        <ResultLi key={result.position} onClick={() => selectGarden(result)}>
                          <span>{result.position}</span>
                        </ResultLi>
                      ))
                    )}
                  </ResultUl>
                </SearchResult>
              </SearchWrapper>
            )}

            <ButtonContainer>
              {isLogin && (
                <div style={{ position: 'relative' }}>
                  <Button
                    style={{ padding: '0 5px' }}
                    active={isMapPage}
                    onClick={() => setOpenNotification(!openNotification)}
                  >
                    <ButtonImage src={notification_image} alt="맵아이콘" />
                    <div
                      style={{
                        position: 'absolute',
                        fontSize: 10,
                        right: 0,
                        top: '20%',
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '1px 4px',
                        borderRadius: 5,
                      }}
                    >
                      {mockData.length}
                    </div>
                  </Button>
                  {openNotification && (
                    <NotificationContainer>
                      <NotificationTitleWrapper>
                        <button
                          onClick={() => setOpenNotification(false)}
                          style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: 28 }}
                        >
                          <BackIcon width="11" height="20" stroke="black" strokeWidth="2" />
                        </button>
                        <span style={{ fontSize: 20, fontWeight: 'bold' }}>알림</span>
                      </NotificationTitleWrapper>

                      <NotificationUl>
                        {mockData.map((data, idx) => {
                          return (
                            <NotificationLi key={idx}>
                              <div style={{ padding: '20px 28px' }}>
                                <span style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, display: 'block' }}>
                                  {data.category}
                                </span>
                                <p style={{ display: 'block', marginBottom: 8 }}>{data.payload}</p>
                                <p style={{ fontSize: 14, color: '#9B9B9B' }}>
                                  {formatDateToYYYYMMDD(data.createdAt)} {`(${getDayOfWeek(data.createdAt)})`}
                                </p>
                              </div>
                            </NotificationLi>
                          );
                        })}
                      </NotificationUl>
                    </NotificationContainer>
                  )}
                </div>
              )}
              <Button active={isMapPage} onClick={() => navigate(`/map`)}>
                <ButtonImage src={mapImg} alt="맵아이콘" />
                <ButtonSpan>내 주변 분양</ButtonSpan>
              </Button>
              <Button active={isMyPage} onClick={() => navigate('my')}>
                <ButtonImage src={userImg} alt="맵아이콘" />
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
                      <ResultLi key={result.position} onClick={() => selectGarden(result)}>
                        <span>{result.position}</span>
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
      <ImageMagnifModal data={imageMagnifImages} setData={setImageMagnifImages} />
      <MyPostRemoveModal isOpen={isMyPostOpen} setIsOpen={setIsMyPostOpen} />
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
  padding-bottom: 10px;
  color: #a0aa95;
  font-size: 14px;
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
  position: relative;
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
  margin-left: 20px;
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

const NotificationUl = styled.ul`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    padding-top: 0px;
  }
`;

const NotificationContainer = styled.div`
  position: absolute;
  left: -400px;
  width: 420px;
  height: 615px;
  top: 50;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 20px;
  overflow: scroll;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    border-radius: 0;
    border: 0;
    position: fixed;
    z-index: 99999999;
  }
`;

const NotificationLi = styled.li`
  border-bottom: 1px solid #d9d9d9;

  div {
    padding: 0 28px;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      padding: 0px 28px;
    }
  }
`;
const NotificationTitleWrapper = styled.div`
  display: none;
  padding: 20px 28px;
  align-items: center;
  justify-content: center;
  margin-bottom: 36;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: flex;
  }
`;
