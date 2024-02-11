import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ContentHeader from './ContentHeader';
import ContentChatList from './ContentChatList';
import ContentInput from './ContentInput';
import { useEnterGardenChatRoom } from 'api/ChatAPI';
import { useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';
import { getItem } from 'utils/session';
import { ChatContent } from 'types/Chat';

const ChatContents = () => {
  const location = useLocation();
  const roomId = Number(location.pathname.split('/').pop());
  const client = useRef<StompJS.Client>();
  const token = getItem('access_token');
  const { mutate: enterChatRoom, data: productInfo } = useEnterGardenChatRoom();
  const [socketMessage, setSocketMessage] = useState<ChatContent[]>([]);

  useEffect(() => {
    if (roomId) {
      enterChatRoom({ chatRoomId: Number(roomId) });
    }
  }, [roomId, enterChatRoom]);

  useEffect(() => {
    client.current = new StompJS.Client({
      brokerURL: 'wss://every-garden.kro.kr/ws/connect',
      connectHeaders: {
        'access-token': token!,
      },
      // webSocketFactory: function () {
      //   return new SockJS('https://every-garden.kro.kr/ws/connect');
      // },
      debug: str => {
        console.log(str);
      },
      onConnect: frame => {
        client.current &&
          client.current.subscribe(`/queue/garden-chats/${roomId}`, (message: any) => {
            setSocketMessage(prev => [...prev, JSON.parse(message.body)]);
          });
      },
      onStompError: frame => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      },
    });
    client.current && client.current.activate();
  }, [roomId, token]);

  const sendMessage = (message: string) => {
    client.current &&
      client.current.publish({
        headers: { 'access-token': token! },
        destination: `/app/garden-chats/${roomId}`,
        body: JSON.stringify({ content: message }),
      });
  };

  if (!productInfo) return null;

  console.log(productInfo);

  return (
    <Container>
      <ContentHeader productInfo={productInfo} />
      <ContentChatList roomId={roomId} socketMessage={socketMessage} productInfo={productInfo} />
      <ContentInput sendMessage={sendMessage} />
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

export default ChatContents;
