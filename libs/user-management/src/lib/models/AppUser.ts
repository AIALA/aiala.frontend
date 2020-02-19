import { User } from '@xpdo/core/xdk';
import { PictureModel } from '@msft-aiala/picture';

export interface AppUser extends User {
  phoneNumber: string;
}

export interface UserDetail extends User {
  picture: PictureModel;
}
