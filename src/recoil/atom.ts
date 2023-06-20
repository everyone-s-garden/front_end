import { atom } from 'recoil';
import { GardenDetailType } from 'api/type';
import { IGardenDetail } from 'types/GardenDetail';

// Modal Atoms
export const isReportOpenAtom = atom<boolean>({
  key: 'isReportOpen',
  default: false,
});
export const reportPostIdAtom = atom<number | null>({
  key: 'reportPostId',
  default: null,
});
export const isFeedbackOpenAtom = atom<boolean>({
  key: 'isFeedbackOpen',
  default: false,
});
export const isCropOpenAtom = atom<boolean>({
  key: 'isCropOpen',
  default: false,
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
export const gardensAtom = atom<GardenDetailType[]>({
  key: 'gardens',
  default: [],
});
export const selectedGardenIdAtom = atom<number | null>({
  key: 'selectedGarden',
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
