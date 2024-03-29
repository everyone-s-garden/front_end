import customAxios from 'utils/token';
import HttpRequest from './HttpRequest';
import { getItem } from 'utils/session';
import { GardenDetailType } from './type';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GardenForNameSearch, GardenPost, GetAllGardensResponse, MyGarden, Region } from 'types/Garden';

export const GardenAPI = {
  getGardenByRegion: async (type: number, region: string) => {
    const typeList = ['all', 'public', 'private'];
    const { data } = await HttpRequest.get(`v1/garden/${typeList[type]}/by-region?region=${region}&page=1&size=100`);
    return data;
  },
  getGardenByCoordinate: async (type: number, map: naver.maps.Map) => {
    const bounds = map.getBounds();
    const typeList = ['All', 'PUBLIC', 'PRIVATE'];

    const { data } = await HttpRequest.get(
      `/v2/gardens/by-complexes?gardenType=PUBLIC&pageNumber=0&startLat=${bounds.minY()}&startLong=${bounds.minX()}&endLat=${bounds.maxY()}&endLong=${bounds.maxX()}`,
    );
    return data.gardenByComplexesResponses;
  },

  getGardenDetail: async (gardenID: number) => {
    const token = getItem('access_token');
    if (token) {
      const data = await customAxios.get(`/v2/gardens/${gardenID}`);
      return data;
    } else {
      const data = await HttpRequest.get(`/v2/gardens/${gardenID}`);
      return data;
    }
  },
};

const getAllGardens = async ({ pageParam }: { pageParam: number }): Promise<GetAllGardensResponse> => {
  const response = await HttpRequest.get(`/v2/gardens/all?pageNumber=${pageParam}`);

  return response.data;
};

export const useGetAllGardens = () => {
  return useInfiniteQuery({
    queryKey: ['allGardens'],
    queryFn: ({ pageParam = 0 }) => getAllGardens({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined;
    },
  });
};

const getRegionsName = async ({ regionName }: { regionName: string }): Promise<Region[]> => {
  const response = await HttpRequest.get(`/v1/regions?address=${regionName}&offset=0&limit=10`);

  return response.data.locationSearchResponses;
};

export const useGetRegionsName = ({ regionName }: { regionName: string }) => {
  return useQuery({
    queryKey: ['regionsName', regionName],
    queryFn: () => getRegionsName({ regionName }),
  });
};

const getRecentGardenPosts = async ({ memberId }: { memberId: number }): Promise<GardenPost[]> => {
  const response = await HttpRequest.get(`/v2/gardens/recent-created?memberId=${memberId}`);

  return response.data.recentCreatedGardenResponses;
};

export const useGetRecentGardenPosts = (memberId: number) => {
  return useQuery({
    queryKey: ['recentGardenPosts', memberId],
    queryFn: () => getRecentGardenPosts({ memberId }),
  });
};

const likeGarden = async (gardenId: number) => {
  const response = await HttpRequest.post('/v2/gardens/likes', { gardenId });

  return response;
};

export const useLikeGarden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeGarden,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentGardenPosts'] });
    },
  });
};

const unLikeGarden = async (gardenId: number) => {
  const response = await HttpRequest.delete('/v2/gardens/likes', { data: { gardenId } });

  return response;
};

export const useUnLikeGarden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unLikeGarden,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentGardenPosts'] });
    },
  });
};

const getMyGardens = async (): Promise<MyGarden[]> => {
  const response = await HttpRequest.get('/v2/gardens/my-managed');

  return response.data.myManagedGardenGetResponses;
};

export const useGetMyGardens = () => {
  return useQuery({
    queryKey: ['myGardens'],
    queryFn: getMyGardens,
  });
};

const getGardenListForName = async (gardenName: string): Promise<GardenForNameSearch[]> => {
  const response = await HttpRequest.get(`/v2/gardens?gardenName=${gardenName}&pageNumber=0`);

  return response.data.gardenSearchResponses;
};

export const useGetGardenListForName = (gardenName: string) => {
  return useQuery({
    queryKey: ['gardenListForName', gardenName],
    queryFn: () => getGardenListForName(gardenName),
  });
};

const createMyGarden = async (formData: FormData) => {
  const response = await HttpRequest.post('/v2/gardens/my-managed', formData);

  return response;
};

export const useCreateMyGarden = () => {
  return useMutation({
    mutationFn: createMyGarden,
  });
};

const createGarden = async (garden: FormData) => {
  const response = await HttpRequest.post('/v2/gardens', garden);

  return response;
};

export const useCreateGarden = () => {
  return useMutation({
    mutationFn: createGarden,
  });
};
