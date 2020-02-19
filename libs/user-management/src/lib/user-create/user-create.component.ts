import { distinctUntilChanged, filter, take, withLatestFrom } from 'rxjs/operators';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { UserDetailFacade, XdkUserDetail } from '@xpdo/core/xdk';
import { UserCreateRole } from '../models/UserCreateRole';

@Component({
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent extends XdkUserDetail {
  public form: FormGroup;
  roles = UserCreateRole;

  constructor(
    userDetailFacade: UserDetailFacade,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserCreateComponent>
  ) {
    super(userDetailFacade);
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [UserCreateRole.EmergencyContact, Validators.required]
    });
  }

  create(): void {
    this.userDetailFacade.create(this.form.value);

    this.isCreating$.pipe(
      distinctUntilChanged(),
      filter(c => !c),
      withLatestFrom(this.error$),
      filter(([_c, e]) => !e),
      take(1)
    ).subscribe(() => {
      this.dialogRef.close();
    });
  }

  cancel(): void {
    this.form.reset();
    this.dialogRef.close();
  }
}
