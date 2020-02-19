import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import {
  Account,
  XdkChangeAccountFacade,
  XdkUserProfile,
  XdkUserProfileFacade
} from '@xpdo/core/xdk';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  templateUrl: 'accounts-dialog.component.html',
  styleUrls: ['./accounts-dialog.component.scss']
})
export class AccountsDialogComponent extends XdkUserProfile
  implements OnDestroy {
  filterForm: FormGroup;
  filter: FormControl;
  accounts$: BehaviorSubject<Account[]>;
  accounts: Account[];
  accountsSub: Subscription;

  constructor(
    private dialogRef: MatDialogRef<AccountsDialogComponent>,
    facade: XdkUserProfileFacade,
    private changeAccountsFacade: XdkChangeAccountFacade
  ) {
    super(facade);
    this.accountsSub = this.accounts$.subscribe(
      accounts => (this.accounts = accounts)
    );
    this.accounts$ = new BehaviorSubject(this.accounts);
    this.filter = new FormControl();
    this.filterForm = new FormGroup({
      filterText: this.filter
    });
    this.filter.valueChanges.subscribe(value => {
      this.accounts$.next(
        this.accounts.filter(
          t => t.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
      );
    });
  }

  ngOnDestroy(): void {
    this.accountsSub.unsubscribe();
  }

  clearFilter(): void {
    this.filter.reset('');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  changeAccount(id: string): void {
    this.changeAccountsFacade.changeAccount(id);
    this.closeDialog();
  }
}
