import { Injectable } from '@angular/core';
import { Place } from '../models/Place';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '@xpdo/core';
import { Required } from '@xpdo/common';

@Injectable()
export class PlacesApiService {
  private basePath = `${this.config.basePath}/v1`;

  constructor(
    private config: ApiConfigService,
    private http: HttpClient
  ) {}

  @Required('basePath')
  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.basePath}/places`);
  }

  @Required('basePath')
  savePlace(place: Place): Observable<Place> {
    return this.http.post<Place>(`${this.basePath}/places`, place);
  }

  @Required('basePath')
  deletePlace(id: string): Observable<any> {
    return this.http.delete(`${this.basePath}/places/${id}`);
  }
}
