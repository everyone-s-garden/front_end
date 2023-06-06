import React from 'react';
import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';

export interface IImage {
  id: string;
  imageUrl: string;
}
export interface IFormData extends FormData {
  append(name: string, value: string | Blob, fileName?: string): void;
}
export interface IProps {
  images: IImage[];
  location: ILocation;
  setLocation: React.Dispatch<ILocation>;
}

export interface ILocation {
  address: string;
  lat: string;
  lng: string;
}

export interface IFaclity {
  toilet: boolean;
  waterway: boolean;
  equipment: boolean;
}
export interface IStates {
  recruiting: boolean;
  end: boolean;
  regular: boolean;
}

export interface IUploadImage {
  imageUrl: string;
}
export interface IUploadData {
  name: string;
  price: string;
  size: string;
  address: string;
  latitude: number;
  longitude: number;
  contact: string;
  images: string[];
  content: string;
  status: string;
  facility: {
    toilet: boolean;
    waterway: boolean;
    equipment: boolean;
  };
}
export interface ILen {
  len: number;
}

export interface IUrl {
  srcUrl: string;
}
