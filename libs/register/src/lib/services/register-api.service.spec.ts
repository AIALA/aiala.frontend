import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterApiService } from './register-api.service';
import { ApiConfigService } from '@xpdo/core';
import { RegistrationSuccess } from '../models/RegistrationSuccess';
import { ApiConfigServiceMock } from '@xpdo/core/testing';

describe('RegisterApiService', () => {
  let testee: RegisterApiService;
  let httpMock: HttpTestingController;
  let apiConfigServiceMock: ApiConfigServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegisterApiService,
        { provide: ApiConfigService, useClass: ApiConfigServiceMock }
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    testee = TestBed.get(RegisterApiService);
    httpMock = TestBed.get(HttpTestingController);
    apiConfigServiceMock = TestBed.get(ApiConfigService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should submit register request', () => {
    const payload = 'payload' as any;
    const expectedResponse: RegistrationSuccess = {
      email: 'email@email.com',
      id: 'id',
      status: 'status'
    };

    testee.register(payload).subscribe(response => {
      expect(response).toBe(expectedResponse);
    });

    const req = httpMock.expectOne(apiConfigServiceMock.basePath + '/v1/' + 'register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(payload);
    req.flush(expectedResponse);
  });
});
