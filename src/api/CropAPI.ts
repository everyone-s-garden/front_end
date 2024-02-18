import { useQuery } from '@tanstack/react-query';
import HttpRequest from './HttpRequest';
import { MonthCropResponse } from 'types/Crop';

const getMonthCrop = async (): Promise<MonthCropResponse[]> => {
  const response = await HttpRequest.get(`/v1/crops`);

  return response.data.cropsResponses;
};

export const useGetMonthCrop = () => {
  return useQuery({
    queryKey: ['monthlyCrop'],
    queryFn: getMonthCrop,
  });
};
