import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { compressBlob } from '@xpdo/common/util';
import { BreakpointsService, XpdoDynamicDialog } from '@xpdo/components';
import { XdkUserProfile, XdkUserProfileFacade } from '@xpdo/core/xdk';
import { Observable } from 'rxjs';
import { CaptureImageDialogComponent } from '../capture-image-dialog/capture-image-dialog.component';
import { UserProfileChangeAvatarDialogComponent } from '../change-profile-picture-dialog/change-profile-picture-dialog';
import { ProfilePictureDialogComponent } from '../profile-picture-dialog/profile-picture-dialog.component';

@Component({
  selector: 'msft-aiala-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent extends XdkUserProfile implements OnInit {
  isMobile$: Observable<boolean>;

  constructor(
    private breakpointService: BreakpointsService,
    private dialog: XpdoDynamicDialog,
    private matDialog: MatDialog,
    facade: XdkUserProfileFacade
  ) {
    super(facade);
  }

  ngOnInit(): void {
    this.isMobile$ = this.breakpointService.isMobile$;
  }

  onImageChange($event): void {
    // quality = 0.1 if picture is bigger than 8mb, quality = 0.7 if bigger than 4mb
    compressBlob(
      $event.target.files[0],
      result => {
        this.dialog.open(UserProfileChangeAvatarDialogComponent, {
          data: { compressedBlob: result },
          height: '600px',
          width: '600px'
        });
      },
      undefined,
      undefined,
      $event.target.files[0].size > 8388608
        ? 0.1
        : $event.target.files[0].size > 4194304
        ? 0.7
        : undefined
    );
  }

  openCaptureImageDialog(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: true
        })
        .then(() => {
          this.dialog.open(CaptureImageDialogComponent, {
            height: 'auto',
            width: 'auto'
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  openProfilePictureDialog(): void {
    this.matDialog.open(ProfilePictureDialogComponent, {
      height: 'auto',
      width: '400px',
      panelClass: 'no-padding-dialog'
    });
  }

  deleteProfilePicture(): void {
    this.profileFacade.deleteProfilePicture();
  }
}
