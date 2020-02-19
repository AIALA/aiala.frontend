import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDetailsComponent } from './account-details.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegisterFacade } from '../../+state/register.facade';
import { RegisterFacadeMock } from '../../../testing/register-testing.module';
import { Registration } from '../../models/Registration';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;

  let facadeMock: RegisterFacadeMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountDetailsComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        FormBuilder,
        { provide: RegisterFacade, useClass: RegisterFacadeMock }
      ]
    })
    .compileComponents();

    facadeMock = TestBed.get(RegisterFacade);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('init', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.loading$).toBe(facadeMock.loading$);
      expect(component.error$).toBe(facadeMock.error$);
      expect(component.generalError$).toBe(facadeMock.generalError$);
    });

    it('should have a form of type FormGroup', () => {
      expect(component.form).toBeTruthy();
      expect(component.form instanceof FormGroup).toBeTruthy();
      expect(component.form.invalid).toBeTruthy();
    });
  });

  describe('submit', () => {
    it('should register the user', () => {
      const accountDetailsPartial: Partial<Registration> = {
        company: 'firstname lastname',
        email: 'email@email.com',
        firstname: 'firstname',
        lastname: 'lastname',
        password: 'Test@123',
        passwordConfirmation: 'Test@123',
        timeZoneId: 'tz'
      };
      component.form.setValue(accountDetailsPartial);

      component.submit();

      expect(facadeMock.updateRegistration).toHaveBeenCalledWith(accountDetailsPartial);
      expect(facadeMock.submitRegistration).toHaveBeenCalled();
    });
  });
});
