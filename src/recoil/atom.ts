import { atom } from 'recoil';
import { GardenData } from 'api/type';

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
export const gardensAtom = atom<GardenData[]>({
  key: 'gardens',
  default: [],
});
export const selectedGardenIdAtom = atom<number | null>({
  key: 'selectedGarden',
  default: 1,
});
