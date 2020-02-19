import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatStepper, MAT_DIALOG_DATA } from '@angular/material';
import { compressBlob } from '@xpdo/common/util';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PicturesApiService } from '../services/pictures-api.service';
import { TakePictureDialogData } from '../models';
import { TakePictureDialogType } from '../models/TakePictureDialogData';

@Component({
  selector: 'msft-aiala-take-picture-dialog',
  templateUrl: './take-picture-dialog.component.html',
  styleUrls: ['./take-picture-dialog.component.scss']
})
export class TakePictureDialogComponent implements OnInit, AfterViewInit {
  takeStepForm: FormGroup;
  cropStepForm: FormGroup;
  hasCameraPermission: boolean | null = null;
  wasSaved = false;
  isSaving = false;

  localStream: MediaStream;
  croppedPictureSource: SafeUrl = null;

  dialogTypes = TakePictureDialogType;

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  constructor(
    private form: FormBuilder,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<TakePictureDialogComponent>,
    private picturesApi: PicturesApiService,
    @Inject(MAT_DIALOG_DATA) public dialogData: TakePictureDialogData
  ) { }

  ngOnInit() {
    this.takeStepForm = this.form.group({
      picture: [null, Validators.required]
    });
    this.cropStepForm = this.form.group({
      picture: [null, Validators.required]
    });
  }

  ngAfterViewInit(): void {
    if (this.dialogData.dialogType === TakePictureDialogType.Camera) {
      this.startVideo();
    }
  }

  startVideo(): void {
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
          console.log(error);
        });
    }
  }

  stopVideo(): void {
    if (!this.video) {
      return;
    }
    this.video.nativeElement.src = '';
    this.localStream.getTracks()[0].stop();
    this.video.nativeElement.pause();
  }

  onFileChange(event: any): void {
    this.stopVideo();
    this.takeStepForm.patchValue({
      picture: event.target.files[0]
    });
    this.stepper.selectedIndex = 1;
  }

  takePicture(): void {
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
    this.canvas.nativeElement.toBlob((blob) => {
      // Edge/IE do not support the file constructor, however all other functionality is supported.
      // See: https://stackoverflow.com/a/55150342/4531932
      const file = new Blob([blob], {}) as File;

      compressBlob(file, result => {
        this.stopVideo();
        this.takeStepForm.patchValue({
          picture: result
        });
        this.stepper.selectedIndex = 1;
      }, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    });
  }

  onCroppedPicture(newPicture: Blob): void {
    this.cropStepForm.patchValue({
      picture: newPicture
    });
    this.croppedPictureSource = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.cropStepForm.value.picture));
  }

  save(): void {
    this.isSaving = true;
    this.picturesApi.uploadPicture(this.cropStepForm.value.picture, this.dialogData.pictureType).subscribe(picture => {
      this.stepper._steps.first.editable = false;
      this.dialogData.pictureTaken(picture);
      this.wasSaved = true;
      this.isSaving = false;
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
