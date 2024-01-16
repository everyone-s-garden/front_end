import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoginAtom } from 'recoil/atom';
import styled from 'styled-components';
import { ReactComponent as PlusIcon } from 'assets/plus-icon.svg';
import { ReactComponent as BellIcon } from 'assets/bell-icon.svg';
import { ReactComponent as UserIcon } from 'assets/user-icon.svg';
import { BREAK_POINT } from 'constants/style';
import PostOptions from './PostOptions';
import Notification from './Notification';

const UserItems = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [isPostOptionsOpen, setIsPostOptionsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const logout = () => {
    sessionStorage.clear();
    setIsLogin(false);
  };

  return (
    <Container>
      {isLogin && (
        <BellBtn onClick={() => setIsNotificationOpen(true)} onBlur={() => setIsNotificationOpen(false)}>
          <BellIcon />
        </BellBtn>
      )}
      {isNotificationOpen && <Notification />}
      {isLogin && <StyledLink to="/my">마이페이지</StyledLink>}
      <StyledUserIcon login={isLogin} />
      {isLogin ? (
        <StyledLink to="/" onClick={logout}>
          로그아웃
        </StyledLink>
      ) : (
        <StyledLink to="/login">로그인 / 회원가입</StyledLink>
      )}
      <PostBtn onClick={() => setIsPostOptionsOpen(true)} onBlur={() => setIsPostOptionsOpen(false)}>
        <StyledPlusIcon />
        글쓰기
      </PostBtn>
      {isPostOptionsOpen && <PostOptions />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
  position: relative;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    gap: 30px;
  }
`;

const BellBtn = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 26px;
    height: 26px;
  }
`;

const StyledLink = styled(Link)`
  font-size: 16px;
  font-weight: 400;
  display: none;

  @media (min-width: ${BREAK_POINT.TABLET}) {
    display: block;
  }
`;

const PostBtn = styled.button`
  background-color: #fceec0;
  border-radius: 10px;
  padding: 8px 12px;
  display: none;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #000;
  font-size: 18px;
  font-weight: 500;

  @media (min-width: ${BREAK_POINT.TABLET}) {
    display: flex;
  }
`;

const StyledPlusIcon = styled(PlusIcon)`
  width: 16px;
  height: 16px;
  & path {
    stroke: #000;
  }
`;

const StyledUserIcon = styled(UserIcon)`
  width: 24px;
  height: 24px;
  display: block;
  fill: ${({ login }) => (login ? '#000' : 'transparent')};
  stroke: #000;
  cursor: pointer;
  @media (min-width: ${BREAK_POINT.TABLET}) {
    display: none;
  }
`;

export default UserItems;
