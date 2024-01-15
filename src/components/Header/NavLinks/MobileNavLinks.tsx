import { BREAK_POINT } from 'constants/style';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import headerNavLinks from './headerNavLinks';

const MobileNavLinks = () => {
  return (
    <NavContainer>
      {headerNavLinks.map((link, idx) => {
        return (
          <StyledNavLink key={idx} to={link.href}>
            {link.name}
          </StyledNavLink>
        );
      })}
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  width: 100%;
  padding: 0 13px 14px 13px;
  border-bottom: 2px solid #d9d9d9;
  /* overflow-x: auto; */

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-size: 16px;
  font-weight: 700;
  color: #d9d9d9;
  flex-shrink: 0;
  position: relative;
  padding: 0 13px;

  &.active {
    color: #414141;
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -16px;
      width: 100%;
      left: 0;
      height: 2px;
      background-color: #f77800;
    }
  }
`;

export default MobileNavLinks;
