import { useQuery } from '@tanstack/react-query';
import HttpRequest from './HttpRequest';
import { MonthCrop } from 'types/Crop';

const getMonthCrop = async (month: number): Promise<MonthCrop[]> => {
  const response = await HttpRequest.get(`/v1/crop?month=${month}`);
  return response.data;
};

export const useGetMonthCrop = ({ month }: { month: number }) => {
  return useQuery({
    queryKey: ['monthlyCrop', month],
    queryFn: () => getMonthCrop(month),
  });
};
