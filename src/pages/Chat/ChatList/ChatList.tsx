import React from 'react';
import styled from 'styled-components';
import ChatListItem from './ChatListItem';
import { BREAK_POINT } from 'constants/style';

const ChatList = () => {
  return (
    <ChatListContainer>
      <Title>채팅</Title>
      <BtnContainer>
        <Btn>내 주변 분양</Btn>
        <Btn>작물거래</Btn>
      </BtnContainer>
      <ChatListUl>
        {Array.from({ length: 100 }).map((_, idx) => (
          <ChatListItem key={idx} />
        ))}
      </ChatListUl>
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 408px;
  }
`;

const BtnContainer = styled.div`
  background-color: #fff;
  padding: 23px 0 17px;
`;

const Btn = styled.button`
  font-size: 18px;
  font-weight: 600;
  width: 110px;
`;

const ChatListUl = styled.ul`
  overflow-y: scroll;
`;

const Title = styled.div`
  font-size: 24px;
  height: 86px;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding: 17px;
  background-color: #d9d9d9;
  flex-shrink: 0;
`;

export default ChatList;
