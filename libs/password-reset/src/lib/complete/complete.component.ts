import { state, style, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation, fadeOutAnimation } from '@xpdo/components/animation';
import {
  CompleteFacade,
  XdkPasswordResetCompleteComponent
} from '@xpdo/core/xdk';

@Component({
  selector: 'msft-aiala-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
  animations: [
    trigger('complete', [
      state(':leave', style({ position: 'absolute' })),
      fadeInAnimation(':enter', '150ms 150ms ease-in'),
      fadeOutAnimation(':leave', '300ms ease-out')
    ]),
    trigger('passwordReset', [
      state(':enter', style({ position: 'absolute' })),
      fadeInAnimation(':enter', '200ms 400ms ease-in'),
      fadeOutAnimation(':leave')
    ])
  ]
})
export class CompleteComponent extends XdkPasswordResetCompleteComponent {
  constructor(
    completeFacade: CompleteFacade,
    fb: FormBuilder,
    route: ActivatedRoute
  ) {
    super(completeFacade, fb, route);
  }
}
