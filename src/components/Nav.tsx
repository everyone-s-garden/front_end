import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { BREAK_POINT, FONT_WEIGHT } from '../constants/style';
import logoImg from '../assets/logo.png';
import mapImg from '../assets/map-logo.png';
import homiImg from '../assets/homi-logo.png';

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

const MapButton = styled.button`
  margin-left: 30px;
  display: flex;
  align-items: center;

  &:hover {
    transform: translateY(-3px);
    transition: all 0.2s ease-in;
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

  return (
    <>
      <Container>
        <Navbar>
          <LogoImageContainer onClick={() => navigate(`/`)}>
            <LogoImage src={logoImg} alt="로고" />
          </LogoImageContainer>
          <ButtonContainer>
            <MapButton onClick={() => navigate(`/map`)}>
              <ButtonImage src={mapImg} alt="맵아이콘" />
              <ButtonSpan>내 주변 분양</ButtonSpan>
            </MapButton>
            <MapButton onClick={() => navigate(`/my`)}>
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
