import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, HostListener } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData, ConfirmDialogType } from '../confirm-dialog/ConfirmDialogData';
import { XpdoDynamicDialog } from '@xpdo/components';

interface CanComponentDeactivate {
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}

export abstract class CanComponentDeactivateBase implements CanComponentDeactivate {
  abstract canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;

  @HostListener('window:beforeunload', ['$event'])
  beforeUnload($event: BeforeUnloadEvent): void {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(private dialog: XpdoDynamicDialog) {}

  canDeactivate(component: CanComponentDeactivate) {
    if (component && component.canDeactivate && !component.canDeactivate()) {
      // Close eventual old dialogs, caused by this being called an additional time per redirect.
      this.dialog.closeAll();

      // Open the new dialog
      return this.dialog
        .open(ConfirmDialogComponent, {
          data: {
            type: ConfirmDialogType.UnsavedChanges
          } as ConfirmDialogData
        })
        .afterClosed()
        .pipe(map(shouldDeactivate => Boolean(shouldDeactivate)));
    } else {
      return true;
    }
  }
}
