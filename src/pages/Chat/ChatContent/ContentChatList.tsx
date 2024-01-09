import React from 'react';
import ChatBubble from './ChatBubble';
import styled from 'styled-components';

const ContentChatList = () => {
  return (
    <Container>
      <ChatBubble position="left" />
      <ChatBubble position="right" />
    </Container>
  );
};

const Container = styled.ul`
  padding: 28px 20px;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default ContentChatList;
