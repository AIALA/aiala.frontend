import { Injectable } from '@angular/core';
import { DayTemplate } from '../../models/DayTemplate';
import { Store, select } from '@ngrx/store';
import { DayTemplatesPartialState } from './day-templates.reducer';
import { CreateDayTemplateAction, DeleteDayTemplateAction, GetDayTemplatesAction } from './day-templates.actions';
import { Observable } from 'rxjs';
import { dayTemplatesQuery } from './day-templates.selectors';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DayTemplatesFacade {
  dayTemplates$: Observable<DayTemplate[]> = this.store.pipe(select(dayTemplatesQuery.getDayTemplates));
  loading$: Observable<boolean> = this.store.pipe(select(dayTemplatesQuery.getLoading));
  saving$: Observable<boolean> = this.store.pipe(select(dayTemplatesQuery.getSaving));
  error$: Observable<HttpErrorResponse> = this.store.pipe(select(dayTemplatesQuery.getError));
  generalError$: Observable<any> = this.store.pipe(select(dayTemplatesQuery.getGeneralError));

  constructor(
    private store: Store<DayTemplatesPartialState>
  ) {}

  createDayTemplate(template: DayTemplate): void {
    this.store.dispatch(new CreateDayTemplateAction(template));
  }

  getDayTemplates(): void {
    this.store.dispatch(new GetDayTemplatesAction());
  }

  deleteDayTemplate(id: string): void {
    this.store.dispatch(new DeleteDayTemplateAction(id));
  }
}
