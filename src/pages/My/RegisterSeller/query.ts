import { IUploadData } from './type';
import customAxios from 'utils/token';

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

export const uncommaPrice = (str: any) => {
  return str.replace(',', '');
};

export const inputSizeFormat = (str: string) => {
  const uncomma = (str: string) => {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
  };
  const uncommedStr = uncomma(str);
  return uncommedStr + '평';
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
