import React from 'react';
import styled from 'styled-components';

interface ChatBubbleProps {
  position: 'left' | 'right';
}

const ChatBubble = ({ position }: ChatBubbleProps) => {
  return (
    <Container position={position}>
      {position === 'left' && <ProfileImage src="https://avatars.githubusercontent.com/u/44080404?v=4" />}
      <ChatInfoWrapper>
        <Message>안녕하세요!</Message>
        <Time position={position}>오전 10:57</Time>
      </ChatInfoWrapper>
    </Container>
  );
};

const Container = styled.li<ChatBubbleProps>`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: ${({ position }) => (position === 'left' ? 'flex-start' : 'flex-end')};
`;

const ProfileImage = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
`;

const ChatInfoWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Message = styled.p`
  font-size: 20px;
  padding: 10px 13px;
  background-color: #fff;
  border-radius: 10px;
`;

const Time = styled.span<ChatBubbleProps>`
  font-size: 16px;
  color: #999999;
  align-self: flex-end;
  order: ${({ position }) => (position === 'left' ? 1 : -1)};
`;

export default ChatBubble;
