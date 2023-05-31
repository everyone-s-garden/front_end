import { IUploadData } from './type';
import customAxios from 'utils/token';

export const UploadData = async (uploadData: IUploadData) => {
  const res = await customAxios.post('/v1/garden', uploadData);
  return res;
};
