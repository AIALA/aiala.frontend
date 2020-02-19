import { Component, HostListener } from '@angular/core';
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

  private style: Element;
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.style) {
      this.style.remove();
      this.style = null;
    }
    if (event.altKey && event.ctrlKey && event.shiftKey && event.code === 'KeyS') {
      this.style = document.createElement('style');
      this.style.innerHTML = `
      mat-icon svg {
        animation: rotating 2s linear infinite;
      }`;
      const styleRef = document.querySelector('style');
      styleRef.parentNode.insertBefore(this.style, styleRef);
    }
  }
}
