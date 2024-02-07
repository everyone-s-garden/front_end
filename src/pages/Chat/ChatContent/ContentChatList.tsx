import React, { useEffect } from 'react';
import ChatBubble from './ChatBubble';
import styled from 'styled-components';
import { useGetGardenChatContents } from 'api/ChatAPI';
import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';
import { getItem } from 'utils/session';

const ContentChatList = ({ roomId }: { roomId: number }) => {
  const { data: ChatContents } = useGetGardenChatContents({ roomId });
  // const baseUrl = process.env.REACT_APP_API_BASE_URL;

  // connectHeaders: {
  //   'access-token': getItem('access_token') || '',
  // },

  const token = getItem('access_token');

  if (!token) return null;

  const client = new StompJS.Client({
    brokerURL: `ws://every-garden.kro.kr/ws/chats`,
    connectHeaders: {
      'access-token': token,
    },
    debug: function (str) {
      console.log(str);
    },
    onConnect: function (frame) {
      console.log('Connected: ' + frame);
    },
  });

  client.activate();

  // function connect() {
  //   let socket = new SockJS(`ws//every-garden.kro.kr/ws/chats`);
  //   stompClient = Stomp.over(socket);
  //   stompClient.connect({}, function (frame) {
  //     console.log('Connected: ' + frame);
  //   });
  // }

  // const client = new StompJS.Client({
  //   brokerURL: `/ws/chats`,
  //   connectHeaders: {
  //     Authorization:
  //       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTM2MTU1NDA0MjEzODcxODk4MTIiLCJyb2xlIjoiUk9MRV9VU0VSIiwibWVtYmVySWQiOjUsImV4cCI6MTY5NjczNjE1Mn0.VbyQqdDE8byIs3gp1MRmhkvQ8sh9GFKIQukXnhUDDRU',
  //   },
  //   webSocketFactory: function () {
  //     return new SockJS(baseUrl!);
  //   },
  // });

  // client.activate();
  // client.subscribe(`/queue/chats/${roomId}`, message => {
  //   console.log(message);
  // });

  if (!ChatContents) return null;

  return (
    <Container>
      {ChatContents.gardenChatMessageResponses.map((chat, index) => (
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
