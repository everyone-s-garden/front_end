import React, { useEffect, useRef, useState } from 'react';
import ChatBubble from './ChatBubble';
import styled from 'styled-components';
import { useGetGardenChatContents } from 'api/ChatAPI';
import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';
import { Stomp } from '@stomp/stompjs';
import { getItem } from 'utils/session';

const ContentChatList = ({ roomId }: { roomId: number }) => {
  const { data: chatContents } = useGetGardenChatContents({ roomId });
  const token = getItem('access_token');
  const [opponentChat, setOpponentChat] = useState<string[]>([]);
  const client = useRef<StompJS.Client>();

  useEffect(() => {
    // client.activate();
    client.current = new StompJS.Client({
      brokerURL: 'wss://every-garden.kro.kr/ws/connect',
      connectHeaders: {
        'access-token': token!,
      },
      // webSocketFactory: function () {
      //   return new SockJS('https://every-garden.kro.kr/ws/connect');
      // },
      debug: function (str) {
        console.log(str);
      },
      onConnect: frame => {
        client.current &&
          client.current.subscribe(`/queue/garden-chats/${roomId}`, (message: any) => {
            setOpponentChat(prev => [...prev, JSON.parse(message.body)]);
          });
      },
      onStompError: function (frame) {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      },
    });
    client.current && client.current.activate();
  }, [roomId, token]);

  useEffect(() => {
    console.log(opponentChat);
  }, [opponentChat]);

  if (!token) return null;
  // const client = new StompJS.Client({
  //   brokerURL: 'wss://every-garden.kro.kr/ws/connect',
  //   connectHeaders: {
  //     'access-token': token,
  //   },
  //   // webSocketFactory: function () {
  //   //   return new SockJS('https://every-garden.kro.kr/ws/connect');
  //   // },
  //   debug: function (str) {
  //     console.log(str);
  //   },
  //   onConnect: frame => {
  //     client.subscribe(`/queue/garden-chats/${roomId}`, (message: any) => {
  //       setOpponentChat(prev => [...prev, JSON.parse(message.body)]);
  //     });
  //   },
  //   onStompError: function (frame) {
  //     console.log('Broker reported error: ' + frame.headers['message']);
  //     console.log('Additional details: ' + frame.body);
  //   },
  // });

  if (!chatContents) return null;

  if (!client) return null;

  console.log(chatContents.gardenChatMessageResponses);

  return (
    <Container>
      <button
        onClick={() => {
          client.current &&
            client.current.publish({
              headers: { 'access-token': token },
              destination: `/app/garden-chats/${roomId}`,
              body: JSON.stringify({ content: '안녕하세요' }),
            });
        }}
      >
        메세지 보내기
      </button>
      {chatContents.gardenChatMessageResponses.map((chat, index) => (
        <ChatBubble key={index} chat={chat} />
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
