import React from 'react';
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
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 101;

  @media ${({ theme }) => theme.devices.tablet} {
    position: relative;
    display: block;
  }
`;

export default ChatContent;
