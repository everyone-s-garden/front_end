export interface GardenForMap {
  gardenId: number;
  size: string;
  gardenName: string;
  price: string;
  images: string[];
  gardenStatus: 'ACTIVE' | 'INACTIVE';
  gardenType: 'PUBLIC' | 'PRIVATE';
  latitude: number;
  longitude: number;
}

export interface GetAllGardensResponse {
  hasNext: boolean;
  responses: GardenForMap[];
}

export interface Region {
  position: string;
  latitude: number;
  longitude: number;
}

export interface GardenPost {
  gardenId: number;
  gardenName: string;
  address: string;
  recruitStartDate: string;
  recruitEndDate: string;
  price: string;
  isLiked: boolean;
  imageUrl: string;
}

export interface MyGarden {
  myManagedGardenId: number;
  gardenName: string;
  useStartDate: string;
  useEndDate: string;
  images: string[];
}

export interface GardenForNameSearch {
  gardenId: number;
  gardenName: string;
  address: string;
}

export interface GardenFields {
  gardenName: string;
  price: string;
  size: string;
  gardenStatus: 'ACTIVE' | 'INACTIVE';
  contact: string;
  address: string;
  latitude: number;
  longitude: number;
  isToilet: boolean;
  isWaterway: boolean;
  isEquipment: boolean;
  gardenDescription: string;
  recruitStartDate: string;
  recruitEndDate: string;
}
