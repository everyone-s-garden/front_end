import React from 'react';
import styled from 'styled-components';
import ChatList from './ChatList/ChatList';
import { Outlet } from 'react-router-dom';

const Chat = () => {
  return (
    <Container>
      <ChatList />
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0 auto;
  display: flex;

  @media ${({ theme }) => theme.devices.tablet} {
    background-color: ${({ theme }) => theme.colors.orange[100]};
  }
`;

export default Chat;
