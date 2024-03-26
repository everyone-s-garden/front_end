import React, { useState } from 'react';
import styled from 'styled-components';
import ChatListItem from './ChatListItem';
import { motion } from 'framer-motion';
import { useGetGardenChatRooms } from 'api/ChatAPI';

const NAV_LIST = ['내 주변 분양'];

const ChatList = () => {
  const [selected, setSelected] = useState(NAV_LIST[0]);
  const { data } = useGetGardenChatRooms();

  return (
    <ChatListContainer>
      <Title>채팅</Title>
      <Nav>
        {NAV_LIST.map((nav, idx) => (
          <Button layout key={idx} active={selected === nav} onClick={() => setSelected(nav)}>
            {nav}
            {selected === nav && <UnderLine layoutId="underline_chat" />}
          </Button>
        ))}
      </Nav>
      <ChatListUl>
        {data?.responses.map(chat => (
          <ChatListItem key={chat.chatRoomId} chat={chat} />
        ))}
      </ChatListUl>
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 408px;
  }
  overflow: hidden;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 23px 0 17px;
  background-color: ${({ theme }) => theme.colors.white};
  border-left: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-bottom: 4px solid ${({ theme }) => theme.colors.gray[100]};
`;

const Button = styled(motion.button)<{ active: boolean }>`
  position: relative;
  text-align: center;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme, active }) => (active ? theme.colors.black : theme.colors.gray[200])};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const UnderLine = styled(motion.div)`
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  height: 4px;
  background: ${({ theme }) => theme.colors.orange[500]};
`;

const ChatListUl = styled.ul`
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  padding: 0;

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 6px 7px;
    gap: 6px;
  }
`;

const Title = styled.div`
  display: none;

  @media ${({ theme }) => theme.devices.tablet} {
    display: flex;
    font-size: 24px;
    height: 86px;
    font-weight: 600;
    align-items: center;
    padding: 17px;
    flex-shrink: 0;
  }
`;

export default ChatList;
