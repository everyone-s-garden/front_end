import React from 'react';
import styled from 'styled-components';
import ChatList from './ChatList/ChatList';
import ChatContent from './ChatContent/ChatContent';

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
  margin: 0 auto;
  display: flex;
`;

export default Chat;
