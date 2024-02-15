import { useQuery } from '@tanstack/react-query';
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
