export interface CropInfo {
  description: string;
  link: string;
  name: string;
}

export interface MonthCropResponse {
  cropInfos: CropInfo[];
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}
