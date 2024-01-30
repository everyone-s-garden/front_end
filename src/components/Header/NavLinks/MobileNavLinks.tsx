import { BREAK_POINT } from 'constants/style';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import headerNavLinks from './headerNavLinks';
import { motion } from 'framer-motion';

const MobileNavLinks = () => {
  return (
    <NavContainer>
      {headerNavLinks.map((link, idx) => {
        return (
          <StyledNavLink key={idx} to={link.href}>
            {({ isActive }) => (
              <>
                {link.name}
                {isActive && <Underline layoutId="underline_navLink" />}
              </>
            )}
          </StyledNavLink>
        );
      })}
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0 13px 14px 13px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[200]};
  flex-shrink: 0;
  padding: 0 10px;
  font-size: 14px;
  position: relative;
  flex-shrink: 0;

  &.active {
    color: ${({ theme }) => theme.colors.gray[800]};
  }

  @media (min-width: 370px) {
    padding: 0 13px;
    font-size: 16px;
  }
`;

const Underline = styled(motion.div)`
  position: absolute;
  bottom: -16px;
  left: 0;
  right: 0;
  height: 2px;
  background: ${({ theme }) => theme.colors.orange[600]};
`;

export default MobileNavLinks;
