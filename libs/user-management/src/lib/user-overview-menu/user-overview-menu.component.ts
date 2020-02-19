import { Component, Input } from '@angular/core';
import { XpdoDynamicDialog } from '@xpdo/components';
import { InvitationStatus, User, UserDetailFacade } from '@xpdo/core/xdk';

import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'msft-aiala-user-overview-menu',
  templateUrl: 'user-overview-menu.component.html'
})
export class UserOverviewMenuComponent {
  @Input() user: User;
  readonly invitationStatus = InvitationStatus;

  constructor(
    private userDetailFacade: UserDetailFacade,
    private dialog: XpdoDynamicDialog
  ) { }

  edit(id: string): void {
    this.userDetailFacade.load(id);
    this.dialog.open(UserEditComponent, {
      height: 'auto',
      width: '400px'
    });
  }

  sendInvitation(id: string): void {
    this.userDetailFacade.sendInvitation(id);
  }

  enable(id: string): void {
    this.userDetailFacade.enable(id);
  }

  disable(id: string): void {
    this.userDetailFacade.disable(id);
  }

  delete(id: string): void {
    this.userDetailFacade.delete(id);
  }
}
