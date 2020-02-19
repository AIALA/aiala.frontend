import { Picture } from '@msft-aiala/picture';

export interface ScheduledPlace {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  picture: Picture;
}
