import customAxios from 'utils/token';

export interface IFormData extends FormData {
  append(name: string, value: string | Blob, fileName?: string): void;
}

export const getImages = async (formData: IFormData) => {
  const res = await customAxios.post(`/v1/garden/images`, formData);
  return res;
};
