import { atom } from 'recoil';
import { GardenDetailType, GardenListType } from 'api/type';
import { IGardenDetail } from 'types/GardenDetail';
import { ILocation } from 'components/Nav/Nav';
import { IHashMyGarden } from 'types/MyGarden';
import { getItem } from 'utils/session';

// Modal Atoms
export const isReportOpenAtom = atom<boolean>({
  key: 'isReportOpen',
  default: false,
});
export const reportPostIdAtom = atom<number | null>({
  key: 'reportPostId',
  default: null,
});
export const isMyPostOpenAtom = atom<boolean>({
  key: 'isMyPostOpen',
  default: false,
});
export const isFeedbackOpenAtom = atom<boolean>({
  key: 'isFeedbackOpen',
  default: false,
});
export const isCropOpenAtom = atom<boolean>({
  key: 'isCropOpen',
  default: false,
});
export const imageMagnifImagesAtom = atom<{ images: string[]; index: number }>({
  key: 'imageMagnifImages',
  default: { images: [], index: 0 },
});

// Notification Atom
export const NotiContentAtom = atom<string>({
  key: 'NotiContent',
  default: '',
});

// Login Page Atoms
export const isLoginAtom = atom<boolean>({
  key: 'isLogin',
  default: Boolean(getItem('isLogin')),
});

// Map Page Atoms
export const searchTypeAtom = atom<number>({
  key: 'searchType',
  default: 0,
});
export const searchRegionAtom = atom<string>({
  key: 'searchRegion',
  default: '',
});
export const isExpandAtom = atom<boolean>({
  key: 'isExpand',
  default: false,
});
export const gardensAtom = atom<GardenListType[]>({
  key: 'gardens',
  default: [],
});
export const selectedGardenIdAtom = atom<number | null>({
  key: 'selectedGarden',
  default: null,
});
export const selectedMapLocationAtom = atom<ILocation | null>({
  key: 'selectedMapLocation',
  default: null,
});

// export const recentListsAtom = atom<IGardens[]>({
//   key: 'recentLists',
//   default: [],
// });

export const recentPageAtom = atom<number>({
  key: 'recentPage',
  default: 1,
});
// export const myListsAtom = atom<IGardens[]>({
//   key: 'myLists',
//   default: [],
// });

export const myPageAtom = atom<number>({
  key: 'myPage',
  default: 1,
});
// export const likeListsAtom = atom<IGardens[]>({
//   key: 'likeLists',
//   default: [],
// });

export const likePageAtom = atom<number>({
  key: 'likePage',
  default: 1,
});
export const feedbackImgAtom = atom<string[]>({
  key: 'feedbackImg',
  default: [],
});

export const feedbackCommentAtom = atom<string>({
  key: 'feedbackComment',
  default: '',
});
export const hasMyGardenAtom = atom<IHashMyGarden | null>({
  key: 'hasMyGarden',
  default: null,
});

export const memberIdAtom = atom<number | null>({
  key: 'memberId',
  default: null,
});
export const memberName = atom<string | null>({
  key: 'memberName',
  default: null,
});
export const windowOffsetAtom = atom<{ width: number; height: number }>({
  key: 'offset',
  default: { width: window.innerWidth, height: window.innerHeight },
});
