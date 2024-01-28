import React from 'react';
import styled from 'styled-components';
import ChatList from './ChatList/ChatList';
import ChatContent from './ChatContent/ChatContent';
import { BREAK_POINT } from 'constants/style';

const Chat = () => {
  return (
    <Container>
      <ChatList />
      {/* <ChatContent /> */}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #dddd;
  margin: 0 auto;
  display: flex;
  /* height: calc(100vh - 110px); */

  @media ${({ theme }) => theme.devices.tablet} {
    /* height: calc(100vh - 120px); */
  }
`;

export default Chat;
