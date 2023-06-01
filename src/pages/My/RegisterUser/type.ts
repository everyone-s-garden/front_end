export interface IImage {
  id: string;
  imageUrl: string;
}
export interface IFormData extends FormData {
  append(name: string, value: string | Blob, fileName?: string): void;
}
