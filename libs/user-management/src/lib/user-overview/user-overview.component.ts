import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { trigger } from '@angular/animations';
import { Component, Optional } from '@angular/core';
import { BreakpointsService, XpdoDynamicDialog } from '@xpdo/components';
import { fadeInList, fadeOutList } from '@xpdo/components/animation';
import { UserManagementHubConnection, UserOverviewFacade, XdkUserOverview } from '@xpdo/core/xdk';

import { UserCreateComponent } from '../user-create/user-create.component';
import { AppUser } from '../models/AppUser';

export enum ViewMode {
  Card,
  Table
}

@Component({
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
  animations: [
    trigger('listAnimation', [
      fadeInList(),
      fadeOutList()
    ])
  ]
})
export class UserOverviewComponent extends XdkUserOverview<AppUser> {
  public mode$ = new BehaviorSubject(ViewMode.Card);
  public modes = ViewMode;
  public isMobile$ = this.breakpointService.isMobile$;
  public showAsCards$ = combineLatest(this.isMobile$, this.mode$).pipe(
    map(([isMobile, mode]) => isMobile ? true : mode === ViewMode.Card)
  );

  constructor(
    userOverviewFacade: UserOverviewFacade<AppUser>,
    @Optional() usermanagementHub: UserManagementHubConnection<AppUser>,
    private dialog: XpdoDynamicDialog,
    private breakpointService: BreakpointsService,
  ) {
    super(userOverviewFacade, usermanagementHub);
  }

  create(): void {
    this.dialog.open(UserCreateComponent, {
      height: 'auto',
      width: '400px'
    });
  }
}
