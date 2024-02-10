import React, { useEffect } from 'react';
import styled from 'styled-components';
import ContentHeader from './ContentHeader';
import ContentChatList from './ContentChatList';
import ContentInput from './ContentInput';
import { useEnterGardenChatRoom } from 'api/ChatAPI';
import { useLocation } from 'react-router-dom';

const ChatContent = () => {
  const location = useLocation();
  const roomId = Number(location.pathname.split('/').pop());
  const { mutate: enterChatRoom, data: productInfo } = useEnterGardenChatRoom();

  useEffect(() => {
    if (roomId) {
      enterChatRoom({ chatRoomId: Number(roomId) });
    }
  }, [roomId, enterChatRoom]);

  if (!productInfo) return null;

  console.log(productInfo);

  return (
    <Container>
      <ContentHeader productInfo={productInfo} />
      <ContentChatList roomId={roomId} />
      <ContentInput roomId={roomId} />
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
