import { useMutation, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import HttpRequest from './HttpRequest';
import customAxios from 'utils/token';

interface PageParam {
  searchContent: string;
  offset: number;
  limit: number;
  orderBy: 'COMMENT_COUNT' | 'RECENT_DATE' | 'LIKE_COUNT' | 'OLDER_DATE';
}

// interface Post {
//   texts: {
//     title: string;
//     content: string;
//     postType: 'INFORMATION_SHARE' | 'GARDEN_SHOWCASE' | 'QUESTION' | 'ETC';
//   };
//   images: FormData;
// }

export const CommunityAPI = {
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
  createPost: async (data: FormData): Promise<any> => {
    const res = await customAxios.post(`v1/posts`, data);
    return res;
  },
};

export const useGetAllPosts = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['reviews', '/reviews'],
    queryFn: ({ pageParam }) => CommunityAPI.getAllPosts(pageParam),
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

export const useCreatePost = () => {
  return useMutation({ mutationFn: CommunityAPI.createPost });
};
