import { BREAK_POINT } from 'constants/style';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import headerNavLinks from './headerNavLinks';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from 'recoil/atom';

const NavLinks = () => {
  const isLogin = useRecoilValue(isLoginAtom);

  return (
    <NavContainer>
      {headerNavLinks.map((link, idx) => {
        if (link.name === '홈') return;

        if (link.name === '채팅' && !isLogin) return;

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
  display: none;
  margin: 0 36px;
  gap: 36px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: flex;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-size: 18px;
  font-weight: 600;
`;

export default NavLinks;
