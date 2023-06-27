import customAxios from 'utils/token';
import { IData, IFormData, IMyGarden } from './type';
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

export const formValidation = (data: any) => {
  let startDate = data?.useStartDate.split('.');
  let endDate = data?.useEndDate.split('.');
  for (let i = 0; i < startDate.length; i++) {
    if (Number(startDate[i]) > Number(endDate[i])) {
      alert('날짜가 유효하지 않습니다.');
      return false;
    }
  }
  if (data?.name === undefined || data?.name === '') {
    alert('텃밭 정보는 필수입니다.');
    return false;
  } else if (data?.useEndDate === '') {
    alert('종료날짜는 필수입니다.');
    return false;
  } else if (data?.useStartDate === '') {
    alert('시작날짜는 필수입니다.');
    return false;
  } else if (data.image === null) {
    alert('이미지는 필수입니다.');
    return false;
  } else return true;
};
