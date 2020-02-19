import { Injectable } from '@angular/core';
import { ApiConfigService } from '@xpdo/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Picture, PictureModel, PictureType } from '../models';
import { Required } from '@xpdo/common';
import { map, tap } from 'rxjs/operators';
import { DateTime } from 'luxon';

@Injectable()
export class PicturesApiService {
  private basePath = `${this.config.basePath}/v1/pictures`;
  private editedUserId: string = null;

  constructor(
    private config: ApiConfigService,
    private http: HttpClient
  ) {}

  @Required('basePath')
  uploadPicture(blob: Blob, pictureType: PictureType): Observable<Picture> {
    const formData = new FormData();
    formData.append('picture', blob);
    const params: {[param: string]: string} = {};
    if (pictureType === PictureType.Profile) {
      params['accountId'] = this.editedUserId;
    }
    return this.http.post<PictureModel>(
      `${this.basePath}/${pictureType}`,
      formData, {
        params
      }
    ).pipe(
      map(picture => ({
        ...picture,
        createdAt: DateTime.fromISO(picture.createdAt)
      })),
      tap(() => this.editedUserId = null)
    );
  }

  @Required('basePath')
  deletePicture(id: string): Observable<any> {
    return this.http.delete(`${this.basePath}/places/picture/${id}`);
  }

  setEditedProfileId(userId: string): void {
    this.editedUserId = userId;
  }
}
