import { atom } from 'recoil';
import { GardenData } from 'api/type';

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
  default: true,
});
export const gardensAtom = atom<GardenData[]>({
  key: 'gardens',
  default: [],
});
export const selectedGardenIdAtom = atom<number | null>({
  key: 'selectedGarden',
  default: null,
});
