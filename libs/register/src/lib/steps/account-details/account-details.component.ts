import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordValidator, PasswordEqualErrorStateMatcher } from '@xpdo/common/validators';
import { Observable } from 'rxjs';
import { RegisterFacade } from '../../+state/register.facade';
import { BadRequestValidator } from '@xpdo/common/validators';

@Component({
  selector: 'msft-aiala-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  form: FormGroup;
  passwordEqualMatcher = new PasswordEqualErrorStateMatcher();

  public loading$: Observable<boolean>;
  public error$: Observable<any>;
  public generalError$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private facade: RegisterFacade
  ) { }

  ngOnInit() {
    this.loading$ = this.facade.loading$;
    this.error$ = this.facade.error$;
    this.generalError$ = this.facade.generalError$;
    this.createForms();
  }

  private createForms() {
    this.form = this.fb.group({
      company: new FormControl('__TEMP__', [Validators.required], BadRequestValidator(this.error$, 'company')),
      firstname: new FormControl('', [Validators.required], BadRequestValidator(this.error$, 'firstname')),
      lastname: new FormControl('', [Validators.required], BadRequestValidator(this.error$, 'lastname')),
      timeZoneId: new FormControl('', [Validators.required], BadRequestValidator(this.error$, 'timeZoneId')),
      email: new FormControl('', [Validators.required, Validators.email], BadRequestValidator(this.error$, 'email')),
      password: new FormControl('', [PasswordValidator.pattern()], BadRequestValidator(this.error$, 'password')),
      passwordConfirmation: new FormControl('', [Validators.required], BadRequestValidator(this.error$, 'passwordConfirmation'))
    }, {
      validator: PasswordValidator.equals('password', 'passwordConfirmation')
    });
  }

  submit(): void {
    this.form.patchValue({
      company: `${this.form.value.firstname} ${this.form.value.lastname}`
    });
    this.facade.updateRegistration(this.form.value);
    this.facade.submitRegistration();
  }
}
