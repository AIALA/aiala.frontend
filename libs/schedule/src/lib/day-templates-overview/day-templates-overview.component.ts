import { Component, OnInit, Output, TemplateRef, ViewChild, Input } from '@angular/core';
import { DayTemplatesFacade } from '../+state/day-templates/day-templates.facade';
import { DayTemplate } from '../models/DayTemplate';
import { Subject, Observable } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogData, ConfirmDialogType } from '@msft-aiala/shared';
import { XpdoDynamicDialog } from '@xpdo/components';
import { ScheduleEditableConfig } from '../models/ScheduleEditableConfig';

@Component({
  selector: 'msft-aiala-day-templates-overview',
  templateUrl: './day-templates-overview.component.html',
  styleUrls: ['./day-templates-overview.component.scss']
})
export class DayTemplatesOverviewComponent implements OnInit {
  dayTemplates$: Observable<DayTemplate[]>;

  @Input() editableConfig: ScheduleEditableConfig;
  @Output() applyTemplate: Subject<DayTemplate> = new Subject<DayTemplate>();

  @ViewChild('confirmDeleteTitle') confirmDeleteTitle: TemplateRef<any>;
  @ViewChild('confirmDeleteText') confirmDeleteText: TemplateRef<any>;

  constructor(
    private facade: DayTemplatesFacade,
    private dialog: XpdoDynamicDialog
  ) { }

  ngOnInit() {
    this.dayTemplates$ = this.facade.dayTemplates$;
  }

  deleteTemplate(id: string): void {
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
          this.facade.deleteDayTemplate(id);
        }
      });
  }
}
