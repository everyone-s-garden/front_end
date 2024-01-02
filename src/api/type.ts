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
export interface GardesType {
  gardenId: number;
  gardenName: string;
  gardenStatus: 'ACTIVE' | 'INACTIVE' | null | undefined;
  gardenType: 'PRIVATE' | 'PUBLIC';
  images: string[];
  latitude: number;
  longitude: number;
  price: string;
  size: string;
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

interface ICropInfos {
  name: string;
  description: string;
  link: string;
}

export interface Corp {
  month: number;
  cropInfos: ICropInfos[];
}

// Weather

export interface WeatherType {
  baseDate: string;
  category: string;
  obsrValue: string;
  regionName: string;
}
