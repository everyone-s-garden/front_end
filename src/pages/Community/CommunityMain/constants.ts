export const POST_TYPE = {
  INFORMATION_SHARE: '정보 공유',
  GARDEN_SHOWCASE: '텃밭 자랑',
  QUESTION: '질문하기',
  ETC: '기타',
} as const;

export const POST_TYPE_REVERSE = {
  '정보 공유': 'INFORMATION_SHARE',
  '텃밭 자랑': 'GARDEN_SHOWCASE',
  질문하기: 'QUESTION',
  기타: 'ETC',
} as const;

export const ORDER_BY = {
  COMMENT_COUNT: '댓글순',
  RECENT_DATE: '최신 날짜순',
  OLDER_DATE: '오래된 날짜순',
  LIKE_COUNT: '좋아요 순',
} as const;

export const ORDER_BY_REVERSE = {
  댓글순: 'COMMENT_COUNT',
  '최신 날짜순': 'RECENT_DATE',
  '오래된 날짜순': 'OLDER_DATE',
  '좋아요 순': 'LIKE_COUNT',
} as const;
