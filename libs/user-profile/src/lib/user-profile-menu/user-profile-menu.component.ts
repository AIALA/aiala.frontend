import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Account, UserProfile } from '@xpdo/core/xdk';
import { I18nUtilityService } from '@msft-aiala/shared';
import { PictureType } from '@msft-aiala/picture';

@Component({
  selector: 'msft-aiala-user-profile-menu',
  templateUrl: 'user-profile-menu.component.html',
  styleUrls: ['./user-profile-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileMenuComponent {
  @Input() profile: UserProfile;
  @Input() selectedAccount: Account;
  @Output() openDialog = new EventEmitter<
    'accounts' | 'password-change' | 'settings'
  >();
  @Output() changeAccount = new EventEmitter();
  @Output() logout = new EventEmitter();

  navigateToLanguage = this.i18n.navigateToLanguage.bind(this.i18n);
  pictureType = PictureType.Profile;

  constructor(
    private i18n: I18nUtilityService
  ) {}
}
