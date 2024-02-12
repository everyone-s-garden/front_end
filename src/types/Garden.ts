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
