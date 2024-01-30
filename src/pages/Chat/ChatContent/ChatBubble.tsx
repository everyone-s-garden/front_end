import React from 'react';
import styled from 'styled-components';
import defaultProfile from 'assets/default_profile.png';
interface ChatBubbleProps {
  position: 'left' | 'right';
}

const ChatBubble = ({ position }: ChatBubbleProps) => {
  return (
    <Container position={position}>
      {position === 'left' && <ProfileImage src={defaultProfile} />}
      <ChatInfoWrapper>
        <Message position={position}>안녕하세요!</Message>
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
  width: 38px;
  height: 38px;
  border-radius: 50%;

  @media ${({ theme }) => theme.devices.tablet} {
    width: 52px;
    height: 52px;
  }
`;

const ChatInfoWrapper = styled.div`
  display: flex;
  gap: 8px;

  @media ${({ theme }) => theme.devices.tablet} {
    gap: 10px;
  }
`;

const Message = styled.p<ChatBubbleProps>`
  font-size: 16px;
  font-weight: 500;
  padding: 8px 12px;
  background-color: ${({ theme, position }) =>
    position === 'left' ? theme.colors.orange[200] : theme.colors.orange[400]};
  border-radius: 10px;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 20px;
    padding: 10px 13px;
  }
`;

const Time = styled.span<ChatBubbleProps>`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[400]};
  align-self: flex-end;
  order: ${({ position }) => (position === 'left' ? 1 : -1)};

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 16px;
  }
`;

export default ChatBubble;
