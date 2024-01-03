import customAxios from 'utils/token';
import { IData, IFormData, IMyGarden } from './type';

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
    const res = await customAxios.get(`v2/gardens?gardenName=${query}&pageNumber=${0}`);
    return res.data.gardenSearchResponses;
  } catch (err) {
    // return err;
    throw new Error('query error');
  }
};
function validateDates(startDate: string, endDate: string) {
  // 날짜 형식 검증 (YYYY.MM.DD)
  const datePattern = /^\d{4}\.\d{2}\.\d{2}$/;
  if (!datePattern.test(startDate) || !datePattern.test(endDate)) {
    return false;
  }

  // 시작 날짜와 종료 날짜 생성
  const startParts = startDate.split('.').map(Number);
  const endParts = endDate.split('.').map(Number);

  // 날짜 유효성 검증
  const start = new Date(startParts[0], startParts[1] - 1, startParts[2]);
  const end = new Date(endParts[0], endParts[1] - 1, endParts[2]);

  const isValidStart =
    start.getFullYear() === startParts[0] &&
    start.getMonth() === startParts[1] - 1 &&
    start.getDate() === startParts[2];
  const isValidEnd =
    end.getFullYear() === endParts[0] && end.getMonth() === endParts[1] - 1 && end.getDate() === endParts[2];

  if (!isValidStart || !isValidEnd) {
    return false;
  }

  // 시작 날짜가 종료 날짜보다 큰 경우
  if (start > end) {
    return false;
  }

  return true;
}

export const formValidation = (data: any) => {
  let startDate = data?.useStartDate;
  let endDate = data?.useEndDate;
  console.log;
  if (!validateDates(startDate, endDate)) {
    alert('날짜가 유효하지 않습니다.');
    return false;
  }

  if (data?.useEndDate === '') {
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
