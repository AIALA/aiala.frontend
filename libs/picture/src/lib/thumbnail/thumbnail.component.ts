import { Component, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { XpdoDynamicDialog } from '@xpdo/components';
import { TakePictureDialogData, TakePictureDialogType } from '../models/TakePictureDialogData';
import { TakePictureDialogComponent } from '../take-picture-dialog/take-picture-dialog.component';
import { ReplaySubject, Subject } from 'rxjs';
import { Picture, PictureType } from '../models';
import { ApiConfigService } from '@xpdo/core';
import { DateTime } from 'luxon';
import { ViewPictureDialogComponent } from '../view-picture-dialog/view-picture-dialog.component';
import { ViewPictureDialogData } from '../models/ViewPictureDialogData';
import { take } from 'rxjs/operators';

@Component({
  selector: 'msft-aiala-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit {
  @Input()
  set source(value: string) {
    this._source = value;
    this.setSource();
  }
  @Input() editable = false;
  @Input() set pictureType(value: PictureType) {
    this._pictureType = value;
    this.setSource();
  }
  @Output() pictureTaken: Subject<Picture> = new Subject<Picture>();

  _source: string;
  _pictureType: PictureType;
  isDefaultImage: boolean;
  sanitizedSrc$: ReplaySubject<SafeUrl> = new ReplaySubject<SafeUrl>(1);

  dialogTypes = TakePictureDialogType;

  constructor(
    private sanitizer: DomSanitizer,
    private dialog: XpdoDynamicDialog,
    private apiConfig: ApiConfigService
  ) { }

  ngOnInit() {
  }

  view(): void {
    this.sanitizedSrc$.pipe(
      take(1)
    ).subscribe(url => {
      this.dialog.open(ViewPictureDialogComponent, {
        data: {
          url: url
        } as ViewPictureDialogData
      });
    });
  }

  edit(dialogType: TakePictureDialogType): void {
    this.dialog.open(TakePictureDialogComponent, {
        data: {
          pictureType: this._pictureType,
          dialogType: dialogType,
          pictureTaken: picture => this.pictureTaken.next(picture)
        } as TakePictureDialogData
      });
  }

  delete(): void {
    this.pictureTaken.next({
      id: '',
      pictureUrl: '',
      aiMetadata: null,
      createdAt: DateTime.utc()
    });
  }

  setSource(): void {
    let source = this._source;
    if (!source) {
      const pictureType = !!this._pictureType ? this._pictureType.toString() : 'default';
      source = this.apiConfig.basePath.replace('/api', '') + `/images/defaults/${pictureType}.png`;
      this.isDefaultImage = true;
    } else {
      this.isDefaultImage = false;
    }

    this.sanitizedSrc$.next(this.sanitizer.bypassSecurityTrustUrl(source));
  }
}
