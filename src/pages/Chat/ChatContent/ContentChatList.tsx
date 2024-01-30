import React from 'react';
import ChatBubble from './ChatBubble';
import styled from 'styled-components';

const ContentChatList = () => {
  return (
    <Container>
      {Array.from({ length: 20 }).map((_, index) => (
        <ChatBubble key={index} position={index % 2 === 0 ? 'left' : 'right'} />
      ))}
    </Container>
  );
};

const Container = styled.ul`
  padding: 205px 20px 92px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 24px;
  @media ${({ theme }) => theme.devices.tablet} {
    padding: 110px 20px 200px;
    border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }
`;

export default ContentChatList;
