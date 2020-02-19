import { Picture } from '@msft-aiala/picture';

export interface Place {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  picture: Picture;
}
