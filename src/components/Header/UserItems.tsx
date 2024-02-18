import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoginAtom } from 'recoil/atom';
import styled from 'styled-components';
import { ReactComponent as UserIcon } from 'assets/user-icon.svg';
import PostOptions from './PostOptions';
import Notification from './Notification';

const UserItems = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const nav = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    setIsLogin(false);
  };

  return (
    <Container>
      {/* <Notification /> */}
      {isLogin && <StyledLink to="/my">마이페이지</StyledLink>}
      <StyledUserIcon onClick={() => nav('/my')} login={isLogin.toString()} />
      {isLogin ? (
        <StyledLink to="/" onClick={logout}>
          로그아웃
        </StyledLink>
      ) : (
        <StyledLink to="/login">로그인 / 회원가입</StyledLink>
      )}
      <PostOptions />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
  position: relative;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 30px;
  }
`;

const StyledLink = styled(Link)`
  font-size: 16px;
  font-weight: 400;
  display: none;

  @media ${({ theme }) => theme.devices.tablet} {
    display: block;
  }
`;

const StyledUserIcon = styled(UserIcon)`
  width: 24px;
  height: 24px;
  display: block;
  fill: ${({ login }) => (login ? '#000' : 'transparent')};
  stroke: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  @media ${({ theme }) => theme.devices.tablet} {
    display: none;
  }
`;

export default UserItems;
