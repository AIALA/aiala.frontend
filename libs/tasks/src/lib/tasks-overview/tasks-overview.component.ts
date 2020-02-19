import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TasksFacade } from '../+state/tasks.facade';
import { ConfirmDialogData, ConfirmDialogComponent, ConfirmDialogType } from '@msft-aiala/shared';
import { XpdoDynamicDialog } from '@xpdo/components';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'msft-aiala-tasks-overview',
  templateUrl: './tasks-overview.component.html',
  styleUrls: ['./tasks-overview.component.scss']
})
export class TasksOverviewComponent implements OnInit {
  tasks$ = this.facade.tasks$;
  generalError$ = this.facade.generalError$;
  loading$: Observable<boolean> = combineLatest(
    this.facade.loading$,
    this.facade.saving$
  ).pipe(
    map(([loading, saving]) => loading || saving)
  );

  @ViewChild('confirmDeleteTitle') confirmDeleteTitle: TemplateRef<any>;
  @ViewChild('confirmDeleteText') confirmDeleteText: TemplateRef<any>;

  constructor(
    private facade: TasksFacade,
    private dialog: XpdoDynamicDialog
  ) { }

  ngOnInit() {
    this.facade.loadTasks();
  }

  deleteTask(id: string): void {
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
          this.facade.deleteTask(id);
        }
      });
  }
}
