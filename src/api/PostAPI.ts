import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import HttpRequest from './HttpRequest';

interface PageParam {
  searchContent: string;
  offset: number;
  limit: number;
  orderBy: 'COMMENT_COUNT' | 'RECENT_DATE' | 'LIKE_COUNT' | 'OLDER_DATE';
}

export const PostAPI = {
  getAllPosts: async (pageParam: PageParam): Promise<any> => {
    const { data } = await HttpRequest.get(`v1/posts`, {
      params: pageParam,
    });
    return data;
  },
  getPost: async (id: number): Promise<any> => {
    const { data } = await HttpRequest.get(`v1/posts/${id}`);
    return data;
  },
};

export const useGetAllPosts = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['reviews', '/reviews'],
    queryFn: ({ pageParam }) => PostAPI.getAllPosts(pageParam),
    initialPageParam: {
      searchContent: '',
      offset: 0,
      limit: 10,
      orderBy: 'RECENT_DATE',
    } as PageParam,
    getNextPageParam: lastPage => {
      console.log(lastPage);

      return null;
    },
  });
};
