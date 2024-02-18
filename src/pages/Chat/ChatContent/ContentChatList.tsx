import React, { useEffect, useRef, useState } from 'react';
import ChatBubble from './ChatBubble';
import styled from 'styled-components';
import { useGetGardenChatContents } from 'api/ChatAPI';
import { ChatContent, EnterChatRoom } from 'types/Chat';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { set } from 'react-hook-form';

interface ContentChatListProps {
  roomId: number;
  socketMessage: ChatContent[];
  productInfo: EnterChatRoom;
}

const ContentChatList = ({ roomId, socketMessage, productInfo }: ContentChatListProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState<number>(0);

  const { data: chatContents, fetchNextPage, hasNextPage } = useGetGardenChatContents({ roomId });
  const { target } = useIntersectionObserver({ fetchNextPage: fetchPrevChatContents, hasNextPage });
  const { partnerId, partnerProfileImage } = productInfo;

  function fetchPrevChatContents() {
    if (!scrollRef.current) return;

    fetchNextPage();
    setPrevScrollHeight(scrollRef.current.scrollHeight);
  }

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollTop = scrollRef.current.scrollHeight - prevScrollHeight;
    scrollRef.current.scrollTop = scrollTop;
  }, [chatContents, prevScrollHeight]);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [socketMessage]);

  if (!chatContents) return null;

  return (
    <Container ref={scrollRef}>
      <div ref={target} />
      {chatContents.pages
        .slice()
        .reverse()
        .map(({ gardenChatMessageResponses }) =>
          gardenChatMessageResponses.map(chat => (
            <ChatBubble
              key={chat.chatMessageId}
              chat={chat}
              profile={partnerProfileImage}
              isMine={partnerId !== chat.memberId}
            />
          )),
        )}
      {socketMessage.map((chat, index) => (
        <ChatBubble key={index} chat={chat} profile={partnerProfileImage} isMine={partnerId !== chat.memberId} />
      ))}
    </Container>
  );
};

const Container = styled.ul`
  padding: 181px 20px 92px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 24px;
  @media ${({ theme }) => theme.devices.tablet} {
    padding: 86px 20px 200px;
    border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }
`;

export default ContentChatList;
