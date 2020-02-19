import { combineLatest } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationFacade, XdkInvitation } from '@xpdo/core/xdk';

import { InvitationDeclinedComponent } from '../invitation-declined/invitation-declined.component';

@Component({
  selector: 'msft-aiala-invitation-request',
  templateUrl: 'invitation-request.component.html',
  styleUrls: ['invitation-request.component.scss']
})
export class InvitationRequestComponent extends XdkInvitation implements OnInit {
  constructor(
    facade: InvitationFacade,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    super(facade);
  }

  ngOnInit(): void {
    combineLatest(
      this.route.params.pipe(take(1)),
      this.route.queryParams.pipe(take(1))
    ).subscribe(([params, queryParams]) => {
      const { id } = params;
      const { token } = queryParams;

      this.get(id, token);
    });

    this.isDeclined$.pipe(
      filter(d => !!d),
      take(1)
    ).subscribe(() => {
      this.snackbar.openFromComponent(InvitationDeclinedComponent, {
        duration: 4000
      });
    });
  }

  register(): void {
    this.router.navigate(['../register'], { relativeTo: this.route });
  }
}
