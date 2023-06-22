import { useMatch } from 'react-router-dom';

export interface IImage {
  imageUrl: string | undefined;
}
export interface IFormData extends FormData {
  append(name: string, value: string | Blob, fileName?: string): void;
}

export interface IMyGarden {
  id: number;
  name: string;
  image: string | null;
  address: string;
  latitude: number;
  longitude: number;
  useEndDate: string;
  useStartDate: string;
}
export interface IHashMyGarden {
  address: string;
  id: number;
  image: string;
  latitude: number;
  longitude: number;
  name: string;
  useEndDate: string;
  useStartDate: string;
}

export interface IProps {
  image: IImage | null;
  myGarden: IMyGarden | undefined;
  editMatch: ReturnType<typeof useMatch>;
}

export interface IData {
  address: string;
  id: number;
  latitude: number;
  link?: string;
  longitude: number;
  name: string;
  price?: string;
  type?: string;
  image?: string;
}
