import customAxios from 'utils/token';
import { IFormData } from './type';
import { AxiosResponse } from 'axios';

export const getImages = async (formData: IFormData) => {
  try {
    const res = await customAxios.post(`/v1/garden/images`, formData);
    return res;
  } catch (err) {
    return err;
  }
};

export const getQueryData = async (query: string) => {
  try {
    const res: AxiosResponse = await customAxios.get('v1/garden', {
      params: {
        query,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};
