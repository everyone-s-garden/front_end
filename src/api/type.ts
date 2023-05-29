export interface GardenData {
  id: number;
  name: string;
  type: string;
  address: string;
  price: number;
  link: string;
  latitude: number;
  longitude: number;
}

export interface GardenDetail {
  id: number;
  name: string;
  type: string; // (PUBLIC | PRIVATE | UNKNOWN)
  link?: string;
  price?: number;
  size?: string;
  contact?: string;
  address: string;
  latitude: number;
  longitude: number;

  // YYYY-MM-DD 형식
  recruitStartDate?: string;
  recruitEndDate?: string;
  useStartDate?: string;
  useEndDate?: string;

  postTitle: string;
  postContent: string;
  images: string[];
}

export interface GardenUsing {
  id: number;
  name: string;
  image?: string;

  address: string;
  latitude: number;
  longitude: number;

  useStartDate: string;
  useEndDate: string;
}

export interface Corp {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
}
