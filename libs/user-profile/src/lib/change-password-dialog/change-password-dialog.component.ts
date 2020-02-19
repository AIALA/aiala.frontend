import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import {
  BadRequestValidator,
  PasswordEqualErrorStateMatcher,
  PasswordValidator
} from '@xpdo/common/validators';
import { XdkChangePasswordFacade } from '@xpdo/core/xdk';
import {
  distinctUntilChanged,
  filter,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';

@Component({
  templateUrl: 'change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class UpdatePasswordDialogComponent {
  form: FormGroup;
  passwordEqualMatcher = new PasswordEqualErrorStateMatcher();
  error$ = this.facade.error$;
  isChanging$ = this.facade.isChanging$.pipe(
    tap(isChanging => (this.dialogRef.disableClose = isChanging))
  );

  constructor(
    private facade: XdkChangePasswordFacade,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdatePasswordDialogComponent>
  ) {
    this.createUpdatePasswordForms();
  }

  createUpdatePasswordForms(): void {
    this.form = this.fb.group(
      {
        currentPassword: [
          '',
          Validators.required,
          BadRequestValidator(this.error$, 'currentPassword')
        ],
        newPassword: [
          '',
          PasswordValidator.pattern(),
          BadRequestValidator(this.error$, 'newPassword')
        ],
        confirmNewPassword: [
          '',
          Validators.required,
          BadRequestValidator(this.error$, 'confirmNewPassword')
        ]
      },
      {
        validator: PasswordValidator.equals('newPassword', 'confirmNewPassword')
      }
    );
  }

  updatePassword(): void {
    this.facade.changePassword(this.form.value);

    this.isChanging$
      .pipe(
        distinctUntilChanged(),
        filter(c => !c),
        withLatestFrom(this.error$),
        filter(([_c, e]) => !e),
        take(1)
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
