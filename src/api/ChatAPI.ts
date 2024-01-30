import { useMutation } from '@tanstack/react-query';
import HttpRequest from './HttpRequest';

const createGardenChatRoom = async ({ writerId, postId }: { writerId: number; postId: number }) => {
  const response = await HttpRequest.post(`/v1//garden-chats`, { writerId, postId });

  return response;
};

const enterGardenChatRoom = async ({ chatRoomId }: { chatRoomId: number }) => {
  const response = await HttpRequest.patch(`/v1/garden-chats/${chatRoomId}`);

  return response;
};

const registerGardenChatSession = async ({ sessionId, roomId }: { sessionId: number; roomId: number }) => {
  const response = await HttpRequest.post(`/v1/garden-chats/sessions`, { sessionId, roomId });

  return response;
};

export const useCreateGardenChatRoom = () => {
  return useMutation({
    mutationFn: createGardenChatRoom,
  });
};

export const useEnterGardenChatRoom = () => {
  return useMutation({
    mutationFn: enterGardenChatRoom,
  });
};

export const useRegisterGardenChatSession = () => {
  return useMutation({
    mutationFn: registerGardenChatSession,
  });
};
