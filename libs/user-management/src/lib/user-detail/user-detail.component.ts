import { Observable, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { XpdoDynamicDialog } from '@xpdo/components';
import {
  UserDetailFacade,
  XdkPolicies,
  XdkUserDetail,
  XdkUserProfileFacade
} from '@xpdo/core/xdk';

import { PermissionGroupEditComponent } from '../permission-group-edit/permission-group-edit.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { PictureType, Picture } from '@msft-aiala/picture';
import { PicturesApiService } from 'libs/picture/src/lib/services/pictures-api.service';

@Component({
  selector: 'msft-aiala-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends XdkUserDetail implements OnInit {
  private userId: string;
  pictureType = PictureType.Profile;

  constructor(
    userDetailFacade: UserDetailFacade,
    private activatedRoute: ActivatedRoute,
    private dialog: XpdoDynamicDialog,
    private profileFacade: XdkUserProfileFacade,
    private policies: XdkPolicies,
    private picturesApiService: PicturesApiService
  ) {
    super(userDetailFacade);
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe(params => {
      this.userId = params.id;
      this.picturesApiService.setEditedProfileId(this.userId);
      this.userDetailFacade.load(this.userId);
    });
  }

  edit(): void {
    this.dialog.open(UserEditComponent, {
      height: 'auto',
      width: '400px'
    });
  }

  get canEditPermissionGroup$(): Observable<boolean> {
    return combineLatest([
      this.profileFacade.activeAccountId$,
      this.policies.hasPolicy('ManageUsersPolicy')
    ]).pipe(
      map(([accountId, hasPolicy]) => accountId !== this.userId && hasPolicy)
    );
  }

  editPermissionGroup(): void {
    this.dialog.open(PermissionGroupEditComponent, {
      height: 'auto',
      width: '400px',
      data: {
        userId: this.userId
      }
    });
  }

  savePicture(picture: Picture): void {
    this.userDetailFacade.load(this.userId);
    this.profileFacade.getProfile();
  }
}
