import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
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
  commentCount: number;
  likeCount: number;
  authorId: number;
  title: string;
  content: string;
  createdDate: string;
  isLikeClick: boolean;
  images: string[];
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

interface Comment {
  commentId: number;
  parentId: number;
  likeCount: number;
  content: string;
  authorId: number;
  isLikeClick: boolean;
}

export const CommunityAPI = {
  // Post
  getAllPosts: async (pageParam: PageParam): Promise<PostList> => {
    const orderBy = pageParam.orderBy || 'RECENT_DATE';

    const { data } = await HttpRequest.get(`v1/posts`, {
      params: { ...pageParam, orderBy },
    });
    return data;
  },
  getPost: async (id: number): Promise<Post> => {
    const { data } = await HttpRequest.get(`v1/posts/${id}`);
    return data;
  },
  createPost: async (data: FormData): Promise<any> => {
    const res = await HttpRequest.post(`v1/posts`, data);
    return res;
  },
  likePost: async (postId: number): Promise<any> => {
    const res = await HttpRequest.post(`v1/posts/${postId}/likes`);
    return res;
  },
  unlikePost: async (postId: number): Promise<any> => {
    const res = await HttpRequest.delete(`v1/posts/${postId}/likes`);
    return res;
  },
  editPost: async (data: FormData, postId: number): Promise<any> => {
    const res = await HttpRequest.patch(`v1/posts/${postId}`, data);
    return res;
  },
  deletePost: async (postId: number): Promise<any> => {
    const res = await HttpRequest.delete(`v1/posts/${postId}`);
    return res;
  },
  getPopularPosts: async (): Promise<PostList> => {
    const { data } = await HttpRequest.get(`v1/posts/popular`);
    return data;
  },

  // Comment
  getComments: async (postId: number): Promise<{ commentInfos: Comment[] }> => {
    const { data } = await HttpRequest.get(`v1/posts/${postId}/comments`);
    return data;
  },
  createComment: async ({
    postId,
    content,
    parentCommentId,
  }: {
    postId: number;
    content: string;
    parentCommentId: number;
  }): Promise<any> => {
    const res = await HttpRequest.post(`v1/posts/${postId}/comments`, { content, parentCommentId });
    return res;
  },
  likeComment: async (commentId: number): Promise<any> => {
    const res = await HttpRequest.post(`v1/posts/comments/${commentId}/likes`);
    return res;
  },
  unlikeComment: async (commentId: number): Promise<any> => {
    const res = await HttpRequest.delete(`v1/posts/comments/${commentId}/likes`);
    return res;
  },
  editComment: async ({ commentId, content }: { postId: number; commentId: number; content: string }): Promise<any> => {
    const res = await HttpRequest.patch(`v1/posts/comments/${commentId}`, { content });
    return res;
  },
  deleteComment: async (commentId: number): Promise<any> => {
    const res = await HttpRequest.delete(`v1/posts/comments/${commentId}`);
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
        offset: (params.offset || 0) + 6,
      };
    },
    select(data) {
      const posts = data.pages.reduce<PostList['postInfos']>((acc, item) => acc.concat(item.postInfos), []);

      return posts;
    },
  });
};

export const useCreatePost = () => {
  return useMutation({ mutationFn: CommunityAPI.createPost });
};
