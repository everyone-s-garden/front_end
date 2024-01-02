import { atom } from 'recoil';
import { GardenDetailType, GardenListType } from 'api/type';
import { IGardenDetail } from 'types/GardenDetail';
import { ILocation } from 'components/Nav';
import { IHashMyGarden } from 'types/MyGarden';

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
  default: false,
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

export const recentListsAtom = atom<IGardenDetail[]>({
  key: 'recentLists',
  default: [],
});

export const recentPageAtom = atom<number>({
  key: 'recentPage',
  default: 1,
});
export const myListsAtom = atom<IGardenDetail[]>({
  key: 'myLists',
  default: [],
});

export const myPageAtom = atom<number>({
  key: 'myPage',
  default: 1,
});
export const likeListsAtom = atom<IGardenDetail[]>({
  key: 'likeLists',
  default: [],
});

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
