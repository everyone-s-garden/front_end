import { BREAK_POINT } from 'constants/style';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import headerNavLinks from './headerNavLinks';
import { motion } from 'framer-motion';

const MobileNavLinks = () => {
  return (
    <NavContainer>
      <ul>
        {headerNavLinks.map((link, idx) => {
          return (
            <li key={idx}>
              <StyledNavLink to={link.href}>
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && <Underline layoutId="underline" />}
                  </>
                )}
              </StyledNavLink>
            </li>
          );
        })}
      </ul>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  width: 100%;
  padding: 0 13px 14px 13px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[200]};

  ul {
    display: flex;
  }

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[200]};
  flex-shrink: 0;
  padding: 0 13px;
  position: relative;
  flex-shrink: 0;

  &.active {
    color: ${({ theme }) => theme.colors.gray[800]};
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
