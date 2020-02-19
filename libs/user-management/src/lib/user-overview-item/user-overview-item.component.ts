import { Component, Input } from '@angular/core';
import { InvitationStatus, User } from '@xpdo/core/xdk';
import { PictureType } from '@msft-aiala/picture';

@Component({
  selector: 'msft-aiala-user-overview-item',
  templateUrl: 'user-overview-item.component.html',
  styleUrls: ['user-overview-item.component.scss']
})
export class UserOverviewItemComponent {
  @Input() user: User;
  public readonly invitationStatus = InvitationStatus;

  pictureType = PictureType.Profile;
}
