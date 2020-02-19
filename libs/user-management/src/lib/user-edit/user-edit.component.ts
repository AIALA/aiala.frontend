import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, take, takeUntil } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { BadRequestValidator } from '@xpdo/common/validators';
import { UserDetailFacade, XdkUserDetail } from '@xpdo/core/xdk';

@Component({
  templateUrl: 'user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends XdkUserDetail implements OnInit {
  userSub: Subscription;
  form: FormGroup;
  private userId: string;

  constructor(
    userDetailFacade: UserDetailFacade,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserEditComponent>
  ) {
    super(userDetailFacade);
  }

  ngOnInit(): void {
    this.createForm();
    this.user$.pipe(
      filter(user => !!user),
      take(1)
    ).subscribe(user => {
      this.userId = user.id;
      this.form.patchValue(user);
    });
  }

  private createForm(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.email], [BadRequestValidator(this.error$, 'email')]],
    });
  }

  cancel(): void {
    this.form.reset();
    this.dialogRef.close();
  }

  save(): void {
    this.userDetailFacade.save({
      id: this.userId,
      ...this.form.value
    });
    this.isSaving$.pipe(
      distinctUntilChanged(),
      filter(s => !s),
      takeUntil(this.error$.pipe(filter(e => Boolean(e)))),
      take(1),
    ).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
