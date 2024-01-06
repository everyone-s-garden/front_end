import { useMatch } from 'react-router-dom';
import { IHashMyGarden } from 'types/MyGarden';

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

export interface IProps {
  image: string;
  myGarden: IHashMyGarden;
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
