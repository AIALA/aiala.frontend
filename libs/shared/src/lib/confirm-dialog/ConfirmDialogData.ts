import { ThemePalette } from '@angular/material';
import { TemplateRef } from '@angular/core';

export interface ConfirmDialogData {
  type: ConfirmDialogType;
  title?: TemplateRef<any>;
  text?: TemplateRef<any>;
  buttonColor?: ThemePalette;
}

export enum ConfirmDialogType {
  Custom = 'custom',
  UnsavedChanges = 'unsavedChanges',
  Unauthorized = 'unauthorized'
}
