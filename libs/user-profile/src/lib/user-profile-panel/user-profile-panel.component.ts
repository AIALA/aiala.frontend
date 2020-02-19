import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { BreakpointsService, XpdoDynamicDialog } from '@xpdo/components';
import {
  XdkAuthenticationService,
  XdkChangeAccountFacade,
  XdkUserProfile,
  XdkUserProfileFacade
} from '@xpdo/core/xdk';

import { AccountsDialogComponent } from '../accounts-dialog/accounts-dialog.component';
import { UpdatePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { UserProfileSettingsOverviewDialogComponent } from '../user-profile-settings-overview-component/user-profile-settings-overview-dialog.component';

@Component({
  selector: 'msft-aiala-user-profile-panel',
  templateUrl: 'user-profile-panel.component.html'
})
export class UserProfilePanelComponent extends XdkUserProfile {
  get isMobile$(): Observable<boolean> {
    return this.breakpoints.isMobile$;
  }

  constructor(
    facade: XdkUserProfileFacade,
    private breakpoints: BreakpointsService,
    private dialog: XpdoDynamicDialog,
    public authenticationService: XdkAuthenticationService,
    private changeAccountFacade: XdkChangeAccountFacade
  ) {
    super(facade);
  }

  logout(): void {
    this.authenticationService.logout();
  }

  changeAccount(id: string): void {
    this.changeAccountFacade.changeAccount(id);
  }

  onOpenDialog(type: 'accounts' | 'settings' | 'password-change'): void {
    switch (type) {
      case 'accounts':
        return this.openAccountsDialog();

      case 'settings':
        return this.openSettingsDialog();

      case 'password-change':
        return this.openPasswordChangeDialog();
    }
  }

  openSettingsDialog(): void {
    this.dialog.open(UserProfileSettingsOverviewDialogComponent, {
      height: '400px',
      width: '300px'
    });
  }

  openPasswordChangeDialog(): void {
    this.dialog.open(UpdatePasswordDialogComponent, {
      height: 'auto',
      width: '300px'
    });
  }

  openAccountsDialog(): void {
    this.dialog.open(AccountsDialogComponent, {
      height: '450px',
      width: '400px'
    });
  }
}
