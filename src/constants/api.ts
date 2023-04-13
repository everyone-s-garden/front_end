export const BASE_URL = 'https://road.masil.site';
/* API의 주소 관리 */

interface IURL {
  [key: string]: string;
}

export const USER_URL: IURL = {
  LOGIN: '/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
};

export const POST_URL: IURL = {};
