import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { XpdoDynamicDialog } from '@xpdo/components';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '@msft-aiala/shared';
import { ConfirmDialogType } from '../confirm-dialog/ConfirmDialogData';
import { XdkAuthenticationService } from '@xpdo/core/xdk';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private dialog: XpdoDynamicDialog,
    private injector: Injector
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.dialog.open(ConfirmDialogComponent, {
            data: {
              type: ConfirmDialogType.Unauthorized
            } as ConfirmDialogData
          })
            .afterClosed()
            .subscribe((confirmed: boolean) => {
              if (confirmed) {
                const authService = this.injector.get(XdkAuthenticationService);
                authService.logout();
              }
            });
        }

        return throwError(error);
      })
    );
  }
}
