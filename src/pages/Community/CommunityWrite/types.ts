import type { EditorState } from 'draft-js';

export type PostTypes = '정보 공유' | '텃밭 자랑' | '질문하기' | '기타';

export type Post = {
  postType: PostTypes | '주제';
  title: string;
  content: EditorState;
  images: File[];
};

export type InlineStyles = 'BOLD' | 'ITALIC' | 'UNDERLINE' | string;
export type BlockStyles = 'unstyled' | 'header-one' | 'header-two' | 'header-three' | string;
