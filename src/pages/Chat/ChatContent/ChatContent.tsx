import React from 'react';
import { BREAK_POINT } from 'constants/style';
import styled from 'styled-components';
import ContentHeader from './ContentHeader';
import ContentChatList from './ContentChatList';
import ContentInput from './ContentInput';

const ChatContent = () => {
  return (
    <Container>
      <ContentHeader />
      <ContentChatList />
      <ContentInput />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  position: relative;
  display: none;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: block;
    width: 792px;
  }
`;

export default ChatContent;
