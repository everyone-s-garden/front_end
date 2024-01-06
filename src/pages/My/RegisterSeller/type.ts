import React from 'react';
import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
import { useMatch } from 'react-router-dom';

export interface IFormData extends FormData {
  append(name: string, value: string | Blob, fileName?: string): void;
}
export interface IProps {
  images: string[];
  location: ILocation;
  setLocation: (prev: ILocation) => void;
  setImages: React.Dispatch<string[]>;
  match: ReturnType<typeof useMatch>;
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
export interface Idata {
  data: {
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
  };
}
