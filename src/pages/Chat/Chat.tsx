import React from 'react';
import styled from 'styled-components';
import ChatList from './ChatList/ChatList';
import ChatContent from './ChatContent/ChatContent';
import { BREAK_POINT } from 'constants/style';

const Chat = () => {
  return (
    <Container>
      <ChatList />
      <ChatContent />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #dddd;
  margin: 0 auto;
  display: flex;
  height: calc(var(--vh, 1vh) * 100 - 51px);

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    height: calc(var(--vh, 1vh) * 100 - 106px);
  }
`;

export default Chat;
