import { useMutation, useQuery } from '@tanstack/react-query';
import HttpRequest from './HttpRequest';

interface User {
  nickname: string;
  profileImageUrl: string;
  memberMannerGrade: string;
}

export const UserAPI = {
  getUser: async (id: number): Promise<User> => {
    const { data } = await HttpRequest.get(`members/${id}`);
    return data;
  },
};

export const useGetUser = (id: number) => {
  return useQuery({ queryKey: ['user', id], queryFn: () => UserAPI.getUser(id) });
};

const createFeedback = async (formData: FormData) => {
  await HttpRequest.post('/v1/feedbacks', formData);
};

export const useCreateFeedback = () => {
  return useMutation({
    mutationFn: createFeedback,
  });
};

const getMyInfo = async () => {
  const response = await HttpRequest.get('/members/my');
  return response.data;
};

export const useGetMyInfo = () => {
  return useQuery({ queryKey: ['myInfo'], queryFn: getMyInfo });
};
