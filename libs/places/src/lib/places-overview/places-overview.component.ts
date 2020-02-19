import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PlacesFacade } from '../+state/places.facade';
import { XpdoDynamicDialog } from '@xpdo/components';
import { ConfirmDialogComponent, ConfirmDialogType, ConfirmDialogData } from '@msft-aiala/shared';

@Component({
  selector: 'msft-aiala-places-overview',
  templateUrl: './places-overview.component.html',
  styleUrls: ['./places-overview.component.scss']
})
export class PlacesOverviewComponent implements OnInit {
  places$ = this.placesFacade.places$;
  saving$ = this.placesFacade.saving$;
  loading$ = this.placesFacade.loading$;

  @ViewChild('confirmDeleteTitle') confirmDeleteTitle: TemplateRef<any>;
  @ViewChild('confirmDeleteText') confirmDeleteText: TemplateRef<any>;

  constructor(
    private placesFacade: PlacesFacade,
    private dialog: XpdoDynamicDialog
  ) { }

  ngOnInit() {
    this.placesFacade.loadPlaces();
  }

  deletePlace(id: string): void {
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
          this.placesFacade.deletePlace(id);
        }
      });
  }
}
