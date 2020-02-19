import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { compressBlob } from '@xpdo/common/util';
import { XpdoDynamicDialog } from '@xpdo/components';
import { XdkUserProfile, XdkUserProfileFacade } from '@xpdo/core/xdk';
import { UserProfileChangeAvatarDialogComponent } from '../change-profile-picture-dialog/change-profile-picture-dialog';

@Component({
  templateUrl: 'capture-image-dialog.component.html',
  styleUrls: ['./capture-image-dialog.component.scss']
})
export class CaptureImageDialogComponent extends XdkUserProfile
  implements AfterViewInit, OnDestroy {
  @ViewChild('video') public video: ElementRef;
  @ViewChild('canvas') public canvas: ElementRef;
  private localStream;
  hasCameraPermission = false;
  constructor(
    private dialog: XpdoDynamicDialog,
    private dialogRef: MatDialogRef<CaptureImageDialogComponent>,
    profileFacade: XdkUserProfileFacade
  ) {
    super(profileFacade);
  }

  ngAfterViewInit(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: true
        })
        .then(stream => {
          this.hasCameraPermission = true;
          this.localStream = stream;
          this.video.nativeElement.srcObject = stream;
        })
        .catch(error => {
          this.hasCameraPermission = false;
          this.dialogRef.close();
          console.log(error);
        });
    }
  }

  ngOnDestroy(): void {
    this.stopVideo();
  }

  stopVideo(): void {
    this.video.nativeElement.src = '';
    this.localStream.getTracks()[0].stop();
    this.video.nativeElement.pause();
  }

  capture(): void {
    this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
    this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(
        this.video.nativeElement,
        0,
        0,
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
    this.canvas.nativeElement.toBlob(blob => {
      const file = new File([blob], '');
      compressBlob(
        file,
        result => {
          this.dialog.open(UserProfileChangeAvatarDialogComponent, {
            data: { compressedBlob: result },
            height: '600px',
            width: '600px'
          });
          this.stopVideo();
          this.dialogRef.close();
        },
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
    });
  }
}
