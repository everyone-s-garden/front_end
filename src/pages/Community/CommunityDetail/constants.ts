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
