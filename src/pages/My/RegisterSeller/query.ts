import { IUploadData } from './type';
import customAxios from '../../../utils/token';
import { IRequestData } from './Form';
const valueToJson = async (data: any) => {
  const jsonValue = JSON.stringify(data);
  const blob = new Blob([jsonValue], { type: 'application/json' });
  return blob;
};
export const UploadData = async (uploadData: any, images: any) => {
  const gardenCreateRequest = await valueToJson(uploadData);
  const gardenImages = await valueToJson(images);
  const res = await customAxios.post(
    'v2/gardens',
    { gardenCreateRequest, gardenImages },
    {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    },
  );
  return res;
};
export const inputPriceFormat = (str: string) => {
  const comma = (str: string) => {
    str = String(str.slice(0, 8));
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  };
  const uncomma = (str: string) => {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
  };

  str = comma(uncomma(str));

  return str.slice(0, 10);
};
export const inputSizeFormat = (str: string) => {
  const comma = (str: string) => {
    str = String(str.slice(0, 4));
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  };
  const uncomma = (str: string) => {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
  };

  str = comma(uncomma(str));

  return str.slice(0, 5);
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

  return file;
};
export const formValidation = (data: IRequestData, images: any) => {
  if (images.length === 0) {
    alert('이미지는 필수 입니다.');
    return;
  }
  if (data.address === '') {
    alert('지역은 필수입니다.');
    return false;
  } else if (data.gardenName === '') {
    alert('텃밭 이름은 필수입니다.');
    return false;
  } else if (data.price === '') {
    alert('가격정보는 필수입니다.');
    return false;
  } else if (data.gardenDescription === '') {
    alert('상세내용은 필수 입니다.');
    return false;
  } else if (data.size === '') {
    alert('평수는 필수입니다.');
    return false;
  } else if (data.contact === '') {
    alert('전화번호는 필수입니다.');
    return false;
  } else return true;
};
