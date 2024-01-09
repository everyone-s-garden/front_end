import React from 'react';
import styled from 'styled-components';
import ChatListItem from './ChatListItem';
import { BREAK_POINT } from 'constants/style';

const ChatList = () => {
  return (
    <ChatListContainer>
      <Title>채팅</Title>
      <div>
        <button>내 주변 분양</button>
        <button>작물거래</button>
      </div>
      <ul>
        <ChatListItem />
      </ul>
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  width: 100%;
  flex-shrink: 0;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 408px;
  }
`;

const Title = styled.div`
  font-size: 24px;
  height: 86px;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding: 17px;
  background-color: #d9d9d9;
`;

export default ChatList;
