import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { UserProfile, XdkUserProfile, XdkUserProfileFacade } from '@xpdo/core/xdk';
import { I18nUtilityService } from '@msft-aiala/shared';
import { PictureType } from '@msft-aiala/picture';

@Component({
  selector: 'msft-aiala-user-profile-expandable',
  templateUrl: 'user-profile-expandable.component.html',
  styleUrls: ['./user-profile-expandable.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileExpandableComponent extends XdkUserProfile {
  @Input() profile: UserProfile;
  @Input() selectedAccount: Account;
  @Output() openDialog = new EventEmitter<
    'accounts' | 'password-change' | 'settings'
  >();
  @Output() changeAccount = new EventEmitter();
  @Output() logout = new EventEmitter();
  expanded = false;
  pictureType = PictureType.Profile;

  navigateToLanguage = this.i18n.navigateToLanguage;

  constructor(
    private i18n: I18nUtilityService,
    profileFacade: XdkUserProfileFacade<UserProfile>
  ) {
    super(profileFacade);
  }
}
