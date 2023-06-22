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

export const formValidation = (data: IUploadData) => {
  console.log(data);
  if (data.address === '') {
    alert('지역은 필수입니다.');
    return false;
  } else if (data.name === '') {
    alert('텃밭 이름은 필수입니다.');
    return false;
  } else if (data.price === '') {
    alert('가격정보는 필수입니다.');
    return false;
  } else if (data.content === '') {
    alert('상세내용은 필수 입니다.');
    return false;
  } else if (data.status === '') {
    alert('상태는 필수입니다.');
    return false;
  } else if (data.images.length === 0) {
    alert('이미지는 필수입니다.');
    return false;
  } else if (data.size === '') {
    alert('평수는 필수입니다.');
    return false;
  } else if (data.contact === '') {
    alert('전화번호는 필수입니다.');
    return false;
  } else return true;
};
