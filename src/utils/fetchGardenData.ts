import customAxios from './token';

const gardenBaseUrl = 'v2/gardens';

export const getMyGardensAPI = {
  fetchLikeGardensAPI: async () => {
    const res = await customAxios.get(`${gardenBaseUrl}/likes`);
    return res;
  },
  fetchRecentGardensAPI: async () => {
    const res = await customAxios.get(`${gardenBaseUrl}/recent`);
    return res;
  },
  fetchMineGardensAPI: async () => {
    const res = await customAxios.get(`${gardenBaseUrl}/mine`);
    return res;
  },
};

export const getCropTradeAPI = {
  fetchSalesHistoryAPI: async () => {
    const res = await customAxios.get('v1/my/crops/bookmarks?offset=0&limit=10');
    return res;
  },
  fetchPurChaseHIstoryAPI: async () => {
    const res = await customAxios.get('v1/my/crops/buy?offset=0&limit=10');
    return res;
  },
  fetchWishListAPI: async () => {
    const res = await customAxios.get('v1/my/crops/bookmarks?offset=0&limit=10');
    return res;
  },
};
