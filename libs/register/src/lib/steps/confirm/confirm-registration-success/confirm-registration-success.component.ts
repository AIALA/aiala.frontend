import { Component, OnInit } from '@angular/core';
import { AppConfig } from '@xpdo/core';

@Component({
  selector: 'msft-aiala-confirm-registration-success',
  templateUrl: './confirm-registration-success.component.html',
  styleUrls: ['./confirm-registration-success.component.scss']
})
export class ConfirmRegistrationSuccessComponent implements OnInit {
  redirectUrl$ = this.appConfig.getConfig<string>('registration.redirectUrl');

  constructor(
    private appConfig: AppConfig
  ) { }

  ngOnInit() {
  }

}
