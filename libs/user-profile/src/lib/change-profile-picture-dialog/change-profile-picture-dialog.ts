import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { XdkUserProfileFacade } from '@xpdo/core/xdk';
import { Observable, Subscription } from 'rxjs';

export interface UserProfileChangeAvatarData {
  compressedBlob?: Blob;
}

@Component({
  selector: 'msft-aiala-change-profile-picture-dialog',
  templateUrl: './change-profile-picture-dialog.html',
  styleUrls: ['./change-profile-picture-dialog.scss']
})
export class UserProfileChangeAvatarDialogComponent implements OnDestroy {
  public isUploadingProfilePicture$: Observable<boolean>;
  private uploadingPictureSub: Subscription;
  public image: Blob;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserProfileChangeAvatarData,
    private dialogRef: MatDialogRef<UserProfileChangeAvatarDialogComponent>,
    private facade: XdkUserProfileFacade
  ) {
    this.isUploadingProfilePicture$ = this.facade.uploadingPicture$;
  }

  uploadPicture(image: any): void {
    this.facade.uploadPicture(image);
    this.uploadingPictureSub = this.facade.uploadingPicture$.subscribe(
      result => {
        if (!result) {
          this.dialogRef.close();
        }
      }
    );
  }

  croppedImage($event): void {
    this.image = $event;
  }

  ngOnDestroy(): void {
    if (this.uploadingPictureSub) {
      this.uploadingPictureSub.unsubscribe();
    }
  }
}
