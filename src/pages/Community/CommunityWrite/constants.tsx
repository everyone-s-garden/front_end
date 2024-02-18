/* eslint-disable react/react-in-jsx-scope */
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'assets/community';

export const POST_TYPE = {
  '정보 공유': 'INFORMATION_SHARE',
  '텃밭 자랑': 'GARDEN_SHOWCASE',
  질문하기: 'QUESTION',
  기타: 'ETC',
};

export const SIZE_TYPE = {
  본문: 'unstyled',
  '제목 1': 'header-one',
  '제목 2': 'header-two',
  서브: 'header-three',
} as const;

export const ALIGN_TYPE = {
  LEFT: <AlignLeftIcon />,
  CENTER: <AlignCenterIcon />,
  RIGHT: <AlignRightIcon />,
};
