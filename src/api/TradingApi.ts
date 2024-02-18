import HttpRequest from './HttpRequest';

interface GetCropsListProps {
  searchContent: null | string;
  offset: number;
  limit: number;
  tradeType: null | string;
  cropCategory: null | string;
  orderBy: string;
}

interface GetCropsListResponse {
  cropsInfos: CropPost[];
}

interface CropPost {
  cropsPostId: number;
  title: string;
  price: number;
  createdDate: string;
  tradeType: string;
  priceProposal: boolean;
  tradeStatus: string;
  cropCategory: string;
  bookmarkCount: number;
}

export const getCropsList = async ({
  searchContent,
  offset,
  limit,
  tradeType,
  cropCategory,
  orderBy,
}: GetCropsListProps): Promise<GetCropsListResponse> => {
  let url = `v1/crops/posts?&offset=${offset}&limit=${limit}&orderBy=${orderBy}`;
  searchContent !== null ? (url += `searchContent=${searchContent}&`) : '';
  tradeType !== null ? (url += `tradeType=${tradeType}&`) : '';
  cropCategory !== null ? (url += `cropCategory=${cropCategory}`) : '';

  const res = await HttpRequest.get(url);

  return res.data;
};

interface Address {
  sido: string;
  sigungu: string;
  upmyeondong: string;
}

interface GetDetailCropResponse {
  content: string;
  author: string;
  mannerPoint: number;
  authorAddress: null | Address;
  cropCategory: string;
  bookmarkCount: number;
  images: string[];
}
export const getDetailCrop = async (tradingId: string): Promise<GetDetailCropResponse> => {
  const res = await HttpRequest.get(`/v1/crops/posts/${tradingId}`);

  return res.data;
};

interface CreateTradingCrop {
  formData: FormData;
}

export const createTradingCrop = async ({ formData }: CreateTradingCrop) => {
  const res = await HttpRequest.post(` /v1/crops/posts`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};
