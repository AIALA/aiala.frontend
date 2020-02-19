import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { XdkAuthenticationService } from '@xpdo/core/xdk';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'msft-aiala-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  user$: Observable<any>;

  constructor(
    private authenticationService: XdkAuthenticationService
  ) {
    this.user$ = this.authenticationService.getUserProfile();
  }
}
