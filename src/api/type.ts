// Garden
export interface GardenData {
  id: number;
  name: string;
  type: string; // (PUBLIC | PRIVATE | UNKNOWN)
  link?: string;
  price?: string;
  size?: string;
  contact?: string;
  status?: string;

  address: string;
  latitude: number;
  longitude: number;

  // YYYY-MM-DD 형식
  recruitStartDate?: string;
  recruitEndDate?: string;
  useStartDate?: string;
  useEndDate?: string;

  postTitle: string;
  content: string;
  images: string[];

  facility: {
    toilet?: boolean;
    waterway?: boolean;
    equipment?: boolean;
  };
}

export interface GardenDetailType {
  id: number;
  name: string;
  type: string; // (PUBLIC | PRIVATE | UNKNOWN)
  link?: string;
  price?: string;
  size?: string;
  contact?: string;
  liked: boolean;
  status: string;

  address: string;
  latitude: number;
  longitude: number;

  // YYYY-MM-DD 형식
  recruitStartDate?: string;
  recruitEndDate?: string;
  useStartDate?: string;
  useEndDate?: string;

  postTitle: string;
  content: string;
  images: string[];

  facility: {
    toilet?: boolean;
    waterway?: boolean;
    equipment?: boolean;
  };
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

// Weather

export interface WeatherType {
  baseDate: string;
  category: string;
  obsrValue: string;
  regionName: string;
}
