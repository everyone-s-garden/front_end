import { useMutation, useQuery } from '@tanstack/react-query';
import HttpRequest from './HttpRequest';
import { ChatContentsResponse, ChatRooms, EnterChatRoom } from 'types/Chat';

const createGardenChatRoom = async ({ writerId, postId }: { writerId: number; postId: number }) => {
  const response = await HttpRequest.post(`/garden-chats`, { writerId, postId });

  return response;
};

const enterGardenChatRoom = async ({ chatRoomId }: { chatRoomId: number }): Promise<EnterChatRoom> => {
  const response = await HttpRequest.patch(`/garden-chats/${chatRoomId}`);

  return response.data;
};

const registerGardenChatSession = async ({ sessionId, roomId }: { sessionId: number; roomId: number }) => {
  const response = await HttpRequest.post(`/garden-chats/sessions`, { sessionId, roomId });

  return response;
};

const getGardenChatRooms = async (): Promise<ChatRooms> => {
  const response = await HttpRequest.get(`/garden-chats?pageNumber=0`);

  return response.data;
};

const getGardenChatContents = async ({ roomId }: { roomId: number }): Promise<ChatContentsResponse> => {
  const response = await HttpRequest.get(`/garden-chats/${roomId}/messages?pageNumber=0`);

  return response.data;
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

export const useGetGardenChatRooms = () => {
  return useQuery({
    queryKey: ['gardenChatRooms'],
    queryFn: getGardenChatRooms,
  });
};

export const useGetGardenChatContents = ({ roomId }: { roomId: number }) => {
  return useQuery({
    queryKey: ['gardenChatContents', roomId],
    queryFn: () => getGardenChatContents({ roomId }),
  });
};
