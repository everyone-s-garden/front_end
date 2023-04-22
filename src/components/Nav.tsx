import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { BREAK_POINT, COLOR, FONT_WEIGHT } from '../constants/style';
import logoImg from '../assets/logo-horizon.svg';
import mapImg from '../assets/map-icon.svg';
import homiImg from '../assets/homi-icon.svg';

const Container = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 1200px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 0 1.5rem;
  }

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    padding: 0 2rem;
  }
`;

const Navbar = styled.div`
  margin-top: 70px;
  position: relative;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoImageContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  cursor: pointer;
`;

const LogoImage = styled.img`
  display: block;
  width: auto;
  height: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
`;

const MapButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  background-color: ${props => (props.active ? COLOR.GREEN[0] : 'transparent')};
  border-radius: 15px;
  transition: all 0.2s ease-in;

  &:hover {
    transform: translateY(-3px);
  }
`;

const ButtonImage = styled.img`
  height: 28px;
`;

const ButtonSpan = styled.span`
  margin-left: 10px;
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Container>
        <Navbar>
          <LogoImageContainer onClick={() => navigate(`/`)}>
            <LogoImage src={logoImg} alt="로고" />
          </LogoImageContainer>
          <ButtonContainer>
            <MapButton active={location.pathname === '/map'} onClick={() => navigate(`/map`)}>
              <ButtonImage src={mapImg} alt="맵아이콘" />
              <ButtonSpan>내 주변 분양</ButtonSpan>
            </MapButton>
            <MapButton active={location.pathname === '/my'} onClick={() => navigate(`/my`)}>
              <ButtonImage src={homiImg} alt="맵아이콘" />
              <ButtonSpan>마이페이지</ButtonSpan>
            </MapButton>
          </ButtonContainer>
        </Navbar>
      </Container>
      <Outlet />
    </>
  );
};

export default Nav;
