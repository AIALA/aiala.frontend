import { Registration } from '../lib/models/Registration';
import { Subject } from 'rxjs';
import { NgModule } from '@angular/core';
import { RegisterFacade } from '../lib/+state/register.facade';
import { RegisterApiService } from '../lib/services/register-api.service';

export class RegisterFacadeMock implements Partial<RegisterFacade> {
  registration$: Subject<Registration> = new Subject<Registration>();
  loading$: Subject<boolean> = new Subject<boolean>();
  error$: Subject<any> = new Subject<any>();
  generalError$: Subject<any> = new Subject<any>();

  updateRegistration: jasmine.Spy = jasmine.createSpy();
  submitRegistration: jasmine.Spy = jasmine.createSpy();
}

export class RegisterApiServiceMock implements Partial<RegisterApiService> {
  register: jasmine.Spy = jasmine.createSpy();
  confirmRegistration: jasmine.Spy = jasmine.createSpy();
}

@NgModule({
  providers: [{
    provide: RegisterFacade,
    useClass: RegisterFacadeMock
  }]
})
export class RegisterTestingModule { }
