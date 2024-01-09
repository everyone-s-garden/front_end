import React from 'react';
import ChatBubble from './ChatBubble';
import styled from 'styled-components';

const ContentChatList = () => {
  return (
    <Container>
      {Array.from({ length: 5 }).map((_, index) => (
        <ChatBubble key={index} position={index % 2 === 0 ? 'left' : 'right'} />
      ))}
    </Container>
  );
};

const Container = styled.ul`
  padding: 110px 20px 200px;
  height: 100%;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 24px;
`;

export default ContentChatList;
