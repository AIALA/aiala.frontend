import { DateTime } from 'luxon';
import { AiPictureMetadata } from './AiPictureMetadata';

interface PictureBase {
  id: string;
  pictureUrl: string;
  aiMetadata: AiPictureMetadata;
}

export interface PictureModel extends PictureBase {
  createdAt: string;
}

export interface Picture extends PictureBase {
  createdAt: DateTime;
}
