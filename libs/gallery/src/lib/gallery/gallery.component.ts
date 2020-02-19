import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GalleryFacade } from '../+state/gallery.facade';
import { ConfirmDialogComponent, ConfirmDialogType, ConfirmDialogData } from '@msft-aiala/shared';
import { XpdoDynamicDialog } from '@xpdo/components';
import { map } from 'rxjs/operators';

@Component({
  selector: 'msft-aiala-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  gallery$ = this.facade.gallery$.pipe(
    map(gallery => gallery.sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()))
  );
  loading$ = this.facade.loading$;

  @ViewChild('confirmDeleteTitle') confirmDeleteTitle: TemplateRef<any>;
  @ViewChild('confirmDeleteText') confirmDeleteText: TemplateRef<any>;

  constructor(
    private facade: GalleryFacade,
    private dialog: XpdoDynamicDialog
  ) { }

  ngOnInit() {
    this.facade.loadGallery();
  }

  deletePicture(id: string): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          type: ConfirmDialogType.Custom,
          title: this.confirmDeleteTitle,
          text: this.confirmDeleteText,
          buttonColor: 'warn'
        } as ConfirmDialogData
      })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.facade.deletePicture(id);
        }
      });
  }
}
