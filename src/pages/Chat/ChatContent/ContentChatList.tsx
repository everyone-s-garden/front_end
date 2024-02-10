import React, { useEffect } from 'react';
import ChatBubble from './ChatBubble';
import styled from 'styled-components';
import { useGetGardenChatContents } from 'api/ChatAPI';
import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';
// import { Stomp } from '@stomp/stompjs';
import { getItem } from 'utils/session';

const ContentChatList = ({ roomId }: { roomId: number }) => {
  const { data: ChatContents } = useGetGardenChatContents({ roomId });
  const token = getItem('access_token');
  let stompClient = null;

  useEffect(() => {
    client.activate();
    // connect();
  }, []);

  if (!token) return null;

  // function connect() {
  //   let socket = new SockJS('https://every-garden.kro.kr/ws/connect');
  //   stompClient = Stomp.over(socket);
  //   stompClient.webSocketFactory = () => new SockJS('https://every-garden.kro.kr/ws/connect');
  //   stompClient.connectHeaders = { Authorization: `Bearer ${token}` };
  //   stompClient.onConnect = function (frame: any) {
  //     console.log('Connected: ' + frame);
  //     createSession({ sessionId: 1, roomId });
  //   };
  //   stompClient.connect({}, function (frame: any) {
  //     console.log('dfasdfdas: ' + frame);
  //     // createSession({ sessionId: 1, roomId });
  //   });
  //   stompClient.activate();
  // }

  const client = new StompJS.Client({
    brokerURL: `ws://every-garden.kro.kr/ws/connect`,
    connectHeaders: {
      'access-token': token,
    },
    webSocketFactory: function () {
      return new SockJS('https://every-garden.kro.kr/ws/connect');
    },
    debug: function (str) {
      console.log(str);
    },
    onConnect: frame => {
      console.log('dddd' + frame);
      // // createSession({ sessionId, roomId });
      // client.subscribe(`/queue/garden-chats/chats/${roomId}`, (message: any) => {
      //   console.log('aaaaaa' + message);
      // });
      // client.publish({
      //   headers: { Authorization: `Bearer ${token}` },
      //   destination: `/app/chats/${roomId}/messages`,
      //   body: JSON.stringify({ content: 'hello' }),
      // });
    },
    onStompError: function (frame) {
      // console.log('Broker reported error: ' + frame.headers['message']);
      // console.log('Additional details: ' + frame.body);
    },
  });

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
