import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Otp } from '../models/Otp';
import { ApiConfigService } from '@xpdo/core';
import { DocumentRequestDialogData } from '../models/DocumentRequestDialogData';

@Injectable()
export class DocumentsApiService {
  private basePath = `${this.config.basePath}/v1`;

  constructor(
    private config: ApiConfigService,
    private http: HttpClient
  ) { }

  getDocumentUrl(request: DocumentRequestDialogData): Observable<string> {
    return this.http.post<Otp>(`${this.basePath}/otp/${request.otpRoute}`, request.body).pipe(
      map(otp => `${this.basePath}/documents/${request.documentRoute}?otp=${otp.token}`)
    );
  }
}
