import { Injectable } from '@angular/core';
import { ForbiddenError, InternalError, XpdoErrorHandler } from '@xpdo/common';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorHandler implements XpdoErrorHandler {
  constructor(
    private snackbar: MatSnackBar
  ) { }

  internal(error: InternalError) {
    this.snackbar.open(error.message, null, {
      panelClass: ['error'],
      duration: 4000,
    });
  }

  forbidden(error: ForbiddenError) {
    this.snackbar.open(error.message, null, {
      panelClass: ['error'],
      duration: 4000
    });
  }
}
