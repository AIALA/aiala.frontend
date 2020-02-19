import { Injectable } from '@angular/core';
import { Picture, PictureModel } from '@msft-aiala/picture';
import { Observable } from 'rxjs';
import { Required } from '@xpdo/common';
import { ApiConfigService } from '@xpdo/core';
import { HttpClient } from '@angular/common/http';
import { UpdateAiPictureMetadataModel } from '../models/UpdateAiPictureMetadataModel';
import { DateTime } from 'luxon';
import { map } from 'rxjs/operators';

@Injectable()
export class GalleryApiService {
  private basePath = `${this.config.basePath}/v1/pictures`;

  constructor (
    private config: ApiConfigService,
    private http: HttpClient
  ) {}

  @Required('basePath')
  getGallery(): Observable<Picture[]> {
    return this.http.get<PictureModel[]>(`${this.basePath}/gallery`).pipe(
      map(gallery => gallery.map(this.mapPicture))
    );
  }

  @Required('basePath')
  savePicture(id: string, picture: UpdateAiPictureMetadataModel): Observable<Picture> {
    return this.http.put<PictureModel>(`${this.basePath}/gallery/${id}`, picture).pipe(
      map(picture => this.mapPicture(picture))
    );
  }

  @Required('basePath')
  deletePicture(id: string): Observable<any> {
    return this.http.delete(`${this.basePath}/${id}`);
  }

  private mapPicture(picture: PictureModel): Picture {
    return {
      ...picture,
      createdAt: DateTime.fromISO(picture.createdAt)
    };
  }
}
