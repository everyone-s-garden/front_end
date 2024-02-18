import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import HttpRequest from './HttpRequest';
import { useRecoilValue } from 'recoil';
import { communityParamsAtom } from 'recoil/atom';

interface PageParam {
  searchContent: string;
  offset?: number;
  limit?: number;
  hour?: number;
  postType: 'INFORMATION_SHARE' | 'GARDEN_SHOWCASE' | 'QUESTION' | 'ETC' | '';
  orderBy: 'COMMENT_COUNT' | 'RECENT_DATE' | 'LIKE_COUNT' | 'OLDER_DATE' | '';
}

interface CommentParam {
  postId: number;
  offset: number;
  limit: number;
  orderBy: 'RECENT_DATE' | 'LIKE_COUNT' | 'OLDER_DATE';
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
  parentId: number | null;
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
  getPopularPosts: async (pageParam: PageParam): Promise<PostList> => {
    const { data } = await HttpRequest.get(`v1/posts/popular`, {
      params: { ...pageParam },
    });
    return data;
  },
  getPost: async (postId: number): Promise<Post> => {
    const { data } = await HttpRequest.get(`v1/posts/${postId}`, {
      params: { postId },
    });
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

  // Comment
  getComments: async (commentParam: CommentParam): Promise<{ commentInfos: Comment[] }> => {
    const { data } = await HttpRequest.get(`v1/posts/${commentParam.postId}/comments`, {
      params: commentParam,
    });
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

export const useGetPopularPosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts', 'popular'],
    queryFn: ({ pageParam }) => CommunityAPI.getPopularPosts(pageParam),
    initialPageParam: {
      offset: 0,
      limit: 6,
      hour: 168,
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

export const useGetPost = (id: number) => {
  return useQuery({ queryKey: ['post', id], queryFn: () => CommunityAPI.getPost(id) });
};

export const useLikePost = () => {
  return useMutation({ mutationFn: CommunityAPI.likePost });
};

export const useUnlikePost = () => {
  return useMutation({ mutationFn: CommunityAPI.unlikePost });
};

export const useDeletePost = () => {
  return useMutation({ mutationFn: CommunityAPI.deletePost });
};

export const useGetComments = (postId: number) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () =>
      CommunityAPI.getComments({
        postId,
        offset: 0,
        limit: 1000,
        orderBy: 'OLDER_DATE',
      }),
    select(data) {
      const parentCommentsMap = new Map<
        number,
        Omit<Comment, 'parentId'> & { subComments: Omit<Comment, 'parentId'>[] }
      >();
      const subComments: Comment[] = [];

      data.commentInfos.forEach(comment => {
        const { authorId, commentId, content, isLikeClick, likeCount, parentId } = comment;

        if (parentId) {
          subComments.push(comment);
          return;
        }

        parentCommentsMap.set(commentId, {
          authorId,
          commentId,
          content,
          isLikeClick,
          likeCount,
          subComments: [],
        });
      });

      subComments.forEach(comment => {
        const { authorId, commentId, content, isLikeClick, likeCount, parentId } = comment;

        if (!parentId) return;

        const parentComment = parentCommentsMap.get(parentId)!;

        parentCommentsMap.set(parentId, {
          ...parentComment,
          subComments: parentComment.subComments.concat({ authorId, commentId, content, isLikeClick, likeCount }),
        });
      });

      return Array.from(parentCommentsMap.values());
    },
  });
};

export const useCreateComment = () => {
  return useMutation({ mutationFn: CommunityAPI.createComment });
};

export const useLikeComment = () => {
  return useMutation({ mutationFn: CommunityAPI.likeComment });
};

export const useUnlikeComment = () => {
  return useMutation({ mutationFn: CommunityAPI.unlikeComment });
};

export const useEditComment = () => {
  return useMutation({ mutationFn: CommunityAPI.editComment });
};
