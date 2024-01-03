// Garden
export interface GardenListType {
  gardenId: number;
  size?: string;
  gardenName: string;
  price?: string;
  images: string[];
  gardenStatus: 'ACTIVE' | 'INACTIVE';
  gardenType: 'PRIVATE' | 'PUBLIC';
  latitude: number;
  longitude: number;
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
  gardenId: number;
  address: string;
  latitude: number;
  longitude: number;
  gardenName: string;
  gardenType: 'PRIVATE' | 'PUBLIC';
  linkForRequest: string;
  price: string;
  contact: string;
  size: string;
  gardenStatus: 'ACTIVE' | 'INACTIVE';
  writerId: number;
  recruitStartDate: string;
  recruitEndDate: string;
  useStartDate: string;
  useEndDate: string;
  gardenDescription: string;
  images: string[];
  gardenFacility: {
    isToilet: boolean;
    isWaterway: boolean;
    isEquipment: boolean;
  };
  isLiked: boolean;
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
