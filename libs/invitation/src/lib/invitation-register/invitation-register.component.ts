import { take } from 'rxjs/operators';

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BadRequestValidator, PasswordEqualErrorStateMatcher, PasswordValidator } from '@xpdo/common/validators';
import { InvitationFacade, XdkInvitation } from '@xpdo/core/xdk';

@Component({
  selector: 'msft-aiala-invitation-register',
  templateUrl: 'invitation-register.component.html',
  styleUrls: ['invitation-register.component.scss']
})
export class InvitationRegisterComponent extends XdkInvitation implements OnInit {
  public form: FormGroup;
  public passwordEqualMatcher = new PasswordEqualErrorStateMatcher();

  constructor(
    facade: InvitationFacade,
    private fb: FormBuilder,
    private location: Location
  ) {
    super(facade);
  }

  ngOnInit(): void {
    this.createForms();
    this.invitation$.pipe(take(1)).subscribe(invitation => {
      this.form.patchValue(invitation.invitee);
    });
  }

  back(): void {
    this.location.back();
  }

  register(): void {
    super.register(this.form.value);
  }

  private createForms(): void {
    this.form = this.fb.group({
      firstname: [{ value: '', disabled: true }],
      lastname: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      password: [
        '',
        [PasswordValidator.pattern()],
        [BadRequestValidator(this.error$, 'password')]
      ],
      passwordConfirmation: [
        '',
        [Validators.required],
        [BadRequestValidator(this.error$, 'passwordConfirmation')]
      ]
    }, {
      validator: PasswordValidator.equals('password', 'passwordConfirmation')
    });
  }
}
