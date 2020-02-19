import { Component, ChangeDetectionStrategy } from '@angular/core';
import { XpdoIconService } from '@xpdo/components';
import { faHome, faUsers, faCalendar, faListUl, faBars, faCog, faMap, faImage, faAnalytics } from '@fortawesome/pro-regular-svg-icons';

@Component({
  selector: 'msft-aiala-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    iconService: XpdoIconService
  ) {
    iconService.addIcons(
      faBars,
      faHome,
      faUsers,
      faCalendar,
      faListUl,
      faCog,
      faMap,
      faImage,
      faAnalytics
    );
  }
}
