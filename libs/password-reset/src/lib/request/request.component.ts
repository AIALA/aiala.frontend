import { state, style, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { fadeInAnimation, fadeOutAnimation } from '@xpdo/components/animation';
import {
  RequestFacade,
  XdkPasswordResetRequestComponent
} from '@xpdo/core/xdk';

@Component({
  selector: 'msft-aiala-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  animations: [
    trigger('request', [
      state(':leave', style({ position: 'absolute' })),
      fadeInAnimation(':enter', '150ms 150ms ease-in'),
      fadeOutAnimation(':leave', '300ms ease-out')
    ]),
    trigger('requestSent', [
      state(':enter', style({ position: 'absolute' })),
      fadeInAnimation(':enter', '200ms 400ms ease-in'),
      fadeOutAnimation(':leave')
    ])
  ]
})
export class RequestComponent extends XdkPasswordResetRequestComponent {
  constructor(requestFacade: RequestFacade, fb: FormBuilder) {
    super(requestFacade, fb);
  }
}
