import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import { useNavermaps } from 'react-naver-maps';

import logoImg from 'assets/logo_horizon.png';
import { BREAK_POINT, COLOR } from 'constants/style';
import NavLinks from './NavLinks/NavLinks';
import MobileNavLinks from './NavLinks/MobileNavLinks';
import UserItems from './UserItems';
import { useRecoilState } from 'recoil';
import { windowOffsetAtom } from 'recoil/atom';

const Header = () => {
  const navermaps = useNavermaps();
  const [offset, setOffset] = useRecoilState(windowOffsetAtom);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setOffset({ width, height });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <>
      <Container>
        <HeaderContainer>
          <Wrapper>
            <LinkWrapper>
              <LogoImageContainer to={'/'}>
                <LogoImage src={logoImg} alt="로고" />
              </LogoImageContainer>
              <NavLinks />
            </LinkWrapper>
            <UserItems />
          </Wrapper>
          <MobileNavLinks />
        </HeaderContainer>
      </Container>
      <Main url={location.pathname}>
        <Outlet context={{ navermaps }} />
      </Main>
    </>
  );
};

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 99999;
  background-color: ${COLOR.BACKGROUND};
`;

const HeaderContainer = styled.header`
  max-width: 1252px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 25px 20px;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 40px 20px;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const LogoImageContainer = styled(Link)`
  width: 127px;
  height: 22px;
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

const Main = styled.main<{ url: string }>`
  flex: 1 1 auto;
  width: 100%;
  overflow: ${props => (props.url === '/map' ? 'hidden' : 'visible')};
`;

export default Header;
