import { useInfiniteQuery, useMutation, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import HttpRequest from './HttpRequest';

interface PageParam {
  searchContent: string;
  offset?: number;
  limit?: number;
  postType: 'INFORMATION_SHARE' | 'GARDEN_SHOWCASE' | 'QUESTION' | 'ETC' | '';
  orderBy: 'COMMENT_COUNT' | 'RECENT_DATE' | 'LIKE_COUNT' | 'OLDER_DATE' | '';
}

interface Post {
  texts: {
    title: string;
    content: string;
    postType: 'INFORMATION_SHARE' | 'GARDEN_SHOWCASE' | 'QUESTION' | 'ETC';
  };
  images: FormData;
}

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
    const res = await HttpRequest.post(`v1/posts`, data);
    return res;
  },
};

export const useGetAllPosts = (params: PageParam) => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => CommunityAPI.getAllPosts(pageParam),
    initialPageParam: {
      ...params,
      offset: 0,
      limit: 10,
    } as PageParam,
    getNextPageParam: lastPage => {
      console.log('이전 페이지: ', lastPage);

      return null;
    },
    select(data) {
      console.log('data: ', data);
      return data;
    },
  });
};

export const useCreatePost = () => {
  return useMutation({ mutationFn: CommunityAPI.createPost });
};
