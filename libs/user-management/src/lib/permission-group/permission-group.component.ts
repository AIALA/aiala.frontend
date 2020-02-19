import { take } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPermissionGroupFacade, XdkUserPermissionGroup } from '@xpdo/core/xdk';

@Component({
  selector: 'msft-aiala-permission-group',
  templateUrl: './permission-group.component.html',
  styleUrls: ['./permission-group.component.scss']
})
export class PermissionGroupComponent extends XdkUserPermissionGroup implements OnInit, OnDestroy {
  constructor(
    userPermissionGroupFacade: UserPermissionGroupFacade,
    private activatedRoute: ActivatedRoute,
  ) {
    super(userPermissionGroupFacade);
  }

  ngOnInit(): void {
    this.createForms();
    this.activatedRoute.params.pipe(take(1)).subscribe(params => {
      this.userPermissionGroupFacade.load(params.id);
    });
  }

  ngOnDestroy(): void {
  }

  toggleEdit(): void {
  }

  private createForms(): void {
  }
}
