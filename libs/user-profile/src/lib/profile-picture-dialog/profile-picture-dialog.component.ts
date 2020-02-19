import { Component } from '@angular/core';
import { XdkUserProfile } from '@xpdo/core/xdk';

@Component({
  templateUrl: 'profile-picture-dialog.component.html',
  styleUrls: ['./profile-picture-dialog.component.scss']
})

export class ProfilePictureDialogComponent extends XdkUserProfile {
}
