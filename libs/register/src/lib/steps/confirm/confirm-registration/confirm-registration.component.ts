import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfirmRegistrationFacade } from '../+state/confirm-registration.facade';

@Component({
  selector: 'msft-aiala-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private facade: ConfirmRegistrationFacade
  ) { }

  ngOnInit() {
    combineLatest(
      this.route.params,
      this.route.queryParams
    ).pipe(take(1)).subscribe(([param, queryParam]) => {
      const { id } = param;
      const { token } = queryParam;
      this.facade.confirm(id, token);
    });
  }
}
