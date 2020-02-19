import { Component } from '@angular/core';
import { XpdoDynamicDialog } from '@xpdo/components';
import { XdkUserProfile, XdkUserProfileFacade } from '@xpdo/core/xdk';
import { UpdateProfileDialogComponent } from '../update-profile-dialog/update-profile-dialog.component';

@Component({
  selector: 'msft-aiala-user-profile-overview',
  templateUrl: './user-profile-overview.component.html',
  styleUrls: ['./user-profile-overview.component.scss']
})
export class UserProfileOverviewComponent extends XdkUserProfile {
  constructor(facade: XdkUserProfileFacade, private dialog: XpdoDynamicDialog) {
    super(facade);
  }

  openUpdateProfileDialog(): void {
    this.dialog.open(UpdateProfileDialogComponent, {
      height: 'auto',
      width: 'auto'
    });
  }
}
