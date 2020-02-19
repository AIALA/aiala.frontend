import { trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimation } from '@xpdo/components/animation';

@Component({
  selector: 'msft-aiala-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
  animations: [
    trigger('routeAnimations', [
      routeAnimation()
    ])
  ]
})
export class InvitationComponent {

  prepareRouteOutlet(outlet: RouterOutlet): any {
    return (
      (outlet &&
        outlet.activatedRouteData &&
        outlet.activatedRouteData['state']) ||
      ''
    );
  }
}
