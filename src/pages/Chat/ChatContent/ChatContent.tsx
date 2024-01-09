import { BREAK_POINT } from 'constants/style';
import React from 'react';
import styled from 'styled-components';
import ContentHeader from './ContentHeader';
import ContentChatList from './ContentChatList';

const ChatContent = () => {
  return (
    <Container>
      <ContentHeader />
      <ContentChatList />
    </Container>
  );
};

const Container = styled.div`
  background-color: #121212;
  display: none;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: block;
    width: 792px;
  }
`;

export default ChatContent;
