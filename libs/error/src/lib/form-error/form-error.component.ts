import { Component, Input } from '@angular/core';

@Component({
  selector: 'msft-aiala-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {
  @Input() errors: string[];
  @Input() removeMargin: boolean;
}
