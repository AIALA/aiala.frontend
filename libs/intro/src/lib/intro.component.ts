import { Component } from '@angular/core';
import { XdkIntro } from '@xpdo/core/xdk';

@Component({
  templateUrl: 'intro.component.html',
  styleUrls: ['intro.component.scss']
})
export class IntroComponent extends XdkIntro {
  onComplete(): void {
    // delay for animation with material progress bar
    setTimeout(() => {
      super.onComplete();
    }, 300);
  }
}
