import { Component } from '@angular/core';
import { BreakpointsService } from '@xpdo/components';

@Component({
  selector: 'msft-aiala-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent {
  constructor(
    private breakpointService: BreakpointsService
  ) { }

  get isMobile() {
    return this.breakpointService.isMobile$;
  }
}
