import customAxios from 'utils/token';
import { IFormData } from './type';

export const getImages = async (formData: IFormData) => {
  const res = await customAxios.post(`/v1/garden/images`, formData);
  console.log(res);
  return res;
};
