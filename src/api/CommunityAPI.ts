import { useInfiniteQuery, useMutation, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import HttpRequest from './HttpRequest';
import { useRecoilValue } from 'recoil';
import { communityParamsAtom } from 'recoil/atom';

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

interface PostList {
  postInfos: {
    postId: number;
    title: string;
    likeCount: number;
    commentCount: number;
    content: string;
    preview: string;
    authorId: number;
    postType: 'INFORMATION_SHARE' | 'GARDEN_SHOWCASE' | 'QUESTION' | 'ETC';
    createdDate: string;
  }[];
}

export const CommunityAPI = {
  getAllPosts: async (pageParam: PageParam): Promise<PostList> => {
    const orderBy = pageParam.orderBy || 'RECENT_DATE';

    const { data } = await HttpRequest.get(`v1/posts`, {
      params: { ...pageParam, orderBy },
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

export const useGetAllPosts = () => {
  const params = useRecoilValue(communityParamsAtom);

  return useInfiniteQuery({
    queryKey: ['posts', params],
    queryFn: ({ pageParam }) => CommunityAPI.getAllPosts({ ...pageParam, ...params }),
    initialPageParam: {
      offset: 0,
      limit: 6,
    } as PageParam,
    getNextPageParam: (...pages) => {
      const [data, , params] = pages;

      if (data.postInfos.length < 6) {
        return undefined;
      }

      return {
        ...params,
        offset: params.offset || 0 + 6,
      };
    },
    select(data) {
      console.log('data: ', data);

      const posts = data.pages.reduce<PostList['postInfos']>((acc, item) => acc.concat(item.postInfos), []);

      return posts;
    },
  });
};

export const useCreatePost = () => {
  return useMutation({ mutationFn: CommunityAPI.createPost });
};
