import { Component, Input } from '@angular/core';
import { InvitationStatus, User } from '@xpdo/core/xdk';
import { PictureType } from '@msft-aiala/picture';

@Component({
  selector: 'msft-aiala-user-overview-list',
  templateUrl: 'user-overview-list.component.html',
  styleUrls: ['./user-overview-list.component.scss']
})
export class UserOverviewListComponent {
  @Input() users: User[];
  readonly invitationStatus = InvitationStatus;

  public columns = ['picture', 'name', 'email', 'status', 'lastLogin', 'permissions', 'actions'];
  pictureType = PictureType.Profile;
}
