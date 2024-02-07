export interface ChatRoom {
  recentContents: string;
  readNotCnt: number;
  postInfo: {
    postId: number;
    images: string[];
  };
  partnerInfo: {
    partnerId: number;
    nickName: string;
    imageUrl: string | null;
  };
  createdAt: string;
  chatRoomId: number;
  chatMessageId: number;
}

export interface ChatRooms {
  hasNext: boolean;
  responses: ChatRoom[];
}

export interface EnterChatRoom {
  partnerId: number;
  partnerNickName: string;
  postId: number;
  gardenStatus: string;
  gardenName: string;
  price: number;
  images: string[];
}

export interface ChatContent {
  chatMessageId: number;
  memberId: number;
  contents: string;
  createdAt: number[];
  readOrNot: boolean;
  isMine: boolean;
}

export interface ChatContentsResponse {
  hasNext: boolean;
  gardenChatMessageResponses: ChatContent[];
}
