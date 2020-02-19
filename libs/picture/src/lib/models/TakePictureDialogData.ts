import { PictureType } from './PictureType';
import { Picture } from './Picture';

export enum TakePictureDialogType {
  Upload = 'Upload',
  Camera = 'Camera'
}

export interface TakePictureDialogData {
  dialogType: TakePictureDialogType;
  pictureType: PictureType;
  pictureTaken: (picture: Picture) => void;
}
