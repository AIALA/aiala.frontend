import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[msft-aiala-confidence-hint]',
  templateUrl: './confidence-hint.component.html',
  styleUrls: ['./confidence-hint.component.scss']
})
export class ConfidenceHintComponent implements OnInit {
  @Input() confidence: number;

  constructor() { }

  ngOnInit() {
  }

}
