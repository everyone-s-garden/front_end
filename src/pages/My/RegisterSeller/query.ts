import { IUploadData } from './type';
import customAxios from '../../../utils/token';

export const UploadData = async (uploadData: IUploadData) => {
  const res = await customAxios.post('/v1/garden', uploadData);
  return res;
};
export const inputPriceFormat = (str: string) => {
  const comma = (str: string) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  };
  const uncomma = (str: string) => {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
  };
  return comma(uncomma(str));
};

export const uncommaPrice = (str: string) => {
  return str.replace(',', '');
};

export const inputContactFormat = (str: string) => {
  const formattedStr = str.replace(/[^\d]+/g, '');
  const maxLength = 11;
  const truncatedStr = formattedStr.slice(0, maxLength);
  if (truncatedStr.length > 7) {
    const prefix = truncatedStr.slice(0, 3);
    const middle = truncatedStr.slice(3, 7);
    const suffix = truncatedStr.slice(7);

    return `${prefix}-${middle}-${suffix}`;
  }

  return truncatedStr;
};

export const formDataHandler = async (dataURI: any) => {
  const byteString = atob(dataURI.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ia], {
    type: 'image/jpeg',
  });
  const file = new File([blob], 'image.jpg');

  const formData = new FormData();
  formData.append('file', file);
  return formData;
};
