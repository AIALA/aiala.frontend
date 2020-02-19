import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registration } from '../models/Registration';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '@xpdo/core';
import { Required } from '@xpdo/common';
import { RegistrationSuccess } from '../models/RegistrationSuccess';
import { ConfirmRegistrationSuccessModel } from '../models/ConfirmRegistrationSuccessModel';
import { ConfirmRegistrationRequest } from '../models/ConfirmRegistrationRequest';

@Injectable({
  providedIn: 'root'
})
export class RegisterApiService {
  private basePath = `${this.config.basePath}/v1`;

  constructor(
    private http: HttpClient,
    private config: ApiConfigService
  ) {}

  @Required('basePath')
  register(registration: Registration): Observable<RegistrationSuccess> {
    return this.http.post<RegistrationSuccess>(`${this.basePath}/register`, registration);
  }

  @Required('basePath')
  confirmRegistration(id: string, request: ConfirmRegistrationRequest): Observable<ConfirmRegistrationSuccessModel> {
    return this.http.put<RegistrationSuccess>(`${this.basePath}/register/${id}`, request);
  }
}
