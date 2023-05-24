export interface IImage {
  id: string;
  imageUrl: string;
}
export interface IFormData extends FormData {
  append(name: string, value: string | Blob, fileName?: string): void;
}
export interface IProps {
  images: IImage[];
}

export interface ILocation {
  address: string;
  lat: string;
  lng: string;
}

export interface IUploadData {
  name: string;
  price: string;
  size: string;
  address: string;
  latitude: string;
  longitude: string;
  images: IImage[];
}
