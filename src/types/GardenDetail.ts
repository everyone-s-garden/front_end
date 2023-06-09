export interface IGardenDetail {
  address: string;
  contact: any;
  facility: {
    toilet: boolean;
    waterway: boolean;
    equipment: boolean;
  };
  gardenId: number;
  images: string[];
  latitude: number;
  link: any;
  longitude: number;
  name: string;
  content: string;
  price: string;
  size: string;
  status: string;
  type: string;
  id: number;
}
