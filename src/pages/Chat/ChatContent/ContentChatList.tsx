import React, { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import styled from 'styled-components';
import { useGetGardenChatContents } from 'api/ChatAPI';
import { ChatContent } from 'types/Chat';

interface ContentChatListProps {
  roomId: number;
  socketMessage: ChatContent[];
  partnerId: number;
}

const ContentChatList = ({ roomId, socketMessage, partnerId }: ContentChatListProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const { data: chatContents } = useGetGardenChatContents({ roomId });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [socketMessage, chatContents]);

  if (!chatContents) return null;

  return (
    <Container ref={scrollRef}>
      {chatContents.gardenChatMessageResponses.map((chat, index) => (
        <ChatBubble key={index} chat={chat} isMine={partnerId !== chat.memberId} />
      ))}
      {socketMessage.map((chat, index) => (
        <ChatBubble key={index} chat={chat} isMine={partnerId !== chat.memberId} />
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
